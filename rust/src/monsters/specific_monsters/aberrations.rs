use crate::core_mechanics::abilities::{AbilityTag, AbilityType, ActiveAbility};
use crate::core_mechanics::attacks::StandardAttack;
use crate::core_mechanics::{Debuff, MovementMode, MovementSpeed, Sense, Size, SpecialDefenseType, SpeedCategory};
use crate::creatures::{Modifier, Monster};
use crate::equipment::{StandardWeapon, Weapon};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Aberration;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{FullMonsterDefinition, Role};
use crate::skills::Skill;

struct FullAberrationDefinition {
    alignment: String,
    attributes: Vec<i32>,
    challenge_rating: ChallengeRating,
    description: Option<String>,
    knowledge: Option<Knowledge>,
    level: i32,
    modifiers: Option<Vec<Modifier>>,
    movement_speeds: Option<Vec<MovementSpeed>>,
    name: String,
    role: Role,
    senses: Option<Vec<Sense>>,
    size: Size,
    trained_skills: Option<Vec<Skill>>,
    weapons: Vec<Weapon>,
}

fn aberration(def: FullAberrationDefinition) -> Monster {
    return FullMonsterDefinition {
        // From def
        alignment: def.alignment,
        attributes: def.attributes,
        challenge_rating: def.challenge_rating,
        description: def.description,
        knowledge: def.knowledge,
        level: def.level,
        modifiers: def.modifiers,
        movement_speeds: def.movement_speeds,
        name: def.name,
        role: def.role,
        senses: def.senses,
        size: def.size,
        trained_skills: def.trained_skills,
        weapons: def.weapons,

        // Default values
        creature_type: Aberration,
    }
    .monster();
}

pub fn aberrations() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    // TODO: add ritual casting
    monsters.push(MonsterEntry::Monster(aberration(FullAberrationDefinition {
        alignment: "Usually lawful evil".to_string(),
        attributes: vec![4, -2, 5, 4, 4, 6],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (-5, "
                Legends speak of revolting water-dwelling creatures called aboleths that lurk in the deepest caves.
                They are said to have power over people's minds.
            "),
            (0, "
                An aboleth is a Huge fishlike creature found primarily in subterranean lakes and rivers.
                It has four tentacles and two vertically stacked eyes in the center of its ridged forehead.
                It uses its powerful mental abilities to overwhelm the minds of its foes.
            "),
            (5, "
                Four pulsating dark blue orifices line the bottom of an aboleth's body and secrete gray slime that smells like rancid grease.
                This slime coats its tentacles, and creatures struck by the tentacles can have their skin transformed into a similar slime.
                Aboleths are amphibious, and they are able to drag themselves along with their tentacles on land, though they are much faster in the water.
            "),
            (10, "
                Aboleths can completely dominate the minds of lesser creatures.
                They sometimes use their minions as agents to spy in cities or otherwise further their sinister goals.
            "),
        ])),
        level: 12,
        modifiers: Some(vec![
            Modifier::ActiveAbility(ActiveAbility {
                ability_type: AbilityType::Attune(None),
                cooldown: None,
                effect: r"
                    The aboleth \glossterm{dominates} the mind of an unconscious humanoid or aberration it touches.
                    It can attune to this ability five times, allowing it to control up to five different creatures.
                ".to_string(),
                is_magical: true,
                name: "Dominate".to_string(),
                tags: Some(vec![AbilityTag::Compulsion, AbilityTag::Elite]),
                usage_time: None,
            }),
            Modifier::Attack(StandardAttack::AbolethSlam.attack()),
            Modifier::Attack(StandardAttack::AbolethPsionicBlast.attack()),
            Modifier::Attack(StandardAttack::MindCrush(5).attack()),
        ]),
        movement_speeds: Some(vec![
            MovementSpeed::new(MovementMode::Swim, SpeedCategory::Normal),
            MovementSpeed::new(MovementMode::Land, SpeedCategory::Slow),
        ]),
        name: "Aboleth".to_string(),
        role: Role::Warrior,
        senses: Some(vec![Sense::Darkvision(240), Sense::Telepathy(480)]),
        size: Size::Huge,
        trained_skills: Some(vec![
            Skill::Awareness,
            Skill::Endurance,
            Skill::SocialInsight,
            Skill::Swim,
        ]),
        weapons: vec![StandardWeapon::Slam.weapon()],
    })));

    monsters.push(MonsterEntry::Monster(aberration(FullAberrationDefinition {
        alignment: "Usually lawful evil".to_string(),
        attributes: vec![2, 2, 6, -6, 1, 3],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                A gibbering mouther is a horrible creature seemingly drawn from a lunatic's nightmares.
                They are named for their tendency for speak gibberish to baffle the minds of their prey.
            "),
            (5, "
                Although gibbering mouthers are not intelligent enough to be actively evil, they thirst after bodily fluids and seem to prefer the blood of intelligent creatures.
                They speak their gibberish in Common, but cannot understand it.
            "),
        ])),
        level: 5,
        modifiers: Some(vec![
            Modifier::Attack(StandardAttack::GibberingMoutherGibber.attack()),
            Modifier::Immune(SpecialDefenseType::Debuff(Debuff::Prone)),
        ]),
        movement_speeds: None,
        role: Role::Brute,
        name: "Gibbering Mouther".to_string(),
        senses: Some(vec![Sense::Darkvision(240), Sense::Telepathy(480)]),
        size: Size::Huge,
        trained_skills: Some(vec![
            Skill::Endurance,
            Skill::Swim,
        ]),
        // TODO: make attacks sweeping
        weapons: vec![StandardWeapon::MultipedalBite.weapon()],
    })));

    return monsters;
}
