use crate::monsters::{animals, monster_group, Monster};

pub fn generate_monster_entries() -> Vec<MonsterEntry> {
    let mut entries: Vec<MonsterEntry> = vec![];
    entries.append(animals::animals().as_mut());
    return entries;
}

pub enum MonsterEntry {
    Monster(Monster),
    MonsterGroup(monster_group::MonsterGroup),
}

impl MonsterEntry {
    pub fn to_latex(&self) -> String {
        if let MonsterEntry::Monster(m) = self {
            return m.to_section(None);
        } else if let MonsterEntry::MonsterGroup(m) = self {
            return m.to_latex();
        } else {
            panic!("Nonsensical monter entry");
        }
    }

    pub fn name(&self) -> Option<&str> {
        match self {
            MonsterEntry::Monster(m) => m.creature.name.as_deref(),
            MonsterEntry::MonsterGroup(m) => Some(m.name.as_str()),
        }
    }
}
