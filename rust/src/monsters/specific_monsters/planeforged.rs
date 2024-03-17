use crate::core_mechanics::abilities::{
    AbilityTag, AbilityType, ActiveAbility, CustomAbility, StrikeAbility, UsageTime,
};
use crate::core_mechanics::attacks::{Maneuver, StandardAttack};
use crate::core_mechanics::{
    DamageType, Debuff, FlightManeuverability, MovementMode, MovementSpeed, PassiveAbility, Sense,
    Size, SpecialDefenseType, SpeedCategory,
};
use crate::creatures::{calculate_standard_rank, Modifier, ModifierBundle, Monster};
use crate::equipment::{StandardWeapon, Weapon, WeaponMaterial};
use crate::monsters::creature_type::CreatureType;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::monster_group::MonsterGroup;
use crate::monsters::{MonsterAbilities, MonsterDef, MonsterNarrative, MonsterStatistics, Role};
use crate::skills::Skill;

fn planeforged(def: MonsterDef) -> Monster {
    def.monster(CreatureType::Planeforged)
}

pub fn planeforgeds() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    add_angels(&mut monsters);

    add_demons(&mut monsters);

    add_formians(&mut monsters);

    add_elementals(&mut monsters);

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Imps".to_string(),
        art: false,
        description: None,
        knowledge: None,
        monsters: vec![planeforged(MonsterDef {
            abilities: MonsterAbilities {
                active_abilities: vec![ActiveAbility::Strike(StrikeAbility {
                    effect: r"
                            The $name makes two $accuracy strikes vs. armor with its $weapons.
                            \hit $damage bludgeoning and fire damage.
                        "
                    .to_string(),
                    name: "Flaming Flurry".to_string(),
                    weapon: Weapon::fist(),
                    ..Default::default()
                })],
                modifiers: vec![Modifier::vulnerable_damage(DamageType::Cold)],
                movement_speeds: None,
                senses: vec![],
                trained_skills: vec![],
            },
            narrative: Some(MonsterNarrative {
                alignment: "Always chaotic evil".to_string(),
                art: true,
                description: None,
                knowledge: None,
            }),
            statistics: MonsterStatistics {
                attributes: vec![3, 5, 2, 1, 0, -2],
                elite: false,
                level: 5,
                role: Role::Skirmisher,
                size: Size::Small,
            },
            name: "Flamefist Imp".to_string(),
        })],
    }));

    monsters
}

