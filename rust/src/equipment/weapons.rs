use crate::core_mechanics::abilities::Targeting;
use crate::core_mechanics::attacks::{Attack, AttackEffect};
use crate::core_mechanics::{DamageType, Defense, DicePool, PowerScaling, Tag};
use std::fmt;
use std::mem::discriminant;
use titlecase::titlecase;

#[derive(Clone, Debug)]
pub struct Weapon {
    pub accuracy: i32,
    pub damage_dice: DicePool,
    pub damage_types: Vec<DamageType>,
    pub name: String,
    pub tags: Vec<WeaponTag>,
}

impl Default for Weapon {
    fn default() -> Self {
        return Self {
            accuracy: 0,
            damage_dice: DicePool::d6(),
            damage_types: vec![],
            name: "NO DEFAULT WEAPON MAKES SENSE".to_string(),
            tags: vec![],
        }
    }
}

impl Weapon {
    // Assume that explicitly added tags override any existing tags of the same type.
    // In theory, we could use the better of the two, but that is probably more surprising
    // behavior.
    pub fn add_tag(mut self, tag: WeaponTag) -> Self {
        // Remove any existing tags of the same enum type
        self.tags.retain(|t| discriminant(t) != discriminant(&tag));
        // Add the new tag
        self.tags.push(tag);
        
        self
    }

    pub fn power_scalings(&self) -> Vec<PowerScaling> {
        // TODO: handle versatile grip
        if self.tags.contains(&WeaponTag::Heavy) {
            PowerScaling::heavy_weapon_scalings()
        } else {
            vec![PowerScaling::standard_weapon_scaling()]
        }
    }

    pub fn bite() -> Self {
        StandardWeapon::MonsterBite.weapon()
    }

    pub fn broadsword() -> Self {
        StandardWeapon::Broadsword.weapon()
    }

    pub fn claw() -> Self {
        StandardWeapon::Claw.weapon()
    }

    pub fn fist() -> Self {
        StandardWeapon::Claw.weapon().except(|w| {
            w.damage_types = vec![DamageType::Bludgeoning];
            w.name = "Fist".to_string();
        })
    }

    pub fn flail() -> Self {
        StandardWeapon::Flail.weapon()
    }

    pub fn greataxe() -> Self {
        StandardWeapon::Greataxe.weapon()
    }

    pub fn greatclub() -> Self {
        StandardWeapon::Greatclub.weapon()
    }

    pub fn greatsword() -> Self {
        StandardWeapon::Greatsword.weapon()
    }

    pub fn heavy_flail() -> Self {
        StandardWeapon::HeavyFlail.weapon()
    }

    pub fn horn() -> Self {
        StandardWeapon::MonsterHorn.weapon()
    }

    pub fn horns() -> Self {
        StandardWeapon::MonsterHorns.weapon()
    }

    pub fn lance() -> Self {
        StandardWeapon::Lance.weapon()
    }

    pub fn longbow() -> Self {
        StandardWeapon::Longbow.weapon()
    }

    pub fn ram() -> Self {
        StandardWeapon::MonsterRam.weapon()
    }

    pub fn sling() -> Self {
        StandardWeapon::Sling.weapon()
    }

    pub fn spear() -> Self {
        StandardWeapon::Spear.weapon()
    }

    pub fn spikes() -> Self {
        StandardWeapon::Claws.weapon().except(|w| {
            w.damage_types = vec![DamageType::Piercing];
            w.name = "Claws".to_string();
        })
    }

    pub fn tail_slam() -> Self {
        StandardWeapon::MonsterRam.weapon().except(|w| {
            w.name = "Tail Slam".to_string();
        })
    }

    pub fn tentacle() -> Self {
        StandardWeapon::MonsterTentacle.weapon()
    }
}

