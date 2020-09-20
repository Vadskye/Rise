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
            This represents your deity if you are a cleric, or your alignment if you are a paladin.
            In either case, you gain the ability to see the auras of other creatures using this spell if they are within \\rngclose range.
            If you see another creature with the same aura as you, this spell grants you the unerring knowledge of that similarity.
            This can allow you to identify other followers of your deity or alignment with certainty.

            This spell lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.

            \\rankline
            \\rank<3> The range increases to \\rngmed.
            \\rank<5> If you are a cleric, you can also unerringly see an aura around creatures who worship your deity.
                If you are a paladin, you can also unerringly see an aura around creatures who share your devoted alignment.
            \\rank<7> The range increases to \\rngext.
        """, tags=[]),
    ],
    lists=['Divine'],
    spells=[
        Spell('Faith Rewarded', 3, 'Yourself', """
            At the end of the next round, you become infused with divine power.
            You remove one \\glossterm<condition> affecting you and heal one \\glossterm<hit point>.
            This cannot remove a condition applied during that round.
            In addition, you gain a +4 bonus to \\glossterm<accuracy> during the round after you become infused with divine power.

            \\rankline
            \\rank<5> The accuracy bonus increases to +5.
            \\rank<7> You can remove two conditions instead of one.
        """, tags=[]),
        Spell('Divine Authority', 1, 'Yourself', """
            You gain a +3 \\glossterm<magic bonus> to the Persuasion skill.

            \\rankline
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +5.
            \\rank<7> The bonus increases to +6.
        """, tags=['Attune (self)']),
        Spell('Agent of the Divine', 6, 'Yourself', """
            You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> and all \\glossterm<defenses>.
            In addition, you gain a +2 \\glossterm<magic bonus> to \\glossterm<power>.

            \\rankline
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=['Attune (self)']),
        Spell('Endurance of the Faithful', 3, 'Yourself', """
            This spell does not have the \\glossterm<Focus> tag.
            You gain a bonus equal to twice your \\glossterm<power> to \\glossterm<resistances> this round.
            Because this ability has the \\glossterm<Swift> tag, this improves your resistances against damage you take during the current phase.

            \\rankline
            \\rank<5> The bonus increases to be equal to three times your \\glossterm<power>.
            \\rank<7> The bonus increases to be equal to four times your \\glossterm<power>.
        """, tags=['Swift'], focus=False),
        Spell('Divine Wrath', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target takes energy \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Glimpse of Divinity', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<dazzled> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<blinded> as a \\glossterm<condition>.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=[]),
        Spell('Face of Divinity', 6, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\shaken by you as a \\glossterm<condition>.
            \\crit The target is \\glossterm<panicked> by you as a \\glossterm<condition>.

            \\rankline
            \\rank<8> The range increases to \\rnglong.
        """, tags=[]),
        Spell('Judge Unworthy', 2, 'One creature within \\rngmed range', """
            Make an attack vs. Mental with a +2 bonus against the target.
            \\hit As a \\glossterm<condition>, the target takes a -2 penalty to Mental defense.
            \\crit As above, except that the penalty increases to -5.

            \\rankline
            \\rank<4> The accuracy bonus increases to +4.
            \\rank<6> The accuracy bonus increases to +6.
            \\rank<8> The accuracy bonus increases to +8.
        """, tags=[]),
        Spell('Fear of the Divine', 1, 'One creature within \\rngclose range', """
            Make an attack vs. Mental with a +1 bonus to \\glossterm<accuracy> against the target.
            \\hit The target is \\shaken by you as a \\glossterm<condition>.
            \\crit The target is \\glossterm<panicked> by you as a \\glossterm<condition>.

            \\rankline
            \\rank<3> The accuracy bonus increases to +2.
            \\rank<5> The accuracy bonus increases to +3.
            \\rank<7> The accuracy bonus increases to +4.
        """, tags=[]),
        Spell('Word of Faith', 1, '\\glossterm<Enemies> in a \\areasmall radius from you', """
            Make an attack vs. Mental against each target.
            \\hit Each target takes energy \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage>.
            \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=[]),
        Spell('Proclamation', 3, '\\glossterm<Enemies> in a \\areamed radius from you', """
            Make an attack vs. Mental against each target.
            \\hit Each target takes energy \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<5> The area increases to a \\arealarge radius.
            \\rank<7> The area increases to a \\areahuge radius.
        """, tags=[]),
        Spell('Mantle of Faith', 1, 'Yourself', """
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<resistances>.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to be equal to half your \\glossterm<power>.
            \\rank<7> The bonus increases to be equal to your \\glossterm<power>.
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
            You radiate an aura in a \\areasmall radius \\glossterm<emanation> from you that invokes a fear of your divine connection.
            When you attune to this spell, and during each \\glossterm<action phase> in subsequent rounds, make an attack vs. Mental against each target.
            After you attack a creature this way, it becomes immune to this ability from you until it takes a \\glossterm<short rest>.
            \\hit Each target is \\glossterm<shaken> by you as a \\glossterm<condition>.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Attune (self)', 'Emotion']),
        Spell('Faithful Endurance', 3, 'Yourself', """
            You gain a +1 \\glossterm<magic bonus> to \\glossterm<vital rolls> (see \\pcref<Vital Rolls>).

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<5> The bonus increases to +2.
            \\rank<7> The bonus increases to +3.
        """, tags=['Attune (self)']),
        Spell('Divine Conduit', 2, 'Yourself', """
            You reduce your \\glossterm<focus penalty> with divine spells by 2.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<4> You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with divine spells.
            \\rank<6> You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with divine spells.
            \\rank<8> The power bonus increases to +4.
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
            When you cast this spell, you gain a \\glossterm<vital wound> that has no vital wound effect.
            In exchange, you gain a +4 \\glossterm<magic bonus> to \\glossterm<vital rolls> and become immune to \\glossterm<conditions>.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<8> The bonus to \\glossterm<vital rolls> increases to +6.
        """, tags=['Sustain (free)']),
        Spell('Divine Seal', 4, 'Creatures in a \\areasmall radius \\glossterm<zone> within \\rngmed range', """
            You seal an area with divine power, limiting its connection to divine powers.
            Whenever a creature casts a divine spell in the area, if that creature does not share your deity (for clerics) or devoted alignment (for paladins), it has a 50\% chance to \\glossterm<miscast> the spell.

            \\rankline
            \\rank<6> The area increases to a \\areamed radius.
            \\rank<8> The area increases to a \\arealarge radius.
        """, tags=['Sustain (minor)']),
    ],
    rituals=[
        Spell('Consecrate', 3, None, """
            The area within an \\arealarge radius \\glossterm<zone> from your location becomes sacred to your deity.
            % TODO: what cares about consecration?
            This has no tangible effects by itself, but some special abilities and monsters behave differently in consecrated areas.
        """, tags=['Attune (self)'], ritual_time='24 hours'),
        Spell('Divine Transit', 5, 'Up to five Medium or smaller ritual participants', """
            Choose a destination up to 100 miles away from you on your current plane.
            Each target is teleported to the temple or equivalent holy site to your deity that is closest to the chosen destination.

            You must specify the destination with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the destination.
            If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
            The new destination will be one that more closely resembles your mental image.
            If no such area exists, the ritual simply fails.
            % TODO: does this need more clarity about what teleportation works?
        """, tags=[], ritual_time='24 hours'),
    ],
    category='damage',
)
