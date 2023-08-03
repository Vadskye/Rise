use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
use crate::equipment::{item_latex, ItemUpgrade, StandardItem};
mod staffs;
mod rods;
mod wands;

#[derive(Clone, Debug)]
pub enum Implement {
    Staff(StandardItem),
    Rod(StandardItem),
    Wand(StandardItem),
}

impl Implement {
    fn item(&self) -> &StandardItem {
        match self {
            Self::Staff(item) => item,
            Self::Rod(item) => item,
            Self::Wand(item) => item,
        }
    }

    pub fn default() -> StandardItem {
        return StandardItem {
            magical: true,
            tags: vec![AbilityTag::Attune(AttuneType::Personal)],
            ..Default::default()
        };
    }

    pub fn to_latex(&self) -> String {
        item_latex(self.item().clone(), false, &self.crafting_latex())
    }

    fn crafting_latex(&self) -> String {
        String::from(match self {
            Self::Staff(_) => "Staff -- Craft (bone or wood)",
            Self::Rod(_) => "Rod -- Craft (bone, metal, or wood)",
            Self::Wand(_) => "Staff -- Craft (bone or wood)",
        })
    }
}

pub fn all_implements() -> Vec<Implement> {
    let mut implements = vec![];

    implements.append(&mut staffs::staffs());
    implements.append(&mut rods::rods());
    implements.append(&mut wands::wands());

    implements.sort_by(|a, b| a.item().name.cmp(&b.item().name));

    implements
}
