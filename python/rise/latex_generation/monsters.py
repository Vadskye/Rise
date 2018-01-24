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
        key_attribute='willpower',
        name='Aboleth',
        natural_armor=6,
        race=Race('aberration'),
        size=Size('huge'),
        starting_attributes=[2, 0, 3, 2, 1, 4],
        weapons=[Weapon('tentacle')],
    )
    monsters.append(get_latex_from_creature(
        aboleth,
        active_abilities=[
            active_ability('Mind Crush', f"""
                The aboleth makes a +{aboleth.accuracy()} vs. Mental attack against a creature in Long range.
                \\hit The target takes {aboleth.standard_damage() + 2} psionic damage and is \\glossterm<stunned> as a \\glossterm<condition>.
                \\crit The aboleth can spend an action point.
                If it does, the target is \\glossterm<dominated> by the aboleth for as long as the aboleth \\glossterm<attunes> to this ability.
                Otherwise, the target takes double the damage of a non-critical hit.
            """, tags=['Mind']),
            active_ability('Psionic Blast', f"""
                The aboleth makes a +{aboleth.accuracy()} vs. Mental attack against enemies in a Large cone.
                \\hit Each target takes {aboleth.standard_damage()} psionic damage.
            """, tags=['Mind']),
            active_ability('Rituals', f"""
                The aboleth can learn and perform arcane rituals of up to 6th level.
            """),
        ],
        speed="50 ft. swim",
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
            active_ability('Rend', """
                The bear makes a claw strike against two targets within reach.
            """),
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
            active_ability('Rend', """
                The bear makes a claw strike against two targets within reach.
            """),
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
            active_ability('Pounce', """
                The dire wolf moves up to its movement speed.
                If it uses this ability during the action phase, it can make a bite strike during the delayed action phase.
            """),
        ],
    ))

    ferret = Creature(
        character_class=CharacterClass('slayer'),
        level=1,
        name='Ferret',
        natural_armor=2,
        race=Race('animal'),
        size=Size('tiny'),
        starting_attributes=[-6, 1, -4, -7, 1, -2],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        ferret,
    ))

    pony = Creature(
        character_class=CharacterClass('behemoth'),
        level=2,
        name='Pony',
        natural_armor=4,
        race=Race('animal'),
        size=Size('medium'),
        starting_attributes=[1, 1, 1, -7, 1, 0],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        pony,
    ))

    raven = Creature(
        character_class=CharacterClass('slayer'),
        level=1,
        name='Raven',
        natural_armor=2,
        race=Race('animal'),
        size=Size('tiny'),
        starting_attributes=[-9, 3, -4, -6, 2, 0],
        weapons=[Weapon('talon')],
    )
    monsters.append(get_latex_from_creature(
        raven,
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
            active_ability('Flyby Attack', """
                The roc flies up to its flying movement speed.
                It can make a talon strike or grapple attack at any point during this movement.
            """),
        ],
        speed="80 ft. fly",
    ))

    wasp = Creature(
        character_class=CharacterClass('slayer'),
        level=6,
        name='Wasp',
        name_suffix='Giant',
        natural_armor=6,
        race=Race('animal'),
        size=Size('large'),
        starting_attributes=[2, 4, 0, -8, 3, -1],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        wasp,
        speed="50 ft. fly (good)",
    ))

    wolf = Creature(
        character_class=CharacterClass('slayer'),
        level=1,
        name='Wolf',
        natural_armor=4,
        race=Race('animal'),
        size=Size('large'),
        starting_attributes=[1, 3, 1, -6, 2, 0],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        wolf,
    ))

    dire_beetle = Creature(
        challenge_rating=2,
        character_class=CharacterClass('behemoth'),
        level=7,
        name='Beetle',
        name_suffix='Dire',
        natural_armor=6,
        race=Race('animal'),
        size=Size('large'),
        starting_attributes=[3, 0, 3, -9, 2, 0],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        dire_beetle,
    ))

    huge_centipede = Creature(
        challenge_rating=4,
        character_class=CharacterClass('behemoth'),
        level=8,
        name='Centipede',
        name_suffix='Huge',
        natural_armor=6,
        race=Race('animal'),
        size=Size('huge'),
        starting_attributes=[3, 0, 3, -9, 2, 0],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        huge_centipede,
    ))

    return '\n\n'.join(monsters)


