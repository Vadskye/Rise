use rise::equipment::all_tools;
use clap::Parser;

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
    println!("{:?}", args);
}
