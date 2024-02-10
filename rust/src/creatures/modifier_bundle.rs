use crate::core_mechanics::{
    abilities::AbilityTag, DamageType, Debuff, MovementMode, PassiveAbility, SpecialDefenseType,
};
use crate::skills::Skill;

use super::Modifier;

pub enum ModifierBundle {
    Amorphous,
    Incorporeal,
    Legless,
    Mindless,
    MindlessConstruct,
    Multipedal,
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
            Self::Mindless => vec![
                Modifier::Immune(SpecialDefenseType::AbilityTag(AbilityTag::Compulsion)),
                Modifier::Immune(SpecialDefenseType::AbilityTag(AbilityTag::Emotion)),
                Modifier::PassiveAbility(PassiveAbility {
                    description: r"
                      The $name is not \glossterm{sentient}.
                      It is immune to \abilitytag{Compulsion} and \abilitytag{Emotion} attacks.
                      Its Intelligence attribute represents its capacity for complex action according to instinct, instructions, or some other source, rather than true intelligence.
                    ".to_string(),
                    is_magical: false,
                    name: "Mindless".to_string(),
                }),
            ],
            Self::MindlessConstruct => Self::Mindless.plus_modifiers(vec![
                Modifier::PassiveAbility(PassiveAbility::construct()),
                Modifier::Immune(SpecialDefenseType::Poison),
            ]),
            Self::Multipedal => vec![
                Modifier::MovementSpeed(MovementMode::Land, 10),
                Modifier::Skill(Skill::Balance, 5),
            ],
            Self::Undead => vec![
                Modifier::PassiveAbility(PassiveAbility::undead()),
                Modifier::Immune(SpecialDefenseType::Poison),
            ],
        }
    }
}
