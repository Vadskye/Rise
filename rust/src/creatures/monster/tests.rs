use super::*;
use crate::core_mechanics::attacks::{Maneuver, HasAttacks, StandardAttack};
use crate::core_mechanics::{HasDamageAbsorption, HasDefenses};
use std::cmp::max;

#[cfg(test)]
mod to_section {
    use super::*;

    fn assert_multiline_eq(left: &str, right: String) {
        let left_split = left.split("\n").collect::<Vec<&str>>();
        let right_split = right.split("\n").collect::<Vec<&str>>();
        for i in 1..max(left_split.len(), right_split.len()) {
            if i == left_split.len() {
                panic!(
                    "Left is missing line {}; right has `{}`\n{}\n",
                    i, right_split[i], right,
                );
            } else if i == right_split.len() {
                panic!(
                    "Right is missing line {}; right has `{}`\n{}\n",
                    i, left_split[i], right
                );
            } else {
                assert_eq!(left_split[i], right_split[i], "\n{}\n", right);
            }
        }
    }

    #[test]
    fn standard_monster_level_1_cr1() {
        let monster = Monster::standard_monster(ChallengeRating::One, 1, None, None);
        assert_multiline_eq(
            r"
                \begin{monsubsection}{Standard Monster}{1}
                    \monstersize{Medium planeforged}
                    \RaggedRight
                    \begin{monsterstatistics}
                \pari \textbf{HP} 11
                    \monsep \textbf{DR} 4
                \pari \textbf{Defenses}
                    Armor 7
                    \monsep Fort 7
                    \monsep Ref 7
                    \monsep Ment 9
                    \rankline
                    \pari \textbf{Attributes} Str 4, Dex 2, Con 2, Int 2, Per 2, Wil 4
                    \pari \textbf{Alignment}
                \end{monsterstatistics}
                \end{monsubsection}
                \monsterabilitiesheader{Standard Monster}
                \begin{activeability}*{Slam}
                \rankline
                The standard monster makes a \plus1 \glossterm{strike} vs. Armor.
                \hit The target takes 2d8\plus2 bludgeoning damage.
            \end{activeability}
",
            monster.to_section(None),
        );
    }

    #[test]
    fn standard_monster_level_10_cr4() {
        let monster = Monster::standard_monster(ChallengeRating::Four, 10, None, None);
        assert_multiline_eq(
            r"
                \begin{monsubsection}{Standard Monster}{10}[Elite]
                    \monstersize{Medium planeforged}
                    \RaggedRight
                    \begin{monsterstatistics}
                \pari \textbf{HP} 84
                    \monsep \textbf{DR} 52
                \pari \textbf{Defenses}
                    Armor 13
                    \monsep Fort 13
                    \monsep Ref 13
                    \monsep Ment 16
                    \rankline
                    \pari \textbf{Attributes} Str 5, Dex 2, Con 2, Int 2, Per 2, Wil 5
                    \pari \textbf{Alignment}
                \end{monsterstatistics}
                \end{monsubsection}
                \monsterabilitiesheader{Standard Monster}
                \begin{activeability}*{Slam}
                \rankline
                The standard monster makes a \plus7 \glossterm{strike} vs. Armor.
                \hit The target takes 4d8\plus12 bludgeoning damage.
            \end{activeability}
",
            monster.to_section(None),
        );
    }

