use super::*;
use crate::core_mechanics::{HasDamageAbsorption, HasDefenses};
use crate::creatures::attacks::HasAttacks;
use crate::creatures::StandardAttack;

#[test]
fn standard_monster_statistics_level_1_cr1() {
    let creature = Monster::standard_monster(ChallengeRating::One, 1, None, None).creature;

    // HasAttacks
    assert_eq!(1, creature.calc_accuracy(), "Accuracy: 1 per",);
    assert_eq!(2, creature.calc_power(), "Power: 2 scaling",);

    // HasAttributes
    assert_eq!(
        vec![3, 2, 2, 2, 2, 3],
        Attribute::all()
            .iter()
            .map(|a| creature.calc_total_attribute(&a))
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
        8,
        creature.calc_defense(&Defense::Mental),
        "Ment: 5 monster + 3 wil",
    );

    // HasDamageAbsorption
    assert_eq!(12, creature.calc_hit_points(), "HP: (1 level + 2 con)",);
    assert_eq!(
        9,
        creature.calc_damage_resistance(),
        "DR: (1 level + 2 con) * 3",
    );
}

#[test]
fn standard_monster_statistics_level_1_cr2() {
    let creature = Monster::standard_monster(ChallengeRating::Two, 1, None, None).creature;

    // HasAttacks
    assert_eq!(2, creature.calc_accuracy(), "Accuracy: 1 per + 1 cr",);
    assert_eq!(4, creature.calc_power(), "Power: 2 scaling * 2 cr mult",);

    // HasAttributes
    assert_eq!(
        vec![4, 2, 2, 2, 2, 4],
        Attribute::all()
            .iter()
            .map(|a| creature.calc_total_attribute(&a))
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
    assert_eq!(24, creature.calc_hit_points(), "HP: (1 level + 2 con) * 2",);
    assert_eq!(
        18,
        creature.calc_damage_resistance(),
        "DR: (1 level + 2 con) * 6",
    );
}

#[test]
fn standard_monster_statistics_level_1_cr4() {
    let creature = Monster::standard_monster(ChallengeRating::Four, 1, None, None).creature;

    // HasAttacks
    assert_eq!(2, creature.calc_accuracy(), "Accuracy: 1 per + 1 cr",);
    assert_eq!(6, creature.calc_power(), "Power: 2 scaling * 3 cr mult",);

    // HasAttributes
    assert_eq!(
        vec![7, 2, 2, 2, 2, 7],
        Attribute::all()
            .iter()
            .map(|a| creature.calc_total_attribute(&a))
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
        30,
        creature.calc_damage_resistance(),
        "DR: (1 level + 2 con) * 10",
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
            firebolt_description(generate_creature(ChallengeRating::Half, level)),
            firebolt_description(generate_creature(ChallengeRating::One, level)),
            firebolt_description(generate_creature(ChallengeRating::Two, level)),
            firebolt_description(generate_creature(ChallengeRating::Four, level)),
            firebolt_description(generate_creature(ChallengeRating::Six, level)),
        ];
        let expected = [
            "Firebolt +1 (The target takes 1d8+1 fire damage.)", // CR 0.5
            "Firebolt +1 (The target takes 1d10+2 fire damage.)", // CR 1
            "Firebolt +2 (The target takes 2d6+4 fire damage.)",  // CR 2
            "Firebolt +2 (The target takes 2d8+6 fire damage.)",  // CR 4
            "Firebolt +2 (The target takes 2d10+8 fire damage.)", // CR 6
        ];
        assert_eq!(expected, actual, "CR 0.5/1/2/4/6");
    }

    #[test]
    fn level_16() {
        let level = 16;
        let actual = [
            firebolt_description(generate_creature(ChallengeRating::Half, level)),
            firebolt_description(generate_creature(ChallengeRating::One, level)),
            firebolt_description(generate_creature(ChallengeRating::Two, level)),
            firebolt_description(generate_creature(ChallengeRating::Four, level)),
            firebolt_description(generate_creature(ChallengeRating::Six, level)),
        ];
        let expected = [
            "Greater Firebolt +9 (The target takes 4d8+6 fire damage.)",
            "Greater Firebolt +9 (The target takes 4d10+12 fire damage.)",
            "Greater Firebolt +10 (The target takes 5d10+24 fire damage.)",
            "Greater Firebolt +10 (The target takes 6d10+36 fire damage.)",
            "Supreme Firebolt +10 (The target takes 8d10+48 fire damage.)",
        ];
        assert_eq!(expected, actual, "CR 0.5/1/2/4/6",);
    }

    #[test]
    fn level_21() {
        let level = 21;
        let actual = [
            firebolt_description(generate_creature(ChallengeRating::Half, level)),
            firebolt_description(generate_creature(ChallengeRating::One, level)),
            firebolt_description(generate_creature(ChallengeRating::Two, level)),
            firebolt_description(generate_creature(ChallengeRating::Four, level)),
            firebolt_description(generate_creature(ChallengeRating::Six, level)),
        ];
        let expected = [
            "Greater Firebolt +12 (The target takes 4d10+8 fire damage.)",
            "Supreme Firebolt +12 (The target takes 6d10+16 fire damage.)",
            "Supreme Firebolt +13 (The target takes 7d10+32 fire damage.)",
            "Supreme Firebolt +13 (The target takes 8d10+48 fire damage.)",
            "Supreme Firebolt +13 (The target takes 9d10+64 fire damage.)",
        ];
        assert_eq!(expected, actual, "CR 0.5/1/2/4/6",);
    }
}
