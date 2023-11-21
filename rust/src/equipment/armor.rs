use crate::core_mechanics::{Attribute, HasAttributes};
use crate::creatures::{Creature, HasModifiers, ModifierType};
use std::{cmp::max, fmt};

#[derive(Clone, Debug)]
pub enum Armor {
    // Light armor
    Leather(Option<ArmorMaterial>),
    StuddedLeather(Option<ArmorMaterial>),
    ChainShirt(Option<ArmorMaterial>),
    Buckler,

    // Medium armor
    Hide(Option<ArmorMaterial>),
    ScaleMail(Option<ArmorMaterial>),
    Breastplate(Option<ArmorMaterial>),
    StandardShield,

    // Heavy armor
    LayeredHide(Option<ArmorMaterial>),
    PlatedMail(Option<ArmorMaterial>),
    FullPlate(Option<ArmorMaterial>),
    TowerShield,
}

#[derive(Clone, Debug)]
pub enum ArmorMaterial {
    Adamantine,
    PureAdamantine,
    ColdIron,
    PureColdIron,
    Diamondsteel,
    PureDiamondsteel,
    Dragonhide(String),
    AncientDragonhide(String),
    Dragonscale(String),
    AncientDragonscale(String),
    Elvenweave,
    PureElvenweave,
    Magic(i32),
    Mithral,
    PureMithral,
    Normal,
    Starmetal,
    PureStarmetal,
}

struct ArmorMaterialDefinition {
    dr_multiplier: f64,
    encumbrance_modifier: i32,
    item_rank: i32,
    name: String,
}

impl ArmorMaterial {
    fn definition(&self) -> ArmorMaterialDefinition {
        match self {
            Self::Normal => ArmorMaterialDefinition {
                dr_multiplier: 1.0,
                encumbrance_modifier: 0,
                name: "normal".to_string(),
                item_rank: 0,
            },
            Self::Magic(rank) => ArmorMaterialDefinition {
                dr_multiplier: match rank {
                    3 => 2.0,
                    4 => 3.0,
                    5 => 4.0,
                    6 => 6.0,
                    7 => 8.0,
                    8 => 12.0,
                    _ => 1.0,
                },
                encumbrance_modifier: 0,
                name: "magic".to_string(),
                item_rank: 0,
            },
            Self::Adamantine => ArmorMaterialDefinition {
                dr_multiplier: 6.0,
                encumbrance_modifier: 2,
                name: "adamantine".to_string(),
                item_rank: 5,
            },
            Self::PureAdamantine => ArmorMaterialDefinition {
                dr_multiplier: 12.0,
                encumbrance_modifier: 2,
                name: "pure adamantine".to_string(),
                item_rank: 7,
            },
            Self::ColdIron => ArmorMaterialDefinition {
                dr_multiplier: 1.0,
                encumbrance_modifier: 0,
                name: "cold iron".to_string(),
                item_rank: 2,
            },
            Self::PureColdIron => ArmorMaterialDefinition {
                dr_multiplier: 2.0,
                encumbrance_modifier: 0,
                name: "pure cold iron".to_string(),
                item_rank: 4,
            },
            Self::Diamondsteel => ArmorMaterialDefinition {
                dr_multiplier: 2.0,
                encumbrance_modifier: 0,
                name: "diamondsteel".to_string(),
                item_rank: 3,
            },
            Self::PureDiamondsteel => ArmorMaterialDefinition {
                dr_multiplier: 4.0,
                encumbrance_modifier: 0,
                name: "pure diamondsteel".to_string(),
                item_rank: 5,
            },
            Self::Dragonhide(t) => ArmorMaterialDefinition {
                dr_multiplier: 3.0,
                encumbrance_modifier: 0,
                name: format!("{} dragonhide", t),
                item_rank: 4,
            },
            Self::AncientDragonhide(t) => ArmorMaterialDefinition {
                dr_multiplier: 6.0,
                encumbrance_modifier: 0,
                name: format!("pure {} dragonhide", t),
                item_rank: 6,
            },
            Self::Dragonscale(t) => ArmorMaterialDefinition {
                dr_multiplier: 3.0,
                encumbrance_modifier: 0,
                name: format!("{} dragonscale", t),
                item_rank: 4,
            },
            Self::AncientDragonscale(t) => ArmorMaterialDefinition {
                dr_multiplier: 6.0,
                encumbrance_modifier: 0,
                name: format!("pure {} dragonscale", t),
                item_rank: 6,
            },
            Self::Elvenweave => ArmorMaterialDefinition {
                dr_multiplier: 2.0,
                encumbrance_modifier: -1,
                name: "elvenweave".to_string(),
                item_rank: 3,
            },
            Self::PureElvenweave => ArmorMaterialDefinition {
                dr_multiplier: 4.0,
                encumbrance_modifier: -2,
                name: "pure elvenweave".to_string(),
                item_rank: 5,
            },
            Self::Mithral => ArmorMaterialDefinition {
                dr_multiplier: 2.0,
                encumbrance_modifier: -1,
                name: "mithral".to_string(),
                item_rank: 3,
            },
            Self::PureMithral => ArmorMaterialDefinition {
                dr_multiplier: 4.0,
                encumbrance_modifier: -2,
                name: "pure mithral".to_string(),
                item_rank: 5,
            },
            Self::Starmetal => ArmorMaterialDefinition {
                dr_multiplier: 2.0,
                encumbrance_modifier: 2,
                name: "starmetal".to_string(),
                item_rank: 2,
            },
            Self::PureStarmetal => ArmorMaterialDefinition {
                dr_multiplier: 4.0,
                encumbrance_modifier: 2,
                name: "pure starmetal".to_string(),
                item_rank: 4,
            },
        }
    }

