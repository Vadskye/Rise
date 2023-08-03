use crate::equipment::{item_latex, StandardItem};
use crate::core_mechanics::abilities::{AttuneType, AbilityTag};
mod arms;
mod head;
mod jewelry;
mod legs;
mod torso;

#[derive(Clone, Debug)]
pub enum Apparel {
    Amulet(StandardItem),
    Belt(StandardItem),
    Blindfold(StandardItem),
    Boots(StandardItem),
    Bracer(StandardItem),
    Bracers(StandardItem),
    Circlet(StandardItem),
    Cloak(StandardItem),
    Crown(StandardItem),
    Gauntlet(StandardItem),
    Gauntlets(StandardItem),
    Greaves(StandardItem),
    Glove(StandardItem),
    Gloves(StandardItem),
    Mask(StandardItem),
    Ring(StandardItem),
}

impl Apparel {
    fn item(&self) -> &StandardItem {
        match self {
            Self::Amulet(item) => item,
            Self::Belt(item) => item,
            Self::Blindfold(item) => item,
            Self::Boots(item) => item,
            Self::Bracer(item) => item,
            Self::Bracers(item) => item,
            Self::Circlet(item) => item,
            Self::Cloak(item) => item,
            Self::Crown(item) => item,
            Self::Gauntlet(item) => item,
            Self::Gauntlets(item) => item,
            Self::Glove(item) => item,
            Self::Gloves(item) => item,
            Self::Greaves(item) => item,
            Self::Mask(item) => item,
            Self::Ring(item) => item,
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
            Self::Amulet(_) => "Amulet -- Craft (bone, metal, or wood)",
            Self::Belt(_) => "Belt -- Craft (leather or textiles)",
            Self::Blindfold(_) => "Blindfold -- Craft (textiles)",
            Self::Boots(_) => "Boots -- Craft (bone, leather, or metal)",
            Self::Bracer(_) => "Bracer -- Craft (bone, metal, or wood)",
            Self::Bracers(_) => "Bracers -- Craft (bone, metal, or wood)",
            Self::Circlet(_) => "Circlet -- Craft (bone or metal)",
            Self::Cloak(_) => "Cloak -- Craft (leather or textiles)",
            Self::Crown(_) => "Crown -- Craft (bone or metal)",
            Self::Gauntlet(_) => "Gauntlet -- Craft (bone, metal, or wood)",
            Self::Gauntlets(_) => "Gauntlets -- Craft (bone, metal, or wood)",
            Self::Glove(_) => "Glove -- Craft (leather or textiles)",
            Self::Gloves(_) => "Gloves -- Craft (leather or textiles)",
            Self::Greaves(_) => "Greaves -- Craft (bone or metal)",
            Self::Mask(_) => "Mask -- Craft (textiles)",
            Self::Ring(_) => "Ring -- Craft (bone, metal, or wood)",
        })
    }
}

pub fn all_apparel() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.append(&mut arms::arms());
    apparel.append(&mut head::head());
    apparel.append(&mut jewelry::jewelry());
    apparel.append(&mut legs::legs());
    apparel.append(&mut torso::torso());

    apparel.sort_by(|a, b| a.item().name.cmp(&b.item().name));

    apparel
}
