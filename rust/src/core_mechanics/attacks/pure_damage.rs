use crate::core_mechanics::abilities::{Range, Targeting};
use crate::core_mechanics::attacks::{Attack, AttackEffect, SimpleDamageEffect};
use crate::core_mechanics::Defense;
use crate::equipment::Weapon;

// TODO: what is the generic name for "non-strike attack"?
pub struct PureDamageAbility {
    pub defense: Defense,
    pub is_magical: bool,
    pub name: String,
    pub rank: i32,
}

pub struct PureDamageManeuver {
    pub defense: Defense,
    pub is_magical: bool,
    pub name: String,
    pub rank: i32,
    pub weapon: Weapon,
}

struct SpentRankResults {
    accuracy_modifier: i32,
    weapon_damage_multiplier: i32,
}

impl PureDamageAbility {
    pub fn attack(&self) -> Attack {
        Attack {
            accuracy: 0,
            crit: None,
            defense: self.defense,
            extra_context: None,
            hit: AttackEffect::Damage(SimpleDamageEffect::dr(self.rank)),
            is_magical: self.is_magical,
            is_strike: false,
            name: self.name.clone(),
            replaces_weapon: None,
            tags: None,
            targeting: Targeting::Anything(Range::Medium),
        }
    }
}

impl PureDamageManeuver {
    pub fn attack(&self) -> Attack {
        let spent_rank_results = self.spend_ranks();

        self.weapon
            .attack()
            .except(|a| {
                a.accuracy += spent_rank_results.accuracy_modifier;
                a.name = self.name.clone();
                a.defense = self.defense;
            })
            .except_hit_damage(|d| {
                d.base_dice.multiplier = spent_rank_results.weapon_damage_multiplier;
            })
    }

    // If we have ranks to spend, spend them in the following order:
    // 1. Triple damage for 6 ranks
    // 2. Double damge for 4 ranks
    // 3. Accuracy
    fn spend_ranks(&self) -> SpentRankResults {
        let mut spendable_ranks = self.rank - 1;
        let mut weapon_damage_multiplier = 1;
        if spendable_ranks >= 6 {
            weapon_damage_multiplier = 3;
            spendable_ranks -= 6;
        } else if spendable_ranks >= 4 {
            weapon_damage_multiplier = 2;
            spendable_ranks -= 4;
        }

        SpentRankResults {
            accuracy_modifier: spendable_ranks,
            weapon_damage_multiplier,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::creatures::Creature;
    use crate::latex_formatting::remove_indentation;

    fn get_basic_creature() -> Creature {
        Creature::new(1)
    }

    fn get_ability_latex(config: PureDamageAbility) -> String {
        remove_indentation(&config.attack().latex_ability_block(&get_basic_creature()))
    }

    fn get_maneuver_latex(config: PureDamageManeuver) -> String {
        remove_indentation(&config.attack().latex_ability_block(&get_basic_creature()))
    }
}
