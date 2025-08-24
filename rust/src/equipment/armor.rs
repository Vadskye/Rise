use crate::core_mechanics::{Attribute, HasAttributes};
use crate::creatures::{Creature, HasModifiers, ModifierType};
use std::{cmp::max, fmt};

#[derive(Clone, Debug)]
pub enum Armor {
    // Light armor
    BuffLeather(Option<ArmorMaterial>),
    MailShirt(Option<ArmorMaterial>),
    Rawhide(Option<ArmorMaterial>),
    Buckler,

    // Medium armor
    LeatherLamellar(Option<ArmorMaterial>),
    Scale(Option<ArmorMaterial>),
    Brigandine(Option<ArmorMaterial>),
    StandardShield,

    // Heavy armor
    Breastplate(Option<ArmorMaterial>),
    HalfPlate(Option<ArmorMaterial>),
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
    Vineweave,
    BraidedVineweave,
}

struct ArmorMaterialDefinition {
    durability_modifier: i32,
    encumbrance_modifier: i32,
    item_rank: i32,
    name: String,
}

impl ArmorMaterial {
    fn definition(&self) -> ArmorMaterialDefinition {
        match self {
            Self::Normal => ArmorMaterialDefinition {
                durability_modifier: 0,
                encumbrance_modifier: 0,
                name: "normal".to_string(),
                item_rank: 0,
            },
            Self::Magic(_) => ArmorMaterialDefinition {
                durability_modifier: 0,
                encumbrance_modifier: 0,
                name: "magic".to_string(),
                item_rank: 0,
            },
            Self::Adamantine => ArmorMaterialDefinition {
                durability_modifier: 2,
                encumbrance_modifier: 2,
                name: "adamantine".to_string(),
                item_rank: 5,
            },
            Self::PureAdamantine => ArmorMaterialDefinition {
                durability_modifier: 4,
                encumbrance_modifier: 2,
                name: "pure adamantine".to_string(),
                item_rank: 7,
            },
            Self::ColdIron => ArmorMaterialDefinition {
                durability_modifier: 0,
                encumbrance_modifier: 0,
                name: "cold iron".to_string(),
                item_rank: 2,
            },
            Self::PureColdIron => ArmorMaterialDefinition {
                durability_modifier: 0,
                encumbrance_modifier: 0,
                name: "pure cold iron".to_string(),
                item_rank: 4,
            },
            Self::Diamondsteel => ArmorMaterialDefinition {
                durability_modifier: 0,
                encumbrance_modifier: 0,
                name: "diamondsteel".to_string(),
                item_rank: 3,
            },
            Self::PureDiamondsteel => ArmorMaterialDefinition {
                durability_modifier: 0,
                encumbrance_modifier: 0,
                name: "pure diamondsteel".to_string(),
                item_rank: 5,
            },
            Self::Dragonhide(t) => ArmorMaterialDefinition {
                durability_modifier: 1,
                encumbrance_modifier: 0,
                name: format!("{} dragonhide", t),
                item_rank: 4,
            },
            Self::AncientDragonhide(t) => ArmorMaterialDefinition {
                durability_modifier: 1,
                encumbrance_modifier: 0,
                name: format!("pure {} dragonhide", t),
                item_rank: 6,
            },
            Self::Dragonscale(t) => ArmorMaterialDefinition {
                durability_modifier: 1,
                encumbrance_modifier: 0,
                name: format!("{} dragonscale", t),
                item_rank: 4,
            },
            Self::AncientDragonscale(t) => ArmorMaterialDefinition {
                durability_modifier: 1,
                encumbrance_modifier: 0,
                name: format!("pure {} dragonscale", t),
                item_rank: 6,
            },
            Self::Elvenweave => ArmorMaterialDefinition {
                durability_modifier: 0,
                encumbrance_modifier: -1,
                name: "elvenweave".to_string(),
                item_rank: 3,
            },
            Self::PureElvenweave => ArmorMaterialDefinition {
                durability_modifier: 0,
                encumbrance_modifier: -2,
                name: "pure elvenweave".to_string(),
                item_rank: 5,
            },
            Self::Mithral => ArmorMaterialDefinition {
                durability_modifier: 1,
                encumbrance_modifier: -1,
                name: "mithral".to_string(),
                item_rank: 3,
            },
            Self::PureMithral => ArmorMaterialDefinition {
                durability_modifier: 2,
                encumbrance_modifier: -2,
                name: "pure mithral".to_string(),
                item_rank: 5,
            },
            Self::Starmetal => ArmorMaterialDefinition {
                durability_modifier: 1,
                encumbrance_modifier: 2,
                name: "starmetal".to_string(),
                item_rank: 2,
            },
            Self::PureStarmetal => ArmorMaterialDefinition {
                durability_modifier: 2,
                encumbrance_modifier: 2,
                name: "pure starmetal".to_string(),
                item_rank: 4,
            },
            Self::Vineweave => ArmorMaterialDefinition {
                durability_modifier: 1,
                encumbrance_modifier: 0,
                name: "vineweave".to_string(),
                item_rank: 3,
            },
            Self::BraidedVineweave => ArmorMaterialDefinition {
                durability_modifier: 2,
                encumbrance_modifier: 0,
                name: "pure starmetal".to_string(),
                item_rank: 5,
            },
        }
    }

