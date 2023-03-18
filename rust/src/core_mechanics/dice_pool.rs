use std::collections::HashMap;

#[derive(Clone, Debug)]
pub struct DicePool {
    // Keep sorted, smallest to largest
    dice: Vec<Die>,
    maximized: bool,
}

#[derive(Clone, Debug)]
pub struct Die {
    size: i32,
}

impl Die {
    pub fn new(size: i32) -> Self {
        return Self { size };
    }

    pub fn add_increment(&self) -> Vec<Die> {
        if (self.size < 4) {
            return vec![Die::new(self.size + 1)];
        } else if (self.size < 10) {
            return vec![Die::new(self.size + 2)];
        } else {
            return vec![Die::new(6), Die::new(6)];
        }
    }

    // Commonly used dice
    pub fn d3() -> Self {
        return Self::new(3);
    }
    pub fn d4() -> Self {
        return Self::new(4);
    }
    pub fn d6() -> Self {
        return Self::new(6);
    }
    pub fn d8() -> Self {
        return Self::new(8);
    }
    pub fn d10() -> Self {
        return Self::new(10);
    }

    pub fn to_string(&self) -> String {
        return format!("1d{}", self.size);
    }
}

impl DicePool {
    pub fn new_die(die: Die) -> Self {
        return Self {
            dice: vec![die],
            maximized: false,
        };
    }

    pub fn d4() -> Self {
        return Self::new_die(Die::d4());
    }
    pub fn d6() -> Self {
        return Self::new_die(Die::d6());
    }
    pub fn d8() -> Self {
        return Self::new_die(Die::d8());
    }
    pub fn d10() -> Self {
        return Self::new_die(Die::d10());
    }

    pub fn new(dice: Vec<Die>, maximized: bool) -> DicePool {
        // Need to make sure the largest die is at the end
        let mut sorted_dice = dice.clone();
        sorted_dice.sort_by_key(|d| d.size);
        return Self {
            dice: sorted_dice,
            maximized,
        };
    }

    pub fn add_dice(&self, extra_dice: Vec<Die>) -> DicePool {
        let mut new_dice = self.dice.clone();
        new_dice.append(&mut extra_dice.clone());
        return DicePool::new(new_dice, self.maximized);
    }

    pub fn add_die(&self, die: Die) -> DicePool {
        return self.add_dice(vec![die]);
    }

    pub fn add_increments(&self, increments: i32) -> DicePool {
        let mut dice = self.dice.clone();
        let mut increments = increments;
        while (increments > 0) {
            // Technically, this can fail if you try to add +1d to a dice pool that starts
            // with 2d8 or more. In practice, this should never happen because the system never
            // creates dice pools larger than 2d8 that can be incremented in this way.
            let largest_die = dice.pop().unwrap();
            let mut incremented_dice = largest_die.add_increment();
            dice.append(&mut incremented_dice);
            increments -= 1;
        }
        return DicePool::new(dice, self.maximized);
    }

    pub fn to_string(&self) -> String {
        let mut counts = HashMap::new();
        for die in self.dice.iter() {
            counts
                .entry(die.size)
                .and_modify(|count| *count += 1)
                .or_insert(1);
        }

        let mut contained_sizes: Vec<&i32> = counts.keys().collect();
        contained_sizes.sort();

        let dice_texts: Vec<String> = contained_sizes
            .iter()
            .map(|s| format!("{}d{}", counts[s], s))
            .collect();
        let joined = dice_texts.join("+");
        if self.maximized {
            return format!("{} (m)", joined);
        } else {
            return joined;
        }
    }

    pub fn average_damage(&self) -> f64 {
        let mut sum = 0.0;
        for die in self.dice.iter() {
            if self.maximized {
                sum += die.size as f64;
            } else {
                sum += (die.size + 1) as f64 / 2.0;
            }
        }
        return sum;
    }

    pub fn maximize(&self) -> Self {
        let mut new_pool = self.clone();
        new_pool.maximized = true;
        return new_pool;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn standard_dice_values() {
        let d6 = Die::d6();
        assert_eq!("1d6", d6.to_string());
        let d8 = Die::d8();
        assert_eq!("1d8", d8.to_string());
        let d10 = Die::d10();
        assert_eq!("1d10", d10.to_string());
    }

    #[test]
    fn increasing_single_die_size() {
        // Start with 1d1
        let pool = DicePool::new_die(Die::new(1));
        assert_eq!("1d2", pool.add_increments(1).to_string());
        assert_eq!("1d3", pool.add_increments(2).to_string());
        assert_eq!("1d4", pool.add_increments(3).to_string());
        assert_eq!("1d6", pool.add_increments(4).to_string());
        assert_eq!("1d8", pool.add_increments(5).to_string());
        assert_eq!("1d10", pool.add_increments(6).to_string());
    }

    #[test]
    fn increasing_dice_with_splitting() {
        let pool = DicePool::d10();
        assert_eq!("2d6", pool.add_increments(1).to_string());
        assert_eq!("1d6+1d8", pool.add_increments(2).to_string());
        assert_eq!("1d6+1d10", pool.add_increments(3).to_string());
        assert_eq!("3d6", pool.add_increments(4).to_string());
    }

    #[test]
    fn calculates_average_damage() {
        assert_eq!(3.5, DicePool::d6().average_damage());
        assert_eq!(4.5, DicePool::d8().average_damage());
        assert_eq!(5.5, DicePool::d10().average_damage());
        assert_eq!(7.0, DicePool::d10().add_increments(1).average_damage());

        assert_eq!(
            13.5,
            DicePool::new(vec![Die::d8(), Die::d8(), Die::d8(),], false).average_damage()
        );
    }

    #[test]
    fn calculates_average_damage_maximized() {
        assert_eq!(6.0, DicePool::d6().maximize().average_damage());
        assert_eq!(8.0, DicePool::d8().maximize().average_damage());
        assert_eq!(10.0, DicePool::d10().maximize().average_damage());
        assert_eq!(
            12.0,
            DicePool::d10()
                .maximize()
                .add_increments(1)
                .average_damage()
        );

        assert_eq!(
            24.0,
            DicePool::new(vec![Die::d8(), Die::d8(), Die::d8(),], false)
                .maximize()
                .average_damage()
        );
    }
}
