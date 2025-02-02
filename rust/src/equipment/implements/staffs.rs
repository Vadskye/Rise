use crate::equipment::{Implement, ItemUpgrade, StandardItem};
use crate::equipment::Implement::Staff;
use crate::core_mechanics::abilities::AbilityTag;

pub fn staffs() -> Vec<Implement> {
    let mut implements = vec![];

    implements.push(Staff(StandardItem {
        name: String::from("Interplanar Staff"),
        rank: 4,
        short_description: String::from(r"Aids travel with \ritual{plane shift}"),
        description: String::from(r"
            When you perform the \ritual{plane shift} ritual, this staff provides all \glossterm{fatigue levels} required.
            It does not grant you the ability to perform the \ritual{plane shift} ritual if you could not already.
        "),
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Shared Healing"),
        rank: 4,
        short_description: String::from(r"Aids travel with \ritual{plane shift}"),
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
        rank: 2,
        short_description: String::from(r"Fear effects also penalize Fortitude"),
        description: String::from(r"
            Creatures that are \frightened or \panicked by you suffer a penalty to their Fortitude defense equal to the penalty they suffer to their Mental defense.
        "),
        tags: vec![AbilityTag::Emotion],
        upgrades: vec![
            ItemUpgrade::new(5, "Fear effects penalize all defenses", r"
                The defense penalty applies to all non-Mental defenses, not just Fortitude.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Discordance"),
        rank: 5,
        short_description: String::from(r"Makes stunned creatures briefly confused"),
        description: String::from(r"
            Whenever you cause an enemy to be \stunned as a \glossterm<condition>, it is also \glossterm<briefly> \confused.
        "),
        tags: vec![AbilityTag::Compulsion],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Hindrance"),
        rank: 3,
        short_description: String::from(r"Your slowing effects last much longer"),
        description: String::from(r"
            Whenever you cause an enemy to be \slowed as a \glossterm<condition>, that condition must be removed an additional time before the effect ends.
        "),
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Extending Staff"),
        rank: 2,
        short_description: String::from(r"Grants +15 foot range"),
        description: String::from(r"
            You gain a +15 foot bonus to the \glossterm<range> of all of your ranged \magical abilities.
            This does not affect abilities that do not have a range listed in feet.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants +30 foot range", r"
                The bonus increases to +30 feet.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Giants"),
        rank: 3,
        short_description: String::from(r"Increases maximum size category of abilities"),
        description: String::from(r"
            Whenever you use a \magical ability that has a maximum size category for its targets or any objects it creates, you increase that maximum by one size category, to a maximum of Gargantuan.
            This does not affect abilities that create creatures of a particular size.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Greatly increases maximum size category of abilities", r"
                The bonus increases to two size categories, and the maximum size category increases to Colossal.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Merciful Staff"),
        rank: 1,
        short_description: String::from(r"Converts damage to subdual damage"),
        description: String::from(r"
            Whenever you use a \magical ability that deals damage, you may activate this staff.
            If you do, that ability deals \glossterm<subdual damage>.
        "),
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Bloodfrenzy Staff"),
        rank: 2,
        short_description: String::from(r"Grants +2 accuracy when you injure a foe"),
        description: String::from(r"
            Whenever you cause a creature to lose \glossterm{hit points} with a \magical ability, you \glossterm{briefly} gain a +2 accuracy bonus against that creature.
            As normal, this bonus does not stack with itself, even if you make the same creature lose hit points multiple times.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants +4 accuracy when you injure a foe", r"
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
            Whenever you use a \magical ability that affects an area and does not have the \abilitytag<Sustain> or \abilitytag<Attune> tags, you can freely exclude a single 5-ft. square from the ability's effect.
            All squares in the final area of the ability must be contiguous.
            You cannot create split an ability's area into multiple completely separate areas.
        "),
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Elision"),
        rank: 2,
        short_description: String::from(r"Allows excluding something from an area"),
        description: String::from(r"
            Whenever you use a \magical ability that affects an area and does not have the \abilitytag<Sustain> or \abilitytag<Attune> tags, you can activate this staff.
            When you do, you choose to have the ability exclude something of your choice.
            The excluded creature or object is not a target of the ability.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Allows excluding up to three things from an area", r"
                You can exclude up to three things of your choice.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Selective Staff"),
        rank: 6,
        short_description: String::from(r"Allows excluding creatures from an area"),
        description: String::from(r"
            Whenever you use a \magical ability that affects an area and does not have the \abilitytag<Sustain> or \abilitytag<Attune> tags, you can activate this staff.
            When you do, you choose to have the ability exclude your \glossterm{allies}, your \glossterm{enemies}, or both.
            Excluded creatures are not targets of the ability.
        "),
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Contracting Staff"),
        rank: 2,
        short_description: String::from(r"Allows reshaping areas to become smaller"),
        description: String::from(r"
            Whenever you use a \magical ability that affects an area and does not have the \abilitytag<Sustain> or \abilitytag<Attune> tags, you can reshape its area.
            The new area must be a radius, line, or 90 degree cone, and it must be able to fit entirely within the ability's original area.
            For example, you could convert a radius into a cone, or a cone into a 5 foot wide line.
            However, you could not convert a line into a cone or radius..
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
            ItemUpgrade::new(4, "Can cast spells without verbal components", r"
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
            ItemUpgrade::new(4, "Can cast spells without verbal components", r"
                The staff no longer needs to be activated.
                You can passively cast spells without using \glossterm<somatic components>.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Tranquility"),
        rank: 6,
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
            Whenever you use a \magical ability that does not have the \abilitytag<Sustain> or \abilitytag<Attune> tags, you may activate this staff.
            When you do, choose a location within \shortrange.
            The ability takes effect as if you were in the chosen location.
            In addition, you increase your \glossterm<fatigue level> by one, and you \glossterm<briefly> cannot activate this staff again.

            This affects your \glossterm<line of effect> for the ability, but not your \glossterm<line of sight> (since you still see from your normal location).
            % Wording?
            Since an ability's range is measured from your location, this item can allow you to affect targets outside your normal range.
            For example, a cone that normally bursts out from you would instead originate from your chosen location, potentially avoiding an obstacle between you and your target.
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
            Whenever you use a \magical ability that does not have the \abilitytag<Sustain> or \abilitytag<Attune> tags, you may activate this staff.
            When you do, the ability \glossterm{repeats} during your next action.
            In addition, you increase your \glossterm<fatigue level> by one, and you \glossterm<briefly> cannot activate this effect again.
        "),
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Hexbite Staff"),
        rank: 2,
        short_description: String::from(r"Deals $dr3l damage when foes remove conditions"),
        description: String::from(r"
            Whenever a creature removes a \glossterm<condition> that you inflicted on it, it takes $dr3l \glossterm<damage>.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Deals $dr5l damage when foes remove conditions", r"
                The damage increases to $dr5l.
            "),
            ItemUpgrade::new(6, "Deals $dr7l damage when foes remove conditions", r"
                The damage increases to $dr7l.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Stored Attunement"),
        rank: 2,
        short_description: String::from(r"Change easily between two stored attunements"),
        description: String::from(r"
            When you cast a \glossterm<targeted> spell that has the \abilitytag<Attune> tag, but is not a \glossterm<deep attunement>, you can invest the magic of the spell in this staff.
            If you do, the spell does not have its normal effect.
            Up to two spells can be stored this way.
            If there are already spells invested in the staff, you can choose which spell to replace to make room for the new spell.

            You can activate this staff as a \glossterm{minor action}.
            When you do, you choose one of the spells that you personally stored in the staff and gain its effects, with yourself as the only target.
            As long as you are attuned to this staff, you do not have to invest an additional attunement point to gain the benefit of a spell in this way, and this does not remove the spell from the staff's storage.
            This effect lasts until you activate the staff again, which can allow you to easily change which benefit you gain.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Change easily between four stored attunements", r"
                You can store up to four spells in the staff.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Baneswallow Staff"),
        rank: 2,
        short_description: String::from(r"Can exert and remove a condition to gain +2 accuracy"),
        description: String::from(r"
            You can activate this staff as a standard action.
            When you do, you remove one \glossterm<condition> affecting you.
            If you remove a condition in this way, you \glossterm<briefly> gain a +2 accuracy bonus with \magical abilities.

            After you activate this item, you increase your \glossterm<fatigue level> by one.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Can remove a condition to gain +2 accuracy", r"
                Activating this staff does not increase your fatigue level.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Lightbearer's Staff"),
        rank: 3,
        short_description: String::from(r"Grants +1 accuracy in brilliant light"),
        description: String::from(r"
            You gain a +1 \glossterm<accuracy> bonus against targets that are in \glossterm<brilliant illumination>.
            In addition, you can activate this staff as a standard action.
            When you do, you create a \medarea radius \glossterm{zone} of brilliant illumination that lasts \glossterm{briefly}.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Grants +2 accuracy in brilliant light", r"
                The accuracy bonus increases to +2, and the area increases to \hugearea.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Bushwalker's Staff"),
        rank: 3,
        short_description: String::from(r"Grants +1 accuracy vs targets in undergrowth"),
        description: String::from(r"
            You gain a +1 \glossterm<accuracy> bonus against targets that are in \glossterm<undergrowth>.
            In addition, you can activate this staff as a standard action.
            When you do, you create a \smallarea radius \glossterm{zone} of \glossterm{light undergrowth} that lasts \glossterm{briefly}.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Grants +2 accuracy vs targets in undergrowth", r"
                The accuracy bonus increases to +2, and the area increases to \medarea.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Blinding Staff"),
        rank: 3,
        short_description: String::from(r"Briefly blinds you and dazzled creature"),
        description: String::from(r"
            Whenever you cause a creature to become \dazzled as a \glossterm<condition>, you may activate this staff.
            If you do, you and that creature are each \glossterm<briefly> \blinded.
            After you activate this staff, you briefly cannot activate it again.
        "),
        tags: vec![AbilityTag::Visual],
        upgrades: vec![
            ItemUpgrade::new(6, "Briefly blinds dazzled creature", r"
                Activating this staff no longer blinds you.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Staff of Energy Conversion"),
        rank: 3,
        short_description: String::from(r"Changes energy type"),
        description: String::from(r"
            Whenever you use a \magical ability that has a \abilitytag{Cold}, \abilitytag{Electricity}, or \abilitytag{Fire} tag, you can remove that tag.
            If you do, you must add a different one of those tags to the ability.
            All of the attack's effects are unchanged.
        "),
        tags: vec![AbilityTag::Cold, AbilityTag::Electricity, AbilityTag::Fire],
        ..Implement::default()
    }));

    // Should always grant approximately 25% more damage for a single-target damage spell,
    // assuming a high power baseline.
    // Rank: Expected damage, expected extra damage, dice-representable extra damage
    // * 3: 11.2, 2.8, 2.5
    // * 5: 22.4, 5.6, 5.5
    // * 7: 44.8, 11.2, 11
    implements.push(Staff(StandardItem {
        name: String::from("Brutish Staff"),
        rank: 2,
        short_description: String::from(r"Grants +1d4 damage if you have 3 Str"),
        description: String::from(r"
            If your Strength is at least 3, you deal 1d4 \glossterm<extra damage> with \magical abilities.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Grants +1d8 damage if you have 4 Str", r"
                The extra damage increases to 1d8 if your Strength is at least 4.
            "),
            ItemUpgrade::new(6, "Grants +3d6 damage if you have 5 Str", r"
                The extra damage increases to 3d6 if your Strength is at least 5.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Staff(StandardItem {
        name: String::from("Educated Staff"),
        rank: 2,
        short_description: String::from(r"Grants +1d4 damage if you have 3 Int"),
        description: String::from(r"
            If your Intelligence is at least 3, you deal 1d4 \glossterm<extra damage> with \magical abilities.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Grants +1d8 damage if you have 4 Int", r"
                The extra damage increases to 1d8 if your Intelligence is at least 4.
            "),
            ItemUpgrade::new(6, "Grants +3d6 damage if you have 5 Int", r"
                The extra damage increases to 3d6 if your Intelligence is at least 5.
            "),
        ],
        ..Implement::default()
    }));

    // Should always grant approximately 25% more damage for a single-target damage spell,
    // assuming a low power baseline.
    // Rank: Expected damage, expected extra damage, dice-representable extra damage
    // * 4: 10, 2.5, 2.5
    // * 6: 20, 5, 5.5
    implements.push(Staff(StandardItem {
        name: String::from("Potent Staff"),
        rank: 3,
        short_description: String::from(r"Grants +1d4 damage"),
        description: String::from(r"
            You deal 1d4 \glossterm<extra damage> with \magical abilities.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants +1d8 damage", r"
                The extra damage increases to 1d8.
            "),
            ItemUpgrade::new(7, "Grants +3d6 damage", r"
                The extra damage increases to 3d6.
            "),
        ],
        ..Implement::default()
    }));

    implements
}
