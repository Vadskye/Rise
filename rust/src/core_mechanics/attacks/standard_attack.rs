use crate::core_mechanics::abilities::{
    AbilityExtraContext, AbilityMovement, AbilityTag, AbilityType, AreaSize, AreaTargets, Cooldown,
    Range, Targeting,
};
use crate::core_mechanics::attacks::attack_effect::{
    AttackEffectDuration, AttackTriggeredEffect, DamageEffect, DamageOverTimeEffect, DebuffEffect,
    DebuffInsteadEffect, PoisonEffect, SimpleDamageEffect, VitalWoundEffect,
};
use crate::core_mechanics::attacks::{Attack, AttackEffect, LowDamageAndDebuff};
use crate::core_mechanics::{
    DamageDice, DamageType, Debuff, Defense, SpecialDefenseType, SpeedCategory, Tag,
};
use crate::equipment::StandardWeapon;
use std::cmp::max;

use super::attack::SimpleSpell;

pub enum StandardAttack {
    // Monster abilities
    AbolethSlam,
    AbolethPsionicBlast,
    AnkhegDrag,
    GhoulBite(i32),
    GibberingMoutherGibber,
    FrostwebSpiderBite,
    MonsterSpikes(i32),
    OozeDissolve(i32),
    OozeEngulf(i32),
    VampireAlluringGaze(i32),
    YrthakThunderingHide,

    // Character/shared abilities
    AbyssalRebuke(i32),
    BreathWeaponCone(i32, DamageType, Defense),
    BreathWeaponLine(i32, DamageType, Defense),
    Combustion(i32),
    DarkGrasp(i32),
    DarkMiasma(i32),
    DivineJudgment(i32),
    DrainingGrasp(i32),
    DrainLife(i32),
    Enrage(i32),
    Fireball(i32),
    Firebolt(i32),
    GlimpseOfDivinity(i32),
    GustOfWind(i32),
    Ignition(i32),
    Inferno(i32),
    MindCrush(i32),
    PersonalIgnition(i32),
    PiercingWindblast(i32),
    Pyrohemia(i32),
    Pyrophobia(i32),
    RetributiveLifebond(i32),
    Spikeform(i32),
    Windblast(i32),
    Windsnipe(i32),
    WordOfFaith(i32),
}

