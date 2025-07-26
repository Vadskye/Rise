use crate::core_mechanics::abilities::{
    AbilityTag, AbilityType, ActiveAbility, CustomAbility, StrikeAbility, UsageTime,
};
use crate::core_mechanics::DicePool;
use crate::core_mechanics::{
    MovementMode, MovementSpeed, Sense, Size, SpeedCategory, StandardPassiveAbility,
};
use crate::creatures::{Modifier, Monster};
use crate::equipment::{StandardWeapon, Weapon, WeaponTag};
use crate::monsters::creature_type::CreatureType;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::monster_group::MonsterGroup;
use crate::monsters::{MonsterAbilities, MonsterDef, MonsterNarrative, MonsterStatistics, Role};
use crate::skills::Skill;

fn humanoid(def: MonsterDef) -> Monster {
    def.monster(CreatureType::Humanoid)
}

pub fn humanoids() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Bandits".to_string(),
        art: false,
        description: None,
        knowledge: None,
        monsters: vec![
            humanoid(MonsterDef {
                name: "Army Deserter".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, Weapon::spear())),
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, StandardWeapon::HeavyCrossbow.weapon())),
                    ],
                    modifiers: vec![],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![
                        Skill::Endurance,
                    ],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually neutral evil".to_string(),
                    description: None,
                    art: true,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                            Army deserters have abandoned their past life in an army and struck out on their own.
                            Since the punishments for desertion are typically harsh, they have little to lose.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![2, 0, 2, 0, 1, 0],
                    elite: false,
                    level: 1,
                    role: Role::Warrior,
                    size: Size::Medium,
                },
            }),
            humanoid(MonsterDef {
                name: "Veteran Archer".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::armorpiercer(1, Weapon::longbow())),
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, Weapon::longbow())),
                    ],
                    trained_skills: vec![
                        Skill::Awareness,
                    ],
                    ..Default::default()
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually chaotic evil".to_string(),
                    description: None,
                    art: false,
                    knowledge: None,
                }),
                statistics: MonsterStatistics {
                    attributes: vec![2, 3, 0, 0, 4, 0],
                    elite: false,
                    level: 3,
                    role: Role::Sniper,
                    size: Size::Medium,
                },
            }),
            humanoid(MonsterDef {
                name: "Renegade Bolter".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Custom(CustomAbility {
                            name: "Arc".to_string(),
                            ability_type: AbilityType::Normal,
                            effect: r"
                                The $name makes a $accuracy+1 attack vs. Fortitude against something within \shortrange.
                                This attack \glossterm{chains} once.
                                \hit $dr1 damage.
                            ".to_string(),
                            is_magical: true,
                            tags: vec![AbilityTag::Electricity],
                            usage_time: UsageTime::Standard,
                        }),
                        ActiveAbility::Custom(CustomAbility {
                            name: "Lightning Bolt".to_string(),
                            ability_type: AbilityType::Normal,
                            effect: r"
                                The $name makes a $accuracy attack vs. Reflex against everything in a \largearealong, 5 ft. wide line from it.
                                \hit $dr1 damage.
                            ".to_string(),
                            is_magical: true,
                            tags: vec![AbilityTag::Electricity],
                            usage_time: UsageTime::Standard,
                        }),
                        ActiveAbility::Custom(CustomAbility {
                            name: "Stunning Discharge".to_string(),
                            ability_type: AbilityType::Normal,
                            effect: r"
                                The $name makes a $accuracy attack vs. Mental against all creatures in a \medarea radius from it.
                                \hit If the target has no remaining \glossterm{damage resistance}, it is \stunned as a \glossterm{condition}.
                                \critcondition
                            ".to_string(),
                            is_magical: true,
                            tags: vec![AbilityTag::Electricity],
                            usage_time: UsageTime::Standard,
                        }),
                    ],
                    modifiers: vec![],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![
                        Skill::Awareness,
                    ],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually neutral evil".to_string(),
                    description: None,
                    art: false,
                    knowledge: None,
                }),
                statistics: MonsterStatistics {
                    attributes: vec![0, 3, 0, 0, 3, 5],
                    elite: false,
                    level: 4,
                    role: Role::Mystic,
                    size: Size::Medium,
                },
            }),
        ],
    }));

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Cultists".to_string(),
        art: false,
        description: None,
        knowledge: None,
        monsters: vec![
            humanoid(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Custom(CustomAbility {
                            ability_type: AbilityType::Normal,
                            effect: r"
                                The $name makes a $accuracy attack vs. Fortitude against one living creature within \medrange.
                                \hit $dr1 damage.
                            ".to_string(),
                            is_magical: true,
                            name: "Drain Life".to_string(),
                            tags: vec![],
                            usage_time: UsageTime::Standard,
                        }),
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, StandardWeapon::Sickle.weapon())),
                    ],
                    modifiers: vec![],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![Skill::Endurance],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually lawful evil".to_string(),
                    art: false,
                    description: None,
                    knowledge: None,
                }),
                statistics: MonsterStatistics {
                    attributes: vec![0, 1, 2, -1, 0, 4],
                    elite: false,
                    level: 1,
                    role: Role::Mystic,
                    size: Size::Medium,
                },
                name: "Death Cultist".to_string(),
            }),
            humanoid(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Custom(CustomAbility {
                            ability_type: AbilityType::Normal,
                            effect: r"
                                The $name must have a free hand to cast this spell.

                                The $name makes a $accuracy attack vs. Reflex against something it \glossterm{touches}.
                                \hit $dr1 damage immediately, and again during the $name's next action.
                            ".to_string(),
                            is_magical: true,
                            name: "Burning Grasp".to_string(),
                            tags: vec![AbilityTag::Fire],
                            usage_time: UsageTime::Standard,
                        }),
                        ActiveAbility::Custom(CustomAbility {
                            ability_type: AbilityType::Normal,
                            effect: r"
                                The $name makes a $accuracy attack vs. Fortitude against one creature within \medrange.
                                \hit $dr1 damage. If the target loses hit points, it takes $dr1 damage again during the $name's next action.
                            ".to_string(),
                            is_magical: true,
                            name: "Pyrohemia".to_string(),
                            tags: vec![AbilityTag::Fire],
                            usage_time: UsageTime::Standard,
                        }),
                        ActiveAbility::Custom(CustomAbility {
                            ability_type: AbilityType::Normal,
                            effect: r"
                                The $name makes a $accuracy attack vs. Reflex against everything in a \medarea radius from it.
                                In addition, it suffers a glancing blow from this attack.
                                \hit $dr1 damage.
                            ".to_string(),
                            is_magical: true,
                            name: "Pyroclasm".to_string(),
                            tags: vec![AbilityTag::Fire],
                            usage_time: UsageTime::Standard,
                        }),
                        ActiveAbility::Strike(StrikeAbility::normal_strike(2, StandardWeapon::Club.weapon())),
                    ],
                    modifiers: vec![],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually chaotic evil".to_string(),
                    art: false,
                    description: None,
                    knowledge: None,
                }),
                statistics: MonsterStatistics {
                    attributes: vec![0, 2, 0, -1, 2, 5],
                    elite: false,
                    level: 4,
                    role: Role::Mystic,
                    size: Size::Medium,
                },
                name: "Pyromaniac".to_string(),
            }),
        ],
    }));

    fn goblin(name: &str, abilities: MonsterAbilities, statistics: MonsterStatistics) -> Monster {
        humanoid(MonsterDef {
            abilities,
            name: name.to_string(),
            narrative: Some(MonsterNarrative {
                alignment: "Usually chaotic evil".to_string(),
                art: false,
                description: None,
                knowledge: None,
            }),
            statistics,
        })
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Goblins".to_string(),
        art: true,
        description: None,
        knowledge: None,
        monsters: vec![
            goblin(
                "Goblin Warrior",
                MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, Weapon::spear())),
                        ActiveAbility::Strike(StrikeAbility::rushed_strike(1, Weapon::spear())),
                    ],
                    modifiers: vec![Modifier::buckler()],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![Skill::Awareness],
                },
                MonsterStatistics {
                    attributes: vec![-1, 4, 0, -2, 2, -2],
                    elite: false,
                    level: 1,
                    role: Role::Skirmisher,
                    size: Size::Medium,
                },
            ),
            goblin(
                "Goblin Wolf Rider",
                MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, Weapon::lance())),
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, Weapon::spear())),
                    ],
                    modifiers: vec![Modifier::buckler()],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![Skill::Ride],
                },
                MonsterStatistics {
                    attributes: vec![-1, 4, 0, -2, 2, -2],
                    elite: false,
                    level: 3,
                    role: Role::Skirmisher,
                    size: Size::Medium,
                },
            ),
            goblin(
                "Goblin Shaman",
                MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Custom(CustomAbility::divine_judgment(1)),
                        ActiveAbility::Strike(StrikeAbility::consecrated_strike(
                            1,
                            StandardWeapon::Spear.weapon(),
                        )),
                    ],
                    modifiers: vec![],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![Skill::Awareness],
                },
                MonsterStatistics {
                    attributes: vec![-1, 3, 0, -2, 2, 3],
                    elite: false,
                    level: 1,
                    role: Role::Mystic,
                    size: Size::Medium,
                },
            ),
        ],
    }));

    add_humans(&mut monsters);

    add_orcs(&mut monsters);

    add_lizardfolk(&mut monsters);

    monsters
}

