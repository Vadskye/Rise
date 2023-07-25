use crate::creatures::Monster;
use crate::monsters::monster_group;
use crate::monsters::specific_monsters::all_specific_monster_functions;

pub fn generate_monster_entries() -> Vec<MonsterEntry> {
    let mut entries: Vec<MonsterEntry> = vec![];
    for monster_fn in all_specific_monster_functions() {
        entries.append(monster_fn().as_mut());
    }

    // entries.append(generate_stock_monsters::generate_stock_monsters().as_mut());
    entries
}

pub enum MonsterEntry {
    Monster(Monster),
    MonsterGroup(monster_group::MonsterGroup),
}

impl MonsterEntry {
    pub fn to_latex(&self) -> String {
        if let MonsterEntry::Monster(m) = self {
            m.to_section(None)
        } else if let MonsterEntry::MonsterGroup(m) = self {
            return m.to_latex();
        } else {
            panic!("Nonsensical monter entry");
        }
    }

    pub fn name(&self) -> &str {
        match self {
            MonsterEntry::Monster(m) => m.creature.name.as_deref().unwrap_or("Anonymous"),
            MonsterEntry::MonsterGroup(m) => m.name.as_str(),
        }
    }
}

pub fn latex_by_name(name: &str) -> String {
    let entries = generate_monster_entries();
    for entry in entries {
        if let MonsterEntry::MonsterGroup(group) = entry {
            for monster in group.monsters {
                if let Some(ref monster_name) = monster.creature.name {
                    if *monster_name == name {
                        return monster.to_section(Some(group.name));
                    }
                }
            }
        } else if let MonsterEntry::Monster(monster) = entry {
            if let Some(ref monster_name) = monster.creature.name {
                if *monster_name == name {
                    return monster.to_section(None);
                }
            }
        }
    }
    panic!("No monster with name {}", name);
}
