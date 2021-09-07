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
        return 5;
    }
    pub fn d10() -> i32 {
        return 6;
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
        return DamageDice {
            count,
            increments,
            size,
        };
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
        return ((self.count * (self.size + 1)) as f64) / 2.0;
    }

    pub fn aoe_damage(rank: i32) -> Self {
        return Self::new(Self::d8() + (rank - 1));
    }

    pub fn single_target_damage(rank: i32) -> Self {
        return Self::new(Self::d10() + (rank - 1));
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn standard_dice_values() {
        let d6 = DamageDice::new(DamageDice::d6());
        assert_eq!("1d6", d6.to_string());
        let d8 = DamageDice::new(DamageDice::d8());
        assert_eq!("1d8", d8.to_string());
        let d10 = DamageDice::new(DamageDice::d10());
        assert_eq!("1d10", d10.to_string());
    }

    #[test]
    fn increasing_size() {
        let d6 = DamageDice::new(DamageDice::d6());
        assert_eq!("1d8", d6.add(1).to_string());
        assert_eq!("1d10", d6.add(2).to_string());
        assert_eq!("2d6", d6.add(3).to_string());
        assert_eq!("2d8", d6.add(4).to_string());
    }

    #[test]
    fn decreasing_size() {
        let twod8 = DamageDice::new(DamageDice::d6() + 4);
        assert_eq!("2d8", twod8.to_string());
        assert_eq!("2d6", twod8.add(-1).to_string());
        assert_eq!("1d10", twod8.add(-2).to_string());
        assert_eq!("1d6", twod8.add(-4).to_string());
        assert_eq!("1d3", twod8.add(-6).to_string());
        assert_eq!("1d2", twod8.add(-7).to_string());
        assert_eq!("1", twod8.add(-8).to_string());
    }
}
