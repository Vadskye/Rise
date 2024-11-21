use crate::core_mechanics::{Attribute, Debuff, HasSize};
use crate::creatures::{Creature, CreatureCategory, HasModifiers, Modifier, ModifierType};
use crate::equipment::{HasArmor, WeaponMaterial};
use std::fmt;

use super::abilities::AbilityTag;
use super::HasAttributes;

#[derive(Clone, Copy, Debug, PartialEq)]
pub enum Defense {
    Armor,
    Fortitude,
    Mental,
    Reflex,
}

impl Defense {
    pub fn all() -> Vec<Self> {
        vec![Self::Armor, Self::Fortitude, Self::Mental, Self::Reflex]
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Armor => "armor",
            Self::Fortitude => "fortitude",
            Self::Mental => "mental",
            Self::Reflex => "reflex",
        }
    }

    pub fn title(&self) -> &str {
        match self {
            Self::Armor => "Armor",
            Self::Fortitude => "Fortitude",
            Self::Mental => "Mental",
            Self::Reflex => "Reflex",
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

#[derive(Clone, Debug)]
pub enum SpecialDefenseType {
    AllDamage,
    AbilityTag(AbilityTag),
    Debuff(Debuff),
    Disease,
    CriticalHits,
    Magical,
    Mundane,
    Poison,
    WeaponMaterial(WeaponMaterial),
}

pub struct SpecialDefenses {
    pub immune: Vec<SpecialDefenseType>,
    pub impervious: Vec<SpecialDefenseType>,
    pub vulnerable: Vec<SpecialDefenseType>,
}

impl SpecialDefenses {
    pub fn new() -> Self {
        Self {
            immune: vec![],
            impervious: vec![],
            vulnerable: vec![],
        }
    }
}

impl SpecialDefenseType {
    pub fn description(&self) -> String {
        match self {
            Self::AllDamage => "damaging attacks".to_string(),
            Self::AbilityTag(tag) => tag.latex(),
            Self::Debuff(debuff) => debuff.name().to_string(),
            Self::Disease => "disease".to_string(),
            Self::CriticalHits => "critical hits".to_string(),
            Self::Magical => r"\magical attacks".to_string(),
            Self::Mundane => "mundane attacks".to_string(),
            Self::Poison => "poison".to_string(),
            Self::WeaponMaterial(material) => format!("{} weapons", material.name()),
        }
    }
}

pub trait HasDefenses {
    fn calc_defense(&self, defense: &Defense) -> i32;
    fn calc_defense_modifier_attribute(&self, defense: &Defense) -> i32;
    fn calc_defense_modifier_armor(&self, defense: &Defense) -> i32;
    fn calc_defense_modifier_size(&self, defense: &Defense) -> i32;
    fn explain_defense(&self, defense: &Defense) -> String;
    fn calc_special_defenses(&self) -> SpecialDefenses;
}

impl HasDefenses for Creature
where
    Creature: HasModifiers + HasArmor + HasAttributes + HasSize,
{
    fn calc_defense_modifier_attribute(&self, defense: &Defense) -> i32 {
        let dex_multiplier: f64 = match self.category {
            CreatureCategory::Character => {
                if let Some(modifier) = self.minimum_dex_modifier() {
                    modifier
                } else {
                    1.0
                }
            }
            CreatureCategory::Monster(_, role) => role.armor_dex_multiplier(),
        };
        let armor_attribute_modifier =
            (self.get_base_attribute(&Attribute::Dexterity) as f64 * dex_multiplier).floor() as i32;

        match defense {
            Defense::Armor => armor_attribute_modifier,
            Defense::Fortitude => self.get_base_attribute(&Attribute::Constitution),
            Defense::Reflex => self.get_base_attribute(&Attribute::Dexterity),
            Defense::Mental => self.get_base_attribute(&Attribute::Willpower),
        }
    }

    fn calc_defense_modifier_armor(&self, defense: &Defense) -> i32 {
        if defense.include_armor_bonus() {
            self.get_armor().iter().map(|a| a.defense()).sum()
        } else {
            0
        }
    }

    fn calc_defense_modifier_size(&self, defense: &Defense) -> i32 {
        if matches!(defense, Defense::Reflex) {
            self.get_size().reflex_modifier()
        } else {
            0
        }
    }

    fn calc_defense(&self, defense: &Defense) -> i32 {
        if defense == &Defense::Mental && self.is_mindless() {
            return self.calc_defense(&Defense::Fortitude);
        }

        let base_defense = if defense == &Defense::Armor { 0 } else { 3 };

        base_defense
            + self.level / 2
            + self.calc_defense_modifier_attribute(defense)
            + self.calc_defense_modifier_armor(defense)
            + self.calc_defense_modifier_size(defense)
            + self.calc_total_modifier(ModifierType::Defense(*defense))
            + self.calc_total_modifier(ModifierType::AllDefenses)
    }

    fn explain_defense(&self, defense: &Defense) -> String {
        if defense == &Defense::Mental && self.is_mindless() {
            return self.explain_defense(&Defense::Fortitude);
        }

        let mut modifiers = self.get_modifiers_by_type(ModifierType::Defense(*defense));
        modifiers.append(&mut self.get_modifiers_by_type(ModifierType::AllDefenses));

        fn explain_component(val: i32, label: &str) -> String {
            if val > 0 {
                format!(" + ({val} {label})")
            } else {
                "".to_string()
            }
        }

        format!(
            "{total} = ({level} level){attribute}{armor}{size} + {modifiers}",
            total = self.calc_defense(defense),
            level = self.level / 2,
            attribute =
                explain_component(self.calc_defense_modifier_attribute(defense), "Attribute"),
            armor = explain_component(self.calc_defense_modifier_armor(defense), "Armor"),
            size = explain_component(self.calc_defense_modifier_size(defense), "Size"),
            modifiers = modifiers
                .iter()
                .map(|m| m.description())
                .collect::<Vec<String>>()
                .join(" + "),
        )
    }

    fn calc_special_defenses(&self) -> SpecialDefenses {
        let mut special_defenses = SpecialDefenses::new();
        for modifier in self.get_modifiers_by_type(ModifierType::SpecialDefense) {
            if let Modifier::Immune(def) = modifier {
                special_defenses.immune.push(def.clone());
            } else if let Modifier::Impervious(def) = modifier {
                special_defenses.impervious.push(def.clone());
            } else if let Modifier::Vulnerable(def) = modifier {
                special_defenses.vulnerable.push(def.clone());
            }
        }
        special_defenses
    }
}
