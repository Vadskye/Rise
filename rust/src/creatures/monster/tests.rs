use super::*;
use crate::core_mechanics::{HasDamageAbsorption, HasDefenses};
use crate::creatures::attacks::HasAttacks;
use crate::creatures::StandardAttack;

#[test]
fn standard_monster_statistics_level_1_cr1() {
    let creature = Monster::standard_monster(ChallengeRating::One, 1, None, None).creature;

    // HasAttacks
    assert_eq!(1, creature.calc_accuracy(), "Accuracy: 1 per",);
    assert_eq!(2, creature.calc_power(), "Power: 1 scaling",);

    // HasAttributes
    assert_eq!(
        vec![4, 2, 2, 2, 2, 2],
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
        7,
        creature.calc_defense(&Defense::Mental),
        "Ment: 5 monster + 2 wil",
    );

    // HasDamageAbsorption
    assert_eq!(13, creature.calc_hit_points(), "HP: 11 level + 2 con",);
    assert_eq!(5, creature.calc_damage_resistance(), "DR: 3 level + 2 con",);
}

#[test]
fn standard_monster_statistics_level_1_cr2() {
    let creature = Monster::standard_monster(ChallengeRating::Two, 1, None, None).creature;

    // HasAttacks
    assert_eq!(1, creature.calc_accuracy(), "Accuracy: 1 per",);
    assert_eq!(2, creature.calc_power(), "Power: 1 scaling * 2 cr mult",);

    // HasAttributes
    assert_eq!(
        vec![6, 2, 2, 2, 2, 2],
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
        7,
        creature.calc_defense(&Defense::Mental),
        "Ment: 5 monster + 2 wil",
    );

    // HasDamageAbsorption
    assert_eq!(26, creature.calc_hit_points(), "HP: (11 level + 2 con) * 2",);
    assert_eq!(
        15,
        creature.calc_damage_resistance(),
        "DR: (3 level + 2 con) * 3",
    );
}

#[test]
fn standard_monster_statistics_level_1_cr4() {
    let creature = Monster::standard_monster(ChallengeRating::Four, 1, None, None).creature;

    // HasAttacks
    assert_eq!(1, creature.calc_accuracy(), "Accuracy: 1 per",);
    assert_eq!(
        2,
        creature.calc_power(),
        "Power: 1 scaling * 2 cr mult",
    );

    // HasAttributes
    assert_eq!(
        vec![7, 2, 2, 2, 2, 2],
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
        8,
        creature.calc_defense(&Defense::Mental),
        "Ment: 5 monster + 2 wil + 1 R",
    );

    // HasDamageAbsorption
    assert_eq!(52, creature.calc_hit_points(), "HP: (11 level + 2 con) * 4",);
    assert_eq!(
        30,
        creature.calc_damage_resistance(),
        "DR: (3 level + 2 con) * 6",
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
        assert_eq!(
            "Firebolt +1 (The target takes 1d10+2 fire damage.)",
            firebolt_description(generate_creature(ChallengeRating::One, level)),
            "CR 1",
        );
        assert_eq!(
            "Firebolt +1 (The target takes 2d6+3 fire damage.)",
            firebolt_description(generate_creature(ChallengeRating::Two, level)),
            "CR 2",
        );
        assert_eq!(
            "Firebolt +1 (The target takes 2d10+3 fire damage.)",
            firebolt_description(generate_creature(ChallengeRating::Four, level)),
            "CR 4",
        );
        assert_eq!(
            "Firebolt +1 (The target takes 4d6+3 fire damage.)",
            firebolt_description(generate_creature(ChallengeRating::Six, level)),
            "CR 6",
        );
    }

    #[test]
    fn level_16() {
        let level = 16;
        assert_eq!(
            "Greater Firebolt +10 (The target takes 4d10+11 fire damage.)",
            firebolt_description(generate_creature(ChallengeRating::One, level)),
            "CR 1",
        );
        assert_eq!(
            "Greater Firebolt +10 (The target takes 5d10+19 fire damage.)",
            firebolt_description(generate_creature(ChallengeRating::Two, level)),
            "CR 2",
        );
        assert_eq!(
            "Supreme Firebolt +10 (The target takes 8d10+19 fire damage.)",
            firebolt_description(generate_creature(ChallengeRating::Four, level)),
            "CR 4",
        );
        assert_eq!(
            "Supreme Firebolt +10 (The target takes 9d10+19 fire damage.)",
            firebolt_description(generate_creature(ChallengeRating::Six, level)),
            "CR 6",
        );
    }
}
