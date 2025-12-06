use crate::core_mechanics::abilities::{replace_attack_terms, AbilityTag, AttuneType};
use crate::core_mechanics::Attribute;
use crate::equipment::{item_creature, rank_and_price_text, ItemRarity, ItemUpgrade};
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
    pub rarity: ItemRarity,
    pub upgrades: Vec<ItemUpgrade>,
    pub tags: Vec<AbilityTag>,
}

// Static methods for creating a StandardItem
impl StandardItem {
    pub fn attribute_item(name: &str, attribute: &Attribute) -> Self {
        Self {
            name: String::from(name),
            rank: 3,
            short_description: format!("Grants +1 {}", attribute.name()),
            description: format!(
                "
                    You gain a +1 \\glossterm<enhancement bonus> to your {}
                ",
                attribute.title(),
            ),
            magical: true,
            upgrades: vec![ItemUpgrade::new(
                7,
                &format!("Grants +2 {}", attribute.name()),
                "The bonus increases to +2.",
            )],
            tags: vec![AbilityTag::Attune(AttuneType::Deep)],
            rarity: ItemRarity::Common,
        }
    }

    // +3, then +5 enhancement bonus
    pub fn skill_item(name: &str, skill: &str) -> Self {
        Self {
            name: String::from(name),
            rank: 3,
            short_description: format!("Grants +3 {}", skill),
            description: format!(
                "
                    You gain a +3 \\glossterm<enhancement bonus> to the {skill} skill (see \\pcref<{skill}>).
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
            rarity: ItemRarity::Common,
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
            rarity: ItemRarity::Common,
        }
    }
}

// Methods on a StandardItem
impl StandardItem {
    // Convert the briefly defined upgrades into full standard items. This is useful for LaTeX
    // conversion.
    pub fn upgrade_items(&self) -> Vec<StandardItem> {
        self.upgrades
            .iter()
            .enumerate()
            .map(|(i, upgrade)| {
                let upgrade_tier = i + 1;

                StandardItem {
                    description: upgrade.description.clone(),
                    short_description: upgrade.short_description.clone(),
                    magical: self.magical,
                    name: format!("{}{}", self.name, "+".repeat(upgrade_tier)),
                    rank: upgrade.rank,
                    rarity: self.rarity.clone(),
                    upgrades: vec![],
                    tags: self.tags.clone(),
                }
            })
            .collect()
    }
}

// The extra arguments are derived from the item's category, which is individual for each item
// type.
pub fn item_latex(item: StandardItem, crafting_text: &str) -> String {
    validate_description(&item);
    validate_short_description(&item);

    let tags = item.tags.clone();
    // if !tags.iter().any(|t| matches!(t, AbilityTag::Attune(_))) {
    //     tags.push(AbilityTag::Attune(AttuneType::Personal));
    // }
    let mut tags: Vec<String> = tags.iter().map(|t| t.latex()).collect();
    tags.sort();

    let is_attuned = item.tags.iter().any(|t| matches!(t, AbilityTag::Attune(_)));

    latexify(format!(
        "
            \\begin<{magical}{abilitytype}><{name}><Rank {rank_and_price}>
                \\spelltwocol<{crafting}><{tags}>
                \\rankline
                {description}
                {upgrades_rankline}
                {upgrades}
            \\end<{magical}{abilitytype}>
        ",
        magical = if item.magical { "magical" } else { "" },
        abilitytype = if is_attuned {
            "attuneitem"
        } else {
            "passiveitem"
        },
        name = item.name.clone(),
        // attuneability uses {} for the last argument, but activeability uses [] for the last
        // argument.
        rank_and_price = rank_and_price_text(item.rank),
        crafting = crafting_text,
        tags = tags.join(", "),
        description =
            replace_attack_terms(&item.description, &item_creature(item.rank), false, None),
        upgrades_rankline = if item.upgrades.len() > 0 {
            "\\rankline"
        } else {
            ""
        },
        upgrades = latex_upgrades_section(item),
    ))
}

fn validate_description(item: &StandardItem) {
    let warn = |message| {
        eprintln!("Item {} {}", item.name, message);
    };

    let as_action_pattern = Regex::new(r"^As a.*action.*you can").unwrap();
    let starting_strike_pattern = Regex::new(r"^[^.]*strike").unwrap();
    if as_action_pattern.is_match(item.description.trim())
        && !starting_strike_pattern.is_match(item.description.trim())
    {
        warn("starts its description with 'as an action'");
    }
}

fn validate_short_description(item: &StandardItem) {
    let warn = |message| {
        eprintln!("Item {} {}", item.name, message);
    };

    // This takes up too much space, and is often deducible from the item's name
    let damage_type_pattern = Regex::new(r"\d \w+ damage").unwrap();
    if damage_type_pattern.is_match(item.short_description.trim()) {
        warn("includes a damage type in its short description");
    }
}

// This uses the item instead of being a method on `Upgrade` because generating the
// upgrade text requires a lot of information about the original item and the number of
// upgrades.
fn latex_upgrades_section(item: StandardItem) -> String {
    if item.upgrades.len() == 0 {
        return String::from("");
    }
    let upgrade_latex: Vec<String> = item
        .upgrade_items()
        .iter()
        .map(|upgraded_item| {
            format!(
                "
                    \\upgraderank<{name}><{rank_and_price}> {description}
                ",
                name = upgraded_item.name,
                // Note that `\upgraderank` provides "Rank" text, so we don't prefix
                // this with "Rank".
                rank_and_price = rank_and_price_text(upgraded_item.rank),
                description = replace_attack_terms(
                    &upgraded_item.description,
                    &item_creature(upgraded_item.rank),
                    false,
                    None,
                ),
            )
        })
        .collect();

    upgrade_latex.join("\n")
}
