use crate::core_mechanics::Attribute;
use crate::core_mechanics::abilities::{replace_attack_terms, AbilityTag, AttuneType};
use crate::equipment::{item_creature, rank_and_price_text, ItemUpgrade, Tool};
use crate::latex_formatting::latexify;
use regex::Regex;

// These fields are shared between all item structs
#[derive(Clone, Debug, Default)]
pub struct StandardItem {
    pub description: String,
    pub short_description: String,
    pub magical: bool,
    pub name: String,
    pub rank: i32,
    pub upgrades: Vec<ItemUpgrade>,
    pub tags: Vec<AbilityTag>,
}

impl StandardItem {
    pub fn attribute_item(name: &str, attribute: &Attribute) -> Self {
        Self {
            name: String::from(name),
            rank: 6,
            short_description: format!("Grants +1 {}", attribute.name()),
            description: format!(
                "
                    You gain a +1 \\glossterm<magic bonus> to your {}
                ",
                attribute.name(),
            ),
            magical: true,
            upgrades: vec![],
            tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        }
    }

    // +3, then +5 magic bonus
    pub fn skill_item(name: &str, skill: &str) -> Self {
        Self {
            name: String::from(name),
            rank: 3,
            short_description: format!("Grants +3 {}", skill),
            description: format!(
                "
                    You gain a +3 \\glossterm<magic bonus> to the {skill} skill (see \\pcref<{skill}>).
                ",
                skill = skill
            ),
            upgrades: vec![ItemUpgrade::new(
                6,
                &format!("Grants +5 {}", skill),
                "The bonus increases to +5.",
            )],
            magical: true,
            tags: vec![AbilityTag::Attune(AttuneType::Personal)],
        }
    }

    // Reroll 1s
    pub fn reliable_skill_item(name: &str, skills: &str, summary: &str) -> Self {
        Self {
            name: String::from(name),
            rank: 1,
            short_description: format!("Can reroll 1s with {} skills", summary),
            description: format!(
                "
                    Whenever you roll a 1 on an attack or check using the {} skills, you may reroll and take the higher result.
                    You can only reroll any individual roll once in this way.
                    This does not affect bonus dice rolled for exploding attacks.
                ",
                skills
            ),
            upgrades: vec![ItemUpgrade::new(
                4,
                &format!("Can reroll 3 or less with {} skills", summary),
                "You can also reroll when you roll a 2 or 3.",
            )],
            magical: true,
            tags: vec![AbilityTag::Attune(AttuneType::Personal)],
        }
    }

    pub fn from_tool(item: Tool) -> Self {
        return Self {
            description: item.description,
            short_description: item.short_description,
            magical: item.magical,
            name: item.name,
            rank: item.rank,
            upgrades: item.upgrades,
            tags: item.tags,
        };
    }
}

// The extra arguments are derived from the item's category, which is individual for each item
// type.
pub fn item_latex(item: StandardItem, consumable: bool, crafting_text: &str) -> String {
    validate_description(&item);
    validate_short_description(&item);

    let tags = item.tags.clone();
    // if !tags.iter().any(|t| matches!(t, AbilityTag::Attune(_))) {
    //     tags.push(AbilityTag::Attune(AttuneType::Personal));
    // }
    let mut tags: Vec<String> = tags.iter().map(|t| t.latex()).collect();
    tags.sort();

    let is_attuned = item.tags.iter().any(|t| matches!(t, AbilityTag::Attune(_)));
    let rank_and_price = rank_and_price_text(item.rank, consumable);

    latexify(format!(
        "
            \\begin<{magical}{abilitytype}><{name}>{braced_price}
                \\spelltwocol<{crafting}><{tags}>
                \\rankline
                {description}
                {upgrades_rankline}
                {upgrades}
            \\end<{magical}{abilitytype}>
        ",
        magical = if item.magical { "magical" } else { "" },
        abilitytype = if is_attuned {
            "attuneability"
        } else {
            "activeability"
        },
        name = item.name.clone(),
        // attuneability uses {} for the last argument, but activeability uses [] for the last
        // argument.
        braced_price = if is_attuned {
            format!("<Rank {}>", rank_and_price)
        } else {
            format!("[Rank {}]", rank_and_price)
        },
        crafting = crafting_text,
        tags = tags.join(", "),
        description =
            replace_attack_terms(&item.description, &item_creature(item.rank), false, None),
        upgrades_rankline = if item.upgrades.len() > 0 {
            "\\rankline"
        } else {
            ""
        },
        upgrades = latex_upgrades_section(item, consumable),
    ))
}

fn validate_description(item: &StandardItem) {
    let warn = |message| {
        eprintln!("Item {} {}", item.name, message);
    };

    let as_action_pattern = Regex::new(r"^As a.*action.*you can").unwrap();
    if as_action_pattern.is_match(item.description.trim()) {
        warn("starts its description with 'as an action'");
    }
}

fn validate_short_description(item: &StandardItem) {
    let warn = |message| {
        eprintln!("Item {} {}", item.name, message);
    };

    // This takes up too much space, and is often deducible from the item's name
    let damage_type_pattern = Regex::new(r"\d \w+ damage").unwrap();
    if damage_type_pattern.is_match(item.description.trim()) {
        warn("includes a damage type in its short description");
    }
}

// This uses the item instead of being a method on `Upgrade` because generating the
// upgrade text requires a lot of information about the original item and the number of
// upgrades.
fn latex_upgrades_section(item: StandardItem, consumable: bool) -> String {
    if item.upgrades.len() == 0 {
        return String::from("");
    }
    let upgrade_latex: Vec<String> = item
        .upgrades
        .iter()
        .enumerate()
        .map(|(i, upgrade)| {
            let upgrade_tier = i + 1;
            format!(
                "
                    \\upgraderank<{name}{plus_suffix}><{rank_and_price}> {description}
                ",
                name = item.name,
                plus_suffix = "+".repeat(upgrade_tier),
                // Note that `\upgraderank` provides "Rank" text, so we don't prefix
                // this with "Rank".
                rank_and_price = rank_and_price_text(upgrade.rank, consumable),
                description = replace_attack_terms(
                    &upgrade.description,
                    &item_creature(upgrade.rank),
                    false,
                    None,
                ),
            )
        })
        .collect();

    upgrade_latex.join("\n")
}
