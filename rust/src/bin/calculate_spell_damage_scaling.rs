use rise::calculations::spell_damage_scaling::{
    calc_valid_scaling_options, explain_solutions, DamageScope,
};

fn main() {
    // Could try area damage, but it doesn't seem useful
    for damage_scope in &[DamageScope::SingleTarget] {
        println!("DT {}", damage_scope.name());
        for rank in 1..10 {
            let solutions = calc_valid_scaling_options(rank, damage_scope);
            println!(
                "Rank {}: {}",
                rank,
                explain_solutions(rank, damage_scope, solutions)
            );
        }
        println!("\n");
    }
}
