use crate::core_mechanics::abilities::{ActiveAbility, CustomAbility, StrikeAbility, UsageTime};
use crate::core_mechanics::attacks::StandardAttack;
use crate::core_mechanics::{
    DamageType, MovementMode, MovementSpeed, PassiveAbility, Sense, Size,
    SpecialDefenseType, SpeedCategory,
};
use crate::creatures::{Modifier, ModifierBundle, Monster};
use crate::equipment::{Weapon, WeaponTag};
use crate::monsters::creature_type::CreatureType;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::monster_group::MonsterGroup;
use crate::monsters::{MonsterAbilities, MonsterDef, MonsterNarrative, MonsterStatistics, Role};
use crate::skills::Skill;

fn magical_beast(def: MonsterDef) -> Monster {
    def.monster(CreatureType::MagicalBeast)
}

pub fn magical_beasts() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        name: "Ankheg".to_string(),
        abilities: MonsterAbilities {
            active_abilities: vec![
                ActiveAbility::Strike(StrikeAbility::grappling_strike(Weapon::bite().except(|w| w.damage_types.push(DamageType::Acid)))),
                ActiveAbility::Custom(CustomAbility {
                    effect: r"
                        The $name makes a $accuracy attack vs. Reflex against everything in a \largearealong, 5 ft. wide line from it.
                        \hit $dr1 acid damage.
                        \miss Half damage.
                    ".to_string(),
                    is_magical: true,
                    name: "Spew Acid".to_string(),
                    ..Default::default()
                }),
            ],
            modifiers: ModifierBundle::Multipedal.modifiers(),
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
            attributes: vec![4, 3, 2, -8, 2, 0],
            elite: false,
            level: 4,
            role: Role::Skirmisher,
            size: Size::Large,
        },
    })));

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![
                ActiveAbility::Strike(StrikeAbility {
                    effect: r"
                        The $name makes a $accuracy strike vs. Armor with its $weapon.
                        Whether the attack hits or misses, the target's space and all squares adjacent to it \glossterm{briefly} become \glossterm{icy terrain}. 
                        \hit $fullweapondamage physical and cold damage.
                        If the target loses hit points, it becomes poisoned by frostweb spider venom.
                    ".to_string(),
                    is_magical: false,
                    name: "Frostbite".to_string(),
                    weapon: Weapon::bite(),
                    ..Default::default()
                }),
                ActiveAbility::Custom(CustomAbility {
                    effect: r"
                        Frostweb spider venom is an injury-based liquid \glossterm{poison}.
                        The poison's accuracy is $accuracy+1.
                        Its stage 1 effect makes the target \vulnerable to cold damage while the poison lasts.
                        Its stage 3 effect also inflicts a \glossterm{vital wound} with a unique vital wound effect.
                        Instead of making a \glossterm{vital roll} for the \glossterm{vital wound}, the target's blood freezes.
                        It is \paralyzed while the temperature is below freezing, and \slowed while the temperature is below 100 degrees Fahrenheit.
                        Whenever it takes fire damage, it can ignore this effect for one minute.
                        This effect lasts until the vital wound is removed.
                    ".to_string(),
                    is_magical: true,
                    name: "Frostweb Spider Venom".to_string(),
                    usage_time: UsageTime::Triggered,
                    ..Default::default()
                }),
                ActiveAbility::Custom(CustomAbility {
                    effect: r"
                        The $name makes a $accuracy attack vs. Reflex against anything within \medrange.
                        Whether the attack hits or misses, the target's space and all squares adjacent to it \glossterm{briefly} become \glossterm{icy terrain}. 
                        \hit $dr1 cold damage.
                        If the attack result beats the target's Fortitude defense, it is \slowed as a \glossterm{condition}.
                    ".to_string(),
                    is_magical: true,
                    name: "Iceweb".to_string(),
                    usage_time: UsageTime::Elite,
                    ..Default::default()
                }),
                ActiveAbility::Custom(CustomAbility {
                    effect: r"
                        The $name makes a $accuracy attack vs. Fortitude against everything within in a \largearea cone from it.
                        In addition, the area \glossterm{briefly} becomes \sphereterm{icy terrain}.
                        After it uses this ability, it \glossterm{briefly} cannot use it again.
                        \hit $dr3 cold damage.
                        \miss Half damage.
                    ".to_string(),
                    is_magical: true,
                    name: "Frost Breath".to_string(),
                    ..Default::default()
                }),
            ],
            // In theory, this could have an ability specifying that it is unaffected by icy
            // terrain. Since its Balance bonus is so high, this isn't really necessary.
            modifiers: ModifierBundle::Multipedal.modifiers(),
            movement_speeds: None,
            // Should this be tremorsense on icy terrain specifically?
            senses: vec![Sense::Tremorsense(90)],
            trained_skills: vec![Skill::Awareness, Skill::Balance, Skill::Climb],
        },
        narrative: None,
        statistics: MonsterStatistics {
            attributes: vec![4, 8, 2, 0, 3, 2],
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
                1,
                Weapon::bite(),
            ))],
            modifiers: ModifierBundle::Multipedal.modifiers(),
            movement_speeds: None,
            senses: vec![Sense::Scent],
            trained_skills: vec![],
        },
        narrative: None,
        statistics: MonsterStatistics {
            attributes: vec![3, 2, 1, -4, 2, -1],
            elite: false,
            level: 2,
            role: Role::Skirmisher,
            size: Size::Medium,
        },
        name: "Warg".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![
                ActiveAbility::Strike(StrikeAbility {
                    effect: r"
                        The $name makes a $accuracy strike vs. Armor with its $weapon.
                        If the target is \glossterm{shadowed}, this attack deals double damage.
                        \hit $damage physical and cold damage.
                    ".to_string(),
                    is_magical: true,
                    name: "Umbral Bite".to_string(),
                    weapon: Weapon::bite(),
                    ..Default::default()
                }),
                ActiveAbility::Custom(CustomAbility {
                    effect: r"
                        The $name makes an attack vs. Mental against all \glossterm{shadowed} \glossterm{enemies} in a \medarea radius from it.
                        \hit $dr3 cold damage.
                        \miss Half damage.
                    ".to_string(),
                    is_magical: true,
                    name: "Crawling Darkness".to_string(),
                    ..Default::default()
                }),
            ],
            modifiers: ModifierBundle::Legless.modifiers(),
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Climb, SpeedCategory::Slow),
                MovementSpeed::new(MovementMode::Land, SpeedCategory::Slow),
            ]),
            senses: vec![Sense::Darkvision(60), Sense::Blindsense(120)],
            trained_skills: vec![Skill::Climb],
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
                    They cover distances slowly, but are surprisingly agile in combat.
                    They can easily contort their body to avoid attacks.
                    Nightcrawlers have several magical abilities that draw on their umbramantic power to damage nearby foes.
                "),
                (10, "
                    Nightcrawlers hate and fear light.
                    They can be driven away by light, and are weaker in its presence.
                    If they have no escape, they ferociously attack any sources of light.
                "),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![3, 4, 2, -8, 0, 3],
            elite: false,
            level: 7,
            role: Role::Brute,
            size: Size::Large,
        },
        name: "Nightcrawler".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![
                ActiveAbility::Strike(StrikeAbility::grappling_strike(Weapon::bite())),
                ActiveAbility::Strike(StrikeAbility {
                    effect: r"
                        The $name makes a $accuracy strike vs. Reflex with its $weapon.
                        \hit $fullweapondamage.
                    "
                    .to_string(),
                    name: "Impaling Tentacles".to_string(),
                    weapon: Weapon::tentacle().add_tag(WeaponTag::Sweeping(7)),
                    usage_time: UsageTime::Elite,
                    ..Default::default()
                }),
                ActiveAbility::Custom(CustomAbility {
                    effect: r"
                        The $name makes a $accuracy attack vs. Fortitude against all creatures in a \medarea cone from it.
                        After it uses this ability, it \glossterm{briefly} cannot use it again.
                        \hit Each target is \glossterm{briefly} \stunned.
                    ".to_string(),
                    is_magical: true,
                    name: "Maggot Breath".to_string(),
                    ..Default::default()
                }),
            ],
            modifiers: ModifierBundle::Legless.modifiers(),
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

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![
                ActiveAbility::Strike(StrikeAbility {
                    effect: r"
                        The $name makes a $accuracy strike vs. Armor with its $weapon.
                        \hit $fullweapondamage.
                        At the end of the round, the $name regains hit points equal to the hit points that the target lost from this attack.
                    ".to_string(),
                    is_magical: false,
                    name: "Leech Life".to_string(),
                    weapon: Weapon::bite().except(|w| w.damage_types.push(DamageType::Energy)),
                    ..Default::default()
                }),
            ],
            modifiers: vec![],
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Climb, SpeedCategory::Normal),
                MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
            ]),
            senses: vec![Sense::Darkvision(120), Sense::Lifesense(120)],
            trained_skills: vec![
                Skill::Climb, Skill::Stealth,
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
            attributes: vec![5, 2, 4, -6, 2, -2],
            elite: false,
            level: 5,
            role: Role::Brute,
            size: Size::Medium,
        },
        name: "Stygian Leech".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(magical_beast(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![
                ActiveAbility::Strike(StrikeAbility::grappling_strike(Weapon::tentacle())),
            ],
            modifiers: vec![],
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
            active_abilities: vec![
                ActiveAbility::Strike(StrikeAbility::pounce(2, Weapon::claw()).except_dual_strike()),
                ActiveAbility::Strike(StrikeAbility {
                    effect: r"
                        The $name makes two $accuracy strikes vs. Armor with its $weapons.
                        \hit $fullweapondamage.
                        If the target takes damage from both claws, it bleeds.
                        A bleeding creature takes $dr1 slashing damage during the $name's next action.
                    ".to_string(),
                    name: "Bloodletting Claws".to_string(),
                    weapon: Weapon::claw(),
                    ..Default::default()
                }),
                ActiveAbility::Strike(StrikeAbility::normal_strike(2, Weapon::bite()).except_elite()),
                ActiveAbility::Custom(CustomAbility {
                    effect: r"
                        The $name makes a $accuracy attack vs. Reflex against against one non-adjacent creature within \distrange.
                        \hit The target becomes marked as a condition.
                        The $name gains a +2 bonus to accuracy and defenses against all marked targets.
                        If the $name loses sight of the target for a full round, this effect ends.
                    ".to_string(),
                    is_magical: false,
                    name: "Eagle Eye".to_string(),
                    usage_time: UsageTime::Elite,
                    ..Default::default()
                }),
            ],
            modifiers: ModifierBundle::Multipedal.modifiers(),
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Fly(Some(60)), SpeedCategory::Fast),
                MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
            ]),
            senses: vec![Sense::LowLightVision],
            trained_skills: vec![
                Skill::Awareness,
                Skill::Jump,
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
            active_abilities: vec![
                ActiveAbility::Custom(CustomAbility {
                    effect: r"
                        The $name makes a $accuracy attack vs. Fortitude against everything within in a \largearealong, 5 ft. wide line from it.
                        \hit $dr2 bludgeoning damage.
                        \miss Half damage.
                    ".to_string(),
                    is_magical: true,
                    name: "Sonic Lance".to_string(),
                    usage_time: UsageTime::Elite,
                    ..Default::default()
                }),
                ActiveAbility::Strike(StrikeAbility::grappling_strike(Weapon::bite())),
            ],
            modifiers: ModifierBundle::Sightless.plus_modifiers(vec![
                Modifier::PassiveAbility(PassiveAbility {
                    description: r"
                        The $name uses its hearing to ``see''.
                        While it is \deafened, it loses its natural blindsight and blindsense abilities.
                    ".to_string(),
                    is_magical: false,
                    name: "Echolocation".to_string(),
                }),
                Modifier::Attack(
                    StandardAttack::YrthakThunderingHide.attack(),
                ),
            ]),
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Fly(Some(90)), SpeedCategory::Fast),
                MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
            ]),
            senses: vec![Sense::Blindsight(120), Sense::Blindsense(240)],
            trained_skills: vec![
                Skill::Awareness,
                Skill::Stealth,
            ],
        },
        narrative: Some(MonsterNarrative {
            alignment: "Usually true neutral".to_string(),
            art: false,
            description: None,
            knowledge: Some(Knowledge::new(vec![
                (0, r#"
                  Yrthaks are virtually blind.
                  They can ``see'' around themselves with their blindsight ability, which relies on their incredible hearing.
                  Beyond that range, they cannot see, though they can still identify the existence and location of creatures at great range by sound.
                "#),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![5, 2, 4, -4, 6, 0],
            elite: true,
            level: 7,
            role: Role::Skirmisher,
            size: Size::Huge,
        },
        name: "Yrthak".to_string(),
    })));

    struct IchorDefinition {
        active_abilities: Vec<ActiveAbility>,
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
            magical_beast(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: self.active_abilities,
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
            })
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
                active_abilities: vec![
                    ActiveAbility::Strike(StrikeAbility::ichor_strike(2, Weapon::claw()).except_dual_strike()),
                    ActiveAbility::Strike(StrikeAbility::ichor_strike(2, Weapon::bite()).except_elite()),
                ],
                attributes: vec![5, 1, 6, -8, 2, -1],
                elite: true,
                level: 5,
                modifiers: ModifierBundle::Multipedal.modifiers(),
                name: "Ichor Black Bear".to_string(),
                role: Role::Brute,
                size: Size::Medium,
                trained_skills: vec![Skill::Climb, Skill::Endurance, Skill::Swim],
            }
            .monster(),
            IchorDefinition {
                active_abilities: vec![
                    ActiveAbility::Strike(StrikeAbility::ichor_strike(3, Weapon::claw()).except_dual_strike()),
                    ActiveAbility::Strike(StrikeAbility::ichor_strike(3, Weapon::bite()).except_elite()),
                ],
                attributes: vec![6, 1, 7, -8, 2, 1],
                elite: true,
                level: 7,
                modifiers: ModifierBundle::Multipedal.modifiers(),
                name: "Ichor Brown Bear".to_string(),
                role: Role::Brute,
                size: Size::Large,
                trained_skills: vec![Skill::Climb, Skill::Endurance, Skill::Swim],
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
            //     // weapons: vec![StandardWeapon::MonsterBite.weapon()],
            // }
            // .monster(),
            // IchorDefinition {
            //     attributes: vec![8, 2, 5, -7, 4, 1],
            //     elite: true,
            //     level: 11,
            //     modifiers: vec![],
            //     name: "Ichor Roc".to_string(),
            //     role: Role::Brute,
            //     size: Size::Gargantuan,
            //     trained_skills: vec![Skill::Awareness],
            //     // weapons: vec![
            //     //     StandardWeapon::MonsterBite.weapon(),
            //     //     StandardWeapon::Talon.weapon(),
            //     // ],
            // }
            // .monster(),
            IchorDefinition {
                active_abilities: vec![
                    ActiveAbility::Strike(StrikeAbility::ichor_strike(1, Weapon::bite())),
                ],
                attributes: vec![1, 2, 1, -7, 3, 0],
                elite: false,
                level: 3,
                modifiers: ModifierBundle::Multipedal.modifiers(),
                name: "Ichor Wolf".to_string(),
                role: Role::Skirmisher,
                size: Size::Medium,
                trained_skills: vec![Skill::Awareness],
            }
            .monster(),
        ],
    }));

    monsters
}
