use crate::core_mechanics::{Attribute, DamageDice, Defense, HasAttributes, SpeedCategory};
use crate::creatures::attack_effects::{AttackEffect, DamageEffect};
use crate::creatures::{attack_effects, Creature, CreatureCategory, Maneuver, ModifierType};
use crate::equipment::{HasArmor, Weapon};
use crate::latex_formatting;
use std::fmt;

use super::HasModifiers;

#[derive(Clone)]
pub struct Attack {
    pub accuracy: i32,
    pub cooldown: Option<AttackCooldown>,
    pub crit: Option<AttackEffect>,
    pub defense: Defense,
    pub hit: AttackEffect,
    pub is_magical: bool,
    pub is_strike: bool,
    pub movement: Option<AttackMovement>,
    pub name: String,
    pub replaces_weapon: Option<Weapon>,
    pub targeting: AttackTargeting,
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
    fn calc_power(&self, is_magical: bool) -> i32;
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

    pub fn damage_effect_mut(&mut self) -> Option<&mut attack_effects::DamageEffect> {
        if let AttackEffect::Damage(ref mut e) = self.hit {
            return Some(e);
        }
        return None;
    }

    pub fn damage_effect(&self) -> Option<&attack_effects::DamageEffect> {
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
        if let AttackTargeting::CausedHpLoss(_) = self.targeting {
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

#[derive(Clone)]
pub enum AttackTargeting {
    Anything(AttackRange),
    CausedDamage(AreaSize),
    CausedHpLoss(AreaSize),
    Cone(AreaSize, AreaTargets),
    Creature(AttackRange),
    Line(i32, AreaSize, AreaTargets),
    Radius(Option<AttackRange>, AreaSize, AreaTargets),
    Strike,
}

impl AttackTargeting {
    // the minimum rank required to achieve the given targeting requirements
    pub fn minimum_rank(&self) -> i32 {
        match self {
            Self::Anything(range) => range.minimum_rank(),
            Self::CausedDamage(size) => match size {
                AreaSize::Tiny => 0,
                AreaSize::Small => 1,
                AreaSize::Medium => 2,
                AreaSize::Large => 3,
                AreaSize::Huge => 5,
                AreaSize::Gargantuan => 7,
                AreaSize::Custom(_) => 7,
            },
            Self::CausedHpLoss(size) => match size {
                AreaSize::Tiny => 0,
                AreaSize::Small => 1,
                AreaSize::Medium => 2,
                AreaSize::Large => 3,
                AreaSize::Huge => 5,
                AreaSize::Gargantuan => 7,
                AreaSize::Custom(_) => 7,
            },
            Self::Creature(range) => range.minimum_rank(),
            Self::Cone(size, targets) => {
                let minimum_rank = match size {
                    AreaSize::Tiny => 0,
                    AreaSize::Small => 1,
                    AreaSize::Medium => 2,
                    AreaSize::Large => 3,
                    AreaSize::Huge => 5,
                    AreaSize::Gargantuan => 7,
                    AreaSize::Custom(_) => 7,
                };
                return minimum_rank + targets.rank_modifier();
            }
            Self::Line(width, size, targets) => {
                let minimum_rank = match size {
                    AreaSize::Tiny => panic!("Tiny lines are nonsensical"),
                    AreaSize::Small => 0,
                    AreaSize::Medium => 1,
                    AreaSize::Large => 2,
                    AreaSize::Huge => 3,
                    AreaSize::Gargantuan => 4,
                    AreaSize::Custom(_) => 5,
                };
                let width_modifier = match width {
                    5 => 0,
                    10 => 1,
                    15 => 2,
                    _ => panic!("Invalid line width {}", width),
                };
                return minimum_rank + width_modifier + targets.rank_modifier();
            }
            Self::Radius(range, size, targets) => {
                let minimum_rank = match size {
                    AreaSize::Tiny => panic!("Tiny cones are nonsensical"),
                    AreaSize::Small => 1,
                    AreaSize::Medium => 2,
                    AreaSize::Large => 3,
                    AreaSize::Huge => 5,
                    AreaSize::Gargantuan => 7,
                    AreaSize::Custom(_) => 7,
                };
                let range_modifier = if let Some(r) = range {
                    r.minimum_rank() + 1
                } else {
                    0
                };
                return minimum_rank + range_modifier + targets.rank_modifier();
            }
            Self::Strike => 1,
        }
    }

    pub fn description(
        &self,
        defense: &Defense,
        accuracy: i32,
        movement: &Option<AttackMovement>,
    ) -> String {
        let defense = latex_formatting::uppercase_first_letter(defense.to_string().as_str());
        let accuracy = latex_formatting::modifier(accuracy);

        let mut the_creature = "The $name".to_string();
        let mut movement_after_attack = "".to_string();
        if let Some(ref movement) = movement {
            let straight_line_text = if movement.requires_straight_line {
                " in a straight line"
            } else {
                ""
            };
            if movement.move_before_attack {
                the_creature = format!(
                    "The $name moves up to {speed}{straight_line_text}. Then, it",
                    speed = movement.speed.its_speed(),
                    straight_line_text = straight_line_text,
                );
            } else {
                movement_after_attack = format!(
                    "Then, the $name moves up to {speed}{straight_line_text}.",
                    speed = movement.speed.its_speed(),
                    straight_line_text = straight_line_text,
                );
            }
        }

        let standard_attack_against = format!(
            "{the_creature} makes a {accuracy} attack vs. {defense} against",
            accuracy = accuracy,
            defense = defense,
            the_creature = the_creature,
        );

        let main_attack = match self {
            Self::Anything(range) => format!(
                "{standard_attack_against} anything within {range}.",
                standard_attack_against = standard_attack_against,
                range = range
            ),
            Self::CausedDamage(size) => format!(
                "At the end of each phase, the $name makes a {accuracy} attack vs. {defense} against each \\glossterm<enemy> within a {size} radius \\glossterm<emanation> of it that dealt damage to it during that phase.",
                accuracy = accuracy,
                size = size,
                defense = defense,
            ),
            Self::CausedHpLoss(size) => format!(
                "At the end of each phase, the $name makes a {accuracy} attack vs. {defense} against each \\glossterm<enemy> within a {size} radius \\glossterm<emanation> of it that caused it to lose \\glossterm<hit points> during that phase.",
                accuracy = accuracy,
                size = size,
                defense = defense,
            ),
            Self::Creature(range) => format!(
                "{standard_attack_against} one creature within {range}.",
                standard_attack_against = standard_attack_against,
                range = range
            ),
            Self::Cone(area_size, area_targets) => format!(
                "{standard_attack_against} {targets} in a {size} cone.",
                standard_attack_against = standard_attack_against,
                targets = area_targets,
                size = area_size
            ),
            Self::Line(width, area_size, area_targets) => format!(
                "{standard_attack_against} {targets} in a {width} wide, {size} long line.",
                standard_attack_against = standard_attack_against,
                targets = area_targets,
                size = area_size,
                width = format!("{} ft.", width),
            ),
            Self::Radius(attack_range, area_size, area_targets) => format!(
                "{standard_attack_against} {targets} in a {size} radius{range}.",
                standard_attack_against = standard_attack_against,
                targets = area_targets,
                size = area_size,
                range = if let Some(r) = attack_range {
                    format!(" within {}", r)
                } else {
                    "".to_string()
                },
            ),
            Self::Strike => format!(
                "{standard_attack_against} vs. {defense}.",
                standard_attack_against = standard_attack_against,
                defense = defense,
            ),
        };

        if movement_after_attack == "" {
            return main_attack;
        } else {
            return format!("{} {}", main_attack, movement_after_attack);
        }
    }

    pub fn subjects(&self) -> &str {
        match self {
            Self::Anything(_) => "The target",
            Self::CausedDamage(_) => "Each target",
            Self::CausedHpLoss(_) => "Each target",
            Self::Creature(_) => "The target",
            Self::Cone(_, _) => "Each target",
            Self::Line(_, _, _) => "Each target",
            Self::Radius(_, _, _) => "Each target",
            // TODO: handle Sweeping
            Self::Strike => "The target",
        }
    }
}

#[derive(Clone)]
pub enum AttackRange {
    Reach,
    Short,
    Medium,
    Long,
    Distant,
    Extreme,
    Custom(i32),
}

impl AttackRange {
    pub fn minimum_rank(&self) -> i32 {
        match self {
            Self::Reach => -1,
            Self::Short => 0,
            Self::Medium => 1,
            Self::Long => 2,
            Self::Distant => 3,
            Self::Extreme => 4,
            // TODO: calculate rank based on number of feet
            Self::Custom(_) => 5,
        }
    }

    fn latex_tag(&self) -> String {
        match self {
            Self::Reach => "\\glossterm{reach}".to_string(),
            Self::Short => "\\shortrange".to_string(),
            Self::Medium => "\\medrange".to_string(),
            Self::Long => "\\longrange".to_string(),
            Self::Distant => "\\distrange".to_string(),
            Self::Extreme => "\\extrange".to_string(),
            Self::Custom(feet) => format!("{} ft.", feet),
        }
    }
}

impl fmt::Display for AttackRange {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.latex_tag())
    }
}

#[derive(Clone)]
pub enum AreaSize {
    Tiny,
    Small,
    Medium,
    Large,
    Huge,
    Gargantuan,
    Custom(i32),
}

impl AreaSize {
    fn latex_tag(&self) -> String {
        match self {
            Self::Tiny => "\\tinyarea".to_string(),
            Self::Small => "\\smallarea".to_string(),
            Self::Medium => "\\medarea".to_string(),
            Self::Large => "\\largearea".to_string(),
            Self::Huge => "\\hugearea".to_string(),
            Self::Gargantuan => "\\gargarea".to_string(),
            Self::Custom(feet) => format!("{}~ft.", feet),
        }
    }
}

impl fmt::Display for AreaSize {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.latex_tag())
    }
}

