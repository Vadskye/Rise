use crate::core_mechanics::abilities::Targeting;
use crate::core_mechanics::attacks::{Attack, AttackEffect};
use crate::core_mechanics::{Defense, DicePool, PowerScaling, Tag};
use crate::creatures::Modifier;
use std::fmt;
use std::mem::discriminant;
use titlecase::titlecase;

#[derive(Clone, Debug)]
pub struct Weapon {
    pub accuracy: i32,
    pub damage_dice: DicePool,
    pub name: String,
    pub tags: Vec<WeaponTag>,
}

impl Default for Weapon {
    fn default() -> Self {
        return Self {
            accuracy: 0,
            damage_dice: DicePool::d6(),
            name: "NO DEFAULT WEAPON MAKES SENSE".to_string(),
            tags: vec![],
        };
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
        // TODO: enable versatile grip based on whether they also have a shield? Or just enable it
        // for monsters?
        if self.tags.contains(&WeaponTag::Heavy) {
            PowerScaling::heavy_weapon_scalings()
        } else {
            vec![PowerScaling::standard_weapon_scaling()]
        }
    }

    pub fn is_melee(&self) -> bool {
        let non_melee_tag = self.tags.iter().find(|t| match t {
            WeaponTag::Projectile(_, _) => true,
            WeaponTag::Thrown(_, _) => true,
            _ => false,
        });
        return non_melee_tag.is_none();
    }

    // Add Sweeping (steps) if it doesn't exist, or increase the existing tag if it does
    pub fn increase_sweeping(mut self, steps: i32) -> Self {
        let mut found_sweeping = false;
        self.tags = self
            .tags
            .into_iter()
            .map(|t| {
                match t {
                    WeaponTag::Sweeping(v) => {
                        found_sweeping = true;
                        Some(WeaponTag::Sweeping(v + steps))
                    }
                    _ => None,
                }
                .unwrap_or(t)
            })
            .collect();

        if !found_sweeping {
            self.tags.push(WeaponTag::Sweeping(steps));
        }

        self
    }
}

// Static constructors
impl Weapon {
    pub fn bite() -> Self {
        StandardWeapon::MonsterBite.weapon()
    }

    pub fn broadsword() -> Self {
        StandardWeapon::Broadsword.weapon()
    }

    pub fn club() -> Self {
        StandardWeapon::Club.weapon()
    }

    pub fn claw() -> Self {
        StandardWeapon::Claw.weapon()
    }

    pub fn fist() -> Self {
        StandardWeapon::Claw.weapon().except(|w| {
            w.name = "Fist".to_string();
        })
    }

    pub fn flail() -> Self {
        StandardWeapon::Flail.weapon()
    }

    pub fn giant_boulder() -> Self {
        StandardWeapon::GiantBoulder.weapon()
    }

    pub fn greataxe() -> Self {
        StandardWeapon::Greataxe.weapon()
    }

    pub fn greatclub() -> Self {
        StandardWeapon::Greatclub.weapon()
    }

    pub fn greatmace() -> Self {
        StandardWeapon::Greatmace.weapon()
    }

    pub fn greatsword() -> Self {
        StandardWeapon::Greatsword.weapon()
    }

    pub fn hand() -> Self {
        StandardWeapon::Claw.weapon().except(|w| {
            w.name = "Hand".to_string();
        })
    }

