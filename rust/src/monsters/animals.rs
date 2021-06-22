use crate::core_mechanics::movement_modes::{FlightManeuverability, MovementMode, SpeedCategory};
use crate::core_mechanics::passive_abilities::PassiveAbility;
use crate::core_mechanics::senses::Sense;
use crate::core_mechanics::{attack_effects, damage_types, debuffs, defenses};
use crate::equipment::weapons::Weapon;
use crate::core_mechanics::attacks::{Attack, AttackTargeting, AreaSize, AreaTargets, UsageTime};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Animal;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::sizes::Size;
use crate::monsters::{monster_group, FullMonsterDefinition, Monster};
use crate::skills::Skill;

struct FullAnimalDefinition {
    attributes: Vec<i8>,
    challenge_rating: ChallengeRating,
    description: Option<&'static str>,
    knowledge: Option<Vec<(i8, &'static str)>>,
    level: i8,
    movement_modes: Option<Vec<MovementMode>>,
    name: String,
    passive_abilities: Option<Vec<PassiveAbility>>,
    senses: Option<Vec<Sense>>,
    skill_points: Option<Vec<(Skill, i8)>>,
    size: Size,
    special_attacks: Option<Vec<Attack>>,
    weapons: Vec<Weapon>,
}

fn animal(def: FullAnimalDefinition) -> Monster {
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
        skill_points: def.skill_points,
        special_attacks: def.special_attacks,
        weapons: def.weapons,

        // Default values
        alignment: "Always true neutral".to_string(),
        creature_type: Animal,
        special_defense_modifiers: None,
    });
}

