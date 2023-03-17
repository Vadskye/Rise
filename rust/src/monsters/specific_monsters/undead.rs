use crate::core_mechanics::abilities::AbilityTag;
use crate::core_mechanics::attacks::{LowDamageAndDebuff, StandardAttack};
use crate::core_mechanics::{
    Attribute, DamageType, Debuff, Defense, FlightManeuverability, HasAttributes, MovementMode,
    MovementSpeed, PassiveAbility, Sense, Size, SpecialDefenseType, SpeedCategory,
    StandardPassiveAbility,
};
use crate::creatures::{calculate_standard_rank, Modifier, ModifierBundle, Monster};
use crate::equipment::{StandardWeapon, Weapon};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Undead;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::monster_group::MonsterGroup;
use crate::monsters::{FullMonsterDefinition, Role};
use crate::skills::Skill;
use std::cmp::{max, min};

use super::humanoids::{add_humans, add_orcs};

struct FullUndeadDefinition {
    alignment: String,
    attributes: Vec<i32>,
    challenge_rating: ChallengeRating,
    description: Option<String>,
    knowledge: Option<Knowledge>,
    level: i32,
    modifiers: Option<Vec<Modifier>>,
    movement_speeds: Option<Vec<MovementSpeed>>,
    name: String,
    role: Role,
    senses: Option<Vec<Sense>>,
    size: Size,
    trained_skills: Option<Vec<Skill>>,
    weapons: Vec<Weapon>,
}

impl FullUndeadDefinition {
    fn monster(self) -> Monster {
        let mut modifiers = self.modifiers.unwrap_or(vec![]).clone();
        modifiers.push(Modifier::PassiveAbility(
            StandardPassiveAbility::Undead.ability(),
        ));
        return FullMonsterDefinition {
            // From self
            alignment: self.alignment,
            attributes: self.attributes,
            challenge_rating: self.challenge_rating,
            description: self.description,
            knowledge: self.knowledge,
            level: self.level,
            modifiers: Some(modifiers),
            movement_speeds: self.movement_speeds,
            name: self.name,
            role: self.role,
            senses: self.senses,
            size: self.size,
            trained_skills: self.trained_skills,
            weapons: self.weapons,

            // Default values
            creature_type: Undead,
        }
        .monster();
    }
}

pub fn undeads() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    add_ghouls(&mut monsters);
    add_vampires(&mut monsters);
    add_skeletons(&mut monsters);
    add_zombies(&mut monsters);

    monsters.push(MonsterEntry::Monster(FullUndeadDefinition {
        alignment: "Always neutral evil".to_string(),
        attributes: vec![0, 3, 0, 1, 2, 2],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Allips are incorporeal ghost-like creatures.
                They cannot speak intelligibly, but they are known for their propensity for babbling incoherently as they attack.
            "),
            (5, "
                An allip is the spectral remains of someone driven to suicide by a madness that afflicted it in life.
                It craves only revenge and unrelentingly pursues those who tormented it in life and pushed it over the brink.
            "),
        ])),
        level: 3,
        modifiers: Some(ModifierBundle::Incorporeal.plus_modifiers(vec![
            Modifier::Attack(StandardAttack::DrainingGrasp(1).attack()),
        ])),
        movement_speeds: Some(vec![
            MovementSpeed::new(MovementMode::Fly(FlightManeuverability::Perfect), SpeedCategory::Normal)
        ]),
        name: "Allip".to_string(),
        role: Role::Skirmisher,
        senses: Some(vec![
            Sense::Darkvision(60),
            Sense::Lifesense(120),
        ]),
        size: Size::Medium,
        trained_skills: Some(vec![
            Skill::Awareness,
            Skill::Stealth,
        ]),
        weapons: vec![],
    }.monster()));

    return monsters;
}

