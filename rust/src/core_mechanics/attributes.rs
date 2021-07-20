use std::cmp::PartialEq;

#[derive(Clone, Eq, Hash)]
pub enum Attribute {
    Strength,
    Dexterity,
    Constitution,
    Intelligence,
    Perception,
    Willpower,
}

impl Attribute {
    pub fn name(&self) -> &str {
        match self {
            Self::Strength => "strength",
            Self::Dexterity => "dexterity",
            Self::Constitution => "constitution",
            Self::Intelligence => "intelligence",
            Self::Perception => "perception",
            Self::Willpower => "willpower",
        }
    }

    pub fn shorthand_name(&self) -> &str {
        match self {
            Self::Strength => "Str",
            Self::Dexterity => "Dex",
            Self::Constitution => "Con",
            Self::Intelligence => "Int",
            Self::Perception => "Per",
            Self::Willpower => "Wil",
        }
    }

    pub fn calculate_total(base_value: i32, level: i32) -> i32 {
        let slevel = level as i32;
        if base_value <= 1 {
            return base_value;
        } else if base_value <= 4 {
            return base_value + ((slevel * (base_value - 1)) as f64 / 4.0).ceil() as i32;
        } else if base_value <= 8 {
            return base_value + (((slevel - 1) * (base_value - 1)) as f64 / 2.0).ceil() as i32;
        } else {
            return base_value + (((slevel - 2) * (base_value - 1)) as f64 / 2.0).ceil() as i32;
        }
    }

    pub fn all() -> Vec<Attribute> {
        return vec![
            Attribute::Strength,
            Attribute::Dexterity,
            Attribute::Constitution,
            Attribute::Intelligence,
            Attribute::Perception,
            Attribute::Willpower,
        ];
    }
}

impl PartialEq for Attribute {
    fn eq(&self, other: &Self) -> bool {
        return self.name() == other.name();
    }
}

pub trait HasAttributes {
    fn calc_total_attribute(&self, attribute: &Attribute) -> i32;
    fn get_base_attribute(&self, attribute: &Attribute) -> i32;
    fn set_base_attribute(&mut self, attribute: Attribute, value: i32);
}
