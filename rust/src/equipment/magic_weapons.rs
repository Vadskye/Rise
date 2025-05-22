use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
use crate::equipment::{item_latex, latex_table, StandardItem};
use crate::equipment::latex_table::{TableRow, ToTableRows};
mod melee;
mod ranged;
mod unrestricted;

#[derive(Clone, Debug)]
pub enum MagicWeapon {
    Melee(StandardItem),
    Ranged(StandardItem),
    Unrestricted(StandardItem),
}

impl MagicWeapon {
    pub fn item(&self) -> &StandardItem {
        match self {
            Self::Melee(item) => item,
            Self::Ranged(item) => item,
            Self::Unrestricted(item) => item,
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
        if !self.item().tags.iter().any(|item| matches!(item, AbilityTag::Attune(_))) {
            eprintln!("Weapon {} must require attunement", self.item().name);
        }

        item_latex(
            self.item().clone(),
            // TODO: is it useful to subdivide weapons into categories here?
            &format!("Craft ({})", self.craft_materials()),
        )
    }

    pub fn category(&self) -> &str {
        match self {
            Self::Melee(_) => "Melee",
            Self::Ranged(_) => "Ranged",
            Self::Unrestricted(_) => "",
        }
    }

    fn craft_materials(&self) -> &str {
        "as base weapon"
    }
}

pub fn all_magic_weapons() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.append(&mut melee::melee());
    weapons.append(&mut ranged::ranged());
    weapons.append(&mut unrestricted::unrestricted());

    weapons.sort_by(|a, b| a.item().name.cmp(&b.item().name));

    weapons
}

impl ToTableRows for MagicWeapon {
    fn to_table_rows(&self) -> Vec<TableRow> {
        TableRow::from_item(self.item(), false, None)
    }
}

pub fn magic_weapons_table() -> String {
    let with_category = false;

    let mut rows: Vec<TableRow> = all_magic_weapons()
        .iter()
        .map(|w| w.to_table_rows())
        .flatten()
        .collect();
    latex_table::standard_sort(&mut rows);

    latex_table::longtable(
        "Magic Weapons",
        rows,
        with_category,
    )
}
