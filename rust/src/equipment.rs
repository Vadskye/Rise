pub mod armor;
pub mod weapons;

pub trait HasWeapons {
    fn add_weapon(&mut self, weapon: weapons::Weapon);
    fn weapons(&self) -> Vec<&weapons::Weapon>;
}
