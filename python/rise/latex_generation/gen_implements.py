#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.magic_item import MagicItem
from rise.latex.util import latexify, longtablify


def generate_implements():
    implements = []

    implements += [
        MagicItem(
            name="Spell Wand, 1st",
            level=2,
            material_type="Wand",
            tags=[],
            description="""
                This wand grants you knowledge of a single rank 1 spell that does not have the \\abilitytag<Attune> tag.
                Each wand is associated with a specific spell, and a single \\glossterm<magic source> that can grant access to that spell.
                You must have the ability to cast spells of the given rank from the same \\glossterm<magic source> as the wand.
                However, you do not need to have access to the \\glossterm<mystic sphere> that the spell belongs to.
                Spells you know because of a spell wand gain any rank upgrades appropriate to your rank with that form of spellcasting.
                If you stop attuning to this item or its effect otherwise ends, the effects of any active spells that you know because of the wand also end, regardless of their normal duration.
            """,
            short_description="Grants knowledge of a rank 1 spell",
        ),
        MagicItem(
            name="Spell Wand, 2nd",
            level=5,
            material_type="Wand",
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 2 spell.
            """,
            short_description="Grants knowledge of a rank 2 spell",
        ),
        MagicItem(
            name="Spell Wand, 3rd",
            level=8,
            material_type="Wand",
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 3 spell.
            """,
            short_description="Grants knowledge of a rank 3 spell",
        ),
        MagicItem(
            name="Spell Wand, 4th",
            level=11,
            material_type="Wand",
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 4 spell.
            """,
            short_description="Grants knowledge of a rank 4 spell",
        ),
        MagicItem(
            name="Spell Wand, 5th",
            level=14,
            material_type="Wand",
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 5 spell.
            """,
            short_description="Grants knowledge of a rank 5 spell",
        ),
        MagicItem(
            name="Spell Wand, 6th",
            level=17,
            material_type="Wand",
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 6 spell.
            """,
            short_description="Grants knowledge of a rank 6 spell",
        ),
        MagicItem(
            name="Spell Wand, 7th",
            level=20,
            material_type="Wand",
            tags=[],
            description="""
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank 7 spell.
            """,
            short_description="Grants knowledge of a rank 7 spell",
        ),
    ]

    implements += [
        MagicItem(
            name="Staff of Shared Healing",
            level=8,
            material_type="Staff",
            tags=[],
            description="""
                Once per round, when you cause a creature other yourself to regain \\glossterm<hit points> using a \\glossterm<magical> ability, you can activate this item as a \\glossterm<free action>.
                When you do, you also regain half that many hit points.
            """,
            short_description="Heals you when you heal others",
        ),
        MagicItem(
            name="Staff of Shared Healing, Greater",
            level=17,
            material_type="Staff",
            tags=[],
            description="""
                Once per round, when you cause a creature other yourself to regain \\glossterm<hit points> using a \\glossterm<magical> ability, you can activate this item as a \\glossterm<free action>.
                When you do, you also regain that many hit points.
            """,
            short_description="Significantly heals you when you heal others",
        ),
    ]

    implements += [
        MagicItem(
            name="Staff of Transit",
            level=5,
            material_type="Staff",
            tags=[],
            description="""
                Your \\glossterm<magical> abilities have the maximum distance they can \\glossterm<teleport> targets doubled.
            """,
            short_description="Doubles your teleportation distance",
        ),
        MagicItem(
            name="Staff of Transit, Greater",
            level=11,
            material_type="Staff",
            tags=[],
            description="""
                Your \\glossterm<magical> abilities have the maximum distance they can \\glossterm<teleport> targets tripled.
            """,
            short_description="Triples your teleportation distance",
        ),
        MagicItem(
            name="Staff of Transit, Supreme",
            level=17,
            material_type="Staff",
            tags=[],
            description="""
                Your \\glossterm<magical> abilities have the maximum distance they can \\glossterm<teleport> targets quadrupled.
            """,
            short_description="Quadruples your teleportation distance",
        ),
    ]

    implements += [
        MagicItem(
            name="Fearsome Staff",
            level=10,
            material_type="Staff",
            tags=["Emotion"],
            description="""
                Whenever you cause an \\glossterm<enemy> to lose \\glossterm<hit points> with a \\glossterm<magical> ability, that creature becomes \\glossterm<briefly> \\glossterm<shaken> by you.
            """,
            short_description="Makes wounded creatures briefly shaken",
        ),
        MagicItem(
            name="Fearsome Staff, Greater",
            level=16,
            material_type="Staff",
            tags=["Emotion"],
            description="""
                Whenever you cause an \\glossterm<enemy> to lose \\glossterm<hit points> with a \\glossterm<magical> ability, that creature becomes \\glossterm<shaken> by you as a \\glossterm<condition>.
            """,
            short_description="Makes wounded creatures shaken",
        ),
    ]

    implements += [
        MagicItem(
            name="Dazing Staff",
            level=13,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you cause an \\glossterm<enemy> to lose \\glossterm<hit points> with a \\glossterm<magical> ability, that creature becomes \\glossterm<briefly> \\glossterm<dazed>.
            """,
            short_description="Makes wounded creatures briefly dazed",
        ),
        MagicItem(
            name="Dazing Staff, Greater",
            level=19,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you cause an \\glossterm<enemy> to lose \\glossterm<hit points> with a \\glossterm<magical> ability, that creature becomes \\glossterm<dazed> as a \\glossterm<condition>.
            """,
            short_description="Makes wounded creatures dazed",
        ),
    ]

    implements += [
        MagicItem(
            name="Extending Staff",
            level=9,
            material_type="Staff",
            description="""
                You double the range of your \\glossterm<magical> abilities.
            """,
            short_description="Doubles range",
        ),
        MagicItem(
            name="Extending Staff, Greater",
            level=15,
            material_type="Staff",
            description="""
                You triple the range of your \\glossterm<magical> abilities.
            """,
            short_description="Triples range",
        ),
    ]

    implements += [
        MagicItem(
            name="Staff of Giants",
            level=7,
            material_type="Staff",
            description="""
                Whenever you use a \\glossterm<magical> ability that has a maximum size category for its targets or any objects it creates, you increase that maximum by one size category, to a maximum of Colossal.
                This does not affect abilities that create creatures of a particular size.
            """,
            short_description="Increases maximum size category of abilities",
        ),
        MagicItem(
            name="Staff of Giants, Greater",
            level=16,
            material_type="Staff",
            description="""
                This implement functions like a \\mitem<staff of giants> implement, except that the maximum size category increases by two size categories.
            """,
            short_description="Significantly increaases maximum size category of abilities",
        ),
    ]

    implements += [
        MagicItem(
            name="Selective Staff",
            level=9,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you use a \\glossterm<magical> ability that affects an area and does not have the \\abilitytag<Sustain> or \\abilitytag<Attune> tags, you can freely exclude any areas from the ability's effect.
                All squares in the final area of the spell must be contiguous.
                You cannot create split a spell's area into multiple completely separate areas.
            """,
            short_description="Allows excluding areas",
        ),
        MagicItem(
            name="Selective Staff, Greater",
            level=15,
            material_type="Staff",
            tags=[],
            description="""
                This implement functions like a \\mitem<selective staff> implement, except that you can split the spell's area into two completely separate areas.
                If you do, each of those two areas must be independently contiguous.
            """,
            short_description="Allows excluding and splitting areas",
        ),
    ]

    implements += [
        MagicItem(
            name="Staff of Silence",
            level=4,
            material_type="Staff",
            tags=['Swift'],
            description="""
                As a \\glossterm<free action>, you can activate this staff.
                When you do, you increase your \\glossterm<fatigue level> by one and \\glossterm<briefly> gain the ability to cast spells without using \\glossterm<verbal components>.
                This ability has the \\glossterm<Swift> tag, so it allows you to cast a spell without verbal components in the same phase that you activate this staff.
            """,
            short_description="Briefly cast spells without verbal components",
        ),
        MagicItem(
            name="Staff of Stillness",
            level=4,
            material_type="Staff",
            tags=['Swift'],
            description="""
                As a \\glossterm<free action>, you can activate this staff.
                When you do, you increase your \\glossterm<fatigue level> by one and \\glossterm<briefly> gain the ability to cast spells without using \\glossterm<somatic components>.
                This ability has the \\glossterm<Swift> tag, so it allows you to cast a spell without somatic components in the same phase that you activate this staff.
            """,
            short_description="Briefly cast spells without somatic components",
        ),
        MagicItem(
            name="Greater Staff of Silence",
            level=10,
            material_type="Staff",
            tags=[],
            description="""
                You can cast spells without using \\glossterm<verbal components>.
            """,
            short_description="Cast spells without verbal components",
        ),
        MagicItem(
            name="Greater Staff of Stillness",
            level=10,
            material_type="Staff",
            tags=[],
            description="""
                You can cast spells without using \\glossterm<somatic components>.
            """,
            short_description="Cast spells without somatic components",
        ),
        MagicItem(
            name="Staff of Tranquility",
            level=16,
            material_type="Staff",
            tags=[],
            description="""
                You can cast spells without using \\glossterm<verbal components> or \\glossterm<somatic components>.
            """,
            short_description="Cast spells without components",
        ),
    ]

    implements += [
        MagicItem(
            name="Reaching Staff",
            level=11,
            material_type="Staff",
            description="""
                Whenever you use a \\glossterm<magical> ability that does not have the \\abilitytag<Sustain> or \\abilitytag<Attune> tags, you may choose a location within \\rngshort range.
                The ability takes effect as if you were in the chosen location.
                This affects your \\glossterm<line of effect> for the ability, but not your \\glossterm<line of sight> (since you still see from your normal location).
                % Wording?
                Since an ability's range is measured from your location, this item can allow you to affect targets outside your normal range.
                For example, a cone that normally bursts out from you would instead originate from your chosen location, potentially avoiding an obstacle between you and your target.
            """,
            short_description="Allows ability use from a short distance away",
        ),
        MagicItem(
            name="Reaching Staff, Greater",
            level=17,
            material_type="Staff",
            description="""
                This implement functions like a \\textit<reaching staff> implement, except that the range increases to \\rngmed range.
            """,
            short_description="Allows ability use from a distance away",
        ),
    ]

    implements.append(
        MagicItem(
            name="Cryptic Staff",
            level=8,
            material_type="Staff",
            tags=[],
            description="""
            Whenever you cast a spell, you may choose a different spell you know.
            If you do, the visual effects and magical aura of the spell you are casting change to match your chosen spell.
            This affects inspection of the spell itself by any means, such as with the Spellsense skill (see \\pcref<Spellsense>).
            However, it does not alter the mechanical effects of the spell in any way.

            An observer can make a Spellsense check with a \\glossterm<difficulty rating> of 15 \\add your magical \\glossterm<power> to identify the spell's true nature, with a minimum \\glossterm<difficulty rating> of 23.
            If the spell's effects depend on visual components, the spell may fail to work if you alter the spell's visuals too much.
        """,
            short_description="Makes spells hard to identify",
        )
    )

    implements += [
        MagicItem(
            name="Protective Staff",
            # +2 level since staff is secondary for this effect
            level=6,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +1 \\glossterm<magic bonus> to Armor defense.
            """,
            short_description="Grants +1 Armor defense",
        ),
        MagicItem(
            name="Protective Staff, Greater",
            level=12,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to Armor defense.
            """,
            short_description="Grants +2 Armor defense",
        ),
        MagicItem(
            name="Protective Staff, Supreme",
            level=18,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to Armor defense.
            """,
            short_description="Grants +3 Armor defense",
        ),
    ]

    implements += [
        MagicItem(
            name="Widening Staff",
            level=12,
            material_type="Staff",
            tags=[],
            description="""
                Whenever you use a \\glossterm<magical> ability that affects an area and does not have the \\abilitytag<Attune> or \\abilitytag<Sustain> tags, you may double its area.
            """,
            short_description="Doubles area size",
        ),
        MagicItem(
            name="Widening Staff, Greater",
            level=18,
            material_type="Staff",
            tags=[],
            description="""
                This implement functions like a \\textit<widening staff> implement, except that it triples the area instead of doubling it.
            """,
            short_description="Triples area size",
        ),
    ]

    implements.append(
        MagicItem(
            name="Staff of Focus",
            level=5,
            material_type="Staff",
            description="""
            You reduce your \\glossterm<focus penalty> by 1.
        """,
            short_description="Reduces \\glossterm<focus penalty> by 1",
        )
    )

    implements += [
        MagicItem(
            name="Staff of Potency",
            level=4,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to your \\glossterm<power>.
            """,
            short_description="Grants +2 power",
        ),
        MagicItem(
            name="Staff of Potency, Greater",
            level=10,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +4 \\glossterm<magic bonus> to your \\glossterm<power>.
            """,
            short_description="Grants +4 power",
        ),
        MagicItem(
            name="Staff of Potency, Supreme",
            level=16,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +8 \\glossterm<magic bonus> to your \\glossterm<power>.
            """,
            short_description="Grants +8 power",
        ),
    ]

    implements += [
        MagicItem(
            name="Staff of the Archmagi",
            level=7,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy>.
                In addition, you gain a +2 \\glossterm<magic bonus> to your \\glossterm<power>.
            """,
            short_description="Grants +1 accuracy, +2 power",
        ),
        MagicItem(
            name="Staff of the Archmagi, Greater",
            level=16,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to \\glossterm<accuracy>.
                In addition, you gain a +4 \\glossterm<magic bonus> to your \\glossterm<power>.
            """,
            short_description="Grants +2 accuracy, +4 power",
        ),
    ]

    implements += [
        MagicItem(
            name="Staff of Precision",
            level=4,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy>.
            """,
            short_description="Grants +1 accuracy",
        ),
        MagicItem(
            name="Staff of Precision, Greater",
            level=10,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +2 \\glossterm<magic bonus> to \\glossterm<accuracy>.
            """,
            short_description="Grants +2 accuracy",
        ),
        MagicItem(
            name="Staff of Precision, Supreme",
            level=16,
            material_type="Staff",
            tags=[],
            description="""
                You gain a +3 \\glossterm<magic bonus> to \\glossterm<accuracy>.
            """,
            short_description="Grants +3 accuracy",
        ),
    ]

    implements += [
        MagicItem(
            name="Blessed Staff",
            level=4,
            material_type="Staff",
            tags=[],
            description="""
                When you use the \\textit<desperate exertion> ability to affect a \\glossterm<magical> ability, you gain a +2 bonus to the reroll.
                This stacks with the normal +2 bonus from the \\textit<desperate exertion> ability.
            """,
            short_description="Grants +2 bonus with \\textit<desperate exertion>",
        ),
        MagicItem(
            name="Blessed Staff, Greater",
            level=10,
            material_type="Staff",
            tags=[],
            description="""
                When you use the \\textit<desperate exertion> ability to affect a \\glossterm<magical> ability, you gain a +3 bonus to the reroll.
                This stacks with the normal +2 bonus from the \\textit<desperate exertion> ability.
            """,
            short_description="Grants +3 bonus with \\textit<desperate exertion>",
        ),
        MagicItem(
            name="Blessed Staff, Supreme",
            level=16,
            material_type="Staff",
            tags=[],
            description="""
                When you use the \\textit<desperate exertion> ability to affect a \\glossterm<magical> ability, you gain a +4 bonus to the reroll.
                This stacks with the normal +2 bonus from the \\textit<desperate exertion> ability.
            """,
            short_description="Grants +4 bonus with \\textit<desperate exertion>",
        ),
    ]

    implements += [
        MagicItem(
            name="Hexbite Staff",
            level=5,
            material_type="Staff",
            tags=[],
            description="""
                Whenever a creature removes a \\glossterm<condition> that you inflicted on it, it takes 1d10 + half \\glossterm<power> \\glossterm<energy damage>.
            """,
            short_description="Deals 1d10 damage when creatures remove conditions",
        ),
        MagicItem(
            name="Hexbite Staff, Greater",
            level=11,
            material_type="Staff",
            tags=[],
            description="""
                Whenever a creature removes a \\glossterm<condition> that you inflicted on it, it takes 2d10 + half \\glossterm<power> \\glossterm<energy damage>.
            """,
            short_description="Deals 2d10 damage when creatures remove conditions",
        ),
        MagicItem(
            name="Hexbite Staff, Supreme",
            level=17,
            material_type="Staff",
            tags=[],
            description="""
                Whenever a creature removes a \\glossterm<condition> that you inflicted on it, it takes 4d10 + half \\glossterm<power> \\glossterm<energy damage>.
            """,
            short_description="Deals 4d10 damage when creatures remove conditions",
        ),
    ]

    implements += [
        MagicItem(
            name="Staff of the Martyr",
            level=10,
            material_type="Staff",
            tags=[],
            description="""
                You can use \\abilitytag<Healing> abilities even if you used a Healing ability during the previous round.
                However, \\abilitytag<Healing> abilities cannot cause you to regain any hit points.
            """,
            short_description="Heal others more frequently, but not yourself",
        ),
    ]

    implements += [
        MagicItem(
            name="Staff of Stored Attunement",
            # this has a dangerous interaction with legacy items, so avoid
            # making that too easy
            level=6,
            material_type="Staff",
            tags=[],
            description="""
                When you cast a \\glossterm<targeted> spell that has the \\glossterm<Attune> tag, you can invest the magic of the spell in this staff.
                If you do, the spell does not have its normal effect.
                Up to two spells can be stored this way.
                If there are already spells invested in the staff, you can choose which spell to replace to make room for the new spell.

                As a \\glossterm<minor action>, you can activate this staff.
                When you do, you choose one of the spells that you personally stored the staff and gain its effects, with yourself as the only target.
                You do not have to invest an additional attunement point to gain the benefit of a spell in this way, and this does not remove the spell from the staff's storage.
                This effect lasts until you activate the staff again, which can allow you to easily change which benefit you gain.
            """,
            short_description="Change easily between two stored attunements",
        ),
        MagicItem(
            name="Staff of Stored Attunement, Greater",
            level=12,
            material_type="Staff",
            tags=[],
            description="""
                This staff functions like a \\mitem<staff of stored attunement>, except that you can store up to three spells in the staff.
            """,
            short_description="Change easily between three stored attunements",
        ),
        MagicItem(
            name="Staff of Stored Attunement, Supreme",
            level=18,
            material_type="Staff",
            tags=[],
            description="""
                This staff functions like a \\mitem<staff of stored attunement>, except that you can store up to four spells in the staff.
            """,
            short_description="Change easily between four stored attunements",
        ),
    ]

    implements += [
        MagicItem(
            name="Baneswallow Staff",
            level=5,
            material_type="Staff",
            tags=[],
            description="""
                As a standard action, you can activate this staff.
                When you do, you remove one \\glossterm<condition> affecting you.
                This cannot remove an effect applied during the current round.
                If you remove a condition in this way, you \\glossterm<briefly> gain a +2 bonus to your \\glossterm<power>.

                After you use this ability, you increase your \\glossterm<fatigue level> by one.
            """,
            short_description="Fatigue and remove a condition to gain power",
        ),
        MagicItem(
            name="Baneswallow Staff, Greater",
            level=11,
            material_type="Staff",
            tags=[],
            description="""
                As a standard action, you can activate this staff.
                When you do, you remove one \\glossterm<condition> affecting you.
                This cannot remove an effect applied during the current round.
                If you remove a condition in this way, you \\glossterm<briefly> gain a +4 bonus to your \\glossterm<power>.
            """,
            short_description="Remove a condition to gain power",
        ),
        MagicItem(
            name="Baneswallow Staff, Supreme",
            level=17,
            material_type="Staff",
            tags=[],
            description="""
                As a standard action, you can activate this staff.
                When you do, you remove one or two \\glossterm<conditions> affecting you.
                This cannot remove effects applied during the current round.
                If you remove at least one condition in this way, you \\glossterm<briefly> gain a +8 bonus to your \\glossterm<power>.
            """,
            short_description="Remove conditions to gain power",
        ),
    ]

    return implements


