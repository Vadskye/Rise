use crate::core_mechanics::abilities::{AbilityType, HasAttacks};
use crate::core_mechanics::{DamageDice, DamageType, Debuff, Defense};
use crate::creatures::Creature;
use crate::equipment::Weapon;
use crate::latex_formatting;
use titlecase::titlecase;

#[derive(Clone)]
pub enum AttackEffect {
    BriefDurationInstead,
    Custom(AbilityType, String),
    Damage(DamageEffect),
    DamageOverTime(DamageOverTimeEffect),
    Debuff(DebuffEffect),
    DebuffInstead(DebuffInsteadEffect),
    HalfDamage,
    Healing(HealingEffect),
    Knockback(i32),
    MustRemoveTwice,
    Poison(PoisonEffect),
    Push(i32),
    VitalWound(VitalWoundEffect),
}

#[derive(Clone)]
pub struct SimpleDamageEffect {
    pub damage_dice: DamageDice,
    pub damage_types: Vec<DamageType>,
    pub power_multiplier: f64,
}

impl SimpleDamageEffect {
    pub fn damage_effect(&self) -> DamageEffect {
        return DamageEffect {
            // from self
            damage_dice: self.damage_dice.clone(),
            damage_types: self.damage_types.clone(),
            power_multiplier: self.power_multiplier,

            // default values
            damage_modifier: 0,
            extra_defense_effect: None,
            lose_hp_effect: None,
            take_damage_effect: None,
            vampiric_healing: None,
        };
    }

    fn description(&self, attacker: &Creature, is_magical: bool, is_strike: bool) -> String {
        return self.damage_effect().description(attacker, is_magical, is_strike);
    }
}

#[derive(Clone)]
pub struct DamageEffect {
    pub extra_defense_effect: Option<(Defense, AttackTriggeredEffect)>,
    pub damage_dice: DamageDice,
    pub damage_types: Vec<DamageType>,
    pub damage_modifier: i32,
    pub lose_hp_effect: Option<AttackTriggeredEffect>,
    pub power_multiplier: f64,
    pub take_damage_effect: Option<AttackTriggeredEffect>,
    pub vampiric_healing: Option<HealingEffect>,
}

impl DamageEffect {
    fn ability_type(&self) -> AbilityType {
        if let Some(ref effect) = self.lose_hp_effect {
            if effect.ability_type() != AbilityType::Instant {
                return effect.ability_type();
            }
        }
        if let Some(ref effect) = self.take_damage_effect {
            if effect.ability_type() != AbilityType::Instant {
                return effect.ability_type();
            }
        }
        return AbilityType::Instant;
    }

    fn description(&self, attacker: &Creature, is_magical: bool, is_strike: bool) -> String {
        let extra_defense_effect = if let Some(ref effect) = self.extra_defense_effect {
            format!(
                "
                    In addition, if this attack also beats a target's {defense} defense, it is {effect}
                ",
                defense = titlecase(effect.0.name()),
                effect = effect.1.description(),
            )
        } else {
            "".to_string()
        };

        let take_damage_effect = if let Some(ref effect) = self.take_damage_effect {
            format!(
                "
                    Each creature damaged by this attack is {effect}
                ",
                effect = effect.description(),
            )
        } else {
            "".to_string()
        };

        let lose_hp_effect = if let Some(ref effect) = self.lose_hp_effect {
            format!(
                "
                    Each creature that loses \\glossterm<hit points> from this attack is {effect}
                ",
                effect = effect.description(),
            )
        } else {
            "".to_string()
        };

        let vampiric_healing = if let Some(ref effect) = self.vampiric_healing {
            format!(
                "
                    If any creature loses \\glossterm<hit points> from this attack, {regain} {effect}
                ",
                effect = effect.description(attacker),
                regain = if attacker.is_character() { "you regain" } else { "the $name regains" },
            )
        } else {
            "".to_string()
        };

        let damage_modifier =
            self.damage_modifier + (attacker.calc_power() as f64 * self.power_multiplier) as i32;
        let mut damage_types = self.damage_types.clone();
        damage_types.sort_by(|a, b| a.name().to_lowercase().cmp(&b.name().to_lowercase()));
        return format!(
            "
                {damage_dice}{damage_modifier} {damage_types} damage.
                {take_damage_effect} {lose_hp_effect} {extra_defense_effect} {vampiric_healing}
            ",
            damage_dice = self
                .damage_dice
                .add(attacker.calc_damage_increments(is_strike, is_magical))
                .to_string(),
            damage_modifier = if damage_modifier == 0 {
                "".to_string()
            } else {
                latex_formatting::modifier(damage_modifier)
            },
            damage_types =
                latex_formatting::join_formattable_list(&damage_types).unwrap_or(String::from("")),
            extra_defense_effect = extra_defense_effect.trim(),
            take_damage_effect = take_damage_effect.trim(),
            lose_hp_effect = lose_hp_effect.trim(),
            vampiric_healing = vampiric_healing.trim(),
        )
        .trim()
        .to_string();
    }
}

