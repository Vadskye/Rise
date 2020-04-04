from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: debuff
# Secondary: damage
# Tertiary: utility
# None: buff
delusion=MysticSphere(
    name="Delusion",
    short_description="Instill false emotions to influence creatures",
    cantrips=[
        Effects('Cheer', 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target's mood improves and it feels more cheerful.

            \\rankline
            \\rank<3> The range increases to \\rngmed.
            \\rank<5> You may target an additional ally within range.
            \\rank<7> The range increases to \\rnglong.
        """, tags=['Emotion', 'Sustain (free)']),
    ],
    lists=['Arcane', 'Divine', 'Pact'],
    spells=[
        Spell('Terror', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\shaken by you as a \\glossterm<condition>.
            \\crit The target is \\glossterm<panicked> by you as a \\glossterm<condition>.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Emotion']),
        Spell('Panic', 6, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\panicked by you as a \\glossterm<condition>.

            \\rankline
            \\rank<8> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=['Emotion']),
        Spell('Fearsome Aura', 3, '\\glossterm<Enemies> in the area (see text)', """
            You radiate an aura of fear in a \\areamed radius \\glossterm<emanation> from you.
            When you attune to this spell, and during each \\glossterm<action phase> in subsequent rounds, make an attack vs. Mental against each target.
            You cannot make this attack more than once against any individual target during this spell's duration.
            \\hit Each target is \\glossterm<shaken> by you as a \\glossterm<condition>.

            \\rankline
            \\rank<5> The area increases to a \\arealarge radius \\glossterm<emanation>.
            \\rank<7> The area increases to a \\areahuge radius \\glossterm<emanation>.
        """, tags=['Attune (self)', 'Emotion']),
        # Math: at 1st level, power is probably ~2, so standard damage is probably 2d6.
        # Casting this spell and then two standard damage spells deals 4d6+2d8 = 23 damage
        # casting three standard damage spells deals 6d6 = 21 damage
        # So when fighting alone, this takes 3 rounds of effectiveness to be equal
        # in power to a simple damage spell.

        # At 20th level, power is ~22, so standard damage is 9d10
        # Casting this spell and then two standard damage spells deals 18d10+7d10=25d10
        # Casting three standard damage spells deals 27d10
        Spell('Agony', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is inflicted with agonizing pain as a \\glossterm<condition>.
            It takes a -2 penalty to Mental defense.
            % Does this need to clarify that it takes effect in the round the spell was cast?
            In addition, at the end of each \\glossterm<round>, if the target was \\glossterm<wounded> that round, it loses a \\glossterm<hit point>.
        """, tags=['Emotion']),
        Spell('Redirected Terror', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\shaken by an \\glossterm<ally> of your choice within range as a \\glossterm<condition>.
            \\crit As above, except that the target is \\panicked instead of shaken.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Emotion']),
        Spell('Charm', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\charmed by you.
            Any act by you or by creatures that appear to be your allies that threatens or damages the charmed person breaks the effect.
            An observant target may interpret overt threats to its allies as a threat to itself.

            \\rankline
            \\rank<5> You may target two creature within range.
            \\rank<7> You may target three creatures within range.
        """, tags=['Sustain (minor)', 'Emotion', 'Subtle']),
        Spell('Amnesiac Charm', 6, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\charmed by you.
            Any act by you or by creatures that appear to be your allies that threatens or damages the \\spell<charmed> person breaks the effect.
            When this effect ends, the target forgets all events that transpired during the spell's duration.
            It becomes aware of its surroundings as if waking up from a daydream.
            The target is not directly aware of any magical influence on its mind, though unusually paranoid or perceptive creatures may deduce that their minds were affected.

            \\rankline
            \\rank<8> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=['Sustain (minor)', 'Emotion', 'Subtle']),
        Spell('Calm Emotions', 3, 'All creatures within a \\arealarge radius from you', """
            Make an attack vs. Mental against each target.
            \\hit Each target has its emotions calmed.
            The effects of all other \\glossterm<Emotion> abilities on that target are \\glossterm<suppressed>.
            It cannot take violent actions (although it can defend itself) or do anything destructive.
            If the target takes damage or feels that it is in danger, this effect is \\glossterm<dismissed>.

            \\rankline
            \\rank<5> The area increases to a \\areahuge radius.
            \\rank<7> The area increases to a \\areaext radius.
        """, tags=['Emotion', 'Sustain (standard)']),
        Spell('Enrage', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit As a \\glossterm<condition>, the target is unable to take any \\glossterm<standard actions> that do not cause it to make an attack.
            For example, it could make a \\glossterm<strike> or cast an offensive spell, but it could not heal itself or summon a creature.

            \\rankline
            \\rank<3> The accuracy bonus increases to +3.
            \\rank<5> The accuracy bonus increases to +4.
            \\rank<7> The accuracy bonus increases to +5.
        """, tags=['Emotion']),
        Spell('Mass Enrage', 6, '\\glossterm<Enemies> in a \\areamed radius within \\rngmed range', """
            Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against each target.
            \\hit As a \\glossterm<condition>, each target is unable to take any \\glossterm<standard actions> that do not cause it to make an attack.
            For example, it could make a \\glossterm<strike> or cast an offensive spell, but it could not heal itself or summon a creature.

            \\rankline
            \\rank<8> The range increases to \\rnglong.
        """, tags=['Emotion']),
        Spell('Demotivate', 1, 'One creature within \\rngmed range', """
            Make an attack vs Mental with a +3 bonus against the target.
            \\hit As a \\glossterm<condition>, the target takes a -2 penalty to Mental defense.

            \\rankline
            \\rank<3> The penalty increases to -3.
            \\rank<5> The penalty increases to -4.
            \\rank<7> The penalty increases to -5.
        """, tags=['Emotion']),
        Spell('Motivate', 1, 'Yourself or one \\glossterm<ally> within \\rngmed range', """
            The target gains a +2 bonus to Mental defense.

            \\rankline
            \\rank<3> The bonus increases to +3.
            \\rank<5> The bonus increases to +4.
            \\rank<7> The bonus increases to +5.
        """, tags=['Attune (target)']),
    ],
    category='debuff, combat',
)
