use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
use crate::core_mechanics::Attribute;
use crate::equipment::Apparel::{Bracers, Gauntlets, Gloves};
use crate::equipment::{Apparel, ItemUpgrade, StandardItem};

// Effects of items worn on the arms:
// * hand agility (gloves)
// * hand strength (gauntlets)
// * shielding (bracers)
pub fn arms() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.append(&mut bracers());
    apparel.append(&mut gauntlets());
    apparel.append(&mut gloves());

    apparel
}

// Shielding effects
// Arm-related effects
fn bracers() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.push(Bracers(StandardItem {
        name: String::from("Bracers of Armor"),
        rank: 2,
        short_description: String::from("Grants encumbrance-free medium armor"),
        description: String::from(r"
            You have a translucent suit of magical armor on your body and over your hands.
            This functions like body armor that provides a +3 bonus to Armor defense and has no \glossterm<encumbrance>.
            It also provides a +5 bonus to your \glossterm{damage resistance}.

            As long as you have a free hand, the barrier also manifests as a shield that provides a +1 bonus to Armor defense.
            This bonus is considered to come from a shield, and does not stack with the benefits of using any other shield.

            The armor and shield provided from this ability are dismissed if you have other body armor of any kind.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Grants encumbrance-free medium armor", "
                The damage resistance bonus increases to +10.
            "),
            ItemUpgrade::new(6, "Grants encumbrance-free medium armor", "
                The damage resistance bonus increases to +20.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Bracers(StandardItem {
        name: String::from("Shieldburst Bracers"),
        rank: 1,
        short_description: String::from("Can exert to gain instant +2 Armor defense"),
        description: String::from(r"
            You can activate these bracers as a \glossterm{free action}.
            When you do, you increase your \glossterm<fatigue level> by one and gain a +2 bonus to your Armor defense this round.
            After you activate this item, you \glossterm{briefly} cannot activate it again.
        "),
        tags: vec![AbilityTag::Swift],
        upgrades: vec![
            ItemUpgrade::new(4, "Can exert to gain instant +4 Armor defense", "
                The defense bonus increases to +4.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Bracers(StandardItem {
        name: String::from("Bracers of Repulsion"),
        rank: 1,
        short_description: String::from("Can knock nearby creatures back"),
        description: String::from(r"
            You can activate these bracers as a standard action.
            When you do, they emit a telekinetic burst of force.
            Make an attack vs. Fortitude against everything within a \areasmall radius burst from you.
            Your minimum accuracy is $accuracy.
            \hit You \glossterm<knockback> each target up to 15 feet in a straight line directly away from you.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Can knock nearby creatures back", r"
                The minimum accuracy increases to $accuracy and the knockback distance increases to 30 feet.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Bracers(StandardItem {
        name: String::from("Greatreach Bracers"),
        rank: 4,
        short_description: String::from(r"Allows attacking non-adjacent foes"),
        description: String::from(r"
            Your melee \glossterm{strikes} gain the \weapontag{Long} weapon tag, allowing you to attack targets up to 10 feet away from you (see \pcref{Weapon Tags}).
        "),
        ..Apparel::default()
    }));

    apparel.push(Bracers(StandardItem {
        name: String::from("Bracers of Blessed Protection"),
        rank: 2,
        short_description: String::from("Can protect against one critical hit"),
        description: String::from(r"
            Whenever you are hit by a \glossterm<critical hit>, this item automatically activates.
            When it does, the attacker rerolls the attack against you, which may prevent the attack from getting a critical hit against you.
            This does not protect any other targets of the attack.
            You stop being attuned to this item when it activates in this way, and you must attune to it again to gain its effects.
        "),
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        upgrades: vec![
            ItemUpgrade::new(5, "Can protect against one critical hit", "
                The attacker also takes a -5 accuracy penalty against you with the reroll.
            "),
        ],
        ..Apparel::default()
    }));

    apparel
}

// Strength-related effects
fn gauntlets() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.push(Gauntlets(StandardItem {
        name: String::from("Gauntlets of the Ram"),
        rank: 2,
        short_description: String::from("Knocks back punched enemies"),
        description: String::from(r"
            Your punch \glossterm{natural weapon} gains the \weapontag{Forceful} weapon tag (see \pcref{Weapon Tags}).
            This does not affect your kicks.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Knocks back punched enemies", r"
                The knockback distance increases to 20 feet.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Gauntlets(StandardItem {
        name: String::from("Throwing Gauntlets"),
        rank: 3,
        short_description: String::from("Allows throwing objects up to 60 feet"),
        description: String::from(r"
            You can throw creatures and objects as they had the \weapontag{Thrown} (30/60) weapon tag (see \pcref<Weapon Tags>).
            They must be at least one size category smaller than you, and you must be able to pick them up within your \glossterm<weight limits>.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Allows throwing objects up to 120 feet", r"
                The tag improves to Thrown (60/120).
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Gauntlets(StandardItem {
        name: String::from("Gauntlets of Telekinetic Propulsion"),
        rank: 2,
        short_description: String::from("Reduces thrown longshot penalty by 1"),
        description: String::from(r"
            When you make a thrown \glossterm<strike>, you reduce your \glossterm<longshot penalty> by 1 (see \pcref<Thrown Strike>).
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Reduces thrown longshot penalty by 2", r"
                The penalty reduction increases to 2.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Gauntlets(StandardItem {
        name: String::from("Slinging Gauntlets"),
        rank: 2,
        short_description: String::from("Can deal $dr3 damage"),
        description: String::from(r"
            You can activate these gauntlets as a standard action.
            When you do, a rock appears in one \glossterm{free hand}, and you can immediately throw it at anything within \shortrange.
            Make an attack against the target's Armor defense.
            \hit $dr3 bludgeoning damage.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Can deal $dr5 bludgeoning damage", r"
                The damage increases to $dr5.
            "),
            ItemUpgrade::new(6, "Can deal $dr7 bludgeoning damage", r"
                The damage increases to $dr7.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Gauntlets(StandardItem {
        name: String::from("Gauntlets of Mighty Fists"),
        rank: 4,
        short_description: String::from("Knocks back punched enemies"),
        description: String::from(r"
            Your \glossterm{natural weapons} gain the \weapontag{Impact} \glossterm{weapon tag}.
            If you roll an 8 or 9 on an attack roll with a natural weapon, the attack roll \glossterm{explodes} (see \pcref{Exploding Attacks}).
            If the natural weapon already has the Impact weapon tag, this has no effect.
        "),
        ..Apparel::default()
    }));

    apparel.push(Gauntlets(StandardItem {
        name: String::from("Gauntlets of Might"),
        rank: 2,
        short_description: String::from("Grants +1 Strength for specific purposes"),
        description: String::from(r"
            You gain a +1 \glossterm<magic bonus> to Strength-based \glossterm<checks>, and you gain a +1 \glossterm<magic bonus> to Strength for the purpose of determining your \glossterm<weight limits> (see \pcref<Weight Limits>).
            In addition, you reduce your \glossterm<encumbrance> by 1.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants +2 Strength for specific purposes", r"
                The bonuses increase to +2, and the encumbrance reduction increases to 2.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Gauntlets(StandardItem::attribute_item(
        "Gauntlets of Epic Strength",
        &Attribute::Strength,
    )));

    apparel
}

// Dexterity-related effects
// Special touch attacks
fn gloves() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.push(Gloves(StandardItem {
        name: String::from("Gloves of Improvisation"),
        rank: 2,
        short_description: String::from("Grants proficiency with improvised weapons"),
        description: String::from(r"
            You are \glossterm<proficient> with \glossterm<improvised weapons> (see \pcref<Weapon Proficiency>).
        "),
        ..Apparel::default()
    }));

    apparel.push(Gloves(StandardItem {
        name: String::from("Ambidextrous Gloves"),
        rank: 2,
        short_description: String::from("Allows dual wielding without Dexterity"),
        description: String::from(r"
            You can \glossterm<dual wield> even if your Dexterity is less than 1 (see \pcref{Dual Wielding}).
            This does not remove the accuracy penalty from having less than 4 Dexterity.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Allows dual wielding easily without Dexterity", "
                You also do not take the -1 accuracy penalty for dual wielding with less than 4 Dexterity.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Gloves(StandardItem::skill_item(
        "Locksmith Gloves",
        "Devices",
    )));

    apparel.push(Gloves(StandardItem::skill_item(
        "Pickpocket Gloves",
        "Sleight of Hand",
    )));

    apparel.push(Gloves(StandardItem {
        name: String::from("Thieving Gloves"),
        rank: 2,
        short_description: String::from("Can absorb a small item"),
        description: String::from(
            r"
            You can activate these gloves as a standard action.
            When you do, they absorbs one Small or smaller object you are touching with either glove.

            An absorbed object leaves no trace that it ever existed.
            This weapon can hold no more than three objects at once.
            If you attempt to absorb an object while gloves are full, the attempt fails.

            As a free action, you can retrieve the last item absorbed by the gloves.
            The item appears in your hand, or falls to the ground if your hand is occupied.
            The item similarly reappears if you stop attuning to this gloves or take them off.
        ",
        ),
        upgrades: vec![
            ItemUpgrade::new(
                4,
                "Can absorb an item",
                "The maximum size category increases to Medium.",
            ),
            ItemUpgrade::new(
                6,
                "Can absorb a large item",
                "The maximum size category increases to Large.",
            ),
        ],
        ..Apparel::default()
    }));

    apparel.push(Gloves(StandardItem::reliable_skill_item(
        "Gloves of Reliable Finesse",
        "Craft, Devices, or Sleight of Hand",
        "finesse-based",
    )));

    // "paralyzed" is r4; double defense and no DR makes that work.
    apparel.push(Gloves(StandardItem {
        name: String::from("Ghoultouch Gloves"),
        rank: 7,
        short_description: String::from("Grants a paralyzing touch"),
        description: String::from(r"
            You can activate these gloves as a standard action using a \glossterm{free hand}.
            When you do, make an attack vs. Reflex and Fortitude against a living creature you \glossterm{touch} with either glove.
            Whether the attack hits or misses, the target is immune to this ability until it finishes a \glossterm<short rest>.
            \hit If the target has no remaining \glossterm<damage resistance>, it becomes \paralyzed as a \glossterm<condition>.
        "),
        ..Apparel::default()
    }));

    apparel.push(Gloves(StandardItem::attribute_item(
        "Gloves of Epic Dexterity",
        &Attribute::Dexterity,
    )));

    apparel.push(Gloves(StandardItem {
        name: String::from("Bladespawn Gloves"),
        rank: 1,
        short_description: String::from("Can create daggers"),
        description: String::from(r"
            You can activate these gloves as a \glossterm<free action>.
            When you do, a dagger \glossterm<briefly> appears in one of your free hands.
            The dagger disappears when this effect ends.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Can create daggers with special materials", r"
                The dagger be made from a special material of your choice.
                You can create an adamantine, pure diamondsteel, mithral, or silvered dagger (see \pcref<Weapon Special Materials>).
            "),
        ],
        tags: vec![AbilityTag::Manifestation],
        ..Apparel::default()
    }));

    apparel
}
