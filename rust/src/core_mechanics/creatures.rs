pub mod attack_effects;
pub mod attacks;
pub mod creature;
pub mod latex;
mod modifier;
mod standard_attacks;

use crate::core_mechanics::{attributes, damage_absorption, defenses, resources};
use crate::equipment::HasWeapons;
use crate::skills::HasSkills;
pub use modifier::{HasModifiers, Modifier, ModifierType};
pub use standard_attacks::StandardAttack;

pub trait HasCreatureMechanics:
    attacks::HasAttacks
    + attributes::HasAttributes
    + damage_absorption::HasDamageAbsorption
    + defenses::HasDefenses
    + resources::HasResources
    + HasWeapons
    + HasSkills
    + HasModifiers
{
}
