#!/usr/bin/env python3

import click
from logging import getLogger, INFO, WARNING
from pprint import pformat
import re
logger = getLogger(__name__)
def log(*args):
    logger.log(*args)

duration_mapping = {
    'brief': r'\durbrief',
    'short': r'\durshort',
    'medium': r'\durmed',
    'long': r'\durlong',
    'extreme': r'\durext',
}
miscast_mapping = {
    'random': r'\miscastexplode',
}
rng_mapping = {
    'close': r'\rngclose',
    'medium': r'\rngmed',
    'long': r'\rnglong',
    'extreme': r'\rngext',
}
spell_categories = set([
    'battlefield control',
    'buff',
    'damage',
    'debuff',
    'unknown',
])


def join(*args):
    return '\n'.join(filter(None, args))


newline_pattern = re.compile(r'[\r\n]+')
add_pattern = re.compile(r'[+] (\d)')
plus_pattern = re.compile(r'[+](\d)')
sub_pattern = re.compile(r'[-] (\d)')
minus_pattern = re.compile(r'[-](\d)')
def latexify(text):
    """Convert the given text into relatively idiomatic LaTeX.
    This converts <> to {} and + to \\plus or \\add.
    This strips all SOL and EOL whitespace and removes blank lines.

    Args:
        text (string): The text to transform

    Yields:
        string: LaTeX code
    """

    text = text.replace('<', '{').replace('>', '}')
    text = add_pattern.sub(r'\\add \1', text)
    text = plus_pattern.sub(r'\\plus\1', text)
    text = sub_pattern.sub(r'\\sub \1', text)
    text = minus_pattern.sub(r'\\minus\1', text)

    stripped_lines = [
        line.strip()
        for line in newline_pattern.split(text)
    ]
    # strip blank lines
    text = '\n'.join([
        line for line in stripped_lines if line != ""
    ])
    return text


class Spell(object):
    def __init__(
            self,
            effects,
            lists,
            name,
            schools,
            targeting,
            augments=None,
            cantrip=None,
            category=None,
            custom_augments=None,
            header=None,
            miscast='random',
            notes=None,
            standard_augments=None,
    ):
        self.augments = augments
        self.cantrip = cantrip
        self.category = category
        self.custom_augments = custom_augments
        self.effects = effects
        self.header = header
        self.name = name
        self.lists = lists
        self.miscast = miscast
        self.notes = notes
        self.schools = schools
        self.standard_augments = standard_augments
        self.targeting = targeting

        if self.standard_augments is None:
            self.standard_augments = self.calculate_standard_augments()
        if self.category is not None and self.category not in spell_categories:
            log(WARNING, f"{self} has unrecognized category '{self.category}'")

    def calculate_standard_augments(self):
        augments = []
        if self.targeting.rng is not None:
            augments.append('Extended')
        if self.targeting.area is not None:
            augments.append('Widened')
        if (
                self.targeting.target is not None
                and self.targeting.area is None
        ):
            augments.append('Mass')
        return sorted(augments)

    def to_latex(self):
        return join(
            f"""
                \\begin<spellsection><{self.name}>
                    {str(self.header or "")}
                    \\begin<spellcontent>
                        {str(self.targeting)}
                        {str(self.effects)}
                    \\end<spellcontent>
                    \\begin<spellfooter>
                        \\spellinfo<{', '.join(self.schools)}><{', '.join(self.lists)}>
            """, f"""
                        \\spellnotes {self.notes}
            """ if self.notes else None, f"""
                        {miscast_mapping[self.miscast]}
                    \\end<spellfooter>
            """, f"""
                    \\begin<spellcantrip>
                        {self.cantrip}
                    \\end<spellcantrip>
            """ if self.cantrip else None, f"""
                \\end<spellsection>
            """, f"""
                \\subsubsection<Augments>
            """ if self.custom_augments or self.standard_augments else None, f"""
                    \\parhead<Standard Augments> {', '.join(self.standard_augments)}.
            """ if self.standard_augments else None,
            '\n'.join([
                str(augment)
                for augment in self.custom_augments
            ]) if self.custom_augments else None,
        )

    def __repr__(self):
        return f"Spell({self.name})"


