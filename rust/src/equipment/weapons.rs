use crate::core_mechanics::abilities::Targeting;
use crate::core_mechanics::attacks::{Attack, AttackEffect};
use crate::core_mechanics::{DamageDice, DamageType, Defense, Tag};
use std::fmt;
use titlecase::titlecase;

#[derive(Clone, Debug)]
pub struct Weapon {
    pub accuracy: i32,
    pub damage_dice: DamageDice,
    pub damage_types: Vec<DamageType>,
    pub name: String,
    pub tags: Vec<WeaponTag>,
}

#[derive(Clone, Debug)]
pub enum WeaponTag {
    Ammunition,
    Compact,
    Forceful,
    Grappling,
    Impact,
    Keen,
    Long,
    Mounted,
    Parrying,
    Projectile(i32, i32),
    Stealthy,
    Sweeping(i32),
    Subdual,
    Thrown(i32, i32),
    Tripping,
    VersatileGrip,
}

impl WeaponTag {
    pub fn latex(&self) -> String {
        match self {
            Self::Ammunition => r"\weapontag{Ammunition}".to_string(),
            Self::Compact => r"\weapontag{Compact}".to_string(),
            Self::Forceful => r"\weapontag{Forceful}".to_string(),
            Self::Grappling => r"\weapontag{Grappling}".to_string(),
            Self::Impact => r"\weapontag{Impact}".to_string(),
            Self::Keen => r"\weapontag{Keen}".to_string(),
            Self::Long => r"\weapontag{Long}".to_string(),
            Self::Mounted => r"\weapontag{Mounted}".to_string(),
            Self::Parrying => r"\weapontag{Parrying}".to_string(),
            Self::Projectile(close, long) => {
                format!("\\weapontag{{Projectile}} ({}/{})", close, long)
            }
            Self::Stealthy => r"\weapontag{Stealthy}".to_string(),
            Self::Sweeping(count) => format!("\\weapontag{{Sweeping}} ({})", count),
            Self::Subdual => r"\weapontag{Subdual}".to_string(),
            Self::Thrown(close, long) => format!("\\weapontag{{Thrown}} ({}/{})", close, long),
            Self::Tripping => r"\weapontag{Tripping}".to_string(),
            Self::VersatileGrip => r"\weapontag{Versatile Grip}".to_string(),
        }
    }
}

#[derive(Copy, Clone)]
pub enum StandardWeapon {
    Battleaxe,
    Bite,
    Broadsword,
    Claw,
    Club,
    GiantBoulder,
    Greataxe,
    Greatsword,
    HeavyFlail,
    Javelin,
    Longbow,
    MonsterBite,
    MonsterClaws,
    MonsterGore,
    MonsterRam,
    MonsterStinger,
    Sap,
    Scimitar,
    Sickle,
    Slam,
    Sledgehammer,
    Spear,
    Talon,
    Totokia,
    Warhammer,
}

