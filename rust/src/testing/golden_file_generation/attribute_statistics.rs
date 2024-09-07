use super::write_golden_file;
use crate::classes::{Class, ClassArchetype};
use crate::core_mechanics::{Attribute, HasAttributes};
use crate::creatures::{calculate_character_points, standard_body_armor_for_level, Character};
use crate::equipment::{ArmorUsageClass, HasArmor, Weapon};
use std::io;
use titlecase::titlecase;

pub fn write_attribute_statistics_golden() -> io::Result<()> {
    let golden = format!(
        "# Attribute Statistics

{level_1}

{level_10}

{level_20}",
        level_1 = format_attributes_at_level(1),
        level_10 = format_attributes_at_level(10),
        level_20 = format_attributes_at_level(20),
    );

    write_golden_file("attribute_statistics", golden)
}

fn format_attributes_at_level(level: i32) -> String {
    let baseline = format_attribute(None, level);
    let attributes = Attribute::all()
        .into_iter()
        .map(|a| format_attribute(Some(a), level))
        .collect::<Vec<String>>()
        .join("\n");
    format!(
        "## Level {level}: Attribute
{baseline}
{attributes}",
    )
}

fn format_attribute(maybe_attribute: Option<Attribute>, level: i32) -> String {
    let mut character = Character::new(
        Class::Fighter,
        level,
        [
            ClassArchetype::Blank,
            ClassArchetype::Blank,
            ClassArchetype::Blank,
        ],
    );

    // Ignore heavy armor because the move speed penalty is so significant.
    let mut best_usage_class = ArmorUsageClass::Medium;
    let mut name = "Baseline".to_string();
    if let Some(attribute) = maybe_attribute {
        if attribute == Attribute::Dexterity {
            best_usage_class = ArmorUsageClass::Light
        };
        name = titlecase(attribute.name()).to_string();
        character.creature.set_base_attribute(attribute.clone(), 4);
        character.creature.set_attribute_scaling(level, vec![attribute]);

    }
    character
        .creature
        .add_armor(standard_body_armor_for_level(level, best_usage_class));

    character.creature.weapons.push(Weapon::club());

    return format!(
        " * {name: >12}: {character_points: >3}",
        name = name,
        character_points = calculate_character_points(&character)
    );
}
