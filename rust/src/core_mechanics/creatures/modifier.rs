use crate::core_mechanics::{Defense, Resource};

pub enum Modifier {
    DamageResistance(i32),
    Defense(Defense, i32),
    HitPoints(i32),
    MagicalPower(i32),
    MundanePower(i32),
    Resource(Resource, i32),
}

#[derive(PartialEq)]
pub enum ModifierType {
    DamageResistance,
    Defense(Defense),
    HitPoints,
    MagicalPower,
    MundanePower,
    Resource(Resource),
}

impl Modifier {
    pub fn modifier_type(&self) -> ModifierType {
        match self {
            Self::DamageResistance(_) => ModifierType::DamageResistance,
            Self::Defense(d, _) => ModifierType::Defense(*d),
            Self::HitPoints(_) => ModifierType::HitPoints,
            Self::MagicalPower(_) => ModifierType::MagicalPower,
            Self::MundanePower(_) => ModifierType::MundanePower,
            Self::Resource(r, _) => ModifierType::Resource(*r),
        }
    }

    pub fn value(&self) -> i32 {
        match self {
            Self::DamageResistance(v) => *v,
            Self::Defense(_, v) => *v,
            Self::HitPoints(v) => *v,
            Self::MagicalPower(v) => *v,
            Self::MundanePower(v) => *v,
            Self::Resource(_, v) => *v,
        }
    }
}

pub trait HasModifiers {
    fn add_modifier(&mut self, modifier: Modifier);
    fn get_modifiers(&self) -> Vec<&Modifier>;
    fn calc_total_modifier(&self, modifier_type: ModifierType) -> i32;
}
