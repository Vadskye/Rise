use crate::core_mechanics::abilities::{AbilityTag, ActiveAbility, StrikeAbility};
use crate::core_mechanics::attacks::StandardAttack;
use crate::core_mechanics::{
    Attribute, HasAttributes, MovementMode, MovementSpeed,
    PassiveAbility, Sense, Size, SpecialDefenseType, SpeedCategory,
};
use crate::creatures::{calculate_standard_rank, Modifier, ModifierBundle, Monster};
use crate::equipment::Weapon;
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::monster_group::MonsterGroup;
use crate::monsters::{MonsterAbilities, MonsterDef, MonsterNarrative, MonsterStatistics, Role};
use crate::skills::Skill;
use std::cmp::{max, min};

use super::humanoids::{add_humans, add_orcs};

fn undead(def: MonsterDef) -> Monster {
    def.monster(CreatureType::Undead)
}

pub fn undeads() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    add_ghouls(&mut monsters);
    add_vampires(&mut monsters);
    add_skeletons(&mut monsters);
    add_zombies(&mut monsters);

    monsters.push(MonsterEntry::Monster(undead(MonsterDef {
        abilities: MonsterAbilities {
            active_abilities: vec![],
            modifiers: ModifierBundle::Incorporeal.plus_modifiers(vec![
                Modifier::Attack(StandardAttack::InflictWound(1).attack()),
            ]),
            movement_speeds: Some(vec![
                MovementSpeed::new(MovementMode::Fly(None), SpeedCategory::Normal)
            ]),
            senses: vec![
                Sense::Darkvision(60),
                Sense::Lifesense(120),
            ],
            trained_skills: vec![
                Skill::Awareness,
                Skill::Stealth,
            ],
        },
        narrative: Some(MonsterNarrative {
            alignment: "Always neutral evil".to_string(),
            art: true,
            description: None,
            knowledge: Some(Knowledge::new(vec![
                (0, "
                    Allips are incorporeal ghost-like creatures.
                    They cannot speak intelligibly, but they are known for their propensity for babbling incoherently as they attack.
                "),
                (5, "
                    An allip is the spectral remains of someone driven to suicide by madness.
                    It craves only revenge and unrelentingly pursues those that it believes tormented it in life.
                    This belief may or may not have any basis in reality.
                "),
            ])),
        }),
        statistics: MonsterStatistics {
            attributes: vec![0, 3, 0, -2, -2, 6],
            elite: true,
            level: 3,
            role: Role::Skirmisher,
            size: Size::Medium,
        },
        name: "Allip".to_string(),
    })));

    monsters
}

pub fn add_ghouls(monsters: &mut Vec<MonsterEntry>) {
    struct Ghoul {
        attributes: Vec<i32>,
        knowledge: Option<Knowledge>,
        level: i32,
        modifiers: Option<Vec<Modifier>>,
        name: String,
        trained_skills: Vec<Skill>,
    }

    impl Ghoul {
        fn monster(self) -> Monster {
            let mut modifiers = self.modifiers.unwrap_or(vec![]);
            let rank = calculate_standard_rank(self.level);
            modifiers.push(Modifier::Vulnerable(SpecialDefenseType::AbilityTag(
                AbilityTag::Compulsion,
            )));
            modifiers.push(Modifier::Vulnerable(SpecialDefenseType::AbilityTag(
                AbilityTag::Emotion,
            )));
            undead(MonsterDef {
                name: self.name,
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility {
                            effect: r"
                                The $name makes a $accuracy melee strike with its bite.
                                \hit $fullweapondamage.
                                If the target loses hit points and the attack result beats its Fortitude defense, the target becomes \vulnerable to all damage as a condition.
                            ".to_string(),
                            name: "Flesh-Rending Bite".to_string(),
                            weapon: Weapon::bite(),
                            ..Default::default()
                        }.plus_accuracy(rank - 1)),
                    ],
                    // weapons: vec![
                    //     StandardWeapon::MonsterBite.weapon(),
                    //     StandardWeapon::Claws.weapon(),
                    // ],
                    modifiers,
                    movement_speeds: None,
                    senses: vec![Sense::Darkvision(60)],
                    trained_skills: self.trained_skills,
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Always neutral evil".to_string(),
                    art: false,
                    description: None,
                    knowledge: self.knowledge,
                }),
                statistics: MonsterStatistics {
                    attributes: self.attributes,
                    elite: false,
                    level: self.level,
                    role: Role::Brute,
                    size: Size::Medium,
                },
            })
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Ghouls".to_string(),
        art: true,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Ghouls are undead creatures that hunger for the flesh of the living.
                Their bodies are emaciated and desiccated, with no blood or fluids remaining.
                Although they are sometimes confused with zombies, ghouls are faster and smarter than their lesser kin.
            "),
            (5, r"
                Ghouls can lay simple ambushes, but lack the capacity for complex traps or schemes.
                They are commmonly found in the service of vampires, who can create new ghouls by draining the blood of their victims completely.
                As natural servants, ghouls are surprisingly weak-willed despite their combat acumen.
            "),
        ])),
        monsters: vec![
            Ghoul {
                attributes: vec![4, 4, 0, -4, 1, -2],
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Drudge ghouls are the weakest form of ghoul.
                        They are typically made from incomplete corpses or partially botched rituals that failed to create a true ghoul.
                    "),
                ])),
                level: 3,
                modifiers: None,
                name: "Drudge Ghoul".to_string(),
                trained_skills: vec![],
            }.monster(),
            Ghoul {
                attributes: vec![5, 5, 1, -3, 1, 0],
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        True ghouls are the most common form of ghoul.
                    "),
                ])),
                level: 6,
                modifiers: None,
                name: "True Ghoul".to_string(),
                trained_skills: vec![],
            }.monster(),
        ],
    }));
}