#[derive(Clone)]
pub struct DamageOverTimeEffect {
    pub can_remove_with_dex: bool,
    pub damage: DamageEffect,
    pub duration: AttackEffectDuration,
    // For example, "catches on fire"
    pub narrative_text: String,
}

impl DamageOverTimeEffect {
    fn description(&self, attacker: &Creature, is_magical: bool, the_subject: &str) -> String {
        return format!(
            "
                {narrative_text} {duration}.
                At the end of each round, {the_subject} takes {damage}

                {removal}
            ",
            narrative_text = self.narrative_text,
            duration = self.duration.description(),
            damage = self.damage.description(attacker, is_magical, false),
            the_subject = the_subject,
            removal = if self.can_remove_with_dex { "
                The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{move action}.
                Dropping \\prone as part of this action gives a +5 bonus to this check.
            " } else { "" },
        ).trim().to_string();
    }
}

#[derive(Clone)]
pub struct DebuffEffect {
    pub debuffs: Vec<Debuff>,
    pub duration: AttackEffectDuration,
}

impl DebuffEffect {
    fn description(&self) -> String {
        let debuff_texts = self
            .debuffs
            .iter()
            .map(|d| d.latex_link())
            .collect::<Vec<String>>();
        let debuff_text =
            latex_formatting::join_string_list(&debuff_texts).unwrap_or("".to_string());
        if self.duration == AttackEffectDuration::Brief {
            return format!("{} {}.", self.duration.description(), debuff_text);
        } else {
            return format!("{} {}.", debuff_text, self.duration.description());
        }
    }
}

#[derive(Clone)]
pub struct DebuffInsteadEffect {
    pub debuffs: Vec<Debuff>,
    pub instead_of: Debuff,
}

impl DebuffInsteadEffect {
    fn description(&self) -> String {
        let debuff_texts = self
            .debuffs
            .iter()
            .map(|d| d.latex_link())
            .collect::<Vec<String>>()
            .join(", ");
        return format!("{} instead of {}.", debuff_texts, self.instead_of.name());
    }
}

#[derive(Clone)]
pub struct HealingEffect {
    pub healing_dice: DamageDice,
    pub is_magical: bool,
    pub power_multiplier: f64,
}

impl HealingEffect {
    fn description(&self, healer: &Creature) -> String {
        return format!(
            "{dice}{modifier} hit points.",
            dice = self
                .healing_dice
                .add(healer.calc_damage_increments(false, self.is_magical))
                .to_string(),
            modifier = latex_formatting::modifier(
                (self.power_multiplier * healer.calc_power() as f64).floor() as i32
            ),
        );
    }
}

#[derive(Clone)]
pub struct PoisonEffect {
    pub stage1: Vec<Debuff>,
    pub stage3_debuff: Option<Vec<Debuff>>,
    pub stage3_vital: Option<VitalWoundEffect>,
}

impl PoisonEffect {
    fn description(&self) -> String {
        let mut third_stage = if let Some(ref debuffs) = self.stage3_debuff {
            format!(
                        "If a creature reaches the third poison stage, it becomes {debuffs} as long as it is poisoned.",
                        debuffs = latex_formatting::join_string_list(&debuffs.iter().map(|d| d.latex_link()).collect()).unwrap(),
                    )
        } else {
            String::from("")
        };
        if let Some(ref vital_wound) = self.stage3_vital {
            third_stage = format!(
                        "If a creature reaches the third poison stage, it gains a \\glossterm<vital wound>. {special_effect}",
                        special_effect = vital_wound.special_effect.as_deref().unwrap_or(""),
                    )
        }
        let debuffs = latex_formatting::join_string_list(
            &self.stage1.iter().map(|d| d.latex_link()).collect(),
        )
        .unwrap();

        return format!(
            "
                \\glossterm<poisoned>.
                As long as it is poisoned, it is {debuffs}.

                At the end of each subsequent round, make an attack with the same accuracy against each poisoned creature's Fortitude defense, as normal for poisons (see \\pcref<Poison>).
                {third_stage}
            ",
            debuffs = debuffs,
            third_stage = third_stage,
        );
    }
}

#[derive(Clone)]
pub struct VitalWoundEffect {
    pub special_effect: Option<String>,
}

impl VitalWoundEffect {
    fn description(&self) -> String {
        return format!(
            "gains a \\glossterm<vital wound>. {special_effect}.",
            special_effect = self.special_effect.as_deref().unwrap_or(""),
        );
    }
}

#[derive(Clone, PartialEq)]
pub enum AttackEffectDuration {
    Brief,
    Condition,
}

impl AttackEffect {
    pub fn ability_type(&self) -> AbilityType {
        match self {
            Self::BriefDurationInstead => AbilityType::Duration,
            Self::Custom(ability_type, _) => ability_type.clone(),
            Self::Damage(effect) => effect.ability_type(),
            Self::DamageOverTime(_) => AbilityType::Duration,
            Self::Debuff(_) => AbilityType::Duration,
            Self::DebuffInstead(_) => AbilityType::Duration,
            Self::HalfDamage => AbilityType::Instant,
            Self::Healing(_) => AbilityType::Instant,
            Self::Knockback(_) => AbilityType::Instant,
            Self::MustRemoveTwice => AbilityType::Duration,
            Self::Poison(_) => AbilityType::Duration,
            Self::Push(_) => AbilityType::Instant,
            Self::VitalWound(_) => AbilityType::Instant,
        }
    }

