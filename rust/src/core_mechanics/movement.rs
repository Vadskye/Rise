use crate::core_mechanics::Size;
use std::cmp::max;

#[derive(Clone, Debug)]
pub struct MovementSpeed {
    pub mode: MovementMode,
    pub speed: SpeedCategory,
}

#[derive(Clone, Debug)]
pub enum MovementMode {
    Burrow,
    Climb,
    // TODO: all fly speeds should have a height limit
    Fly(FlightManeuverability),
    Glide,
    Land,
    Swim,
}

#[derive(Clone, Debug)]
pub enum FlightManeuverability {
    Poor,
    Normal,
    Perfect,
}

#[derive(Clone, Debug)]
pub enum SpeedCategory {
    Half,
    Slow,
    Normal,
    Fast,
    Double,
    Special(i32),
}

impl FlightManeuverability {
    pub fn name(&self) -> &str {
        match self {
            Self::Poor => "poor",
            Self::Normal => "normal",
            Self::Perfect => "perfect",
        }
    }

    pub fn speed_suffix(&self) -> String {
        match self {
            Self::Poor => format!("~({})", self.name()),
            Self::Normal => "".to_string(),
            Self::Perfect => format!("~({})", self.name()),
        }
    }
}

impl SpeedCategory {
    pub fn slower(&self) -> Self {
        match self {
            Self::Half => panic!("Cannot find a slower movement speed than half speed"),
            Self::Slow => Self::Half,
            Self::Normal => Self::Slow,
            Self::Fast => Self::Normal,
            Self::Double => Self::Double,
            Self::Special(speed) => Self::Special(((*speed as f64) * 0.75) as i32),
        }
    }

    pub fn its_speed(&self) -> &str {
        match self {
            SpeedCategory::Half => "half its speed",
            SpeedCategory::Slow => panic!("Slow movement has no clean textual representation"),
            SpeedCategory::Normal => "its speed",
            SpeedCategory::Fast => panic!("Fast movement has no clean textual representation"),
            SpeedCategory::Double => "twice its speed",
            SpeedCategory::Special(_) => {
                panic!("Special movement has no clean textual representation")
            }
        }
    }

    pub fn speed_multiplier(&self) -> f64 {
        match self {
            SpeedCategory::Half => 0.5,
            SpeedCategory::Slow => 0.75,
            SpeedCategory::Normal => 1.0,
            SpeedCategory::Fast => 1.5,
            SpeedCategory::Double => 2.0,
            SpeedCategory::Special(_) => 1.0,
        }
    }

    pub fn speed_modifier(&self) -> i32 {
        match self {
            SpeedCategory::Special(m) => *m,
            _ => 0,
        }
    }
}

impl MovementMode {
    pub fn name(&self) -> &str {
        match self {
            Self::Burrow => "Burrow",
            Self::Climb => "Climb",
            Self::Fly(_) => "Fly",
            Self::Glide => "Glide",
            Self::Land => "Land",
            Self::Swim => "Swim",
        }
    }
}

impl MovementSpeed {
    pub fn calc_speed(&self, size: &Size) -> i32 {
        // TODO: figure out syntax to make this less repetitive
        match self.mode {
            MovementMode::Burrow => calc_speed(&self.speed, size),
            MovementMode::Climb => calc_speed(&self.speed, size),
            MovementMode::Fly(_) => calc_speed(&self.speed, size),
            MovementMode::Glide => calc_speed(&self.speed, size),
            MovementMode::Land => calc_speed(&self.speed, size),
            MovementMode::Swim => calc_speed(&self.speed, size),
        }
    }

    pub fn new(mode: MovementMode, speed: SpeedCategory) -> Self {
        return Self { mode, speed };
    }

    pub fn slower(&self) -> Self {
        return Self {
            speed: self.speed.slower(),
            mode: self.mode.clone(),
        };
    }

    pub fn description(&self, size: &Size) -> String {
        let speed = self.calc_speed(size);
        match self.mode {
            MovementMode::Fly(ref maneuverability) => format!(
                "{}~{}~ft.{}",
                self.mode.name(),
                self.calc_speed(size),
                maneuverability.speed_suffix()
            ),
            _ => format!("{}~{}~ft.", self.mode.name(), speed),
        }
    }
}

fn calc_speed(speed_category: &SpeedCategory, size: &Size) -> i32 {
    let speed = speed_category.speed_multiplier() * (size.base_speed() as f64);
    // Floor to 10-foot increments
    return max(
        5,
        ((speed / 10.0).floor() * 10.0) as i32 + speed_category.speed_modifier(),
    );
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn calculate_large_speeds() {
        let size = &Size::Large;
        let mode = || MovementMode::Swim;
        assert_eq!(
            20,
            MovementSpeed::new(mode(), SpeedCategory::Half).calc_speed(size)
        );
        assert_eq!(
            30,
            MovementSpeed::new(mode(), SpeedCategory::Slow).calc_speed(size)
        );
        assert_eq!(
            40,
            MovementSpeed::new(mode(), SpeedCategory::Normal).calc_speed(size)
        );
        assert_eq!(
            60,
            MovementSpeed::new(mode(), SpeedCategory::Fast).calc_speed(size)
        );
        assert_eq!(
            80,
            MovementSpeed::new(mode(), SpeedCategory::Double).calc_speed(size)
        );
    }

    #[test]
    fn calculate_medium_speeds() {
        let size = &Size::Medium;
        let mode = || MovementMode::Land;
        assert_eq!(
            10,
            MovementSpeed::new(mode(), SpeedCategory::Half).calc_speed(size)
        );
        assert_eq!(
            20,
            MovementSpeed::new(mode(), SpeedCategory::Slow).calc_speed(size)
        );
        assert_eq!(
            30,
            MovementSpeed::new(mode(), SpeedCategory::Normal).calc_speed(size)
        );
        assert_eq!(
            40,
            MovementSpeed::new(mode(), SpeedCategory::Fast).calc_speed(size)
        );
        assert_eq!(
            60,
            MovementSpeed::new(mode(), SpeedCategory::Double).calc_speed(size)
        );
    }

    #[test]
    fn calculate_small_speeds() {
        let size = &Size::Small;
        let mode = || MovementMode::Land;
        assert_eq!(
            10,
            MovementSpeed::new(mode(), SpeedCategory::Half).calc_speed(size)
        );
        assert_eq!(
            10,
            MovementSpeed::new(mode(), SpeedCategory::Slow).calc_speed(size)
        );
        assert_eq!(
            20,
            MovementSpeed::new(mode(), SpeedCategory::Normal).calc_speed(size)
        );
        assert_eq!(
            30,
            MovementSpeed::new(mode(), SpeedCategory::Fast).calc_speed(size)
        );
        assert_eq!(
            40,
            MovementSpeed::new(mode(), SpeedCategory::Double).calc_speed(size)
        );
    }

    #[test]
    fn calculate_diminuitive_speeds() {
        let size = &Size::Diminuitive;
        let mode = || MovementMode::Climb;
        assert_eq!(
            5,
            MovementSpeed::new(mode(), SpeedCategory::Half).calc_speed(size)
        );
        assert_eq!(
            5,
            MovementSpeed::new(mode(), SpeedCategory::Slow).calc_speed(size)
        );
        assert_eq!(
            10,
            MovementSpeed::new(mode(), SpeedCategory::Normal).calc_speed(size)
        );
        assert_eq!(
            10,
            MovementSpeed::new(mode(), SpeedCategory::Fast).calc_speed(size)
        );
        assert_eq!(
            20,
            MovementSpeed::new(mode(), SpeedCategory::Double).calc_speed(size)
        );
    }
}
