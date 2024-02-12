use crate::core_mechanics::abilities::{
    AbilityType, ActiveAbility, CustomAbility, StrikeAbility, UsageTime,
};
use crate::core_mechanics::{
    DamageType, Debuff, Defense, DicePool, FlightManeuverability, MovementMode, MovementSpeed,
    PassiveAbility, Sense, Size, SpecialDefenseType, SpeedCategory,
};
use crate::creatures::{Creature, CreatureCategory, Modifier, ModifierBundle, Monster};
use crate::equipment::{Weapon, WeaponTag};
use crate::monsters::creature_type::CreatureType;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::monster_group::MonsterGroup;
use crate::monsters::{MonsterAbilities, MonsterDef, MonsterNarrative, MonsterStatistics, Role};
use crate::skills::Skill;

fn animate(def: MonsterDef) -> Monster {
    def.monster(CreatureType::Animate)
}

pub fn animates() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::Monster(animate(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![
                ActiveAbility::Custom(CustomAbility {
                    ability_type: AbilityType::Normal,
                    effect: r"
                        The $name makes a $accuracy attack vs. Reflex against one creature it \glossterm{touches}.
                        It gains a +2 accuracy bonus if the target is \glossterm{shadowed}.
                        \hit $dr2 cold damage.
                        If the target loses hit points, it is \frightened by the $name as a \glossterm{condition}.
                        This is an \abilitytag{Emotion} effct.
                    ".to_string(),
                    is_magical: true,
                    name: "Dark Grasp".to_string(),
                    tags: vec![],
                    usage_time: UsageTime::Standard,
                }),
                ActiveAbility::Custom(CustomAbility {
                    ability_type: AbilityType::Normal,
                    effect: r"
                        The $name makes a $accuracy attack vs. Fortitude against all \glossterm{shadowed} creatures within a \largearea radius of it.
                        \hit $dr1 cold damage.
                    ".to_string(),
                    is_magical: true,
                    name: "Umbral Aura".to_string(),
                    tags: vec![],
                    usage_time: UsageTime::Elite,
                }),
            ],
            modifiers: ModifierBundle::MindlessConstruct.plus_modifiers(vec![
                Modifier::immune_damage(DamageType::Cold),
                Modifier::immune_debuff(Debuff::Prone),
            ]),
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Fly(FlightManeuverability::Perfect), SpeedCategory::Normal)
            ]),
            senses: vec![Sense::Darkvision(120)],
            trained_skills: vec![
                Skill::Awareness,
                Skill::Stealth,
            ],
        },
        narrative: Some(MonsterNarrative {
            art: true,
            alignment: "Always neutral evil".to_string(),
            description: None,
            knowledge: Some(Knowledge::new(vec![
                (0, "
                    An darkwraith is a shadow disconnected from its host through strange umbramantic power.
                    Its body loosely resembles a dark humanoid shape, with all details obscured.
                    Despite its resemblance to a ghost, it is neither undead nor incorporeal.
                    It instinctively seeks out sources of light and warmth, including most living creatures, to suppress their hated radiance.
                "),
                (5, "
                    Darkwraiths bear a hateful malevolence towards anything that brings light.
                    Although they swarm around sources of warmth, they will not attack directly with their dark grasp unless provoked by light or damage.
                    Darkwraiths cannot speak or make noise of any kind.
                "),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![0, 6, 0, 1, 4, 4],
            elite: true,
            level: 4,
            role: Role::Skirmisher,
            size: Size::Medium,
        },
        name: "Darkwraith".to_string(),
    })));

    add_animated_objects(&mut monsters);

    add_treants(&mut monsters);

    monsters.push(MonsterEntry::Monster(animate(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![
                ActiveAbility::Custom(CustomAbility {
                    ability_type: AbilityType::Normal,
                    effect: r"
                        The $name makes a $accuracy attack vs. Fortitude against everything in its space.
                        \hit $dr2 acid damage.
                        \miss Half damage.
                    ".to_string(),
                    is_magical: false,
                    name: "Dissolve".to_string(),
                    tags: vec![],
                    usage_time: UsageTime::Elite,
                }),
                ActiveAbility::Custom(CustomAbility {
                    ability_type: AbilityType::Normal,
                    effect: r"
                        The $name moves up to its speed in a straight line.
                        Whenever it shares space with anything Medium or smaller during this movement, it makes a $accuracy+2 attack vs. Fortitude against that creature or object.
                        \hit The target is \grappled by the $name.
                    ".to_string(),
                    is_magical: false,
                    name: "Engulf".to_string(),
                    tags: vec![],
                    usage_time: UsageTime::Standard,
                }),
            ],
            modifiers: ModifierBundle::Amorphous.plus_modifiers(ModifierBundle::Sightless.plus_modifiers(vec![
                Modifier::Immune(SpecialDefenseType::Debuff(Debuff::Grappled)),
                Modifier::PassiveAbility(PassiveAbility {
                    description: r"
                        The $name can move freely through spaces occupied by other creatures who do not have this ability.
                    ".to_string(),
                    is_magical: false,
                    name: "Gelatinous".to_string(),
                }),
                Modifier::PassiveAbility(PassiveAbility {
                    description: r"
                        Anything that is \grappled by the $name while sharing space with it is suspended within its body.
                        Whenever it moves, all suspended creatures and objects automatically move with it.
                    ".to_string(),
                    is_magical: false,
                    name: "Suspension".to_string(),
                }),
            ])),
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Land, SpeedCategory::Slow),
                MovementSpeed::new(MovementMode::Climb, SpeedCategory::Slow),
            ]),
            senses: vec![Sense::Tremorsense(120), Sense::Tremorsight(60)],
            trained_skills: vec![
                Skill::Climb,
                Skill::Endurance,
                Skill::Flexibility,
                Skill::Stealth,
            ],
        },
        narrative: Some(MonsterNarrative {
            art: true,
            alignment: "Always true neutral".to_string(),
            description: None,
            knowledge: Some(Knowledge::new(vec![
                (0, "
                    Gelatinous cubes are gigantic green oozes that creep along underground tunnels, digesting anything organic they encounter.
                    They are feared for their ability to easily snatch up smaller creatures and carry them away.
                "),
                (5, "
                    When a gelatinous cube finds prey, it simply moves through the unfortunate creature, trapping it inside the ooze's body.
                    Creatures engulfed in this way can find it difficult to escape while they are being slowly digested.
                    Gelatinous cubes are unusually fast compared to other oozes, though they are still slow compared to most creatures.
                "),
                (10, "
                    Gelatinous cubes can climb walls, though they rarely climb high.
                    If possible, they prefer to nestle into alcoves so they can drop on unsuspecting prey.
                "),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![6, -4, 8, -9, 0, 0],
            elite: true,
            level: 5,
            role: Role::Brute,
            size: Size::Large,
        },
        name: "Gelatinous Cube".to_string(),
    })));

    monsters
}

fn add_animated_objects(monsters: &mut Vec<MonsterEntry>) {
    // TODO: attach knowledge checks to the group as a whole, not any individual animated object
    fn create_animated_object(
        active_abilities: Vec<ActiveAbility>,
        attributes: Vec<i32>,
        elite: bool,
        level: i32,
        name: &str,
        size: Size,
    ) -> Monster {
        animate(MonsterDef {
            abilities: MonsterAbilities {
                active_abilities,
                modifiers: ModifierBundle::MindlessConstruct.modifiers(),
                movement_speeds: None,
                senses: vec![Sense::Darkvision(60)],
                trained_skills: vec![],
            },
            narrative: Some(MonsterNarrative {
                art: false,
                alignment: "Always true neutral".to_string(),
                description: None,
                knowledge: None,
            }),
            statistics: MonsterStatistics {
                attributes,
                elite,
                level,
                role: Role::Brute,
                size,
            },
            name: name.to_string(),
        })
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        art: true,
        description: Some(PassiveAbility {
            description: r"
                Animated objects are not \glossterm{sentient}.
                They are immune to \abilitytag{Compulsion} and \abilitytag{Emotion} attacks.
                Their Intelligence attribute represents their capacity for complex action according to the instructions given to them by their creator rather than true intelligence.
            ".to_string(),
            is_magical: false,
            name: "Mindless".to_string(),
        }.to_latex()),
        knowledge: None,
        name: "Animated Objects".to_string(),
        monsters: vec![
            create_animated_object(
                vec![ActiveAbility::Strike(StrikeAbility::normal_strike(
                    Weapon::ram(),
                ))],
                vec![-4, 4, -4, -8, 0, 0],
                false,
                1,
                "Tiny Object",
                Size::Tiny,
            ),
            create_animated_object(
                vec![ActiveAbility::Strike(StrikeAbility::normal_strike(
                    Weapon::ram(),
                ))],
                vec![2, 3, 0, -8, 0, 0],
                false,
                1,
                "Small Object",
                Size::Small,
            ),
            create_animated_object(
                vec![ActiveAbility::Strike(StrikeAbility::knockdown(
                    Weapon::ram(),
                ))],
                vec![4, 2, 2, -8, 0, 0],
                false,
                2,
                "Medium Object",
                Size::Medium,
            ),
            create_animated_object(
                vec![ActiveAbility::Strike(StrikeAbility::knockdown(
                    Weapon::ram(),
                ))],
                vec![5, 1, 3, -8, 0, 0],
                false,
                4,
                "Large Object",
                Size::Large,
            ),
            create_animated_object(
                vec![ActiveAbility::Strike(StrikeAbility::knockdown_plus(
                    Weapon::ram(),
                ))],
                vec![6, 0, 4, -8, 0, 0],
                false,
                7,
                "Huge Object",
                Size::Huge,
            ),
            create_animated_object(
                vec![ActiveAbility::Strike(StrikeAbility::knockdown_plus(
                    Weapon::ram(),
                ))],
                vec![7, -1, 5, -8, 0, 0],
                false,
                9,
                "Gargantuan Object",
                Size::Gargantuan,
            ),
            create_animated_object(
                vec![ActiveAbility::Strike(StrikeAbility::knockdown_plus(
                    Weapon::ram(),
                ))],
                vec![8, -2, 6, -8, 0, 0],
                false,
                11,
                "Colossal Object",
                Size::Colossal,
            ),
        ],
    }));
}

fn add_treants(monsters: &mut Vec<MonsterEntry>) {
    struct TreantDefinition {
        active_abilities: Vec<ActiveAbility>,
        alignment: String,
        attributes: Vec<i32>,
        knowledge: Knowledge,
        level: i32,
        modifiers: Vec<Modifier>,
        name: String,
        size: Size,
    }

    // TODO: make movement slow
    // TODO: add "Unhurried and Unfaltering" from dryaidi?
    impl TreantDefinition {
        fn monster(mut self) -> Monster {
            self.modifiers
                .push(Modifier::PassiveAbility(PassiveAbility::indwelt()));
            animate(MonsterDef {
                abilities: MonsterAbilities {
                    active_abilities: self.active_abilities,
                    // TODO: add weapon
                    modifiers: self.modifiers,
                    movement_speeds: Some(vec![MovementSpeed::new(
                        MovementMode::Land,
                        SpeedCategory::Slow,
                    )]),
                    senses: vec![],
                    trained_skills: vec![Skill::Awareness],
                },
                narrative: Some(MonsterNarrative {
                    alignment: self.alignment,
                    art: false,
                    description: None,
                    knowledge: Some(self.knowledge),
                }),
                statistics: MonsterStatistics {
                    attributes: self.attributes,
                    // TODO: should some treants be elite?
                    elite: false,
                    level: self.level,
                    role: Role::Warrior,
                    size: self.size,
                },
                name: self.name,
            })
        }
    }

    fn treeclub_strike(name: &str, effect: &str) -> ActiveAbility {
        ActiveAbility::Strike(StrikeAbility {
            effect: effect.to_string(),
            name: name.to_string(),
            weapon: Weapon {
                accuracy: 0,
                damage_dice: DicePool::d10(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Treeclub".to_string(),
                tags: vec![WeaponTag::Forceful, WeaponTag::Heavy],
            },
            ..Default::default()
        })
    }

    let mut treants = vec![];

    treants.push(
        TreantDefinition {
            active_abilities: vec![
                treeclub_strike(
                    "Rebounding Treeclub",
                    r"
                        The $name makes a $accuracy strike vs. Armor with its treeclub.
                        It gains a +2 accuracy bonus if it missed the target with a strike last round.
                        \hit $fullweapondamage.
                    ",
                ),
            ],
            alignment: "Usually true neutral".to_string(),
            attributes: vec![2, 0, 5, 0, 4, -2],
            knowledge: Knowledge::new(vec![(0, "
                Birch treants tend to be shy, and they to avoid conflict if at all possible.
            ")]),
            level: 5,
            modifiers: vec![Modifier::vulnerable_damage(DamageType::Fire)],
            name: "Birch Treant".to_string(),
            size: Size::Large,
        }.monster(),
    );

    treants.push(
        TreantDefinition {
            active_abilities: vec![
                treeclub_strike(
                    "Anklespraining Treeclub",
                    r"
                        The $name makes a $accuracy strike vs. Armor with its treeclub.
                        \hit $fullweapondamage.
                        If the target takes damage and the attack result beats its Reflex defense, it becomes \slowed as a \glossterm{condition}.
                    ",
                ),
                treeclub_strike(
                    "Tricky Treeclub",
                    r"
                        The $name makes a $accuracy strike vs. Armor with its treeclub.
                        If the attack result beats the target's Reflex defense, the strike deals $d6p4 \glossterm{extra damage}.
                        \hit $fullweapondamage.
                    "
                ),
            ],
            alignment: "Usually true neutral".to_string(),
            attributes: vec![2, 0, 6, 0, 3, 1],
            knowledge: Knowledge::new(vec![(0, "
                Chestnut treants tend to mischievous and outgoing.
                They like playing small tricks on interesting creatures that pass by.
            ")]),
            level: 6,
            modifiers: vec![Modifier::vulnerable_damage(DamageType::Fire)],
            name: "Chestnut Treant".to_string(),
            size: Size::Large,
        }.monster(),
    );

    treants.push(
        TreantDefinition {
            active_abilities: vec![
                treeclub_strike(
                    "Whirling Treeclub",
                    r"
                        The $name makes a $accuracy strike vs. Armor with its treeclub.
                        The strike targets all adjacent enemies.
                        \hit $fullweapondamage.
                        \miss Half damage.
                    ",
                ),
                treeclub_strike(
                    "Lashing Treeclub",
                    r"
                        The $name makes a $accuracy strike vs. Armor with its treeclub.
                        \hit $fullweapondamage.
                        If the target loses hit points, the $name makes an additional strike against it with the same accuracy and damage.
                    ",
                ),
            ],
            alignment: "Usually true neutral".to_string(),
            attributes: vec![2, 3, 5, 1, 2, -2],
            knowledge: Knowledge::new(vec![(0, "
                Willow treants are the most agile treants, and they can twist and bend their bodies with surprising finesse.
                Their attitudes tend to be similarly flexible, and they can be easily persuadable.
            ")]),
            level: 7,
            modifiers: vec![Modifier::vulnerable_damage(DamageType::Fire)],
            name: "Willow Treant".to_string(),
            size: Size::Large,
        }.monster(),
    );

    treants.push(
        TreantDefinition {
            active_abilities: vec![
                treeclub_strike(
                    "Festering Treeclub",
                    r"
                        The $name makes a $accuracy strike vs. Armor with its treeclub.
                        \hit $fullweapondamage.
                        If the target loses hit points, it takes damage from the strike again during the $name's next action.
                    ",
                ),
                treeclub_strike(
                    "Sickening Treeclub",
                    r"
                        The $name makes a $accuracy strike vs. Armor with its treeclub.
                        \hit $fullweapondamage.
                        If the target takes damage and the attack result beats its Fortitude defense, it is \stunned as a \glossterm{condition}.
                    ",
                ),
            ],
            alignment: "Usually neutral evil".to_string(),
            attributes: vec![5, 0, 5, 1, 1, 2],
            knowledge: Knowledge::new(vec![(0, "
                Darkroot treants, unlike most other treants, primarily inhabit swamps and other grimy places.
                Their bark is mottled with fungus, and they tend to have a more sinister demeanor than most treants.
            ")]),
            level: 8,
            modifiers: vec![],
            name: "Darkroot Treant".to_string(),
            size: Size::Large,
        }.monster(),
    );

    treants.push(
        TreantDefinition {
            active_abilities: vec![
                treeclub_strike(
                    "Resounding Treeclub",
                    r"
                        The $name makes a $accuracy strike vs. Armor with its treeclub.
                        If the attack result beats the target's Fortitude defense, the strike deals $d6p4 \glossterm{extra damage}.
                        \hit $fullweapondamage.
                    ",
                ),
                treeclub_strike(
                    "Felling Treeclub",
                    r"
                        The $name makes a $accuracy+2 strike vs. Armor with its treeclub.
                        \hit $fullweapondamage.
                        If the target loses hit points, it falls \prone.
                        This is a \abilitytag{Size-Based} effect.
                    ",
                ),
            ],
            alignment: "Usually neutral good".to_string(),
            attributes: vec![4, -2, 8, 2, 1, 4],
            knowledge: Knowledge::new(vec![(0, "
                Pine treants tend to be the most steadfast treants.
                They are strong-willed, like oak trees.
                However, while oak treants are stubborn, pine treants are resolutely benevolent, sheltering all who need aid.
            ")]),
            level: 9,
            modifiers: vec![
                // All Huge treants get +2 armor
                Modifier::Defense(Defense::Armor, 2),
                Modifier::vulnerable_damage(DamageType::Fire),
            ],
            name: "Pine Treant".to_string(),
            size: Size::Huge,
        }.monster(),
    );

    treants.push(
        TreantDefinition {
            active_abilities: vec![
                treeclub_strike(
                    "Surefell Treeclub",
                    r"
                        The $name makes a $accuracy+1 strike vs. Armor with its treeclub.
                        \hit $fullweapondamage.
                        If the target takes damage, it falls \prone.
                    ",
                ),
                treeclub_strike(
                    "Boneshattering Treeclub",
                    r"
                        The $name makes a $accuracy+1 strike vs. Armor with its treeclub.
                        If the attack result beats a creature's Fortitude defense, the strike deals maximum damage.
                        \hit $fullweapondamage.
                    ",
                ),
            ],
            alignment: "Usually true neutral".to_string(),
            attributes: vec![5, -2, 7, 0, 0, 5],
            knowledge: Knowledge::new(vec![(0, "
                Oak treants tend to be the most stubborn treants.
                They brook no guff from wayward adventurers.
            ")]),
            level: 10,
            modifiers: vec![
                Modifier::Defense(Defense::Armor, 2),
                Modifier::vulnerable_damage(DamageType::Fire),
            ],
            name: "Oak Treant".to_string(),
            size: Size::Huge,
        }.monster(),
    );

    treants.push(
        TreantDefinition {
            active_abilities: vec![
                treeclub_strike(
                    "Bracing Treeclub",
                    r"
                        The $name makes a $accuracy strike vs. Armor with its treeclub.
                        In addition, it is \impervious to all damage this round.
                        Because this is a \abilitytag{Swift} ability, it affects attacks against it during the current phase.
                        \hit $fullweapondamage.
                    ",
                ),
                treeclub_strike(
                    "Felling Treeclub",
                    r"
                        The $name makes a $accuracy+3 strike vs. Armor with its treeclub.
                        \hit $fullweapondamage.
                        If the target loses hit points, it falls \prone.
                        This is a \abilitytag{Size-Based} effect.
                    ",
                ),
            ],
            alignment: "Usually true neutral".to_string(),
            attributes: vec![6, -2, 8, 0, 1, 2],
            knowledge: Knowledge::new(vec![(
                0,
                "
                Cyprus treants are the most durable treants.
                They are virtually indestructible, and are fearsome when roused to anger.
            ",
            )]),
            level: 11,
            modifiers: vec![Modifier::Defense(Defense::Armor, 2)],
            name: "Cyprus Treant".to_string(),
            size: Size::Huge,
        }
        .monster(),
    );

    let animate_tree = ActiveAbility::Custom(CustomAbility {
        ability_type: AbilityType::Normal,
        effect: r"
            The treant animates a tree to fight by its side.
            The tree must be no larger than the treant, and it must be the same type of tree as the treant.

            The tree's combat statistics are the same as the treant's, except that the tree may be a different size category, and it lacks this ability.
            This ability lasts until the treant uses it again or dismisses it as a \glossterm{free action}.
            When this ability ends, the tree sets down roots in its new location if possible.
            Treants avoid stranding trees in unsustainable locations except in desperate circumstances.
        ".to_string(),
        is_magical: true,
        name: "Animate Tree".to_string(),
        tags: vec![],
        usage_time: UsageTime::Standard,
    });

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        art: false,
        description: Some(format!(
            "
                All treants have the \\ability<animate tree> ability.
                {}
            ",
            animate_tree.latex_ability_block(&Creature::new(1, CreatureCategory::Character))
        )),
        knowledge: None,
        name: "Treants".to_string(),
        monsters: treants,
    }));
}
