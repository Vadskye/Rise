use crate::core_mechanics::abilities::AbilityTag;
use crate::equipment::Apparel::Boots;
use crate::equipment::{Apparel, ItemUpgrade, StandardItem};

pub fn legs() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.append(&mut boots());

    apparel
}

// Mobility effects
fn boots() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.push(Boots(StandardItem {
        name: String::from("Crater Boots"),
        rank: 4,
        short_description: String::from("Deals your falling damage to enemies"),
        description: String::from(r"
            Whenever you take \glossterm<falling damage>, make an attack vs. Reflex against everything within a \areasmall radius from you.
            \hit You deal each target bludgeoning damage equal to half the damage you took from falling.
            If you reduce or avoid the falling damage, that also affects you damage you deal with these boots.
            \crit Each target is also knocked \prone.
            This attack does not deal extra damage on a critical hit.
        "),
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem {
        name: String::from("Phasestep Boots"),
        rank: 2,
        short_description: String::from("Can exert to move through creatures"),
        description: String::from(r"
            You can activate these boots as a free action.
            When you do, you increase your \glossterm<fatigue level> by one, and you may move through creatures freely when you move using one of your movement speeds this round.
            This does not allow you to move through inanimate objects.
            If you end your movement in spaces occupied by other creatures, both of you are still \squeezing.
            If you are not able to move normally, such as if you are \grappled, these boots do not help you.

            After you activate these boots, you \glossterm<briefly> cannot do so again.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Can sometimes move through creatures", "
                Activating the effect does not increase your fatigue level.
            "),
            ItemUpgrade::new(6, "Allows moving through creatures", "
                The boots do not require activation.
                Instead, the effect is constantly active.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem {
        name: String::from("Skydancing Boots"),
        rank: 3,
        short_description: String::from("Can very briefly walk on air"),
        description: String::from(r"
            You can activate these boots as a \glossterm<free action>.
            When you do, you may treat air as if it were solid ground to your feet for the rest of the current phase.
            You may selectively choose when to treat the air as solid ground, allowing you to walk or jump on air freely.
            These boots cannot be activated again until you land on a solid surface capable of supporting your weight.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Can briefly walk on air", r"
                The effect lasts \glossterm<briefly> instead of only during the current phase.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem {
        name: String::from("Boots of Freedom"),
        rank: 4,
        short_description: String::from("Grants immunity to common mobility restrictions"),
        description: String::from(r"
            You are immune to being \slowed, \immobilized, and \paralyzed.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Grants immunity to almost all mobility restrictions", r"
                    You are also unaffected by \glossterm<difficult terrain> and immune to being \grappled or knocked \prone.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem {
        name: String::from("Boots of Gravitation"),
        rank: 3,
        short_description: String::from("Redirects personal gravity to adjacent objects"),
        description: String::from(r"
            Once per round, while you are within 5 feet of an \glossterm<unattended> object at least one size category larger than you, you can activate these boots as a \glossterm<free action>.
            When you do, gravity pulls you towards that surface instead of in the normal direction.
            This allows you to walk normally on walls or even ceilings.

            Whenever you change the direction that gravity pulls you, you must make a \glossterm<difficulty value> 10 Balance check to keep your feet.
            Failure means you fall \prone and your movement for that phase ends.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Redirects personal gravity to nearby objects", "
                The maximum distance increases to 15 feet.
                This can allow you to pull yourself towards distant objects, though you may take falling damage if you fall too far.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem {
        name: String::from("Boots of Speed"),
        rank: 5,
        short_description: String::from("Increases speed by 10 feet"),
        description: String::from(
            r"
            You gain a +10 foot \glossterm<enhancement bonus> to your land speed.
        ",
        ),
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem {
        name: String::from("Astral Boots"),
        rank: 6,
        short_description: String::from("Allows teleporting instead of moving"),
        description: String::from(r"
            When you move using one of your movement speeds, you can \glossterm{teleport} the same distance instead.
            This does not change the total distance you can move, but you can teleport in any direction, even vertically.
        "),
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem {
        name: String::from("Boots of Water Walking"),
        rank: 3,
        short_description: String::from("Allows walking on liquids"),
        description: String::from(r"
            You treat the surface of all liquids as if they were firm ground.
            Your feet hover about an inch above the liquid's surface, allowing you to traverse dangerous liquids without harm as long as the surface is calm.

            If you are below the surface of the liquid, you rise towards the surface at a rate of 60 feet per round.
            Thick liquids, such as mud and lava, may cause you to rise more slowly.
        "),
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem {
        name: String::from("Boots of the Winterlands"),
        rank: 1,
        short_description: String::from("Eases travel in cold areas"),
        description: String::from(r"
            You can travel across snow and ice without slipping or suffering movement penalties for the terrain.
        "),
        upgrades: vec![
            ItemUpgrade::new(3, "Greatly eases travel in cold areas", "
                % TODO: degree symbol?
                The boots also keep you warm, protecting you in environments as cold as -50 degrees Fahrenheit.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem {
        name: String::from("Boots of the Desertlands"),
        rank: 1,
        short_description: String::from("Eases travel in deserts"),
        description: String::from(r"
            You can travel across sand, including quicksand, without slipping or suffering movement penalties for the terrain.
        "),
        upgrades: vec![
            // TODO: some deserts are cold, especially at night. Should maybe provide both
            // sides of temperature protection?
            ItemUpgrade::new(3, "Eases travel in warm deserts", "
                % TODO: degree symbol?
                The boots also keep you cool, protecting you in environments as warm as 140 degrees Fahrenheit.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem {
        name: String::from("Seven League Boots"),
        rank: 4,
        short_description: String::from("Can exert to teleport seven leagues"),
        description: String::from(r"
            You can activate these boots as a standard action.
            When you do, you increase your \glossterm<fatigue level> by one and teleport horizontally exactly 25 miles in a direction you specify.
            If this would place you within a solid object or otherwise impossible space, the boots will shunt you up to 1,000 feet in any direction to the closest available space.
            If there is no available space within 1,000 feet of your intended destination, the effect fails and you take 4d6 energy damage.
        "),
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem::skill_item(
        "Boots of Elvenkind",
        "Stealth",
    )));

    apparel.push(Boots(StandardItem::reliable_skill_item(
        "Boots of Reliable Motion",
        "Balance, Climb, Jump, or Swim",
        "movement-based",
    )));

    apparel.push(Boots(StandardItem {
        name: String::from("Levitating Boots"),
        rank: 2,
        short_description: String::from("Can exert to levitate after jumping"),
        description: String::from(r"
            Whenever you jump, you can activate these boots (see \pcref{Jumping}).
            When you do, you increase your \glossterm<fatigue level> by one.
            In exchange, your maximum jump height is equal to your maximum horizontal jump distance, and you can land in midair at any point during your jump this round.
            You can \glossterm<briefly> levitate in that location as if you were standing on solid ground.

            These boots cannot be activated again until you spend a full round on a solid surface capable of supporting your weight.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Can levitate after jumping", "
                Activating these boots does not increase your fatigue level.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem {
        name: String::from("Sprinting Boots"),
        rank: 4,
        short_description: String::from("Can sprint without exertion"),
        description: String::from(r"
            Whenever you use the \ability{sprint} ability during the \glossterm{movement phase}, you can activate these boots.
            When you do, you do not increase your \glossterm{fatigue level} from using that \ability{sprint} ability.

            After you activate these boots, you cannot do so again until you spend a full round without making a \glossterm{movement}.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Can sprint without exertion", "
                You can activate the boots again after you spend a movement phase without making a movement, rather than a full round.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem {
        name: String::from("Boots of Desperate Retreat"),
        rank: 1,
        short_description: String::from("Can move when you recover"),
        description: String::from(r"
            When you use the \ability<recover> ability, you can also make a \glossterm{movement} immediately afterward.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Can sprint when you recover", r"
                When you use the \ability{recover} ability, you can also use the \ability{sprint} ability immediately afterward.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem {
        name: String::from("Anchoring Boots"),
        rank: 2,
        short_description: String::from("Immune to most forced movement attacks"),
        description: String::from(r"
            You are immune to \glossterm{teleport}, \glossterm{knockback}, and \glossterm{push} effects from attacks, unless the effects come from an attack that scores a \glossterm{critical hit}.
            This does not affect movement effects used by your \glossterm{allies}.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Immune to most forced relocation attacks", r"
                You are also immune to knockback, push, and teleportation effects from attacks that are critical hits.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Boots(StandardItem {
        name: String::from("Charging Boots"),
        rank: 1,
        short_description: String::from("Reduces penalties for charging by 1"),
        description: String::from(
            r"
                You reduce your defense penalties from using the \ability<charge> ability by 1.
            ",
        ),
        upgrades: vec![ItemUpgrade::new(
            3,
            "Removes penalties for charging",
            r"
                You do not take defense penalties from using the \ability<charge> ability.
            ",
        )],
        ..Apparel::default()
    }));

    apparel
}