pub fn add_ghouls(monsters: &mut Vec<MonsterEntry>) {
    struct Ghoul {
        attributes: Vec<i32>,
        challenge_rating: ChallengeRating,
        knowledge: Option<Knowledge>,
        level: i32,
        modifiers: Option<Vec<Modifier>>,
        name: String,
        trained_skills: Option<Vec<Skill>>,
    }

    impl Ghoul {
        fn monster(self) -> Monster {
            let mut modifiers = self.modifiers.unwrap_or(vec![]);
            modifiers.push(Modifier::Attack(
                StandardAttack::GhoulBite(
                    calculate_standard_rank(self.level) + self.challenge_rating.rank_modifier(),
                )
                .attack(),
            ));
            modifiers.push(Modifier::Vulnerable(SpecialDefenseType::AbilityTag(
                AbilityTag::Compulsion,
            )));
            modifiers.push(Modifier::Vulnerable(SpecialDefenseType::AbilityTag(
                AbilityTag::Emotion,
            )));
            return FullUndeadDefinition {
                // From def
                attributes: self.attributes,
                challenge_rating: self.challenge_rating,
                knowledge: self.knowledge,
                level: self.level,
                name: self.name,
                modifiers: Some(modifiers),
                trained_skills: self.trained_skills,

                alignment: "Always neutral evil".to_string(),
                description: None,
                movement_speeds: None,
                role: Role::Brute,
                senses: Some(vec![Sense::Darkvision(60)]),
                size: Size::Medium,
                weapons: vec![
                    StandardWeapon::MultipedalBite.weapon(),
                    StandardWeapon::Claws.weapon(),
                ],
            }
            .monster();
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Ghouls".to_string(),
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
                attributes: vec![2, 4, 0, -4, 1, -2],
                challenge_rating: ChallengeRating::One,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Drudge ghouls are the weakest form of ghoul.
                        They are typically made from incomplete corpses or partially botched rituals that failed to create a true ghoul.
                    "),
                ])),
                level: 3,
                modifiers: None,
                name: "Drudge Ghoul".to_string(),
                trained_skills: None,
            }.monster(),
            Ghoul {
                attributes: vec![3, 4, 1, -3, 1, 0],
                challenge_rating: ChallengeRating::One,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        True ghouls are the most common form of ghoul.
                    "),
                ])),
                level: 6,
                modifiers: None,
                name: "True Ghoul".to_string(),
                trained_skills: None,
            }.monster(),
        ],
    }));
}

