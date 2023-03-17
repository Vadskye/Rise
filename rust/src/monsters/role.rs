use crate::core_mechanics::{Attribute, Defense, HasAttributes};
use crate::creatures::{Creature, HasModifiers, Modifier};

#[derive(Copy, Clone, Hash)]
pub enum Role {
    Brute, // melee HP-heavy damage sponge, like barbarian or any heavy weapon user
    Leader, // average mobility, versatile range, average durability, like cleric/druid
    Skirmisher, // high mobility mixed range, like rogue/monk/ranger
    Sniper, // low mobility long range, like sorc/wiz
    Warrior, // melee or short range defense tank, like a typical sword and board fighter/paladin
}

// No clear balancing. Hoping that the role differentiation makes them hard to directly compare.
impl Role {
    // Shorthand to avoid specifying the name and priority every time
    fn add_modifier(&self, creature: &mut Creature, modifier: Modifier) {
        creature.add_modifier(
            modifier,
            Some(self.name()),
            None,
        );
    }

    pub fn set_core_statistics(&self, creature: &mut Creature) {
        for defense in Defense::all() {
            self.add_modifier(creature, Modifier::Defense(defense, self.defense(&defense)))
        }
        self.add_modifier(
            creature,
            Modifier::HitPoints(self.hit_points()),
        );
        self.add_modifier(
            creature,
            Modifier::Power(self.power()),
        )
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
            Defense::Armor => 1,
            Defense::Fortitude => 2,
            Defense::Reflex => 3,
            Defense::Mental => 4,
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

    pub fn set_standard_attributes(&self, creature: &mut Creature) {
        let attributes = match self {
            Role::Brute => [5, 0, 2, 0, 0, 0],
            Role::Leader => [2, 2, 2, 2, 2, 2],
            Role::Skirmisher => [2, 4, 0, 0, 4, 0],
            Role::Sniper => [2, 2, 0, 0, 4, 2],
            Role::Warrior => [2, 4, 4, 0, 2, 2],
        };
        let scaling_attributes = match self {
            Role::Brute => [Attribute::Strength, Attribute::Constitution],
            // "Leader" takes the role of the generic monster for calculations; unclear what its
            // default scaling should actually be.
            Role::Leader => [Attribute::Strength, Attribute::Willpower],
            Role::Skirmisher => [Attribute::Dexterity, Attribute::Perception],
            // Should really be Str or Wil depending on magical or mundane
            Role::Sniper => [Attribute::Strength, Attribute::Perception],
            Role::Warrior => [Attribute::Dexterity, Attribute::Willpower],
        };

        creature.set_base_attribute(Attribute::Strength, attributes[0]);
        creature.set_base_attribute(Attribute::Dexterity, attributes[1]);
        creature.set_base_attribute(Attribute::Constitution, attributes[2]);
        creature.set_base_attribute(Attribute::Intelligence, attributes[3]);
        creature.set_base_attribute(Attribute::Perception, attributes[4]);
        creature.set_base_attribute(Attribute::Willpower, attributes[5]);

        let level_scaling = (creature.level + 3) / 6;
        if level_scaling > 0 {
            self.add_modifier(creature, Modifier::Attribute(scaling_attributes[0], level_scaling));
            self.add_modifier(creature, Modifier::Attribute(scaling_attributes[1], level_scaling));
        }
    }
}
