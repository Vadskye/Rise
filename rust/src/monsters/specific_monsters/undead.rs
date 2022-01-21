use crate::core_mechanics::abilities::StandardAttack;
use crate::core_mechanics::{
    Attribute, DamageType, FlightManeuverability, HasAttributes, MovementMode, Sense, Size,
    SpecialDefenseType, SpeedCategory, StandardPassiveAbility,
};
use crate::creatures::{Modifier, Monster};
use crate::equipment::{StandardWeapon, Weapon};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Undead;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::monster_group::MonsterGroup;
use crate::monsters::FullMonsterDefinition;
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
    add_zombies(&mut monsters);

    monsters.push(MonsterEntry::Monster(FullUndeadDefinition {
        alignment: "Always neutral evil".to_string(),
        attributes: vec![0, 3, 0, 1, 2, 2],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Allip are incorporeal ghost-like creatures.
                They cannot speak intelligibly, but they are known for their propensity for babbling incoherently as they attack.
            "),
            (5, "
                An allip is the spectral remains of someone driven to suicide by a madness that afflicted it in life.
                It craves only revenge and unrelentingly pursues those who tormented it in life and pushed it over the brink.
            "),
        ])),
        level: 3,
        modifiers: Some(vec![
            Modifier::Attack(StandardAttack::DrainingGrasp(1).attack()),
            Modifier::PassiveAbility(StandardPassiveAbility::Incorporeal.ability()),
        ]),
        movement_modes: Some(vec![MovementMode::Fly(SpeedCategory::Normal, FlightManeuverability::Perfect)]),
        name: "Allip".to_string(),
        senses: Some(vec![
            Sense::Darkvision(60),
            Sense::Lifesense(120),
        ]),
        size: Size::Medium,
        trained_skills: Some(vec![
            Skill::Awareness,
            Skill::Stealth,
        ]),
        weapons: vec![],
    }.monster()));

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
                Skeletons are the reanimated corpses of once-living creatures.
                They are the most basic form of animated undead, since they can be created from corpses that have been reduced to mere bones.
                Creating a skeleton is generally regarded as a fundamentally evil act.
            "),
            (5, "
                Skeletons retain all of the \\glossterm{mundane} abilities of the reanimated creature, but lose all \\glossterm{magical} abilities.
                They retain the ability to wield the same weapons and armor as the original creature, but they are completely mindless.
                In addition, skeletons are always more agile and less strong than the original creature.
                All skeletons are vulnerable to bludgeoning damage thanks to their exposed and easily crumpled bones.
            "),
            (10, "
                Creating a skeleton from a corpse requires splintering the soul of the creature the corpse belonged to.
                The soul splinter created this way is used to give the skeleton its agency.
                This is unpleasant for the dead creature in its afterlife, though not dangerous.

                Skeletons are never created by ambient necromantic magic.
                They have no internal intelligence or agency of any kind, and precisely obey the instructions of their controllers.
                If their instructions are poorly worded or incomplete, skeletons may fail to fight even if attacked.
            "),
        ])),
        monsters: skeletons,
    }));
}

fn convert_to_skeleton(monster: Monster) -> Monster {
    let creature = monster.creature;
    // +1 str, +1 dex, -2 con, fixed int/per/wil
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
        -7,
        0,
        0,
    ];

    let mut modifiers = vec![Modifier::Vulnerable(SpecialDefenseType::Damage(
        DamageType::Bludgeoning,
    ))];
    for im in creature.identified_modifiers {
        if im.source == "FullMonsterDefinition" && !im.modifier.is_magical() {
            modifiers.push(im.modifier.clone());
        }
    }
    modifiers.push(Modifier::PassiveAbility(
        StandardPassiveAbility::Mindless.ability(),
    ));

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

fn convert_to_zombie(monster: Monster) -> Monster {
    let creature = monster.creature;
    // +2 str, -2 dex, +2 con, fixed int/per/wil
    let max_attribute = monster.challenge_rating.max_base_attribute();
    let attributes = vec![
        min(
            max_attribute,
            creature.get_base_attribute(&Attribute::Strength) + 2,
        ),
        max(-9, creature.get_base_attribute(&Attribute::Dexterity) - 2),
        min(
            max_attribute,
            creature.get_base_attribute(&Attribute::Constitution) + 2,
        ),
        -7,
        0,
        -3,
    ];

    let mut modifiers = vec![Modifier::Vulnerable(SpecialDefenseType::Damage(
        DamageType::Slashing,
    ))];
    for im in creature.identified_modifiers {
        if im.source == "FullMonsterDefinition" && !im.modifier.is_magical() {
            modifiers.push(im.modifier.clone());
        }
    }

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

    let mut movement_modes = vec![];
    if creature.movement_modes.len() > 0 {
        for ref original_mode in creature.movement_modes {
            movement_modes.push(original_mode.slower())
        }
    } else {
        movement_modes.push(MovementMode::Land(SpeedCategory::Slow));
    }

    return FullUndeadDefinition {
        alignment: "Always neutral evil".to_string(),
        attributes,
        challenge_rating: monster.challenge_rating,
        description: monster.description,
        knowledge: monster.knowledge,
        level: creature.level,
        modifiers: Some(modifiers),
        movement_modes: Some(movement_modes),
        name: format!("Zombie {}", creature.name.unwrap()),
        senses: Some(senses),
        size: creature.size,
        trained_skills: None,
        weapons: vec![StandardWeapon::Slam.weapon()],
    }
    .monster();
}

fn add_zombies(monsters: &mut Vec<MonsterEntry>) {
    let mut corpses = vec![];
    let mut zombies = vec![];
    add_humans(&mut corpses);

    for entry in corpses {
        if let MonsterEntry::MonsterGroup(group) = entry {
            for monster in group.monsters {
                zombies.push(convert_to_zombie(monster));
            }
        } else if let MonsterEntry::Monster(monster) = entry {
            zombies.push(convert_to_zombie(monster));
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Zombies".to_string(),
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Zombies are the reanimated corpses of once-living creatures.
                They must be created from corpses that still retain most of their organs and internal structure.
                Creating a zombie is generally regarded as a fundamentally evil act.
            "),
            (5, "
                Zombies retain all of the \\glossterm{mundane} abilities of the reanimated creature, but lose all \\glossterm{magical} abilities.
                They lose the ability to wield any weapons, though they can sometimes be found wearing the same armor as the original creature.
                Instead of using weapons, zombies simply slam into their foes with brute force.
                In addition, zombies are always stronger and less agile than the original creature.
                All zombies are vulnerable to slashing damage thanks to their exposed and easily torn skin and muscles.
            "),
            (10, "
                Creating a zombie from a corpse requires splintering the soul of the creature the corpse belonged to.
                The soul splinter created this way is used to give the zombie its agency.
                This is unpleasant for the dead creature in its afterlife, though not dangerous.

                Zombies are sometimes created by ambient necromantic magic.
                Even if they are created and controlled by necromancers, they still retain an animalistic hunger for flesh, especially brains.
                If their instructions are poorly worded or incomplete, zombies may attack any living creature they see.
            "),
        ])),
        monsters: zombies,
    }));
}
