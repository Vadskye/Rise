use rise::classes::{calc_rank_abilities, Character, Class, ClassArchetype};
use rise::core_mechanics::creatures::attacks::HasAttacks;
use rise::core_mechanics::creatures::{HasModifiers, ModifierType};
use rise::core_mechanics::HasDamageAbsorption;

#[test]
fn it_calculates_rank_abilities() {
    let abilities = calc_rank_abilities(
        1,
        &[
            ClassArchetype::BlessingsOfTheAbyss,
            ClassArchetype::PactMagic,
            ClassArchetype::PactSpellMastery,
        ],
    );
    // Two from blessings of the abyss, two from pact magic, one from spell mastery
    assert_eq!(5, abilities.len(), "Should have five rank abilities");
    let mut ability_names: Vec<&str> = abilities.iter().map(|a| a.name).collect();
    ability_names.sort();
    assert_eq!(
        vec![
            "Abyssal Blast",
            "Armor Tolerance",
            "Cantrips",
            "Combat Caster",
            "Fiendish Resistance"
        ],
        ability_names,
        "Should match expected names"
    );
}

#[test]
fn it_calculates_modifiers() {
    let warlock = Character::new(
        Class::Warlock,
        1,
        [
            ClassArchetype::BlessingsOfTheAbyss,
            ClassArchetype::PactMagic,
            ClassArchetype::PactSpellMastery,
        ],
    );

    let modifiers = warlock.get_modifiers();
    // Three from Blessings, one from pact magic
    assert_eq!(4, modifiers.len(), "Should have four modifiers");
    let mut modifier_descriptions: Vec<String> =
        modifiers.iter().map(|a| a.description()).collect();
    modifier_descriptions.sort();
    assert_eq!(
        vec!["DR 1", "DR 1", "attack Abyssal Blast", "focus -2",],
        modifier_descriptions,
        "Should match expected names"
    );

    assert_eq!(
        2,
        warlock.calc_total_modifier(ModifierType::DamageResistance),
        "Should have DR 2 from modifiers"
    );

    // Two from intrisic level modifier, two from rank abilities
    assert_eq!(4, warlock.calc_damage_resistance(), "Should have DR 4");
}

#[test]
fn it_calculates_abyssal_blast() {
    let warlock = Character::new(
        Class::Warlock,
        20,
        [
            ClassArchetype::BlessingsOfTheAbyss,
            ClassArchetype::PactMagic,
            ClassArchetype::PactSpellMastery,
        ],
    );

    let attacks = warlock.calc_all_attacks();
    assert_eq!(1, attacks.len(), "Should have one attack");
    let abyssal_blast = &attacks[0];
    assert_eq!(
        "Abyssal Blast +10 (The subject takes 7d10+12 fire damage.)",
        abyssal_blast.shorthand_description(&warlock),
        "Should have correct description"
    );
}
