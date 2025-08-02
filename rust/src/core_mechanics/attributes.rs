use crate::creatures::{Creature, HasModifiers, Modifier, ModifierType};
use std::cmp::PartialEq;
use titlecase::titlecase;

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

    pub fn title(&self) -> String {
        titlecase(self.name())
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
        vec![
            Attribute::Strength,
            Attribute::Dexterity,
            Attribute::Constitution,
            Attribute::Intelligence,
            Attribute::Perception,
            Attribute::Willpower,
        ]
    }

    // Omit Intelligence, since it doesn't affect the power of monsters
    pub fn monster_validation() -> Vec<Attribute> {
        vec![
            Attribute::Strength,
            Attribute::Dexterity,
            Attribute::Constitution,
            Attribute::Perception,
            Attribute::Willpower,
        ]
    }
}

impl PartialEq for Attribute {
    fn eq(&self, other: &Self) -> bool {
        return self.name() == other.name();
    }
}

pub trait HasAttributes {
    fn get_base_attribute(&self, attribute: &Attribute) -> i32;
    fn set_attribute_scaling(&mut self, level: i32, attributes: Vec<Attribute>);
    fn set_base_attribute(&mut self, attribute: Attribute, value: i32);
    fn set_base_attributes(&mut self, attributes: [i32; 6]);
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
        value + self.calc_total_modifier(ModifierType::Attribute(*attribute))
    }

    fn set_attribute_scaling(&mut self, level: i32, attributes: Vec<Attribute>) {
        // 3/9/15/21
        let value = (level + 3) / 6;
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

    fn set_base_attributes(&mut self, attributes: [i32; 6]) {
        self.set_base_attribute(Attribute::Strength, attributes[0]);
        self.set_base_attribute(Attribute::Dexterity, attributes[1]);
        self.set_base_attribute(Attribute::Constitution, attributes[2]);
        self.set_base_attribute(Attribute::Intelligence, attributes[3]);
        self.set_base_attribute(Attribute::Perception, attributes[4]);
        self.set_base_attribute(Attribute::Willpower, attributes[5]);
    }
}
