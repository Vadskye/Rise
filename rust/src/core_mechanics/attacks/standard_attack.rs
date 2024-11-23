use crate::core_mechanics::abilities::{
    AbilityExtraContext, AbilityMovement, AbilityTag, AbilityType, AreaSize, AreaTargets, Cooldown,
    Range, Targeting,
};
use crate::core_mechanics::attacks::attack_effect::{
    AttackEffectDuration, AttackTriggeredEffect, DamageOverTimeEffect, DebuffEffect, PoisonEffect,
};
use crate::core_mechanics::attacks::{
    Attack, AttackEffect, SimpleDamageEffect,
};
use crate::core_mechanics::{Debuff, Defense, SpeedCategory, Tag};
use crate::equipment::StandardWeapon;
use std::cmp::max;

use super::attack::SimpleSpell;

pub enum StandardAttack {
    // Monster abilities
    AnkhegDrag,
    GibberingMoutherGibber,
    FrostwebSpiderBite,
    MonsterSpikes(i32),
    OozeDissolve(i32),
    OozeEngulf(i32),
    VampireAlluringGaze(i32),
    YrthakThunderingHide,

    // Character/shared abilities
    AbyssalRebuke(i32),
    BreathWeaponCone(i32, AbilityTag, Defense),
    BreathWeaponLine(i32, AbilityTag, Defense),
    Combustion(i32),
    DarkGrasp(i32),
    DarkMiasma(i32),
    DivineJudgment(i32),
    LifestealGrasp(i32),
    Lifesteal(i32),
    Enrage(i32),
    Fireball(i32),
    Firebolt(i32),
    Ignition(i32),
    InflictWound(i32),
    MysticBoltArmor(i32),
    MysticBoltFortitude(i32),
    Pyroclasm(i32),
    MindCrush(i32),
    PersonalIgnition(i32),
    Pyrohemia(i32),
    RetributiveLifebond(i32),
    Spikeform(i32),
    Windslash(i32),
    Windsnipe(i32),
    WordOfFaith(i32),
}

