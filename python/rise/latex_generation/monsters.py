#!/usr/bin/env python3

import click
from rise.latex.monster import get_latex_from_creature
from rise.latex.active_ability import active_ability
from rise.statistics.armor import Armor
from rise.statistics.character_class import CharacterClass
from rise.statistics.creature import Creature
from rise.statistics.race import Race
from rise.statistics.shield import Shield
from rise.statistics.size import Size
from rise.statistics.weapon import Weapon
from rise.latex.util import latexify


def aberrations():
    monsters = []

    aboleth = Creature(
        challenge_rating=4,
        character_class=CharacterClass('adept'),
        level=12,
        name='Aboleth',
        natural_armor=6,
        race=Race('aberration'),
        size=Size('huge'),
        starting_attributes=[2, 0, 3, 2, 1, 3],
        weapons=[Weapon('tentacle')],
    )
    monsters.append(get_latex_from_creature(
        aboleth,
        active_abilities=[
            active_ability(
                'Confusion',
                accuracy=aboleth.accuracy(aboleth.willpower),
                defense='Mental',
                hit="The target is confused as a condition.",
                targeting='One creature in Medium range',
            ),
            active_ability(
                'Enslave',
                accuracy=aboleth.accuracy(aboleth.willpower),
                defense='Mental',
                effect="This ability costs an action point to use.",
                hit="The target is stunned as a condition.",
                critical="""
                    The target is dominated by the aboleth.
                    This effect lasts as long as the aboleth attunes to it.
                """,
                targeting='One creature in Medium range',
            ),
            active_ability(
                'Mind Crush',
                accuracy=aboleth.accuracy(aboleth.willpower),
                defense='Mental',
                # TODO: better damage type?
                hit=f"{aboleth.standard_damage(aboleth.willpower) + 2} life damage",
                targeting='One creature in Long range',
            ),
            active_ability(
                'Psionic Blast',
                accuracy=aboleth.accuracy(aboleth.willpower),
                defense='Mental',
                # TODO: better damage type?
                hit=f"{aboleth.standard_damage(aboleth.willpower)} life damage",
                targeting='Enemies in Large cone',
            ),
        ],
    ))

    return '\n\n'.join(monsters)


def animals():
    monsters = []

    black_bear = Creature(
        challenge_rating=2,
        character_class=CharacterClass('behemoth'),
        level=2,
        name='Bear',
        name_suffix='Black',
        natural_armor=4,
        race=Race('animal'),
        starting_attributes=[3, 1, 2, -7, 1, 0],
        weapons=[Weapon('bite'), Weapon('claw')],
    )
    monsters.append(get_latex_from_creature(
        black_bear,
        active_abilities=[
            active_ability(
                'Rend',
                effect='The bear makes a claw strike against two targets within reach.',
            ),
        ],
        immunities=['staggered'],
    ))

    brown_bear = Creature(
        challenge_rating=2,
        character_class=CharacterClass('behemoth'),
        level=4,
        name='Bear',
        natural_armor=4,
        name_suffix='Brown',
        race=Race('animal'),
        size=Size('large'),
        starting_attributes=[3, 1, 2, -7, 1, 0],
        weapons=[Weapon('bite'), Weapon('claw')],
    )
    monsters.append(get_latex_from_creature(
        brown_bear,
        active_abilities=[
            active_ability(
                'Rend',
                effect='The bear makes a claw strike against two targets within reach.',
            ),
        ],
        immunities=['staggered'],
    ))

    dire_wolf = Creature(
        challenge_rating=2,
        character_class=CharacterClass('slayer'),
        level=5,
        name='Dire Wolf',
        natural_armor=4,
        race=Race('animal'),
        size=Size('large'),
        starting_attributes=[3, 3, 1, -6, 2, 0],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        dire_wolf,
        active_abilities=[
            active_ability(
                'Pounce',
                effect="""
                    The dire wolf moves up to its movement speed.
                    If it uses this ability during the action phase, it can make a bite strike during the delayed action phase.
                """,
            ),
        ],
    ))

    roc = Creature(
        challenge_rating=4,
        character_class=CharacterClass('behemoth'),
        level=9,
        name='Roc',
        natural_armor=6,
        race=Race('animal'),
        size=Size('gargantuan'),
        starting_attributes=[4, 2, 1, -7, 1, 0],
        weapons=[Weapon('talon')],
    )
    monsters.append(get_latex_from_creature(
        roc,
        active_abilities=[
            active_ability(
                'Flyby Attack',
                effect="""
                    The roc flies up to its flying movement speed.
                    It can make a talon strike or grapple attack at any point during this movement.
                """
            ),
        ],
        speed="80 ft. fly",
    ))

    return '\n\n'.join(monsters)


