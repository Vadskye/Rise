use crate::core_mechanics::abilities::{latex_ability_block, UsageTime};
use crate::core_mechanics::abilities::{AbilityExtraContext, Targeting};
use crate::core_mechanics::attacks::attack_effect::DamageEffect;
use crate::core_mechanics::{Attribute, DamageDice, Defense, HasAttributes, Tag};
use crate::creatures::{Creature, CreatureCategory, HasModifiers, ModifierType};
use crate::equipment::{HasArmor, Weapon};
use crate::latex_formatting;

use super::{AttackEffect, Maneuver};

#[derive(Clone, Debug)]
pub struct Attack {
    pub accuracy: i32,
    pub crit: Option<AttackEffect>,
    pub defense: Defense,
    pub extra_context: Option<AbilityExtraContext>,
    pub hit: AttackEffect,
    pub is_magical: bool,
    pub is_strike: bool,
    pub name: String,
    pub replaces_weapon: Option<Weapon>,
    pub tags: Option<Vec<Tag>>,
    pub targeting: Targeting,
}

pub trait HasAttacks {
    fn add_special_attack(&mut self, attack: Attack);
    fn calc_all_attacks(&self) -> Vec<Attack>;
    fn get_attack_by_substring(&self, name: &str) -> Option<Attack> {
        return self.calc_all_attacks().into_iter().find(|a| a.name.contains(name));
    }
    fn get_attack_by_name(&self, name: &str) -> Option<Attack> {
        return self.calc_all_attacks().into_iter().find(|a| a.name == name);
    }
    fn calc_accuracy(&self) -> i32;
    fn calc_damage_increments(&self, is_strike: bool) -> i32;
    fn calc_damage_per_round_multiplier(&self) -> f64;
    fn calc_magical_power(&self) -> i32;
    fn calc_mundane_power(&self) -> i32;
    fn calc_power(&self, is_magical: bool) -> i32;
    fn explain_attacks(&self) -> Vec<String>;
}

impl Attack {
    // This allows passing in closures to modify the attack in small ways, which can save a lot of
    // space and awkwardness when customizing attacks for creatures
    pub fn except<F: FnOnce(&mut Attack)>(&self, f: F) -> Attack {
        let mut attack = self.clone();
        f(&mut attack);
        return attack;
    }

    // This allows passing in a closure to modify damage dealt on hit, which is harder than it
    // would seem because of the nesting structure within attacks.
    pub fn except_hit_damage<F: FnOnce(&mut DamageEffect)>(&self, f: F) -> Attack {
        let mut attack = self.clone();
        attack.hit = attack.hit.except_damage(f);
        return attack;
    }

    pub fn generate_modified_name(
        name: &str,
        rank: i32,
        greater_rank: i32,
        supreme_rank: Option<i32>,
    ) -> String {
        if supreme_rank.is_some() && rank >= supreme_rank.unwrap() {
            return format!("Supreme {}", name);
        } else if rank >= greater_rank {
            return format!("Greater {}", name);
        } else {
            return name.to_string();
        }
    }

    pub fn damage_effect_mut(&mut self) -> Option<&mut DamageEffect> {
        if let AttackEffect::Damage(ref mut e) = self.hit {
            return Some(e);
        }
        return None;
    }

    pub fn damage_effect(&self) -> Option<&DamageEffect> {
        if let AttackEffect::Damage(ref e) = self.hit {
            return Some(e);
        }
        return None;
    }

    pub fn calc_damage_dice(&self, creature: &Creature) -> Option<DamageDice> {
        if let Some(damage_effect) = self.damage_effect() {
            return Some(
                damage_effect
                    .damage_dice
                    .add(creature.calc_damage_increments(self.is_strike)),
            );
        }
        return None;
    }

    pub fn calc_damage_modifier(&self, creature: &Creature) -> Option<i32> {
        if let Some(damage_effect) = self.damage_effect() {
            return Some(
                damage_effect.damage_modifier
                    + (damage_effect.power_multiplier * creature.calc_power(self.is_magical) as f64)
                        as i32,
            );
        }
        return None;
    }

    pub fn calc_strikes(weapons: Vec<&Weapon>) -> Vec<Attack> {
        // TODO: combine maneuvers with weapons and handle non-weapon attacks
        return weapons.into_iter().map(|w| w.attack()).collect();
    }

    pub fn shorthand_description(&self, creature: &Creature) -> String {
        return format!(
            "{name} {accuracy} ({hit})",
            name = latex_formatting::uppercase_first_letter(&self.name),
            accuracy = latex_formatting::modifier(self.accuracy + creature.calc_accuracy()),
            hit = self
                .hit
                .description(
                    creature,
                    self.is_magical,
                    self.is_strike,
                    self.targeting.subjects()
                )
                .trim()
                .to_string(),
        );
    }
}

// LaTeX generation functions
impl Attack {
    pub fn latex_ability_block(&self, creature: &Creature) -> String {
        let mut tags_text = vec![];
        if let Some(ref tags) = self.tags {
            for tag in tags {
                tags_text.push(tag.latex());
            }
        }
        let usage_time = if let Targeting::CausedHpLoss(_) = self.targeting {
            Some(UsageTime::Triggered)
        } else {
            None
        };
        return latex_ability_block(
            self.hit.ability_type(),
            self.latex_effect(creature),
            tags_text,
            self.is_magical,
            self.name.clone(),
            usage_time,
        );
    }

