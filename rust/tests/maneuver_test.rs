use rise::core_mechanics::creatures::attacks::HasAttacks;
use rise::core_mechanics::creatures::creature::Creature;
use rise::core_mechanics::creatures::Maneuver;

use rise::equipment::{HasWeapons, Weapon};

#[test]
fn it_calculates_attack_counts() {
    let mut creature = Creature::new(1);
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
