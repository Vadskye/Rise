use crate::core_mechanics::abilities::{AbilityTag, ActiveAbility, CustomAbility, StrikeAbility};
use crate::core_mechanics::{PassiveAbility, Sense, Size};
use crate::creatures::{Modifier, Monster};
use crate::equipment::{StandardWeapon, Weapon, WeaponTag};
use crate::monsters::creature_type::CreatureType;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::monster_group::MonsterGroup;
use crate::monsters::{MonsterAbilities, MonsterDef, MonsterNarrative, MonsterStatistics, Role};
use crate::skills::Skill;

fn monstrous_humanoid(def: MonsterDef) -> Monster {
    def.monster(CreatureType::MonstrousHumanoid)
}

pub fn monstrous_humanoids() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::Monster(monstrous_humanoid(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![
                ActiveAbility::Strike(StrikeAbility {
                    effect: r"
                        The $name makes a $accuracy+1 melee strike with a greataxe.
                        \hit $fullweapondamage.
                    ".to_string(),
                    name: "Sweeping Slash".to_string(),
                    weapon: Weapon::greataxe().add_tag(WeaponTag::Sweeping(2)),
                    ..Default::default()
                }),
                ActiveAbility::Strike(StrikeAbility::power_strike(2, Weapon::horns()).except_elite()),
                ActiveAbility::Custom(CustomAbility::shove().plus_accuracy(1).except_elite()),
            ],
            modifiers: vec![],
            movement_speeds: None,
            senses: vec![Sense::Darkvision(60)],
            trained_skills: vec![
                Skill::Awareness,
            ],
        },
        narrative: Some(MonsterNarrative {
            alignment: "Always true neutral".to_string(),
            art: true,
            description: None,
            knowledge: Some(Knowledge::new(vec![
                (0, "
                    A minotaur is a Large bull-headed creature.
                    Minotaurs are known for their poor sense of direction.
                    They can be cunning in battle, but have a tendency to become trapped in dungeons of even moderate complexity.
                "),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![7, 0, 4, -2, 2, 1],
            elite: true,
            level: 6,
            role: Role::Brute,
            size: Size::Large,
        },
        name: "Minotaur".to_string(),
    })));

    monsters.push(MonsterEntry::Monster(monstrous_humanoid(MonsterDef {
        name: "Choker".to_string(),
        abilities: MonsterAbilities {
            active_abilities: vec![
                ActiveAbility::Strike(StrikeAbility::grappling_strike(Weapon::hand()).except_name("Choke").except_dual_strike()),
            ],
            modifiers: vec![],
            movement_speeds: None,
            senses: vec![],
            trained_skills: vec![
                Skill::Awareness,
                Skill::Climb,
                Skill::Stealth,
            ],
        },
        narrative: Some(MonsterNarrative {
            alignment: "Usually chaotic evil".to_string(),
            art: true,
            description: None,
            knowledge: Some(Knowledge::new(vec![
                (0, "
                    A choker is a vicious predator that delights in strangling its foes.
                    Chokers are bipedal, but their arms are inhumanly long and sinuous, terminating in hands with spiny pads to help them hold on tightly to walls and foes.
                    They live to hear the desperate gasping for breath and crunching of bones that their powerful arms can inflict on their prey.
                "),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![5, 5, -1, -5, 0, -1],
            elite: false,
            level: 4,
            role: Role::Brute,
            size: Size::Medium,
        },
    })));

    add_bugbears(&mut monsters);

    add_kobolds(&mut monsters);

    // This uses a new struct, so it's cleaner to split it into a separate function
    add_ogres(&mut monsters);

    let _giant_club = StandardWeapon::Club
        .weapon()
        .except(|w| w.tags.push(WeaponTag::Sweeping(1)));

    // TODO: add Giant language
    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Giants".to_string(),
        art: false,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
              Giants are massive humanoid creatures that tower over lesser creatures.
              All giants have immense strength and unimpressive agility - except when it comes to throwing and catching rocks, which they tend to excel at.
            "),
            (5, "
                A giant can throw objects no larger than two size categories smaller than itself with ease.
                Giants prefer to throw boulders, but in a pinch they can throw almost anything.
            "),
            (10, "
                A giant's \\glossterm{range limits} with an object other than a boulder are generally half its range limit with a boulder.
                The object may also deal less damage than a boulder depending on its construction.
            "),
        ])),
        monsters: vec![
            monstrous_humanoid(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::forceful_smash(4, Weapon::giant_boulder())),
                        ActiveAbility::Strike(StrikeAbility::forceful_smash(4, Weapon::greatclub())),
                        ActiveAbility::Strike(StrikeAbility::power_strike(4, Weapon::greatclub())),
                    ],
                    modifiers: vec![],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually chaotic evil".to_string(),
                    art: true,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                          A hill giant is a Huge giant that is usually found in hilly areas.
                          Hill giants prefer to fight from high, rocky outcroppings, where they can pelt opponents with rocks and boulders while limiting the risk to themselves.
                          Skin color among hill giants ranges from light tan to deep ruddy brown.
                          They wear layers of crudely prepared hides with the fur left on.
                        "),
                        (5, "
                          Hill giants lack the intelligence or desire to retreat if their enemies survive to approach them, and prefer to draw their massive clubs and enter melee.
                          If possible, they smash their foes off of cliffs.

                          The hair of hill giants is brown or black, with eyes the same color.
                          They seldom wash or repair their garments, preferring to simply add more hides as their old ones wear out.
                          Adult hill giants are about 25 feet tall.
                          They can live to be 70 years old.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![8, -2, 4, -2, 2, -1],
                    elite: false,
                    level: 10,
                    role: Role::Brute,
                    size: Size::Huge,
                },
                name: "Hill Giant".to_string(),
            }),
            monstrous_humanoid(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::forceful_smash(4, Weapon::giant_boulder())),
                        ActiveAbility::Strike(StrikeAbility::forceful_smash(4, Weapon::greatclub())),
                        ActiveAbility::Strike(StrikeAbility::power_strike(4, Weapon::greatclub())),
                        ActiveAbility::Custom(CustomAbility::earthbind(4).except_elite()),
                        ActiveAbility::Custom(CustomAbility::quagmire(4).except_elite()),
                        ActiveAbility::Custom(CustomAbility::tremor(4).except_elite()),
                    ],
                    modifiers: vec![],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually true neutral".to_string(),
                    art: true,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                          A stone giant is a Gargantuan giant that is usually found in mountainous regions.
                          Stone giants fight from a great distance whenever possible, using their ability to hurl stones vast distances and bend the earth to their will.
                          They prefer thick leather garments, dyed in shades of brown and gray to match the stone around them.
                        "),
                        (5, "
                          Adult stone giants stand about 50 feet tall.
                          They can live to be 300 years old.
                          Young stone giants can be capricious, hunting tiny creatures like goats and humanoids on a whim.
                          Elder stone giants tend to be wiser and more cautious, and avoid unnecessary conflict.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![7, -2, 7, 0, 2, 4],
                    elite: true,
                    level: 11,
                    role: Role::Warrior,
                    size: Size::Gargantuan,
                },
                name: "Stone Giant".to_string(),
            }),
        ],
    }));

    monsters
}