impl StandardAttack {
    pub fn attack(&self) -> Attack {
        match self {
            // Monster abilities
            Self::AbolethSlam => {
                let mut aboleth_slam = StandardWeapon::Slam.weapon().attack();
                aboleth_slam.name = "Sliming Tentacle".to_string();
                if let Some(e) = aboleth_slam.damage_effect_mut() {
                    e.lose_hp_effect = Some(AttackTriggeredEffect::Poison(
                        PoisonEffect {
                            stage1: vec![Debuff::Stunned],
                            stage3_debuff: None,
                            stage3_vital: Some(VitalWoundEffect {
                                special_effect: Some("
                                    Instead of making a \\glossterm{vital roll} for the \\glossterm{vital wound},
                                      the target's skin is transformed into a clear, slimy membrane.
                                    Every 5 minutes, an afflicted creature must be moistened with cool, fresh water
                                      or it will gain two \\glossterm<fatigue points>.
                                    This effect lasts until the \\glossterm{vital wound} is removed.
                                ".to_string()),
                            }),
                        },
                    ));
                }
                return aboleth_slam;
            }
            // Large enemies-only cone is a rank 4 effect
            Self::AbolethPsionicBlast => Attack {
                accuracy: 0,
                crit: None,
                defense: Defense::Mental,
                extra_context: None,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    damage_dice: DamageDice::aoe_damage(5),
                    damage_types: vec![DamageType::Energy],
                    power_multiplier: 0.5,
                }.damage_effect()),
                is_magical: true,
                is_strike: false,
                name: "Psionic Blast".to_string(),
                replaces_weapon: None,
                tags: None,
                targeting: Targeting::Cone(AreaSize::Large, AreaTargets::Enemies),
            },
            Self::AnkhegDrag => Attack {
                accuracy: 4,
                crit: None,
                defense: Defense::Fortitude,
                extra_context: None,
                hit: AttackEffect::Push(30),
                is_magical: true,
                is_strike: false,
                name: "Drag Prey".to_string(),
                replaces_weapon: None,
                tags: None,
                targeting: Targeting::Creature(Range::Adjacent),
            },
            Self::FrostwebSpiderBite => {
                let mut frostweb_spider_bite = StandardWeapon::MultipedalBite.weapon().attack();
                if let Some(e) = frostweb_spider_bite.damage_effect_mut() {
                    e.lose_hp_effect = Some(AttackTriggeredEffect::Poison(PoisonEffect {
                        stage1: vec![Debuff::Slowed],
                        stage3_debuff: Some(vec![Debuff::Immobilized]),
                        stage3_vital: None,
                    }));
                }
                return frostweb_spider_bite;
            }
            Self::GhoulBite(rank) => LowDamageAndDebuff {
                damage_types: vec![],
                debuff: Debuff::Vulnerable(Box::new(
                    SpecialDefenseType::AllDamage,
                )),
                defense: Defense::Armor,
                must_lose_hp: true,
                is_magical: false,
                is_maneuver: true,
                name: "Flesh-Rending Bite".to_string(),
                rank: *rank,
                tags: None,
            }.weapon_attack(&StandardWeapon::MultipedalBite.weapon()),
            Self::GibberingMoutherGibber => Attack {
                accuracy: 0,
                crit: Some(AttackEffect::Debuff(DebuffEffect {
                    debuffs: vec![Debuff::Confused],
                    duration: AttackEffectDuration::Brief,
                    immune_after_effect_ends: false,
                })),
                defense: Defense::Mental,
                extra_context: None,
                hit: AttackEffect::Debuff(DebuffEffect {
                    debuffs: vec![Debuff::Dazed],
                    duration: AttackEffectDuration::Brief,
                    immune_after_effect_ends: false,
                }),
                is_magical: true,
                is_strike: false,
                name: "Gibber".to_string(),
                replaces_weapon: None,
                tags: Some(vec![Tag::Ability(AbilityTag::Compulsion)]),
                targeting: Targeting::Radius(None, AreaSize::Medium, AreaTargets::Creatures),
            },
            Self::MonsterSpikes(rank) => Attack {
                accuracy: 0,
                crit: None,
                defense: Defense::Armor,
                extra_context: None,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    // +1d extra at rank 5+
                    damage_dice: DamageDice::single_target_damage(*rank).add(if *rank >= 5 { 1 } else { 0 }),
                    damage_types: vec![DamageType::Piercing],
                    power_multiplier: if *rank >= 7 { 0.5 } else { 0.0 },
                }.damage_effect()),
                is_magical: false,
                is_strike: false,
                name: "Retributive Spikes".to_string(),
                replaces_weapon: None,
                tags: None,
                targeting: Targeting::MadeMeleeAttack,
            },
            Self::OozeDissolve(rank) => Attack {
                accuracy: 0,
                crit: None,
                defense: Defense::Fortitude,
                extra_context: None,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    // +1d at ranks 3/5/7
                    damage_dice: DamageDice::single_target_damage(*rank).add(max(0, (rank - 1) / 2)),
                    damage_types: vec![DamageType::Acid],
                    power_multiplier: 1.0,
                }.damage_effect()),
                is_magical: false,
                is_strike: false,
                name: "Dissolve".to_string(),
                replaces_weapon: None,
                tags: None,
                targeting: Targeting::SharingSpace,
            },
            Self::OozeEngulf(rank) => Attack {
                // +1 accuracy at ranks 3/5/7
                accuracy: max(0, (rank - 1) / 2),
                crit: None,
                defense: Defense::Fortitude,
                extra_context: Some(AbilityExtraContext {
                    cooldown: None,
                    movement: Some(AbilityMovement {
                        move_before_attack: true,
                        requires_straight_line: true,
                        speed: SpeedCategory::Normal,
                    }),
                    suffix: None,
                }),
                hit: AttackEffect::Custom(AbilityType::Normal, r"
                    Each target is \grappled by the $name.
                ".to_string()),
                is_magical: false,
                is_strike: false,
                name: "Engulf".to_string(),
                replaces_weapon: None,
                tags: None,
                targeting: Targeting::MovementPath,
            },
            Self::VampireAlluringGaze(rank) => SimpleSpell {
                accuracy: max(0, rank - 3),
                crit: Some(AttackEffect::Custom(AbilityType::Normal, "The effect becomes permanent.".to_string())),
                defense: Defense::Mental,
                hit: AttackEffect::Debuff(DebuffEffect {
                    debuffs: vec![Debuff::Charmed("the $name".to_string())],
                    duration: AttackEffectDuration::Condition,
                    immune_after_effect_ends: true,
                }),
                name: "Alluring Gaze".to_string(),
                tags: Some(vec![Tag::Ability(AbilityTag::Emotion)]),
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            Self::YrthakThunderingHide => Attack {
                accuracy: 0,
                crit: None,
                defense: Defense::Fortitude,
                extra_context: None,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    damage_dice: DamageDice::single_target_damage(3),
                    damage_types: vec![DamageType::Bludgeoning],
                    power_multiplier: 0.0,
                }.damage_effect()),
                is_magical: false,
                is_strike: false,
                name: "Thundering Hide".to_string(),
                replaces_weapon: None,
                tags: None,
                targeting: Targeting::CausedDamage(AreaSize::Tiny),
            },

            // Character/shared abilities
            Self::AbyssalRebuke(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Armor,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    // +1d extra at rank 3/5/7
                    damage_dice: DamageDice::single_target_damage(*rank).add((*rank - 1) / 2),
                    damage_types: vec![DamageType::Fire],
                    power_multiplier: 1.0,
                }.damage_effect()),
                name: "Abyssal Rebuke".to_string(),
                tags: None,
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            Self::BreathWeaponCone(rank, damage_type, defense) => Attack {
                accuracy: 0,
                crit: None,
                defense: *defense,
                extra_context: Some(AbilityExtraContext {
                    cooldown: Some(Cooldown::Brief(None)),
                    movement: None,
                    suffix: None,
                }),
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_types: vec![*damage_type],
                    power_multiplier: 0.5,
                }.damage_effect()),
                is_magical: false,
                is_strike: false,
                name: "Breath Weapon".to_string(),
                replaces_weapon: None,
                tags: None,
                targeting: Targeting::Cone(
                    match rank {
                        1 => AreaSize::Small,
                        2 => AreaSize::Medium,
                        3 => AreaSize::Large,
                        4 => AreaSize::Large,
                        5 => AreaSize::Huge,
                        6 => AreaSize::Huge,
                        7 => AreaSize::Gargantuan,
                        _ => panic!("Invalid rank {}", rank),
                    },
                    AreaTargets::Everything,
                ),
            },
            Self::BreathWeaponLine(rank, damage_type, defense) => Attack {
                accuracy: 0,
                crit: None,
                defense: *defense,
                extra_context: Some(AbilityExtraContext {
                    cooldown: Some(Cooldown::Brief(None)),
                    movement: None,
                    suffix: None,
                }),
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_types: vec![*damage_type],
                    power_multiplier: 0.5,
                }.damage_effect()),
                is_magical: false,
                is_strike: false,
                name: "Breath Weapon".to_string(),
                replaces_weapon: None,
                tags: None,
                targeting: match rank {
                    1 => Targeting::Line(5, AreaSize::Medium, AreaTargets::Everything),
                    2 => Targeting::Line(5, AreaSize::Large, AreaTargets::Everything),
                    3 => Targeting::Line(10, AreaSize::Large, AreaTargets::Everything),
                    4 => Targeting::Line(10, AreaSize::Huge, AreaTargets::Everything),
                    5 => Targeting::Line(15, AreaSize::Huge, AreaTargets::Everything),
                    6 => Targeting::Line(15, AreaSize::Gargantuan, AreaTargets::Everything),
                    7 => Targeting::Line(20, AreaSize::Gargantuan, AreaTargets::Everything),
                    _ => panic!("Invalid rank {}", rank),
                },
            },
            Self::Combustion(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    // +1d extra at ranks 2, 4 and 7
                    damage_dice: DamageDice::single_target_damage(*rank).add(if *rank >= 7 {
                        3
                    } else if *rank >= 5 {
                        2
                    } else {
                        1
                    }),
                    damage_types: vec![DamageType::Fire],
                    power_multiplier: 1.0,
                }.damage_effect()),
                name: Attack::generate_modified_name("Combustion", *rank, 4, Some(7)),
                tags: None,
                targeting: Targeting::Creature(if *rank >= 7 {
                    Range::Medium
                } else {
                    Range::Short
                }),
            }.attack(),
            // TODO: add descriptive text for +accuracy vs non-bright illumination
            Self::DarkGrasp(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Reflex,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank).add(if *rank >= 7 { 2 } else { 0 }),
                    damage_types: vec![DamageType::Cold],
                    power_multiplier: 1.0,
                }.damage_effect()),
                name: Attack::generate_modified_name("Dark Grasp", *rank, 3, Some(7)),
                tags: None,
                targeting: Targeting::Anything(Range::Adjacent),
            }.attack(),
            Self::DarkMiasma(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Reflex,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_types: vec![DamageType::Cold],
                    power_multiplier: 0.5,
                }.damage_effect()),
                name: Attack::generate_modified_name("Dark Miasma", *rank, 4, None),
                tags: None,
                targeting: if *rank >= 4 {
                    Targeting::Radius(None, AreaSize::Large, AreaTargets::Creatures)
                } else {
                    Targeting::Radius(None, AreaSize::Small, AreaTargets::Enemies)
                },
            }.attack(),
            Self::DivineJudgment(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Mental,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    // +1d extra at ranks 4 and 7
                    damage_dice: DamageDice::single_target_damage(*rank).add((*rank - 1) / 3),
                    damage_types: vec![DamageType::Energy],
                    power_multiplier: 1.0,
                }.damage_effect()),
                name: Attack::generate_modified_name("Divine Judgment", *rank, 4, Some(7)),
                tags: None,
                targeting: Targeting::Creature(if *rank >= 7 {
                    Range::Distant
                } else if *rank >= 4 {
                    Range::Long
                } else {
                    Range::Medium
                }),
            }.attack(),
            Self::DrainingGrasp(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Armor,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    damage_dice: DamageDice::single_target_damage(*rank),
                    damage_types: vec![DamageType::Energy],
                    power_multiplier: 1.0,
                }.damage_effect()),
                name: "Draining Grasp".to_string(),
                tags: None,
                targeting: Targeting::Creature(Range::Adjacent),
            }.attack(),
            Self::DrainLife(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    // +1d extra at ranks 4 and 7
                    damage_dice: DamageDice::single_target_damage(*rank).add((*rank - 1) / 3),
                    damage_types: vec![DamageType::Energy],
                    power_multiplier: 1.0,
                }.damage_effect()),
                name: Attack::generate_modified_name("Drain Life", *rank, 4, Some(7)),
                tags: None,
                targeting: Targeting::Creature(if *rank >= 7 {
                    Range::Distant
                } else if *rank >= 4 {
                    Range::Long
                } else {
                    Range::Medium
                }),
            }.attack(),
            Self::Enrage(rank) => SimpleSpell {
                accuracy: max(4, 3 + rank),
                crit: Some(AttackEffect::MustRemoveTwice),
                defense: Defense::Mental,
                hit: AttackEffect::Custom(AbilityType::Normal, r"
                    As a \glossterm{condition}, the target is unable to take any \glossterm{standard actions} that do not cause it to make an attack.
                    For example, it could make a \glossterm{strike} or cast an offensive spell, but it could not heal itself or summon a creature.
                ".to_string()),
                name: "Enrage".to_string(),
                tags: None,
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            Self::Fireball(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Reflex,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank).add(if *rank >= 7 { 1 } else { 0 }),
                    damage_types: vec![DamageType::Fire],
                    power_multiplier: if *rank >= 7 { 1.0 } else { 0.5 },
                }.damage_effect()),
                name: Attack::generate_modified_name("Fireball", *rank, 3, Some(7)),
                tags: None,
                targeting: Targeting::Radius(
                    Some(Range::Medium),
                    AreaSize::Small,
                    AreaTargets::Everything,
                ),
            }.attack(),
            Self::Firebolt(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Armor,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    // +1d extra at ranks 4 and 7
                    damage_dice: DamageDice::single_target_damage(*rank).add((*rank - 1) / 3),
                    damage_types: vec![DamageType::Fire],
                    power_multiplier: 1.0,
                }.damage_effect()),
                name: Attack::generate_modified_name("Firebolt", *rank, 4, Some(7)),
                tags: None,
                targeting: Targeting::Creature(if *rank >= 7 {
                    Range::Distant
                } else if *rank >= 4 {
                    Range::Long
                } else {
                    Range::Medium
                }),
            }.attack(),
            Self::GlimpseOfDivinity(rank) => SimpleSpell {
                accuracy: if *rank >= 7 { 0 } else { *rank - 3 },
                crit: Some(AttackEffect::MustRemoveTwice),
                defense: Defense::Mental,
                hit: AttackEffect::Debuff(DebuffEffect {
                    debuffs: if *rank >= 7 {
                        vec![Debuff::Dazzled, Debuff::Dazed]
                    } else {
                        vec![Debuff::Dazzled]
                    },
                    duration: AttackEffectDuration::Condition,
                    immune_after_effect_ends: false,
                }),
                name: Attack::generate_modified_name("Glimpse of Divinity", *rank, 7, None),
                tags: Some(vec![Tag::Ability(AbilityTag::Visual)]),
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            Self::GustOfWind(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Bludgeoning],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 0.0,
                    take_damage_effect: Some(AttackTriggeredEffect::Custom(
                        AbilityType::Normal,
                        format!(
                            "
                                In addition, each target damaged by the attack is \\glossterm{{pushed}} {feet} feet in the direction the line points away from the $name.
                                Once a target leaves the area, it stops being moved and blocks any other targets from being pushed.
                            ",
                            feet = if *rank >= 5 { 60 } else { 30 },
                        )
                    )),
                    vampiric_healing: None,
                }),
                name: Attack::generate_modified_name("Fireball", *rank, 3, Some(7)),
                tags: None,
                targeting: Targeting::Radius(
                    Some(Range::Medium),
                    AreaSize::Small,
                    AreaTargets::Everything,
                ),
            }.attack(),
            Self::Ignition(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::DamageOverTime(DamageOverTimeEffect {
                    can_remove_with_dex: *rank >= 5,
                    damage: DamageEffect {
                        damage_dice: DamageDice::aoe_damage(*rank).add(-1),
                        damage_modifier: 0,
                        damage_types: vec![DamageType::Fire],
                        extra_defense_effect: None,
                        lose_hp_effect: None,
                        power_multiplier: 0.5,
                        take_damage_effect: None,
                        vampiric_healing: None,
                    },
                    duration: AttackEffectDuration::Condition,
                    narrative_text: "catches on fire".to_string(),
                }),
                name: Attack::generate_modified_name("Ignition", *rank, 5, None),
                tags: None,
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            Self::Inferno(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Reflex,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_types: vec![DamageType::Fire],
                    power_multiplier: 0.5,
                }.damage_effect()),
                name: Attack::generate_modified_name("Inferno", *rank, 3, Some(5)),
                tags: None,
                targeting: Targeting::Radius(
                    None,
                    if *rank >= 5 {
                        AreaSize::Huge
                    } else if *rank >= 3 {
                        AreaSize::Large
                    } else {
                        AreaSize::Small
                    },
                    AreaTargets::Everything,
                ),
            }.attack(),
            Self::MindCrush(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Mental,
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Energy],
                    extra_defense_effect: None,
                    lose_hp_effect: None,
                    power_multiplier: 0.5,
                    take_damage_effect: Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                        // TODO: add immunity after daze for early levels
                        debuffs: vec![if *rank >= 3 {
                            Debuff::Dazed
                        } else {
                            Debuff::Stunned
                        }],
                        duration: AttackEffectDuration::Brief,
                        immune_after_effect_ends: false,
                    })),
                    vampiric_healing: None,
                }),
                name: Attack::generate_modified_name("Mind Crush", *rank, 3, Some(7)),
                tags: None,
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            Self::PersonalIgnition(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Reflex,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    // +1d extra at rank 7
                    damage_dice: DamageDice::single_target_damage(*rank).add(if *rank >= 7 { 1 } else { 0 }),
                    damage_types: vec![DamageType::Fire],
                    power_multiplier: if *rank >= 7 { 0.5 } else { 0.0 },
                }.damage_effect()),
                name: Attack::generate_modified_name("Personal Ignition", *rank, 7, None),
                tags: None,
                targeting: Targeting::MadeMeleeAttack,
            }.attack(),
            Self::PiercingWindblast(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Reflex,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    // +1d extra at rank 6
                    damage_dice: DamageDice::single_target_damage(*rank).add(if *rank >= 6 { 1 } else { 0 }),
                    damage_types: vec![DamageType::Piercing],
                    power_multiplier: 1.0,
                }.damage_effect()),
                name: Attack::generate_modified_name("Piercing Windblast", *rank, 6, None),
                tags: None,
                targeting: Targeting::Creature(if *rank >= 6 { Range::Long } else { Range::Medium }),
            }.attack(),
            Self::Pyrohemia(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(DamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_modifier: 0,
                    damage_types: vec![DamageType::Fire],
                    extra_defense_effect: None,
                    lose_hp_effect: if *rank == 4 {
                        Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                            debuffs: vec![Debuff::Stunned],
                            duration: AttackEffectDuration::Brief,
                            immune_after_effect_ends: false,
                        }))
                    } else {
                        None
                    },
                    power_multiplier: 0.5,
                    take_damage_effect: Some(AttackTriggeredEffect::Debuff(DebuffEffect {
                        debuffs: vec![if *rank >= 6 {
                            Debuff::Stunned
                        } else {
                            Debuff::Dazed
                        }],
                        duration: AttackEffectDuration::Brief,
                        immune_after_effect_ends: false,
                    })),
                    vampiric_healing: None,
                }),
                name: Attack::generate_modified_name("Pyrohemia", *rank, 4, Some(6)),
                tags: None,
                targeting: Targeting::Creature(Range::Short),
            }.attack(),
            Self::Pyrophobia(rank) => SimpleSpell {
                accuracy: if *rank >= 5 { *rank - 5 } else { *rank - 1 },
                crit: Some(AttackEffect::DebuffInstead(DebuffInsteadEffect {
                    debuffs: vec![if *rank >= 5 {
                        Debuff::Panicked("the $name and all other sources of fire".to_string())
                    } else {
                        Debuff::Frightened("the $name and all other sources of fire".to_string())
                    }],
                    instead_of: Debuff::Shaken(
                        "the $name and all other sources of fire".to_string(),
                    ),
                })),
                defense: Defense::Mental,
                hit: AttackEffect::Debuff(DebuffEffect {
                    debuffs: vec![if *rank >= 5 {
                        Debuff::Frightened("the $name and all other sources of fire".to_string())
                    } else {
                        Debuff::Shaken("the $name and all other sources of fire".to_string())
                    }],
                    duration: AttackEffectDuration::Condition,
                    immune_after_effect_ends: false,
                }),
                name: if *rank >= 5 {
                    "Primal Pyrophobia".to_string()
                } else {
                    "Pyrophobia".to_string()
                },
                tags: Some(vec![Tag::Ability(AbilityTag::Emotion)]),
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            Self::RetributiveLifebond(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    // +1d extra at ranks 4 and 7
                    damage_dice: DamageDice::single_target_damage(*rank).add((*rank - 1) / 3),
                    damage_types: vec![DamageType::Energy],
                    power_multiplier: 0.0,
                }.damage_effect()),
                name: Attack::generate_modified_name("Retributive Lifebond", *rank, 4, Some(7)),
                tags: None,
                targeting: Targeting::CausedHpLoss(if *rank >= 7 {
                    AreaSize::Large
                } else if *rank >= 4 {
                    AreaSize::Medium
                } else {
                    AreaSize::Small
                }),
            }.attack(),
            Self::Spikeform(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Armor,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    // +1d extra at rank 7
                    damage_dice: DamageDice::single_target_damage(*rank).add(if *rank >= 7 { 1 } else { 0 }),
                    damage_types: vec![DamageType::Piercing],
                    power_multiplier: if *rank >= 7 { 0.5 } else { 0.0 },
                }.damage_effect()),
                name: Attack::generate_modified_name("Spikeform", *rank, 7, None),
                tags: None,
                targeting: Targeting::MadeMeleeAttack,
            }.attack(),
            Self::Windblast(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Armor,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    // +2d extra at rank 5
                    damage_dice: DamageDice::single_target_damage(*rank).add(if *rank >= 5 { 2 } else { 0 }),
                    damage_types: vec![DamageType::Bludgeoning],
                    power_multiplier: 1.0,
                }.damage_effect()),
                name: Attack::generate_modified_name("Windblast", *rank, 5, None),
                tags: None,
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            Self::Windsnipe(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Armor,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    // +1d extra at rank 6
                    damage_dice: DamageDice::single_target_damage(*rank).add(if *rank >= 6 { 1 } else { 0 }),
                    damage_types: vec![DamageType::Bludgeoning],
                    power_multiplier: 1.0,
                }.damage_effect()),
                name: Attack::generate_modified_name("Windsnipe", *rank, 5, None),
                tags: None,
                targeting: Targeting::Creature(if *rank >= 6 {
                    Range::Extreme
                } else {
                    Range::Distant
                }),
            }.attack(),
            Self::WordOfFaith(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Mental,
                hit: AttackEffect::Damage(SimpleDamageEffect {
                    damage_dice: DamageDice::aoe_damage(*rank),
                    damage_types: vec![DamageType::Energy],
                    power_multiplier: 0.5,
                }.damage_effect()),
                name: Attack::generate_modified_name("Word of Faith", *rank, 4, Some(6)),
                tags: None,
                targeting: Targeting::Radius(
                    None,
                    if *rank >= 6 {
                        AreaSize::Huge
                    } else if *rank >= 4 {
                        AreaSize::Large
                    } else {
                        AreaSize::Small
                    },
                    AreaTargets::Enemies,
                ),
            }.attack(),
        }
    }
}
