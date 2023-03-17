use crate::creatures::{Creature, HasModifiers, Modifier, ModifierType};
use std::cmp::PartialEq;

#[derive(Clone, Copy, Debug, Eq, Hash)]
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
    fn get_base_attribute(&self, attribute: &Attribute) -> i32;
    fn set_attribute_scaling(&mut self, level: i32, attributes: [Attribute; 2]);
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
        return value + self.calc_total_modifier(ModifierType::Attribute(*attribute));
    }

    fn set_attribute_scaling(
        &mut self,
        level: i32,
        attributes: [Attribute; 2],
    ) {
        let value = level / 6;
        if value > 0 {
            for attribute in attributes.iter() {
                self.add_modifier(
                    Modifier::Attribute(*attribute, value),
                    Some("attribute scaling with level"),
                    None,
                );
            }
        }
    }

    fn set_base_attribute(&mut self, attribute: Attribute, value: i32) {
        if let Some(a) = self.base_attributes.get_mut(&attribute) {
            *a = value;
        } else {
            self.base_attributes.insert(attribute, value);
        }
    }
}