pub fn add_humans(monsters: &mut Vec<MonsterEntry>) {
    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Townsfolk".to_string(),
        art: false,
        description: None,
        knowledge: None,
        monsters: vec![
            humanoid(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, StandardWeapon::Broadsword.weapon())),
                    ],
                    modifiers: vec![],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually lawful neutral".to_string(),
                    art: false,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                            Town guards are common throughout civilization.
                            This represents the sort of ordinary guard that would be found even in rural towns, not an elite bodyguard.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![1, 1, 1, 0, 0, 0],
                    elite: false,
                    level: 1,
                    role: Role::Warrior,
                    size: Size::Medium,
                },
                name: "Town Guard".to_string(),
            }),
            humanoid(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Custom(CustomAbility::inflict_wound(1)),
                        ActiveAbility::Custom(CustomAbility::restoration(1)),
                    ],
                    modifiers: vec![],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![Skill::Medicine],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Any".to_string(),
                    art: false,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                            Town healers are typically clerics or druids with some healing ability.
                            They may be prominent leaders of a temple, or they may prefer solitude, but it is rare to find a reasonably sized town that does not have a healer of some variety.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![0, 0, 0, 0, 3, 3],
                    elite: false,
                    level: 2,
                    role: Role::Mystic,
                    size: Size::Medium,
                },
                name: "Town Healer".to_string(),
            }),
        ],
    }));
}

