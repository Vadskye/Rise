use crate::core_mechanics::{
    Attribute, DamageType, HasAttributes, MovementMode, Sense, Size, SpecialDefenseType,
    StandardPassiveAbility,
};
use crate::creatures::{Modifier, Monster};
use crate::equipment::{StandardWeapon, Weapon};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Undead;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::monster_group::MonsterGroup;
use crate::monsters::{monster_group, FullMonsterDefinition};
use crate::skills::Skill;
use std::cmp::{max, min};

use super::humanoids::add_humans;

struct FullUndeadDefinition {
    alignment: String,
    attributes: Vec<i32>,
    challenge_rating: ChallengeRating,
    description: Option<String>,
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

impl FullUndeadDefinition {
    fn monster(self) -> Monster {
        let mut modifiers = self.modifiers.unwrap_or(vec![]).clone();
        modifiers.push(Modifier::PassiveAbility(
            StandardPassiveAbility::Undead.ability(),
        ));
        return FullMonsterDefinition {
            // From self
            alignment: self.alignment,
            attributes: self.attributes,
            challenge_rating: self.challenge_rating,
            description: self.description,
            knowledge: self.knowledge,
            level: self.level,
            modifiers: Some(modifiers),
            movement_modes: self.movement_modes,
            name: self.name,
            senses: self.senses,
            size: self.size,
            trained_skills: self.trained_skills,
            weapons: self.weapons,

            // Default values
            creature_type: Undead,
        }
        .monster();
    }
}

pub fn undeads() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    add_skeletons(&mut monsters);

    let mindless = Modifier::PassiveAbility(StandardPassiveAbility::Mindless.ability());

    let zombie_vulnerability =
        Modifier::Vulnerable(SpecialDefenseType::Damage(DamageType::Slashing));

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        name: "Zombies".to_string(),
        knowledge: None,
        monsters: vec![
            FullUndeadDefinition {
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
            }
            .monster(),
            FullUndeadDefinition {
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
            }
            .monster(),
            FullUndeadDefinition {
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
            }
            .monster(),
            FullUndeadDefinition {
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
            }
            .monster(),
        ],
    }));

    return monsters;
}

fn add_skeletons(monsters: &mut Vec<MonsterEntry>) {
    let mut corpses = vec![];
    let mut skeletons = vec![];
    add_humans(&mut corpses);

    for entry in corpses {
        if let MonsterEntry::MonsterGroup(group) = entry {
            for monster in group.monsters {
                skeletons.push(convert_to_skeleton(monster));
            }
        } else if let MonsterEntry::Monster(monster) = entry {
            skeletons.push(convert_to_skeleton(monster));
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Skeletons".to_string(),
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Skeleton are the reanimated corpses of once-living creatures.
                They are one of the most basic forms of undead, though some skeletons are still quite powerful.
                Creating a skeleton is generally regarded as a fundamentally evil act.
            "),
            (5, "
                Skeletons retain all of the \\glossterm{mundane} abilities of the reanimated creature, but lose all \\glossterm{magical} abilities.
                They retain the ability to wield the same weapons and armor as the original creature.
                In addition, skeletons are always more agile and less strong than the original creature.
                All skeletons are vulnerable to bludgeoning damage thanks to their exposed and easily crumpled bones.
            "),
            (10, "
                Creating a skeleton from a corpse requires splintering the soul of the creature the corpse belonged to.
                The soul splinter created this way is used to give the skeleton its agency.
                This is unpleasant for the dead creature in its afterlife, though not dangerous.
                Skeletons require a less intact corpse than zombies, so they are preferred for reanimating bodies in a greater state of decay.
            "),
        ])),
        monsters: skeletons,
    }));
}

fn convert_to_skeleton(monster: Monster) -> Monster {
    let creature = monster.creature;
    // +1 str, +1 dex, -2 con, fixed -8 int
    let max_attribute = monster.challenge_rating.max_base_attribute();
    let attributes = vec![
        min(
            max_attribute,
            creature.get_base_attribute(&Attribute::Strength) + 1,
        ),
        min(
            max_attribute,
            creature.get_base_attribute(&Attribute::Dexterity) + 1,
        ),
        max(
            -9,
            creature.get_base_attribute(&Attribute::Constitution) - 2,
        ),
        -8,
        0,
        0,
    ];

    let mut modifiers = vec![
        Modifier::Vulnerable(SpecialDefenseType::Damage(DamageType::Bludgeoning)),
    ];
    for im in creature.identified_modifiers {
        if im.source == "FullMonsterDefinition" && !im.modifier.is_magical() {
            modifiers.push(im.modifier.clone());
        }
    }
    modifiers.push(Modifier::PassiveAbility(StandardPassiveAbility::Mindless.ability()));

    let mut senses = creature.senses.unwrap_or(vec![]).clone();
    if !senses.iter().any(|s| {
        if let Sense::Darkvision(_) = s {
            true
        } else {
            false
        }
    }) {
        senses.push(Sense::Darkvision(60));
    }

    return FullUndeadDefinition {
        alignment: "Always neutral evil".to_string(),
        attributes,
        challenge_rating: monster.challenge_rating,
        description: monster.description,
        knowledge: monster.knowledge,
        level: creature.level,
        modifiers: Some(modifiers),
        movement_modes: Some(creature.movement_modes),
        name: format!("Skeletal {}", creature.name.unwrap()),
        senses: Some(senses),
        size: creature.size,
        trained_skills: None,
        weapons: creature.weapons,
    }
    .monster();
}
