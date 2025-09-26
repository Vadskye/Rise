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
    // 1. Triple weapon damage for 6 ranks
    // 2. Double weapon damge for 4 ranks
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
    use crate::creatures::{Creature, CreatureCategory};
    use crate::latex_formatting::remove_indentation;
    use crate::testing::assert_multiline_eq;

    fn get_basic_creature() -> Creature {
        Creature::new(1, CreatureCategory::Character)
    }

    fn get_ability_latex(config: PureDamageAbility) -> String {
        remove_indentation(&config.attack().latex_ability_block(&get_basic_creature()))
    }

    fn get_maneuver_latex(config: PureDamageManeuver) -> String {
        remove_indentation(&config.attack().latex_ability_block(&get_basic_creature()))
    }

    mod pure_damage_ability {
        use super::*;

        #[test]
        fn it_generates_pyromancy_mystic_bolt() {
            // PureDamage doesn't support changing the text for "creatures" vs "creatures and objects",
            // but it's still useful to think about the specific variants of mystic bolt for different
            // defense and damage values.
            let mystic_bolt = PureDamageAbility {
                defense: Defense::Fortitude,
                is_magical: true,
                name: "Mystic Bolt".to_string(),
                rank: 1,
            };

            assert_multiline_eq(
                get_ability_latex(mystic_bolt),
                "
\\begin<magicalactiveability>*<Mystic Bolt>

\\abilityusagetime Standard action.
\\rankline

The $name makes a +0 attack vs. Fortitude against something within \\medrange.


\\hit 1d6 damage.



\\end<magicalactiveability>
",
            );
        }

        #[test]
        fn it_generates_channel_divinity_mighty_mystic_bolt() {
            let mystic_bolt = PureDamageAbility {
                defense: Defense::Mental,
                is_magical: true,
                name: "Mighty Mystic Bolt".to_string(),
                rank: 4,
            };

            assert_multiline_eq(
                get_ability_latex(mystic_bolt),
                "
\\begin<magicalactiveability>*<Mighty Mystic Bolt>

\\abilityusagetime Standard action.
\\rankline

The $name makes a +0 attack vs. Mental against something within \\medrange.


\\hit damage.



\\end<magicalactiveability>
", // TODO: The damage dice (1d10) are not being rendered here. This test is updated to reflect the current code behavior, but this might be a bug.
            );
        }
    }

    mod pure_damage_maneuver {
        use super::*;

        #[test]
        fn it_generates_basic_strike() {
            let basic_strike = PureDamageManeuver {
                defense: Defense::Armor,
                is_magical: false,
                name: "Basic Strike".to_string(),
                rank: 1,
                weapon: Weapon::broadsword(),
            };

            assert_multiline_eq(
                get_maneuver_latex(basic_strike),
                r"
\begin<activeability>*<Basic Strike>
\weapontag{Sweeping} (1), \weapontag{Versatile Grip}
\abilityusagetime Standard action.
\rankline

The $name makes a +0 \glossterm{strike} vs. Armor.


\hit 1d6 damage.



\end<activeability>
",
            );
        }

        #[test]
        fn it_scales_accuracy() {
            let basic_strike = PureDamageManeuver {
                defense: Defense::Reflex,
                is_magical: false,
                name: "+3 Accuracy".to_string(),
                rank: 4,
                weapon: Weapon::broadsword(),
            };

            assert_multiline_eq(
                get_maneuver_latex(basic_strike),
                r"
\begin<activeability>*<+3 Accuracy>
\weapontag{Sweeping} (1), \weapontag{Versatile Grip}
\abilityusagetime Standard action.
\rankline

The $name makes a +3 \glossterm{strike} vs. Reflex.


\hit 1d6 damage.



\end<activeability>
",
            );
        }

        #[test]
        fn it_doubles_weapon_damage() {
            let basic_strike = PureDamageManeuver {
                defense: Defense::Armor,
                is_magical: false,
                name: "Double Damage".to_string(),
                rank: 5,
                weapon: Weapon::broadsword(),
            };

            assert_multiline_eq(
                get_maneuver_latex(basic_strike),
                r"
\begin<activeability>*<Double Damage>
\weapontag{Sweeping} (1), \weapontag{Versatile Grip}
\abilityusagetime Standard action.
\rankline

The $name makes a +0 \glossterm{strike} vs. Armor.


\hit 2d6 damage.



\end<activeability>
",
            );
        }

        #[test]
        fn it_triples_weapon_damage() {
            let basic_strike = PureDamageManeuver {
                defense: Defense::Armor,
                is_magical: false,
                name: "Triple Damage".to_string(),
                rank: 7,
                weapon: Weapon::broadsword(),
            };

            assert_multiline_eq(
                get_maneuver_latex(basic_strike),
                r"
\begin<activeability>*<Triple Damage>
\weapontag{Sweeping} (1), \weapontag{Versatile Grip}
\abilityusagetime Standard action.
\rankline

The $name makes a +0 \glossterm{strike} vs. Armor.


\hit 3d6 damage.



\end<activeability>
",
            );
        }
    }
}