pub fn add_lizardfolk(monsters: &mut Vec<MonsterEntry>) {
    struct LizardfolkAbilities {
        active_abilities: Vec<ActiveAbility>,
        modifiers: Vec<Modifier>,
        trained_skills: Vec<Skill>,
    }

    fn lizardfolk(
        name: &str,
        mut abilities: LizardfolkAbilities,
        statistics: MonsterStatistics,
    ) -> Monster {
        abilities.modifiers.push(Modifier::PassiveAbility(
            StandardPassiveAbility::Amphibious.ability(),
        ));
        humanoid(MonsterDef {
            abilities: MonsterAbilities {
                active_abilities: abilities.active_abilities,
                modifiers: abilities.modifiers,
                movement_speeds: Some(vec![
                    MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
                    MovementSpeed::new(MovementMode::Swim, SpeedCategory::Normal),
                ]),
                senses: vec![],
                trained_skills: abilities.trained_skills,
            },
            name: name.to_string(),
            narrative: Some(MonsterNarrative {
                alignment: "Usually true neutral".to_string(),
                art: false,
                description: None,
                knowledge: None,
            }),
            statistics,
        })
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Lizardfolk".to_string(),
        art: true,
        description: None,
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
                They prefer direct charges and massed rushes in battle, sometimes trying to force foes into the water, where the lizardfolk have an advantage.
                If lizardfolk are outnumbered or if their territory is being invaded, they set snares, plan ambushes, and make raids to hinder enemy supplies.
                Advanced tribes use more sophisticated tactics and have better traps and ambushes.
            "),
        ])),
        monsters: vec![
            lizardfolk(
                "Lizardfolk Grunt",
                LizardfolkAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, StandardWeapon::Spear.weapon())),
                        ActiveAbility::Strike(StrikeAbility::frenzied_strike(1, StandardWeapon::Bite.weapon())),
                    ],
                    modifiers: vec![
                        Modifier::reptile(),
                        Modifier::shield(),
                    ],
                    trained_skills: vec![
                        Skill::Swim,
                    ],
                },
                MonsterStatistics {
                    attributes: vec![2, 2, 4, -1, 1, 0],
                    elite: false,
                    level: 3,
                    role: Role::Warrior,
                    size: Size::Medium,
                },
            ),
            lizardfolk(
                "Lizardfolk Champion",
                LizardfolkAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(2, StandardWeapon::Spear.weapon())),
                        ActiveAbility::Strike(StrikeAbility::frenzied_strike(2, StandardWeapon::Bite.weapon())),
                        ActiveAbility::Strike(StrikeAbility::redeeming_followup(2, StandardWeapon::Spear.weapon())),
                    ],
                    modifiers: vec![
                        Modifier::reptile(),
                        Modifier::shield(),
                    ],
                    trained_skills: vec![
                        Skill::Swim,
                    ],
                },
                MonsterStatistics {
                    attributes: vec![3, 3, 5, 0, 1, 1],
                    elite: false,
                    level: 5,
                    role: Role::Warrior,
                    size: Size::Medium,
                },
            ),
        ],
    }));
}