class Attack(object):

    @classmethod
    def damage(cls, defense, damage_type):
        return cls(
            defense=defense,
            success=f"\\spelldamage<{damage_type}>.",
            critical='As above, but double damage.',
        )

    @classmethod
    def area_damage(cls, defense, damage_type):
        return cls(
            defense=defense,
            success=f"\\spelldamage<{damage_type}>[1d4].",
            critical='As above, but double damage.',
        )

    def __init__(
            self,
            defense,
            accuracy='Spellpower',
            critical=None,
            failure=None,
            special=None,
            success=None,
    ):
        if not (special or success):
            raise Exception("Attack must have `success` or `special`")
        self.defense = defense
        self.accuracy = accuracy
        self.critical = critical
        self.failure = failure
        self.special = special
        self.success = success

    def __str__(self):
        return join(
            f"""
                \\begin<spellattack><{self.accuracy} vs. {self.defense.capitalize()}>
            """, f"""
                    \\spellspecial {self.special}
            """ if self.special else None, f"""
                    \\spellsuccess {self.success}
            """ if self.success else None, f"""
                    \\spellcritical {self.critical}
            """ if self.critical else None, f"""
                    \\spellfailure {self.failure}
            """ if self.failure else None, f"""
                \\end<spellattack>
            """,
        )


class Augment(object):

    @classmethod
    def empowered_damage(cls):
        return cls(
            level=3,
            name='Empowered',
            description="""
                The spell deals +1d damage.
            """,
            stackable=True,
        )

    @classmethod
    def giant(cls):
        return cls(
            level=1,
            name='Giant',
            description="""
                The spell can affect a target one size category larger.
            """,
            stackable=True,
        )

    def __init__(
            self,
            level,
            name,
            description=None,
            effects=None,
            only_one=None,
            school=None,
            stackable=False,
            tags=None,
            targeting=None,
    ):
        self.level = level
        self.name = name
        self.description = description
        self.effects = effects
        self.only_one = only_one
        self.school = school
        self.stackable = stackable
        self.tags = tags
        self.targeting = targeting

    def augmentify(self, text):
        """Replace \\spelleffects and \\spelltargetinginfo
        with their augment equivalents
        """
        return (text.replace('spelleffects', 'augmenteffects')
                .replace('spelltargetinginfo', 'augmenttargetinginfo'))

    def tag_text(self):
        """Get the text for this effect's tags and schools"""
        if self.tags:
            return "This is a {glossary_tags} effect{school_text}.".format(
                glossary_tags=', '.join([
                    f"\\glossterm<{tag}>"
                    for tag in self.tags
                ]),
                school_text=(
                    f" from the \\glossterm<{self.school}> school"
                    if self.school
                    else ""
                ),
            )
        elif self.school:
            return f"This effect is from the \\glossterm<{self.school}> school."
        else:
            return ""

    def __str__(self):
        return self.augmentify(join(
            f"""
                \\augment<{self.level}><{self.name}>
                {self.description or ""}
            """, f"""
                {"In addition, replace" if self.description else "Replace"}
                the spell's targets with the following: {self.targeting}
            """ if self.targeting else None, f"""
            """, f"""
                {"In addition, replace" if self.description else "Replace"}
                the spell's effects with the following: {self.effects}
            """ if self.effects else None, """
                \\par
            """ if self.tags or self.school or self.stackable or self.only_one else None, f"""
                {self.tag_text()}
            """, f"""
                You can apply this augment multiple times.
                Its effects stack.
            """ if self.stackable else None, f"""
                You can only apply this augment to one casting of this spell at a time.
            """ if self.only_one else None,
        ))


class Effects(object):
    def __init__(self, attack=None, duration=None, effect=None, tags=None):
        self.attack = attack
        self.effect = effect
        self.duration = duration
        self.tags = tags

    def __str__(self):
        return join(
            f"""
                \\begin<spelleffects>
            """, f"""
                    \\spelleffect {self.effect}
            """ if self.effect else None, f"""
                    {self.attack if self.attack else ""}
            """, f"""
                    \\spelldur {duration_mapping[self.duration]}
            """ if self.duration else None, f"""
                \\end<spelleffects>
            """
        )