pub fn add_vampires(monsters: &mut Vec<MonsterEntry>) {
    struct Vampire {
        attributes: Vec<i32>,
        challenge_rating: ChallengeRating,
        knowledge: Option<Knowledge>,
        level: i32,
        modifiers: Option<Vec<Modifier>>,
        name: String,
        trained_skills: Option<Vec<Skill>>,
    }

    impl Vampire {
        fn monster(self) -> Monster {
            let mut modifiers = self.modifiers.unwrap_or(vec![]);
            modifiers.push(Modifier::PassiveAbility(PassiveAbility {
                description: r"
                    Whenever a vampire makes a creature lose hit points with its bite attack, it regains that much damage resistance.
                    This ability does not have the \abilitytag{Swift} tag, so it resolves after incoming attacks during the current phase.
                ".to_string(),
                is_magical: true,
                name: "Vampiric Recovery".to_string(),
            }));
            modifiers.push(Modifier::PassiveAbility(PassiveAbility {
                description: r"
                    As a standard action, a vampire can \glossterm{shapeshift} into the form of a Tiny bat, a Medium cloud of mist, or its normal humanoid form.
                    While in its bat form, it gains \trait{blindsense} (120 ft.) and a 40 foot fly speed with a 60 ft. height limit.
                    While in its mist form, it becomes \trait{incorporeal}, and gains a 20 foot fly speed with a 60 ft. height limit and perfect maneuverability.

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
                    \parhead{Blood Dependence} For every 24 hours that a vampire remains awake without ingesting the blood of a living creature, its maximum hit points are reduced by 50.
                    If its maximum hit points are reduced to 0 in this way, it dies and withers away into a pile of ash.
                    This penalty is removed as soon as the vampire drinks blood.
                    A vampire can can enter a torpor to survive indefinitely without blood.
                    \parhead{Garlic} Whenever a vampire smells or touches garlic, it takes 10 energy damage and \frightened by any creatures bearing garlic as a condition.
                    This damage is repeated at the during each subsequent \glossterm{action phase} that the vampire spends exposed to garlic.
                    \parhead{Holy Water} Whenever a vampire takes damage from holy water, it becomes briefly \stunned.
                    \parhead{Running Water} Whenever a vampire touches or flies over running water, it takes 10 energy damage and becomes \immobilized as a condition.
                    It can use the \ability{struggle} ability to move despite being immobilized, but only towards the closest shore.
                    This damage is repeated at the during each subsequent \glossterm{action phase} that the vampire spends touching or flying over running water.
                    \parhead{True Sunlight} Whenever a vampire is exposed to true sunlight, it takes 100 energy damage and becomes \blinded as a condition.
                    If it loses hit points from this damage, it immediately dies and dissolves into a pile of ash.
                    This damage is repeated at the during each subsequent \glossterm{action phase} that the vampire spends in true sunlight.
                    \parhead{Wooden Stakes} If a vampire loses hit points from a critical strike using a wooden stake, the stake becomes impaled in its heart.
                    The vampire becomes \paralyzed until the stake is removed.
                    A wooden stake is a light improvised weapon that deals 1d4 piercing damage.
                ".to_string(),
                is_magical: true,
                name: "Unholy Creature of the Night".to_string(),
            }));
            modifiers.push(Modifier::Attack(
                LowDamageAndDebuff {
                    damage_types: vec![],
                    debuff: Debuff::Stunned,
                    defense: Defense::Armor,
                    must_lose_hp: true,
                    is_magical: true,
                    is_maneuver: true,
                    name: "Drink Blood".to_string(),
                    rank: calculate_standard_rank(self.level)
                        + self.challenge_rating.rank_modifier(),
                    tags: None,
                }
                .weapon_attack(&StandardWeapon::MultipedalBite.weapon()),
            ));
            modifiers.push(Modifier::Attack(
                StandardAttack::VampireAlluringGaze(
                    calculate_standard_rank(self.level) + self.challenge_rating.rank_modifier(),
                )
                .attack(),
            ));

            return FullUndeadDefinition {
                // From def
                attributes: self.attributes,
                challenge_rating: self.challenge_rating,
                knowledge: self.knowledge,
                level: self.level,
                name: self.name,
                modifiers: Some(modifiers),
                trained_skills: self.trained_skills,

                alignment: "Usually lawful evil".to_string(),
                description: None,
                movement_speeds: None,
                role: Role::Leader,
                senses: Some(vec![Sense::Darkvision(120)]),
                size: Size::Medium,
                weapons: vec![
                    StandardWeapon::MultipedalBite.weapon(),
                    StandardWeapon::Slam.weapon(),
                ],
            }
            .monster();
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Vampires".to_string(),
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
                attributes: vec![5, 6, 4, 3, 4, 3],
                challenge_rating: ChallengeRating::Four,
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
                trained_skills: Some(vec![
                    Skill::Awareness,
                    Skill::Intimidate,
                ]),
            }.monster(),
            Vampire {
                attributes: vec![6, 6, 5, 4, 6, 4],
                challenge_rating: ChallengeRating::Four,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        True vampires have fully awakened their vampiric potential.
                        They have abandoned the world of the living and embraced their need for blood.
                    "),
                ])),
                level: 10,
                modifiers: None,
                name: "True Vampire".to_string(),
                trained_skills: Some(vec![
                    Skill::Awareness,
                    Skill::Intimidate,
                    Skill::SocialInsight,
                    Skill::Persuasion,
                ]),
            }.monster(),
            Vampire {
                attributes: vec![6, 6, 6, 5, 6, 5],
                challenge_rating: ChallengeRating::Four,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Vampire lords are one of the most powerful types of undead.
                        They can command legions of followers and vast fortunes that they have developed over centuries.
                    "),
                ])),
                level: 15,
                modifiers: None,
                name: "True Vampire".to_string(),
                trained_skills: Some(vec![
                    Skill::Awareness,
                    Skill::Intimidate,
                    Skill::SocialInsight,
                    Skill::Persuasion,
                ]),
            }.monster(),
        ],
    }));
}

