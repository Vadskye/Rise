use crate::classes::Class;
use crate::core_mechanics::{Attribute, Defense};
use crate::latex_formatting;
use numerics::Numerics;

// Generate the whole "Basic Class Abilities" subsection used to explain a class in the
// Classes chapter.
pub fn generate_latex_basic_class_abilities(class: &Class) -> String {
    return format!(
        "
            \\subsection<Basic Class Abilities>
            If you are a {name}, you gain the following abilities.

            {defenses}

            {resources}

            {weapon_proficiencies}

            {armor_proficiencies}

            {class_skills}
        ",
        defenses = generate_latex_defenses(class).trim(),
        name = class.name(),
        resources = generate_latex_resources(class).trim(),
        armor_proficiencies = generate_latex_armor_proficiencies(class).trim(),
        class_skills = generate_latex_class_skills(class).trim(),
        weapon_proficiencies = generate_latex_weapon_proficiencies(class).trim(),
    );
}

// Generate the Resources section of the basic class abilities.
fn generate_latex_resources(class: &Class) -> String {
    return format!(
        "
            \\cf<{shorthand_name}><Resources>
            You have the following \\glossterm<resources>:
            \\begin<itemize>
                \\item {attunement_points}, which you can use to attune to items and abilities that affect you (see \\pcref<Attunement Points>).
                \\item A \\glossterm<fatigue tolerance> equal to {fatigue_tolerance}.
                    Your fatigue tolerance makes it easier for you to use powerful abilities that fatigue you (see \\pcref<Fatigue>).
                \\item A number of \\glossterm<insight points> equal to {insight_points}.
                    You can spend insight points to gain additional abilities (see \\pcref<Insight Points>).
                \\item {trained_skills} from among your \\glossterm<class skills>, plus additional trained skills equal to your Intelligence (see \\pcref<Skills>).
            \\end<itemize>
        ",
        attunement_points = latex_formatting::uppercase_first_letter(&
            generate_labeled_english_number(
                class.attunement_points(),
                "\\glossterm<attunement point>",
                "\\glossterm<attunement points>",
            )
        ),
        fatigue_tolerance = format!("{} + your Constitution", class.fatigue_tolerance()),
        insight_points = if class.insight_points() > 0 {
            format!("{} + your Intelligence", class.insight_points())
        } else {
            "your Intelligence".to_string()
        },
        shorthand_name = class.shorthand_name(),
        trained_skills = latex_formatting::uppercase_first_letter(&
            generate_labeled_english_number(
                class.trained_skills(),
                "\\glossterm<trained skill>",
                "\\glossterm<trained skills>",
            )
        ),
    );
}

fn generate_latex_defenses(class: &Class) -> String {
    let armor_defense_bonus = class.defense_bonus(&Defense::Armor);
    let armor_text = if armor_defense_bonus > 0 {
        format!("\\plus<{}> Armor,", armor_defense_bonus)
    } else {
        "".to_string()
    };
    let mut hp_dr_text = "".to_string();
    if class.hit_points() > 0 {
        if class.damage_resistance() > 0 {
            hp_dr_text = format!(
                "In addition, you gain a \\plus{} bonus to your level when determining your maximum \\glossterm<hit points> (see \\pcref<Hit Points>), and a \\plus{} bonus to your level when determining your maximum \\glossterm<damage resistance> (see \\pcref<Damage Resistance>).",
                class.hit_points(),
                class.damage_resistance(),
            )
        } else {
            hp_dr_text = format!(
                "In addition, you gain a \\plus{} bonus to your level when determining your maximum \\glossterm<hit points> (see \\pcref<Hit Points>).",
                class.hit_points(),
            )
        }
    } else if class.damage_resistance() > 0 {
            hp_dr_text = format!(
                "In addition, you gain a \\plus{} bonus to your level when determining your maximum \\glossterm<damage resistance> (see \\pcref<Damage Resistance>).",
                class.damage_resistance(),
            )
    }

    return latex_formatting::latexify(format!(
        "
            \\cf<{shorthand_name}><Defenses>
            You gain the following bonuses to your \\glossterm<defenses>: {armor} \\plus{fortitude} Fortitude, \\plus{reflex} Reflex, \\plus{mental} Mental.
            {hp_dr_text}
        ",
        armor=armor_text,
        fortitude=class.defense_bonus(&Defense::Fortitude),
        reflex=class.defense_bonus(&Defense::Reflex),
        mental=class.defense_bonus(&Defense::Mental),
        shorthand_name=class.shorthand_name(),
        hp_dr_text=hp_dr_text,
    ));
}

