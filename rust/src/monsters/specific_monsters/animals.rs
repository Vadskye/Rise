use crate::core_mechanics::abilities::{
    AbilityTag, ActiveAbility, CustomAbility, StrikeAbility, UsageTime,
};
use crate::core_mechanics::{MovementMode, MovementSpeed, Sense, Size, SpeedCategory};
use crate::creatures::{ModifierBundle, Monster};
use crate::equipment::{StandardWeapon, Weapon};
use crate::monsters::creature_type::CreatureType;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::monster_group::MonsterGroup;
use crate::monsters::{MonsterAbilities, MonsterDef, MonsterNarrative, MonsterStatistics, Role};
use crate::skills::Skill;

fn animal(def: MonsterDef) -> Monster {
    def.monster(CreatureType::Animal)
}

fn empty_narrative() -> Option<MonsterNarrative> {
    Some(MonsterNarrative {
        alignment: "Always true neutral".to_string(),
        description: None,
        art: false,
        knowledge: None,
    })
}

pub fn animals() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::Monster(animal(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![
                // Camels use a weak bite.
                ActiveAbility::Strike(StrikeAbility::normal_strike(1, StandardWeapon::Bite.weapon())),
            ],
            modifiers: ModifierBundle::Multipedal.modifiers(),
            movement_speeds: None,
            senses: vec![],
            trained_skills: vec![Skill::Endurance],
        },
        narrative: Some(MonsterNarrative {
            alignment: "Always true neutral".to_string(),
            description: None,
            art: false,
            knowledge: Some(Knowledge::new(vec![(
                0,
                "Camels are known for their ability to travel long distances without food or water.",
            )])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![3, 0, 3, -8, 1, 0],
            elite: false,
            level: 1,
            role: Role::Brute,
            size: Size::Large,
        },
        name: "Camel".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(animal(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![
                ActiveAbility::Strike(StrikeAbility::dual_strike(1, StandardWeapon::Claw.weapon())),
            ],
            modifiers: vec![],
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Climb, SpeedCategory::Normal),
                MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
            ]),
            senses: vec![],
            trained_skills: vec![Skill::Awareness],
        },
        narrative: Some(MonsterNarrative {
            alignment: "Always true neutral".to_string(),
            description: None,
            art: false,
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
        }),
        statistics: MonsterStatistics {
            attributes: vec![2, 3, 1, -8, 2, -1],
            elite: false,
            level: 1,
            role: Role::Skirmisher,
            size: Size::Medium,
        },
        name: "Baboon".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(animal(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![ActiveAbility::Strike(StrikeAbility::dual_strike(
                1,
                StandardWeapon::Claw.weapon(),
            ))],
            modifiers: ModifierBundle::Multipedal.modifiers(),
            movement_speeds: None,
            senses: vec![Sense::Scent],
            trained_skills: vec![Skill::Endurance],
        },
        narrative: Some(MonsterNarrative {
            alignment: "Always true neutral".to_string(),
            description: None,
            art: false,
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
        }),
        statistics: MonsterStatistics {
            attributes: vec![-2, 2, 3, -8, 1, -1],
            elite: false,
            level: 1,
            role: Role::Warrior,
            size: Size::Medium,
        },
        name: "Badger".to_string(),
    })));

    monsters.push(MonsterEntry::MonsterGroup(
        MonsterGroup {
            name: "Bears".to_string(),
            art: false,
            description: None,
            knowledge: None,
            monsters: vec![
                animal(MonsterDef {
                    abilities: MonsterAbilities {
                        active_abilities: vec![
                            // TODO: remove this once dual strike accuracy is autocalculated
                            ActiveAbility::Strike(StrikeAbility::dual_strike(1, StandardWeapon::Claw.weapon()).plus_accuracy(-1)),
                            ActiveAbility::Strike(StrikeAbility::normal_strike(1, StandardWeapon::MonsterBite.weapon()).except_elite()),
                        ],
                        modifiers: ModifierBundle::Multipedal.modifiers(),
                        movement_speeds: None,
                        senses: vec![Sense::Scent],
                        trained_skills: vec![Skill::Awareness, Skill::Climb, Skill::Endurance, Skill::Swim],
                    },
                    narrative: Some(MonsterNarrative {
                        alignment: "Always true neutral".to_string(),
                        description: None,
                        art: false,
                        knowledge: Some(Knowledge::new(vec![
                            (0, "
                                Black bears are forest-dwelling omnivores that are usually not dangerous unless an interloper threatens their cubs or food supply.
                                They can be pure black, blond, or cinnamon in color and are rarely more than 5 feet long.
                            "),
                        ])),
                    }),
                    statistics: MonsterStatistics {
                        attributes: vec![4, 0, 5, -8, 1, -2],
                        elite: true,
                        level: 1,
                        role: Role::Brute,
                        size: Size::Medium,
                    },
                    name: "Black bear".to_string(),
                }),
                animal(MonsterDef {
                    abilities: MonsterAbilities {
                        active_abilities: vec![
                            ActiveAbility::Strike(StrikeAbility::dual_strike(1, StandardWeapon::Claw.weapon())),
                            ActiveAbility::Strike(StrikeAbility::normal_strike(1, StandardWeapon::MonsterBite.weapon()).except_elite()),
                        ],
                        modifiers: ModifierBundle::Multipedal.modifiers(),
                        movement_speeds: None,
                        senses: vec![Sense::Scent],
                        trained_skills: vec![Skill::Awareness, Skill::Climb, Skill::Endurance, Skill::Swim],
                    },
                    narrative: Some(MonsterNarrative {
                        alignment: "Always true neutral".to_string(),
                        art: false,
                        description: Some("A brown bear's statistics can be used for almost any big bear, including a grizzly bear.".to_string()),
                        knowledge: Some(Knowledge::new(vec![
                            (0, "
                                Brown bears tend to be bad-tempered and territorial.
                            "),
                        ])),
                    }),
                    statistics: MonsterStatistics {
                        attributes: vec![5, 0, 6, -8, 1, 0],
                        elite: true,
                        level: 3,
                        role: Role::Brute,
                        size: Size::Large,
                    },
                    name: "Brown bear".to_string(),
                }),
            ],
        }
    ));

    monsters.push(MonsterEntry::Monster(animal(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![ActiveAbility::Strike(StrikeAbility::dual_strike(
                1,
                StandardWeapon::Claw.weapon(),
            ))],
            modifiers: ModifierBundle::Multipedal.modifiers(),
            movement_speeds: None,
            senses: vec![Sense::Scent],
            trained_skills: vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Flexibility,
                Skill::Stealth,
            ],
        },
        narrative: empty_narrative(),
        statistics: MonsterStatistics {
            attributes: vec![-7, 4, -3, -7, 2, -2],
            elite: false,
            level: 1,
            role: Role::Skirmisher,
            size: Size::Small,
        },
        name: "Cat".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(animal(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![
                ActiveAbility::Strike(StrikeAbility::normal_strike(1, Weapon::bite())),
            ],
            modifiers: ModifierBundle::Multipedal.modifiers(),
            movement_speeds: None,
            senses: vec![Sense::Scent],
            trained_skills: vec![
                Skill::Awareness,
            ],
        },
        narrative: Some(MonsterNarrative {
            alignment: "Always true neutral".to_string(),
            description: Some("
                These statistics can be used for any large dog or similar creature, such as an ordinary wolf.
            ".to_string()),
            art: false,
            knowledge: Some(Knowledge::new(vec![
                (0, "
                    Some dogs are trained to serve as steeds for halflings and gnomes.
                    Such riding dogs may be trained for combat, or may be only used for travel.
                "),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![0, 1, 0, -7, 2, -1],
            elite: false,
            level: 1,
            role: Role::Skirmisher,
            size: Size::Medium,
        },
        name: "Dog".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(animal(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![
                ActiveAbility::Strike(StrikeAbility {
                    effect: r"
                        The $name makes a $accuracy strike vs. Armor with its $weapon.
                        \hit $damage damage.
                        Each creature that loses hit points from this damage is poisoned by giant wasp venom.
                    ".to_string(),
                    name: "Venomous Stinger".to_string(),
                    weapon: StandardWeapon::MonsterStinger.weapon(),
                    ..Default::default()
                }),
                ActiveAbility::Custom(CustomAbility {
                    name: "Giant Wasp Venom".to_string(),
                    effect: r"
                        Giant wasp venom is an injury-based liquid \glossterm{poison}.
                        The poison's accuracy is $accuracy+1.
                        Its stage 1 effect makes the target \slowed while the poison lasts.
                        Its stage 3 effect also deals \damagerankthreelow.
                    ".to_string(),
                    tags: vec![AbilityTag::Poison],
                    usage_time: UsageTime::Triggered,
                    ..Default::default()
                }),
            ],
            modifiers: ModifierBundle::Multipedal.modifiers(),
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Fly(Some(120)), SpeedCategory::Fast)
            ]),
            senses: vec![Sense::Scent],
            trained_skills: vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Flexibility,
                Skill::Stealth,
            ],
        },
        narrative: Some(MonsterNarrative {
            alignment: "Always true neutral".to_string(),
            art: false,
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
        }),
        statistics: MonsterStatistics {
            attributes: vec![2, 5, 0, -8, 3, -2],
            elite: false,
            level: 1,
            role: Role::Skirmisher,
            size: Size::Large,
        },
        name: "Giant Wasp".to_string(),
    })));

    monsters.push(MonsterEntry::MonsterGroup(
        MonsterGroup {
            name: "Dire animals".to_string(),
            art: false,
            description: None,
            knowledge: None,
            monsters: vec![
                animal(MonsterDef {
                    abilities: MonsterAbilities {
                        active_abilities: vec![
                            // TODO: Should this inflict a disease?
                            ActiveAbility::Strike(StrikeAbility::normal_strike(1, StandardWeapon::MonsterBite.weapon())),
                        ],
                        modifiers: ModifierBundle::Multipedal.modifiers(),
                        movement_speeds: None,
                        senses: vec![Sense::Scent],
                        trained_skills: vec![Skill::Awareness, Skill::Climb, Skill::Stealth],
                    },
                    narrative: Some(MonsterNarrative {
                        alignment: "Always true neutral".to_string(),
                        art: true,
                        description: None,
                        knowledge: Some(Knowledge::new(vec![
                            (0, "
                                A dire rat is a Small omnivorous scavenger that resembles an unusually large rat.
                                Dire rats are not generally aggressive, but will attack to defend their nests and territories.
                            "),
                            (5, "
                                Dire rats can grow to be up to 3 feet long and weigh over 20 pounds.
                            "),
                        ])),
                    }),
                    statistics: MonsterStatistics {
                        attributes: vec![1, 4, 0, -9, 3, -2],
                        elite: false,
                        level: 1,
                        role: Role::Skirmisher,
                        size: Size::Small,
                    },
                    name: "Dire rat".to_string(),
                }),
                animal(MonsterDef {
                    abilities: MonsterAbilities {
                        active_abilities: vec![
                            ActiveAbility::Strike(StrikeAbility::normal_strike(1, StandardWeapon::MonsterBite.weapon())),
                        ],
                        modifiers: ModifierBundle::Multipedal.modifiers(),
                        movement_speeds: None,
                        senses: vec![Sense::Scent],
                        trained_skills: vec![Skill::Awareness],
                    },
                    narrative: Some(MonsterNarrative {
                        alignment: "Always true neutral".to_string(),
                        art: true,
                        description: None,
                        knowledge: Some(Knowledge::new(vec![
                            (0, "
                                A dire wolf is a wolf-like creature that is much larger than an ordinary wolf.
                                Their fur is usually mottled gray or black.
                                Dire wolves are efficient pack hunters that will kill anything they can catch.
                            "),
                        ])),
                    }),
                    statistics: MonsterStatistics {
                        attributes: vec![4, 4, 1, -7, 3, 0],
                        elite: false,
                        level: 6,
                        role: Role::Skirmisher,
                        size: Size::Large,
                    },
                    name: "Dire wolf".to_string(),
                }),
            ],
        }
    ));

    let horse_abilities = MonsterAbilities {
        active_abilities: vec![
            // Horses use a weak bite.
            ActiveAbility::Strike(StrikeAbility::normal_strike(
                1,
                StandardWeapon::Bite.weapon(),
            )),
        ],
        modifiers: ModifierBundle::Multipedal.modifiers(),
        movement_speeds: None,
        senses: vec![],
        trained_skills: vec![],
    };

    // Draft horses are unusually slow
    let mut draft_horse_abilities = horse_abilities.clone();
    draft_horse_abilities.movement_speeds = Some(vec![MovementSpeed {
        mode: MovementMode::Land,
        speed: SpeedCategory::Slow,
    }]);
    draft_horse_abilities.trained_skills.push(Skill::Endurance);

    monsters.push(MonsterEntry::MonsterGroup(
        MonsterGroup {
            name: "Horses".to_string(),
            art: false,
            description: None,
            knowledge: None,
            monsters: vec![
                animal(MonsterDef {
                    abilities: horse_abilities.clone(),
                    narrative: Some(MonsterNarrative {
                        alignment: "Always true neutral".to_string(),
                        description: None,
                        art: false,
                        knowledge: Some(Knowledge::new(vec![
                            (0, "
                                Light horses are typically used to carry riders, not to work or fight.
                            "),
                        ])),
                    }),
                    statistics: MonsterStatistics {
                        attributes: vec![2, 2, 2, -8, 0, -1],
                        elite: false,
                        level: 2,
                        role: Role::Skirmisher,
                        size: Size::Large,
                    },
                    name: "Light Horse".to_string(),
                }),
                animal(MonsterDef {
                    abilities: draft_horse_abilities,
                    narrative: Some(MonsterNarrative {
                        alignment: "Always true neutral".to_string(),
                        description: None,
                        art: false,
                        knowledge: Some(Knowledge::new(vec![
                            (0, "
                                Draft horses are typically used to work farms.
                                They are slower than light horses, but stronger.
                                They are the cheapest type of horse that is normally available.
                            "),
                        ])),
                    }),
                    statistics: MonsterStatistics {
                        attributes: vec![4, 1, 2, -8, 0, -1],
                        elite: false,
                        level: 2,
                        role: Role::Brute,
                        size: Size::Large,
                    },
                    name: "Draft Horse".to_string(),
                }),
                animal(MonsterDef {
                    abilities: horse_abilities.clone(),
                    narrative: Some(MonsterNarrative {
                        alignment: "Always true neutral".to_string(),
                        description: None,
                        art: false,
                        knowledge: Some(Knowledge::new(vec![
                            (0, "
                                Warhorses are trained to carry riders into battle.
                                They are superior to other types of horses, but more expensive.
                            "),
                        ])),
                    }),
                    statistics: MonsterStatistics {
                        attributes: vec![4, 2, 3, -8, 0, 0],
                        elite: false,
                        level: 3,
                        role: Role::Skirmisher,
                        size: Size::Large,
                    },
                    name: "Warhorse".to_string(),
                }),
            ],
        }
    ));

    monsters.push(MonsterEntry::Monster(animal(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![
                // Ponies use a weak bite.
                ActiveAbility::Strike(StrikeAbility::normal_strike(
                    1,
                    StandardWeapon::Bite.weapon(),
                )),
            ],
            modifiers: ModifierBundle::Multipedal.modifiers(),
            movement_speeds: None,
            senses: vec![],
            trained_skills: vec![Skill::Endurance],
        },
        narrative: None,
        statistics: MonsterStatistics {
            attributes: vec![2, 0, 3, -8, 1, 0],
            elite: false,
            level: 2,
            role: Role::Brute,
            size: Size::Medium,
        },
        name: "Camel".to_string(),
    })));

    // // TODO: add special "pick up stuff" ability
    // let roc = animal(FullAnimalDefinition {
    //     attributes: vec![6, 1, 4, -7, 4, -1],
    //     challenge_rating: ChallengeRating::Four,
    //     level: 9,
    //     name: "Roc".to_string(),
    //     size: Size::Gargantuan,
    //     weapons: vec![StandardWeapon::MonsterBite.weapon(), StandardWeapon::Talon.weapon()],
    //     description: None,
    //     knowledge: Some(Knowledge::new(vec![
    //         (0, "
    //             A roc is an incredibly strong bird with the ability to carry off horses.
    //             It is typically 30 feet long from the beak to the base of the tail, with a wingspan as wide as 80 feet.
    //             Its plumage is either dark brown or golden from head to tail.
    //         "),
    //         (5, "
    //             A roc attacks from the air, swooping earthward to snatch prey in its powerful talons and carry it off for itself and its young to devour.
    //             A solitary roc is typically hunting and will attack any Medium or larger creature that appears edible.
    //             A mated pair of rocs attack in concert, fighting to the death to defend their nests or hatchlings.
    //         "),
    //     ])),
    //     modifiers: None,
    //     movement_speeds: None,
    //     role: Role::Brute,
    //     senses: None,
    //     trained_skills: Some(vec![Skill::Awareness]),
    // });
    // monsters.push(MonsterEntry::Monster(roc));

    // let vampire_eel = animal(FullAnimalDefinition {
    //     attributes: vec![2, 4, 2, -8, 1, -1],
    //     challenge_rating: ChallengeRating::One,
    //     level: 6,
    //     name: "Vampire Eel".to_string(),
    //     size: Size::Medium,
    //     weapons: vec![StandardWeapon::MonsterBite.weapon()],
    //     description: None,
    //     knowledge: Some(Knowledge::new(vec![(
    //         0,
    //         "
    //             Vampire eels are slimy, snakelike carnivores.
    //             They swim through murky water, looking for edible creatures.
    //         ",
    //     )])),
    //     modifiers: None,
    //     movement_speeds: Some(vec![MovementSpeed::new(
    //         MovementMode::Swim,
    //         SpeedCategory::Normal,
    //     )]),
    //     role: Role::Skirmisher,
    //     senses: None,
    //     trained_skills: Some(vec![Skill::Swim]),
    // });
    // monsters.push(MonsterEntry::Monster(vampire_eel));

    // let dire_wolf = animal(FullAnimalDefinition {
    //     challenge_rating: ChallengeRating::One,
    //     level: 5,
    //     name: "Dire Wolf".to_string(),
    //     size: Size::Large,
    //     weapons: vec![StandardWeapon::MonsterBite.weapon()],
    //     description: None,
    //     modifiers: Some(ModifierBundle::Multipedal.modifiers()),
    //     movement_speeds: None,
    //     role: Role::Skirmisher,
    //     senses: Some(vec![Sense::Scent]),
    //     trained_skills: None,
    // });
    // monsters.push(MonsterEntry::Monster(dire_wolf));

    // monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
    //     attributes: vec![-8, 3, -4, -6, 2, -1],
    //     challenge_rating: ChallengeRating::One,
    //     level: 1,
    //     name: "Raven".to_string(),
    //     size: Size::Small,
    //     weapons: vec![StandardWeapon::Talon.weapon()],
    //     description: None,
    //     knowledge: None,
    //     modifiers: None,
    //     movement_speeds: Some(vec![MovementSpeed::new(
    //         MovementMode::Fly(None),
    //         SpeedCategory::Normal,
    //     )]),
    //     role: Role::Skirmisher,
    //     senses: None,
    //     trained_skills: Some(vec![Skill::Endurance]),
    // })));

    // let bombardier_beetle = animal(FullAnimalDefinition {
    //     attributes: vec![3, -1, 4, -9, 0, 1],
    //     challenge_rating: ChallengeRating::One,
    //     level: 7,
    //     name: "Giant Bombardier Beetle".to_string(),
    //     size: Size::Large,
    //     weapons: vec![StandardWeapon::MonsterBite.weapon()],
    //     description: None,
    //     knowledge: Some(Knowledge::new(vec![
    //         (0, "
    //             A giant bombardier beetle is an insect resembling a massive beetle.
    //             They feed primarily on carrion and offal, gathering heaps of the stuff in which they build nests and lay eggs.
    //         "),
    //         (5, "
    //             A typical adult giant bombardier beetle is about 6 feet long.
    //             Giant bombardier beetles normally attack only to defend themselves, their nests, or their eggs.
    //         "),
    //     ])),
    //     modifiers: Some(ModifierBundle::Multipedal.modifiers()),
    //     movement_speeds: None,
    //     role: Role::Brute,
    //     senses: None,
    //     trained_skills: Some(vec![Skill::Endurance]),
    // });
    // monsters.push(MonsterEntry::Monster(bombardier_beetle));

    // monsters.push(MonsterEntry::Monster(animal(FullAnimalDefinition {
    //     attributes: vec![4, 2, 4, -9, 2, -3],
    //     challenge_rating: ChallengeRating::One,
    //     description: None,
    //     knowledge: None,
    //     level: 3,
    //     modifiers: Some(ModifierBundle::Multipedal.plus_modifiers(vec![
    //         Modifier::Maneuver(Maneuver::GraspingStrike),
    //         Modifier::PassiveAbility(StandardPassiveAbility::Amphibious.ability()),
    //     ])),
    //     movement_speeds: Some(vec![
    //         MovementSpeed::new(MovementMode::Land, SpeedCategory::Slow),
    //         MovementSpeed::new(MovementMode::Swim, SpeedCategory::Normal),
    //     ]),
    //     name: "Crocodile".to_string(),
    //     role: Role::Brute,
    //     senses: Some(vec![Sense::Scent]),
    //     size: Size::Medium,
    //     trained_skills: Some(vec![Skill::Endurance, Skill::Stealth, Skill::Swim]),
    //     weapons: vec![StandardWeapon::MonsterBite.weapon()],
    // })));

    monsters
}
