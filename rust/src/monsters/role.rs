use crate::core_mechanics::{Attribute, Defense, HasAttributes};
use crate::creatures::{Creature, HasModifiers, Modifier};

#[derive(Copy, Clone, Hash)]
pub enum Role {
    Brute,      // melee HP-heavy damage sponge, like barbarian or any heavy weapon user
    Leader,     // average mobility, versatile range, average durability, like cleric/druid
    Skirmisher, // high mobility mixed range, like rogue/monk/ranger
    Sniper,     // low mobility long range, like sorc/wiz
    Warrior,    // melee or short range defense tank, like a typical sword and board fighter/paladin
}

// No clear balancing. Hoping that the role differentiation makes them hard to directly compare.
impl Role {
    // Shorthand to avoid specifying the name and priority every time
    fn add_modifier(&self, creature: &mut Creature, modifier: Modifier) {
        creature.add_modifier(modifier, Some(self.name()), None);
    }

    pub fn set_core_statistics(&self, creature: &mut Creature) {
        for defense in Defense::all() {
            self.add_modifier(creature, Modifier::Defense(defense, self.defense(&defense)))
        }
        self.add_modifier(creature, Modifier::HitPoints(self.hit_points()));
        self.add_modifier(creature, Modifier::Power(self.power()))
    }

    pub fn defense(&self, defense: &Defense) -> i32 {
        // order: Armor, Fort, Ref, Ment
        let defenses = match self {
            Role::Brute => [3, 5, 3, 3],
            Role::Leader => [4, 4, 4, 6],
            Role::Skirmisher => [4, 4, 6, 4],
            Role::Sniper => [3, 4, 4, 4],
            Role::Warrior => [6, 5, 4, 5],
        };

        let i = match defense {
            Defense::Armor => 0,
            Defense::Fortitude => 1,
            Defense::Reflex => 2,
            Defense::Mental => 3,
        };
        return defenses[i];
    }

    pub fn hit_points(&self) -> i32 {
        match self {
            Role::Brute => 4,
            Role::Leader => 2,
            Role::Skirmisher => 0,
            Role::Sniper => 0,
            Role::Warrior => 1,
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Role::Brute => "Brute",
            Role::Leader => "Leader",
            Role::Skirmisher => "Skirmisher",
            Role::Sniper => "Sniper",
            Role::Warrior => "Warrior",
        }
    }

    pub fn power(&self) -> i32 {
        match self {
            Role::Brute => 2,
            Role::Leader => 0,
            Role::Skirmisher => 1,
            Role::Sniper => 1,
            Role::Warrior => 0,
        }
    }
}
