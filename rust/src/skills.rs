use crate::core_mechanics::{Attribute, HasAttributes};
use crate::creatures::{Creature, HasModifiers, ModifierType};
use crate::equipment::HasArmor;
use titlecase::titlecase;
// use itertools::Itertools;
use std::cmp::{max, PartialEq};
use std::collections::HashMap;
use std::fmt;

#[derive(Clone, Eq, Hash)]
pub enum Skill {
    Awareness,
    Balance,
    Climb,
    Craft,
    CreatureHandling,
    Deception,
    Deduction,
    Devices,
    Disguise,
    Endurance,
    Flexibility,
    Intimidate,
    Jump,
    Knowledge(Vec<KnowledgeSubskill>),
    Linguistics,
    Medicine,
    Perform,
    Persuasion,
    Profession,
    Ride,
    SleightOfHand,
    SocialInsight,
    Spellsense,
    Stealth,
    Survival,
    Swim,
}

pub enum SkillCategory {
    Movement,
    Senses,
    Social,
}

impl Skill {
    pub fn attribute(&self) -> Option<Attribute> {
        match self {
            Self::Awareness => Some(Attribute::Perception),
            Self::Balance => Some(Attribute::Dexterity),
            Self::Climb => Some(Attribute::Strength),
            Self::Craft => Some(Attribute::Intelligence),
            Self::CreatureHandling => Some(Attribute::Perception),
            Self::Deception => None,
            Self::Deduction => Some(Attribute::Intelligence),
            Self::Devices => Some(Attribute::Intelligence),
            Self::Disguise => Some(Attribute::Intelligence),
            Self::Endurance => Some(Attribute::Constitution),
            Self::Flexibility => Some(Attribute::Dexterity),
            Self::Intimidate => None,
            Self::Jump => Some(Attribute::Strength),
            Self::Knowledge(_) => Some(Attribute::Intelligence),
            Self::Linguistics => Some(Attribute::Intelligence),
            Self::Medicine => Some(Attribute::Intelligence),
            Self::Perform => None,
            Self::Persuasion => None,
            Self::Profession => None,
            Self::Ride => Some(Attribute::Dexterity),
            Self::SleightOfHand => Some(Attribute::Dexterity),
            Self::SocialInsight => Some(Attribute::Perception),
            Self::Spellsense => Some(Attribute::Perception),
            Self::Stealth => Some(Attribute::Dexterity),
            Self::Survival => Some(Attribute::Perception),
            Self::Swim => Some(Attribute::Strength),
        }
    }

    pub fn apply_encumbrance(&self) -> bool {
        if let Some(attribute) = self.attribute() {
            return attribute == Attribute::Strength || attribute == Attribute::Dexterity;
        } else {
            return false;
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Awareness => "awareness",
            Self::Balance => "balance",
            Self::Climb => "climb",
            Self::Craft => "craft",
            Self::CreatureHandling => "creature handling",
            Self::Deception => "deception",
            Self::Deduction => "deduction",
            Self::Devices => "devices",
            Self::Disguise => "disguise",
            Self::Endurance => "endurance",
            Self::Flexibility => "flexibility",
            Self::Intimidate => "intimidate",
            Self::Jump => "jump",
            Self::Knowledge(_) => "knowledge",
            Self::Linguistics => "linguistics",
            Self::Medicine => "medicine",
            Self::Perform => "perform",
            Self::Persuasion => "persuasion",
            Self::Profession => "profession",
            Self::Ride => "ride",
            Self::SleightOfHand => "sleight of hand",
            Self::SocialInsight => "social insight",
            Self::Spellsense => "spellsense",
            Self::Stealth => "stealth",
            Self::Survival => "survival",
            Self::Swim => "swim",
        }
    }

    pub fn all() -> Vec<Self> {
        return vec![
            Self::Awareness,
            Self::Balance,
            Self::Climb,
            Self::Craft,
            Self::CreatureHandling,
            Self::Deception,
            Self::Deduction,
            Self::Devices,
            Self::Disguise,
            Self::Endurance,
            Self::Flexibility,
            Self::Intimidate,
            Self::Jump,
            Self::Knowledge(vec![]),
            Self::Linguistics,
            Self::Medicine,
            Self::Perform,
            Self::Persuasion,
            Self::Profession,
            Self::Ride,
            Self::SleightOfHand,
            Self::SocialInsight,
            Self::Spellsense,
            Self::Stealth,
            Self::Survival,
            Self::Swim,
        ];
    }

    pub fn all_from_skill_category(category: &SkillCategory) -> Vec<Self> {
        return Self::all()
            .into_iter()
            .filter(|s| {
                if let Some(c) = s.skill_category() {
                    c.name() == category.name()
                } else {
                    false
                }
            })
            .collect();
    }

