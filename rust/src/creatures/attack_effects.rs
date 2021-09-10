use crate::creatures::HasCreatureMechanics;
use crate::core_mechanics::{DamageDice, DamageType, Debuff};
use crate::equipment::Weapon;
use crate::latex_formatting;

#[derive(Clone)]
pub enum AttackEffect {
    Damage(DamageEffect),
    Debuff(DebuffEffect),
    HalfDamage,
    Poison(PoisonEffect),
    VitalWound(VitalWoundEffect),
}

#[derive(Clone)]
pub struct DamageEffect {
    pub damage_dice: DamageDice,
    pub damage_types: Vec<DamageType>,
    pub damage_modifier: i32,
    pub lose_hp_effects: Option<Vec<AttackEffect>>,
    pub power_multiplier: f64,
    pub take_damage_effects: Option<Vec<AttackEffect>>,
}

#[derive(Clone)]
pub struct DebuffEffect {
    pub debuffs: Vec<Debuff>,
    pub duration: AttackEffectDuration,
}

#[derive(Clone)]
pub struct PoisonEffect {
    pub stage1: Vec<Debuff>,
    pub stage3_debuff: Option<Vec<Debuff>>,
    pub stage3_vital: Option<VitalWoundEffect>,
}

#[derive(Clone)]
pub struct VitalWoundEffect {
    pub special_effect: Option<String>,
}

#[derive(Clone)]
pub enum AttackEffectDuration {
    Brief,
    Condition,
}

impl AttackEffect {
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

    pub fn area_damage(rank: i32, damage_types: Vec<DamageType>) -> Self {
        return Self::Damage(DamageEffect {
            damage_dice: DamageDice::new(DamageDice::d8() + rank - 1),
            damage_modifier: 0,
            damage_types,
            lose_hp_effects: None,
            power_multiplier: 0.5,
            take_damage_effects: None,
        });
    }

    pub fn from_weapon(weapon: Weapon) -> Self {
        return Self::Damage(DamageEffect {
            damage_dice: weapon.damage_dice(),
            damage_modifier: 0,
            damage_types: weapon.damage_types(),
            lose_hp_effects: None,
            power_multiplier: 1.0,
            take_damage_effects: None,
        });
    }

    pub fn description<T: HasCreatureMechanics>(
        &self,
        attacker: &T,
        is_magical: bool,
        is_strike: bool,
        the_subject: &str,
    ) -> String {
        match self {
            Self::Damage(effect) => {
                let take_damage_effect = if let Some(ref t) = effect.take_damage_effects {
                    format!(
                        "
                            Each creature damaged by this attack is {effect}
                        ",
                        effect = latex_formatting::join_string_list(
                            &t.iter()
                                .map(|e| e.description(
                                    attacker,
                                    is_magical,
                                    is_strike,
                                    the_subject
                                ))
                                .collect()
                        )
                        .unwrap(),
                    )
                } else {
                    String::from("")
                };
                let lose_hp_effect = if let Some(ref t) = effect.lose_hp_effects {
                    format!(
                        "
                            Each creature that loses \\glossterm<hit points> from this attack is {effect}
                        ",
                        effect = latex_formatting::join_string_list(
                            &t.iter().map(|e| e.description(attacker, is_magical, is_strike, the_subject)).collect()
                        ).unwrap(),
                    )
                } else {
                    String::from("")
                };
                let damage_modifier = effect.damage_modifier
                    + (attacker.calc_power(is_magical) as f64 * effect.power_multiplier) as i32;
                let mut damage_types = effect.damage_types.clone();
                damage_types.sort_by(|a, b| a.name().to_lowercase().cmp(&b.name().to_lowercase()));
                return format!(
                    "
                        {the_subject} takes {damage_dice}{damage_modifier} {damage_types} damage. {take_damage_effect} {lose_hp_effect}
                    ",
                    damage_dice = effect
                        .damage_dice
                        .add(attacker.calc_damage_increments(is_strike))
                        .to_string(),
                    damage_modifier = if damage_modifier == 0 { "".to_string()} else { latex_formatting::modifier(damage_modifier)},
                    damage_types = latex_formatting::join_formattable_list(&damage_types).unwrap_or(String::from("")),
                    take_damage_effect = take_damage_effect.trim(),
                    lose_hp_effect = lose_hp_effect.trim(),
                    the_subject = the_subject,
                );
            }
            Self::Debuff(effect) => {
                return format!(
                    "{the_subject} is {debuffs} {duration}.",
                    debuffs = effect
                        .debuffs
                        .iter()
                        .map(|d| d.latex_link())
                        .collect::<Vec<&str>>()
                        .join(", "),
                    duration = effect.duration.description(),
                    the_subject = the_subject,
                );
            }
            Self::HalfDamage => {
                return format!(
                    "{the_subject} takes half damage.",
                    the_subject = the_subject
                );
            }
            Self::Poison(effect) => {
                let mut third_stage = if let Some(ref debuffs) = effect.stage3_debuff {
                    format!(
                        "If a creature reaches the third poison stage, it becomes {debuffs} as long as it is poisoned.",
                        debuffs = latex_formatting::join_str_list(&debuffs.iter().map(|d| d.latex_link()).collect()).unwrap(),
                    )
                } else {
                    String::from("")
                };
                if let Some(ref vital_wound) = effect.stage3_vital {
                    third_stage = format!(
                        "If a creature reaches the third poison stage, it gains a \\glossterm<vital wound>. {special_effect}",
                        special_effect = vital_wound.special_effect.as_deref().unwrap_or(""),
                    )
                }
                return format!(
                    "
                        {the_subject} is \\glossterm<poisoned>.
                        As long as it is poisoned, it is {debuffs}.

                        At the end of each subsequent round, make an attack with the same accuracy against each poisoned creature's Fortitude defense, as normal for poisons (see \\pcref<Poison>).
                        {third_stage}
                    ",
                    debuffs = latex_formatting::join_str_list(&effect.stage1.iter().map(|d| d.latex_link()).collect()).unwrap(),
                    the_subject = the_subject,
                    third_stage = third_stage,
                );
            }
            Self::VitalWound(effect) => {
                return format!(
                    "{the_subject} gains a \\glossterm<vital wound>. {special_effect}.",
                    special_effect = effect.special_effect.as_deref().unwrap_or(""),
                    the_subject = the_subject,
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
