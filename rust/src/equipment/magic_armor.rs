use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
use crate::equipment::latex_table::{TableRow, ToTableRows};
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
        if !self
            .item()
            .tags
            .iter()
            .any(|item| matches!(item, AbilityTag::Attune(_)))
        {
            eprintln!("Armor {} must require attunement", self.item().name);
        }

        item_latex(
            self.item().clone(),
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

impl ToTableRows for MagicArmor {
    fn to_table_rows(&self) -> Vec<TableRow> {
        TableRow::from_item(self.item(), false, Some(self.category().to_string()))
    }
}

pub fn magic_armor_table() -> String {
    let with_category = true;

    let mut body_armor = body_armor::body_armor();
    body_armor.sort_by(|a, b| a.item().name.cmp(&b.item().name));
    let mut body_armor_rows: Vec<TableRow> = body_armor
        .iter()
        .map(|a| a.to_table_rows())
        .flatten()
        .collect();
    latex_table::standard_sort(&mut body_armor_rows);

    let mut shields = shields::shields();
    shields.sort_by(|a, b| a.item().name.cmp(&b.item().name));
    let mut shield_rows: Vec<TableRow> = shields
        .iter()
        .map(|a| a.to_table_rows())
        .flatten()
        .collect();
    latex_table::standard_sort(&mut shield_rows);

    format!(
        "{} {}",
        latex_table::longtable("Magic Body Armor", body_armor_rows, with_category,),
        latex_table::longtable("Magic Shields", shield_rows, with_category,),
    )
}
