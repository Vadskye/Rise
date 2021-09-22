use crate::core_mechanics::{DamageDice, DamageType};
use std::fmt;

#[derive(Copy, Clone)]
pub enum Weapon {
    ArmorSpikes,
    Battleaxe,
    Bite,
    Broadsword,
    Claw,
    Club,
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

struct WeaponDefinition<'a> {
    accuracy: i32,
    damage_dice: i32,
    damage_types: Vec<DamageType>,
    name: &'a str,
}

impl Weapon {
    fn definition(&self) -> WeaponDefinition {
        match self {
            Self::ArmorSpikes => WeaponDefinition {
                accuracy: 0,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Piercing],
                name: "armor spike",
            },
            Self::Battleaxe => WeaponDefinition {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Slashing],
                name: "battleaxe",
            },
            Self::Bite => WeaponDefinition {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Physical],
                name: "bite",
            },
            Self::Broadsword => WeaponDefinition {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Slashing],
                name: "broadsword",
            },
            Self::Claw => WeaponDefinition {
                accuracy: 2,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Slashing],
                name: "claw",
            },
            Self::Club => WeaponDefinition {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "club",
            },
            Self::Greataxe => WeaponDefinition {
                accuracy: 0,
                damage_dice: DamageDice::d10() + 1,
                damage_types: vec![DamageType::Slashing],
                name: "greataxe",
            },
            Self::Greatsword => WeaponDefinition {
                accuracy: 0,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Slashing],
                name: "greatsword",
            },
            Self::Longbow => WeaponDefinition {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Piercing],
                name: "longbow",
            },
            Self::MonsterBite => WeaponDefinition {
                accuracy: 0,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Physical],
                name: "bite",
            },
            Self::MonsterClaws => WeaponDefinition {
                accuracy: 3,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Slashing],
                name: "claws",
            },
            Self::MonsterStinger => WeaponDefinition {
                accuracy: 1,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Piercing],
                name: "stinger",
            },
            Self::MonsterTalons => WeaponDefinition {
                accuracy: 3,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Piercing],
                name: "talons",
            },
            Self::Sap => WeaponDefinition {
                accuracy: 2,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "sap",
            },
            Self::Scimitar => WeaponDefinition {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Slashing],
                name: "scimitar",
            },
            Self::Sickle => WeaponDefinition {
                accuracy: 1,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Slashing],
                name: "sickle",
            },
            Self::Slam => WeaponDefinition {
                accuracy: 0,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "slam",
            },
            Self::Sledgehammer => WeaponDefinition {
                accuracy: 0,
                damage_dice: 1,
                damage_types: vec![DamageType::Bludgeoning],
                name: "sledgehammer",
            },
            Self::Spear => WeaponDefinition {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Piercing],
                name: "spear",
            },
            Self::Totokia => WeaponDefinition {
                accuracy: 0,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "totokia",
            },
            Self::Warhammer => WeaponDefinition {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "warhammer",
            },
        }
    }

    pub fn accuracy(&self) -> i32 {
        return self.definition().accuracy;
    }

    pub fn damage_dice(&self) -> DamageDice {
        return DamageDice::new(self.definition().damage_dice);
    }

    pub fn damage_types(&self) -> Vec<DamageType> {
        return self.definition().damage_types;
    }

    pub fn name(&self) -> &str {
        return self.definition().name;
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
