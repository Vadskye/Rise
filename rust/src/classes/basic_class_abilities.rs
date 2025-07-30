use crate::classes::Class;
use crate::core_mechanics::{Attribute, Defense};
use crate::latex_formatting;
use numerics::Numerics;

// Generate the whole "Base Class Abilities" subsection used to explain a class in the
// Classes chapter.
pub fn generate_latex_basic_class_abilities(class: &Class) -> String {
    latex_formatting::latexify(format!(
        "
            \\subsection<Base Class Effects>
            If you choose {name} as your \\glossterm<base class>, you gain the following benefits.

            {hit_points}

            {defenses}

            {resources}

            {weapon_proficiencies}

            {armor_proficiencies}

            {class_skills}
        ",
        hit_points = generate_latex_hit_points(class).trim(),
        defenses = generate_latex_defenses(class)
            .unwrap_or("".to_string())
            .trim(),
        name = class.name(),
        resources = generate_latex_resources(class).trim(),
        armor_proficiencies = generate_latex_armor_proficiencies(class).trim(),
        class_skills = generate_latex_class_skills(class).trim(),
        weapon_proficiencies = generate_latex_weapon_proficiencies(class).trim(),
    ))
}

// Generate the Resources section of the basic class abilities.
fn generate_latex_resources(class: &Class) -> String {
    let attunement_points = 3 + class.attunement_points();
    let fatigue_tolerance = 2;
    let insight_points = 1 + class.insight_points();
    let trained_skills = class.trained_skills();

    format!(
        "
            \\cf<{shorthand_name}><Resources>
            \\begin<raggeditemize>
                \\item \\glossterm<Attunement points>: {attunement_points} (see \\pcref<Attunement Points>).
                \\item \\glossterm<Fatigue tolerance>: {fatigue_tolerance} \\add your Constitution (see \\pcref<Fatigue>).
                \\item \\glossterm<Insight points>: {insight_points} \\add your Intelligence (see \\pcref<Insight Points>).
                \\item \\glossterm<Trained skills>: {trained_skills} from among your \\glossterm<class skills>, plus additional trained skills equal to your Intelligence if it is positive (see \\pcref<Skills>).
            \\end<raggeditemize>
        ",
        attunement_points = attunement_points,
        fatigue_tolerance = fatigue_tolerance,
        insight_points = insight_points,
        shorthand_name = class.shorthand_name(),
        trained_skills = trained_skills,
    )
}

fn generate_latex_defenses(class: &Class) -> Option<String> {
    let modifiers = Defense::all()
        .iter()
        .map(|d| format_defense(d, class.defense_bonus(d)))
        .filter(|t| t.is_some())
        .map(|t| t.unwrap())
        .collect::<Vec<String>>();
    let maybe_modifier_text = latex_formatting::join_string_list(&modifiers);
    if let Some(modifier_text) = maybe_modifier_text {
        Some(latex_formatting::latexify(format!(
            "
                \\cf<{shorthand_name}><Defenses>
                You gain {defenses}.
            ",
            defenses = modifier_text,
            shorthand_name = class.shorthand_name(),
        )))
    } else {
        None
    }
}

fn format_defense(defense: &Defense, modifier: i32) -> Option<String> {
    if modifier > 0 {
        Some(format!(
            "a +{modifier} bonus to your {} defense",
            defense.title()
        ))
    } else if modifier < 0 {
        Some(format!(
            "a {modifier} penalty to your {} defense",
            defense.title()
        ))
    } else {
        None
    }
}

fn generate_latex_hit_points(class: &Class) -> String {
    format!(
        "
            \\cf<{shorthand_name}><Hit Points>
            {hp_text}
        ",
        shorthand_name = class.shorthand_name(),
        hp_text = class.hit_point_progression().to_class_text(),
    )
}

fn generate_labeled_english_number(val: i32, singular: &str, plural: &str) -> String {
    let converter = Numerics::builder().build();
    let english_number = converter.convert_number(val).unwrap();
    let suffix = if val == 1 { singular } else { plural };

    format!("{} {}", english_number[0], suffix)
}

fn singular_or_plural(val: i32, singular: &str, plural: &str) -> String {
    let suffix = if val == 1 { singular } else { plural };

    format!("{} {}", val, suffix)
}

