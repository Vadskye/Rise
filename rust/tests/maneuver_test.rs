use rise::classes::{Class, ClassArchetype};
use rise::core_mechanics::{Attribute, HasAttributes};
use rise::creatures::attacks::HasAttacks;
use rise::creatures::creature::Creature;
use rise::creatures::{Character, CreatureCategory, Maneuver};

use rise::equipment::{HasWeapons, Weapon};

#[test]
fn it_calculates_attack_counts() {
    let mut creature = Creature::new(1, CreatureCategory::Character);
    creature.add_weapon(Weapon::Broadsword);
    creature.add_special_attack(Maneuver::CertainStrike(1).attack(Weapon::Broadsword));
    assert_eq!(
        2,
        creature.calc_all_attacks().len(),
        "Should have 2 attack, since maneuvers do not override existing weapons"
    );
    creature.add_special_attack(Maneuver::CertainStrike(1).attack(Weapon::Greatsword));
    assert_eq!(
        3,
        creature.calc_all_attacks().len(),
        "Should have 3 attacks, since maneuvers can add new weapons"
    );
    creature.add_weapon(Weapon::Battleaxe);
    assert_eq!(
        4,
        creature.calc_all_attacks().len(),
        "Should have 4 attacks, since weapons without maneuvers can still be used to attack"
    );
}

#[test]
fn it_calculates_attack_effects() {
    let mut creature = Creature::new(1, CreatureCategory::Character);
    // It's useful to have a nonzero power to make sure power multipliers are calculated correctly
    creature.set_base_attribute(Attribute::Strength, 3);
    creature.add_weapon(Weapon::Broadsword);
    creature.add_special_attack(Maneuver::CertainStrike(1).attack(Weapon::Broadsword));
    assert_eq!(
        vec![
            "Broadsword Certain Strike +3 (The subject takes 1d4+1 slashing damage.)",
            "Broadsword +0 (The subject takes 1d8+1 slashing damage.)"
        ],
        creature
            .calc_all_attacks()
            .iter()
            .map(|a| a.shorthand_description(&creature))
            .collect::<Vec<String>>(),
    );
}

#[test]
fn it_derives_elemental_strike_from_archetypes() {
    let mut druid = Character::new(
        Class::Druid,
        10,
        [
            ClassArchetype::Elementalist,
            ClassArchetype::Shifter,
            ClassArchetype::Wildspeaker,
        ],
    );
    // It's useful to have a nonzero power to make sure power multipliers are calculated correctly
    druid.creature.set_base_attribute(Attribute::Strength, 3);
    druid.creature.add_weapon(Weapon::Broadsword);
    assert_eq!(
        vec![
            "Broadsword Elemental Strike +5 (The subject takes 2d6+4 bludgeoning, fire, and slashing damage.)",
            "Broadsword +5 (The subject takes 1d10+4 slashing damage.)"
        ],
        druid
            .creature.calc_all_attacks()
            .iter()
            .map(|a| a.shorthand_description(&druid.creature))
            .collect::<Vec<String>>(),
    );
}
