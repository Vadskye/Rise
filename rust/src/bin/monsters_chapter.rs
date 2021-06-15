use rise::monsters::monster_entry;

fn main() {
    let mut entries = monster_entry::generate_monster_entries();
    entries.sort_by(|a, b| a.name().cmp(b.name()));
    for entry in entries {
        println!("{}\n", entry.to_latex());
    }
}
