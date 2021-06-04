pub trait HasResources {
    fn calc_resource(&self, resource: &'static Resource) -> i8;
}

pub enum Resource {
    AttunementPoint,
    FatigueTolerance,
    InsightPoint,
    SkillPoint,
}

pub static AP: &Resource = &Resource::AttunementPoint;
pub static FT: &Resource = &Resource::FatigueTolerance;
pub static IP: &Resource = &Resource::InsightPoint;
pub static SP: &Resource = &Resource::SkillPoint;

impl Resource {
    pub fn name(&self) -> &str {
        match self {
            Self::AttunementPoint => "attunement point",
            Self::FatigueTolerance => "fatigue tolerance",
            Self::InsightPoint => "insight point",
            Self::SkillPoint => "skill point",
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
