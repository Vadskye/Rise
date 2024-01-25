use clap::Parser;
use rise::monsters::{generate_monster_entries, MonsterEntry};

#[derive(Parser, Debug)]
#[command(about = "Explain a monster's statistics")]
struct Args {
    #[arg(short, long = "monster")]
    monster: String,
    #[arg(short, long = "group")]
    group: Option<String>,
}

fn main() {
    let args = Args::parse();

    let entries = generate_monster_entries();

    let monster = if let Some(ref group) = args.group {
        let entry = entries.iter().find(|m| m.name() == group);
        if let Some(e) = entry {
            match e {
                MonsterEntry::MonsterGroup(g) => g
                    .monsters
                    .iter()
                    .find(|m| m.name() == args.monster)
                    .unwrap(),
                _ => panic!("Searched for a group but found an individual monster"),
            }
        } else {
            panic!("Could not find a group named {}", group)
        }
    } else {
        let entry = entries.iter().find(|m| m.name() == args.monster);
        if let Some(e) = entry {
            match e {
                MonsterEntry::Monster(m) => m,
                _ => panic!("Searched for a monster but found a group"),
            }
        } else {
            panic!("Could not find a monster named {}. If it is in a group, you also need to specify the group name.", args.monster);
        }
    };

    println!("{}", monster.explain_statistics());
}
