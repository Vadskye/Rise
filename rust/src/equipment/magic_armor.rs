use crate::equipment::{item_latex, StandardItem};
use crate::core_mechanics::abilities::{AttuneType, AbilityTag};
mod body_armor;
mod shields;

#[derive(Clone, Debug)]
pub enum MagicArmor {
    Body(StandardItem),
    Shield(StandardItem),
}

impl MagicArmor {
    fn item(&self) -> &StandardItem {
        match self {
            Self::Body(item) => item,
            Self::Shield(item) => item,
        }
    }

    pub fn default() -> StandardItem {
        return StandardItem {
            magical: true,
            tags: vec![AbilityTag::Attune(AttuneType::Personal)],
            ..Default::default()
        }
    }

    pub fn to_latex(&self) -> String {
        item_latex(self.item().clone(), false, &self.crafting_latex())
    }

    fn crafting_latex(&self) -> String {
        String::from(match self {
            Self::Body(_) => "Body armor (bone, leather, or metal)",
            Self::Shield(_) => "Shield (bone, metal, or wood)",
        })
    }
}

pub fn all_magic_armor() -> Vec<MagicArmor> {
    let mut armor = vec![];

    armor.append(&mut body_armor::body_armor());
    armor.append(&mut shields::shields());

    armor.sort_by(|a, b| a.item().name.cmp(&b.item().name));

    armor
}