    pub fn heavy_crossbow() -> Self {
        StandardWeapon::HeavyCrossbow.weapon()
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

    pub fn kama() -> Self {
        StandardWeapon::Kama.weapon()
    }

    pub fn lance() -> Self {
        StandardWeapon::Lance.weapon()
    }

    pub fn longbow() -> Self {
        StandardWeapon::Longbow.weapon()
    }

    pub fn monster_punch() -> Self {
        StandardWeapon::MonsterPunch.weapon()
    }

    pub fn ram() -> Self {
        StandardWeapon::MonsterRam.weapon()
    }

    pub fn sling() -> Self {
        StandardWeapon::Sling.weapon()
    }

    pub fn smallsword() -> Self {
        StandardWeapon::Smallsword.weapon()
    }

    pub fn spear() -> Self {
        StandardWeapon::Spear.weapon()
    }

    pub fn stinger() -> Self {
        StandardWeapon::MonsterStinger.weapon()
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
    Clinch,
    Compact,
    Heavy,
    Impact,
    Keen,
    Light,
    Long,
    Maneuverable,
    Mounted,
    Parrying,
    Projectile(i32, i32),
    Resonating,
    Sweeping(i32),
    Subdual,
    Thrown(i32, i32),
    VersatileGrip,
}

impl WeaponTag {
    pub fn latex(&self) -> String {
        match self {
            Self::Ammunition => r"\weapontag{Ammunition}".to_string(),
            Self::Clinch => r"\abilitytag{Clinch}".to_string(),
            Self::Compact => r"\weapontag{Compact}".to_string(),
            Self::Heavy => r"\weapontag{Heavy}".to_string(),
            Self::Impact => r"\abilitytag{Impact}".to_string(),
            Self::Keen => r"\abilitytag{Keen}".to_string(),
            Self::Light => r"\weapontag{Light}".to_string(),
            Self::Long => r"\weapontag{Long}".to_string(),
            Self::Maneuverable => r"\weapontag{Maneuverable}".to_string(),
            Self::Mounted => r"\weapontag{Mounted}".to_string(),
            Self::Parrying => r"\weapontag{Parrying}".to_string(),
            Self::Projectile(close, long) => {
                format!("\\weapontag{{Projectile}} ({}/{})", close, long)
            }
            Self::Resonating => r"\weapontag{Resonating}".to_string(),
            Self::Sweeping(count) => format!("\\weapontag{{Sweeping}} ({})", count),
            Self::Subdual => r"\abilitytag{Subdual}".to_string(),
            Self::Thrown(close, long) => format!("\\weapontag{{Thrown}} ({}/{})", close, long),
            Self::VersatileGrip => r"\weapontag{Versatile Grip}".to_string(),
        }
    }

    pub fn modifier(&self) -> Option<Modifier> {
        // TODO: add support for Keen modifier
        match self {
            _ => None,
        }
    }

    // True if the tag should be visible in monster attacks. Purely statistical tags, like Heavy,
    // should be omitted so tags only appear if they are meaningful to a GM.
    pub fn visible_in_monster_tags(&self) -> bool {
        match self {
            Self::Ammunition => false,
            Self::Clinch => true,
            Self::Compact => true,
            Self::Heavy => false,
            Self::Impact => true,
            Self::Keen => true,
            Self::Light => true,
            Self::Long => true,
            Self::Maneuverable => true,
            // The bonus here is assumed wherever it is used
            Self::Mounted => false,
            Self::Parrying => true,
            Self::Projectile(..) => true,
            Self::Resonating => true,
            Self::Sweeping(_) => true,
            Self::Subdual => true,
            Self::Thrown(..) => true,
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
    Club,
    GiantBoulder,
    Greataxe,
    Greatclub,
    Greatmace,
    Greatsword,
    Flail,
    HeavyCrossbow,
    HeavyFlail,
    Javelin,
    Kama,
    Lance,
    Longbow,
    MorningStar,
    MonsterBite,
    MonsterHorn,
    MonsterHorns,
    MonsterPunch,
    MonsterRam,
    MonsterStinger,
    MonsterTentacle,
    Sap,
    Scimitar,
    Sickle,
    Sledgehammer,
    Sling,
    Smallsword,
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
                name: "Battleaxe".to_string(),
                tags: vec![WeaponTag::VersatileGrip],
            },
            Self::Bite => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                name: "Bite".to_string(),
                tags: vec![WeaponTag::Clinch],
            },
            Self::Broadsword => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                name: "Broadsword".to_string(),
                tags: vec![WeaponTag::Sweeping(1), WeaponTag::VersatileGrip],
            },
            Self::Claw => Weapon {
                accuracy: 2,
                damage_dice: DicePool::d4(),
                name: "Claw".to_string(),
                tags: vec![WeaponTag::Light],
            },
            Self::Club => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d8(),
                name: "Club".to_string(),
                tags: vec![],
            },
            Self::Flail => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                name: "Flail".to_string(),
                tags: vec![WeaponTag::Maneuverable],
            },
            Self::GiantBoulder => Weapon {
                // Individual giants can customize these range limits
                accuracy: 0,
                damage_dice: DicePool::d8(),
                name: "Boulder".to_string(),
                tags: vec![WeaponTag::Impact, WeaponTag::Thrown(120, 360)],
            },
            Self::Greataxe => Weapon {
                accuracy: 1,
                damage_dice: DicePool::d8(),
                name: "Greataxe".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Sweeping(1)],
            },
            // Same as greatmace, but for monsters where a mace feels overly industrial
            Self::Greatclub => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d10(),
                name: "Greatclub".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Impact],
            },
            Self::Greatmace => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d10(),
                name: "Greatmace".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Impact],
            },
            Self::Greatsword => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d8(),
                name: "Greatsword".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Sweeping(2)],
            },
            Self::HeavyCrossbow => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d10(),
                name: "Heavy crossbow".to_string(),
                tags: vec![WeaponTag::Projectile(90, 270)],
            },
            Self::HeavyFlail => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d10(),
                name: "Heavy flail".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Maneuverable],
            },
            Self::Javelin => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                name: "Javelin".to_string(),
                tags: vec![WeaponTag::Thrown(60, 120)],
            },
            Self::Kama => Weapon {
                accuracy: 1,
                damage_dice: DicePool::d4(),
                name: "Kama".to_string(),
                tags: vec![WeaponTag::Light, WeaponTag::Sweeping(1)],
            },
            Self::Lance => Weapon {
                // Add the bonus from the Mounted tag
                accuracy: 2,
                damage_dice: DicePool::d10(),
                name: "Lance".to_string(),
                tags: vec![WeaponTag::Ammunition, WeaponTag::Long, WeaponTag::Mounted],
            },
            Self::Longbow => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                name: "Longbow".to_string(),
                tags: vec![WeaponTag::Projectile(90, 270)],
            },
            Self::MorningStar => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d8(),
                name: "Morning star".to_string(),
                tags: vec![WeaponTag::VersatileGrip],
            },
            Self::MonsterBite => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d8(),
                name: "Bite".to_string(),
                tags: vec![WeaponTag::Clinch, WeaponTag::Heavy],
            },
            Self::MonsterHorn => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                name: "Horn".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Impact],
            },
            Self::MonsterHorns => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                name: "Horns".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Impact],
            },
            Self::MonsterPunch => Weapon {
                accuracy: 2,
                damage_dice: DicePool::d4(),
                name: "Punch".to_string(),
                tags: vec![WeaponTag::Light],
            },
            Self::MonsterRam => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                name: "Ram".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Resonating],
            },
            Self::MonsterStinger => Weapon {
                accuracy: 1,
                damage_dice: DicePool::d6(),
                name: "Stinger".to_string().to_string(),
                tags: vec![WeaponTag::Heavy],
            },
            Self::MonsterTentacle => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d8(),
                name: "Tentacle".to_string(),
                tags: vec![WeaponTag::Heavy, WeaponTag::Long],
            },
            Self::Sap => Weapon {
                accuracy: 1,
                damage_dice: DicePool::d3(),
                name: "Sap".to_string(),
                tags: vec![WeaponTag::Compact, WeaponTag::Light, WeaponTag::Subdual],
            },
            Self::Scimitar => Weapon {
                accuracy: 1,
                damage_dice: DicePool::d6(),
                name: "Scimitar".to_string(),
                tags: vec![WeaponTag::Mounted],
            },
            Self::Sickle => Weapon {
                accuracy: 1,
                damage_dice: DicePool::d4(),
                name: "Sickle".to_string(),
                tags: vec![WeaponTag::Light, WeaponTag::Sweeping(1)],
            },
            Self::Sledgehammer => Weapon {
                accuracy: -1,
                damage_dice: DicePool::xdy(2, 6),
                name: "Sledgehammer".to_string(),
                tags: vec![WeaponTag::Resonating, WeaponTag::Heavy],
            },
            Self::Sling => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d4(),
                name: "Sling".to_string(),
                tags: vec![WeaponTag::Projectile(60, 120), WeaponTag::Compact],
            },
            Self::Smallsword => Weapon {
                accuracy: 1,
                damage_dice: DicePool::d4(),
                name: "Smallsword".to_string(),
                tags: vec![WeaponTag::Keen, WeaponTag::Light],
            },
            Self::Spear => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                name: "Spear".to_string(),
                tags: vec![WeaponTag::Thrown(30, 60), WeaponTag::VersatileGrip],
            },
            Self::Talon => Weapon {
                accuracy: 2,
                damage_dice: DicePool::d4(),
                name: "Talon".to_string(),
                tags: vec![WeaponTag::Light, WeaponTag::VersatileGrip],
            },
            Self::Totokia => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d8(),
                name: "Totokia".to_string(),
                tags: vec![WeaponTag::Impact, WeaponTag::VersatileGrip],
            },
            Self::Warhammer => Weapon {
                accuracy: 0,
                damage_dice: DicePool::d6(),
                name: "Warhammer".to_string(),
                tags: vec![WeaponTag::Resonating, WeaponTag::VersatileGrip],
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
    Silver,
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
            Self::Silver => "silver".to_string(),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    mod increase_sweeping {
        use super::*;

        #[test]
        fn adds_new_tag() {
            let mut club = Weapon::club();
            club = club.increase_sweeping(2);

            assert_eq!(club.tags, vec![WeaponTag::Sweeping(2)]);
        }

        #[test]
        fn increases_existing_tag() {
            let mut broadsword = Weapon::broadsword();
            broadsword = broadsword.increase_sweeping(3);

            assert_eq!(
                broadsword.tags,
                vec![WeaponTag::Sweeping(4), WeaponTag::VersatileGrip]
            );
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