pub fn animals() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    let mut half_power_bite = Attack::from_weapon(Weapon::MonsterBite);
    if let Some(e) = half_power_bite.damage_effect_mut() {
        e.power_multiplier = 0.5;
    }
    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![3, 0, 3, -8, 1, 0],
        challenge_rating: ChallengeRating::Two,
        description: None,
        knowledge: Some(vec![(
            0,
            "Camels are known for their ability to travel long distances without food or water.",
        )]),
        level: 1,
        passive_abilities: None,
        movement_modes: None,
        name: "Camel".to_string(),
        senses: None,
        size: Size::Medium,
        skill_points: Some(vec![(Skill::Endurance, 3)]),
        // Camels have a high strength, but they shouldn't deal massive damage
        special_attacks: Some(vec![half_power_bite.clone()]),
        weapons: vec![Weapon::MonsterBite],
    })));

    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![2, 2, 1, -8, 1, -1],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: Some(vec![
            (0, "
                A baboon is an aggressive primate adapted to life on the ground.
                A typical baboon is the size of a big dog.
            "),
            (5, "
                Baboons prefer open spaces but climb trees to find safe places to rest overnight.
                They can be aggressive, though they avoid attacking creatures that seem too dangerous.
            "),
        ]),
        level: 1,
        passive_abilities: None,
        movement_modes: Some(vec![
            MovementMode::Climb(SpeedCategory::Normal),
            MovementMode::Land(SpeedCategory::Normal),
        ]),
        name: "Baboon".to_string(),
        senses: None,
        size: Size::Medium,
        skill_points: Some(vec![
            (Skill::Climb, 3),
        ]),
        special_attacks: None,
        weapons: vec![Weapon::MonsterBite],
    })));

    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![-2, 2, 2, -8, 1, -1],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: Some(vec![
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
        ]),
        level: 1,
        passive_abilities: None,
        movement_modes: None,
        name: "Badger".to_string(),
        senses: Some(vec![Sense::Scent]),
        size: Size::Small,
        skill_points: Some(vec![(Skill::Endurance, 1)]),
        special_attacks: None,
        weapons: vec![Weapon::MonsterClaws],
    })));

    monsters.push(MonsterEntry::MonsterGroup(
        monster_group::MonsterGroup::new(
            "Bears",
            vec![
                animal(FullAnimalDefinition {
                    attributes: vec![3, 0, 3, -8, 0, -1],
                    challenge_rating: ChallengeRating::Three,
                    description: None,
                    knowledge: Some(vec![
                        (0, "
                            Black bears are forest-dwelling omnivores that are usually not dangerous unless an interloper threatens their cubs or food supply.
                            They can be pure black, blond, or cinnamon in color and are rarely more than 5 feet long.
                        "),
                    ]),
                    level: 3,
                    passive_abilities: None,
                    movement_modes: None,
                    name: "Black bear".to_string(),
                    senses: Some(vec![Sense::Scent]),
                    size: Size::Medium,
                    skill_points: Some(vec![
                        (Skill::Climb, 3),
                        (Skill::Endurance, 3),
                        (Skill::Swim, 1),
                    ]),
                    special_attacks: None,
                    weapons: vec![Weapon::MonsterBite, Weapon::MonsterClaws],
                }),
                animal(FullAnimalDefinition {
                    attributes: vec![4, 0, 3, -8, 0, -1],
                    challenge_rating: ChallengeRating::Three,
                    description: Some("A brown bear's statistics can be used for almost any big bear, including a grizzly bear."),
                    knowledge: Some(vec![
                        (0, "
                            Brown bears tend to be bad-tempered and territorial.
                        "),
                    ]),
                    passive_abilities: None,
                    movement_modes: None,
                    level: 5,
                    name: "Brown bear".to_string(),
                    senses: Some(vec![Sense::Scent]),
                    size: Size::Large,
                    skill_points: Some(vec![
                        (Skill::Climb, 3),
                        (Skill::Endurance, 3),
                        (Skill::Swim, 1),
                    ]),
                    special_attacks: None,
                    weapons: vec![Weapon::MonsterBite, Weapon::MonsterClaws],
                }),
            ],
        ),
    ));

    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![-7, 3, -1, -7, 1, -2],
        challenge_rating: ChallengeRating::Half,
        description: None,
        knowledge: None,
        level: 1,
        passive_abilities: None,
        movement_modes: None,
        name: "Cat".to_string(),
        senses: Some(vec![Sense::LowLightVision, Sense::Scent]),
        size: Size::Small,
        skill_points: Some(vec![
            (Skill::Agility, 3),
            (Skill::Awareness, 1),
            (Skill::Flexibility, 3),
            (Skill::Stealth, 3),
        ]),
        special_attacks: None,
        weapons: vec![Weapon::MonsterBite],
    })));

    monsters.push(MonsterEntry::MonsterGroup(
        monster_group::MonsterGroup::new(
            "Dogs",
            vec![
                animal(FullAnimalDefinition {
                    attributes: vec![0, 1, 0, -7, 1, -1],
                    challenge_rating: ChallengeRating::One,
                    description: None,
                    knowledge: None,
                    level: 1,
                    passive_abilities: None,
                    movement_modes: None,
                    name: "Wild dog".to_string(),
                    senses: Some(vec![Sense::Scent]),
                    size: Size::Medium,
                    skill_points: Some(vec![(Skill::Awareness, 3)]),
                    special_attacks: None,
                    weapons: vec![Weapon::MonsterBite],
                }),
                animal(FullAnimalDefinition {
                    attributes: vec![1, 1, 1, -7, 1, -1],
                    challenge_rating: ChallengeRating::One,
                    description: None,
                    knowledge: Some(vec![(
                        0,
                        "
                            A riding dog is bred for speed and endurance.
                            Riding dogs are sometimes used as battle mounts by halflings and gnomes.
                        ",
                    )]),
                    level: 2,
                    passive_abilities: None,
                    movement_modes: None,
                    name: "Riding dog".to_string(),
                    senses: Some(vec![Sense::Scent]),
                    size: Size::Medium,
                    skill_points: Some(vec![(Skill::Awareness, 3), (Skill::Endurance, 3)]),
                    special_attacks: None,
                    weapons: vec![Weapon::MonsterBite],
                }),
            ],
        ),
    ));

    let mut frostweb_spider_bite = Attack::from_weapon(Weapon::MonsterBite);
    if let Some(e) = frostweb_spider_bite.damage_effect_mut() {
        e.lose_hp_effects = Some(vec![attack_effects::AttackEffect::Poison(
            attack_effects::PoisonEffect {
                stage1: vec![debuffs::Debuff::Slowed],
                stage3_debuff: Some(vec![debuffs::Debuff::Decelerated]),
                stage3_vital: None,
            },
        )]);
    }
    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![3, 3, 1, 1, 2, 2],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: None,
        level: 12,
        movement_modes: None,
        name: "Frostweb Spider".to_string(),
        passive_abilities: None,
        senses: Some(vec![Sense::Tremorsense(240), Sense::Tremorsight(60)]),
        size: Size::Large,
        skill_points: None,
        special_attacks: Some(vec![
            frostweb_spider_bite,
            Attack {
                accuracy: 0,
                crit: None,
                defense: defenses::Defense::Fortitude,
                glance: None,
                hit: attack_effects::AttackEffect::area_damage(
                    5,
                    vec![damage_types::DamageType::Cold],
                ),
                is_magical: true,
                name: "Frost Breath".to_string(),
                targeting: AttackTargeting::Cone(
                    AreaSize::Large,
                    AreaTargets::Everything,
                ),
                usage_time: UsageTime::Minor,
                weapon: None,
            },
        ]),
        weapons: vec![Weapon::MonsterBite],
    })));

    let mut poisonous_stinger = Attack::from_weapon(Weapon::MonsterStinger);
    if let Some(e) = poisonous_stinger.damage_effect_mut() {
        e.lose_hp_effects = Some(vec![attack_effects::AttackEffect::Poison(
            attack_effects::PoisonEffect {
                stage1: vec![debuffs::Debuff::Sickened],
                stage3_debuff: Some(vec![debuffs::Debuff::Paralyzed]),
                stage3_vital: None,
            },
        )]);
    }
    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![1, 4, 0, -8, 2, -2],
        challenge_rating: ChallengeRating::Two,
        description: None,
        knowledge: Some(vec![
            (0, "
                A giant wasp is a Large insect resembling a normal wasp.
                Giant wasps attack when hungry or threatened, stinging their prey to death.
            "),
            (5, "
                Giant wasps take dead or incapacitated opponents back to their lairs as food for their unhatched young.
            "),
        ]),
        level: 6,
        passive_abilities: None,
        movement_modes: Some(vec![MovementMode::Fly(SpeedCategory::Fast, FlightManeuverability::Perfect)]),
        senses: None,
        name: "Giant Wasp".to_string(),
        size: Size::Large,
        skill_points: Some(vec![
            (Skill::Awareness, 3),
        ]),
        special_attacks: Some(vec![poisonous_stinger]),
        weapons: vec![Weapon::MonsterStinger],
    },
    )));

    monsters.push(MonsterEntry::Monster(animal(
        FullAnimalDefinition {
            attributes: vec![0, 3, 0, -9, 2, -2],
            challenge_rating: ChallengeRating::One,
            description: None,
            knowledge: Some(vec![
                (0, "
                    A dire rat is a Small omnivorous scavenger that resembles an unusually large rat.
                    Dire rats are not generally aggressive, but will attack to defend their nests and territories.
                "),
                (5, "
                    Dire rats can grow to be up to 4 feet long and weigh over 50 pounds.
                "),
            ]),
            level: 1,
            passive_abilities: None,
            movement_modes: None,
            name: "Dire Rat".to_string(),
            senses: Some(vec![Sense::LowLightVision, Sense::Scent]),
            size: Size::Small,
            skill_points: Some(vec![
                (Skill::Climb, 3),
                (Skill::Swim, 3),
            ]),
            special_attacks: None,
            weapons: vec![Weapon::MonsterBite],
        },
    )));

    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![1, 2, 1, -7, 0, -1],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: None,
        level: 2,
        movement_modes: None,
        name: "Wolf".to_string(),
        passive_abilities: None,
        senses: Some(vec![Sense::Scent]),
        size: Size::Medium,
        skill_points: None,
        special_attacks: None,
        weapons: vec![Weapon::MonsterBite],
    })));

    // TODO: add carrying capacity to knowledge result
    let horse = animal(FullAnimalDefinition {
        attributes: vec![2, 1, 3, -7, 0, -3],
        challenge_rating: ChallengeRating::Two,
        level: 2,
        name: "Horse".to_string(),
        size: Size::Large,
        special_attacks: Some(vec![half_power_bite.clone()]),
        weapons: vec![Weapon::MonsterBite],
        description: None,
        knowledge: None,
        movement_modes: None,
        passive_abilities: None,
        senses: None,
        skill_points: Some(vec![(Skill::Endurance, 2)]),
    });
    monsters.push(MonsterEntry::Monster(horse));

    let pony = animal(FullAnimalDefinition {
        attributes: vec![1, 0, 3, -7, 0, -3],
        challenge_rating: ChallengeRating::One,
        level: 2,
        name: "Pony".to_string(),
        size: Size::Medium,
        special_attacks: Some(vec![half_power_bite.clone()]),
        weapons: vec![Weapon::MonsterBite],
        description: None,
        knowledge: None,
        movement_modes: None,
        passive_abilities: None,
        senses: None,
        skill_points: Some(vec![(Skill::Endurance, 2)]),
    });
    monsters.push(MonsterEntry::Monster(pony));

    let roc = animal(FullAnimalDefinition {
        attributes: vec![4, 1, 3, -7, 2, -1],
        challenge_rating: ChallengeRating::Four,
        level: 9,
        name: "Roc".to_string(),
        size: Size::Gargantuan,
        special_attacks: None,
        weapons: vec![Weapon::MonsterBite],
        description: None,
        knowledge: Some(vec![
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
        ]),
        movement_modes: None,
        passive_abilities: None,
        senses: None,
        skill_points: None,
    });
    monsters.push(MonsterEntry::Monster(roc));

    let vampire_eel = animal(FullAnimalDefinition {
        attributes: vec![2, 2, 2, -8, 1, -1],
        challenge_rating: ChallengeRating::Half,
        level: 6,
        name: "Vampire Eel".to_string(),
        size: Size::Medium,
        special_attacks: None,
        weapons: vec![Weapon::MonsterBite],
        description: None,
        knowledge: Some(vec![(
            0,
            "
                Vampire eels are slimy, snakelike carnivores.
                They swim through murky water, looking for edible creatures.
            ",
        )]),
        movement_modes: Some(vec![MovementMode::Swim(SpeedCategory::Normal)]),
        passive_abilities: None,
        senses: None,
        skill_points: Some(vec![(Skill::Swim, 2)]),
    });
    monsters.push(MonsterEntry::Monster(vampire_eel));

    let dire_wolf = animal(FullAnimalDefinition {
        attributes: vec![3, 3, 2, -7, 3, 0],
        challenge_rating: ChallengeRating::One,
        level: 5,
        name: "Dire Wolf".to_string(),
        size: Size::Large,
        special_attacks: None,
        weapons: vec![Weapon::MonsterBite],
        description: None,
        knowledge: Some(vec![(
            0,
            "
                A dire wolf is a wolf-like creature that is much larger than an ordinary wolf.
                Their fur is usually mottled gray or black.
                Dire wolves are efficient pack hunters that will kill anything they can catch.
            ",
        )]),
        movement_modes: None,
        passive_abilities: None,
        senses: Some(vec![Sense::Scent]),
        skill_points: None,
    });
    monsters.push(MonsterEntry::Monster(dire_wolf));

    monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
        attributes: vec![-8, 3, -4, -6, 2, -1],
        challenge_rating: ChallengeRating::Half,
        level: 1,
        name: "Raven".to_string(),
        size: Size::Small,
        special_attacks: None,
        weapons: vec![Weapon::MonsterTalons],
        description: None,
        knowledge: None,
        movement_modes: Some(vec![MovementMode::Fly(SpeedCategory::Normal, FlightManeuverability::Normal)]),
        passive_abilities: None,
        senses: None,
        skill_points: Some(vec![(Skill::Endurance, 2)]),
    })));

    let mut bombardier_beetle = animal(FullAnimalDefinition {
        attributes: vec![3, -1, 4, -9, 0, 1],
        challenge_rating: ChallengeRating::Two,
        level: 7,
        name: "Giant Bombardier Beetle".to_string(),
        size: Size::Large,
        special_attacks: None,
        weapons: vec![Weapon::MonsterBite],
        description: None,
        knowledge: None,
        movement_modes: None,
        passive_abilities: None,
        senses: None,
        skill_points: Some(vec![(Skill::Endurance, 2)]),
    });
    bombardier_beetle.set_knowledge(vec![
        (0, "
            A giant bombardier beetle is an insect resembling a massive beetle.
            They feed primarily on carrion and offal, gathering heaps of the stuff in which they build nests and lay eggs.
        "),
        (5, "
            A typical adult giant bombardier beetle is about 6 feet long.
            Giant bombardier beetles normally attack only to defend themselves, their nests, or their eggs.
        "),
    ]);
    monsters.push(MonsterEntry::Monster(bombardier_beetle));

    return monsters;
}
