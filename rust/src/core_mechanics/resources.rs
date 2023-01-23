use crate::core_mechanics::{Attribute, HasAttributes};
use crate::creatures::{Creature, HasModifiers, ModifierType};

#[derive(Clone, Copy, Debug, PartialEq)]
pub enum Resource {
    AttunementPoint,
    FatigueTolerance,
    InsightPoint,
    TrainedSkill,
}

impl Resource {
    pub fn all() -> Vec<Self> {
        return vec![
            Self::AttunementPoint,
            Self::FatigueTolerance,
            Self::InsightPoint,
            Self::TrainedSkill,
        ];
    }

    pub fn name(&self) -> &str {
        match self {
            Self::AttunementPoint => "attunement point",
            Self::FatigueTolerance => "fatigue tolerance",
            Self::InsightPoint => "insight point",
            Self::TrainedSkill => "trained skill",
        }
    }

    // This is less useful than the equivalent function for defenses since the number of relevant
    // attributes ranges from 0 to 2 and is not simply added directly.
    // pub fn associated_attributes(&self) -> Vec<&attributes::Attribute> {
    //     match self {
    //         Self::AttunementPoint => vec![],
    //         Self::Fatigue => vec![attributes::CON, attributes::WIL],
    //         Self::HitPoint => vec![attributes::CON],
    //         Self::InsightPoint => vec![attributes::INT],
    //         Self::SkillPoint => vec![attributes::INT],
    //     }
    // }
}

pub trait HasResources {
    fn calc_resource(&self, resource: &Resource) -> i32;
}

impl HasResources for Creature
where
    Creature: HasModifiers,
{
    fn calc_resource(&self, resource: &Resource) -> i32 {
        let value = match resource {
            // Attunement points come exclusively from base class and some abilities
            Resource::AttunementPoint => 0,
            Resource::FatigueTolerance => {
                self.get_base_attribute(&Attribute::Constitution)
                    + (self.get_base_attribute(&Attribute::Willpower) / 2)
            }
            Resource::InsightPoint => self.get_base_attribute(&Attribute::Intelligence),
            Resource::TrainedSkill => self.get_base_attribute(&Attribute::Intelligence),
        };
        return value + self.calc_total_modifier(ModifierType::Resource(*resource));
    }
}
