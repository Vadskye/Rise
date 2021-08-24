use rise::modules::Module;

fn main() {
    let mut modules = Module::all();
    modules.sort_by(|a, b| a.name.cmp(&b.name));
    for module in modules {
        println!("{}\n", module.to_latex());
    }
}
