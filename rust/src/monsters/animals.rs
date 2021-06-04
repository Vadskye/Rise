use crate::core_mechanics::movement_modes::{FlightManeuverability, MovementMode, SpeedCategory};
use crate::core_mechanics::{attack_effects, attacks, damage_types, debuffs, defenses};
use crate::equipment::weapons;
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Animal;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::sizes::Size;
use crate::monsters::{monster_group, FullMonsterDefinition, MinimalMonsterDefinition, Monster};

pub fn animals() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    let mut half_power_bite = attacks::Attack::from_weapon(weapons::Weapon::MonsterBite);
    if let Some(e) = half_power_bite.damage_effect_mut() {
        e.power_multiplier = 0.5;
    }
    monsters.push(MonsterEntry::Monster(Monster::fully_defined(
        FullMonsterDefinition {
            alignment: "Always true neutral",
            attributes: vec![3, 0, 3, -8, 1, 0],
            challenge_rating: ChallengeRating::Two,
            creature_type: Animal,
            description: None,
            knowledge: vec![
                (0, "Camels are known for their ability to travel long distances without food or water."),
            ],
            level: 1,
            movement_modes: None,
            name: "Camel",
            size: Size::Medium,
            // Camels have a high strength, but they shouldn't deal massive damage
            special_attacks: Some(vec![half_power_bite]),
            weapons: vec![weapons::Weapon::MonsterBite],
        },
    )));

    monsters.push(MonsterEntry::Monster(Monster::fully_defined(
        FullMonsterDefinition {
            alignment: "Always true neutral",
            attributes: vec![2, 2, 1, -8, 1, -1],
            challenge_rating: ChallengeRating::One,
            creature_type: Animal,
            description: None,
            knowledge: vec![
                (0, "
                    A baboon is an aggressive primate adapted to life on the ground.
                    A typical baboon is the size of a big dog.
                "),
                (5, "
                    Baboons prefer open spaces but climb trees to find safe places to rest overnight.
                    They can be aggressive, though they avoid attacking creatures that seem too dangerous.
                "),
            ],
            level: 1,
            movement_modes: Some(vec![
                MovementMode::Climb(SpeedCategory::Normal),
                MovementMode::Land(SpeedCategory::Normal),
            ]),
            name: "Baboon",
            size: Size::Medium,
            special_attacks: None,
            weapons: vec![weapons::Weapon::MonsterBite],
        },
    )));

    monsters.push(MonsterEntry::Monster(Monster::fully_defined(
        FullMonsterDefinition {
            alignment: "Always true neutral",
            attributes: vec![-2, 2, 2, -8, 1, -1],
            challenge_rating: ChallengeRating::One,
            creature_type: Animal,
            description: None,
            knowledge: vec![
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
            ],
            level: 1,
            movement_modes: None,
            name: "Badger",
            size: Size::Small,
            special_attacks: None,
            weapons: vec![weapons::Weapon::MonsterClaws],
        },
    )));

    monsters.push(MonsterEntry::MonsterGroup(
        monster_group::MonsterGroup::new(
            "Bears",
            vec![
                Monster::fully_defined(FullMonsterDefinition {
                    alignment: "Always true neutral",
                    attributes: vec![3, 0, 3, -8, 0, -1],
                    challenge_rating: ChallengeRating::Three,
                    creature_type: Animal,
                    description: None,
                    knowledge: vec![
                        (0, "
                            Black bears are forest-dwelling omnivores that are usually not dangerous unless an interloper threatens their cubs or food supply.
                            They can be pure black, blond, or cinnamon in color and are rarely more than 5 feet long.
                        "),
                    ],
                    level: 3,
                    movement_modes: None,
                    name: "Black bear",
                    size: Size::Medium,
                    special_attacks: None,
                    weapons: vec![weapons::Weapon::MonsterBite, weapons::Weapon::MonsterClaws],
                }),
                Monster::fully_defined(FullMonsterDefinition {
                    alignment: "Always true neutral",
                    attributes: vec![4, 0, 3, -8, 0, -1],
                    challenge_rating: ChallengeRating::Three,
                    creature_type: Animal,
                    description: Some("A brown bear's statistics can be used for almost any big bear, including a grizzly bear."),
                    knowledge: vec![
                        (0, "
                            Brown bears tend to be bad-tempered and territorial.
                        "),
                    ],
                    movement_modes: None,
                    level: 5,
                    name: "Brown bear",
                    size: Size::Large,
                    special_attacks: None,
                    weapons: vec![weapons::Weapon::MonsterBite, weapons::Weapon::MonsterClaws],
                }),
            ],
        ),
    ));

    monsters.push(MonsterEntry::Monster(Monster::fully_defined(
        FullMonsterDefinition {
            alignment: "Always true neutral",
            attributes: vec![-7, 3, -1, -7, 1, -2],
            challenge_rating: ChallengeRating::Half,
            creature_type: Animal,
            description: None,
            knowledge: vec![],
            level: 1,
            movement_modes: None,
            name: "Cat",
            size: Size::Small,
            special_attacks: None,
            weapons: vec![weapons::Weapon::MonsterBite],
        },
    )));

    monsters.push(MonsterEntry::MonsterGroup(
        monster_group::MonsterGroup::new(
            "Dogs",
            vec![
                Monster::fully_defined(
                    FullMonsterDefinition {
                        alignment: "Always true neutral",
                        attributes: vec![0, 1, 0, -7, 1, -1],
                        challenge_rating: ChallengeRating::One,
                        creature_type: Animal,
                        description: None,
                        knowledge: vec![],
                        level: 1,
                        movement_modes: None,
                        name: "Wild dog",
                        size: Size::Medium,
                        special_attacks: None,
                        weapons: vec![weapons::Weapon::MonsterBite],
                    },
                ),
                Monster::fully_defined(
                    FullMonsterDefinition {
                        alignment: "Always true neutral",
                        attributes: vec![1, 1, 1, -7, 1, -1],
                        challenge_rating: ChallengeRating::One,
                        creature_type: Animal,
                        description: None,
                        knowledge: vec![
                            (0, "
                                A riding dog is bred for speed and endurance.
                                Riding dogs are sometimes used as battle mounts by halflings and gnomes.
                            "),
                        ],
                        level: 2,
                        movement_modes: None,
                        name: "Riding dog",
                        size: Size::Medium,
                        special_attacks: None,
                        weapons: vec![weapons::Weapon::MonsterBite],
                    },
                ),
            ],
        ),
    ));

    let mut frostweb_spider_bite = attacks::Attack::from_weapon(weapons::Weapon::MonsterBite);
    if let Some(e) = frostweb_spider_bite.damage_effect_mut() {
        e.lose_hp_effects = Some(vec![attack_effects::AttackEffect::Debuff(
            attack_effects::DebuffEffect {
                debuffs: vec![debuffs::Debuff::Sickened],
                duration: attack_effects::AttackEffectDuration::Condition,
            },
        )]);
    }
    monsters.push(MonsterEntry::Monster(Monster::minimally_defined(
        MinimalMonsterDefinition {
            attributes: vec![3, 3, 1, 1, 2, 2],
            challenge_rating: ChallengeRating::Four,
            creature_type: Animal,
            level: 12,
            name: "Frostweb Spider",
            size: Size::Large,
            special_attacks: Some(vec![
                frostweb_spider_bite,
                attacks::Attack {
                    accuracy: 0,
                    crit: None,
                    defense: defenses::Defense::Fortitude,
                    glance: None,
                    hit: vec![attack_effects::AttackEffect::area_damage(
                        5,
                        vec![damage_types::DamageType::Cold],
                    )],
                    is_magical: true,
                    name: "Frost Breath".to_string(),
                    targeting: attacks::AttackTargeting::Cone(
                        attacks::AreaSize::Large,
                        attacks::AreaTargets::Everything,
                    ),
                    weapon: None,
                },
            ]),
            weapons: vec![weapons::Weapon::MonsterBite],
        },
    )));

    let mut poisonous_stinger = attacks::Attack::from_weapon(weapons::Weapon::MonsterStinger);
    if let Some(e) = poisonous_stinger.damage_effect_mut() {
        e.lose_hp_effects = Some(vec![attack_effects::AttackEffect::Poison(
            attack_effects::PoisonEffect {
                stage1: vec![debuffs::Debuff::Sickened],
                stage3: Some(vec![debuffs::Debuff::Paralyzed]),
            },
        )]);
    }
    monsters.push(MonsterEntry::Monster(Monster::fully_defined(
        FullMonsterDefinition {
            alignment: "Always true neutral",
            attributes: vec![1, 4, 0, -8, 2, -2],
            challenge_rating: ChallengeRating::Two,
            creature_type: Animal,
            description: None,
            knowledge: vec![
                (0, "
                    A giant wasp is a Large insect resembling a normal wasp.
                    Giant wasps attack when hungry or threatened, stinging their prey to death.
                "),
                (5, "
                    Giant wasps take dead or incapacitated opponents back to their lairs as food for their unhatched young.
                "),
            ],
            level: 6,
            movement_modes: Some(vec![MovementMode::Fly(SpeedCategory::Fast, FlightManeuverability::Normal)]),
            name: "Giant Wasp",
            size: Size::Large,
            special_attacks: Some(vec![poisonous_stinger]),
            weapons: vec![weapons::Weapon::MonsterStinger],
        },
    )));

    return monsters;
}
