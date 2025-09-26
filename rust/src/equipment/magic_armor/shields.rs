use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
use crate::equipment::MagicArmor::Shield;
use crate::equipment::{ItemUpgrade, MagicArmor, StandardItem};

pub fn shields() -> Vec<MagicArmor> {
    let mut armor = vec![];

    // TODO: unclear EA
    armor.push(Shield(StandardItem {
        name: String::from("Shield of Arrow Catching"),
        rank: 1,
        short_description: String::from("Redirects nearby projectiles to hit you"),
        description: String::from(r"
            Whenever an \glossterm<ally> adjacent to you is targeted by a ranged \glossterm<strike>, the attack is redirected to target you instead.
            Resolve the attack as if it had initially targeted you, except that the attack is not affected by cover or any \glossterm{miss chance}.
        "),
        upgrades: vec![
            ItemUpgrade::new(3, "Redirects projectiles to hit you", r"
                The redirection extends to your allies within a \smallarea radius \glossterm{emanation} from you.
            "),
            ItemUpgrade::new(5, "Redirects projectiles to hit you", r"
                The redirection extends to your allies within a \largearea radius \glossterm{emanation} from you.
            "),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Shield(StandardItem {
        name: String::from("Shield of Arrow Deflection"),
        rank: 1,
        short_description: String::from("Grants +2 defenses vs ranged strikes"),
        description: String::from(
            r"
            You gain a +2 bonus to your defenses against ranged \glossterm<strikes>.
        ",
        ),
        upgrades: vec![
            ItemUpgrade::new(
                4,
                "Grants +3 defenses vs ranged strikes",
                "
                The bonus increases to +3.
            ",
            ),
            ItemUpgrade::new(
                7,
                "Grants +4 defenses vs ranged strikes",
                "
                The bonus increases to +4.
            ",
            ),
        ],
        ..MagicArmor::default()
    }));

    // TODO: unclear EA
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

    // +2 Armor is 1.5 EA. This is active less than half the time, so r1 is fine.
    armor.push(Shield(StandardItem {
        name: String::from("Covering Shield"),
        rank: 1,
        short_description: String::from("Grants +2 Armor during total defense"),
        description: String::from(r"
            When you use the \textit<total defense> ability, you gain a +2 bonus to Armor defense in addition to the normal bonuses from taking that action (see \pcref<Total Defense>).
            This property cannot be applied to tower shields.
        "),
        ..MagicArmor::default()
    }));

    // Normally, +1 tag would be rank 4. Since this only works on shields, it can be rank 3.
    armor.push(Shield(StandardItem {
        name: String::from("Impact Shield"),
        rank: 3,
        short_description: String::from(r"Is \abilitytag{Impact}"),
        description: String::from(
            r"
            This shield gains the \abilitytag{Impact} tag when used as a weapon.
        ",
        ),
        ..MagicArmor::default()
    }));

    armor.push(Shield(StandardItem {
        name: String::from("Defender's Shield"),
        rank: 1,
        short_description: String::from("Grants +1 Armor defense"),
        description: String::from(
            r"
            You gain a +1 \glossterm<enhancement bonus> to your Armor defense.
        ",
        ),
        upgrades: vec![ItemUpgrade::new(
            7,
            "Grants +2 Armor defense",
            "
                The bonus increases to +2.
            ",
        )],
        ..MagicArmor::default()
    }));

    armor.push(Shield(StandardItem {
        name: String::from("Psychic Shield"),
        rank: 1,
        short_description: String::from("Grants +2 Mental defense"),
        description: String::from(
            r"
            You gain a +2 \glossterm<enhancement bonus> to your Mental defense.
        ",
        ),
        upgrades: vec![
            ItemUpgrade::new(
                4,
                "Grants +3 Mental defense",
                "
                The bonus increases to +3.
            ",
            ),
            ItemUpgrade::new(
                7,
                "Grants +4 Mental defense",
                "
                The bonus increases to +4.
            ",
            ),
        ],
        ..MagicArmor::default()
    }));

    armor.push(Shield(StandardItem {
        name: String::from("Soulguard Shield"),
        rank: 4,
        short_description: String::from(r"Grants 50\% chance to avoid conditions"),
        description: String::from(r"
            Whenever you would be affected by a \glossterm<condition>, you have a 50\% chance to avoid gaining that condition.
            This does not prevent any other effects of the attack.
        "),
        ..MagicArmor::default()
    }));

    // TODO: unclear EA
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

    // Slowed as a HP condition is about 2 EA given the relatively short range, or 2.4 EA with
    // prebuff. The vital wound effect is mostly fluff, so ignore it. Limited scope allows 2.2 EA, or r5.
    // This fits into a r3 standard action attack effect, since r3 normally has 1.8 EA, and
    // 1.8 EA * 1.33 = 2.4.
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
            After you use this ability, you \glossterm{briefly} cannot use it again.

            \hit The target slowly turns to stone as a \glossterm{condition}.
            While it is below its maximum \glossterm{hit points}, it is \slowed.
            During this condition, if it takes a \glossterm{vital wound} that leaves it unconscious, it immediately dies.
            If the target dies in this way, its body is petrified in the form of a stone statue.
            \critcondition
        "),
        upgrades: vec![
            // Adding in stunned to the HP condition is +1.2 EA, so 3.4 EA total. That makes it a
            // rank 6 item.
            ItemUpgrade::new(6, r"Can slow and stun viewers", r"
                Your minimum accuracy increases to $accuracy, and the condition also causes each target to be \stunned while it is below its maximum hit points.
            "),
        ],
        tags: vec![AbilityTag::Visual, AbilityTag::personal_attunement()],
        ..MagicArmor::default()
    }));

    armor.push(Shield(StandardItem {
        name: String::from("Shield of Shielding"),
        rank: 1,
        short_description: String::from("Shields you"),
        description: String::from(
            r"
            You are \shielded.
        ",
        ),
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        upgrades: vec![ItemUpgrade::new(
            7,
            "Shields you",
            r"
                This item does not require \glossterm{deep attunement}.
            ",
        )],
        ..MagicArmor::default()
    }));

    armor
}