def animates():
    monsters = []

    ram_animus = Creature(
        challenge_rating=4,
        character_class=CharacterClass('behemoth'),
        level=6,
        name='Animus',
        name_suffix='Ram',
        natural_armor=6,
        race=Race('animate'),
        size=Size('huge'),
        starting_attributes=[3, 0, 2, 0, 3, 0],
        weapons=[Weapon('slam'), Weapon('hoof')],
    )
    monsters.append(get_latex_from_creature(
        ram_animus,
        active_abilities=[
            active_ability('Forceful Smash', f"""
                The ram makes a slam strike.
                Treat the attack result as a shove attack against the target in addition to the strike.
                The ram does not have to move with the target to push it back.
            """),
        ],
    ))

    return '\n\n'.join(monsters)

def humanoids():
    monsters = []

    cultist = Creature(
        armor=Armor('breastplate'),
        character_class=CharacterClass('adept'),
        level=1,
        key_attribute='willpower',
        name='Cultist',
        race=Race('humanoid'),
        starting_attributes=[0, 0, 0, -1, -1, 3],
        weapons=[Weapon('club')],
    )
    monsters.append(get_latex_from_creature(
        cultist,
        active_abilities=[
            active_ability('Hex', f"""
                The cultist makes a +{cultist.accuracy()} vs. Fortitude attack against one creature in Medium range.
                \hit The target takes {cultist.standard_damage()} life damage and is \\glossterm<sickened> as a \\glossterm<condition>.",
            """),
        ],
    ))

    goblin_shouter = Creature(
        armor=Armor('hide'),
        challenge_rating=2,
        character_class=CharacterClass('slayer'),
        level=2,
        name='Goblin Shouter',
        natural_armor=0,
        race=Race('humanoid'),
        size=Size('small'),
        starting_attributes=[0, 2, -1, -2, 2, 1],
        weapons=[Weapon('club'), Weapon('sling')],
    )
    monsters.append(get_latex_from_creature(
        goblin_shouter,
        active_abilities=[
            active_ability('Shout of Running', """
                All other willing allies who can hear the shouter can use the sprint ability without spending action points.
                This effect lasts as long as the shouter sustains it as a standard action.
            """),
            active_ability('Shout of Stabbing', """
                All other willing allies who can hear the shouter gain a +1d bonus to strike damage.
                This effect lasts as long as the shouter sustains it as a standard action.
            """),
        ],
    ))

    goblin_stabber = Creature(
        armor=Armor('hide'),
        character_class=CharacterClass('slayer'),
        level=1,
        name='Goblin Stabber',
        natural_armor=0,
        race=Race('humanoid'),
        size=Size('small'),
        starting_attributes=[0, 3, -1, -2, 2, 0],
        weapons=[Weapon('shortsword'), Weapon('sling')],
    )
    monsters.append(get_latex_from_creature(
        goblin_stabber,
        active_abilities=[
            active_ability('Sneeky Stab', f"""
                The stabber makes a shortsword strike.
                If the target is defenseless, overwhelmed, or unaware, the damage becomes {goblin_stabber.weapon_damage(Weapon('shortsword')) + 2}.
            """),
        ],
    ))

    orc_chieftain = Creature(
        armor=Armor('breastplate'),
        challenge_rating=3,
        character_class=CharacterClass('slayer'),
        level=5,
        name='Orc Chieftain',
        natural_armor=2,
        race=Race('humanoid'),
        size=Size('medium'),
        starting_attributes=[4, 0, 1, 0, 2, 2],
        weapons=[Weapon('greataxe')],
    )
    monsters.append(get_latex_from_creature(
        orc_chieftain,
        active_abilities=[
            active_ability('Hit Everyone Else', """
                All other willing allies who can hear the chieftain gain a +2 bonus to accuracy with strikes.
                This effect lasts as long as the chieftain sustains it as a standard action.
            """),
            active_ability('Hit Hardest', f"""
                The chieftain makes a greataxe strike.
                The strike deals {orc_chieftain.weapon_damage(Weapon('greataxe')) + 2} damage.
            """),
            active_ability('Hit Fast', f"""
                The chieftain makes a greataxe strike.
                Its accuracy is increased to {orc_chieftain.accuracy('perception') + 2}.
            """),
        ],
    ))

    orc_grunt = Creature(
        armor=Armor('breastplate'),
        character_class=CharacterClass('slayer'),
        level=2,
        name='Orc Grunt',
        natural_armor=0,
        race=Race('humanoid'),
        size=Size('medium'),
        starting_attributes=[3, 0, 1, -1, 0, 0],
        weapons=[Weapon('greataxe')],
    )
    monsters.append(get_latex_from_creature(
        orc_grunt,
        active_abilities=[
            active_ability('Hit Harder', f"""
                The grunt makes a greataxe strike.
                Its accuracy is reduced to {orc_grunt.accuracy('perception') - 2}, but the strike deals {orc_grunt.weapon_damage(Weapon('greataxe')) + 2} damage.
            """),
        ],
    ))

    orc_loudmouth = Creature(
        armor=Armor('breastplate'),
        challenge_rating=2,
        character_class=CharacterClass('slayer'),
        level=3,
        name='Orc Loudmouth',
        natural_armor=0,
        race=Race('humanoid'),
        size=Size('medium'),
        starting_attributes=[3, 0, 1, -1, 0, 2],
        weapons=[Weapon('greataxe')],
    )
    monsters.append(get_latex_from_creature(
        orc_loudmouth,
        active_abilities=[
            active_ability('Hit Harder', f"""
                The loudmouth makes a greataxe strike.
                Its accuracy is reduced to {orc_loudmouth.accuracy('perception') - 2}, but the strike deals {orc_loudmouth.weapon_damage(Weapon('greataxe')) + 2} damage.
            """),
            active_ability('Hit That One Over There', """
                All other willing allies who can hear the loudmouth gain a +2 bonus to accuracy with strikes against one creature within Long range.
                This effect lasts as long as the loudmouth sustains it as a standard action.
            """),
        ],
    ))

    orc_shaman = Creature(
        armor=Armor('breastplate'),
        challenge_rating=2,
        character_class=CharacterClass('adept'),
        key_attribute='willpower',
        level=3,
        name='Orc Shaman',
        natural_armor=0,
        race=Race('humanoid'),
        size=Size('medium'),
        starting_attributes=[2, 0, 1, -1, 0, 2],
        weapons=[Weapon('greatstaff')],
    )
    monsters.append(get_latex_from_creature(
        orc_shaman,
        active_abilities=[
            active_ability('Hit Worse', f"""
                The shaman makes a +{orc_shaman.accuracy()} vs. Mental attack against one creature in Close range.
                \\hit The target takes a -3 penalty to accuracy with strikes as a \\glossterm<condition>.
                \\crit As above, except that the penalty is increased to -6.
            """),
            active_ability('Hurt Less', f"""
                One other willing creature in Close range heals {orc_shaman.standard_damage() + 1} hit points.
            """),
        ],
    ))

    orc_savage = Creature(
        armor=Armor('breastplate'),
        character_class=CharacterClass('slayer'),
        level=4,
        name='Orc Savage',
        natural_armor=2,
        race=Race('humanoid'),
        size=Size('medium'),
        starting_attributes=[4, 2, 1, -1, 0, 0],
        weapons=[Weapon('greataxe')],
    )
    monsters.append(get_latex_from_creature(
        orc_savage,
        active_abilities=[
            active_ability('Hit Fast', f"""
                The savage makes a greataxe strike.
                Its accuracy is {orc_savage.accuracy('perception') + 2}.
            """),
        ],
    ))

    return '\n\n'.join(monsters)


