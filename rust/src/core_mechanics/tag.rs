use crate::core_mechanics::abilities::AbilityTag;
use crate::equipment::WeaponTag;

#[derive(Clone, Debug)]
pub enum Tag {
    Ability(AbilityTag),
    Weapon(WeaponTag),
}

impl Tag {
    pub fn latex(&self) -> String {
        match self {
            Self::Ability(t) => t.latex(),
            Self::Weapon(t) => t.latex(),
        }
    }
}
