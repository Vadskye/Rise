#[derive(Clone)]
pub struct DamageDice {
    count: i8,
    increments: i8,
    size: i8,
}

// Commonly used damage dice for weapon and spell definitions
pub static D6: i8 = 4;
pub static D8: i8 = 5;
pub static D10: i8 = 6;

impl DamageDice {
    pub fn new(increments: i8) -> DamageDice {
        // 4d10+ has different scaling
        if increments >= 13 {
            return DamageDice {
                count: increments - 9,
                increments,
                size: 10,
            };
        }

        let mut increments = increments;
        let mut count: i8 = 1;
        while increments > 6 {
            increments -= 3;
            count *= 2;
        }
        let size = match increments {
            0 => 1,
            1 => 2,
            2 => 3,
            3 => 4,
            4 => 6,
            5 => 8,
            6 => 10,
            _ => panic!("Invalid dice increments {}", increments),
        };
        return DamageDice { count, increments, size };
    }

    pub fn add(&self, increments: i8) -> DamageDice {
        Self::new(self.increments + increments)
    }

    pub fn to_string(&self) -> String {
        if self.size == 1 {
            return "1".to_string();
        } else {
            return format!("{}d{}", self.count, self.size);
        }
    }

    pub fn average_damage(&self) -> f64 {
        return ((self.count * (self.size + 1)) as f64) / 2.0
    }
}
