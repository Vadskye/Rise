use crate::core_mechanics::attacks::{Maneuver, StandardAttack};
use crate::core_mechanics::{
    MovementMode, MovementSpeed, Sense, Size, SpeedCategory, StandardPassiveAbility,
};
use crate::creatures::{Modifier, Monster};
use crate::equipment::{StandardWeapon, Weapon};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Humanoid;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{monster_group, FullMonsterDefinition};
use crate::skills::Skill;

struct FullHumanoidDefinition {
    alignment: String,
    attributes: Vec<i32>,
    challenge_rating: ChallengeRating,
    description: Option<String>,
    knowledge: Option<Knowledge>,
    level: i32,
    modifiers: Option<Vec<Modifier>>,
    movement_speeds: Option<Vec<MovementSpeed>>,
    name: String,
    senses: Option<Vec<Sense>>,
    size: Size,
    trained_skills: Option<Vec<Skill>>,
    weapons: Vec<Weapon>,
}

fn humanoid(def: FullHumanoidDefinition) -> Monster {
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
        senses: def.senses,
        size: def.size,
        trained_skills: def.trained_skills,
        weapons: def.weapons,

        creature_type: Humanoid,
    }
    .monster();
}

pub fn humanoids() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        name: "Bandits".to_string(),
        knowledge: None,
        monsters: vec![
            humanoid(FullHumanoidDefinition {
                alignment: "Usually lawful evil".to_string(),
                attributes: vec![4, 1, 2, -1, 0, 0],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Orc deserters have abandoned their clans and struck out on their own.
                        Some are unable to leave their martial past behind them, so they turn their talents to banditry.
                    "),
                ])),
                level: 3,
                modifiers: Some(vec![
                    Modifier::Maneuver(Maneuver::RecklessStrike(1)),
                ]),
                movement_speeds: None,
                name: "Orc Deserter".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: Some(vec![Skill::Endurance]),
                weapons: vec![StandardWeapon::Greataxe.weapon()],
            }),
        ],
    }));

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        name: "Cultists".to_string(),
        knowledge: None,
        monsters: vec![
            humanoid(FullHumanoidDefinition {
                alignment: "Usually lawful evil".to_string(),
                attributes: vec![0, 0, 1, -1, 0, 4],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 1,
                modifiers: Some(vec![Modifier::Attack(
                    StandardAttack::DrainLife(1).attack(),
                )]),
                movement_speeds: None,
                name: "Death Cultist".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Sickle.weapon()],
            }),
            humanoid(FullHumanoidDefinition {
                alignment: "Usually lawful evil".to_string(),
                attributes: vec![0, 2, 0, -1, 0, 4],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 4,
                modifiers: Some(vec![
                    Modifier::Attack(StandardAttack::Combustion(2).attack()),
                    Modifier::Attack(StandardAttack::Firebolt(2).attack()),
                ]),
                movement_speeds: None,
                name: "Pyromaniac".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Club.weapon()],
            }),
        ],
    }));

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        name: "Goblins".to_string(),
        knowledge: None,
        monsters: vec![
            humanoid(FullHumanoidDefinition {
                alignment: "Usually chaotic evil".to_string(),
                attributes: vec![-1, 3, -2, -2, 1, -2],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 1,
                modifiers: None,
                movement_speeds: None,
                name: "Goblin Peon".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Spear.weapon()],
            }),
            humanoid(FullHumanoidDefinition {
                alignment: "Usually chaotic evil".to_string(),
                attributes: vec![1, 3, 0, -2, 1, -2],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 1,
                modifiers: None,
                movement_speeds: None,
                name: "Goblin Guard".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Spear.weapon()],
            }),
            humanoid(FullHumanoidDefinition {
                alignment: "Usually chaotic evil".to_string(),
                attributes: vec![1, 3, 1, -2, 1, -2],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 1,
                modifiers: None,
                movement_speeds: None,
                name: "Goblin Warg Rider".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Spear.weapon()],
            }),
            humanoid(FullHumanoidDefinition {
                alignment: "Usually chaotic evil".to_string(),
                attributes: vec![0, 2, 1, -2, 2, 3],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 1,
                modifiers: Some(vec![Modifier::Attack(
                    StandardAttack::DivineJudgment(1).attack(),
                )]),
                movement_speeds: None,
                name: "Goblin Shaman".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Spear.weapon()],
            }),
        ],
    }));

    add_humans(&mut monsters);

    add_orcs(&mut monsters);

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        name: "Lizardfolk".to_string(),
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Lizardfolk are Medium bipedal creatures covered in reptilian scales.
                They are slightly taller and bulkier than humans, typically standing 6 to 7 feet tall and weighing up to 250 pounds.
                Their tail resembles that of a crocodile, and is typically 3 to 4 feet long.
                Their scales are typically green, gray, or brown.
                In battle, they typically fight as unorganized individuals.
            "),
            (5, "
                Lizardfolk use their tail for balance on land and to accelerate their swimming while in water.
                They prefer frontal assaults and massed rushes in battle, sometimes trying to force foes into the water, where the lizardfolk have an advantage.
                If lizardfolk are outnumbered or if their territory is being invaded, they set snares, plan ambushes, and make raids to hinder enemy supplies.
                Advanced tribes use more sophisticated tactics and have better traps and ambushes.
            "),
        ])),
        monsters: vec![
            humanoid(FullHumanoidDefinition {
                alignment: "Usually true neutral".to_string(),
                attributes: vec![3, 0, 4, 0, 0, 1],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 3,
                modifiers: Some(vec![Modifier::PassiveAbility(StandardPassiveAbility::Amphibious.ability())]),
                movement_speeds: Some(vec![
                    MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
                    MovementSpeed::new(MovementMode::Swim, SpeedCategory::Normal),
                ]),
                name: "Lizardfolk Grunt".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Spear.weapon()],
            }),
            humanoid(FullHumanoidDefinition {
                alignment: "Usually true neutral".to_string(),
                attributes: vec![3, 0, 4, 0, 2, 2],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 6,
                modifiers: Some(vec![Modifier::PassiveAbility(StandardPassiveAbility::Amphibious.ability())]),
                movement_speeds: Some(vec![
                    MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
                    MovementSpeed::new(MovementMode::Swim, SpeedCategory::Normal),
                ]),
                name: "Lizardfolk Elite".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Spear.weapon()],
            }),
        ],
    }));

    return monsters;
}

