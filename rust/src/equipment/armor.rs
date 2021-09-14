use std::fmt;

pub trait HasArmor {
    fn add_armor(&mut self, armor: Armor);
    fn get_armor(&self) -> Vec<&Armor>;
    fn calc_encumbrance(&self) -> i32;
    fn minimum_dex_modifier(&self) -> Option<f64> {
        if let Some(lowest_armor) = self.get_armor().iter().min_by(|x, y| {
            ((x.dex_multiplier() * 2.0) as i32).cmp(&((y.dex_multiplier() * 2.0) as i32))
        }) {
            return Some(lowest_armor.dex_multiplier());
        } else {
            return None;
        }
    }
}

#[derive(Clone)]
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

#[derive(Clone)]
pub enum ArmorMaterial {
    Adamantine,
    PureAdamantine,
    ColdIron,
    PureColdIron,
    Deepforged,
    PureDeepforged,
    Normal,
    Diamondsteel,
    PureDiamondsteel,
    Dragonhide(String),
    AncientDragonhide(String),
    Dragonscale(String),
    AncientDragonscale(String),
    Elvenweave,
    PureElvenweave,
    Ironwood,
    Mithral,
    PureMithral,
    Starmetal,
    PureStarmetal,
}

struct ArmorMaterialDefinition {
    dr_multiplier: f64,
    encumbrance_modifier: i32,
    item_level_modifier: i32,
    name: String,
}

impl ArmorMaterial {
    fn definition(&self) -> ArmorMaterialDefinition {
        match self {
            Self::Normal => ArmorMaterialDefinition {
                dr_multiplier: 1.0,
                encumbrance_modifier: 0,
                name: "Normal".to_string(),
                item_level_modifier: 0,
            },
            Self::Adamantine => ArmorMaterialDefinition {
                dr_multiplier: 4.0,
                encumbrance_modifier: 2,
                name: "adamantine".to_string(),
                item_level_modifier: 9,
            },
            Self::PureAdamantine => ArmorMaterialDefinition {
                dr_multiplier: 8.0,
                encumbrance_modifier: 2,
                name: "pure adamantine".to_string(),
                item_level_modifier: 15,
            },
            Self::ColdIron => ArmorMaterialDefinition {
                dr_multiplier: 0.5,
                encumbrance_modifier: 0,
                name: "cold iron".to_string(),
                item_level_modifier: 6,
            },
            Self::PureColdIron => ArmorMaterialDefinition {
                dr_multiplier: 0.5,
                encumbrance_modifier: 0,
                name: "pure cold iron".to_string(),
                item_level_modifier: 12,
            },
            Self::Deepforged => ArmorMaterialDefinition {
                dr_multiplier: 2.0,
                encumbrance_modifier: 0,
                name: "deepforged".to_string(),
                item_level_modifier: 6,
            },
            Self::PureDeepforged => ArmorMaterialDefinition {
                dr_multiplier: 4.0,
                encumbrance_modifier: 0,
                name: "pure deepforged".to_string(),
                item_level_modifier: 12,
            },
            Self::Diamondsteel => ArmorMaterialDefinition {
                dr_multiplier: 1.0,
                encumbrance_modifier: 0,
                name: "diamondsteel".to_string(),
                item_level_modifier: 6,
            },
            Self::PureDiamondsteel => ArmorMaterialDefinition {
                dr_multiplier: 2.0,
                encumbrance_modifier: 0,
                name: "pure diamondsteel".to_string(),
                item_level_modifier: 12,
            },
            Self::Dragonhide(t) => ArmorMaterialDefinition {
                dr_multiplier: 3.0,
                encumbrance_modifier: 0,
                name: format!("{} dragonhide", t),
                item_level_modifier: 9,
            },
            Self::AncientDragonhide(t) => ArmorMaterialDefinition {
                dr_multiplier: 6.0,
                encumbrance_modifier: 0,
                name: format!("pure {} dragonhide", t),
                item_level_modifier: 15,
            },
            Self::Dragonscale(t) => ArmorMaterialDefinition {
                dr_multiplier: 3.0,
                encumbrance_modifier: 0,
                name: format!("{} dragonscale", t),
                item_level_modifier: 9,
            },
            Self::AncientDragonscale(t) => ArmorMaterialDefinition {
                dr_multiplier: 6.0,
                encumbrance_modifier: 0,
                name: format!("pure {} dragonscale", t),
                item_level_modifier: 15,
            },
            Self::Elvenweave => ArmorMaterialDefinition {
                dr_multiplier: 2.0,
                encumbrance_modifier: 0,
                name: "elvenweave".to_string(),
                item_level_modifier: 6,
            },
            Self::PureElvenweave => ArmorMaterialDefinition {
                dr_multiplier: 4.0,
                encumbrance_modifier: 0,
                name: "pure elvenweave".to_string(),
                item_level_modifier: 12,
            },
            Self::Ironwood => ArmorMaterialDefinition {
                dr_multiplier: 1.0,
                encumbrance_modifier: 0,
                name: "ironwood".to_string(),
                item_level_modifier: 3,
            },
            Self::Mithral => ArmorMaterialDefinition {
                dr_multiplier: 1.0,
                encumbrance_modifier: -2,
                name: "mithral".to_string(),
                item_level_modifier: 6,
            },
            Self::PureMithral => ArmorMaterialDefinition {
                dr_multiplier: 2.0,
                encumbrance_modifier: -3,
                name: "pure mithral".to_string(),
                item_level_modifier: 12,
            },
            Self::Starmetal => ArmorMaterialDefinition {
                dr_multiplier: 2.0,
                encumbrance_modifier: 2,
                name: "starmetal".to_string(),
                item_level_modifier: 6,
            },
            Self::PureStarmetal => ArmorMaterialDefinition {
                dr_multiplier: 4.0,
                encumbrance_modifier: 2,
                name: "pure starmetal".to_string(),
                item_level_modifier: 12,
            },
        }
    }