    fn dr_multiplier(&self) -> f64 {
        self.definition().dr_multiplier
    }

    fn encumbrance_modifier(&self) -> i32 {
        self.definition().encumbrance_modifier
    }

    fn item_rank(&self) -> i32 {
        self.definition().item_rank
    }

    fn name(&self) -> String {
        self.definition().name
    }
}

struct ArmorDefinition {
    accuracy_modifier: i32,
    damage_resistance: i32,
    defense: i32,
    dex_multiplier: f64,
    encumbrance: i32,
    item_rank: i32,
    name: String,
    // TODO: Creature should notice this
    speed_modifier: i32,
}

impl Armor {
    fn definition(&self) -> ArmorDefinition {
        match self {
            // Light armor
            Self::Leather(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(3, m),
                defense: 3,
                dex_multiplier: 1.0,
                encumbrance: 0,
                item_rank: 1,
                name: "leather".to_string(),
                speed_modifier: 0,
            },
            Self::StuddedLeather(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(4, m),
                defense: 3,
                dex_multiplier: 1.0,
                encumbrance: 2,
                item_rank: 1,
                name: "studded leather".to_string(),
                speed_modifier: 0,
            },
            Self::ChainShirt(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(4, m),
                defense: 3,
                dex_multiplier: 1.0,
                encumbrance: 2,
                item_rank: 1,
                name: "chain shirt".to_string(),
                speed_modifier: 0,
            },
            Self::Buckler => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: 0,
                defense: 1,
                dex_multiplier: 1.0,
                encumbrance: 0,
                item_rank: 0,
                name: "buckler".to_string(),
                speed_modifier: 0,
            },

            // Medium armor
            Self::Hide(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(4, m),
                defense: 4,
                dex_multiplier: 0.5,
                encumbrance: 2,
                item_rank: 1,
                name: "hide armor".to_string(),
                speed_modifier: 0,
            },
            Self::ScaleMail(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(5, m),
                defense: 4,
                dex_multiplier: 0.5,
                encumbrance: 4,
                item_rank: 1,
                name: "scale mail".to_string(),
                speed_modifier: 0,
            },
            Self::Breastplate(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(6, m),
                defense: 4,
                dex_multiplier: 0.5,
                encumbrance: 4,
                item_rank: 1,
                name: "breastplate".to_string(),
                speed_modifier: 0,
            },
            Self::StandardShield => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: 0,
                defense: 2,
                dex_multiplier: 0.5,
                encumbrance: 0,
                item_rank: 0,
                name: "standard shield".to_string(),
                speed_modifier: 0,
            },

