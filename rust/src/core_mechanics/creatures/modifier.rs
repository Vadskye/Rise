use crate::core_mechanics::{Defense, Resource};
use crate::skills::Skill;

pub enum Modifier {
    Accuracy(i32),
    DamageResistance(i32),
    Defense(Defense, i32),
    Encumbrance(i32),
    HitPoints(i32),
    MagicalPower(i32),
    MundanePower(i32),
    Resource(Resource, i32),
    Skill(Skill, i32),
}

#[derive(PartialEq)]
pub enum ModifierType {
    Accuracy,
    DamageResistance,
    Defense(Defense),
    Encumbrance,
    HitPoints,
    MagicalPower,
    MundanePower,
    Resource(Resource),
    Skill(Skill),
}

impl Modifier {
    pub fn modifier_type(&self) -> ModifierType {
        match self {
            Self::Accuracy(_) => ModifierType::Accuracy,
            Self::DamageResistance(_) => ModifierType::DamageResistance,
            Self::Defense(d, _) => ModifierType::Defense(*d),
            Self::Encumbrance(_) => ModifierType::Encumbrance,
            Self::HitPoints(_) => ModifierType::HitPoints,
            Self::MagicalPower(_) => ModifierType::MagicalPower,
            Self::MundanePower(_) => ModifierType::MundanePower,
            Self::Resource(r, _) => ModifierType::Resource(*r),
            Self::Skill(s, _) => ModifierType::Skill(s.clone()),
        }
    }

    pub fn value(&self) -> i32 {
        let value = match self {
            Self::Accuracy(v) => v,
            Self::DamageResistance(v) => v,
            Self::Defense(_, v) => v,
            Self::Encumbrance(v) => v,
            Self::HitPoints(v) => v,
            Self::MagicalPower(v) => v,
            Self::MundanePower(v) => v,
            Self::Resource(_, v) => v,
            Self::Skill(_, v) => v,
        };
        return *value;
    }
}

pub trait HasModifiers {
    fn add_modifier(&mut self, modifier: Modifier);
    fn get_modifiers(&self) -> Vec<&Modifier>;
    fn calc_total_modifier(&self, modifier_type: ModifierType) -> i32;
}