    pub fn skill_category(&self) -> Option<SkillCategory> {
        match self {
            Self::Awareness => Some(SkillCategory::Senses),
            Self::Balance => Some(SkillCategory::Movement),
            Self::Climb => Some(SkillCategory::Movement),
            Self::Craft => None,
            Self::CreatureHandling => None,
            Self::Deception => Some(SkillCategory::Social),
            Self::Deduction => Some(SkillCategory::Senses),
            Self::Devices => None,
            Self::Disguise => Some(SkillCategory::Social),
            Self::Endurance => None,
            Self::Flexibility => Some(SkillCategory::Movement),
            Self::Intimidate => Some(SkillCategory::Social),
            Self::Jump => Some(SkillCategory::Movement),
            Self::Knowledge(_) => None,
            Self::Linguistics => Some(SkillCategory::Social),
            Self::Medicine => None,
            Self::Perform => Some(SkillCategory::Social),
            Self::Persuasion => Some(SkillCategory::Social),
            Self::Profession => None,
            Self::Ride => Some(SkillCategory::Movement),
            Self::SleightOfHand => None,
            Self::SocialInsight => Some(SkillCategory::Social),
            Self::Spellsense => Some(SkillCategory::Senses),
            Self::Stealth => Some(SkillCategory::Movement),
            Self::Survival => None,
            Self::Swim => Some(SkillCategory::Movement),
        }
    }

    // It's useful to return this separately from .name() for three reasons.
    // First, it naturally takes the form of `String` instead of `&str`.
    // Second, it requires some calculation and allocations, while `.name()` should be trivial.
    // Third, the titleing behavior is weird - you want to `titlecase()` most skill names, but you
    // don't want to capitalize the subskill names, which makes it hard to convert the string
    // returned here into a useful case after this function has been called.
    pub fn titled_name_with_subskills(&self) -> String {
        match self {
            Self::Knowledge(subskills) => {
                if subskills.len() == KnowledgeSubskill::all().len() {
                    return String::from("Knowledge (all kinds, taken individually)");
                } else {
                    let subskill_names: Vec<&str> =
                        subskills.iter().map(|subskill| subskill.name()).collect();
                    return format!("Knowledge ({})", subskill_names.join(", "));
                }
            }
            _ => titlecase(self.name()),
        }
    }
}

impl PartialEq for Skill {
    fn eq(&self, other: &Self) -> bool {
        if let Self::Knowledge(subskills) = self {
            if let Self::Knowledge(other_subskills) = other {
                return subskills.eq(other_subskills);
            } else {
                return false;
            }
        } else {
            return self.name() == other.name();
        }
    }
}

impl fmt::Display for Skill {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name())
    }
}

#[derive(Clone, Copy, Eq, Hash)]
pub enum KnowledgeSubskill {
    Arcana,
    Dungeoneering,
    Engineering,
    Geography,
    Local,
    Nature,
    Planes,
    Religion,
}

impl KnowledgeSubskill {
    pub fn all() -> Vec<KnowledgeSubskill> {
        return vec![
            KnowledgeSubskill::Arcana,
            KnowledgeSubskill::Dungeoneering,
            KnowledgeSubskill::Engineering,
            KnowledgeSubskill::Geography,
            KnowledgeSubskill::Local,
            KnowledgeSubskill::Nature,
            KnowledgeSubskill::Planes,
            KnowledgeSubskill::Religion,
        ];
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Arcana => "arcana",
            Self::Dungeoneering => "dungeoneering",
            Self::Engineering => "engineering",
            Self::Geography => "geography",
            Self::Local => "local",
            Self::Nature => "nature",
            Self::Planes => "planes",
            Self::Religion => "religion",
        }
    }
}

impl PartialEq for KnowledgeSubskill {
    fn eq(&self, other: &Self) -> bool {
        return self.name() == other.name();
    }
}

impl SkillCategory {
    pub fn name(&self) -> &str {
        match self {
            Self::Movement => "movement",
            Self::Senses => "senses",
            Self::Social => "social",
        }
    }
}

pub trait HasSkills {
    fn is_skill_trained(&self, skill: &Skill) -> bool;
    fn set_skill_trained(&mut self, skill: Skill, is_trained: bool);
    fn calc_skill_modifier(&self, skill: &Skill) -> i32;
}

impl HasSkills for Creature
where
    Creature: HasAttributes + HasArmor + HasModifiers,
{
    fn set_skill_trained(&mut self, skill: Skill, trained: bool) {
        if self.skill_training.is_none() {
            self.skill_training = Some(HashMap::new());
        }
        let ref mut skill_training = self.skill_training.as_mut().unwrap();
        skill_training.insert(skill, trained);
    }

    fn is_skill_trained(&self, skill: &Skill) -> bool {
        if let Some(ref skill_training) = self.skill_training {
            if let Some(p) = skill_training.get(skill) {
                return *p;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    fn calc_skill_modifier(&self, skill: &Skill) -> i32 {
        let attribute = if let Some(ref a) = skill.attribute() {
            self.calc_total_attribute(a)
        } else {
            0
        };
        let training_modifier = if self.is_skill_trained(skill) {
            4 + max(self.level / 2, attribute)
        } else {
            attribute / 2
        };
        let encumbrance_modifier = if skill.apply_encumbrance() {
            self.calc_encumbrance()
        } else {
            0
        };

        return training_modifier - encumbrance_modifier
            + self.calc_total_modifier(ModifierType::Skill(skill.clone()));
    }
}
