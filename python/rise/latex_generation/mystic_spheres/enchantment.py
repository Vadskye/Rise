from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: debuff
# Secondary: damage
# Tertiary: utility
# None: buff
enchantment=MysticSphere(
    name="Enchantment",
    short_description="Enchant the minds of your foes and allies",
    cantrips=[
        Effects('Cheer', 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target's mood improves and it feels more cheerful.
        """, scaling="""
            \\rank<3> The range increases to \\rngmed.
            \\rank<5> You may target an additional ally within range.
            \\rank<7> The range increases to \\rnglong.
        """, tags=['Emotion', 'Sustain (free)']),
        Effects('Repeat', 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit During the next round, the target must repeat all actions that it took this round.
            It can choose different targets or otherwise make different decisions about its action, but the action must be the same.
            If it is unable to take the same action, it cannot is unable to take an action of that type.
            For example, if a creature moved during the round that you cast this spell and was \\glossterm<immobilized> or knocked \\glossterm<prone>, it cannot move at all during the following round.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 1.
        """, tags=['Compulsion']),
    ],
    lists=['Arcane', 'Divine', 'Pact'],
    spells=[
        Spell('Mass Repeat', 1, '\\glossterm<Enemies> in a \\areasmall radius within \\rngmed range', """
            This spell functions like the \\spell<repeat> spell, except that it affects more creatures.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 1.
        """, tags=['Compulsion']),
        Spell('Drop', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target imediately drops anything it is holding in its hands.
            \\crit As above, and as a \\glossterm<condition>, the target is unable to pick up the dropped items.
            It can still hold other items, but if the dropped items are placed in its hands, it will immediately drop them again.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 3.
        """, tags=['Compulsion']),
        Spell('Mass Drop', 6, '\\glossterm<Enemies> in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Mental gainst each target.
            \\hit Each target drops anything it is holding in its hands.
        """, tags=['Compulsion']),
        Spell('Monologue', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit As a \\glossterm<condition>, the target is forced to speak out loud constantly whenever it can.
            This does not control what it talks about, so a reasonably savvy creature may be able to avoid revealing anything of great interest.
            In combat, most creatures with an intelligence of 0 or less will often talk about what they are planning on doing, which can help you predict their actions.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 3.
        """, tags=['Compulsion']),
        Spell('Dance', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit As a \\glossterm<condition>, the target is compelled to dance.
            It can spend a \\glossterm<move action> to dance, if it is physically capable of dancing.
            At the end of each round, if the target did not dance during that round, it takes a -2 penalty to \\glossterm<accuracy> and Mental defense as the compulsion intensifies.
            This penalty stacks each round until the target dances, which resets the penalties to 0.
            \\crit As above, except that the target must dance as a \\glossterm<standard action> to reset the penalties, instead of as a move action.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 1.
        """, tags=['Compulsion']),
        Spell('Collapse', 2, '\\glossterm<Enemies> in a \\areamed radius within \\rngmed range', """
            Make an attack vs. Mental against each target.
            \\hit Each target falls \\glossterm<prone>.
            \\crit As above, and as a \\glossterm<condition>, each target is unable to stand up.
            If a target is somehow brought into a standing position, it will immediately fall and become prone again.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 2.
        """, tags=['Compulsion']),
        Spell('Slow Down', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<slowed> as a \\glossterm<condition>.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 1.
        """, tags=['Compulsion']),
        Spell('Mass Slow Down', 3, '\\glossterm<Enemies> in a \\areamed radius within \\rngmed range', """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\glossterm<slowed> until the end of the next round.
            \\crit Each target is \\glossterm<slowed> as a \\glossterm<condition>.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 3.
        """, tags=[]),
        Spell('Stop Moving', 7, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<immobilized> as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
        """, tags=[]),
        Spell('Confusion', 6, 'One creature within \\rngclose range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\confused as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 6.
        """, tags=['Compulsion']),
        Spell('Mass Confusion', 7, '\\glossterm<Enemies> in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\confused until the end of the next round.
            \\crit Each target is \\glossterm<confused> as a \\glossterm<condition>.
        """, tags=['Compulsion']),
        Spell('Dominate Person', 5, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<stunned> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<stunned> and \\glossterm<confused> as a single \\glossterm<condition>.
            If the target is humanoid and was already stunned and confused from a previous casting of this spell, it becomes \\glossterm<dominated> by you as long as you \\glossterm<attune> to this ability.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 1.
        """, tags=['Compulsion']),
        Spell('Dominate Monster', 7, 'One creature within \\rngmed range', """
            This spell functions like the \\textit<dominate person> spell, except that you are also able to dominate non-humanoid creatures with its critical hit effect.
        """, tags=['Compulsion']),
        Spell('Sleep', 6, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            You take a -5 penalty to \\glossterm<accuracy> with this attack against creatures who are engaged in combat or taking any physical actions during the current phase.
            \\hit The falls asleep as a \\glossterm<condition>.
            It cannot be awakened while the condition lasts unless it takes a \\glossterm<vital wound>, which causes it to wake up and ends the sleeping part of the condition.
            After the condition ends, the target can wake up normally, though it continues to sleep until it would wake up naturally.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 1.
        """, tags=['Compulsion']),
        Spell('Close Your Eyes', 7, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.
        """, tags=['Compulsion']),
        Spell('Run', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental with a +4 bonus to \\glossterm<accuracy> against the target.
            \\hit As a \\glossterm<condition>, the target must move its maximum movement speed in a straight line during each \\glossterm<movement phase>.
            It must use its movement mode with the highest speed to move this way.
            It is not required to use the \\textit<sprint> ability, or use any other special movement ability, though it may choose to do so.
            If it is unable to move its full speed without making a skill check or encountering a solid obstacle, it may choose to stop its movement after moving the maximum possible distance without doing so.
            \\glance As above, except that the condition is removed at the end of the next round.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 3.
        """, tags=['Compulsion']),
        # Spell('Follow the Leader', 3, ['Yourself', '\\glossterm<Enemies> adjacent to you'], """
        #     You emanate an aura around you that compels creatures to follow you.
        #     During each \\glossterm<action phase>, make an attack vs. Mental against each secondary target.
        #     \\hit Each secondary target is compelled to mimic your movements during the next \\glossterm<movement phase>.
        #     If you move during that movement phase, it must move with the same movement mode in the same distance and direction up to the limit of its ability to follow you.
        #     It is not compelled to sprint to keep up with you, though it may choose to (see \\pcref<Sprint>).
        #     If you do not move, or if you move with a movement mode that it is incapable of using, it is simply \\glossterm<immobilized> for that movement phase.
        # """, scaling="""
        #     You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 3.
        # """, tags=['Attune (self)', 'Compulsion']),
        Spell('Blink', 7, '\\glossterm<Enemies> in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\glossterm<blinded> until the end of the next round.
            \\crit Each target is \\glossterm<blinded> as a \\glossterm<condition>.
        """, tags=['Compulsion']),
        Spell('Heedless Rush', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental with a +4 bonus to \\glossterm<accuracy> against the target.
            \\hit As a \\glossterm<condition>, the target is forced to use the \\textit<sprint> action whenever it moves (see \\pcref<Sprint>).
            It can still stop before reaching its maximum movement speed, but it must pay the hit point cost if it moves from its current position.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 1.
        """, tags=['Compulsion']),
        Spell('Selfstrike', 4, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit During the next \\glossterm<action phase>, the target is compelled to make a \\glossterm<strike> against itself instead of taking any other actions.
            If it has any weapons in hand or natural weapons at that time, it must use one of them.
            Otherwise, it uses its unarmed attack.
            This does not use up any of the creature's actions for the round, and it can take any unused actions during the \\glossterm<delayed action phase> of that round.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 4.
        """, tags=['Compulsion']),
        Spell('Discordant Song', 4, '\\glossterm<Enemies> in a \\areasmall radius from you', """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\disoriented until the end of the next round.
            \\crit Each target is \\glossterm<disoriented> as a \\glossterm<condition>.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 4.
        """, tags=['Compulsion']),
        Spell('Cause Fear', 2, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\shaken by you as a \\glossterm<condition>.
            \\crit The target is \\glossterm<panicked> by you as a \\glossterm<condition>.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 2.
        """, tags=['Emotion']),
        Spell('Mass Fear', 1, '\\glossterm<Enemies> in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\glossterm<shaken> by you until the end of the next round.
            \\crit Each target is \\glossterm<shaken> by you as a \\glossterm<condition>.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 1.
        """, tags=['Emotion']),
        Spell('Frighten', 4, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<frightened> by you as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 4.
        """, tags=['Emotion']),
        Spell('Fearsome Aura', 4, '\\glossterm<Enemies> in the area (see text)', """
            You radiate an aura of fear in a \\areasmall radius \\glossterm<emanation> from you.
            When you attune to this spell, and during each \\glossterm<action phase> in subsequent rounds, make an attack vs. Mental against each target.
            After you attack a creature this way, it becomes immune to this ability from you until it takes a \\glossterm<short rest>.
            \\hit Each target is \\glossterm<shaken> by you as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 4.
        """, tags=['Attune (self)', 'Emotion']),
        # Spell('Agony', 2, 'One creature within \\rngmed range', """
        #     Make an attack vs. Mental against the target.
        #     \\hit The target is inflicted with agonizing pain as a \\glossterm<condition>.
        #     % Does this need to clarify that it takes effect in the round the spell was cast?
        #     At the end of each \\glossterm<round>, if the target was \\glossterm<wounded> that round, it loses a \\glossterm<hit point>.
        # """, scaling="""
        #     You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 1.
        # """, tags=['Emotion']),
        Spell('Cause Redirected Fear', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\shaken by an \\glossterm<ally> of your choice within range as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit As above, except that the target is \\panicked instead of shaken.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 3.
        """, tags=['Emotion']),
        Spell('Charm', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\charmed by you.
            Any act by you or by creatures that appear to be your allies that threatens or damages the charmed person breaks the effect.
            An observant target may interpret overt threats to its allies as a threat to itself.
            \\glance As above, except that the condition is removed at the end of the next round.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 3.
        """, tags=['Sustain (minor)', 'Emotion', 'Subtle']),
        Spell('Amnesiac Charm', 6, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\charmed by you.
            Any act by you or by creatures that appear to be your allies that threatens or damages the \\spell<charmed> person breaks the effect.
            When this effect ends, the target forgets all events that transpired during the spell's duration.
            It becomes aware of its surroundings as if waking up from a daydream.
            The target is not directly aware of any magical influence on its mind, though unusually paranoid or perceptive creatures may deduce that their minds were affected.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 1.
        """, tags=['Sustain (minor)', 'Emotion', 'Subtle']),
        Spell('Calm Emotions', 3, 'All creatures within a \\arealarge radius from you', """
            Make an attack vs. Mental against each target.
            \\hit Each target has its emotions calmed.
            The effects of all other \\glossterm<Emotion> abilities on that target are \\glossterm<suppressed>.
            It cannot take violent actions (although it can defend itself) or do anything destructive.
            If the target takes damage or feels that it is in danger, this effect is \\glossterm<dismissed>.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 1.
        """, tags=['Emotion', 'Sustain (standard)']),
        Spell('Enrage', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental with a +4 bonus to \\glossterm<accuracy> against the target.
            \\hit As a \\glossterm<condition>, the target is unable to take any \\glossterm<standard actions> that do not cause it to make an attack.
            For example, it could make a \\glossterm<strike> or cast an offensive spell, but it could not heal itself or summon a creature.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 1.
        """, tags=['Emotion']),
        Spell('Deaden Emotions', 4, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit As a \\glossterm<condition>, the target is unable to take any \\glossterm<standard actions> that it to make an attack.
            If it loses any \\glossterm<hit points> or is otherwise harmed, including subjective pain or discomfort, this effect is automatically broken.
            \\glance As above, except that the condition is removed at the end of the next round.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 4.
        """, tags=['Emotion']),
        # Spell('Mass Enrage', 4, '\\glossterm<Enemies> in a \\areamed radius within \\rngmed range', """
        #     Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against each target.
        #     \\hit As a \\glossterm<condition>, each target takes a -2 penalty to Armor defense and is unable to take any \\glossterm<standard actions> that do not cause it to make an attack.
        #     For example, it could make a \\glossterm<strike> or cast an offensive spell, but it could not heal itself or summon a creature.
        # """, scaling="""
        #     \\rank<6> The range increases to \\rnglong.
        #     \\rank<8> The area increases to a \\arealarge radius.
        # """, tags=['Emotion']),
        # Spell('Enticing Target', 3, '\\glossterm<Enemies> in the area (see text)', """
        #     You radiate an aura in a \\areasmall radius \\glossterm<emanation> from you that encourages your enemies to attack you.
        #     When you attune to this spell, and during each \\glossterm<action phase> in subsequent rounds, make an attack vs. Mental against each target.
        #     You cannot make this attack more than once against any individual target during this spell's duration.
        #     \\hit Each target is \\glossterm<goaded> by you as a \\glossterm<condition>.
        # """, scaling="""
        #     \\rank<5> The area increases to a \\areamed radius \\glossterm<emanation>.
        #     \\rank<7> The area increases to a \\arealarge radius \\glossterm<emanation>.
        # """, tags=['Attune (self)', 'Emotion']),
        Spell('Curse of Phobia', 3, 'One creature within \\rngmed range', """
            When you cast this spell, choose one of the following fears: blood (including any \\glossterm<bloodied> creature, even the target), darkness (any location that does not have \\glossterm<bright illumination>), heights (any drop more 10 feet high), insects, snakes, or water.
            Make an attack vs. Mental against the target.
            \\hit The is \\glossterm<shaken> by all sources of your chosen fear until it takes a \\glossterm<short rest>.
            \\glance As above, except that the effect is removed at the end of the next round.
            \\crit As above, except that the effect lasts until this curse is removed.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 1.
        """, tags=[]),
        Spell('Demotivate', 2, 'One creature within \\rngmed range', """
            Make an attack vs. Mental with a +3 bonus against the target.
            \\hit As a \\glossterm<condition>, the target takes a -2 penalty to Mental defense.
            \\crit As above, except that the penalty increases to -5.
        """, scaling="""
            You gain a +1 bonus to \\glossterm<accuracy> with the attack for each rank beyond 2.
        """, tags=['Emotion']),
        Spell('Motivate', 1, 'Yourself', """
            The target gains a +2 \\glossterm<magic bonus> to Mental defense.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<5> The bonus increases to +3.
            \\rank<7> The bonus increases to +4.
        """, tags=['Attune (target)']),
        Spell('Ominous Presence', 1, 'Yourself', """
            You gain a +3 \\glossterm<magic bonus> to the Intimidate skill.
        """, scaling="""
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +5.
            \\rank<7> The bonus increases to +6.
        """, tags=['Attune (self)']),
        Spell('Alluring Presence', 1, 'Yourself', """
            You gain a +3 \\glossterm<magic bonus> to the Persuasion skill.
        """, scaling="""
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +5.
            \\rank<7> The bonus increases to +6.
        """, tags=['Attune (self)']),
        Spell('Solipsism', 7, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit As a \\glossterm<condition>, target believes that it is the only real creature, and the rest of the world is an illusion.
            It may wander aimlessly, but generally takes no action to defend itself and does not perceive itself to be in danger from other creatures.
            It still avoids obvious environmental hazards, such as cliff edges or fires.
            If it takes dany damage or is otherwise harmed, including subjective pain or discomfort, this effect is automatically broken.
            \\glance As above, except that the condition is removed at the end of the next round.
        """, tags=['Subtle']),
    ],
    rituals=[
        Spell('Tell the Truth', 4, 'Up to five creatures within \\rngmed range', """
            Make an attack vs. Mental against each target.

            \\hit Each target is unable to say things it knows to be untrue.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
    ],
    category='debuff, combat',
)
