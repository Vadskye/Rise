use crate::core_mechanics::{DamageDice, DamageType};
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
    MonsterStinger,
    MonsterTalons,
    Sap,
    Scimitar,
    Sickle,
    Slam,
    Sledgehammer,
    Spear,
    Totokia,
    Warhammer,
}

impl Weapon {
    pub fn accuracy(&self) -> i32 {
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
            Self::MonsterClaws => 3,
            Self::MonsterStinger => 1,
            Self::MonsterTalons => 3,
            Self::Sap => 2,
            Self::Scimitar => 0,
            Self::Sickle => 1,
            Self::Slam => 0,
            Self::Sledgehammer => 0,
            Self::Spear => 0,
            Self::Totokia => 0,
            Self::Warhammer => 0,
        }
    }

    pub fn damage_dice(&self) -> DamageDice {
        let increments = match self {
            Self::ArmorSpikes => DamageDice::d6(),
            Self::Battleaxe => DamageDice::d8(),
            Self::Bite => DamageDice::d8(),
            Self::Broadsword => DamageDice::d8(),
            Self::Claw => DamageDice::d6(),
            Self::Greataxe => DamageDice::d10() + 1,
            Self::Greatsword => DamageDice::d10(),
            Self::Longbow => DamageDice::d8(),
            Self::MonsterBite => DamageDice::d10(),
            Self::MonsterClaws => DamageDice::d6(),
            Self::MonsterStinger => DamageDice::d10(),
            Self::MonsterTalons => DamageDice::d6(),
            Self::Sap => DamageDice::d6(),
            Self::Scimitar => DamageDice::d8(),
            Self::Sickle => DamageDice::d6(),
            Self::Slam => DamageDice::d10(),
            Self::Sledgehammer => DamageDice::d10() + 1,
            Self::Spear => DamageDice::d8(),
            Self::Totokia => DamageDice::d10(),
            Self::Warhammer => DamageDice::d8(),
        };
        return DamageDice::new(increments);
    }

    pub fn damage_types(&self) -> Vec<DamageType> {
        match self {
            Self::ArmorSpikes => vec![DamageType::Piercing],
            Self::Battleaxe => vec![DamageType::Slashing],
            Self::Bite => vec![DamageType::Physical],
            Self::Broadsword => vec![DamageType::Slashing],
            Self::Claw => vec![DamageType::Slashing],
            Self::Greataxe => vec![DamageType::Slashing],
            Self::Greatsword => vec![DamageType::Slashing],
            Self::Longbow => vec![DamageType::Piercing],
            Self::MonsterBite => vec![DamageType::Physical],
            Self::MonsterClaws => vec![DamageType::Slashing],
            Self::MonsterStinger => vec![DamageType::Piercing],
            Self::MonsterTalons => vec![DamageType::Piercing],
            Self::Sap => vec![DamageType::Bludgeoning],
            Self::Scimitar => vec![DamageType::Slashing],
            Self::Sickle => vec![DamageType::Slashing],
            Self::Slam => vec![DamageType::Bludgeoning],
            Self::Sledgehammer => vec![DamageType::Bludgeoning],
            Self::Spear => vec![DamageType::Piercing],
            Self::Totokia => vec![DamageType::Bludgeoning],
            Self::Warhammer => vec![DamageType::Bludgeoning],
        }
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
            Self::MonsterStinger => "stinger",
            Self::MonsterTalons => "talons",
            Self::Sap => "sap",
            Self::Scimitar => "scimitar",
            Self::Sickle => "sickle",
            Self::Slam => "slam",
            Self::Sledgehammer => "sledgehammer",
            Self::Spear => "spear",
            Self::Totokia => "totokia",
            Self::Warhammer => "warhammer",
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

impl WeaponGroup {
    pub fn name_plural(&self) -> &str {
        match self {
            Self::Armor => "armor",
            Self::Axes => "axes",
            Self::Blades => "blades",
            Self::Bows => "bows",
            Self::Crossbows => "crossbows",
            Self::Clublike => "clublike weapons",
            Self::Monk => "monk weapons",
            Self::Thrown => "thrown weapons",
        }
    }
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