pub fn add_vampires(monsters: &mut Vec<MonsterEntry>) {
    struct Vampire {
        attributes: Vec<i32>,
        knowledge: Option<Knowledge>,
        level: i32,
        modifiers: Option<Vec<Modifier>>,
        name: String,
        trained_skills: Vec<Skill>,
    }

    impl Vampire {
        fn monster(self) -> Monster {
            let mut modifiers = self.modifiers.unwrap_or(vec![]);
            modifiers.push(Modifier::PassiveAbility(PassiveAbility {
                description: r"
                    As a standard action, a vampire can \glossterm{shapeshift} into the form of a Tiny bat, a Medium cloud of mist, or its normal humanoid form.
                    While in its bat form, it gains \trait{blindsense} (120 ft.) and a 40 foot fly speed with a 60 ft. height limit.
                    While in its mist form, it becomes \trait{floating} and \trait{intangible}, and gains a 20 foot fly speed with a 60 ft. height limit.

                    In either non-humanoid form, the vampire is unable to use any standard action other than to resume its humanoid form.
                    This ability is almost exclusively used for mobility rather than combat.
                    A vampire cannot use this ability while it is \paralyzed.
                ".to_string(),
                is_magical: true,
                name: "Nightshifter".to_string(),
            }));
            modifiers.push(Modifier::PassiveAbility(PassiveAbility {
                description: r"
                    Vampires have a number of specific weaknesses.
                    \parhead{Blood Dependence} For every 24 hours that a vampire remains awake without ingesting the blood of a living creature, its maximum hit points are reduced by 20.
                    If its maximum hit points are reduced to 0 in this way, it dies and withers away into a pile of ash.
                    This penalty is removed as soon as the vampire drinks blood.
                    A vampire can can enter a torpor to survive indefinitely without blood.
                    While in a torpor, it is unconscious until it smells blood nearby.
                    \parhead{Garlic} Whenever a vampire smells or touches garlic, it takes 10 damage and becomes \frightened by any creatures bearing garlic as a condition.
                    This damage is repeated at the during each subsequent \glossterm{action phase} that the vampire spends exposed to garlic.
                    \parhead{Holy Water} Whenever a vampire takes damage from holy water, it becomes \stunned as a condition.
                    \parhead{Running Water} Whenever a vampire touches or flies over running water, it takes 10 damage and \glossterm{briefly} becomes \immobilized.
                    This applies as long as the vampire is within 100 feet of the running water, even the water is underground or under a bridge.
                    It can use the \ability{struggle} ability to move despite being immobilized, but only towards the closest shore.
                    This damage is repeated at the during each subsequent \glossterm{action phase} that the vampire spends touching or flying over running water.
                    \parhead{Silver} Vampires are \vulnerable to strikes using silvered weapons.
                    \parhead{Sunlight} Whenever a vampire is exposed to sunlight, it takes 10 damage and becomes \stunned as a condition.
                    This damage is repeated at the during each subsequent \glossterm{action phase} that the vampire spends in true sunlight.
                    \parhead{Unmirrored} Vampires have no reflection in mirrors, including their clothes and equipment.
                      This can allow careful observers to identify vampires.
                    \parhead{Wooden Stakes} If a vampire loses hit points from a critical strike using a wooden stake, the stake becomes impaled in its heart.
                    The vampire becomes \paralyzed until the stake is removed.
                    A wooden stake is a \weapontag{Light} improvised weapon that deals 1d4 damage.
                ".to_string(),
                is_magical: true,
                name: "Unholy Creature of the Night".to_string(),
            }));
            modifiers.push(Modifier::Attack(
                StandardAttack::VampireAlluringGaze(calculate_standard_rank(self.level)).attack(),
            ));

            undead(MonsterDef {
                name: self.name,
                abilities: MonsterAbilities {
                    active_abilities: vec![
                        ActiveAbility::Strike(StrikeAbility {
                            effect: r"
                                The $name makes a $accuracy melee strike with its bite.
                                \hit $fullweapondamage.
                                At the end of the round, the $name regains hit points and damage resistance equal to the hit points the target lost from the attack, ignoring negative damage and any damage increase from critical hits.
                                This healing only works if the target has blood, as most living creatures do.
                            ".to_string(),
                            name: "Blood Drain".to_string(),
                            weapon: Weapon::bite(),
                            ..Default::default()
                        }),
                    ],
                    modifiers,
                    movement_speeds: None,
                    senses: vec![Sense::Darkvision(120)],
                    trained_skills: self.trained_skills,
                },
                narrative: Some(MonsterNarrative {
                    alignment: "Usually lawful evil".to_string(),
                    art: false,
                    description: None,
                    knowledge: self.knowledge,
                }),
                statistics: MonsterStatistics {
                    attributes: self.attributes,
                    elite: true,
                    level: self.level,
                    role: Role::Skirmisher,
                    size: Size::Medium,
                },
            })
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Vampires".to_string(),
        art: false,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Vampires are humanoid-looking undead that feast on the blood of the living.
                They rule the night, but fear the sun, which can utterly destroy them.
                Vampires are unable to cross running water or enter true sunlight.
                Garlic and holy water are effective tools to defend against a vampire, but they are no guarantee.
            "),
            (5, r"
                Because vampires are so vulnerable during the day, they typically put great effort into acquiring manors or dungeons to live in.
                Their homes are attended by powerful servants who can protect them so they do not have to risk fighting during the day.
                Some vampires prefer undead servants, while others use living minions who may or may not know the vampire's true nature.
                Vampires are the most life-like of all undead, and they can easily pass as living if it suits their purposes.
            "),
            (10, "
                The most ancient and powerful vampires can cross running water or enter true sunlight, but only briefly.
                In emergencies, with no blood available, vampires can enter a torpor that staves off their need for blood.
                However, they are extremely vulnerable in this state, so only a desperate vampire would consider it.
            "),
        ])),
        monsters: vec![
            Vampire {
                attributes: vec![3, 4, 1, 3, 3, 3],
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Fledgling vampires are the weakest form of vampire.
                        They are recently turned, and some still feel a strong attachment to their old life.
                        Despite their inexperience, they still possess most of a vampire's powerful abilities, so they should not be taken lightly.
                    "),
                    (5, "
                        Most fledgling vampires are still growing accustomed to their need for blood.
                        They may attempt to fast, which weakens them, before being consumed by an uncontrollable bloodlust.
                    "),
                ])),
                level: 5,
                modifiers: None,
                name: "Fledgling Vampire".to_string(),
                trained_skills: vec![
                    Skill::Awareness,
                    Skill::Intimidate,
                ],
            }.monster(),
            Vampire {
                attributes: vec![4, 5, 1, 4, 4, 4],
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        True vampires have fully awakened their vampiric potential.
                        They have abandoned the world of the living and embraced their need for blood.
                    "),
                ])),
                level: 10,
                modifiers: None,
                name: "True Vampire".to_string(),
                trained_skills: vec![
                    Skill::Awareness,
                    Skill::Intimidate,
                    Skill::SocialInsight,
                    Skill::Persuasion,
                ],
            }.monster(),
            Vampire {
                attributes: vec![4, 6, 2, 5, 5, 5],
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Vampire lords are one of the most powerful types of undead.
                        They can command legions of followers and vast fortunes that they have developed over centuries.
                    "),
                ])),
                level: 15,
                modifiers: None,
                name: "Vampire Lord".to_string(),
                trained_skills: vec![
                    Skill::Awareness,
                    Skill::Intimidate,
                    Skill::SocialInsight,
                    Skill::Persuasion,
                ],
            }.monster(),
        ],
    }));
}