impl StandardAttack {
    pub fn attack(&self) -> Attack {
        match self {
            // Monster abilities
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
                let mut frostweb_spider_bite = StandardWeapon::MonsterBite.weapon().attack();
                if let Some(e) = frostweb_spider_bite.damage_effect_mut() {
                    e.lose_hp_effect = Some(AttackTriggeredEffect::Poison(PoisonEffect {
                        stage1: vec![Debuff::Slowed],
                        stage3_debuff: Some(vec![Debuff::Immobilized]),
                        stage3_vital: None,
                    }));
                }
                frostweb_spider_bite
            }
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
                    // TODO: convert to lose HP effect
                    debuffs: vec![Debuff::Stunned],
                    duration: AttackEffectDuration::Brief,
                    immune_after_effect_ends: false,
                }),
                is_magical: true,
                is_strike: false,
                name: "Gibber".to_string(),
                replaces_weapon: None,
                tags: Some(vec![
                    Tag::Ability(AbilityTag::Compulsion),
                ]),
                targeting: Targeting::Radius(None, AreaSize::Medium, AreaTargets::Creatures),
            },
            Self::MonsterSpikes(rank) => Attack {
                accuracy: 0,
                crit: None,
                defense: Defense::Armor,
                extra_context: None,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr(*rank)),
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
                hit: AttackEffect::Damage(SimpleDamageEffect::dr(*rank)),
                is_magical: false,
                is_strike: false,
                name: "Dissolve".to_string(),
                replaces_weapon: None,
                tags: Some(vec![Tag::Ability(AbilityTag::Acid)]),
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
                    The $name automatically controls the grapple.
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
                hit: AttackEffect::Damage(SimpleDamageEffect::dr2l()),
                is_magical: false,
                is_strike: false,
                name: "Thundering Hide".to_string(),
                replaces_weapon: None,
                tags: Some(vec![Tag::Ability(AbilityTag::Auditory)]),
                targeting: Targeting::CausedDamage(AreaSize::Tiny),
            },

            // Character/shared abilities
            Self::AbyssalRebuke(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Armor,
                // This isn't really accurate, but it's close enough for a first lazy
                // pass.
                hit: AttackEffect::Damage(SimpleDamageEffect::dr(*rank)),
                name: "Abyssal Rebuke".to_string(),
                tags: Some(vec![Tag::Ability(AbilityTag::Fire)]),
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            Self::BreathWeaponCone(rank, ability_tag, defense) => Attack {
                accuracy: 0,
                crit: None,
                defense: *defense,
                extra_context: Some(AbilityExtraContext {
                    cooldown: Some(Cooldown::Brief(None)),
                    movement: None,
                    suffix: None,
                }),
                // Normally a full AOE would be (rank - 2), but breath attacks get (rank - 1) to
                // compensate for the cooldown.
                hit: AttackEffect::Damage(SimpleDamageEffect::dr(*rank - 1)),
                is_magical: false,
                is_strike: false,
                name: "Breath Weapon".to_string(),
                replaces_weapon: None,
                tags: Some(vec![Tag::Ability(ability_tag.clone())]),
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
            Self::BreathWeaponLine(rank, ability_tag, defense) => Attack {
                accuracy: 0,
                crit: None,
                defense: *defense,
                extra_context: Some(AbilityExtraContext {
                    cooldown: Some(Cooldown::Brief(None)),
                    movement: None,
                    suffix: None,
                }),
                hit: AttackEffect::Damage(SimpleDamageEffect::dr(*rank - 1)),
                is_magical: false,
                is_strike: false,
                name: "Breath Weapon".to_string(),
                replaces_weapon: None,
                tags: Some(vec![Tag::Ability(ability_tag.clone())]),
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
            // TODO: replace this with a more recent Pyromancy spell
            Self::Combustion(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr(*rank)),
                name: "Combustion".to_string(),
                tags: Some(vec![Tag::Ability(AbilityTag::Fire)]),
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            // TODO: add descriptive text for +accuracy vs non-bright illumination
            Self::DarkGrasp(rank) => SimpleSpell {
                accuracy: *rank - 2,
                crit: None,
                defense: Defense::Reflex,
                // TODO: add debuff on damage + Ment defense
                hit: AttackEffect::Damage(SimpleDamageEffect::dr(2)),
                name: "Dark Grasp".to_string(),
                tags: Some(vec![Tag::Ability(AbilityTag::Cold)]),
                targeting: Targeting::Anything(Range::Adjacent),
            }.attack(),
            // TODO: add "shadowed" requirement
            Self::DarkMiasma(rank) => SimpleSpell {
                accuracy: *rank - 1,
                crit: None,
                defense: Defense::Reflex,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr(1)),
                name: "Dark Miasma".to_string(),
                tags: Some(vec![Tag::Ability(AbilityTag::Cold), Tag::Ability(AbilityTag::Visual)]),
                targeting: Targeting::Radius(None, AreaSize::Medium, AreaTargets::Enemies),
            }.attack(),
            // TODO: replace with "Retributive Judgment" and add retributive accuracy
            Self::DivineJudgment(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Mental,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr(*rank)),
                name: "Divine Judgment".to_string(),
                tags: None,
                targeting: Targeting::Anything(Range::Short),
            }.attack(),
            // TODO: add lifesteal text
            Self::LifestealGrasp(rank) => SimpleSpell {
                accuracy: *rank - 2,
                crit: None,
                defense: Defense::Armor,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr2()),
                name: "Lifesteal Grasp".to_string(),
                tags: None,
                targeting: Targeting::Creature(Range::Adjacent),
            }.attack(),
            // TODO: add lifesteal text
            Self::Lifesteal(rank) => SimpleSpell {
                accuracy: *rank - 4,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr3()),
                name: "Lifesteal".to_string(),
                tags: None,
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            Self::Enrage(rank) => SimpleSpell {
                accuracy: *rank + 3,
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
                accuracy: *rank - 4,
                crit: None,
                defense: Defense::Reflex,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr2()),
                name: "Fireball".to_string(),
                tags: Some(vec![Tag::Ability(AbilityTag::Fire)]),
                targeting: Targeting::Radius(
                    Some(Range::Medium),
                    AreaSize::Medium,
                    AreaTargets::Everything,
                ),
            }.attack(),
            // TODO: replace this with an actual Pyromancy spell
            Self::Firebolt(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Armor,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr(*rank)),
                name: "Firebolt".to_string(),
                tags: Some(vec![Tag::Ability(AbilityTag::Fire)]),
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            Self::Ignition(rank) => SimpleSpell {
                accuracy: *rank - 1,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::DamageOverTime(DamageOverTimeEffect {
                    can_remove_with_dex: true,
                    damage: SimpleDamageEffect::dr1(),
                    duration: AttackEffectDuration::Condition,
                    narrative_text: "catches on fire".to_string(),
                }),
                name: "Ignition".to_string(),
                tags: Some(vec![Tag::Ability(AbilityTag::Fire)]),
                targeting: Targeting::Creature(Range::Short),
            }.attack(),
            Self::InflictWound(rank) => SimpleSpell {
                accuracy: *rank - 1,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(
                    SimpleDamageEffect::dr1()
                        .except(|effect| effect.lose_hp_effect = Some(AttackTriggeredEffect::RepeatDamage))
                ),
                name: "Inflict Wound".to_string(),
                tags: None,
                targeting: Targeting::Creature(Range::Short),
            }.attack(),
            Self::MysticBoltArmor(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Armor,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr(*rank)),
                name: "Armor Bolt".to_string(),
                tags: None,
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            Self::MysticBoltFortitude(rank) => SimpleSpell {
                accuracy: 0,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr(*rank)),
                name: "Fort Bolt".to_string(),
                tags: None,
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            // TODO: add "and you suffer a glancing blow"
            Self::Pyroclasm(rank) => SimpleSpell {
                accuracy: *rank - 1,
                crit: None,
                defense: Defense::Reflex,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr1()),
                name: "Pyroclasm".to_string(),
                tags: Some(vec![Tag::Ability(AbilityTag::Fire)]),
                targeting: Targeting::Radius(None, AreaSize::Medium, AreaTargets::Everything),
            }.attack(),
            // TODO: add Int-based +2 accuracy, add subdual damage
            Self::MindCrush(rank) => SimpleSpell {
                accuracy: *rank - 2,
                crit: None,
                defense: Defense::Mental,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr2l()),
                name: "Mind Crush".to_string(),
                tags: Some(vec![Tag::Ability(AbilityTag::Emotion)]),
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            Self::PersonalIgnition(rank) => SimpleSpell {
                accuracy: *rank - 2,
                crit: None,
                defense: Defense::Reflex,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr1()),
                name: "Personal Ignition".to_string(),
                tags: Some(vec![Tag::Ability(AbilityTag::Fire)]),
                // TODO: replace with "grappled by or natural weapon attack"
                targeting: Targeting::MadeMeleeAttack,
            }.attack(),
            // TODO: repeat the damage next round, rather than immediately
            Self::Pyrohemia(rank) => SimpleSpell {
                accuracy: *rank - 2,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(
                    SimpleDamageEffect::dr1()
                        .except(|effect| effect.lose_hp_effect = Some(AttackTriggeredEffect::RepeatDamage))
                ),
                name: "Pyrohemia".to_string(),
                tags: Some(vec![Tag::Ability(AbilityTag::Fire)]),
                targeting: Targeting::Creature(Range::Short),
            }.attack(),
            Self::RetributiveLifebond(rank) => SimpleSpell {
                accuracy: *rank - 1,
                crit: None,
                defense: Defense::Fortitude,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr1l()),
                name: "Retributive Lifebond".to_string(),
                tags: None,
                targeting: Targeting::CausedHpLoss(AreaSize::Medium),
            }.attack(),
            Self::Spikeform(rank) => SimpleSpell {
                accuracy: *rank - 2,
                crit: None,
                defense: Defense::Armor,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr1()),
                name: "Spikeform".to_string(),
                tags: None,
                targeting: Targeting::MadeMeleeAttack,
            }.attack(),
            // TODO: figure out "two targets adjacent to each other"
            Self::Windslash(rank) => SimpleSpell {
                accuracy: *rank - 2,
                crit: None,
                defense: Defense::Armor,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr1()),
                name: "Windslash".to_string(),
                tags: None,
                targeting: Targeting::Creature(Range::Medium),
            }.attack(),
            Self::Windsnipe(rank) => SimpleSpell {
                accuracy: *rank - 3,
                crit: None,
                defense: Defense::Armor,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr2l()),
                name: "Windsnipe".to_string(),
                tags: None,
                targeting: Targeting::Creature(Range::Distant),
            }.attack(),
            Self::WordOfFaith(rank) => SimpleSpell {
                accuracy: *rank - 2,
                crit: None,
                defense: Defense::Mental,
                hit: AttackEffect::Damage(SimpleDamageEffect::dr1()),
                name: "Word of Faith".to_string(),
                tags: None,
                targeting: Targeting::Radius(
                    None,
                    AreaSize::Small,
                    AreaTargets::Enemies,
                ),
            }.attack(),
        }
    }
}
