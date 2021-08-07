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
use crate::monsters::creature_type::CreatureType::Humanoid;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::sizes::Size;
use crate::monsters::{monster_group, FullMonsterDefinition, Monster};
use crate::skills::Skill;
use crate::monsters::knowledge::Knowledge;

struct FullHumanoidDefinition {
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

fn humanoid(def: FullHumanoidDefinition) -> Monster {
    return Monster::fully_defined(FullMonsterDefinition {
        // From def
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
        alignment: "Always true neutral".to_string(),
        creature_type: Humanoid,
        special_defense_modifiers: None,
    });
}

pub fn humanoids() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::MonsterGroup(
        monster_group::MonsterGroup {
            name: "Goblins".to_string(),
            knowledge: None,
            monsters: vec![
                humanoid(FullHumanoidDefinition {
                    attributes: vec![0, 3, -1, -2, 1, -2],
                    challenge_rating: ChallengeRating::Half,
                    description: None,
                    knowledge: None,
                    level: 1,
                    passive_abilities: None,
                    movement_modes: None,
                    name: "Goblin Peon".to_string(),
                    senses: None,
                    size: Size::Medium,
                    special_attacks: None,
                    trained_skills: None,
                    weapons: vec![Weapon::Spear],
                }),
                humanoid(FullHumanoidDefinition {
                    attributes: vec![1, 3, 0, -2, 1, -2],
                    challenge_rating: ChallengeRating::One,
                    description: None,
                    knowledge: None,
                    level: 1,
                    passive_abilities: None,
                    movement_modes: None,
                    name: "Goblin Guard".to_string(),
                    senses: None,
                    size: Size::Medium,
                    special_attacks: None,
                    trained_skills: None,
                    weapons: vec![Weapon::Spear],
                }),
                humanoid(FullHumanoidDefinition {
                    attributes: vec![1, 3, 1, -2, 1, -2],
                    challenge_rating: ChallengeRating::Two,
                    description: None,
                    knowledge: None,
                    level: 1,
                    passive_abilities: None,
                    movement_modes: None,
                    name: "Goblin Warg Rider".to_string(),
                    senses: None,
                    size: Size::Medium,
                    special_attacks: None,
                    trained_skills: None,
                    weapons: vec![Weapon::Spear],
                }),
                humanoid(FullHumanoidDefinition {
                    attributes: vec![0, 2, 1, -2, 2, 3],
                    challenge_rating: ChallengeRating::Three,
                    description: None,
                    knowledge: None,
                    level: 1,
                    passive_abilities: None,
                    movement_modes: None,
                    name: "Goblin Chief".to_string(),
                    senses: None,
                    size: Size::Medium,
                    special_attacks: Some(vec![
                        Attack {
                            accuracy: 0,
                            cooldown: None,
                            crit: None,
                            defense: Defense::Mental,
                            glance: None,
                            hit: AttackEffect::Damage(
                                DamageEffect {
                                    damage_dice: damage_dice::DamageDice::single_target_damage(1),
                                    damage_modifier: 0,
                                    damage_types: vec![DamageType::Energy],
                                    lose_hp_effects: None,
                                    power_multiplier: 1.0,
                                    take_damage_effects: None,
                                },
                            ),
                            is_magical: true,
                            name: "Divine Judgment".to_string(),
                            targeting: AttackTargeting::Creature(AttackRange::Medium),
                            usage_time: UsageTime::Standard,
                            weapon: None,
                        },
                    ]),
                    trained_skills: None,
                    weapons: vec![Weapon::Spear],
                }),
                humanoid(FullHumanoidDefinition {
                    attributes: vec![0, 2, 1, -2, 2, 3],
                    challenge_rating: ChallengeRating::Three,
                    description: None,
                    knowledge: None,
                    level: 1,
                    passive_abilities: None,
                    movement_modes: None,
                    name: "Goblin Chief".to_string(),
                    senses: None,
                    size: Size::Medium,
                    special_attacks: Some(vec![
                        Attack {
                            accuracy: 0,
                            cooldown: None,
                            crit: None,
                            defense: Defense::Mental,
                            glance: None,
                            hit: AttackEffect::Damage(
                                DamageEffect {
                                    damage_dice: damage_dice::DamageDice::single_target_damage(1),
                                    damage_modifier: 0,
                                    damage_types: vec![DamageType::Energy],
                                    lose_hp_effects: None,
                                    power_multiplier: 1.0,
                                    take_damage_effects: None,
                                },
                            ),
                            is_magical: true,
                            name: "Divine Judgment".to_string(),
                            targeting: AttackTargeting::Creature(AttackRange::Medium),
                            usage_time: UsageTime::Standard,
                            weapon: None,
                        },
                    ]),
                    trained_skills: None,
                    weapons: vec![Weapon::Spear],
                }),
            ],
        }
    ));

    return monsters;
}
