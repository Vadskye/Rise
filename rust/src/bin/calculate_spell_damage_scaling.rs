use rise::calculations::spell_damage_scaling::{calc_valid_scaling_options, explain_solutions};

fn main() {
    for rank in 1..8 {
        let solutions = calc_valid_scaling_options(rank);
        println!("Rank {}: {}", rank, explain_solutions(rank, solutions));
    }
}
