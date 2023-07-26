fn ideal_damage(rank: i32, damage_type: &DamageType, high_attribute: bool) -> f64 {
    let base = match rank {
        1 => 3.5,
        2 => 5.0,
        3 => 7.0,
        4 => 10.0,
        5 => 14.0,
        6 => 20.0,
        7 => 28.0,
        8 => 40.0,
        9 => 56.0,
        _ => panic!("Invalid rank {}", rank),
    };
    let with_attribute = if high_attribute { base * 1.6 } else { base };
    
    if matches!(damage_type, DamageType::Area) {
        with_attribute * 0.6
    } else {
        with_attribute
    }
}

fn power_at_rank(rank: i32, high_attribute: bool) -> f64 {
    // half level + Str/Wil
    let p = match rank {
        1 => [0.5, 4.5],
        2 => [2.0, 7.0],
        3 => [3.5, 8.5],
        4 => [5.0, 11.0],
        5 => [6.5, 12.5],
        6 => [8.0, 15.0],
        7 => [9.5, 17.5],
        8 => [12.0, 20.0],
        9 => [13.5, 21.5],
        _ => panic!("Invalid rank {}", rank),
    };

    // half level + Str/Wil + 2
    // let p = match rank {
    //     1 => [2.5, 6.5],
    //     2 => [4.0, 9.0],
    //     3 => [5.5, 10.5],
    //     4 => [7.0, 13.0],
    //     5 => [8.5, 14.5],
    //     6 => [10.0, 17.0],
    //     7 => [11.5, 19.5],
    //     _ => panic!("Invalid rank {}", rank),
    // };

    // half (level + Str/Wil)
    // let p = match rank {
    //     1 => [0.5, 2.5],
    //     2 => [2.0, 4.5],
    //     3 => [3.5, 6.0],
    //     4 => [5.0, 8.0],
    //     5 => [6.5, 9.5],
    //     6 => [8.0, 11.5],
    //     7 => [9.5, 13.0],
    //     _ => panic!("Invalid rank {}", rank),
    // };

    // pure Str/Wil
    // let p = match rank {
    //     1 => [0, 4],
    //     2 => [0, 5],
    //     3 => [0, 5],
    //     4 => [0, 6],
    //     5 => [0, 6],
    //     6 => [0, 7],
    //     7 => [0, 7],
    //     _ => panic!("Invalid rank {}", rank),
    // };

    // level + Str/Wil
    // let p = match rank {
    //     1 => [1, 5],
    //     2 => [4, 9],
    //     3 => [7, 12],
    //     4 => [10, 16],
    //     5 => [13, 19],
    //     6 => [16, 23],
    //     7 => [19, 26],
    //     _ => panic!("Invalid rank {}", rank),
    // };
    if high_attribute { p[1] } else { p[0] }
}

#[derive(Clone, Copy)]
pub enum DamageType {
    Area,
    SingleTarget,
}

impl DamageType {
    pub fn name(&self) -> &str {
        match self {
            Self::Area => "area",
            Self::SingleTarget => "single target",
        }
    }
}

// This function uses clearer variable names than `calc_damage`.
fn calc_damage_individual_parameters(
    power: f64,
    d4: i32,
    d6: i32,
    d8: i32,
    d10: i32,
    power_per_d4: i32,
    power_per_d6: i32,
    power_per_d8: i32,
    power_per_d10: i32,
) -> f64 {
    let flat_damage = d4 as f64 * 2.5 + d6 as f64 * 3.5 + d8 as f64 * 4.5 + d10 as f64 * 5.5;
    // This ignores the 1d10 -> 2d6 upgrade, but it's close enough
    let mut damage_per_power = 0.0;
    if power_per_d4 > 0 {
        damage_per_power += 2.5 / power_per_d4 as f64;
    }
    if power_per_d6 > 0 {
        damage_per_power += 3.5 / power_per_d6 as f64;
    }
    if power_per_d8 > 0 {
        damage_per_power += 4.5 / power_per_d8 as f64;
    }
    if power_per_d10 > 0 {
        damage_per_power += 5.5 / power_per_d10 as f64;
    }
    flat_damage + damage_per_power * power
}

