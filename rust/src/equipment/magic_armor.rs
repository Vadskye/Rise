use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
use crate::equipment::{item_latex, latex_table, StandardItem};
mod body_armor;
mod shields;

#[derive(Clone, Debug)]
pub enum MagicArmor {
    Body(StandardItem),
    Shield(StandardItem),
}

impl MagicArmor {
    pub fn item(&self) -> &StandardItem {
        match self {
            Self::Body(item) => item,
            Self::Shield(item) => item,
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
            false,
            &format!("{} -- Craft ({})", self.category(), self.craft_materials()),
        )
    }

    fn craft_materials(&self) -> &str {
        match self {
            Self::Body(_) => "bone, leather, or metal",
            Self::Shield(_) => "bone, metal, or wood",
        }
    }

    pub fn category(&self) -> &str {
        match self {
            Self::Body(_) => "Body armor",
            Self::Shield(_) => "Shield",
        }
    }
}

pub fn all_magic_armor() -> Vec<MagicArmor> {
    let mut armor = vec![];

    armor.append(&mut body_armor::body_armor());
    armor.append(&mut shields::shields());

    armor.sort_by(|a, b| a.item().name.cmp(&b.item().name));

    armor
}

fn magic_armor_rows(magic_armor: &MagicArmor) -> Vec<latex_table::TableRow> {
    latex_table::TableRow::from_item(
        magic_armor.item(),
        false,
        Some(magic_armor.category().to_string()),
    )
}

pub fn magic_armor_table() -> String {
    let with_category = true;

    let mut rows: Vec<latex_table::TableRow> = all_magic_armor()
        .iter()
        .map(|a| magic_armor_rows(a))
        .flatten()
        .collect();
    latex_table::standard_sort(&mut rows);

    latex_table::longtable(
        latex_table::table_header("Magic Armor", with_category),
        rows,
        with_category,
    )
}
