use super::*;
use crate::core_mechanics::{HasDamageAbsorption, HasDefenses};
use crate::creatures::attacks::HasAttacks;

#[test]
fn standard_monster_statistics_level_1_cr1() {
    let creature = Monster::standard_monster(ChallengeRating::One, 1, None, None).creature;

    // HasAttacks
    assert_eq!(1, creature.calc_accuracy(), "Accuracy: 1 per",);
    assert_eq!(
        2,
        creature.calc_power(true),
        "Magical power: 1 scaling + 1 wil",
    );
    assert_eq!(
        3,
        creature.calc_power(false),
        "Mundane power: 1 scaling + 2 str",
    );

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
    assert_eq!(
        3,
        creature.calc_power(true),
        "Magical power: 1 scaling * 2 cr mult + 1 wil",
    );
    assert_eq!(
        5,
        creature.calc_power(false),
        "Mundane power: 1 scaling * 2 cr mult + 3 str",
    );

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
        10,
        creature.calc_damage_resistance(),
        "DR: (3 level + 2 con) * 2",
    );
}

#[test]
fn standard_monster_statistics_level_1_cr4() {
    let creature = Monster::standard_monster(ChallengeRating::Four, 1, None, None).creature;

    // HasAttacks
    assert_eq!(1, creature.calc_accuracy(), "Accuracy: 1 per",);
    assert_eq!(
        4,
        creature.calc_power(true),
        "Magical power: 1 scaling * 3 cr mult + 1 wil",
    );
    assert_eq!(
        6,
        creature.calc_power(false),
        "Mundane power: 1 scaling * 3 cr mult + 3 str",
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
    assert_eq!(52, creature.calc_hit_points(), "HP: (11 level + 2 con) * 4",);
    assert_eq!(
        30,
        creature.calc_damage_resistance(),
        "DR: (3 level + 2 con) * 6",
    );
}
