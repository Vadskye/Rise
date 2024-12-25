use crate::equipment::{MagicArmor, ItemUpgrade, StandardItem};
use crate::equipment::MagicArmor::Shield;
use crate::core_mechanics::abilities::AbilityTag;

pub fn shields() -> Vec<MagicArmor> {
    let mut armor = vec![];

    armor.push(Shield(StandardItem {
        name: String::from("Shield of Arrow Catching"),
        rank: 1,
        short_description: String::from("Redirects nearby projectiles to hit you"),
        description: String::from(r"
            Whenever an \glossterm<ally> within a \areasmall radius emanation from you is targeted by ranged \glossterm<strike>, the attack is redirected to target you instead.
            Resolve the attack as if it had initially targeted you, except that the attack is not affected by cover or any \glossterm{miss chance}.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Redirects projectiles to hit you", r"
                The area increases to a \largearea radius.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Shield(StandardItem {
        name: String::from("Shield of Arrow Deflection"),
        rank: 2,
        short_description: String::from("Grants +2 defenses vs ranged strikes"),
        description: String::from(r"
            You gain a +2 \glossterm{enhancement bonus} to your defenses against ranged \glossterm<strikes>.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Grants +4 defenses vs ranged strikes", "
                The bonus increases to +4.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Shield(StandardItem {
        name: String::from("Shield of Arrow Reflection"),
        rank: 2,
        short_description: String::from("Reflects missed ranged strikes"),
        description: String::from(r"
            Whenever a creature within \longrange of you misses or \glossterm<glances> you with a ranged \glossterm<strike>, it treats itself as a target of that attack in addition to any other targets.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Precisely reflects missed ranged strikes", "
                The attacker takes a -4 penalty to all defenses against attacks reflected in this way.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Shield(StandardItem {
        name: String::from("Covering Shield"),
        rank: 3,
        short_description: String::from("Grants +2 Armor during total defense"),
        description: String::from(r"
            When you use the \textit<total defense> ability, you gain a +2 bonus to Armor defense in addition to the normal bonuses from taking that action (see \pcref<Total Defense>).
            This property cannot be applied to tower shields.
        "),
        ..MagicArmor::default()
    }));

    armor.push(Shield(StandardItem {
        name: String::from("Hardblock Shield"),
        rank: 3,
        short_description: String::from("Imposes -1 Armor penalty when creatures miss you"),
        description: String::from(r"
            Whenever a creature misses or \glossterm<glances> you with a melee \glossterm<strike>, it \glossterm<briefly> takes a -1 penalty to Armor defense.
            As normal, this bonus does not stack with itself, even if the same creature misses you with multiple melee attacks.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Imposes -1 Armor penalty when creatures miss you", "
                The penalty increases to -2.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Shield(StandardItem {
        name: String::from("Defender's Shield"),
        rank: 5,
        short_description: String::from("Grants +1 Armor defense"),
        description: String::from(r"
            You gain a +1 \glossterm<enhancement bonus> to your Armor defense.
        "),
        ..MagicArmor::default()
    }));

    armor.push(Shield(StandardItem {
        name: String::from("Soulguard Shield"),
        rank: 3,
        short_description: String::from(r"Grants 25\% chance to avoid conditions"),
        description: String::from(r"
            Whenever you would be affected by a \glossterm<condition>, you have a 25\% chance to avoid gaining that condition.
            This does not prevent any other effects of the attack.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, r"Grants 50\% chance to avoid conditions", r"
                The chance increases to 50\%.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Shield(StandardItem {
        name: String::from("Shield of Mystic Reflection"),
        rank: 4,
        short_description: String::from(r"Can reflect magical attacks"),
        description: String::from(r"
            Whenever you use the \ability<total defense> ability, you can activate this shield.
            When you do, any \glossterm<targeted> \magical abilities that target you this round also target the creature using that ability in addition to you.
            It cannot choose to reduce its accuracy or damage against itself.
            Any other targets of the ability are affected normally.
        "),
        ..MagicArmor::default()
    }));

    // t2 condition in t2 area is rank 5 base. rank 3 from immunity effect.
    armor.push(Shield(StandardItem {
        name: String::from("Shield of Medusa"),
        rank: 3,
        short_description: String::from("Can slow viewers"),
        description: String::from(r"
            This shield normally has a cloth covering its face.
            As a standard action, you can pull the cloth back and reveal the horrifying face emblazoned on the shield.
            If the cloth is prematurely pulled back, allowing creatures to see the shield without a dramatic reveal, the shield has no effect on them.

            When you activate the shield, make an attack vs. Fortitude against all creatures within a \medarea cone.
            Your minimum accuracy is $accuracy.
            Whether you hit or miss, each creature who can see the face is immune to this ability until it finishes a \glossterm<short rest>.

            \hit Each target is \slowed as a \glossterm{condition}.
            During this condition, if it takes a \glossterm{vital wound} that leaves it unconscious, it immediately dies.
            When a creature dies in this way, its body is petrified in the form of a stone statue.
            \critcondition
        "),
        upgrades: vec![
            ItemUpgrade::new(7, r"Can slow and deal $dr5l damage over time to viewers", r"
                Your minimum accuracy increases to $accuracy, and the condition also causes each target to take $dr5l physical damage during each of your subsequent actions.
            "),
        ],
        tags: vec![AbilityTag::Visual],
        ..MagicArmor::default()
    }));

    armor
}
