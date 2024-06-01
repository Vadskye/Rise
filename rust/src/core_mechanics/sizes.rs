use crate::creatures::Creature;
use crate::equipment::WeaponTag;

#[derive(Clone, Debug, Default)]
pub enum Size {
    Fine,
    Diminutive,
    Tiny,
    Small,
    #[default]
    Medium,
    Large,
    Huge,
    Gargantuan,
    Colossal,
}

impl Size {
    pub fn base_speed(&self) -> i32 {
        match self {
            Size::Fine => 5,
            Size::Diminutive => 10,
            Size::Tiny => 15,
            Size::Small => 20,
            Size::Medium => 30,
            Size::Large => 40,
            Size::Huge => 50,
            Size::Gargantuan => 60,
            Size::Colossal => 80,
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Size::Fine => "Fine",
            Size::Diminutive => "Diminutive",
            Size::Tiny => "Tiny",
            Size::Small => "Small",
            Size::Medium => "Medium",
            Size::Large => "Large",
            Size::Huge => "Huge",
            Size::Gargantuan => "Gargantuan",
            Size::Colossal => "Colossal",
        }
    }

    pub fn reflex_modifier(&self) -> i32 {
        match self {
            Size::Fine => 4,
            Size::Diminutive => 3,
            Size::Tiny => 2,
            Size::Small => 1,
            Size::Medium => 0,
            Size::Large => -1,
            Size::Huge => -2,
            Size::Gargantuan => -3,
            Size::Colossal => -4,
        }
    }

    // TODO: use this for stealth calculations
    pub fn stealth_modifier(&self) -> i32 {
        match self {
            Size::Fine => 20,
            Size::Diminutive => 15,
            Size::Tiny => 10,
            Size::Small => 5,
            Size::Medium => 0,
            Size::Large => -5,
            Size::Huge => -10,
            Size::Gargantuan => -15,
            Size::Colossal => -20,
        }
    }

    pub fn space(&self) -> f64 {
        match self {
            Size::Fine => 0.25,
            Size::Diminutive => 0.5,
            Size::Tiny => 1.0,
            Size::Small => 2.5,
            Size::Medium => 5.0,
            Size::Large => 10.0,
            Size::Huge => 20.0,
            Size::Gargantuan => 40.0,
            Size::Colossal => 80.0,
        }
    }

    pub fn is_massive(&self) -> bool {
        match self {
            Size::Huge => true,
            Size::Gargantuan => true,
            Size::Colossal => true,
            _ => false,
        }
    }

    pub fn massive_weapon_tag(&self) -> Option<WeaponTag> {
        match self {
            Size::Huge => Some(WeaponTag::Massive(10)),
            Size::Gargantuan => Some(WeaponTag::Massive(15)),
            Size::Colossal => Some(WeaponTag::Massive(20)),
            _ => None,
        }
    }
}

pub trait HasSize {
    fn set_size(&mut self, size: Size);
    fn get_size(&self) -> &Size;
}

impl HasSize for Creature {
    fn set_size(&mut self, size: Size) {
        self.size = size;
    }
    fn get_size(&self) -> &Size {
        &self.size
    }
}