def magical_beasts():
    monsters = []

    ankheg = Creature(
        challenge_rating=2,
        character_class=CharacterClass('slayer'),
        level=7,
        key_attribute='constitution',
        name='Ankheg',
        natural_armor=6,
        race=Race('magical beast'),
        size=Size('large'),
        starting_attributes=[3, 1, 2, -7, 1, 0],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        ankheg,
        active_abilities=[
            active_ability('Drag Prey', f"""
                The ankheg makes a shove attack with an accuracy of +{ankheg.accuracy() + 5}.
                It can move with the target up to a maximum distance equal to its land speed.
            """),
            active_ability('Spit Acid', f"""
                The ankheg makes a +{ankheg.accuracy()} vs. Reflex attack against everything in a 5 ft. wide Medium line.
                \\hit Each target takes {ankheg.standard_damage() - 1} acid damage, and creatures are \\glossterm<sickened> as a \\glossterm<condition>.
            """),
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
            # Is this how shapeshifting should work?
            active_ability('Shapeshift', """
                The aranea makes a Disguise check to change its appearance.
                It ignores all penalties for differences between its natural appearance and its intended appearance.
            """),
        ]
    ))

    basilisk = Creature(
        challenge_rating=2,
        character_class=CharacterClass('behemoth'),
        key_attribute='perception',
        level=5,
        name='Basilisk',
        natural_armor=6,
        race=Race('magical beast'),
        size=Size('medium'),
        starting_attributes=[2, -1, 2, -6, 2, 0],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        basilisk,
        active_abilities=[
            active_ability('Petrifying Gaze', f"""
                The basilisk makes a +{basilisk.accuracy()} vs. Fortitude attack against one creature in Medium range.
                \\hit The target is \\glossterm<nauseated> as a \\glossterm<condition>.
                \\crit As above, and as an additional condition, the target takes {basilisk.standard_damage() - 2} physical damage at the end of each action phase.
                If it takes vital damage in this way, it is petrified permanently.
            """),
        ],
    ))

    behir = Creature(
        challenge_rating=3,
        character_class=CharacterClass('behemoth'),
        key_attribute='constitution',
        level=8,
        name='Behir',
        natural_armor=4,
        race=Race('magical beast'),
        size=Size('huge'),
        starting_attributes=[4, 1, 2, -3, 1, 0],
        weapons=[Weapon('bite'), Weapon('claw')],
    )
    monsters.append(get_latex_from_creature(
        behir,
        active_abilities=[
            active_ability('Electric Breath', f"""
                The behir makes a +{behir.accuracy()} vs. Reflex attack against everything in a \\areamed cone.
                \\hit Each target takes {behir.standard_damage()} electricity damage, and is \\glossterm<dazed> as a \\glossterm<condition>.
            """),
            active_ability('Natural Grab', f"""
                The behir makes a bite \\glossterm<strike>.
                In addition to the effects of the strike, it also makes a +{behir.accuracy('perception')+4} vs. Fortitude and Reflex attack against the same target.
                \\hit The target is \\glossterm<grappled> by the behir.
            """),
            active_ability('Rake', f"""
                The behir spends an action point to make four claw \\glossterm<strikes> against a target that is \\glossterm<grappled> by it.
            """),
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

    girallon = Creature(
        challenge_rating=4,
        character_class=CharacterClass('slayer'),
        level=5,
        name='Girallon',
        natural_armor=6,
        race=Race('magical beast'),
        size=Size('large'),
        starting_attributes=[3, 3, 0, -8, 2, -1],
        weapons=[Weapon('claw')],
    )
    monsters.append(get_latex_from_creature(
        girallon,
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
            active_ability('Flyby Attack', """
                The griffin flies up to its flying movement speed.
                It can make a talon strike at any point during this movement.
            """),
        ],
        speed="80 ft. fly",
    ))

    thaumavore = Creature(
        character_class=CharacterClass('slayer'),
        level=3,
        name='Thaumavore',
        natural_armor=6,
        race=Race('magical beast'),
        size=Size('small'),
        starting_attributes=[2, 3, 0, -7, 1, 0],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        thaumavore,
    ))

    banehound = Creature(
        challenge_rating=4,
        character_class=CharacterClass('slayer'),
        level=5,
        name='Banehound',
        natural_armor=6,
        race=Race('magical beast'),
        size=Size('huge'),
        starting_attributes=[1, 3, 0, 1, 3, 0],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        banehound,
    ))

    return '\n\n'.join(monsters)