fn add_angels(monsters: &mut Vec<MonsterEntry>) {
    fn angel(mut def: MonsterDef) -> Monster {
        let rank = calculate_standard_rank(def.statistics.level);
        let teleport_range = if rank >= 7 {
            "\\extrange"
        } else if rank >= 5 {
            "\\distrange"
        } else if rank >= 3 {
            "\\longrange"
        } else {
            "\\medrange"
        };

        let modifiers = &mut def.abilities.modifiers;
        modifiers.push(Modifier::Immune(SpecialDefenseType::Debuff(
            Debuff::Frightened("".to_string()),
        )));
        modifiers.push(Modifier::Immune(SpecialDefenseType::Debuff(
            Debuff::Panicked("".to_string()),
        )));
        modifiers.push(Modifier::Attack(
            StandardAttack::DivineJudgment(rank).attack(),
        ));
        modifiers.push(Modifier::Attack(StandardAttack::WordOfFaith(rank).attack()));
        modifiers.push(Modifier::ActiveAbility(ActiveAbility::Custom(
            CustomAbility {
                ability_type: AbilityType::Normal,
                effect: format!(
                    "
                    The $name teleports horizontally into an unoccupied location within {range}.
                    If the destination is invalid, this ability fails with no effect.
                ",
                    range = teleport_range,
                ),
                is_magical: true,
                name: "Divine Translocation".to_string(),
                tags: vec![],
                usage_time: UsageTime::Elite,
            },
        )));
        modifiers.push(Modifier::PassiveAbility(PassiveAbility {
            description: format!("
                The $name can perform any ritual of rank {} or lower from the \\sphere{{channel divinity}} or \\sphere{{prayer}} mystic spheres.
                It does not need to expend material components or increase its \\glossterm{{fatigue level}} to perform those ritauls.
            ", rank),
            is_magical: true,
            name: "Divine Rituals".to_string(),
        }));

        if def.abilities.movement_speeds.is_none() {
            def.abilities.movement_speeds = Some(vec![
                MovementSpeed::new(
                    MovementMode::Fly(FlightManeuverability::Perfect),
                    SpeedCategory::Fast,
                ),
                MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
            ])
        }

        def.abilities.senses.push(Sense::LowLightVision);

        planeforged(def)
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Angels".to_string(),
        art: false,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (-5, "
                Angels are the ultimate champions of good in the endless battle of good and evil.
                They are native to the Celestial Heavens, and they often serve the interests of good-aligned deities.
            "),
            (0, "
                All angels have a striking and highly memorable appearance that evokes strong emotions in most viewers.
                Most angels evoke an overpowering sense of awe and beauty, but individual angels may have highly varied appearances.
            "),
            (5, "
                In battle, angels are feared for their fundamental perfection.
                They tend not to have any weaknesses for attackers to use against them.
                Their only true foes are demons, who use overwhelming hordes rather than any clever tactics.
            "),
        ])),
        monsters: vec![
            angel(MonsterDef {
                name: "Seraph".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![],
                    modifiers: vec![
                        Modifier::Attack(StandardAttack::Combustion(6).attack()),
                        Modifier::Attack(
                            Maneuver::Tenderize
                                .attack(StandardWeapon::MonsterRam.weapon(), 6)
                                .except_hit_damage(|w| w.damage_types.push(DamageType::Fire)),
                        ),
                    ],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![
                        Skill::Awareness,
                        Skill::Endurance,
                    ],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Always neutral good".to_string(),
                    art: true,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                            Seraphim are six-winged angels of immense power.
                            They burn with holy fire, which they use to immolate evildoers.
                            A seraph resembles a massive serpent that leaves a trail of fire as it flies.
                        "),
                        (5, "
                            Despite their serpentine appearance, seraphim have beautiful singing voices.
                            They sing almost constaintly both in and out of combat.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![5, 6, 4, 4, 4, 8],
                    elite: true,
                    level: 16,
                    role: Role::Mystic,
                    size: Size::Huge,
                },
            }),
            angel(MonsterDef {
                name: "Justicar".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![],
                    // weapons: vec![
                    //     StandardWeapon::Greatsword.weapon()
                    //         .except(|w| w.damage_types.push(DamageType::Energy)),
                    // ],
                    modifiers: vec![
                        Modifier::Maneuver(
                            Maneuver::DoubleStrike
                        ),
                    ],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![
                        Skill::Awareness,
                        Skill::Deduction,
                        Skill::Endurance,
                        Skill::Intimidate,
                        Skill::SocialInsight,
                    ],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Always lawful good".to_string(),
                    art: true,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                            Justicars enforce justice on good-aligned planes.
                            They are extremely skilled at identifying the truth of any situation, and act to deal justice however they see fit.
                            Physically, a justicar appears similar to a large human with strong muscles and a constantly stern expression.
                        "),
                        (5, "
                            In rare circumstances, justicars may leave good-aligned planes to pursue those they see as exceptionally heinous criminals.
                            Generally, this requires that the perpetrator committed a direct offense against a good deity or desecrated an area of a good-aligned plane.
                            Justicars have no interest in mortal matters or minor crimes.
                        "),
                        (10, "
                            Once, a group of thugs and murderers broke through a magic seal guarding an ancient wizard's tower, intending to loot everything inside.
                            They were shocked when a justicar suddenly appeared in front of them, and prepared to fight for their lives.
                            However, the justicar ignored them.
                            Instead, it killed the ancient wizard of the tower and disappeared, leaving the spoils to the evildoers who broke the seal.

                            This is the morality of a justicar.
                            They consider only truly immense evils to be worthy of their attention, and ignore all lesser sins.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![5, 5, 5, 4, 6, 6],
                    elite: true,
                    level: 14,
                    size: Size::Large,
                    role: Role::Mystic,
                },
            }),
            angel(MonsterDef {
                name: "Ophan".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![],
                    modifiers: vec![
                        Modifier::Attack(StandardAttack::Pyroclasm(5).attack()),
                        Modifier::Attack(
                            Maneuver::Whirlwind
                                .attack(Weapon::ram(), 5)
                                .except_hit_damage(|w| w.damage_types.push(DamageType::Fire)),
                        ),
                    ],
                    movement_speeds: Some(vec![
                        MovementSpeed::new(
                            MovementMode::Fly(FlightManeuverability::Perfect),
                            SpeedCategory::Fast,
                        ),
                        MovementSpeed::new(MovementMode::Land, SpeedCategory::Fast),
                    ]),
                    senses: vec![],
                    trained_skills: vec![
                        Skill::Awareness,
                        Skill::Endurance,
                    ],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Always neutral good".to_string(),
                    art: true,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                            Ophanim resemble burning wheels rimmed with many eyes.
                            They serve as sentries and guardians of planar portals in good-aligned planes.
                            In combat, they spin into a raging whirlwind.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![4, 5, 7, 4, 4, 6],
                    elite: true,
                    level: 12,
                    size: Size::Large,
                    role: Role::Mystic,
                },
            }),
        ],
    }));
}

