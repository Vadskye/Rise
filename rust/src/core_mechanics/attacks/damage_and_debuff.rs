use crate::core_mechanics::abilities::{Range, Targeting};
use crate::core_mechanics::attacks::attack_effect::{
    AttackEffectDuration, AttackTriggeredEffect, DebuffEffect,
};
use crate::core_mechanics::attacks::{Attack, AttackEffect, SimpleDamageEffect};
use crate::core_mechanics::{DamageType, Debuff, Defense, Tag};
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
        if spendable_ranks >= 2 {
            duration = AttackEffectDuration::Condition;
            spendable_ranks -= 2;
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
        // Maneuvers have half accuracy scaling since their base damage is higher
        let accuracy = if self.is_maneuver {
            spendable_ranks / 2
        } else {
            spendable_ranks
        };

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
        let hp_modifier = if self.must_lose_hp { -4 } else { 0 };
        // Maneuvers are 3 ranks higher than equivalent Short-range spells.
        let maneuver_modifier = if self.is_maneuver { 3 } else { 0 };
        // The absolute worst possible baseline is a brief debuff with "immune after
        // effect ends". At short range, that would be a rank -4 effect for a tier 1
        // debuff.
        // Although touch range spells could exist in theory, they shouldn't be common
        // and aren't part of generic generators like this.
        let minimum_rank = self.debuff.tier() * 4 - 8 + hp_modifier + maneuver_modifier;
        if minimum_rank > self.rank {
            panic!(
                "Minimum rank is too high for {} debuff: have {}, need {}",
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
            crit: None,
            defense: self.defense,
            extra_context: None,
            hit: AttackEffect::Damage(
                SimpleDamageEffect::dr(self.rank - 2, self.damage_types.clone()).except(|d| {
                    d.lose_hp_effect = spent_rank_results.lose_hp_effect.clone();
                    d.take_damage_effect = spent_rank_results.take_damage_effect.clone();
                }),
            ),
            is_magical: self.is_magical,
            is_strike: false,
            name: self.name.clone(),
            replaces_weapon: None,
            tags: self.tags.clone(),
            targeting: Targeting::Creature(spent_rank_results.maybe_range.unwrap()),
        };
    }

    pub fn weapon_attack(&self, weapon: &Weapon) -> Attack {
        let spent_rank_results = self.spend_ranks();

        return weapon
            .attack()
            .except(|a| {
                a.accuracy += spent_rank_results.accuracy;
                a.name = self.name.clone();
                a.defense = self.defense;
            })
            .except_hit_damage(|d| {
                // TODO: apply weak strike or double damage strike as appropriate
                d.damage_types.append(&mut self.damage_types.clone());
                d.lose_hp_effect = spent_rank_results.lose_hp_effect.clone();
                d.take_damage_effect = spent_rank_results.take_damage_effect;
            });
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::core_mechanics::SpecialDefenseType;
    use crate::creatures::{Character, Creature};
    use crate::equipment::StandardWeapon;
    use crate::latex_formatting::standardize_indentation;

    fn get_basic_creature() -> Creature {
        return Character::standard_character(1, false).creature;
    }

    fn get_standard_ability_block(config: LowDamageAndDebuff) -> String {
        if config.is_maneuver {
            return standardize_indentation(
                &config
                    .weapon_attack(&StandardWeapon::Club.weapon())
                    .latex_ability_block(&get_basic_creature()),
            );
        } else {
            return standardize_indentation(
                &config.attack().latex_ability_block(&get_basic_creature()),
            );
        }
    }

    #[test]
    fn it_generates_organ_failure() {
        let organ_failure = LowDamageAndDebuff {
            damage_types: vec![DamageType::Physical],
            debuff: Debuff::Stunned,
            defense: Defense::Fortitude,
            must_lose_hp: true,
            is_magical: true,
            is_maneuver: false,
            name: "Organ Failure".to_string(),
            rank: 1,
            tags: None,
        };

        assert_eq!(
            "
\\begin<magicalactiveability>*<Organ Failure>
\\rankline
The $name makes a +0 attack vs. Fortitude against one creature within \\medrange.
\\hit The target takes 1d4 physical damage.
Each creature that loses \\glossterm<hit points> from this attack is \\stunned as a \\glossterm{condition}.
\\end<magicalactiveability>",
            get_standard_ability_block(organ_failure)
        );
    }

    #[test]
    fn it_scales_organ_failure() {
        let organ_failure = LowDamageAndDebuff {
            damage_types: vec![DamageType::Physical],
            debuff: Debuff::Stunned,
            defense: Defense::Fortitude,
            must_lose_hp: true,
            is_magical: true,
            is_maneuver: false,
            name: "Super Organ Failure".to_string(),
            rank: 7,
            tags: None,
        };

        assert_eq!(
            "
\\begin<magicalactiveability>*<Super Organ Failure>
\\rankline
The $name makes a +5 attack vs. Fortitude against one creature within \\longrange.
\\hit The target takes 2d10 physical damage.
Each creature that loses \\glossterm<hit points> from this attack is \\stunned as a \\glossterm{condition}.
\\end<magicalactiveability>",
            get_standard_ability_block(organ_failure)
        );
    }

    #[test]
    fn it_generates_strip_the_flesh() {
        let strip_the_flesh = LowDamageAndDebuff {
            damage_types: vec![],
            debuff: Debuff::Vulnerable(Box::new(SpecialDefenseType::AllDamage)),
            defense: Defense::Armor,
            must_lose_hp: true,
            is_magical: false,
            is_maneuver: true,
            name: "Strip the Flesh".to_string(),
            rank: 3,
            tags: None,
        };

        assert_eq!(
            "
\\begin<ability>*<Strip the Flesh>
\\rankline
The $name makes a +0 \\glossterm{strike} vs. Armor.
\\hit The target takes 1d10 bludgeoning damage.
Each creature that loses \\glossterm<hit points> from this attack is \\vulnerable to all damage as a \\glossterm{condition}.
\\end<ability>",
            get_standard_ability_block(strip_the_flesh)
        );
    }

    #[test]
    fn it_generates_eye_poke() {
        let eye_poke = LowDamageAndDebuff {
            damage_types: vec![],
            debuff: Debuff::Dazzled,
            defense: Defense::Armor,
            must_lose_hp: false,
            is_magical: false,
            is_maneuver: true,
            name: "Eye Poke".to_string(),
            rank: 1,
            tags: None,
        };

        assert_eq!(
            "
\\begin<ability>*<Eye Poke>
\\rankline
The $name makes a +0 \\glossterm{strike} vs. Armor.
\\hit The target takes 1d10 bludgeoning damage.
Each damaged creature is \\glossterm{briefly} \\dazzled.
\\end<ability>",
            get_standard_ability_block(eye_poke)
        );
    }

    #[test]
    fn it_generates_greater_eye_poke() {
        let eye_poke = LowDamageAndDebuff {
            damage_types: vec![],
            debuff: Debuff::Dazzled,
            defense: Defense::Armor,
            must_lose_hp: false,
            is_magical: false,
            is_maneuver: true,
            name: "Greater Eye Poke".to_string(),
            rank: 3,
            tags: None,
        };

        assert_eq!(
            "
\\begin<ability>*<Greater Eye Poke>
\\rankline
The $name makes a +0 \\glossterm{strike} vs. Armor.
\\hit The target takes 1d10 bludgeoning damage.
Each damaged creature is \\dazzled as a \\glossterm{condition}.
\\end<ability>",
            get_standard_ability_block(eye_poke)
        );
    }

    #[test]
    fn it_generates_super_eye_poke() {
        let eye_poke = LowDamageAndDebuff {
            damage_types: vec![],
            debuff: Debuff::Dazzled,
            defense: Defense::Armor,
            must_lose_hp: false,
            is_magical: false,
            is_maneuver: true,
            name: "Super Eye Poke".to_string(),
            rank: 7,
            tags: None,
        };

        assert_eq!(
            "
\\begin<ability>*<Super Eye Poke>
\\rankline
The $name makes a +2 \\glossterm{strike} vs. Armor.
\\hit The target takes 1d10 bludgeoning damage.
Each damaged creature is \\dazzled as a \\glossterm{condition}.
\\end<ability>",
            get_standard_ability_block(eye_poke)
        );
    }
}
