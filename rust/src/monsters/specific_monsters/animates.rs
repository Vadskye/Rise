use crate::core_mechanics::creatures::attack_effects::{
    AttackEffect, AttackEffectDuration, DamageEffect, DebuffEffect,
};
use crate::core_mechanics::creatures::attacks::{
    AreaSize, AreaTargets, Attack, AttackRange, AttackTargeting, UsageTime,
};
use crate::core_mechanics::{
    DamageDice, DamageType, DamageTypeEffect, Debuff, Defense, FlightManeuverability, MovementMode,
    PassiveAbility, Sense, Size, SpecialDefenseModifier, SpeedCategory,
};
use crate::equipment::weapons::Weapon;
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Animate;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{monster_group, FullMonsterDefinition, Monster};
use crate::skills::Skill;

struct FullAnimateDefinition {
    alignment: String,
    attributes: Vec<i32>,
    challenge_rating: ChallengeRating,
    description: Option<&'static str>,
    knowledge: Option<Knowledge>,
    level: i32,
    movement_modes: Option<Vec<MovementMode>>,
    name: String,
    passive_abilities: Option<Vec<PassiveAbility>>,
    senses: Option<Vec<Sense>>,
    size: Size,
    special_attacks: Option<Vec<Attack>>,
    special_defense_modifiers: Option<Vec<SpecialDefenseModifier>>,
    trained_skills: Option<Vec<Skill>>,
    weapons: Vec<Weapon>,
}

