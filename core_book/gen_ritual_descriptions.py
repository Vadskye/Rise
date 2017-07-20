#!/usr/bin/env python3

import click
from generation.attack import Attack
from generation.effects import Effects
from generation.header import Header
from generation.spell import Spell
from generation.targeting import Targeting
from generation.util import latexify

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
            """,
            duration='Attunement (multiple)',
            tags=['Evil', 'Negative', 'Soul'],
        ),
        schools=['Vivimancy'],
        lists=['Arcane', 'Divine'],
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
            """,
            duration='Attunement (multiple)',
            tags=['Imbuement'],
        ),
        schools=['Transmutation'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Mystic Lock, Greater",
        base_level=5,
        # header=Header("description"),
        effects=Effects(
            special="""
                This ritual functions like the \\ritual<mystic lock> ritual, except that the DR to unlock and break open the target increases by 10.
            """,
            duration='Attunement (multiple)',
            tags=['Imbuement'],
        ),
        schools=['Transmutation'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Awaken",
        base_level=7,
        # header=Header("description"),
        targeting=Targeting(
            target="One animal",
            rng='close',
            time='24 hours',
        ),
        effects=Effects(
            effect="""
                The target becomes sentient.
                Its Intelligence becomes 1d6 - 5.
                Its type changes from animal to magical beast.
                It gains the ability to speak and understand one language that you know of your choice.
            """,
            duration='Permanent',
            tags=['Imbuement'],
        ),
        schools=['Transmutation'],
        lists=['Nature'],
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
            """,
            attack=Attack(
                defense='Mental',
                success="""
                    The target is unable to escape the area physically or alter the circle in any way.
                    It treats the circle and the area above it as an impassable barrier, preventing the effects of any of its abilities from extending outside that area.
                """,
            ),
            duration='Attunement',
        ),
        schools=['Abjuration'],
        lists=['Arcane', 'Divine'],
    ))

    rituals.append(Spell(
        name="Dimensional Binding",
        base_level=5,
        effects=Effects(
            effect="""
                This ritual functions like the <binding> ritual, except that creatures trapped in the circle also cannot travel extradimensionally.
                This blocks teleportation and all planar travel abilities except planar rifts.
            """,
        ),
        schools=['Abjuration'],
        lists=['Arcane', 'Divine'],
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
            tags=['Good'],
        ),
        schools=['Channeling'],
        lists=['Divine'],
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
    ))

    rituals.append(Spell(
        name="Create Object",
        base_level=3,
        # header=Header("description"),
        targeting=Targeting(
            rng='close',
            time='One hour',
        ),
        effects=Effects(
            effect="""
                % TODO: add ability to create objects of other sizes/materials
                When you perform this ritual, you make a Craft check to craft an object of no greater than Small size.
                The object appears out of thin air, without any raw materials.
                It must be made of nonliving, nonreactive vegetable matter, such as wood or cloth.
            """,
            duration='Attunement (multiple)',
            tags=['Manifestation'],
        ),
        schools=['Conjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
    ))

    rituals.append(Spell(
        name="Create Sustenance",
        base_level=3,
        # header=Header("description"),
        targeting=Targeting(
            rng='close',
            time='One hour',
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
