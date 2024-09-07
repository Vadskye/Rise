use crate::core_mechanics::abilities::{
    latex_ability_block, AbilityExtraContext, Range, Targeting, UsageTime,
};
use crate::core_mechanics::attacks::attack_effect::DamageEffect;
use crate::core_mechanics::{Attribute, Defense, DicePool, HasAttributes, Tag};
use crate::creatures::{Creature, CreatureCategory, HasModifiers, ModifierType};
use crate::equipment::{HasArmor, Weapon};
use crate::latex_formatting;

use super::{AttackEffect, Maneuver};

// This represents an attack that a creature can make. It does not save information about the
// creature *using* the attack.
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

impl Default for Attack {
    fn default() -> Self {
        return Self {
            accuracy: 0,
            crit: None,
            defense: Defense::Armor,
            extra_context: None,
            hit: AttackEffect::BriefDurationInstead,
            is_magical: false,
            is_strike: false,
            name: "Default Attack Name".to_string(),
            replaces_weapon: None,
            tags: None,
            targeting: Targeting::Anything(Range::Medium),
        };
    }
}

// This is implemented by creatures, and includes a lot of the calculations necessary to figure out
// how attacks work. It's possible that "power" should be calculated separately, since it's also
// useful for healing and some passive abilities.
pub trait HasAttacks {
    fn add_special_attack(&mut self, attack: Attack);
    fn calc_all_attacks(&self) -> Vec<Attack>;
    fn get_attack_by_substring(&self, name: &str) -> Option<Attack> {
        let matching_attacks = self
            .calc_all_attacks()
            .into_iter()
            .filter(|a| a.name.contains(name))
            .collect::<Vec<Attack>>();

        // Prefer non-upgraded versions of attacks if possible, since upgraded versions are
        // easier to specify unambiguously. This is hacky and we should find a better
        // solution.
        let non_upgraded_attack = matching_attacks.iter().find(|a| !a.name.contains("+"));
        if non_upgraded_attack.is_some() {
            non_upgraded_attack.cloned()
        } else {
            matching_attacks.first().cloned()
        }
    }
    fn get_attack_by_name(&self, name: &str) -> Option<Attack> {
        self.calc_all_attacks().into_iter().find(|a| a.name == name)
    }
    fn calc_accuracy(&self) -> i32;
    fn calc_brawling_accuracy(&self) -> i32;
    fn calc_damage_per_round_multiplier(&self) -> f64;
    fn calc_explosion_target(&self) -> i32;
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
        attack
    }

    // The process of adding a tag is awkward, so it's convenient to encapsulate that process.
    pub fn except_with_tag(&self, tag: Tag) -> Attack {
        self.except(|a| {
            let mut tags = a.tags.clone().unwrap_or(vec![]);
            tags.push(tag);
            a.tags = Some(tags);
        })
    }

    // This allows passing in a closure to modify damage dealt on hit, which is harder than it
    // would seem because of the nesting structure within attacks.
    pub fn except_hit_damage<F: FnOnce(&mut DamageEffect)>(&self, f: F) -> Attack {
        let mut attack = self.clone();
        attack.hit = attack.hit.except_damage(f);
        attack
    }

    // This is a particularly common replacement for elite monsters, and managing the imports is
    // annoying without this function.
    pub fn except_elite(&self) -> Attack {
        eprintln!(
            "Error: unable to support elite attacks. Convert {} into an ActiveAbility.",
            self.name
        );
        self.clone()
    }

    // Currently, the only attack-specific explosion target modifier is the Impact weapon tag.
    // In the future, it would be possible to add support for special attacks like Feral Strike.
    pub fn calc_explosion_target_modifier(&self) -> i32 {
        let mut explosion_target_modifier = 0;

        for tag in self.tags.as_ref().unwrap_or(&vec![]) {
            match tag {
                Tag::Weapon(t) => {
                    if let Some(m) = t.modifier() {
                        if m.modifier_type() == ModifierType::ExplosionTarget {
                            explosion_target_modifier += m.value();
                        }
                    }
                }
                _ => {}
            }
        }

        explosion_target_modifier
    }

    pub fn generate_modified_name(
        name: &str,
        rank: i32,
        greater_rank: i32,
        supreme_rank: Option<i32>,
    ) -> String {
        if supreme_rank.is_some() && rank >= supreme_rank.unwrap() {
            format!("Supreme {}", name)
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
        None
    }

    pub fn damage_effect(&self) -> Option<&DamageEffect> {
        if let AttackEffect::Damage(ref e) = self.hit {
            return Some(e);
        }
        None
    }

    // A fairly thin convenience wrapper around DamageEffect.calc_damage_dice(). Could be used for
    // other values, like healing, once that is supported.
    pub fn calc_dice_pool(&self, creature: &Creature) -> Option<DicePool> {
        if let Some(damage_effect) = self.damage_effect() {
            return Some(damage_effect.calc_damage_dice(creature, self.is_magical, self.is_strike));
        }
        None
    }

    // Create a list of simple strikes that don't use any maneuvers. These attacks deal irrelevant
    // damage at high levels.
    pub fn calc_strikes(weapons: Vec<&Weapon>) -> Vec<Attack> {
        // TODO: combine maneuvers with weapons and handle non-weapon attacks
        weapons.into_iter().map(|w| w.attack()).collect()
    }

    pub fn shorthand_description(&self, creature: &Creature) -> String {
        format!(
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
                .trim(),
        )
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
            Some(UsageTime::Standard)
        };
        latex_ability_block(
            self.hit.ability_type(),
            self.latex_effect(creature),
            tags_text,
            self.is_magical,
            self.name.clone(),
            usage_time,
        )
    }

    fn latex_effect(&self, creature: &Creature) -> String {
        let empty_context = &AbilityExtraContext::empty();
        let context = self.extra_context.as_ref().unwrap_or(empty_context);
        format!(
            "
                {targeting}
                {cooldown}
                {suffix}
                \\hit {hit}
                {critical}
                {massive_miss}
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
                .trim(),
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
            massive_miss = if self.is_strike && creature.size.is_massive() {
                r"\miss Half damage."
            } else {
                ""
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
        )
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
                    all_attacks.push(m.attack(weapon.clone(), self.rank()));
                }
            }
        }

        let weapons_without_attacks: Vec<&Weapon> = self
            .weapons
            .iter()
            .filter(|weapon| {
                let same_weapon_attack = all_attacks.iter().any(|attack| {
                    if let Some(ref w) = attack.replaces_weapon {
                        w.name == weapon.name
                    } else {
                        false
                    }
                });
                !same_weapon_attack
            })
            .collect();
        let strikes = Attack::calc_strikes(weapons_without_attacks);
        for strike in strikes {
            all_attacks.push(strike);
        }

        all_attacks
    }

    fn calc_damage_per_round_multiplier(&self) -> f64 {
        match self.category {
            CreatureCategory::Character => 1.0,
            CreatureCategory::Monster(cr, _) => cr.damage_per_round_multiplier(),
        }
    }

    fn calc_accuracy(&self) -> i32 {
        let accuracy_from_armor: i32 = self.get_armor().iter().map(|a| a.accuracy_modifier()).sum();
        // note implicit floor due to integer storage
        accuracy_from_armor
            + (self.level + self.get_base_attribute(&Attribute::Perception)) / 2
            + self.calc_total_modifier(ModifierType::Accuracy)
    }

    fn calc_brawling_accuracy(&self) -> i32 {
        let accuracy_from_armor: i32 = self.get_armor().iter().map(|a| a.accuracy_modifier()).sum();
        // note implicit floor due to integer storage
        accuracy_from_armor
            + (self.level + self.get_base_attribute(&Attribute::Strength)) / 2
            // TODO: add separate "brawling accuracy" modifier.
            // All modifiers to accuracy should affect brawling accuracy, but not all modifiers to
            // brawling accuracy should affect accuracy.
            + self.calc_total_modifier(ModifierType::Accuracy)
    }

    fn calc_explosion_target(&self) -> i32 {
        10 + self.calc_total_modifier(ModifierType::ExplosionTarget)
    }

    fn calc_magical_power(&self) -> i32 {
        self.calc_power(true)
    }

    fn calc_mundane_power(&self) -> i32 {
        self.calc_power(false)
    }

    fn calc_power(&self, is_magical: bool) -> i32 {
        let attribute = if self.is_mindless() {
            &Attribute::Strength
        } else {
            match is_magical {
                true => &Attribute::Willpower,
                false => &Attribute::Strength,
            }
        };
        let specific_modifier = match is_magical {
            true => self.calc_total_modifier(ModifierType::MagicalPower),
            false => self.calc_total_modifier(ModifierType::MundanePower),
        };
        (self.level / 2)
            + self.get_base_attribute(attribute)
            + specific_modifier
            + self.calc_total_modifier(ModifierType::Power)
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
        Attack {
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
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    mod calc_explosion_target_modifier {
        use super::*;

        #[test]
        fn calculates_for_normal_weapon() {
            let attack = Weapon::broadsword().attack();

            assert_eq!(0, attack.calc_explosion_target_modifier());
        }

        #[test]
        fn calculates_for_impact_weapon() {
            let attack = Weapon::greatmace().attack();

            assert_eq!(-2, attack.calc_explosion_target_modifier());
        }
    }
}
