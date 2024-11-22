use crate::equipment::{MagicWeapon, ItemUpgrade, StandardItem};
use crate::equipment::MagicWeapon::Ranged;

pub fn ranged() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.push(Ranged(StandardItem {
        name: String::from("Longshot"),
        rank: 2,
        short_description: String::from(r"Reduces longshot penalty by 1"),
        description: String::from(r"
            When you make a ranged attack using this weapon, you reduce your \glossterm<longshot penalty> by 1.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Reduces longshot penalty by 2", r"
                The penalty reduction increases to 2.
            "),
        ],
        ..MagicWeapon::default()
    }));

    // The special throw is similar to Ricochet, with slightly different range restrictions.
    weapons.push(Ranged(StandardItem {
        name: String::from("Boomerang"),
        rank: 3,
        short_description: String::from(r"Can be thrown to strike three nearby foes"),
        description: String::from(r"
            After being thrown, this weapon flies back into your hand immediately after attacking all targets.
            If you can't catch it, the weapon drops to the ground in the square from which it was thrown.

            As a standard action, you can throw this weapon in a spinning arc.
            When you do, make a mundane thrown \glossterm<strike> against up to three targets within \shortrange.
            The targets must still be within your \glossterm<range limits>, and you take any \glossterm<longshot penalty> as normal.
        "),
        upgrades: vec![
            // This is slightly under rate
            ItemUpgrade::new(5, "Can be thrown to accurately strike three nearby foes", r"
                You gain a +2 accuracy bonus with the spinning arc strike.
            "),
            // This is slightly over rate
            ItemUpgrade::new(7, "Can be thrown to accurately strike three nearby foes", r"
                The spinning arc strike deals double \glossterm{weapon damage}.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Ranged(StandardItem {
        name: String::from("Returning"),
        rank: 1,
        short_description: String::from(r"Flies back to you after being thrown"),
        description: String::from(r"
            After being thrown, this weapon flies back into your hand at the end of the current round as long as it is still \glossterm<unattended>.
            If you can't catch it, the weapon drops to the ground in the square from which it was thrown.
        "),
        ..MagicWeapon::default()
    }));

    weapons.push(Ranged(StandardItem {
        name: String::from("Jaunting"),
        rank: 4,
        short_description: String::from(r"Flies back to you after being thrown"),
        description: String::from(r"
            When you throw this weapon, it teleports directly from your hand to your intended target.
            This allows you to ignore any intervening \glossterm<cover> with the attack, as long as you still have \glossterm{line of effect}.

            The weapon teleports back into your hand immediately after hitting or missing all targets of the strike.
            If you can't catch it, the weapon drops to the ground in the square from which it was thrown.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Teleports long distances when thrown", r"
                You also reduces your \glossterm{longshot penalty} with thrown attacks using the weapon by 2.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Ranged(StandardItem {
        name: String::from("Phasing"),
        rank: 3,
        short_description: String::from(r"Can pass through small obstacles"),
        description: String::from(r"
            All \glossterm<strikes> with this weapon, including projectiles fired by this weapon, can pass through a single solid obstacle of up to one foot thick on the way to their target.
            This can allow you to ignore \glossterm<cover>, or even attack without \glossterm{line of effect}.
            It does not allow you to ignore any equipment used by the target of your attack.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Can pass through obstacles", r"
                Your strikes can penetrate through any number of solid objects with a combined thickness of ten feet or less.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons
}
