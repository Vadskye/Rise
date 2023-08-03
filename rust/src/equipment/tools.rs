use crate::core_mechanics::abilities::AbilityTag;
use crate::equipment::{item_latex, StandardItem, ItemUpgrade};
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

    pub fn to_latex(self) -> String {
        let consumable = self.category.is_consumable();
        let latex = &self.category.crafting_latex();
        item_latex(
            StandardItem::from_tool(self),
            consumable,
            latex,
        )
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
