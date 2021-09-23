use crate::core_mechanics::{DamageType, Defense, MovementMode, Sense, Size, SpeedCategory};
use crate::creatures::{Modifier, Monster, StandardAttack};
use crate::equipment::{StandardWeapon, Weapon};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::MagicalBeast;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::FullMonsterDefinition;
use crate::skills::Skill;

struct FullMagicalBeastDefinition {
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

impl FullMagicalBeastDefinition {
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

            creature_type: MagicalBeast,
        }
        .monster();
    }
}

pub fn magical_beasts() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::Monster(FullMagicalBeastDefinition {
        alignment: "Always neutral evil".to_string(),
        attributes: vec![5, 4, 1, -8, 2, -2],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                An ankheg is a Large burrowing ant-like creature with large mandibles and a taste for fresh meat.
                It has six legs, and most ankhegs are brown.
                In battle, they try to emerge briefly out of tunnels to ambush unwary foes and drag them underground.
            "),
            (5, "
                A typical adult ankheg is about 10 feet long and weighs about 800 pounds.
                Ankhegs burrow quickly thanks to the powerful acid they naturally produce.
                They are able spit that acid at foes up to 20 feet away.
                When burrowing, they usually do not leave usable tunnels behind them.
                They can choose to do so, though this halves their burrowing speed.
            "),
            (10, "
                When hunting, ankhegs usually dig a winding tunnel up to 40 feet below the surface in the rich soil of forests or farmlands.
                The tunnel usually 5 feet tall and wide, and up to 150 feet long.
                If they have been in an area for some time, they generally store the remains from previous kills at the end of the tunnel.
                When they move on, they leave any valuable objects behind with their old tunnels.
            "),
        ])),
        level: 4,
        modifiers: Some(vec![
            Modifier::Attack(
                StandardAttack::BreathWeaponLine(2, DamageType::Acid, Defense::Reflex)
                    .attack()
                    .except(|a| a.name = "Spit Acid".to_string()),
            ),
        ]),
        movement_modes: Some(vec![
            MovementMode::Burrow(SpeedCategory::Slow),
            MovementMode::Land(SpeedCategory::Normal),
        ]),
        name: "Ankheg".to_string(),
        senses: Some(vec![Sense::Darkvision(60), Sense::Tremorsense(60)]),
        size: Size::Medium,
        trained_skills: Some(vec![
            Skill::Awareness,
            Skill::Stealth,
        ]),
        weapons: vec![
            StandardWeapon::MonsterBite.weapon().except(|w| w.damage_types.push(DamageType::Acid)),
        ],
    }.monster()));

    return monsters;
}