fn calc_damage(power: f64, ps: &ParameterSet) -> f64 {
    calc_damage_individual_parameters(
        power, ps[0], ps[1], ps[2], ps[3], ps[4], ps[5], ps[6], ps[7],
    )
}

struct SolutionAnalysis {
    is_right_scaling: bool,
    is_slow_scaling: bool,
    is_fast_scaling: bool,
}

impl SolutionAnalysis {
    fn is_valid(&self) -> bool {
        self.is_right_scaling || self.is_slow_scaling || self.is_fast_scaling
        // return is_right_scaling || is_fast_scaling;
        // return is_right_scaling;
    }

    fn validity_type(&self) -> &str {
        if self.is_right_scaling {
            "R"
        } else if self.is_slow_scaling {
            "L"
        } else if self.is_fast_scaling {
            "H"
        } else {
            ""
        }
    }
}

fn analyze_solution(rank: i32, damage_type: &DamageType, ps: &ParameterSet) -> SolutionAnalysis {
    let low_power = power_at_rank(rank, false);
    let low_ideal_damage = ideal_damage(rank, damage_type, false);
    let low_actual_damage = calc_damage(low_power, ps);

    let high_power = power_at_rank(rank, true);
    let high_ideal_damage = ideal_damage(rank, damage_type, true);
    let high_actual_damage = calc_damage(high_power, ps);

    let matches_low = is_kinda_close(low_ideal_damage, low_actual_damage);
    let matches_high = is_close(high_ideal_damage, high_actual_damage);
    let matches_sum = is_close(
        low_ideal_damage + high_ideal_damage,
        low_actual_damage + high_actual_damage,
    );
    let is_right_scaling = matches_low && matches_high && matches_sum;

    let is_slow_scaling = is_close(low_ideal_damage, low_actual_damage)
        && is_kinda_close(high_ideal_damage, high_actual_damage)
        && high_ideal_damage > high_actual_damage;
    let is_fast_scaling = is_kinda_close(high_ideal_damage, high_actual_damage)
        && is_kinda_close(low_ideal_damage, low_actual_damage)
        && low_ideal_damage > low_actual_damage
        && high_ideal_damage < high_actual_damage;

    SolutionAnalysis {
        is_right_scaling,
        is_slow_scaling,
        is_fast_scaling,
    }
}

fn is_close(expected: f64, actual: f64) -> bool {
    is_approximately_equal(expected, actual, 0.1)
}

fn is_kinda_close(expected: f64, actual: f64) -> bool {
    is_approximately_equal(expected, actual, 0.3)
}

fn is_approximately_equal(expected: f64, actual: f64, approximation_factor: f64) -> bool {
    // Solutions are considered valid if they are no more than X% off from the target values.
    expected * (1.0 + approximation_factor) >= actual
        && expected * (1.0 - approximation_factor) <= actual
}

type ParameterSet = [i32; 8];

pub fn calc_valid_scaling_options(rank: i32, damage_type: &DamageType) -> Vec<ParameterSet> {
    let dice_parameters: ParameterSet = [0, 0, 0, 0, 0, 0, 0, 0];
    let mut valid_solutions: Vec<ParameterSet> = vec![];

    calc_valid_scaling_options_recursive(
        rank,
        damage_type,
        &mut valid_solutions,
        dice_parameters,
        0,
    );

    valid_solutions
}

