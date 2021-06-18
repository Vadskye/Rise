use crate::core_mechanics::{attack_effects, damage_dice, defenses, HasCreatureMechanics};
use crate::equipment::weapons;
use crate::latex_formatting;
use std::fmt;

#[derive(Clone)]
pub struct Attack {
    pub accuracy: i8,
    pub crit: Option<attack_effects::AttackEffect>,
    pub defense: defenses::Defense,
    pub glance: Option<attack_effects::AttackEffect>,
    pub hit: attack_effects::AttackEffect,
    pub is_magical: bool,
    pub name: String,
    pub targeting: AttackTargeting,
    pub usage_time: UsageTime,
    pub weapon: Option<weapons::Weapon>,
}

pub trait HasAttacks {
    fn add_special_attack(&mut self, attack: Attack);
    fn calc_all_attacks(&self) -> Vec<Attack>;
    fn calc_accuracy(&self) -> i8;
    fn calc_damage_increments(&self, is_strike: bool) -> i8;
    fn calc_damage_per_round_multiplier(&self) -> f64;
    fn calc_power(&self, is_magical: bool) -> i8;
}

impl Attack {
    pub fn from_weapon(weapon: weapons::Weapon) -> Attack {
        return Attack {
            accuracy: weapon.accuracy(),
            crit: None,
            defense: defenses::Defense::Armor,
            glance: None,
            hit: attack_effects::AttackEffect::from_weapon(weapon),
            name: weapon.name().to_string(),
            is_magical: false,
            targeting: AttackTargeting::Strike,
            usage_time: UsageTime::Standard,
            weapon: Some(weapon),
        };
    }

    pub fn damage_effect_mut(&mut self) -> Option<&mut attack_effects::DamageEffect> {
        if let attack_effects::AttackEffect::Damage(ref mut e) = self.hit {
            return Some(e);
        }
        return None;
    }

    pub fn damage_effect(&self) -> Option<&attack_effects::DamageEffect> {
        if let attack_effects::AttackEffect::Damage(ref e) = self.hit {
            return Some(e);
        }
        return None;
    }

    pub fn calc_damage_dice<T: HasCreatureMechanics>(
        &self,
        creature: &T,
    ) -> Option<damage_dice::DamageDice> {
        if let Some(damage_effect) = self.damage_effect() {
            return Some(
                damage_effect
                    .damage_dice
                    .add(creature.calc_damage_increments(self.weapon.is_some())),
            );
        }
        return None;
    }

    pub fn calc_damage_modifier<T: HasCreatureMechanics>(&self, creature: &T) -> Option<i8> {
        if let Some(damage_effect) = self.damage_effect() {
            return Some(
                damage_effect.damage_modifier
                    + (damage_effect.power_multiplier * creature.calc_power(self.is_magical) as f64)
                        as i8,
            );
        }
        return None;
    }

    pub fn calc_strikes(weapons: Vec<&weapons::Weapon>) -> Vec<Attack> {
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
                .description(creature, self.is_magical, self.weapon.is_some())
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
                \\begin<{ability_environment}><{name}>[{ability_type}]
                    {ability_components}
                \\end<{ability_environment}>
            ",
            ability_environment = "freeability", // TODO
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
                \\hit {hit}
                {glance}
            ",
            accuracy = latex_formatting::modifier(self.accuracy + creature.calc_accuracy()),
            hit = self
                .hit
                .description(creature, self.is_magical, self.weapon.is_some())
                .trim()
                .to_string(),
            glance = if let Some(ref g) = self.glance {
                format!(
                    "\\glance {}",
                    g.description(creature, self.is_magical, self.weapon.is_some())
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
    Radius(Option<AttackRange>, AreaSize, AreaTargets),
    Strike,
}

impl AttackTargeting {
    // the minimum rank required to achieve the given targeting requirements
    pub fn minimum_rank(&self) -> i8 {
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

    pub fn description(&self, defense: &defenses::Defense) -> String {
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
    pub fn minimum_rank(&self) -> i8 {
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
            Self::Gargantuan => "\\extarea".to_string(),
            Self::Custom(feet) => format!("{} ft.", feet),
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

    fn rank_modifier(&self) -> i8 {
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
