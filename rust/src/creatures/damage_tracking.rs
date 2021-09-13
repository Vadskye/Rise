pub trait HasDamageTracking {
    fn apply_vital_wounds_from_damage(&mut self);
    fn remaining_damage_resistance(&self) -> i32;
    fn remaining_hit_points(&self) -> i32;
    fn take_damage(&mut self, damage: i32);
}
