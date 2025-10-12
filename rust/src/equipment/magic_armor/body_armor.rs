use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
use crate::equipment::MagicArmor::Body;
use crate::equipment::{ItemUpgrade, MagicArmor, StandardItem};

pub fn body_armor() -> Vec<MagicArmor> {
    let mut armor = vec![];

    // This is kind of like Wind Screen, but it also helps protect you when enemies knock you
    // prone, which is rare
    armor.push(Body(StandardItem {
        name: String::from("Armor of Scuttling"),
        rank: 2,
        short_description: String::from("Act normally while prone"),
        description: String::from(
            r"
            Being \prone does not reduce your movement speed or defenses.
        ",
        ),
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Armor of Life"),
        rank: 1,
        short_description: String::from("Grants +2 durability"),
        description: String::from(
            r"
            You gain a +2 \glossterm<enhancement bonus> to your \glossterm<durability>.
        ",
        ),
        upgrades: vec![
            ItemUpgrade::new(
                3,
                "Grants +3 durability",
                "The bonus increases to +3.",
            ),
            ItemUpgrade::new(
                5,
                "Grants +4 durability",
                "The bonus increases to +4.",
            ),
            ItemUpgrade::new(
                7,
                "Grants +5 durability",
                "The bonus increases to +5.",
            ),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Hidden Armor"),
        rank: 1,
        short_description: String::from("Can look like normal clothing"),
        description: String::from(r"
             You can activate this armor as a standard action.
             If you do, it appears to change shape and form to assume the shape of a normal set of clothing.
             You may choose the design of the clothing.
             The item retains all of its properties, including weight and sound, while disguised in this way.
             Only its visual appearance is altered.
             An observer can recognize the armor's true nature with a \glossterm{difficulty value} 15 Awareness check.

             You can suppress or resume this effect as a \glossterm{free action} once per round.
        "),
        upgrades: vec![
            ItemUpgrade::new(3, "Can look and sound like normal clothing", "
                The sound and texture of the armor are also appropriate to its disguised form while disguised, and the Awareness DV increases to 25.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Stonebody Armor"),
        rank: 2,
        short_description: String::from("Grants +4 durability, but slower and heavier"),
        description: String::from(
            r"
            You gain a +4 \glossterm<enhancement bonus> to your \glossterm{durability}.
            However, you take a -10 foot penalty to your speed with all movement modes.
        ",
        ),
        upgrades: vec![
            ItemUpgrade::new(
                4,
                "Grants +6 durability, but slower and heavier",
                "
                The bonus increases to +6.
            ",
            ),
            ItemUpgrade::new(
                6,
                "Grants +8 durability, but slower and heavier",
                "
                The bonus increases to +8.
            ",
            ),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Lithe Armor"),
        rank: 1,
        short_description: String::from("Grants +1 Armor if you have 3 Dex"),
        description: String::from(r"
            If your Dexterity is at least 3, you gain a +1 \glossterm<enhancement bonus> to your Armor defense.
        "),
        upgrades: vec![
            // -1 rank for Dex requirement
            ItemUpgrade::new(6, "Grants +2 Armor if you have 5 Dex", "
                The bonus increases to +2 if your Dexterity is at least 5.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Hefty Armor"),
        rank: 1,
        short_description: String::from("Grants +2 Brawn"),
        description: String::from(
            r"
            You gain a +2 \glossterm<enhancement bonus> to your Brawn defense.
        ",
        ),
        upgrades: vec![
            ItemUpgrade::new(
                4,
                "Grants +3 Brawn",
                "
                The bonus increases to +3.
            ",
            ),
            ItemUpgrade::new(
                7,
                "Grants +4 Brawn",
                "
                The bonus increases to +4.
            ",
            ),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Evasive Armor"),
        rank: 1,
        short_description: String::from("Grants +2 Reflex"),
        description: String::from(
            r"
            You gain a +2 \glossterm<enhancement bonus> to your Reflex defense.
        ",
        ),
        upgrades: vec![
            ItemUpgrade::new(
                4,
                "Grants +3 Reflex",
                "
                The bonus increases to +3.
            ",
            ),
            ItemUpgrade::new(
                7,
                "Grants +4 Reflex",
                "
                The bonus increases to +4.
            ",
            ),
        ],
        ..MagicArmor::default()
    }));
    // No Mental defense from armor

    armor.push(Body(StandardItem {
        name: String::from("Trimmed Armor"),
        rank: 5,
        short_description: String::from("Reduces Dex penalty from non-light armor"),
        description: String::from(r"
            If your Dexterity bonus to your Armor is reduced by at least 2 due to your armor, you gain a \plus2 \glossterm{enhancement bonus} to your Armor defense.
            This typically requires a Dexterity of 4.
        "),
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Lifeweave Armor"),
        rank: 3,
        short_description: String::from("Grants +5 durability, but -1 vital rolls"),
        description: String::from(r"
            You gain a +5 \glossterm{enhancement bonus} to your \glossterm{durability.}
            However, you also take a \minus1 penalty to your \glossterm{vital rolls}.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants +6 durability, but -1 vital rolls", "
                The bonus increases to +6.
            "),
            ItemUpgrade::new(7, "Grants +8 durability, but -1 vital rolls", "
                The bonus increases to +8.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Soulweave Armor"),
        rank: 3,
        short_description: String::from("Grants +5 durability, but -2 power"),
        description: String::from(
            r"
            You gain a +5 \glossterm<enhancement bonus> to your \glossterm{durability}.
            However, you take a -2 penalty to your \glossterm{power} with all abilities.
        ",
        ),
        upgrades: vec![
            ItemUpgrade::new(
                5,
                "Grants +6 durability, but -3 power",
                "
                    The durability bonus increases to +6, but the power penalty increases to -3.
                ",
            ),
            ItemUpgrade::new(
                7,
                "Grants +8 durability, but -4 power",
                "
                    The durability bonus increases to +8, but the power penalty increases to -4.
                ",
            ),
        ],
        ..MagicArmor::default()
    }));

    // TODO: calculate EA for movement effects
    armor.push(Body(StandardItem {
        name: String::from("Swiftstep Armor"),
        rank: 5,
        short_description: String::from("Removes armor speed penalty"),
        description: String::from(r"
            This armor does not penalize your movement speed for being heavy (see \pcref<Armor Usage Classes>).
            If the armor is not heavy armor, this has no effect.
        "),
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Voidsoul Armor"),
        rank: 5,
        short_description: String::from("Immune to conditions, but hit points are halved"),
        description: String::from(
            r"
            Your maximum \glossterm<hit points> are halved.
            However, you are immune to \glossterm<conditions>.
        ",
        ),
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Grafted Armor"),
        rank: 2,
        short_description: String::from("Grants Fortitude instead of Armor defense and +2 durability"),
        description: String::from(r"
            This armor does not increase your Armor defense.
            Instead, you gain an \glossterm{enhancement bonus} to your Fortitude defense equal to the Armor defense bonus the armor would normally provide.
            In addition, the armor grants you a +2 \glossterm{enhancement bonus} to your \glossterm{durability}.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Grants Fortitude instead of Armor defense and +3 durability", r"
                The durability bonus increases to +3.
            "),
            ItemUpgrade::new(6, "Grants Fortitude instead of Armor defense and +4 durability", r"
                The durability bonus increases to +4.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Armor of Transfusion"),
        rank: 3,
        short_description: String::from("Regain 2d8 HP per round"),
        description: String::from(
            r"
            At the end of each round, you regain 2d8 \glossterm{hit points}.
        ",
        ),
        upgrades: vec![
            ItemUpgrade::new(
                5,
                "Regain 4d10 HP per round",
                "
                The healing increases to 4d10.
            ",
            ),
            ItemUpgrade::new(
                7,
                "Regain 8d10 HP per round",
                "
                The healing increases to 8d10.
            ",
            ),
        ],
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Fortifying Armor"),
        rank: 1,
        short_description: String::from("Fortifies you if you have 3 Con"),
        description: String::from(r"
            If your Constitution is at least 3, you are \fortified.
        "),
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        upgrades: vec![
            ItemUpgrade::new(7, "Fortifies you if you have 5 Con", r"
                This item does not require \glossterm{deep attunement}, but it requires 5 Constitution.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor
}
