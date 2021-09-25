use crate::{
    core_mechanics::{DamageDice, DamageType, Defense},
    creatures::{
        attack_effects::AttackEffect,
        attacks::{Attack, AttackTargeting},
    },
};
use std::fmt;
use titlecase::titlecase;

#[derive(Clone)]
pub struct Weapon {
    pub accuracy: i32,
    pub damage_dice: DamageDice,
    pub damage_types: Vec<DamageType>,
    pub name: String,
}

#[derive(Copy, Clone)]
pub enum StandardWeapon {
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
    MonsterTentacle,
    Sap,
    Scimitar,
    Sickle,
    Slam,
    Sledgehammer,
    Spear,
    Totokia,
    Warhammer,
}

impl StandardWeapon {
    pub fn weapon(&self) -> Weapon {
        match self {
            Self::ArmorSpikes => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Piercing],
                name: "armor spike".to_string(),
            },
            Self::Battleaxe => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Slashing],
                name: "battleaxe".to_string(),
            },
            Self::Bite => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Physical],
                name: "bite".to_string(),
            },
            Self::Broadsword => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Slashing],
                name: "broadsword".to_string(),
            },
            Self::Claw => Weapon {
                accuracy: 2,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Slashing],
                name: "claw".to_string(),
            },
            Self::Club => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "club".to_string(),
            },
            Self::Greataxe => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d10().add(1),
                damage_types: vec![DamageType::Slashing],
                name: "greataxe".to_string(),
            },
            Self::Greatsword => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Slashing],
                name: "greatsword".to_string(),
            },
            Self::Longbow => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Piercing],
                name: "longbow".to_string(),
            },
            Self::MonsterBite => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Physical],
                name: "bite".to_string(),
            },
            Self::MonsterClaws => Weapon {
                accuracy: 3,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Slashing],
                name: "claws".to_string(),
            },
            Self::MonsterStinger => Weapon {
                accuracy: 1,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Piercing],
                name: "stinger".to_string().to_string(),
            },
            Self::MonsterTalons => Weapon {
                accuracy: 3,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Piercing],
                name: "talons".to_string(),
            },
            Self::MonsterTentacle => Weapon {
                accuracy: 1,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "tentacles".to_string(),
            },
            Self::Sap => Weapon {
                accuracy: 2,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "sap".to_string(),
            },
            Self::Scimitar => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Slashing],
                name: "scimitar".to_string(),
            },
            Self::Sickle => Weapon {
                accuracy: 1,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Slashing],
                name: "sickle".to_string(),
            },
            Self::Slam => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "slam".to_string(),
            },
            Self::Sledgehammer => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "sledgehammer".to_string(),
            },
            Self::Spear => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Piercing],
                name: "spear".to_string(),
            },
            Self::Totokia => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "totokia".to_string(),
            },
            Self::Warhammer => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "warhammer".to_string(),
            },
        }
    }

    // TODO: add weapon tags
}

impl Weapon {
    pub fn attack(&self) -> Attack {
        return Attack {
            accuracy: self.accuracy,
            cooldown: None,
            crit: None,
            defense: Defense::Armor,
            glance: None,
            hit: AttackEffect::from_weapon(self.clone()),
            movement: None,
            name: titlecase(&self.name),
            is_magical: false,
            is_strike: true,
            replaces_weapon: Some(self.clone()),
            targeting: AttackTargeting::Strike,
        };
    }

    pub fn except<F: FnOnce(&mut Self)>(mut self, f: F) -> Self {
        f(&mut self);
        return self;
    }

    pub fn plural_name(&self) -> String {
        return format!("{}s", self.name);
    }
}

impl fmt::Display for Weapon {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name)
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
//             Self::Armor => vec![StandardWeapon::ArmorSpikes],
//             Self::Axes => vec![StandardWeapon::Battleaxe, StandardWeapon::Greataxe],
//             Self::Blades => vec![StandardWeapon::Broadsword, StandardWeapon::Greataxe],
//             Self::Bows => vec![StandardWeapon::Longbow],
//             Self::Clublike => vec![StandardWeapon::Sap],
//         }
//     }
// }
