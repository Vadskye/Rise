use crate::core_mechanics::attacks::StandardAttack;
use crate::core_mechanics::{
    DamageType, Debuff, FlightManeuverability, MovementMode, MovementSpeed, PassiveAbility, Sense,
    Size, SpecialDefenseType, SpeedCategory,
};
use crate::creatures::{Modifier, ModifierBundle, Monster};
use crate::equipment::{StandardWeapon, Weapon};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Animate;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{monster_group, FullMonsterDefinition, Role};
use crate::skills::Skill;

struct FullAnimateDefinition {
    alignment: String,
    attributes: Vec<i32>,
    challenge_rating: ChallengeRating,
    description: Option<String>,
    knowledge: Option<Knowledge>,
    level: i32,
    movement_speeds: Option<Vec<MovementSpeed>>,
    name: String,
    modifiers: Option<Vec<Modifier>>,
    role: Role,
    senses: Option<Vec<Sense>>,
    size: Size,
    trained_skills: Option<Vec<Skill>>,
    weapons: Vec<Weapon>,
}

fn animate(def: FullAnimateDefinition) -> Monster {
    return FullMonsterDefinition {
        // From def
        alignment: def.alignment,
        attributes: def.attributes,
        challenge_rating: def.challenge_rating,
        description: def.description,
        knowledge: def.knowledge,
        level: def.level,
        modifiers: def.modifiers,
        movement_speeds: def.movement_speeds,
        name: def.name,
        role: def.role,
        senses: def.senses,
        size: def.size,
        trained_skills: def.trained_skills,
        weapons: def.weapons,

        // Default values
        creature_type: Animate,
    }
    .monster();
}

pub fn animates() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::Monster(animate(FullAnimateDefinition {
        alignment: "Always neutral evil".to_string(),
        attributes: vec![0, 3, 0, 1, 2, 2],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                An darkwraith is a shadow disconnected from its host through strange umbramantic power.
                Though it appears similar to a ghost, it is not undead.
                It instinctively seeks out sources of warmth, including most living creatures, to suppress them with its chilling aura.
            "),
            (5, "
                Darkwraiths bear a hateful malevolence towards anything that brings light.
                Although they swarm around sources of warmth, they will not attack directly with their dark grasp unless provoked by light or damage.
                Darkwraiths cannot speak or make noise of any kind.
            "),
        ])),
        level: 4,
        modifiers: Some(vec![
            Modifier::Attack(StandardAttack::DarkGrasp(3).attack()),
            Modifier::Attack(StandardAttack::DarkMiasma(3).attack().except(
                |a| a.name = "Chilling Aura".to_string()
            )),
            Modifier::Impervious(SpecialDefenseType::Damage(DamageType::Cold)),
            Modifier::Immune(SpecialDefenseType::Debuff(Debuff::Prone)),
        ]),
        movement_speeds: Some(vec![
            MovementSpeed::new(MovementMode::Fly(FlightManeuverability::Perfect), SpeedCategory::Normal)
        ]),
        name: "Darkwraith".to_string(),
        role: Role::Skirmisher,
        senses: None,
        size: Size::Medium,
        trained_skills: Some(vec![
            Skill::Awareness,
            Skill::Stealth,
        ]),
        weapons: vec![],
    })));

    add_animated_objects(&mut monsters);

    add_treants(&mut monsters);

    monsters.push(MonsterEntry::Monster(animate(FullAnimateDefinition {
        alignment: "Always true neutral".to_string(),
        attributes: vec![4, -9, 7, -9, 0, -9],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Gelatinous cubes are virtually transparent oozes that creep along underground tunnels, digesting anything organic they encounter.
                They are feared for their near invisibility while immobile, making them easy to stumble into accidentally.
            "),
            (5, "
                When a gelatinous cube finds prey, it simply moves through the unfortunate creature, trapping it inside the ooze's body.
                Creatures engulfed in this way can find it difficult to escape while they are being slowly digested.
                Gelatinous cubes are unusually fast compared to other oozes, though they are still slow compared to most creatures.
            "),
        ])),
        level: 5,
        modifiers: Some(ModifierBundle::Amorphous.plus_modifiers(vec![
            Modifier::Attack(StandardAttack::OozeDissolve(2).attack()),
            Modifier::Attack(StandardAttack::OozeEngulf(2).attack()),
            Modifier::PassiveAbility(PassiveAbility {
                description: r"
                    The $name can move freely through spaces occupied by other creatures who do not have this ability.
                ".to_string(),
                is_magical: false,
                name: "Gelatinous".to_string(),
            }),
            Modifier::PassiveAbility(PassiveAbility {
                description: r"
                    The $name is transparent, making it hard to see.
                    While it remains immobile, it is always treated as having \glossterm{concealment}, allowing it to hide (see \pcref{Stealth}).
                    In addition, it gains a +10 bonus to Stealth checks made to simply hide in place.
                    Once it starts moving or fighting, it loses this concealment, since its simple cubic shape makes it fairly easy to track.

                    If the $name has recently fed, it may have partially dissolved remains visibly suspended inside its body, which can make it much easier to notice.
                ".to_string(),
                is_magical: false,
                name: "Transparent".to_string(),
            }),
        ])),
        movement_speeds: Some(vec![
            MovementSpeed::new(MovementMode::Land, SpeedCategory::Slow)
        ]),
        name: "Gelatinous Cube".to_string(),
        role: Role::Brute,
        senses: None,
        size: Size::Large,
        trained_skills: Some(vec![
            Skill::Endurance,
            Skill::Flexibility,
            Skill::Stealth,
        ]),
        weapons: vec![],
    })));

    return monsters;
}

