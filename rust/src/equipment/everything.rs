use crate::equipment::latex_table::{TableRow, ToTableRows};
use crate::equipment::{
    all_apparel, all_implements, all_magic_armor, all_magic_weapons, all_tools, latex_table,
};

pub fn everything_table() -> String {
    let mut rows: Vec<TableRow> = all_apparel(None)
        .iter()
        .map(|a| a.to_table_rows())
        .flatten()
        .collect();

    rows.append(
        &mut all_magic_armor(None)
            .iter()
            .map(|a| a.to_table_rows())
            .flatten()
            .collect(),
    );

    rows.append(
        &mut all_implements(None)
            .iter()
            .map(|a| a.to_table_rows())
            .flatten()
            .collect(),
    );

    rows.append(
        &mut all_magic_weapons(None)
            .iter()
            .map(|a| TableRow::from_item(a.item(), false, Some("Weapon".to_string())))
            .flatten()
            .collect(),
    );

    rows.append(
        &mut all_tools(Some(true), None)
            .iter()
            .map(|a| a.to_table_rows())
            .flatten()
            .collect(),
    );

    rows.append(
        &mut all_tools(Some(false), None)
            .iter()
            .map(|a| a.to_table_rows())
            .flatten()
            .collect(),
    );

    latex_table::standard_sort(&mut rows);
    let with_category = true;
    latex_table::longtable_percentile("All Items", rows, with_category)
}
