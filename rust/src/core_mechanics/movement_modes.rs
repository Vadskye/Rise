use crate::core_mechanics::sizes::Size;

pub enum MovementMode {
    Climb(SpeedCategory),
    Fly(SpeedCategory, FlightManeuverability),
    Glide(SpeedCategory),
    Land(SpeedCategory),
    Swim(SpeedCategory),
}

pub enum FlightManeuverability {
    Poor,
    Normal,
    Perfect,
}

pub enum SpeedCategory {
    Slow,
    Normal,
    Fast,
    VeryFast,
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
    pub fn speed_multiplier(&self) -> f64 {
        match self {
            SpeedCategory::Slow => 0.5,
            SpeedCategory::Normal => 1.0,
            SpeedCategory::Fast => 1.5,
            SpeedCategory::VeryFast => 2.0,
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
    pub fn calc_speed(&self, size: &Size) -> i32 {
        // TODO: figure out syntax to make this less repetitive
        match self {
            MovementMode::Climb(speed) => calc_speed(speed, size),
            MovementMode::Fly(speed, _) => calc_speed(speed, size),
            MovementMode::Glide(speed) => calc_speed(speed, size),
            MovementMode::Land(speed) => calc_speed(speed, size),
            MovementMode::Swim(speed) => calc_speed(speed, size),
        }
    }

    pub fn description(&self, size: &Size) -> String {
        let speed = self.calc_speed(size);
        match self {
            Self::Fly(_, maneuverability) => format!(
                "{}~{}~ft.{}",
                self.name(),
                self.calc_speed(size),
                maneuverability.speed_suffix()
            ),
            _ => format!("{}~{}~ft.", self.name(), speed),
        }
    }

    pub fn name(&self) -> &str {
        match self {
            MovementMode::Climb(_) => "Climb",
            MovementMode::Fly(_, _) => "Fly",
            MovementMode::Glide(_) => "Glide",
            MovementMode::Land(_) => "Land",
            MovementMode::Swim(_) => "Swim",
        }
    }
}

fn calc_speed(speed_category: &SpeedCategory, size: &Size) -> i32 {
    let speed = speed_category.speed_multiplier() * (size.base_speed() as f64);
    return ((speed * 5.0).floor() / 5.0) as i32 + speed_category.speed_modifier();
}
