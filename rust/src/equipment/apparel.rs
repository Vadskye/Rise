use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
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
    Bracer(StandardItem),
    Bracers(StandardItem),
    Circlet(StandardItem),
    Cloak(StandardItem),
    Crown(StandardItem),
    Gauntlet(StandardItem),
    Gauntlets(StandardItem),
    Greaves(StandardItem),
    Glove(StandardItem),
    Gloves(StandardItem),
    Mask(StandardItem),
    Ring(StandardItem),
}

impl Apparel {
    pub fn item(&self) -> &StandardItem {
        match self {
            Self::Amulet(item) => item,
            Self::Belt(item) => item,
            Self::Blindfold(item) => item,
            Self::Boots(item) => item,
            Self::Bracer(item) => item,
            Self::Bracers(item) => item,
            Self::Circlet(item) => item,
            Self::Cloak(item) => item,
            Self::Crown(item) => item,
            Self::Gauntlet(item) => item,
            Self::Gauntlets(item) => item,
            Self::Glove(item) => item,
            Self::Gloves(item) => item,
            Self::Greaves(item) => item,
            Self::Mask(item) => item,
            Self::Ring(item) => item,
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
            Self::Amulet(_) => "bone, metal, or wood",
            Self::Belt(_) => "leather or textiles",
            Self::Blindfold(_) => "textiles",
            Self::Boots(_) => "bone, leather, or metal",
            Self::Bracer(_) => "bone, metal, or wood",
            Self::Bracers(_) => "bone, metal, or wood",
            Self::Circlet(_) => "bone or metal",
            Self::Cloak(_) => "leather or textiles",
            Self::Crown(_) => "bone or metal",
            Self::Gauntlet(_) => "bone, metal, or wood",
            Self::Gauntlets(_) => "bone, metal, or wood",
            Self::Glove(_) => "leather or textiles",
            Self::Gloves(_) => "leather or textiles",
            Self::Greaves(_) => "bone or metal",
            Self::Mask(_) => "textiles",
            Self::Ring(_) => "bone, metal, or wood",
        }
    }

    pub fn category(&self) -> &str {
        match self {
            Self::Amulet(_) => "Amulet",
            Self::Belt(_) => "Belt",
            Self::Blindfold(_) => "Blindfold",
            Self::Boots(_) => "Boots",
            Self::Bracer(_) => "Bracer",
            Self::Bracers(_) => "Bracers",
            Self::Circlet(_) => "Circlet",
            Self::Cloak(_) => "Cloak",
            Self::Crown(_) => "Crown",
            Self::Gauntlet(_) => "Gauntlet",
            Self::Gauntlets(_) => "Gauntlets",
            Self::Glove(_) => "Glove",
            Self::Gloves(_) => "Gloves",
            Self::Greaves(_) => "Greaves",
            Self::Mask(_) => "Mask",
            Self::Ring(_) => "Ring",
        }
    }
}

pub fn all_apparel() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.append(&mut arms::arms());
    apparel.append(&mut head::head());
    apparel.append(&mut jewelry::jewelry());
    apparel.append(&mut legs::legs());
    apparel.append(&mut torso::torso());

    apparel.sort_by(|a, b| a.item().name.cmp(&b.item().name));

    apparel
}

fn apparel_rows(apparel: &Apparel) -> Vec<latex_table::TableRow> {
    latex_table::TableRow::from_item(apparel.item(), false, Some(apparel.category().to_string()))
}

pub fn apparel_table() -> String {
    let with_category = true;

    let mut rows = vec![];
    for apparel in all_apparel() {
        rows.append(&mut apparel_rows(&apparel));
    }

    latex_table::longtable(
        latex_table::table_header("Magic Apparel", with_category),
        rows,
        with_category,
    )
}
