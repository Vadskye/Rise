use rise::calculations::spell_damage_scaling::{
    calc_valid_scaling_options, explain_solutions, DamageType,
};

fn main() {
    // Could try area damage, but it doesn't seem useful
    for damage_type in &[DamageType::SingleTarget] {
        println!("DT {}", damage_type.name());
        for rank in 1..10 {
            let solutions = calc_valid_scaling_options(rank, damage_type);
            println!(
                "Rank {}: {}",
                rank,
                explain_solutions(rank, damage_type, solutions)
            );
        }
        println!("\n");
    }
}
