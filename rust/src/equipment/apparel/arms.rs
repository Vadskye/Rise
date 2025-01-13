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
        rank: 1,
        short_description: String::from("Grants encumbrance-free medium armor"),
        description: String::from(r"
            You have a translucent suit of magical armor on your body and over your hands.
            This functions like body armor that provides a +3 bonus to Armor defense and has no \glossterm<encumbrance>.
            It also provides a +6 bonus to your \glossterm{damage resistance} and a +1 bonus to \glossterm{vital rolls}.

            The armor provided by this ability is dismissed if you have other body armor of any kind.
        "),
        upgrades: vec![
            ItemUpgrade::new(3, "Grants encumbrance-free medium armor", "
                The damage resistance bonus increases to +12.
            "),
            ItemUpgrade::new(5, "Grants encumbrance-free medium armor", "
                The damage resistance bonus increases to +24.
            "),
            ItemUpgrade::new(7, "Grants encumbrance-free medium armor", "
                The damage resistance bonus increases to +48.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Bracers(StandardItem {
        name: String::from("Bracers of Resistance"),
        rank: 2,
        short_description: String::from("Grants +4 damage resistance"),
        description: String::from(r"
            You gain a +4 \glossterm{enhancement bonus} to your \glossterm{damage resistance}.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Grants +8 damage resistance", "
                The damage resistance bonus increases to +8.
            "),
            ItemUpgrade::new(6, "Grants +16 damage resistance", "
                The damage resistance bonus increases to +16.
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
            After you activate this item, you \glossterm{briefly} cannot do so again.
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
            \crit The knockback distance is doubled.
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
        rank: 1,
        short_description: String::from("Can protect against one critical hit"),
        description: String::from(r"
            Whenever you are hit by a \glossterm<critical hit>, this item automatically activates.
            When it does, the attacker rerolls the attack against you, which may prevent the attack from getting a critical hit against you.
            This does not protect any other targets of the attack.
            You stop being attuned to this item when it activates in this way, and you must attune to it again to gain its effects.
        "),
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        upgrades: vec![
            ItemUpgrade::new(4, "Can protect against two critical hits", "
                This item can activate twice before you stop being attuned to it.
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
        short_description: String::from("Can deal $dr3l damage"),
        description: String::from(r"
            You can activate these gauntlets as a standard action.
            When you do, a rock appears in one \glossterm{free hand}, and you can immediately throw it at anything within \shortrange.
            Make an attack against the target's Armor defense.
            \hit $dr3l bludgeoning damage.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Can deal $dr5l bludgeoning damage", r"
                The damage increases to $dr5l.
            "),
            ItemUpgrade::new(6, "Can deal $dr7l bludgeoning damage", r"
                The damage increases to $dr7l.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Gauntlets(StandardItem {
        name: String::from("Gauntlets of Brutal Fists"),
        rank: 2,
        short_description: String::from(r"Natural weapons deal +1d6-2 damage with 3 Str"),
        description: String::from(r"
            If your Strength is at least 3, your \glossterm{natural weapons} deal +1d6 damage, but their damage is also reduced by 2.
            This changes your \glossterm{weapon damage}, and is not considered \glossterm{extra damage}.
            This effect does not stack with the Brutal magic weapon effect.
        "),
        upgrades: vec![
            // +2.5 damage
            ItemUpgrade::new(5, "Natural weapons deal +1d8-2 damage with 4 Str", r"
                The damage die increases to 1d8 if your Strength is at least 4.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Gauntlets(StandardItem {
        name: String::from("Gauntlets of Mighty Fists"),
        rank: 4,
        short_description: String::from(r"Grants \weapontag{Impact} to natural weapons"),
        description: String::from(r"
            Your \glossterm{natural weapons} gain the \weapontag{Impact} \glossterm{weapon tag}.
            This means you get a \glossterm{glancing blow} if you would miss by 5 or less (see \pcref{Glancing Blows}).
            If the natural weapon already has the Impact weapon tag, this has no effect.
        "),
        ..Apparel::default()
    }));

    apparel.push(Gauntlets(StandardItem {
        name: String::from("Gauntlets of Might"),
        rank: 2,
        short_description: String::from("Grants +1 Strength for specific purposes"),
        description: String::from(r"
            You gain a +1 \glossterm<enhancement bonus> to Strength-based \glossterm<checks>, and you gain a +1 \glossterm<enhancement bonus> to Strength for the purpose of determining your \glossterm<weight limits> (see \pcref<Weight Limits>).
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
        "Gauntlets of Strength",
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
        short_description: String::from("Make dual strikes without Dexterity"),
        description: String::from(r"
            You can make \glossterm<dual strikes> even if your Dexterity is less than 1 (see \pcref{Dual Strikes}).
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Make dual strikes easily without Dexterity", "
                You also reduce your accuracy penalty while making dual strikes from -2 to -1, as if you had 4 Dexterity.
                This does not reduce the penaty to 0 if you do have 4 Dexterity.
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
            When you do, make an attack vs. Reflex and Fortitude against a creature you \glossterm{touch} with either glove.
            Whether the attack hits or misses, the target is immune to this ability until it finishes a \glossterm<short rest>.
            \hit If the target has no remaining \glossterm<damage resistance>, it becomes \paralyzed as a \glossterm<condition>.
        "),
        ..Apparel::default()
    }));

    apparel.push(Gloves(StandardItem::attribute_item(
        "Gloves of Dexterity",
        &Attribute::Dexterity,
    )));

    apparel.push(Gloves(StandardItem {
        name: String::from("Bladespawn Gloves"),
        rank: 1,
        short_description: String::from("Can create daggers"),
        description: String::from(r"
            Once per round, you can activate these gloves as a \glossterm<free action>.
            When you do, a dagger \glossterm<briefly> appears in each of your free hands.
            The daggers disappear when this effect ends.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Can create daggers with special materials", r"
                The daggers be made from a special material of your choice.
                You can create an adamantine, pure diamondsteel, mithral, or silvered dagger (see \pcref<Weapon Special Materials>).
            "),
        ],
        tags: vec![AbilityTag::Manifestation],
        ..Apparel::default()
    }));

    apparel
}
