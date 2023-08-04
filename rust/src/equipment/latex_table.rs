use crate::equipment::{
    rank_and_price_text, Apparel, MagicArmor, MagicWeapon, StandardItem, Tool,
};

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
                short_description: item.short_description.clone(),
            });
        }

        rows
    }

    fn to_latex(&self) -> String {
        format!(
            "
                \\itemref<{name}>{sparkle}
                & {rank_and_price}
                {category_separator} {category}
                & {short_description}
                & \\itempref<{name}>
            ",
            name = self.name,
            sparkle = if self.magical { r"\sparkle" } else { "" },
            category_separator = if self.category.is_some() { "&" } else { "" },
            category = self.category.clone().unwrap_or(String::from("")),
            rank_and_price = rank_and_price_text(self.rank, self.consumable),
            short_description = self.short_description,
        )
    }
}

pub fn table_header(caption: &str, with_category: bool) -> String {
    format!(
        "
            \\lcaption<{caption}> \\\\
            \\tb<Name> & \\tb<Rank (Cost)> {category_separator} {category_column_name} & \\tb<Description> & \\tb<Page> \\tableheaderrule
        ",
        category_separator = if with_category { "&" } else { "" },
        // TODO: are there other reasonable category column names?
        category_column_name = "Type",
    )
}

pub fn longtable(header: String, rows: Vec<TableRow>, with_category: bool) -> String {
    format!(
        "
            \\begin<longtablewrapper>
            \\begin<longtable><p<17em> p<6em> {category_and_effects} p<3em>>
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
    )
}
