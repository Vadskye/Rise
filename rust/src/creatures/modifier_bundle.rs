use crate::core_mechanics::{
    abilities::AbilityTag, Attribute, Debuff, MovementMode, PassiveAbility, SpecialDefenseType,
};
use crate::equipment::WeaponMaterial;
use crate::skills::Skill;

use super::Modifier;

pub enum ModifierBundle {
    Amorphous,
    Incorporeal,
    Intangible,
    Legless,
    Lifeless,
    Mindless,
    Multipedal,
    Planeforged,
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
                Modifier::Immune(SpecialDefenseType::Mundane),
                Modifier::Immune(SpecialDefenseType::AbilityTag(AbilityTag::Brawling)),
                Modifier::Vulnerable(SpecialDefenseType::WeaponMaterial(WeaponMaterial::Silver)),
                Modifier::PassiveAbility(PassiveAbility {
                    description: r"
                      The $name is \trait{incorporeal} (see \pcref{Incorporeal}).
                      It does not have a physical body, can enter or pass through solid objects.
                    ".to_string(),
                    is_magical: false,
                    name: "Incorporeal".to_string(),
                }),
            ],
            Self::Intangible => vec![
                Modifier::Immune(SpecialDefenseType::Mundane),
                Modifier::Immune(SpecialDefenseType::AbilityTag(AbilityTag::Brawling)),
                Modifier::PassiveAbility(PassiveAbility {
                    description: r"
                      The $name is \trait{intangible} (see \pcref{Intangible}).
                      It cannot be touched or interacted with physically.
                    ".to_string(),
                    is_magical: false,
                    name: "Incorporeal".to_string(),
                }),
            ],
            // TODO: mark as unable to jump
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
                Modifier::Attribute(Attribute::Intelligence, -99),
                Modifier::Attribute(Attribute::Willpower, -99),
                Modifier::PassiveAbility(PassiveAbility::mindless()),
                Modifier::Mindless,
            ],
            Self::Multipedal => vec![
                Modifier::MovementSpeed(MovementMode::Land, 10),
                Modifier::Skill(Skill::Balance, 5),
            ],
            Self::Planeforged => vec![
                Modifier::PassiveAbility(PassiveAbility::planeforged()),
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
                Modifier::PassiveAbility(PassiveAbility::simple_minded()),
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