    fn latex_effect(&self, creature: &Creature) -> String {
        let mut context = &AbilityExtraContext::empty();
        if let Some(ref c) = self.extra_context {
            context = c;
        }
        return format!(
            "
                {targeting}
                {cooldown}
                {suffix}
                \\hit {hit}
                {critical}
            ",
            cooldown = if let Some(ref cooldown) = context.cooldown {
                cooldown.description(false)
            } else {
                "".to_string()
            },
            hit = self
                .hit
                .description(
                    creature,
                    self.is_magical,
                    self.is_strike,
                    self.targeting.subjects()
                )
                .trim()
                .to_string(),
            critical = if let Some(ref g) = self.crit {
                format!(
                    "\\crit {}",
                    g.description(
                        creature,
                        self.is_magical,
                        self.is_strike,
                        self.targeting.subjects()
                    )
                )
            } else {
                "".to_string()
            },
            suffix = if let Some(ref s) = context.suffix {
                s.trim()
            } else {
                ""
            },
            targeting = self.targeting.description(
                &self.defense,
                self.accuracy + creature.calc_accuracy(),
                &context.movement
            ),
        );
    }
}

impl HasAttacks for Creature
where
    Creature: HasAttributes + HasModifiers + HasArmor,
{
    fn add_special_attack(&mut self, attack: Attack) {
        if self.special_attacks.is_none() {
            self.special_attacks = Some(vec![]);
        }
        if let Some(ref mut a) = self.special_attacks {
            a.push(attack);
        }
    }

    fn calc_all_attacks(&self) -> Vec<Attack> {
        let mut all_attacks: Vec<Attack> = vec![];
        if let Some(ref special_attacks) = self.special_attacks {
            for a in special_attacks {
                all_attacks.push(a.clone());
            }
        }

        for attack in self
            .get_modifiers()
            .iter()
            .map(|m| m.attack_definition())
            .collect::<Vec<Option<&Attack>>>()
        {
            if let Some(a) = attack {
                all_attacks.push(a.clone());
            }
        }

        for maneuver in self
            .get_modifiers()
            .iter()
            .map(|m| m.maneuver_definition())
            .collect::<Vec<Option<&Maneuver>>>()
        {
            if let Some(m) = maneuver {
                for weapon in &self.weapons {
                    all_attacks.push(m.attack(weapon.clone()));
                }
            }
        }

        let weapons_without_attacks: Vec<&Weapon> = self
            .weapons
            .iter()
            .filter(|weapon| {
                let same_weapon_attack = all_attacks.iter().any(|attack| {
                    if let Some(ref w) = attack.replaces_weapon {
                        return w.name == weapon.name;
                    } else {
                        return false;
                    }
                });
                return !same_weapon_attack;
            })
            .collect();
        let strikes = Attack::calc_strikes(weapons_without_attacks);
        for strike in strikes {
            all_attacks.push(strike);
        }

        return all_attacks;
    }

    fn calc_damage_per_round_multiplier(&self) -> f64 {
        match self.category {
            CreatureCategory::Character => 1.0,
            CreatureCategory::Monster(cr) => cr.damage_per_round_multiplier(),
        }
    }

    fn calc_accuracy(&self) -> i32 {
        let accuracy_from_armor: i32 = self.get_armor().iter().map(|a| a.accuracy_modifier()).sum();
        // note implicit floor due to integer storage
        return accuracy_from_armor
            + (self.level + self.get_base_attribute(&Attribute::Perception)) / 2
            + self.calc_total_modifier(ModifierType::Accuracy);
    }

    fn calc_damage_increments(&self, is_strike: bool) -> i32 {
        let mut increments: i32 = 0;
        if is_strike {
            increments += self.calc_total_modifier(ModifierType::StrikeDamageDice);
        }
        increments += match self.category {
            CreatureCategory::Character => 0,
            CreatureCategory::Monster(cr) => cr.damage_increments(),
        };
        return increments;
    }

    fn calc_magical_power(&self) -> i32 {
        return self.calc_power(true);
    }

    fn calc_mundane_power(&self) -> i32 {
        return self.calc_power(false);
    }

    fn calc_power(&self, is_magical: bool) -> i32 {
        let attribute = match is_magical {
            true => &Attribute::Willpower,
            false => &Attribute::Strength,
        };
        let mut levelish = self.level + self.get_base_attribute(attribute);
        let mut power = 0;
        if levelish > 21 {
            // +3 power for each point beyond 21
            power = (levelish - 21) * 3;
            levelish = 21
        }

        if levelish < 1 {
            power += levelish
        } else {
            power += match levelish {
                1 => 1,
                2 => 2,
                3 => 2,
                4 => 3,
                5 => 3,
                6 => 4,
                7 => 4, // start +1 per
                8 => 5,
                9 => 6,
                10 => 7,
                11 => 8,
                12 => 9,
                13 => 10, // start +2 per
                14 => 12,
                15 => 14,
                16 => 16,
                17 => 18,
                18 => 20,
                19 => 22,
                20 => 24,
                21 => 26,
                _ => panic!("Invalid levelish {}", levelish),
            }
        }

        return power + self.calc_total_modifier(ModifierType::Power);
    }

    fn explain_attacks(&self) -> Vec<String> {
        return self
            .calc_all_attacks()
            .iter()
            .map(|a| a.shorthand_description(self))
            .collect::<Vec<String>>();
    }
}

pub struct SimpleSpell {
    pub accuracy: i32,
    pub defense: Defense,
    pub crit: Option<AttackEffect>,
    pub hit: AttackEffect,
    pub name: String,
    pub tags: Option<Vec<Tag>>,
    pub targeting: Targeting,
}

impl SimpleSpell {
    pub fn attack(self) -> Attack {
        return Attack {
            // from self
            accuracy: self.accuracy,
            crit: self.crit,
            defense: self.defense,
            hit: self.hit,
            name: self.name,
            tags: self.tags,
            targeting: self.targeting,

            // defaults
            extra_context: None,
            is_magical: true,
            is_strike: false,
            replaces_weapon: None,
        };
    }
}
