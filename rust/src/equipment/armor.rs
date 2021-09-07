use std::fmt;

pub trait HasArmor {
    fn add_armor(&mut self, armor: Armor);
    fn get_armor(&self) -> Vec<&Armor>;
    fn calc_encumbrance(&self) -> i32;
}

#[derive(Copy, Clone)]
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

#[derive(Copy, Clone)]
pub enum ArmorMaterial {
    Deepforged,
    Normal,
    PureDeepforged,
}

impl ArmorMaterial {
    fn dr_multiplier(&self) -> i32 {
        match self {
            Self::Deepforged => 2,
            Self::Normal => 1,
            Self::PureDeepforged => 4,
        }
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
                damage_resistance: 2 * m.unwrap_or(ArmorMaterial::Normal).dr_multiplier(),
                defense: 2,
                dex_multiplier: 1.0,
                encumbrance: 1,
                name: "leather".to_string(),
                speed_modifier: 0,
            },
            Self::StuddedLeather(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: 3 * m.unwrap_or(ArmorMaterial::Normal).dr_multiplier(),
                defense: 2,
                dex_multiplier: 1.0,
                encumbrance: 2,
                name: "studded leather".to_string(),
                speed_modifier: 0,
            },
            Self::ChainShirt(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: 3 * m.unwrap_or(ArmorMaterial::Normal).dr_multiplier(),
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
                damage_resistance: 5 * m.unwrap_or(ArmorMaterial::Normal).dr_multiplier(),
                defense: 3,
                dex_multiplier: 0.5,
                encumbrance: 3,
                name: "hide armor".to_string(),
                speed_modifier: -5,
            },
            Self::ScaleMail(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: 6 * m.unwrap_or(ArmorMaterial::Normal).dr_multiplier(),
                defense: 3,
                dex_multiplier: 0.5,
                encumbrance: 5,
                name: "scale mail".to_string(),
                speed_modifier: -5,
            },
            Self::Breastplate(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: 6 * m.unwrap_or(ArmorMaterial::Normal).dr_multiplier(),
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
                damage_resistance: 9 * m.unwrap_or(ArmorMaterial::Normal).dr_multiplier(),
                defense: 4,
                dex_multiplier: 0.0,
                encumbrance: 5,
                name: "layered hide".to_string(),
                speed_modifier: -10,
            },
            Self::PlatedMail(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: 10 * m.unwrap_or(ArmorMaterial::Normal).dr_multiplier(),
                defense: 4,
                dex_multiplier: 0.0,
                encumbrance: 6,
                name: "plated mail".to_string(),
                speed_modifier: -10,
            },
            Self::FullPlate(m) => ArmorDefinition {
                accuracy_modifier: 0,
                damage_resistance: 12 * m.unwrap_or(ArmorMaterial::Normal).dr_multiplier(),
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
