use super::{CustomAbility, StrikeAbility};
use crate::core_mechanics::abilities::UsageTime;
use crate::creatures::Creature;

#[derive(Clone, Debug)]
pub enum ActiveAbility {
    Custom(CustomAbility),
    Strike(StrikeAbility),
}

impl ActiveAbility {
    pub fn latex_ability_block(self, creature: &Creature) -> String {
        match self {
            Self::Custom(c) => c.latex_ability_block(creature),
            Self::Strike(s) => s.latex_ability_block(creature),
        }
    }

    pub fn name(&self) -> String {
        match self {
            Self::Custom(c) => c.name.clone(),
            Self::Strike(s) => s.name.clone(),
        }
    }

    pub fn is_magical(&self) -> bool {
        match self {
            Self::Custom(c) => c.is_magical,
            Self::Strike(s) => s.is_magical,
        }
    }

    pub fn is_elite(&self) -> bool {
        match self {
            Self::Custom(c) => c.usage_time == UsageTime::Elite,
            Self::Strike(s) => s.usage_time == UsageTime::Elite,
        }
    }

    pub fn plus_accuracy(self, modifier: i32) -> Self {
        match self {
            Self::Custom(c) => Self::Custom(c.plus_accuracy(modifier)),
            Self::Strike(s) => Self::Strike(s.plus_accuracy(modifier)),
        }
    }

    pub fn validate(&self) {
        match self {
            Self::Custom(c) => c.validate(),
            Self::Strike(s) => s.validate(),
        }
    }
}
