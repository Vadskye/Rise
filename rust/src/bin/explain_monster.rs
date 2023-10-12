use clap::Parser;
use rise::monsters::{MonsterEntry, generate_monster_entries};

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
        let entry = entries.iter().find(|m| m.name() == group).unwrap();
        match entry {
            MonsterEntry::MonsterGroup(g) => g.monsters.iter().find(|m| m.name() == args.monster).unwrap(),
            _ => panic!("Searched for a group but found an individual monster"),
        }
    } else {
        let entry = entries.iter().find(|m| m.name() == args.monster).unwrap();
        match entry {
            MonsterEntry::Monster(m) => m,
            _ => panic!("Searched for a monster but found a group"),
        }
    };

    println!("{}", monster.explain_statistics());
}
