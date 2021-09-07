use rise::core_mechanics::creatures::{Modifier, HasModifiers};
use rise::core_mechanics::creatures::creature::Creature;
use rise::core_mechanics::{Defense, HasDefenses};
use rise::equipment::{Armor, HasArmor};
use rise::skills::{HasSkills, Skill};

#[test]
fn it_calculates_armor_effects() {
    let mut creature = Creature::new(1);
    assert_eq!(
        0,
        creature.calc_defense(&Defense::Armor),
        "Should have 0 AD"
    );
    assert_eq!(
        0,
        creature.calc_skill_modifier(&Skill::Climb),
        "Should have 0 Climb"
    );
    assert_eq!(
        0,
        creature.calc_skill_modifier(&Skill::Devices),
        "Should have 0 Devices"
    );

    creature.add_armor(Armor::Breastplate(None));
    assert_eq!(
        3,
        creature.calc_defense(&Defense::Armor),
        "Should have 3 AD"
    );
    assert_eq!(
        -4,
        creature.calc_skill_modifier(&Skill::Climb),
        "Should have -4 Climb"
    );
    // Encumbrance should only modify str/dex skill checks, not Devices
    assert_eq!(
        0,
        creature.calc_skill_modifier(&Skill::Devices),
        "Should have 0 Devices"
    );
}

#[test]
fn it_calculates_modifiers() {
    let mut creature = Creature::new(1);
    assert_eq!(
        0,
        creature.calc_defense(&Defense::Armor),
        "Should have 0 AD"
    );
    assert_eq!(
        0,
        creature.calc_skill_modifier(&Skill::Climb),
        "Should have 0 Climb"
    );
    assert_eq!(
        0,
        creature.calc_skill_modifier(&Skill::Devices),
        "Should have 0 Devices"
    );

    creature.add_modifier(Modifier::Defense(Defense::Armor, 2));
    assert_eq!(
        2,
        creature.calc_defense(&Defense::Armor),
        "Should have 2 AD"
    );
    assert_eq!(
        0,
        creature.calc_defense(&Defense::Fortitude),
        "Should have 0 Fort"
    );
}