fn generate_labeled_english_number(val: i32, singular: &str, plural: &str) -> String {
    let converter = Numerics::builder().build();
    let english_number = converter.convert_number(val).unwrap();
    let suffix = if val == 1 { singular } else { plural };
    return format!("{} {}", english_number[0], suffix);
}

fn generate_latex_armor_proficiencies(class: &Class) -> String {
    let armor_proficiencies = class.armor_proficiencies();
    let proficiences_text: String;
    if armor_proficiencies.usage_classes.len() == 0 {
        proficiences_text = "
            You are not proficient with any type of armor.
            Encumbrance from armor interferes with the gestures you make to cast spells, which can cause your spells with \\glossterm{somatic components} to fail (see \\pcref{Somatic Component Failure}).
        ".to_string();
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

    return format!(
        "
            \\cf<{shorthand_name}><Armor Proficiencies>
            {proficiencies}
        ",
        proficiencies = proficiences_text,
        shorthand_name = class.shorthand_name(),
    );
}

fn generate_latex_weapon_proficiencies(class: &Class) -> String {
    let weapon_proficiencies = class.weapon_proficiencies();
    let proficiences_text: String;
    if !weapon_proficiencies.simple_weapons {
        proficiences_text = "
            You are not proficient with any weapon groups, even simple weapons.
            You are still proficient with your natural weapons.
        "
        .to_string();
    } else {
        let mut components = vec![String::from("simple weapons")];
        if let Some(specific_weapon_groups) = weapon_proficiencies.specific_weapon_groups {
            if specific_weapon_groups.len() == 1 {
                components.push(specific_weapon_groups[0].name_plural().to_string());
            } else {
                let specific_groups_text = specific_weapon_groups.iter().map(|g| g.name_plural().to_string()).collect::<Vec<String>>();
                components.push(format!("any one of {}", latex_formatting::join_string_list(&specific_groups_text).unwrap()));
            }
        }
        if weapon_proficiencies.custom_weapon_groups > 0 {
            let custom_weapon_groups = generate_labeled_english_number(
                weapon_proficiencies.custom_weapon_groups,
                "other weapon group",
                "other weapon groups",
            );
            let custom_weapon_groups = format!("any {}", custom_weapon_groups);
            components.push(custom_weapon_groups);
        }
        if let Some(specific_weapons) = weapon_proficiencies.specific_weapons {
            for w in specific_weapons {
                components.push(w.plural_name());
            }
        }
        proficiences_text = format!(
            "
                You are proficient with {}.
            ",
            latex_formatting::join_string_list(&components).unwrap_or(String::from("")),
        );
    }
    return format!(
        "
            \\cf<{shorthand_name}><Weapon Proficiencies>
            {proficiencies}
        ",
        shorthand_name = class.shorthand_name(),
        proficiencies = proficiences_text,
    );
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
        if skills_for_attribute.len() > 0 {
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
    if skills_without_attribute.len() > 0 {
        attribute_texts.push(format!(
            "\\item \\subparhead<Other> {skills_text}.",
            skills_text = skills_without_attribute.join(", "),
        ))
    }

    return format!(
        "
            \\cf<{shorthand_name}><Class Skills>
            You have the following \\glossterm<class skills>:

            \\begin<itemize>
                {attribute_texts}
            \\end<itemize>
        ",
        attribute_texts = attribute_texts.join("\n"),
        shorthand_name = class.shorthand_name(),
    );
}
