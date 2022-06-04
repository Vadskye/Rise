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
    Animated,
    ConditionAvoidance(i32),
    ConditionRemoval(i32),
    TwoActions,
    ThreeActions,
    Undead,
}

impl StandardPassiveAbility {
    pub fn ability(&self) -> PassiveAbility {
        match self {
            Self::Amphibious => PassiveAbility {
                description: "The $name can hold its breath for ten times the normal length of time.".to_string(),
                is_magical: false,
                name: "Amphibious".to_string(),
            },
            Self::Animated => PassiveAbility {
                description: r"
                  The $name is both an object and a creature.
                  It is always considered to be \glossterm{attended} by itself.
                ".to_string(),
                is_magical: false,
                name: "Animated".to_string(),
            },
            Self::ConditionAvoidance(count) => {
                // No way to gain triple condition avoidance right now
                let first_condition = if *count == 1 {r"first \glossterm{condition}" } else { r"first two \glossterm{conditions}" };
                return PassiveAbility {
                    description: format!("The $name is immune to the {} it would gain.", first_condition),
                    is_magical: false,
                    name: "Condition Avoidance".to_string(),
                };
            },
            Self::ConditionRemoval(count) => {
                // No way to gain triple condition avoidance right now
                let conditions = if *count == 1 {r"one old \glossterm{condition}" } else { r"two old \glossterm{conditions}" };
                return PassiveAbility {
                    description: format!("The $name removes {} at the end of each round.", conditions),
                    is_magical: false,
                    name: "Condition Removal".to_string(),
                };
            },
            Self::ThreeActions => PassiveAbility {
                description: "The $name can take three standard actions each round. It cannot use the same ability or weapon twice in the same round.".to_string(),
                is_magical: false,
                name: "Multiple Actions".to_string(),
            },
            Self::TwoActions => PassiveAbility {
                description: "The $name can take two standard actions each round. It cannot use the same ability or weapon twice in the same round.".to_string(),
                is_magical: false,
                name: "Multiple Actions".to_string(),
            },
            Self::Undead => PassiveAbility {
                description: r"
                  The $name is \trait{undead} instead of \glossterm{living}, and it is affected in a special way by healing effects (see \pcref{Undead})).
                ".to_string(),
                is_magical: false,
                name: "Undead".to_string(),
            },
        }
    }
}
