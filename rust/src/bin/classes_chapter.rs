use rise::classes::Class;

fn main() {
    let classes = Class::all();
    for class in classes {
        println!("{}\n", class.latex_section());
    }
}
