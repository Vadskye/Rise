use super::*;
use crate::core_mechanics::attacks::{HasAttacks, StandardAttack};

#[cfg(test)]
mod statistics {
    use super::*;

    #[cfg(test)]
    mod firebolt_scaling {
        use super::*;

        fn generate_creature(cr: ChallengeRating, level: i32) -> Creature {
            let mut creature = Monster::standard_monster(cr, level, None, None).creature;
            creature.add_modifier(
                Modifier::Attack(
                    StandardAttack::Firebolt((level + 2) / 3).attack(),
                ),
                None,
                None,
            );
            creature
        }

        fn firebolt_description(creature: Creature) -> String {
            let firebolt = creature
                .calc_all_attacks()
                .into_iter()
                .find(|a| a.name.contains("Firebolt"));
            firebolt.unwrap().shorthand_description(&creature)
        }

        #[test]
        fn level_1() {
            let level = 1;
            let actual = [
                firebolt_description(generate_creature(ChallengeRating::One, level)),
                firebolt_description(generate_creature(ChallengeRating::Four, level)),
            ];
            let expected = [
                "Firebolt +1 (1d6+2 fire damage.)", // Normal
                "Firebolt +3 (1d6+4 fire damage.)",  // Elite
            ];
            assert_eq!(expected, actual, "Normal, Elite");
        }

        #[test]
        fn level_8() {
            let level = 8;
            let actual = [
                firebolt_description(generate_creature(ChallengeRating::One, level)),
                firebolt_description(generate_creature(ChallengeRating::Four, level)),
            ];
            let expected = [
                "Firebolt +6 (1d6+2d8 fire damage.)", // Normal
                "Firebolt +8 (1d6+3d8 fire damage.)", // Elite
            ];
            assert_eq!(expected, actual, "Normal, Elite");
        }

        #[test]
        fn level_16() {
            let level = 16;
            let actual = [
                firebolt_description(generate_creature(ChallengeRating::One, level)),
                firebolt_description(generate_creature(ChallengeRating::Four, level)),
            ];
            let expected = [
                "Firebolt +10 (7d8 fire damage.)",
                "Firebolt +12 (9d8 fire damage.)",
            ];
            assert_eq!(expected, actual, "Normal, Elite",);
        }

        #[test]
        fn level_21() {
            let level = 21;
            let actual = [
                firebolt_description(generate_creature(ChallengeRating::One, level)),
                firebolt_description(generate_creature(ChallengeRating::Four, level)),
            ];
            let expected = [
                "Firebolt +13 (9d10 fire damage.)",
                "Firebolt +15 (11d10 fire damage.)",
            ];
            assert_eq!(expected, actual, "Normal, Elite",);
        }
    }
}
