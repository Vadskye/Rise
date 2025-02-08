use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
use crate::equipment::{item_latex, latex_table, StandardItem};
use crate::equipment::latex_table::{TableRow, ToTableRows};
mod rods;
mod staffs;
mod wands;

#[derive(Clone, Debug)]
pub enum Implement {
    Staff(StandardItem),
    Rod(StandardItem),
    Wand(StandardItem),
}

impl Implement {
    fn item(&self) -> &StandardItem {
        match self {
            Self::Staff(item) => item,
            Self::Rod(item) => item,
            Self::Wand(item) => item,
        }
    }

    pub fn default() -> StandardItem {
        return StandardItem {
            magical: true,
            tags: vec![AbilityTag::Attune(AttuneType::Personal)],
            ..Default::default()
        };
    }

    pub fn to_latex(&self) -> String {
        item_latex(
            self.item().clone(),
            &format!("{} -- {}", self.category(), self.crafting_latex()),
        )
    }

    fn crafting_latex(&self) -> &str {
        match self {
            Self::Staff(_) => "bone or wood",
            Self::Rod(_) => "bone, metal, or wood",
            Self::Wand(_) => "bone or wood",
        }
    }

    fn category(&self) -> &str {
        match self {
            Self::Staff(_) => "Staff",
            Self::Rod(_) => "Rod",
            Self::Wand(_) => "Wand",
        }
    }
}

pub fn all_implements() -> Vec<Implement> {
    let mut implements = vec![];

    implements.append(&mut staffs::staffs());
    implements.append(&mut rods::rods());
    implements.append(&mut wands::wands());

    implements.sort_by(|a, b| a.item().name.cmp(&b.item().name));

    implements
}

impl ToTableRows for Implement {
    fn to_table_rows(&self) -> Vec<TableRow> {
        TableRow::from_item(self.item(), false, Some(self.category().to_string()))
    }
}

pub fn implements_table() -> String {
    let with_category = true;

    let mut rows: Vec<TableRow> = all_implements()
        .iter()
        .map(|i| i.to_table_rows())
        .flatten()
        .collect();
    latex_table::standard_sort(&mut rows);

    latex_table::longtable(
        "Implements",
        rows,
        with_category,
    )
}
