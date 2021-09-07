pub mod attack_effects;
pub mod attacks;
pub mod creature;
pub mod latex;

use crate::equipment::HasWeapons;
use crate::skills::HasSkills;
use crate::core_mechanics::{attributes, damage_absorption, defenses, resources};

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
