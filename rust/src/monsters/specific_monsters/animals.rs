use crate::core_mechanics::attacks::{attack_effect, Maneuver, StandardAttack};
use crate::core_mechanics::{
    DamageType, Debuff, Defense, FlightManeuverability, MovementMode, MovementSpeed, Sense, Size,
    SpeedCategory, StandardPassiveAbility,
};
use crate::creatures::{Modifier, ModifierBundle, Monster};
use crate::equipment::{StandardWeapon, Weapon};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Animal;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{monster_group, FullMonsterDefinition, Role};
use crate::skills::Skill;

struct FullAnimalDefinition {
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

fn animal(def: FullAnimalDefinition) -> Monster {
    return FullMonsterDefinition {
        // From def
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
        alignment: "Always true neutral".to_string(),
        creature_type: Animal,
    }
    .monster();
}

pub fn animals() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![3, 0, 3, -8, 1, 0],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: Some(Knowledge::new(vec![(
            0,
            "Camels are known for their ability to travel long distances without food or water.",
        )])),
        level: 1,
        modifiers: Some(ModifierBundle::Multipedal.modifiers()),
        movement_speeds: None,
        name: "Camel".to_string(),
        role: Role::Brute,
        senses: None,
        size: Size::Medium,
        trained_skills: Some(vec![Skill::Endurance]),
        // Camels use a weaker bite because they shouldn't do as much damage as their
        // Strength would indicate.
        weapons: vec![StandardWeapon::Bite.weapon()],
    })));

    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![2, 2, 1, -8, 1, -1],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                A baboon is an aggressive primate adapted to life on the ground.
                A typical baboon is the size of a big dog.
            "),
            (5, "
                Baboons prefer open spaces but climb trees to find safe places to rest overnight.
                They can be aggressive, though they avoid attacking creatures that seem too dangerous.
            "),
        ])),
        level: 1,
        modifiers: None,
        movement_speeds: Some(vec![
            MovementSpeed::new(MovementMode::Climb, SpeedCategory::Normal),
            MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
        ]),
        name: "Baboon".to_string(),
        role: Role::Skirmisher,
        senses: None,
        size: Size::Medium,
        trained_skills: Some(vec![
            Skill::Climb,
        ]),
        weapons: vec![StandardWeapon::MultipedalBite.weapon()],
    })));

    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![-2, 2, 2, -8, 1, -1],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (
                0,
                "
                A badger is a furry animal with a squat, powerful body.
                Badgers can be tenacious in combat.
            ",
            ),
            (
                5,
                "
                Badgers have strong forelimbs that are armed with long claws for digging.
                A typical adult badger is 2 to 3 feet long and weighs 25 to 35 pounds.
            ",
            ),
        ])),
        level: 1,
        modifiers: Some(ModifierBundle::Multipedal.modifiers()),
        movement_speeds: None,
        name: "Badger".to_string(),
        role: Role::Brute,
        senses: Some(vec![Sense::Scent]),
        size: Size::Small,
        trained_skills: Some(vec![Skill::Endurance]),
        weapons: vec![StandardWeapon::Claws.weapon()],
    })));

    monsters.push(MonsterEntry::MonsterGroup(
        monster_group::MonsterGroup {
            name: "Bears".to_string(),
            knowledge: None,
            monsters: vec![
                animal(FullAnimalDefinition {
                    attributes: vec![4, 0, 4, -8, 0, -1],
                    challenge_rating: ChallengeRating::One,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                            Black bears are forest-dwelling omnivores that are usually not dangerous unless an interloper threatens their cubs or food supply.
                            They can be pure black, blond, or cinnamon in color and are rarely more than 5 feet long.
                        "),
                    ])),
                    level: 3,
                    modifiers: Some(ModifierBundle::Multipedal.modifiers()),
                    movement_speeds: None,
                    name: "Black bear".to_string(),
                    role: Role::Warrior,
                    senses: Some(vec![Sense::Scent]),
                    size: Size::Medium,
                    trained_skills: Some(vec![
                        Skill::Climb,
                        Skill::Endurance,
                        Skill::Swim,
                    ]),
                    weapons: vec![StandardWeapon::MultipedalBite.weapon(), StandardWeapon::Claws.weapon()],
                }),
                animal(FullAnimalDefinition {
                    attributes: vec![4, 0, 4, -8, 0, 1],
                    challenge_rating: ChallengeRating::One,
                    description: Some("A brown bear's statistics can be used for almost any big bear, including a grizzly bear.".to_string()),
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                            Brown bears tend to be bad-tempered and territorial.
                        "),
                    ])),
                    modifiers: Some(ModifierBundle::Multipedal.modifiers()),
                    movement_speeds: None,
                    level: 5,
                    name: "Brown bear".to_string(),
                    role: Role::Warrior,
                    senses: Some(vec![Sense::Scent]),
                    size: Size::Large,
                    trained_skills: Some(vec![
                        Skill::Climb,
                        Skill::Endurance,
                        Skill::Swim,
                    ]),
                    weapons: vec![StandardWeapon::MultipedalBite.weapon(), StandardWeapon::Claws.weapon()],
                }),
            ],
        }
    ));

    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![-7, 4, -2, -7, 1, -2],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: None,
        level: 1,
        modifiers: Some(ModifierBundle::Multipedal.modifiers()),
        movement_speeds: None,
        name: "Cat".to_string(),
        role: Role::Skirmisher,
        senses: Some(vec![Sense::LowLightVision, Sense::Scent]),
        size: Size::Small,
        trained_skills: Some(vec![
            Skill::Awareness,
            Skill::Balance,
            Skill::Flexibility,
            Skill::Stealth,
        ]),
        weapons: vec![StandardWeapon::MultipedalBite.weapon()],
    })));

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        knowledge: None,
        name: "Dogs".to_string(),
        monsters: vec![
            animal(FullAnimalDefinition {
                attributes: vec![2, 3, 1, -7, 2, -1],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: None,
                level: 1,
                modifiers: Some(ModifierBundle::Multipedal.modifiers()),
                movement_speeds: None,
                name: "Wild dog".to_string(),
                role: Role::Skirmisher,
                senses: Some(vec![Sense::Scent]),
                size: Size::Medium,
                trained_skills: Some(vec![Skill::Awareness]),
                weapons: vec![StandardWeapon::MultipedalBite.weapon()],
            }),
            animal(FullAnimalDefinition {
                attributes: vec![2, 3, 1, -7, 2, -1],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: Some(Knowledge::new(vec![(
                    0,
                    "
                            A riding dog is bred for speed and endurance.
                            Riding dogs are sometimes used as battle mounts by halflings and gnomes.
                        ",
                )])),
                level: 2,
                modifiers: Some(ModifierBundle::Multipedal.modifiers()),
                movement_speeds: None,
                name: "Riding dog".to_string(),
                role: Role::Skirmisher,
                senses: Some(vec![Sense::Scent]),
                size: Size::Medium,
                trained_skills: Some(vec![Skill::Awareness, Skill::Endurance]),
                weapons: vec![StandardWeapon::MultipedalBite.weapon()],
            }),
        ],
    }));

    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![4, 6, 2, 1, 3, 0],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: None,
        level: 12,
        modifiers: Some(ModifierBundle::Multipedal.plus_modifiers(vec![
            Modifier::Attack(StandardAttack::FrostwebSpiderBite.attack()),
            Modifier::Attack(
                StandardAttack::BreathWeaponCone(5, DamageType::Cold, Defense::Fortitude)
                    .attack()
                    .except(|a| a.name = "Frost Breath".to_string())
                    .except_elite(),
            ),
        ])),
        movement_speeds: None,
        name: "Frostweb Spider".to_string(),
        // Maybe brute?
        role: Role::Skirmisher,
        senses: Some(vec![Sense::Tremorsense(240), Sense::Tremorsight(60)]),
        size: Size::Large,
        trained_skills: None,
        weapons: vec![StandardWeapon::MultipedalBite.weapon()],
    })));

    let mut poisonous_stinger = StandardWeapon::MultipedalStinger.weapon().attack();
    if let Some(e) = poisonous_stinger.damage_effect_mut() {
        e.lose_hp_effect = Some(attack_effect::AttackTriggeredEffect::Poison(
            attack_effect::PoisonEffect {
                stage1: vec![Debuff::Dazed],
                stage3_debuff: Some(vec![Debuff::Paralyzed]),
                stage3_vital: None,
            },
        ));
    }
    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![2, 5, 1, -8, 3, -2],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                A giant wasp is a Large insect resembling a normal wasp.
                Giant wasps attack when hungry or threatened, stinging their prey to death.
            "),
            (5, "
                Giant wasps take dead or incapacitated opponents back to their lairs as food for their unhatched young.
            "),
        ])),
        level: 4,
        modifiers: Some(vec![Modifier::Attack(poisonous_stinger)]),
        movement_speeds: Some(vec![
            MovementSpeed::new(MovementMode::Fly(FlightManeuverability::Perfect), SpeedCategory::Fast)
        ]),
        role: Role::Skirmisher,
        senses: None,
        name: "Giant Wasp".to_string(),
        size: Size::Large,
        trained_skills: Some(vec![
            Skill::Awareness,
        ]),
        weapons: vec![StandardWeapon::MultipedalStinger.weapon()],
    },
    )));

    monsters.push(MonsterEntry::Monster(animal(
        FullAnimalDefinition {
            attributes: vec![0, 3, 0, -9, 2, -2],
            challenge_rating: ChallengeRating::One,
            description: None,
            knowledge: Some(Knowledge::new(vec![
                (0, "
                    A dire rat is a Small omnivorous scavenger that resembles an unusually large rat.
                    Dire rats are not generally aggressive, but will attack to defend their nests and territories.
                "),
                (5, "
                    Dire rats can grow to be up to 4 feet long and weigh over 50 pounds.
                "),
            ])),
            level: 1,
            modifiers: Some(ModifierBundle::Multipedal.modifiers()),
            movement_speeds: None,
            name: "Dire Rat".to_string(),
            role: Role::Skirmisher,
            senses: Some(vec![Sense::LowLightVision, Sense::Scent]),
            size: Size::Small,
            trained_skills: Some(vec![
                Skill::Climb,
                Skill::Swim,
            ]),
            weapons: vec![StandardWeapon::MultipedalBite.weapon()],
        },
    )));

    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![2, 3, 2, -7, 2, -1],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: None,
        level: 2,
        modifiers: Some(ModifierBundle::Multipedal.modifiers()),
        movement_speeds: None,
        name: "Wolf".to_string(),
        role: Role::Skirmisher,
        senses: Some(vec![Sense::Scent]),
        size: Size::Medium,
        trained_skills: None,
        weapons: vec![StandardWeapon::MultipedalBite.weapon()],
    })));

    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![3, 3, 3, -7, 2, -1],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: None,
        level: 1,
        modifiers: Some(ModifierBundle::Multipedal.modifiers()),
        movement_speeds: None,
        name: "Warg".to_string(),
        role: Role::Skirmisher,
        senses: Some(vec![Sense::Scent]),
        size: Size::Medium,
        trained_skills: None,
        weapons: vec![StandardWeapon::MultipedalBite.weapon()],
    })));

    // TODO: add carrying capacity to knowledge result
    let horse = animal(FullAnimalDefinition {
        attributes: vec![2, 1, 3, -7, 0, -3],
        challenge_rating: ChallengeRating::One,
        level: 2,
        name: "Horse".to_string(),
        size: Size::Large,
        description: None,
        knowledge: None,
        modifiers: None,
        movement_speeds: None,
        role: Role::Skirmisher,
        senses: None,
        trained_skills: Some(vec![Skill::Endurance]),
        // Horses use a weaker bite because they shouldn't do as much damage as their
        // Strength would indicate.
        weapons: vec![StandardWeapon::Bite.weapon()],
    });
    monsters.push(MonsterEntry::Monster(horse));

    let pony = animal(FullAnimalDefinition {
        attributes: vec![1, 0, 3, -7, 0, -3],
        challenge_rating: ChallengeRating::One,
        level: 2,
        name: "Pony".to_string(),
        size: Size::Medium,
        modifiers: Some(ModifierBundle::Multipedal.modifiers()),
        weapons: vec![StandardWeapon::MultipedalBite.weapon()],
        description: None,
        knowledge: None,
        movement_speeds: None,
        role: Role::Skirmisher,
        senses: None,
        trained_skills: Some(vec![Skill::Endurance]),
    });
    monsters.push(MonsterEntry::Monster(pony));

    // TODO: add special "pick up stuff" ability
    let roc = animal(FullAnimalDefinition {
        attributes: vec![6, 1, 4, -7, 4, -1],
        challenge_rating: ChallengeRating::Four,
        level: 9,
        name: "Roc".to_string(),
        size: Size::Gargantuan,
        weapons: vec![StandardWeapon::MultipedalBite.weapon(), StandardWeapon::Talon.weapon()],
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                A roc is an incredibly strong bird with the ability to carry off horses.
                It is typically 30 feet long from the beak to the base of the tail, with a wingspan as wide as 80 feet.
                Its plumage is either dark brown or golden from head to tail.
            "),
            (5, "
                A roc attacks from the air, swooping earthward to snatch prey in its powerful talons and carry it off for itself and its young to devour.
                A solitary roc is typically hunting and will attack any Medium or larger creature that appears edible.
                A mated pair of rocs attack in concert, fighting to the death to defend their nests or hatchlings.
            "),
        ])),
        modifiers: None,
        movement_speeds: None,
        role: Role::Brute,
        senses: None,
        trained_skills: Some(vec![Skill::Awareness]),
    });
    monsters.push(MonsterEntry::Monster(roc));

    let vampire_eel = animal(FullAnimalDefinition {
        attributes: vec![2, 4, 2, -8, 1, -1],
        challenge_rating: ChallengeRating::One,
        level: 6,
        name: "Vampire Eel".to_string(),
        size: Size::Medium,
        weapons: vec![StandardWeapon::MultipedalBite.weapon()],
        description: None,
        knowledge: Some(Knowledge::new(vec![(
            0,
            "
                Vampire eels are slimy, snakelike carnivores.
                They swim through murky water, looking for edible creatures.
            ",
        )])),
        modifiers: None,
        movement_speeds: Some(vec![MovementSpeed::new(
            MovementMode::Swim,
            SpeedCategory::Normal,
        )]),
        role: Role::Skirmisher,
        senses: None,
        trained_skills: Some(vec![Skill::Swim]),
    });
    monsters.push(MonsterEntry::Monster(vampire_eel));

    let dire_wolf = animal(FullAnimalDefinition {
        attributes: vec![3, 3, 2, -7, 3, 0],
        challenge_rating: ChallengeRating::One,
        level: 5,
        name: "Dire Wolf".to_string(),
        size: Size::Large,
        weapons: vec![StandardWeapon::MultipedalBite.weapon()],
        description: None,
        knowledge: Some(Knowledge::new(vec![(
            0,
            "
                A dire wolf is a wolf-like creature that is much larger than an ordinary wolf.
                Their fur is usually mottled gray or black.
                Dire wolves are efficient pack hunters that will kill anything they can catch.
            ",
        )])),
        modifiers: Some(ModifierBundle::Multipedal.modifiers()),
        movement_speeds: None,
        role: Role::Skirmisher,
        senses: Some(vec![Sense::Scent]),
        trained_skills: None,
    });
    monsters.push(MonsterEntry::Monster(dire_wolf));

    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![-8, 3, -4, -6, 2, -1],
        challenge_rating: ChallengeRating::One,
        level: 1,
        name: "Raven".to_string(),
        size: Size::Small,
        weapons: vec![StandardWeapon::Talon.weapon()],
        description: None,
        knowledge: None,
        modifiers: None,
        movement_speeds: Some(vec![MovementSpeed::new(
            MovementMode::Fly(FlightManeuverability::Normal),
            SpeedCategory::Normal,
        )]),
        role: Role::Skirmisher,
        senses: None,
        trained_skills: Some(vec![Skill::Endurance]),
    })));

    let bombardier_beetle = animal(FullAnimalDefinition {
        attributes: vec![3, -1, 4, -9, 0, 1],
        challenge_rating: ChallengeRating::One,
        level: 7,
        name: "Giant Bombardier Beetle".to_string(),
        size: Size::Large,
        weapons: vec![StandardWeapon::MultipedalBite.weapon()],
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                A giant bombardier beetle is an insect resembling a massive beetle.
                They feed primarily on carrion and offal, gathering heaps of the stuff in which they build nests and lay eggs.
            "),
            (5, "
                A typical adult giant bombardier beetle is about 6 feet long.
                Giant bombardier beetles normally attack only to defend themselves, their nests, or their eggs.
            "),
        ])),
        modifiers: Some(ModifierBundle::Multipedal.modifiers()),
        movement_speeds: None,
        role: Role::Brute,
        senses: None,
        trained_skills: Some(vec![Skill::Endurance]),
    });
    monsters.push(MonsterEntry::Monster(bombardier_beetle));

    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![4, 2, 4, -9, 2, -3],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: None,
        level: 3,
        modifiers: Some(ModifierBundle::Multipedal.plus_modifiers(vec![
            Modifier::Maneuver(Maneuver::GraspingStrike),
            Modifier::PassiveAbility(StandardPassiveAbility::Amphibious.ability()),
        ])),
        movement_speeds: Some(vec![
            MovementSpeed::new(MovementMode::Land, SpeedCategory::Slow),
            MovementSpeed::new(MovementMode::Swim, SpeedCategory::Normal),
        ]),
        name: "Crocodile".to_string(),
        role: Role::Brute,
        senses: Some(vec![Sense::Scent]),
        size: Size::Medium,
        trained_skills: Some(vec![Skill::Endurance, Skill::Stealth, Skill::Swim]),
        weapons: vec![StandardWeapon::MultipedalBite.weapon()],
    })));

    return monsters;
}