fn animate(def: FullAnimateDefinition) -> Monster {
    return Monster::fully_defined(FullMonsterDefinition {
        // From def
        alignment: def.alignment,
        attributes: def.attributes,
        challenge_rating: def.challenge_rating,
        description: def.description,
        knowledge: def.knowledge,
        level: def.level,
        movement_modes: def.movement_modes,
        name: def.name,
        passive_abilities: def.passive_abilities,
        senses: def.senses,
        size: def.size,
        special_attacks: def.special_attacks,
        special_defense_modifiers: def.special_defense_modifiers,
        trained_skills: def.trained_skills,
        weapons: def.weapons,

        // Default values
        creature_type: Animate,
    });
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
        level: 1,
        passive_abilities: None,
        movement_modes: Some(vec![MovementMode::Fly(SpeedCategory::Normal, FlightManeuverability::Perfect)]),
        name: "Darkwraith".to_string(),
        senses: None,
        size: Size::Medium,
        special_attacks: Some(vec![
            Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Reflex,
                glance: Some(AttackEffect::HalfDamage),
                hit: AttackEffect::Damage(
                    DamageEffect {
                        damage_dice: DamageDice::single_target_damage(4),
                        damage_modifier: 0,
                        damage_types: vec![DamageType::Cold],
                        lose_hp_effects: Some(vec![
                            AttackEffect::Debuff(DebuffEffect {
                                debuffs: vec![Debuff::Slowed],
                                duration: AttackEffectDuration::Brief,
                            }),
                        ]),
                        power_multiplier: 1.0,
                        take_damage_effects: None,
                    },
                ),
                is_magical: true,
                name: "Dark Grasp".to_string(),
                targeting: AttackTargeting::Creature(AttackRange::Reach),
                usage_time: UsageTime::Standard,
                weapon: None,
            },
            Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Fortitude,
                glance: None,
                hit: AttackEffect::Damage(
                    DamageEffect {
                        damage_dice: DamageDice::aoe_damage(4),
                        damage_modifier: 0,
                        damage_types: vec![DamageType::Cold],
                        lose_hp_effects: None,
                        power_multiplier: 0.5,
                        take_damage_effects: None,
                    },
                ),
                is_magical: true,
                name: "Chilling Aura".to_string(),
                targeting: AttackTargeting::Radius(None, AreaSize::Small, AreaTargets::Enemies),
                usage_time: UsageTime::Minor,
                weapon: None,
            },
        ]),
        special_defense_modifiers: Some(vec![
            SpecialDefenseModifier::impervious_damage(DamageType::Cold),
            SpecialDefenseModifier::immune_debuff(Debuff::Prone),
        ]),
        trained_skills: Some(vec![
            Skill::Awareness,
            Skill::Stealth,
        ]),
        weapons: vec![],
    })));

    fn create_treant(
        alignment: &str,
        attributes: Vec<i32>,
        knowledge: Knowledge,
        level: i32,
        name: &str,
        size: Size,
        special_defense_modifiers: Option<Vec<SpecialDefenseModifier>>,
    ) -> Monster {
        return animate(FullAnimateDefinition {
            alignment: alignment.to_string(),
            attributes,
            challenge_rating: ChallengeRating::Two,
            description: None,
            knowledge: Some(knowledge),
            level,
            passive_abilities: Some(vec![
                // TODO: add Focus tag
                PassiveAbility {
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
                },
            ]),
            movement_modes: Some(vec![MovementMode::Land(SpeedCategory::Slow)]),
            name: name.to_string(),
            senses: None,
            size,
            special_attacks: None,
            special_defense_modifiers,
            trained_skills: Some(vec![Skill::Awareness]),
            weapons: vec![Weapon::Slam],
        });
    }

    monsters.push(MonsterEntry::MonsterGroup(
        monster_group::MonsterGroup {
            knowledge: None,
            name: "Treants".to_string(),
            monsters: vec![
                create_treant(
                    "Usually true neutral",
                    vec![2, 0, 2, 0, 2, -2],
                    Knowledge::new(vec![(0, "
                        Birch treants tend to be shy, and they to avoid conflict if at all possible.
                    ")]),
                    5,
                    "Birch Treant",
                    Size::Large,
                    Some(vec![SpecialDefenseModifier::vulnerable_damage(DamageType::Fire)]),
                ),
                create_treant(
                    "Usually true neutral",
                    vec![2, 0, 2, 0, 4, 1],
                    Knowledge::new(vec![(0, "
                        Chestnut treants tend to mischievous and outgoing.
                        They like playing small tricks on interesting creatures that pass by.
                    ")]),
                    6,
                    "Chestnut Treant",
                    Size::Large,
                    Some(vec![SpecialDefenseModifier::vulnerable_damage(DamageType::Fire)]),
                ),
                create_treant(
                    "Usually true neutral",
                    vec![2, 3, 2, 1, 2, -2],
                    Knowledge::new(vec![(0, "
                        Willow treants are the most agile treants, and they can twist and bend their bodies with surprising finesse.
                        Their attitudes tend to be similarly flexible, and they tend to be easily persuadable.
                    ")]),
                    7,
                    "Willow Treant",
                    Size::Large,
                    Some(vec![SpecialDefenseModifier::vulnerable_damage(DamageType::Fire)]),
                ),
                create_treant(
                    "Usually neutral evil",
                    vec![3, 0, 1, 1, 2, 1],
                    Knowledge::new(vec![(0, "
                        Darkroot treants, unlike most other treants, primarily inhabit swamps and other grimy places.
                        Their bark is mottled with fungus, and they tend to have a more sinister demeanor than most treants.
                    ")]),
                    8,
                    "Darkroot Treant",
                    Size::Large,
                    None,
                ),
                create_treant(
                    "Usually neutral good",
                    vec![3, -2, 4, 0, 2, 3],
                    Knowledge::new(vec![(0, "
                        Pine treants tend to be the most steadfast treants.
                        They are strong-willed, but while oak treants are stubborn, pine treants are resolutely benevolent, sheltering all who need aid.
                    ")]),
                    9,
                    "Pine Treant",
                    Size::Huge,
                    Some(vec![SpecialDefenseModifier::vulnerable_damage(DamageType::Fire)]),
                ),
                create_treant(
                    "Usually neutral good",
                    vec![4, -2, 4, 1, 2, 3],
                    Knowledge::new(vec![(0, "
                        Oak treants tend to be the most stubborn treants, and they brook no guff from wayward adventurers.
                    ")]),
                    10,
                    "Oak Treant",
                    Size::Huge,
                    Some(vec![SpecialDefenseModifier::vulnerable_damage(DamageType::Fire)]),
                ),
                create_treant(
                    "Usually true neutral",
                    vec![4, -2, 5, 0, 2, 2],
                    Knowledge::new(vec![(0, "
                        Cyprus treants are the most durable of treants.
                        They are virtually indestructible, and are fearsome when roused to anger.
                    ")]),
                    11,
                    "Cyprus Treant",
                    Size::Huge,
                    None,
                ),
            ],
        },
    ));

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
            passive_abilities: None,
            movement_modes: None,
            name: name.to_string(),
            senses: Some(vec![Sense::Darkvision(60)]),
            size,
            special_attacks: None,
            special_defense_modifiers: None,
            trained_skills: None,
            weapons: vec![Weapon::Slam],
        });
    }

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        knowledge: None,
        name: "Animated Objects".to_string(),
        monsters: vec![
            create_animated_object(
                vec![-4, 3, -4, 0, 0, -5],
                ChallengeRating::Half,
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
                ChallengeRating::Two,
                2,
                "Medium Object",
                Size::Medium,
            ),
            create_animated_object(
                vec![2, -1, 2, 0, 0, -5],
                ChallengeRating::Two,
                4,
                "Large Object",
                Size::Large,
            ),
            create_animated_object(
                vec![3, -2, 3, 0, 0, -5],
                ChallengeRating::Two,
                7,
                "Huge Object",
                Size::Huge,
            ),
            create_animated_object(
                vec![4, -2, 4, 0, 0, -5],
                ChallengeRating::Two,
                9,
                "Gargantuan Object",
                Size::Gargantuan,
            ),
            create_animated_object(
                vec![5, -3, 5, 0, 0, -5],
                ChallengeRating::Two,
                11,
                "Colossal Object",
                Size::Colossal,
            ),
        ],
    }));

    return monsters;
}
