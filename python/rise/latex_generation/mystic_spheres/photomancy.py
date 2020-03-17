from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Too narrow?
# Primary: debuff
# Secondary: utility
# None: buff, damage
photomancy=MysticSphere(
    name="Photomancy",
    short_description="Create bright light to blind foes and illuminate your surroundings",
    cantrips=[
        Effects('Illuminate', 'One location within \\rngmed range', """
            A glowing light appears in midair in the target location.
            It casts bright light in up to a 20 foot radius and dim light in twice that radius.
            This effect lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.

            \\rankline
            \\rank<3> The maximum radius of bright light increases to 50 feet.
            \\rank<5> The maximum radius of bright light increases to 100 feet.
            \\rank<7> The maximum radius of bright light increases to 200 feet.
        """, tags=['Sensation', 'Visual']),
    ],
    lists=['Arcane', 'Divine', 'Nature', 'Pact'],
    spells=[
        Spell('Flash', 1, 'One creature within \\rngmed range', """
            A burst of light flashes in front of a creature's eyes.
            Bright light illuminates a 50 foot radius around a location in the target's space until the end of the round.
            In addition, make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<dazzled> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<blinded> as a \\glossterm<condition>.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Sensation', 'Visual']),
        Spell('Searing Light', 1, 'One creature within \\rngclose range', """
            A ray of light flashes between you and the target.
            Bright light illuminates a 50 foot radius around the path the ray took until the end of the round.
            In addition, make an attack vs. Reflex against the target.
            \\hit The target takes energy \\glossterm<standard damage> +1d.

            % This intentionally gives accuracy instead of the more common damage because photomancy isn't supposed to be
            % a high-damage mystic sphere
            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Sensation', 'Visual']),
        Spell('Solar Ray', 4, 'One creature within \\rngclose range', """
            A ray of light flashes between you and the target.
            Bright light illuminates a 50 foot radius around the path the ray took until the end of the round.
            In addition, make an attack vs. Reflex against the target.
            \\hit The target takes energy \\glossterm<standard damage> +2d.
            In addition, the target suffers consequences as if it had been struck by a beam of true sunlight.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=['Sensation', 'Visual']),
        Spell('Blinding Flash', 6, 'One creature within \\rngclose range', """
            A burst of light flashes in front of a creature's eyes.
            Bright light illuminates a 50 foot radius around a location in the target's space until the end of the round.
            In addition, make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.

            \\rankline
            \\rank<8> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=['Sensation', 'Visual']),
        Spell('Lightburst', 4, 'All creatures in the area (see text)', """
            A burst of light light fills a \\areasmall radius \\glossterm<zone> within \\rngmed range of you.
            Bright light illuminates a 100 foot radius around the area until the end of the round.
            In addition, make an attack vs. Fortitude against each target creature.
            \\hit Each target is \\dazzled as a \\glossterm<condition>.

            \\rankline
            \\rank<6> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=['Sensation', 'Visual']),
        Spell('Sunburst', 6, 'All creatures in the area (see text)', """
            A burst of light light fills a \\areamed radius \\glossterm<zone> within \\rngmed range of you.
            Bright light illuminates a 100 foot radius around the area until the end of the round.
            In addition, make an attack vs. Fortitude against each target creature.
            \\hit Each target is \\dazzled as a \\glossterm<condition>.
            In addition, each target is affected as if it had entered natural sunlight.

            \\rankline
            \\rank<8> The area increases to a \\arealarge radius.
        """, tags=['Sensation', 'Visual']),
        Spell('Pillars of Light', 8, 'All creatures in the area (see text)', """
            A burst of light light fills up to five \\areasmall radius \\glossterm<zones> within \\rngmed range of you.
            Bright light illuminates a 100 foot radius around each area until the end of the round.
            In addition, make an attack vs. Fortitude against each target creature.
            \\hit Each target is \\dazzled as a \\glossterm<condition>.
        """, tags=['Sensation', 'Visual']),
        Spell('Kaleidoscopic Pattern', 5, 'All creatures in the area (see text)', """
            This spell creates a brilliant, rapidly shifting rainbow of lights in a \\areasmall radius within \\rngmed range of you.
            They illuminate a 100 foot radius around the area with bright light until the end of the round.
            In addition, make an attack vs. Mental against each target creature.
            \\hit Each target is \\dazed as a \\glossterm<condition>.
            \\crit Each target is \\disoriented as a \\glossterm<condition>.

            \\rankline
            \\rank<7> The area increases to a \\areamed radius.
        """, tags=['Compulsion', 'Sensation', 'Visual']),
        Spell('Faerie Fire', 1, 'All creatures in a \\areasmall radius within \\rngmed range of you', """
            Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against each target.
            \\hit As a \\glossterm<condition>, each target radiates bright light in a 5 foot radius, as a candle.
            The lights impose a -10 penalty to the Stealth skill.

            \\rankline
            \\rank<3> The accuracy bonus increases to +3.
            \\rank<5> The accuracy bonus increases to +4.
            \\rank<7> The accuracy bonus increases to +5.
        """, tags=['Sensation', 'Visual']),
        Spell('Darkness', 4, None, """
            All light is suppressed within a \\areamed \\glossterm<zone> within \\rngmed range.
            Abilities that work without light, such as \\glossterm<darkvision>, still function normally in the area.

            \\rankline
            \\rank<6> The area increases to a \\arealarge radius.
            \\rank<8> The area increases to a \\areahuge radius.
        """, tags=['Sensation', 'Visual']),
    ],
    rituals=[
        Spell('Mobile Light', 1, 'Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngclose range', """
            The target glows like a torch, shedding bright light in a \\areamed radius (and dim light for an additional 20 feet).

            This ritual takes one minute to perform.
        """, tags=['Attune (ritual)', 'Sensation']),
        Spell('Permanent Light', 3, 'One Medium or smaller unattended object within \\rngclose range', """
            This ritual functions like the \\spell<mobile light> ritual, except that it loses the \\glossterm<Attune> (ritual) tag and the effect lasts permanently.
            In addition, it can only target objects.
            This ritual takes 24 hours to perform, and it requires 8 action points from its participants.
        """, tags=['AP', 'Sensation']),
    ],
    category='debuff, combat',
)
