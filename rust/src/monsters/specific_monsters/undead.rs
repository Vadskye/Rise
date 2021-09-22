use crate::core_mechanics::{MovementMode, Sense, Size};
use crate::creatures::{Modifier, Monster};
use crate::equipment::Weapon;
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Undead;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{monster_group, FullMonsterDefinition};
use crate::skills::Skill;

struct FullUndeadDefinition {
    alignment: String,
    attributes: Vec<i32>,
    challenge_rating: ChallengeRating,
    description: Option<&'static str>,
    knowledge: Option<Knowledge>,
    level: i32,
    modifiers: Option<Vec<Modifier>>,
    movement_modes: Option<Vec<MovementMode>>,
    name: String,
    senses: Option<Vec<Sense>>,
    size: Size,
    trained_skills: Option<Vec<Skill>>,
    weapons: Vec<Weapon>,
}

fn undead(def: FullUndeadDefinition) -> Monster {
    return FullMonsterDefinition {
        // From def
        alignment: def.alignment,
        attributes: def.attributes,
        challenge_rating: def.challenge_rating,
        description: def.description,
        knowledge: def.knowledge,
        level: def.level,
        modifiers: def.modifiers,
        movement_modes: def.movement_modes,
        name: def.name,
        senses: def.senses,
        size: def.size,
        trained_skills: def.trained_skills,
        weapons: def.weapons,

        // Default values
        creature_type: Undead,
    }
    .monster();
}

pub fn undeads() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        name: "Skeletons".to_string(),
        knowledge: None,
        monsters: vec![undead(FullUndeadDefinition {
            alignment: "Always true neutral".to_string(),
            attributes: vec![2, 2, 0, 0, 0, -1],
            challenge_rating: ChallengeRating::One,
            description: None,
            knowledge: None,
            level: 1,
            modifiers: None,
            movement_modes: None,
            name: "Skeleton Guard".to_string(),
            senses: None,
            size: Size::Medium,
            trained_skills: None,
            weapons: vec![Weapon::Scimitar],
        })],
    }));

    return monsters;
}
