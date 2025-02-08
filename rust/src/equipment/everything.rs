use crate::equipment::latex_table::{TableRow, ToTableRows};
use crate::equipment::{
    all_apparel, all_implements, all_magic_armor, all_magic_weapons, all_tools, latex_table,
};

pub fn everything_table() -> String {
    let mut rows: Vec<TableRow> = all_apparel()
        .iter()
        .map(|a| a.to_table_rows())
        .flatten()
        .collect();

    rows.append(
        &mut all_magic_armor()
            .iter()
            .map(|a| a.to_table_rows())
            .flatten()
            .collect(),
    );

    rows.append(
        &mut all_implements()
            .iter()
            .map(|a| a.to_table_rows())
            .flatten()
            .collect(),
    );

    rows.append(
        &mut all_magic_weapons()
            .iter()
            .map(|a| TableRow::from_item(a.item(), false, Some("Weapon".to_string())))
            .flatten()
            .collect(),
    );

    rows.append(
        &mut all_tools(Some(true))
            .iter()
            .map(|a| a.to_table_rows())
            .flatten()
            .collect(),
    );

    rows.append(
        &mut all_tools(Some(false))
            .iter()
            .map(|a| a.to_table_rows())
            .flatten()
            .collect(),
    );

    latex_table::standard_sort(&mut rows);
    let with_category = true;
    latex_table::longtable(
        latex_table::table_header("All Items", with_category),
        rows,
        with_category,
    )
}
