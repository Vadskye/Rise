use crate::core_mechanics::{MovementMode, PassiveAbility, Sense, Size};
use crate::creatures::attacks::Attack;
use crate::creatures::Monster;
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
    movement_modes: Option<Vec<MovementMode>>,
    name: String,
    passive_abilities: Option<Vec<PassiveAbility>>,
    senses: Option<Vec<Sense>>,
    size: Size,
    special_attacks: Option<Vec<Attack>>,
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
        movement_modes: def.movement_modes,
        name: def.name,
        passive_abilities: def.passive_abilities,
        senses: def.senses,
        size: def.size,
        special_attacks: def.special_attacks,
        trained_skills: def.trained_skills,
        weapons: def.weapons,

        // Default values
        creature_type: Undead,
        special_defense_modifiers: None,
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
            passive_abilities: None,
            movement_modes: None,
            name: "Skeleton Guard".to_string(),
            senses: None,
            size: Size::Medium,
            special_attacks: None,
            trained_skills: None,
            weapons: vec![Weapon::Scimitar],
        })],
    }));

    return monsters;
}