def humanoids():
    monsters = []

    cultist = Creature(
        armor=Armor('breastplate'),
        character_class=CharacterClass('adept'),
        level=1,
        name='Cultist',
        race=Race('humanoid'),
        starting_attributes=[0, 0, 0, -1, -1, 3],
        weapons=[Weapon('club')],
    )
    monsters.append(get_latex_from_creature(
        cultist,
        active_abilities=[
            active_ability(
                'Hex',
                accuracy=cultist.accuracy(cultist.willpower),
                defense='Mental',
                hit=f"{cultist.standard_damage(cultist.willpower)} life damage, and the target is sickened as a condition.",
                targeting='One target in Medium range',
            ),
        ],
    ))

    return '\n\n'.join(monsters)


def magical_beasts():
    monsters = []

    ankheg = Creature(
        challenge_rating=2,
        character_class=CharacterClass('slayer'),
        level=6,
        name='Ankheg',
        natural_armor=6,
        race=Race('magical beast'),
        size=Size('large'),
        starting_attributes=[3, 2, 1, -7, 1, 0],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        ankheg,
        active_abilities=[
            active_ability(
                'Drag Prey',
                effect=f"""
                    The ankheg makes a shove attack with an accuracy of +{ankheg.accuracy(ankheg.strength) + 5}.
                    It can move with the target up to a maximum distance equal to its land speed.
                """,
            ),
            active_ability(
                'Spit Acid',
                accuracy=ankheg.accuracy(),
                defense='Reflex',
                hit=f"{ankheg.standard_damage(ankheg.constitution) - 1} acid damage, and each target is sickened as a condition.",
                targeting='Everything in 5 ft. wide Medium line',
            ),
        ]
    ))

    aranea = Creature(
        character_class=CharacterClass('adept'),
        level=5,
        name='Aranea',
        natural_armor=4,
        race=Race('magical beast'),
        starting_attributes=[0, 2, 0, 2, 1, 3],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        aranea,
        active_abilities=[
            active_ability(
                'Shapeshift',
                # Is this how shapeshifting should work?
                effect="""
                    The aranea makes a Disguise check to change its appearance.
                    It ignores all penalties for differences between its natural appearance and its intended appearance.
                """,
            ),
        ]
    ))

    basilisk = Creature(
        challenge_rating=2,
        character_class=CharacterClass('behemoth'),
        level=5,
        name='Basilisk',
        natural_armor=6,
        race=Race('magical beast'),
        size=Size('medium'),
        starting_attributes=[2, -1, 2, -6, 1, 0],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        basilisk,
        active_abilities=[
            active_ability(
                'Petrifying Gaze',
                accuracy=basilisk.accuracy(),
                defense='Fortitude',
                hit="The target is nauseated as a condition.",
                critical=f"""
                    As above, and the target takes {basilisk.standard_damage(basilisk.constitution) - 2} life damage at the end of each action phase.
                    If it takes vital damage in this way, it is petrified permanently.
                """,
                targeting="One creature in Close range",
            ),
        ],
    ))

    centaur = Creature(
        armor=Armor('leather'),
        character_class=CharacterClass('slayer'),
        level=3,
        name='Centaur',
        natural_armor=4,
        race=Race('magical beast'),
        size=Size('large'),
        starting_attributes=[1, 2, 2, 0, 2, 0],
        weapons=[Weapon('longsword'), Weapon('longbow'), Weapon('hoof')],
    )
    monsters.append(get_latex_from_creature(
        centaur,
    ))

    griffin = Creature(
        challenge_rating=2,
        character_class=CharacterClass('slayer'),
        level=4,
        name='Griffon',
        natural_armor=6,
        race=Race('magical beast'),
        size=Size('large'),
        starting_attributes=[2, 3, 2, -4, 1, 0],
        weapons=[Weapon('talon')],
    )
    monsters.append(get_latex_from_creature(
        griffin,
        active_abilities=[
            active_ability(
                'Flyby Attack',
                effect="""
                    The griffin flies up to its flying movement speed.
                    It can make a talon strike at any point during this movement.
                """
            ),
        ],
        speed="80 ft. fly",
    ))

    return '\n\n'.join(monsters)


