use crate::equipment::{MagicWeapon, ItemUpgrade, StandardItem};
use crate::equipment::MagicWeapon::Melee;

pub fn melee() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.push(Melee(StandardItem {
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

    weapons
}
