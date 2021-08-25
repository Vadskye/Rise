use crate::monsters::{
    aberrations, animals, animates, dragons, generate_stock_monsters, humanoids, monster_group,
    undead, Monster,
};

pub fn generate_monster_entries() -> Vec<MonsterEntry> {
    let mut entries: Vec<MonsterEntry> = vec![];
    entries.append(animals::animals().as_mut());
    entries.append(aberrations::aberrations().as_mut());
    entries.append(animates::animates().as_mut());
    entries.append(dragons::dragons().as_mut());
    entries.append(humanoids::humanoids().as_mut());
    entries.append(undead::undeads().as_mut());

    entries.append(generate_stock_monsters::generate_stock_monsters().as_mut());
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
                    if monster_name.to_string() == name {
                        return monster.to_section(Some("monsubsubsection"));
                    }
                }
            }
        } else if let MonsterEntry::Monster(monster) = entry {
            if let Some(ref monster_name) = monster.creature.name {
                if monster_name.to_string() == name {
                    return monster.to_section(Some("monsubsubsection"));
                }
            }
        }
    }
    panic!("No monster with name {}", name);
}
