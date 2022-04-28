use crate::core_mechanics::abilities::{Range, Targeting};
use crate::core_mechanics::attacks::attack_effect::{
    AttackEffectDuration, AttackTriggeredEffect, DamageEffect, DebuffEffect,
};
use crate::core_mechanics::attacks::{Attack, AttackEffect};
use crate::core_mechanics::{DamageDice, DamageType, Debuff, Defense, Tag};

pub struct LowDamageAndDebuff {
    pub damage_types: Vec<DamageType>,
    pub debuff: Debuff,
    pub defense: Defense,
    pub must_lose_hp: bool,
    pub is_magical: bool,
    pub name: String,
    pub rank: i32,
    pub tags: Option<Vec<Tag>>,
}

impl LowDamageAndDebuff {
    pub fn attack(self) -> Attack {
        // Most effects other than specifically "low damage + debuff" would have a rank
        // modifier of 0 for not relying on HP. However, this needs a +1 rank modifier to avoid
        // being better than a simple debuff-only effect.
        // The baseline rank for a short range tier 1 debuff is 0. Although touch range spells could
        // exist in theory, they shouldn't be common and aren't part of generic generators like this.
        let minimum_rank = self.debuff.tier() * 4 - 4;
        if minimum_rank < self.rank {
            panic!(
                "Minimum rank is too low for {} debuff: have {}, need {}",
                self.debuff.name(),
                self.rank,
                minimum_rank
            );
        }

        // If we have ranks to spend, spend them in the following order:
        // 1. If not using HP, remove the "immune after first success" limitation
        // 2. Increase to Long range
        // 3. Accuracy
        let mut spendable_ranks = self.rank - minimum_rank;
        let mut range = Range::Short;
        let mut immune_after_first_success = !self.must_lose_hp;
        if spendable_ranks >= 2 && immune_after_first_success {
            immune_after_first_success = false;
            spendable_ranks -= 2;
        }
        if spendable_ranks >= 2 {
            range = Range::Long;
            spendable_ranks -= 2;
        } else if spendable_ranks == 1 {
            range = Range::Medium;
            spendable_ranks -= 1;
        }
        let accuracy = spendable_ranks;

        let triggered_effect = AttackTriggeredEffect::Debuff(DebuffEffect {
            debuffs: vec![self.debuff],
            duration: if self.must_lose_hp {
                AttackEffectDuration::Condition
            } else {
                AttackEffectDuration::Brief
            },
        });
        let mut lose_hp_effect = None;
        let mut take_damage_effect = None;
        if self.must_lose_hp {
            lose_hp_effect = Some(triggered_effect);
        } else {
            take_damage_effect = Some(triggered_effect);
        }

        return Attack {
            accuracy,
            cooldown: None,
            crit: None,
            defense: self.defense,
            hit: AttackEffect::Damage(DamageEffect {
                damage_dice: DamageDice::single_target_damage(self.rank - 2),
                damage_modifier: 0,
                damage_types: self.damage_types,
                extra_defense_effect: None,
                lose_hp_effect,
                power_multiplier: 0.0,
                take_damage_effect,
                vampiric_healing: None,
            }),
            is_magical: self.is_magical,
            is_strike: false,
            movement: None,
            name: self.name,
            replaces_weapon: None,
            tags: self.tags,
            targeting: Targeting::Creature(range),
        };
    }
}
