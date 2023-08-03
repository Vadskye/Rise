use rise::equipment::all_apparel;

fn main() {
    for apparel in all_apparel() {
        println!("{}\n", apparel.to_latex());
    }
}