pub fn add_orcs(monsters: &mut Vec<MonsterEntry>) {
    struct OrcAbilities {
        active_abilities: Vec<ActiveAbility>,
        modifiers: Vec<Modifier>,
        trained_skills: Vec<Skill>,
    }

    fn orc(
        name: &str,
        knowledge: Knowledge,
        mut abilities: OrcAbilities,
        statistics: MonsterStatistics,
    ) -> Monster {
        abilities.trained_skills.push(Skill::Endurance);
        humanoid(MonsterDef {
            abilities: MonsterAbilities {
                active_abilities: abilities.active_abilities,
                modifiers: abilities.modifiers,
                movement_speeds: None,
                senses: vec![Sense::Darkvision(60)],
                trained_skills: abilities.trained_skills,
            },
            name: name.to_string(),
            narrative: Some(MonsterNarrative {
                alignment: "Usually lawful evil".to_string(),
                art: false,
                description: None,
                knowledge: Some(knowledge),
            }),
            statistics,
        })
    }

    // like a greatsword
    let cleaver = Weapon {
        accuracy: 0,
        damage_dice: DicePool::d8(),
        name: "Butcher's Cleaver".to_string(),
        tags: vec![WeaponTag::Heavy, WeaponTag::Sweeping(2)],
    };

    let mut chief_battle_command = CustomAbility::battle_command(3);
    chief_battle_command.usage_time = UsageTime::Elite;

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Orcs".to_string(),
        art: false,
        description: None,
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
            orc(
                "Orc Peon",
                Knowledge::new(vec![
                    (0, "
                        Orc peons are the weakest warrior that orc clans field in battle.
                        They have the lowest status of any adult in orc society.
                        Peons are typically fresh recruits who have not yet been fully incorporated into an orc army.
                    "),
                ]),
                OrcAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, StandardWeapon::Greataxe.weapon())),
                    ],
                    modifiers: vec![],
                    trained_skills: vec![],
                },
                MonsterStatistics {
                    attributes: vec![4, 0, 1, -2, 0, 0],
                    elite: false,
                    level: 1,
                    role: Role::Brute,
                    size: Size::Medium,
                },
            ),
            orc(
                "Orc Grunt",
                Knowledge::new(vec![
                    (0, "
                        Orc grunts are the standard warrior that orc clans field in battle.
                    "),
                ]),
                OrcAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, StandardWeapon::Greataxe.weapon())),
                        ActiveAbility::Strike(StrikeAbility::power_strike(1, StandardWeapon::Greataxe.weapon())),
                    ],
                    modifiers: vec![],
                    trained_skills: vec![],
                },
                MonsterStatistics {
                    attributes: vec![5, 0, 2, -2, 0, 0],
                    elite: false,
                    level: 2,
                    role: Role::Brute,
                    size: Size::Medium,
                },
            ),
            orc(
                "Orc Butcher",
                Knowledge::new(vec![
                    (0, "
                        Orc butchers usually run the field kitchens in orc armies.
                        They tend to be smarter than the average orc warrior, but are no less ferocious when challenged.
                    "),
                ]),
                OrcAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, cleaver.clone())),
                        ActiveAbility::Strike(StrikeAbility::bloodletting_strike(1, cleaver.clone())),
                    ],
                    modifiers: vec![],
                    trained_skills: vec![],
                },
                MonsterStatistics {
                    attributes: vec![5, 1, 2, 0, 0, 0],
                    elite: false,
                    level: 3,
                    role: Role::Brute,
                    size: Size::Medium,
                },
            ),
            orc(
                "Orc Veteran",
                Knowledge::new(vec![
                    (0, "
                        Orc veterans are battle-hardened elite warriors who are deadly at any range.
                        They often serve as bodyguards to orc chieftains or as devastating shock troops in battle.
                    "),
                ]),
                OrcAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(2, StandardWeapon::Greataxe.weapon())),
                        ActiveAbility::Strike(StrikeAbility::power_strike(2, StandardWeapon::Greataxe.weapon())),
                        ActiveAbility::Strike(StrikeAbility::heartpiercer(2, StandardWeapon::Longbow.weapon())),
                    ],
                    modifiers: vec![],
                    trained_skills: vec![],
                },
                MonsterStatistics {
                    attributes: vec![6, 0, 3, -2, 1, 1],
                    elite: false,
                    level: 5,
                    role: Role::Brute,
                    size: Size::Medium,
                },
            ),
            orc(
                "Orc Clan Chief",
                Knowledge::new(vec![
                    (0, "
                        Orc clan chiefs are the among the most powerful orc warriors.
                        Even the lowest clan chief commands hundreds of powerful orc warriors, plus at least as many noncombatants.
                    "),
                ]),
                OrcAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::distant_shot(2, StandardWeapon::Longbow.weapon())),
                        ActiveAbility::Strike(StrikeAbility::guardbreaker(3, StandardWeapon::Greataxe.weapon())),
                        ActiveAbility::Strike(StrikeAbility::hamstring(2, StandardWeapon::Greataxe.weapon())),
                        ActiveAbility::Strike(StrikeAbility::power_strike(2, StandardWeapon::Greataxe.weapon())),
                        ActiveAbility::Custom(chief_battle_command),
                    ],
                    modifiers: vec![],
                    trained_skills: vec![],
                },
                MonsterStatistics {
                    attributes: vec![6, 0, 4, 0, 2, 3],
                    elite: true,
                    level: 6,
                    role: Role::Leader,
                    size: Size::Medium,
                },
            ),
            orc(
                "Orc Shaman",
                Knowledge::new(vec![
                    (0, "
                        Orc shamans provide orc battle squads with divine magical support.
                        They primarily aid their allies, though they have no fear of taking up arms themselves when necessary.
                    "),
                    (5, "
                        If an orc shaman proves their mettle and wisdom in combat, they may eventually become a trusted advisor to a clan chief.
                        The advice and spiritual guidance of a capable shaman often has more influence on the success of an orc clan than mere strength of arms, and good clan chiefs recognize that fact.
                    "),
                ]),
                OrcAbilities {
                    active_abilities: vec![
                        ActiveAbility::Custom(CustomAbility::divine_judgment(1)),
                        ActiveAbility::Custom(CustomAbility::true_strike(1)),
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, StandardWeapon::Battleaxe.weapon())),
                    ],
                    modifiers: vec![],
                    trained_skills: vec![],
                },
                MonsterStatistics {
                    attributes: vec![4, 1, 1, -1, 1, 4],
                    elite: false,
                    level: 2,
                    role: Role::Leader,
                    size: Size::Medium,
                },
            ),
        ],
    }));
}
