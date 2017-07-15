#!/usr/bin/env python3

import click
from logging import getLogger, WARNING
# from pprint import pformat
import re
logger = getLogger(__name__)
def log(*args):
    logger.log(*args)
def warn(*args):
    logger.log(WARNING, *args)

duration_mapping = {
    'attune': 'Attunement',
    'attunement': 'Attunement',
    'condition': 'Condition',
    'sustain (swift)': 'Sustain (swift)',
}
rng_mapping = {
    'close': r'\rngclose',
    'medium': r'\rngmed',
    'long': r'\rnglong',
    'extreme': r'\rngext',
}
DEFENSES = [
    'Fortitude',
    'Mental',
    'Reflex',
    'Special',
]
SCHOOLS = [
    'Abjuration',
    'Channeling',
    'Conjuration',
    'Divination',
    'Enchantment',
    'Evocation',
    'Illusion',
    'Transmutation',
    'Vivimancy',
]
SPELL_CATEGORIES = set([
    'buff, offense',
    'buff, defense',
    'buff, utility',
    'damage',
    'debuff, combat',
    'debuff, mobility',
    'narrative',
])
SPELL_SOURCES = [
    'Arcane',
    'Divine',
    'Nature',
]
DOMAINS = [
    'Air',
    'Chaos',
    'Death',
    'Destruction',
    'Earth',
    'Evil',
    'Fire',
    'Good',
    'Knowledge',
    'Law',
    'Life',
    'Magic',
    'Protection',
    'Strength',
    'Travel',
    'Trickery',
    'War',
    'Water',
    'Wild',
]


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
            augments=None,
            cantrip=None,
            category=None,
            effects=None,
            header=None,
            lists=None,
            name=None,
            schools=None,
            subspells=None,
            targeting=None,
            notes=None,
            short_description=None,
    ):
        self.cantrip = cantrip
        self.category = category
        self.subspells = subspells
        self.effects = effects
        self.header = header
        self.name = name
        self.lists = lists
        self.notes = notes
        self.schools = schools
        self.short_description = short_description or 'TODO'
        self.augments = augments
        self.targeting = targeting

        for arg in ['cantrip', 'effects', 'lists', 'name', 'schools', 'targeting']:
            if getattr(self, arg) is None:
                print(f"Warning: {self} is missing required property '{arg}'")

        if self.augments is None:
            self.augments = self.calculate_standard_augments()

        for school in self.schools:
            if school not in SCHOOLS:
                warn(f"{self} has unrecognized school '{school}'")

        if self.category is None:
            warn(f"{self} has no category")
        elif self.category not in SPELL_CATEGORIES:
            warn(f"{self} has unrecognized category '{self.category}'")

    def calculate_standard_augments(self):
        augments = ['Quickened', 'Silent', 'Stilled']
        if self.targeting.rng is not None:
            augments.append('Extended')
        if self.targeting.area is not None:
            augments.append('Widened')
        if (
                self.targeting.target is not None
                and self.targeting.area is None
                and self.category[:4] != 'buff'
        ):
            augments.append('Mass')
        if (
                self.effects.attack
                and self.effects.attack.success
                and '\\spelldamage' in self.effects.attack.success
        ):
            augments.append('Intensified')
        return sorted(augments)

    def to_latex(self):
        # Sort by level as primary, name as secondary
        sorted_subspells = sorted(
            sorted(
                self.subspells,
                key=lambda augment: augment.name
            ),
            key=lambda augment: augment.level
        ) if self.subspells else None

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
                        \\parhead*<Augments> {', '.join(sorted(self.augments))}
            """,
            f"""
                        \\spellnotes {self.notes}
            """ if self.notes else None,
            f"""
                    \\end<spellfooter>
            """,
            f"""
                    \\begin<spellcantrip>
                        {self.cantrip}
                    \\end<spellcantrip>
            """ if self.cantrip else None,
            f"""
                \\end<spellsection>
            """,
            f"""
                \\subsubsection<Subspells>
            """ if self.subspells or self.augments else None,
            '\n'.join([
                str(subspell)
                for subspell in sorted_subspells
            ]) if self.subspells else None,
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
    def multi_damage(cls, defense, damage_type):
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

        if defense not in DEFENSES:
            raise Exception(f"Attack has unrecognized defense '{defense}'")

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


class Subspell(object):

    def __init__(
            self,
            level,
            name,
            description=None,
            effects=None,
            only_one=None,
            school=None,
            tags=None,
            targeting=None,
    ):
        # TODO: fix this hack caused by changing custom augments to subspells
        self.level = level + 1
        self.name = name
        self.description = description
        self.effects = effects
        self.only_one = only_one
        self.school = school
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
                    for tag in sorted(self.tags)
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
            """ if self.tags or self.school or self.only_one else None, f"""
                {self.tag_text()}
            """, f"""
                This augment can only be applied to one casting of this spell at a time.
            """ if self.only_one else None,
        ))