#[derive(Clone, Debug, PartialEq)]
pub enum WeaponTag {
    Ammunition,
    Compact,
    Forceful,
    Grappling,
    Heavy,
    Impact,
    Keen,
    Light,
    Long,
    Massive(i32),
    Mounted,
    Parrying,
    Projectile(i32, i32),
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
            Self::Heavy => r"\weapontag{Heavy}".to_string(),
            Self::Impact => r"\weapontag{Impact}".to_string(),
            Self::Keen => r"\weapontag{Keen}".to_string(),
            Self::Light => r"\weapontag{Light}".to_string(),
            Self::Long => r"\weapontag{Long}".to_string(),
            Self::Massive(ft) => format!("\\weapontag{{Massive}} ({})", ft),
            Self::Mounted => r"\weapontag{Mounted}".to_string(),
            Self::Parrying => r"\weapontag{Parrying}".to_string(),
            Self::Projectile(close, long) => {
                format!("\\weapontag{{Projectile}} ({}/{})", close, long)
            }
            Self::Sweeping(count) => format!("\\weapontag{{Sweeping}} ({})", count),
            Self::Subdual => r"\weapontag{Subdual}".to_string(),
            Self::Thrown(close, long) => format!("\\weapontag{{Thrown}} ({}/{})", close, long),
            Self::Tripping => r"\weapontag{Tripping}".to_string(),
            Self::VersatileGrip => r"\weapontag{Versatile Grip}".to_string(),
        }
    }

    // True if the tag should be visible in monster attacks. Purely statistical tags, like Heavy,
    // should be omitted so tags only appear if they are meaningful to a GM.
    pub fn visible_in_monster_tags(&self) -> bool {
        match self {
            Self::Ammunition => false,
            Self::Compact => true,
            Self::Forceful => true,
            Self::Grappling => true,
            Self::Heavy => false,
            Self::Impact => true,
            Self::Keen => true,
            Self::Light => true,
            Self::Long => true,
            Self::Massive(_) => true,
            // The bonus here is assumed wherever it is used
            Self::Mounted => false,
            Self::Parrying => true,
            Self::Projectile(..) => true,
            Self::Sweeping(_) => true,
            Self::Subdual => true,
            Self::Thrown(..) => true,
            Self::Tripping => true,
            // TODO: monsters should somehow take this into account in the listed damage values?
            Self::VersatileGrip => false,
        }
    }
}

