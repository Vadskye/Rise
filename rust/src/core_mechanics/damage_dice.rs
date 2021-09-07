#[derive(Clone)]
pub struct DamageDice {
    count: i32,
    increments: i32,
    size: i32,
}

impl DamageDice {

    // Commonly used damage dice for weapon and spell definitions
    pub fn d6() -> i32 {
        return 4;
    }
    pub fn d8() -> i32 {
        return 4;
    }
    pub fn d10() -> i32 {
        return 4;
    }

    pub fn new(increments: i32) -> DamageDice {
        // 5d10+ has different scaling
        if increments >= 13 {
            return DamageDice {
                count: increments - 8,
                increments,
                size: 10,
            };
        }

        let mut increments_mut = increments;
        let mut count: i32 = 1;
        while increments_mut > 6 {
            increments_mut -= 3;
            count *= 2;
        }
        let size = match increments_mut {
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

    pub fn add(&self, increments: i32) -> DamageDice {
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

    pub fn aoe_damage(rank: i32) -> Self {
        return Self::new(Self::d8() + (rank - 1));
    }

    pub fn single_target_damage(rank: i32) -> Self {
        return Self::new(Self::d10() + (rank - 1));
    }
}