fn add_demons(monsters: &mut Vec<MonsterEntry>) {
    let _fire_immunity = Modifier::Immune(SpecialDefenseType::Damage(DamageType::Fire));

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Demonspawn".to_string(),
        art: false,
        description: None,
        // TODO: give demonspawn a more coherent narrative identity distinct from "demons"?
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Demonspawn are infernal beings that live in the Abyss.
                They are the weakest and least intelligent type of demon, but they are still dangerous to mortals.
            "),
            (5, "
                Demonspawn were formed in the torturous flames of the Abyss.
                They all share an immunity to fire.
            "),
        ])),
        monsters: vec![
            planeforged(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: vec![],
                    // weapons: vec![
                    //     StandardWeapon::MonsterBite.weapon(),
                    //     StandardWeapon::Claws.weapon(),
                    // ],
                    modifiers: vec![
                        Modifier::Attack(StandardAttack::Enrage(2).attack()),
                        Modifier::Maneuver(Maneuver::PowerStrike),
                        Modifier::Vulnerable(SpecialDefenseType::AbilityTag(
                            AbilityTag::Emotion,
                        )),
                    ],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![
                        Skill::Endurance,
                    ],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Always chaotic evil".to_string(),
                    art: true,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                            Rageborn demons are anger personified.
                            They lash out constantly and violently at everything around them.
                            If they are left alone, they simply destroy their environment.
                        "),
                        (5, "
                            Since rageborn demons normally feel only anger, they have little experience with other emotions.
                            This makes them easy to mislead with magical effects that manipulate their emotions.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![8, 3, 2, -4, 2, 4],
                    elite: true,
                    level: 5,
                    role: Role::Brute,
                    size: Size::Large,
                },

                name: "Rageborn Demon".to_string(),
            }),
            planeforged(MonsterDef {
                name: "Painborn Demon".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::grappling_strike(Weapon::claw()).except_dual_strike()),
                        ActiveAbility::Custom(CustomAbility {
                            effect: r"
                                Whenever a creature attacks the $name with a melee strike using a non-Long weapon, it risks being impaled by spikes.
                                The $name makes an $accuracy \glossterm{reactive attack} vs. Armor against the creature that attacked it.
                                \hit $dr1 piercing damage.
                            ".to_string(),
                            is_magical: false,
                            name: "Spiked Body".to_string(),
                            usage_time: UsageTime::Triggered,
                            ..Default::default()
                        }),
                    ],
                    modifiers: vec![
                        Modifier::Vulnerable(SpecialDefenseType::AbilityTag(
                            AbilityTag::Compulsion,
                        )),
                    ],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![
                        Skill::Endurance,
                    ],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Always neutral evil".to_string(),
                    art: true,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                            Painborn demons are pain personified.
                            They are covered in spikes that pierce their own skin, shifting and causing them pain whenever they move.
                            These unfortunate creatures suffer continously, and they try to share that suffering with anything around them.
                        "),
                        (5, "
                            Painborn demons have a hidden desire that most of them do not even consciously realize: the desire to give up control.
                            Fighting through their constant pain is mentally taxing.
                            Magical effects that compel their actions, freeing them from the burden of choice, are their greatest weakness.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![4, 2, 8, -4, 1, 1],
                    elite: true,
                    level: 7,
                    role: Role::Warrior,
                    size: Size::Medium,
                },
            }),
            planeforged(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: vec![],
                    modifiers: vec![
                        Modifier::Attack(StandardAttack::Combustion(6).attack()),
                        Modifier::Attack(StandardAttack::Pyroclasm(6).attack()),
                        Modifier::Attack(StandardAttack::Pyrohemia(6).attack()),
                        Modifier::Attack(StandardAttack::Ignition(6).attack()),
                        Modifier::Vulnerable(SpecialDefenseType::WeaponMaterial(WeaponMaterial::ColdIron)),
                    ],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Always chaotic evil".to_string(),
                    art: true,
                    description: None,
                    knowledge: None,
                }),
                statistics: MonsterStatistics {
                    attributes: vec![3, 2, 3, 2, 6, 6],
                    elite: true,
                    level: 13,
                    role: Role::Sniper,
                    size: Size::Large,
                },
                name: "Soulfire Demon".to_string(),
            }),
        ],
    }));
}

