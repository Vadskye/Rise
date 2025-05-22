use crate::core_mechanics::{Defense, HitPointProgression};
use crate::core_mechanics::Defense::{Armor, Brawn, Fortitude, Reflex, Mental};
use crate::creatures::{Creature, HasModifiers, Modifier};

#[derive(Copy, Clone, Debug, Default, Hash)]
pub enum Role {
    Brute,      // melee HP-heavy damage sponge, like barbarian or any heavy weapon user
    Skirmisher, // high mobility mixed range, like rogue/monk/ranger
    Warrior, // melee or short range defense tank, like a typical sword and board fighter/paladin
    Sniper,  // low mobility long range, like an archer
    Mystic,  // low HP, high DR, typically a caster
    #[default]
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
        match self {
            Role::Brute => match defense {
                &Armor => 4,
                &Brawn => 2,
                &Fortitude => 1,
                &Reflex => 1,
                &Mental => 0,
            },
            Role::Leader => match defense {
                &Armor => 4,
                &Brawn => 1,
                &Fortitude => 1,
                &Reflex => 1,
                &Mental => 1,
            },
            Role::Mystic => match defense {
                &Armor => 3,
                &Brawn => 0,
                &Fortitude => 1,
                &Reflex => 2,
                &Mental => 3,
            },
            Role::Skirmisher => match defense {
                &Armor => 4,
                &Brawn => 1,
                &Fortitude => 0,
                &Reflex => 2,
                &Mental => 1,
            },
            Role::Sniper => match defense {
                &Armor => 3,
                &Brawn => 0,
                &Fortitude => 0,
                &Reflex => 2,
                &Mental => 2,
            },
            Role::Warrior => match defense {
                &Armor => 5,
                &Brawn => 0,
                &Fortitude => 2,
                &Reflex => 0,
                &Mental => 0,
            },
        }
    }

    pub fn damage_resistance_progression(self) -> HitPointProgression {
        match self {
            Role::Brute => HitPointProgression::Medium,
            Role::Leader => HitPointProgression::High,
            Role::Mystic => HitPointProgression::VeryHigh,
            Role::Skirmisher => HitPointProgression::Medium,
            Role::Sniper => HitPointProgression::Medium,
            Role::Warrior => HitPointProgression::Extreme,
        }
    }

    pub fn hit_point_progression(&self) -> HitPointProgression {
        match self {
            Role::Brute => HitPointProgression::Extreme,
            Role::Leader => HitPointProgression::VeryHigh,
            Role::Mystic => HitPointProgression::High,
            Role::Skirmisher => HitPointProgression::VeryHigh,
            Role::Sniper => HitPointProgression::High,
            Role::Warrior => HitPointProgression::VeryHigh,
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
