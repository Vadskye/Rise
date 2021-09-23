use crate::core_mechanics::{
    Debuff, MovementMode, PassiveAbility, Sense, Size, SpecialDefenseModifier,
};
use crate::creatures::{Modifier, Monster, StandardAttack};
use crate::equipment::Weapon;
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Aberration;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::FullMonsterDefinition;
use crate::skills::Skill;

struct FullAberrationDefinition {
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
        movement_modes: def.movement_modes,
        name: def.name,
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
        attributes: vec![4, -2, 5, 4, 4, 7],
        challenge_rating: ChallengeRating::Six,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (-10, "
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
                A typical aboleth weighs about 6,500 pounds.
            "),
            (10, "
                Aboleths can completely dominate the minds of lesser creatures.
                They sometimes use their minions as agents to spy in cities or otherwise further their sinister goals.
            "),
        ])),
        level: 12,
        modifiers: Some(vec![
            Modifier::PassiveAbility(
                PassiveAbility {
                    description: r"
                        As a standard action, the aboleth can \glossterm{dominate} the mind of an unconscious humanoid or aberration it touches.
                        It can \glossterm{attune} to up to 5 separate domination effects in this way.
                        This ability has the \glossterm{Compulsion} tag.
                    ".to_string(),
                    is_magical: true,
                    name: "Dominate".to_string(),
                },
            ),
            Modifier::Attack(StandardAttack::AbolethSlam.attack()),
            Modifier::Attack(StandardAttack::AbolethPsionicBlast.attack()),
            Modifier::Attack(StandardAttack::MindCrush(5).attack()),
        ]),
        movement_modes: None,
        name: "Aboleth".to_string(),
        senses: Some(vec![Sense::Darkvision(240), Sense::Telepathy(900)]),
        size: Size::Huge,
        trained_skills: Some(vec![
            Skill::Awareness,
            Skill::Endurance,
            Skill::SocialInsight,
            Skill::Spellsense,
            Skill::Swim,
        ]),
        weapons: vec![Weapon::Slam],
    })));

    monsters.push(MonsterEntry::Monster(aberration(FullAberrationDefinition {
        alignment: "Usually lawful evil".to_string(),
        attributes: vec![0, 2, 5, -6, 1, 3],
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
            Modifier::SpecialDefense(SpecialDefenseModifier::immune_debuff(Debuff::Prone)),
        ]),
        movement_modes: None,
        name: "Gibbering Mouther".to_string(),
        senses: Some(vec![Sense::Darkvision(240), Sense::Telepathy(900)]),
        size: Size::Huge,
        trained_skills: Some(vec![
            Skill::Endurance,
            Skill::Spellsense,
            Skill::Swim,
        ]),
        // TODO: make attacks sweeping
        weapons: vec![Weapon::MonsterBite],
    })));

    return monsters;
}
