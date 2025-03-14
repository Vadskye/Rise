pub mod abilities;
pub mod attacks;
mod attributes;
mod damage_absorption;
mod damage_dice;
mod debuffs;
mod defenses;
mod dice_pool;
mod movement;
mod passive_abilities;
mod resources;
mod senses;
mod sizes;
mod tag;
mod vital_wounds;

pub use attributes::{Attribute, HasAttributes};
pub use damage_absorption::{HasDamageAbsorption, HitPointProgression};
pub use damage_dice::DamageDice;
pub use debuffs::Debuff;
pub use defenses::{Defense, HasDefenses, SpecialDefenseType, SpecialDefenses};
pub use dice_pool::{DicePool, Die, PowerScaling};
pub use movement::{MovementMode, MovementSpeed, SpeedCategory, HasMovement};
pub use passive_abilities::{PassiveAbility, StandardPassiveAbility};
pub use resources::{HasResources, Resource};
pub use senses::Sense;
pub use sizes::{HasSize, Size};
pub use tag::Tag;
pub use vital_wounds::{HasVitalWounds, VitalWound};
