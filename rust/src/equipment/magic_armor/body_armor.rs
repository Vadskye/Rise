use crate::equipment::{MagicArmor, ItemUpgrade, StandardItem};
use crate::equipment::MagicArmor::Body;
use crate::core_mechanics::abilities::{AttuneType, AbilityTag};

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

    armor.push(Body(StandardItem {
        name: String::from("Resistant Armor"),
        rank: 2,
        short_description: String::from("Grants +6 damage resistance"),
        description: String::from(r"
            You gain a +6 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Grants +12 damage resistance", "
                The bonus increases to +12.
            "),
            ItemUpgrade::new(6, "Grants +24 damage resistance", "
                The bonus increases to +24.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Featherlight Armor"),
        rank: 1,
        short_description: String::from("Reduces encumbrance by 1"),
        description: String::from(r"
            This armor's \\glossterm<encumbrance> is reduced by 1.
        "),
        upgrades: vec![
            ItemUpgrade::new(3, "Reduces encumbrance by 2", "
                The encumbrance reduction improves to 2.
            "),
            ItemUpgrade::new(5, "Reduces encumbrance by 3", "
                The encumbrance reduction improves to 2.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Fortified Armor"),
        rank: 3,
        short_description: String::from("Reduces critical hits from strikes"),
        description: String::from(r"
            You gain a +4 \glossterm{magic bonus} to your defenses when determining whether a \\glossterm<strike> gets a \\glossterm<critical hit> against you instead of a normal hit.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Reduces critical hits from strikes", "
                The bonus applies against all attacks, not just strikes.
            "),
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
             This effect lasts until you revert it as a standard action.
        "),
        upgrades: vec![
            ItemUpgrade::new(3, "Can look and sound like normal clothing", "
                The armor also makes sound appropriate to its disguised form while disguised.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Stonebody Armor"),
        rank: 2,
        short_description: String::from("Grants +12 damage resistance, but slower and heavier"),
        description: String::from(r"
            You gain a +12 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
            However, you take a -10 foot penalty to your speed with all movement modes.
            In addition, this armor's \glossterm{encumbrance} is increased by 2.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Grants +24 damage resistance, but slower and heavier", "
                The bonus increases to +24.
            "),
            ItemUpgrade::new(6, "Grants +48 damage resistance, but slower and heavier", "
                The bonus increases to +48.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Lithe Armor"),
        rank: 4,
        short_description: String::from("Grants +1 AD if you have 3 Dex"),
        description: String::from(r"
            If your Dexterity is at least 3, you gain a +1 \\glossterm<magic bonus> to your Armor defense.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Grants +2 AD if you have 5 Dex", "
                The bonus increases to +2 if your Dexterity is at least 5.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Lifeweave Armor"),
        rank: 3,
        short_description: String::from("Grants +16 damage resistance, but -8 hit points"),
        description: String::from(r"
            You gain a +16 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
            However, you take a -8 penalty to your \\glossterm<hit points>.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants +32 damage resistance, but -16 hit points", "
                The damage resistance bonus increases to +32, but the hit point penalty increases to -16.
            "),
            ItemUpgrade::new(7, "Grants +64 damage resistance, but -32 hit points", "
                The damage resistance bonus increases to +64, but the hit point penalty increases to -32.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Soulweave Armor"),
        rank: 3,
        short_description: String::from("Grants +12 damage resistance, but -2 power"),
        description: String::from(r"
            You gain a +12 \\glossterm<magic bonus> to your \\glossterm<damage resistance>.
            However, you take a -2 penalty to your \glossterm{power} with all abilities.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants +24 damage resistance, but -3 power", "
                The damage resistance bonus increases to +24, but the power penalty increases to -3.
            "),
            ItemUpgrade::new(7, "Grants +48 damage resistance, but -4 power", "
                The damage resistance bonus increases to +48, but the power penalty increases to -4.
            "),
        ],
        ..MagicArmor::default()
    }));
    
    armor.push(Body(StandardItem {
        name: String::from("Swiftstep Armor"),
        rank: 5,
        short_description: String::from("Removes armor speed penalty"),
        description: String::from(r"
            This armor does not penalize your movement speed for being heavy (see \\pcref<Armor Usage Classes>).
            If the armor is not heavy armor, this has no effect.
        "),
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Crumpling Armor"),
        rank: 3,
        short_description: String::from("Reduces physical damage from two attacks by 10"),
        description: String::from(r"
            Whenever you would take \\glossterm<physical damage>, your armor crumples under the attack, reducing that damage by 10.
            After damage is reduced twice in this way, this has no effect until you finish a \\glossterm<short rest>.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Reduces physical damage from two attacks by 20", "
                The damage reduction improves to 20.
            "),
            ItemUpgrade::new(7, "Reduces physical damage from two attacks by 40", "
                The damage reduction improves to 40.
            "),
        ],
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        ..MagicArmor::default()
    }));

    armor.push(Body(StandardItem {
        name: String::from("Voidsoul Armor"),
        rank: 5,
        short_description: String::from("Immune to conditions, but hit points are halved"),
        description: String::from(r"
            Your maximum \\glossterm<hit points> are halved.
            However, you are immune to \\glossterm<conditions>.
        "),
        ..MagicArmor::default()
    }));

    
    armor
}
