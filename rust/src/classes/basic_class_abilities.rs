use crate::classes::Class;
use crate::core_mechanics::{Attribute, Defense};
use crate::equipment::ArmorUsageClass;
use crate::latex_formatting;

// Generate the whole "Base Class Abilities" subsection used to explain a class in the
// Classes chapter.
pub fn generate_latex_basic_class_abilities(class: &Class) -> String {
    latex_formatting::latexify(format!(
        "
            \\subsection<Base Class Effects>

            If you choose {name} as your \\glossterm<base class>, you gain the following benefits.

            {base_class_table}

            {defenses}

            {resources}

            {weapon_proficiencies}

            {armor_proficiencies}

            {starting_items}

            {class_skills}
        ",
        base_class_table = class.latex_base_class_table().trim(),
        defenses = generate_latex_defenses(class).trim(),
        name = class.name(),
        resources = generate_latex_resources(class).trim(),
        armor_proficiencies = generate_latex_armor_proficiencies(class).trim(),
        class_skills = generate_latex_class_skills(class).trim(),
        starting_items = generate_latex_starting_items(class).trim(),
        weapon_proficiencies = generate_latex_weapon_proficiencies(class).trim(),
    ))
}

// Generate the Resources section of the basic class abilities.
fn generate_latex_resources(class: &Class) -> String {
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
        attunement_points = class.attunement_points(),
        fatigue_tolerance = class.fatigue_tolerance(),
        insight_points = class.insight_points(),
        shorthand_name = class.shorthand_name(),
        trained_skills = class.trained_skills(),
    )
}

fn generate_latex_defenses(class: &Class) -> String {
    let plus3_defense_names = Defense::all()
        .iter()
        .filter(|d| class.defense_bonus(d) == 3)
        .map(|d| d.title().to_string())
        .collect::<Vec<String>>();
    let plus3_defense_text = latex_formatting::join_string_list(&plus3_defense_names).unwrap();

    let custom_modifiers = Defense::all()
        .iter()
        .filter(|d| class.defense_bonus(d) != 3)
        .map(|d| format_defense(d, class.defense_bonus(d)))
        .filter(|t| t.is_some())
        .map(|t| t.unwrap())
        .collect::<Vec<String>>();
    let custom_modifier_text =
        if let Some(modifier_text) = latex_formatting::join_string_list(&custom_modifiers) {
            format!("In addition, you gain {modifier_text}.")
        } else {
            "".to_string()
        };

    latex_formatting::latexify(format!(
        "
            \\cf<{shorthand_name}><Defenses>
            You gain a \\plus3 bonus to your {plus3_defense_text} defenses.
            {custom_modifier_text}
        ",
        shorthand_name = class.shorthand_name(),
    ))
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

// fn generate_labeled_english_number(val: i32, singular: &str, plural: &str) -> String {
//     let converter = Numerics::builder().build();
//     let english_number = converter.convert_number(val).unwrap();
//     let suffix = if val == 1 { singular } else { plural };

//     format!("{} {}", english_number[0], suffix)
// }

// fn singular_or_plural(val: i32, singular: &str, plural: &str) -> String {
//     let suffix = if val == 1 { singular } else { plural };

//     format!("{} {}", val, suffix)
// }

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

            \\begin<raggeditemize>
                {attribute_texts}
            \\end<raggeditemize>
        ",
        attribute_texts = attribute_texts.join("\n"),
        shorthand_name = class.shorthand_name(),
    )
}

fn generate_latex_starting_items(class: &Class) -> String {
    let mut armor_options = vec![];
    for usage_class in class.armor_proficiencies().usage_classes {
        let armor_name = match usage_class {
            ArmorUsageClass::Light => "Buff leather",
            ArmorUsageClass::Medium => "Leather lamellar",
            ArmorUsageClass::Heavy => "Breastplate",
        };

        armor_options.push(armor_name.to_string());
    }

    let rank1_item_text = if armor_options.len() == 1 {
        format!("\\item {}", armor_options[0])
    } else if armor_options.len() > 0 {
        format!(
            "
                \\item Any one of the following: {}
            ",
            latex_formatting::join_string_list(&armor_options)
                .unwrap()
                .replace(" and ", " or ")
                .to_lowercase()
        )
    } else {
        "\\item A \\magicitem{spell wand, 1st} with a rank 1 spell from one \\glossterm{mystic sphere} that you have access to".to_string()
    };

    let mut weapon_options: Vec<String> = vec![];
    if let Some(custom_weapons) = class.weapon_proficiencies().custom_weapons {
        // TODO: fix formatting here; we might need to convert this to a vec
        weapon_options.push(custom_weapons.replace(" and ", " "));
    }
    if class.weapon_proficiencies().simple_weapons {
        weapon_options.push("club".to_string());
        weapon_options.push("dagger".to_string());
    }
    if class.weapon_proficiencies().non_exotic_weapons {
        weapon_options.push("broadsword".to_string());
        weapon_options.push("two handaxes".to_string());
        weapon_options.push("spear".to_string());
    }
    let weapon_text = if weapon_options.len() == 0 {
        "\\item Two \\magicitem{potions of healing}".to_string()
    } else if weapon_options.len() == 1 {
        // Only possible with custom weapons only??
        format!(
            "\\item Any one of the following: {}",
            latex_formatting::join_string_list(&weapon_options).unwrap()
        )
    } else if weapon_options.len() == 2 {
        format!(
            "\\item A {}",
            latex_formatting::join_string_list(&weapon_options).unwrap()
        )
    } else {
        format!(
            "\\item Any two of the following: {}",
            latex_formatting::join_string_list(&weapon_options).unwrap()
        )
    }
    .replace(" and ", " or ");

    let shield_text = if class
        .armor_proficiencies()
        .usage_classes
        .contains(&ArmorUsageClass::Medium)
    {
        "\\item A buckler or standard shield"
    } else if class
        .armor_proficiencies()
        .usage_classes
        .contains(&ArmorUsageClass::Light)
    {
        "\\item A buckler"
    } else {
        "\\item A vial of \\magicitem{alchemist's fire}"
    };

    format!(
        "
            \\cf<{shorthand_name}><Starting Items and Equipment>
            You can start with the following items and equipment:

            \\begin<raggeditemize>
                {rank1_item_text}
                {weapon_text}
                {shield_text}
                \\item A standard adventuring kit (see \\pcref<Standard Adventuring Kit>).
                \\item A rank 0 wealth item (1 gp)
            \\end<raggeditemize>
        ",
        shorthand_name = class.shorthand_name(),
    )
}
