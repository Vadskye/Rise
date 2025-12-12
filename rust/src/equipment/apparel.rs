use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
use crate::equipment::latex_table::{TableRow, ToTableRows};
use crate::equipment::{item_latex, latex_table, StandardItem};
mod arms;
mod head;
mod jewelry;
mod legs;
mod torso;

#[derive(Clone, Debug)]
pub enum Apparel {
    Amulet(StandardItem),
    Belt(StandardItem),
    Blindfold(StandardItem),
    Boots(StandardItem),
    Bracers(StandardItem),
    Circlet(StandardItem),
    Cloak(StandardItem),
    Crown(StandardItem),
    Gauntlets(StandardItem),
    Gloves(StandardItem),
    Ring(StandardItem),
    Tattoo(StandardItem),
    Veil(StandardItem),
}

impl Apparel {
    pub fn item(&self) -> &StandardItem {
        match self {
            Self::Amulet(item) => item,
            Self::Belt(item) => item,
            Self::Blindfold(item) => item,
            Self::Boots(item) => item,
            Self::Bracers(item) => item,
            Self::Circlet(item) => item,
            Self::Cloak(item) => item,
            Self::Crown(item) => item,
            Self::Gauntlets(item) => item,
            Self::Gloves(item) => item,
            Self::Ring(item) => item,
            Self::Tattoo(item) => item,
            Self::Veil(item) => item,
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
            eprintln!("Apparel {} must require attunement", self.item().name);
        }

        item_latex(
            self.item().clone(),
            &format!("{} -- Craft ({})", self.category(), self.craft_materials()),
        )
    }

    fn craft_materials(&self) -> &str {
        match self {
            Self::Amulet(_) => "bone, metal, or wood",
            Self::Belt(_) => "leather or textiles",
            Self::Blindfold(_) => "textiles",
            Self::Boots(_) => "bone, leather, or metal",
            Self::Bracers(_) => "bone, metal, or wood",
            Self::Circlet(_) => "bone or metal",
            Self::Cloak(_) => "leather or textiles",
            Self::Crown(_) => "bone or metal",
            Self::Gauntlets(_) => "bone, metal, or wood",
            Self::Gloves(_) => "leather or textiles",
            Self::Ring(_) => "bone, metal, or wood",
            Self::Tattoo(_) => "manuscripts or textiles",
            Self::Veil(_) => "textiles",
        }
    }

    pub fn category(&self) -> &str {
        match self {
            Self::Amulet(_) => "Amulet",
            Self::Belt(_) => "Belt",
            Self::Blindfold(_) => "Blindfold",
            Self::Boots(_) => "Boots",
            Self::Bracers(_) => "Bracers",
            Self::Circlet(_) => "Circlet",
            Self::Cloak(_) => "Cloak",
            Self::Crown(_) => "Crown",
            Self::Gauntlets(_) => "Gauntlets",
            Self::Gloves(_) => "Gloves",
            Self::Ring(_) => "Ring",
            Self::Tattoo(_) => "Tattoo",
            Self::Veil(_) => "Veil",
        }
    }
}

use crate::equipment::ItemRarity;

pub fn all_apparel(rarity_filter: Option<ItemRarity>) -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.append(&mut arms::arms());
    apparel.append(&mut head::head());
    apparel.append(&mut jewelry::jewelry());
    apparel.append(&mut legs::legs());
    apparel.append(&mut torso::torso());

    let mut apparel = if let Some(rarity) = rarity_filter {
        apparel
            .into_iter()
            .filter(|a| a.item().rarity == rarity)
            .collect()
    } else {
        apparel
    };

    apparel.sort_by(|a, b| a.item().name.cmp(&b.item().name));

    apparel
}

impl ToTableRows for Apparel {
    fn to_table_rows(&self) -> Vec<TableRow> {
        TableRow::from_item(self.item(), false, Some(self.category().to_string()))
    }
}

pub fn apparel_table() -> String {
    let with_category = true;

    let mut rows: Vec<TableRow> = all_apparel(Some(ItemRarity::Common))
        .iter()
        .map(|a| a.to_table_rows())
        .flatten()
        .collect();
    latex_table::standard_sort(&mut rows);

    latex_table::longtable("Magic Apparel", rows, with_category)
}
