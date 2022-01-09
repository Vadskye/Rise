use crate::core_mechanics::{
    DamageType, MovementMode, Sense, Size, SpecialDefenseType, StandardPassiveAbility,
};
use crate::creatures::{Modifier, Monster};
use crate::equipment::{StandardWeapon, Weapon};
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
    let mut modifiers = def.modifiers.unwrap_or(vec![]).clone();
    modifiers.push(Modifier::PassiveAbility(
        StandardPassiveAbility::Undead.ability(),
    ));
    return FullMonsterDefinition {
        // From def
        alignment: def.alignment,
        attributes: def.attributes,
        challenge_rating: def.challenge_rating,
        description: def.description,
        knowledge: def.knowledge,
        level: def.level,
        modifiers: Some(modifiers),
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

    let mindless = Modifier::PassiveAbility(StandardPassiveAbility::Mindless.ability());

    let skeleton_vulnerability =
        Modifier::Vulnerable(SpecialDefenseType::Damage(DamageType::Bludgeoning));

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        name: "Skeletons".to_string(),
        knowledge: None,
        monsters: vec![
            undead(FullUndeadDefinition {
                alignment: "Always neutral evil".to_string(),
                attributes: vec![2, 3, 1, 0, 0, -1],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 1,
                modifiers: Some(vec![mindless.clone(), skeleton_vulnerability.clone()]),
                movement_modes: None,
                name: "Skeleton Guard".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Scimitar.weapon()],
            }),
            undead(FullUndeadDefinition {
                alignment: "Always neutral evil".to_string(),
                attributes: vec![2, 3, 0, 0, 3, -1],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 2,
                modifiers: Some(vec![mindless.clone(), skeleton_vulnerability.clone()]),
                movement_modes: None,
                name: "Skeleton Archer".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Longbow.weapon()],
            }),
        ],
    }));

    let zombie_vulnerability =
        Modifier::Vulnerable(SpecialDefenseType::Damage(DamageType::Slashing));

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        name: "Zombies".to_string(),
        knowledge: None,
        monsters: vec![
            undead(FullUndeadDefinition {
                alignment: "Always neutral evil".to_string(),
                attributes: vec![3, -2, 3, 0, 0, -2],
                challenge_rating: ChallengeRating::Half,
                description: None,
                knowledge: None,
                level: 1,
                modifiers: Some(vec![mindless.clone(), zombie_vulnerability.clone()]),
                movement_modes: None,
                name: "Zombie Shambler".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Slam.weapon()],
            }),
            undead(FullUndeadDefinition {
                alignment: "Always neutral evil".to_string(),
                attributes: vec![4, -2, 4, 0, 0, -2],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 1,
                modifiers: Some(vec![mindless.clone(), zombie_vulnerability.clone()]),
                movement_modes: None,
                name: "Zombie Walker".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Slam.weapon()],
            }),
            undead(FullUndeadDefinition {
                alignment: "Always neutral evil".to_string(),
                attributes: vec![5, -2, 5, 0, 0, -2],
                challenge_rating: ChallengeRating::Two,
                description: None,
                knowledge: None,
                level: 2,
                modifiers: Some(vec![mindless.clone(), zombie_vulnerability.clone()]),
                movement_modes: None,
                name: "Zombie Brute".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Slam.weapon()],
            }),
            undead(FullUndeadDefinition {
                alignment: "Always neutral evil".to_string(),
                attributes: vec![6, -2, 6, 0, 0, -2],
                challenge_rating: ChallengeRating::Four,
                description: None,
                knowledge: None,
                level: 3,
                modifiers: Some(vec![mindless.clone(), zombie_vulnerability.clone()]),
                movement_modes: None,
                name: "Zombie Hulk".to_string(),
                senses: None,
                size: Size::Large,
                trained_skills: None,
                weapons: vec![StandardWeapon::Slam.weapon()],
            }),
        ],
    }));

    return monsters;
}