    #[test]
    fn with_maneuvers() {
        let mut monster = Monster::standard_monster(ChallengeRating::One, 10, None, None);
        monster
            .creature
            .weapons
            .push(StandardWeapon::Greatsword.weapon());
        monster.creature.add_modifier(
            Modifier::Attack(
                Maneuver::StripTheFlesh.attack(StandardWeapon::Greatsword.weapon()),
            ),
            None,
            None,
        );
        monster
            .creature
            .add_modifier(Modifier::Maneuver(Maneuver::CertainStrike), None, None);
        assert_multiline_eq(
            r"
                \begin{monsubsection}{Standard Monster}{10}[Elite]
                    \monstersize{Medium planeforged}
                    \RaggedRight
                    \begin{monsterstatistics}
                \pari \textbf{HP} 84
                    \monsep \textbf{DR} 52
                \pari \textbf{Defenses}
                    Armor 13
                    \monsep Fort 13
                    \monsep Ref 13
                    \monsep Ment 16
                    \rankline
                    \pari \textbf{Attributes} Str 5, Dex 2, Con 2, Int 2, Per 2, Wil 5
                    \pari \textbf{Alignment}
                \end{monsterstatistics}
                \end{monsubsection}
                \monsterabilitiesheader{Standard Monster}
                \begin{activeability}*{Certain Greatsword}
                \weapontag{Sweeping} (2)
                \rankline
                The standard monster makes a \plus10 \glossterm{strike} vs. Armor.
                \hit The target takes 4d6\plus6 slashing damage.
            \end{activeability}
        \par
            \begin{activeability}*{Certain Slam}
                \rankline
                The standard monster makes a \plus10 \glossterm{strike} vs. Armor.
                \hit The target takes 4d8\plus6 bludgeoning damage.
            \end{activeability}
        \par
            \begin{activeability}*{Greatsword}
                \weapontag{Sweeping} (2)
                \rankline
                The standard monster makes a \plus7 \glossterm{strike} vs. Armor.
                \hit The target takes 4d6\plus12 slashing damage.
            \end{activeability}
        \par
            \begin{activeability}*{Slam}
                \rankline
                The standard monster makes a \plus7 \glossterm{strike} vs. Armor.
                \hit The target takes 4d8\plus12 bludgeoning damage.
            \end{activeability}
        \par
            \begin{activeability}*{Strip the Flesh -- Greatsword}
                \weapontag{Sweeping} (2)
                \rankline
                The standard monster makes a \plus7 \glossterm{strike} vs. Armor.
                \hit The target takes 4d6 slashing damage.
                 Each creature that loses \glossterm{hit points} from this attack is \vulnerable to all damage as a \glossterm{condition}.
            \end{activeability}
",
            monster.to_section(None),
        );
    }
}

#[cfg(test)]
mod statistics {
    use super::*;

    #[test]
    fn standard_monster_statistics_level_1_cr1() {
        let creature = Monster::standard_monster(ChallengeRating::One, 1, None, None).creature;

        // HasAttacks
        assert_eq!(1, creature.calc_accuracy(), "Accuracy: 1 per",);
        assert_eq!(2, creature.calc_magical_power(), "Magical power: 2 scaling",);
        assert_eq!(2, creature.calc_mundane_power(), "Mundane power: 2 scaling",);

        // HasAttributes
        assert_eq!(
            vec![4, 2, 2, 2, 2, 4],
            Attribute::all()
                .iter()
                .map(|a| creature.get_base_attribute(&a))
                .collect::<Vec<i32>>(),
            "Attributes",
        );

        // HasDefenses
        assert_eq!(
            7,
            creature.calc_defense(&Defense::Armor),
            "Armor: 5 monster + 1 dex + 1 con",
        );
        assert_eq!(
            7,
            creature.calc_defense(&Defense::Fortitude),
            "Fort: 5 monster + 2 con",
        );
        assert_eq!(
            7,
            creature.calc_defense(&Defense::Reflex),
            "Ref: 5 monster + 2 dex",
        );
        assert_eq!(
            9,
            creature.calc_defense(&Defense::Mental),
            "Ment: 5 monster + 4 wil",
        );

        // HasDamageAbsorption
        assert_eq!(11, creature.calc_hit_points(), "HP: (1 level + 1 con)",);
        assert_eq!(
            4,
            creature.calc_damage_resistance(),
            "DR: (1 level + 1 con) * 2",
        );
    }

