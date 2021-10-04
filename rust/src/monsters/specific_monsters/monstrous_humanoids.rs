use crate::core_mechanics::{
    DamageDice, DamageType, Defense, FlightManeuverability, MovementMode, Sense, Size,
    SpeedCategory,
};
use crate::creatures::attack_effects::HealingEffect;
use crate::creatures::{Maneuver, Modifier, Monster, StandardAttack};
use crate::equipment::{StandardWeapon, Weapon};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::MonstrousHumanoid;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::FullMonsterDefinition;
use crate::skills::Skill;

struct FullMonstrousHumanoidDefinition {
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

impl FullMonstrousHumanoidDefinition {
    fn monster(self) -> Monster {
        return FullMonsterDefinition {
            // From def
            alignment: self.alignment,
            attributes: self.attributes,
            challenge_rating: self.challenge_rating,
            description: self.description,
            knowledge: self.knowledge,
            level: self.level,
            modifiers: self.modifiers,
            movement_modes: self.movement_modes,
            name: self.name,
            senses: self.senses,
            size: self.size,
            trained_skills: self.trained_skills,
            weapons: self.weapons,

            creature_type: MonstrousHumanoid,
        }
        .monster();
    }
}

pub fn monstrous_humanoids() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::Monster(FullMonstrousHumanoidDefinition {
        alignment: "Always true neutral".to_string(),
        attributes: vec![5, -1, 3, 0, 2, 1],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                A minotaur is a Large bull-headed creature.
                Minotaurs are known for their poor sense of direction.
                They can be cunning in battle, but have a tendency to become trapped in dungeons of even moderate complexity.
            "),
        ])),
        level: 6,
        modifiers: Some(vec![
            // TODO: add shove
        ]),
        movement_modes: None,
        name: "Minotaur".to_string(),
        senses: None,
        size: Size::Large,
        trained_skills: Some(vec![
            Skill::Awareness,
        ]),
        weapons: vec![
            StandardWeapon::MonsterGore.weapon(),
        ],
    }.monster()));

    return monsters;
}
