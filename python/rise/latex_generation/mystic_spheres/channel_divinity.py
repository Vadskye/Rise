from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects



# This spell is problematic
# Primary: damage
# None: buff, debuff, utility
channel_divinity=MysticSphere(
    name="Channel Divinity",
    short_description="Invoke divine power to smite foes and gain power",
    cantrips=[
        Effects('Testament', 'Yourself', """
            The magical essence of your deity or alignment is overlayed on your body as an aura.
            This channels your deity if you are a cleric, or your alignment if you are a paladin.
            In either case, you gain the ability to see the auras of other creatures using this spell if they are within \\rngclose range.
            If you see another creature with the same aura as you, this spell grants you the unerring knowledge of that similarity.
            This can allow you to identify other followers of your deity or alignment with certainty.

            \\rankline
            \\rank<3> The range increases to \\rngmed.
            \\rank<5> If you are a cleric, you can also unerringly see an aura around creatures who worship your deity.
                If you are a paladin, you can also unerringly see an aura around creatures who share your devoted alignment.
            \\rank<7> The range increases to \\rngext.
        """, tags=['Sustain (free)']),
    ],
    lists=['Divine'],
    spells=[
        Spell('Divine Judgment', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target takes energy \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Glimpse of Divinity', 5, 'One creature within \\rngclose range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.
        """, tags=[]),
        Spell('Word of Faith', 1, '\\glossterm<Enemies> in a \\areasmall radius from you', """
            Make an attack vs. Mental against each target.
            \\hit Each target takes energy \\glossterm<standard damage>.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
        """, tags=[]),
        Spell('Proclamation', 3, '\\glossterm<Enemies> in a \\areamed radius from you', """
            Make an attack vs. Mental against each target.
            \\hit Each target takes energy \\glossterm<standard damage>.

            \\rankline
            \\rank<5> The area increases to a \\arealarge radius.
            \\rank<7> The area increases to a \\areahuge radius.
        """, tags=[]),
        Spell('Mantle of Faith', 4, 'Yourself', """
            You gain a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<physical> damage.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The bonus also applies against \\glossterm<energy> damage.
            \\rank<8> The bonus increases to be equal to your \\glossterm<power>.
        """, tags=['Attune (self)']),
        Spell('Divine Might', 4, 'Yourself', """
            You increase your size by one \\glossterm<size category>.
            This increases your \\glossterm<base speed> and reduces your \\glossterm<Stealth> skill.
            It may also increase your \\glossterm<reach> (see \\pcref<Size in Combat>).
            However, your physical form is not altered fully to match its new size, and your Strength and Dexterity are unchanged.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> You also gain a +2 \\glossterm<magic bonus> to Strength.
            \\rank<8> You can increase your size by two size categories instead of one.
        """, tags=['Attune (self)']),
        Spell('Divine Presence', 3, '\\glossterm<Enemies> in the area (see text)', """
            You radiate an aura that invokes a fear of your divine connection in a \\areamed radius \\glossterm<emanation> from you.
            When you attune to this spell, and during each \\glossterm<action phase> in subsequent rounds, make an attack vs. Mental against each target.
            You cannot make this attack more than once against any individual target during this spell's duration.
            \\hit Each target is \\glossterm<shaken> by you as a \\glossterm<condition>.

            \\rankline
            \\rank<5> The area increases to a \\arealarge radius \\glossterm<emanation>.
            \\rank<7> The area increases to a \\areahuge radius \\glossterm<emanation>.
        """, tags=['Attune (self)', 'Emotion']),
        Spell('Faithful Endurance', 1, 'Yourself', """
            The first time you gain a \\glossterm<vital wound> during this effect, you gain a +2 bonus to its \\glossterm<wound roll>.
            The \\glossterm<wound roll> for that \\glossterm<vital wound> cannot be modified again.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The bonus increases to +3.
            \\rank<5> The bonus increases to +4.
            \\rank<7> The bonus increases to +5.
        """, tags=['Attune (self)']),
        Spell('Divine Favor', 3, 'Yourself', """
            You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with all attacks.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<5> You also gain a +2 \\glossterm<magic bonus> to Mental defense.
            \\rank<7> The bonus to \\glossterm<accuracy> increases to +2.
        """, tags=['Attune (self)']),
        Spell('Divine Power', 3, 'Yourself', """
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<power>.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<5> You also gain a +2 \\glossterm<magic bonus> to Fortitude defense.
            \\rank<7> The bonus to \\glossterm<power> increases to +4.
        """, tags=['Attune (self)']),
        Spell('Divine Offering', 6, 'Yourself', """
            When you cast this spell, you gain a \\glossterm<vital wound> that has no wound effect.
            In exchange, you gain a +4 bonus to \\glossterm<wound rolls> and become immune to \\glossterm<conditions>.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<8> The bonus to \\glossterm<wound rolls> increases to +6.
        """, tags=['Sustain (free)']),
    ],
    rituals=[
        Spell('Consecrate', 3, None, """
            The area within an \\arealarge radius \\glossterm<zone> from your location becomes sacred to your deity.
            % TODO: what cares about consecration?
            This has no tangible effects by itself, but some special abilities and monsters behave differently in consecrated areas.

            This ritual takes 24 hours to perform and requires 8 action points from its ritual participants.
        """, tags=['Attune (self)']),
        Spell('Divine Transit', 5, 'Up to five Medium or smaller ritual participants', """
            Choose a destination up to 100 miles away from you on your current plane.
            Each target is teleported to the temple or equivalent holy site to your deity that is closest to the chosen destination.

            You must specify the destination with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the destination.
            If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
            The new destination will be one that more closely resembles your mental image.
            If no such area exists, the ritual simply fails.
            % TODO: does this need more clarity about what teleportation works?

            This ritual takes 24 hours to perform and requires 32 action points from its ritual participants.
        """, tags=['AP']),
    ],
    category='damage',
)
