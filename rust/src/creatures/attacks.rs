use crate::core_mechanics::{DamageDice, Defense};
use crate::creatures::attack_effects::{AttackEffect, DamageEffect};
use crate::creatures::{attack_effects, HasCreatureMechanics};
use crate::equipment::Weapon;
use crate::latex_formatting;
use std::fmt;

#[derive(Clone)]
pub struct Attack {
    pub accuracy: i32,
    pub cooldown: Option<AttackCooldown>,
    pub crit: Option<AttackEffect>,
    pub defense: Defense,
    pub glance: Option<AttackEffect>,
    pub hit: AttackEffect,
    pub is_magical: bool,
    pub is_strike: bool,
    pub name: String,
    pub replaces_weapon: Option<Weapon>,
    pub targeting: AttackTargeting,
    pub usage_time: UsageTime,
}

pub trait HasAttacks {
    fn add_special_attack(&mut self, attack: Attack);
    fn calc_all_attacks(&self) -> Vec<Attack>;
    fn calc_accuracy(&self) -> i32;
    fn calc_damage_increments(&self, is_strike: bool) -> i32;
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

    pub fn from_weapon(weapon: Weapon) -> Attack {
        return Attack {
            accuracy: weapon.accuracy(),
            cooldown: None,
            crit: None,
            defense: Defense::Armor,
            glance: None,
            hit: AttackEffect::from_weapon(weapon),
            name: weapon.name().to_string(),
            is_magical: false,
            is_strike: true,
            // By default, `from_weapon` replaces the base weapon
            replaces_weapon: Some(weapon),
            targeting: AttackTargeting::Strike,
            usage_time: UsageTime::Standard,
        };
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

    pub fn calc_damage_dice(&self, creature: &dyn HasCreatureMechanics) -> Option<DamageDice> {
        if let Some(damage_effect) = self.damage_effect() {
            return Some(
                damage_effect
                    .damage_dice
                    .add(creature.calc_damage_increments(self.is_strike)),
            );
        }
        return None;
    }

    pub fn calc_damage_modifier(&self, creature: &dyn HasCreatureMechanics) -> Option<i32> {
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
        return weapons.iter().map(|w| Self::from_weapon(**w)).collect();
    }

    pub fn shorthand_description<T: HasCreatureMechanics>(&self, creature: &T) -> String {
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
    pub fn latex_ability_block<T: HasCreatureMechanics>(&self, creature: &T) -> String {
        let ability_components: Vec<Option<String>> =
            vec![Some(self.latex_tags()), Some(self.latex_effect(creature))];
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
            ability_environment = "instantability", // TODO
            ability_components = ability_components.join("\n\\rankline "),
            ability_type = "Instant", // TODO
            name = latex_formatting::uppercase_first_letter(&self.name),
        );
    }

    // This should always return a string; even if there are no tags, we want a rankline after the
    // top section.
    fn latex_tags(&self) -> String {
        // TODO: take into account tags and usage time
        return self
            .usage_time
            .latex_ability_header()
            .unwrap_or("")
            .to_string();
    }

    fn latex_effect<T: HasCreatureMechanics>(&self, creature: &T) -> String {
        return format!(
            "
                The $name makes a {accuracy} {targeting}.
                {cooldown}
                \\hit {hit}
                {glance}
                {critical}
            ",
            accuracy = latex_formatting::modifier(self.accuracy + creature.calc_accuracy()),
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
            glance = if let Some(ref g) = self.glance {
                format!(
                    "\\glance {}",
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
            targeting = self.targeting.description(&self.defense),
        );
    }
}

#[derive(Clone)]
pub enum AttackTargeting {
    Anything(AttackRange),
    Creature(AttackRange),
    Cone(AreaSize, AreaTargets),
    Line(i32, AreaSize, AreaTargets),
    Radius(Option<AttackRange>, AreaSize, AreaTargets),
    Strike,
}

impl AttackTargeting {
    // the minimum rank required to achieve the given targeting requirements
    pub fn minimum_rank(&self) -> i32 {
        match self {
            Self::Anything(range) => range.minimum_rank(),
            Self::Creature(range) => range.minimum_rank(),
            Self::Cone(size, targets) => {
                let minimum_rank = match size {
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

    pub fn description(&self, defense: &Defense) -> String {
        let defense = latex_formatting::uppercase_first_letter(defense.to_string().as_str());
        match self {
            Self::Anything(range) => format!(
                "attack vs. {defense} against anything within {range}",
                defense = defense,
                range = range
            ),
            Self::Creature(range) => format!(
                "attack vs. {defense} against one creature within {range}",
                defense = defense,
                range = range
            ),
            Self::Cone(area_size, area_targets) => format!(
                "attack vs. {defense} against {targets} in a {size} cone",
                defense = defense,
                targets = area_targets,
                size = area_size
            ),
            Self::Line(width, area_size, area_targets) => format!(
                "attack vs. {defense} against {targets} in a {width} wide, {size}long line",
                defense = defense,
                targets = area_targets,
                size = area_size,
                width = format!("{} ft.", width),
            ),
            Self::Radius(attack_range, area_size, area_targets) => format!(
                "attack vs. {defense} against {targets} in a {size} radius{range}",
                defense = defense,
                targets = area_targets,
                size = area_size,
                range = if let Some(r) = attack_range {
                    format!(" within {}", r)
                } else {
                    "".to_string()
                },
            ),
            Self::Strike => format!("strike vs. {defense}", defense = defense),
        }
    }

    pub fn subjects(&self) -> &str {
        match self {
            Self::Anything(_) => "The subject",
            Self::Creature(_) => "The subject",
            Self::Cone(_, _) => "Each subject",
            Self::Line(_, _, _) => "Each subject",
            Self::Radius(_, _, _) => "Each subject",
            // TODO: handle Sweeping
            Self::Strike => "The subject",
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
                Self::Brief(_) => format!("\\glossterm<briefly> cannot use it {} again", it),
                Self::ShortRest(_) => format!(
                    "cannot use it {} again until you take a \\glossterm<short rest>",
                    it
                ),
                Self::LongRest(_) => format!(
                    "cannot use it {} again until you take a \\glossterm<long rest>",
                    it
                ),
            };
            return latex_formatting::latexify(format!(
                "After you use this ability, you {until}.",
                until = until,
            ));
        } else {
            let until = match self {
                Self::Brief(_) => format!("\\glossterm<briefly> cannot use it {} again", it),
                Self::ShortRest(_) => format!(
                    "cannot use it {} again until it takes a \\glossterm<short rest>",
                    it
                ),
                Self::LongRest(_) => format!(
                    "cannot use it {} again until it takes a \\glossterm<long rest>",
                    it
                ),
            };
            return latex_formatting::latexify(format!(
                "After the creature uses this ability, {until}.",
                until = until,
            ));
        }
    }
}
