use crate::core_mechanics::creatures::attack_effects::{
    self, AttackEffect, AttackEffectDuration, DamageEffect, DebuffEffect,
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
use crate::monsters::creature_type::CreatureType::Aberration;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{monster_group, FullMonsterDefinition, Monster};
use crate::skills::Skill;

struct FullAberrationDefinition {
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

fn aberration(def: FullAberrationDefinition) -> Monster {
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
        creature_type: Aberration,
    });
}

pub fn aberrations() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    // TODO: add ritual casting
    let mut aboleth_slam = Attack::from_weapon(Weapon::Slam);
    if let Some(e) = aboleth_slam.damage_effect_mut() {
        e.lose_hp_effects = Some(vec![attack_effects::AttackEffect::Poison(
            attack_effects::PoisonEffect {
                stage1: vec![Debuff::Nauseated],
                stage3_debuff: None,
                stage3_vital: Some(attack_effects::VitalWoundEffect {
                    special_effect: Some("
                        Instead of making a \\glossterm{vital roll} for the \\glossterm{vital wound},
                          the target's skin is transformed into a clear, slimy membrane.
                        Every 5 minutes, an afflicted creature must be moistened with cool, fresh water
                          or it will gain two \\glossterm<fatigue points>.
                        This effect lasts until the \\glossterm{vital wound} is removed.
                    ".to_string()),
                }),
            },
        )]);
    }
    aboleth_slam.glance = Some(AttackEffect::HalfDamage);
    monsters.push(MonsterEntry::Monster(aberration(FullAberrationDefinition {
        alignment: "Usually lawful evil".to_string(),
        attributes: vec![3, -1, 4, 3, 2, 4],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (-10, "
                Legends speak of revolting water-dwelling creatures called aboleths that lurk in the deepest caves.
                They are said to have power over people's minds.
            "),
            (0, "
                An aboleth is a Huge fishlike creature found primarily in subterranean lakes and rivers.
                It has four tentacles and two vertically stacked eyes in the center of its ridged forehead.
                It uses its powerful mental abilities to overwhelm the minds of its foes.
            "),
            (5, "
                Four pulsating dark blue orifices line the bottom of an aboleth's body and secrete gray slime that smells like rancid grease.
                This slime coats its tentacles, and creatures struck by the tentacles can have their skin transformed into a similar slime.
                Aboleths are amphibious, and they are able to drag themselves along with their tentacles on land, though they are much faster in the water.
                A typical aboleth weighs about 6,500 pounds.
            "),
            (10, "
                Aboleths can completely dominate the minds of lesser creatures.
                They sometimes use their minions as agents to spy in cities or otherwise further their sinister goals.
            "),
        ])),
        level: 12,
        movement_modes: None,
        name: "Aboleth".to_string(),
        passive_abilities: Some(vec![
            PassiveAbility {
                description: r"
                    As a standard action, the aboleth can \glossterm{dominate} the mind of an unconscious humanoid or aberration it touches.
                    It can dominate up to 5 creatures in this way.
                    This ability has the \glossterm{Compulsion} tag.
                ".to_string(),
                is_magical: true,
                name: "Dominate".to_string(),
            }
        ]),
        senses: Some(vec![Sense::Darkvision(240), Sense::Telepathy(900)]),
        size: Size::Huge,
        special_attacks: Some(vec![
            aboleth_slam,
            // Large enemies-only cone is a rank 4 effect
            Attack {
                accuracy: 0,
                cooldown: None,
                crit: None,
                defense: Defense::Mental,
                glance: Some(AttackEffect::HalfDamage),
                hit: AttackEffect::Damage(
                    DamageEffect {
                        damage_dice: DamageDice::aoe_damage(5),
                        damage_modifier: 0,
                        damage_types: vec![DamageType::Energy],
                        lose_hp_effects: None,
                        power_multiplier: 0.5,
                        take_damage_effects: None,
                    },
                ),
                is_magical: true,
                name: "Psionic Blast".to_string(),
                targeting: AttackTargeting::Cone(AreaSize::Large, AreaTargets::Enemies),
                usage_time: UsageTime::Standard,
                weapon: None,
            },
            Attack {
                accuracy: 2,
                cooldown: None,
                crit: None,
                defense: Defense::Mental,
                glance: Some(AttackEffect::HalfDamage),
                hit: AttackEffect::Damage(
                    DamageEffect {
                        damage_dice: DamageDice::single_target_damage(5),
                        damage_modifier: 0,
                        damage_types: vec![DamageType::Energy],
                        lose_hp_effects: Some(vec![
                            AttackEffect::Debuff(DebuffEffect {
                                debuffs: vec![Debuff::Dazed],
                                duration: AttackEffectDuration::Condition
                            }),
                        ]),
                        power_multiplier: 1.0,
                        take_damage_effects: None,
                    },
                ),
                is_magical: true,
                name: "Mind Crush".to_string(),
                targeting: AttackTargeting::Creature(AttackRange::Long),
                usage_time: UsageTime::Minor,
                weapon: None,
            },
        ]),
        special_defense_modifiers: None,
        trained_skills: Some(vec![
            Skill::Endurance,
            Skill::Spellsense,
            Skill::Swim,
        ]),
        weapons: vec![Weapon::Slam],
    })));

    monsters.push(MonsterEntry::Monster(aberration(FullAberrationDefinition {
        alignment: "Usually lawful evil".to_string(),
        attributes: vec![0, 1, 4, -6, 1, 2],
        challenge_rating: ChallengeRating::Three,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                A gibbering mouther is a horrible creature seemingly drawn from a lunatic's nightmares.
                They are named for their tendency for speak gibberish to baffle the minds of their prey.
            "),
            (5, "
                Although gibbering mouthers are not intelligent enough to be actively evil, they thirst after bodily fluids and seem to prefer the blood of intelligent creatures.
                They speak their gibberish in Common, but cannot understand it.
            "),
        ])),
        level: 5,
        movement_modes: None,
        name: "Gibbering Mouther".to_string(),
        passive_abilities: None,
        senses: Some(vec![Sense::Darkvision(240), Sense::Telepathy(900)]),
        size: Size::Huge,
        special_attacks: Some(vec![
            Attack {
                accuracy: 0,
                cooldown: None,
                crit: Some(AttackEffect::Debuff(DebuffEffect {
                    debuffs: vec![Debuff::Confused],
                    duration: AttackEffectDuration::Brief,
                })),
                defense: Defense::Mental,
                glance: None,
                hit: AttackEffect::Debuff(DebuffEffect {
                    debuffs: vec![Debuff::Dazed],
                    duration: AttackEffectDuration::Brief,
                }),
                is_magical: true,
                name: "Gibber".to_string(),
                targeting: AttackTargeting::Radius(None, AreaSize::Medium, AreaTargets::Creatures),
                usage_time: UsageTime::Minor,
                weapon: None,
            },
        ]),
        special_defense_modifiers: Some(vec![SpecialDefenseModifier::immune_debuff(Debuff::Prone)]),
        trained_skills: Some(vec![
            Skill::Endurance,
            Skill::Spellsense,
            Skill::Swim,
        ]),
        // TODO: make attacks sweeping
        weapons: vec![Weapon::MonsterBite],
    })));

    return monsters;
}
