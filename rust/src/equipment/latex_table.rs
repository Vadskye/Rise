use crate::core_mechanics::abilities::replace_attack_terms;
use crate::equipment::{item_creature, rank_and_price_text, ItemRarity, StandardItem};
use crate::latex_formatting::latexify;

pub trait ToTableRows {
    fn to_table_rows(&self) -> Vec<TableRow>;
}

#[derive(Clone)]
pub struct TableRow {
    category: Option<String>,
    consumable: bool,
    name: String,
    magical: bool,
    rank: i32,
    rarity: ItemRarity,
    short_description: String,
}

impl TableRow {
    pub fn from_item(item: &StandardItem, consumable: bool, category: Option<String>) -> Vec<Self> {
        let mut rows = vec![];
        rows.push(Self {
            category: category.clone(),
            consumable,
            magical: item.magical,
            name: item.name.clone(),
            rank: item.rank,
            rarity: item.rarity.clone(),
            short_description: item.short_description.clone(),
        });

        for upgraded_item in item.upgrade_items() {
            rows.push(Self {
                category: category.clone(),
                consumable,
                magical: item.magical,
                name: upgraded_item.name,
                rank: upgraded_item.rank,
                rarity: upgraded_item.rarity.clone(),
                short_description: upgraded_item.short_description,
            });
        }

        rows
    }

    fn to_latex(&self, percentile: Option<&str>) -> String {
        let latex = format!(
            "
                \\itemref<{name}>{sparkle} {category_separator} {category}
                & {short_description}
                & {rank_and_price}
                & {page_or_percentile}
                \\\\
            ",
            name = self.name,
            sparkle = if self.magical { r"\sparkle" } else { "" },
            category_separator = if self.category.is_some() { "&" } else { "" },
            category = self.category.clone().unwrap_or(String::from("")),
            rank_and_price = rank_and_price_text(self.rank, &self.rarity),
            short_description = self.short_description.trim(),
            page_or_percentile = percentile.unwrap_or(&format!("\\itempref<{}>", self.name)),
        );
        replace_attack_terms(latex.trim(), &item_creature(self.rank), false, None)
    }
}

fn table_caption(caption: &str) -> String {
    format!("\\lcaption<{caption}> \\\\")
}

pub fn table_header(name_text: &str, with_category: bool, with_percentile: bool) -> String {
    format!(
        "
            \\tb<{name}>{category_separator} {category_column_name} & \\tb<Description> & \\tb<Rank (Cost)> & {page_or_percentile} \\tableheaderrule
        ",
        name = name_text,
        category_separator = if with_category { "&" } else { "" },
        // TODO: are there other reasonable category column names?
        category_column_name = if with_category { r"\tb{Type}" } else {""},
        page_or_percentile = if with_percentile { r"\tb{d100}" } else { r"\tb{Page}" },
    )
}

pub fn standard_sort(rows: &mut Vec<TableRow>) {
    // Primary sort is by rank, secondary sort is by consumability, tertiary sort is by category,
    // final sort is by name.
    rows.sort_by(|a, b| a.name.cmp(&b.name));
    rows.sort_by(|a, b| a.category.cmp(&b.category));
    // Flip the boolean so consumables come before permanent items
    rows.sort_by(|a, b| (!a.consumable).cmp(&!b.consumable));
    rows.sort_by(|a, b| a.rank.cmp(&b.rank));
}

pub fn longtable(caption: &str, rows: Vec<TableRow>, with_category: bool) -> String {
    latexify(format!(
        "
            \\begin<longtablewrapper>
            \\begin<longtable><p<17em> {category_and_effects} p<6em> p<3em>>
                {caption}
                {header}
                {rows}
            \\end<longtable>
            \\end<longtablewrapper>
        ",
        category_and_effects = if with_category {
            "p{5em} p{20em}"
        } else {
            "p{26em}"
        },
        caption = table_caption(caption),
        header = table_header("Name", with_category, false),
        rows = rows
            .iter()
            .map(|r| r.to_latex(None))
            .collect::<Vec<String>>()
            .join("\n"),
    ))
}

// Like a TableRow, but has a Percentile column. That indicates the roll on a d100 required to
// get that item from a random loot drop.
struct PercentileTableRow {
    percentile_range: String,
    table_row: TableRow,
}

impl PercentileTableRow {
    fn to_latex(&self) -> String {
        self.table_row.to_latex(Some(&self.percentile_range))
    }
}

// Like longtable, but instead of having a "pages" column, it has a "d100" column.
// Useful for random loot drops.
pub fn longtable_percentile(caption: &str, rows: Vec<TableRow>, with_category: bool) -> String {
    // Convert the TableRows to PercentileTableRows and assign each row a percentile_range based on
    // its position within its rank.
    let mut percentile_rows: Vec<PercentileTableRow> = vec![];
    for rank in -1..9 {
        let rows_at_rank: Vec<&TableRow> = rows.iter().filter(|r| r.rank == rank).collect();
        let distinct_item_count = rows_at_rank.len();
        if distinct_item_count == 0 {
            continue;
        }
        // Rolling a 100 upgrades to the next rank, so we don't include it in the percentile
        // listing.
        let step_size = 99.0 / distinct_item_count as f64;
        let mut min_roll = 0;
        // We keep this as an f64 so it can have smooth steps.
        let mut true_max_roll = step_size;
        for row in rows_at_rank {
            let max_roll_int = true_max_roll.round() as i32;
            percentile_rows.push(PercentileTableRow {
                percentile_range: if max_roll_int == min_roll {
                    min_roll.to_string()
                } else {
                    format!("{}--{}", min_roll, max_roll_int)
                },
                table_row: row.clone(),
            });
            min_roll = 1 + max_roll_int;
            true_max_roll += step_size;
        }
    }

    latexify(format!(
        "
            \\begin<longtablewrapper>
            \\begin<longtable><p<17em> {category_and_effects} p<6em> p<3em>>
                {caption}
                {header}
                {rows}
            \\end<longtable>
            \\end<longtablewrapper>
        ",
        category_and_effects = if with_category {
            "p{5em} p{20em}"
        } else {
            "p{26em}"
        },
        caption = table_caption(caption),
        header = table_header("Name", with_category, true),
        rows = percentile_rows
            .iter()
            .map(|r| r.to_latex())
            .collect::<Vec<String>>()
            .join("\n")
    ))
}
