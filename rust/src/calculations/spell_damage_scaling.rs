fn power_at_rank(rank: i32, high_attribute: bool) -> i32 {
    let p = match rank {
        1 => [0, 4],
        2 => [2, 6],
        3 => [3, 8],
        4 => [5, 10],
        5 => [6, 12],
        6 => [8, 14],
        7 => [9, 16],
        _ => panic!("Invalid rank {}", rank),
    };
    return if high_attribute { p[1] } else { p[0] };
}

fn ideal_damage(rank: i32, high_attribute: bool) -> f64 {
    let base = match rank {
        1 => 3.5,
        2 => 5.0,
        3 => 7.0,
        4 => 10.0,
        5 => 14.0,
        6 => 20.0,
        7 => 28.0,
        _ => panic!("Invalid rank {}", rank),
    };
    return if high_attribute { base * 1.6 } else { base };
}

// This function uses clearer variable names than `calc_damage`.
fn calc_damage_individual_parameters(
    power: i32,
    d6: i32,
    d8: i32,
    d10: i32,
    power_per_plusd: i32,
    power_per_d6: i32,
    power_per_d8: i32,
    power_per_d10: i32,
) -> f64 {
    let flat_damage = d6 as f64 * 3.5 + d8 as f64 * 4.5 + d10 as f64 * 5.5;
    // This ignores the 1d10 -> 2d6 upgrade, but it's close enough
    let mut damage_per_power = 0.0;
    if power_per_plusd > 0 {
        damage_per_power += 1.0 / power_per_plusd as f64;
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
    return flat_damage + (damage_per_power * power as f64);
}

fn calc_damage(power: i32, ps: &ParameterSet) -> f64 {
    return calc_damage_individual_parameters(
        power, ps[0], ps[1], ps[2], ps[3], ps[4], ps[5], ps[6],
    );
}

fn is_valid_solution(rank: i32, ps: &ParameterSet) -> bool {
    let low_power = power_at_rank(rank, false);
    let low_ideal_damage = ideal_damage(rank, false);
    let high_power = power_at_rank(rank, true);
    let high_ideal_damage = ideal_damage(rank, true);

    let matches_low = is_approximately_equal(low_ideal_damage, calc_damage(low_power, ps));
    let matches_high = is_approximately_equal(high_ideal_damage, calc_damage(high_power, ps));

    // println!(
    //     "ps {}: low {} vs {} @{}, high {} vs {} @{}",
    //     explain_parameter_set(&ps),
    //     calc_damage(low_power, ps),
    //     low_ideal_damage,
    //     low_power,
    //     calc_damage(high_power, ps),
    //     high_ideal_damage,
    //     high_power,
    // );

    return matches_low && matches_high;
}

fn is_approximately_equal(expected: f64, actual: f64) -> bool {
    // Solutions are considered valid if they are no more than 10% off from the target values.
    let approximation_factor = 0.1;
    return expected * (1.0 + approximation_factor) >= actual
        && expected * (1.0 - approximation_factor) <= actual;
}

type ParameterSet = [i32; 7];

pub fn calc_valid_scaling_options(rank: i32) -> Vec<ParameterSet> {
    let dice_parameters: ParameterSet = [0, 0, 0, 0, 0, 0, 0];
    let mut valid_solutions: Vec<ParameterSet> = vec![];

    calc_valid_scaling_options_recursive(rank, &mut valid_solutions, dice_parameters, 0);

    return valid_solutions;
}

pub fn explain_parameter_set(ps: &ParameterSet) -> String {
    let mut components: Vec<String> = vec![];
    if ps[0] > 0 {
        components.push(format!("{}d6", ps[0]));
    }
    if ps[1] > 0 {
        components.push(format!("{}d8", ps[1]));
    }
    if ps[2] > 0 {
        components.push(format!("{}d10", ps[2]));
    }
    if ps[3] > 0 {
        components.push(format!("p{}d", ps[3]));
    }
    if ps[4] > 0 {
        components.push(format!("p{}d6", ps[4]));
    }
    if ps[5] > 0 {
        components.push(format!("p{}d8", ps[5]));
    }
    if ps[6] > 0 {
        components.push(format!("p{}d8", ps[6]));
    }
    return components.join(" + ");
}

pub fn explain_solutions(rank: i32, solutions: Vec<ParameterSet>) -> String {
    let prefix = "\n  * ";
    return format!(
        "{}{}",
        prefix,
        solutions
            .iter()
            .map(|s| explain_solution(rank, &s))
            .collect::<Vec<String>>()
            .join(prefix)
    );
}

pub fn explain_solution(rank: i32, solution: &ParameterSet) -> String {
    return format!(
        "{}; low {:.1} vs {:.1}, high {:.1} vs {:.1}",
        explain_parameter_set(&solution),
        calc_damage(power_at_rank(rank, false), solution),
        ideal_damage(rank, false),
        calc_damage(power_at_rank(rank, true), solution),
        ideal_damage(rank, true),
    );
}

fn calc_valid_scaling_options_recursive(
    rank: i32,
    valid_solutions: &mut Vec<ParameterSet>,
    parameter_set: ParameterSet,
    parameter_index: usize,
) {
    if is_valid_solution(rank, &parameter_set) {
        valid_solutions.push(parameter_set.clone());
    }
    for i in parameter_index..parameter_set.len() {
        let mut new_set = parameter_set.clone();
        new_set[i] = new_set[i] + 1;
        if new_set[i] <= limit_for_parameter_index(i, parameter_set) {
            calc_valid_scaling_options_recursive(rank, valid_solutions, new_set, i)
        }
    }
}

fn limit_for_parameter_index(i: usize, ps: ParameterSet) -> i32 {
    // We don't want to make scaling terms too complicated
    if ps.iter().filter(|v| **v > 0).count() > 3 {
        return 0;
    }
    if i == 3 {
        // If we have other scaling per power, we don't care about +d scaling.
        if ps[4] + ps[5] + ps[6] > 0 {
            return 0;
        } else {
            // +d scaling should never get too high
            return 2;
        }
    } else {
        return 4;
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn is_approximately_equal_works() {
        assert!(is_approximately_equal(1.05, 1.0));
        assert!(is_approximately_equal(1.0, 1.05));
        assert!(is_approximately_equal(2.15, 2.0));
        assert!(is_approximately_equal(2.0, 2.15));

        assert!(!is_approximately_equal(1.0, 2.0));
        assert!(!is_approximately_equal(1.0, 999999.0));
        assert!(!is_approximately_equal(99999999.0, 1.0));
        assert!(!is_approximately_equal(2.0, 1.0));
        assert!(!is_approximately_equal(1.0, 1.2));
        assert!(!is_approximately_equal(1.2, 1.0));
    }

    #[test]
    fn calc_damage_works() {
        let d6_plus_d6_per_two_power = &[1, 0, 0, 0, 2, 0, 0];
        assert_eq!(7.0, calc_damage(2, d6_plus_d6_per_two_power),);
        assert_eq!(10.5, calc_damage(4, d6_plus_d6_per_two_power),);
    }
}
