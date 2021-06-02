pub trait HasDamageAbsorption {
    fn calc_damage_resistance(&self) -> i32;
    fn calc_hit_points(&self) -> i32;
}
