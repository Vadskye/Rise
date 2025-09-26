use crate::core_mechanics::abilities::{AbilityTag, ActiveAbility};
use crate::core_mechanics::attacks::{Attack, Maneuver};
use crate::core_mechanics::{
    Attribute, DamageDice, Debuff, Defense, MovementMode, PassiveAbility, Resource,
    SpecialDefenseType,
};
use crate::skills::Skill;

use super::Creature;

#[derive(Clone, Debug)]
pub enum Modifier {
    Accuracy(i32),
    ActiveAbility(ActiveAbility),
    AllDefenses(i32),
    Attack(Attack),
    Attribute(Attribute, i32),
    BaseSpeed(i32),
    Defense(Defense, i32),
    Durability(i32),
    Encumbrance(i32),
    ExtraDamage(DamageDice),
    // TODO: add FatigueTolerance modifier
    HitPoints(i32),
    InjuryPoint(i32),
    MagicalPower(i32),
    // TODO: add this to creature calculations
    Maneuver(Maneuver),
    // This is a special modifier which has complex handling in various places.
    Mindless,
    // TODO: add this to creature calculations
    MovementSpeed(MovementMode, i32),
    MundanePower(i32),
    PassiveAbility(PassiveAbility),
    Power(i32),
    Resource(Resource, i32),
    Skill(Skill, i32),
    StrikeDamageDice(i32),
    VitalRoll(i32),
    Immune(SpecialDefenseType),
    Impervious(SpecialDefenseType),
    Vulnerable(SpecialDefenseType),
}

#[derive(Debug, PartialEq, Clone)]
pub enum ModifierType {
    Accuracy,
    ActiveAbility,
    AllDefenses,
    Attack,
    Attribute(Attribute),
    BaseSpeed,
    Defense(Defense),
    Durability,
    Encumbrance,
    ExtraDamage,
    HitPoints,
    InjuryPoint,
    MagicalPower,
    Maneuver,
    Mindless,
    MovementSpeed(MovementMode),
    MundanePower,
    PassiveAbility,
    Power,
    Resource(Resource),
    Skill(Skill),
    SpecialDefense,
    StrikeDamageDice,
    VitalRoll,
}

// Modifier methods
impl Modifier {
    pub fn description(&self) -> String {
        match self {
            Self::Accuracy(v) => format!("{} {}", self.name(), v),
            Self::ActiveAbility(_) => self.name(),
            Self::AllDefenses(v) => format!("{} {}", self.name(), v),
            Self::Attack(_) => self.name(),
            Self::Attribute(_, v) => format!("{} by {}", self.name(), v),
            Self::BaseSpeed(v) => format!("{} {}", self.name(), v),
            Self::Defense(_, v) => format!("{} by {}", self.name(), v),
            Self::Durability(v) => format!("{} {}", self.name(), v),
            Self::Encumbrance(v) => format!("{} {}", self.name(), v),
            Self::ExtraDamage(v) => format!("{} {}", self.name(), v.to_string()),
            Self::HitPoints(v) => format!("{} {}", self.name(), v),
            Self::Immune(t) => format!("{} to {}", self.name(), t.description()),
            Self::Impervious(t) => format!("{} to {}", self.name(), t.description()),
            Self::InjuryPoint(v) => format!("{} {}", self.name(), v),
            Self::MagicalPower(v) => format!("{} {}", self.name(), v),
            Self::Mindless => self.name(),
            Self::Maneuver(_) => self.name(),
            Self::MovementSpeed(_, v) => format!("{} {}", self.name(), v),
            Self::MundanePower(v) => format!("{} {}", self.name(), v),
            Self::PassiveAbility(_) => self.name(),
            Self::Power(v) => format!("{} {}", self.name(), v),
            Self::Resource(_, v) => format!("{} by {}", self.name(), v),
            Self::Skill(_, v) => format!("{} by {}", self.name(), v),
            Self::StrikeDamageDice(v) => format!("{} {}", self.name(), v),
            Self::VitalRoll(v) => format!("{} {}", self.name(), v),
            Self::Vulnerable(t) => format!("{} to {}", self.name(), t.description()),
        }
    }

