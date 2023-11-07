use crate::core_mechanics::{Attribute, HasAttributes};
use crate::creatures::{Creature, HasModifiers, ModifierType};
use crate::equipment::HasArmor;
use std::cmp::{max, PartialEq};
use std::collections::HashMap;
use std::fmt;
use titlecase::titlecase;

#[derive(Clone, Debug, Eq, Hash)]
pub enum Skill {
    Awareness,
    Balance,
    Climb,
    // TODO: add CraftSubskill
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
    Medicine,
    Perform,
    Persuasion,
    Profession,
    Ride,
    SleightOfHand,
    SocialInsight,
    Stealth,
    Survival,
    Swim,
}

pub enum SkillCategory {
    Movement,
    Other,
    Senses,
    Social,
}

impl PartialEq for SkillCategory {
    fn eq(&self, other: &Self) -> bool {
        return self.name() == other.name();
    }
}

impl Skill {
    pub fn attribute(&self) -> Option<Attribute> {
        match self {
            Self::Awareness => Some(Attribute::Perception),
            Self::Balance => Some(Attribute::Dexterity),
            Self::Climb => Some(Attribute::Strength),
            Self::Craft => Some(Attribute::Intelligence),
            Self::CreatureHandling => Some(Attribute::Perception),
            Self::Deception => Some(Attribute::Perception),
            Self::Deduction => Some(Attribute::Intelligence),
            Self::Devices => Some(Attribute::Intelligence),
            Self::Disguise => Some(Attribute::Intelligence),
            Self::Endurance => Some(Attribute::Constitution),
            Self::Flexibility => Some(Attribute::Dexterity),
            Self::Intimidate => None,
            Self::Jump => Some(Attribute::Strength),
            Self::Knowledge(_) => Some(Attribute::Intelligence),
            Self::Medicine => Some(Attribute::Intelligence),
            Self::Perform => Some(Attribute::Dexterity),
            Self::Persuasion => Some(Attribute::Perception),
            Self::Profession => None,
            Self::Ride => Some(Attribute::Dexterity),
            Self::SleightOfHand => Some(Attribute::Dexterity),
            Self::SocialInsight => Some(Attribute::Perception),
            Self::Stealth => Some(Attribute::Dexterity),
            Self::Survival => Some(Attribute::Perception),
            Self::Swim => Some(Attribute::Strength),
        }
    }

    pub fn apply_encumbrance(&self) -> bool {
        if let Some(attribute) = self.attribute() {
            attribute == Attribute::Strength || attribute == Attribute::Dexterity
        } else {
            false
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
            Self::Medicine => "medicine",
            Self::Perform => "perform",
            Self::Persuasion => "persuasion",
            Self::Profession => "profession",
            Self::Ride => "ride",
            Self::SleightOfHand => "sleight of hand",
            Self::SocialInsight => "social insight",
            Self::Stealth => "stealth",
            Self::Survival => "survival",
            Self::Swim => "swim",
        }
    }

    pub fn all() -> Vec<Self> {
        vec![
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
            Self::Medicine,
            Self::Perform,
            Self::Persuasion,
            Self::Profession,
            Self::Ride,
            Self::SleightOfHand,
            Self::SocialInsight,
            Self::Stealth,
            Self::Survival,
            Self::Swim,
        ]
    }

    pub fn all_from_skill_category(category: &SkillCategory) -> Vec<Self> {
        Self::all()
            .into_iter()
            .filter(|s| &s.skill_category() == category)
            .collect()
    }