def sanity_check(implements):
    pass


def generate_implement_latex(check=False):
    implements = sorted(generate_implements(), key=lambda implements: implements.name)
    if check:
        sanity_check(implements)

    texts = []
    for item in implements:
        try:
            texts.append(item.latex())
        except Exception as e:
            raise Exception(f"Error converting item '{item.name}' to LaTeX") from e

    text = "\n".join(texts)
    return latexify(text)


def generate_implement_table():
    implements = sorted(
        sorted(generate_implements(), key=lambda item: item.name),
        key=lambda item: item.level,
    )
    rows = [item.latex_table_row() for item in implements]
    row_text = "\n".join(rows)
    return longtablify(
        f"""
        \\lcaption<Implement Items> \\\\
        \\tb<Name> & \\tb<Item Level (Cost)> & \\tb<Type> & \\tb<Description> & \\tb<Page> \\tableheaderrule
        {row_text}
    """
    )


def write_to_file():
    implement_latex = generate_implement_latex()
    implement_table = generate_implement_table()
    with open(book_path("implements.tex"), "w") as implement_description_file:
        implement_description_file.write(implement_latex)
    with open(book_path("implements_table.tex"), "w") as implement_table_file:
        implement_table_file.write(implement_table)


@click.command()
@click.option("-c", "--check/--no-check", default=False)
@click.option("-o", "--output/--no-output", default=False)
def main(output, check):
    if output:
        write_to_file()
    else:
        print(generate_implement_latex())


if __name__ == "__main__":
    main()