pub fn explain_parameter_set(ps: &ParameterSet) -> String {
    let mut components: Vec<String> = vec![];
    if ps[0] > 0 {
        components.push(format!("{}d4", ps[0]));
    }
    if ps[1] > 0 {
        components.push(format!("{}d6", ps[1]));
    }
    if ps[2] > 0 {
        components.push(format!("{}d8", ps[2]));
    }
    if ps[3] > 0 {
        components.push(format!("{}d10", ps[3]));
    }
    if ps[4] > 0 {
        components.push(format!("p{}d4", ps[4]));
    }
    if ps[5] > 0 {
        components.push(format!("p{}d6", ps[5]));
    }
    if ps[6] > 0 {
        components.push(format!("p{}d8", ps[6]));
    }
    if ps[7] > 0 {
        components.push(format!("p{}d10", ps[7]));
    }
    components.join(" + ")
}

pub fn explain_solutions(
    rank: i32,
    damage_type: &DamageType,
    solutions: Vec<ParameterSet>,
) -> String {
    let prefix = "\n  * ";
    format!(
        "{}{}",
        prefix,
        solutions
            .iter()
            .map(|s| explain_solution(rank, damage_type, s))
            .collect::<Vec<String>>()
            .join(prefix)
    )
}

pub fn explain_solution(rank: i32, damage_type: &DamageType, solution: &ParameterSet) -> String {
    format!(
        "{} {}; low {:.1} vs {:.1}, high {:.1} vs {:.1}",
        analyze_solution(rank, damage_type, solution).validity_type(),
        explain_parameter_set(solution),
        calc_damage(power_at_rank(rank, false), solution),
        ideal_damage(rank, damage_type, false),
        calc_damage(power_at_rank(rank, true), solution),
        ideal_damage(rank, damage_type, true),
    )
}

fn calc_valid_scaling_options_recursive(
    rank: i32,
    damage_type: &DamageType,
    valid_solutions: &mut Vec<ParameterSet>,
    parameter_set: ParameterSet,
    parameter_index: usize,
) {
    if analyze_solution(rank, damage_type, &parameter_set).is_valid() {
        valid_solutions.push(parameter_set);
    }
    for i in parameter_index..parameter_set.len() {
        let mut new_set = parameter_set;
        new_set[i] += 1;
        if new_set[i] <= limit_for_parameter_index(i, rank, parameter_set) {
            calc_valid_scaling_options_recursive(rank, damage_type, valid_solutions, new_set, i)
        }
    }
}

fn limit_for_parameter_index(i: usize, rank: i32, ps: ParameterSet) -> i32 {
    // skip flat damage terms
    // if i < 4 {
    //     return 0;
    // }
    // We don't want to make scaling terms too complicated
    if ps.iter().filter(|v| **v > 0).count() > 2 {
        return 0;
    }
    // Don't want to use many 1d4s
    if i == 0 {
        if rank > 3 {
            0
        } else {
            2
        }
    } else if i == 4 {
        // If we have other scaling per power, we don't care about +d scaling.
        if rank > 3 {
            return 0;
        } else {
            // +d scaling should never get too high
            return 3;
        }
    } else if i <= 3 {
        // It's okay to scale to high flat values
        return 8;
    } else {
        return 4;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn is_close_works() {
        assert!(is_close(1.05, 1.0));
        assert!(is_close(1.0, 1.05));
        assert!(is_close(2.15, 2.0));
        assert!(is_close(2.0, 2.15));

        assert!(!is_close(1.0, 2.0));
        assert!(!is_close(1.0, 999999.0));
        assert!(!is_close(99999999.0, 1.0));
        assert!(!is_close(2.0, 1.0));
        assert!(!is_close(1.0, 1.2));
        assert!(!is_close(1.2, 1.0));
    }

    #[test]
    fn calc_damage_works() {
        let d6_plus_d6_per_two_power = &[0, 1, 0, 0, 0, 2, 0, 0];
        assert_eq!(7.0, calc_damage(2.0, d6_plus_d6_per_two_power),);
        assert_eq!(10.5, calc_damage(4.0, d6_plus_d6_per_two_power),);
    }
}
