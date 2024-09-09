use crate::core_mechanics::{Defense, HitPointProgression};
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

    pub fn armor_dex_multiplier(&self) -> f64 {
        match self {
            Role::Brute => 0.5,
            Role::Skirmisher => 0.5,
            Role::Warrior => 0.0,
            Role::Sniper => 0.5,
            Role::Mystic => 0.5,
            Role::Leader => 0.5,
        }
    }

    pub fn defense(&self, defense: &Defense) -> i32 {
        match defense {
            &Defense::Armor => match self {
                Role::Brute => 4,
                Role::Skirmisher => 4,
                Role::Warrior => 6,
                Role::Sniper => 3,
                Role::Mystic => 3,
                Role::Leader => 4,
            },
            _ => 0,
        }
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
            Role::Brute => HitPointProgression::Extreme,
            Role::Skirmisher => HitPointProgression::High,
            Role::Warrior => HitPointProgression::High,
            Role::Sniper => HitPointProgression::Medium,
            Role::Mystic => HitPointProgression::Medium,
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
