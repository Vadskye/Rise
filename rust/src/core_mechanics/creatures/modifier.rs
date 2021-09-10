use crate::core_mechanics::creatures::attacks::Attack;
use crate::core_mechanics::{Attribute, Defense, Resource};
use crate::skills::Skill;

use super::Maneuver;

#[derive(Clone)]
pub enum Modifier {
    Accuracy(i32),
    Attack(Attack),
    BaseAttribute(Attribute, i32),
    DamageResistance(i32),
    Defense(Defense, i32),
    Encumbrance(i32),
    // TODO: add this to creature calculations
    FocusPenalty(i32),
    HitPoints(i32),
    // TODO: add this to creature calculations
    Initiative(i32),
    MagicalPower(i32),
    Maneuver(Maneuver),
    // TODO: add this to creature calculations
    MovementSpeed(i32),
    MundanePower(i32),
    Resource(Resource, i32),
    Skill(Skill, i32),
    StrikeDamageDice(i32),
    // TODO: add this to creature calculations
    VitalRoll(i32),
}

#[derive(PartialEq)]
pub enum ModifierType {
    Accuracy,
    Attack,
    BaseAttribute(Attribute),
    DamageResistance,
    Defense(Defense),
    Encumbrance,
    FocusPenalty,
    HitPoints,
    Initiative,
    MagicalPower,
    Maneuver,
    MundanePower,
    MovementSpeed,
    Resource(Resource),
    Skill(Skill),
    StrikeDamageDice,
    VitalRoll,
}

impl Modifier {
    pub fn description(&self) -> String {
        match self {
            Self::Accuracy(v) => format!("{} {}", self.name(), v),
            Self::Attack(_) => self.name(),
            Self::BaseAttribute(_, v) => format!("{} by {}", self.name(), v),
            Self::DamageResistance(v) => format!("{} {}", self.name(), v),
            Self::Defense(_, v) => format!("{} by {}", self.name(), v),
            Self::Encumbrance(v) => format!("{} {}", self.name(), v),
            Self::FocusPenalty(v) => format!("{} {}", self.name(), v),
            Self::HitPoints(v) => format!("{} {}", self.name(), v),
            Self::Initiative(v) => format!("{} {}", self.name(), v),
            Self::MagicalPower(v) => format!("{} {}", self.name(), v),
            Self::Maneuver(_) => self.name(),
            Self::MovementSpeed(v) => format!("{} {}", self.name(), v),
            Self::MundanePower(v) => format!("{} {}", self.name(), v),
            Self::Resource(_, v) => format!("{} by {}", self.name(), v),
            Self::Skill(_, v) => format!("{} by {}", self.name(), v),
            Self::StrikeDamageDice(v) => format!("{} {}", self.name(), v),
            Self::VitalRoll(v) => format!("{} {}", self.name(), v),
        }
    }

    pub fn name(&self) -> String {
        match self {
            Self::Accuracy(_) => format!("accuracy"),
            Self::Attack(a) => format!("attack {}", a.name),
            Self::BaseAttribute(a, _) => format!("base attribute {}", a.name()),
            Self::DamageResistance(_) => format!("DR"),
            Self::Defense(d, _) => format!("defense {}", d.name()),
            Self::Encumbrance(_) => format!("encumbrance"),
            Self::FocusPenalty(_) => format!("focus"),
            Self::HitPoints(_) => format!("HP"),
            Self::Initiative(_) => format!("initiative"),
            Self::MagicalPower(_) => format!("magical power"),
            Self::Maneuver(m) => format!("maneuver {}", m.name()),
            Self::MovementSpeed(_) => format!("movement"),
            Self::MundanePower(_) => format!("mundane power"),
            Self::Resource(r, _) => format!("resource {}", r.name()),
            Self::Skill(s, _) => format!("skill {}", s.name()),
            Self::StrikeDamageDice(_) => format!("strike damage dice"),
            Self::VitalRoll(_) => format!("vital roll"),
        }
    }

    pub fn modifier_type(&self) -> ModifierType {
        match self {
            Self::Accuracy(_) => ModifierType::Accuracy,
            Self::Attack(_) => ModifierType::Attack,
            Self::BaseAttribute(a, _) => ModifierType::BaseAttribute(*a),
            Self::DamageResistance(_) => ModifierType::DamageResistance,
            Self::Defense(d, _) => ModifierType::Defense(*d),
            Self::Encumbrance(_) => ModifierType::Encumbrance,
            Self::FocusPenalty(_) => ModifierType::FocusPenalty,
            Self::HitPoints(_) => ModifierType::HitPoints,
            Self::Initiative(_) => ModifierType::Initiative,
            Self::MagicalPower(_) => ModifierType::MagicalPower,
            Self::Maneuver(_) => ModifierType::Maneuver,
            Self::MovementSpeed(_) => ModifierType::MovementSpeed,
            Self::MundanePower(_) => ModifierType::MundanePower,
            Self::Resource(r, _) => ModifierType::Resource(*r),
            Self::Skill(s, _) => ModifierType::Skill(s.clone()),
            Self::StrikeDamageDice(_) => ModifierType::StrikeDamageDice,
            Self::VitalRoll(_) => ModifierType::VitalRoll,
        }
    }

    pub fn attack_definition(&self) -> Option<&Attack> {
        match self {
            Self::Attack(a) => Some(a),
            _ => None,
        }
    }

    pub fn maneuver_definition(&self) -> Option<&Maneuver> {
        match self {
            Self::Maneuver(m) => Some(m),
            _ => None,
        }
    }

    pub fn value(&self) -> i32 {
        let value = match self {
            Self::Accuracy(v) => v,
            Self::Attack(_) => &0,
            Self::BaseAttribute(_, v) => v,
            Self::DamageResistance(v) => v,
            Self::Defense(_, v) => v,
            Self::Encumbrance(v) => v,
            Self::FocusPenalty(v) => v,
            Self::HitPoints(v) => v,
            Self::Initiative(v) => v,
            Self::MagicalPower(v) => v,
            Self::Maneuver(_) => &0,
            Self::MovementSpeed(v) => v,
            Self::MundanePower(v) => v,
            Self::Resource(_, v) => v,
            Self::Skill(_, v) => v,
            Self::StrikeDamageDice(v) => v,
            Self::VitalRoll(v) => v,
        };
        return *value;
    }
}

pub trait HasModifiers {
    fn add_modifier(&mut self, modifier: Modifier, name: Option<&str>, priority: Option<i32>);
    fn add_magic_modifier(&mut self, modifier: Modifier);
    fn get_modifiers(&self) -> Vec<Modifier>;
    fn calc_total_modifier(&self, modifier_type: ModifierType) -> i32;
}
