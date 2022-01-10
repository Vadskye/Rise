use super::latex::latex_ability_block;
use crate::core_mechanics::abilities::{AbilityTag, AbilityType, Cooldown, UsageTime};

pub struct ActiveAbility {
    pub ability_type: AbilityType,
    pub cooldown: Option<Cooldown>,
    pub effect: String,
    pub is_magical: bool,
    pub name: String,
    pub tags: Option<Vec<AbilityTag>>,
    pub usage_time: Option<UsageTime>,
}

// LaTeX generation functions
impl ActiveAbility {
    pub fn latex_ability_block(self) -> String {
        return latex_ability_block(
            self.ability_type,
            self.effect,
            self.name,
            self.tags,
            self.usage_time,
        );
    }
}