    pub fn name(&self) -> String {
        match self {
            Self::Accuracy(_) => "accuracy".to_string(),
            Self::ActiveAbility(a) => format!("active ability {}", a.name()),
            Self::AllDefenses(_) => "all defenses".to_string(),
            Self::Attack(a) => format!("attack {}", a.name),
            Self::Attribute(a, _) => format!("attribute {}", a.name()),
            Self::BaseSpeed(_) => "base speed".to_string(),
            Self::Defense(d, _) => format!("defense {}", d.name()),
            Self::Durability(_) => "durability".to_string(),
            Self::Encumbrance(_) => "encumbrance".to_string(),
            Self::ExtraDamage(_) => "extra damage".to_string(),
            Self::HitPoints(_) => "HP".to_string(),
            Self::Immune(t) => format!("immune to {}", t.description()),
            Self::Impervious(t) => format!("impervious to {}", t.description()),
            Self::InjuryPoint(_) => "injury point".to_string(),
            Self::MagicalPower(_) => "magical power".to_string(),
            Self::Maneuver(m) => format!("maneuver {}", m.name()),
            Self::Mindless => "mindless".to_string(),
            Self::MovementSpeed(m, _) => format!("{} speed", m.name()),
            Self::MundanePower(_) => "mundane power".to_string(),
            Self::PassiveAbility(a) => format!("passive ability {}", a.name),
            Self::Power(_) => "power".to_string(),
            Self::Resource(r, _) => format!("resource {}", r.name()),
            Self::Skill(s, _) => format!("skill {}", s.name()),
            Self::StrikeDamageDice(_) => "strike damage dice".to_string(),
            Self::VitalRoll(_) => "vital roll".to_string(),
            Self::Vulnerable(t) => format!("vulnerable to {}", t.description()),
        }
    }

    pub fn modifier_type(&self) -> ModifierType {
        match self {
            Self::Accuracy(_) => ModifierType::Accuracy,
            Self::ActiveAbility(_) => ModifierType::ActiveAbility,
            Self::AllDefenses(_) => ModifierType::AllDefenses,
            Self::Attack(_) => ModifierType::Attack,
            Self::Attribute(a, _) => ModifierType::Attribute(a.clone()),
            Self::BaseSpeed(_) => ModifierType::BaseSpeed,
            Self::Defense(d, _) => ModifierType::Defense(d.clone()),
            Self::Durability(_) => ModifierType::Durability,
            Self::Encumbrance(_) => ModifierType::Encumbrance,
            Self::ExtraDamage(_) => ModifierType::ExtraDamage,
            Self::HitPoints(_) => ModifierType::HitPoints,
            Self::Immune(_) => ModifierType::SpecialDefense,
            Self::Impervious(_) => ModifierType::SpecialDefense,
            Self::InjuryPoint(_) => ModifierType::InjuryPoint,
            Self::MagicalPower(_) => ModifierType::MagicalPower,
            Self::Maneuver(_) => ModifierType::Maneuver,
            Self::Mindless => ModifierType::Mindless,
            Self::MovementSpeed(m, _) => ModifierType::MovementSpeed(m.clone()),
            Self::MundanePower(_) => ModifierType::MundanePower,
            Self::PassiveAbility(_) => ModifierType::PassiveAbility,
            Self::Power(_) => ModifierType::Power,
            Self::Resource(r, _) => ModifierType::Resource(*r),
            Self::Skill(s, _) => ModifierType::Skill(s.clone()),
            Self::StrikeDamageDice(_) => ModifierType::StrikeDamageDice,
            Self::VitalRoll(_) => ModifierType::VitalRoll,
            Self::Vulnerable(_) => ModifierType::SpecialDefense,
        }
    }

    pub fn attack_definition(&self) -> Option<&Attack> {
        match self {
            Self::Attack(a) => Some(a),
            _ => None,
        }
    }

    pub fn is_magical(&self) -> bool {
        match self {
            Self::ActiveAbility(a) => a.is_magical(),
            Self::Attack(a) => a.is_magical,
            Self::PassiveAbility(a) => a.is_magical,
            Self::Maneuver(m) => m.is_magical(),
            _ => false,
        }
    }

    pub fn maneuver_definition(&self) -> Option<&Maneuver> {
        match self {
            Self::Maneuver(m) => Some(m),
            _ => None,
        }
    }

