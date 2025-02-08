use crate::core_mechanics::abilities::AbilityTag;
use crate::equipment::latex_table::{TableRow, ToTableRows};
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
        let latex = &self.category.crafting_latex();
        item_latex(self.item(), latex)
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
    Kit(String),
    Mount,
    Permanent(String),
    Poison,
    Potion,
    Trap(String),
    // This is a dumb hack to make ToolCategory mandatory
    #[default]
    Unknown,
}

impl ToolCategory {
    fn crafting_latex(&self) -> String {
        match self {
            Self::Alchemical => String::from("Craft (alchemy)"),
            Self::Kit(c) => format!("Kit -- Craft ({})", c),
            Self::Mount => String::from("Mount"),
            Self::Permanent(c) => format!("Craft ({})", c),
            // Add an extra space after \poison and \potion
            Self::Poison => String::from(r"Poison\poison {} -- Craft (poison)"),
            Self::Potion => String::from(r"Potion\potion {} -- Craft (alchemy)"),
            Self::Trap(c) => format!("Trap -- Craft ({})", c),
            Self::Unknown => panic!("Unknown tool category"),
        }
    }

    pub fn name(&self) -> Option<String> {
        match self {
            Self::Alchemical => Some(String::from("Alchemical")),
            Self::Kit(_) => Some(String::from(r"Kit")),
            Self::Mount => Some(String::from(r"Mount")),
            Self::Permanent(_) => Some(String::from(r"Object")),
            Self::Poison => Some(String::from(r"Poison\poison")),
            Self::Potion => Some(String::from(r"Potion\potion")),
            Self::Trap(_) => Some(String::from(r"Trap")),
            Self::Unknown => panic!("Unknown tool category"),
        }
    }

    pub fn is_consumable(&self) -> bool {
        match self {
            Self::Alchemical => true,
            Self::Kit(_) => false,
            Self::Mount => false,
            Self::Permanent(_) => false,
            Self::Poison => true,
            Self::Potion => true,
            Self::Trap(_) => false,
            Self::Unknown => panic!("Unknown tool category"),
        }
    }
}

pub fn all_tools(consumable: Option<bool>) -> Vec<Tool> {
    let mut tools = vec![];

    tools.append(&mut alchemical_items::alchemical_items());
    tools.append(&mut kits::kits());
    tools.append(&mut mounts::mounts());
    tools.append(&mut objects::objects());
    tools.append(&mut potions::potions());
    tools.append(&mut poisons::poisons());
    tools.append(&mut traps::traps());

    if let Some(c) = consumable {
        tools = tools
            .into_iter()
            .filter(|t| t.category.is_consumable() == c)
            .collect();
    }

    tools.sort_by(|a, b| a.name.cmp(&b.name));

    tools
}

impl ToTableRows for Tool {
    fn to_table_rows(&self) -> Vec<TableRow> {
        TableRow::from_item(
            &self.item(),
            self.category.is_consumable(),
            // The row should always have a category, even if we have no category for that item.
            Some(self.category.name().unwrap_or(String::from(""))),
        )
    }
}

pub fn consumable_tools_table() -> String {
    let with_category = true;

    let mut rows: Vec<TableRow> = all_tools(Some(true))
        .iter()
        .map(|t| t.to_table_rows())
        .flatten()
        .collect();
    latex_table::standard_sort(&mut rows);

    latex_table::longtable(
        "Consumables",
        rows,
        with_category,
    )
}

pub fn permanent_tools_table() -> String {
    let with_category = true;

    let mut rows: Vec<TableRow> = all_tools(Some(false))
        .iter()
        .map(|t| t.to_table_rows())
        .flatten()
        .collect();
    latex_table::standard_sort(&mut rows);

    latex_table::longtable(
        "Permanent Tools, Goods, and Mounts",
        rows,
        with_category,
    )
}
