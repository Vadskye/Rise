use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
use crate::core_mechanics::Attribute;
use crate::equipment::Apparel::{Bracers, Gauntlets, Gloves, Tattoo};
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
    apparel.append(&mut tattoos());

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
            It also provides a +7 bonus to your \glossterm{damage resistance} and a +1 bonus to \glossterm{vital rolls}.

            The armor provided by this ability is dismissed if you have other body armor of any kind.
        "),
        upgrades: vec![
            ItemUpgrade::new(3, "Grants encumbrance-free medium armor", "
                The damage resistance bonus increases to +14.
            "),
            ItemUpgrade::new(5, "Grants encumbrance-free medium armor", "
                The damage resistance bonus increases to +28.
            "),
            ItemUpgrade::new(7, "Grants encumbrance-free medium armor", "
                The damage resistance bonus increases to +56.
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
        tags: vec![AbilityTag::Swift, AbilityTag::personal_attunement()],
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
            Make an attack vs. Brawn against everything within a \areasmall radius burst from you.
            Your minimum accuracy is $accuracy.
            \hit You \glossterm<knockback> each target up to 10 feet away from you.
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
        short_description: String::from(r"Allows striking non-adjacent foes"),
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
            When you make a thrown \glossterm<strike>, you reduce your \glossterm<longshot penalty> by 1 (see \pcref<Weapon Range Limits>).
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
            You can make \glossterm<dual strikes> even if your Dexterity is less than 2 (see \pcref{Dual Strikes}).
        "),
        upgrades: vec![],
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
            When you do, make an attack vs. Fortitude against a creature you touch with either glove.
            Whether the attack hits or misses, the target is immune to this ability until it finishes a \glossterm<short rest>.
            \hit If the target has no remaining \glossterm<damage resistance>, it becomes \glossterm{briefly} \paralyzed.
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
        tags: vec![AbilityTag::Manifestation, AbilityTag::personal_attunement()],
        ..Apparel::default()
    }));

    apparel
}

fn tattoos() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.push(Tattoo(StandardItem {
        name: String::from("Tattoo of Imbuement (1)"),
        rank: 1,
        short_description: String::from(r"Grants a rank 1 weapon property to a natural weapon"),
        description: String::from(r"
            This tattoo must be applied to one of your \glossterm{natural weapons} that do not require a free hand to use, such as a bite.
            It provides that natural weapon with a specific rank 1 magic weapon property which is not a \glossterm{deep attunement}.

            % TODO: what if you tattoo the same one twice? Can you swap between them? No, but how to word that.
            If that natural weapon would already be affected by a magic weapon property, this tattoo has no effect on it.
            Different versions of this item exist for each rank 1 magic weapon property.
        "),
        ..Apparel::default()
    }));

    apparel.push(Tattoo(StandardItem {
        name: String::from("Tattoo of Imbuement (2)"),
        rank: 2,
        short_description: String::from(r"Grants a rank 2 weapon property to a natural weapon"),
        description: String::from(r"
            This item functions like a \mitem<tattoo of imbuement>, except that the magic weapon property is rank 2.
        "),
        ..Apparel::default()
    }));

    apparel.push(Tattoo(StandardItem {
        name: String::from("Tattoo of Imbuement (3)"),
        rank: 3,
        short_description: String::from(r"Grants a rank 3 weapon property to a natural weapon"),
        description: String::from(r"
            This item functions like a \mitem<tattoo of imbuement>, except that the magic weapon property is rank 3.
        "),
        ..Apparel::default()
    }));

    fn nth_imbuement(rank: i32) -> Apparel {
        Tattoo(StandardItem {
            name: format!("Tattoo of Imbuement ({})", rank),
            rank,
            short_description: format!(r"Grants a rank {} weapon property to a natural weapon", rank),
            description: format!("
                This item functions like a \\mitem<tattoo of imbuement>, except that the magic weapon property is rank {}.
            ", rank),
            ..Apparel::default()
        })
    }

    apparel.push(nth_imbuement(4));
    apparel.push(nth_imbuement(5));
    apparel.push(nth_imbuement(6));
    apparel.push(nth_imbuement(7));

    apparel
}