fn add_elementals(monsters: &mut Vec<MonsterEntry>) {
    struct AirElemental {
        attributes: Vec<i32>,
        level: i32,
        name: String,
        size: Size,
    }

    impl AirElemental {
        fn monster(self) -> Monster {
            let rank = calculate_standard_rank(self.level);
            let mut modifiers = vec![];
            modifiers.push(Modifier::Vulnerable(SpecialDefenseType::Damage(
                DamageType::Electricity,
            )));
            modifiers.push(Modifier::PassiveAbility(PassiveAbility {
                description: "
                    The $name gains a +2 bonus to its defenses against ranged strikes.
                "
                .to_string(),
                is_magical: true,
                name: "Wind Screen".to_string(),
            }));
            if rank >= 2 {
                modifiers.push(Modifier::Attack(StandardAttack::Windslash(rank).attack()));
            }
            if rank >= 3 {
                modifiers.push(Modifier::Attack(StandardAttack::Windsnipe(rank).attack()));
            }

            let knockdown_ability = if rank >= 3 {
                StrikeAbility::knockdown_plus(rank, Weapon::monster_punch()).except_dual_strike()
            } else {
                StrikeAbility::knockdown(rank, Weapon::monster_punch()).except_dual_strike()
            };
            planeforged(MonsterDef {
                name: self.name,
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(knockdown_ability),
                        ActiveAbility::Strike(
                            StrikeAbility::generic_weapon_damage(rank, Weapon::monster_punch())
                                .except_dual_strike(),
                        ),
                    ],
                    modifiers,
                    movement_speeds: Some(vec![MovementSpeed::new(
                        MovementMode::Land,
                        SpeedCategory::Fast,
                    )]),
                    senses: vec![],
                    trained_skills: vec![],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually true neutral".to_string(),
                    art: false,
                    description: None,
                    knowledge: None,
                }),
                statistics: MonsterStatistics {
                    attributes: self.attributes,
                    elite: false,
                    level: self.level,
                    size: self.size,
                    role: Role::Skirmisher,
                },
            })
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Air Elementals".to_string(),
        art: true,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Air elementals are formed from the pure essence of the Plane of Air.
                They can fly through the air with agile ease, but they tend to be physically frail.
            "),
            (5, "
                Air elementals have no insulation in their wispy bodies, making them vulnerable to electrical attacks.
            "),
        ])),
        monsters: vec![
            AirElemental {
                attributes: vec![2, 5, 0, -3, 2, 0],
                level: 4,
                name: "Breeze".to_string(),
                size: Size::Small,
            }
            .monster(),
            AirElemental {
                attributes: vec![4, 6, 0, -2, 3, 0],
                level: 8,
                name: "Gale".to_string(),
                size: Size::Medium,
            }
            .monster(),
            AirElemental {
                attributes: vec![4, 7, 0, -2, 4, 0],
                level: 12,
                name: "Tempest".to_string(),
                size: Size::Large,
            }
            .monster(),
            AirElemental {
                attributes: vec![4, 8, 1, -2, 4, 0],
                level: 16,
                name: "Tornado".to_string(),
                size: Size::Large,
            }
            .monster(),
            AirElemental {
                attributes: vec![4, 9, 1, -2, 4, 0],
                level: 20,
                name: "Elder".to_string(),
                size: Size::Huge,
            }
            .monster(),
        ],
    }));

    struct FireElemental {
        attributes: Vec<i32>,
        level: i32,
        name: String,
        size: Size,
    }

    impl FireElemental {
        fn monster(self) -> Monster {
            let rank = calculate_standard_rank(self.level);
            let mut modifiers = vec![];
            modifiers.push(Modifier::vulnerable_damage(DamageType::Cold));
            modifiers.push(Modifier::Attack(StandardAttack::Combustion(rank).attack()));
            modifiers.push(Modifier::Attack(StandardAttack::Firebolt(rank).attack()));
            if rank >= 3 {
                modifiers.push(Modifier::Attack(StandardAttack::Ignition(rank).attack()));
                modifiers.push(Modifier::Attack(StandardAttack::Fireball(rank).attack()));
            }
            planeforged(MonsterDef {
                abilities: MonsterAbilities {
                    // TODO: no strikes, only touch attacks
                    active_abilities: vec![],
                    modifiers,
                    movement_speeds: Some(vec![MovementSpeed::new(
                        MovementMode::Land,
                        SpeedCategory::Fast,
                    )]),
                    senses: vec![],
                    trained_skills: vec![],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually true neutral".to_string(),
                    art: false,
                    description: None,
                    knowledge: None,
                }),
                statistics: MonsterStatistics {
                    attributes: self.attributes,
                    elite: false,
                    level: self.level,
                    size: self.size,
                    role: Role::Skirmisher,
                },

                // From self
                name: self.name,
            })
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Fire Elementals".to_string(),
        art: true,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Fire elementals are formed from the pure essence of the Plane of Fire.
                They tend to be fast and agile, and they burn their opponents to ash in combat.
            "),
            (5, "
                Fire elementals burn fast and bright, with little insulation from their surroundings.
                This makes them vulnerable to cold attacks, which can chill their very core.
            "),
        ])),
        monsters: vec![
            FireElemental {
                attributes: vec![2, 4, 0, -3, 0, 2],
                level: 4,
                name: "Ember".to_string(),
                size: Size::Small,
            }
            .monster(),
            FireElemental {
                attributes: vec![4, 5, 0, -2, 0, 2],
                level: 8,
                name: "Kindled".to_string(),
                size: Size::Medium,
            }
            .monster(),
            FireElemental {
                attributes: vec![5, 6, 0, -2, 0, 3],
                level: 12,
                name: "Bonfire".to_string(),
                size: Size::Large,
            }
            .monster(),
            FireElemental {
                attributes: vec![6, 6, 2, 1, 2, 3],
                level: 16,
                name: "Inferno".to_string(),
                size: Size::Large,
            }
            .monster(),
            FireElemental {
                attributes: vec![7, 7, 2, 2, 2, 4],
                level: 20,
                name: "Elder".to_string(),
                size: Size::Huge,
            }
            .monster(),
        ],
    }));

    struct MagmaElemental {
        attributes: Vec<i32>,
        level: i32,
        modifiers: Vec<Modifier>,
        name: String,
        size: Size,
    }

    impl MagmaElemental {
        fn monster(mut self) -> Monster {
            self.modifiers
                .push(Modifier::vulnerable_damage(DamageType::Piercing));
            self.modifiers
                .push(Modifier::impervious_damage(DamageType::Cold));

            let _ram = Weapon::ram().except(|w| w.damage_types.push(DamageType::Fire));
            planeforged(MonsterDef {
                name: self.name,
                abilities: MonsterAbilities {
                    active_abilities: vec![],
                    modifiers: self.modifiers,
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually true neutral".to_string(),
                    art: false,
                    description: None,
                    knowledge: None,
                }),
                statistics: MonsterStatistics {
                    attributes: self.attributes,
                    elite: false,
                    level: self.level,
                    size: self.size,
                    role: Role::Brute,
                },
            })
        }
    }

    fn generate_magma_throw(rank: i32) -> Modifier {
        Modifier::Attack(
            StandardAttack::Firebolt(rank)
                .attack()
                .except(|a| a.name = "Magma Throw".to_string())
                .except(|a| a.is_magical = false)
                .except_hit_damage(|d| d.damage_types.push(DamageType::Bludgeoning)),
        )
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Magma Elementals".to_string(),
        art: true,
        description: None,
        knowledge: Some(Knowledge::new(vec![(
            0,
            "
                Magma elementals are a fusion of the Plane of Earth and the Plane of Fire.
                They combine the durability of earth elementals with some of the agility of fire elementals.
                Their outer shell appears rocky, but inside that shell they hold molten rock at incredible temperatures.
            ",
        ), (
            5,
            "
                Magma elementals lack the usual weaknesses of both fire elementals and earth elementals.
                Their massive internal heat, shielded from outside attack, actually makes them less vulnerable to cold.
                However, piercing attacks can penetrate their outer shell, causing the magma inside to spew out until it cools.
            ",
        )])),
        monsters: vec![
            MagmaElemental {
                attributes: vec![4, 4, 7, -4, 0, 0],
                level: 6,
                modifiers: vec![
                    Modifier::Attack(StandardAttack::Combustion(2).attack()),
                    generate_magma_throw(2),
                ],
                name: "Volcanite".to_string(),
                size: Size::Medium,
            }
            .monster(),
            MagmaElemental {
                attributes: vec![5, 5, 8, -3, 0, 0],
                level: 12,
                modifiers: vec![
                    Modifier::Attack(StandardAttack::Combustion(4).attack()),
                    generate_magma_throw(4),
                ],
                name: "Volcano".to_string(),
                size: Size::Large,
            }
            .monster(),
            MagmaElemental {
                attributes: vec![5, 5, 9, -3, 0, 0],
                level: 18,
                modifiers: vec![
                    Modifier::Attack(StandardAttack::Combustion(6).attack()),
                    generate_magma_throw(6),
                ],
                name: "Volcanic Titan".to_string(),
                size: Size::Huge,
            }
            .monster(),
        ],
    }));
}

