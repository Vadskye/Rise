use crate::creatures::Creature;
use crate::core_mechanics::abilities::Cooldown;

pub struct ActiveAbility {
    pub cooldown: Option<Cooldown>,
    pub effect: String,
    pub is_magical: bool,
    pub name: String,
}

// LaTeX generation functions
impl ActiveAbility {
    pub fn latex_ability_block(&self, creature: &Creature) -> String {
        return "TODO".to_string();
    }
}