class Header(object):
    def __init__(self, description=None):
        self.description = description

    def __str__(self):
        if self.description is not None:
            return f"""
                \\begin<spellheader>
                    \\spelldesc<{self.description}>
                \\end<spellheader>
            """


class Targeting(object):
    area_prefix = {
        'burst': r'\spellburst',
        'emanation': r'\spellemanation',
        'zone': r'\spellzone',
    }

    def __init__(
            self,
            area=None,
            area_type='burst',
            target=None,
            targets=None,
            rng=None,
    ):
        self.area = area
        self.area_type = area_type
        self.rng = rng
        self.target = target
        self.targets = targets

    def area_text(self):
        """Return the text corresponding to this spell's area, if any."""
        if self.area is not None:
            prefix = Targeting.area_prefix[self.area_type]
            return f"{prefix}<{self.area}>"
        else:
            return ""

    def target_text(self):
        """Return the text corresponding to this spell's targets, if any."""
        if self.target:
            return f"\\spelltgt<{self.target}>"
        elif self.targets:
            return f"\\spelltgts<{self.targets}>"
        else:
            return ""

    def __str__(self):
        if self.rng:
            col2 = rng_mapping.get(self.rng, self.rng)
            col1 = self.area_text()
            included_target_text = False
            if not col1:
                col1 = self.target_text()
                included_target_text = True
            if not col1:
                raise Exception("Invalid targeting")
            twocol_text = f"\\spelltwocol<{col1}><{col2}>"

            # if we included the target_text above, don't include it again
            return f"""
                \\begin<spelltargetinginfo>
                    {twocol_text}
                    {self.target_text() if not included_target_text else ""}
                \\end<spelltargetinginfo>
            """
        else:
            return f"""
                \\begin<spelltargetinginfo>
                    {self.area_text()}
                    {self.target_text()}
                \\end<spelltargetinginfo>
            """


