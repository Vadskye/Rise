pub trait HasResources {
    fn calc_resource(&self, resource: &Resource) -> i32;
}

#[derive(Clone, Copy, PartialEq)]
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