fn add_animated_objects(monsters: &mut Vec<MonsterEntry>) {
    // TODO: attach knowledge checks to the group as a whole, not any individual animated object
    fn create_animated_object(
        attributes: Vec<i32>,
        challenge_rating: ChallengeRating,
        level: i32,
        name: &str,
        size: Size,
    ) -> Monster {
        return animate(FullAnimateDefinition {
            alignment: "Always true neutral".to_string(),
            attributes,
            challenge_rating,
            description: None,
            knowledge: None,
            level,
            modifiers: None,
            movement_speeds: None,
            name: name.to_string(),
            role: Role::Brute,
            senses: Some(vec![Sense::Darkvision(60)]),
            size,
            trained_skills: None,
            weapons: vec![StandardWeapon::Slam.weapon()],
        });
    }

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        knowledge: None,
        name: "Animated Objects".to_string(),
        monsters: vec![
            create_animated_object(
                vec![-4, 3, -4, 0, 0, -5],
                ChallengeRating::One,
                1,
                "Tiny Object",
                Size::Tiny,
            ),
            create_animated_object(
                vec![-2, 2, -2, 0, 0, -5],
                ChallengeRating::One,
                1,
                "Small Object",
                Size::Small,
            ),
            create_animated_object(
                vec![0, 0, 0, 0, 0, -5],
                ChallengeRating::One,
                2,
                "Medium Object",
                Size::Medium,
            ),
            create_animated_object(
                vec![2, -1, 2, 0, 0, -5],
                ChallengeRating::One,
                4,
                "Large Object",
                Size::Large,
            ),
            create_animated_object(
                vec![3, -2, 3, 0, 0, -5],
                ChallengeRating::One,
                7,
                "Huge Object",
                Size::Huge,
            ),
            create_animated_object(
                vec![4, -2, 4, 0, 0, -5],
                ChallengeRating::One,
                9,
                "Gargantuan Object",
                Size::Gargantuan,
            ),
            create_animated_object(
                vec![5, -3, 5, 0, 0, -5],
                ChallengeRating::One,
                11,
                "Colossal Object",
                Size::Colossal,
            ),
        ],
    }));
}

