use crate::equipment::{MagicArmor, ItemUpgrade, StandardItem};
use crate::equipment::MagicArmor::Body;

pub fn body_armor() -> Vec<MagicArmor> {
    let mut armor = vec![];

    armor.push(Body(StandardItem {
        name: String::from("Armor of Scuttling"),
        rank: 1,
        short_description: String::from("Move at full speed while prone"),
        description: String::from(r"
            Being \prone does not reduce your movement speed.
        "),
        upgrades: vec![
            ItemUpgrade::new(3, "Move at full speed and defend normally while prone", "
                Being prone also does not reduce your defenses.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor
}