#[derive(Clone)]
pub enum AreaTargets {
    Allies,
    Creatures,
    Enemies,
    Everything,
}

impl AreaTargets {
    fn description(&self) -> &str {
        match self {
            Self::Allies => "allies",
            Self::Creatures => "creatures",
            Self::Enemies => "enemies",
            Self::Everything => "everything",
        }
    }

    fn rank_modifier(&self) -> i32 {
        match self {
            Self::Allies => 0,
            Self::Creatures => 0,
            Self::Enemies => 1,
            Self::Everything => 0,
        }
    }
}

impl fmt::Display for AreaTargets {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.description())
    }
}

#[derive(Clone)]
pub enum UsageTime {
    Standard,
    Minor,
}

impl UsageTime {
    pub fn latex_ability_header(&self) -> Option<&str> {
        match self {
            UsageTime::Standard => None,
            UsageTime::Minor => Some(r"\par \noindent Usage time: One \glossterm{minor action}."),
        }
    }
}

#[derive(Clone)]
pub enum AttackCooldown {
    Brief(Option<String>),
    ShortRest(Option<String>),
    LongRest(Option<String>),
}

impl AttackCooldown {
    pub fn description(&self, use_you: bool) -> String {
        let tag = match self {
            Self::Brief(tag) => tag,
            Self::ShortRest(tag) => tag,
            Self::LongRest(tag) => tag,
        };
        let it = if let Some(t) = tag {
            format!("it or any other \\abilitytag<{}> ability", t)
        } else {
            "it".to_string()
        };
        if use_you {
            let until = match self {
                Self::Brief(_) => format!("\\glossterm<briefly> cannot use {} again", it),
                Self::ShortRest(_) => format!(
                    "cannot use {} again until you take a \\glossterm<short rest>",
                    it
                ),
                Self::LongRest(_) => format!(
                    "cannot use {} again until you take a \\glossterm<long rest>",
                    it
                ),
            };
            return latex_formatting::latexify(format!(
                "After you use this ability, you {until}.",
                until = until,
            ));
        } else {
            let until = match self {
                Self::Brief(_) => format!("\\glossterm<briefly> cannot use {} again", it),
                Self::ShortRest(_) => format!(
                    "cannot use {} again until it takes a \\glossterm<short rest>",
                    it
                ),
                Self::LongRest(_) => format!(
                    "cannot use {} again until it takes a \\glossterm<long rest>",
                    it
                ),
            };
            return latex_formatting::latexify(format!(
                "After the $name uses this ability, it {until}.",
                until = until,
            ));
        }
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

    fn calc_power(&self, is_magical: bool) -> i32 {
        if is_magical {
            return self.calc_total_attribute(&Attribute::Willpower) / 2
                + self.calc_total_modifier(ModifierType::MagicalPower);
        } else {
            return self.calc_total_attribute(&Attribute::Strength) / 2
                + self.calc_total_modifier(ModifierType::MundanePower);
        }
    }
}

#[derive(Clone)]
pub struct AttackMovement {
    pub move_before_attack: bool,
    pub requires_straight_line: bool,
    pub speed: SpeedCategory,
}

#[derive(Clone, PartialEq)]
pub enum AbilityType {
    Instant,
    Duration,
    Sustain(String),
    Attune(String),
}

impl AbilityType {
    pub fn name(&self) -> String {
        match self {
            Self::Instant => "Instant".to_string(),
            Self::Duration => "Duration".to_string(),
            Self::Sustain(action) => format!("Sustain {}", action),
            Self::Attune(action) => format!("Attune {}", action),
        }
    }

    pub fn environment(&self) -> &str {
        match self {
            Self::Instant => "instantability",
            Self::Duration => "durationability",
            Self::Sustain(_) => "durationability",
            Self::Attune(_) => "attuneability",
        }
    }
}
