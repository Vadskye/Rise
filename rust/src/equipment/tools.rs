use crate::core_mechanics::abilities::{replace_attack_terms, AbilityTag};
use crate::equipment::{item_creature, rank_and_price_text, ItemUpgrade};
use crate::latex_formatting::latexify;
mod alchemical_items;
mod kits;
mod mounts;
mod objects;
mod poisons;
mod potions;
mod traps;

#[derive(Clone, Debug, Default)]
pub struct Tool {
    pub category: ToolCategory,
    pub description: String,
    pub short_description: String,
    pub magical: bool,
    pub name: String,
    pub rank: i32,
    pub upgrades: Vec<ItemUpgrade>,
    pub tags: Vec<AbilityTag>,
}

impl Tool {
    // TODO: link with CraftSubskill if it exists
    pub fn permanent(craft_subskill: &str) -> Self {
        return Self {
            category: ToolCategory::Permanent(craft_subskill.to_string()),
            ..Default::default()
        };
    }

    pub fn to_latex(&self) -> String {
        let mut tags = self.tags.clone();
        // if !tags.iter().any(|t| matches!(t, AbilityTag::Attune(_))) {
        //     tags.push(AbilityTag::Attune(AttuneType::Personal));
        // }
        let mut tags: Vec<String> = tags.iter().map(|t| t.latex()).collect();
        tags.sort();

        let is_attuned = self.tags.iter().any(|t| matches!(t, AbilityTag::Attune(_)));
        let rank_and_price = rank_and_price_text(self.rank, self.category.is_consumable());

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
            magical = if self.magical { "magical" } else { "" },
            abilitytype = if is_attuned {
                "attuneability"
            } else {
                "activeability"
            },
            name = self.name,
            // attuneability uses {} for the last argument, but activeability uses [] for the last
            // argument.
            braced_price = if is_attuned {
                format!("<Rank {}>", rank_and_price)
            } else {
                format!("[Rank {}]", rank_and_price)
            },
            crafting = self.category.crafting_latex(),
            tags = tags.join(", "),
            description =
                replace_attack_terms(&self.description, &item_creature(self.rank), false, None),
            upgrades_rankline = if self.upgrades.len() > 0 {
                "\\rankline"
            } else {
                ""
            },
            upgrades = self.latex_upgrades_section(),
        ))
    }

    // This is a method of `Tool` instead of `Upgrade` because generating the upgrade text requires
    // a lot of information about the original item and the number of upgrades.
    fn latex_upgrades_section(&self) -> String {
        if self.upgrades.len() == 0 {
            return String::from("");
        }
        let upgrade_latex: Vec<String> = self
            .upgrades
            .iter()
            .enumerate()
            .map(|(i, upgrade)| {
                let upgrade_tier = i + 1;
                format!(
                    "
                        \\upgraderank<{name}{plus_suffix}><{rank_and_price}> {description}
                    ",
                    name = self.name,
                    plus_suffix = "+".repeat(upgrade_tier),
                    // Note that `\upgraderank` provides "Rank" text, so we don't prefix
                    // this with "Rank".
                    rank_and_price = rank_and_price_text(upgrade.rank, self.category.is_consumable()),
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
}

#[derive(Clone, Debug, Default)]
pub enum ToolCategory {
    Alchemical,
    Creature,
    Permanent(String),
    Poison,
    // This is a dumb hack to make ToolCategory mandatory
    #[default]
    Unknown,
}

impl ToolCategory {
    fn crafting_latex(&self) -> String {
        match self {
            Self::Alchemical => String::from("Craft (alchemy)"),
            Self::Creature => String::from(""),
            Self::Permanent(c) => format!("Craft ({})", c),
            Self::Poison => String::from("Poison -- Craft (poison)"),
            Self::Unknown => panic!("Unknown tool category"),
        }
    }

    fn is_consumable(&self) -> bool {
        match self {
            Self::Alchemical => true,
            Self::Creature => false,
            Self::Permanent(_) => false,
            Self::Poison => true,
            Self::Unknown => panic!("Unknown tool category"),
        }
    }
}

pub fn all_tools() -> Vec<Tool> {
    let mut tools = vec![];

    tools.append(&mut alchemical_items::alchemical_items());
    tools.append(&mut kits::kits());
    tools.append(&mut mounts::mounts());
    tools.append(&mut objects::objects());
    tools.append(&mut potions::potions());
    tools.append(&mut poisons::poisons());
    tools.append(&mut traps::traps());

    tools.sort_by(|a, b| a.name.cmp(&b.name));

    tools
}
