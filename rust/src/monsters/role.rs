use crate::core_mechanics::{Defense, HitPointProgression};
use crate::creatures::{Creature, HasModifiers, Modifier};

#[derive(Copy, Clone, Debug, Hash)]
pub enum Role {
    Brute,      // +str, melee HP-heavy damage sponge, like barbarian or any heavy weapon user
    Skirmisher, // +dex, high mobility mixed range, like rogue/monk/ranger
    Warrior, // +con, melee or short range defense tank, like a typical sword and board fighter/paladin
    Sniper,  // +per, low mobility long range, like an archer
    Mystic,  // +wil, low HP, high DR, typically a caster
    Leader,  // average in all respects
}

// No clear balancing. Hoping that the role differentiation makes them hard to directly compare.
impl Role {
    pub fn all() -> Vec<Self> {
        vec![
            Self::Brute,
            Self::Skirmisher,
            Self::Warrior,
            Self::Sniper,
            Self::Mystic,
            Self::Leader,
        ]
    }

    // Shorthand to avoid specifying the name and priority every time
    fn add_modifier(&self, creature: &mut Creature, modifier: Modifier) {
        creature.add_modifier(modifier, Some(self.name()), None);
    }

    pub fn set_core_statistics(&self, creature: &mut Creature) {
        for defense in Defense::all() {
            self.add_modifier(creature, Modifier::Defense(defense, self.defense(&defense)))
        }
        creature.hit_point_progression = self.hit_point_progression()
    }

    pub fn defense(&self, defense: &Defense) -> i32 {
        // order: Armor, Fort, Ref, Ment
        let defenses = match self {
            Role::Brute => [4, 5, 3, 4],
            Role::Skirmisher => [4, 3, 5, 4],
            Role::Warrior => [6, 5, 3, 4],
            Role::Sniper => [4, 4, 3, 5],
            Role::Mystic => [3, 3, 4, 5],
            Role::Leader => [4, 4, 4, 4],
        };

        let i = match defense {
            Defense::Armor => 0,
            Defense::Fortitude => 1,
            Defense::Reflex => 2,
            Defense::Mental => 3,
        };
        defenses[i]
    }

    // Multiply HP by this value to determine the monster's total DR.
    // Monsters follow the same baseline as PCs that DR should normally be 50% of HP.
    pub fn hp_dr_multiplier(&self) -> f64 {
        match self {
            Role::Brute => 0.25,
            Role::Skirmisher => 0.5,
            Role::Warrior => 1.0,
            Role::Sniper => 0.5,
            Role::Mystic => 1.0,
            Role::Leader => 0.5,
        }
    }

    pub fn hit_point_progression(&self) -> HitPointProgression {
        match self {
            Role::Brute => HitPointProgression::VeryHigh,
            Role::Skirmisher => HitPointProgression::Medium,
            Role::Warrior => HitPointProgression::Medium,
            Role::Sniper => HitPointProgression::Medium,
            Role::Mystic => HitPointProgression::Low,
            Role::Leader => HitPointProgression::High,
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Role::Brute => "Brute",
            Role::Skirmisher => "Skirmisher",
            Role::Warrior => "Warrior",
            Role::Sniper => "Sniper",
            Role::Mystic => "Mystic",
            Role::Leader => "Leader",
        }
    }
}
