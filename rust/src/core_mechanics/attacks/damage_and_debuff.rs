use crate::core_mechanics::abilities::{Range, Targeting};
use crate::core_mechanics::attacks::attack_effect::{
    AttackEffectDuration, AttackTriggeredEffect, DamageEffect, DebuffEffect,
};
use crate::core_mechanics::attacks::{Attack, AttackEffect};
use crate::core_mechanics::{DamageDice, DamageType, Debuff, Defense, Tag};
use crate::equipment::Weapon;

pub struct LowDamageAndDebuff {
    pub damage_types: Vec<DamageType>,
    pub debuff: Debuff,
    pub defense: Defense,
    pub must_lose_hp: bool,
    pub is_magical: bool,
    pub is_maneuver: bool,
    pub name: String,
    pub rank: i32,
    pub tags: Option<Vec<Tag>>,
}

struct SpentRankResults {
    accuracy: i32,
    maybe_range: Option<Range>,
    lose_hp_effect: Option<AttackTriggeredEffect>,
    take_damage_effect: Option<AttackTriggeredEffect>,
}

impl LowDamageAndDebuff {
    // If we have ranks to spend, spend them in the following order:
    // 1. Remove the "immune after effect ends" limitation
    // 2. Increase duration from brief to condition
    // 3. Increase to Long range if this isn't a maneuver
    // 4. Accuracy
    fn spend_ranks(&self) -> SpentRankResults {
        let mut spendable_ranks = self.rank - self.calculate_minimum_rank();

        let mut duration = AttackEffectDuration::Brief;
        let mut immune_after_effect_ends = true;
        if spendable_ranks >= 2 {
            immune_after_effect_ends = false;
            spendable_ranks -= 2;
        }
        if spendable_ranks >= 4 {
            duration = AttackEffectDuration::Condition;
        }
        let mut maybe_range = None;
        if !self.is_maneuver {
            if spendable_ranks >= 2 {
                maybe_range = Some(Range::Long);
                spendable_ranks -= 2;
            } else if spendable_ranks == 1 {
                maybe_range = Some(Range::Medium);
                spendable_ranks -= 1;
            } else {
                maybe_range = Some(Range::Short);
            }
        }
        let accuracy = spendable_ranks;

        let triggered_effect = AttackTriggeredEffect::Debuff(DebuffEffect {
            debuffs: vec![self.debuff.clone()],
            duration,
            immune_after_effect_ends,
        });
        let mut lose_hp_effect = None;
        let mut take_damage_effect = None;
        if self.must_lose_hp {
            lose_hp_effect = Some(triggered_effect);
        } else {
            take_damage_effect = Some(triggered_effect);
        }

        return SpentRankResults {
            accuracy,
            maybe_range,
            lose_hp_effect,
            take_damage_effect,
        };
    }

    fn calculate_minimum_rank(&self) -> i32 {
        // Maneuvers are 2 ranks higher than equivalent spells.
        let maneuver_modifier = if self.is_maneuver { 2 } else { 0 };
        // The absolute worst possible baseline is a brief debuff with "immune after
        // effect ends". At short range, that would be a rank -6 effect for a tier 1
        // debuff.
        // Although touch range spells could exist in theory, they shouldn't be common
        // and aren't part of generic generators like this.
        let minimum_rank = self.debuff.tier() * 4 - 10 + maneuver_modifier;
        if minimum_rank < self.rank {
            panic!(
                "Minimum rank is too low for {} debuff: have {}, need {}",
                self.debuff.name(),
                self.rank,
                minimum_rank
            );
        }
        return minimum_rank;
    }

    pub fn attack(&self) -> Attack {
        let spent_rank_results = self.spend_ranks();

        return Attack {
            accuracy: spent_rank_results.accuracy,
            cooldown: None,
            crit: None,
            defense: self.defense,
            hit: AttackEffect::Damage(DamageEffect {
                damage_dice: DamageDice::single_target_damage(self.rank - 2),
                damage_modifier: 0,
                damage_types: self.damage_types.clone(),
                extra_defense_effect: None,
                lose_hp_effect: spent_rank_results.lose_hp_effect,
                power_multiplier: 0.0,
                take_damage_effect: spent_rank_results.take_damage_effect,
                vampiric_healing: None,
            }),
            is_magical: self.is_magical,
            is_strike: false,
            movement: None,
            name: self.name.clone(),
            replaces_weapon: None,
            tags: self.tags.clone(),
            targeting: Targeting::Creature(spent_rank_results.maybe_range.unwrap()),
        };
    }

    pub fn weapon_attack(&self, weapon: Weapon) -> Attack {
        let spent_rank_results = self.spend_ranks();

        return weapon
            .attack()
            .except(|a| a.accuracy += spent_rank_results.accuracy)
            .except(|a| a.name = self.name.clone())
            .except(|a| a.defense = self.defense)
            .except_hit_damage(|d| d.damage_types.append(&mut self.damage_types.clone()))
            .except_hit_damage(|d| d.lose_hp_effect = spent_rank_results.lose_hp_effect.clone())
            .except_hit_damage(|d| d.take_damage_effect = spent_rank_results.take_damage_effect);
    }
}
