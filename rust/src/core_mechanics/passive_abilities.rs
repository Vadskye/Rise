#[derive(Clone)]
pub struct PassiveAbility {
    pub description: String,
    pub is_magical: bool,
    pub name: String,
}

impl PassiveAbility {
    pub fn to_latex(&self) -> String {
        return format!(
            "
                \\parhead<{name}>{magical} {description}
            ",
            description = self.description,
            magical = if self.is_magical {
                "[\\glossterm<Magical>]"
            } else {
                ""
            },
            name = self.name,
        );
    }
}

pub enum StandardPassiveAbility {
    Amphibious,
    TwoActions,
    ThreeActions,
}

impl StandardPassiveAbility {
    pub fn ability(&self) -> PassiveAbility {
        match self {
            Self::Amphibious => PassiveAbility {
                description: "The $name can hold its breath for ten times the normal length of time.".to_string(),
                is_magical: false,
                name: "Amphibious".to_string(),
            },
            Self::ThreeActions => PassiveAbility {
                description: "The $name can take three standard actions each round. It cannot use the same ability twice in the same round.".to_string(),
                is_magical: false,
                name: "Multiple Actions".to_string(),
            },
            Self::TwoActions => PassiveAbility {
                description: "The $name can take two standard actions each round. It cannot use the same ability twice in the same round.".to_string(),
                is_magical: false,
                name: "Multiple Actions".to_string(),
            },
        }
    }
}
