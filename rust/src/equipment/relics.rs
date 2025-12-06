use crate::equipment::latex_table::{TableRow, ToTableRows};
use crate::equipment::{
    all_apparel, all_implements, all_magic_armor, all_magic_weapons, all_tools, latex_table,
    Apparel, Implement, ItemRarity, MagicArmor, MagicWeapon, Tool,
};

enum Relic {
    Apparel(Apparel),
    Implement(Implement),
    MagicArmor(MagicArmor),
    MagicWeapon(MagicWeapon),
    Tool(Tool),
}

impl Relic {
    fn to_latex(&self) -> String {
        match self {
            Self::Apparel(i) => i.to_latex(),
            Self::Implement(i) => i.to_latex(),
            Self::MagicArmor(i) => i.to_latex(),
            Self::MagicWeapon(i) => i.to_latex(),
            Self::Tool(i) => i.clone().to_latex(),
        }
    }
}

impl ToTableRows for Relic {
    fn to_table_rows(&self) -> Vec<TableRow> {
        match self {
            Self::Apparel(i) => i.to_table_rows(),
            Self::Implement(i) => i.to_table_rows(),
            Self::MagicArmor(i) => i.to_table_rows(),
            Self::MagicWeapon(i) => i.to_table_rows(),
            Self::Tool(i) => i.to_table_rows(),
        }
    }
}

fn all_relics() -> Vec<Relic> {
    let mut relics = vec![];

    relics.append(
        &mut all_apparel(Some(ItemRarity::Relic))
            .into_iter()
            .map(Relic::Apparel)
            .collect(),
    );
    relics.append(
        &mut all_implements(Some(ItemRarity::Relic))
            .into_iter()
            .map(Relic::Implement)
            .collect(),
    );
    relics.append(
        &mut all_magic_armor(Some(ItemRarity::Relic))
            .into_iter()
            .map(Relic::MagicArmor)
            .collect(),
    );
    relics.append(
        &mut all_magic_weapons(Some(ItemRarity::Relic))
            .into_iter()
            .map(Relic::MagicWeapon)
            .collect(),
    );
    relics.append(
        &mut all_tools(None, Some(ItemRarity::Relic))
            .into_iter()
            .map(Relic::Tool)
            .collect(),
    );

    relics
}

pub fn all_relic_descriptions() -> Vec<String> {
    all_relics().iter().map(|r| r.to_latex()).collect()
}

pub fn relics_table() -> String {
    let with_category = true;

    let mut rows: Vec<TableRow> = all_relics()
        .iter()
        .map(|r| r.to_table_rows())
        .flatten()
        .collect();
    latex_table::standard_sort(&mut rows);

    latex_table::longtable("Relics", rows, with_category)
}