#[derive(Copy, Clone)]
pub enum StandardWeapon {
    Battleaxe,
    Bite,
    Broadsword,
    Claw,
    Claws,
    Club,
    GiantBoulder,
    Greataxe,
    Greatclub,
    Greatsword,
    Flail,
    HeavyCrossbow,
    HeavyFlail,
    Javelin,
    Lance,
    Longbow,
    MorningStar,
    MonsterBite,
    MonsterHorn,
    MonsterHorns,
    MonsterRam,
    MonsterStinger,
    MonsterTentacle,
    Sap,
    Scimitar,
    Sickle,
    Sledgehammer,
    Sling,
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
                damage_dice: DicePool::d6(),
                damage_types: vec![DamageType::Slashing],
                name: "Battleaxe".to_string(),
                tags: vec![WeaponTag::VersatileGrip],
            },
            Self::Bite => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                damage_types: vec![DamageType::Physical],
                name: "Bite".to_string(),
                tags: vec![WeaponTag::Grappling],
            },
            Self::Broadsword => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                damage_types: vec![DamageType::Slashing],
                name: "Broadsword".to_string(),
                tags: vec![WeaponTag::Sweeping(1), WeaponTag::VersatileGrip],
            },
            Self::Claw => Weapon {
                accuracy: 2,
                damage_dice: DicePool::d4(),
                damage_types: vec![DamageType::Slashing],
                name: "Claw".to_string(),
                tags: vec![WeaponTag::Light],
            },
            // TODO: define dual-wielding
            Self::Claws => Weapon {
                accuracy: 2,
                damage_dice: DicePool::d4(),
                damage_types: vec![DamageType::Slashing],
                name: "Claws".to_string(),
                tags: vec![WeaponTag::Light],
            },
            Self::Club => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d8(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Club".to_string(),
                tags: vec![],
            },
            Self::Flail => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Heavy flail".to_string(),
                tags: vec![WeaponTag::Tripping],
            },
            Self::GiantBoulder => Weapon {
                // Individual giants can customize these range limits
                accuracy: 0,
                damage_dice: DicePool::d8(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Boulder".to_string(),
                tags: vec![WeaponTag::Forceful, WeaponTag::Thrown(120, 360)],
            },
            Self::Greataxe => Weapon {
                accuracy: 1,
                damage_dice: DicePool::d8(),
                damage_types: vec![DamageType::Slashing],
                name: "Greataxe".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Sweeping(1)],
            },
            // Same as greatmace, but for monsters where a mace feels overly industrial
            Self::Greatclub => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d10(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Greatclub".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Impact],
            },
            Self::Greatsword => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d8(),
                damage_types: vec![DamageType::Slashing],
                name: "Greatsword".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Sweeping(2)],
            },
            Self::HeavyCrossbow => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d10(),
                damage_types: vec![DamageType::Piercing],
                name: "Heavy crossbow".to_string(),
                tags: vec![WeaponTag::Projectile(90, 270)],
            },
            Self::HeavyFlail => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d10(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Heavy flail".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Tripping],
            },
            Self::Javelin => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                damage_types: vec![DamageType::Piercing],
                name: "Javelin".to_string(),
                tags: vec![WeaponTag::Thrown(60, 120)],
            },
            Self::Lance => Weapon {
                // Add the bonus from the Mounted tag
                accuracy: 2,
                damage_dice: DicePool::d10(),
                damage_types: vec![DamageType::Piercing],
                name: "Lance".to_string(),
                tags: vec![WeaponTag::Ammunition, WeaponTag::Long, WeaponTag::Mounted],
            },
            Self::Longbow => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                damage_types: vec![DamageType::Piercing],
                name: "Longbow".to_string(),
                tags: vec![WeaponTag::Projectile(90, 270)],
            },
            Self::MorningStar => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d8(),
                damage_types: vec![DamageType::Bludgeoning, DamageType::Piercing],
                name: "Morning star".to_string(),
                tags: vec![WeaponTag::VersatileGrip],
            },
            Self::MonsterBite => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d8(),
                damage_types: vec![DamageType::Physical],
                name: "Bite".to_string(),
                tags: vec![WeaponTag::Grappling, WeaponTag::Heavy],
            },
            Self::MonsterHorn => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6().add_modifier(1),
                damage_types: vec![DamageType::Piercing],
                name: "Horn".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Impact],
            },
            Self::MonsterHorns => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6().add_modifier(1),
                damage_types: vec![DamageType::Piercing],
                name: "Horns".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Impact],
            },
            Self::MonsterRam => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d8(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Ram".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Forceful],
            },
            Self::MonsterStinger => Weapon {
                accuracy: 1,
                damage_dice: DicePool::d8(),
                damage_types: vec![DamageType::Piercing],
                name: "Stinger".to_string().to_string(),
                tags: vec![WeaponTag::Heavy],
            },
            Self::MonsterTentacle => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d8(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Tentacle".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Long],
            },
            Self::Sap => Weapon {
                accuracy: 1,
                damage_dice: DicePool::d3(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Sap".to_string(),
                tags: vec![WeaponTag::Compact, WeaponTag::Light, WeaponTag::Subdual],
            },
            Self::Scimitar => Weapon {
                accuracy: 1,
                damage_dice: DicePool::d6(),
                damage_types: vec![DamageType::Slashing],
                name: "Scimitar".to_string(),
                tags: vec![WeaponTag::Mounted],
            },
            Self::Sickle => Weapon {
                accuracy: 1,
                damage_dice: DicePool::d4(),
                damage_types: vec![DamageType::Slashing],
                name: "Sickle".to_string(),
                tags: vec![WeaponTag::Light, WeaponTag::Sweeping(1)],
            },
            Self::Sledgehammer => Weapon {
                accuracy: -1,
                damage_dice: DicePool::xdy(2, 6),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Sledgehammer".to_string(),
                tags: vec![WeaponTag::Forceful, WeaponTag::Heavy],
            },
            Self::Sling => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d4(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Sling".to_string(),
                tags: vec![WeaponTag::Projectile(60, 120), WeaponTag::Compact],
            },
            Self::Spear => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                damage_types: vec![DamageType::Piercing],
                name: "Spear".to_string(),
                tags: vec![WeaponTag::Thrown(30, 60), WeaponTag::VersatileGrip],
            },
            Self::Talon => Weapon {
                accuracy: 2,
                damage_dice: DicePool::d4(),
                damage_types: vec![DamageType::Piercing],
                name: "Talon".to_string(),
                tags: vec![WeaponTag::Light, WeaponTag::VersatileGrip],
            },
            Self::Totokia => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d8(),
                damage_types: vec![DamageType::Bludgeoning],
                name: "Totokia".to_string(),
                tags: vec![WeaponTag::Impact, WeaponTag::VersatileGrip],
            },
            Self::Warhammer => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
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
        Attack {
            accuracy: self.accuracy,
            crit: None,
            defense: Defense::Armor,
            extra_context: None,
            hit: AttackEffect::from_weapon(self),
            name: titlecase(&self.name),
            is_magical: false,
            is_strike: true,
            replaces_weapon: Some(self.clone()),
            tags: Some(generic_tags),
            targeting: Targeting::Strike,
        }
    }

    pub fn except<F: FnOnce(&mut Self)>(mut self, f: F) -> Self {
        f(&mut self);
        self
    }

    pub fn plural_name(&self) -> String {
        format!("{}s", self.name)
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
