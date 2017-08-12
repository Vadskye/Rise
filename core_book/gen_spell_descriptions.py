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
        name='Control Air',
        header=Header('You shield your ally with a barrier of wind, protecting them from harm.'),
        targeting=Targeting(
            target='One willing creature (Medium or smaller)',
            rng='close',
        ),
        effects=Effects(
            effect="""
                The target gains a +2 bonus to \\glossterm<physical defenses>.
                This bonus is increased to +5 against ranged \\glossterm<strikes> from weapons or projectiles that are Small or smaller.
                Any effect which increases the size of creature this spell can affect also increases the size of ranged weapon it defends against by the same amount.
            """,
            duration='Attunement',
            tags=['Air', 'Imbuement'],
        ),
        schools=['Transmutation'],
        lists=['Air', 'Nature'],
        cantrip="The spell's duration becomes Sustain (swift).",
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
                ),
                effects=Effects(
                    attack=Attack.multi_damage('Fortitude', 'bludgeoning'),
                    tags=['Air'],
                ),
            ),
            Subspell(
                level=4,
                name='Wind Screen',
                description="The miss chance for ranged strikes against the target increases to 50\%.",
            ),
            Subspell(
                level=3,
                name='Accelerated',
                description='The glide speed granted by this spell increases to 60 feet.',
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
                    The wind deals 1d4 bludgeoning damage \add 1d per two spellpower.
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
        name='Inertial Shield',
        header=Header('You create a barrier around your ally that resists physical intrusion.'),
        targeting=Targeting(
            target='One creature',
            rng='close',
        ),
        effects=Effects(
            effect="""
                The target gains \\glossterm<damage reduction> against \\glossterm<physical damage> equal to your spellpower.
                In addition, it is \\glossterm<vulnerable> to arcane damage.
            """,
            duration='Attunement',
            tags=['Shielding'],
        ),
        schools=['Abjuration'],
        lists=['Arcane'],
        cantrip="The spell's duration becomes Sustain (swift).",
        subspells=[
            Subspell(
                level=3,
                name='Complete',
                description='The damage reduction applies against all damage, not just physical damage.',
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
        ],
        category='buff, defense',
    ))
    spells.append(Spell(
        name='Create Acid',
        header=Header('You create a magical orb of acid in your hand that speeds to its target.'),
        targeting=Targeting(
            target='One creature or object',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack.damage('Reflex', 'acid'),
            tags=['Acid', 'Manifestation'],
        ),
        schools=['Conjuration'],
        lists=['Arcane'],
        cantrip="The spell's range becomes \\rngclose, and it deals -1d damage.",
        subspells=[
            Subspell(
                level=3,
                name='Corrosive',
                description='The spell deals double damage to objects.'
            ),
            Subspell(
                level=4,
                name='Lingering',
                description="""
                    The acid deals half damage on initial impact.
                    However, it deals damage to the target again at the end of each round for 2 rounds, including the initial round.
                """,
            ),
        ],
        category='damage',
    ))
    # Math: at 1st level, spellpower is probably ~2, so standard damage is probably 1d10.
    # Casting this spell and then two standard damage spells deals 4d8 = 18 damage
    # casting three standard damage spells deals 3d10 = 15 damage
    # So this is better even if fighting alone against a sufficiently strong enemy

    # At 20th level, spellpower is ~22, so standard damage is 8d10
    # Casting this spell and then two standard damage spells deals 20d10
    # But as a 7th level, with two Intensified augments, deals 24d10
    # Casting three standard damage spells deals 24d10
    # So this should be +3 per Intensified
    spells.append(Spell(
        name='Agony',
        header=Header('You inflict debilitating pain on your foe'),
        targeting=Targeting(
            target='One creature',
            rng='close',
        ),
        effects=Effects(
            attack=Attack(
                defense='Mental',
                success="Physical damage dealt to the target is increased by +1d. Damage not measured in dice is unaffected.",
                critical="As above, but damage is increased by +3d instead.",
            ),
            duration='Condition',
            tags=['Delusion', 'Mind'],
        ),
        schools=['Enchantment'],
        lists=['Arcane', 'Divine'],
        notes="This damage increase applies before other effects that modify the total damage dealt, such as \glossterm<damage reduction>.",
        cantrip="""
            The spell's duration becomes Sustain (swift).
            Its effect is still a \\glossterm<condition>, and can be removed by abilites that remove conditions.
        """,
        subspells=[
            Subspell(
                level=3,
                name='Complete',
                description="The damage increase applies to all damage, not just physical damage.",
            ),
        ],
        category='debuff, combat',
    ))
    spells.append(Spell(
        name='Barrier',
        targeting=Targeting(
            area=r'\areamed radius centered on you',
            area_type='zone',
        ),
        effects=Effects(
            effect="""
                Whenever a creature makes physical contact with the spell's area for the first time, you make a Spellpower vs. Mental attack against it.
                Success means the creature is unable to enter the spell's area with any part of its body.
                The rest of its movement in the current phase is cancelled.
                Failure means the creature can enter the area unimpeded.
                Creatures in the area at the time that the spell is cast are unaffected by the spell.
            """,
            duration='Sustain (swift)',
        ),
        schools=['Abjuration'],
        lists=['Divine', 'Nature'],
        cantrip="The spell's duration becomes Sustain (standard)",
        subspells=[
            Subspell(
                level=4,
                name='Selective',
                description="""
                    Whenever a creature attempts to pass through the barrier for the first time, you can allow it to pass through unimpeded.
                    You must be aware of a creature attempting to pass through the barrier to allow it through.
                """,
            ),
            Subspell(
                level=7,
                name='Antilife Shell',
                description="""
                    The spell only affects living creatures.
                    However, it affects them automatically, without requiring an attack.
                """,
                school='Vivimancy',
                tags=['Life'],
            ),
        ],
        category='debuff, mobility',
    ))
    spells.append(Spell(
        name='Antimagic',
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
            duration='Sustain (swift)',
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
                    duration='Sustain (swift)',
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
                            The target is treated as if the spell that created it was \\glossterm<dispelled>.
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
                    duration='Sustain (swift)',
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
                            This prevents all \\glossterm<Manifestation>, \\glossterm<Planar>, and \\glossterm<Translocation> effects.
                        """,
                    ),
                    duration='Condition',
                    tags='Thaumaturgy',
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
                        This prevents all \\glossterm<Manifestation>, \\glossterm<Planar>, and \\glossterm<Translocation> effects.
                    """,
                    duration='Attunement',
                    tags='Thaumaturgy',
                ),
            ),
        ],
        category='debuff, combat',
    ))
    spells.append(Spell(
        name='Fireball',
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
        cantrip="The spell affects a 5 foot radius, and it deals -1d damage.",
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
                        The target weapon deals +2d damage with \\glossterm<strikes>.
                        In addition, all damage dealt with the weapon with strikes becomes fire damage in addition to its normal damage types.
                    """,
                    duration='Attunement',
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
        name="Charm Person",
        header=Header("You manipulate a person's mind so they think of you as a trusted friend and ally."),
        targeting=Targeting(
            target='One humanoid creature',
            rng='close',
        ),
        effects=Effects(
            attack=Attack(
                defense='Mental',
                special="If the target thinks that you or your allies are threatening it, you take a -5 penalty to accuracy on the attack.",
                success="""
                    The target is \\charmed by you.
                    Any act by you or your apparent allies that threatens or damages the \\spell<charmed> person breaks the effect.
                """,
                critical="As above, but the effect's duration becomes permanent.",
            ),
            duration='Sustain (swift)',
            tags=['Delusion', 'Mind', 'Subtle'],
        ),
        cantrip="""
            The spell has no additional effects on a critical hit.
            In addition, its duration becomes Sustain (standard).
        """,
        schools=['Enchantment'],
        lists=["Arcane"],
        subspells=[
            Subspell(
                level=2,
                name="Silent",
                description="""
                    The spell does not require verbal components to cast.
                """,
            ),
            Subspell(
                level=3,
                name="Monstrous",
                description="""
                    The spell can target creatures of any creature type.
                """,
            ),
            Subspell(
                level=4,
                name="Attuned",
                description="""
                    The spell's duration becomes Attunement.
                    A critical sucess still makes the effect permanent.
                """,
            ),
            Subspell(
                level=5,
                name="Dominating",
                effects=Effects(
                    attack=Attack(
                        defense='Mental',
                        success='The target is \\confused for 2 rounds.',
                        critical="""
                            The target is \\dominated for 2 rounds.
                            If the target was already dominated by you, this effect lasts for 24 hours instead.
                        """,
                    ),
                    tags=['Compulsion, Mind'],
                ),
            ),
            Subspell(
                level=5,
                name="Amnesia",
                description="""
                    When the spell ends, the target forgets all events that transpired during the spell's duration.
                    It becomes aware of its surroundings as if waking up from a daydream.
                    It is not directly aware of any magical influence on its mind, though unusually paranoid or perceptive creatures may deduce that their minds were affected.
                """,
            ),
        ],
        category='narrative',
    ))
    spells.append(Spell(
        name="Water Mastery",
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
                    tags=['Creation', 'Water'],
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
                level=4,
                name="Sustained",
                description="""
                    The area affected by this spell becomes completely filled with water.
                    You can sustain the water as a \\glossterm<swift action>.
                    Creatures in this \\glossterm<zone> suffer penalties appropriate for fighting underwater, and may be unable to breathe.
                """,
            ),
        ],
        category='damage',
    ))
    # The school here is complicated; the top-level is pure Evocation, and the
    # Aqueuous Blade subspell is pure Transmutation. This should be split up
    # into separate spells.
    spells.append(Spell(
        name="Elemental Blade",
        header=Header("You transform the active part of a weapon into air, increasing its reach."),
        targeting=Targeting(
            # TODO: unattended or wielded by a willing creature?
            target='One unattended weapon',
            rng='close',
        ),
        effects=Effects(
            effect="""
                The target weapon gains an additional five feet of reach, extending the wielder's threatened area.
                This has no effect on ranged attacks with the weapon.
            """,
            duration='Attunement',
            tags=['Air', 'Shaping'],
        ),
        schools=['Transmutation'],
        lists=['Arcane', 'Nature', 'War', 'Water'],
        cantrip="The spell's duration becomes Sustain (swift).",
        subspells=[
            Subspell(
                level=2,
                name="Aqueous Blade",
                effects=Effects(
                    effect="""
                        \glossterm<Strikes> with the affected weapon are made against Reflex defense instead of Armor defense.
                        However, damage with the weapon is halved, including any bonuses to damage.
                    """,
                    duration='Attunement',
                    tags=['Shaping', 'Water'],
                ),
            ),
            Subspell(
                level=4,
                name="Zephyr Blade",
                description="""
                    The weapon's reach is increased by ten feet instead of five feet.
                """,
            ),
            Subspell(
                level=7,
                name="Greater Aqueous Blade",
                effects=Effects(
                    effect="""
                        \\glossterm<Strikes> with the affected weapon are made against Reflex defense instead of Armor defense.
                    """,
                    duration='Attunement',
                    tags=['Shaping', 'Water'],
                ),
            ),
        ],
        category='buff, offense',
    ))
    spells.append(Spell(
        name="Fear",
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
            The spell's duration becomes Sustain (swift).
        """,
        subspells=[
            Subspell(
                level=2,
                name="Redirected",
                description="""
                    The target is afraid of a willing ally within the spell's range instead of being afraid of you.
                """,
            ),
        ],
        category='debuff, combat',
    ))
    spells.append(Spell(
        name='Bless',
        header=Header('You invoke a divine blessing to aid your ally.'),
        targeting=Targeting(
            target='One creature',
            rng='close',
        ),
        effects=Effects(
            effect='The target gains a +2d bonus to damage with all attacks.',
            duration='Attunement',
        ),
        cantrip="The spell's duration becomes Sustain (swift).",
        schools=['Channeling'],
        lists=['Divine'],
        subspells=[
            Subspell(
                level=6,
                name="Protection",
                description="""
                    The target gains \\glossterm<damage reduction> against all damage equal to your spellpower.
                """,
            ),
        ],
        category='buff, offense',
    ))
    spells.append(Spell(
        name="Barkskin",
        header=Header("You toughen a creature's skin, giving it the appearance of tree bark."),
        targeting=Targeting(
            target='One living creature',
            rng='close',
        ),
        effects=Effects(
            effect="""
                The target gains \\glossterm{damage reduction} against physical damage equal to your spellpower.
                In addition, it is \\glossterm<vulnerable> to fire damage.
            """,
            duration='Attunement',
            tags=['Enhancement'],
        ),
        schools=['Transmutation'],
        lists=['Nature'],
        cantrip="The spell's duration becomes Sustain (swift).",
        subspells=[
            Subspell(
                level=3,
                name="Stoneskin",
                description="""
                    The spell does not make the target vulnerable to fire damage.
                    Instead, it makes the target \\glossterm<vulnerable> to damage from adamantine weapons.
                """,
            ),
            Subspell(
                level=5,
                name="Empowered",
                description="""
                    The damage reduction granted by this spell increases by an amount equal to your spellpower.
                """,
            ),
        ],
        category='buff, defense',
    ))
    spells.append(Spell(
        name="Smite",
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
        cantrip="The spell's range becomes \\rngclose, and it deals -1d damage.",
        subspells=[
        ],
        category='damage',
    ))
    spells.append(Spell(
        name="Word of Faith",
        header=Header("You speak an utterance that rebukes those who do not share your faith."),
        targeting=Targeting(
            area='\\areamed radius from you',
            area_type='burst',
            targets='Creatures in the area that do not worship your deity',
        ),
        effects=Effects(
            attack=Attack.damage('Mental', 'divine')
        ),
        schools=['Channeling'],
        lists=['Divine'],
        cantrip="The spell's area becomes an \\areasmall radius.",
        category='damage',
        subspells=[
            Subspell(
                level=4,
                name="Bolstering",
                description="""
                    Creatures in the spell's area that worship your deity heal 1d4 damage +1d per two spellpower.
                """,
            ),
        ],
    ))
    spells.append(Spell(
        name="Boon of Mastery",
        header=Header("You grant your ally great mastery over a particular domain."),
        targeting=Targeting(
            target='One willing creature',
            rng='close',
        ),
        effects=Effects(
            special="""
                When you cast this spell, choose a skill.
                You must have mastered the chosen skill.
            """,
            effect="""
                The target gains a +5 bonus to the chosen skill.
            """,
            duration='Attunement',
            tags=['Enhancement'],
        ),
        schools=['Transmutation'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="The spell's duration becomes Sustain (swift).",
        subspells=[
            Subspell(
                level=4,
                name="Myriad",
                description="""
                    You may choose an additional skill that you have mastered as you cast the spell.
                    The target gains the same bonus to all chosen skills.
                """,
            ),
        ],
        category='buff, utility',
    ))
    spells.append(Spell(
        name="Web",
        header=Header("""
            You create a many-layered mass of strong, stricky strands that trap creatures caught within them.
            The strands are similar to spider webs, but larger and tougher.
        """),
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
            duration='Sustain (swift)',
            tags=['Manifestation'],
        ),
        schools=['Conjuration'],
        lists=['Arcane', 'Nature'],
        cantrip="The spell's duration becomes Sustain (standard).",
        subspells=[
            Subspell(
                level=3,
                name="Reinforced",
                description="""
                    Each 5-ft.\\ square of webbing gains additional hit points equal to your spellpower.
                    In addition, the webs are no longer vulnerable to fire.
                """,
            ),
        ],
        category='debuff, mobility',
    ))
    spells.append(Spell(
        name="Poison",
        header=Header("You weaken your foe with a potent poison."),
        targeting=Targeting(
            target='One living creature',
            rng='close',
        ),
        effects=Effects(
            effect="""
                At the end of each round, you make a Spellpower vs. Fortitude attack against the target.
                Success means the target takes poison damage equal to your spellpower.
                If this is the second successful attack, the target takes a -2 penalty to \\glossterm<accuracy>, \\glossterm<checks>, and \\glossterm<defenses>.
                If this is the third successful attack, the penalty increases to -5.
            """,
            duration='Condition',
            tags=['Poison'],
        ),
        schools=['Transmutation'],
        lists=['Destruction', 'Divine', 'Nature'],
        cantrip="""
            The spell does not have additional effects other than damage.
        """,
        subspells=[
        ],
        category='debuff, combat',
    ))
    spells.append(Spell(
        name='Cone of Cold',
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
                    \\spelldamage<cold>[1d4].
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
        ],
        category='damage',
    ))
    spells.append(Spell(
        name="Lightning Bolt",
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
                    \\spelldamage<electricity>[1d4].
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
        header=Header("You corrupt your foe's life force, weakening them."),
        targeting=Targeting(
            target='One living creature',
            rng='close',
        ),
        effects=Effects(
            attack=Attack(
                defense='Fortitude',
                success="""
                    The target takes a -2 penalty to \\glossterm<accuracy>, \\glossterm<checks>, and \\glossterm<defenses>.
                """,
                critical="""
                    As above, but the penalty is increased by 2.
                """,
            ),
            duration='Condition',
            tags=['Life'],
        ),
        schools=['Vivimancy'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="""
            The spell's duration becomes Sustain (swift).
            Its effect is still a condition, and can be removed by abilites that remove conditions.
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
                level=3,
                name="Finger of Death",
                description="""
                    If the spell's attack critically hits, the target immediately dies.
                """,
                tags=['Death'],
            ),
            Subspell(
                level=5,
                name="Corruption of Blood and Bone",
                description="""
                    If the spell's attack succeeds, at the end of each round, the target takes life damage equal to your spellpower.
                    The target's maximum hit points are reduced by the amount of damage it takes in this way.
                    When the spell ends, the target's maximum hit points are restored.
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
            Subspell(
                level=4,
                name="Empowered",
                description="""
                    The penalty increases by 1.
                """,
            ),
        ],
        category='debuff, combat',
    ))
    spells.append(Spell(
        name="Inflict Wounds",
        # header=Header("description"),
        targeting=Targeting(
            target='One creature',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack.damage('Fortitude', 'life'),
            tags=['Life'],
        ),
        schools=['Vivimancy'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="The spell's range becomes \\rngclose, and it deals -1d damage.",
        subspells=[
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
                    If the spell's attack succeeds, the target suffers a death knell.
                    At the end of each round, if the target has 0 hit points, it immediately dies.
                    This effect lasts until the target removes this condition.
                """,
                tags=['Death'],
            ),
        ],
        category='damage',
    ))
    spells.append(Spell(
        name="Planar Disruption",
        header=Header("You disrupt a creature's body by partially thrusting it into another plane."),
        targeting=Targeting(
            target='One creature',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack(
                defense='Mental',
                success="\\spelldamage<physical>.",
                critical="""
                    As above, but double damage.
                    In addition, if the creature is an \\glossterm<outsider> native to another plane, it is sent back to its home plane.
                """,
            ),
            tags=['Planar', 'Teleportation'],
        ),
        schools=['Conjuration'],
        lists=['Arcane', 'Divine'],
        cantrip="The spell's range becomes \\rngclose, and it deals -1d damage.",
        subspells=[
        ],
        category='damage',
    ))
    spells.append(Spell(
        name="Cure Wounds",
        # header=Header("description"),
        targeting=Targeting(
            target='One creature',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack(
                defense='Fortitude',
                success="The target is healed for \\spelldamage<>.",
            ),
            tags=['Life'],
        ),
        schools=['Vivimancy'],
        lists=['Divine', 'Life', 'Nature'],
        cantrip="""
            Instead of healing, the spell grants \\glossterm<temporary hit points> equal to twice your spellpower.
            The duration of the temporary hit points is Sustain (swift).
        """,
        subspells=[
            Subspell(
                level=2,
                name="Moderate Wounds",
                description="""
                    For every 5 points of healing, this spell can instead cure 1 vital damage.
                """,
            ),
            Subspell(
                level=2,
                name="Undead Bane",
                description="""
                    If the target is undead, the spell gains a +2 bonus to accuracy and deals double damage on a critical hit.
                """,
            ),
            Subspell(
                level=3,
                name="Serious Wounds",
                description="""
                    For every 2 points of healing, this spell can instead cure 1 vital damage.
                """,
            ),
            Subspell(
                level=4,
                name="Critical Wounds",
                description="""
                    For every point of healing, this spell can instead cure 1 vital damage.
                """,
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
        category='damage',  # kinda
    ))
    spells.append(Spell(
        name="Protection from Alignment",
        # header=Header("description"),
        targeting=Targeting(
            target='One creature',
            rng='close',
        ),
        effects=Effects(
            special="""
                Choose an alignment other than neutral (chaotic, good, evil, lawful).
                This spell gains the tag for that alignment's \\glossterm<opposed alignment>.
            """,
            effect="""
                The target gains damage reduction equal to your spellpower against physical effects that have the chosen alignment, and physical attacks made by creatures with the chosen alignment.
            """,
            tags=['Shielding'],
        ),
        schools=['Abjuration'],
        lists=['Arcane', 'Chaos', 'Divine', 'Evil', 'Good', 'Law'],
        cantrip="The spell's duration becomes Sustain (swift).",
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
                    Success means the attacker takes \\spelldamage<divine>[d4].
                """,
            ),
        ],
        category='buff, defense',
    ))
    spells.append(Spell(
        name="Summon Monster",
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
                If it hits, it deals 1d3 damage \plus1d per two spellpower.
                The type of damage dealt by this attack depends on the creature's appearance.
                Most animals bite or claw their foes, which deals bludgeoning and slashing damage.
            """,
            duration="Sustain (swift)",
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
                    Its accuracy is the same as its accuracy with strikes.
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
        cantrip="The sensor cannot be moved after it is originally created, and the spell's duration becomes Sustain (swift).",
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
                    You can move the sensor as a \\glossterm<swift action> rather than as a standard action.
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
        name="Foresight",
        header=Header("You grant a creature the ability to see fractions of a second into the future."),
        targeting=Targeting(
            target="One willing creature",
            rng="close",
        ),
        effects=Effects(
            effect="""
                The target gains a \plus2 bonus to \\glossterm<accuracy> with physical attacks.
            """,
            tags=['Enhancement'],
            duration='Attunement',
        ),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="The spell's duration becomes Sustain (swift).",
        subspells=[
            Subspell(
                level=2,
                name="Augury",
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
        cantrip="If your attack succeeds, you move the target one foot per spellpower. In addition, the spell has no additional effects on a critical hit.",
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
                    duration="Sustain (swift)",
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
                        The target is healed for \\spelldamage<>.
                    """,
                ),
            ),
        ],
        category='debuff, combat',
    ))
    spells.append(Spell(
        name="Distort Image",
        # header=Header("description"),
        targeting=Targeting(
            target='One willing creature',
            rng='medium',
        ),
        effects=Effects(
            effect="""
                The target's physical outline is distorted so it appears blurred, shifting, and wavering.
                Targeted physical attacks against the target have a 20\% miss chance.
                Spells and other non-physical attacks suffer no miss chance.
            """,
            duration='Attunement',
            tags=['Glamer', 'Visual'],
        ),
        schools=['Illusion'],
        lists=['Arcane'],
        cantrip="The spell's duration becomes Sustain (swift).",
        subspells=[
            Subspell(
                level=2,
                name="Distort Light",
                targeting=Targeting(
                    target='One object (Small or smaller)',
                    rng='close',
                    area='\\areamed radius from the target',
                    area_type='emanation',
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
                    duration='Attunement',
                    tags=['Glamer', 'Visual'],
                ),
            ),
            Subspell(
                level=3,
                name="Mirror Image",
                effects=Effects(
                    effect="""
                        Four illusory duplicates appear around the target that mirror its every move.
                        The duplicates shift chaotically in its space, making it difficult to identify the real creature.

                        All targeted attacks against the target have a 50% miss chance.
                        Whenever an attack misses in this way, it affects an image, destroying it.
                    """,
                    duration='Sustain (swift)',
                    tags=['Figment', 'Visual'],
                ),
            ),
            Subspell(
                level=4,
                name="Shadow Mantle",
                description="""
                    The spell's deceptive nature extends beyond merely altering light to affect the nature of reality itself.
                    The spell's miss chance changes to a failure chance, and applies to non-physical attacks as well as physical attacks.
                    In addition, it loses the \\glossterm<Visual> tag, allowing it to affect creatures who do not rely on sight to affect the target.
                """,
            ),
            Subspell(
                level=5,
                name="Displacement",
                description="""
                    The target's image is futher distorted, and appears to be two to three feet from its real location.
                    The spell's miss chance increases to 50\\%.
                """,
            ),
        ],
        category='buff, defense',
    ))

    spells.append(Spell(
        name="Flare",
        # header=Header("description"),
        targeting=Targeting(
            area='5 foot radius',
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
                    The target is \\blinded instead.
                """,
            ),
            duration='Condition',
            tags=['Figment', 'Light', 'Visual'],
        ),
        schools=['Illusion'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="The spell affects a single creature, rather than an area.",
        subspells=[
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
                    duration="Sustain (swift)",
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
                    The brilliant light persists as long as you spend a \\glossterm<swift action> each round to sustain it.
                    The light has no additional effects on creatures in the area.
                """,
            ),
            Subspell(
                level=2,
                name="Expanded",
                description="""
                    The spell's area increases to \\areasmall.
                    This allows the standard Widened augment to be used to expand the spell's area further.
                """,
            ),
            Subspell(
                level=5,
                name="Universal",
                description="""
                    The light radiates from every point in the area simultaneously, making it impossible to avoid.
                    The spell's attack is made against Fortitude instead of Reflex.
                """,
            ),
            Subspell(
                level=5,
                name="Blinding",
                description="""
                    The spell's critical effect makes the target \\blinded as a condition, rather than just for one round.
                    In addition, the blindness replaces the spell's normal success effect, rather than being applied in addition to it.
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
        header=Header("You change the target's physical form."),
        targeting=Targeting(
            target='One willing creature',
            rng='medium',
        ),
        effects=Effects(
            # TODO: more explanation of what this means
            effect="""
                You increase or decrease the target's size by one size category.
            """,
            duration='Attunement',
            tags=['Shaping', 'Sizing'],
        ),
        schools=['Transmutation'],
        lists=['Arcane', 'Nature'],
        cantrip="The spell's duration becomes Sustain (swift).",
        subspells=[
            Subspell(
                level=3,
                name="Alter Appearance",
                description="""
                    You can also make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
                    You gain a +5 bonus on the check, and you ignore penalties for changing the target's gender, race, subtype, or age.
                    However, this effect is unable to alter the target's clothes or equipment in any way.
                """,
            ),
            Subspell(
                level=4,
                name="Fabricate",
                targeting=Targeting(
                    targets='One or more unattended, nonmagical objects (Large or smaller); see text',
                    rng='close',
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
        ],
        category='buff, offense',
    ))

    spells.append(Spell(
        name="Teleport",
        # header=Header("description"),
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
        schools=['Conjuration'],
        lists=['Arcane'],
        cantrip="cantripeffect",
        subspells=[
            Subspell(
                level=2,
                name="Distant",
                description="""
                    The maximum distance the target can teleport is increased to \\rnglong.
                """,
            ),
            Subspell(
                level=5,
                name="Overland Transit",
                targeting=Targeting(
                    targets='Up to five willing creatures (Medium or smaller)',
                    rng='close',
                ),
                description="""
                    The maximum distance the target can teleport is increased to one mile.
                """,
            ),
        ],
        category='narrative',
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
