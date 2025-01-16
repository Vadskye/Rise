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

## Brief

{brief_level_1}

{brief_level_10}

{brief_level_20}

## Detailed

{detailed_level_1}

{detailed_level_10}

{detailed_level_20}",
        brief_level_1 = format_classes_at_level_brief(1),
        brief_level_10 = format_classes_at_level_brief(10),
        brief_level_20 = format_classes_at_level_brief(20),
        detailed_level_1 = format_classes_at_level_detailed(1),
        detailed_level_10 = format_classes_at_level_detailed(10),
        detailed_level_20 = format_classes_at_level_detailed(20),
    );

    write_golden_file("class_statistics", golden)
}

fn format_classes_at_level_brief(level: i32) -> String {
    let classes = Class::all()
        .into_iter()
        .map(|c| format_class_brief(c, level))
        .collect::<Vec<String>>()
        .join("\n");
    format!(
        "### Level {level}: Class/Character
{classes}",
    )
}

fn format_classes_at_level_detailed(level: i32) -> String {
    let classes = Class::all()
        .into_iter()
        .map(|c| format_class_detailed(c, level))
        .collect::<Vec<String>>()
        .join("\n\n");
    format!(
        "### Level {level}

{classes}",
    )
}

fn generate_character(class: Class, level: i32) -> Character {
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

    character
}

fn format_class_brief(class: Class, level: i32) -> String {
    let character = generate_character(class.clone(), level);

    format!(
        " * {name: >9}: {class_points: >3} / {character_points: >3}",
        name = titlecase(class.name()).to_string(),
        class_points = character.class.calculate_point_total(),
        character_points = calculate_character_points(&character)
    )
}

fn format_class_detailed(class: Class, level: i32) -> String {
    let character = generate_character(class.clone(), level);

    format!(
        "#### {name}
            {statistics}",
        name = titlecase(class.name()).to_string(),
        statistics = character.description().trim()
    )
}

pub fn write_class_complexity_golden() -> io::Result<()> {
    fn archetype_complexity(archetype: ClassArchetype) -> String {
        format!(
            "* {archetype}: {complexity3} / {complexity7}",
            archetype = archetype.name(),
            // The first few ranks are the most important for scaring people away
            complexity3 = archetype.complexity_by_rank(3),
            complexity7 = archetype.complexity_by_rank(7),
        )
    }

    fn class_complexity(class: Class) -> String {
        format!(
            "
## {class}: {total3} / {total7}
{archetypes}
            ",
            class = class.name(),
            total3 = class.archetypes().into_iter().map(|a| a.complexity_by_rank(3)).sum::<i32>(),
            total7 = class.archetypes().into_iter().map(|a| a.complexity_by_rank(7)).sum::<i32>(),
            archetypes = class
                .archetypes()
                .into_iter()
                .map(archetype_complexity)
                .collect::<Vec<String>>()
                .join("\n"),
        )
    }

    let golden = format!(
        "
# Class Complexity Statistics

Complexity is calculated at (rank 3 / rank 7).

{classes}
        ",
        classes = Class::core_classes()
            .into_iter()
            .map(class_complexity)
            .collect::<Vec<String>>()
            .join(""),
    );

    write_golden_file("class_complexity_statistics", golden)
}
