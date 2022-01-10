use crate::core_mechanics::abilities::attack_effect::DamageEffect;
use crate::core_mechanics::abilities::{AttackEffect, AbilityMovement, Cooldown, Targeting};
use crate::core_mechanics::{Attribute, DamageDice, Defense, HasAttributes};
use crate::creatures::{Creature, CreatureCategory, HasModifiers, Maneuver, ModifierType};
use crate::equipment::{HasArmor, Weapon};
use crate::latex_formatting;

#[derive(Clone)]
pub struct Attack {
    pub accuracy: i32,
    pub cooldown: Option<Cooldown>,
    pub crit: Option<AttackEffect>,
    pub defense: Defense,
    pub hit: AttackEffect,
    pub is_magical: bool,
    pub is_strike: bool,
    pub movement: Option<AbilityMovement>,
    pub name: String,
    pub replaces_weapon: Option<Weapon>,
    pub targeting: Targeting,
}

pub trait HasAttacks {
    fn add_special_attack(&mut self, attack: Attack);
    fn calc_all_attacks(&self) -> Vec<Attack>;
    fn get_attack_by_name(&self, name: &str) -> Option<Attack> {
        return self.calc_all_attacks().into_iter().find(|a| a.name == name);
    }
    fn calc_accuracy(&self) -> i32;
    fn calc_damage_increments(&self, is_strike: bool, is_magical: bool) -> i32;
    fn calc_damage_per_round_multiplier(&self) -> f64;
    fn calc_power(&self) -> i32;
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
                    .add(creature.calc_damage_increments(self.is_strike, self.is_magical)),
            );
        }
        return None;
    }

    pub fn calc_damage_modifier(&self, creature: &Creature) -> Option<i32> {
        if let Some(damage_effect) = self.damage_effect() {
            return Some(
                damage_effect.damage_modifier
                    + (damage_effect.power_multiplier * creature.calc_power() as f64) as i32,
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
        let ability_components: Vec<Option<String>> = vec![
            Some(self.latex_ability_header()),
            Some(self.latex_effect(creature)),
        ];
        let ability_components = ability_components
            .iter()
            .filter(|c| c.is_some())
            .map(|c| c.as_deref().unwrap().trim())
            .collect::<Vec<&str>>();
        return format!(
            "
                \\begin<{ability_environment}>*<{name}>[{ability_type}]
                    {ability_components}
                \\end<{ability_environment}>
            ",
            ability_environment = self.hit.ability_type().environment(),
            ability_components = ability_components.join("\n\\rankline "),
            ability_type = self.hit.ability_type().name(),
            name = latex_formatting::uppercase_first_letter(&self.name),
        );
    }

    // This should always return a string; even if there are no tags, we want a rankline after the
    // top section.
    fn latex_ability_header(&self) -> String {
        let tags = self.latex_tags().unwrap_or("".to_string());
        let usage_time = self.usage_time().unwrap_or("".to_string());
        return vec![tags, usage_time].join("\n");
    }

    fn usage_time(&self) -> Option<String> {
        if let Targeting::CausedHpLoss(_) = self.targeting {
            return Some(r"\par \noindent Usage time: Triggered.".to_string());
        } else {
            return None;
        }
    }

    fn latex_tags(&self) -> Option<String> {
        let mut tags: Vec<&str> = vec![];
        if self.is_magical {
            tags.push("\\abilitytag<Magical>");
        }
        // TODO: take other tags into account

        if tags.len() > 0 {
            return Some(tags.join(", "));
        } else {
            return None;
        }
    }

    fn latex_effect(&self, creature: &Creature) -> String {
        return format!(
            "
                {targeting}
                {cooldown}
                \\hit {hit}
                {critical}
            ",
            cooldown = if let Some(ref c) = self.cooldown {
                c.description(false)
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
            targeting = self.targeting.description(
                &self.defense,
                self.accuracy + creature.calc_accuracy(),
                &self.movement
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
            + self.level / 2
            + self.get_base_attribute(&Attribute::Perception) / 2
            + self.calc_total_modifier(ModifierType::Accuracy);
    }

    fn calc_damage_increments(&self, is_strike: bool, is_magical: bool) -> i32 {
        let attribute = match is_magical {
            true => &Attribute::Willpower,
            false => &Attribute::Strength,
        };
        let mut increments: i32 = self.get_base_attribute(attribute) / 2;
        if is_strike {
            increments += self.calc_total_modifier(ModifierType::StrikeDamageDice);
        }
        increments += match self.category {
            CreatureCategory::Character => 0,
            CreatureCategory::Monster(cr) => cr.damage_increments(),
        };
        return increments;
    }

    fn calc_power(&self) -> i32 {
        return self.calc_total_modifier(ModifierType::Power);
    }
}
