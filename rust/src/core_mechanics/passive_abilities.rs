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
                \\parhead<{name}{magical}> {description}
            ",
            description = self.description,
            magical = if self.is_magical { "\\sparkle" } else { "" },
            name = self.name,
        )
    }

    pub fn construct() -> Self {
        StandardPassiveAbility::Construct.ability()
    }

    pub fn floating() -> Self {
        Self {
            description: r"
                The $name does not fall while in midair.
            "
            .to_string(),
            is_magical: true,
            name: "Floating".to_string(),
        }
    }

    pub fn indwelt() -> Self {
        StandardPassiveAbility::Indwelt.ability()
    }

    pub fn mindless() -> Self {
        StandardPassiveAbility::Mindless.ability()
    }

    pub fn planeforged() -> Self {
        StandardPassiveAbility::Planeforged.ability()
    }

    pub fn simple_minded() -> Self {
        StandardPassiveAbility::SimpleMinded.ability()
    }

    pub fn soulless() -> Self {
        StandardPassiveAbility::Soulless.ability()
    }

    pub fn undead() -> Self {
        StandardPassiveAbility::Undead.ability()
    }
}

// TODO: replace this system with static functions on PassiveAbility
pub enum StandardPassiveAbility {
    Amphibious,
    Construct,
    ConditionRemoval,
    EliteActions,
    Indwelt,
    Mindless,
    Planeforged,
    SimpleMinded,
    Soulless,
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
            Self::Construct => PassiveAbility {
                description: r"
                  The $name is both an object and a non-living creature.
                  For details, see \pcref{Constructs}.
                ".to_string(),
                is_magical: false,
                name: "Construct".to_string(),
            },
            Self::ConditionRemoval => PassiveAbility {
                description: r"The $name can remove conditions at the end of each round (see \pcref{Monster Conditions}).".to_string(),
                is_magical: false,
                name: "Condition Removal".to_string(),
            },
            Self::EliteActions => PassiveAbility {
                description: r"The $name can use an additional \abilitytag{Elite} ability each round.".to_string(),
                is_magical: false,
                name: "Elite Actions".to_string(),
            },
            Self::Indwelt => PassiveAbility {
                description: r"
                  The $name is a \trait{indwelt}, making it both an object and a living creature (see \pcref{Indwelt}).
                ".to_string(),
                is_magical: false,
                name: "Indwelt".to_string(),
            },
            Self::Mindless => PassiveAbility {
                description: r"
                  The $name is \trait{mindless}.
                ".to_string(),
                is_magical: false,
                name: "Mindless".to_string(),
            },
            Self::Planeforged => PassiveAbility {
                description: r"
                  The $name has a body made of concentrated planar essence, and is not alive.
                ".to_string(),
                is_magical: false,
                name: "Planeforged".to_string(),
            },
            Self::SimpleMinded => PassiveAbility {
                description: r"
                  The $name can follow simple instructions, but is not fully \glossterm{sentient} or capable of complex reasoning.
                  It has no soul, so if it dies, it cannot be resurrected.
                  It is immune to \abilitytag{Emotion} abilities.
                  However, it is \vulnerable to \abilitytag{Compulsion} attacks.
                ".to_string(),
                is_magical: false,
                name: "Simple-Minded".to_string(),
            },
            Self::Soulless => PassiveAbility {
                description: r"
                  The $name has no soul.
                  If it dies, it cannot be resurrected.
                ".to_string(),
                is_magical: false,
                name: "Soulless".to_string(),
            },
            Self::Undead => PassiveAbility {
                description: r"
                  The $name is \trait{undead} instead of living, and it takes damage from most healing effects (see \pcref{Undead})).
                ".to_string(),
                is_magical: false,
                name: "Undead".to_string(),
            },
        }
    }
}
