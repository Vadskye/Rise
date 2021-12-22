use crate::core_mechanics::{Attribute, Defense, PassiveAbility, Resource, SpecialDefenseModifier};
use crate::creatures::attacks::Attack;
use crate::skills::Skill;

use super::{Creature, Maneuver};

#[derive(Clone)]
pub enum Modifier {
    Accuracy(i32),
    Attack(Attack),
    BaseAttribute(Attribute, i32),
    DamageResistance(i32),
    Defense(Defense, i32),
    Encumbrance(i32),
    HitPoints(i32),
    // TODO: add this to creature calculations
    Initiative(i32),
    Maneuver(Maneuver),
    // TODO: add this to creature calculations
    MovementSpeed(i32),
    PassiveAbility(PassiveAbility),
    Power(i32),
    Resource(Resource, i32),
    Skill(Skill, i32),
    SpecialDefense(SpecialDefenseModifier),
    StrikeDamageDice(i32),
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
    HitPoints,
    Initiative,
    Maneuver,
    MovementSpeed,
    PassiveAbility,
    Power,
    Resource(Resource),
    Skill(Skill),
    SpecialDefense,
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
            Self::HitPoints(v) => format!("{} {}", self.name(), v),
            Self::Initiative(v) => format!("{} {}", self.name(), v),
            Self::Maneuver(_) => self.name(),
            Self::MovementSpeed(v) => format!("{} {}", self.name(), v),
            Self::PassiveAbility(_) => self.name(),
            Self::Power(v) => format!("{} {}", self.name(), v),
            Self::Resource(_, v) => format!("{} by {}", self.name(), v),
            Self::Skill(_, v) => format!("{} by {}", self.name(), v),
            Self::SpecialDefense(_) => self.name(),
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
            Self::HitPoints(_) => format!("HP"),
            Self::Initiative(_) => format!("initiative"),
            Self::Maneuver(m) => format!("maneuver {}", m.name()),
            Self::MovementSpeed(_) => format!("movement"),
            Self::PassiveAbility(a) => format!("passive ability {}", a.name),
            Self::Power(_) => format!("power"),
            Self::Resource(r, _) => format!("resource {}", r.name()),
            Self::Skill(s, _) => format!("skill {}", s.name()),
            Self::SpecialDefense(d) => format!("special defense {}", d.description()),
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
            Self::HitPoints(_) => ModifierType::HitPoints,
            Self::Initiative(_) => ModifierType::Initiative,
            Self::Maneuver(_) => ModifierType::Maneuver,
            Self::MovementSpeed(_) => ModifierType::MovementSpeed,
            Self::PassiveAbility(_) => ModifierType::PassiveAbility,
            Self::Power(_) => ModifierType::Power,
            Self::Resource(r, _) => ModifierType::Resource(*r),
            Self::Skill(s, _) => ModifierType::Skill(s.clone()),
            Self::SpecialDefense(_) => ModifierType::SpecialDefense,
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
            Self::HitPoints(v) => v,
            Self::Initiative(v) => v,
            Self::Maneuver(_) => &0,
            Self::MovementSpeed(v) => v,
            Self::PassiveAbility(_) => &0,
            Self::Power(v) => v,
            Self::Resource(_, v) => v,
            Self::Skill(_, v) => v,
            Self::StrikeDamageDice(v) => v,
            Self::SpecialDefense(_) => &0,
            Self::VitalRoll(v) => v,
        };
        return *value;
    }
}

#[derive(Clone)]
pub struct IdentifiedModifier {
    modifier: Modifier,
    source: String,
    priority: i32,
}

impl IdentifiedModifier {
    fn key(&self) -> String {
        return format!("{} {}", self.source, self.modifier.name());
    }

    fn replaces(&self, other: &Self) -> bool {
        return self.key() == other.key() && self.priority > other.priority;
    }
}

pub trait HasModifiers {
    fn add_modifier(&mut self, modifier: Modifier, name: Option<&str>, priority: Option<i32>);
    fn add_magic_modifier(&mut self, modifier: Modifier);
    fn get_modifiers(&self) -> Vec<&Modifier>;
    fn get_modifiers_by_source(&self, source: &str) -> Vec<&Modifier>;
    fn get_modifiers_by_type(&self, modifier_type: ModifierType) -> Vec<&Modifier>;
    fn calc_total_modifier(&self, modifier_type: ModifierType) -> i32;
}

impl HasModifiers for Creature {
    fn add_modifier(&mut self, modifier: Modifier, source: Option<&str>, priority: Option<i32>) {
        if let Some(source) = source {
            let priority = priority.unwrap_or(0);
            let identified_modifier = IdentifiedModifier {
                modifier,
                source: source.to_string(),
                priority,
            };
            self.identified_modifiers
                .retain(|im| !identified_modifier.replaces(im));
            if self
                .identified_modifiers
                .iter()
                .filter(|im| im.replaces(&identified_modifier))
                .count()
                == 0
            {
                self.identified_modifiers.push(identified_modifier);
            }
        } else {
            self.anonymous_modifiers.push(modifier);
        }
    }

    fn add_magic_modifier(&mut self, modifier: Modifier) {
        let value = modifier.value();
        self.add_modifier(modifier, Some("magic"), Some(value));
    }

    fn get_modifiers(&self) -> Vec<&Modifier> {
        let mut modifiers: Vec<&Modifier> = self
            .identified_modifiers
            .iter()
            .map(|im| &im.modifier)
            .collect();
        for m in &self.anonymous_modifiers {
            modifiers.push(m);
        }
        return modifiers;
    }

    fn get_modifiers_by_type(&self, mt: ModifierType) -> Vec<&Modifier> {
        return self
            .get_modifiers()
            .into_iter()
            .filter(|m| m.modifier_type() == mt)
            .collect();
    }

    fn get_modifiers_by_source(&self, source: &str) -> Vec<&Modifier> {
        return self
            .identified_modifiers
            .iter()
            .filter(|im| im.source == source)
            .map(|im| &im.modifier)
            .collect();
    }

    fn calc_total_modifier(&self, mt: ModifierType) -> i32 {
        return self
            .get_modifiers_by_type(mt)
            .iter()
            .map(|m| m.value())
            .sum();
    }
}