def monstrous_humanoids():
    monsters = []

    banshee = Creature(
        character_class=CharacterClass('adept'),
        level=3,
        name='Banshee',
        natural_armor=4,
        race=Race('monstrous humanoid'),
        size=Size('medium'),
        starting_attributes=[1, 2, 0, 0, 1, 2],
        weapons=[Weapon('claw')],
    )
    monsters.append(get_latex_from_creature(
        banshee,
        active_abilities=[
            active_ability(
                'Wail',
                accuracy=banshee.accuracy(banshee.willpower),
                defense='Fortitude',
                hit=f"{banshee.standard_damage(banshee.willpower) - 1} sonic damage, and each target is sickened as a condition.",
                targeting='Everything in a Large radius',
            ),
        ],
    ))

    storm_giant = Creature(
        armor=Armor('breastplate'),
        character_class=CharacterClass('slayer'),
        level=15,
        name='Giant',
        name_suffix='Storm',
        natural_armor=4,
        race=Race('monstrous humanoid'),
        size=Size('gargantuan'),
        starting_attributes=[3, 0, 2, 1, 2, 2],
        weapons=[Weapon('greatsword')],
    )
    monsters.append(get_latex_from_creature(
        storm_giant,
        active_abilities=[
            active_ability(
                'Lightning Javelin',
                accuracy=storm_giant.accuracy(),
                defense='Reflex',
                hit=f"{storm_giant.standard_damage(storm_giant.willpower)} electricity damage.",
                targeting='All in a 10 ft. wide Large line',
            ),
            active_ability(
                'Thunderstrike',
                effect=f"""
                    The storm giant makes a greatsword strike against a target.
                    If its attack result beats the target's Fortitude defense,
                        the target also takes {storm_giant.standard_damage(storm_giant.strength) - 1} sonic damage
                        and is deafened as a condition.
                """,
            ),
        ],
        immunities=['deafened'],
    ))

    medusa = Creature(
        challenge_rating=2,
        character_class=CharacterClass('adept'),
        level=7,
        name='Medusa',
        natural_armor=4,
        race=Race('monstrous humanoid'),
        size=Size('medium'),
        starting_attributes=[0, 2, 0, 1, 1, 2],
        weapons=[Weapon('longbow'), Weapon('snakes')],
    )
    monsters.append(get_latex_from_creature(
        medusa,
        active_abilities=[
            active_ability(
                'Petrifying Gaze',
                accuracy=medusa.accuracy(),
                defense='Fortitude',
                hit="The target is nauseated as a condition.",
                critical=f"""
                    As above, and the target takes {medusa.standard_damage(medusa.constitution) - 2} life damage at the end of each action phase.
                    If it takes vital damage in this way, it is petrified permanently.
                """,
                targeting="One creature in Close range",
            ),
        ],
    ))

    return '\n\n'.join(monsters)


def outsiders():
    monsters = []

    astral_deva = Creature(
        character_class=CharacterClass('adept'),
        level=14,
        name='Angel',
        name_suffix='Astral Deva',
        natural_armor=6,
        race=Race('outsider'),
        shield=Shield('heavy'),
        starting_attributes=[2, 2, 2, 2, 2, 2],
        weapons=[Weapon('mace')],
    )
    monsters.append(get_latex_from_creature(
        astral_deva,
        active_abilities=[
            active_ability(
                'Smite',
                effect="""
                    The angel makes a mace strike.
                    If its target is evil, it gains a +2 bonus to accuracy and a +2d bonus to damage on the strike.
                """,
            ),
            active_ability(
                "Angel's Grace",
                effect=f"""
                    One ally within reach heals {astral_deva.standard_damage(astral_deva.willpower) + 1} hit points.
                """,
            ),
        ],
    ))

    arrowhawk = Creature(
        character_class=CharacterClass('slayer'),
        level=3,
        name='Arrowhawk',
        natural_armor=4,
        race=Race('outsider'),
        starting_attributes=[1, 4, -1, 0, 3, 0],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        arrowhawk,
        active_abilities=[
            active_ability(
                'Electrobolt',
                accuracy=arrowhawk.accuracy(),
                defense='Reflex',
                hit=f"{arrowhawk.standard_damage(arrowhawk.constitution) + 1} electricity damage.",
                targeting='One target in Medium range',
            ),
        ],
        speed="60 ft. fly (good)",
    ))

    bebelith = Creature(
        character_class=CharacterClass('slayer'),
        level=11,
        name='Demon',
        name_suffix='Bebelith',
        natural_armor=6,
        race=Race('outsider'),
        size=Size('huge'),
        starting_attributes=[2, 3, 2, 0, 1, 0],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        bebelith,
    ))

    return '\n\n'.join(monsters)


def undead():
    monsters = []

    monsters.append(get_latex_from_creature(
        Creature(
            character_class=CharacterClass('adept'),
            level=4,
            name='Allip',
            natural_armor=4,  # How does this interact with being incorporeal?
            race=Race('undead'),
            starting_attributes=[0, 3, 0, 0, 0, 3],
            weapons=[Weapon('draining touch')],
        ),
    ))

    return '\n\n'.join(monsters)


def generate_monsters():
    monsters = f"""
        \\section<Aberrations>
        {aberrations()}


        \\section<Animals>
        {animals()}

        \\section<Humanoids>
        {humanoids()}

        \\section<Magical Beasts>
        {magical_beasts()}

        \\section<Monstrous Humanoids>
        {monstrous_humanoids()}

        \\section<Outsiders>
        {outsiders()}

        \\section<Undead>
        {undead()}
    """

    return monsters


def sanity_check(monsters):
    pass


@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output')
def main(output, check):
    monster_text = generate_monsters()
    text = latexify(f"""
        \\chapter<Monsters>
        {monster_text}
    """)
    if output is None:
        print(text)
    else:
        with open(output, 'w') as of:
            of.write(text)


if __name__ == "__main__":
    main()
