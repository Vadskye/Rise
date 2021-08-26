use crate::core_mechanics::attack_effects::{
    AttackEffect, AttackEffectDuration, DamageEffect, DebuffEffect,
};
use crate::core_mechanics::attacks::{
    AreaSize, AreaTargets, Attack, AttackRange, AttackTargeting, UsageTime,
};
use crate::core_mechanics::damage_dice;
use crate::core_mechanics::damage_types::{DamageType, DamageTypeEffect};
use crate::core_mechanics::debuffs::Debuff;
use crate::core_mechanics::defenses::{Defense, SpecialDefenseModifier};
use crate::core_mechanics::movement_modes::{FlightManeuverability, MovementMode, SpeedCategory};
use crate::core_mechanics::passive_abilities::PassiveAbility;
use crate::core_mechanics::senses::Sense;
use crate::core_mechanics::{attack_effects, damage_types, debuffs, defenses};
use crate::equipment::weapons::Weapon;
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Undead;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::sizes::Size;
use crate::monsters::{monster_group, FullMonsterDefinition, Monster};
use crate::skills::Skill;
use crate::monsters::knowledge::Knowledge;

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
    return Monster::fully_defined(FullMonsterDefinition {
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
    });
}

pub fn undeads() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::MonsterGroup(
        monster_group::MonsterGroup {
            name: "Skeletons".to_string(),
            knowledge: None,
            monsters: vec![
                undead(FullUndeadDefinition {
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
                }),
            ],
        }
    ));

    return monsters;
}
