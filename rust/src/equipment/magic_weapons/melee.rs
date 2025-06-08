use crate::core_mechanics::abilities::AbilityTag;
use crate::equipment::MagicWeapon::Melee;
use crate::equipment::{ItemUpgrade, MagicWeapon, StandardItem};

pub fn melee() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.push(Melee(StandardItem {
        name: String::from("Aquatic"),
        rank: 1,
        short_description: String::from("No accuracy penalty in water"),
        description: String::from(
            r"
                You do not take an accuracy penalty with attacks using this weapon while \submerged.
            ",
        ),
        tags: vec![AbilityTag::Water, AbilityTag::personal_attunement()],
        ..MagicWeapon::default()
    }));

    weapons.push(Melee(StandardItem {
        name: String::from("Eager"),
        rank: 3,
        short_description: String::from("Can be drawn quickly, +1 accuracy when drawn"),
        description: String::from(
            r"
                You can draw this weapon as a \glossterm{free action} that does not count as an object manipulation (see \pcref{Manipulating Objects}).
                When you draw this weapon, if you did not also sheathe it this round, you gain a \plus1 \glossterm{enhancement bonus} to \glossterm{accuracy} with strikes using it this round.
            ",
        ),
        upgrades: vec![
            ItemUpgrade::new(7, "Can be drawn quickly, +2 accuracy when drawn", r"
                The accuracy bonus increases to +2.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Melee(StandardItem {
        name: String::from("Reckless"),
        rank: 2,
        short_description: String::from(
            "Grants +1 accuracy and -1 defenses in melee",
        ),
        description: String::from(
            r"
                You gain a +1 \glossterm{enhancement bonus} to \glossterm{accuracy} with \glossterm{melee} strikes using this weapon.
                However, you also take a -1 penalty to all defenses against creatures adjacent to you.
            ",
        ),
        upgrades: vec![
            ItemUpgrade::new(6, "Grants +2 accuracy and -1 defenses in melee",
                "The bonus increases to +2.",
            ),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Melee(StandardItem {
        name: String::from("Vorpal"),
        rank: 7,
        short_description: String::from(r"+1d10 damage, can decapitate foes"),
        description: String::from(r"
            Strikes with this weapon deal 1d10 \glossterm{extra damage}.

            As a standard action, you can make a mundane melee \glossterm<strike>.
            If the target has no remaining \glossterm{damage resistance} and your attack result hits its Reflex defense, the strike deals quadruple damage.
            If the damage dealt by this strike is at least half the creature's maximum hit points, it immediately dies.
            Creatures that do not have a head are immune to this death effect.
        "),
        ..MagicWeapon::default()
    }));

    // weapons.push(Melee(StandardItem {
    //     name: String::from("Ambushing"),
    //     rank: 3,
    //     short_description: String::from(r"Can silently teleport and strike"),
    //     description: String::from(r"
    //         You can activate this weapon as a standard action.
    //         When you do, you \glossterm{teleport} horizontally to a location within \shortrange.
    //         Then, you can make a mundane melee \glossterm{strike} at your destination.
    //         Unlike most teleportation effects, both your departure and arrival with this effect are silent.

    //         After you activate this item, you \glossterm{briefly} cannot activate it again.
    //     "),
    //     upgrades: vec![
    //         ItemUpgrade::new(5, "Can silently teleport and strike", r"
    //             The strike deals double damage against creatures that are at least \partiallyunaware.
    //         "),
    //         ItemUpgrade::new(7, "Can silently teleport and strike", r"
    //             The damage multiplier increases to triple damage.
    //         "),
    //     ],
    //     ..MagicWeapon::default()
    // }));

    weapons
}
