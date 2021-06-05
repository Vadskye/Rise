use crate::core_mechanics::attributes::Attribute;
use titlecase::titlecase;
// use itertools::Itertools;
use std::fmt;
use std::cmp::PartialEq;

pub trait HasSkills {
    fn get_skill_points(&self, skill: &Skill) -> i8;
    fn set_skill_points(&mut self, skill: Skill, value: i8);
    fn calc_skill_modifier(&self, skill: &Skill) -> i8;
}

#[derive(Eq, Hash)]
pub enum Skill {
    Agility,
    Awareness,
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

impl Skill {
    pub fn attribute(&self) -> Option<Attribute> {
        match self {
            Self::Agility => Some(Attribute::Dexterity),
            Self::Awareness => Some(Attribute::Perception),
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

    pub fn name(&self) -> &str {
        match self {
            Self::Agility => "agility",
            Self::Awareness => "awareness",
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
                    let subskill_names: Vec<&str> = subskills.iter().map(|subskill| subskill.name()).collect();
                    return format!(
                        "Knowledge ({})",
                        subskill_names.join(", ")
                    );
                }
            },
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

#[derive(Eq, Hash)]
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
