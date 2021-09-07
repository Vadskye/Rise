use std::fmt;

pub trait HasArmor {
    fn add_armor(&mut self, armor: Armor);
    fn get_armor(&self) -> Vec<&Armor>;
    fn calc_encumbrance(&self) -> i32;
}

#[derive(Copy, Clone)]
pub enum Armor {
    Breastplate(Option<ArmorMaterial>),
    ChainShirt(Option<ArmorMaterial>),
    Hide(Option<ArmorMaterial>),
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
    damage_resistance: i32,
    defense: i32,
    encumbrance: i32,
    name: String,
    speed_modifier: i32,
}

impl Armor {
    fn definition(&self) -> ArmorDefinition {
        match self {
            Self::Breastplate(m) => ArmorDefinition {
                damage_resistance: 6 * m.unwrap_or(ArmorMaterial::Normal).dr_multiplier(),
                defense: 3,
                encumbrance: 4,
                name: "breastplate".to_string(),
                speed_modifier: -5,
            },
            Self::ChainShirt(m) => ArmorDefinition {
                damage_resistance: 3 * m.unwrap_or(ArmorMaterial::Normal).dr_multiplier(),
                defense: 2,
                encumbrance: 2,
                name: "chain shirt".to_string(),
                speed_modifier: 0,
            },
            Self::Hide(m) => ArmorDefinition {
                damage_resistance: 5 * m.unwrap_or(ArmorMaterial::Normal).dr_multiplier(),
                defense: 3,
                encumbrance: 3,
                name: "hide armor".to_string(),
                speed_modifier: -5,
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