    #[test]
    fn standard_monster_statistics_level_1_cr4() {
        let creature = Monster::standard_monster(ChallengeRating::Four, 1, None, None).creature;

        // HasAttacks
        assert_eq!(3, creature.calc_accuracy(), "Accuracy: 1 per + 2 cr",);
        assert_eq!(4, creature.calc_magical_power(), "Magical power: 2 scaling * 2 cr mult",);
        assert_eq!(4, creature.calc_mundane_power(), "Mundane power: 2 scaling * 2 cr mult",);

        // HasAttributes
        assert_eq!(
            vec![6, 2, 2, 2, 2, 6],
            Attribute::all()
                .iter()
                .map(|a| creature.get_base_attribute(&a))
                .collect::<Vec<i32>>(),
            "Attributes",
        );

        // HasDefenses
        assert_eq!(
            8,
            creature.calc_defense(&Defense::Armor),
            "Armor: 5 monster + 1 dex + 1 con + 1 CR",
        );
        assert_eq!(
            8,
            creature.calc_defense(&Defense::Fortitude),
            "Fort: 5 monster + 2 con + 1 CR",
        );
        assert_eq!(
            8,
            creature.calc_defense(&Defense::Reflex),
            "Ref: 5 monster + 2 dex + 1 CR",
        );
        assert_eq!(
            12,
            creature.calc_defense(&Defense::Mental),
            "Ment: 5 monster + 6 wil + 1 CR",
        );

        // HasDamageAbsorption
        assert_eq!(44, creature.calc_hit_points(), "HP: (1 level + 1 con) * 4",);
        assert_eq!(
            16,
            creature.calc_damage_resistance(),
            "DR: (1 level + 1 con) * 8",
        );
    }

    #[cfg(test)]
    mod firebolt_scaling {
        use super::*;

        fn generate_creature(cr: ChallengeRating, level: i32) -> Creature {
            let mut creature = Monster::standard_monster(cr, level, None, None).creature;
            creature.add_modifier(
                Modifier::Attack(
                    StandardAttack::Firebolt((level + 2) / 3 + cr.rank_modifier()).attack(),
                ),
                None,
                None,
            );
            return creature;
        }

        fn firebolt_description(creature: Creature) -> String {
            let firebolt = creature
                .calc_all_attacks()
                .into_iter()
                .find(|a| a.name.contains("Firebolt"));
            return firebolt.unwrap().shorthand_description(&creature);
        }

        #[test]
        fn level_1() {
            let level = 1;
            let actual = [
                firebolt_description(generate_creature(ChallengeRating::One, level)),
                firebolt_description(generate_creature(ChallengeRating::Four, level)),
            ];
            let expected = [
                "Firebolt +1 (The target takes 2d6+2 fire damage.)", // CR 1
                "Firebolt +3 (The target takes 2d8+4 fire damage.)", // CR 4
            ];
            assert_eq!(expected, actual, "CR 1/4");
        }

        #[test]
        fn level_16() {
            let level = 16;
            let actual = [
                firebolt_description(generate_creature(ChallengeRating::One, level)),
                firebolt_description(generate_creature(ChallengeRating::Four, level)),
            ];
            let expected = [
                "Greater Firebolt +9 (The target takes 5d10+12 fire damage.)",
                "Greater Firebolt +11 (The target takes 6d10+24 fire damage.)",
            ];
            assert_eq!(expected, actual, "CR 1/4",);
        }

        #[test]
        fn level_21() {
            let level = 21;
            let actual = [
                firebolt_description(generate_creature(ChallengeRating::One, level)),
                firebolt_description(generate_creature(ChallengeRating::Four, level)),
            ];
            let expected = [
                "Supreme Firebolt +11 (The target takes 7d10+16 fire damage.)",
                "Supreme Firebolt +13 (The target takes 8d10+32 fire damage.)",
            ];
            assert_eq!(expected, actual, "CR 1/4",);
        }
    }
}
