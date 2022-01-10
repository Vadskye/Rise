use crate::core_mechanics::SpeedCategory;

#[derive(Clone)]
pub struct AbilityMovement {
    pub move_before_attack: bool,
    pub requires_straight_line: bool,
    pub speed: SpeedCategory,
}
