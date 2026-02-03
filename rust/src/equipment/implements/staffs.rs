use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
use crate::equipment::Implement::Staff;
use crate::equipment::{Implement, ItemUpgrade, StandardItem};

pub fn staffs() -> Vec<Implement> {
    let mut implements = vec![];

    implements.append(&mut composite_staffs());

    // implements.push(Staff(StandardItem {
    //     name: String::from("Interplanar Staff"),
    //     rank: 4,
    //     short_description: String::from(r"Aids travel with \ritual{plane shift}"),
    //     description: String::from(r"
    //         When you perform the \ritual{plane shift} ritual, this staff provides all \glossterm{fatigue levels} required.
    //         It does not grant you the ability to perform the \ritual{plane shift} ritual if you could not already.
    //     "),
    //     ..Implement::default()
    // }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Shared Healing"),
        rank: 2,
        short_description: String::from(r"Heals you when you heal allies"),
        description: String::from(r"
            Once per round, when you cause a creature other yourself to regain \glossterm<hit points> using a \magical ability, you can activate this item.
            When you do, you also regain that many hit points.
            In addition, you increase your \glossterm<fatigue level> by one.
            This ability has the \abilitytag<Swift> tag if you use it to affect healing with a Swift ability.
        "),
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Agonizing Fear"),
        rank: 1,
        short_description: String::from(r"Fear effects also penalize Fortitude"),
        description: String::from(r"
            Creatures that are \frightened or \panicked by you suffer a penalty to their Fortitude defense equal to the penalty they suffer to their Mental defense.
        "),
        tags: vec![AbilityTag::Emotion, AbilityTag::personal_attunement()],
        upgrades: vec![
            ItemUpgrade::new(5, "Fear effects penalize all defenses", r"
                The defense penalty applies to all non-Mental defenses, not just Fortitude.
            "),
        ],
        ..Implement::default()
    }));

    // TODO: very unclear value
    implements.push(Staff(StandardItem {
        name: String::from("Staff of Discordance"),
        rank: 6,
        short_description: String::from(r"Makes stunned creatures briefly confused"),
        description: String::from(r"
            Whenever you cause an enemy to be \stunned as a \glossterm<condition>, it is also \glossterm<briefly> \confused.
        "),
        tags: vec![AbilityTag::Compulsion, AbilityTag::personal_attunement()],
        ..Implement::default()
    }));

    // implements.push(Staff(StandardItem {
    //     name: String::from("Staff of Hindrance"),
    //     rank: 2,
    //     short_description: String::from(r"Your slowing effects last longer"),
    //     description: String::from(r"
    //         Whenever you cause an enemy to be \slowed as a \glossterm<condition>, that condition must be removed an additional time before the effect ends.
    //         In addition, whenever you cause an enemy to be \glossterm{briefly} \slowed, they
    //     "),
    //     ..Implement::default()
    // }));

    implements.push(Staff(StandardItem {
        name: String::from("Extending Staff"),
        rank: 2,
        short_description: String::from(r"Grants +15 foot range"),
        description: String::from(r"
            You gain a +15 foot bonus to the \glossterm<range> of all of your ranged \magical abilities.
            This does not affect abilities that do not have a range listed in feet.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Grants +30 foot range", r"
                The bonus increases to +30 feet.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Giants"),
        rank: 2,
        short_description: String::from(r"Increases maximum size or weight with abilities"),
        description: String::from(r"
            Whenever you use a \magical ability that has a maximum size category or weight category for its targets or any objects it creates, you increase that maximum by one size category or weight category.
            This cannot increase the maximum size category or weight category above Gargantuan.
            This does not affect abilities that create creatures of a particular size.

            If you use two Staffs of Giants, their effects stack.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Greatly increases maximum size or weight with abilities", r"
                The bonus increases to two size or weight categories, and this effect can increase the maximum size or weight category to Colossal.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Merciful Staff"),
        rank: 1,
        short_description: String::from(r"Converts damage to subdual damage"),
        description: String::from(
            r"
            Whenever you use a \magical ability that deals damage, you may activate this staff.
            If you do, that ability deals \glossterm<subdual damage>.
        ",
        ),
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Bloodfrenzy Staff"),
        rank: 3,
        short_description: String::from(r"Grants +2 accuracy when you injure a foe"),
        description: String::from(r"
            Whenever you \glossterm{injure} a creature with a \magical ability, you \glossterm{briefly} gain a +2 accuracy bonus against that creature.
            As normal, this bonus does not stack with itself, even if you injure the same creature multiple times.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants +3 accuracy when you injure a foe", r"
                The accuracy bonus increases to +3.
            "),
            ItemUpgrade::new(7, "Grants +4 accuracy when you injure a foe", r"
                The accuracy bonus increases to +4.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Pinhole Staff"),
        rank: 1,
        short_description: String::from(r"Allows excluding a single square from an area"),
        description: String::from(r"
            Whenever you use a non-attunable \magical ability that affects an area, you can freely exclude a single 5-ft. square from the ability's effect.
            All squares in the final area of the ability must be contiguous.
            You cannot create split an ability's area into multiple completely separate areas.
        "),
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Elision"),
        rank: 3,
        short_description: String::from(r"Allows excluding something from an area"),
        description: String::from(r"
            Whenever you use a non-attunable \magical ability that affects an area, you can activate this staff.
            When you do, you choose to have the ability exclude up to two creatures or objects of your choice.
            The excluded creature or object is not a target of the ability.
        "),
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Selective Staff"),
        rank: 5,
        short_description: String::from(r"Allows excluding creatures from an area"),
        description: String::from(r"
            Whenever you use a non-attunable \magical ability that affects an area, you can activate this staff.
            When you do, you choose to have the ability exclude your \glossterm{allies}, your \glossterm{enemies}, or everything that is neither an ally nor an enemy.
            Excluded creatures and objects are not targets of the ability.
        "),
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Contracting Staff"),
        rank: 1,
        short_description: String::from(r"Allows reshaping areas to become smaller"),
        description: String::from(r"
            Whenever you use a non-attunable \magical ability that affects an area, you can reshape its area.
            The new area must be a radius, line, or 90 degree cone, and it must be able to fit entirely within the ability's original area.
            For example, you could convert a radius into a cone, or a cone into a 5 foot wide line.
            However, you could not convert a line into a cone or radius.
            This cannot change the ability's \glossterm{point of origin}.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Allows reshaping areas to become multiple smaller areas", r"
                You can create any number of new areas instead of only one.
                For example, you could convert a cone into a number of lines, or a radius into multiple cones.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Silence"),
        rank: 1,
        short_description: String::from(r"Can exert to cast spells without verbal components"),
        description: String::from(r"
            You can activate this staff as a \glossterm{free action}.
            When you do, you \glossterm<briefly> gain the ability to cast spells without using \glossterm<verbal components>.
            In addition, you increase your \glossterm<fatigue level> by one.
        "),
        upgrades: vec![
            ItemUpgrade::new(3, "Can cast spells without verbal components", r"
                The staff no longer needs to be activated.
                You can passively cast spells without using \glossterm<verbal components>.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Stillness"),
        rank: 1,
        short_description: String::from(r"Can exert to cast spells without somatic components"),
        description: String::from(r"
            You can activate this staff as a \glossterm{free action}.
            When you do, you \glossterm<briefly> gain the ability to cast spells without using \glossterm<somatic components>.
            In addition, you increase your \glossterm<fatigue level> by one.
        "),
        upgrades: vec![
            ItemUpgrade::new(3, "Can cast spells without somatic components", r"
                The staff no longer needs to be activated.
                You can passively cast spells without using \glossterm<somatic components>.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Tranquility"),
        rank: 5,
        short_description: String::from(r"Can cast spells without components"),
        description: String::from(r"
            You can cast spells without using \glossterm<verbal components> or \glossterm<somatic components>.
        "),
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Reaching Staff"),
        rank: 1,
        short_description: String::from(r"Can exert to use abilities from a short distance away"),
        description: String::from(r"
            Whenever you use a non-attunable \magical ability, you may activate this staff.
            When you do, choose a location within \shortrange to act as a \glossterm{targeting proxy}.
            This means the ability determines its targets as if you were in that location, which can allow you to affect targets outside your normal range.
            In addition, you increase your \glossterm<fatigue level> by one, and you \glossterm<briefly> cannot activate this staff again.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Can sometimes use abilities from a short distance away", r"
                Activating the staff does not increase your fatigue level.
            "),
            ItemUpgrade::new(7, "Can use abilities from a short distance away", r"
                The staff no longer has a brief cooldown after being activated.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Distant Staff"),
        rank: 2,
        short_description: String::from(r"Can exert to double range"),
        description: String::from(r"
            Whenever you use a \magical ability with a \glossterm<range> listed in feet, you may activate this staff.
            When you do, you double the ability's range.
            In addition, you increase your \glossterm<fatigue level> by one, and you \glossterm<briefly> cannot activate this effect again.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Can sometimes double range", r"
                Activating the staff does not increase your fatigue level.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Widening Staff"),
        rank: 2,
        short_description: String::from(r"Can exert to double area"),
        description: String::from(r"
            Whenever you use a \magical ability that affects an area and does not have the \abilitytag<Attune> or \abilitytag<Sustain> tags, you may activate this staff.
            % TODO: maximum area?
            When you do, you double the ability's area.
            In addition, you increase your \glossterm<fatigue level> by one, and you \glossterm<briefly> cannot activate this effect again.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Can sometimes double area", r"
                Activating the staff does not increase your fatigue level.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Splitting Staff"),
        rank: 2,
        short_description: String::from(r"Can exert to add an extra target"),
        description: String::from(r"
            Whenever you use a \glossterm{targeted} \magical ability with a \glossterm<range> listed in feet, you may activate this staff.
            When you do, increase the number of targets that the ability affects by one.
            In addition, you increase your \glossterm<fatigue level> by one, and you \glossterm<briefly> cannot activate this effect again.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Can sometimes add an extra target", r"
                Activating the staff does not increase your fatigue level.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Echoing Staff"),
        rank: 7,
        short_description: String::from(r"Can exert to repeat effect"),
        description: String::from(r"
            Whenever you use a non-attunable \magical ability, you may activate this staff.
            When you do, the ability \glossterm{repeats} during your next action.
            In addition, you increase your \glossterm<fatigue level> by one, and you \glossterm<briefly> cannot activate this effect again.
        "),
        ..Implement::default()
    }));

    // TODO: add "when you inflict a condition, deal damage immediately" staff?
    // implements.push(Staff(StandardItem {
    //     name: String::from("Hexbite Staff"),
    //     rank: 2,
    //     short_description: String::from(r"Deals $dr3l damage when foes remove conditions"),
    //     description: String::from(r"
    //         Whenever a creature removes a \glossterm<condition> that you inflicted on it, it takes $dr3l \glossterm<damage>.
    //         If the condition came from an ability with a rank higher than the creature's rank, this effect deals double damage.
    //     "),
    //     upgrades: vec![
    //         ItemUpgrade::new(4, "Deals $dr5l damage when foes remove conditions", r"
    //             The damage increases to $dr5l.
    //         "),
    //         ItemUpgrade::new(6, "Deals $dr7l damage when foes remove conditions", r"
    //             The damage increases to $dr7l.
    //         "),
    //     ],
    //     ..Implement::default()
    // }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Radiance"),
        rank: 1,
        short_description: String::from(r"Increases light radius"),
        description: String::from(
            r"
            You double the radius of all light you create using \magical effects.
        ",
        ),
        upgrades: vec![ItemUpgrade::new(
            5,
            "Grants +1 accuracy, increases light radius",
            r"
                You also gain a \plus1 \glossterm{enhancement bonus} to \glossterm{accuracy}.
            ",
        )],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Perceptive Staff"),
        rank: 3,
        short_description: String::from(r"Grants +1 accuracy if you have 3 Per"),
        description: String::from(r"
            If your Perception is at least 3, you gain a +1 \glossterm{enhancement bonus} to \glossterm{accuracy}.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Grants +2 accuracy if you have 5 Per", r"
                The accuracy bonus increases to +2 if your Perception is at least 5.
            "),
        ],
        ..Implement::default()
    }));

    // implements.push(Staff(StandardItem {
    //     name: String::from("Blinding Staff"),
    //     rank: 3,
    //     short_description: String::from(r"Briefly blinds you and dazzled creature"),
    //     description: String::from(r"
    //         Whenever you cause a creature to become \dazzled as a \glossterm<condition>, you may activate this staff.
    //         If you do, you and that creature are each \glossterm<briefly> \blinded.
    //         After you activate this staff, you briefly cannot activate it again.
    //     "),
    //     tags: vec![AbilityTag::Visual, AbilityTag::personal_attunement()],
    //     upgrades: vec![
    //         ItemUpgrade::new(6, "Briefly blinds dazzled creature", r"
    //             Activating this staff no longer blinds you.
    //         "),
    //     ],
    //     ..Implement::default()
    // }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Energy Conversion"),
        rank: 4,
        short_description: String::from(r"+2 damage, changes energy type"),
        description: String::from(r"
            Whenever you use a \magical ability that has a \abilitytag{Cold}, \abilitytag{Electricity}, or \abilitytag{Fire} tag, you can remove that tag.
            If you do, you must add a different one of those tags to the ability, and the ability deals 2 \glossterm{extra damage} if it deals damage.
            All of the attack's effects are unchanged.
        "),
        tags: vec![AbilityTag::Cold, AbilityTag::Electricity, AbilityTag::Fire, AbilityTag::personal_attunement()],
        upgrades: vec![
            ItemUpgrade::new(6, "+1d6 damage, changes energy type", r"
                The extra damage increases to 1d6.
            "),
        ],
        ..Implement::default()
    }));

    // As with Educated on a weapon, this gets a +1dr damage bonus
    implements.push(Staff(StandardItem {
        name: String::from("Brutish Staff"),
        rank: 3,
        short_description: String::from(r"Grants +2 damage if you have 3 Str"),
        description: String::from(r"
            If your Strength is at least 3, you deal 2 \glossterm<extra damage> with damaging \magical abilities.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants +1d6 damage if you have 4 Str", r"
                The extra damage increases to 1d6 if your Strength is at least 4.
            "),
            ItemUpgrade::new(7, "Grants +1d10 damage if you have 5 Str", r"
                The extra damage increases to 1d10 if your Strength is at least 5.
            "),
        ],
        ..Implement::default()
    }));

    // +1dr for non-damage attribute investment
    implements.push(Staff(StandardItem {
        name: String::from("Educated Staff"),
        rank: 3,
        short_description: String::from(r"Grants +2 damage if you have 3 Int"),
        description: String::from(r"
            If your Intelligence is at least 3, you deal 2 \glossterm<extra damage> with damaging \magical abilities.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants +1d6 damage if you have 4 Int", r"
                The extra damage increases to 1d6 if your Intelligence is at least 4.
            "),
            ItemUpgrade::new(7, "Grants +1d10 damage if you have 5 Int", r"
                The extra damage increases to 1d10 if your Intelligence is at least 5.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Power"),
        rank: 4,
        short_description: String::from(r"Empowers you"),
        description: String::from(
            r"
            You are \empowered.
        ",
        ),
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Overwhelming Power"),
        rank: 7,
        short_description: String::from(r"Empowers you, but with \minus1 accuracy"),
        description: String::from(
            r"
            You are \empowered.
            However, you take a \minus1 accuracy penalty.
        ",
        ),
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Flaming Staff"),
        rank: 3,
        short_description: String::from(r"Is burning and ignites"),
        description: String::from(
            r"
            This staff constantly burns.
            You can suppress or resume this fire as a \glossterm{free action}.
            While the staff is burning:
            \begin{raggeditemize}
                \item All \magical abilities you use have the \atFire tag.
                \item Whenever you hit a creature with \magical ability, the creature burns.
                    It takes 1d6 damage during your next action.
                    This damage is doubled by critical hits and attacks that deal double damage.
                \item It sheds light in a 15 foot radius of \glossterm{bright illumination}.
            \end{raggeditemize}
        ",
        ),
        tags: vec![AbilityTag::Fire, AbilityTag::personal_attunement()],
        upgrades: vec![
            ItemUpgrade::new(
                5,
                "Is burning and ignites",
                r"
                The damage increases to 1d10.
            ",
            ),
            ItemUpgrade::new(
                7,
                "Is burning and ignites",
                r"
                The damage increases to 2d8.
            ",
            ),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Arcing Staff"),
        rank: 4,
        short_description: String::from(r"Is charged and chains"),
        description: String::from(r"
            This staff constantly crackles with electricity.
            You can suppress or resume this charge as a \glossterm{free action}.
            While the staff is charged:
            \begin{raggeditemize}
                \item All \magical abilities you use have the \atElectricity tag.
                \item All \glossterm{targeted} damaging \magical abilities you use \glossterm{chain} once.
                    % TODO: wording?
                    This does not affect magical abilities that do not deal damage, even if they increase the damage dealt by the target.
                \item It sheds light in a 5 foot radius of \glossterm{bright illumination}.
            \end{raggeditemize}
        "),
        tags: vec![AbilityTag::Fire, AbilityTag::personal_attunement()],
        upgrades: vec![
            // TODO: unclear damage
            ItemUpgrade::new(7, "+1d4 damage, is charged and chains", r"
                While the staff is charged, your damaging \magical abilities also deal 1d4 \glossterm{extra damage}.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Freezing Staff"),
        rank: 2,
        short_description: String::from(r"+1 damage, is chilled"),
        description: String::from(
            r"
            This staff is bitterly cold to the touch.
            You can suppress or resume this chill as a \glossterm{free action}.
            While the staff is chilled:
            \begin{raggeditemize}
                \item All \magical abilities you use have the \atCold tag.
                \item All damaging \magical abilities you use deal 1 \glossterm{extra damage}.
                \item It sheds light in a 5 foot radius of \glossterm{bright illumination}.
            \end{raggeditemize}
        ",
        ),
        tags: vec![AbilityTag::Fire, AbilityTag::personal_attunement()],
        upgrades: vec![
            ItemUpgrade::new(
                4,
                "+2 damage, is chilled",
                r"
                The extra damage increases to 2.
            ",
            ),
            ItemUpgrade::new(
                6,
                "+1d6 damage, is chilled",
                r"
                The extra damage increases to 1d6.
            ",
            ),
        ],
        ..Implement::default()
    }));

    // Rank 3 ideal high damage is 13.
    // This is 27% more damage ignoring "double extra damage".
    // Assume you're dropping a 100% accuracy to 80%.
    // 13 vs 16.5 * .8 = 13.2 is reasonable given the opportunity to nova.
    implements.push(Staff(StandardItem {
        name: String::from("Shattered Staff"),
        rank: 3,
        short_description: String::from(r"Grants +1d6 damage and -2 accuracy"),
        description: String::from(r"
            All damaging \magical abilities you use deal 1d6 \glossterm{extra damage}, but have a \minus2 \glossterm{accuracy} penalty.
        "),
        upgrades: vec![
            // Rank 5 ideal high damage is 26.
            // Assuming double extra damage, this is 35 damage, so 35% more damage.
            // 26 vs 37 * .8 = 28, which is still relatively fine.
            ItemUpgrade::new(5, "Grants +1d8 damage and -2 accuracy", r"
                The extra damage increases to 1d8.
            "),
            // Rank 7 ideal high damage is 51.
            // Assuming double extra damage, this is 68 damage, so 33% more damage.
            // 51 vs 68 * .8 = 54, which is still relatively fine.
            ItemUpgrade::new(7, "Grants +2d6 damage and -2 accuracy", r"
                The extra damage increases to 2d6.
            "),
        ],
        ..Implement::default()
    }));

    implements
}

fn composite_staffs() -> Vec<Implement> {
    let mut implements = vec![];

    implements.push(Staff(StandardItem {
        name: String::from("Composite Staff, 1st"),
        rank: 3,
        short_description: String::from(r"Has two rank 1 properties"),
        description: String::from(
            r"
            This staff has two different rank 1 magic implement properties.
            Each property must not already require a \glossterm{deep attunement}.
        ",
        ),
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Composite Staff, 2nd"),
        rank: 4,
        short_description: String::from(r"Has two rank 2 or lower properties"),
        description: String::from(
            r"
            This staff has two different magic implement properties that are rank 2 or lower.
            Each property must not already require a \glossterm{deep attunement}.
        ",
        ),
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Composite Staff, 3rd"),
        rank: 5,
        short_description: String::from(r"Has two rank 3 or lower properties"),
        description: String::from(
            r"
                This staff has two different magic implement properties that are rank 2 or lower.
                Each property must not already require a \glossterm{deep attunement}.
            ",
        ),
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        ..Implement::default()
    }));

    fn nth(implements: &mut Vec<Implement>, n: i32) {
        implements.push(Staff(StandardItem {
            name: format!("Composite Staff, {}th", n),
            rank: n + 2,
            short_description: format!("Has two rank {} or lower properties", n),
            description: format!(
                "
                    This staff has two different magic implement properties that are rank {n} or lower.
                    Each property must not already require a \\glossterm<deep attunement>.
                "
            ),
            tags: vec![AbilityTag::Attune(AttuneType::Deep)],
            ..Implement::default()
        }));
    }

    nth(&mut implements, 4);
    nth(&mut implements, 5);
    nth(&mut implements, 6);

    implements
}
