pub mod attack_effects;
pub mod attacks;
mod character;
pub mod creature;
pub mod latex;
mod maneuver;
mod modifier;
mod monster;
mod standard_attacks;

use crate::core_mechanics::{
    HasAttributes, HasDamageAbsorption, HasDefenses, HasResources, HasVitalWounds,
};
use crate::equipment::HasWeapons;
use crate::skills::HasSkills;
use attacks::HasAttacks;
pub use character::Character;
pub use maneuver::Maneuver;
pub use modifier::{HasModifiers, Modifier, ModifierType};
pub use monster::Monster;
pub use standard_attacks::StandardAttack;
pub use creature::{Creature, CreatureCategory};

pub trait HasCreatureMechanics:
    HasAttacks
    + HasAttributes
    + HasDamageAbsorption
    + HasDefenses
    + HasResources
    + HasVitalWounds
    + HasWeapons
    + HasSkills
    + HasModifiers
    + HasVitalWounds
{
}
