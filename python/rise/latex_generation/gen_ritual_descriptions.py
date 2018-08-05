#!/usr/bin/env python3

import click
from rise.latex.effects import Effects
from rise.latex.header import Header
from rise.latex.spell import Spell
from rise.latex.subspell import Subspell
from rise.latex.util import latexify

def generate_rituals():
    rituals = []

    rituals.append(Spell(
        base_level=3,
        name="Animate Dead",
        header=Header("You bind a fragment of a dead creature's soul to its corpse, reanimating it as an undead skeleton or zombie."),
        effects=Effects('Animate Dead', """
            Choose any number of corpses within \\rngclose range.
            The combined levels of all targets cannot exceed your \\glossterm<power>.
            The target becomes an undead creature that obeys your spoken commands.
            You choose whether to create a skeleton or a zombie.
            Creating a zombie require a mostly intact corpse, including most of the flesh.
            Creating a skeleton only requires a mostly intact skeleton.
            If a skeleton is made from an intact corpse, the flesh quickly falls off the animated bones.

            This ritual takes one hour to perform.
        """, tags=['Attune (multiple)']),
        schools=['Vivimancy'],
        lists=['Arcane', 'Divine'],
        subspells=[],
    ))

    rituals.append(Spell(
        name="Mystic Lock",
        base_level=2,
        effects=Effects('Mystic Lock', """
            Choose a Large or smaller closable, nonmagical object within \\rngclose range, such as a door or box.
            The target object becomes magically locked.
            It can be unlocked with a Devices check against a DR equal to 20 \\add your \\glossterm<power>.
            The DR to break it open forcibly increases by 10.

            You can freely pass your own \\ritual<arcane lock> as if the object were not locked.
            This effect lasts as long as you \\glossterm<attune> to it.
            If you use this ability multiple times, you can attune to it each time.

            This ritual takes one minute to perform.
        """, tags=['Attune (multiple)']),
        schools=['Transmutation'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[
            Subspell("Resilient", 5, f"""
                This subritual functions like the \\ritual<mystic lock> ritual, except that the DR to unlock the target with a Devices check is instead equal to 30 + your \\glossterm<power>.
                In addition, the DR to break it open increases by 20 instead of by 10.
            """),
        ],
    ))

    rituals.append(Spell(
        name="Awaken",
        base_level=7,
        # header=Header("description"),
        effects=Effects('Awaken', """
            Choose a Large or smaller willing animal within \\rngclose range.
            The target becomes sentient.
            Its Intelligence becomes 1d6 - 5.
            Its type changes from animal to magical beast.
            It gains the ability to speak and understand one language that you know of your choice.
            Its maximum age increases to that of a human (rolled secretly).
            This effect is permanent.

            This ritual takes 24 hours to perform, and requires 49 action points from its participants.
        """),
        schools=['Transmutation'],
        lists=['Nature'],
        subspells=[],
    ))

    rituals.append(Spell(
        name="Binding",
        base_level=3,
        # header=Header("description"),
        effects=Effects('Binding', """
            This ritual creates a \\areasmall radius zone.
            The outlines of the zone are denoted by a magic circle physically inscribed on the ground during the ritual.
            The circle is obvious, but a DR 16 Perception or Spellcraft check is required to verify that the circle belongs to a \\ritual<binding> ritual.
            If the circle's perimeter is broken, the ritual's effects end immediately.
            Whenever a creature enters the area, you make an attack vs. Mental against it.
            \\hit The target is unable to escape the ritual's area physically or alter the circle in any way.
            It treats the edge of the area as an impassable barrier, preventing the effects of any of its abilities from extending outside that area.

            This ritual takes one hour to perform.
        """, tags=['Attune']),
        schools=['Abjuration'],
        lists=['Arcane', 'Divine'],
        subspells=[
            Subspell("Dimension Lock", 5, f"""
                This subritual functions like the \\ritual<binding> ritual, except that a struck creature also cannot travel extradimensionally.
                This prevents all \\glossterm<Manifestation>, \\glossterm<Planar>, and \\glossterm<Teleportation> effects.
            """),
        ],
    ))

    rituals.append(Spell(
        name="Bless Water",
        base_level=1,
        # header=Header("description"),
        effects=Effects('Bless Water', """
            Choose one pint of unattended, nonmagical water within \\rngclose range.
            The target becomes holy water.
            Holy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck undead creature or an evil outsider.

            This ritual takes one minute to perform.
        """, tags=['Attune (multiple)']),
        schools=['Channeling'],
        lists=['Divine'],
        subspells=[],
    ))

    rituals.append(Spell(
        name="Curse Water",
        base_level=1,
        # header=Header("description"),
        effects=Effects('Curse Water', """
            Choose one pint of unattended, nonmagical water within \\rngclose range.
            The target becomes unholy water.
            Unholy water can be can be thrown as a splash weapon, dealing 1d8 points of damage to a struck good outsider.

            This ritual takes one minute to perform.
        """, tags=['Attune (multiple)']),
        schools=['Channeling'],
        lists=['Divine'],
        subspells=[],
    ))

    rituals.append(Spell(
        name="Create Object",
        base_level=3,
        # header=Header("description"),
        effects=Effects('Create Object', """
            Make a Craft check to create an object of Small size or smaller.
            The object appears out of thin air in an unoccupied square within \\rngclose range.
            % TODO: add ability to create objects of other sizes/materials
            It must be made of nonliving, nonmagical, nonreactive vegetable matter, such as wood or cloth.

            This ritual takes one hour to perform.
        """, tags=['Attune (multiple)', 'Manifestation']),
        schools=['Conjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[],
    ))

    rituals.append(Spell(
        name="Create Sustenance",
        base_level=3,
        # header=Header("description"),
        effects=Effects('Create Sustenance', """
            Choose an unoccupied square within \\rngclose range.
            This ritual creates food and drink in that square that is sufficient to sustain two Medium creatures per \\glossterm<power> for 24 hours.
            The food that this ritual creates is simple fare of your choice -- highly nourishing, if rather bland.

            This ritual takes one hour to perform.
        """, ['Creation']),
        schools=['Conjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Create Water",
        base_level=1,
        # header=Header("description"),
        effects=Effects('Create Water', """
            You create up to one gallon of wholesome, drinkable water anywhere within \\rngclose range.
            The water can be created at multiple locations within the ritual's range, allowing you to fill multiple small water containers.
            You must create a minimum of one ounce of water in each location.
        """, tags=['Creation']),
        schools=['Conjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Discern Location",
        base_level=5,
        # header=Header("description"),
        effects=Effects('Discern Location', """
            Choose a creature or object on the same plane as you.
            You do not need \\glossterm<line of sight> or \\glossterm<line of effect> to the target.
            However, you must specify your target with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the target.
            You learn the location (place, name, business name, or the like), community, country, and continent where the target lies.

            This ritual takes 24 hours to perform, and it requires 25 action points from its participants.
        """),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[
            Subspell('Interplanar', 7, """
                This subritual functions like the \\ritual<discern location> ritual, except that the target does not have to be on the same plane as you.
                It gains the \\glossterm<Planar> tag in addition to the tags from the \\ritual<discern location> ritual.

                This ritual takes 24 hours to perform, and it requires 49 action points from its participants.
            """),
        ],
    ))

    rituals.append(Spell(
        name="Endure Elements",
        base_level=1,
        # header=Header("description"),
        effects=Effects('Endure Elements', """
            Choose a willing creature or unattended object within \\rngclose range.
            The target suffers no harm from being in a hot or cold environment.
            It can exist comfortably in conditions between \minus50 and 140 degrees Fahrenheit.
            Its equipment, if any, is also protected.
            This does not protect the target from fire or cold damage.

            This ritual takes one minute to perform.
        """, tags=['Attune (multiple)']),
        schools=['Abjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Explosive Runes",
        base_level=3,
        # header=Header("description"),
        effects=Effects('Explosive Runes', """
            Choose a Small or smaller unattended object with writing on it within \\rngclose range.
            In addition, choose a type of \\glossterm<energy damage> (cold, electricity, fire, or sonic).
            This ritual gains the tag appropriate to the chosen energy type.
            If a creature reads the target, the target explodes.
            You make an attack vs. Reflex against everything within a \\areamed radius from the target.
            \\hit Each target takes \\glossterm<standard damage> -1d of the damage type chosen.

            After the target explodes in this way, the ritual is \\glossterm<dismissed>.
            If the target object is destroyed or rendered illegible, the ritual is dismissed without exploding.
            This ritual takes one hour to perform.
        """, tags=['Attune (multiple)', 'Trap']),
        schools=['Evocation'],
        lists=['Arcane'],
    ))

    # If Wild Growth becomes a spell, this would be a subspell
    rituals.append(Spell(
        name="Fertility",
        base_level=3,
        # header=Header("description"),
        effects=Effects('Fertility', """
            This ritual creates an area of bountiful growth in a one mile radius zone from your location.
            Normal plants within the area become twice as productive as normal for the next year.
            This ritual does not stack with itself.
            If the \\ritual<infertility> ritual is also applied to the same area, the most recently performed ritual takes precedence.

            This ritual takes 24 hours to perform, and requires 9 action points from its participants.
        """),
        schools=['Transmutation'],
        lists=['Nature'],
    ))

    rituals.append(Spell(
        name="Infertility",
        base_level=3,
        # header=Header("description"),
        effects=Effects('Fertility', """
            This ritual creates an area of death and decay in a one mile radius zone from your location.
            Normal plants within the area become half as productive as normal for the next year.
            This ritual does not stack with itself.
            If the \\ritual<fertility> ritual is also applied to the same area, the most recently performed ritual takes precedence.

            This ritual takes 24 hours to perform, and requires 9 action points from its participants.
        """),
        schools=['Transmutation'],
        lists=['Nature'],
    ))

    rituals.append(Spell(
        name="Gate",
        base_level=9,
        # header=Header("description"),
        effects=Effects('Gate', """
            Choose a plane that connects to your current plane, and a location within that plane.
            This ritual creates an interdimensional connection between your current plane and the location you choose, allowing travel between those two planes in either direction.
            The gate takes the form of a \\areasmall radius circular disk, oriented a direction you choose (typically vertical).
            It is a two-dimensional window looking into the plane you specified when casting the spell, and anyone or anything that moves through it is shunted instantly to the other location.
            The gate cannot be \\glossterm<sustained> for more than 5 rounds, and is automatically dismissed at the end of that time.

            You must specify the gate's destination with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the location.
            Incomplete or incorrect mental images may result in the ritual leading to an unintended destination within the same plane, or simply failing entirely.

            % TODO: Is this planar cosmology correct?
            The Astral Plane connects to every plane, but transit from other planes is usually more limited.
            From the Material Plane, you can only reach the Astral Plane.

            This ritual takes one week to perform, and requires 81 action points from its participants.
        """, tags=['Planar', 'Teleportation', 'Sustain (standard)']),
        schools=['Conjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Gentle Repose",
        base_level=2,
        # header=Header("description"),
        effects=Effects('Gentle Repose', """
            Choose an unattended, nonmagical object within \\rngclose range.
            Time does not pass for the target, preventing it from decaying or spoiling.
            This can extend the time a poison or similar item lasts before becoming inert.
            If used on a corpse, this effectively extends the time limit on raising that creature from the dead (see \\ritual<resurrection>) and similar effects that require a fresh body.
            Additionally, this can make transporting a fallen comrade more pleasant.

            This ritual takes one minute to perform.
        """, tags=['Attune (multiple)', 'Temporal']),
        schools=['Transmutation'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Ironwood",
        base_level=3,
        # header=Header("description"),
        effects=Effects('Ironwood', """
            Choose a Small or smaller unattended, nonmagical wooden object within \\rngclose range.
            The target is transformed into ironwood.
            While remaining natural wood in almost every way, ironwood is as strong, heavy, and resistant to fire as iron.
            Metallic armor and weapons, such as full plate, can be crafted from ironwood.

            % Should this have an action point cost? May be too rare...
            This ritual takes 24 hours to perform.
        """, tags=['Shaping']),
        schools=['Transmutation'],
        lists=['Nature'],
    ))

    rituals.append(Spell(
        name="Light",
        base_level=1,
        # header=Header("description"),
        effects=Effects('Light', """
            Choose a Medium or smaller willing creature or unattended object within \\rngclose range.
            The target glows like a torch, shedding bright light in a \\areamed radius (and dim light for an additional 20 feet).

            This ritual takes one minute to perform.
        """, tags=['Attune (multiple)', 'Light', 'Sensation']),
        schools=['Illusion'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Magic Mouth",
        base_level=1,
        # header=Header("description"),
        effects=Effects('Magic Mouth', """
            Choose a Large or smaller willing creature or unattended object within \\rngclose range.
            In addition, choose a triggering condition and a message of twenty-five words or less.
            The condition must be something that a typical human in the target's place could detect.

            When the triggering condition occurs, the target appears to grow a magically animated mouth.
            The mouth speaks the chosen message aloud.
            After the message is spoken, this effect is \\glossterm<dismissed>.

            This ritual takes 24 hours to perform.
        """, tags=['Attune (multiple)', 'Sensation']),
        schools=['Illusion'],
        lists=['Arcane'],
    ))

    rituals.append(Spell(
        name="Mount",
        base_level=3,
        # header=Header("description"),
        effects=Effects('Mount', """
            This ritual creates your choice of a light horse or a pony to serve as a mount.
            The creature appears in an unoccupied location within \\rngclose range.
            It comes with a bit and bridle and a riding saddle, and will readily accept any creature as a rider.
        """, tags=['Attune (multiple)', 'Manifestation']),
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
    #             The target gains \\glossterm<magic resistance> against Awareness and Scrying abilities equal to 5 + your \\glossterm<power>.
    #             In addition, Awareness and Scrying abilities that do not directly affect the target simply treat it as if it did not exist.
    #
    #             This effect lasts as long as you \\glossterm<attune> to it.
    #             If you use this ability multiple times, you can attune to it each time.
    #         """,
    #         tags=['Mystic'],
    #     ),
    #     schools=['Abjuration'],
    #     lists=['Arcane', 'Divine'],
    # ))

    rituals.append(Spell(
        name="Plane Shift",
        base_level=5,
        # header=Header("description"),
        effects=Effects('Plane Shift', """
            Choose up to five Medium or smaller willing ritual participants.
            In addition, choose a plane that connects to your current plane and a location within that plane.
            The targets teleport to a random location on that plane 1d100 miles away from the intended destination.

            You must specify the destination with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the location.
            Incomplete or incorrect mental images may result in the ritual leading to an unintended destination within the same plane, or simply failing entirely.

            % TODO: Is this planar cosmology correct?
            The Astral Plane connects to every plane, but transit from other planes is usually more limited.
            From the Material Plane, you can only reach the Astral Plane.

            This ritual takes 24 hours to perform, and requires 25 action points from its participants.
        """, tags=['Planar', 'Teleportation']),
        schools=['Conjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[
            Subspell("Precise", 8, f"""
                This subritual functions like the \\ritual<plane shift> ritual, except that the actual destination is the same as the intended destination, rather than being a random distance away.
                This ritual takes 24 hours to perform, and requires 64 action points from its participants.
            """),
        ],
    ))

    rituals.append(Spell(
        name="Scryward",
        base_level=3,
        # header=Header("description"),
        effects=Effects('Scryward', """
            This ritual creates a ward against scrying in a \\arealarge radius zone centered on your location.
            All \\glossterm<Scrying> effects fail to function in the area.
            This effect is permanent.

            This ritual takes 24 hour to perform, and requires 9 action points from its participants.
        """, tags=['Mystic']),
        schools=['Abjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Private Sanctum",
        base_level=5,
        # header=Header("description"),
        effects=Effects('Private Sanctum', """
            This ritual creates a ward against any external perception in a \\arealarge radius zone centered on your location.
            This effect is permanent.
            Everything in the area is completely imperceptible from outside the area.
            Anyone observing the area from outside sees only a dark, silent void, regardless of darkvision and similar abilities.
            In addition, all \\glossterm<Scrying> effects fail to function in the area.
            Creatures inside the area can see within the area and outside of it without any difficulty.

            This ritual takes 24 hours to perform, and requires 25 action points from its participants.
        """, tags=['Mystic']),
        schools=['Abjuration'],
        lists=['Arcane'],
    ))

    rituals.append(Spell(
        name="Purify Sustenance",
        base_level=1,
        # header=Header("description"),
        effects=Effects('Purify Sustenance', """
            All food and water in a single square within \\rngclose range is purified.
            Spoiled, rotten, poisonous, or otherwise contaminated food and water becomes pure and suitable for eating and drinking.
            This does not prevent subsequent natural decay or spoiling.

            This ritual takes one hour to perform.
        """, tags=['Shaping']),
        schools=['Transmutation'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Read Magic",
        base_level=1,
        # header=Header("description"),
        effects=Effects('Read Magic', """
            You gain the ability to decipher magical inscriptions that would otherwise be unintelligible.
            This can allow you to read ritual books and similar objects created by other creatures.
            After you have read an inscription in this way, you are able to read that particular writing without the use of this ritual.

            This ritual takes one minute to perform.
        """, tags=['Attune']),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Reincarnation",
        base_level=5,
        # header=Header("description"),
        effects=Effects('Reincarnation', """
            Choose one Diminuitive or larger piece of a humanoid corpse.
            The target must have been part of the original creature's body at the time of death.
            The creature the target corpse belongs to returns to life in a new body.
            It must not have died due to old age.

            This ritual creates an entirely new body for the creature's soul to inhabit from the natural elements at hand.
            During the ritual, the body ages to match the age of the original creature at the time it died.
            The creature has 0 hit points when it returns to life.

            A reincarnated creature is identical to the original creature in all respects, except for its race.
            The creature's race is replaced with a random race from \\tref<Humanoid Reincarnations>.
            Its appearance changes as necessary to match its new race, though it retains the general shape and distinguishing features of its original appearance.
            The creature loses all attribute modifiers and abilities from its old race, and gains those of its new race.
            If its racial bonus feat is invalid for its new race, it must choose a new racial bonus feat.
            However, its languages are unchanged.

            Coming back from the dead is an ordeal.
            All of the creature's action points and other daily abilities are expended when it returns to life.
            In addition, its maximum action points are reduced by 1.
            This penalty lasts for thirty days, or until the creature gains a level.
            If this would reduce a creature's maximum action points below 0, the creature cannot be resurrected.

            This ritual takes 24 hours to perform, and requires 25 action points from its participants.
        """, tags=['Creation', 'Flesh', 'Life']),
        schools=['Conjuration', 'Vivimancy'],
        lists=['Nature'],
        extra_table=r"""
            \begin{dtable}
                \lcaption{Humanoid Reincarnations}
                \begin{dtabularx}{\columnwidth}{l X}
                    d\% & Incarnation \\
                    \bottomrule
                    01--13 & Dwarf \\
                    14--26 & Elf \\
                    27--40 & Gnome \\
                    41--52 & Half-elf \\
                    53--62 & Half-orc \\
                    63--74 & Halfling \\
                    75--100 & Human \\
                \end{dtabularx}
            \end{dtable}
        """,
        subspells=[
            Subspell("Fated", 7, f"""
                This subritual functions like the \\ritual<reincarnation> ritual, except that the target is reincarnated as its original race instead of as a random race.
                This ritual takes 24 hours to perform, and requires 49 action points from its participants.
            """),
        ],
    ))

    rituals.append(Spell(
        name="Purge Curse",
        base_level=3,
        # header=Header("description"),
        effects=Effects('Purge Curse', """
            Choose a willing creature within \\rngclose range.
            All curses affecting the target are removed.
            This ritual cannot remove a curse that is part of the effect of an item the target has equipped.
            However, it can allow the target to remove any cursed items it has equipped.

            This ritual takes 24 hours to perform, and requires 9 action points from its participants.
        """, tags=['Mystic']),
        schools=['Abjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Regeneration",
        base_level=4,
        # header=Header("description"),
        effects=Effects('Regeneration', """
            Choose a willing creature within \\rngclose range.
            All of the target's hit points, \\glossterm<subdual damage>, and \\glossterm<vital damage> are healed.
            In addition, any of the target's severed body parts or missing organs grow back by the end of the next round.

            This ritual takes 24 hours to perform, and requires 16 action points from its participants.
        """, tags=['Flesh']),
        schools=['Vivimancy'],
        lists=['Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Resurrection",
        base_level=4,
        # header=Header("description"),
        effects=Effects('Resurrection', """
            Choose one intact humanoid corpse within \\rngclose range.
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

            This ritual takes 24 hours to perform, and requires 16 action points from its participants.
        """, tags=['Flesh', 'Life']),
        schools=['Conjuration', 'Vivimancy'],
        lists=['Nature'],
        subspells=(
            Subspell('Complete', 7, """
                This subritual functions like the \\ritual<resurrection> ritual, except that it does not have to target a fully intact corpse.
                Instead, it targets a Diminuitive or larger piece of a humanoid corpse.
                The target must have been part of the original creature's body at the time of death.
                The resurrected creature's body is fully restored to its healthy state before dying, including regenerating all missing or damaged body parts.

                This ritual takes 24 hours to perform, and requires 49 action points from its participants.
            """),
            Subspell('True', 9, """
                This subritual functions like the \\ritual<resurrection> ritual, except that it does not require any piece of the corpse.
                Instead, you must explicitly and unambiguously specify the identity of the creature being resurrected.
                The resurrected creature's body is fully restored to its healthy state before dying, including regenerating all missing or damaged body parts.

                This ritual takes 24 hours to perform, and requires 81 action points from its participants.
            """),
        ),
    ))

    rituals.append(Spell(
        name="Scry Creature",
        base_level=5,
        # Need to make sure this can't be used for high-bandwidth bidirectional communication
        effects=Effects("Scry Creature", """
            Make an attack vs. Mental against a creature on the same plane as you.
            You do not need \\glossterm<line of sight> or \\glossterm<line of effect> to the target.
            However,  must specify your target with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the target.
            If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the spell may simply be \\glossterm<miscast>.
            This attack roll cannot \\glossterm<explode>.
            \\hit A scrying sensor appears in the target's space.
            This sensor functions like the sensor created by the \\spell<arcane eye> subspell, except that you cannot move the sensor manually.
            Instead, it automatically tries to follow the target to stay in its space.
            At the end of each phase, if the sensor is not in the target's space, this effect is \\glossterm<dismissed>.

            This ritual takes one hour to perform.
        """),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Sending",
        base_level=4,
        # header=Header("description"),
        effects=Effects('Sending', """
            Choose a creature on the same plane as you.
            You do not need \\glossterm<line of sight> or \\glossterm<line of effect> to the target.
            However,  must specify your target with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the target.
            If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the spell may simply fail.

            You send the target a short verbal message.
            The message must be twenty-five words or less, and speaking the message must not take longer than five rounds.

            After the the target receives the message, it may reply with a message of the same length as long as the ritual's effect continues.
            Once it speaks twenty-five words, or you stop sustaining the effect, the ritual is \\glossterm<dismissed>.

            This ritual takes one hour to perform.
        """, tags=['Sustain (standard)']),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[
            Subspell('Interplanar', 6, """
                This subritual functions like the \\ritual<sending> ritual, except that the target does not have to be on the same plane as you.
                It gains the \\glossterm<Planar> tag in addition to the tags from the \\ritual<sending> ritual.
            """),
        ],
    ))

    rituals.append(Spell(
        name="Soul Bind",
        base_level=8,
        # header=Header("description"),
        effects=Effects('Soul Bind', """
            Choose one intact corpse within \\rngclose range.
            In addition, choose a gem you hold that is worth at least 1,000 gp.
            The soul of the creature that the target corpse belongs to is imprisoned in the chosen gem.
            This prevents the creature from being resurrected, and prevents the corpse from being used to create undead creatures, as long as the gem is intact.
            A creature holding the gem may still resurrect or reanimate the creature.

            This ritual takes one hour to perform.
        """, tags=['Life']),
        schools=['Vivimancy'],
        lists=['Arcane', 'Divine'],
    ))

    rituals.append(Spell(
        name="Telepathic Bond",
        base_level=4,
        # header=Header("description"),
        effects=Effects('Telepathic Bond', """
            Choose up to five willing ritual participants.
            Each target can communicate mentally through telepathy with each other target.
            This communication is instantaneous across any distance, but cannot reach across planes.

            % Is this grammatically correct?
            This effect lasts as long as you and each target \\glossterm<attune> to it.
            Each target must attune to this ritual independently.
            If a target breaks its attunement, it stops being able to send and receive mental messages with other targets.
            However, the effect continues as long as you attune to it.
            If you stop attuning to it, the ritual is \\glossterm<dismissed> as usual.

            This ritual takes 24 hours to perform.
        """, tags=['Attune (shared)']),
        schools=['Divination'],
        lists=['Arcane'],
        subspells=[
            Subspell('Interplanar', 8, """
                This subritual functions like the \\ritual<telepathic bond> ritual, except that each target can communicate telepathically even across different planes.
                It gains the \\glossterm<Planar> tag in addition to the tags from the \\ritual<telepathic bond> ritual.
            """),
        ],
    ))

    rituals.append(Spell(
        name="Overland Teleportation",
        base_level=5,
        # header=Header("description"),
        effects=Effects('Overland Teleportation', """
            Choose up to five willing, Medium or smaller ritual participants.
            Choose a destination up to 100 miles away from you on your current plane.
            Each target is teleported to the chosen destination.

            You must specify the destination with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the destination.
            If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
            The new destination will be one that more closely resembles your mental image.
            If no such area exists, the ritual simply fails.
            % TODO: does this need more clarity about what teleportation works?

            This ritual takes 24 hours to perform and requires 25 action points from its ritual participants.
        """, tags=['Teleportation']),
        schools=['Conjuration'],
        lists=['Arcane'],
    ))

    rituals.append(Spell(
        name="Lifeweb Transit",
        base_level=5,
        # header=Header("description"),
        effects=Effects('Lifeweb Transit', """
            This ritual functions like the \\ritual<overland teleporation> ritual, except that both the starting and ending points must be living plants.
            Both plants must be larger than the largest creature being teleported in this way.
        """, tags=['Teleportation']),
        schools=['Conjuration'],
        lists=['Nature'],
    ))

    rituals.append(Spell(
        name="Blessed Transit",
        base_level=5,
        # header=Header("description"),
        effects=Effects('Blessed Transit', """
            This ritual functions like the \\ritual<overland teleporation> ritual, except that the destination must be a temple or equivalent holy site to your deity.
        """, tags=['Teleportation']),
        schools=['Conjuration'],
        lists=['divine'],
    ))

    rituals.append(Spell(
        name="Water Breathing",
        base_level=2,
        # header=Header("description"),
        effects=Effects('Water Breathing', """
            Choose a Medium or smaller willing creature within \\rngclose range.
            The target can breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.
            This effect lasts as long as you \\glossterm<attune> to it.
            If you use this ability multiple times, you can attune to it each time.

            This ritual takes one minute to perform.
        """, tags=['Attune (multiple)']),
        schools=['Transmutation'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Seek Legacy",
        base_level=2,
        # header=Header("description"),
        effects=Effects('Seek Legacy', """
            Choose a willing creature within \\rngclose range.
            The target learns the precise distance and direction to their \\glossterm<legacy item>, if it is on the same plane.

            This ritual takes 24 hours to perform.
        """),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Retrieve Legacy",
        base_level=4,
        # header=Header("description"),
        effects=Effects('Retrieve Legacy', """
            Choose a willing creature within \\rngclose range.
            If the target's \\glossterm<legacy item> is on the same plane and \\glossterm<unattended>, it is teleported into the target's hand.

            This ritual takes 24 hours to perform, and requires 16 action points from its ritual participants.
        """, tags=['Teleportation']),
        schools=['Conjuration', 'Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    return sorted(rituals, key=lambda ritual: ritual.name)

@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output/--no-output', default=False)
def main(output, check):
    rituals = generate_rituals()
    ritual_texts = []
    for ritual in rituals:
        try:
            ritual_texts.append(ritual.to_latex())
        except Exception as e:
            raise Exception(f"Error converting ritual '{ritual.name}' to LaTeX") from e
    ritual_text = latexify('\n'.join(ritual_texts))
    if output is None:
        print(ritual_text)
    else:
        with open('../../core_book/ritual_descriptions.tex', 'w') as ritual_descriptions_file:
            ritual_descriptions_file.write(ritual_text)

if __name__ == "__main__":
    main()