    fn dr_multiplier(&self) -> f64 {
        return self.definition().dr_multiplier;
    }

    fn encumbrance_modifier(&self) -> i32 {
        return self.definition().encumbrance_modifier;
    }
}

struct ArmorDefinition {
    accuracy_modifier: i32,
    damage_resistance: i32,
    defense: i32,
    dex_multiplier: f64,
    encumbrance: i32,
    name: String,
    speed_modifier: i32,
}

impl Armor {
    fn definition(&self) -> ArmorDefinition {
        match self {
            // Light armor
            Self::Leather(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(2, m),
                defense: 2,
                dex_multiplier: 1.0,
                encumbrance: 1,
                name: "leather".to_string(),
                speed_modifier: 0,
            },
            Self::StuddedLeather(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(3, m),
                defense: 2,
                dex_multiplier: 1.0,
                encumbrance: 2,
                name: "studded leather".to_string(),
                speed_modifier: 0,
            },
            Self::ChainShirt(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(3, m),
                defense: 2,
                dex_multiplier: 1.0,
                encumbrance: 2,
                name: "chain shirt".to_string(),
                speed_modifier: 0,
            },
            Self::Buckler => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: 0,
                defense: 1,
                dex_multiplier: 1.0,
                encumbrance: 0,
                name: "buckler".to_string(),
                speed_modifier: 0,
            },

            // Medium armor
            Self::Hide(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(5, m),
                defense: 3,
                dex_multiplier: 0.5,
                encumbrance: 3,
                name: "hide armor".to_string(),
                speed_modifier: -5,
            },
            Self::ScaleMail(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(6, m),
                defense: 3,
                dex_multiplier: 0.5,
                encumbrance: 5,
                name: "scale mail".to_string(),
                speed_modifier: -5,
            },
            Self::Breastplate(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(6, m),
                defense: 3,
                dex_multiplier: 0.5,
                encumbrance: 4,
                name: "breastplate".to_string(),
                speed_modifier: -5,
            },
            Self::StandardShield => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: 0,
                defense: 2,
                dex_multiplier: 0.5,
                encumbrance: 0,
                name: "standard shield".to_string(),
                speed_modifier: 0,
            },

            // Heavy armor
            Self::LayeredHide(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(8, m),
                defense: 4,
                dex_multiplier: 0.0,
                encumbrance: 5,
                name: "layered hide".to_string(),
                speed_modifier: -10,
            },
            Self::PlatedMail(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(10, m),
                defense: 4,
                dex_multiplier: 0.0,
                encumbrance: 6,
                name: "plated mail".to_string(),
                speed_modifier: -10,
            },
            Self::FullPlate(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: calc_dr(12, m),
                defense: 4,
                dex_multiplier: 0.0,
                encumbrance: 6,
                name: "full plate".to_string(),
                speed_modifier: -10,
            },
            Self::TowerShield => ArmorDefinition {
                accuracy_modifier: -1,
                damage_resistance: 0,
                defense: 3,
                dex_multiplier: 0.0,
                encumbrance: 2,
                name: "tower shield".to_string(),
                speed_modifier: 0,
            },
        }
    }

    pub fn damage_resistance(&self) -> i32 {
        return self.definition().damage_resistance;
    }

    pub fn dex_multiplier(&self) -> f64 {
        return self.definition().dex_multiplier;
    }

    pub fn defense(&self) -> i32 {
        return self.definition().defense;
    }

    pub fn encumbrance(&self) -> i32 {
        return self.definition().encumbrance;
    }

    pub fn name(&self) -> String {
        return self.definition().name;
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
        return vec![
            ArmorUsageClass::Light,
            ArmorUsageClass::Medium,
            ArmorUsageClass::Heavy,
        ];
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn calc_special_material_damage_resistance() {
        assert_eq!(
            12,
            Armor::FullPlate(None).damage_resistance(),
            "Should be 12 with no material"
        );
        assert_eq!(
            24,
            Armor::FullPlate(Some(ArmorMaterial::Deepforged)).damage_resistance(),
            "Should be 2x with deepforged"
        );
        assert_eq!(
            36,
            Armor::FullPlate(Some(ArmorMaterial::Dragonhide("red".to_string())))
                .damage_resistance(),
            "Should be 3x with dragonhide"
        );
        assert_eq!(
            48,
            Armor::FullPlate(Some(ArmorMaterial::Adamantine)).damage_resistance(),
            "Should be 4x with adamantine"
        );
        assert_eq!(
            48,
            Armor::FullPlate(Some(ArmorMaterial::PureDeepforged)).damage_resistance(),
            "Should be 4x with pure deepforged"
        );
    }
}