impl StandardWeapon {
    pub fn weapon(&self) -> Weapon {
        match self {
            Self::Battleaxe => Weapon {
                accuracy: 1,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Slashing],
                name: "Battleaxe".to_string(),
                tags: vec![WeaponTag::VersatileGrip],
            },
            Self::Bite => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Physical],
                name: "Bite".to_string(),
                tags: vec![WeaponTag::Grappling],
            },
            Self::Broadsword => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Slashing],
                name: "Broadsword".to_string(),
                tags: vec![WeaponTag::Sweeping(1), WeaponTag::VersatileGrip],
            },
            Self::Claw => Weapon {
                accuracy: 2,
                damage_dice: DamageDice::d4(),
                damage_types: vec![DamageType::Slashing],
                name: "Claw".to_string(),
                tags: vec![WeaponTag::VersatileGrip],
            },
            Self::Club => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Club".to_string(),
                tags: vec![],
            },
            Self::GiantBoulder => Weapon {
                // Individual giants can customize these range limits
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Boulder".to_string(),
                tags: vec![WeaponTag::Forceful, WeaponTag::Thrown(120, 360)],
            },
            Self::Greataxe => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d10().add(1),
                damage_types: vec![DamageType::Slashing],
                name: "Greataxe".to_string(),
                tags: vec![WeaponTag::Sweeping(1)],
            },
            Self::Greatsword => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Slashing],
                name: "Greatsword".to_string(),
                tags: vec![WeaponTag::Sweeping(2)],
            },
            Self::HeavyFlail => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d10().add(1),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Heavy flail".to_string(),
                tags: vec![WeaponTag::Tripping],
            },
            Self::Javelin => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Piercing],
                name: "Javelin".to_string(),
                tags: vec![WeaponTag::Thrown(60, 120)],
            },
            Self::Longbow => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Piercing],
                name: "Longbow".to_string(),
                tags: vec![WeaponTag::Projectile(90, 270)],
            },
            Self::MonsterBite => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Physical],
                name: "Bite".to_string(),
                tags: vec![WeaponTag::Grappling],
            },
            Self::MonsterClaws => Weapon {
                accuracy: 2,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Slashing],
                name: "Claws".to_string(),
                tags: vec![],
            },
            Self::MonsterGore => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Piercing],
                name: "Gore".to_string(),
                tags: vec![WeaponTag::Impact],
            },
            Self::MonsterRam => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Ram".to_string(),
                tags: vec![WeaponTag::Forceful],
            },
            Self::MonsterStinger => Weapon {
                accuracy: 1,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Piercing],
                name: "Stinger".to_string().to_string(),
                tags: vec![],
            },
            Self::Sap => Weapon {
                accuracy: 2,
                damage_dice: DamageDice::d3(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Sap".to_string(),
                tags: vec![WeaponTag::Stealthy, WeaponTag::Subdual],
            },
            Self::Scimitar => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Slashing],
                name: "Scimitar".to_string(),
                tags: vec![WeaponTag::Keen, WeaponTag::Mounted],
            },
            Self::Sickle => Weapon {
                accuracy: 1,
                damage_dice: DamageDice::d4(),
                damage_types: vec![DamageType::Slashing],
                name: "Sickle".to_string(),
                tags: vec![WeaponTag::Sweeping(1), WeaponTag::Tripping],
            },
            Self::Slam => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d10(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Slam".to_string(),
                tags: vec![],
            },
            Self::Sledgehammer => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d10().add(1),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Sledgehammer".to_string(),
                tags: vec![WeaponTag::Forceful],
            },
            Self::Spear => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Piercing],
                name: "Spear".to_string(),
                tags: vec![WeaponTag::Thrown(30, 60), WeaponTag::VersatileGrip],
            },
            Self::Talon => Weapon {
                accuracy: 1,
                damage_dice: DamageDice::d4(),
                damage_types: vec![DamageType::Piercing],
                name: "Talon".to_string(),
                tags: vec![WeaponTag::VersatileGrip],
            },
            Self::Totokia => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d8(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Totokia".to_string(),
                tags: vec![WeaponTag::Impact, WeaponTag::VersatileGrip],
            },
            Self::Warhammer => Weapon {
                accuracy: 0,
                damage_dice: DamageDice::d6(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Warhammer".to_string(),
                tags: vec![WeaponTag::Forceful, WeaponTag::VersatileGrip],
            },
        }
    }

    // TODO: add weapon tags
}

impl Weapon {
    pub fn attack(&self) -> Attack {
        let generic_tags = self.tags.iter().map(|t| Tag::Weapon(t.clone())).collect();
        return Attack {
            accuracy: self.accuracy,
            crit: None,
            defense: Defense::Armor,
            extra_context: None,
            hit: AttackEffect::from_weapon(self.clone()),
            name: titlecase(&self.name),
            is_magical: false,
            is_strike: true,
            replaces_weapon: Some(self.clone()),
            tags: Some(generic_tags),
            targeting: Targeting::Strike,
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

#[derive(Clone, Debug)]
pub enum WeaponMaterial {
    Adamantine,
    PureAdamantine,
    ColdIron,
    Normal,
    Diamondsteel,
    PureDiamondsteel,
    Dragonfang(String),
    AncientDragonfang(String),
    Mithral,
    PureMithral,
}

impl WeaponMaterial {
    pub fn name(&self) -> String {
        match self {
            Self::Adamantine => "adamantine".to_string(),
            Self::PureAdamantine => "pure adamantine".to_string(),
            Self::ColdIron => "cold iron".to_string(),
            Self::Normal => "normal".to_string(),
            Self::Diamondsteel => "diamondsteel".to_string(),
            Self::PureDiamondsteel => "pure diamondsteel".to_string(),
            Self::Dragonfang(color) => format!("{} dragonfang", color),
            Self::AncientDragonfang(color) => format!("{} ancient dragonfang", color),
            Self::Mithral => "mithral".to_string(),
            Self::PureMithral => "pure mithral".to_string(),
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