fn add_bugbears(monsters: &mut Vec<MonsterEntry>) {
    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Bugbears".to_string(),
        art: false,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Bugbears are Medium humanoid creatures with burly, hairy bodies and ugly goblin faces.
                They are brutish and chaotic, and enjoy bullying their goblin kin.
            "),
            (5, "
                Although bugbears have only ordinary physical strength, they are remarkably durable.
                Their name comes from their hirstute nature and inexhaustible endurance, both of which are reminiscent of bears.
                It also references their seemingly supernatural ability to infuriate their enemies.
            "),
            (10, "
                Bugbears are typically found in small packs that rarely have more than a dozen members.
                However, sometimes they will congregate around a powerful leader for a time.
                These groupings are not hierarchical or well organized, and are typically based around some discovery of wealth that a chief can ration out to their followers.
            "),
        ])),
        monsters: vec![
            monstrous_humanoid(MonsterDef {
                name: "Bugbear Raider".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::enraging_strike(1, Weapon::flail())),
                        ActiveAbility::Strike(StrikeAbility::enraging_strike(1, Weapon::sling())),
                        ActiveAbility::Strike(StrikeAbility::trip(Weapon::flail())),
                    ],
                    senses: vec![Sense::Scent],
                    ..Default::default()
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Chaotic evil".to_string(),
                    ..Default::default()
                }),
                statistics: MonsterStatistics {
                    attributes: vec![2, 0, 5, -2, 0, 2],
                    elite: false,
                    level: 3,
                    role: Role::Warrior,
                    size: Size::Medium,
                },
            }),
            monstrous_humanoid(MonsterDef {
                name: "Bugbear Shaman".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, Weapon::flail())),
                        ActiveAbility::Custom(CustomAbility::enrage(1)),
                        ActiveAbility::Custom(CustomAbility::mind_blank(1)),
                        ActiveAbility::Custom(CustomAbility::mind_blast(1)),
                    ],
                    senses: vec![Sense::Scent],
                    ..Default::default()
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Neutral evil".to_string(),
                    ..Default::default()
                }),
                statistics: MonsterStatistics {
                    attributes: vec![0, 0, 5, -2, 2, 4],
                    elite: false,
                    level: 3,
                    role: Role::Mystic,
                    size: Size::Medium,
                },
            }),
        ],
    }));
}