pub fn add_humans(monsters: &mut Vec<MonsterEntry>) {
    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        name: "Humans".to_string(),
        knowledge: None,
        monsters: vec![
            humanoid(FullHumanoidDefinition {
                alignment: "Usually lawful neutral".to_string(),
                attributes: vec![2, 0, 1, 0, 0, 1],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 1,
                modifiers: None,
                movement_speeds: None,
                name: "Town Guard".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Broadsword.weapon()],
            }),
            humanoid(FullHumanoidDefinition {
                alignment: "Usually lawful neutral".to_string(),
                attributes: vec![1, 0, 0, 0, 0, 3],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 1,
                modifiers: Some(vec![Modifier::Attack(
                    StandardAttack::DivineJudgment(1).attack(),
                )]),
                movement_speeds: None,
                name: "Cleric of the Peace".to_string(),
                senses: None,
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Warhammer.weapon()],
            }),
        ],
    }));
}

pub fn add_orcs(monsters: &mut Vec<MonsterEntry>) {
    struct OrcDefinition {
        attributes: Vec<i32>,
        challenge_rating: ChallengeRating,
        knowledge: Option<Knowledge>,
        level: i32,
        modifiers: Option<Vec<Modifier>>,
        name: String,
        size: Size,
        trained_skills: Option<Vec<Skill>>,
        weapons: Vec<Weapon>,
    }

    impl OrcDefinition {
        fn monster(self) -> Monster {
            return humanoid(FullHumanoidDefinition {
                // From def
                attributes: self.attributes,
                challenge_rating: self.challenge_rating,
                knowledge: self.knowledge,
                level: self.level,
                name: self.name,
                modifiers: self.modifiers,
                size: self.size,
                trained_skills: self.trained_skills,
                weapons: self.weapons,

                alignment: "Usually lawful evil".to_string(),
                description: None,
                movement_speeds: None,
                senses: Some(vec![Sense::Darkvision(60)]),
            });
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        name: "Orcs".to_string(),
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Orcs are green-skinned humanoids that are generally larger, stronger, and less intelligent than humans.
                Most other humanoid races consider them ugly, though orcs would say the same about most other humanoid races.
                They tend to be selfish, but they adhere strictly to the particular orcish interpretation of honorable combat.
            "),
            (5, r#"
                Honorable orc combat avoids sneak attacks or deception, allows enemies to surrender, and respects the distinction between civilians and combatants.
                However, honorable orc combat does not require a great deal of warning before battle is joined, and they have no concept of "dirty fighting" - orcs fight brutally and with no reservations in combat.

                Orcs have highly militaristic and regimented society that is divided into different clans, each of which is ruled by a powerful chieftain.
            "#),
            (10, "
                Orc hierarchy and status is almost always determined by power, and chieftains can be deposed at specific intervals in a personal trial by combat.
                You know the general patterns that determine when these personal trials by combat are permissible for local orc clans.
            "),
        ])),
        monsters: vec![
            OrcDefinition {
                attributes: vec![4, 0, 2, -2, 2, 0],
                challenge_rating: ChallengeRating::One,
                knowledge: None,
                level: 2,
                modifiers: Some(vec![
                    Modifier::Maneuver(Maneuver::Armorcrusher),
                ]),
                name: "Orc Butcher".to_string(),
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Sledgehammer.weapon()],
            }.monster(),
            OrcDefinition {
                attributes: vec![4, 0, 2, -2, 1, 0],
                challenge_rating: ChallengeRating::One,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Orc grunts are the standard warrior that orc clans field in battle.
                    "),
                ])),
                level: 2,
                modifiers: None,
                name: "Orc Grunt".to_string(),
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Greataxe.weapon()],
            }.monster(),
            OrcDefinition {
                attributes: vec![3, 0, 0, -2, 0, 0],
                challenge_rating: ChallengeRating::One,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Orc peons are the weakest warrior that orc clans field in battle.
                        They have the lowest status of any adult in orc society.
                    "),
                ])),
                level: 1,
                modifiers: None,
                name: "Orc Peon".to_string(),
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Greataxe.weapon()],
            }.monster(),
            OrcDefinition {
                attributes: vec![4, 0, 3, -2, 1, 1],
                challenge_rating: ChallengeRating::One,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Orc veterans are battle-hardened elite warriors who are deadly at any range.
                        They often serve as bodyguards to orc chieftains or as devastating shock troops in battle.
                    "),
                ])),
                level: 5,
                modifiers: Some(vec![Modifier::Maneuver(Maneuver::MightyStrike)]),
                name: "Orc Veteran".to_string(),
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Greataxe.weapon(), StandardWeapon::Longbow.weapon()],
            }.monster(),
            OrcDefinition {
                attributes: vec![6, 1, 4, -2, 2, 2],
                challenge_rating: ChallengeRating::Four,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Orc clan chiefs are the among the most powerful orc warriors.
                        Even the lowest clan chiefs commands hundreds of powerful orc warriors, plus at least as many noncombatants.
                    "),
                ])),
                level: 6,
                modifiers: Some(vec![
                    Modifier::Maneuver(Maneuver::MightyStrike),
                    Modifier::Attack(
                        Maneuver::Hamstring
                            .attack(StandardWeapon::Greataxe.weapon())
                    ),
                ]),
                name: "Orc Clan Chief".to_string(),
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Greataxe.weapon(), StandardWeapon::Longbow.weapon()],
            }.monster(),
            OrcDefinition {
                attributes: vec![4, 0, 2, -2, 1, 2],
                challenge_rating: ChallengeRating::One,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Orc shamans provide orc battle squads with divine magical support.
                    "),
                ])),
                level: 2,
                modifiers: Some(vec![Modifier::Attack(
                    StandardAttack::DivineJudgment(1).attack(),
                )]),
                name: "Orc Shaman".to_string(),
                size: Size::Medium,
                trained_skills: None,
                weapons: vec![StandardWeapon::Battleaxe.weapon()],
            }.monster(),
        ],
    }));
}
