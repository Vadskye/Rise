use clap::Parser;
use rise::equipment;

#[derive(Parser, Debug)]
#[command(about = "Generate item tables and descriptions")]
// Must provide either --descriptions or --table
struct Args {
    #[arg(short, long = "category")]
    category: String,
    #[arg(short, long = "descriptions", conflicts_with = "table")]
    descriptions: bool,
    #[arg(short, long = "table", conflicts_with = "descriptions")]
    table: bool,
}

fn main() {
    let args = Args::parse();
    assert!(
        args.descriptions || args.table,
        "Must provide either --descriptions or --table"
    );

    let latex = if args.descriptions {
        let item_latex = latexify_items(args.category, args.descriptions);
        item_latex.join("\n")
    } else {
        match args.category.to_lowercase().as_str() {
            "everything" => equipment::everything_table(),
            "apparel" => equipment::apparel_table(),
            "implements" => equipment::implements_table(),
            "magic armor" => equipment::magic_armor_table(),
            "magic weapons" => equipment::magic_weapons_table(),
            "consumable tools" => equipment::consumable_tools_table(),
            "permanent tools" => equipment::permanent_tools_table(),
            _ => panic!("Unrecognized category '{}'", args.category),
        }
    };

    println!("{}", latex);
}

fn latexify_items(category: String, _descriptions: bool) -> Vec<String> {
    match category.to_lowercase().as_str() {
        "apparel" => equipment::all_apparel()
            .into_iter()
            .map(|x| x.to_latex())
            .collect(),
        "implements" => equipment::all_implements()
            .into_iter()
            .map(|x| x.to_latex())
            .collect(),
        "magic armor" => equipment::all_magic_armor()
            .into_iter()
            .map(|x| x.to_latex())
            .collect(),
        "magic weapons" => equipment::all_magic_weapons()
            .into_iter()
            .map(|x| x.to_latex())
            .collect(),
        "consumable tools" => equipment::all_tools(Some(true))
            .into_iter()
            .map(|x| x.to_latex())
            .collect(),
        "permanent tools" => equipment::all_tools(Some(false))
            .into_iter()
            .map(|x| x.to_latex())
            .collect(),
        _ => panic!("Unrecognized category '{}'", category),
    }
}
