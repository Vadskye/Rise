use crate::core_mechanics::{Attribute, DamageType, Debuff};
use crate::creatures::{Creature, CreatureCategory, HasModifiers, ModifierType};
use crate::equipment::{HasArmor, WeaponMaterial};
use std::fmt;

use super::HasAttributes;

#[derive(Clone, Copy, PartialEq)]
pub enum Defense {
    Armor,
    Fortitude,
    Mental,
    Reflex,
}

impl Defense {
    pub fn all() -> Vec<Self> {
        return vec![Self::Armor, Self::Fortitude, Self::Mental, Self::Reflex];
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Armor => "armor",
            Self::Fortitude => "fortitude",
            Self::Mental => "mental",
            Self::Reflex => "reflex",
        }
    }

    pub fn shorthand_name(&self) -> &str {
        match self {
            Self::Armor => "AD",
            Self::Fortitude => "Fort",
            Self::Mental => "Ment",
            Self::Reflex => "Ref",
        }
    }

    pub fn associated_attribute(&self) -> Option<Attribute> {
        match self {
            // Armor has a more complicated calculation
            Self::Armor => None,
            Self::Fortitude => Some(Attribute::Constitution),
            Self::Mental => Some(Attribute::Willpower),
            Self::Reflex => Some(Attribute::Dexterity),
        }
    }

    pub fn include_armor_bonus(&self) -> bool {
        match self {
            Self::Armor => true,
            _ => false,
        }
    }
}

impl fmt::Display for Defense {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name())
    }
}

#[derive(Clone)]
pub enum SpecialDefenseModifier {
    Immune(SpecialDefenseType),
    Impervious(SpecialDefenseType),
    Vulnerable(SpecialDefenseType),
}

#[derive(Clone)]
pub enum SpecialDefenseType {
    Damage(DamageType),
    Debuff(Debuff),
    CriticalHits,
    WeaponMaterial(WeaponMaterial),
}

impl SpecialDefenseModifier {
    pub fn immune_damage(damage_type: DamageType) -> Self {
        return Self::Immune(SpecialDefenseType::Damage(damage_type));
    }

    pub fn impervious_damage(damage_type: DamageType) -> Self {
        return Self::Impervious(SpecialDefenseType::Damage(damage_type));
    }

    pub fn vulnerable_damage(damage_type: DamageType) -> Self {
        return Self::Vulnerable(SpecialDefenseType::Damage(damage_type));
    }

    pub fn immune_debuff(debuff: Debuff) -> Self {
        return Self::Immune(SpecialDefenseType::Debuff(debuff));
    }

    pub fn impervious_debuff(debuff: Debuff) -> Self {
        return Self::Impervious(SpecialDefenseType::Debuff(debuff));
    }

    pub fn vulnerable_debuff(debuff: Debuff) -> Self {
        return Self::Vulnerable(SpecialDefenseType::Debuff(debuff));
    }

    pub fn description(&self) -> String {
        match self {
            Self::Immune(t) => format!("immune to {}", t.description()),
            Self::Impervious(t) => format!("impervious to {}", t.description()),
            Self::Vulnerable(t) => format!("vulnerable to {}", t.description()),
        }
    }
}

impl SpecialDefenseType {
    pub fn description(&self) -> String {
        match self {
            Self::Damage(damage_type) => format!("{} damage", damage_type.name()),
            Self::Debuff(debuff) => debuff.name().to_string(),
            Self::CriticalHits => "critical hits".to_string(),
            Self::WeaponMaterial(material) => format!("{} weapons", material.name()),
        }
    }
}

pub trait HasDefenses {
    fn calc_defense(&self, defense: &Defense) -> i32;
}

impl HasDefenses for Creature
where
    Creature: HasModifiers + HasArmor + HasAttributes,
{
    fn calc_defense(&self, defense: &Defense) -> i32 {
        let dex_multiplier: f64 = match self.category {
            CreatureCategory::Character => {
                if let Some(modifier) = self.minimum_dex_modifier() {
                    modifier
                } else {
                    1.0
                }
            }
            CreatureCategory::Monster(_) => 0.5,
        };
        let attribute_bonus = match defense {
            // TODO: check for light armor
            Defense::Armor => {
                self.get_base_attribute(&Attribute::Constitution) / 2
                    + (self.get_base_attribute(&Attribute::Dexterity) as f64 * dex_multiplier)
                        .floor() as i32
            }
            Defense::Fortitude => self.get_base_attribute(&Attribute::Constitution),
            Defense::Reflex => self.get_base_attribute(&Attribute::Dexterity),
            Defense::Mental => self.get_base_attribute(&Attribute::Willpower),
        };
        let armor_bonus = if defense.include_armor_bonus() {
            self.get_armor().iter().map(|a| a.defense()).sum()
        } else {
            0
        };
        return self.level / 2
            + attribute_bonus
            + armor_bonus
            + self.calc_total_modifier(ModifierType::Defense(*defense));
    }
}
