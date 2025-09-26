use crate::equipment::MagicWeapon::Ranged;
use crate::equipment::{ItemUpgrade, MagicWeapon, StandardItem};

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
        short_description: String::from(r"Hits an extra target while returning"),
        description: String::from(r"
            After being thrown, this weapon flies back into your hand immediately after attacking all targets.
            If you can't catch it, the weapon drops to the ground in the square from which it was thrown.

            In addition, whenever you make a thrown \glossterm{strike} with this weapon, choose one creature within a line between you and one target of the strike.
            The strike also targets that creature in addition to any other targets.
        "),
        upgrades: vec![
            // -1dr for the full boomerang effect is suspicious
            ItemUpgrade::new(5, "+1d4 damage, hits an extra target while returning", r"
                The weapon also deals 1d4 \glossterm{extra damage} when thrown.
            "),
            ItemUpgrade::new(7, "+1d8 damage, hits an extra target while returning", r"
                The extra damage increases to 1d8.
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
        rank: 5,
        short_description: String::from(r"Teleports when thrown"),
        description: String::from(r"
            When you make a thrown \glossterm{strike} using this weapon, it teleports directly from your hand to your intended target.
            This gives you a +1 \glossterm{enhancement bonus} to \glossterm{accuracy} with the strike and allows you to ignore any intervening \glossterm<cover> with the attack, as long as you still have \glossterm{line of effect}.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Teleports long distances when thrown", r"
                You also reduce your \glossterm{longshot penalty} with thrown attacks using the weapon by 2.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Ranged(StandardItem {
        name: String::from("Phasing"),
        rank: 3,
        short_description: String::from(r"Can pass through small obstacles"),
        description: String::from(r"
            All \glossterm<strikes> with this weapon, including projectiles fired by this weapon, can pass through a single solid \glossterm{unattended} obstacle of up to one foot thick on the way to their target.
            This can allow you to ignore \glossterm<cover>, or even attack without \glossterm{line of effect}.
            It does not allow you to ignore any equipment used by the target of your attack.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Can pass through obstacles", r"
                Your strikes can penetrate through any number of solid \glossterm{unattended} objects with a combined thickness of five feet or less.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons
}
