use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
use crate::equipment::{item_latex, latex_table, ItemUpgrade, StandardItem};
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
        item_latex(
            self.item().clone(),
            false,
            // TODO: is it useful to subdivide weapons into categories here?
            &format!("Craft ({})", self.craft_materials()),
        )
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

fn magic_weapon_rows(magic_weapon: &MagicWeapon) -> Vec<latex_table::TableRow> {
    latex_table::TableRow::from_item(magic_weapon.item(), false, None)
}

pub fn magic_weapons_table() -> String {
    let with_category = false;

    let mut rows: Vec<latex_table::TableRow> = all_magic_weapons()
        .iter()
        .map(|w| magic_weapon_rows(w))
        .flatten()
        .collect();
    latex_table::standard_sort(&mut rows);

    latex_table::longtable(
        latex_table::table_header("Magic Weapons", with_category),
        rows,
        with_category,
    )
}
