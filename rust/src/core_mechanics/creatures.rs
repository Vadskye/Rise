pub mod attack_effects;
pub mod attacks;
pub mod creature;
pub mod latex;

use crate::core_mechanics::{attributes, damage_absorption, defenses, resources};
use crate::equipment::HasWeapons;
use crate::skills::HasSkills;

pub trait HasCreatureMechanics:
    attacks::HasAttacks
    + attributes::HasAttributes
    + damage_absorption::HasDamageAbsorption
    + defenses::HasDefenses
    + resources::HasResources
    + HasWeapons
    + HasSkills
{
}