fn add_kobolds(monsters: &mut Vec<MonsterEntry>) {
    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Kobolds".to_string(),
        art: false,
        description: Some("
            
        ".to_string()),
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Kobolds are Medium bipedal creatures that are covered in scales.
                They are short, typically standing three feet tall.
                Although kobolds are individually cowardly, they are crafty and work effectively in groups.
            "),
            (5, "
                Most kobolds fight using ranged weapons.
                They try to lure their foes into prepared traps when possible.
                Kobolds revere dragons, and claim to be descended from them.
            "),
            // TODO: clarify how kobolds bond with dragons
            (10, "
                The dream of every kobold tribe is to find a worthy dragon to serve.
                Kobolds have latent draconic powers that can be awakened through sworn service to dragons.
                Some dragons enjoy having such eager servants, while others resent being pestered by kobolds and reject all entreaties.
            "),
        ])),
        monsters: vec![
            monstrous_humanoid(MonsterDef {
                name: "Kobold Nipper".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, Weapon::spear())),
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, Weapon::sling())),
                    ],
                    ..Default::default()
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually lawful evil".to_string(),
                    ..Default::default()
                }),
                statistics: MonsterStatistics {
                    attributes: vec![-1, 4, 2, 1, 3, -2],
                    elite: false,
                    level: 1,
                    role: Role::Skirmisher,
                    size: Size::Medium,
                },
            }),
            monstrous_humanoid(MonsterDef {
                name: "Kobold Snipper".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, Weapon::heavy_crossbow())),
                    ],
                    ..Default::default()
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually lawful evil".to_string(),
                    ..Default::default()
                }),
                statistics: MonsterStatistics {
                    attributes: vec![-1, 3, 1, 1, 4, -2],
                    elite: false,
                    level: 2,
                    role: Role::Sniper,
                    size: Size::Medium,
                },
            }),
            monstrous_humanoid(MonsterDef {
                name: "Kobold Yipper".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::normal_strike(1, Weapon::spear())),
                        ActiveAbility::Custom(CustomAbility::burning_hands(1)),
                        ActiveAbility::Custom(CustomAbility::ignition(1)),
                    ],
                    ..Default::default()
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually lawful evil".to_string(),
                    ..Default::default()
                }),
                statistics: MonsterStatistics {
                    attributes: vec![-2, 3, 2, 1, 2, 3],
                    elite: false,
                    level: 3,
                    role: Role::Mystic,
                    size: Size::Medium,
                },
            }),
            monstrous_humanoid(MonsterDef {
                name: "Dragonsworn Nipper".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::flintspark_strike(Weapon::spear()).except_name("Dragonflame Spear")),
                        ActiveAbility::Strike(StrikeAbility::flintspark_strike(Weapon::sling()).except_name("Dragonflame Sling")),
                    ],
                    modifiers: vec![Modifier::impervious_tag(AbilityTag::Fire)],
                    ..Default::default()
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually lawful evil".to_string(),
                    description: Some("
                        These statistics represent a kobold who has sworn service to a red or gold dragon.
                        Kobolds who swear service to different types of dragons may have different abilities.
                    ".to_string()),
                    ..Default::default()
                }),
                statistics: MonsterStatistics {
                    attributes: vec![0, 5, 3, 2, 4, -1],
                    elite: false,
                    level: 5,
                    role: Role::Skirmisher,
                    size: Size::Medium,
                },
            }),
            monstrous_humanoid(MonsterDef {
                name: "Dragonsworn Snipper".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::flintspark_strike(Weapon::longbow()).except_name("Dragonflame Bow")),
                    ],
                    modifiers: vec![Modifier::impervious_tag(AbilityTag::Fire)],
                    ..Default::default()
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually lawful evil".to_string(),
                    ..Default::default()
                }),
                statistics: MonsterStatistics {
                    attributes: vec![0, 4, 2, 2, 5, -1],
                    elite: false,
                    level: 6,
                    role: Role::Sniper,
                    size: Size::Medium,
                },
            }),
            monstrous_humanoid(MonsterDef {
                name: "Dragonsworn Yipper".to_string(),
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::flintspark_strike(Weapon::spear()).except_name("Dragonflame Spear")),
                        ActiveAbility::Custom(CustomAbility::flame_breath(3)),
                        ActiveAbility::Custom(CustomAbility::ignition(3)),
                    ],
                    modifiers: vec![Modifier::impervious_tag(AbilityTag::Fire)],
                    ..Default::default()
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually lawful evil".to_string(),
                    ..Default::default()
                }),
                statistics: MonsterStatistics {
                    attributes: vec![-1, 4, 3, 2, 3, 4],
                    elite: false,
                    level: 7,
                    role: Role::Mystic,
                    size: Size::Medium,
                },
            }),
        ],
    }));
}