fn add_skeletons(monsters: &mut Vec<MonsterEntry>) {
    let skeletons = generate_corpses()
        .iter()
        .map(|c| convert_to_skeleton(c))
        .collect();

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Skeletons".to_string(),
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Skeletons are the reanimated corpses of once-living creatures.
                They are the most basic form of animated undead, since they can be created from corpses that have been reduced to mere bones.
                Creating a skeleton is generally regarded as a fundamentally evil act.
            "),
            (5, r"
                Skeletons retain all of the \glossterm{mundane} abilities of the reanimated creature, but lose all \magical abilities.
                They retain the ability to wield the same weapons and armor as the original creature, but they are completely mindless.
                In addition, skeletons are always more agile and less strong than the original creature.
                All skeletons are vulnerable to bludgeoning damage thanks to their exposed and easily crumpled bones.
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

    return corpses;
}

fn convert_to_skeleton(monster: &Monster) -> Monster {
    let ref creature = monster.creature;
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

    let mut modifiers = vec![Modifier::Vulnerable(SpecialDefenseType::Damage(
        DamageType::Bludgeoning,
    ))];
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

    return FullUndeadDefinition {
        alignment: "Always neutral evil".to_string(),
        attributes,
        challenge_rating: monster.challenge_rating,
        description: monster.description.clone(),
        knowledge: None,
        level: creature.level,
        modifiers: Some(ModifierBundle::Mindless.plus_modifiers(modifiers)),
        movement_speeds: Some(creature.movement_speeds.clone()),
        name: format!("Skeletal {}", creature.name.as_ref().unwrap()),
        role: Role::Warrior,
        senses: Some(senses),
        size: creature.size.clone(),
        trained_skills: None,
        weapons: creature.weapons.clone(),
    }
    .monster();
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
        -3,
    ];

    let mut modifiers = vec![Modifier::Vulnerable(SpecialDefenseType::Damage(
        DamageType::Slashing,
    ))];
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
    if creature.movement_speeds.len() > 0 {
        for ref original_mode in &creature.movement_speeds {
            movement_speeds.push(original_mode.slower())
        }
    } else {
        movement_speeds.push(MovementSpeed::new(MovementMode::Land, SpeedCategory::Slow));
    }

    return FullUndeadDefinition {
        alignment: "Always neutral evil".to_string(),
        attributes,
        challenge_rating: monster.challenge_rating,
        description: monster.description.clone(),
        knowledge: None,
        level: creature.level,
        modifiers: Some(modifiers),
        movement_speeds: Some(movement_speeds),
        name: format!("Zombie {}", creature.name.as_ref().unwrap()),
        role: Role::Brute,
        senses: Some(senses),
        size: creature.size.clone(),
        trained_skills: None,
        weapons: vec![StandardWeapon::Slam.weapon()],
    }
    .monster();
}

fn add_zombies(monsters: &mut Vec<MonsterEntry>) {
    let zombies = generate_corpses()
        .iter()
        .map(|c| convert_to_zombie(c))
        .collect();

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        name: "Zombies".to_string(),
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Zombies are the reanimated corpses of once-living creatures.
                They must be created from corpses that still retain most of their organs and internal structure.
                Creating a zombie is generally regarded as a fundamentally evil act.
            "),
            (5, r"
                Zombies retain all of the \glossterm{mundane} abilities of the reanimated creature, but lose all \magical abilities.
                They lose the ability to wield any weapons, though they can sometimes be found wearing the same armor as the original creature.
                Instead of using weapons, zombies simply slam into their foes with brute force.
                In addition, zombies are always stronger and less agile than the original creature.
                All zombies are vulnerable to slashing damage thanks to their exposed and easily torn skin and muscles.
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
