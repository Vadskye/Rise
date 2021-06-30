use crate::classes;
use crate::core_mechanics::attributes::Attribute;
use crate::core_mechanics::defenses::Defense;
use crate::latex_formatting;
use numerics::Numerics;

// Generate the whole "Basic Class Abilities" subsection used to explain a class in the
// Classes chapter.
pub fn generate_latex_basic_class_abilities(class: &classes::Class) -> String {
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
fn generate_latex_resources(class: &classes::Class) -> String {
    return format!(
        "
            \\cf<{shorthand_name}><Resources>
            You have the following \\glossterm<resources>:
            \\begin<itemize>
                \\item {insight_points}, which you can spend to gain additional abilities or proficiencies (see \\pcref<Insight Points>).
                \\item {skill_points}, which you can spend to learn skills (see \\pcref<Skills>).
                \\item {attunement_points}, which you can use to attune to items and abilities that affect you (see \\pcref<Attunement Points>).
                \\item A \\plus{fatigue_tolerance} bonus to your \\glossterm<fatigue tolerance>, which makes it easier for you to use powerful abilities that fatigue you (see \\pcref<Fatigue>).
            \\end<itemize>
        ",
        attunement_points = latex_formatting::uppercase_first_letter(&
            generate_labeled_english_number(
                class.attunement_points(),
                "\\glossterm<attunement point>",
                "\\glossterm<attunement points>",
            )
        ),
        fatigue_tolerance = class.fatigue_tolerance(),
        insight_points = latex_formatting::uppercase_first_letter(&
            generate_labeled_english_number(
                class.insight_points(),
                "\\glossterm<insight point>",
                "\\glossterm<insight points>",
            )
        ),
        shorthand_name = class.shorthand_name(),
        skill_points = latex_formatting::uppercase_first_letter(&
            generate_labeled_english_number(
                class.skill_points(),
                "\\glossterm<skill point>",
                "\\glossterm<skill points>",
            )
        ),
    );
}

fn generate_latex_defenses(class: &classes::Class) -> String {
    return latex_formatting::latexify(
        format!(
            "
                \\cf<{shorthand_name}><Defenses>
                You gain the following bonuses to your \\glossterm<defenses>: \\plus{armor} Armor, \\plus{fortitude} Fortitude, \\plus{reflex} Reflex, \\plus{mental} Mental.
            ",
            armor=class.defense_bonus(&Defense::Armor),
            fortitude=class.defense_bonus(&Defense::Fortitude),
            reflex=class.defense_bonus(&Defense::Reflex),
            mental=class.defense_bonus(&Defense::Mental),
            shorthand_name=class.shorthand_name(),
        )
    );
}

fn generate_labeled_english_number(val: i32, singular: &str, plural: &str) -> String {
    let converter = Numerics::builder().build();
    let english_number = converter.convert_number(val).unwrap();
    let suffix = if val == 1 { singular } else { plural };
    return format!("{} {}", english_number[0], suffix);
}

fn generate_latex_armor_proficiencies(class: &classes::Class) -> String {
    let armor_proficiencies = class.armor_proficiencies();
    let proficiences_text: String;
    if armor_proficiencies.len() == 0 {
        proficiences_text = "
            You are not proficient with any type of armor.
            Encumbrance from armor interferes with the gestures you make to cast spells, which can cause your spells with \\glossterm{somatic components} to fail (see \\pcref{Somatic Component Failure}).
        ".to_string();
    } else {
        let stringified: Vec<&str> = armor_proficiencies.iter().map(|w| w.name()).collect();
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

fn generate_latex_weapon_proficiencies(class: &classes::Class) -> String {
    let weapon_proficiencies = class.weapon_proficiencies();
    let proficiences_text: String;
    if !weapon_proficiencies.simple_weapons {
        proficiences_text = "
            You are not proficient with any weapon groups, even simple weapons.
            You are still proficient with your natural weapons.
        "
        .to_string();
    } else if weapon_proficiencies.specific_weapons.is_some() {
        let custom_weapon_groups = generate_labeled_english_number(weapon_proficiencies.custom_weapon_groups, "other weapon group","other weapon groups");
        let custom_weapon_groups = format!("any {}", custom_weapon_groups);
        let mut components = vec![
            String::from("simple weapons"),
            custom_weapon_groups,
        ];
        for w in weapon_proficiencies.specific_weapons.unwrap() {
            components.push(w.plural_name());
        }
        proficiences_text = format!(
            "
                You are proficient with {}.
            ",
            latex_formatting::join_string_list(&components).unwrap_or(String::from("")),
        );
    } else if weapon_proficiencies.custom_weapon_groups > 0 {
        proficiences_text = format!(
            "
                You are proficient with simple weapons and any {weapon_group_text}.
            ",
            weapon_group_text = generate_labeled_english_number(
                weapon_proficiencies.custom_weapon_groups,
                "other weapon group",
                "other weapon groups"
            ),
        );
    } else {
        proficiences_text = "You are proficient with simple weapons.".to_string();
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

fn generate_latex_class_skills(class: &classes::Class) -> String {
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
