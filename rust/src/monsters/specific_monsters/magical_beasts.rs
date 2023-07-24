use crate::core_mechanics::abilities::{
    AbilityTag, AbilityType, ActiveAbility, CustomAbility, StrikeAbility, UsageTime,
};
use crate::core_mechanics::attacks::attack_effect::HealingEffect;
use crate::core_mechanics::attacks::{Maneuver, StandardAttack};
use crate::core_mechanics::{
    DamageDice, DamageType, Defense, FlightManeuverability, MovementMode, MovementSpeed,
    PassiveAbility, Sense, Size, SpecialDefenseType, SpeedCategory,
};
use crate::creatures::{Modifier, ModifierBundle, Monster};
use crate::equipment::{StandardWeapon, Weapon};
use crate::monsters::creature_type::CreatureType;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_group::MonsterGroup;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{
    MonsterAbilities, MonsterDef, MonsterNarrative, MonsterStatistics, Role,
};
use crate::skills::Skill;

fn magical_beast(def: MonsterDef) -> Monster {
    return def.monster(CreatureType::MagicalBeast);
}

pub fn magical_beasts() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![],
            // weapons: vec![
            //     StandardWeapon::MultipedalBite.weapon().except(|w| w.damage_types.push(DamageType::Acid)),
            // ],
            modifiers: ModifierBundle::Multipedal.plus_modifiers(vec![
                Modifier::Attack(
                    StandardAttack::BreathWeaponLine(2, DamageType::Acid, Defense::Reflex)
                        .attack()
                        .except(|a| a.name = "Spit Acid".to_string()),
                ),
            ]),
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Burrow, SpeedCategory::Slow),
                MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
            ]),
            senses: vec![Sense::Darkvision(60), Sense::Tremorsense(60)],
            trained_skills: vec![
                Skill::Awareness,
                Skill::Climb,
            ],
        },
        narrative: Some(MonsterNarrative {
            art: true,
            alignment: "Always true neutral".to_string(),
            description: None,
            knowledge: Some(Knowledge::new(vec![
                (0, "
                    An ankheg is a Large burrowing ant-like creature with large mandibles and a taste for fresh meat.
                    It has six legs, and most ankhegs are brown.
                    In battle, they try to emerge briefly out of tunnels to ambush unwary foes and drag them underground.
                "),
                (5, "
                    A typical adult ankheg is about 10 feet long and weighs about 800 pounds.
                    Ankhegs burrow quickly thanks to the powerful acid they naturally produce.
                    They are able spit that acid at foes up to 20 feet away.
                    When burrowing, they usually do not leave usable tunnels behind them.
                    They can choose to do so, though this halves their burrowing speed.
                "),
                (10, "
                    When hunting, ankhegs usually dig a winding tunnel up to 40 feet below the surface in the rich soil of forests or farmlands.
                    The tunnel usually 5 feet tall and wide, and up to 150 feet long.
                    If they have been in an area for some time, they generally store the remains from previous kills at the end of the tunnel.
                    When they move on, they leave any valuable objects behind with their old tunnels.
                "),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![5, 5, 1, -8, 2, -2],
            elite: true,
            level: 4,
            role: Role::Skirmisher,
            size: Size::Large,
        },
        name: "Ankheg".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        abilities: MonsterAbilities {
            // TODO: poisonous bite, ice breath, webs
            active_abilities: vec![ActiveAbility::Strike(StrikeAbility::normal_strike(
                StandardWeapon::MultipedalBite.weapon(),
            ))],
            modifiers: ModifierBundle::Multipedal.modifiers(),
            movement_speeds: None,
            // TODO: tremorsense on webs ice?
            senses: vec![Sense::Tremorsense(90)],
            trained_skills: vec![Skill::Endurance],
        },
        narrative: None,
        statistics: MonsterStatistics {
            attributes: vec![6, 8, 2, 1, 3, 0],
            elite: true,
            level: 12,
            role: Role::Skirmisher,
            size: Size::Large,
        },
        name: "Frostweb Spider".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![ActiveAbility::Strike(StrikeAbility::normal_strike(
                StandardWeapon::MultipedalBite.weapon(),
            ))],
            modifiers: ModifierBundle::Multipedal.modifiers(),
            movement_speeds: None,
            senses: vec![Sense::Scent],
            trained_skills: vec![],
        },
        narrative: None,
        statistics: MonsterStatistics {
            attributes: vec![3, 4, 1, -4, 2, -1],
            elite: false,
            level: 2,
            role: Role::Skirmisher,
            size: Size::Medium,
        },
        name: "Warg".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![],
            // TODO: add bite attack
            modifiers: vec![
                Modifier::Attack(
                    StandardAttack::DarkMiasma(3)
                        .attack()
                        .except(|a| a.name = "Crawling Darkness".to_string())
                ),
                Modifier::Attack(
                    StandardAttack::DarkGrasp(3)
                        .attack()
                        .except(|a| a.name = "Dark Embrace".to_string())
                ),
            ],
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Climb, SpeedCategory::Slow),
                MovementSpeed::new(MovementMode::Land, SpeedCategory::Slow),
            ]),
            senses: vec![Sense::Darkvision(60), Sense::Blindsense(120)],
            trained_skills: vec![
                Skill::Climb,
            ],
        },
        narrative: Some(MonsterNarrative {
            art: true,
            alignment: "Always true neutral".to_string(),
            description: None,
            knowledge: Some(Knowledge::new(vec![
                (0, "
                    A nightcrawler is a Large worm imbued with umbramantic power.
                    Its body is colored only in shades of gray.
                    In battle, they wriggle towards their foes and try to eat them.
                "),
                (5, "
                    A typical nightcrawler is about 9 feet long and weighs about 700 pounds.
                    They move slowly, but are surprisingly agile in combat.
                    They can easily contort their body to avoid attacks or wrap around the defenses of foes.
                    Nightcrawlers have several magical abilities that draw on their umbramantic power to inflict cold damage on nearby foes.
                "),
                (10, "
                    Nightcrawlers hate and fear light.
                    They can be driven away by light, but if they have no escape, they ferociously attack any sources of light.
                "),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![5, 4, 1, -8, 0, 3],
            elite: false,
            level: 7,
            role: Role::Brute,
            size: Size::Large,
        },
        name: "Nightcrawler".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![],
            modifiers: vec![
                Modifier::Attack(
                    Maneuver::ArmorpiercerPlus
                        .attack(Weapon::tentacle(), 3)
                        .except(|a| a.name = "Impaling Tentacles".to_string())
                        .except_hit_damage(|d| d.damage_types = vec![DamageType::Piercing])
                ),
                Modifier::Maneuver(Maneuver::GraspingStrike),
            ],
            movement_speeds: None,
            senses: vec![Sense::Darkvision(60)],
            trained_skills: vec![
                Skill::Climb,
            ],
        },
        narrative: Some(MonsterNarrative {
            art: true,
            alignment: "Always true neutral".to_string(),
            description: None,
            knowledge: Some(Knowledge::new(vec![
                (0, "
                    A hydra maggot is a Large maggot-like creature that wriggles across the ground in search of food.
                    It is named for the cluster of tentacles that sprout from its heads, which it uses to grab foes so it can eat them.
                "),
                (5, "
                    Hydra maggots are carnivorous, but are not picky, and will feast on rotting carcasses just as happily as they feast on fresh meat.
                    When hydra maggots attack, they can shape the tip of their tentacles into a point, allowing them to impale their foes.
                    Their tentacles are quite adept at slipping past defenses and through cracks in armor.
                "),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![6, 6, 1, -8, 2, -1],
            elite: true,
            level: 7,
            role: Role::Brute,
            size: Size::Large,
        },
        name: "Hydra Maggot".to_string(),
    })));

    let stygian_leech_bite = StandardWeapon::MultipedalBite
        .weapon()
        .except(|w| w.damage_types.push(DamageType::Energy));

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![],
            // TODO: use stygian_leech_bite
            modifiers: vec![
                Modifier::Attack(
                    stygian_leech_bite.attack()
                        .except(|a| a.name = "Leech Life".to_string())
                        .except_hit_damage(|d| d.vampiric_healing = Some(HealingEffect {
                                healing_dice: DamageDice::aoe_damage(3),
                                is_magical: true,
                                power_multiplier: 1.0,
                            }
                        ))
                ),
            ],
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Climb, SpeedCategory::Normal),
                MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
            ]),
            senses: vec![Sense::Darkvision(120), Sense::Lifesense(120)],
            trained_skills: vec![
                Skill::Climb,
            ],
        },
        narrative: Some(MonsterNarrative {
            alignment: "Always true neutral".to_string(),
            art: true,
            description: None,
            knowledge: Some(Knowledge::new(vec![
                (0, "
                    A stygian leech is a Medium worm-like creature that feeds on life energy.
                    It uses its ability to crawl on walls and ceilings to drop on unsuspecting foes.
                "),
                (5, "
                    Stygian leeches instinctively avoid feeding on other stygian leeches, but will otherwise attempt to drain the life from any living creatures, regardless of danger.
                    They can instinctively sense the location of any living creatures nearby.
                    Their life-draining attacks can allow them to heal themselves.
                "),
                (10, "
                    Stygian leeches ignore non-living creatures entirely unless severely provoked.
                    Some non-living creatures, such as intelligent undead, take advantage of this by gathering stygian leeches to guard their homes.
                "),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![5, 4, 1, -6, 2, 3],
            elite: false,
            level: 7,
            role: Role::Brute,
            size: Size::Large,
        },
        name: "Stygian Leech".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![],
            modifiers: vec![
                Modifier::Maneuver(Maneuver::GraspingStrike),
            ],
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Climb, SpeedCategory::Slow),
                MovementSpeed::new(MovementMode::Land, SpeedCategory::Slow),
            ]),
            senses: vec![Sense::Darkvision(120)],
            trained_skills: vec![
                Skill::Awareness,
                Skill::Climb,
                Skill::Stealth,
            ],
        },
        narrative: Some(MonsterNarrative {
            art: true,
            alignment: "Always true neutral".to_string(),
            description: None,
            knowledge: Some(Knowledge::new(vec![
                (0, "
                    A darkmantle has a small body and a large number of strong tentacles.
                    It hides itself on walls and ceilings and drops on its foes to strangle them to death.
                "),
                (5, r#"
                    Darkmantles hang from ceilings using a muscular "foot" at the top of their bodies.
                    They can look like a stalactite by holding their tentacles stiffly under themeselves, or like a lump of rock by spreading their tentacles so the membrane between them covers their bodies.
                    Their shell and skin usually resemble limestone, but a darkmantle can change its color to match almost any type of stony background.
                "#),
                (10, "
                    A darkmantle that misses its initial attack often climbs away and tries to drop on the opponent again if there is a conveniently placed wall.
                    Otherwise, it tries to climb its opponent's body to suffocate its head.
                    Darkmantles move very slowly, so they rely heavily on stealth to ambush their foes.
                "),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![4, 3, -2, -6, 3, 0],
            elite: false,
            level: 2,
            role: Role::Skirmisher,
            size: Size::Small,
        },
        name: "Darkmantle".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![],
            // weapons: vec![
            //     StandardWeapon::MultipedalBite.weapon(),
            //     StandardWeapon::Claws.weapon(),
            // ],
            modifiers: ModifierBundle::Multipedal.plus_modifiers(vec![
                Modifier::Attack(
                    Maneuver::PouncingStrike.attack(StandardWeapon::Claws.weapon(), 2),
                ),
            ]),
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Fly(FlightManeuverability::Poor), SpeedCategory::Fast),
                MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
            ]),
            senses: vec![Sense::LowLightVision],
            trained_skills: vec![
                Skill::Awareness,
            ],
        },
        narrative: Some(MonsterNarrative {
            art: true,
            alignment: "Usually true neutral".to_string(),
            description: None,
            knowledge: Some(Knowledge::new(vec![
                (0, "
                    Griffons are powerful, majestic creatures with characteristics of both lions and eagles.
                    A pair of broad, golden wings emerge from the creature’s back that can span 25 feet or more.
                    In battle, they pounce on their foes like a lion.
                "),
                (5, "
                    From nose to tail, an adult griffon can measure as much as 8 feet.
                    Neither males nor females are endowed with a mane.
                    Griffons cannot speak, but they understand Common.
                "),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![5, 5, 2, -3, 2, 2],
            elite: true,
            level: 5,
            role: Role::Skirmisher,
            size: Size::Large,
        },
        name: "Griffon".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![],
            modifiers: vec![
                Modifier::Attack(
                    StandardAttack::BreathWeaponLine(3, DamageType::Bludgeoning, Defense::Fortitude)
                        .attack()
                        .except(|a| a.name = "Sonic Lance".to_string()),
                ),
                Modifier::Attack(
                    StandardAttack::YrthakThunderingHide.attack(),
                ),
                Modifier::Maneuver(Maneuver::PouncingStrike),
            ],
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Fly(FlightManeuverability::Poor), SpeedCategory::Fast),
                MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
            ]),
            senses: vec![Sense::Blindsight(120), Sense::Blindsense(240)],
            trained_skills: vec![
                Skill::Awareness,
            ],
        },
        narrative: Some(MonsterNarrative {
            alignment: "Usually true neutral".to_string(),
            art: false,
            description: None,
            knowledge: Some(Knowledge::new(vec![
                (0, r#"
                  Yrthaks are virtually blind.
                  They can ``see'' in a short range around them with their blindsight ability, which relies on their incredible hearing.
                  Beyond that range, they cannot see, though they can still identify the existence and location of creatures at great range by sound.
                "#),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![5, 4, 2, -4, 6, -1],
            elite: true,
            level: 6,
            role: Role::Skirmisher,
            size: Size::Huge,
        },
        name: "Yrthak".to_string(),
    })));

    struct IchorDefinition {
        attributes: Vec<i32>,
        elite: bool,
        level: i32,
        modifiers: Vec<Modifier>,
        name: String,
        role: Role,
        size: Size,
        trained_skills: Vec<Skill>,
    }

    impl IchorDefinition {
        fn monster(self) -> Monster {
            let mut modifiers = self.modifiers;
            modifiers.push(
                Modifier::PassiveAbility(PassiveAbility {
                    name: "Spreading Ichor".to_string(),
                    is_magical: true,
                    description: r"
                        Whenever the $name causes a living creature to lose \glossterm{hit points}, that creature becomes unable to regain hit points as a \glossterm{condition}.
                    ".to_string(),
                })
            );
            modifiers.push(Modifier::Vulnerable(SpecialDefenseType::Damage(
                DamageType::Fire,
            )));
            modifiers.push(Modifier::Immune(SpecialDefenseType::CriticalHits));
            return magical_beast(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: vec![],
                    modifiers,
                    movement_speeds: None,
                    senses: vec![Sense::Darkvision(60)],
                    trained_skills: self.trained_skills,
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Always true neutral".to_string(),
                    art: false,
                    description: None,
                    knowledge: None,
                }),
                statistics: MonsterStatistics {
                    attributes: self.attributes,
                    elite: self.elite,
                    // Should be (base animal + 2)
                    level: self.level,
                    role: self.role,
                    size: self.size,
                },
                name: self.name,
            });
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Ichor-Tainted".to_string(),
        art: true,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                The dreadful magical liquid known as ichor has no known origin.
                All is known is that it can corrupt creatures who contact it.
                Creatures who become tainted in this way recklessly attack anything they encounter, making them extremely dangerous.
            "),
            (5, "
                Ichor-tainted creatures have had their internal organs restructured in unnatural ways, making them difficult to dispatch quickly.
                When the ichor spreads, as it often does during a fight, it inhibits healing as it tries to corrupt its new host.
            "),
            (10, "
                Only animals can be fully transformed by ichor.
                Other creatures suffer temporary effects at worst.
                The biological structure of transformed animals bears some resemblance to aberrations.
                Some scholars theorize that this means the ichor originated from the Far Realm, while others think it is a mere imitation.
            "),
        ])),
        monsters: vec![
            IchorDefinition {
                attributes: vec![4, 0, 6, -9, 1, -1],
                elite: false,
                level: 5,
                modifiers: ModifierBundle::Multipedal.modifiers(),
                name: "Ichor Black Bear".to_string(),
                role: Role::Brute,
                size: Size::Medium,
                trained_skills: vec![Skill::Climb, Skill::Endurance, Skill::Swim],
                // weapons: vec![
                //     StandardWeapon::MultipedalBite.weapon(),
                //     StandardWeapon::Claws.weapon(),
                // ],
            }
            .monster(),
            IchorDefinition {
                attributes: vec![5, 0, 7, -9, 1, 2],
                elite: false,
                level: 8,
                modifiers: ModifierBundle::Multipedal.modifiers(),
                name: "Ichor Brown Bear".to_string(),
                role: Role::Brute,
                size: Size::Large,
                trained_skills: vec![Skill::Climb, Skill::Endurance, Skill::Swim],
                // weapons: vec![
                //     StandardWeapon::MultipedalBite.weapon(),
                //     StandardWeapon::Claws.weapon(),
                // ],
            }
            .monster(),
            // IchorDefinition {
            //     attributes: vec![-3, 4, -3, -9, 2, -3],
            //     elite: false,
            //     level: 1,
            //     modifiers: ModifierBundle::Multipedal.modifiers(),
            //     name: "Ichor Rat".to_string(),
            //     role: Role::Skirmisher,
            //     size: Size::Tiny,
            //     trained_skills: vec![Skill::Awareness],
            //     // weapons: vec![StandardWeapon::MultipedalBite.weapon()],
            // }
            // .monster(),
            IchorDefinition {
                attributes: vec![8, 2, 5, -7, 4, 1],
                elite: true,
                level: 11,
                modifiers: vec![],
                name: "Ichor Roc".to_string(),
                role: Role::Brute,
                size: Size::Gargantuan,
                trained_skills: vec![Skill::Awareness],
                // weapons: vec![
                //     StandardWeapon::MultipedalBite.weapon(),
                //     StandardWeapon::Talon.weapon(),
                // ],
            }
            .monster(),
            IchorDefinition {
                attributes: vec![0, 2, 0, -8, 2, -1],
                elite: false,
                level: 3,
                modifiers: ModifierBundle::Multipedal.modifiers(),
                name: "Ichor Wolf".to_string(),
                role: Role::Skirmisher,
                size: Size::Medium,
                trained_skills: vec![Skill::Awareness],
                // weapons: vec![StandardWeapon::MultipedalBite.weapon()],
            }
            .monster(),
        ],
    }));

    return monsters;
}
