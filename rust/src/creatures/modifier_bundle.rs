use crate::core_mechanics::{
    abilities::AbilityTag, DamageType, Debuff, MovementMode, PassiveAbility, SpecialDefenseType,
};
use crate::skills::Skill;

use super::Modifier;

pub enum ModifierBundle {
    Amorphous,
    Incorporeal,
    Legless,
    Lifeless,
    Mindless,
    Multipedal,
    Sightless,
    SimpleMinded,
    SimpleMindedConstruct,
    Undead,
}

impl ModifierBundle {
    pub fn plus_modifiers(&self, extra_modifiers: Vec<Modifier>) -> Vec<Modifier> {
        let mut modifiers = self.modifiers();
        modifiers.append(&mut extra_modifiers.clone());
        modifiers
    }

    pub fn modifiers(&self) -> Vec<Modifier> {
        match self {
            Self::Amorphous => vec![
                Modifier::Immune(SpecialDefenseType::CriticalHits),
                Modifier::Immune(SpecialDefenseType::Debuff(Debuff::Squeezing)),
                Modifier::Skill(Skill::Flexibility, 10),
                Modifier::PassiveAbility(PassiveAbility {
                    description: r"
                      The $name has an amorphous body without normal internal organs.
                      It is immune to critical hits and suffers no penalties for \squeezing.
                      In addition, it gains a +10 bonus to the Flexibility skill.
                    ".to_string(),
                    is_magical: false,
                    name: "Amorphous".to_string(),
                }),
            ],
            Self::Incorporeal => vec![
                Modifier::Immune(SpecialDefenseType::Damage(DamageType::Physical)),
                Modifier::PassiveAbility(PassiveAbility {
                    description: r"
                      The $name is \trait{incorporeal} (see \pcref{Incorporeal}).
                      It does not have a tangible body, and is immune to \glossterm{physical damage}.
                      It can enter or pass through solid objects.
                    ".to_string(),
                    is_magical: false,
                    name: "Incorporeal".to_string(),
                }),
            ],
            Self::Legless => vec![
                Modifier::Immune(SpecialDefenseType::Debuff(Debuff::Prone)),
                // Don't give this a named callout, because "legless" is an awkward name and it
                // only has one effect.
            ],
            Self::Lifeless => vec![
                // No named ability, since this is often used by other abilities which provide a
                // more explicit reason for being lifeless, such as "undead" or "construct".
                Modifier::Immune(SpecialDefenseType::Disease),
                Modifier::Immune(SpecialDefenseType::Poison),
            ],
            Self::Mindless => vec![
                Modifier::Immune(SpecialDefenseType::AbilityTag(AbilityTag::Compulsion)),
                Modifier::Immune(SpecialDefenseType::AbilityTag(AbilityTag::Emotion)),
                Modifier::Immune(SpecialDefenseType::Damage(DamageType::Psychic)),
                Modifier::PassiveAbility(PassiveAbility {
                    description: r"
                      The $name has no mind.
                      It is immune to psychic damage and \abilitytag{Compulsion} and \abilitytag{Emotion} abilities.
                    ".to_string(),
                    is_magical: false,
                    name: "Mindless".to_string(),
                }),
            ],
            Self::Multipedal => vec![
                Modifier::MovementSpeed(MovementMode::Land, 10),
                Modifier::Skill(Skill::Balance, 5),
            ],
            Self::Sightless => vec![
                Modifier::PassiveAbility(PassiveAbility {
                    description: r"The $name cannot see normally. If it has no relevant special vision abilities, it is \blinded.".to_string(),
                    is_magical: false,
                    name: "Sightless".to_string(),
                }),
                Modifier::Immune(SpecialDefenseType::AbilityTag(AbilityTag::Visual)),
            ],
            Self::SimpleMinded => vec![
                Modifier::Vulnerable(SpecialDefenseType::AbilityTag(AbilityTag::Compulsion)),
                Modifier::Immune(SpecialDefenseType::AbilityTag(AbilityTag::Emotion)),
                Modifier::Immune(SpecialDefenseType::Damage(DamageType::Psychic)),
                Modifier::PassiveAbility(PassiveAbility {
                    description: r"
                      The $name can follow simple instructions, but is not fully \glossterm{sentient} or capable of complex reasoning.
                      It is immune to \abilitytag{Emotion} abilities and psychic damage.
                      However, it is \vulnerable to \abilitytag{Compulsion} attacks.
                    ".to_string(),
                    is_magical: false,
                    name: "Simple-Minded".to_string(),
                }),
            ],
            Self::SimpleMindedConstruct => Self::SimpleMinded.plus_modifiers(vec![
                Modifier::PassiveAbility(PassiveAbility::construct()),
            ].into_iter().chain(Self::Lifeless.modifiers()).collect()),
            Self::Undead => Self::Lifeless.plus_modifiers(vec![
                Modifier::PassiveAbility(PassiveAbility::undead()),
            ]),
        }
    }
}
