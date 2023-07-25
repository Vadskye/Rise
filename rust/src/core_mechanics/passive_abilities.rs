// TODO: move this under the "abilities" folder

#[derive(Clone, Debug)]
pub struct PassiveAbility {
    pub description: String,
    pub is_magical: bool,
    pub name: String,
}

impl PassiveAbility {
    pub fn to_latex(&self) -> String {
        format!(
            "
                \\parhead<{name}>{magical} {description}
            ",
            description = self.description,
            magical = if self.is_magical { "[\\sparkle]" } else { "" },
            name = self.name,
        )
    }

    pub fn sightless() -> Self {
        StandardPassiveAbility::Sightless.ability()
    }
    pub fn undead() -> Self {
        StandardPassiveAbility::Undead.ability()
    }
}

// TODO: replace this system with static functions on PassiveAbility
pub enum StandardPassiveAbility {
    Amphibious,
    Animated,
    ConditionRemoval(i32),
    EliteActions,
    Sightless,
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
            Self::ConditionRemoval(count) => {
                // This count handling is stupid
                let conditions = if *count == 3 {r"three or more \glossterm{conditions}" } else { r"four or more \glossterm{conditions}" };
                PassiveAbility {
                    description: format!("At the end of each round, if the $name has {}, it removes its oldest condition.", conditions),
                    is_magical: false,
                    name: "Condition Removal".to_string(),
                }
            },
            Self::EliteActions => PassiveAbility {
                description: r"The $name can use an additional \abilitytag{Elite} ability each round.".to_string(),
                is_magical: false,
                name: "Elite Actions".to_string(),
            },
            Self::Sightless => PassiveAbility {
                description: r"The $name cannot see normally. If it has no relevant special vision abilities, it is \blinded.".to_string(),
                is_magical: false,
                name: "Sightless".to_string(),
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
