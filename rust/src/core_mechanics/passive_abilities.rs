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
    TwoActions,
}

impl StandardPassiveAbility {
    pub fn ability(&self) -> PassiveAbility {
        match self {
            Self::TwoActions => PassiveAbility {
                description: "The $name can take two standard actions each round. It cannot use the same ability twice in the same round.".to_string(),
                is_magical: false,
                name: "Multiple Actions".to_string(),
            },
        }
    }
}
