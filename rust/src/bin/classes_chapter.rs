use rise::classes::Class;

fn main() {
    let classes = Class::core_classes();
    for class in classes {
        println!("{}\n", class.latex_section());
    }
    Class::validate_points();
}
