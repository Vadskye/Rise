use std::collections::HashMap;

#[derive(Clone, Debug)]
pub struct Die {
    pub size: i32,
}

impl Die {
    pub fn new(size: i32) -> Self {
        Self { size }
    }

    pub fn add_increment(&self) -> Vec<Die> {
        if self.size < 4 {
            vec![Die::new(self.size + 1)]
        } else if self.size < 10 {
            return vec![Die::new(self.size + 2)];
        } else {
            return vec![Die::new(6), Die::new(6)];
        }
    }

    // Commonly used dice
    pub fn d3() -> Self {
        Self::new(3)
    }
    pub fn d4() -> Self {
        Self::new(4)
    }
    pub fn d6() -> Self {
        Self::new(6)
    }
    pub fn d8() -> Self {
        Self::new(8)
    }
    pub fn d10() -> Self {
        Self::new(10)
    }

    pub fn to_string(&self) -> String {
        format!("1d{}", self.size)
    }
}

#[derive(Clone, Debug)]
pub struct DicePool {
    pub dice: Vec<Die>,
    pub flat_modifier: i32,
    // A maximized dice pool deals more `.average_damage()` and is noted in
    // `.to_string()`.
    pub maximized: bool,
    // Useful for things like "double weapon damage". This is used in two places:
    // `.average_damage()` and `.to_string()`.
    pub multiplier: i32,
    // A weak dice pool is rolled twice, keeping the lower result.
    pub weak: bool,
}

impl DicePool {
    pub fn new_die(die: Die) -> Self {
        Self {
            dice: vec![die],
            flat_modifier: 0,
            maximized: false,
            multiplier: 1,
            weak: false,
        }
    }

    // These are sometimes nice, especially when thinking about weapons.
    // It's possible that just using `xdy()` is better.
    pub fn d3() -> Self {
        Self::xdy(1, 3)
    }
    pub fn d4() -> Self {
        Self::xdy(1, 4)
    }
    pub fn d6() -> Self {
        Self::xdy(1, 6)
    }
    pub fn d8() -> Self {
        Self::xdy(1, 8)
    }
    pub fn d10() -> Self {
        Self::xdy(1, 10)
    }

    // Shorthand when you don't want to think about maximized/weak, which is almost always.
    pub fn new(dice: Vec<Die>) -> DicePool {
        Self {
            dice,
            flat_modifier: 0,
            maximized: false,
            multiplier: 1,
            weak: false,
        }
    }

    // It's legal to have a DicePool with an empty `dice`.
    // This is useful for defining attacks with a high power scaling, where all of their
    // damage comes from the power scaling.
    // However, you can't add flat modifiers to an empty DicePool.
    pub fn empty() -> DicePool {
        Self {
            dice: vec![],
            flat_modifier: 0,
            maximized: false,
            multiplier: 1,
            weak: false,
        }
    }

    // X dice of Y size: `xdy(2, 8)` is 2d8.
    pub fn xdy(count: i32, size: i32) -> Self {
        let mut dice: Vec<Die> = vec![];
        for _ in 0..count {
            dice.push(Die::new(size));
        }
        Self::new(dice)
    }

    pub fn add_dice(&self, extra_dice: Vec<Die>) -> DicePool {
        let mut new_dice = self.dice.clone();
        // Need to make sure the largest die is at the end
        new_dice.append(&mut extra_dice.clone());
        new_dice.sort_by_key(|d| d.size);
        DicePool {
            dice: new_dice,
            flat_modifier: self.flat_modifier,
            maximized: self.maximized,
            multiplier: self.multiplier,
            weak: self.weak,
        }
    }

    pub fn add_die(&self, die: Die) -> DicePool {
        self.add_dice(vec![die])
    }

    pub fn add_modifier(&self, flat_modifier: i32) -> DicePool {
        let mut new_dice = self.clone();
        new_dice.flat_modifier += flat_modifier;
        new_dice
    }

    // Construct a standard "1d8" or "2d8+1d10" string.
    // The largest dice should be at the end as a natural result of any dice
    // modifications that happen in the normal mutation functions.
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

