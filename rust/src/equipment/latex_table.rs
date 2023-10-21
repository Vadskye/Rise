use crate::core_mechanics::abilities::replace_attack_terms;
use crate::equipment::{item_creature, rank_and_price_text, StandardItem};
use crate::latex_formatting::latexify;

pub struct TableRow {
    category: Option<String>,
    consumable: bool,
    name: String,
    magical: bool,
    rank: i32,
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
            short_description: item.short_description.clone(),
        });

        for upgraded_item in item.upgrade_items() {
            rows.push(Self {
                category: category.clone(),
                consumable,
                magical: item.magical,
                name: upgraded_item.name,
                rank: upgraded_item.rank,
                short_description: upgraded_item.short_description,
            });
        }

        rows
    }

    fn to_latex(&self) -> String {
        let latex = format!(
            "
                \\itemref<{name}>{sparkle} {category_separator} {category}
                & {short_description}
                & {rank_and_price}
                & \\itempref<{name}>
                \\\\
            ",
            name = self.name,
            sparkle = if self.magical { r"\sparkle" } else { "" },
            category_separator = if self.category.is_some() { "&" } else { "" },
            category = self.category.clone().unwrap_or(String::from("")),
            rank_and_price = rank_and_price_text(self.rank, self.consumable),
            short_description = self.short_description.trim(),
        );
        replace_attack_terms(latex.trim(), &item_creature(self.rank), false, None)
    }
}

pub fn table_header(caption: &str, with_category: bool) -> String {
    format!(
        "
            \\lcaption<{caption}> \\\\
            \\tb<Name>{category_separator} {category_column_name} & \\tb<Description> & \\tb<Rank (Cost)> & \\tb<Page> \\tableheaderrule
        ",
        category_separator = if with_category { "&" } else { "" },
        // TODO: are there other reasonable category column names?
        category_column_name = if with_category { r"\tb{Type}" } else {""},
    )
}

pub fn standard_sort(rows: &mut Vec<TableRow>) {
    // Primary sort is by rank, secondary sort is by category, tertiary sort is by name.
    rows.sort_by(|a, b| a.name.cmp(&b.name));
    rows.sort_by(|a, b| a.category.cmp(&b.category));
    rows.sort_by(|a, b| a.rank.cmp(&b.rank));
}

pub fn longtable(header: String, rows: Vec<TableRow>, with_category: bool) -> String {
    latexify(format!(
        "
            \\begin<longtablewrapper>
            \\begin<longtable><p<17em> {category_and_effects} p<6em> p<3em>>
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
        header = header,
        rows = rows
            .iter()
            .map(|r| r.to_latex())
            .collect::<Vec<String>>()
            .join("\n"),
    ))
}
