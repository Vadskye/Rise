use crate::core_mechanics::abilities::{Range, Targeting};
use crate::core_mechanics::attacks::{Attack, AttackEffect, SimpleDamageEffect};
use crate::core_mechanics::{DamageType, Defense};
use crate::equipment::Weapon;

pub struct PureDamage {
    pub damage_types: Vec<DamageType>,
    pub defense: Defense,
    pub is_magical: bool,
    pub is_maneuver: bool,
    pub name: String,
    pub range: Option<Range>,
    pub rank: i32,
}

struct SpentRankResults {
    accuracy_modifier: i32,
    maybe_range: Option<Range>,
}

impl PureDamage {
    pub fn attack(&self) -> Attack {
        let spent_rank_results = self.spend_ranks();

        Attack {
            accuracy: 0,
            crit: None,
            defense: self.defense,
            extra_context: None,
            hit: AttackEffect::Damage(SimpleDamageEffect::dr(self.rank, self.damage_types.clone())),
            is_magical: self.is_magical,
            is_strike: false,
            name: self.name.clone(),
            replaces_weapon: None,
            tags: None,
            targeting: Targeting::Creature(spent_rank_results.maybe_range.unwrap()),
        }
    }

    pub fn weapon_attack(&self, weapon: &Weapon) -> Attack {
        let spent_rank_results = self.spend_ranks();

        weapon
            .attack()
            .except(|a| {
                a.accuracy += spent_rank_results.accuracy_modifier;
                a.name = self.name.clone();
                a.defense = self.defense;
            })
            .except_hit_damage(|d| {
                d.damage_types.append(&mut self.damage_types.clone());
            })
    }

    // If we have ranks to spend, spend them in the following order:
    // 1. Increase to Medium range if this isn't a maneuver and doesn't have a set range
    // 2. Increase to Long range if this isn't a maneuver, doesn't have a set range, and will
    //    gain at least +1d already.
    // 3. Accuracy
    fn spend_ranks(&self) -> SpentRankResults {
        let mut spendable_ranks = self.rank - self.calculate_minimum_rank();
        let mut maybe_range = self.range.clone();
        if !self.is_maneuver && self.range.is_none() {
            if spendable_ranks >= 4 {
                maybe_range = Some(Range::Long);
                spendable_ranks -= 2;
            } else if spendable_ranks >= 1 {
                maybe_range = Some(Range::Medium);
                spendable_ranks -= 1;
            } else {
                maybe_range = Some(Range::Short);
            }
        }

        SpentRankResults {
            accuracy_modifier: spendable_ranks,
            maybe_range,
        }
    }

    fn calculate_minimum_rank(&self) -> i32 {
        if let Some(ref r) = self.range {
            r.minimum_rank()
        } else {
            0
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::creatures::{Character, Creature};
    use crate::equipment::StandardWeapon;
    use crate::latex_formatting::standardize_indentation;

    fn get_basic_creature() -> Creature {
        Character::standard_character(1, false).creature
    }

    fn get_standard_ability_block(config: PureDamage) -> String {
        if config.is_maneuver {
            standardize_indentation(
                &config
                    .weapon_attack(&StandardWeapon::Club.weapon())
                    .latex_ability_block(&get_basic_creature()),
            )
        } else {
            standardize_indentation(&config.attack().latex_ability_block(&get_basic_creature()))
        }
    }

    #[test]
    fn it_generates_mystic_bolt() {
        let mystic_bolt = PureDamage {
            damage_types: vec![DamageType::Energy],
            defense: Defense::Armor,
            is_magical: true,
            is_maneuver: false,
            name: "Mystic Bolt".to_string(),
            range: None,
            rank: 1,
        };

        assert_eq!(
            "
\\begin<magicalactiveability>*<Mystic Bolt>
\\rankline
The $name makes a +0 attack vs. Armor against one creature within \\medrange.
\\hit 1d8+2 energy damage.
\\end<magicalactiveability>",
            get_standard_ability_block(mystic_bolt)
        );
    }

    #[test]
    fn it_generates_greater_mystic_bolt() {
        let mystic_bolt = PureDamage {
            damage_types: vec![DamageType::Energy],
            defense: Defense::Armor,
            is_magical: true,
            is_maneuver: false,
            name: "Greater Mystic Bolt".to_string(),
            range: None,
            rank: 3,
        };

        assert_eq!(
            "
\\begin<magicalactiveability>*<Greater Mystic Bolt>
\\rankline
The $name makes a +0 attack vs. Armor against one creature within \\medrange.
\\hit 2d8+2 energy damage.
\\end<magicalactiveability>",
            get_standard_ability_block(mystic_bolt)
        );
    }

    #[test]
    fn it_generates_supreme_mystic_bolt() {
        let mystic_bolt = PureDamage {
            damage_types: vec![DamageType::Energy],
            defense: Defense::Armor,
            is_magical: true,
            is_maneuver: false,
            name: "Supreme Mystic Bolt".to_string(),
            range: None,
            rank: 6,
        };

        assert_eq!(
            "
\\begin<magicalactiveability>*<Supreme Mystic Bolt>
\\rankline
The $name makes a +0 attack vs. Armor against one creature within \\longrange.
\\hit 4d10+2 energy damage.
\\end<magicalactiveability>",
            get_standard_ability_block(mystic_bolt)
        );
    }
}