    pub fn area_damage(rank: i32, damage_types: Vec<DamageType>) -> Self {
        return Self::Damage(DamageEffect {
            extra_defense_effect: None,
            damage_dice: DamageDice::aoe_damage(rank),
            damage_modifier: 0,
            damage_types,
            lose_hp_effect: None,
            power_multiplier: 0.5,
            take_damage_effect: None,
            vampiric_healing: None,
        });
    }

    pub fn except_damage<F: FnOnce(&mut DamageEffect)>(&self, f: F) -> AttackEffect {
        let mut attack_effect = self.clone();
        match attack_effect {
            Self::Damage(ref mut d) => {
                f(d);
            }
            _ => {}
        };
        return attack_effect;
    }

    pub fn from_weapon(weapon: Weapon) -> Self {
        return Self::Damage(DamageEffect {
            extra_defense_effect: None,
            damage_dice: weapon.damage_dice,
            damage_modifier: 0,
            damage_types: weapon.damage_types,
            lose_hp_effect: None,
            power_multiplier: 1.0,
            take_damage_effect: None,
            vampiric_healing: None,
        });
    }

    pub fn description(
        &self,
        attacker: &Creature,
        is_magical: bool,
        is_strike: bool,
        the_subject: &str,
    ) -> String {
        match self {
            Self::BriefDurationInstead => {
                return r"The effect lasts \glossterm{briefly}.".to_string();
            }
            Self::Custom(_, text) => {
                return text.clone();
            }
            Self::Damage(effect) => {
                return format!(
                    "{the_subject} takes {damage}",
                    damage = effect.description(attacker, is_magical, is_strike),
                    the_subject = the_subject,
                );
            }
            Self::DamageOverTime(effect) => {
                return format!(
                    "{the_subject} {damage}",
                    damage = effect.description(attacker, is_magical, the_subject),
                    the_subject = the_subject.to_lowercase(),
                );
            }
            Self::Debuff(effect) => {
                return format!(
                    "{the_subject} is {debuffs}",
                    debuffs = effect.description(),
                    the_subject = the_subject,
                );
            }
            Self::DebuffInstead(effect) => {
                return format!(
                    "{the_subject} is {debuffs}",
                    debuffs = effect.description(),
                    the_subject = the_subject,
                );
            }
            Self::HalfDamage => {
                return "Half damage.".to_string();
            }
            Self::Healing(effect) => {
                return format!(
                    "{the_subject} {heals}",
                    heals = effect.description(attacker),
                    the_subject = the_subject,
                );
            }
            Self::Knockback(feet) => {
                return format!(
                    "
                        {the_subject} is \\glossterm<knocked back> up to {feet} ft. in any direction.
                    ",
                    the_subject = the_subject,
                    feet = feet,
                );
            }
            Self::MustRemoveTwice => {
                return format!(
                    "
                        The condition must be removed twice before the effect ends.
                    ",
                );
            }
            Self::Poison(effect) => {
                return format!(
                    "
                        {the_subject} is {poisoned}
                    ",
                    the_subject = the_subject,
                    poisoned = effect.description(),
                );
            }
            Self::Push(feet) => {
                return format!(
                    "
                        {the_subject} is \\glossterm<pushed> up to {feet} ft. in any direction.
                        The creature moves the same distance that it pushes {the_subject}.
                    ",
                    the_subject = the_subject,
                    feet = feet,
                );
            }
            Self::VitalWound(effect) => {
                return format!(
                    "{the_subject} {vital_wound}",
                    the_subject = the_subject,
                    vital_wound = effect.description(),
                );
            }
        };
    }
}

impl AttackEffectDuration {
    pub fn description(&self) -> &str {
        match self {
            Self::Brief => "\\glossterm{briefly}",
            Self::Condition => "as a \\glossterm{condition}",
        }
    }
}

#[derive(Clone)]
pub enum AttackTriggeredEffect {
    Debuff(DebuffEffect),
    Grappled,
    Poison(PoisonEffect),
    VitalWound(VitalWoundEffect),
}

impl AttackTriggeredEffect {
    fn ability_type(&self) -> AbilityType {
        match self {
            Self::Debuff(_) => AbilityType::Duration,
            Self::Grappled => AbilityType::Instant,
            Self::Poison(_) => AbilityType::Duration,
            Self::VitalWound(_) => AbilityType::Instant,
        }
    }

    fn description(&self) -> String {
        match self {
            Self::Debuff(e) => e.description(),
            Self::Grappled => "\\grappled by the $name.".to_string(),
            Self::Poison(e) => e.description(),
            Self::VitalWound(e) => e.description(),
        }
    }
}
