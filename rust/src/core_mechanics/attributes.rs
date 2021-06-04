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

    pub fn calculate_total(base_value: i8, level: i8) -> i8 {
        let slevel = level as i8;
        if base_value <= 0 {
            return base_value;
        } else if base_value == 1 {
            return base_value + slevel / 4;
        } else if base_value == 2 {
            return base_value + slevel / 2;
        } else {
            return base_value + (((slevel - 1) * (base_value - 1)) as f64 / 2.0).ceil() as i8;
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
    fn calc_total_attribute(&self, attribute: &Attribute) -> i8;
    fn get_base_attribute(&self, attribute: &Attribute) -> i8;
    fn set_base_attribute(&mut self, attribute: Attribute, value: i8);
}
