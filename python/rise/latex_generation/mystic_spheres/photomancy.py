from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Too narrow?
# Primary: debuff
# Secondary: utility
# None: buff, damage
photomancy=MysticSphere(
    name="Photomancy",
    short_description="Create and manipulate light to hinder foes and conceal allies",
    cantrips=[
        Effects('Beautify', 'Yourself', """
            You alter your appearance in minor ways.
            This functions like the \\textit<disguise creature>  ability with a +4 bonus, except that you cannot change the appearance of your equipment, species, creature type, or number of limbs (see \pcref{Disguise Creature}).
            This ability is commonly used to hide blemishes or to appear younger or older than one's true age.

            This ability lasts until you use it again.

            \\rankline
            \\rank<3> The bonus increases to +6.
            \\rank<5> The bonus increases to +8.
            \\rank<7> The bonus increases to +10.
        """, tags=['Sensation', 'Visual']),
        Effects('Illuminate', 'One location within \\rngmed range', """
            A glowing light appears in midair in the target location.
            It creates \\glossterm<bright illumination> in a radius of your choice, up to a 20 foot radius, and \\glossterm<shadowy illumination> in twice that radius.
            This effect lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.

            \\rankline
            \\rank<3> The maximum radius of bright light increases to 50 feet.
            \\rank<5> The maximum radius of bright light increases to 100 feet.
            \\rank<7> The maximum radius of bright light increases to 200 feet.
        """, tags=['Sensation', 'Visual']),
    ],
    lists=['Arcane', 'Divine', 'Nature', 'Pact'],
    spells=[
        Spell('Wall of Light', 1, None, """
            You create a wall of light in a 20 ft.\\ high, \\areamed line within \\rngmed range.
            If you create the wall within a space too small to hold it, it fills as much of the space as possible, allowing you to completely block off small tunnels.
            The wall is visible as a solid block of light that blocks sight.
            It does not inhibit the passage of objects or creatures.

            \\rankline
            \\rank<3> The area increases to a \\arealarge line.
            \\rank<5> The range increases to \\rnglong.
            \\rank<7> The area increases to a \\areahuge line.
        """, tags=['Sensation', 'Sustain (minor)']),
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
        Spell('Searing Light', 1, 'One creature within \\rngmed range', """
            A ray of light flashes between you and the target.
            Bright light illuminates a 50 foot radius around the path the ray took until the end of the round.
            In addition, make an attack vs. Reflex against the target.
            \\hit The target takes energy \\glossterm<standard damage>.

            % This intentionally gives accuracy instead of the more common damage because photomancy isn't supposed to be
            % a high-damage mystic sphere
            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Sensation', 'Visual']),
        Spell('Solar Ray', 4, 'One creature within \\rngmed range', """
            A ray of light flashes between you and the target.
            Bright light illuminates a 100 foot radius around the path the ray took until the end of the round.
            In addition, make an attack vs. Reflex against the target.
            \\hit The target takes energy \\glossterm<standard damage> +1d.
            In addition, the target suffers consequences as if it had been struck by a beam of true sunlight.

            \\rankline
            \\rank<6> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=['Sensation', 'Visual']),
        Spell('Blinding Flash', 6, 'One creature within \\rngclose range', """
            A burst of light flashes in front of a creature's eyes.
            Bright light illuminates a 50 foot radius around a location in the target's space until the end of the round.
            In addition, make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.

            \\rankline
            \\rank<8> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=['Sensation', 'Visual']),
        Spell('Lightburst', 3, 'All creatures in the area (see text)', """
            A burst of light light fills a \\areasmall radius \\glossterm<zone> within \\rngmed range of you.
            Bright light illuminates a 100 foot radius around the area until the end of the round.
            In addition, make an attack vs. Fortitude against each target creature.
            \\hit Each target is \\dazzled as a \\glossterm<condition>.

            \\rankline
            \\rank<6> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=['Sensation', 'Visual']),
        Spell('Sunburst', 5, 'All creatures in the area (see text)', """
            A burst of light light fills a \\areamed radius \\glossterm<zone> within \\rngmed range of you.
            Bright light illuminates a 100 foot radius around the area until the end of the round.
            In addition, make an attack vs. Fortitude against each target creature.
            \\hit Each target is \\dazzled as a \\glossterm<condition>.
            In addition, each target is affected as if it had entered natural sunlight.

            \\rankline
            \\rank<8> The area increases to a \\arealarge radius.
        """, tags=['Sensation', 'Visual']),
        Spell('Pillars of Light', 7, 'All creatures in the area (see text)', """
            A burst of light light fills up to five \\areasmall radius \\glossterm<zones> within \\rngmed range of you.
            Bright light illuminates a 100 foot radius around each area until the end of the round.
            In addition, make an attack vs. Fortitude against each target creature.
            \\hit Each target is \\dazzled as a \\glossterm<condition>.
        """, tags=['Sensation', 'Visual']),
        Spell('Kaleidoscopic Pattern', 4, 'All creatures in the area (see text)', """
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
        Spell('Blur', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target's physical outline is distorted so it appears blurred, shifting, and wavering.
            It gains a +1 \\glossterm<magic bonus> to Armor defense and a +2 \\glossterm<magic bonus> to the Stealth skill.
            This effect provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The bonus to Stealth increases to +3.
            \\rank<5> The bonus to Armor defense increases to +2.
            \\rank<7> The bonus to Stealth increases to +4.
        """, tags=['Attune (target)', 'Sensation', 'Visual']),
        Spell('Disguise Image', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
            You gain a +4 bonus on the check, and you can freely alter the appearance of the target's clothes and equipment, regardless of their original form.
            However, this effect is unable to alter the sound, smell, texture, or temperature of the target or its clothes and equipment.

            \\rankline
            \\rank<5> The bonus increases to +6.
            \\rank<7> The bonus increases to +8.
        """, tags=['Attune (target)', 'Sensation', 'Visual']),
        Spell('Mirror Image', 3, 'Yourself', """
            Four illusory duplicates appear around you that mirror your every move.
            The duplicates shift chaotically in your space, making it difficult to identify your real location.

            All \\glossterm<targeted> against you have a 50\\% miss chance.
            When an attack misses in this way, it affects an image, destroying it.
            This ability provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.

            \\rankline
            \\rank<5> At the end of each round, if no images were destroyed that round, a destroyed image respawns.
            \\rank<7> At the end of each round, a destroyed image respawns.
        """, tags=['Attune (self)', 'Sensation', 'Visual']),
        Spell('Displacement', 8, 'Yourself', """
            Your image appears to be two to three feet from its real location.
            \\glossterm<Mundane> \\glossterm<targeted> attacks against you suffer a 50\\% miss chance.
            This ability provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.
        """, tags=['Sensation', 'Visual']),
        Spell('Illusory Twin', 1, None, """
            You create an illusory duplicate of yourself overlayed on your body.
            Whenever you move, you may also move the illusory duplicate the same distance in any direction.
            If the duplicate was sharing a space with you before this movement, onlookers cannot tell which is the real you and which is the duplicate.
            When the duplicate is attacked by a \\glossterm<targeted> attack, it is destroyed.
            At the end of each round, if the duplicate is outside of \\rngmed range from you, it is destroyed.
            This effect ends when there are no duplicates remaining.

            \\rankline
            \\rank<3> The maximum range increases to \\rnglong.
            \\rank<5> You can create a second duplicate of yourself.
            \\rank<7> The maximum range increases to \\rngext.
        """, tags=['Sustain (minor)']),
    ],
    rituals=[
        Spell('Mobile Light', 1, 'Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngmed range', """
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
