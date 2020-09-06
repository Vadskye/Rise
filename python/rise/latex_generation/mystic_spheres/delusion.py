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
        Spell('Mass Terror', 1, '\\glossterm<Enemies> in a \\areamed radius within \\rngmed range', """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\glossterm<shaken> by you until the end of the next round.
            \\crit Each target is \\glossterm<shaken> by you as a \\glossterm<condition>.

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
        Spell('Agony', 2, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is inflicted with agonizing pain as a \\glossterm<condition>.
            % Does this need to clarify that it takes effect in the round the spell was cast?
            At the end of each \\glossterm<round>, if the target was \\glossterm<wounded> that round, it loses a \\glossterm<hit point>.

            \\rankline
            \\rank<4> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<6> The accuracy bonus increases to +2.
            \\rank<8> The accuracy bonus increases to +3.
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
        Spell('Enrage', 2, 'One creature within \\rngmed range', """
            Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit As a \\glossterm<condition>, the target takes a -2 penalty to Armor defense and is unable to take any \\glossterm<standard actions> that do not cause it to make an attack.
            For example, it could make a \\glossterm<strike> or cast an offensive spell, but it could not heal itself or summon a creature.

            \\rankline
            \\rank<4> The accuracy bonus increases to +3.
            \\rank<6> The accuracy bonus increases to +4.
            \\rank<8> The accuracy bonus increases to +5.
        """, tags=['Emotion']),
        Spell('Deaden Emotions', 2, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit As a \\glossterm<condition>, the target is unable to take any \\glossterm<standard actions> that it to make an attack.
            If it loses any \\glossterm<hit points> or is otherwise harmed, including subjective pain or discomfort, this effect is automatically broken.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Emotion']),
        Spell('Mass Enrage', 4, '\\glossterm<Enemies> in a \\areamed radius within \\rngmed range', """
            Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against each target.
            \\hit As a \\glossterm<condition>, each target takes a -2 penalty to Armor defense and is unable to take any \\glossterm<standard actions> that do not cause it to make an attack.
            For example, it could make a \\glossterm<strike> or cast an offensive spell, but it could not heal itself or summon a creature.

            \\rankline
            \\rank<6> The range increases to \\rnglong.
            \\rank<8> The area increases to a \\arealarge radius.
        """, tags=['Emotion']),
        Spell('Enticing Target', 3, '\\glossterm<Enemies> in the area (see text)', """
            You radiate an aura in a \\areasmall radius \\glossterm<emanation> from you that encourages your enemies to attack you.
            When you attune to this spell, and during each \\glossterm<action phase> in subsequent rounds, make an attack vs. Mental against each target.
            You cannot make this attack more than once against any individual target during this spell's duration.
            \\hit Each target is \\glossterm<goaded> by you as a \\glossterm<condition>.

            \\rankline
            \\rank<5> The area increases to a \\areamed radius \\glossterm<emanation>.
            \\rank<7> The area increases to a \\arealarge radius \\glossterm<emanation>.
        """, tags=['Attune (self)', 'Emotion']),
        Spell('Curse of Phobia', 3, 'One creature within \\rngmed range', """
            When you cast this spell, choose one of the following fears: blood (including any \\glossterm<bloodied> creature, even the target), darkness (any location that does not have \\glossterm<bright illumination>), heights (any drop more 10 feet high), insects, snakes, or water.
            Make an attack vs. Mental against the target.
            \\hit The is \\glossterm<shaken> by all sources of your chosen fear until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until this curse is removed.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Demotivate', 2, 'One creature within \\rngmed range', """
            Make an attack vs. Mental with a +3 bonus against the target.
            \\hit As a \\glossterm<condition>, the target takes a -2 penalty to Mental defense.
            \\crit As above, except that the penalty increases to -5.

            \\rankline
            \\rank<4> The accuracy bonus increases to +5.
            \\rank<6> The accuracy bonus increases to +7.
            \\rank<8> The accuracy bonus increases to +9.
        """, tags=['Emotion']),
        Spell('Motivate', 1, 'Yourself or one \\glossterm<ally> within \\rngmed range', """
            The target gains a +2 \\glossterm<magic bonus> to Mental defense.

            \\rankline
            \\rank<3> The bonus increases to +3.
            \\rank<5> The bonus increases to +4.
            \\rank<7> The bonus increases to +5.
        """, tags=['Attune (target)']),
        Spell('Ominous Presence', 1, 'Yourself', """
            You gain a +3 \\glossterm<magic bonus> to the Intimidate skill.

            \\rankline
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +5.
            \\rank<7> The bonus increases to +6.
        """, tags=['Attune (self)']),
        Spell('Alluring Presence', 1, 'Yourself', """
            You gain a +3 \\glossterm<magic bonus> to the Persuasion skill.

            \\rankline
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +5.
            \\rank<7> The bonus increases to +6.
        """, tags=['Attune (self)']),
        Spell('Solipsism', 7, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit As a \\glossterm<condition>, target believes that it is the only real creature, and the rest of the world is an illusion.
            It may wander aimlessly, but generally takes no action to defend itself and does not perceive itself to be in danger from other creatures.
            It still avoids obvious environmental hazards, such as cliff edges or fires.
            If it loses any \\glossterm<hit points> or is otherwise harmed, including subjective pain or discomfort, this effect is automatically broken.
        """, tags=['Subtle']),
    ],
    category='debuff, combat',
)