fn add_skeletons(monsters: &mut Vec<MonsterEntry>) {
    let skeletons = generate_corpses().iter().map(convert_to_skeleton).collect();

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Skeletons".to_string(),
        art: true,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Skeletons are the reanimated corpses of once-living creatures.
                They are the most basic form of animated undead, since they can be created from corpses that have been reduced to mere bones.
                Creating a skeleton is generally regarded as a fundamentally evil act.
            "),
            (5, r"
                Skeletons retain all of the \glossterm{mundane} abilities of the reanimated creature, but lose all \magical abilities.
                They retain the ability to wield the same weapons and armor as the original creature, but they become simple-minded.
                In addition, skeletons are always more agile and less strong than the original creature.
            "),
            (10, "
                Creating a skeleton from a corpse requires splintering the soul of the creature the corpse belonged to.
                The soul splinter created this way is used to give the skeleton its agency.
                This is unpleasant for the dead creature in its afterlife, though not dangerous.

                Skeletons are never created by ambient necromantic magic.
                They have no internal intelligence or agency of any kind, and precisely obey the instructions of their controllers.
                If their instructions are poorly worded or incomplete, skeletons may fail to fight even if attacked.
            "),
        ])),
        monsters: skeletons,
    }));
}

fn generate_corpses() -> Vec<Monster> {
    let mut corpses = vec![];
    let mut corpse_entries = vec![];
    add_humans(&mut corpse_entries);
    add_orcs(&mut corpse_entries);

    for entry in corpse_entries {
        if let MonsterEntry::MonsterGroup(group) = entry {
            for monster in group.monsters {
                corpses.push(monster);
            }
        } else if let MonsterEntry::Monster(monster) = entry {
            corpses.push(monster);
        }
    }

    corpses
}

