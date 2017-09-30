#!/usr/bin/env python3

import click
from generation.attack import Attack
from generation.effects import Effects
from generation.header import Header
from generation.spell import Spell
from generation.subspell import Subspell
from generation.targeting import Targeting
from generation.util import latexify
import generation.rise_data as rise_data
from logging import getLogger, WARNING
# from pprint import pformat
logger = getLogger(__name__)
def log(*args):
    logger.log(*args)
def warn(*args):
    logger.log(WARNING, *args)


def generate_spells():
    spells = []
    spells.append(Spell(
        name='Aeromancy',
        short_description="Command air to protect allies and blast foes",
        header=Header('You shield your ally with a barrier of wind, protecting them from harm.'),
        targeting=Targeting(
            target='One willing creature (Medium or smaller)',
            rng='close',
            time='minor action',
        ),
        effects=Effects(
            effect="""
                The target gains a +1 bonus to \\glossterm<physical defenses>.
                This bonus is increased to +5 against ranged \\glossterm<physical attacks> from weapons or projectiles that are Small or smaller.
                Any effect which increases the size of creature this spell can affect also increases the size of ranged weapon it defends against by the same amount.
            """,
            duration='Attunement (shared)',
            tags=['Air', 'Imbuement'],
        ),
        schools=['Transmutation'],
        lists=['Air', 'Nature'],
        cantrip="The spell's casting time becomes a standard action, and its duration becomes Sustain (minor, shared).",
        subspells=[
            Subspell(
                level=2,
                name="Gentle Descent",
                description="""
                    The target gains a 30 foot glide speed.
                    A creature with a glide speed can glide through the air at the indicated speed (see \pcref{Gliding}).
                """,
            ),
            Subspell(
                level=2,
                name="Windstrike",
                targeting=Targeting(
                    target='One creature or object',
                    rng='medium',
                    time='standard action',
                ),
                effects=Effects(
                    attack=Attack.damage('Fortitude', 'bludgeoning'),
                    tags=['Air'],
                ),
            ),
            Subspell(
                level=3,
                name="Gust of Wind",
                targeting=Targeting(
                    area=r'\arealarge line, 10 ft. wide',
                    targets='Everything in the area',
                    time='standard action',
                ),
                effects=Effects(
                    attack=Attack.multi_damage('Fortitude', 'bludgeoning'),
                    tags=['Air'],
                ),
            ),
            Subspell(
                level=3,
                name="Windblade",
                targeting=Targeting(
                    # TODO: unattended or wielded by a willing creature?
                    target='One unattended weapon',
                    rng='close',
                    time='standard action',
                ),
                effects=Effects(
                    effect="""
                        The target weapon gains an additional ten feet of reach, extending the wielder's threatened area.
                        This has no effect on ranged attacks with the weapon.
                    """,
                    duration='Sustain (minor)',
                    tags=['Air', 'Shaping'],
                ),
            ),
            Subspell(
                level=4,
                name='Wind Screen',
                description="The defense bonus against ranged attacks increases to \plus10.",
            ),
            Subspell(
                level=4,
                name='Air Walk',
                description="""
                    The target can walk on air as if it were solid ground.
                    The magic only affects the target's legs and feet.
                    By choosing when to treat the air as solid, it can traverse the air with ease.
                """,
            ),
            Subspell(
                level=5,
                name='Stormlord',
                description=r"""
                    Whenever a creature within \rngclose range of the target attacks it, wind strikes the attacking creature.
                    The wind deals \\glossterm<standard damage> -1d.
                    Any individual creature can only be dealt damage in this way once per round.
                    \par Any effect which increases this spell's range increases the range of this effect by the same amount.""",
                tags=['Shielding'],
                school='Evocation',
            ),
            Subspell(
                level=7,
                name="Control Weather",
                targeting=Targeting(
                    area='2 mile radius cylinder from your location',
                    area_type='zone',
                    time='standard action',
                ),
                effects=Effects(
                    effect="""
                        When you cast this spell, you choose a new weather pattern.
                        You can only choose weather which would be possible in the climate and season of the area you are in.
                        For example, you can normally create a thunderstorm, but not if you are in a desert.

                        The weather begins to take effect in the area when you complete the spell.
                        After five minutes, your chosen weather pattern fully takes effect.

                        You can control the general tendencies of the weather, such as the direction and intensity of the wind.
                        You cannot control specific applications of the weather -- where lightning strikes, for example, or the exact path of a tornado.
                        Contradictory weather conditions are not possible simultaneously.

                        After the spell's duration ends, the weather continues on its natural course, which may cause your chosen weather pattern to end.
                        % TODO: This should be redundant with generic spell mechanics
                        If another ability would magically manipulate the weather in the same area, the most recently used ability takes precedence.
                    """,
                    duration='Attunement',
                    tags=['Air'],
                ),
            ),
        ],
        category='buff, defense',
    ))
    spells.append(Spell(
        name='Barrier',
        short_description="Shield allies from hostile forces",
        header=Header('You create a barrier around your ally that resists physical intrusion.'),
        targeting=Targeting(
            target='One creature',
            rng='close',
            time='minor action',
        ),
        effects=Effects(
            effect="""
                The target gains \\glossterm<damage reduction> equal to your spellpower.
                In addition, it is \\glossterm<vulnerable> to arcane damage.
            """,
            duration='Attunement (shared)',
            tags=['Shielding'],
        ),
        schools=['Abjuration'],
        lists=['Arcane'],
        cantrip="The spell's casting time becomes a standard action, and its duration becomes Sustain (minor, shared).",
        subspells=[
            Subspell(
                level=2,
                name="Repulsion",
                targeting=Targeting(
                    area=r'\areamed radius centered on your location',
                    area_type='zone',
                    time='standard action',
                ),
                effects=Effects(
                    effect="""
                        Whenever a creature makes physical contact with the spell's area for the first time, you make a Spellpower vs. Mental attack against it.
                        Success means the creature is unable to enter the spell's area with any part of its body.
                        The rest of its movement in the current phase is cancelled.
                        Failure means the creature can enter the area unimpeded.
                        Creatures in the area at the time that the spell is cast are unaffected by the spell.
                    """,
                    duration='Sustain (minor)',
                ),
            ),
            Subspell(
                level=4,
                name='Immunity',
                effects=Effects(
                    effect="""
                        Choose a type of damage.
                        The target becomes immune to damage of the chosen type.
                        Attacks that deal damage of multiple types still inflict damage normally unless the target is immune to all types of damage dealt.
                    """,
                ),
            ),
            Subspell(
                level=4,
                name='Retributive',
                description=r"""
                    Damage resisted by this spell is reflected back to the attacker as life damage.
                    If the attacker is beyond \rngclose range of the target, this reflection fails.
                    \par Any effect which increases this spell's range increases the range of this effect by the same amount.
                """,
                tags=['Life'],
                school='Vivimancy',
            ),
            Subspell(
                level=5,
                name='Empowered',
                description=r"""
                    The damage reduction increases by an amount equal to your spellpower.
                """,
            ),
            Subspell(
                level=7,
                name="Antilife Shell",
                targeting=Targeting(
                    area=r'\areamed radius centered on your location',
                    area_type='zone',
                    time='standard action',
                ),
                effects=Effects(
                    effect="""
                        Living creatures are unable to enter the spell's area.
                        Creatures in the area at the time that the spell is cast are unaffected by the spell.
                    """,
                    duration='Sustain (minor)',
                ),
            ),
        ],
        category='buff, defense',
    ))
    spells.append(Spell(
        name='Fabrication',
        short_description="Create objects to damage and impair foes",
        header=Header("You conjure acid from thin air onto a foe's flesh"),
        targeting=Targeting(
            target='One creature or object',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack(
                defense='Fortitude',
                success="""
                    Acid \\glossterm<standard damage> +1d.
                """,
                critical="""
                    As above, but double damage.
                    In addition, the target is \\glossterm<sickened> as a \\glossterm<condition>.
                """,
            ),
            tags=['Acid', 'Manifestation'],
        ),
        schools=['Conjuration'],
        lists=['Arcane'],
        cantrip="The spell deals -2d damage.",
        subspells=[
            Subspell(
                level=3,
                name='Corrosive',
                description='The spell deals double damage to objects.'
            ),
            Subspell(
                level=5,
                name="Meteor",
                targeting=Targeting(
                    rng='long',
                    area='\\areamed radius cylinder, 100 ft\. high',
                    targets='Everything in the area',
                ),
                effects=Effects(
                    effect="""
                        A meteor appears in midair at the top of the area and slams through the area, striking everything in it before disappearing.
                        The meteor is a sphere with the same radius as the area.
                        The distance that the meteor falls does not affect the damage dealt, but it must not share space with any creature or object when it is created.
                        If it does, this ability fails without effect.
                    """,
                    attack=Attack.multi_damage('Reflex', 'bludgeoning and fire'),
                    tags=['Manifestation'],
                ),
            ),
            Subspell(
                level=8,
                name="Meteor Swarm",
                description="""
                    This subspell functions like the \\textit<meteor> subspell, except that you can target up to five different areas within range with separate meteors.
                    The areas affected by two different meteors cannot overlap.
                    If one of the meteors is created in an invalid area, that meteor is not created, but the others are created and dealt their damage normally.
                """,
            ),
            Subspell(
                level=5,
                name='Lingering',
                description="""
                    The spell deals -3d damage.
                    However, the damage deals its damage again at the end of every round after the first.
                    This is a \\glossterm<condition>, and lasts until removed.
                """,
            ),
            Subspell(
                level=2,
                name="Web",
                targeting=Targeting(
                    area='\\areasmall radius',
                    area_type='zone',
                    rng='close',
                    targets='Everything in the area',
                ),
                effects=Effects(
                    effect="""
                        The area becomes filled with webs, making it \\glossterm<difficult terrain>.
                        Each 5-ft.\\ square of webbing has hit points equal to your spellpower, and is \\glossterm<vulnerable> to fire.
                    """,
                    attack=Attack(
                        defense='Reflex',
                        success="The target is \\immobilized as long as it has webbing from this spell in its space."
                    ),
                    duration='Sustain (minor)',
                    tags=['Manifestation'],
                ),
            ),
            Subspell(
                level=4,
                name="Reinforced Webbing",
                description="""
                    This subspell functions like the \\textit<web> subspell, except that each 5-ft.\\ square of webbing gains additional hit points equal to your spellpower.
                    In addition, the webs are no longer \\glossterm<vulnerable> to fire damage.
                """,
            ),
            Subspell(
                level=2,
                name="Poison",
                effects=Effects(
                    effect="""
                        When this spell resolves, and at the end of each \\glossterm<action phase>, you make a Spellpower vs. Fortitude attack against the target.
                        A hit means the target takes poison \\glossterm<standard damage> -3d.
                        If this is the second hit, the target also becomes \\glossterm<sickened>.
                        If this is the third hit, the target becomes \\glossterm<nauseated> instead of sickened.
                    """,
                    duration='Condition',
                    tags=['Manifestation', 'Poison'],
                ),
            ),
        ],
        category='damage',
    ))
    spells.append(Spell(
        name='Antimagic',
        short_description="Suppress and manipulate magical effects",
        targeting=Targeting(
            target='One creature, object, or active magical effect',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack(
                defense='Special',
                special="""
                    The attack result is applied to every \\glossterm<magical> effect on the target.
                    The DR for each effect is equal to 10 + the \\glossterm<power> of that effect.
                """,
                success="""
                    Success against a magical effect causes that effect to be \\glossterm<suppressed>.
                """,
            ),
            duration='Sustain (minor)',
            tags=['Thaumaturgy'],
        ),
        schools=['Abjuration'],
        lists=['Arcane', 'Divine', 'Magic', 'Nature'],
        cantrip="The spell's duration becomes Sustain (standard).",
        subspells=[
            Subspell(
                level=2,
                name='Alter Magic Aura',
                targeting=Targeting(
                    target='One magical object (Large or smaller)',
                    rng='medium',
                ),
                effects=Effects(
                    attack=Attack(
                        defense='Mental',
                        success="""
                            One of the target's magic auras is altered (see \pcref{Spellcraft}).
                            You can change the school and descriptors of the aura.
                            In addition, you can decrease the spellpower of the aura by up to half your spellpower, or increase the spellpower of the aura up to a maximum of your spellpower.
                        """,
                    ),
                    duration='Attunement',
                    tags=['Thaumaturgy'],
                ),
            ),
            Subspell(
                level=2,
                name='Suppress Item',
                targeting=Targeting(
                    target='One object',
                    rng='medium',
                ),
                effects=Effects(
                    attack=Attack(
                        defense='Special',
                        special="""
                            The DR is equal to 10 + the target's spellpower.
                        """,
                        success="""
                            The target object is \\glossterm<suppressed>.
                        """,
                    ),
                    duration='Sustain (minor)',
                    tags=['Thaumaturgy'],
                ),
            ),
            Subspell(
                level=3,
                name='Banishing',
                effects=Effects(
                    attack=Attack(
                        defense='Special',
                        special="""
                            If the target is an effect of an ongoing \\glossterm<magical> ability, such as a summoned monster, the DR is equal to 10 + the target's spellpower.
                            Otherwise, this ability has no effect.
                        """,
                        success="""
                            The target is treated as if the spell that created it was \\glossterm<dismissed>.
                            This usually causes the target to disappear.
                        """,
                    ),
                    tags=['Thaumaturgy'],
                ),
            ),
            Subspell(
                level=7,
                name='Antimagic Field',
                targeting=Targeting(
                    area='\\areasmall radius centered on you',
                    area_type='emanation',
                    special='This emanation always includes you in its area',
                ),
                effects=Effects(
                    effect="""
                        All magical abilities and objects are \glossterm{suppressed} in the area.
                        In addition, magical abilities and objects cannot be activated within the area.
                        \\par Creatures within the area cannot concentrate on or dismiss spells. However, you can concentrate on and dismiss your own \\spell{antimagic field}.
                    """,
                    duration='Sustain (minor)',
                    tags=['Thaumaturgy'],
                ),
            ),
            Subspell(
                level=2,
                name="Dimensional Anchor",
                effects=Effects(
                    attack=Attack(
                        defense='Mental',
                        success="""
                            The target cannot travel extradimensionally.
                            This prevents all \\glossterm<Manifestation>, \\glossterm<Planar>, and \\glossterm<Teleportation> effects.
                        """,
                    ),
                    duration='Condition',
                    tags=['Thaumaturgy'],
                ),
            ),
            Subspell(
                level=5,
                name="Dimensional Lock",
                targeting=Targeting(
                    area='\\arealarge radius',
                    rng='medium',
                    targets='Everything in the area',
                ),
                effects=Effects(
                    effect="""
                        Extradimensional travel into or out of the spell's area is impossible.
                        This prevents all \\glossterm<Manifestation>, \\glossterm<Planar>, and \\glossterm<Teleportation> effects.
                    """,
                    duration='Attunement',
                    tags=['Thaumaturgy'],
                ),
            ),
        ],
        category='debuff, combat',
    ))
    spells.append(Spell(
        name='Pyromancy',
        short_description="Create fire to incinerate foes",
        header=Header('You create a small burst of flame.'),
        targeting=Targeting(
            area='\\areasmall radius',
            area_type='burst',
            rng='close',
            targets='Everything in the area',
        ),
        effects=Effects(
            attack=Attack.multi_damage('Reflex', 'fire'),
            tags=['Fire'],
        ),
        schools=['Evocation'],
        lists=['Arcane', 'Fire', 'Nature'],
        cantrip="The spell affects a single target within range instead of creating a burst.",
        subspells=[
            Subspell(
                level=2,
                name="Burning Hands",
                targeting=Targeting(
                    area='\\arealarge cone',
                    area_type='burst',
                    targets='Everything in the area',
                ),
            ),
            Subspell(
                level=2,
                name="Flame Blade",
                targeting=Targeting(
                    # TODO: unattended or wielded by a willing creature?
                    target='One unattended weapon',
                    rng='close',
                ),
                effects=Effects(
                    effect="""
                        The target weapon gains a +1d bonus to \\glossterm<strike damage>.
                        In addition, all damage dealt with the weapon with strikes becomes fire damage in addition to its normal damage types.
                    """,
                    duration='Sustain (minor)',
                    tags=['Fire'],
                ),
            ),
            Subspell(
                level=3,
                name="Fire Trap",
                targeting=Targeting(
                    target='One openable object (Large or smaller)',
                    rng='close',
                ),
                effects=Effects(
                    effect="""
                        If a creature opens the target object, it explodes.
                        You make an attack against everything within an \\areamed radius burst centered on the target.
                        After the object explodes in this way, the spell ends.
                    """,
                    attack=Attack.multi_damage('Reflex', 'fire'),
                    duration='Attunement',
                    tags=['Fire', 'Trap'],
                ),
            ),
        ],
        category='damage',
    ))
    spells.append(Spell(
        name="Aquamancy",
        short_description="Command water to crush and drown foes",
        header=Header("You create a wave of water to crush your foes."),
        targeting=Targeting(
            area='\\arealarge line, 10 ft\. wide',
            area_type='burst',
            targets='Everything in the area',
        ),
        effects=Effects(
            attack=Attack.multi_damage('Fortitude', 'bludgeoning'),
            tags=['Manifestation', 'Water'],
        ),
        schools=['Conjuration'],
        lists=['Nature', 'Water'],
        cantrip="The spell's area becomes a 5 ft.\ wide, \\areamed line.",
        subspells=[
            Subspell(
                level=2,
                name="Create Water",
                targeting=Targeting(
                    rng='close',
                ),
                effects=Effects(
                    effect="""
                        You create up to one gallon of wholesome, drinkable water.
                        The water can be created at multiple locations within the ritual's range, allowing you to fill multiple small water containers.
                    """,
                    tags=['Manifestation', 'Water'],
                ),
            ),
            Subspell(
                level=2,
                name="Aqueuous Sphere",
                targeting=Targeting(
                    area='\\areasmall radius',
                    area_type='burst',
                    rng='close',
                    targets='Everything in the area',
                ),
            ),
            Subspell(
                level=3,
                name="Aqueous Blade",
                targeting=Targeting(
                    # TODO: unattended or wielded by a willing creature?
                    target='One unattended weapon',
                    rng='close',
                ),
                effects=Effects(
                    effect="""
                        \glossterm<Strikes> with the affected weapon are made against Reflex defense instead of Armor defense.
                        However, attacks with the weapon take a -2d penalty to \\glossterm<strike damage>.
                    """,
                    duration='Sustain (minor)',
                    tags=['Shaping', 'Water'],
                ),
            ),
            Subspell(
                level=4,
                name="Sustained",
                description="""
                    The area affected by this spell becomes completely filled with water.
                    You can sustain the water as a \\glossterm<minor action>.
                    Creatures in this \\glossterm<zone> suffer penalties appropriate for fighting underwater, and may be unable to breathe.
                """,
            ),
            Subspell(
                level=8,
                name="Greater Aqueous Blade",
                targeting=Targeting(
                    # TODO: unattended or wielded by a willing creature?
                    target='One unattended weapon',
                    rng='close',
                ),
                effects=Effects(
                    effect="""
                        \glossterm<Strikes> with the affected weapon are made against Reflex defense instead of Armor defense.
                    """,
                    duration='Sustain (minor)',
                    tags=['Shaping', 'Water'],
                ),
            ),
        ],
        category='damage',
    ))
    spells.append(Spell(
        name="Emotion",
        short_description="Instill false emotions to influence creatures",
        header=Header("You terrify your foe."),
        targeting=Targeting(
            target='One creature',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack(
                defense='Mental',
                success="The target is \\frightened by you.",
                critical="The target is \\panicked by you.",
                failure="The target is \\shaken by you.",
            ),
            duration='Condition',
            tags=['Delusion', 'Mind'],
        ),
        schools=['Enchantment'],
        lists=['Arcane'],
        cantrip="""
            You take a -2 penalty to accuracy with the spell.
        """,
        subspells=[
            Subspell(
                level=2,
                name="Redirected",
                description="""
                    The target is afraid of a willing ally within the spell's range instead of being afraid of you.
                """,
            ),
            # Math: at 1st level, spellpower is probably ~2, so standard damage is probably 2d6.
            # Casting this spell and then two standard damage spells deals 4d6+2d8 = 23 damage
            # casting three standard damage spells deals 6d6 = 21 damage
            # So when fighting alone, this takes 3 rounds of effectiveness to be equal
            # in power to a simple damage spell.

            # At 20th level, spellpower is ~22, so standard damage is 9d10
            # Casting this spell and then two standard damage spells deals 18d10+7d10=25d10
            # Casting three standard damage spells deals 27d10
            Subspell(
                level=2,
                name="Agony",
                effects=Effects(
                    attack=Attack(
                        defense='Mental',
                        success="At the end of each \\glossterm<delayed action phase>, if the target took damage that round, it takes mental \\glossterm<standard damage> -2d.",
                        critical="As above, but double damage.",
                    ),
                    duration='Condition',
                    tags=['Delusion', 'Mind'],
                ),
            ),
            Subspell(
                level=3,
                name="Charm",
                effects=Effects(
                    attack=Attack(
                        defense='Mental',
                        special="If the target thinks that you or your allies are threatening it, you take a -5 penalty to accuracy on the attack.",
                        success="""
                            The target is \\charmed by you.
                            Any act by you or your apparent allies that threatens or damages the \\spell<charmed> person breaks the effect.
                        """,
                        critical="As above, but this ability's duration becomes Attunement instead of Sustain (swift).",
                    ),
                    duration='Attunement',
                    tags=['Delusion', 'Mind', 'Subtle'],
                ),
            ),
            Subspell(
                level=7,
                name="Amnesiac Charm",
                description="""
                    This subspell functions like the \\textit<charm> subspell, except that when the spell ends, the target forgets all events that transpired during the spell's duration.
                    It becomes aware of its surroundings as if waking up from a daydream.
                    The target is not directly aware of any magical influence on its mind, though unusually paranoid or perceptive creatures may deduce that their minds were affected.
                """,
            ),
        ],
        category='debuff, combat',
    ))
    spells.append(Spell(
        name="Compel",
        short_description="Bend creatures to your will by controlling their actions",
        header=Header("Compel a foe to freeze in place."),
        targeting=Targeting(
            target='One creature',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack(
                defense='Mental',
                success="The target is \\immobilized.",
                critical="""
                    The target is \\immobilized twice by two separate conditions.
                    Each condition must be removed independently.
                """,
            ),
            tags=['Compulsion', 'Mind'],
            duration='Condition',
        ),
        schools=['Enchantment'],
        lists=['Arcane', 'Divine'],
        cantrip="""
            You take a -2 penalty to accuracy with the spell.
        """,
        subspells=[
            Subspell(
                level=4,
                name="Sleep",
                effects=Effects(
                    attack=Attack(
                        defense='Mental',
                        success="The target is \\blinded.",
                        critical="""
                            The target falls asleep.
                            It cannot be awakened by any means while the spell lasts.
                            After that time, it can wake up normally, though it continues to sleep until it would wake up naturally.
                        """,
                        special="This ability's effect can be removed by effects which remove \\glossterm<conditions>.",
                    ),
                    tags=['Compulsion', 'Mind'],
                    duration='Sustain (minor)',
                ),
            ),
            Subspell(
                level=2,
                name="Confusion",
                effects=Effects(
                    attack=Attack(
                        defense='Mental',
                        success="The target is \\disoriented.",
                        critical="The target is \\confused.",
                    ),
                    tags=['Compulsion', 'Mind'],
                    duration='Condition',
                ),
            ),
            Subspell(
                level=3,
                name="Dance",
                effects=Effects(
                    attack=Attack(
                        defense='Mental',
                        success="""
                            The target is compelled to dance.
                            It can spend a \\glossterm<minor action> or standard action to dance, if it is physically capable of dancing.
                            Whenever it takes a minor action or standard action in a round where it has not danced, it takes mental \\glossterm<standard damage> +1d.

                            Regardless of whether the target dances, it takes a -2 penalty to \\glossterm<physical defenses> due to its limited control over its limbs.
                        """,
                        critical="""
                            As above, except that dancing as a minor action does not prevent the target from taking damage.
                            Only dancing as a standard action can prevent the target from taking damage.
                        """,
                    ),
                    tags=['Compulsion', 'Mind'],
                    duration='Condition',
                ),
            ),
            Subspell(
                level=9,
                name="Irresistible Dance",
                description="""
                    This subspell functions like the \\textit<dance> subspell, except that you gain a +4 bonus to accuracy on the attack.
                """,
            ),
            Subspell(
                level=5,
                name="Dominate",
                effects=Effects(
                    attack=Attack(
                        defense='Mental',
                        success='The target is \\glossterm<confused>.',
                        critical="""
                            The target is \\glossterm<dominated> by you.
                            If the target was already dominated by you, this ability's duration becomes Attunement instead of Sustain (minor).
                        """,
                    ),
                    duration='Sustain (minor)',
                    tags=['Compulsion', 'Mind'],
                ),
            ),
        ],
        category='debuff, combat',
    ))
    spells.append(Spell(
        name='Bless',
        short_description="Grant divine blessings to improve combat prowess",
        header=Header('You invoke a divine blessing to aid your ally.'),
        targeting=Targeting(
            target='One creature',
            rng='close',
            time='minor action',
        ),
        effects=Effects(
            effect='The target gains \\glossterm<temporary hit points> equal to twice your spellpower.',
            duration='Attunement (shared)',
        ),
        cantrip="The spell's casting time becomes a standard action, and its duration becomes Sustain (minor, shared).",
        schools=['Channeling'],
        lists=['Divine'],
        subspells=[
            Subspell(
                level=4,
                name="Battle Blessing",
                description="""
                    The target gains a +1d bonus to damage with all attacks that deal damage measured in dice.
                """,
            ),
            Subspell(
                level=6,
                name="Protection",
                description="""
                    The target gains \\glossterm<damage reduction> equal to your spellpower against all damage.
                """,
            ),
        ],
        category='buff, offense',
    ))
    spells.append(Spell(
        name="Smite",
        short_description="Smite foes with divine power",
        header=Header("You smite a foe with holy (or unholy) power."),
        targeting=Targeting(
            target='One creature',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack.damage('Mental', 'divine')
        ),
        schools=['Channeling'],
        lists=['Divine'],
        cantrip="The spell deals -2d damage.",
        subspells=[
            Subspell(
                level=2,
                name="Word of Faith",
                targeting=Targeting(
                    area='\\areamed radius from your location',
                    area_type='burst',
                    targets='Creatures in the area that do not worship your deity',
                ),
                effects=Effects(
                    attack=Attack.multi_damage('Mental', 'divine')
                ),
            ),
        ],
        category='damage',
    ))
    spells.append(Spell(
        name='Cryomancy',
        short_description='Drain heat to injure and freeze foes',
        header=Header('You drain the heat from an area, creating a field of extreme cold.'),
        targeting=Targeting(
            area='\\areamed cone',
            area_type='burst',
            targets='Everything in the area',
        ),
        effects=Effects(
            attack=Attack(
                defense='Fortitude',
                success="""
                    Cold \\glossterm<standard damage> \minus1d.
                    In addition, the target is \\fatigued as a condition.
                """,
                critical='As above, but double damage.',
            ),
            tags=['Cold'],
        ),
        schools=['Evocation'],
        lists=['Arcane', 'Nature'],
        cantrip="The spell deals no damage.",
        subspells=[
            Subspell(
                level=4,
                name="Freezing",
                description="""
                    If the attack hits against a target, it is also \\glossterm<immobilized> as a \\glossterm<condition>.
                """,
            ),
            Subspell(
                level=2,
                name="Slick",
                description="""
                    The spell's area is covered with a film of slick ice.
                    Creatures moving across the area must make Acrobatics checks to balance (see \pcref{Balance}).
                    This ice lasts as long as you \\glossterm<sustain> it as a \\glossterm<minor action>.
                """,
            ),
        ],
        category='damage',
    ))
    spells.append(Spell(
        name="Electromancy",
        short_description='Create electricity to injure and stun foes',
        header=Header("You create a bolt of electricity that fries your foes."),
        targeting=Targeting(
            area='\\arealarge line, 10 ft\\. wide',
            area_type='burst',
            targets='Everything in the area',
        ),
        effects=Effects(
            attack=Attack(
                special="You gain a +2 bonus to accuracy against creatures wearing metal armor or otherwise carrying a significant amount of metal.",
                defense='Reflex',
                success="""
                    Electricity \\glossterm<standard damage> -1d.
                """,
                critical='As above, but double damage.',
            ),
            tags=['Electricity'],
        ),
        schools=['Evocation'],
        lists=['Arcane', 'Nature'],
        cantrip="The spell's area becomes a 5 ft\\. wide \\areamed line.",
        subspells=[
            Subspell(
                level=3,
                name="Forked Lightning",
                description="""
                    You create two separate areas instead of one.
                    The two areas can overlap, but targets in the overlapping area are only affected once.
                """,
            ),
            Subspell(
                level=5,
                name="Shocking",
                description="""
                    If the attack hits, the target is \\glossterm<dazed> as a \\glossterm<condition>.
                    On a \\glossterm<critical hit>, the target is \\glossterm<stunned> instead of dazed.
                """,
            ),
            Subspell(
                level=4,
                name="Instantaneous",
                description="""
                    The lightning bolt created by the spell is faster, but less penetrating.
                    The spell's attack is made against Fortitude defense instead of Reflex defense.
                """,
            ),
        ],
        category='damage',
    ))
    spells.append(Spell(
        name="Corruption",
        short_description="Weaken the life force of foes, reducing their combat prowess",
        header=Header("You corrupt your foe's life force, weakening it."),
        targeting=Targeting(
            target='One living creature',
            rng='close',
        ),
        effects=Effects(
            attack=Attack(
                defense='Fortitude',
                success="""
                    The target is \\glossterm<sickened>.
                    In addition, it takes life \\glossterm<standard damage> -3d whenever it takes a \\glossterm<standard action>.
                """,
                critical="""
                    The target is \\glossterm<nauseated>.
                    In addition, it takes life \\glossterm<standard damage> whenever it takes a \\glossterm<standard action>.
                """,
            ),
            duration='Condition',
            tags=['Life'],
        ),
        schools=['Vivimancy'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="""
            You take a -2 penalty to accuracy with the spell.
        """,
        subspells=[
            Subspell(
                level=3,
                name="Eyebite",
                description="""
                    If the spell's attack hits, the target is also \\dazzled. If it critically hits, the target is \\blinded instead of dazzled.
                """,
            ),
            Subspell(
                level=4,
                name="Finger of Death",
                description="""
                    If the spell's attack critically hits, the target immediately dies.
                """,
                tags=['Death'],
            ),
            Subspell(
                level=3,
                name="Corruption of Blood and Bone",
                description="""
                    Whenever the target takes damage from this spell, its maximum hit points are reduced by the same amount.
                    When the spell ends, the target's maximum hit points are restored.
                """,
            ),
            Subspell(
                level=5,
                name="Cripple",
                description="""
                    If the attack hits, the target is also \\glossterm<immobilized> as part of the same condition.
                    On a \\glossterm<critical hit>, the target is \\glossterm<paralyzed> instead of immobilized.
                """,
            ),
            Subspell(
                level=6,
                name="Corrupting Curse",
                description="""
                    The spell's attack is made against Mental defense instead of Fortitude defense.
                    In addition, if it critically hits, the spell's effect becomes a permanent curse.
                    It is no longer a condition, and cannot be removed by abilities that remove conditions.
                    This is a \\glossterm<Curse> effect.
                """,
            ),
        ],
        category='debuff, combat',
    ))
    spells.append(Spell(
        name="Vital Surge",
        short_description="Alter life energy to cure or inflict wounds",
        # header=Header("description"),
        targeting=Targeting(
            target='One creature',
            rng='medium',
        ),
        effects=Effects(
            special="""
                When you cast this spell, you choose whether the target is healed or takes damage.
            """,
            attack=Attack(
                defense='Fortitude',
                success="The target heals hit points or takes life damage equal to \\glossterm<standard damage> +1d.",
                critical="As above, except that if you chose damage, the spell deals double damage.",
            ),
            tags=['Life'],
        ),
        schools=['Vivimancy'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="You cannot choose for the spell to heal the target, and the spell deals -2d damage.",
        subspells=[
            Subspell(
                level=2,
                name="Undead Bane",
                description="""
                    If the target is undead, the spell gains a +2 bonus to accuracy.
                """,
            ),
            Subspell(
                level=2,
                name="Cure Wounds",
                description="""
                    You cannot choose for the spell to deal damage.
                    In addition, for every 10 points of healing you provide, you can also heal one point of \\glossterm<vital damage>.
                """,
            ),
            Subspell(
                level=3,
                name="Cure Serious Wounds",
                description="""
                    This subspell functions like the \\textit<cure wounds> subspell, except that it heals one point of vital damage for every 5 points of healing instead of for every 10.
                """,
            ),
            Subspell(
                level=4,
                name="Cure Critical Wounds",
                description="""
                    This subspell functions like the \\textit<cure wounds> subspell, except that it heals one point of vital damage for every 2 points of healing instead of for every 10.
                """,
            ),
            Subspell(
                level=3,
                name="Drain Life",
                description="""
                    You gain temporary hit points equal to half the damage you deal with this spell.
                """,
            ),
            Subspell(
                level=4,
                name="Death Knell",
                description="""
                    If the attack hits, the target suffers a death knell.
                    At the end of each round, if the target has 0 hit points, it immediately dies.
                    This effect lasts until the target removes this condition.
                """,
                tags=['Death'],
            ),
            Subspell(
                level=3,
                name="Circle of Death",
                targeting=Targeting(
                    area='\\areamed radius from you',
                    area_type='emanation',
                    targets='Enemies in the area',
                ),
                effects=Effects(
                    effect="""
                        When this spell resolves, and the end of each \\glossterm<action phase>, you make an attack against all targets to deal damage.
                    """,
                    attack=Attack(
                        defense='Mental',
                        success="""
                            The target takes life \\glossterm<standard damage> -3d.
                        """,
                    ),
                    duration='Sustain (minor)',
                    tags=['Life'],
                ),
            ),
            Subspell(
                level=4,
                name="Circle of Healing",
                targeting=Targeting(
                    area='\\areamed radius from you',
                    area_type='emanation',
                    targets='Allies in the area',
                ),
                effects=Effects(
                    effect="""
                        When this spell resolves, and the end of each \\glossterm<action phase>, you make an attack against all targets to heal them.
                    """,
                    attack=Attack(
                        defense='Mental',
                        success="""
                            The target heals hit points equal to \\glossterm<standard damage> -3d.
                        """,
                    ),
                    duration='Sustain (minor)',
                    tags=['Life'],
                ),
            ),
            Subspell(
                level=3,
                name="Remove Disease",
                effects=Effects(
                    effect="""
                        All diseases affecting the target are removed.
                    """,
                    tags=['Flesh'],
                ),
            ),
            Subspell(
                level=2,
                name="Restore Senses",
                effects=Effects(
                    effect="""
                        One of the target's physical senses, such as sight or hearing, is restored to full capacity.
                        This can heal both magical and mundane conditions, but it cannot completely replace missing body parts required for a sense to function (such as missing eyes).
                    """,
                    tags=['Flesh'],
                ),
            ),
        ],
        category='damage',
    ))
    spells.append(Spell(
        name="Protection from Alignment",
        short_description="Protect allies from aligned foes",
        # header=Header("description"),
        targeting=Targeting(
            target='One creature',
            rng='close',
            time='minor action',
        ),
        effects=Effects(
            special="""
                Choose an alignment other than neutral (chaotic, good, evil, or lawful).
                This spell gains the tag for that alignment's \\glossterm<opposed alignment>.
            """,
            effect="""
                The target gains damage reduction equal to your spellpower against physical effects that have the chosen alignment, and physical attacks made by creatures with the chosen alignment.
            """,
            duration='Attunement (shared)',
            tags=['Shielding'],
        ),
        schools=['Abjuration'],
        lists=['Arcane', 'Chaos', 'Divine', 'Evil', 'Good', 'Law'],
        cantrip="The spell's casting time becomes a standard action, and its duration becomes Sustain (minor, shared).",
        subspells=[
            Subspell(
                level=3,
                name="Complete",
                description="""
                    The damage reduction also applies against non-physical effects.
                """,
            ),
            Subspell(
                level=4,
                name="Retributive",
                description="""
                    Whenever a creature with the chosen alignment makes a physical melee attack against the target, you make a Spellpower vs. Mental attack against the attacking creature.
                    Success means the attacker takes divine \\glossterm<standard damage> -1d.
                """,
            ),
        ],
        category='buff, defense',
    ))
    spells.append(Spell(
        name="Summon Monster",
        short_description="Summon creatures to fight with you",
        header=Header("You summon a creature to fight by your side."),
        targeting=Targeting(
            target="One unoccupied square",
            rng="medium",
        ),
        effects=Effects(
            effect="""
                A creature appears in the target location.
                It visually appears to be a common Small or Medium animal of your choice, though in reality it is a manifestation of magical energy.
                Regardless of the appearance and size chosen, the creature has hit points equal to twice your spellpower.
                All of its defenses are equal to your 5 \\add your spellpower, and its land speed is equal to 30 feet.

                Each round, you choose the creature's actions.
                There are only two actions it can take.
                As a move action, it can move as you direct.
                As a standard action, it can make a melee \glossterm{strike} against a creature it threatens.
                Its accuracy is equal to your spellpower.
                If it hits, it deals \\glossterm<standard damage> -2d.
                The type of damage dealt by this attack depends on the creature's appearance.
                Most animals bite or claw their foes, which deals bludgeoning and slashing damage.
            """,
            duration="Sustain (minor)",
            tags=["Manifestation"],
        ),
        schools=['Conjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="The spell's duration becomes Sustain (standard).",
        subspells=[
            Subspell(
                level=2,
                name="Summon Bear",
                description="""
                    The creature appears to be a Medium bear.
                    As a standard action, it can make a \\glossterm<grapple> attack against a creature it threatens.
                    Its accuracy is the same as its accuracy with \\glossterm<physical attacks>.
                    While grappling, the manifested creature can either make a strike or attempt to escape the grapple.

                    This augment replaces the effects of any other augments that change the appearance of the creature.
                """,
            ),
        ],
        # What category does this belong to?
        category='buff, offense',
    ))
    spells.append(Spell(
        name="Scry",
        short_description="See and hear at great distances",
        header=Header("You create a scrying sensor that allows you to see at a distance."),
        targeting=Targeting(
            target='One square',
            rng='medium',
        ),
        effects=Effects(
            effect="""
                A Fine object appears floating in the air in the target space.
                It resembles a human eye in size and shape, though it is \\glossterm<invisible>.
                At the start of each round, you choose whether you see from this sensor or from your body.
                The sensor's visual acuity is the same as your own, except that it does not share the benefits of any \\glossterm<magical> effects that improve your vision.
                You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

                If undisturbed, the sensor floats in the air in its position.
                As a standard action, you can concentrate to move the sensor up to 30 feet in any direction, even vertically.

                You can only have one casting of this spell active at once.
                If you cast it again, any previous castings of the spell are dismissed.
            """,
            duration='Attunement',
            tags=['Scrying'],
        ),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="The sensor cannot be moved after it is originally created, and the spell's duration becomes Sustain (minor).",
        subspells=[
            Subspell(
                level=2,
                name="Alarm",
                description="""
                    The sensor continues to observe its surroundings while you are not sensing through it.
                    If it sees a creature or object of Tiny size or larger moving within 50 feet of it, it will trigger a mental "ping" that only you can notice.
                    You must be within 1 mile of the sensor to receive this mental alarm.
                    This mental sensation is strong enough to wake you from normal sleep, but does not otherwise disturb concentration.
                """,
            ),
            Subspell(
                level=2,
                name="Auditory",
                description="""
                    At the start of each round, you can choose whether you hear from the sensor or from your body.
                    This choice is made independently from your sight.
                    The sensor's auditory acuity is the same as your own, except that it does not share the benefits of any \\glossterm<magical> effects that improve your hearing.
                """,
            ),
            Subspell(
                level=3,
                name="Accelerated",
                description="""
                    When you move the sensor, you can move it up to 100 feet, instead of up to 30 feet.
                """,
            ),
            Subspell(
                level=3,
                name="Dual",
                description="""
                    You create an additional sensor in the same location.
                    You must move and see through each sensor individually.
                """,
            ),
            Subspell(
                level=3,
                name="Penetrating",
                description="""
                    The spell's range becomes \\rngunrestricted, allowing you to cast it into areas where you do not have \\glossterm<line of sight> or \\glossterm<line of effect>.
                """,
            ),
            Subspell(
                level=4,
                name="Semi-Autonomous",
                description="""
                    You can move the sensor as a \\glossterm<minor action> rather than as a standard action.
                """,
            ),
            Subspell(
                level=5,
                name="Scry Creature",
                targeting=Targeting(
                    target="One creature",
                    rng="Same plane",
                    unrestricted_range=True,
                    special="""
                        You must specify your target with a precise mental image of its appearance.
                        The image does not have to be perfect, but it must unambiguously identify the target.
                        If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the spell may simply fail.
                    """,
                ),
                description="""
                    You must make a Spellpower vs. Mental attack against the target.
                    Success means the sensor appears in the target's space.
                    Failure means the sensor does not appear at all.
                """,
            ),
            Subspell(
                level=6,
                name="Split Senses",
                description="""
                    You do not have to choose whether to sense from the perspective of the sensor or from the perspective of your own body.
                    You constantly receive sensory input from both your body and the sensor.
                """,
            ),
            Subspell(
                level=4,
                name="Reverse Scrying",
                targeting=Targeting(
                    target='One magical sensor',
                    rng='medium',
                ),
                description="""
                    % TODO: wording
                    The sensor created by this spell appears at the location of the source of the ability that created the target sensor.
                """,
            ),
        ],
        category='narrative',
    ))
    spells.append(Spell(
        name="Revelation",
        short_description="Share visions of the present and future, granting insight or combat prowess",
        header=Header("You grant a creature the ability to see fractions of a second into the future."),
        targeting=Targeting(
            target="One willing creature",
            rng="close",
            time='minor action',
        ),
        effects=Effects(
            effect="""
                The target gains a \plus1 bonus to \\glossterm<accuracy> with all attacks.
            """,
            tags=['Enhancement'],
            duration='Attunement (shared)',
        ),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="The spell's casting time becomes a standard action, and its duration becomes Sustain (minor, shared).",
        subspells=[
            Subspell(
                level=2,
                name="Discern Lies",
                targeting=Targeting(
                    area='\\areamed radius from you',
                    area_type='emanation',
                    targets='All creatures in the area',
                ),
                effects=Effects(
                    effect="""
                        You know when the target deliberately and knowingly speaks a lie.
                        This ability does not reveal the truth, uncover unintentional inaccuracies, or necessarily reveal evasions.
                    """,
                    tags='Detection',
                    duration='Attunement',
                ),
            ),
            Subspell(
                level=3,
                name="Boon of Mastery",
                description="""
                    The target also gains a +2 bonus to all skills.
                """,
            ),
            Subspell(
                level=7,
                name="Greater Boon of Mastery",
                description="""
                    This subspell functions like the \\textit<boon of mastery> subspell, except that the skill bonus is increased to +5.
                """,
            ),
            Subspell(
                level=4,
                name="Boon of Knowledge",
                description="""
                    The target also gains a +5 bonus to all Knowledge skills (see \\pcref<Knowledge>).
                """,
            ),
            Subspell(
                level=3,
                name="Augury",
                targeting=Targeting(
                    target="One willing creature",
                    rng="close",
                    time='standard action',
                ),
                effects=Effects(
                    effect="""
                        Choose an action that the target could take.
                        You learn whether the stated action is likely to bring good or bad results for it within the next hour.
                        This spell provides one of four results:
                        \\begin<itemize>
                            \\item Weal (if the action will probably bring good results).
                            \\item Woe (for bad results).
                            \\item Weal and woe (for both).
                            \\item No response (for actions that don't have especially good or bad results).
                        \\end<itemize>

                        This spell does not describe the future with certainty.
                        It describes which result is most probable.
                        The more unambiguous the action's effects, the more likely the spell is to be correct.

                        % TODO: inconsistent wording; this spell vs. this subspell
                        After using this subspell, you cannot cast it again until the hour affected by the previous casting is over, regardless of whether the action was taken.
                    """,
                ),
            ),
            Subspell(
                level=5,
                name="Third Eye",
                description="""
                    The target also gains \\glossterm<blindsight> out to a 100 foot range, allowing it to see perfectly without any light, regardless of concealment or invisibility.
                """,
            ),
            Subspell(
                level=7,
                name="Foresee Actions",
                description="""
                    The target can learn what actions all creatures it can observe intend to take during each phase before it decides its actions for that phase.
                    It learns this information in the instant before it acts, and normally does not have time to communicate it to other creatures.
                """,
            ),
        ],
        category='buff, offense',
    ))
    spells.append(Spell(
        name="Telekinesis",
        short_description="Manipulate creatures and objects at a distance",
        # header=Header("description"),
        targeting=Targeting(
            target="One Medium or smaller creature or object",
            rng="close",
        ),
        effects=Effects(
            attack=Attack(
                defense='Mental',
                success="""
                    You move the target up five feet per spellpower. Moving the target upwards costs twice the normal movement cost.
                """,
                critical="""
                    As above, but you move the target ten feet per spellpower instead of five feet per spellpower.
                """,
            ),
            tags=['Telekinesis'],
        ),
        schools=['Evocation'],
        lists=['Arcane'],
        cantrip="You take a -2 penalty to accuracy with the spell.",
        subspells=[
            Subspell(
                level=2,
                name="Precise",
                effects=Effects(
                    attack=Attack(
                        defense='Mental',
                        success="""
                            You move the target up to five feet in any direction.
                            In addition, you can make a check to manipulate the target as if you were using your hands.
                            The check's result has a maximum equal to your attack result.
                        """,
                    ),
                    tags=['Telekinesis'],
                ),
            ),
            Subspell(
                level=3,
                name="Binding",
                description="""
                    If your attack roll beat both the target's Fortitude and Mental defenses, it is \\immobilized after the forced movement is finished.
                    This is a \\glossterm<condition>, and lasts until removed.
                """,
            ),
            Subspell(
                level=3,
                name="Levitate",
                targeting=Targeting(
                    target="One unattended object or willing creature (Medium or smaller)",
                    rng="close",
                ),
                effects=Effects(
                    effect="""
                        The target floats in midair, unaffected by gravity.
                        During the movement phase, you can move the target up to ten feet in any direction.
                    """,
                    duration="Sustain (minor)",
                ),
            ),
            Subspell(
                level=2,
                name="Mending",
                targeting=Targeting(
                    # TODO: unattended or attended by a willing creature
                    target="One unattended object",
                    rng="close",
                ),
                effects=Effects(
                    effect="""
                        The target is healed for hit points equal to \\glossterm<standard damage> +1d.
                    """,
                ),
            ),
        ],
        category='debuff, combat',
    ))
    spells.append(Spell(
        name="Distort Image",
        short_description="Change how creatures and objects appear",
        # header=Header("description"),
        targeting=Targeting(
            target='One willing creature',
            rng='medium',
            time='minor action',
        ),
        effects=Effects(
            effect="""
                The target's physical outline is distorted so it appears blurred, shifting, and wavering.
                It gains a +1 bonus to \\glossterm<physical defenses> and Stealth (see \\pcref<Stealth>).
                This bonus is increases to +2 while in \\glossterm<shadowy illumination>.
                This effect provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.
            """,
            duration='Attunement (shared)',
            tags=['Glamer', 'Visual'],
        ),
        schools=['Illusion'],
        lists=['Arcane'],
        cantrip="The spell's casting time becomes a standard action, and its duration becomes Sustain (minor, shared).",
        subspells=[
            Subspell(
                level=2,
                name="Distort Light",
                targeting=Targeting(
                    target='One object (Small or smaller)',
                    rng='close',
                    area='\\areamed radius from the target',
                    area_type='emanation',
                    time='standard action',
                ),
                effects=Effects(
                    effect="""
                        Light within or passing through the area is dimmed to be no brighter than shadowy illumination.
                        Any effect or object which blocks light also blocks this spell's emanation.
                    """,
                    duration='Attunement (multiple)',
                    tags=['Glamer', 'Light'],
                ),
            ),
            Subspell(
                level=3,
                name="Disguise Image",
                effects=Effects(
                    effect="""
                        You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
                        You gain a +5 bonus on the check, and you can freely alter the appearance of the target's clothes and equipment, regardless of their original form.
                        However, this effect is unable to alter the sound, smell, texture, or temperature of the target or its clothes and equipment.
                    """,
                    duration='Attunement (shared)',
                    tags=['Glamer', 'Visual'],
                ),
            ),
            Subspell(
                level=2,
                name="Mirror Image",
                effects=Effects(
                    effect="""
                        Four illusory duplicates appear around the target that mirror its every move.
                        The duplicates shift chaotically in its space, making it difficult to identify the real creature.

                        All targeted attacks against the target have a 50\\% miss chance.
                        Whenever an attack misses in this way, it affects an image, destroying it.
                        This ability provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.
                    """,
                    duration='Attunement (shared)',
                    tags=['Figment', 'Visual'],
                ),
            ),
            Subspell(
                level=5,
                name="Greater Mirror Image",
                description="""
                    This subspell functions like the \\textit<mirror image> subspell, except that you regain a destroyed mirror image at the end of every round, to a maximum of four images.
                """,
            ),
            Subspell(
                level=3,
                name="Shadow Mantle",
                description="""
                    The spell's deceptive nature extends beyond merely altering light to affect the nature of reality itself.
                    The defense bonus applies to all defenses, not just physical defenses.
                    In addition, the spell loses the \\glossterm<Visual> tag, and can protect against attacks from creatures immune to Visual abilities.
                """,
            ),
            Subspell(
                level=7,
                name="Displacement",
                description="""
                    The target's image is futher distorted, and appears to be two to three feet from its real location.
                    Targeted \\glossterm<physical attacks> against the target suffer a 50\\% miss chance.
                """,
            ),
        ],
        category='buff, defense',
    ))

    spells.append(Spell(
        name="Flare",
        short_description="Create bright light to blind foes and illuminate",
        # header=Header("description"),
        targeting=Targeting(
            area='\\areasmall radius',
            targets='All creatures in the area',
            rng='medium',
        ),
        effects=Effects(
            effect="""
                A brilliant light appears in the area until the end of the round.
                It illuminates a 100 foot radius around the area with bright light.
            """,
            attack=Attack(
                defense='Reflex',
                success="""
                    The target is \\dazzled.
                """,
                critical="""
                    The target is \\blinded.
                """,
            ),
            duration='Condition',
            tags=['Figment', 'Light', 'Visual'],
        ),
        schools=['Illusion'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="The spell affects a single target within range instead of creating a burst.",
        subspells=[
            Subspell(
                level=3,
                name="Kaleidoscopic",
                effects=Effects(
                    effect="""
                        A brilliant, rapidly shifting rainbow of lights appear in the area until the end of the round.
                        They illuminate a 100 foot radius around the area with bright light.
                    """,
                    attack=Attack(
                        defense='Mental',
                        success="""
                            The target is \\disoriented.
                        """,
                        critical="""
                            The target is \\confused.
                        """,
                    ),
                    duration='Condition',
                    tags=['Figment', 'Light', 'Mind', 'Visual'],
                ),
            ),
            Subspell(
                level=2,
                name="Dancing Lights",
                effects=Effects(
                    effect="""
                        Up to four glowing lights appear in the area.
                        The lights resemble lanterns or torches, and shed bright light in the same 20 foot radius.
                        However, you can freely choose the color of the lights when you cast the spell.

                        During each movement phase, you can move the lights up to 100 feet in any direction.
                        If one of the lights ever goes out of range from you, it immediately winks out.
                    """,
                    duration="Sustain (minor)",
                    tags=['Figment', 'Light', 'Visual'],
                ),
            ),
            Subspell(
                level=3,
                name="Faerie Fire",
                description="""
                    Each target is surrounded with a pale glow made of hundreds of ephemeral points of lights, causing it to bright light in a 5 foot radius as a candle.
                    The lights impose a -10 penalty to Stealth checks.
                    In addition, they reveal the outline of the creatures if they become \\glossterm<invisible>.
                    This allows observers to see their location, though not to see them perfectly.
                """,
            ),
            Subspell(
                level=3,
                name="Illuminating",
                description="""
                    The brilliant light persists as long as you spend a \\glossterm<minor action> each round to sustain it.
                    The light has no additional effects on creatures in the area.
                """,
            ),
            Subspell(
                level=4,
                name="Flashbang",
                description="""
                    An intense sound accompanies the flash of light caused by the spell.
                    If the spell's attack is successful, the target is also \\deafened as a condition.
                    This is an \\glossterm<Auditory>, \\glossterm<Figment> effect.
                """,
            ),
        ],
        category='debuff, combat',
    ))

    spells.append(Spell(
        name="Polymorph",
        short_description="Change the physical forms of objects and creatures",
        header=Header("You shape the ground into an animated spike that drives into a foe."),
        targeting=Targeting(
            target='One creature or object',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack(
                defense='Reflex',
                success='Piercing \\glossterm<standard damage> +1d.',
                critical='As above, but double damage.',
            ),
            tags=['Physical', 'Shaping'],
        ),
        schools=['Transmutation'],
        lists=['Arcane', 'Nature'],
        cantrip="The spell deals -2d damage.",
        subspells=[
            Subspell(
                level=2,
                name="Barkskin",
                targeting=Targeting(
                    target='One willing creature',
                    rng='medium',
                    time='minor action',
                ),
                effects=Effects(
                    effect="""
                        The target gains \\glossterm{damage reduction} equal to your spellpower against damage dealt by \\glossterm<physical attacks>.
                        In addition, it is \\glossterm<vulnerable> to fire damage.
                    """,
                    duration='Attunement (shared)',
                ),
            ),
            Subspell(
                level=3,
                name="Stoneskin",
                description="""
                    This subspell functions like the \\textit<barkskin> subspell, except that the target is \\glossterm<vulnerable> to damage from adamantine weapons instead of fire damage.
                """,
            ),
            Subspell(
                level=7,
                name="Ironskin",
                description="""
                    This subspell functions like the \\textit<stoneskin> subspell, except that the damage reduction is equal to twice your spellpower.
                """,
            ),
            Subspell(
                level=2,
                name="Shrink",
                targeting=Targeting(
                    target='One willing creature (Small or larger)',
                    rng='medium',
                    time='minor action',
                ),
                effects=Effects(
                    effect="""
                        You decrease the target's size by one size category.
                        This decreases its \\glossterm<strike damage> and usually decreases its \\glossterm<reach> (see \\pcref<Size in Combat>).
                    """,
                    duration='Attunement (shared)',
                    tags=['Shaping', 'Sizing'],
                ),
            ),
            Subspell(
                level=3,
                name="Enlarge",
                targeting=Targeting(
                    target='One willing creature (Large or smaller)',
                    rng='medium',
                    time='minor action',
                ),
                effects=Effects(
                    effect="""
                        You increase the target's size by one size category.
                        This increases its \\glossterm<strike damage> and usually increases its \\glossterm<reach> (see \\pcref<Size in Combat>).
                        However, the target takes a -1d penalty to \\glossterm<strike damage>, as its muscles are not increased fully to match its new size.
                    """,
                    duration='Attunement (shared)',
                    tags=['Shaping', 'Sizing'],
                ),
            ),
            Subspell(
                level=7,
                name="Greater Enlarge",
                description="""
                    This subspell functions like the \\textit<enlarge> subspell, except that the target does not take a penalty to strike damage.
                """,
            ),
            Subspell(
                level=3,
                name="Alter Appearance",
                targeting=Targeting(
                    target='One willing creature (Large or smaller)',
                    rng='medium',
                    time='minor action',
                ),
                effects=Effects(
                    effect="""
                        You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
                        You gain a +5 bonus on the check, and you ignore penalties for changing the target's gender, race, subtype, or age.
                        However, this effect is unable to alter the target's clothes or equipment in any way.
                    """,
                    duration='Attunement (shared)',
                    tags=['Shaping'],
                ),
            ),
            Subspell(
                level=4,
                name="Craft Object",
                targeting=Targeting(
                    targets='One or more unattended, nonmagical objects (Large or smaller); see text',
                    rng='close',
                    time='standard action',
                ),
                effects=Effects(
                    effect="""
                        You make a Craft check to transform the targets into a new item (or items) made of the same materials.
                        You require none of the tools or time expenditure that would normally be necessary.

                        The total size of all targets combined must be Large size or smaller.
                    """,
                    tags=['Shaping'],
                ),
            ),
            Subspell(
                level=4,
                name="Impaling",
                description="""
                    If the attack hits, the target is \\glossterm<immobilized> as a \\glossterm<condition>.
                """,
            ),
            Subspell(
                level=6,
                name="Disintegrate",
                effects=Effects(
                    attack=Attack(
                        defense='Fortitude',
                        success="""
                            Physical \\glossterm<standard damage> +1d.
                            In addition, if the target has no hit points remaining, it dies.
                            Its body is completely disintegrated, leaving behind only a pinch of fine dust.
                            Its equipment is unaffected.
                        """,
                        critical="""
                            As above, but double damage.
                        """,
                    ),
                    tags=['Shaping'],
                ),
            ),
        ],
        category='damage',
    ))

    spells.append(Spell(
        name="Astromancy",
        short_description="Transport creatures through the Astral Plane",
        header=Header("You disrupt a creature's body by partially thrusting it into another plane."),
        targeting=Targeting(
            target='One creature',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack(
                defense='Mental',
                success="Physical \\glossterm<standard damage> +1d.",
                critical="""
                    As above, but double damage.
                    In addition, if the creature is an \\glossterm<outsider> native to another plane, it is sent back to its home plane.
                """,
            ),
            tags=['Planar', 'Teleportation'],
        ),
        schools=['Conjuration'],
        lists=['Arcane'],
        cantrip="The spell deals -2d damage.",
        subspells=[
            Subspell(
                level=2,
                name="Teleport",
                targeting=Targeting(
                    target='One willing creature (Medium or smaller)',
                    rng='close',
                ),
                effects=Effects(
                    effect="""
                        The target teleports into an unoccupied destination within \\rngmed range of its original location.
                        If the destination is invalid, the spell fails.
                    """,
                    tags=['Teleportation'],
                ),
            ),
            Subspell(
                level=4,
                name="Dimension Door",
                targeting=Targeting(
                    target='You',
                ),
                description="""
                    You teleport to a location within \\rngext range of you.
                    You must clearly visualize the destination's appearance, but you do not need \\glossterm<line of sight> or \\glossterm<line of effect> to your destination.
                """,
            ),
            Subspell(
                level=2,
                name="Dimensional Jaunt -- Plane of Fire",
                description="""
                    The spell's damage becomes fire damage.
                    In addition, if the attack hits, the target is \\glossterm<ignited> as a \\glossterm<condition>.
                """,
            ),
            Subspell(
                level=4,
                name="Dimensional Jaunt -- Plane of Earth",
                description="""
                    The spell's damage becomes bludgeoning damage.
                    In addition, if the attack hits, the target is \\glossterm<immobilized> as a \\glossterm<condition>.
                """,
            ),
            Subspell(
                level=8,
                name="Dimensional Jaunt -- Deep Astral Plane",
                description="""
                    If the attack hits, the target is \\glossterm<stunned> as a \\glossterm<condition>.
                """,
            ),
        ],
        category='damage',
    ))
    spells.append(Spell(
        name="Chronomancy",
        short_description="Manipulate the passage of time to inhibit foes and aid allies",
        header=Header("You slow a foe's passage through time, inhibiting its actions."),
        targeting=Targeting(
            target='One creature',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack(
                defense='Mental',
                success="""
                    The target is \\glossterm<slowed> and \\glossterm<dazed>.
                """,
                critical="""
                    the target is \\glossterm<immobilized> and \\glossterm<dazed>.
                """,
            ),
            tags=['Temporal'],
            duration='Condition',
        ),
        schools=['Transmutation'],
        lists=['Arcane'],
        cantrip="""
            You take a -2 penalty to accuracy with the spell.
        """,
        subspells=[
            Subspell(
                level=2,
                name="Haste",
                targeting=Targeting(
                    target='One willing creature',
                    rng='medium',
                    time='minor action',
                ),
                effects=Effects(
                    effect="""
                        The target gains a +30 foot bonus to its speed in all its movement modes, up to a maximum of double its original speed.
                    """,
                    tags=['Temporal'],
                    duration='Attunement',
                ),
            ),
            Subspell(
                level=4,
                name="Delay Damage",
                targeting=Targeting(
                    target='You',
                    time='minor action',
                ),
                effects=Effects(
                    effect="""
                        Whenever you take damage, half of the damage (rounded down) is not dealt to you immediately.
                        This damage is tracked separately.
                        When the ends, you take all of the delayed damage at once.
                        When this happens, any damage in excess of your hit points is dealt as \\glossterm<vital damage>.
                    """,
                    tags=['Temporal'],
                    duration='Sustain (minor)',
                ),
            ),
            Subspell(
                level=9,
                name="Time Stop",
                targeting=Targeting(
                    target='You',
                ),
                effects=Effects(
                    effect="""
                        You can take two full rounds of actions immediately.
                        During this time, all other creatures and objects are fixed in time, and cannot be moved or altered by any effect.
                        You can still affect yourself and create areas or new effects.

                        You are still vulnerable to danger, such as from heat or dangerous gases. However, you cannot be detected by any means while you travel.
                    """,
                    tags=['Temporal'],
                ),
            ),
        ],
        category='debuff, combat',
    ))

    return sorted(spells, key=lambda spell: spell.name)


def sanity_check(spells):
    # Make sure that the right kinds of spells exist

    # Every spell source should have one spell of each category
    for category in rise_data.categories:
        has_spell = {source: False for source in rise_data.spell_sources}
        for spell in spells:
            if spell.category == category:
                for source in spell.lists:
                    if source in has_spell:
                        has_spell[source] = True
        for source in rise_data.spell_sources:
            if not has_spell[source]:
                warn(f"Source {source} has no spell for {category}")

    # Every spell source should have both single target and multi damage spells
    # that target every defense
    for defense in rise_data.defenses:
        has_damage = {source: False for source in rise_data.spell_sources}
        # Every source should also have debuffs against every defense
        has_debuff = {source: False for source in rise_data.spell_sources}
        for spell in spells:
            if spell.effects.attack and spell.effects.attack.defense == defense:
                if spell.category == 'damage':
                    for source in spell.lists:
                        if source in rise_data.spell_sources:
                            has_damage[source] = True
                elif spell.category[:6] == 'debuff':
                    for source in spell.lists:
                        if source in rise_data.spell_sources:
                            has_debuff[source] = True

        for source in rise_data.spell_sources:
            if not has_damage[source]:
                warn(f"Source {source} has no damage spell against {defense}")
            if not has_debuff[source]:
                warn(f"Source {source} has no debuff spell against {defense}")

    # Every spell school should have at least two unique categories of
    # spells
    categories_in_school = {school: {} for school in rise_data.schools}
    for spell in spells:
        for school in spell.schools:
            categories_in_school[school][spell.category] = True
    for school in rise_data.schools:
        if len(categories_in_school[school]) < 2:
            warn(f"School {school} has only {len(categories_in_school[school])} spell categories")


@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output')
def main(output, check):
    spells = generate_spells()
    if check:
        sanity_check(spells)
    spell_texts = []
    for spell in spells:
        try:
            spell_texts.append(spell.to_latex())
        except Exception as e:
            raise Exception(f"Error converting spell '{spell.name}' to LaTeX") from e
    spell_text = latexify("""
        \\section<Spell Descriptions>
        {}
    """.format('\n'.join(spell_texts)))
    if output is None:
        print(spell_text)
    else:
        with open(output, 'w') as of:
            of.write(spell_text)


if __name__ == "__main__":
    main()
