pub mod attack_effects;
pub mod attacks;
pub mod attributes;
pub mod character;
pub mod combat;
pub mod creature;
pub mod damage_absorption;
pub mod damage_dice;
pub mod damage_types;
pub mod debuffs;
pub mod defenses;
pub mod latex;
pub mod movement_modes;
pub mod passive_abilities;
pub mod resources;
pub mod sizes;
pub mod senses;

use crate::equipment::HasEquipment;
use crate::skills::HasSkills;

pub trait HasCreatureMechanics:
    attacks::HasAttacks
    + attributes::HasAttributes
    + damage_absorption::HasDamageAbsorption
    + defenses::HasDefenses
    + resources::HasResources
    + HasEquipment
    + HasSkills
{
}