def monstrous_humanoids():
    monsters = []

    banshee = Creature(
        character_class=CharacterClass('adept'),
        key_attribute='willpower',
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
            active_ability('Wail', f"""
                The banshee makes a +{banshee.accuracy()} vs. Fortitude attack against everything in a Large radius.
                \\hit Each target takes {banshee.standard_damage() - 1} sonic damage, and creatures are sickened as a condition.
            """),
        ],
    ))

    hill_giant = Creature(
        armor=Armor('breastplate'),
        character_class=CharacterClass('behemoth'),
        level=5,
        name='Giant',
        name_suffix='Hill',
        natural_armor=4,
        race=Race('monstrous humanoid'),
        size=Size('large'),
        starting_attributes=[3, -2, 1, -2, 0, 0],
        weapons=[Weapon('greatclub'), Weapon('boulder')],
    )
    monsters.append(get_latex_from_creature(
        hill_giant,
        active_abilities=[
            active_ability('Boulder Toss', """
                The giant makes a ranged boulder strike, treating it as a thrown weapon with a 100 ft.\\ range increment.
            """),
        ],
    ))

    stone_giant = Creature(
        armor=Armor('breastplate'),
        character_class=CharacterClass('behemoth'),
        level=9,
        name='Giant',
        name_suffix='Stone',
        natural_armor=6,
        race=Race('monstrous humanoid'),
        size=Size('huge'),
        starting_attributes=[3, -2, 3, -1, 2, 0],
        weapons=[Weapon('greatclub'), Weapon('boulder')],
    )
    monsters.append(get_latex_from_creature(
        stone_giant,
        active_abilities=[
            active_ability('Boulder Toss', """
                The giant makes a ranged boulder strike, treating it as a thrown weapon with a 100 ft.\\ range increment.
            """),
        ],
    ))

    storm_giant = Creature(
        armor=Armor('breastplate'),
        character_class=CharacterClass('slayer'),
        key_attribute='willpower',
        level=15,
        name='Giant',
        name_suffix='Storm',
        natural_armor=4,
        race=Race('monstrous humanoid'),
        size=Size('gargantuan'),
        starting_attributes=[3, -1, 1, 1, 2, 2],
        weapons=[Weapon('greatsword')],
    )
    monsters.append(get_latex_from_creature(
        storm_giant,
        active_abilities=[
            active_ability('Lightning Javelin', f"""
                The storm giant makes a +{storm_giant.accuracy()} vs. Reflex attack against everything in a 10 ft. wide Large line.
                \\hit Each target takes {storm_giant.standard_damage()} electricity damage.
            """),
            active_ability('Thunderstrike', f"""
                The storm giant makes a greatsword strike against a target.
                If its attack result beats the target's Fortitude defense,
                    the target also takes {storm_giant.standard_damage() - 1} sonic damage
                    and is deafened as a condition.
            """),
        ],
        immunities=['deafened'],
    ))

    green_hag = Creature(
        challenge_rating=2,
        character_class=CharacterClass('adept'),
        key_attribute='perception',
        level=5,
        name='Hag',
        name_suffix='Green',
        natural_armor=6,
        race=Race('monstrous humanoid'),
        size=Size('medium'),
        starting_attributes=[0, 2, 0, 2, 3, 2],
        weapons=[Weapon('claw')],
    )
    monsters.append(get_latex_from_creature(
        green_hag,
        active_abilities=[
            active_ability('Vital Surge', f"""
                The hag makes a +{green_hag.accuracy()} vs. Fortitude attack against one creature within Medium range.
                \\hit The target takes {green_hag.standard_damage() + 1} life damage.
            """),
            active_ability("Green Hag's Curse", f"""
                The hag makes a +{green_hag.accuracy()} vs. Mental atack aginst one creature within Medium range.
                \\hit As a condition, the target is either dazed, fatigued, or sickened, as the hag chooses.
                \\crit As three separate conditions, the target is dazed, fatigued, and sickened.
            """),
            active_ability('Coven Rituals', """
                Whenever three or more hags work together, they form a coven.
                All members of the coven gain the ability to perform nature rituals as long as they work together.
                Hags of any type can form a coven together.
            """),
        ],
    ))

    medusa = Creature(
        challenge_rating=2,
        character_class=CharacterClass('adept'),
        key_attribute='perception',
        level=7,
        name='Medusa',
        natural_armor=4,
        race=Race('monstrous humanoid'),
        size=Size('medium'),
        starting_attributes=[0, 1, 0, 1, 2, 2],
        weapons=[Weapon('longbow'), Weapon('snakes')],
    )
    monsters.append(get_latex_from_creature(
        medusa,
        active_abilities=[
            active_ability('Petrifying Gaze', f"""
                The medusa makes a +{medusa.accuracy()} vs. Fortitude attack against one creature in Medium range.
                \\hit The target is \\glossterm<nauseated> as a \\glossterm<condition>.
                \\crit As above, and as an additional condition, the target takes {medusa.standard_damage() - 2} physical damage at the end of each action phase.
                If it takes vital damage in this way, it is petrified permanently.
            """),
        ],
    ))

    return '\n\n'.join(monsters)


