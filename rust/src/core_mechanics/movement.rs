use crate::core_mechanics::{HasSize, Size};
use crate::creatures::{Creature, HasModifiers, ModifierType};
use crate::equipment::HasArmor;
use std::cmp::max;

#[derive(Clone, Debug)]
pub struct MovementSpeed {
    pub mode: MovementMode,
    pub speed: SpeedCategory,
}

#[derive(Clone, Debug, PartialEq)]
pub enum MovementMode {
    Burrow,
    Climb,
    Fly(Option<i32>),
    Glide,
    Land,
    Swim,
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
    pub fn new(mode: MovementMode, speed: SpeedCategory) -> Self {
        Self { mode, speed }
    }

    pub fn slower(&self) -> Self {
        Self {
            speed: self.speed.slower(),
            mode: self.mode.clone(),
        }
    }

    // We have to take speed in feet as an argument because it depends on Modifiers on a
    // Creature.
    pub fn description(&self, speed_in_feet: i32) -> String {
        match self.mode {
            MovementMode::Fly(maybe_height_limit) => format!(
                "{}~{}~ft.{}",
                self.mode.name(),
                speed_in_feet,
                if let Some(height_limit) = maybe_height_limit {
                    format!(" ({} ft. up)", height_limit)
                } else {
                    "".to_string()
                },
            ),
            _ => format!("{}~{}~ft.", self.mode.name(), speed_in_feet),
        }
    }
}

fn calc_speed_in_feet(speed_category: &SpeedCategory, size: &Size) -> i32 {
    let speed = speed_category.speed_multiplier() * (size.base_speed() as f64);
    // Floor to 10-foot increments
    max(
        5,
        ((speed / 10.0).floor() * 10.0) as i32 + speed_category.speed_modifier(),
    )
}

// It's not really meaningful to have a "calc all speeds in feet" because that misses important
// context about things like height limits?
pub trait HasMovement {
    // This includes all movement modes, but not skills.
    fn calc_movement_mode_descriptions(&self) -> Vec<String>;
    fn calc_speed_in_feet(&self, movement_mode: &MovementMode) -> Option<i32>;
    fn get_movement_speed(&self, movement_mode: &MovementMode) -> Option<&MovementSpeed>;
}