fn add_formians(monsters: &mut Vec<MonsterEntry>) {
    fn formian(mut def: MonsterDef) -> Monster {
        let rank = calculate_standard_rank(def.statistics.level);
        let tremorsense_radius = if rank >= 7 {
            480
        } else if rank >= 5 {
            240
        } else if rank >= 3 {
            120
        } else {
            60
        };
        let tremorsight_radius = tremorsense_radius / 4;
        def.abilities
            .senses
            .push(Sense::Tremorsense(tremorsense_radius));
        def.abilities
            .senses
            .push(Sense::Tremorsight(tremorsight_radius));

        let modifiers = &mut def.abilities.modifiers;
        modifiers.push(Modifier::PassiveAbility(PassiveAbility {
            description: r"
                All formians within 50 miles of their queen are in constant telepathic communication with her, regardless of any intervening physical obstacles.
                They instantaneously share information about threats and discoveries.
                This allows formians to usually respond to new information intelligently and in perfect unison, regardless of each formian's individual intelligence.
            ".to_string(),
            is_magical: true,
            name: "Hive Mind".to_string(),
        }));
        modifiers.push(Modifier::Immune(SpecialDefenseType::Damage(
            DamageType::Fire,
        )));
        modifiers.append(&mut ModifierBundle::SimpleMinded.modifiers());
        modifiers.append(&mut ModifierBundle::Multipedal.modifiers());

        planeforged(def)
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Formians".to_string(),
        art: true,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Formians are ant-like inhabitants native to Ordus, the Aligned Plane of law.
                They share a hive mind that allows telepathic communication at great distances.
            "),
            (5, "
                All formians can sense their surroundings instinctively by feeling tremors in the ground.
                Most formians are simple drones with no independent thought or agency; they act only as directed by their queen.
                As a result, they fight with no concern for their own lives, serving only the greater good of the group.
                They may still retreat to avoid expending unnecessary resources on a battle that is already lost.
            "),
            (10, "
                Formians often attempt to set up colonies in unclaimed locations on other planes to expand their influence, though they never attack civilizations or sentient creatures to do so.
                Once they have established their colonies, they consider themselves to have a rightful claim to that land, and they can be highly territorial.

                If a formian queen is killed, all formians it was controlling immediately become inert, taking no actions of any kind.
                These isolated formians typically die of dehydration or similar causes, though in rare cases they may be claimed by another formian queen.
            "),
        ])),
        monsters: vec![
            formian(MonsterDef {
                name: "Worker".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, Weapon::bite())),
                    ],
                    modifiers: vec![],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![
                        Skill::Craft,
                    ],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Always lawful neutral".to_string(),
                    art: false,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                            Workers are the basic building blocks of formian society.
                            A typical worker is about 3 feet long and about 2-1/2 feet high at the front.
                            Its hands are suitable only for manual labor.
                        "),
                        (5, "
                            Individual workers are simple-minded, but they are given instructions by the hive mind.
                            Even the smallest formian colony typically has hundreds of workers, and larger colonies can have tens of thousands.
                            Workers are generally given orders by a formian queen in groups of at least five, and it is rare to see an individual worker on its own.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![1, 3, -1, -2, 0, -2],
                    elite: false,
                    level: 1,
                    role: Role::Skirmisher,
                    size: Size::Medium,
                },
            }),
            formian(MonsterDef {
                name: "Drone".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility {
                            effect: "
                                The $name makes a $accuracy attack vs. Armor with its $weapon.
                                \\hit $fullweapondamage.
                                If the target loses hit points, it is poisoned by drone venom.
                            ".to_string(),
                            is_magical: false,
                            name: "Poisonous Stinger".to_string(),
                            weapon: Weapon::stinger(),
                            ..Default::default()
                        }),
                        ActiveAbility::Custom(CustomAbility {
                            effect: r"
                                Drone venom is an injury-based liquid \glossterm{poison}.
                                The poison's accuracy is $accuracy.
                                Its stage 1 effect inflicts 2d8 poison damage per poison stage.
                            ".to_string(),
                            name: "Drone Venom".to_string(),
                            usage_time: UsageTime::Triggered,
                            ..Default::default()
                        }),
                    ],
                    modifiers: vec![],
                    movement_speeds: Some(vec![
                        MovementSpeed::new(MovementMode::Land, SpeedCategory::Fast)
                    ]),
                    senses: vec![],
                    trained_skills: vec![
                        Skill::Awareness,
                        Skill::Climb,
                        Skill::Endurance,
                    ],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Always lawful neutral".to_string(),
                    art: false,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                            Drones are the basic fighting unit of formian society.
                            In combat, drones use their high mobility to ruthlessly coordinate attacks on their most dangerous or most vulnerable foes.
                        "),
                        (5, "
                            Even the smallest formian colony typically has dozens of warriors, and larger colonies can have thousands.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![3, 4, 3, -4, 3, 0],
                    elite: false,
                    level: 5,
                    role: Role::Warrior,
                    size: Size::Medium,
                },
            }),
        ],
    }));
}