fn convert_to_skeleton(monster: &Monster) -> Monster {
    let creature = &monster.creature;
    // +1 str, +1 dex, -2 con, fixed int/per/wil
    let max_attribute = monster.challenge_rating.max_base_attribute();
    let attributes = vec![
        min(
            max_attribute,
            creature.get_base_attribute(&Attribute::Strength) + 1,
        ),
        min(
            max_attribute,
            creature.get_base_attribute(&Attribute::Dexterity) + 1,
        ),
        max(
            -9,
            creature.get_base_attribute(&Attribute::Constitution) - 2,
        ),
        -7,
        0,
        0,
    ];

    let mut modifiers = ModifierBundle::SimpleMinded.modifiers();
    for im in &creature.identified_modifiers {
        if im.source == "FullMonsterDefinition" && !im.modifier.is_magical() {
            modifiers.push(im.modifier.clone());
        }
    }

    let mut senses = creature.senses.as_ref().unwrap_or(&vec![]).clone();
    if !senses.iter().any(|s| {
        if let Sense::Darkvision(_) = s {
            true
        } else {
            false
        }
    }) {
        senses.push(Sense::Darkvision(60));
    }

    undead(MonsterDef {
        name: format!("Skeletal {}", creature.name.as_ref().unwrap()),
        abilities: MonsterAbilities {
            active_abilities: vec![],
            // weapons: creature.weapons.clone(),
            modifiers,
            movement_speeds: Some(creature.movement_speeds.clone()),
            senses,
            trained_skills: vec![],
        },
        narrative: Some(MonsterNarrative {
            alignment: "Always neutral evil".to_string(),
            art: false,
            description: monster.description.clone(),
            knowledge: None,
        }),
        statistics: MonsterStatistics {
            attributes,
            elite: monster.challenge_rating == ChallengeRating::Four,
            level: creature.level,
            role: Role::Warrior,
            size: creature.size.clone(),
        },
    })
}

