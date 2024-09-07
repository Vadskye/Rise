use super::write_golden_file;
use crate::classes::{Class, ClassArchetype};
use crate::core_mechanics::HasAttributes;
use crate::creatures::{calculate_character_points, standard_body_armor_for_level, Character};
use crate::equipment::{ArmorUsageClass, HasArmor, Weapon};
use std::io;
use titlecase::titlecase;

pub fn write_class_statistics_golden() -> io::Result<()> {
    let golden = format!(
        "# Class Statistics

{level_1}

{level_10}

{level_20}",
        level_1 = format_classes_at_level(1),
        level_10 = format_classes_at_level(10),
        level_20 = format_classes_at_level(20),
    );

    write_golden_file("class_statistics", golden)
}

fn format_classes_at_level(level: i32) -> String {
    let classes = Class::all()
        .into_iter()
        .map(|c| format_class(c, level))
        .collect::<Vec<String>>()
        .join("\n");
    format!(
        "## Level {level}: Class/Character
{classes}",
    )
}

fn format_class(class: Class, level: i32) -> String {
    let name = titlecase(class.name()).to_string();
    let armor_proficiencies = class.armor_proficiencies();
    let mut character = Character::new(
        class,
        level,
        [
            ClassArchetype::Blank,
            ClassArchetype::Blank,
            ClassArchetype::Blank,
        ],
    );
    // We use this value for all attributes. Hit points and light armor are specifically more
    // accurate with higher attributes.
    character.creature.set_base_attributes([2, 2, 2, 2, 2, 2]);

    // Ignore heavy armor because the move speed penalty is so significant.
    let best_usage_class = if armor_proficiencies
        .usage_classes
        .contains(&ArmorUsageClass::Medium)
    {
        ArmorUsageClass::Medium
    } else {
        ArmorUsageClass::Light
    };
    character
        .creature
        .add_armor(standard_body_armor_for_level(level, best_usage_class));

    character.creature.weapons.push(Weapon::club());

    return format!(
        " * {name: >9}: {class_points: >3} / {character_points: >3}",
        name = name,
        class_points = character.class.calculate_point_total(),
        character_points = calculate_character_points(&character)
    );
}
