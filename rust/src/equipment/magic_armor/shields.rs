use crate::equipment::{MagicArmor, ItemUpgrade, StandardItem};
use crate::equipment::MagicArmor::Shield;

pub fn shields() -> Vec<MagicArmor> {
    let mut armor = vec![];

    armor.push(Shield(StandardItem {
        name: String::from("Crater Boots"),
        rank: 4,
        short_description: String::from("Deals your falling damage to enemies"),
        description: String::from(r"
            Whenever you take \\glossterm<falling damage>, make an attack vs. Reflex against everything within a \\areasmall radius from you.
            \\hit You deal each target bludgeoning damage equal to half the damage you took from falling.
            If you reduce or avoid the falling damage, that also affects you damage you deal with these boots.
            \\crit Each target is also knocked \\prone.
            This attack does not deal extra damage on a critical hit.
        "),
        ..MagicArmor::default()
    }));

    armor
}