def outsiders():
    monsters = []

    astral_deva = Creature(
        character_class=CharacterClass('adept'),
        key_attribute='willpower',
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
            active_ability('Smite', """
                The angel makes a mace strike.
                If its target is evil, it gains a +2 bonus to accuracy and a +2d bonus to damage on the strike.
            """),
            active_ability("Angel's Grace", f"""
                One willing creature within reach heals {astral_deva.standard_damage() + 1} hit points.
            """),
        ],
    ))

    arrowhawk = Creature(
        character_class=CharacterClass('slayer'),
        key_attribute='dexterity',
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
            active_ability('Electrobolt', f"""
                The arrowhawk makes a +{arrowhawk.accuracy()} vs. Reflex attack against one creature or object in Medium range.
                \\hit The target takes {arrowhawk.standard_damage()} electricity damage.
            """),
        ],
        speed="60 ft. fly (good)",
    ))

    bebelith = Creature(
        character_class=CharacterClass('slayer'),
        key_attribute='constitution',
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
        active_abilities=[
            active_ability('Venomous Bite', f"""
                The bebelith makes a bite strike.
                If it hits, and the attack result beats the target's Fortitude defense, the target is also poisoned as a condition.
                If the target is poisoned, it takes {bebelith.standard_damage() - 1} poison damage at the end of each action phase after the first round.
            """),
        ],
    ))

    hell_hound = Creature(
        character_class=CharacterClass('slayer'),
        key_attribute='constitution',
        level=4,
        name='Hell Hound',
        natural_armor=4,
        race=Race('outsider'),
        size=Size('medium'),
        starting_attributes=[1, 3, 0, -3, 2, 0],
        weapons=[Weapon('bite')],
    )
    monsters.append(get_latex_from_creature(
        hell_hound,
        active_abilities=[
            active_ability('Fire Breath', f"""
                The hell hound makes a +{hell_hound.accuracy()} vs. Reflex attack against everything in a Medium cone.
                \\hit Each target takes {hell_hound.standard_damage()} fire damage.
            """),
        ],
        immunities=['fire damage'],
    ))

    flamebrother_salamander = Creature(
        character_class=CharacterClass('slayer'),
        key_attribute='constitution',
        level=4,
        name='Salamander',
        name_suffix='Flamebrother',
        natural_armor=6,
        race=Race('outsider'),
        size=Size('medium'),
        starting_attributes=[4, 2, 0, 1, 1, 0],
        # TODO: weapons deal fire damage, and its strength is lower
        weapons=[Weapon('spear'), Weapon('tail slam')],
    )
    monsters.append(get_latex_from_creature(
        flamebrother_salamander,
        active_abilities=[
            active_ability('Flame Aura', f"""
                The salamander spends an action point to intensify its natural body heat, creating a burning aura around it.
                This ability lasts as long as the salamander sustains it as a standard action.
                At the end of each action phase, the salamander makes a +{flamebrother_salamander.accuracy()} vs. Reflex
                    attack against everything within a Medium radius emanation of it.
                \\hit Each target takes {flamebrother_salamander.standard_damage() - 1} fire damage.
            """),
            active_ability('Natural Grab', f"""
                The salamander makes a tail slam \\glossterm<strike>.
                In addition to the effects of the strike, it also makes a +{flamebrother_salamander.accuracy('perception')} vs. Fortitude and Reflex attack against the same target.
                \\hit The target is \\glossterm<grappled> by the salamander.
            """),
        ],
        immunities=['fire damage'],
    ))

    janni = Creature(
        armor=Armor('studded leather'),
        character_class=CharacterClass('adept'),
        level=7,
        name='Janni',
        natural_armor=6,
        race=Race('outsider'),
        size=Size('medium'),
        starting_attributes=[2, 3, 0, 1, 2, 1],
        weapons=[Weapon('shortsword')],
    )
    monsters.append(get_latex_from_creature(
        janni,
    ))

    salamander_battlemaster = Creature(
        challenge_rating=3,
        character_class=CharacterClass('slayer'),
        key_attribute='constitution',
        level=5,
        name='Salamander',
        name_suffix='Battlemaster',
        natural_armor=6,
        race=Race('outsider'),
        size=Size('medium'),
        starting_attributes=[4, 2, 0, 1, 2, 1],
        # TODO: weapons deal fire damage, and its strength is lower
        weapons=[Weapon('spear'), Weapon('tail slam')],
    )
    monsters.append(get_latex_from_creature(
        salamander_battlemaster,
        active_abilities=[
            active_ability('Flame Aura', f"""
                The salamander spends an action point to intensify its natural body heat, creating a burning aura around it.
                This ability lasts as long as the salamander sustains it as a standard action.
                At the end of each action phase, the salamander makes a +{flamebrother_salamander.accuracy()} vs. Reflex
                    attack against everything within a Medium radius emanation of it.
                \\hit Each target takes {flamebrother_salamander.standard_damage() - 1} fire damage.
            """),
            active_ability('Natural Grab', f"""
                The salamander makes a tail slam \\glossterm<strike>.
                In addition to the effects of the strike, it also makes a +{salamander_battlemaster.accuracy('perception')} vs. Fortitude and Reflex attack against the same target.
                \\hit The target is \\glossterm<grappled> by the salamander.
            """),
        ],
    ))

    return '\n\n'.join(monsters)


