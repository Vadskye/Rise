use rise::monsters::generate_monster_entries;

fn main() {
    let mut entries = generate_monster_entries();
    entries.sort_by(|a, b| a.name().cmp(b.name()));
    for entry in entries {
        println!("{}\n", entry.to_latex());
    }
}