fn add_treants(monsters: &mut Vec<MonsterEntry>) {
    struct TreantDefinition {
        alignment: String,
        attributes: Vec<i32>,
        knowledge: Knowledge,
        level: i32,
        modifiers: Option<Vec<Modifier>>,
        name: String,
        size: Size,
    }

    impl TreantDefinition {
        fn monster(self) -> Monster {
            let mut modifiers = self.modifiers.unwrap_or(vec![]);
            modifiers.push(
                Modifier::PassiveAbility(PassiveAbility {
                    name: "Animate Tree".to_string(),
                    is_magical: true,
                    description: "
                        As a standard action, the treant can animate a tree to fight by its side.
                        The tree must be no larger than the treant, and it must be the same type of tree as the treant.

                        The tree's combat statistics are the same as the treant's, except that the tree may be a different size category, and it lacks this ability.
                        This ability lasts until the treant uses it again or dismisses it as a \\glossterm{free action}.
                        When this ability ends, the tree sets down roots in its new location if possible.
                        Treants avoid stranding trees in unsustainable locations except in desperate circumstances.
                    ".to_string(),
                })
            );
            return animate(FullAnimateDefinition {
                alignment: self.alignment,
                attributes: self.attributes,
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: Some(self.knowledge),
                level: self.level,
                modifiers: Some(modifiers),
                movement_speeds: Some(vec![MovementSpeed::new(
                    MovementMode::Land,
                    SpeedCategory::Slow,
                )]),
                name: self.name,
                role: Role::Warrior,
                senses: None,
                size: self.size,
                trained_skills: Some(vec![Skill::Awareness]),
                weapons: vec![StandardWeapon::Slam.weapon()],
            });
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(
        monster_group::MonsterGroup {
            knowledge: None,
            name: "Treants".to_string(),
            monsters: vec![
                TreantDefinition {
                    alignment: "Usually true neutral".to_string(),
                    attributes: vec![2, 0, 2, 0, 2, -2],
                    knowledge: Knowledge::new(vec![(0, "
                        Birch treants tend to be shy, and they to avoid conflict if at all possible.
                    ")]),
                    level: 5,
                    modifiers: Some(vec![Modifier::Vulnerable(SpecialDefenseType::Damage(DamageType::Fire))]),
                    name: "Birch Treant".to_string(),
                    size: Size::Large,
                }.monster(),
                TreantDefinition {
                    alignment: "Usually true neutral".to_string(),
                    attributes: vec![2, 0, 2, 0, 4, 1],
                    knowledge: Knowledge::new(vec![(0, "
                        Chestnut treants tend to mischievous and outgoing.
                        They like playing small tricks on interesting creatures that pass by.
                    ")]),
                    level: 6,
                    modifiers: Some(vec![Modifier::Vulnerable(SpecialDefenseType::Damage(DamageType::Fire))]),
                    name: "Chestnut Treant".to_string(),
                    size: Size::Large,
                }.monster(),
                TreantDefinition {
                    alignment: "Usually true neutral".to_string(),
                    attributes: vec![2, 3, 2, 1, 2, -2],
                    knowledge: Knowledge::new(vec![(0, "
                        Willow treants are the most agile treants, and they can twist and bend their bodies with surprising finesse.
                        Their attitudes tend to be similarly flexible, and they tend to be easily persuadable.
                    ")]),
                    level: 7,
                    modifiers: Some(vec![Modifier::Vulnerable(SpecialDefenseType::Damage(DamageType::Fire))]),
                    name: "Willow Treant".to_string(),
                    size: Size::Large,
                }.monster(),
                TreantDefinition {
                    alignment: "Usually neutral evil".to_string(),
                    attributes: vec![3, 0, 1, 1, 2, 1],
                    knowledge: Knowledge::new(vec![(0, "
                        Darkroot treants, unlike most other treants, primarily inhabit swamps and other grimy places.
                        Their bark is mottled with fungus, and they tend to have a more sinister demeanor than most treants.
                    ")]),
                    level: 8,
                    modifiers: None,
                    name: "Darkroot Treant".to_string(),
                    size: Size::Large,
                }.monster(),
                TreantDefinition {
                    alignment: "Usually neutral good".to_string(),
                    attributes: vec![3, -2, 4, 0, 2, 3],
                    knowledge: Knowledge::new(vec![(0, "
                        Pine treants tend to be the most steadfast treants.
                        They are strong-willed, but while oak treants are stubborn, pine treants are resolutely benevolent, sheltering all who need aid.
                    ")]),
                    level: 9,
                    modifiers: Some(vec![Modifier::Vulnerable(SpecialDefenseType::Damage(DamageType::Fire))]),
                    name: "Pine Treant".to_string(),
                    size: Size::Huge,
                }.monster(),
                TreantDefinition {
                    alignment: "Usually neutral good".to_string(),
                    attributes: vec![4, -2, 4, 1, 2, 3],
                    knowledge: Knowledge::new(vec![(0, "
                        Oak treants tend to be the most stubborn treants, and they brook no guff from wayward adventurers.
                    ")]),
                    level: 10,
                    modifiers: Some(vec![Modifier::Vulnerable(SpecialDefenseType::Damage(DamageType::Fire))]),
                    name: "Oak Treant".to_string(),
                    size: Size::Huge,
                }.monster(),
                TreantDefinition {
                    alignment: "Usually true neutral".to_string(),
                    attributes: vec![4, -2, 6, 0, 0, 2],
                    knowledge: Knowledge::new(vec![(0, "
                        Cyprus treants are the most durable of treants.
                        They are virtually indestructible, and are fearsome when roused to anger.
                    ")]),
                    level: 11,
                    modifiers: None,
                    name: "Cyprus Treant".to_string(),
                    size: Size::Huge,
                }.monster(),
            ],
        },
    ));
}