fn add_ogres(monsters: &mut Vec<MonsterEntry>) {
    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Ogres".to_string(),
        art: false,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
              Ogres are Large, hideous humanoid creatures with a taste for human flesh.
              If that is unavailable, they also enjoy the flesh of other humanoid creatures.
              They lack the intelligence for complex plans, but they like lying in wait to ambush helpless travelers.
            "),
            (5, "
              Ogre skin color ranges from dull yellow to dull brown.
              Their clothing consists of poorly cured furs and hides, which add to their naturally repellent odor.
            "),
            (10, "
              Ogres are intelligent enough to throw their javelins first to soften up their foes before closing into melee, but ogre gangs and bands fight as disorganized individuals.
              They use massive clubs in battle to tenderize their meat instead of wastefully hacking off bits.
            "),
        ])),
        monsters: vec![
            monstrous_humanoid(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::knockdown(1, Weapon::greatclub())),
                        ActiveAbility::Strike(StrikeAbility::sweeping_strike(1, Weapon::greatclub())),
                    ],
                    // TODO: add attack
                    ..Default::default()
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually chaotic evil".to_string(),
                    art: false,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                          Ogre gangers are relatively weak or young ogres that tend to gather together in gangs for mutual protection.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![6, -1, 3, -4, 0, -1],
                    elite: false,
                    level: 3,
                    role: Role::Brute,
                    size: Size::Large,
                },

                name: "Ogre Ganger".to_string(),
            }),
            monstrous_humanoid(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::knockdown(2, Weapon::greatclub())),
                        ActiveAbility::Strike(StrikeAbility::sweeping_strike(2, Weapon::greatclub())),
                    ],
                    modifiers: vec![],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![Skill::Intimidate],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually chaotic evil".to_string(),
                    art: true,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                          Ogre menaces are mature adult ogres that often terrorize small towns.
                          They tend to work in pairs or with minions like goblins that they bully into submission.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![6, -1, 4, -2, 0, -1],
                    elite: false,
                    level: 6,
                    role: Role::Brute,
                    size: Size::Large,
                },
                name: "Ogre Menace".to_string(),
            }),
            monstrous_humanoid(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Custom(CustomAbility::magic_missile(1)),
                        ActiveAbility::Custom(CustomAbility::magic_missile_storm(3)),
                        ActiveAbility::Custom(CustomAbility::reflect_magic()),
                    ],
                    modifiers: vec![
                        Modifier::PassiveAbility(PassiveAbility {
                            description: r"The first spell that the ogre mage casts between short rests deals 1d8 \glossterm{extra damage}.".to_string(),
                            name: "Enhance Magic -- Might".to_string(),
                            is_magical: true,
                        }),
                    ],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually chaotic evil".to_string(),
                    art: true,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                          Ogre mages are unusual ogres that have innate arcane magical talent.
                          They are generally identifiable as the only ogres who do not go into battle wearing armor.
                          They are more intelligent than other ogres, and more likely to use combat strategies like hiding behind their minions.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![4, -1, 0, 0, 2, 5],
                    elite: false,
                    level: 7,
                    role: Role::Mystic,
                    size: Size::Large,
                },
                name: "Ogre Mage".to_string(),
            }),
            // TODO: add Sweeping tag or Sweeping Strike maneuver
            monstrous_humanoid(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility::armorcrusher_plus(3, Weapon::greatclub())),
                        ActiveAbility::Strike(StrikeAbility::knockdown_plus(3, Weapon::greatclub())),
                        ActiveAbility::Strike(StrikeAbility::sweeping_strike(3, Weapon::greatclub())),
                        ActiveAbility::Custom(CustomAbility::terrifying_shout(3).except_elite()),
                        ActiveAbility::Custom(CustomAbility::demand_obeisance(3).except_elite()),
                    ],
                    modifiers: vec![],
                    movement_speeds: None,
                    senses: vec![],
                    trained_skills: vec![Skill::Intimidate],
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually chaotic evil".to_string(),
                    art: false,
                    description: None,
                    knowledge: Some(Knowledge::new(vec![
                        (0, "
                          Ogre skullclaimers are the leaders of large roaming bands of ogres.
                          Ogre bands are often accompanied by goblins or other similar creatures that help the ogres in exchange for a share of the valuable items they find, since the ogres care more about the creatures they kill.
                        "),
                        (5, "
                          Ogre skullclaimers are named after their right to eat the most prized part of any humanoid the band kills: the head.
                        "),
                    ])),
                }),
                statistics: MonsterStatistics {
                    attributes: vec![8, -1, 4, -1, 3, 2],
                    elite: true,
                    level: 7,
                    role: Role::Brute,
                    size: Size::Large,
                },

                name: "Ogre Skullclaimer".to_string(),
            }),
        ],
    }));
}
