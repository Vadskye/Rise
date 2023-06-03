use crate::core_mechanics::abilities::{AbilityTag, AbilityType, ActiveAbility};
use crate::core_mechanics::attacks::{StandardAttack, DamageScaling};
use crate::core_mechanics::{
    Debuff, MovementMode, MovementSpeed, Sense, Size, SpecialDefenseType, SpeedCategory,
};
use crate::creatures::{Modifier, Monster};
use crate::equipment::StandardWeapon;
use crate::monsters::creature_type::CreatureType::Aberration;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{
    MonsterAbilities, MonsterNarrative, MonsterStatistics, Role, SimpleMonsterDefinition,
};
use crate::skills::Skill;

struct AberrationDefinition {
    pub abilities: Option<MonsterAbilities>,
    pub narrative: Option<MonsterNarrative>,
    pub name: String,
    pub statistics: MonsterStatistics,
}

fn aberration(def: AberrationDefinition) -> Monster {
    return SimpleMonsterDefinition {
        // From def
        abilities: def.abilities,
        narrative: def.narrative,
        name: def.name,
        statistics: def.statistics,

        // Default values
        creature_type: Aberration,
    }
    .monster();
}

pub fn aberrations() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    // TODO: add ritual casting
    monsters.push(MonsterEntry::Monster(aberration(AberrationDefinition {
        abilities: Some(MonsterAbilities {
            active_abilities: vec![
                ActiveAbility {
                    ability_type: AbilityType::Attune(None),
                    effect: r"
                        The aboleth \glossterm{dominates} the mind of an unconscious humanoid or aberration it touches.
                        It can attune to this ability five times, allowing it to control up to five different creatures.
                    ".to_string(),
                    is_magical: true,
                    name: "Dominate".to_string(),
                    tags: vec![AbilityTag::Compulsion, AbilityTag::Elite],
                    usage_time: None,
                },
                ActiveAbility {
                    ability_type: AbilityType::Normal,
                    effect: r"
                        The $name makes a $accuracy attack vs. Mental against each enemy in a \largearea cone.
                        \hit Each target takes $dr2 psychic damage.
                        Each creature that loses hit points from this damage is \stunned as a condition.
                    ".to_string(),
                    is_magical: true,
                    name: "Psionic Blast".to_string(),
                    tags: vec![AbilityTag::Compulsion, AbilityTag::Elite],
                    usage_time: None,
                },
                ActiveAbility {
                    ability_type: AbilityType::Normal,
                    effect: r"
                        The $name makes a $accuracy attack vs. Mental against one creature within \medrange.
                        \hit The target takes $dr4 psychic damage.
                        Each creature that loses hit points from this damage is \stunned as a condition.
                    ".to_string(),
                    is_magical: true,
                    name: "Mind Crush".to_string(),
                    tags: vec![AbilityTag::Compulsion, AbilityTag::Elite],
                    usage_time: None,
                },
                ActiveAbility {
                    ability_type: AbilityType::Normal,
                    effect: r"
                        The $name makes a $accuracy melee strike with a tentacle.
                        \hit Each target takes $damage bludgeoning damage.
                        Each creature that loses hit points from this damage is poisoned by aboleth slime.

                        Aboleth slime is an injury-based liquid poison (see \pcref{Poison}).
                        The poison's accuracy is $accuracy+2.
                        Its stage 1 effect makes the target \slowed while the poison lasts.
                        Its stage 3 effect makes the target dissolve into an sludgelike mass while the poison lasts, as the \textit{sludgeform} spell.
                    ".to_string(),
                    is_magical: true,
                    name: "Slimy Tentacle Slam".to_string(),
                    tags: vec![],
                    usage_time: None,
                },
            ],
            modifiers: vec![],
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Swim, SpeedCategory::Normal),
                MovementSpeed::new(MovementMode::Land, SpeedCategory::Slow),
            ]),
            senses: vec![Sense::Darkvision(240), Sense::Telepathy(480)],
            trained_skills: vec![
                Skill::Awareness,
                Skill::Endurance,
                Skill::SocialInsight,
                Skill::Swim,
            ],
        }),
        narrative: Some(MonsterNarrative {
            alignment: "Usually lawful evil".to_string(),
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
        }),
        statistics: MonsterStatistics {
            attributes: vec![4, -2, 5, 4, 4, 6],
            elite: true,
            level: 12,
            role: Role::Warrior,
            size: Size::Huge,
        },
        name: "Aboleth".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(aberration(AberrationDefinition {
        abilities: Some(MonsterAbilities {
            active_abilities: vec![],
            // TODO: make attacks sweeping
            // attacks: vec![
            //     StandardAttack::GibberingMoutherGibber.attack(),
            // ],
            modifiers: vec![
                Modifier::Immune(SpecialDefenseType::Debuff(Debuff::Prone)),
            ],
            movement_speeds: None,
            senses: vec![Sense::Darkvision(240), Sense::Telepathy(480)],
            trained_skills: vec![
                Skill::Endurance,
                Skill::Swim,
            ],
        }),
        narrative: Some(MonsterNarrative {
            alignment: "Usually lawful evil".to_string(),
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
        }),
        statistics: MonsterStatistics {
            attributes: vec![2, 2, 6, -6, 1, 3],
            elite: true,
            level: 5,
            role: Role::Brute,
            size: Size::Huge,
        },
        name: "Gibbering Mouther".to_string(),
    })));

    return monsters;
}
