use crate::core_mechanics::{
    DamageType, MovementMode, Sense, Size, SpecialDefenseModifier, SpecialDefenseType,
    SpeedCategory,
};
use crate::creatures::{Modifier, Monster, StandardAttack};
use crate::equipment::{StandardWeapon, Weapon, WeaponMaterial};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Planeforged;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{monster_group, FullMonsterDefinition};
use crate::skills::Skill;

struct FullPlaneforgedDefinition {
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

impl FullPlaneforgedDefinition {
    fn monster(self) -> Monster {
        return FullMonsterDefinition {
            // From self
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

            // Default values
            creature_type: Planeforged,
        }
        .monster();
    }
}

pub fn planeforgeds() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    add_elementals(&mut monsters);

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        name: "Imps".to_string(),
        knowledge: None,
        monsters: vec![FullPlaneforgedDefinition {
            alignment: "Always chaotic evil".to_string(),
            attributes: vec![2, 3, 2, 1, 0, -2],
            challenge_rating: ChallengeRating::Half,
            description: None,
            knowledge: None,
            level: 13,
            modifiers: None,
            movement_modes: None,
            name: "Flamefist Imp".to_string(),
            senses: None,
            size: Size::Small,
            trained_skills: None,
            weapons: vec![StandardWeapon::Slam
                .weapon()
                .except(|w| w.damage_types.push(DamageType::Fire))],
        }
        .monster()],
    }));

    monsters.push(MonsterEntry::Monster(
        FullPlaneforgedDefinition {
            alignment: "Always chaotic evil".to_string(),
            attributes: vec![3, 2, 3, 2, 4, 4],
            challenge_rating: ChallengeRating::Six,
            description: None,
            knowledge: None,
            level: 13,
            modifiers: Some(vec![
                Modifier::Attack(StandardAttack::Combustion(6).attack()),
                Modifier::Attack(StandardAttack::Inferno(6).attack()),
                Modifier::Attack(StandardAttack::Pyrohemia(6).attack()),
                Modifier::Attack(StandardAttack::Ignition(6).attack()),
                Modifier::Attack(StandardAttack::Pyrophobia(6).attack()),
                Modifier::SpecialDefense(SpecialDefenseModifier::Vulnerable(
                    SpecialDefenseType::WeaponMaterial(WeaponMaterial::ColdIron),
                )),
            ]),
            movement_modes: None,
            name: "Soulfire Demon".to_string(),
            senses: None,
            size: Size::Large,
            trained_skills: None,
            weapons: vec![StandardWeapon::HeavyFlail
                .weapon()
                .except(|w| w.damage_types.push(DamageType::Fire))],
        }
        .monster(),
    ));

    return monsters;
}

fn add_elementals(monsters: &mut Vec<MonsterEntry>) {
    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        knowledge: Some(Knowledge::new(vec![(
            0,
            "
                Fire elementals are creatures formed from the raw essence of the Plane of Fire.
                They tend to be fast and agile, and they are usually vulnerable to cold.
            ",
        )])),
        name: "Fire Elementals".to_string(),
        monsters: vec![
            FullPlaneforgedDefinition {
                alignment: "Usually chaotic neutral".to_string(),
                attributes: vec![2, 4, 0, -2, 0, 2],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 4,
                modifiers: Some(vec![
                    Modifier::Attack(StandardAttack::Firebolt(6).attack()),
                    Modifier::Attack(StandardAttack::Combustion(6).attack()),
                    Modifier::SpecialDefense(SpecialDefenseModifier::vulnerable_damage(DamageType::Cold)),
                ]),
                movement_modes: None,
                name: "Ember".to_string(),
                senses: None,
                size: Size::Small,
                trained_skills: None,
                weapons: vec![StandardWeapon::Slam
                    .weapon()
                    .except(|w| w.damage_types.push(DamageType::Fire))],
            }.monster()
        ],
    }));
}
