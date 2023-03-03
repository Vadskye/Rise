#!/usr/bin/env python3

import click
from rise.latex_generation.book_path import book_path
from rise.latex.get_creature_latex import get_creature_latex
from rise.latex.ability import active_ability, passive_ability
from rise.statistics.weapon import Weapon
from rise.latex.util import latexify
from rise.statistics.sample_creatures import get_sample_creatures


def trunc_to_five(n):
    return (n // 5) * 5


# These are functions commmon to multiple creatures that modify the creature's
# statistics in some way.
modifiers = {}


def ichor_modifier(creature):
    creature.name = f"Ichor {creature.name}"
    creature.species.mental_defense_bonus = 6
    return creature


modifiers["ichor"] = ichor_modifier


# These are passive abiliites common to multiple creature. The abilities take
# the creature as an argument to alow referencing aspects of the creature in the
# description.
passives = {
    "hard bones": lambda creature: passive_ability(
        "Hard Bones",
        f"""
        The {creature.name.lower()} gains a \plus{creature.constitution} bonus to \\glossterm<resistances> against piercing and slashing damage.
    """,
    ),
    "ichor healing": lambda creature: passive_ability(
        "Ichor Healing",
        f"""
        The {creature.name.lower()} removes all \\glossterm<vital wounds> when it finishes a \\glossterm<short rest>.
    """,
    ),
    "soft flesh": lambda creature: passive_ability(
        "Soft Flesh",
        f"""
        The {creature.name.lower()} gains a \plus{creature.constitution} bonus to \\glossterm<resistances> against piercing and slashing damage.
    """,
    ),
    "slow": lambda creature: passive_ability(
        "Slow",
        f"""
        The {creature.name.lower()} does not act during the \\glossterm<action phase>.
        Instead, it acts during the \\glossterm<delayed action phase>.
    """,
    ),
    "multi-headed": lambda creature: passive_ability(
        "Multi-Headed",
        f"""
        A {creature.name.lower()} can make a number of \\glossterm<strikes> in each \\glossterm<action phase> equal to the number of heads it has active.
        When the hydra loses a \\glossterm<hit point>, it loses one of its heads.
        Severed heads leave behind a stump that can quickly grow new heads.

        Whenever the hydra takes acid, cold, or fire damage, all unsealed severed stumps are sealed, including new stumps severed during the current phase.
        At the end of each round, if the hydra has an unsealed severed stump, it grows two new heads from the stump.
        This grants it additional strikes during the action phase as normal.

        A hydra cannot sustain too many excess heads for a prolonged period of time.
        At the end of each round, if the hydra has more heads than twice its normal head count, it loses a \\glossterm<hit point>.
        If the hydra finishes a \\glossterm<long rest>, the excess heads shrivel and die, and any sealed stumps heal, restoring the hydra to its normal head count.
    """,
    ),
}


def aberrations(sample_monsters):
    monsters = []

    aboleth = sample_monsters["aboleth"]
    monsters.append(
        get_creature_latex(
            aboleth,
            active_abilities=[
                active_ability(
                    "Mind Crush",
                    f"""
                The aboleth makes a +{aboleth.accuracy()} vs. Mental attack against a creature in \\rnglong range.
                \\hit The target takes {aboleth.standard_damage('magical') + 3} psionic damage and is \\stunned as a \\glossterm<condition>.
                \\crit The aboleth can spend an \\glossterm<attunement point> to \\glossterm<attune> to this ability.
                If it does, the target is \\glossterm<dominated> by the aboleth as long as the ability lasts.
                Otherwise, the target takes double the damage of a non-critical hit.
            """,
                    tags=["Compulsion"],
                ),
                active_ability(
                    "Psionic Blast",
                    f"""
                The aboleth makes a +{aboleth.accuracy()} vs. Mental attack against enemies in a Large cone.
                \\hit Each target takes {aboleth.standard_damage('magical') + 1} psionic damage and is \\stunned as a \\glossterm<condition>.
            """,
                    tags=["Compulsion"],
                ),
            ],
            passive_abilities=[
                passive_ability(
                    "Rituals",
                    f"""
                The aboleth can learn and perform arcane rituals of up to 6th level.
            """,
                ),
            ],
            speed="50 ft. swim",
        )
    )

    return "\n\n".join(monsters)


def animals(sample_monsters):
    monsters = []

    eel = sample_monsters["eel"]
    monsters.append(
        get_creature_latex(
            eel,
        )
    )

    black_bear = sample_monsters["black_bear"]
    monsters.append(
        get_creature_latex(
            black_bear,
            active_abilities=[
                active_ability(
                    "Rend",
                    """
                The bear makes a claw strike against two targets within reach.
            """,
                ),
            ],
            immunities=["staggered"],
        )
    )

    monsters.append(
        get_creature_latex(
            modifiers["ichor"](black_bear),
            active_abilities=[
                active_ability(
                    "Rend",
                    """
                The bear makes a claw strike against two targets within reach.
            """,
                ),
            ],
            passive_abilities=[
                passives["ichor healing"](black_bear),
            ],
            immunities=["staggered"],
        )
    )

    brown_bear = sample_monsters["brown_bear"]
    monsters.append(
        get_creature_latex(
            brown_bear,
            active_abilities=[
                active_ability(
                    "Rend",
                    """
                The bear makes a claw strike against two targets within reach.
            """,
                ),
            ],
            immunities=["staggered"],
        )
    )

    dire_wolf = sample_monsters["dire_wolf"]
    monsters.append(
        get_creature_latex(
            dire_wolf,
            active_abilities=[
                active_ability(
                    "Pounce",
                    """
                The dire wolf moves up to its speed in a single straight line and makes a bite \\glossterm<strike> from its new location.
            """,
                ),
            ],
        )
    )

    ferret = sample_monsters["ferret"]
    monsters.append(
        get_creature_latex(
            ferret,
        )
    )

    pony = sample_monsters["pony"]
    monsters.append(
        get_creature_latex(
            pony,
        )
    )

    raven = sample_monsters["raven"]
    monsters.append(
        get_creature_latex(
            raven,
        )
    )

    roc = sample_monsters["roc"]
    monsters.append(
        get_creature_latex(
            roc,
            active_abilities=[
                active_ability(
                    "Flyby Attack",
                    """
                The roc flies up to its flying movement speed.
                It can make a talon strike or use the \\textit<grapple> ability at any point during this movement.
            """,
                ),
            ],
            speed="80 ft. fly",
        )
    )

    wasp = sample_monsters["wasp"]
    monsters.append(
        get_creature_latex(
            wasp,
            speed="50 ft. fly (good)",
        )
    )

    wolf = sample_monsters["wolf"]
    monsters.append(
        get_creature_latex(
            wolf,
        )
    )

    dire_beetle = sample_monsters["dire_beetle"]
    monsters.append(
        get_creature_latex(
            dire_beetle,
        )
    )

    huge_centipede = sample_monsters["huge_centipede"]
    monsters.append(
        get_creature_latex(
            huge_centipede,
        )
    )

    spider_gargantuan = sample_monsters["spider_gargantuan"]
    monsters.append(
        get_creature_latex(
            spider_gargantuan,
            active_abilities=[
                active_ability(
                    "Web Spit",
                    f"""
                The spider makes a +{spider_gargantuan.accuracy()} vs. Reflex attack against one creature within \\rnglong range.
                \\hit The target is \\glossterm<immobilized> as a \\glossterm<condition>.
            """,
                ),
            ],
        )
    )

    spider_colossal = sample_monsters["spider_colossal"]
    monsters.append(
        get_creature_latex(
            spider_colossal,
            active_abilities=[
                active_ability(
                    "Web Spit",
                    f"""
                The spider makes a +{spider_colossal.accuracy()} vs. Reflex attack against one creature within \\rnglong range.
                \\hit The target is \\glossterm<immobilized> as a \\glossterm<condition>.
            """,
                ),
            ],
        )
    )

    monsters.sort()

    return "\n\n".join(monsters)


def animates(sample_monsters):
    monsters = []

    elemental_air = sample_monsters["elemental_air"]
    monsters.append(
        get_creature_latex(
            elemental_air,
            active_abilities=[],
        )
    )

    ram_animus = sample_monsters["ram_animus"]
    monsters.append(
        get_creature_latex(
            ram_animus,
            active_abilities=[
                active_ability(
                    "Forceful Smash",
                    f"""
                The ram makes a slam strike.
                In addition to the strike's normal effects, compare the attack roll against the target's Fortitude defense.
                \\hit The target moves up to 10 feet in a direction of the ram's choice, as the \\textit<shove> ability (see \\pcref<Shove>).
                The ram does not have to move with the target to push it back.
            """,
                ),
            ],
        )
    )

    earth_elemental_elder = sample_monsters["earth_elemental_elder"]
    monsters.append(
        get_creature_latex(
            earth_elemental_elder,
        )
    )

    return "\n\n".join(monsters)


def humanoids(sample_monsters):
    monsters = []

    cultist = sample_monsters["cultist"]
    monsters.append(
        get_creature_latex(
            cultist,
            active_abilities=[
                active_ability(
                    "Hex",
                    f"""
                The cultist makes a +{cultist.accuracy()} vs. Fortitude attack against one creature in Medium range.
                \hit The target takes {cultist.standard_damage() + 1} life damage and is \\dazed as a \\glossterm<condition>.",
            """,
                ),
            ],
        )
    )

    goblin_shouter = sample_monsters["goblin_shouter"]
    monsters.append(
        get_creature_latex(
            goblin_shouter,
            active_abilities=[
                active_ability(
                    "Shout of Stabbing",
                    """
                The shouter's \\glossterm<allies> that can hear it gain a +2 bonus to \\glossterm<power> with \\glossterm<strikes>.
            """,
                    tags=["Sustain (standard)"],
                ),
            ],
            behavior="Attack lowest Strength",
        )
    )

    goblin_stabber = sample_monsters["goblin_stabber"]
    monsters.append(
        get_creature_latex(
            goblin_stabber,
            active_abilities=[
                active_ability(
                    "Sneeky Stab",
                    f"""
                The stabber makes a shortsword strike.
                If the target is \\glossterm<partiallyunaware> or \\glossterm<unaware>, the damage becomes {goblin_stabber.weapon_damage(Weapon('shortsword')) + 2}.
            """,
                ),
            ],
            behavior="Attack lowest Strength",
        )
    )

    orc_chieftain = sample_monsters["orc_chieftain"]
    monsters.append(
        get_creature_latex(
            orc_chieftain,
            active_abilities=[
                active_ability(
                    "Hit Everyone Else",
                    """
                The chieftain's \\glossterm<allies> that can hear it gain a +2 bonus to \\glossterm<accuracy> with \\glossterm<strikes>.
            """,
                    tags=["Sustain (standard)"],
                ),
                active_ability(
                    "Hit Hardest",
                    f"""
                The chieftain makes a greataxe strike.
                The strike deals {orc_chieftain.weapon_damage(Weapon('greataxe')) + 2} damage.
            """,
                ),
                active_ability(
                    "Hit Fast",
                    f"""
                The chieftain makes a greataxe strike.
                Its accuracy is increased to {orc_chieftain.accuracy('perception') + 2}.
            """,
                ),
            ],
        )
    )

    orc_grunt = sample_monsters["orc_grunt"]
    monsters.append(
        get_creature_latex(
            orc_grunt,
            active_abilities=[
                active_ability(
                    "Hit Harder",
                    f"""
                The grunt makes a greataxe strike.
                Its accuracy is reduced to {orc_grunt.accuracy('perception') - 2}, but the strike deals {orc_grunt.weapon_damage(Weapon('greataxe')) + 2} damage.
            """,
                ),
            ],
        )
    )

    orc_loudmouth = sample_monsters["orc_loudmouth"]
    monsters.append(
        get_creature_latex(
            orc_loudmouth,
            active_abilities=[
                active_ability(
                    "Hit Harder",
                    f"""
                The loudmouth makes a greataxe strike.
                Its accuracy is reduced to {orc_loudmouth.accuracy('perception') - 2}, but the strike deals {orc_loudmouth.weapon_damage(Weapon('greataxe')) + 2} damage.
            """,
                ),
                active_ability(
                    "Hit That One Over There",
                    """
                The loudmouth chooses an enemy within Long range.
                The loudmouth's \\glossterm<allies> that can hear it gain a +2 bonus to \\glossterm<accuracy> with \\glossterm<strikes> against that target.
            """,
                    tags=["Sustain (standard)"],
                ),
            ],
        )
    )

    orc_shaman = sample_monsters["orc_shaman"]
    monsters.append(
        get_creature_latex(
            orc_shaman,
            active_abilities=[
                active_ability(
                    "Hit Worse",
                    f"""
                The shaman makes a +{orc_shaman.accuracy()} vs. Mental attack against one creature in Close range.
                \\hit The target takes a -3 accuracy penalty with strikes as a \\glossterm<condition>.
                \\crit As above, except that the penalty is increased to -6.
            """,
                ),
                active_ability(
                    "Hurt Less",
                    f"""
                One \\glossterm<ally> in \\rngmed range regains 2 \\glossterm<hit points>.
                That creature is unaffected by any additional uses of this ability until the shaman finishes a \\glossterm<short rest>.
            """,
                ),
            ],
        )
    )

    orc_savage = sample_monsters["orc_savage"]
    monsters.append(
        get_creature_latex(
            orc_savage,
            active_abilities=[
                active_ability(
                    "Hit Fast",
                    f"""
                The savage makes a greataxe strike.
                Its accuracy is {orc_savage.accuracy('perception') + 2}.
            """,
                ),
            ],
        )
    )

    return "\n\n".join(monsters)


def magical_beasts(sample_monsters):
    monsters = []

    large_red_dragon = sample_monsters["large_red_dragon"]
    monsters.append(
        get_creature_latex(
            large_red_dragon,
        )
    )

    wyvern = sample_monsters["wyvern"]
    monsters.append(get_creature_latex(wyvern, active_abilities=[]))

    ankheg = sample_monsters["ankheg"]
    monsters.append(
        get_creature_latex(
            ankheg,
            active_abilities=[
                active_ability(
                    "Drag Prey",
                    f"""
                This ability functions like the \\textit<shove> ability (see \\pcref<Shove>), except that the ankheg's accuracy is +{ankheg.accuracy() + 5}.
                In addition, the ankheg can move with the target up to a maximum distance equal to its \\glossterm<land speed>.
            """,
                ),
                active_ability(
                    "Spit Acid",
                    f"""
                The ankheg makes a +{ankheg.accuracy()} vs. Armor attack against everything in a 5 ft. wide Medium line.
                \\hit Each target takes {ankheg.standard_damage()} acid damage, and creatures are \\dazed as a \\glossterm<condition>.
            """,
                ),
            ],
        )
    )

    aranea = sample_monsters["aranea"]
    monsters.append(
        get_creature_latex(
            aranea,
            active_abilities=[
                # Is this how shapeshifting should work?
                active_ability(
                    "Shapeshift",
                    """
                The aranea makes a Disguise check to change its appearance.
                It ignores all penalties for differences between its natural appearance and its intended appearance.
            """,
                ),
            ],
        )
    )

    basilisk = sample_monsters["basilisk"]
    monsters.append(
        get_creature_latex(
            basilisk,
            active_abilities=[
                active_ability(
                    "Petrifying Gaze",
                    f"""
                The basilisk makes a +{basilisk.accuracy()} vs. Fortitude attack against one creature in Medium range.
                \\hit The target is \\stunned as a \\glossterm<condition>.
                \\crit As above, and as an additional condition, the target takes {basilisk.standard_damage() - 1} physical damage during each \\glossterm<action phase> in subsequent rounds.
                If this damage inflicts a \\glossterm<vital wound>, the target is petrified permanently.
            """,
                ),
            ],
        )
    )

    behir = sample_monsters["behir"]
    monsters.append(
        get_creature_latex(
            behir,
            active_abilities=[
                active_ability(
                    "Electric Breath",
                    f"""
                The behir makes a +{behir.accuracy()} vs. Armor attack against everything in a \\areasmall cone.
                \\hit Each target takes {behir.standard_damage() + 1} electricity damage, and is \\dazed as a \\glossterm<condition>.
            """,
                ),
                active_ability(
                    "Natural Grab",
                    f"""
                The behir makes a bite \\glossterm<strike>.
                In addition to the effects of the strike, it also makes a +{behir.accuracy('perception')+4} vs. Fortitude and Reflex attack against the same target.
                \\hit The target is \\grappled by the behir.
            """,
                ),
                active_ability(
                    "Rake",
                    f"""
                The behir makes four claw \\glossterm<strikes> against a target that is \\glossterm<grappled> by it.
            """,
                    ap_cost=True,
                ),
            ],
        )
    )

    blink_dog = sample_monsters["blink_dog"]
    monsters.append(
        get_creature_latex(
            blink_dog,
            active_abilities=[
                active_ability(
                    "Blink",
                    f"""
                As a \\glossterm<movement>, the blink dog can use this ability.
                If it does, it teleports to an unoccupied location within Medium range.
            """,
                ),
            ],
        )
    )

    centaur = sample_monsters["centaur"]
    monsters.append(
        get_creature_latex(
            centaur,
        )
    )

    cockatrice = sample_monsters["cockatrice"]
    monsters.append(
        get_creature_latex(
            cockatrice,
            active_abilities=[
                active_ability(
                    "Petrifying Bite",
                    f"""
                The cockatrice makes a bite \\glossterm<strike>.
                In addition to the strike's normal effects, the cockatrice also makes a +{cockatrice.accuracy()} vs. Fortitude attack against the target.
                \\hit If the strike also hit, the target is \\stunned as a \\glossterm<condition>.
                \\crit As above, and as an additional condition, the target takes {cockatrice.standard_damage() - 1} physical damage during each \\glossterm<action phase> in subsequent rounds.
                If this damage inflicts a \\glossterm<vital wound>, the target is petrified permanently.
            """,
                ),
            ],
        )
    )

    darkmantle = sample_monsters["darkmantle"]
    monsters.append(
        get_creature_latex(
            darkmantle,
            active_abilities=[
                active_ability(
                    "Natural Grab",
                    f"""
                The darkmantle makes a slam \\glossterm<strike>.
                In addition to the effects of the strike, it also makes a +{darkmantle.accuracy('perception') - 2} vs. Fortitude and Reflex attack against the same target.
                \\hit The target is \\glossterm<grappled> by the darkmantle.
            """,
                ),
            ],
        )
    )

    frost_worm = sample_monsters["frost_worm"]
    monsters.append(
        get_creature_latex(
            frost_worm,
            immunities=["cold"],
            active_abilities=[
                active_ability(
                    "Frost Breath",
                    f"""
                The frost worm makes a +{frost_worm.accuracy()} vs. Fortitude attack against everything in a \\areamed cone from it.
                \\hit Each target takes {frost_worm.standard_damage() + 2} cold damage.
            """,
                    tags=["Cold"],
                ),
                active_ability(
                    "Trill",
                    f"""
                The frost worm emits a piercing noise that compels prey to stay still.
                It makes a +{frost_worm.accuracy()} vs. Mental attack against creatures in a \\arealarge radius from it.
                This area can pass through solid objects, including the ground, but every 5 feet of solid obstacle counts as 20 feet of distance.
                \\hit Each target is \\dazed and \\immobilized as two separate \\glossterm<conditions>.
                \\crit Each target is \\stunned and \\immobilized as two separate \\glossterm<conditions>.
            """,
                    tags=["Compulsion"],
                    ap_cost=True,
                ),
            ],
            passive_abilities=[
                passive_ability(
                    "Bitter Cold",
                    f"""
                The frost worm's bite and slam strikes deal cold damage in addition to their other damage types.
            """,
                ),
                passive_ability(
                    "Death Throes",
                    f"""
                When a frost worm is killed, its corpse turns to ice and shatters in a violent explosion.
                It makes a +{frost_worm.accuracy()} vs. Fortitude attack against everything in a \\arealarge radius from it.
                \\hit Each target takes {frost_worm.standard_damage() + 4} cold and piercing damage.
            """,
                ),
            ],
        )
    )

    girallon = sample_monsters["girallon"]
    monsters.append(
        get_creature_latex(
            girallon,
        )
    )

    griffin = sample_monsters["griffin"]
    monsters.append(
        get_creature_latex(
            griffin,
            active_abilities=[
                active_ability(
                    "Flyby Attack",
                    """
                The griffin flies up to its flying movement speed.
                It can make a talon strike at any point during this movement.
            """,
                ),
            ],
            speed="80 ft. fly",
        )
    )

    hydra5 = sample_monsters["hydra5"]
    monsters.append(
        get_creature_latex(
            hydra5,
            actions="Five in action phase",
            passive_abilities=[
                passives["multi-headed"](hydra5),
            ],
        )
    )

    hydra6 = sample_monsters["hydra6"]
    monsters.append(
        get_creature_latex(
            hydra6,
            actions="Six in action phase",
            passive_abilities=[
                passives["multi-headed"](hydra6),
            ],
        )
    )

    minotaur = sample_monsters["minotaur"]
    monsters.append(
        get_creature_latex(
            minotaur,
            active_abilities=[
                active_ability(
                    "Impaling Charge",
                    f"""
                The minotaur moves up to its speed in a single straight line and makes a gore \\glossterm<strike> from its new location.
            """,
                ),
            ],
            passive_abilities=[
                passive_ability(
                    "Labyrinth Dweller",
                    f"""
                The minotaur never gets lost or loses track of its current location.
            """,
                )
            ],
        )
    )

    thaumavore = sample_monsters["thaumavore"]
    monsters.append(
        get_creature_latex(
            thaumavore,
            passive_abilities=[
                passive_ability(
                    "Consume Magic",
                    f"""
                The thaumavore gains a +4 bonus to \\glossterm<defenses> against \\magical abilities.
                Whenever it resists a \\magical attack, it regains a \\glossterm<hit point>.
            """,
                ),
                passive_ability(
                    "Sense Magic",
                    f"""
                The thaumavore can sense the location of all sources of magic within 100 feet of it.
                This includes magic items, attuned magical abilities, and so on.
            """,
                ),
            ],
            behavior="Attack highest Willpower that has a source of magic; if no souces of magic exist, attack highest Willpower",
        )
    )

    banehound = sample_monsters["banehound"]
    monsters.append(
        get_creature_latex(
            banehound,
        )
    )

    fleshfeeder = sample_monsters["fleshfeeder"]
    monsters.append(
        get_creature_latex(
            fleshfeeder,
        )
    )

    return "\n\n".join(monsters)


def monstrous_humanoids(sample_monsters):
    monsters = []

    banshee = sample_monsters["banshee"]
    monsters.append(
        get_creature_latex(
            banshee,
            active_abilities=[
                active_ability(
                    "Wail",
                    f"""
                The banshee makes a +{banshee.accuracy()} vs. Fortitude attack against everything in a Large radius.
                \\hit Each target takes {banshee.standard_damage()} energy damage, and creatures are dazed as a condition.
            """,
                ),
            ],
        )
    )

    hill_giant = sample_monsters["hill_giant"]
    monsters.append(
        get_creature_latex(
            hill_giant,
            active_abilities=[
                active_ability(
                    "Boulder Toss",
                    """
                The giant makes a ranged boulder strike, treating it as a thrown weapon with 200/1000 \\glossterm<range limits>.
            """,
                ),
            ],
        )
    )

    stone_giant = sample_monsters["stone_giant"]
    monsters.append(
        get_creature_latex(
            stone_giant,
            active_abilities=[
                active_ability(
                    "Boulder Toss",
                    """
                The giant makes a ranged boulder strike, treating it as a thrown weapon with a 200/1000 \\glossterm<range limits>.
            """,
                ),
            ],
        )
    )

    storm_giant = sample_monsters["storm_giant"]
    monsters.append(
        get_creature_latex(
            storm_giant,
            active_abilities=[
                active_ability(
                    "Lightning Javelin",
                    f"""
                The storm giant makes a +{storm_giant.accuracy()} vs. Fortitude attack against everything in a 10 ft. wide Large line.
                \\hit Each target takes {storm_giant.standard_damage() + 2} electricity damage.
            """,
                ),
                active_ability(
                    "Thunderstrike",
                    f"""
                The storm giant makes a greatsword strike against a target.
                If its attack roll beats the target's Fortitude defense,
                    the target also takes {storm_giant.standard_damage()} energy damage
                    and is deafened as a condition.
            """,
                ),
            ],
            immunities=["deafened"],
        )
    )

    green_hag = sample_monsters["green_hag"]
    monsters.append(
        get_creature_latex(
            green_hag,
            active_abilities=[
                active_ability(
                    "Vital Surge",
                    f"""
                The hag makes a +{green_hag.accuracy()} vs. Fortitude attack against one creature within Medium range.
                \\hit The target takes {green_hag.standard_damage() + 2} life damage.
            """,
                ),
                active_ability(
                    "Green Hag's Curse",
                    f"""
                The hag makes a +{green_hag.accuracy()} vs. Mental atack aginst one creature within Medium range.
                \\hit As a condition, the target is \\dazed or \\dazed, as the hag chooses.
                \\crit As two separate conditions, the target is dazed and dazed.
            """,
                ),
            ],
            passive_abilities=[
                passive_ability(
                    "Coven Rituals",
                    """
                When three or more hags work together, they form a coven.
                All members of the coven gain the ability to perform nature rituals as long as they work together.
                Hags of any type can form a coven together.
            """,
                ),
            ],
        )
    )

    medusa = sample_monsters["medusa"]
    monsters.append(
        get_creature_latex(
            medusa,
            active_abilities=[
                active_ability(
                    "Petrifying Gaze",
                    f"""
                The medusa makes a +{medusa.accuracy()} vs. Fortitude attack against one creature in Medium range.
                \\hit The target is \\stunned as a \\glossterm<condition>.
                \\crit As above, and as an additional condition, the target takes {medusa.standard_damage() - 1} physical damage during each \\glossterm<action phase> in subsequent rounds.
                If this damage inflicts a \\glossterm<vital wound>, the target is petrified permanently.
            """,
                ),
            ],
        )
    )

    harpy_archer = sample_monsters["harpy_archer"]
    monsters.append(
        get_creature_latex(
            harpy_archer,
        )
    )

    return "\n\n".join(monsters)


def outsiders(sample_monsters):
    monsters = []

    astral_deva = sample_monsters["astral_deva"]
    monsters.append(
        get_creature_latex(
            astral_deva,
            active_abilities=[
                active_ability(
                    "Smite",
                    """
                The angel makes a melee \\glossterm<strike>.
                If its target is evil, it gains a +2 accuracy bonus and a +2d damage bonus on the strike.
            """,
                ),
                active_ability(
                    "Angel's Grace",
                    f"""
                One \\glossterm<ally> within reach regains two \\glossterm<hit points>.
                That creature is unaffected by any additional uses of this ability until the angel finishes a \\glossterm<short rest>.
            """,
                ),
            ],
        )
    )

    arrowhawk = sample_monsters["arrowhawk"]
    monsters.append(
        get_creature_latex(
            arrowhawk,
            active_abilities=[
                active_ability(
                    "Electrobolt",
                    f"""
                The arrowhawk makes a +{arrowhawk.accuracy()} vs. Fortitude attack against one creature or object in Medium range.
                \\hit The target takes {arrowhawk.standard_damage() + 2} electricity damage.
            """,
                ),
            ],
            speed="60 ft. fly (good)",
            behavior="Attack lowest Dexterity",
        )
    )

    bebelith = sample_monsters["bebelith"]
    monsters.append(
        get_creature_latex(
            bebelith,
            active_abilities=[
                active_ability(
                    "Venomous Bite",
                    f"""
                The bebelith makes a bite strike.
                If it hits, and the attack roll beats the target's Fortitude defense, the target is also poisoned as a condition.
                If the target is poisoned, it takes {bebelith.standard_damage()} damage during each \\glossterm<action phase> in subsequent rounds.
            """,
                ),
            ],
        )
    )

    hell_hound = sample_monsters["hell_hound"]
    monsters.append(
        get_creature_latex(
            hell_hound,
            active_abilities=[
                active_ability(
                    "Fire Breath",
                    f"""
                The hell hound makes a +{hell_hound.accuracy()} vs. Armor attack against everything in a Medium cone.
                \\hit Each target takes {hell_hound.standard_damage() + 1} fire damage.
            """,
                ),
            ],
            immunities=["fire damage"],
        )
    )

    flamebrother_salamander = sample_monsters["flamebrother_salamander"]
    monsters.append(
        get_creature_latex(
            flamebrother_salamander,
            active_abilities=[
                active_ability(
                    "Flame Aura",
                    f"""
                The salamander intensifies its natural body heat, creating a burning aura around it.
                During each \\glossterm<action phase>, the salamander makes a +{flamebrother_salamander.accuracy()} vs. Armor
                    attack against everything within a Medium radius emanation of it.
                \\hit Each target takes {flamebrother_salamander.standard_damage()} fire damage.
            """,
                    tags=["Sustain (standard)"],
                    ap_cost=True,
                ),
                active_ability(
                    "Natural Grab",
                    f"""
                The salamander makes a tail slam \\glossterm<strike>.
                In addition to the effects of the strike, it also makes a +{flamebrother_salamander.accuracy('perception')} vs. Fortitude and Reflex attack against the same target.
                \\hit The target is \\glossterm<grappled> by the salamander.
            """,
                ),
            ],
            immunities=["fire damage"],
        )
    )

    janni = sample_monsters["janni"]
    monsters.append(
        get_creature_latex(
            janni,
        )
    )

    salamander_battlemaster = sample_monsters["salamander_battlemaster"]
    monsters.append(
        get_creature_latex(
            salamander_battlemaster,
            active_abilities=[
                active_ability(
                    "Flame Aura",
                    f"""
                The salamander intensifies its natural body heat, creating a burning aura around it.
                During each \\glossterm<action phase>, the salamander makes a +{flamebrother_salamander.accuracy()} vs. Armor
                    attack against everything within a Medium radius emanation of it.
                \\hit Each target takes {flamebrother_salamander.standard_damage()} fire damage.
            """,
                    tags=["Sustain (standard)"],
                    ap_cost=True,
                ),
                active_ability(
                    "Natural Grab",
                    f"""
                The salamander makes a tail slam \\glossterm<strike>.
                In addition to the effects of the strike, it also makes a +{salamander_battlemaster.accuracy('perception')} vs. Fortitude and Reflex attack against the same target.
                \\hit The target is \\glossterm<grappled> by the salamander.
            """,
                ),
            ],
        )
    )

    return "\n\n".join(monsters)


def undead(sample_monsters):
    monsters = []

    allip = sample_monsters["allip"]
    monsters.append(
        get_creature_latex(
            allip,
        )
    )

    spectre = sample_monsters["spectre"]
    monsters.append(
        get_creature_latex(
            spectre,
        )
    )

    dirgewalker = sample_monsters["dirgewalker"]
    monsters.append(
        get_creature_latex(
            dirgewalker,
            active_abilities=[
                active_ability(
                    "Animating Caper",
                    """
                One corpse within Close range is animated as a skeleton under the dirgewalker's control.
            """,
                    tags=["Attune"],
                ),
                active_ability(
                    "Mournful Dirge",
                    f"""
                The dirgewalker makes a +{dirgewalker.accuracy()} vs. Mental attack against all creatures in a Medium radius.
                \\hit Each target is dazed as a condition.
                \\crit Each target is stunned as a condition.
            """,
                ),
            ],
        )
    )

    skeleton = sample_monsters["skeleton"]
    monsters.append(
        get_creature_latex(
            skeleton,
            passive_abilities=[
                passives["hard bones"](skeleton),
            ],
        )
    )

    skeleton_warrior = sample_monsters["skeleton_warrior"]
    monsters.append(
        get_creature_latex(
            skeleton_warrior,
            passive_abilities=[
                passives["hard bones"](skeleton),
            ],
        )
    )

    skeleton_mage = sample_monsters["skeleton_mage"]
    monsters.append(
        get_creature_latex(
            skeleton_mage,
            active_abilities=[
                active_ability(
                    "Drain Life",
                    f"""
                The skeleton mage makes a +{skeleton_mage.accuracy()} vs. Fortitude attack against a creature in \\rngmed range.
                \\hit The target takes {skeleton_mage.standard_damage('magical')} life damage.
                If this damage inflicts a \\glossterm<vital wound>, the skeleton mage regains a \\glossterm<hit point>.
                It can only regain \\glossterm<hit points> in this way up to 3 times between \\glossterm<short rests>.
            """,
                    tags=["Life"],
                ),
                active_ability(
                    "Terror",
                    f"""
                The skeleton mage makes a +{skeleton_mage.accuracy()} vs. Mental attack against a creature in \\rngmed range.
                \\hit The target is \\frightened by you as a \\glossterm<condition>.
                \\crit The target is \\panicked by you as a \\glossterm<condition>.
            """,
                    tags=["Life"],
                ),
            ],
            passive_abilities=[
                passives["hard bones"](skeleton),
            ],
        )
    )

    skeleton_champion = sample_monsters["skeleton_champion"]
    monsters.append(
        get_creature_latex(
            skeleton_champion,
            passive_abilities=[
                passives["hard bones"](skeleton),
            ],
        )
    )

    zombie = sample_monsters["zombie"]
    monsters.append(
        get_creature_latex(
            zombie,
            passive_abilities=[
                passives["slow"](zombie),
                passives["soft flesh"](zombie),
            ],
        )
    )

    zombie_warrior = sample_monsters["zombie_warrior"]
    monsters.append(
        get_creature_latex(
            zombie_warrior,
            passive_abilities=[
                passives["slow"](zombie_warrior),
                passives["soft flesh"](zombie_warrior),
            ],
        )
    )

    zombie_hulking = sample_monsters["zombie_hulking"]
    monsters.append(
        get_creature_latex(
            zombie_hulking,
            passive_abilities=[
                passives["slow"](zombie_hulking),
                passives["soft flesh"](zombie_hulking),
            ],
        )
    )

    zombie_captain = sample_monsters["zombie_captain"]
    monsters.append(
        get_creature_latex(
            zombie_captain,
            passive_abilities=[
                passives["slow"](zombie_captain),
                passives["soft flesh"](zombie_captain),
            ],
        )
    )

    zombie_elite = sample_monsters["zombie_elite"]
    monsters.append(
        get_creature_latex(
            zombie_elite,
            passive_abilities=[
                passives["slow"](zombie_elite),
                passives["soft flesh"](zombie_elite),
            ],
        )
    )

    unliving_mother = sample_monsters["unliving_mother"]
    monsters.append(
        get_creature_latex(
            unliving_mother,
        )
    )

    unliving_queen = sample_monsters["unliving_queen"]
    monsters.append(
        get_creature_latex(
            unliving_queen,
        )
    )

    corrupted_mage = sample_monsters["corrupted_mage"]
    monsters.append(
        get_creature_latex(
            corrupted_mage,
            active_abilities=[
                active_ability(
                    "Cone of Cold",
                    f"""
                The mage makes a {corrupted_mage.accuracy()} vs. Fortitude attack against everything in a \\areasmall cone from it.
                \\hit Each target takes {corrupted_mage.standard_damage('magical')} cold damage.
            """,
                ),
                active_ability(
                    "Frost Bombs",
                    f"""
                The mage creates three orbs of cold energy at locations of its choice within \\rngmed range.
                At the end of the next round's \\glossterm<action phase>,
                the mage makes a {corrupted_mage.accuracy()} vs. Fortitude attack against everything in a \\areatiny radius burst around each orb.
                If a target is in the area of multiple orbs, it is only affected once.
                \\hit Each target takes {corrupted_mage.standard_damage('magical') + 1} cold damage.
            """,
                ),
                active_ability(
                    "Telekinetic Crush",
                    f"""
                The mage makes a {corrupted_mage.accuracy()} vs. Mental attack against one creature or object within \\rngmed range of it.
                \\hit The target takes {corrupted_mage.standard_damage('magical') + 2} bludgeoning damage.
            """,
                ),
            ],
        )
    )

    return "\n\n".join(monsters)


def generate_monsters():
    sample_monsters = get_sample_creatures()["monsters"]
    monsters = f"""
        \\section<Aberrations>\\label<Aberrations>
        {aberrations(sample_monsters)}

        \\section<Animals>\\label<Animals>
        {animals(sample_monsters)}

        \\section<Animates>\\label<Animates>
        {animates(sample_monsters)}

        \\section<Humanoids>\\label<Humanoids>
        {humanoids(sample_monsters)}

        \\section<Magical Beasts>\\label<Magical Beasts>
        {magical_beasts(sample_monsters)}

        \\section<Monstrous Humanoids>\\label<Monstrous Humanoids>
        {monstrous_humanoids(sample_monsters)}

        \\section<Outsiders>\\label<Outsiders>
        {outsiders(sample_monsters)}

        \\section<Undead>\\label<Undead>
        {undead(sample_monsters)}
    """

    return monsters


def sanity_check(monsters):
    pass


# This is an incredibly trivial function, but it matches the style of the
# other files in this directory
def generate_monster_latex():
    return latexify(generate_monsters())


def write_to_file():
    monster_latex = generate_monster_latex()
    with open(book_path("monster_descriptions.tex"), "w") as file:
        file.write(monster_latex)


@click.command()
@click.option("-c", "--check/--no-check", default=False)
@click.option("-o", "--output/--no-output", default=False)
def main(output, check):
    if output:
        write_to_file()
    else:
        print(generate_monster_latex())


if __name__ == "__main__":
    main()