class Effects(object):
    def __init__(
            self,
            attack=None,
            duration=None,
            effect=None,
            special=None,
            tags=None,
    ):
        self.attack = attack
        self.effect = effect
        self.duration = duration
        self.special = special
        self.tags = tags

    def __str__(self):
        tag_text = ', '.join([
            f"\\glossterm<{tag}>"
            for tag in sorted(self.tags)
        ]) if self.tags else ""

        return join(
            f"""
                \\begin<spelleffects>
            """, f"""
                    \\spellspecial {self.special}
            """ if self.special else None, f"""
            """, f"""
                    \\spelleffect {self.effect}
            """ if self.effect else None, f"""
                    {self.attack if self.attack else ""}
            """, f"""
                    \\spelldur {duration_mapping[self.duration]}
            """ if self.duration else None, f"""
                \\spelltags<{tag_text}>
            """ if self.tags else None, f"""
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
            special=None,
            unrestricted_range=False,
    ):
        self.area = area
        self.area_type = area_type
        self.rng = rng
        self.special = special
        self.target = target
        self.targets = targets
        self.unrestricted_range = unrestricted_range

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
        special_text = f'\\spellspecial {self.special}' if self.special else ""
        if self.rng:
            col2 = "\\spellrng<{rng}{unrestricted}>".format(
                rng=rng_mapping.get(self.rng, self.rng),
                unrestricted=" (Unrestricted)" if self.unrestricted_range else "",
            )
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
                    {special_text}
                    {twocol_text}
                    {self.target_text() if not included_target_text else ""}
                \\end<spelltargetinginfo>
            """
        else:
            return f"""
                \\begin<spelltargetinginfo>
                    {special_text}
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
            attack=Attack.damage('Fortitude', 'bludgeoning'),
            tags=['Air'],
        ),
        schools=['Evocation'],
        lists=['Nature'],
        cantrip='The spell deals -1d damage and has no additional effects on a critical hit.',
        subspells=[
            Subspell(
                level=1,
                name='Forceful',
                description='If the attack succeeds, the target is moved up to 10 feet in any direction -- even vertically.',
            ),
            Subspell(
                level=1,
                name='Gust of Wind',
                description="The spell deals -2d damage.",
                targeting=Targeting(
                    area=r'\arealarge line, 10 ft. wide',
                    targets='Everything in the area',
                )
            ),
        ],
        category='damage',
    ))
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
            duration='attune',
            tags=['Air', 'Imbuement'],
        ),
        schools=['Transmutation'],
        lists=['Air', 'Nature'],
        cantrip="The spell's duration becomes Sustain (swift).",
        subspells=[
            Subspell(
                level=1,
                name="Gentle Descent",
                description="""
                    The target gains a 30 foot glide speed.
                    A creature with a glide speed can glide through the air at the indicated speed (see \pcref{Gliding}).
                """,
            ),
            Subspell(
                level=3,
                name='Wind Screen',
                description="The miss chance for ranged strikes against the target increases to 50\%.",
            ),
            Subspell(
                level=2,
                name='Accelerated',
                description='The glide speed granted by this spell increases to 60 feet.',
            ),
            Subspell(
                level=3,
                name='Air Walk',
                description="""
                    The target can walk on air as if it were solid ground.
                    The magic only affects the target's legs and feet.
                    By choosing when to treat the air as solid, it can traverse the air with ease.
                """,
            ),
            Subspell(
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
            duration='attune',
            tags=['Shielding'],
        ),
        schools=['Abjuration'],
        lists=['Arcane'],
        cantrip="The spell's duration becomes Sustain (swift).",
        subspells=[
            Subspell(
                level=2,
                name='Complete',
                description='The damage reduction applies against all damage, not just physical damage.',
            ),
            Subspell(
                level=3,
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
            Subspell(
                level=4,
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
        cantrip="The spell deals -1d damage and has no additional effects on a critical hit.",
        subspells=[
            Subspell(
                level=2,
                name='Corrosive',
                description='The spell deals double damage to objects.'
            ),
            Subspell(
                level=3,
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
                success="Physical damage dealt to the target is increased by +2d.",
                critical="Physical damage dealt to the target is increased by +4d.",
            ),
            duration='condition',
            tags=['Delusion', 'Mind'],
        ),
        schools=['Enchantment'],
        lists=['Arcane', 'Divine'],
        notes="This damage increase applies before other effects that modify the total damage dealt, such as \glossterm<damage reduction>.",
        cantrip="""
            The spell has no additional effects on a critical hit.
            In addition, its duration becomes Sustain (swift).
            Its effect is still a condition, and can be removed by abilites that remove conditions.
        """,
        subspells=[
            Subspell(
                level=2,
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
            duration='sustain (swift)',
        ),
        schools=['Abjuration'],
        lists=['Divine', 'Nature'],
        cantrip="The spell's duration becomes Sustain (standard)",
        subspells=[
            Subspell(
                level=3,
                name='Selective',
                description="""
                    Whenever a creature attempts to pass through the barrier for the first time, you can allow it to pass through unimpeded.
                    You must be aware of a creature attempting to pass through the barrier to allow it through.
                """,
            ),
            Subspell(
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
        category='debuff, mobility',
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
                    The attack result is applied to every \\glossterm<magical> effect on the target.
                    The DR for each effect is equal to 10 + the \\glossterm<power> of that effect.
                """,
                success="""
                    Success against a magical effect causes that effect to be \\glossterm<suppressed>.
                """,
            ),
            duration='sustain (swift)',
            tags=['Thaumaturgy'],
        ),
        schools=['Abjuration'],
        lists=['Arcane', 'Divine', 'Magic', 'Nature'],
        cantrip="The spell's duration becomes Sustain (standard).",
        subspells=[
            Subspell(
                level=1,
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
                    duration='sustain (swift)',
                    tags=['Thaumaturgy'],
                ),
            ),
            Subspell(
                level=2,
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
                level=6,
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
                    duration='sustain (swift)',
                    tags=['Thaumaturgy'],
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
        cantrip="The spell deals -1d damage and has no additional effects on a critical hit.",
        subspells=[
            Subspell(
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
                success="""
                    The target is \\charmed by you.
                    Any act by you or your apparent allies that threatens or damages the \\spell<charmed> person breaks the effect.
                """,
                critical="As above, but the effect's duration becomes permanent.",
            ),
            duration='sustain (swift)',
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
                level=1,
                name="Silent",
                description="""
                    The spell does not require verbal components to cast.
                """,
            ),
            Subspell(
                level=2,
                name="Monstrous",
                description="""
                    The spell can target creatures of any creature type.
                """,
            ),
            Subspell(
                level=3,
                name="Attuned",
                description="""
                    The spell's duration becomes Attunement.
                    A critical sucess still makes the effect permanent.
                """,
            ),
            Subspell(
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
            Subspell(
                level=4,
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
            area='\\areamed line, 10 ft\. wide',
            area_type='burst',
            targets='Everything in the area',
        ),
        effects=Effects(
            attack=Attack.multi_damage('Fortitude', 'bludgeoning'),
            tags=['Manifestation', 'Water'],
        ),
        schools=['Conjuration'],
        lists=['Nature', 'Water'],
        cantrip='The spell deals -1d damage and has no additional effects on a critical hit.',
        subspells=[
            Subspell(
                level=1,
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
                name="Sustained",
                description="""
                    The area affected by this spell becomes completely filled with water.
                    You can sustain the water as a swift action.
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
            duration='attune',
            tags=['Fire', 'Shaping'],
        ),
        schools=['Evocation', 'Transmutation'],
        lists=['Arcane', 'Nature', 'War', 'Water'],
        cantrip="The spell's duration becomes Sustain (swift).",
        subspells=[
            Subspell(
                level=1,
                name="Aqueous Blade, Lesser",
                effects=Effects(
                    effect="""
                        \glossterm<Strikes> with the affected weapon are made against Reflex defense instead of Armor defense.
                        However, damage with the weapon is halved, including any bonuses to damage.
                    """,
                    duration='attune',
                    tags=['Shaping', 'Water'],
                ),
            ),
            Subspell(
                level=2,
                name="Zephyr Blade",
                description="""
                    The target weapon gains an additional five feet of reach, extending the wielder's threatened area.
                    This has no effect on ranged attacks with the weapon.
                """,
                tags=['Air'],
            ),
            Subspell(
                level=5,
                name="Zephyr Blade, Greater",
                description="""
                    This augment functions like the Zephyr Blade augment, except that it increases the weapon's reach by ten feet.
                """,
            ),
            Subspell(
                level=6,
                name="Aqueous Blade",
                description="""
                    \\glossterm<Strikes> with the affected weapon are made against Reflex defense instead of Armor defense.
                """,
                tags=['Water'],
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
            duration='condition',
            tags=['Delusion', 'Mind'],
        ),
        schools=['Enchantment'],
        lists=['Arcane'],
        cantrip="""
            The spell has no additional effects on a critical hit.
            In addition, its duration becomes Sustain (swift).
        """,
        subspells=[
            Subspell(
                level=1,
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
            duration='attune',
        ),
        cantrip="The spell's duration becomes Sustain (swift).",
        schools=['Channeling'],
        lists=['Divine'],
        subspells=[
            Subspell(
                level=5,
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
            duration='attune',
            tags=['Enhancement'],
        ),
        schools=['Transmutation'],
        lists=['Nature'],
        cantrip="The spell's duration becomes Sustain (swift).",
        subspells=[
            Subspell(
                level=2,
                name="Stoneskin",
                description="""
                    The spell does not make the target vulnerable to fire damage.
                    Instead, it makes the target \\glossterm<vulnerable> to damage from adamantine weapons.
                """,
            ),
            Subspell(
                level=4,
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
        cantrip='The spell deals -1d damage and has no additional effects on a critical hit.',
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
        cantrip='The spell deals -1d damage and has no additional effects on a critical hit.',
        category='damage',
        subspells=[
            Subspell(
                level=3,
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
            duration='attune',
            tags=['Enhancement'],
        ),
        schools=['Transmutation'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="The spell's duration becomes Sustain (swift).",
        subspells=[
            Subspell(
                level=3,
                name="Myriad",
                description="""
                    You may choose an additional skill that you have mastered as you cast the spell.
                    The target gains the same bonus to all chosen skills.
                    \\par You can apply this augment multiple times.
                    Each time, you may choose an additional skill that you have mastered.
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
            duration='sustain (swift)',
            tags=['Manifestation'],
        ),
        schools=['Conjuration'],
        lists=['Arcane', 'Nature'],
        cantrip="The spell's duration becomes Sustain (standard).",
        subspells=[
            Subspell(
                level=2,
                name="Reinforced",
                description="""
                    Each 5-ft.\\ square of webbing gains additional hit points equal to your spellpower.
                    In addition, the webs are no longer vulnerable to fire.
                    \\par You can apply this augment multiple times.
                    The hit point increase stacks.
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
            duration='condition',
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
                    In addition, the target moves at half speed until it removes this condition.
                """,
                critical='As above, but double damage.',
            ),
            tags=['Cold'],
        ),
        schools=['Evocation'],
        lists=['Arcane', 'Nature'],
        cantrip='The spell deals -1d damage and has no additional effects on a critical hit.',
        subspells=[
        ],
        category='damage',
    ))
    spells.append(Spell(
        name="Lightning Bolt",
        header=Header("You create a bolt of electricity that fries your foes."),
        targeting=Targeting(
            area='\\areamed line',
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
        cantrip='The spell deals -1d damage and has no additional effects on a critical hit.',
        subspells=[
            Subspell(
                level=3,
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
            duration='condition',
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
                level=2,
                name="Eyebite",
                description="""
                    If the spell's attack succeeds, the target is also \\partiallyblinded. If it critically hits, the target is \\blinded instead of partially blinded.
                """,
            ),
            Subspell(
                level=2,
                name="Finger of Death",
                description="""
                    If the spell's attack critically hits, the target immediately dies.
                """,
                tags=['Death'],
            ),
            Subspell(
                level=4,
                name="Corruption of Blood and Bone",
                description="""
                    If the spell's attack succeeds, at the end of each round, the target takes life damage equal to your spellpower.
                    The target's maximum hit points are reduced by the amount of damage it takes in this way.
                    When the spell ends, the target's maximum hit points are restored.
                """,
            ),
            Subspell(
                level=5,
                name="Corrupting Curse",
                description="""
                    The spell's attack is made against Mental defense instead of Fortitude defense.
                    In addition, if it critically hits, the spell's effect becomes a permanent curse.
                    It is no longer a condition, and cannot be removed by abilities that remove conditions.
                    This is a \\glossterm<Curse> effect.
                """,
            ),
            Subspell(
                level=3,
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
        cantrip='The spell deals -1d damage and has no additional effects on a critical hit.',
        subspells=[
            Subspell(
                level=2,
                name="Drain Life",
                description="""
                    You gain temporary hit points equal to half the damage you deal with this spell.
                """,
            ),
            Subspell(
                level=3,
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
        cantrip='The spell deals -1d damage and has no additional effects on a critical hit.',
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
                level=1,
                name="Moderate Wounds",
                description="""
                    For every 5 points of healing, this spell can instead cure 1 vital damage.
                """,
            ),
            Subspell(
                level=1,
                name="Undead Bane",
                description="""
                    If the target is undead, the spell gains a +2 bonus to accuracy and deals double damage on a critical hit.
                """,
            ),
            Subspell(
                level=2,
                name="Serious Wounds",
                description="""
                    For every 2 points of healing, this spell can instead cure 1 vital damage.
                """,
            ),
            Subspell(
                level=3,
                name="Critical Wounds",
                description="""
                    For every point of healing, this spell can instead cure 1 vital damage.
                """,
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
                level=2,
                name="Complete",
                description="""
                    The damage reduction also applies against non-physical effects.
                """,
            ),
            Subspell(
                level=3,
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
            duration="sustain (swift)",
            tags=["Manifestation"],
        ),
        schools=['Conjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="The spell's duration becomes Sustain (standard).",
        subspells=[
            Subspell(
                level=1,
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
            """,
            duration='sustain (swift)',
            tags=['Scrying'],
        ),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="The sensor cannot be moved after it is originally created.",
        subspells=[
            Subspell(
                level=1,
                name="Auditory",
                description="""
                    At the start of each round, you can choose whether you hear from the sensor or from your body.
                    This choice is made independently from your sight.
                    The sensor's auditory acuity is the same as your own, except that it does not share the benefits of any \\glossterm<magical> effects that improve your hearing.
                """,
            ),
            Subspell(
                level=2,
                name="Accelerated",
                description="""
                    When you move the sensor, you can move it up to 100 feet, instead of up to 30 feet.
                """,
            ),
            Subspell(
                level=2,
                name="Dual",
                description="""
                    You create an additional sensor in the same location.
                    Whenever you see or hear from the perspective of a sensor, you choose which sensor to see or hear from.
                """,
            ),
            Subspell(
                level=2,
                name="Penetrating",
                description="""
                    The spell's range becomes \\rngunrestricted, allowing you to cast it into areas where you do not have \\glossterm<line of sight> or \\glossterm<line of effect>.
                """,
            ),
            Subspell(
                level=3,
                name="Autonomous",
                description="""
                    You can move the sensor as part of the action you take to sustain the spell, rather than as a standard action.
                """,
            ),
            Subspell(
                level=4,
                name="Scry Creature",
                targeting=Targeting(
                    target="One creature",
                    rng="Unlimited",
                    unrestricted_range=True,
                ),
                description="""
                    You must make a Spellpower vs. Mental attack against the target.
                    Success means the sensor appears in the creature's space.
                    Failure means the sensor does not appear at all.
                """,
            ),
            Subspell(
                level=5,
                name="Split Senses",
                description="""
                    You do not have to choose whether to sense from the perspective of a sensor or from the perspective of your own body.
                    You constantly receive sensory input from your body and all sensors you have created with this spell.
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
            duration='attune',
        ),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="The spell's duration becomes Sustain (swift).",
        subspells=[
            Subspell(
                level=6,
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
        cantrip="If your attack succeeds, you move the target one foot per spellpower. In addition, this has no additional effects on a critical hit.",
        subspells=[
            Subspell(
                level=1,
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
                level=2,
                name="Binding",
                description="""
                    If your attack roll beat both the target's Fortitude and Mental defenses, it is \\immobilized after the forced movement is finished.
                    This is a \\glossterm<condition>, and lasts until removed.
                """,
            ),
            Subspell(
                level=2,
                name="Levitate",
                targeting=Targeting(
                    target="One Medium or smaller unattended object or willing creature",
                    rng="close",
                ),
                effects=Effects(
                    effect="""
                        The target floats in midair, unaffected by gravity.
                        During the movement phase, you can move the target up to ten feet in any direction.
                    """,
                    duration="sustain (swift)",
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
            duration='attune',
            tags=['Glamer', 'Visual'],
        ),
        schools=['Illusion'],
        lists=['Arcane'],
        cantrip="The spell's duration becomes Sustain (swift).",
        subspells=[
            Subspell(
                level=2,
                name="Disguise Image",
                effects=Effects(
                    effect="""
                        You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
                        You gain a +5 bonus on the check, and you can freely alter the appearance of the target's clothes and equipment, regardless of their original form.
                        However, this effect is unable to alter the sound, smell, texture, or temperature of the target or its clothes and equipment.
                    """,
                    duration='attunement',
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

                        All targeted attacks against the target have a 50% miss chance.
                        Whenever an attack misses in this way, it affects an image, destroying it.

                        This augment can be applied multiple times.
                        The spell creates an additional illusory duplicate for each additional time this augment is applied.
                    """,
                    duration='sustain (swift)',
                    tags=['Figment', 'Visual'],
                ),
            ),
            Subspell(
                level=3,
                name="Shadow Mantle",
                description="""
                    The spell's deceptive nature extends beyond merely altering light to affect the nature of reality itself.
                    The spell's miss chance changes to a failure chance, and applies to non-physical attacks as well as physical attacks.
                    In addition, it loses the \\glossterm<Visual> tag, allowing it to affect creatures who do not rely on sight to affect the target.
                """,
            ),
            Subspell(
                level=4,
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
                    The target is \\partiallyblinded.
                """,
                critical="""
                    As above, and the target is \\blinded for 1 round.
                """,
            ),
            duration='condition',
            tags=['Figment', 'Light', 'Visual'],
        ),
        schools=['Illusion'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="The spell affects a single creature, rather than an area. In addition, it has no additional effects on a critical hit",
        subspells=[
            Subspell(
                level=1,
                name="Dancing Lights",
                effects=Effects(
                    effect="""
                        Up to four glowing lights appear in the area.
                        The lights resemble lanterns or torches, and shed bright light in the same 20 foot radius.
                        However, you can freely choose the color of the lights when you cast the spell.

                        During each movement phase, you can move the lights up to 100 feet in any direction.
                        If one of the lights ever goes out of range from you, it immediately winks out.
                    """,
                    duration="sustain (swift)",
                    tags=['Figment', 'Light', 'Visual'],
                ),
            ),
            Subspell(
                level=2,
                name="Faerie Fire",
                description="""
                    Each target is surrounded with a pale glow made of hundreds of ephemeral points of lights, causing it to bright light in a 5 foot radius as a candle.
                    The lights impose a -10 penalty to Stealth checks.
                    In addition, they reveal the outline of the creatures if they become \\glossterm<invisible>.
                    This allows observers to see their location, though not to see them perfectly.
                """,
            ),
            Subspell(
                level=2,
                name="Illuminating",
                description="""
                    The brilliant light persists as long as you spend a \\glossterm<swift action> each round to sustain it.
                    The light has no additional effects on creatures in the area.
                """,
            ),
            Subspell(
                level=1,
                name="Expanded",
                description="""
                    The spell's area increases to \\areasmall.
                    This allows the standard Widened augment to be used to expand the spell's area further.
                """,
            ),
            Subspell(
                level=4,
                name="Universal",
                description="""
                    The light radiates from every point in the area simultaneously, making it impossible to avoid.
                    The spell's attack is made against Fortitude instead of Reflex.
                """,
            ),
            Subspell(
                level=4,
                name="Blinding",
                description="""
                    The spell's critical effect makes the target \\blinded as a condition, rather than just for one round.
                    In addition, the blindness replaces the spell's normal success effect, rather than being applied in addition to it.
                """,
            ),
            Subspell(
                level=3,
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
    return sorted(spells, key=lambda spell: spell.name)


def sanity_check(spells):
    # Make sure that the right kinds of spells exist

    # Every spell source should have one spell of each category
    for category in SPELL_CATEGORIES:
        has_spell = {source: False for source in SPELL_SOURCES}
        for spell in spells:
            if spell.category == category:
                for source in spell.lists:
                    if source in has_spell:
                        has_spell[source] = True
        for source in SPELL_SOURCES:
            if not has_spell[source]:
                warn(f"Source {source} has no spell for {category}")

    # Every spell source should have both single target and multi damage spells
    # that target every defense
    for defense in DEFENSES:
        has_damage = {source: False for source in SPELL_SOURCES}
        # Every source should also have debuffs against every defense
        has_debuff = {source: False for source in SPELL_SOURCES}
        for spell in spells:
            if spell.effects.attack and spell.effects.attack.defense == defense:
                if spell.category == 'damage':
                    for source in spell.lists:
                        if source in SPELL_SOURCES:
                            has_damage[source] = True
                elif spell.category[:6] == 'debuff':
                    for source in spell.lists:
                        if source in SPELL_SOURCES:
                            has_debuff[source] = True

        for source in SPELL_SOURCES:
            if not has_damage[source]:
                warn(f"Source {source} has no damage spell against {defense}")
            if not has_debuff[source]:
                warn(f"Source {source} has no debuff spell against {defense}")

    # Every spell school should have at least two unique categories of
    # spells
    categories_in_school = {school: {} for school in SCHOOLS}
    for spell in spells:
        for school in spell.schools:
            categories_in_school[school][spell.category] = True
    for school in SCHOOLS:
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
