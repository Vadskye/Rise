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
                &Brawn => 5,
                &Fortitude => 4,
                &Reflex => 4,
                &Mental => 3,
            },
            Role::Leader => match defense {
                &Armor => 4,
                &Brawn => 4,
                &Fortitude => 4,
                &Reflex => 4,
                &Mental => 4,
            },
            Role::Mystic => match defense {
                &Armor => 3,
                &Brawn => 3,
                &Fortitude => 4,
                &Reflex => 5,
                &Mental => 6,
            },
            Role::Skirmisher => match defense {
                &Armor => 4,
                &Brawn => 4,
                &Fortitude => 3,
                &Reflex => 5,
                &Mental => 4,
            },
            Role::Sniper => match defense {
                &Armor => 3,
                &Brawn => 3,
                &Fortitude => 3,
                &Reflex => 5,
                &Mental => 5,
            },
            Role::Warrior => match defense {
                &Armor => 5,
                &Brawn => 3,
                &Fortitude => 5,
                &Reflex => 3,
                &Mental => 3,
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
