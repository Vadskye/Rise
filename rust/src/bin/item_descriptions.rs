use rise::equipment::all_tools;

fn main() {
    for tool in all_tools() {
        println!("{}\n", tool.to_latex());
    }
}