    pub fn skill_category(&self) -> SkillCategory {
        match self {
            Self::Awareness => SkillCategory::Senses,
            Self::Balance => SkillCategory::Movement,
            Self::Climb => SkillCategory::Movement,
            Self::Craft => SkillCategory::Other,
            Self::CreatureHandling => SkillCategory::Other,
            Self::Deception => SkillCategory::Social,
            Self::Deduction => SkillCategory::Other,
            Self::Devices => SkillCategory::Other,
            Self::Disguise => SkillCategory::Social,
            Self::Endurance => SkillCategory::Other,
            Self::Flexibility => SkillCategory::Movement,
            Self::Intimidate => SkillCategory::Social,
            Self::Jump => SkillCategory::Movement,
            Self::Knowledge(_) => SkillCategory::Other,
            Self::Medicine => SkillCategory::Other,
            Self::Perform => SkillCategory::Social,
            Self::Persuasion => SkillCategory::Social,
            Self::Profession => SkillCategory::Other,
            Self::Ride => SkillCategory::Movement,
            Self::SleightOfHand => SkillCategory::Other,
            Self::SocialInsight => SkillCategory::Social,
            Self::Stealth => SkillCategory::Movement,
            Self::Survival => SkillCategory::Other,
            Self::Swim => SkillCategory::Movement,
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
                    String::from("Knowledge (all kinds, taken individually)")
                } else {
                    let subskill_names: Vec<&str> =
                        subskills.iter().map(|subskill| subskill.name()).collect();
                    format!("Knowledge ({})", subskill_names.join(", "))
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
                subskills.eq(other_subskills)
            } else {
                false
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

#[derive(Clone, Copy, Debug, Eq, Hash)]
pub enum KnowledgeSubskill {
    Arcana,
    Dungeoneering,
    Engineering,
    Items,
    Local,
    Nature,
    Planes,
    Religion,
}

impl KnowledgeSubskill {
    pub fn all() -> Vec<KnowledgeSubskill> {
        vec![
            KnowledgeSubskill::Arcana,
            KnowledgeSubskill::Dungeoneering,
            KnowledgeSubskill::Engineering,
            KnowledgeSubskill::Items,
            KnowledgeSubskill::Local,
            KnowledgeSubskill::Nature,
            KnowledgeSubskill::Planes,
            KnowledgeSubskill::Religion,
        ]
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Arcana => "arcana",
            Self::Dungeoneering => "dungeoneering",
            Self::Engineering => "engineering",
            Self::Items => "items",
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
            Self::Other => "other",
            Self::Senses => "senses",
            Self::Social => "social",
        }
    }
}

pub trait HasSkills {
    fn is_skill_trained(&self, skill: &Skill) -> bool;
    fn set_skill_trained(&mut self, skill: Skill, is_trained: bool);
    fn calc_skill_modifier(&self, skill: &Skill) -> i32;
    fn calc_jump_distance(&self) -> i32;
}

impl HasSkills for Creature
where
    Creature: HasAttributes + HasArmor + HasModifiers,
{
    fn set_skill_trained(&mut self, skill: Skill, trained: bool) {
        if self.skill_training.is_none() {
            self.skill_training = Some(HashMap::new());
        }
        let skill_training = &mut self.skill_training.as_mut().unwrap();
        skill_training.insert(skill, trained);
    }

    fn is_skill_trained(&self, skill: &Skill) -> bool {
        if let Some(ref skill_training) = self.skill_training {
            if let Some(p) = skill_training.get(skill) {
                *p
            } else {
                false
            }
        } else {
            false
        }
    }

    fn calc_skill_modifier(&self, skill: &Skill) -> i32 {
        let attribute_modifier = if let Some(ref a) = skill.attribute() {
            self.get_base_attribute(a)
        } else {
            0
        };
        let training_modifier = if self.is_skill_trained(skill) {
            3 + self.level / 2
        } else {
            0
        };
        let encumbrance_modifier = if skill.apply_encumbrance() {
            self.calc_encumbrance()
        } else {
            0
        };

        attribute_modifier + training_modifier - encumbrance_modifier
            + self.calc_total_modifier(ModifierType::Skill(skill.clone()))
    }

    // TODO: handle custom jump distance modifiers
    fn calc_jump_distance(&self) -> i32 {
        // Round down to the next 5 foot increment
        let base_speed_modifier = ((self.size.base_speed() / 4) / 5) * 5;

        let strength_modifier = if self.is_skill_trained(&Skill::Jump) {
            max(5, self.get_base_attribute(&Attribute::Strength) * 5)
        } else {
            (self.get_base_attribute(&Attribute::Strength) / 2) * 5
        };

        return max(0, base_speed_modifier + strength_modifier);
    }
}