    pub fn value(&self) -> i32 {
        match self {
            Self::Accuracy(v) => *v,
            Self::ActiveAbility(_) => 0,
            Self::AllDefenses(v) => *v,
            Self::Attack(_) => 0,
            Self::Attribute(_, v) => *v,
            Self::BaseSpeed(v) => *v,
            Self::Defense(_, v) => *v,
            Self::Durability(v) => *v,
            Self::Encumbrance(v) => *v,
            Self::ExtraDamage(v) => v.average_damage() as i32,
            Self::HitPoints(v) => *v,
            Self::Immune(_) => 0,
            Self::Impervious(_) => 0,
            Self::InjuryPoint(v) => *v,
            Self::MagicalPower(v) => *v,
            Self::Maneuver(_) => 0,
            Self::Mindless => 0,
            Self::MovementSpeed(_, v) => *v,
            Self::MundanePower(v) => *v,
            Self::PassiveAbility(_) => 0,
            Self::Power(v) => *v,
            Self::Resource(_, v) => *v,
            Self::Skill(_, v) => *v,
            Self::StrikeDamageDice(v) => *v,
            Self::VitalRoll(v) => *v,
            Self::Vulnerable(_) => 0,
        }
    }
}

// static methods that generate new Modifiers
impl Modifier {
    pub fn buckler() -> Self {
        Self::Defense(Defense::Armor, 1)
    }
    pub fn reptile() -> Self {
        Self::vulnerable_tag(AbilityTag::Cold)
    }
    pub fn shield() -> Self {
        Self::Defense(Defense::Armor, 2)
    }
    pub fn immune_tag(at: AbilityTag) -> Self {
        Self::Immune(SpecialDefenseType::AbilityTag(at))
    }
    pub fn immune_debuff(d: Debuff) -> Self {
        Self::Immune(SpecialDefenseType::Debuff(d))
    }
    pub fn impervious_tag(at: AbilityTag) -> Self {
        Self::Impervious(SpecialDefenseType::AbilityTag(at))
    }
    pub fn vulnerable_tag(at: AbilityTag) -> Self {
        Self::Vulnerable(SpecialDefenseType::AbilityTag(at))
    }
}

#[derive(Clone, Debug)]
pub struct IdentifiedModifier {
    pub modifier: Modifier,
    pub source: String,
    priority: i32,
}

impl IdentifiedModifier {
    pub fn key(&self) -> String {
        format!("{} {}", self.source, self.modifier.name())
    }

    pub fn description(&self) -> String {
        format!("{}: {}", self.source, self.modifier.description())
    }

    fn replaces(&self, other: &Self) -> bool {
        self.key() == other.key() && self.priority > other.priority
    }
}

pub trait HasModifiers {
    fn add_modifier(&mut self, modifier: Modifier, name: Option<&str>, priority: Option<i32>);
    fn add_magic_modifier(&mut self, modifier: Modifier);
    fn calc_total_modifier(&self, modifier_type: ModifierType) -> i32;
    fn get_modifiers(&self) -> Vec<&Modifier>;
    fn get_modifiers_by_source(&self, source: &str) -> Vec<&Modifier>;
    fn get_modifiers_by_type(&self, modifier_type: ModifierType) -> Vec<&Modifier>;
    fn explain_modifiers(&self) -> Vec<String>;
    fn is_mindless(&self) -> bool {
        self.get_modifiers_by_type(ModifierType::Mindless).len() > 0
    }
}

impl HasModifiers for Creature {
    fn add_modifier(&mut self, modifier: Modifier, source: Option<&str>, priority: Option<i32>) {
        // Make sure the modifier is valid for the creature
        assert_modifier_is_valid(self, &modifier);

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
        modifiers
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

    fn explain_modifiers(&self) -> Vec<String> {
        let mut explanations: Vec<String> = vec![];
        explanations.append(
            &mut self
                .identified_modifiers
                .iter()
                .map(|m| m.description())
                .collect::<Vec<String>>(),
        );
        explanations.append(
            &mut self
                .anonymous_modifiers
                .iter()
                .map(|m| m.description())
                .collect::<Vec<String>>(),
        );
        explanations
    }
}

fn assert_modifier_is_valid(creature: &Creature, modifier: &Modifier) {
    if let Modifier::Maneuver(maneuver) = modifier {
        maneuver.assert_meets_rank_requirement(
            creature.name.as_ref().unwrap_or(&"???".to_string()),
            creature.rank(),
        )
    }
}
