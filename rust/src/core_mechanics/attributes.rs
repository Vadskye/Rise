use crate::creatures::{Creature, HasModifiers, ModifierType};
use std::cmp::PartialEq;

#[derive(Clone, Copy, Eq, Hash)]
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
        } else {
            return base_value + ((slevel * (base_value - 1)) as f64 / 4.0).floor() as i32;
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

impl HasAttributes for Creature
where
    Creature: HasModifiers,
{
    fn get_base_attribute(&self, attribute: &Attribute) -> i32 {
        let value = if let Some(a) = self.base_attributes.get(attribute) {
            *a
        } else {
            0
        };
        return value + self.calc_total_modifier(ModifierType::BaseAttribute(*attribute));
    }

    fn calc_total_attribute(&self, attribute: &Attribute) -> i32 {
        Attribute::calculate_total(self.get_base_attribute(attribute), self.level)
    }

    fn set_base_attribute(&mut self, attribute: Attribute, value: i32) {
        if let Some(a) = self.base_attributes.get_mut(&attribute) {
            *a = value;
        } else {
            self.base_attributes.insert(attribute, value);
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn calculate_unchanging_bases() {
        assert_eq!(-5, Attribute::calculate_total(-5, 1));
        assert_eq!(-5, Attribute::calculate_total(-5, 20));
        assert_eq!(0, Attribute::calculate_total(0, 1));
        assert_eq!(0, Attribute::calculate_total(0, 20));
        assert_eq!(1, Attribute::calculate_total(1, 1));
        assert_eq!(1, Attribute::calculate_total(1, 20));
    }

    #[test]
    fn calculate_base_2() {
        // Correct progression: +1/4 level
        let base = 2;
        assert_eq!(
            2,
            Attribute::calculate_total(base, 1),
            "At level 1, should match base"
        );
        assert_eq!(
            2,
            Attribute::calculate_total(base, 3),
            "At level 3, should be unchanged"
        );
        assert_eq!(
            3,
            Attribute::calculate_total(base, 4),
            "At level 4, should increase by 1"
        );
        assert_eq!(
            7,
            Attribute::calculate_total(base, 20),
            "At level 20, should increase by 5"
        );
    }

    #[test]
    fn calculate_base_3() {
        // Correct progression: +1/2 level
        let base = 3;
        assert_eq!(
            3,
            Attribute::calculate_total(base, 1),
            "At level 1, should match base"
        );
        assert_eq!(
            4,
            Attribute::calculate_total(base, 2),
            "At level 2, should increase by 1"
        );
        assert_eq!(
            5,
            Attribute::calculate_total(base, 5),
            "At level 5, should increase by 2"
        );
        assert_eq!(
            13,
            Attribute::calculate_total(base, 20),
            "At level 20, should increase by 10"
        );
    }

    #[test]
    fn calculate_base_4() {
        // Correct progression: +3/4 level
        let base = 4;
        assert_eq!(
            4,
            Attribute::calculate_total(base, 1),
            "At level 1, should match base"
        );
        assert_eq!(
            7,
            Attribute::calculate_total(base, 4),
            "At level 4, should increase by 3"
        );
        assert_eq!(
            7,
            Attribute::calculate_total(base, 5),
            "At level 5, should increase by 3"
        );
        assert_eq!(
            19,
            Attribute::calculate_total(base, 20),
            "At level 20, should increase by 15"
        );
    }

    #[test]
    fn calculate_base_5() {
        // Correct progression: +level
        let base = 5;
        assert_eq!(
            6,
            Attribute::calculate_total(base, 1),
            "At level 1, should increase by 1"
        );
        assert_eq!(
            9,
            Attribute::calculate_total(base, 4),
            "At level 4, should increase by 4"
        );
        assert_eq!(
            25,
            Attribute::calculate_total(base, 20),
            "At level 20, should increase by 20"
        );
    }
}
