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
                    Armor 13
                    \monsep Fort 13
                    \monsep Ref 13
                    \monsep Ment 19
                    \rankline
                    \pari \textbf{Attributes} Str 8, Dex 2, Con 2, Int 2, Per 2, Wil 8
                    \pari \textbf{Power} 13\sparkle \monsep 13
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
                The standard monster makes a \plus9 \glossterm{strike} vs. Armor.
                \hit The target takes 6d6\plus2d8 physical damage.
            \end{activeability}
        \par
            \begin{activeability}*{Claws}
                \weapontag{Light}
                \rankline
                The standard monster makes a \plus11 \glossterm{strike} vs. Armor.
                \hit The target takes 2d6\plus2d10 slashing damage.
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
                    \pari \textbf{Power} 11\sparkle \monsep 11
                    \pari \textbf{Alignment}
                \end{monsterstatistics}
                \end{monsubsection}
                \monsterabilitiesheader{Standard Monster}
                \begin{activeability}*{Bite}
                \weapontag{Grappling}, \weapontag{Heavy}
                \rankline
                The standard monster makes a \plus7 \glossterm{strike} vs. Armor.
                \hit The target takes 2d6\plus1d10 physical damage.
            \end{activeability}
        \par
            \begin{activeability}*{Certain Bite}
                \weapontag{Grappling}, \weapontag{Heavy}
                \rankline
                The standard monster makes a \plus10 \glossterm{strike} vs. Armor.
                \hit The target takes 2d6\plus1d10 (w) physical damage.
            \end{activeability}
        \par
            \begin{activeability}*{Certain Claws}
                \weapontag{Light}
                \rankline
                The standard monster makes a \plus12 \glossterm{strike} vs. Armor.
                \hit The target takes 1d6\plus1d8 (w) slashing damage.
            \end{activeability}
        \par
            \begin{activeability}*{Certain Greatsword}
                \weapontag{Heavy}, \weapontag{Sweeping} (2)
                \rankline
                The standard monster makes a \plus10 \glossterm{strike} vs. Armor.
                \hit The target takes 4d6 (w) slashing damage.
            \end{activeability}
        \par
            \begin{activeability}*{Claws}
                \weapontag{Light}
                \rankline
                The standard monster makes a \plus9 \glossterm{strike} vs. Armor.
                \hit The target takes 1d6\plus1d8 slashing damage.
            \end{activeability}
        \par
            \begin{activeability}*{Greatsword}
                \weapontag{Heavy}, \weapontag{Sweeping} (2)
                \rankline
                The standard monster makes a \plus7 \glossterm{strike} vs. Armor.
                \hit The target takes 4d6 slashing damage.
            \end{activeability}
        \par
            \begin{activeability}*{Strip the Flesh -- Greatsword}
                \weapontag{Heavy}, \weapontag{Sweeping} (2)
                \rankline
                The standard monster makes a \plus7 \glossterm{strike} vs. Armor.
                \hit The target takes 8d6 slashing damage.
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
            4,
            creature.calc_magical_power(),
            "Magical power: 0lvl+4wil",
        );
        assert_eq!(
            4,
            creature.calc_mundane_power(),
            "Mundane power: 0lvl+4str",
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
            6,
            creature.calc_defense(&Defense::Armor),
            "Armor: 4 leader + 2 dex",
        );
        assert_eq!(
            6,
            creature.calc_defense(&Defense::Fortitude),
            "Fort: 4 leader + 2 con",
        );
        assert_eq!(
            6,
            creature.calc_defense(&Defense::Reflex),
            "Ref: 4 leader + 2 dex",
        );
        assert_eq!(
            8,
            creature.calc_defense(&Defense::Mental),
            "Ment: 4 leader + 4 wil",
        );

        // HasDamageAbsorption
        assert_eq!(10, creature.calc_hit_points(), "HP: (1 level + 1 con + 2 leader)",);
        assert_eq!(
            4,
            creature.calc_damage_resistance(),
            "DR: (1 level + 2 leader)",
        );
    }

    #[test]
    fn standard_monster_statistics_level_1_cr4() {
        let creature = Monster::standard_monster(ChallengeRating::Four, 1, None, None).creature;

        // HasAttacks
        assert_eq!(3, creature.calc_accuracy(), "Accuracy: 1 per + 2 cr",);
        assert_eq!(
            6,
            creature.calc_magical_power(),
            "Magical power: 0lvl+6wil",
        );
        assert_eq!(
            6,
            creature.calc_mundane_power(),
            "Mundane power: 0lvl+6str",
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
            "Armor: 4 leader + 2 dex + 2 elite",
        );
        assert_eq!(
            8,
            creature.calc_defense(&Defense::Fortitude),
            "Fort: 4 leader + 2 con + 2 elite",
        );
        assert_eq!(
            8,
            creature.calc_defense(&Defense::Reflex),
            "Ref: 4 leader + 2 dex + 2 elite",
        );
        assert_eq!(
            12,
            creature.calc_defense(&Defense::Mental),
            "Ment: 4 leader + 6 wil + 2 elite",
        );

        // HasDamageAbsorption
        assert_eq!(40, creature.calc_hit_points(), "HP: (1 level + 2 con + 2 leader)",);
        assert_eq!(
            16,
            creature.calc_damage_resistance(),
            "DR: (1 level + 2 leader)",
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
                "Firebolt +1 (The target takes 1d10 fire damage.)", // CR 1
                "Firebolt +3 (The target takes 4d6 fire damage.)",  // CR 4
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
                "Firebolt +6 (The target takes 1d6+2d8 fire damage.)", // CR 1
                "Firebolt +8 (The target takes 2d6+4d8 fire damage.)", // CR 4
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
                "Firebolt +10 (The target takes 7d8 fire damage.)",
                "Firebolt +12 (The target takes 16d8 fire damage.)",
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
                "Firebolt +12 (The target takes 9d10 fire damage.)",
                "Firebolt +14 (The target takes 20d10 fire damage.)",
            ];
            assert_eq!(expected, actual, "CR 1/4",);
        }
    }
}
