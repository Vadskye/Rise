use super::*;
use crate::core_mechanics::attacks::{HasAttacks, Maneuver, StandardAttack};
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
                \begin{monsubsection}{Standard Monster}{1 Leader}
                    \monstersize{Medium planeforged}
                    \RaggedRight
                    \begin{monsterstatistics}
                \pari \textbf{HP} 10
                    \monsep \textbf{DR} 4
                \pari \textbf{Defenses}
                    Armor 6
                    \monsep Fort 6
                    \monsep Ref 6
                    \monsep Ment 8
                    \rankline
                    \pari \textbf{Attributes} Str 4, Dex 2, Con 2, Int 2, Per 2, Wil 4
                    \pari \textbf{Power} 4\sparkle \monsep 4
                    \pari \textbf{Alignment}
                \end{monsterstatistics}
                \end{monsubsection}
                \monsterabilitiesheader{Standard Monster}
                \begin{activeability}*{Bite}
                \weapontag{Grappling}, \weapontag{Heavy}
                \rankline
                The standard monster makes a \plus1 \glossterm{strike} vs. Armor.
                \hit The target takes 2d6 physical damage.
            \end{activeability}
        \par
            \begin{activeability}*{Claws}
                \weapontag{Light}
                \rankline
                The standard monster makes a \plus3 \glossterm{strike} vs. Armor.
                \hit The target takes 1d8 slashing damage.
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
                \begin{monsubsection}{Standard Monster}{10 Leader}[Elite]
                    \monstersize{Medium planeforged}
                    \RaggedRight
                    \begin{monsterstatistics}
                \pari \textbf{HP} 128
                    \monsep \textbf{DR} 96
                \pari \textbf{Defenses}
                    Armor 11
                    \monsep Fort 11
                    \monsep Ref 11
                    \monsep Ment 17
                    \rankline
                    \pari \textbf{Attributes} Str 8, Dex 2, Con 2, Int 2, Per 2, Wil 8
                    \pari \textbf{Power} 14\sparkle \monsep 14
                    \pari \textbf{Alignment}
                \end{monsterstatistics}
                \end{monsubsection}
                \monsterabilitiesheader{Standard Monster}
                \parhead{Condition Removal} At the end of each round, if the standard monster has four or more \glossterm{conditions}, it removes its oldest condition.
            \par
                \parhead{Multiple Actions} The standard monster can take two standard actions each round. It cannot use the same ability or weapon twice in the same round.
            \par
            \begin{activeability}*{Bite}
                \weapontag{Grappling}, \weapontag{Heavy}
                \rankline
                The standard monster makes a \plus8 \glossterm{strike} vs. Armor.
                \hit The target takes 3d6\plus1d10 physical damage.
            \end{activeability}
        \par
            \begin{activeability}*{Claws}
                \weapontag{Light}
                \rankline
                The standard monster makes a \plus10 \glossterm{strike} vs. Armor.
                \hit The target takes 3d6 slashing damage.
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
            Modifier::Attack(Maneuver::StripTheFlesh.attack(StandardWeapon::Greatsword.weapon())),
            None,
            None,
        );
        monster
            .creature
            .add_modifier(Modifier::Maneuver(Maneuver::CertainStrike), None, None);
        assert_multiline_eq(
            r"
                \begin{monsubsection}{Standard Monster}{10 Leader}
                    \monstersize{Medium planeforged}
                    \RaggedRight
                    \begin{monsterstatistics}
                \pari \textbf{HP} 32
                    \monsep \textbf{DR} 24
                \pari \textbf{Defenses}
                    Armor 11
                    \monsep Fort 11
                    \monsep Ref 11
                    \monsep Ment 15
                    \rankline
                    \pari \textbf{Attributes} Str 6, Dex 2, Con 2, Int 2, Per 2, Wil 6
                    \pari \textbf{Power} 12\sparkle \monsep 12
                    \pari \textbf{Alignment}
                \end{monsterstatistics}
                \end{monsubsection}
                \monsterabilitiesheader{Standard Monster}
                \begin{activeability}*{Bite}
                \weapontag{Grappling}, \weapontag{Heavy}
                \rankline
                The standard monster makes a \plus6 \glossterm{strike} vs. Armor.
                \hit The target takes 3d6\plus1d8 physical damage.
            \end{activeability}
        \par
            \begin{activeability}*{Certain Bite}
                \weapontag{Grappling}, \weapontag{Heavy}
                \rankline
                The standard monster makes a \plus9 \glossterm{strike} vs. Armor.
                \hit The target takes 3d6\plus1d8 (w) physical damage.
            \end{activeability}
        \par
            \begin{activeability}*{Certain Claws}
                \weapontag{Light}
                \rankline
                The standard monster makes a \plus11 \glossterm{strike} vs. Armor.
                \hit The target takes 1d6\plus1d10 (w) slashing damage.
            \end{activeability}
        \par
            \begin{activeability}*{Certain Greatsword}
                \weapontag{Heavy}, \weapontag{Sweeping} (2)
                \rankline
                The standard monster makes a \plus9 \glossterm{strike} vs. Armor.
                \hit The target takes 3d6\plus1d10 (w) slashing damage.
            \end{activeability}
        \par
            \begin{activeability}*{Claws}
                \weapontag{Light}
                \rankline
                The standard monster makes a \plus8 \glossterm{strike} vs. Armor.
                \hit The target takes 1d6\plus1d10 slashing damage.
            \end{activeability}
        \par
            \begin{activeability}*{Greatsword}
                \weapontag{Heavy}, \weapontag{Sweeping} (2)
                \rankline
                The standard monster makes a \plus6 \glossterm{strike} vs. Armor.
                \hit The target takes 3d6\plus1d10 slashing damage.
            \end{activeability}
        \par
            \begin{activeability}*{Strip the Flesh -- Greatsword}
                \weapontag{Heavy}, \weapontag{Sweeping} (2)
                \rankline
                The standard monster makes a \plus6 \glossterm{strike} vs. Armor.
                \hit The target takes 6d6\plus2d10 slashing damage.
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
        assert_eq!(
            3,
            creature.calc_magical_power(),
            "Magical power: 1lvl+4wil = as level 5",
        );
        assert_eq!(
            3,
            creature.calc_mundane_power(),
            "Mundane power: 1lvl+4wil = as level 5",
        );

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
        assert_eq!(12, creature.calc_hit_points(), "HP: (1 level + 1 con)",);
        assert_eq!(
            8,
            creature.calc_damage_resistance(),
            "DR: (1 level + 1 con) * 2",
        );
    }

    #[test]
    fn standard_monster_statistics_level_1_cr4() {
        let creature = Monster::standard_monster(ChallengeRating::Four, 1, None, None).creature;

        // HasAttacks
        assert_eq!(3, creature.calc_accuracy(), "Accuracy: 1 per + 2 cr",);
        assert_eq!(
            4,
            creature.calc_magical_power(),
            "Magical power: 1+6 = as level 7",
        );
        assert_eq!(
            4,
            creature.calc_mundane_power(),
            "Mundane power: 1+6 = as level 7",
        );

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
        assert_eq!(48, creature.calc_hit_points(), "HP: (1 level + 2 con) * 4",);
        assert_eq!(
            48,
            creature.calc_damage_resistance(),
            "DR: (1 level + 6 wil) * 8",
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
                "Firebolt +1 (The target takes 1d10+3 fire damage.)", // CR 1
                "Firebolt +3 (The target takes 2d6+4 fire damage.)",  // CR 4
            ];
            assert_eq!(expected, actual, "CR 1/4");
        }

        #[test]
        fn level_8() {
            let level = 8;
            let actual = [
                firebolt_description(generate_creature(ChallengeRating::One, level)),
                firebolt_description(generate_creature(ChallengeRating::Four, level)),
            ];
            let expected = [
                "Firebolt +5 (The target takes 2d8+9 fire damage.)", // CR 1
                "Greater Firebolt +7 (The target takes 4d6+12 fire damage.)", // CR 4
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
                "Greater Firebolt +9 (The target takes 4d10+24 fire damage.)",
                "Supreme Firebolt +11 (The target takes 6d10+28 fire damage.)",
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
                "Supreme Firebolt +11 (The target takes 6d10+34 fire damage.)",
                "Supreme Firebolt +13 (The target takes 7d10+38 fire damage.)",
            ];
            assert_eq!(expected, actual, "CR 1/4",);
        }
    }
}