        if self.maximized {
            // If the dice pool is maximized, just return the single number indicating the total
            // damage.
            let mut sum = 0;
            for size in contained_sizes {
                sum += size * counts[size]
            }
            sum += self.flat_modifier;
            sum.to_string()
        } else {
            let mut dice_texts: Vec<String> = contained_sizes
                .iter()
                .map(|s| format!("{}d{}", counts[s] * self.multiplier, s))
                .collect();
            if self.flat_modifier != 0 {
                dice_texts.push(self.flat_modifier.to_string());
            }
            let joined = dice_texts.join("+");
            if self.maximized {
                format!("{} (m)", joined)
            } else if self.weak {
                return format!("{} (w)", joined);
            } else {
                return joined;
            }
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
        // Not worth doing a more correct version of "weak", since it's surprisingly
        // complicated.
        if self.weak && !self.maximized {
            sum *= 0.75;
        }
        sum *= self.multiplier as f64;
        sum
    }

    // Useful for "double weapon damage" or "triple weapon damage" effects
    pub fn multiply(&self, multiplier: i32) -> DicePool {
        DicePool {
            dice: self.dice.clone(),
            flat_modifier: self.flat_modifier,
            maximized: self.maximized,
            multiplier,
            weak: self.weak,
        }
    }

    // Return a new DicePool that is maximized.
    pub fn maximize(&self) -> Self {
        let mut new_pool = self.clone();
        new_pool.maximized = true;
        new_pool
    }

    // Return a new DicePool that is weak. TODO: awkward name?
    pub fn weak(&self) -> Self {
        let mut new_pool = self.clone();
        new_pool.weak = true;
        new_pool
    }

    pub fn calc_scaled_pool(&self, power_scalings: &Vec<PowerScaling>, power: i32) -> DicePool {
        let mut combined_pool = self.clone();
        // Add flat modifier
        for scaling in power_scalings.iter() {
            if scaling.power_per_plus1_modifier > 0 {
                combined_pool.flat_modifier += power / scaling.power_per_plus1_modifier
            }
        }
        // Now add extra dice
        for scaling in power_scalings.iter() {
            if scaling.power_per_dice > 0 {
                let added_dice = scaling.dice.clone().unwrap().dice;
                // This is the dumbest possible way to add N dice, but the runtime should be
                // irrelevant.
                for _ in 0..(power / scaling.power_per_dice) {
                    combined_pool = combined_pool.add_dice(added_dice.clone());
                }
            }
        }
        combined_pool
    }
}

#[derive(Clone, Debug)]
pub struct PowerScaling {
    pub dice: Option<DicePool>,
    pub power_per_dice: i32,
    pub power_per_plus1_modifier: i32,
}

impl PowerScaling {
    // Normally, weapons gain +1d per 2 power. Low-level spells also tend to use this
    // scaling.
    pub fn standard_weapon_scaling() -> Self {
        Self {
            dice: None,
            power_per_dice: 0,
            power_per_plus1_modifier: 2,
        }
    }

    pub fn heavy_weapon_scalings() -> Vec<Self> {
        // Two scalings: one that gives +1d per 2 power, and one that gives +1d per 3
        // power.
        vec![
            Self::standard_weapon_scaling(),
            Self {
                dice: None,
                power_per_dice: 0,
                power_per_plus1_modifier: 3,
            },
        ]
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
    fn calculates_average_damage() {
        assert_eq!(3.5, DicePool::d6().average_damage());
        assert_eq!(4.5, DicePool::d8().average_damage());
        assert_eq!(5.5, DicePool::d10().average_damage());
        assert_eq!(6.5, DicePool::d10().add_modifier(1).average_damage());

        assert_eq!(13.5, DicePool::xdy(3, 8).average_damage());
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
                .add_modifier(2)
                .average_damage()
        );

        assert_eq!(24.0, DicePool::xdy(3, 8).maximize().average_damage());
    }

    #[test]
    fn stringifies_maximized_dice() {
        assert_eq!("6", DicePool::d6().maximize().to_string());
        assert_eq!(
            "9",
            DicePool::d6().add_modifier(3).maximize().to_string()
        );
    }
}