impl HasMovement for Creature
where
    Creature: HasModifiers + HasArmor + HasSize,
{
    fn calc_movement_mode_descriptions(&self) -> Vec<String> {
        self.movement_speeds
            .iter()
            // We can safely unwrap because we're only calling calc_speed_in_feet for modes that
            // we know exist. It returns an Option because you could call it for a movement mode
            // that the creature doesn't have.
            .map(|m| m.description(self.calc_speed_in_feet(&m.mode).unwrap()))
            .collect::<Vec<String>>()
    }

    fn calc_speed_in_feet(&self, movement_mode: &MovementMode) -> Option<i32> {
        let maybe_movement_speed = self.get_movement_speed(movement_mode);
        if maybe_movement_speed.is_none() {
            return None;
        }
        let movement_speed = maybe_movement_speed.unwrap();
        let base_speed_in_feet = calc_speed_in_feet(&movement_speed.speed, &self.size);

        Some(
            base_speed_in_feet
                + self.calc_total_modifier(ModifierType::BaseSpeed)
                + self
                    .calc_total_modifier(ModifierType::MovementSpeed(movement_speed.mode.clone())),
        )
    }

    // If movement_speeds was a hashmap intead of a vec, this wouldn't need to be a function.
    fn get_movement_speed(&self, movement_mode: &MovementMode) -> Option<&MovementSpeed> {
        for speed in self.movement_speeds.iter() {
            if speed.mode == *movement_mode {
                return Some(speed);
            }
        }

        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    mod calc_speed_in_feet {
        use super::*;

        #[test]
        fn calculate_large_speeds() {
            let size = &Size::Large;
            assert_eq!(20, calc_speed_in_feet(&SpeedCategory::Half, size));
            assert_eq!(30, calc_speed_in_feet(&SpeedCategory::Slow, size));
            assert_eq!(40, calc_speed_in_feet(&SpeedCategory::Normal, size));
            assert_eq!(60, calc_speed_in_feet(&SpeedCategory::Fast, size));
            assert_eq!(80, calc_speed_in_feet(&SpeedCategory::Double, size));
        }

        #[test]
        fn calculate_medium_speeds() {
            let size = &Size::Medium;
            assert_eq!(10, calc_speed_in_feet(&SpeedCategory::Half, size));
            assert_eq!(20, calc_speed_in_feet(&SpeedCategory::Slow, size));
            assert_eq!(30, calc_speed_in_feet(&SpeedCategory::Normal, size));
            assert_eq!(40, calc_speed_in_feet(&SpeedCategory::Fast, size));
            assert_eq!(60, calc_speed_in_feet(&SpeedCategory::Double, size));
        }

        #[test]
        fn calculate_small_speeds() {
            let size = &Size::Small;
            assert_eq!(10, calc_speed_in_feet(&SpeedCategory::Half, size));
            assert_eq!(10, calc_speed_in_feet(&SpeedCategory::Slow, size));
            assert_eq!(20, calc_speed_in_feet(&SpeedCategory::Normal, size));
            assert_eq!(30, calc_speed_in_feet(&SpeedCategory::Fast, size));
            assert_eq!(40, calc_speed_in_feet(&SpeedCategory::Double, size));
        }

        #[test]
        fn calculate_diminuitive_speeds() {
            let size = &Size::Diminuitive;
            assert_eq!(5, calc_speed_in_feet(&SpeedCategory::Half, size));
            assert_eq!(5, calc_speed_in_feet(&SpeedCategory::Slow, size));
            assert_eq!(10, calc_speed_in_feet(&SpeedCategory::Normal, size));
            assert_eq!(10, calc_speed_in_feet(&SpeedCategory::Fast, size));
            assert_eq!(20, calc_speed_in_feet(&SpeedCategory::Double, size));
        }
    }

    mod has_movement {
        use super::*;
        use crate::creatures::Modifier;

        fn sample_creature() -> Creature {
            let mut creature = Creature::new_character(1);
            // Give the sample character multiple move speeds
            creature.movement_speeds = vec![
                MovementSpeed {
                    mode: MovementMode::Climb,
                    speed: SpeedCategory::Slow,
                },
                MovementSpeed {
                    mode: MovementMode::Fly(Some(30)),
                    speed: SpeedCategory::Fast,
                },
                MovementSpeed {
                    mode: MovementMode::Land,
                    speed: SpeedCategory::Normal,
                },
            ];

            creature
        }

        #[test]
        fn can_calc_default_land_speed() {
            assert_eq!(
                sample_creature().calc_speed_in_feet(&MovementMode::Land),
                Some(30)
            );
        }

        #[test]
        fn can_calc_modified_base_speed() {
            let mut creature = sample_creature();
            creature.add_modifier(Modifier::BaseSpeed(10), None, None);
            assert_eq!(creature.calc_speed_in_feet(&MovementMode::Land), Some(40));
        }

        #[test]
        fn can_calc_modified_local_speed() {
            let mut creature = sample_creature();
            creature.add_modifier(Modifier::MovementSpeed(MovementMode::Climb, 30), None, None);
            assert_eq!(
                creature.calc_speed_in_feet(&MovementMode::Climb),
                // 20 base from Slow, then 30 from climb-specific
                Some(50)
            );
        }

        #[test]
        fn can_calc_double_modified_local_speed() {
            let mut creature = sample_creature();
            creature.add_modifier(Modifier::BaseSpeed(20), None, None);
            creature.add_modifier(Modifier::MovementSpeed(MovementMode::Land, 40), None, None);
            assert_eq!(
                creature.calc_speed_in_feet(&MovementMode::Land),
                // 30 base from Normal, then 20 from Base Speed and 40 from climb-specific
                Some(90)
            );
        }

        #[test]
        fn can_ignore_irrelevant_speed_modifier() {
            let mut creature = sample_creature();
            creature.add_modifier(
                Modifier::MovementSpeed(MovementMode::Climb, 100),
                None,
                None,
            );
            assert_eq!(creature.calc_speed_in_feet(&MovementMode::Land), Some(30));
        }

        #[test]
        fn can_calc_missing_speed() {
            assert_eq!(
                sample_creature().calc_speed_in_feet(&MovementMode::Burrow),
                None,
            );
        }
    }
}