def generate_spells():
    spells = []
    spells.append(Spell(
        name='Windstrike',
        header=Header('You command the air to bludgeon the target, sending it flying.'),
        targeting=Targeting(
            target='One creature or object',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack.damage('fortitude', 'bludgeoning'),
            tags=['Air'],
        ),
        schools=['Evocation'],
        lists=['Air, Nature'],
        cantrip='The spell has \\rngclose range and deals -1d damage.',
        custom_augments=[
            Augment(
                level=1,
                name='Forceful',
                description='If the attack succeeds, the target is moved up to 10 feet in any direction -- even vertically.',
            ),
            Augment(
                level=2,
                name='Gust of Wind',
                targeting=Targeting(
                    area=r'\arealarge line, 10 ft. wide',
                    targets='Everything in the area',
                )
            ),
            Augment.empowered_damage(),
        ],
        category='buff',
    ))
    spells.append(Spell(
        name='Control Air',
        header=Header('You grant your ally ephemeral wings which allow them to glide.'),
        targeting=Targeting(
            target='One willing creature (Medium or smaller)',
            rng='close',
        ),
        effects=Effects(
            effect="""
                The target gains a 30 foot glide speed.
                A creature with a glide speed can glide through the air at the indicated speed (see \pcref{Gliding}).
                In addition, ranged \glossterm{strikes} against the target have a 20\% miss chance.
            """,
            duration='short',
            tags=['Air', 'Imbuement'],
        ),
        schools=['Transmutation'],
        lists=['Air', 'Nature'],
        cantrip='The spell lasts for 2 rounds.',
        custom_augments=[
            Augment.giant(),
            Augment(
                level=2,
                name='Accelerated',
                description='The glide speed granted by this spell increases to 60 feet.',
            ),
            Augment(
                level=3,
                name='Air Walk',
                description="""
                    The target can walk on air as if it were solid ground.
                    The magic only affects the target's legs and feet.
                    By choosing when to treat the air as solid, it can traverse the air with ease.
                """,
            ),
            Augment(
                level=3,
                name='Wind Screen',
                description="The miss chance for ranged strikes against the target increases to 50\%.",
            ),
            Augment(
                level=4,
                name='Stormlord',
                description=r"""
                    Whenever a creature within \rngclose range of the target attacks it, wind strikes the attacking creature.
                    The wind deals 1d4 bludgeoning damage \add 1d per two spellpower.
                    Any individual creature can only be dealt damage in this way once per round.
                    \par Any effect which increases this spell's range increases the range of this effect by the same amount.""",
                tags=['Shielding'],
                school='Evocation',
            ),
        ],
        category='buff',
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
            duration='short',
            tags=['Shielding'],
        ),
        schools=['Abjuration'],
        lists=['Arcane'],
        cantrip='The spell lasts for 2 rounds.',
        custom_augments=[
            Augment(
                level=2,
                name='Complete',
                description='The damage reduction applies against all damage, not just physical damage.',
            ),
            Augment(
                level=3,
                name='Immunity',
                description="""
                    The spell does not have its normal effect.
                    Instead, choose a type of damage.
                    The target becomes immune to damage of the chosen type.
                    Attacks that deal damage of multiple types still inflict damage normally unless the target is immune to all types of damage dealt.
                """,
            ),
            Augment(
                level=3,
                name='Retributive',
                description=r"""
                    Damage resisted by this spell is reflected back to the attacker as life damage.
                    If the attacker is beyond \rngclose range of the target, this reflection fails.
                    \par Any effect which increases this spell's range increases the range of this effect by the same amount.
                """,
                tags=['Life'],
                school='Vivimancy',
            ),
            Augment(
                level=4,
                name='Empowered',
                description=r"""
                    The damage reduction increases by an amount equal to your spellpower.
                """,
                stackable=True,
            ),
        ],
        category='buff',
    ))
    spells.append(Spell(
        name='Create Acid',
        header=Header('You create a magical orb of acid in your hand that speeds to its target.'),
        targeting=Targeting(
            target='One creature or object',
            rng='close',
        ),
        effects=Effects(
            attack=Attack.damage('reflex', 'acid'),
            tags=['Acid', 'Creation'],
        ),
        schools=['Conjuration'],
        lists=['Arcane'],
        cantrip='The spell deals -1d damage.',
        custom_augments=[
            Augment(
                level=2,
                name='Corrosive',
                description='The spell deals double damage to objects.'
            ),
            Augment.empowered_damage(),
            Augment(
                level=3,
                name='Lingering',
                description="""
                    The acid deals half damage on initial impact.
                    However, it deals damage to the target again at the end of each round for 2 rounds, including the initial round.
                """,
            ),
            Augment(
                level=6,
                name='Staggering',
                description=r'The target is \glossterm<staggered> for 2 rounds.'
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
    # But as a 7th level, with two Empowered augments, deals 24d10
    # Casting three standard damage spells deals 24d10
    # So this should be +3 per Empowered
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
                success="Physical damage dealt to the target is increased by +2d.",
                critical="Physical damage dealt to the target is increased by +4d.",
            ),
            duration='brief',
            tags=['Delusion', 'Mind'],
        ),
        schools=['Enchantment'],
        lists=['Arcane', 'Divine'],
        notes="This damage increase applies before other effects that modify the total damage dealt, such as \glossterm<damage reduction>.",
        cantrip="""
            The spell affects the first damage the target takes each round, rather than all damage.
            If the target takes damage from multiple sources, you choose which source deals increased damage.
        """,
        custom_augments=[
            Augment(
                level=2,
                name='Complete',
                description="The damage increase applies to all damage, not just physical damage.",
            ),
            Augment.empowered_damage(),
            Augment(
                level=4,
                name='Staggering',
                description="Whenever the target takes damage increased by this spell, it is \\glossterm<staggered> for 1 round.",
            )
        ],
        category='debuff',
    ))
    spells.append(Spell(
        name='Aid',
        targeting=Targeting(
            target='One creature',
            rng='close',
        ),
        effects=Effects(
            effect="""
                The target gains temporary hit points equal to twice your spellpower.
                If the target takes life damage, it loses all temporary hit points provided by this spell before applying the damage.
            """,
            duration='short',
            tags=['Delusion', 'Mind'],
        ),
        schools=['Enchantment'],
        lists=['Divine', 'Good'],
        cantrip="""
            The spell grants temporary hit points equal to your spellpower, rather than twice your spellpower.
        """,
        standard_augments=['Extended'],
        custom_augments=[
            Augment(
                level=3,
                name='Empowered',
                description="The temporary hit points granted by this spell increase by an amount equal to your spellpower.",
                stackable=True,
            )
        ],
        category='buff',
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
            duration='short',
        ),
        schools=['Abjuration'],
        lists=['Divine', 'Nature'],
        cantrip="The spell lasts for 2 rounds.",
        custom_augments=[
            Augment(
                level=3,
                name='Selective',
                description="""
                    Whenever a creature attempts to pass through the barrier for the first time, you can allow it to pass through unimpeded.
                    You must be aware of a creature attempting to pass through the barrier to allow it through.
                """,
            ),
            Augment(
                level=4,
                name='Persistent',
                description="The spell's duration becomes \\durlong",
                only_one=True,
            ),
            Augment(
                level=6,
                name='Antilife Shell',
                description="""
                    The spell only affects living creatures.
                    However, it affects them automatically, without requiring an attack.
                """,
                school='Vivimancy',
                tags=['Life'],
            ),
        ],
        category='battlefield control',
    ))
    spells.append(Spell(
        name='Antimagic',
        targeting=Targeting(
            target='One creature, object, or location',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack(
                defense='Special',
                special="""
                    For every spell affecting the target, if the attack result beats a DR equal to 10 + the spellpower of the spell, the spell is \\glossterm<suppressed> for 2 rounds.
                """,
            ),
            tags=['Thaumaturgy'],
        ),
        schools=['Abjuration'],
        lists=['Arcane', 'Divine', 'Magic', 'Nature'],
        cantrip=None,
        custom_augments=[
            Augment(
                level=1,
                name='Suppress Item',
                description="""
                    The spell does not have its normal effect.
                    Instead, if the target is an object, and the attack result beats a DR equal to 10 + the spellpower of the object, the object is suppressed for 2 rounds.
                    A suppressed object loses all its magical abilities, though it is still treated as being a magical object for the purpose of spells and effects.
                """,
            ),
            Augment(
                level=2,
                name='Banishing',
                description="""
                    The spell does not have its normal effect.
                    If the target is an effect of an ongoing spell (such as a summoned creature) and the attack result beats a DR equal to 10 + the spellpower of the spell, the target is treated as if the spell that created it was dispelled.
                    This usually causes the target to disappear.
                """,
            ),
            Augment(
                level=5,
                name='Spelltheft',
                description="""
                    Affected spells are dispelled instead of being suppressed.
                    In addition, you can choose to gain the effects of any spells you dispel as if they had been originally cast on you.
                    The effects last for the remainder of their original durations or for 5 rounds, whichever is shorter.
                    Spells that cannot be cast on you, such as spells which only affect the caster, are simply dispelled.
                """,
            ),
            Augment(
                level=6,
                name='Antimagic Field',
                description="""
                    The spell does not have its normal effects or targets.
                    Instead, it creates a \\areasmall radius emanation from you.
                    All magical abilities and objects are \glossterm{suppressed} in the area.
                    In addition, magical abilities and objects cannot be activated within the area.
                    \\par Creatures within the area cannot concentrate on or dismiss spells. However, you can concentrate on and dismiss your own \spell{antimagic field}.
                """,
            ),
        ],
        category='debuff',
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
            attack=Attack.area_damage('Reflex', 'fire'),
            tags=['Fire'],
        ),
        schools=['Evocation'],
        lists=['Arcane', 'Fire', 'Nature'],
        cantrip='The spell deals -1d damage.',
        custom_augments=[
            Augment(
                level=1,
                name="Burning Hands",
                targeting=Targeting(
                    area='\\arealarge cone',
                    area_type='burst',
                    targets='Everything in the area',
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
                success="The target is \\charmed by you. Any act by you or your apparent allies that threatens or damages the \\spell<charmed> person breaks the spell.",
                critical="As above, but the effect is permanent.",
            ),
            tags=['Delusion', 'Mind', 'Subtle'],
        ),
        schools=['Enchantment'],
        lists=["Arcane"],
        custom_augments=[
            Augment(
                level=1,
                name="Silent",
                description="""
                    The spell does not require verbal components to cast.
                """,
            ),
            Augment(
                level=2,
                name="Monstrous",
                description="""
                    The spell can target creatures of any creature type.
                """,
            ),
            Augment(
                level=3,
                name="Persistent",
                description="""
                    The spell's duration becomes \\durext.
                """,
            ),
            Augment(
                level=4,
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
            Augment(
                level=4,
                name="Amnesia",
                description="""
                    When the spell ends, the target forgets all events that transpired during the spell's duration.
                    It becomes aware of its surroundings as if waking up from a daydream.
                    It is not directly aware of any magical influence on its mind, though unusually paranoid or perceptive creatures may deduce that their minds were affected.
                """,
            ),
        ],
        category='debuff',
    ))
    spells.append(Spell(
        name="Water Mastery",
        header=Header("You create a wave of water to crush your foes."),
        targeting=Targeting(
            area='\\areamed line, 10 ft\. wide',
            area_type='burst',
            targets='Everything in the area',
        ),
        effects=Effects(
            attack=Attack.area_damage('Fortitude', 'bludgeoning'),
            tags=['Creation', 'Water'],
        ),
        schools=['Conjuration'],
        lists=['Nature', 'Water'],
        cantrip="""
            The spell affects an area 5 ft.\ wide, and does not deal damage on a failed attack.
        """,
        custom_augments=[
            Augment(
                level=1,
                name="Aqueuous Sphere",
                targeting=Targeting(
                    area='\\areasmall radius',
                    area_type='burst',
                    rng='close',
                    targets='Everything in the area',
                ),
            ),
            Augment(
                level=3,
                name="Persistent",
                description="""
                    The area affected by this spell becomes completely filled with water for \\durbrief duration.
                    Creatures in this \\glossterm<zone> suffer penalties appropriate for fighting underwater, and may be unable to breathe.
                """,
            ),
        ],
        category='damage',
    ))
    spells.append(Spell(
        name="Elemental Blade",
        header=Header("You transform the active part of a weapon into water, weakening its blows but allowing it penetrate defenses more easily."),
        targeting=Targeting(
            target='One unattended weapon',
            rng='close',
        ),
        effects=Effects(
            effect="""
                The target weapon deals +2d damage with \\glossterm<strikes>.
                In addition, all damage dealt with the weapon with strikes becomes fire damage in addition to its normal damage types.
                This suppresses any existing spell effects active on the weapon.
            """,
            duration='short',
            tags=['Fire', 'Shaping'],
        ),
        schools=['Evocation', 'Transmutation'],
        lists=['Nature', 'War', 'Water'],
        cantrip="The spell lasts for 2 rounds.",
        custom_augments=[
            Augment(
                level=1,
                name="Aqueous Blade, Lesser",
                effects=Effects(
                    effect="""
                        \glossterm<Strikes> with the affected weapon are made against Reflex defense instead of Armor defense.
                        However, damage with the weapon is halved, including any bonuses to damage.
                    """,
                    duration='short',
                    tags=['Shaping', 'Water'],
                ),
            ),
            Augment(
                level=2,
                name="Zephyr Blade",
                description="""
                    The target weapon gains an additional five feet of reach, extending the wielder's threatened area.
                    This has no effect on ranged attacks with the weapon.
                """,
                tags=['Air'],
            ),
            Augment(
                level=3,
                name="Empowered",
                description="""
                    The spell's damage bonus increases by +1d.
                """,
                stackable=True,
            ),
            Augment(
                level=5,
                name="Zephyr Blade, Greater",
                description="""
                    This augment functions like the Zephyr Blade augment, except that it increases the weapon's reach by ten feet.
                """,
            ),
            Augment(
                level=6,
                name="Aqueous Blade",
                description="""
                    \\glossterm<Strikes> with the affected weapon are made against Reflex defense instead of Armor defense.
                """,
                tags=['Water'],
            ),
        ],
        category='buff',
    ))
    spells.append(Spell(
        name="Drain Life",
        # header=
        targeting=Targeting(
            target='One living creature',
            rng='medium',
        ),
        effects=Effects(
            attack=Attack.damage('Fortitude', 'life'),
            tags=['Life'],
        ),
        schools=['Vivimancy'],
        lists=['Arcane'],
        cantrip="""
            The spell has \\rngclose range and deals -1d damage.
        """,
        custom_augments=[
            Augment(
                level=2,
                name="Vampiric",
                description="""
                    You gain temporary hit points equal to half the damage you deal with this spell.
                """,
            ),
            Augment(
                level=3,
                name="Death Knell",
                description="""
                    If the spell's attack succeeds, the target suffers a death knell for 2 rounds.
                    At the end of each round, if the target has 0 hit points, it immediately dies.
                """,
                tags=['Death'],
            ),
            Augment.empowered_damage(),
            Augment(
                level=6,
                name="Finger of Death",
                description="""
                    If the spell's attack critically succeeds, the target immediately dies.
                """,
                tags=['Death'],
            ),
        ],
        category='damage',
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
            tags=['Delusion', 'Mind'],
        ),
        schools=['Enchantment'],
        lists=['Arcane'],
        cantrip="The spell has \rngclose range and has no effect on a failed attack.",
        custom_augments=[
            Augment(
                level=1,
                name="Redirected",
                description="""
                    The target is afraid of a willing ally within the spell's range instead of being afraid of you.
                """,
            ),
        ],
        category='debuff',
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
            duration='short',
        ),
        schools=['Channeling'],
        lists=['Divine'],
        standard_augments=['Extended'],
        custom_augments=[
            Augment(
                level=5,
                name="Protection",
                description="""
                    The target gains \\glossterm<damage reduction> against all damage equal to your spellpower.
                """,
            ),
            Augment(
                level=3,
                name="Empowered",
                description="""
                    The spell's damage bonus increases by +1d.
                """,
                stackable=True,
            ),
        ],
        category='buff',
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
            duration='short',
            tags=['Enhancement'],
        ),
        schools=['Transmutation'],
        lists=['Nature'],
        cantrip='The spell lasts for 2 rounds.',
        standard_augments=['Extended'],
        custom_augments=[
            Augment(
                level=2,
                name="Stoneskin",
                description="""
                    The spell does not make the target vulnerable to fire damage.
                    Instead, it makes the target \\glossterm<vulnerable> to damage from adamantine weapons.
                """,
            ),
            Augment(
                level=4,
                name="Empowered",
                description="""
                    The damage reduction granted by this spell increases by an amount equal to your spellpower.
                """,
                stackable=True,
            ),
        ],
        category='buff',
    ))
    return sorted(spells, key=lambda spell: spell.name)


def sanity_check(spells):
    by_category = {}
    for category in spell_categories:
        by_category[category] = []
    for spell in spells:
        if spell.category:
            by_category[spell.category].append(spell)
            continue

        # Try to guess what type of effect the spell is
        category = 'unknown'
        if spell.effects.duration == 'short' and spell.targeting.target:
            category = 'buff'
        elif spell.effects.duration == 'brief':
            category = 'debuff'
        elif (
            spell.effects.attack
            and spell.effects.attack.success
            and 'spelldamage' in spell.effects.attack.success
        ):
            if spell.targeting.target:
                category = 'single target damage'
            elif spell.targeting.targets:
                category = 'area damage'
        by_category[category].append(spell)

    return pformat(by_category)


@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output')
def main(output, check):
    spells = generate_spells()
    if check:
        print(sanity_check(spells))
    spell_text = '\n'.join([
        spell.to_latex()
        for spell in spells
    ])
    spell_text = latexify(f"""
        \\section<Autogenerated Spell Descriptions>
        {spell_text}
    """)
    if output is None:
        print(spell_text)
    else:
        with open(output, 'w') as of:
            of.write(spell_text)


if __name__ == "__main__":
    main()
