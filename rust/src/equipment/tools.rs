use crate::core_mechanics::abilities::AbilityTag;
use crate::equipment::{item_latex, latex_table, ItemUpgrade, StandardItem};
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
        item_latex(self.item(), consumable, latex)
    }

    pub fn item(&self) -> StandardItem {
        return StandardItem {
            description: self.description.clone(),
            short_description: self.short_description.clone(),
            magical: self.magical,
            name: self.name.clone(),
            rank: self.rank,
            upgrades: self.upgrades.clone(),
            tags: self.tags.clone(),
        };
    }
}

#[derive(Clone, Debug, Default)]
pub enum ToolCategory {
    Alchemical,
    Creature,
    Permanent(String),
    Poison,
    Potion,
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
            Self::Potion => String::from("Potion -- Craft (alchemy)"),
            Self::Unknown => panic!("Unknown tool category"),
        }
    }

    pub fn name(&self) -> Option<String> {
        match self {
            Self::Alchemical => None,
            Self::Creature => None,
            Self::Permanent(_) => None,
            Self::Poison => Some(String::from("poison")),
            Self::Potion => Some(String::from("potion")),
            Self::Unknown => panic!("Unknown tool category"),
        }
    }

    pub fn is_consumable(&self) -> bool {
        match self {
            Self::Alchemical => true,
            Self::Creature => false,
            Self::Permanent(_) => false,
            Self::Poison => true,
            Self::Potion => true,
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

fn tool_rows(tool: &Tool) -> Vec<latex_table::TableRow> {
    latex_table::TableRow::from_item(
        &tool.item(),
        tool.category.is_consumable(),
        tool.category.name(),
    )
}

pub fn consumable_tool_table() -> String {
    let with_category = true;

    let consumable_tools: Vec<Tool> = all_tools()
        .into_iter()
        .filter(|t| t.category.is_consumable())
        .collect();
    let mut rows = vec![];
    for tool in consumable_tools {
        rows.append(&mut tool_rows(&tool));
    }

    latex_table::longtable(
        latex_table::table_header("Consumable Tools", with_category),
        rows,
        with_category,
    )
}

pub fn permanent_tool_table() -> String {
    let with_category = true;

    let permanent_tools: Vec<Tool> = all_tools()
        .into_iter()
        .filter(|t| !t.category.is_consumable())
        .collect();
    let mut rows = vec![];
    for tool in permanent_tools {
        rows.append(&mut tool_rows(&tool));
    }

    latex_table::longtable(
        latex_table::table_header("Permanent Tools, Goods, and Mounts", with_category),
        rows,
        with_category,
    )
}
