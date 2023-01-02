#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem, generate_table
from rise.latex.util import latexify
from rise.latex.tags import add_attune_tag

def create_implement(
    name, rank, material_type, description, short_description, tags=None
):
    return MagicItem(
        name=name,
        rank=rank,
        material_type=material_type,
        description=description,
        short_description=short_description,
        is_magical=True,
        tags=add_attune_tag(tags),
    )


def generate_implements():
    implements = []

    implements += [
        create_implement(
            name="Spell Wand, 1st",
            rank=1,
            material_type="Wand",
            tags=[],
            description="""
                This wand grants you knowledge of a single rank 1 spell that does not have the \\abilitytag<Attune> or \\abilitytag<Sustain> tags.
                Each wand is associated with a specific spell, and a single \\glossterm<magic source> that can grant access to that spell.
                You must have the ability to cast spells of the given rank from the same \\glossterm<magic source> as the wand.
                However, you do not need to have access to the \\glossterm<mystic sphere> that the spell belongs to.
                Spells you know because of a spell wand gain any rank upgrades appropriate to your rank with that form of spellcasting.

                If you stop wielding this wand, deattune from it, or otherwise lose access to its magical effects, the effects of any active spells that you know because of the wand also end, regardless of their normal duration.
            """,
            short_description="Grants knowledge of a rank 1 spell",
        ),
        create_implement(
            name="Spell Wand, 2nd",
            rank=2,
            material_type="Wand",
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 2 spell.
            """,
            short_description="Grants knowledge of a rank 2 spell",
        ),
        create_implement(
            name="Spell Wand, 3rd",
            rank=3,
            material_type="Wand",
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 3 spell.
            """,
            short_description="Grants knowledge of a rank 3 spell",
        ),
        create_implement(
            name="Spell Wand, 4th",
            rank=4,
            material_type="Wand",
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 4 spell.
            """,
            short_description="Grants knowledge of a rank 4 spell",
        ),
        create_implement(
            name="Spell Wand, 5th",
            rank=5,
            material_type="Wand",
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 5 spell.
            """,
            short_description="Grants knowledge of a rank 5 spell",
        ),
        create_implement(
            name="Spell Wand, 6th",
            rank=6,
            material_type="Wand",
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 6 spell.
            """,
            short_description="Grants knowledge of a rank 6 spell",
        ),
        create_implement(
            name="Spell Wand, 7th",
            rank=7,
            material_type="Wand",
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 7 spell.
            """,
            short_description="Grants knowledge of a rank 7 spell",
        ),
    ]

    implements += [
        create_implement(
            name="Staff of Shared Healing",
            rank=4,
            material_type="Staff",
            tags=['Swift (see text)'],
            description="""
                Once per round, when you cause a creature other yourself to regain \\glossterm<hit points> using a \\magical ability, you can activate this item.
                When you do, you also regain that many hit points, and you increase your \\glossterm<fatigue level> by one.
                This ability has the \\abilitytag<Swift> tag if you use it to affect healing with a Swift ability.
            """,
            short_description="Exert to heal you when you heal others",
        ),
    ]

    implements += [
        create_implement(
            name="Staff of Pleasant Healing",
            rank=2,
            material_type="Staff",
            tags=[],
            description="""
                Once per round, when you cause a creature other yourself to regain \\glossterm<hit points> using a \\magical ability, you can activate this item.
                When you do, the target \\glossterm<briefly> gains a +2 bonus to its Mental defense.
                This ability does not have the \\abilitytag<Swift> tag, so it resolves after incoming attacks during the current phase.
            """,
            short_description="Grants +2 Mental defense with your healing",
        ),
        create_implement(
            name="Staff of Pleasant Healing, Greater",
            rank=5,
            material_type="Staff",
            tags=[],
            description="""
                Once per round, when you cause a creature other yourself to regain \\glossterm<hit points> using a \\magical ability, you can activate this item.
                When you do, the target \\glossterm<briefly> gains a +3 bonus to its Mental defense.
                This ability does not have the \\abilitytag<Swift> tag, so it resolves after incoming attacks during the current phase.
            """,
            short_description="Grants +3 Mental defense with your healing",
        ),
    ]

    implements += [
        create_implement(
            name="Staff of Gut-Wrenching Fear",
            rank=2,
            material_type="Staff",
            tags=["Emotion"],
            description="""
                Creatures that are shaken, frightened or panicked by you suffer a penalty to their Fortitude defense equal to the penalty they suffer to their Mental defense.
            """,
            short_description="Fear effects also penalize Fortitude",
        ),
        create_implement(
            name="Staff of Agonizing Fear",
            rank=5,
            material_type="Staff",
            tags=["Emotion"],
            description="""
                Creatures that are shaken, frightened or panicked by you suffer a penalty to their non-Mental defenses equal to the penalty they suffer to their Mental defense.
            """,
            short_description="Fear effects penalize all defenses",
        ),
    ]

    implements += [
        create_implement(
            name="Staff of Discordance",
            rank=3,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you cause an enemy to be \\dazed as a \\glossterm<condition>, it is also \\glossterm<briefly> \\stunned.
            """,
            short_description="Makes dazed creatures briefly stunned",
        ),
        create_implement(
            name="Staff of Discordance, Greater",
            rank=6,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you cause an enemy to be \\stunned as a \\glossterm<condition>, it is also \\glossterm<briefly> \\confused.
            """,
            short_description="Makes stunned creatures briefly confused",
        ),
    ]

    implements += [
        create_implement(
            name="Staff of Hindrance",
            rank=4,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you cause an enemy to be \\slowed as a \\glossterm<condition>, that condition must be removed an additional time before the effect ends.
            """,
            short_description="Your slowing effects last much longer",
        ),
    ]

    implements += [
        create_implement(
            name="Extending Staff",
            rank=2,
            material_type="Staff",
            description="""
                You gain a +15 foot bonus to the \\glossterm<range> of all of your ranged \\magical abilities.
                This does not affect abilities that do not have a range listed in feet.
            """,
            short_description="Grants +15 foot range",
        ),
        create_implement(
            name="Extending Staff, Greater",
            rank=4,
            material_type="Staff",
            description="""
                You gain a +30 foot bonus to the \\glossterm<range> of all of your ranged \\magical abilities.
                This does not affect abilities that do not have a range listed in feet.
            """,
            short_description="Grants +30 foot range",
        ),
        create_implement(
            name="Extending Staff, Supreme",
            rank=6,
            material_type="Staff",
            description="""
                You gain a +60 foot bonus to the \\glossterm<range> of all of your ranged \\magical abilities.
                This does not affect abilities that do not have a range listed in feet.
            """,
            short_description="Grants +60 foot range",
        ),
    ]

    implements += [
        create_implement(
            name="Staff of Giants",
            rank=3,
            material_type="Staff",
            description="""
                Whenever you use a \\magical ability that has a maximum size category for its targets or any objects it creates, you increase that maximum by one size category, to a maximum of Colossal.
                This does not affect abilities that create creatures of a particular size.
            """,
            short_description="Increases maximum size category of abilities",
        ),
        create_implement(
            name="Staff of Giants, Greater",
            rank=6,
            material_type="Staff",
            description="""
                This implement functions like a \\mitem<staff of giants>, except that the maximum size category increases by two size categories.
            """,
            short_description="Significantly increases maximum size category of abilities",
        ),
    ]

    implements.append(
        create_implement(
            name="Merciful Staff",
            rank=1,
            material_type="Staff",
            description="""
                Whenever you use a \\magical ability that deals damage, you may activate this staff.
                If you do, that ability deals \\glossterm<subdual damage>.
            """,
            short_description="Allows dealing subdual damage",
        )
    )

    implements += [
        create_implement(
            name="Onslaught Staff",
            rank=1,
            material_type="Staff",
            description="""
                Whenever you \\glossterm<defeat> a creature with within \\medrange of you with a \\magical ability, you gain a +10 foot bonus to your land speed during the next round.
                In addition, if the creature was at least one \\glossterm<size category> larger than you, you \\glossterm<briefly> gain a +1 \\glossterm<accuracy> bonus.
            """,
            short_description="Grants +10 speed, maybe +1 accuracy on kill",
        ),
        create_implement(
            name="Onslaught Staff, Greater",
            rank=5,
            material_type="Staff",
            description="""
                Whenever you \\glossterm<defeat> a creature with within \\medrange of you with a \\magical ability, you gain a +20 foot bonus to your land speed during the next round.
                In addition, if the creature was at least one \\glossterm<size category> larger than you, you \\glossterm<briefly> gain a +3 \\glossterm<accuracy> bonus.
            """,
            short_description="Grants +20 speed, maybe +3 accuracy on kill",
        ),
    ]

    implements += [
        create_implement(
            name="Selective Staff",
            rank=1,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you use a \\magical ability that affects an area and does not have the \\abilitytag<Sustain> or \\abilitytag<Attune> tags, you can freely exclude a single 5-ft. square from the spell's effect.
                All squares in the final area of the spell must be contiguous.
                You cannot create split a spell's area into multiple completely separate areas.
            """,
            short_description="Allows excluding a single square from an area",
        ),
        create_implement(
            name="Selective Staff, Greater",
            rank=3,
            material_type="Staff",
            tags=[],
            description="""
                This implement functions like a \\mitem<selective staff>, except that you can exclude any number of squares rather than only one.
            """,
            short_description="Allows excluding areas",
        ),
        create_implement(
            name="Selective Staff, Supreme",
            rank=5,
            material_type="Staff",
            tags=[],
            description="""
                This implement functions like a \\mitem<selective staff>, except that you can split the spell's area into two completely separate areas.
                If you do, each of those two areas must be independently contiguous.
            """,
            short_description="Allows excluding and splitting areas",
        ),
    ]

    implements += [
        create_implement(
            name="Staff of Silence",
            rank=1,
            material_type="Staff",
            tags=[],
            description="""
                As a \\glossterm<free action>, you can activate this staff.
                When you do, you increase your \\glossterm<fatigue level> by one and \\glossterm<briefly> gain the ability to cast spells without using \\glossterm<verbal components>.
            """,
            short_description="Can exert to cast spells without verbal components",
        ),
        create_implement(
            name="Staff of Stillness",
            rank=1,
            material_type="Staff",
            tags=[],
            description="""
                As a \\glossterm<free action>, you can activate this staff.
                When you do, you increase your \\glossterm<fatigue level> by one and \\glossterm<briefly> gain the ability to cast spells without using \\glossterm<somatic components>.
            """,
            short_description="Can exert to cast spells without somatic components",
        ),
        create_implement(
            name="Staff of Silence, Greater",
            rank=4,
            material_type="Staff",
            tags=[],
            description="""
                You can cast spells without using \\glossterm<verbal components>.
            """,
            short_description="Can cast spells without verbal components",
        ),
        create_implement(
            name="Staff of Stillness, Greater",
            rank=4,
            material_type="Staff",
            tags=[],
            description="""
                You can cast spells without using \\glossterm<somatic components>.
            """,
            short_description="Can cast spells without somatic components",
        ),
        create_implement(
            name="Staff of Tranquility",
            rank=6,
            material_type="Staff",
            tags=[],
            description="""
                You can cast spells without using \\glossterm<verbal components> or \\glossterm<somatic components>.
            """,
            short_description="Can cast spells without components",
        ),
    ]

    implements += [
        create_implement(
            name="Reaching Staff",
            rank=3,
            material_type="Staff",
            description="""
                Whenever you use a \\magical ability that does not have the \\abilitytag<Sustain> or \\abilitytag<Attune> tags, you may activate this staff.
                When you do, choose a location within \\rngshort range.
                The ability takes effect as if you were in the chosen location.
                In addition, you increase your \\glossterm<fatigue level> by one.
                This affects your \\glossterm<line of effect> for the ability, but not your \\glossterm<line of sight> (since you still see from your normal location).
                % Wording?
                Since an ability's range is measured from your location, this item can allow you to affect targets outside your normal range.
                For example, a cone that normally bursts out from you would instead originate from your chosen location, potentially avoiding an obstacle between you and your target.
            """,
            short_description="Can exert to use abilities from a short distance away",
        ),
        create_implement(
            name="Reaching Staff, Greater",
            rank=5,
            material_type="Staff",
            description="""
                This implement functions like a \\textit<reaching staff>, except that activating it does not increase your \\glossterm<fatigue level>.
            """,
            short_description="Can use abilities from a short distance away",
        ),
    ]

    implements += [
        create_implement(
            name="Distant Staff",
            rank=3,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you use a \\magical ability with a \\glossterm<range>, you may activate this staff.
                When you do, you double the spell's range.
                In addition, you increase your \\glossterm<fatigue level> by two.
            """,
            short_description="Can exert to double area size",
        ),
        create_implement(
            name="Distant Staff, Greater",
            rank=6,
            material_type="Staff",
            tags=[],
            description="""
                This implement functions like a \\textit<distant staff>, except that activating it only increases your fatigue level by one.
            """,
            short_description="Can exert to double range",
        ),
    ]

    implements += [
        create_implement(
            name="Widening Staff",
            rank=4,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you use a \\magical ability that affects an area and does not have the \\abilitytag<Attune> or \\abilitytag<Sustain> tags, you may activate this staff.
                When you do, you double the spell's area.
                In addition, you increase your \\glossterm<fatigue level> by two.
            """,
            short_description="Can exert to double area size",
        ),
        create_implement(
            name="Widening Staff, Greater",
            rank=7,
            material_type="Staff",
            tags=[],
            description="""
                This implement functions like a \\textit<widening staff>, except that activating it only increases your fatigue level by one.
            """,
            short_description="Can exert to double area size",
        ),
    ]
    implements += [
        create_implement(
            name="Staff of Potency",
            rank=2,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to your \\glossterm<power>.
            """,
            short_description="Grants +2 power",
        ),
        create_implement(
            name="Staff of Potency, Greater",
            rank=4,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<power>.
            """,
            short_description="Grants +4 power",
        ),
        create_implement(
            name="Staff of Potency, Supreme",
            rank=6,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<power>.
            """,
            short_description="Grants +8 power",
        ),
    ]

    implements += [
        create_implement(
            name="Blessed Staff",
            rank=3,
            material_type="Staff",
            tags=[],
            description="""
                When you use the \\textit<desperate exertion> ability to affect a \\magical ability, you gain a +2 accuracy bonus to the reroll.
                This stacks with the normal +2 bonus from the \\textit<desperate exertion> ability.
            """,
            short_description="Grants +2 bonus with \\textit<desperate exertion>",
        ),
        create_implement(
            name="Blessed Staff, Greater",
            rank=5,
            material_type="Staff",
            tags=[],
            description="""
                When you use the \\textit<desperate exertion> ability to affect a \\magical ability, you gain a +3 accuracy bonus to the reroll.
                This stacks with the normal +2 bonus from the \\textit<desperate exertion> ability.
            """,
            short_description="Grants +3 bonus with \\textit<desperate exertion>",
        ),
        create_implement(
            name="Blessed Staff, Supreme",
            rank=7,
            material_type="Staff",
            tags=[],
            description="""
                When you use the \\textit<desperate exertion> ability to affect a \\magical ability, you gain a +4 accuracy bonus to the reroll.
                This stacks with the normal +2 bonus from the \\textit<desperate exertion> ability.
            """,
            short_description="Grants +4 bonus with \\textit<desperate exertion>",
        ),
    ]

    implements += [
        create_implement(
            name="Hexbite Staff",
            rank=2,
            material_type="Staff",
            tags=[],
            description="""
                Whenever a creature removes a \\glossterm<condition> that you inflicted on it, it takes 2d6+4 \\glossterm<energy damage>.
            """,
            short_description="Deals 2d6+4 damage when foes remove conditions",
        ),
        create_implement(
            name="Hexbite Staff, Greater",
            rank=4,
            material_type="Staff",
            tags=[],
            description="""
                Whenever a creature removes a \\glossterm<condition> that you inflicted on it, it takes 4d6+7 \\glossterm<energy damage>.
            """,
            short_description="Deals 4d6+7 damage when foes remove conditions",
        ),
        create_implement(
            name="Hexbite Staff, Supreme",
            rank=6,
            material_type="Staff",
            tags=[],
            description="""
                Whenever a creature removes a \\glossterm<condition> that you inflicted on it, it takes 5d10+14 \\glossterm<energy damage>.
            """,
            short_description="Deals 5d10+14 damage when foes remove conditions",
        ),
    ]

    implements += [
        create_implement(
            name="Staff of Stored Attunement",
            rank=2,
            material_type="Staff",
            tags=[],
            description="""
                When you cast a \\glossterm<targeted> spell that has the \\abilitytag<Attune> tag, but is not a \\glossterm<deep attunement>, you can invest the magic of the spell in this staff.
                If you do, the spell does not have its normal effect.
                Up to two spells can be stored this way.
                If there are already spells invested in the staff, you can choose which spell to replace to make room for the new spell.

                As a \\glossterm<minor action>, you can activate this staff.
                When you do, you choose one of the spells that you personally stored in the staff and gain its effects, with yourself as the only target.
                As long as you are attuned to this staff, you do not have to invest an additional attunement point to gain the benefit of a spell in this way, and this does not remove the spell from the staff's storage.
                This effect lasts until you activate the staff again, which can allow you to easily change which benefit you gain.
            """,
            short_description="Change easily between two stored attunements",
        ),
        create_implement(
            name="Staff of Stored Attunement, Greater",
            rank=4,
            material_type="Staff",
            tags=[],
            description="""
                This staff functions like a \\mitem<staff of stored attunement>, except that you can store up to three spells in the staff.
            """,
            short_description="Change easily between three stored attunements",
        ),
        create_implement(
            name="Staff of Stored Attunement, Supreme",
            rank=6,
            material_type="Staff",
            tags=[],
            description="""
                This staff functions like a \\mitem<staff of stored attunement>, except that you can store up to four spells in the staff.
            """,
            short_description="Change easily between four stored attunements",
        ),
    ]

    implements += [
        create_implement(
            name="Baneswallow Staff",
            rank=2,
            material_type="Staff",
            tags=[],
            description="""
                As a standard action, you can activate this staff.
                When you do, you remove one \\glossterm<condition> affecting you.
                If you remove a condition in this way, you \\glossterm<briefly> gain a +2 bonus to your \\glossterm<power>.

                After you use this ability, you increase your \\glossterm<fatigue level> by one.
            """,
            short_description="Can exert and remove a condition to gain power",
        ),
        create_implement(
            name="Baneswallow Staff, Greater",
            rank=4,
            material_type="Staff",
            tags=[],
            description="""
                As a standard action, you can activate this staff.
                When you do, you remove one \\glossterm<condition> affecting you.
                If you remove a condition in this way, you \\glossterm<briefly> gain a +4 bonus to your \\glossterm<power>.
            """,
            short_description="Can remove a condition to gain power",
        ),
        create_implement(
            name="Baneswallow Staff, Supreme",
            rank=6,
            material_type="Staff",
            tags=[],
            description="""
                As a standard action, you can activate this staff.
                When you do, you remove one or two \\glossterm<conditions> affecting you.
                If you remove at least one condition in this way, you \\glossterm<briefly> gain a +8 bonus to your \\glossterm<power>.
            """,
            short_description="Can remove conditions to gain power",
        ),
    ]

    implements += [
        create_implement(
            name="Splitting Staff",
            rank=2,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you use a non-\\glossterm<strike> \\magical ability that targets a single creature or object and which does not have the \\abilitytag<Sustain> tag, you may activate this staff.
                When you do, increase the number of targets that the ability affects by one.
                In addition, you increase your \\glossterm<fatigue level> by one.
                If the spell does not have a defined range, this staff has no effect on it.
            """,
            short_description="Can exert to add an extra target",
        ),
        create_implement(
            name="Splitting Staff, Greater",
            rank=6,
            material_type="Staff",
            tags=[],
            description="""
                This staff functions like a \\mitem<splitting staff>, except that activating it does not increase your \\glossterm<fatigue level>.
            """,
            short_description="Can add an extra target",
        ),
    ]

    implements += [
        create_implement(
            name="Echoing Staff",
            rank=7,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you use a \\magical ability that does not have the \\abilitytag<Sustain> or \\abilitytag<Attune> tags, you may activate this staff.
                When you do, you increase your \\glossterm<fatigue level> by one.
                During the \\glossterm<action phase> of the next round, the spell takes effect again with the same choices for all decisions, such as targets.
            """,
            short_description="Can exert to repeat effect",
        ),
    ]

    # Would be nice to have a staff concept for each mystic sphere

    implements += [
        create_implement(
            name="Staff of Radiance",
            rank=4,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +1 \\glossterm<accuracy> bonus against creatures that are in \\glossterm<brilliant illumination>.
                In addition, as a standard action, you can \\glossterm<briefly> create \\glossterm<brilliant illumination> in a \\arealarge radius \\glossterm<zone> from you.
            """,
            short_description="Grants +1 accuracy vs foes in brilliant light",
        ),
        create_implement(
            name="Staff of Radiance, Greater",
            rank=7,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +2 \\glossterm<accuracy> bonus against creatures that are in \\glossterm<brilliant illumination>.
                In addition, as a standard action, you can \\glossterm<briefly> create \\glossterm<brilliant illumination> in a \\areahuge radius \\glossterm<zone> from you.
            """,
            short_description="Grants +2 accuracy vs foes in brilliant light",
        ),
    ]

    implements += [
        create_implement(
            name="Blinding Staff",
            rank=4,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you cause a creature to become \\dazzled as a \\glossterm<condition>, you may activate this staff.
                If you do, you and that creature are each \\glossterm<briefly> \\blinded.
            """,
            short_description="Briefly blinds you and dazzled creatures",
        ),
        create_implement(
            name="Blinding Staff, Greater",
            rank=7,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you cause a creature to become \\dazzled as a \\glossterm<condition>, you may activate this staff.
                If you do, that creature is \\glossterm<briefly> \\blinded.
            """,
            short_description="Briefly blinds dazzled creatures",
        ),
    ]

    implements += [
        create_implement(
            name="Bushwalker's Staff",
            rank=4,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +1 \\glossterm<accuracy> bonus against creatures that are in \\glossterm<undergrowth>.
                In addition, as a standard action, you can \\glossterm<briefly> create \\glossterm<light undergrowth> in a \\areasmall radius \\glossterm<zone> from you.
            """,
            short_description="Grants +1 accuracy vs foes in undergrowth",
        ),
        create_implement(
            name="Bushwalker's Staff, Greater",
            rank=7,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +2 \\glossterm<accuracy> bonus against creatures that are in \\glossterm<undergrowth>.
                In addition, as a standard action, you can \\glossterm<briefly> create \\glossterm<light undergrowth> in a \\areamed radius \\glossterm<zone> from you.
            """,
            short_description="Grants +2 accuracy vs foes in undergrowth",
        ),
    ]

    implements += [
        create_implement(
            name="Staff of Energetic Conversion",
            rank=4,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you use a \\magical ability that deals a subtype of \\glossterm<energy damage>, you may choose to convert that damage to a different subtype of energy damage.
                If the damage also other specific types, those damage types are unchanged.
                In addition, any non-damaging effects of the attack are unchanged.
            """,
            short_description="Changes energy damage types",
        ),
    ]

    return implements


def generate_implement_latex():
    implements = sorted(generate_implements(), key=lambda implements: implements.name)

    texts = []
    for item in implements:
        try:
            texts.append(item.latex())
        except Exception as e:
            raise Exception(f"Error converting item '{item.name}' to LaTeX") from e

    text = "\n".join(texts)
    return latexify(text)


def write_to_file():
    implement_latex = generate_implement_latex()
    implement_table = generate_table(generate_implements(), "Magic Implements", include_type=True)
    with open(book_path("implements.tex"), "w") as implement_description_file:
        implement_description_file.write(implement_latex)
    with open(book_path("implements_table.tex"), "w") as implement_table_file:
        implement_table_file.write(implement_table)


@click.command()
@click.option("-c", "--check/--no-check", default=False)
@click.option("-o", "--output/--no-output", default=False)
def main(output):
    if output:
        write_to_file()
    else:
        print(generate_implement_latex())


if __name__ == "__main__":
    main()
