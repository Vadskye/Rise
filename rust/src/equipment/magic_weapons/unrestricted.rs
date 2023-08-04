use crate::equipment::{MagicWeapon, ItemUpgrade, StandardItem};
use crate::equipment::MagicWeapon::Unrestricted;

pub fn unrestricted() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.append(&mut energy_weapons());

    weapons.push(Unrestricted(StandardItem {
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

fn energy_weapons() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons
}
