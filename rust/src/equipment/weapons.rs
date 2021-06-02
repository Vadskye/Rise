use crate::core_mechanics::damage_dice::{self, D10, D6, D8};
use std::fmt;

#[derive(Copy, Clone)]
pub enum Weapon {
    ArmorSpikes,
    Battleaxe,
    Bite,
    Broadsword,
    Claw,
    Greataxe,
    Greatsword,
    Longbow,
    MonsterBite,
    MonsterClaws,
    Sap,
    Scimitar,
    Sickle,
    Slam,
}

impl Weapon {
    pub fn accuracy(&self) -> i8 {
        match self {
            Self::ArmorSpikes => 0,
            Self::Battleaxe => 0,
            Self::Bite => 0,
            Self::Broadsword => 0,
            Self::Claw => 2,
            Self::Greataxe => 0,
            Self::Greatsword => 0,
            Self::Longbow => 0,
            Self::MonsterBite => 0,
            Self::MonsterClaws => 4,
            Self::Sap => 2,
            Self::Scimitar => 0,
            Self::Sickle => 1,
            Self::Slam => 0,
        }
    }

    pub fn damage_dice(&self) -> damage_dice::DamageDice {
        let increments = match self {
            Self::ArmorSpikes => D6,
            Self::Battleaxe => D8,
            Self::Bite => D8,
            Self::Broadsword => D10,
            Self::Claw => D6,
            Self::Greataxe => D10 + 1,
            Self::Greatsword => D10,
            Self::Longbow => D8,
            Self::MonsterBite => D10,
            Self::MonsterClaws => D6,
            Self::Sap => D6,
            Self::Scimitar => D8,
            Self::Sickle => D6,
            Self::Slam => D10,
        };
        return damage_dice::DamageDice::new(increments);
    }

    pub fn name(&self) -> &str {
        match self {
            Self::ArmorSpikes => "armor spike",
            Self::Battleaxe => "battleaxe",
            Self::Bite => "bite",
            Self::Broadsword => "broadsword",
            Self::Claw => "claw",
            Self::Greataxe => "greataxe",
            Self::Greatsword => "greatsword",
            Self::Longbow => "longbow",
            Self::MonsterBite => "bite",
            Self::MonsterClaws => "claws",
            Self::Sap => "sap",
            Self::Scimitar => "scimitar",
            Self::Sickle => "sickle",
            Self::Slam => "slam",
        }
    }

    pub fn plural_name(&self) -> String {
        return format!("{}s", self.name());
    }

    // TODO: add weapon tags
}

impl fmt::Display for Weapon {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name())
    }
}


pub enum WeaponGroup {
    Armor,
    Axes,
    Blades,
    Bows,
    Crossbows,
    Clublike,
    Monk,
    Thrown,
}

// impl WeaponGroup {
//     fn weapons(&self) -> Vec<Weapon> {
//         match self {
//             Self::Armor => vec![Weapon::ArmorSpikes],
//             Self::Axes => vec![Weapon::Battleaxe, Weapon::Greataxe],
//             Self::Blades => vec![Weapon::Broadsword, Weapon::Greataxe],
//             Self::Bows => vec![Weapon::Longbow],
//             Self::Clublike => vec![Weapon::Sap],
//         }
//     }
// }
