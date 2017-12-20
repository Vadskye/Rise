#!/usr/bin/env python3

import click
from rise.latex.attack import Attack
from rise.latex.effects import Effects
from rise.latex.header import Header
from rise.latex.spell import Spell
from rise.latex.subspell import Subspell
from rise.latex.targeting import Targeting
from rise.latex.util import latexify

def generate_rituals():
    rituals = []

    rituals.append(Spell(
        base_level=3,
        name="Animate Dead",
        header=Header("You bind a fragment of a dead creature's soul to its corpse, reanimating it as an undead skeleton or zombie."),
        targeting=Targeting(
            target='One or more corpses',
            rng='close',
            time='One hour',
            special='The combined levels of all targets cannot exceed your spellpower.',
        ),
        effects=Effects(
            effect="""
                The target becomes an undead creature that obeys your spoken commands.
                You choose whether to create a skeleton or a zombie.
                Creating a zombie require a mostly intact corpse, including most of the flesh.
                Creating a skeleton only requires a mostly intact skeleton.
                If a skeleton is made from an intact corpse, the flesh quickly falls off the animated bones.

                This effect lasts as long as you \\glossterm<attune> to it.
                If you use this ability multiple times, you can attune to it each time.
            """,
            tags=['Evil', 'Negative'],
        ),
        schools=['Vivimancy'],
        lists=['Arcane', 'Divine'],
        subspells=[],
    ))

    rituals.append(Spell(
        name="Mystic Lock",
        base_level=2,
        targeting=Targeting(
            target='One Large or smaller closable, nonmagical object, such as a door or box',
            rng='close',
            time='One minute',
        ),
        effects=Effects(
            effect="""
                The target object is magically locked.
                It can be unlocked with a Devices check against a DR equal to 20 \\add your spellpower.
                The DR to break it open forcibly increases by 10.

                You can freely pass your own \\ritual<arcane lock> as if the object were not locked.
                This effect lasts as long as you \\glossterm<attune> to it.
                If you use this ability multiple times, you can attune to it each time.
            """,
            tags=['Imbuement'],
        ),
        schools=['Transmutation'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[
            Subspell(
                level=5,
                name="Resilient",
                description="""
                    The DR to unlock the target with a Devices check is instead equal to 30 + your spellpower.
                    In addition, the DR to break it open increases by 20 instead of by 10.
                """,
            ),
        ],
    ))

    rituals.append(Spell(
        name="Awaken",
        base_level=7,
        # header=Header("description"),
        targeting=Targeting(
            target="One animal",
            rng='close',
            time='24 hours',
            action_points=49,
        ),
        effects=Effects(
            effect="""
                The target becomes sentient.
                Its Intelligence becomes 1d6 - 5.
                Its type changes from animal to magical beast.
                It gains the ability to speak and understand one language that you know of your choice.

                This effect is permanent.
            """,
            tags=['Imbuement'],
        ),
        schools=['Transmutation'],
        lists=['Nature'],
        subspells=[],
    ))

    rituals.append(Spell(
        name="Binding",
        base_level=3,
        # header=Header("description"),
        targeting=Targeting(
            area='small radius',
            area_type='zone',
            rng='close',
            time='One hour',
        ),
        effects=Effects(
            effect="""
                This ritual inscribes a magic circle on the ground, denoting the edges of the area.
                The circle is obvious, but a DR 16 Perception or Spellcraft check is required to verify that the circle belongs to a \\ritual<binding> ritual.
                If the circle is broken, the ritual's effects end immediately.
                If a creature enters the area, you make an attack against it, as described below.

                This effect lasts as long as you \\glossterm<attune> to it.
                If you use this ability multiple times, you can attune to it each time.
            """,
            attack=Attack(
                defense='Mental',
                success="""
                    The target is unable to escape the area physically or alter the circle in any way.
                    It treats the circle and the area above it as an impassable barrier, preventing the effects of any of its abilities from extending outside that area.
                """,
            ),
        ),
        schools=['Abjuration'],
        lists=['Arcane', 'Divine'],
        subspells=[
            Subspell(
                level=5,
                name="Dimension Lock",
                description="""
                    Creatures trapped in the circle with a successful attack also cannot travel extradimensionally.
                    This prevents all \\glossterm<Manifestation>, \\glossterm<Planar>, and \\glossterm<Teleportation> effects.
                """,
            ),
        ],
    ))

    rituals.append(Spell(
        name="Bless Water",
        base_level=1,
        # header=Header("description"),
        targeting=Targeting(
            target='One pint of unattended, nonmagical water',
            rng='close',
            time='One minute',
        ),
        effects=Effects(
            effect="""
                The target becomes holy water.
                Holy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck undead creature or an evil outsider.
            """,
        ),
        schools=['Channeling'],
        lists=['Divine'],
        subspells=[],
    ))

    rituals.append(Spell(
        name="Curse Water",
        base_level=1,
        # header=Header("description"),
        targeting=Targeting(
            target='One pint of unattended, nonmagical water',
            rng='close',
            time='One minute',
        ),
        effects=Effects(
            effect="""
                The target becomes unholy water.
                Unholy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck good outsider.
            """,
            tags=['Evil'],
        ),
        schools=['Channeling'],
        lists=['Divine'],
        subspells=[],
    ))

    rituals.append(Spell(
        name="Create Object",
        base_level=3,
        # header=Header("description"),
        targeting=Targeting(
            rng='close',
            time='One hour',
            target='Location',
        ),
        effects=Effects(
            effect="""
                % TODO: add ability to create objects of other sizes/materials
                When you perform this ritual, you make a Craft check to craft an object of no greater than Small size.
                The object appears out of thin air, without any raw materials.
                It must be made of nonliving, nonreactive vegetable matter, such as wood or cloth.

                This effect lasts as long as you \\glossterm<attune> to it.
                If you use this ability multiple times, you can attune to it each time.
            """,
            tags=['Manifestation'],
        ),
        schools=['Conjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[],
    ))

    rituals.append(Spell(
        name="Create Sustenance",
        base_level=3,
        # header=Header("description"),
        targeting=Targeting(
            rng='close',
            time='One hour',
            target='Location',
        ),
        effects=Effects(
            effect="""
                This ritual creates food and drink that is sufficient to sustain two Medium creatures per spellpower for 24 hours.
                The food that this ritual creates is simple fare of your choice -- highly nourishing, if rather bland.
            """,
            tags=['Creation'],
        ),
        schools=['Conjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Discern Location",
        base_level=5,
        # header=Header("description"),
        targeting=Targeting(
            target='One creature or object',
            rng='Same plane',
            unrestricted_range=True,
            time='24 hours',
            action_points=25,
        ),
        effects=Effects(
            effect="""
                You learn the location (place, name, business name, or the like), community, country, and continent where the target lies.
            """,
            tags=['Knowledge'],
        ),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[
            Subspell(
                level=7,
                name="Interplanar",
                targeting=Targeting(
                    target='One creature or object',
                    rng='Any plane',
                    unrestricted_range=True,
                    time='24 hours',
                    action_points=49,
                ),
                description="""
                    You also learn the plane of existence where the target lies.
                    This is a \\glossterm<Planar> effect.
                """,
            ),
        ],
    ))

    rituals.append(Spell(
        name="Endure Elements",
        base_level=1,
        # header=Header("description"),
        targeting=Targeting(
            target='One creature or object',
            rng='close',
            time='One minute',
        ),
        effects=Effects(
            effect="""
                The target suffers no harm from being in a hot or cold environment.
                It can exist comfortably in conditions between \minus50 and 140 degrees Fahrenheit.
                Its equipment, if any, is also protected.
                This does not protect the target from fire or cold damage.

                This effect lasts as long as you \\glossterm<attune> to it.
                If you use this ability multiple times, you can attune to it each time.
            """,
            tags=['Shielding'],
        ),
        schools=['Abjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Explosive Runes",
        base_level=3,
        # header=Header("description"),
        targeting=Targeting(
            target='One object with writing on it (Small or smaller)',
            rng='close',
            time='One hour',
        ),
        effects=Effects(
            special="""
                When you perform this ritual, choose a type of \\glossterm<energy damage> (cold, electricity, fire, or sonic).
                It gains the tag appropriate to the chosen energy type.
            """,
            effect="""
                If a creature reads the target object, it explodes.
                You make an attack against everything within an \\areamed radius burst centered on the target.
                After the object explodes in this way, the spell ends.
                If the target object is destroyed or rendered illegible, the spell ends without exploding.

                This effect lasts as long as you \\glossterm<attune> to it.
                If you use this ability multiple times, you can attune to it each time.
            """,
            attack=Attack(
                defense='Reflex',
                success='\\glossterm<Standard damage> -1d of the damage type chosen',
            ),
            tags=['Trap'],
        ),
        schools=['Evocation'],
        lists=['Arcane'],
    ))

    # If Wild Growth becomes a spell, this would be a subspell
    rituals.append(Spell(
        name="Fertility",
        base_level=3,
        # header=Header("description"),
        targeting=Targeting(
            area='One mile radius from your location',
            area_type='zone',
            time='24 hours',
            action_points=9,
        ),
        effects=Effects(
            effect="""
                Normal plants within the area become twice as productive as normal for the next year.
                This ritual does not stack with itself.
                If the \\ritual<infertility> ritual is also applied to the same area, the most recently performed ritual takes precedence.
            """,
            tags=['Imbuement'],
        ),
        schools=['Transmutation'],
        lists=['Nature'],
    ))

    rituals.append(Spell(
        name="Infertility",
        base_level=3,
        # header=Header("description"),
        targeting=Targeting(
            area='One mile radius from your location',
            area_type='zone',
            time='24 hours',
            action_points=9,
        ),
        effects=Effects(
            effect="""
                Normal plants within the area become half as productive as normal for the next year.
                This ritual does not stack with itself.
                If the \\ritual<fertility> ritual is also applied to the same area, the most recently performed ritual takes precedence.
            """,
            tags=['Imbuement'],
        ),
        schools=['Transmutation'],
        lists=['Nature'],
    ))

    rituals.append(Spell(
        name="Gate",
        base_level=9,
        # header=Header("description"),
        targeting=Targeting(
            rng='close',
            time='One week',
            action_points=81,
            target='Location',
        ),
        effects=Effects(
            effect="""
                This ritual creates an interdimensional connection between your plane of existence and a different plane you specify, allowing travel between those two planes in either direction.

                The gate itself is a circular disk between 5 and 20 feet in diameter, oriented in the direction you desire when it comes into existence (typically vertical and facing you).
                It is a two-dimensional window looking into the plane you specified when casting the spell, and anyone or anything that moves through is shunted instantly to the other side.

                The \\ritual<gate> has a front and a back. Creatures moving through the gate from the front are transported to the other plane; creatures moving through it from the back are not.

                % A \\ritual<gate> spell functions much like a \\ritual<plane shift> spell, except that the gate opens precisely at the point you desire.

                This effect lasts as long as you \\glossterm<sustain> it as a \\glossterm<standard action>, up to a maximum of 5 rounds.
            """,
            tags=['Planar', 'Teleportation'],
        ),
        schools=['Conjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Gentle Repose",
        base_level=2,
        # header=Header("description"),
        targeting=Targeting(
            target='One unattended nonmagical object',
            rng='close',
            time='One minute',
        ),
        effects=Effects(
            effect="""
                Time does not pass for the target, preventing it from decaying or spoiling.
                This can extend the time a poison or similar item lasts before becoming inert.
                If used on a corpse, this effectively extends the time limit on raising that creature from the dead (see \\ritual<resurrection>) and similar effects that require a fresh body.
                Additionally, this can make transporting a fallen comrade more pleasant.

                This effect lasts as long as you \\glossterm<attune> to it.
                If you use this ability multiple times, you can attune to it each time.
            """,
            tags=['Temporal'],
        ),
        schools=['Transmutation'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Ironwood",
        base_level=3,
        # header=Header("description"),
        targeting=Targeting(
            target='One wooden object (Small or smaller)',
            time='24 hours',
            # feels too rare if it has an action point cost
            # action_points=9,
        ),
        effects=Effects(
            effect="""
                The target is transformed into ironwood.
                While remaining natural wood in almost every way, ironwood is as strong, heavy, and resistant to fire as iron.
            """,
            tags=['Shaping'],
        ),
        schools=['Transmutation'],
        lists=['Nature'],
    ))

    rituals.append(Spell(
        name="Light",
        base_level=1,
        # header=Header("description"),
        targeting=Targeting(
            target='One creature or object (Medium or smaller)',
            rng='close',
            time='One minute',
        ),
        effects=Effects(
            effect="""
                The target glows like a torch, shedding bright light in an \\areamed radius (and dim light for an additional 20 feet).
                This effect lasts as long as you \\glossterm<attune> to it.
                If you use this ability multiple times, you can attune to it each time.
            """,
            tags=['Figment', 'Light'],
        ),
        schools=['Illusion'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Magic Mouth",
        base_level=1,
        # header=Header("description"),
        targeting=Targeting(
            target='one creature or object',
            rng='close',
            time='24 hours',
        ),
        effects=Effects(
            special="""
                When you perform this ritual, you must specify a triggering condition.
                The condition must be something that a typical human in the target's place could detect.
                You must also specify a message of twenty-five words or less.
            """,
            effect="""
                This effect lasts until the triggering condition occurs.
                When that happens, the target appears to grow an enchanted mouth, and it speaks the chosen message aloud.
                After this happens, the spell ends.
            """,
            tags=['Figment'],
        ),
        schools=['Illusion'],
        lists=['Arcane'],
    ))

    rituals.append(Spell(
        name="Mount",
        base_level=3,
        # header=Header("description"),
        targeting=Targeting(
            rng='close',
            target='Location',
        ),
        effects=Effects(
            effect="""
                You create a light horse or a pony (your choice) to serve you as a mount.
                The steed serves willingly and well.
                The mount comes with a bit and bridle and a riding saddle.

                This effect lasts as long as you \\glossterm<attune> to it.
                If you use this ability multiple times, you can attune to it each time.
            """,
            tags=['Manifestation'],
        ),
        schools=['Conjuration'],
        lists=['Arcane'],
    ))

    # rituals.append(Spell(
    #     name="Nondetection",
    #     base_level=3,
    #     # header=Header("description"),
    #     targeting=Targeting(
    #         target="One creature or object",
    #         time="One hour",
    #         rng='close',
    #     ),
    #     effects=Effects(
    #         effect="""
    #             The target gains \\glossterm<magic resistance> against Awareness and Scrying abilities equal to 5 + your spellpower.
    #             In addition, Awareness and Scrying abilities that do not directly affect the target simply treat it as if it did not exist.
    #
    #             This effect lasts as long as you \\glossterm<attune> to it.
    #             If you use this ability multiple times, you can attune to it each time.
    #         """,
    #         tags=['Thaumaturgy'],
    #     ),
    #     schools=['Abjuration'],
    #     lists=['Arcane', 'Divine'],
    # ))

    rituals.append(Spell(
        name="Plane Shift",
        base_level=5,
        # header=Header("description"),
        targeting=Targeting(
            targets='Up to five willing ritual participants (Medium or smaller)',
            rng='close',
            time='24 hours',
        ),
        effects=Effects(
            effect="""
                The targets teleport to a destination of your choice on another plane connected to your current plane.
                Precise accuracy is nigh impossible, and the actual destination is usually 1d100 miles away from the intended destination.
                % TODO: Is this planar cosmology correct?
                The Astral Plane connects to every plane, but transit from other planes is usually more limited. From the Material Plane, you can only reach the Astral Plane.
            """,
            tags=['Planar', 'Teleportation'],
        ),
        schools=['Conjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[
            Subspell(
                level=8,
                name="Precise",
                description="""
                    The actual destination is the same as the intended destination, rather than being a random distance away.
                """,
            ),
        ],
    ))

    rituals.append(Spell(
        name="Scryward",
        base_level=3,
        # header=Header("description"),
        targeting=Targeting(
            area='\\arealarge radius',
            area_type='zone',
            rng='close',
            time='24 hours',
            action_points=9,
        ),
        effects=Effects(
            effect="""
                All \\glossterm<Scrying> effects fail to function in the area.
                This effect is permanent.
            """,
            tags=['Thaumaturgy'],
        ),
        schools=['Abjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Private Sanctum",
        base_level=5,
        # header=Header("description"),
        targeting=Targeting(
            area='\\arealarge radius',
            area_type='zone',
            rng='close',
            time='24 hours',
            action_points=25,
        ),
        effects=Effects(
            effect="""
                Everything in the area is completely imperceptible from outside the area.
                Anyone looking into the area from outside sees only a dark, foggy mass.
                Darkvision and similar abilities cannot penetrate into the area.
                No sounds, no matter how loud, can escape the area, so nobody can eavesdrop from outside.
                In addition, all \\glossterm<Scrying> effects fail to function in the area.

                Creatures inside the area can see within the area and outside of it without any encumbrance.
            """,
            tags=['Thaumaturgy'],
        ),
        schools=['Abjuration'],
        lists=['Arcane'],
    ))

    rituals.append(Spell(
        name="Purify Sustenance",
        base_level=1,
        # header=Header("description"),
        targeting=Targeting(
            # This targeting is awkward
            area='Five cubic feet',
            rng='close',
            targets='All food and water in the area',
            time='One hour',
        ),
        effects=Effects(
            effect="""
                Spoiled, rotten, poisonous, or otherwise contaminated food and water in the area becomes pure and suitable for eating and drinking.
                This does not prevent subsequent natural decay or spoiling.
            """,
            tags=['Shaping'],
        ),
        schools=['Transmutation'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Read Magic",
        base_level=1,
        # header=Header("description"),
        targeting=Targeting(
            time='One minute',
        ),
        effects=Effects(
            effect="""
                You gain the ability to decipher magical inscriptions that would otherwise be unintelligible.
                This can allow you to read ritual books and similar objects created by other creatures.
                After you have read an inscription in this way, you are able to read that particular writing without the use of this ritual.

                This effect lasts as long as you \\glossterm<attune> to it.
            """,
            tags=['Knowledge'],
        ),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Reincarnation",
        base_level=5,
        # header=Header("description"),
        targeting=Targeting(
            target="One piece of a humanoid corpse (Diminuitive or larger)",
            rng='close',
            time='24 hours',
            action_points=25,
            special="The target must have been part of the original creature's body at the time of death.",
        ),
        effects=Effects(
            effect="""
                The creature the target corpse belongs to returns to life in a new body.
                It must not have died due to old age.

                This ritual creates an entirely new body for the creature's soul to inhabit from the natural elements at hand.
                During the ritual, the body ages to match the age of the original creature at the time it died.
                The creature has 0 hit points when it returns to life.

                A reincarnated creature is identical to the original creature in all respects, except for its race.
                The creature's race is replaced with a random race from \\tref<Humanoid Reincarnations>.
                Its appearance changes as necessary to match its new race, though it retains the general shape and distinguishing features of its original appearance.
                The creature loses all attribute modifiers and abilities from its old race, and gains those of its new race.
                However, its racial bonus feat and languages are unchanged.

                A creature's soul naturally rejects being placed into a different body than its original home.
                Until the creature is restored to its initial race, its maximum action points are reduced by 1.
                This penalty does not stack if the creature is reincarnated multiple times.

                Coming back from the dead is an ordeal.
                All of the creature's action points and other daily abilities are expended when it returns to life.
                In addition, its maximum action points are reduced by 1.
                This penalty lasts for thirty days, or until the creature gains a level.
                If this would reduce a creature's maximum action points below 0, the creature cannot be resurrected.
            """,
            tags=['Creation', 'Life'],
        ),
        schools=['Conjuration', 'Vivimancy'],
        lists=['Nature'],
        extra_table=r"""
            \begin{dtable}
                \lcaption{Humanoid Reincarnations}
                \begin{dtabularx}{\columnwidth}{l X}
                    d\% & Incarnation \\
                    \bottomrule
                    01 & Bugbear \\
                    02--13 & Dwarf \\
                    14--25 & Elf \\
                    26 & Gnoll \\
                    27--38 & Gnome \\
                    39--42 & Goblin \\
                    43--52 & Half-elf \\
                    53--62 & Half-orc \\
                    63--74 & Halfling \\
                    75--89 & Human \\
                    90--93 & Kobold \\
                    94 & Lizardfolk \\
                    95--99 & Orc \\
                    100 & Other
                \end{dtabularx}
            \end{dtable}
        """,
        subspells=[
            Subspell(
                level=7,
                name="Fated",
                description="""
                    The target is reincarnated as its original race instead of as a random race.
                """,
            ),
        ],
    ))

    rituals.append(Spell(
        name="Purge Curse",
        base_level=3,
        # header=Header("description"),
        targeting=Targeting(
            target='One willing creature',
            rng='close',
            time='24 hours',
            action_points=9,
        ),
        effects=Effects(
            effect="""
                All curses affecting the target are removed.
                This ritual cannot remove a curse that is part of the effect of an item the target has equipped.
                However, it can allow the target to remove any cursed items it has equipped.
            """,
            tags=['Thaumaturgy'],
        ),
        schools=['Abjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Regeneration",
        base_level=4,
        # header=Header("description"),
        targeting=Targeting(
            target='One willing creature',
            rng='close',
            time='24 hours',
            action_points=16,
        ),
        effects=Effects(
            effect="""
                All of the target's hit points, \\glossterm<subdual damage>, and \\glossterm<vital damage> are healed.
                In addition, any of the target's severed body parts or missing organs grow back by the end of the next round.
            """,
            tags=['Flesh'],
        ),
        schools=['Vivimancy'],
        lists=['Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Resurrection",
        base_level=4,
        # header=Header("description"),
        targeting=Targeting(
            target="One intact humanoid corpse",
            rng='close',
            time='24 hours',
            action_points=16,
        ),
        effects=Effects(
            effect="""
                The target returns to life.
                It must not have died due to old age.

                The creature has 0 hit points when it returns to life.
                It is cured of all \\glossterm<vital damage> and other negative effects, but the body's shape is unchanged.
                Any missing or irreparably damaged limbs or organs remain missing or damaged.
                The creature may therefore die shortly after being resurrected if its body is excessively damaged.

                Coming back from the dead is an ordeal.
                All of the creature's action points and other daily abilities are expended when it returns to life.
                In addition, its maximum action points are reduced by 1.
                This penalty lasts for thirty days, or until the creature gains a level.
                If this would reduce a creature's maximum action points below 0, the creature cannot be resurrected.
            """,
            tags=['Creation', 'Life'],
        ),
        schools=['Conjuration', 'Vivimancy'],
        lists=['Nature'],
        subspells=(
            Subspell(
                level=7,
                name="Complete",
                targeting=Targeting(
                    target="One piece of a humanoid corpse (Diminuitive or larger)",
                    rng='close',
                    time='24 hours',
                    action_points=49,
                ),
                description="""
                    The target is complely restored to health, including any missing or irreparably damaged limbs or organs.
                """,
            ),
        ),
    ))

    rituals.append(Spell(
        name="Sending",
        base_level=4,
        # header=Header("description"),
        targeting=Targeting(
            target="One creature",
            rng="Same plane",
            unrestricted_range=True,
            special="""
                You must specify your target with a precise mental image of its appearance.
                The image does not have to be perfect, but it must unambiguously identify the target.
                If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the ritual may simply fail.
            """,
            time='One hour',
        ),
        effects=Effects(
            effect="""
                You send the target a short verbal message.
                The message must be twenty-five words or less, and speaking the message must not take longer than five rounds.

                After the the target receives the message, it may reply with a message of the same length as long as the ritual's effect continues.
                Once it speaks twenty-five words, or you stop sustaining the effect, the ritual's effect ends.
            """,
        ),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[
            Subspell(
                level=6,
                name="Interplanar",
                targeting=Targeting(
                    target="One creature",
                    rng="Any plane",
                    unrestricted_range=True,
                    special="""
                        You must specify your target with a precise mental image of its appearance.
                        The image does not have to be perfect, but it must unambiguously identify the target.
                        If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the ritual may simply fail.
                    """,
                    time='One hour',
                ),
                description="""
                    This is a \\glossterm<Planar> effect.
                """,
            ),
        ],
    ))

    rituals.append(Spell(
        name="Soul Bind",
        base_level=8,
        # header=Header("description"),
        targeting=Targeting(
            target="One intact corpse",
            time='One hour',
            rng='close',
        ),
        effects=Effects(
            special="""
                You must choose a gem you hold that is worth at least 1,000 gp to perform this ritual.
            """,
            effect="""
                The soul of the creature the target corpse belongs to is imprisoned in the chosen gem.
                This prevents the creature from being resurrected, and prevents the corpse from being used to create undead creatures, as long as the gem is intact.
                A creature holding the gem may still resurrect or reanimate the creature.

                This effect lasts as long as you \\glossterm<attune> to it.
            """,
        ),
        schools=['Vivimancy'],
        lists=['Arcane', 'Divine'],
    ))

    rituals.append(Spell(
        name="Telepathic Bond",
        base_level=4,
        # header=Header("description"),
        targeting=Targeting(
            targets='Up to five willing ritual participants',
            rng='medium',
            time='24 hours',
        ),
        effects=Effects(
            effect="""
                Each target can communicate mentally through telepathy with each other target.
                This communication is instantaneous across any distance, but cannot reach across planes.
                % Is this grammatically correct?
                This effect lasts as long as you and each target \\glossterm<attune> to it.
                If you use this ability multiple times, you can attune to it each time.

                Each target must attune to this ritual independently.
                If a target breaks its attunement, it stops being able to send and receive mental messages with other targets.
                However, the effect continues as long as at least two different targets are attuned to it.
            """,
        ),
        schools=['Divination'],
        lists=['Arcane'],
        subspells=[
            Subspell(
                level=8,
                name="Interplanar",
                description="""
                    The targets can communicate telepathically even across different planes.
                    This is a \\glossterm<Planar> effect.
                """,
            ),
        ],
    ))

    rituals.append(Spell(
        name="Overland Teleportation",
        base_level=6,
        # header=Header("description"),
        targeting=Targeting(
            targets='Up to five willing ritual participants (Medium or smaller)',
            rng='medium',
            time='One hour',
        ),
        effects=Effects(
            special="""
                Choose a destination up to 100 miles away on your current plane.
                You must specify the destination with a precise mental image of its appearance.
                The image does not have to be perfect, but it must unambiguously identify the destination.
                If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
                The new destination will be one that more closely resembles your mental image.
                If no such area exists, the ritual simply fails.
                % TODO: does this need more clarity about what teleportation works?
            """,
            effect="""
                Each target is teleported to the chosen destination.
            """,
            tags=['Teleportation'],
        ),
        schools=['Conjuration'],
        lists=['Arcane'],
    ))

    rituals.append(Spell(
        name="Lifeweb Transit",
        base_level=6,
        # header=Header("description"),
        targeting=Targeting(
            targets='Up to five willing ritual participants (Medium or smaller)',
            rng='medium',
            time='One hour',
        ),
        effects=Effects(
            effect="""
                This ritual functions like the \\ritual<overland teleporation> ritual, except that both the starting and ending points must be living plants.
                The plants must be larger than the largest creature being teleported in this way.

                In addition, instead of specifying a destination with a mental image, you can specify a distance and direction from your current location.
                If you do, the targets will arrive at the closest sufficiently large living plant to that destination.
            """,
            tags=['Teleportation'],
        ),
        schools=['Conjuration'],
        lists=['Nature'],
    ))

    rituals.append(Spell(
        name="Blessed Transit",
        base_level=6,
        # header=Header("description"),
        targeting=Targeting(
            targets='Up to five willing ritual participants (Medium or smaller)',
            rng='medium',
            time='One minute',
        ),
        effects=Effects(
            effect="""
                This ritual functions like the \\ritual<overland teleporation> ritual, except that the destination must be a temple or equivalent holy site to your deity.
            """,
            tags=['Teleportation'],
        ),
        schools=['Conjuration'],
        lists=['divine'],
    ))

    rituals.append(Spell(
        name="Water Breathing",
        base_level=2,
        # header=Header("description"),
        targeting=Targeting(
            targets='One willing creature (Medium or smaller)',
            rng='medium',
            time='One minute',
        ),
        effects=Effects(
            effect="""
                The target can breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.
                This effect lasts as long as you \\glossterm<attune> to it.
                If you use this ability multiple times, you can attune to it each time.
            """,
            tags=['Imbuement'],
        ),
        schools=['Transmutation'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Seek Legacy",
        base_level=2,
        # header=Header("description"),
        targeting=Targeting(
            target='One willing creature',
            rng='close',
        ),
        effects=Effects(
            effect="""
                The target learns the precise distance and direction to their \\glossterm<legacy item>, if it is on the same plane.
            """,
            tags=['Knowledge'],
        ),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Retrieve Legacy",
        base_level=4,
        # header=Header("description"),
        targeting=Targeting(
            target='One willing creature',
            rng='close',
        ),
        effects=Effects(
            effect="""
                If the target's \\glossterm<legacy item> is on the same plane and \\glossterm<unattended>, it is teleported into the target's hand.
            """,
            tags=['Teleportation'],
        ),
        schools=['Conjuration', 'Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    return sorted(rituals, key=lambda ritual: ritual.name)

@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output')
def main(output, check):
    rituals = generate_rituals()
    ritual_texts = []
    for ritual in rituals:
        try:
            ritual_texts.append(ritual.to_latex())
        except Exception as e:
            raise Exception(f"Error converting ritual '{ritual.name}' to LaTeX") from e
    ritual_text = latexify("""
        \\section<Ritual Descriptions>
        {}
    """.format('\n'.join(ritual_texts)))
    if output is None:
        print(ritual_text)
    else:
        with open(output, 'w') as of:
            of.write(ritual_text)

if __name__ == "__main__":
    main()
