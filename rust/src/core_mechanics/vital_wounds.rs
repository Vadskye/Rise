use crate::core_mechanics::Defense;
use crate::creatures::{Creature, CreatureCategory, HasModifiers, Modifier, ModifierType};
use rand::Rng;

#[derive(Clone, Debug)]
pub enum VitalWound {
    Negative(i32),
    Zero,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    NoEffect,
}

impl VitalWound {
    pub fn vital_roll(modifier: i32) -> Self {
        let mut rng = rand::thread_rng();
        let roll = rng.gen_range(1..11) - modifier;
        if roll < 0 {
            Self::Negative(roll)
        } else if roll > 9 {
            return Self::NoEffect;
        } else {
            match roll {
                1 => Self::One,
                2 => Self::Two,
                3 => Self::Three,
                4 => Self::Four,
                5 => Self::Five,
                6 => Self::Six,
                7 => Self::Seven,
                8 => Self::Eight,
                9 => Self::Nine,
                _ => panic!("Nonsense"),
            }
        }
    }

    pub fn modifiers(&self) -> Option<Vec<Modifier>> {
        // TODO: add modifiers for halving values
        match self {
            Self::Three => Some(vec![Modifier::Accuracy(-2)]),
            Self::Four => Some(vec![
                Modifier::Defense(Defense::Armor, -2),
                Modifier::Defense(Defense::Fortitude, -2),
                Modifier::Defense(Defense::Reflex, -2),
                Modifier::Defense(Defense::Mental, -2),
            ]),
            Self::Five => Some(vec![Modifier::VitalRoll(-1)]),
            Self::Eight => Some(vec![Modifier::Accuracy(-1)]),
            Self::Nine => Some(vec![
                Modifier::Defense(Defense::Armor, -1),
                Modifier::Defense(Defense::Fortitude, -1),
                Modifier::Defense(Defense::Reflex, -1),
                Modifier::Defense(Defense::Mental, -1),
            ]),
            _ => None,
        }
    }

    pub fn causes_unconsciousness(&self) -> bool {
        match self {
            Self::Negative(_) => true,
            Self::Zero => true,
            Self::One => true,
            _ => false,
        }
    }
}

pub trait HasVitalWounds {
    fn add_vital_wound(&mut self, vital_wound: VitalWound);
    fn calc_vital_roll_modifier(&self) -> i32;
    fn generate_vital_wound(&self) -> VitalWound;
    fn is_vitally_unconscious(&self) -> bool;
}

impl HasVitalWounds for Creature
where
    Creature: HasModifiers,
{
    fn add_vital_wound(&mut self, vital_wound: VitalWound) {
        if let Some(modifiers) = vital_wound.modifiers() {
            for m in modifiers {
                self.add_modifier(m, None, None);
            }
        }
        self.vital_wounds.push(vital_wound);
    }

    fn calc_vital_roll_modifier(&self) -> i32 {
        match self.category {
            CreatureCategory::Character => {
                self.calc_total_modifier(ModifierType::VitalRoll) - self.vital_wounds.len() as i32
            }
            CreatureCategory::Monster(_) => 0,
        }
    }

    fn generate_vital_wound(&self) -> VitalWound {
        match self.category {
            // TODO: represent character vital wounds more accurately
            // CreatureCategory::Character => VitalWound::vital_roll(self.calc_vital_roll_modifier()),
            CreatureCategory::Character => {
                if self.calc_vital_roll_modifier() >= 0 {
                    VitalWound::NoEffect
                } else {
                    VitalWound::Zero
                }
            }
            CreatureCategory::Monster(_) => VitalWound::Zero,
        }
    }

    fn is_vitally_unconscious(&self) -> bool {
        for vital_wound in &self.vital_wounds {
            if vital_wound.causes_unconsciousness() {
                return true;
            }
        }
        false
    }
}