def undead():
    monsters = []

    allip = Creature(
        character_class=CharacterClass('adept'),
        level=4,
        name='Allip',
        natural_armor=4,  # How does this interact with being incorporeal?
        race=Race('undead'),
        starting_attributes=[0, 3, 0, 0, 0, 3],
        weapons=[Weapon('draining touch')],
    )
    monsters.append(get_latex_from_creature(
        allip,
    ))

    spectre = Creature(
        challenge_rating=2,
        character_class=CharacterClass('adept'),
        level=7,
        name='Spectre',
        natural_armor=4,  # How does this interact with being incorporeal?
        race=Race('undead'),
        starting_attributes=[0, 3, 0, 0, 0, 3],
        weapons=[Weapon('draining touch')],
    )
    monsters.append(get_latex_from_creature(
        spectre,
    ))

    dirgewalker = Creature(
        challenge_rating=4,
        character_class=CharacterClass('adept'),
        key_attribute='willpower',
        level=4,
        name='Dirgewalker',
        natural_armor=6,
        race=Race('undead'),
        size=Size('medium'),
        starting_attributes=[0, 3, 0, 1, 3, 2],
        weapons=[Weapon('claw')],
    )
    monsters.append(get_latex_from_creature(
        dirgewalker,
        active_abilities=[
            active_ability('Animating Caper', """
                One corpse within Close range is animated as a skeleton under the dirgewalker's control.
                This ability costs an action point to use.
                It lasts as long as the dirgewalker attunes to it.
            """),
            active_ability('Mournful Dirge', f"""
                The dirgewalker makes a +{dirgewalker.accuracy()} vs. Mental attack against all creatures in a Medium radius.
                \\hit Each target is dazed as a condition.
                \\crit Each target is stunned as a condition.
            """),
        ],
    ))

    skeleton = Creature(
        character_class=CharacterClass('slayer'),
        level=1,
        name='Skeleton',
        natural_armor=6,
        race=Race('undead'),
        size=Size('medium'),
        starting_attributes=[2, 2, 0, 0, 0, 0],
        weapons=[Weapon('claw')],
    )
    monsters.append(get_latex_from_creature(
        skeleton,
    ))

    skeleton_warrior = Creature(
        character_class=CharacterClass('slayer'),
        level=3,
        name='Skeleton',
        name_suffix='Warrior',
        natural_armor=6,
        race=Race('undead'),
        size=Size('medium'),
        starting_attributes=[2, 2, 0, 0, 0, 0],
        weapons=[Weapon('claw')],
    )
    monsters.append(get_latex_from_creature(
        skeleton_warrior,
    ))

    zombie = Creature(
        character_class=CharacterClass('behemoth'),
        level=1,
        name='Zombie',
        natural_armor=6,
        race=Race('undead'),
        size=Size('medium'),
        starting_attributes=[2, 0, 3, 0, 0, 0],
        weapons=[Weapon('slam')],
    )
    monsters.append(get_latex_from_creature(
        zombie,
        # TODO: this creature acts during the delayed action phase
    ))

    return '\n\n'.join(monsters)


def generate_monsters():
    monsters = f"""
        \\section<Aberrations>
        {aberrations()}

        \\section<Animates>
        {animates()}

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

        Monsters are all of the various non-humanoid creatures that exist in the world of Rise.
        Many of them are dangerous, and adventurers may need to fight them.
        This chapter describes the rules for monsters, and the combat statistics for a variety of monsters.

        {monster_text}
    """)
    if output is None:
        print(text)
    else:
        with open(output, 'w') as of:
            of.write(text)


if __name__ == "__main__":
    main()