    fn durability_modifier(&self) -> i32 {
        self.definition().durability_modifier
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
    durability: i32,
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
            Self::BuffLeather(m) => ArmorDefinition {
                accuracy_modifier: 0,
                durability: calc_durability(1, m),
                defense: 2,
                dex_multiplier: 1.0,
                encumbrance: 0,
                item_rank: 1,
                name: "buff leather".to_string(),
                speed_modifier: 0,
            },
            Self::MailShirt(m) => ArmorDefinition {
                accuracy_modifier: 0,
                durability: calc_durability(2, m),
                defense: 2,
                dex_multiplier: 1.0,
                encumbrance: 0,
                item_rank: 2,
                name: "chain shirt".to_string(),
                speed_modifier: 0,
            },
            Self::Rawhide(m) => ArmorDefinition {
                accuracy_modifier: 0,
                durability: calc_durability(0, m),
                defense: 2,
                dex_multiplier: 1.0,
                encumbrance: 1,
                item_rank: 1,
                name: "Rawhide".to_string(),
                speed_modifier: 0,
                // TODO: add vital roll modifier
            },
            Self::Buckler => ArmorDefinition {
                accuracy_modifier: 0,
                durability: 0,
                defense: 1,
                dex_multiplier: 1.0,
                encumbrance: 0,
                item_rank: 0,
                name: "buckler".to_string(),
                speed_modifier: 0,
            },

            // Medium armor
            Self::LeatherLamellar(m) => ArmorDefinition {
                accuracy_modifier: 0,
                durability: calc_durability(2, m),
                defense: 4,
                dex_multiplier: 0.5,
                encumbrance: 2,
                item_rank: 1,
                name: "leather lamellar".to_string(),
                speed_modifier: 0,
            },
            Self::Scale(m) => ArmorDefinition {
                accuracy_modifier: 0,
                durability: calc_durability(3, m),
                defense: 4,
                dex_multiplier: 0.5,
                encumbrance: 4,
                item_rank: 1,
                name: "scale".to_string(),
                speed_modifier: 0,
            },
            Self::Brigandine(m) => ArmorDefinition {
                accuracy_modifier: 0,
                durability: calc_durability(4, m),
                defense: 4,
                dex_multiplier: 0.5,
                encumbrance: 4,
                item_rank: 1,
                name: "brigandine".to_string(),
                speed_modifier: 0,
            },
            Self::StandardShield => ArmorDefinition {
                accuracy_modifier: 0,
                durability: 0,
                defense: 2,
                dex_multiplier: 0.5,
                encumbrance: 0,
                item_rank: 0,
                name: "standard shield".to_string(),
                speed_modifier: 0,
            },

            // Heavy armor
            Self::Breastplate(m) => ArmorDefinition {
                accuracy_modifier: 0,
                durability: calc_durability(4, m),
                defense: 5,
                dex_multiplier: 0.5,
                encumbrance: 2,
                item_rank: 1,
                name: "breastplate".to_string(),
                speed_modifier: -10,
            },
            Self::HalfPlate(m) => ArmorDefinition {
                accuracy_modifier: 0,
                durability: calc_durability(6, m),
                defense: 5,
                dex_multiplier: 0.5,
                encumbrance: 3,
                item_rank: 2,
                name: "half plate".to_string(),
                speed_modifier: -10,
            },
            Self::FullPlate(m) => ArmorDefinition {
                accuracy_modifier: 0,
                durability: calc_durability(6, m),
                defense: 5,
                dex_multiplier: 0.5,
                encumbrance: 4,
                item_rank: 3,
                name: "full plate".to_string(),
                speed_modifier: -10,
            },
            Self::TowerShield => ArmorDefinition {
                accuracy_modifier: -1,
                durability: 0,
                defense: 3,
                dex_multiplier: 0.5,
                encumbrance: 2,
                item_rank: 1,
                name: "tower shield".to_string(),
                speed_modifier: 0,
            },
        }
    }

    fn is_body_armor(&self) -> bool {
        // This is a bit of a hack; we could identify this with a name match instead.
        // TODO: This breaks for rawhide.
        self.definition().durability > 0
    }

    fn material(&self) -> &Option<ArmorMaterial> {
        match self {
            // Light armor
            Self::BuffLeather(m) => m,
            Self::MailShirt(m) => m,
            Self::Rawhide(m) => m,
            Self::Buckler => &None,

            // Medium armor
            Self::LeatherLamellar(m) => m,
            Self::Scale(m) => m,
            Self::Brigandine(m) => m,
            Self::StandardShield => &None,

            // Heavy armor
            Self::Breastplate(m) => m,
            Self::HalfPlate(m) => m,
            Self::FullPlate(m) => m,
            Self::TowerShield => &None,
        }
    }

    pub fn accuracy_modifier(&self) -> i32 {
        self.definition().accuracy_modifier
    }

    pub fn durability(&self) -> i32 {
        self.definition().durability
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

fn calc_durability(base_durability: i32, material: &Option<ArmorMaterial>) -> i32 {
    base_durability
        + material
            .as_ref()
            .unwrap_or(&ArmorMaterial::Normal)
            .durability_modifier()
}

#[derive(Eq, PartialEq)]
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
    fn calc_special_material_durability() {
        assert_eq!(
            6,
            Armor::FullPlate(None).durability(),
            "Should be 10 with no material"
        );
        assert_eq!(
            7,
            Armor::FullPlate(Some(ArmorMaterial::Starmetal)).durability(),
            "Should be +1 with starmetal"
        );
        assert_eq!(
            7,
            Armor::FullPlate(Some(ArmorMaterial::Dragonhide("red".to_string())))
                .durability(),
            "Should be +1 with dragonhide"
        );
        assert_eq!(
            8,
            Armor::FullPlate(Some(ArmorMaterial::Adamantine)).durability(),
            "Should be +2 with adamantine"
        );
    }
}
