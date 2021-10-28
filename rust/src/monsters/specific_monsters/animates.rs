use crate::core_mechanics::{
    DamageType, Debuff, FlightManeuverability, MovementMode, PassiveAbility, Sense, Size,
    SpecialDefenseModifier, SpeedCategory,
};
use crate::creatures::{Modifier, Monster, StandardAttack};
use crate::equipment::{StandardWeapon, Weapon};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Animate;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{monster_group, FullMonsterDefinition};
use crate::skills::Skill;

struct FullAnimateDefinition {
    alignment: String,
    attributes: Vec<i32>,
    challenge_rating: ChallengeRating,
    description: Option<&'static str>,
    knowledge: Option<Knowledge>,
    level: i32,
    movement_modes: Option<Vec<MovementMode>>,
    name: String,
    modifiers: Option<Vec<Modifier>>,
    senses: Option<Vec<Sense>>,
    size: Size,
    trained_skills: Option<Vec<Skill>>,
    weapons: Vec<Weapon>,
}

fn animate(def: FullAnimateDefinition) -> Monster {
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
        creature_type: Animate,
    }
    .monster();
}

pub fn animates() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::Monster(animate(FullAnimateDefinition {
        alignment: "Always neutral evil".to_string(),
        attributes: vec![0, 3, 0, 1, 2, 2],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                An darkwraith is a shadow disconnected from its host through strange umbramantic power.
                Though it appears similar to a ghost, it is not undead.
                It instinctively seeks out sources of warmth, including most living creatures, to suppress them with its chilling aura.
            "),
            (5, "
                Darkwraiths bear a hateful malevolence towards anything that brings light.
                Although they swarm around sources of warmth, they will not attack directly with their dark grasp unless provoked by light or damage.
                Darkwraiths cannot speak or make noise of any kind.
            "),
        ])),
        level: 4,
        modifiers: Some(vec![
            Modifier::Attack(StandardAttack::DarkGrasp(3).attack()),
            Modifier::Attack(StandardAttack::DarkMiasma(3).attack().except(
                |a| a.name = "Chilling Aura".to_string()
            )),
            Modifier::SpecialDefense(SpecialDefenseModifier::impervious_damage(DamageType::Cold)),
            Modifier::SpecialDefense(SpecialDefenseModifier::immune_debuff(Debuff::Prone)),
        ]),
        movement_modes: Some(vec![MovementMode::Fly(SpeedCategory::Normal, FlightManeuverability::Perfect)]),
        name: "Darkwraith".to_string(),
        senses: None,
        size: Size::Medium,
        trained_skills: Some(vec![
            Skill::Awareness,
            Skill::Stealth,
        ]),
        weapons: vec![],
    })));

    fn create_treant(
        alignment: &str,
        attributes: Vec<i32>,
        knowledge: Knowledge,
        level: i32,
        modifiers: Option<Vec<Modifier>>,
        name: &str,
        size: Size,
    ) -> Monster {
        let mut modifiers = modifiers.unwrap_or(vec![]);
        modifiers.push(
                Modifier::PassiveAbility(PassiveAbility {
                    name: "Animate Tree".to_string(),
                    is_magical: true,
                    description: "
                        As a standard action, the treant can animate a tree to fight by its side.
                        The tree must be no larger than the treant, and it must be the same type of tree as the treant.

                        The tree's combat statistics are the same as the treant's, except that the tree may be a different size category, and it lacks this ability.
                        This ability lasts until the treant uses it again or dismisses it as a \\glossterm{free action}.
                        When this ability ends, the tree sets down roots in its new location if possible.
                        Treants avoid stranding trees in unsustainable locations except in desperate circumstances.
                    ".to_string(),
                })
        );
        return animate(FullAnimateDefinition {
            alignment: alignment.to_string(),
            attributes,
            challenge_rating: ChallengeRating::Two,
            description: None,
            knowledge: Some(knowledge),
            level,
            modifiers: Some(modifiers),
            movement_modes: Some(vec![MovementMode::Land(SpeedCategory::Slow)]),
            name: name.to_string(),
            senses: None,
            size,
            trained_skills: Some(vec![Skill::Awareness]),
            weapons: vec![StandardWeapon::Slam.weapon()],
        });
    }

    monsters.push(MonsterEntry::MonsterGroup(
        monster_group::MonsterGroup {
            knowledge: None,
            name: "Treants".to_string(),
            monsters: vec![
                create_treant(
                    "Usually true neutral",
                    vec![2, 0, 2, 0, 2, -2],
                    Knowledge::new(vec![(0, "
                        Birch treants tend to be shy, and they to avoid conflict if at all possible.
                    ")]),
                    5,
                    Some(vec![Modifier::SpecialDefense(SpecialDefenseModifier::vulnerable_damage(DamageType::Fire))]),
                    "Birch Treant",
                    Size::Large,
                ),
                create_treant(
                    "Usually true neutral",
                    vec![2, 0, 2, 0, 4, 1],
                    Knowledge::new(vec![(0, "
                        Chestnut treants tend to mischievous and outgoing.
                        They like playing small tricks on interesting creatures that pass by.
                    ")]),
                    6,
                    Some(vec![Modifier::SpecialDefense(SpecialDefenseModifier::vulnerable_damage(DamageType::Fire))]),
                    "Chestnut Treant",
                    Size::Large,
                ),
                create_treant(
                    "Usually true neutral",
                    vec![2, 3, 2, 1, 2, -2],
                    Knowledge::new(vec![(0, "
                        Willow treants are the most agile treants, and they can twist and bend their bodies with surprising finesse.
                        Their attitudes tend to be similarly flexible, and they tend to be easily persuadable.
                    ")]),
                    7,
                    Some(vec![Modifier::SpecialDefense(SpecialDefenseModifier::vulnerable_damage(DamageType::Fire))]),
                    "Willow Treant",
                    Size::Large,
                ),
                create_treant(
                    "Usually neutral evil",
                    vec![3, 0, 1, 1, 2, 1],
                    Knowledge::new(vec![(0, "
                        Darkroot treants, unlike most other treants, primarily inhabit swamps and other grimy places.
                        Their bark is mottled with fungus, and they tend to have a more sinister demeanor than most treants.
                    ")]),
                    8,
                    None,
                    "Darkroot Treant",
                    Size::Large,
                ),
                create_treant(
                    "Usually neutral good",
                    vec![3, -2, 4, 0, 2, 3],
                    Knowledge::new(vec![(0, "
                        Pine treants tend to be the most steadfast treants.
                        They are strong-willed, but while oak treants are stubborn, pine treants are resolutely benevolent, sheltering all who need aid.
                    ")]),
                    9,
                    Some(vec![Modifier::SpecialDefense(SpecialDefenseModifier::vulnerable_damage(DamageType::Fire))]),
                    "Pine Treant",
                    Size::Huge,
                ),
                create_treant(
                    "Usually neutral good",
                    vec![4, -2, 4, 1, 2, 3],
                    Knowledge::new(vec![(0, "
                        Oak treants tend to be the most stubborn treants, and they brook no guff from wayward adventurers.
                    ")]),
                    10,
                    Some(vec![Modifier::SpecialDefense(SpecialDefenseModifier::vulnerable_damage(DamageType::Fire))]),
                    "Oak Treant",
                    Size::Huge,
                ),
                create_treant(
                    "Usually true neutral",
                    vec![4, -2, 5, 0, 2, 2],
                    Knowledge::new(vec![(0, "
                        Cyprus treants are the most durable of treants.
                        They are virtually indestructible, and are fearsome when roused to anger.
                    ")]),
                    11,
                    None,
                    "Cyprus Treant",
                    Size::Huge,
                ),
            ],
        },
    ));

    // TODO: attach knowledge checks to the group as a whole, not any individual animated object
    fn create_animated_object(
        attributes: Vec<i32>,
        challenge_rating: ChallengeRating,
        level: i32,
        name: &str,
        size: Size,
    ) -> Monster {
        return animate(FullAnimateDefinition {
            alignment: "Always true neutral".to_string(),
            attributes,
            challenge_rating,
            description: None,
            knowledge: None,
            level,
            modifiers: None,
            movement_modes: None,
            name: name.to_string(),
            senses: Some(vec![Sense::Darkvision(60)]),
            size,
            trained_skills: None,
            weapons: vec![StandardWeapon::Slam.weapon()],
        });
    }

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        knowledge: None,
        name: "Animated Objects".to_string(),
        monsters: vec![
            create_animated_object(
                vec![-4, 3, -4, 0, 0, -5],
                ChallengeRating::Half,
                1,
                "Tiny Object",
                Size::Tiny,
            ),
            create_animated_object(
                vec![-2, 2, -2, 0, 0, -5],
                ChallengeRating::One,
                1,
                "Small Object",
                Size::Small,
            ),
            create_animated_object(
                vec![0, 0, 0, 0, 0, -5],
                ChallengeRating::Two,
                2,
                "Medium Object",
                Size::Medium,
            ),
            create_animated_object(
                vec![2, -1, 2, 0, 0, -5],
                ChallengeRating::Two,
                4,
                "Large Object",
                Size::Large,
            ),
            create_animated_object(
                vec![3, -2, 3, 0, 0, -5],
                ChallengeRating::Two,
                7,
                "Huge Object",
                Size::Huge,
            ),
            create_animated_object(
                vec![4, -2, 4, 0, 0, -5],
                ChallengeRating::Two,
                9,
                "Gargantuan Object",
                Size::Gargantuan,
            ),
            create_animated_object(
                vec![5, -3, 5, 0, 0, -5],
                ChallengeRating::Two,
                11,
                "Colossal Object",
                Size::Colossal,
            ),
        ],
    }));

    return monsters;
}
