use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
use crate::equipment::{item_latex, ItemUpgrade, MagicWeapon::Weapon, StandardItem};

#[derive(Clone, Debug)]
pub enum MagicWeapon {
    // TODO: are there any meaningful subtype divisions?
    Weapon(StandardItem),
}

impl MagicWeapon {
    fn item(&self) -> &StandardItem {
        match self {
            Self::Weapon(item) => item,
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
            Self::Weapon(_) => "Weapon -- Craft (as base weapon)",
        })
    }
}

pub fn all_magic_weapons() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.append(&mut energy_weapons());
    weapons.append(&mut melee_weapons());

    weapons.sort_by(|a, b| a.item().name.cmp(&b.item().name));

    weapons
}

fn energy_weapons() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons
}

fn melee_weapons() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.push(Weapon(StandardItem {
        name: String::from("Reckless"),
        rank: 3,
        short_description: String::from(
            "Grants +1 accuracy and -1 defenses against adjacent creatures",
        ),
        description: String::from(
            r"
                You gain a +1 accuracy bonus against creatures adjacent to you.
                However, you also take a -1 penalty to all defenses against creatures adjacent to you.
            ",
        ),
        upgrades: vec![ItemUpgrade::new(
            6,
            "Grants +2 accuracy and -2 defenses against adjacent creatures",
            "
                The bonus and penalty both increase to +2.
            ",
        )],
        ..MagicWeapon::default()
    }));

    weapons.push(Weapon(StandardItem {
        name: String::from("Frenzied"),
        rank: 4,
        short_description: String::from(
            "Grants +1 accuracy with continuous strikes",
        ),
        description: String::from(
            r"
                Whenever you make a \\glossterm<strike>, you \\glossterm<briefly> gain a +1 bonus to \\glossterm<accuracy> with \\glossterm<strikes>.
                As normal, this bonus does not stack with itself.
            ",
        ),
        upgrades: vec![ItemUpgrade::new(
            7,
            "Grants +2 accuracy with continuous strikes",
            "
                The bonus increases to +2.
            ",
        )],
        ..MagicWeapon::default()
    }));

    weapons
}
