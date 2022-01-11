use crate::core_mechanics::abilities::AbilityMovement;
use crate::core_mechanics::Defense;
use crate::latex_formatting;
use std::fmt;

#[derive(Clone)]
pub enum Targeting {
    Anything(Range),
    CausedDamage(AreaSize),
    CausedHpLoss(AreaSize),
    Cone(AreaSize, AreaTargets),
    Creature(Range),
    Line(i32, AreaSize, AreaTargets),
    Radius(Option<Range>, AreaSize, AreaTargets),
    Strike,
}

impl Targeting {
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
        movement: &Option<AbilityMovement>,
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
                "{the_creature} makes a {accuracy} \\glossterm{{strike}} vs. {defense}.",
                the_creature = the_creature,
                accuracy = accuracy,
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
pub enum Range {
    Reach,
    Short,
    Medium,
    Long,
    Distant,
    Extreme,
    Custom(i32),
}

impl Range {
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

impl fmt::Display for Range {
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