fn generate_latex_armor_proficiencies(class: &Class) -> String {
    let armor_proficiencies = class.armor_proficiencies();
    let proficiences_text: String;
    if armor_proficiencies.usage_classes.is_empty() {
        proficiences_text = "
            You are not proficient with any type of armor.
        "
        .to_string();
    } else if let Some(specific_armors) = armor_proficiencies.specific_armors {
        let usage_classes: Vec<&str> = armor_proficiencies
            .usage_classes
            .iter()
            .map(|w| w.name())
            .collect();
        let specific_armors: Vec<String> = specific_armors.iter().map(|a| a.name()).collect();
        proficiences_text = format!(
            "
                You are proficient with {usage_classes} armor and {specific_armors}.
            ",
            usage_classes = latex_formatting::join_str_list(&usage_classes).unwrap(),
            specific_armors = latex_formatting::join_string_list(&specific_armors).unwrap(),
        );
    } else {
        let stringified: Vec<&str> = armor_proficiencies
            .usage_classes
            .iter()
            .map(|w| w.name())
            .collect();
        proficiences_text = format!(
            "
                You are proficient with {usage_classes} armor.
            ",
            usage_classes = latex_formatting::join_str_list(&stringified).unwrap(),
        )
    }

    format!(
        "
            \\cf<{shorthand_name}><Armor Proficiencies>
            {proficiencies}
        ",
        proficiencies = proficiences_text,
        shorthand_name = class.shorthand_name(),
    )
}

fn generate_latex_weapon_proficiencies(class: &Class) -> String {
    let weapon_proficiencies = class.weapon_proficiencies();
    let proficiences_text: String;
    if !weapon_proficiencies.simple_weapons {
        proficiences_text = "
            You are not proficient with any manufactured weapons, even simple weapons.
            You are still proficient with your natural weapons.
        "
        .to_string();
    } else {
        let mut components = vec![String::from("simple weapons")];
        if let Some(custom_weapons) = weapon_proficiencies.custom_weapons {
            components.push(custom_weapons)
        }
        if weapon_proficiencies.non_exotic_weapons {
            components.push("all non-exotic weapons".to_string())
        }
        proficiences_text = format!(
            "
                You are proficient with {}.
            ",
            latex_formatting::join_string_list(&components).unwrap_or(String::from("")),
        );
    }
    format!(
        "
            \\cf<{shorthand_name}><Weapon Proficiencies>
            {proficiencies}
        ",
        shorthand_name = class.shorthand_name(),
        proficiencies = proficiences_text,
    )
}

fn generate_latex_class_skills(class: &Class) -> String {
    let class_skills = class.class_skills();
    let mut attribute_texts = Vec::new();
    // For each attribute, find all class skills for the current class that are based on that
    // attribute. Then, if there are any class skills for that attribute, modify `attribute_texts`
    // to list them.
    for attr in Attribute::all() {
        let skills_for_attribute: Vec<String> = class_skills
            .iter()
            .filter(|skill| {
                if let Some(a) = skill.attribute() {
                    a.name() == attr.name()
                } else {
                    false
                }
            })
            .map(|skill| skill.titled_name_with_subskills())
            .collect();
        // It's easier to directly push this text onto `attribute_texts` instead of creating a
        // separate object to avoid needing to bundle the skills in an object with the attribute
        // itself.
        if !skills_for_attribute.is_empty() {
            attribute_texts.push(format!(
                "\\item \\subparhead<{attribute_name}> {skills_text}.",
                attribute_name = latex_formatting::uppercase_first_letter(attr.name()),
                skills_text = skills_for_attribute.join(", "),
            ));
        }
    }

    // There is clearly some duplication between the attribute-less skills and the attribute-based
    // skills, but there are enough differences in the way we compare and use them that it's easier
    // to treat this as a separate block instead of merging attributes and non-attributes into a
    // single large chunk.
    let skills_without_attribute: Vec<String> = class_skills
        .iter()
        .filter(|skill| skill.attribute().is_none())
        .map(|skill| skill.titled_name_with_subskills())
        .collect();
    // In practice, every class currently has the standard set of attribute-less skills like
    // Profession as class skills, but this structure is still better in case that changes.
    if !skills_without_attribute.is_empty() {
        attribute_texts.push(format!(
            "\\item \\subparhead<Other> {skills_text}.",
            skills_text = skills_without_attribute.join(", "),
        ))
    }

    format!(
        "
            \\cf<{shorthand_name}><Class Skills>
            You have the following \\glossterm<class skills>:

            \\begin<itemize>
                {attribute_texts}
            \\end<itemize>
        ",
        attribute_texts = attribute_texts.join("\n"),
        shorthand_name = class.shorthand_name(),
    )
}