            // Heavy armor
            Self::LayeredHide(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(6, m),
                defense: 5,
                dex_multiplier: 0.0,
                encumbrance: 4,
                item_rank: 1,
                name: "layered hide".to_string(),
                speed_modifier: -10,
            },
            Self::PlatedMail(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(8, m),
                defense: 5,
                dex_multiplier: 0.0,
                encumbrance: 6,
                item_rank: 2,
                name: "plated mail".to_string(),
                speed_modifier: -10,
            },
            Self::FullPlate(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(10, m),
                defense: 5,
                dex_multiplier: 0.0,
                encumbrance: 6,
                item_rank: 3,
                name: "full plate".to_string(),
                speed_modifier: -10,
            },
            Self::TowerShield => ArmorDefinition {
                accuracy_modifier: -1,
                damage_resistance: 0,
                defense: 3,
                dex_multiplier: 0.0,
                encumbrance: 2,
                item_rank: 1,
                name: "tower shield".to_string(),
                speed_modifier: 0,
            },
        }
    }

    fn is_body_armor(&self) -> bool {
        // This is a bit of a hack; we could identify this with a name match instead.
        self.definition().damage_resistance > 0
    }

    fn material(&self) -> &Option<ArmorMaterial> {
        match self {
            // Light armor
            Self::Leather(m) => m,
            Self::StuddedLeather(m) => m,
            Self::ChainShirt(m) => m,
            Self::Buckler => &None,

            // Medium armor
            Self::Hide(m) => m,
            Self::ScaleMail(m) => m,
            Self::Breastplate(m) => m,
            Self::StandardShield => &None,

            // Heavy armor
            Self::LayeredHide(m) => m,
            Self::PlatedMail(m) => m,
            Self::FullPlate(m) => m,
            Self::TowerShield => &None,
        }
    }

    pub fn accuracy_modifier(&self) -> i32 {
        self.definition().accuracy_modifier
    }

    pub fn damage_resistance(&self) -> i32 {
        self.definition().damage_resistance
    }

    pub fn dex_multiplier(&self) -> f64 {
        self.definition().dex_multiplier
    }

    pub fn defense(&self) -> i32 {
        self.definition().defense
    }

    pub fn encumbrance(&self) -> i32 {
        if let Some(m) = self.material() {
            self.definition().encumbrance + m.encumbrance_modifier()
        } else {
            self.definition().encumbrance
        }
    }

    pub fn item_rank(&self) -> i32 {
        if let Some(m) = self.material() {
            max(self.definition().item_rank, m.item_rank())
        } else {
            self.definition().item_rank
        }
    }

    pub fn name(&self) -> String {
        if let Some(m) = self.material() {
            format!("{} {}", m.name(), self.definition().name)
        } else {
            self.definition().name
        }
    }

    pub fn speed_modifier(&self) -> i32 {
        self.definition().speed_modifier
    }
}

fn calc_dr(base_dr: i32, material: &Option<ArmorMaterial>) -> i32 {
    return ((base_dr as f64)
        * material
            .as_ref()
            .unwrap_or(&ArmorMaterial::Normal)
            .dr_multiplier()) as i32;
}

pub enum ArmorUsageClass {
    Light,
    Medium,
    Heavy,
}

impl ArmorUsageClass {
    pub fn all() -> Vec<Self> {
        vec![
            ArmorUsageClass::Light,
            ArmorUsageClass::Medium,
            ArmorUsageClass::Heavy,
        ]
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Light => "light",
            Self::Medium => "medium",
            Self::Heavy => "heavy",
        }
    }
}

impl fmt::Display for ArmorUsageClass {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name())
    }
}

pub trait HasArmor {
    fn add_armor(&mut self, armor: Armor);
    fn get_armor(&self) -> Vec<&Armor>;
    fn replace_armor(&mut self, armor: Armor);
    fn remove_armor(&mut self, armor: Armor);
    fn calc_encumbrance(&self) -> i32;
    // Find the lowest dex multiplier among all the armor components being worn
    fn minimum_dex_modifier(&self) -> Option<f64> {
        self.get_armor()
            .iter()
            .min_by(|x, y| {
                ((x.dex_multiplier() * 2.0) as i32).cmp(&((y.dex_multiplier() * 2.0) as i32))
            })
            .map(|lowest_armor| lowest_armor.dex_multiplier())
    }
}

impl HasArmor for Creature
where
    Creature: HasModifiers,
{
    fn add_armor(&mut self, armor: Armor) {
        self.armor.push(armor);
    }

    fn replace_armor(&mut self, armor: Armor) {
        self.armor
            .retain(|a| a.is_body_armor() != armor.is_body_armor());
        self.add_armor(armor)
    }

    fn remove_armor(&mut self, armor: Armor) {
        self.armor.retain(|a| a.name() != armor.name());
    }

    fn get_armor(&self) -> Vec<&Armor> {
        return self.armor.iter().collect();
    }

    fn calc_encumbrance(&self) -> i32 {
        let armor_encumbrance: i32 = self.get_armor().iter().map(|a| a.encumbrance()).sum();
        max(
            0,
            armor_encumbrance - self.get_base_attribute(&Attribute::Strength)
                + self.calc_total_modifier(ModifierType::Encumbrance),
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn calc_special_material_damage_resistance() {
        assert_eq!(
            10,
            Armor::FullPlate(None).damage_resistance(),
            "Should be 10 with no material"
        );
        assert_eq!(
            20,
            Armor::FullPlate(Some(ArmorMaterial::Starmetal)).damage_resistance(),
            "Should be 2x with starmetal"
        );
        assert_eq!(
            30,
            Armor::FullPlate(Some(ArmorMaterial::Dragonhide("red".to_string())))
                .damage_resistance(),
            "Should be 3x with dragonhide"
        );
        assert_eq!(
            60,
            Armor::FullPlate(Some(ArmorMaterial::Adamantine)).damage_resistance(),
            "Should be 6x with pure adamantine"
        );
    }
}