fn convert_to_zombie(monster: &Monster) -> Monster {
    let creature = &monster.creature;
    // +2 str, -2 dex, +2 con, fixed int/per/wil
    let max_attribute = monster.challenge_rating.max_base_attribute();
    let attributes = vec![
        min(
            max_attribute,
            creature.get_base_attribute(&Attribute::Strength) + 2,
        ),
        max(-9, creature.get_base_attribute(&Attribute::Dexterity) - 2),
        min(
            max_attribute,
            creature.get_base_attribute(&Attribute::Constitution) + 2,
        ),
        -7,
        0,
        0,
    ];

    let mut modifiers = ModifierBundle::SimpleMinded.modifiers();
    for im in &creature.identified_modifiers {
        if im.source == "FullMonsterDefinition" && !im.modifier.is_magical() {
            modifiers.push(im.modifier.clone());
        }
    }

    let mut senses = creature.senses.as_ref().unwrap_or(&vec![]).clone();
    if !senses.iter().any(|s| {
        if let Sense::Darkvision(_) = s {
            true
        } else {
            false
        }
    }) {
        senses.push(Sense::Darkvision(60));
    }

    let mut movement_speeds = vec![];
    if !creature.movement_speeds.is_empty() {
        for original_mode in &creature.movement_speeds {
            movement_speeds.push(original_mode.slower())
        }
    } else {
        movement_speeds.push(MovementSpeed::new(MovementMode::Land, SpeedCategory::Slow));
    }

    undead(MonsterDef {
        name: format!("Zombie {}", creature.name.as_ref().unwrap()),
        abilities: MonsterAbilities {
            active_abilities: vec![],
            // weapons: vec![StandardWeapon::MonsterBite.weapon()],
            modifiers,
            movement_speeds: Some(movement_speeds),
            senses,
            trained_skills: vec![],
        },
        narrative: Some(MonsterNarrative {
            alignment: "Always neutral evil".to_string(),
            art: false,
            description: monster.description.clone(),
            knowledge: None,
        }),
        statistics: MonsterStatistics {
            attributes,
            elite: monster.challenge_rating == ChallengeRating::Four,
            level: creature.level,
            role: Role::Brute,
            size: creature.size.clone(),
        },
    })
}

fn add_zombies(monsters: &mut Vec<MonsterEntry>) {
    let zombies = generate_corpses().iter().map(convert_to_zombie).collect();

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Zombies".to_string(),
        art: false,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Zombies are the reanimated corpses of once-living creatures.
                They must be created from corpses that still retain most of their organs and internal structure.
                Creating a zombie is generally regarded as a fundamentally evil act.
            "),
            (5, r"
                Zombies retain all of the \glossterm{mundane} abilities of the reanimated creature, but lose all \magical abilities.
                They lose the ability to wield any weapons, though they can sometimes be found wearing the same armor as the original creature.
                Instead of using weapons, zombies prefer to bite their foes.
                In addition, zombies are always stronger and less agile than the original creature.
            "),
            (10, "
                Creating a zombie from a corpse requires splintering the soul of the creature the corpse belonged to.
                The soul splinter created this way is used to give the zombie its agency.
                This is unpleasant for the dead creature in its afterlife, though not dangerous.

                Zombies are sometimes created by ambient necromantic magic.
                Even if they are created and controlled by necromancers, they still retain an animalistic hunger for flesh, especially brains.
                If their instructions are poorly worded or incomplete, zombies may attack any living creature they see.
            "),
        ])),
        monsters: zombies,
    }));
}
