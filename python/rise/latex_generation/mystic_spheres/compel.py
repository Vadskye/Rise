from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects



# This spell seems problematic
# Primary: debuff
# None: damage, utility, buff
compel=MysticSphere(
    name="Compel",
    short_description="Bend creatures to your will by controlling their actions",
    cantrips=[
        Effects('Repeat', 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit During the next round, the target must repeat all actions that it took this round.
            It can choose different targets or otherwise make different decisions about its action, but the action must be the same.
            If it is unable to take the same action, it cannot is unable to take an action of that type.
            For example, if a creature moved during the round that you cast this spell and was \\glossterm<immobilized> or knocked \\glossterm<prone>, it cannot move at all during the following round.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """),
    ],
    lists=['Arcane', 'Divine', 'Pact'],
    spells=[
        Spell('Mass Repeat', 1, '\\glossterm<Enemies> in a \\areasmall radius within \\rngmed range', """
            This spell functions like the \\spell<repeat> spell, except that it affects more creatures.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Compulsion']),
        Spell('Drop', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target drops anything it is holding in its hands.
            \\crit As above, and as a \\glossterm<condition>, the target is unable to pick up the dropped items.
            It can still hold other items, but if the dropped items are placed in its hands, it will immediately drop them again.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Compulsion']),
        Spell('Mass Drop', 4, '\\glossterm<Enemies> in a \\areamed radius within \\rngmed range', """
            Make an attack vs. Mental gainst each target.
            \\hit Each target drops anything it is holding in its hands.

            \\rankline
            \\rank<6> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=['Compulsion']),
        Spell('Monologue', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit As a \\glossterm<condition>, the target is forced to speak out loud constantly whenever it can.
            This does not control what it talks about, so a reasonably savvy creature may be able to avoid revealing anything of great interest.
            In combat, most creatures with an intelligence of 0 or less will often talk about what they are planning on doing, which can help you predict their actions.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Compulsion']),
        Spell('Dance', 2, 'One creature within \\rngmed range', """
            Make an attack vs. Mental with a +1 bonus to \\glossterm<accuracy> against the target.
            \\hit As a \\glossterm<condition>, the target is compelled to dance.
            It can spend a \\glossterm<move action> to dance, if it is physically capable of dancing.
            At the end of each round, if the target did not dance during that round, it takes a -2 penalty to \\glossterm<accuracy> and Mental defense as the compulsion intensifies.
            This penalty stacks each round until the target dances, which resets the penalties to 0.
            \\crit As above, except that the target must dance as a \\glossterm<standard action> to reset the penalties, instead of as a move action.

            \\rankline
            \\rank<4> The accuracy bonus increases to +2.
            \\rank<6> The accuracy bonus increases to +3.
            \\rank<8> The accuracy bonus increases to +4.
        """, tags=['Compulsion']),
        Spell('Collapse', 2, '\\glossterm<Enemies> in a \\areamed radius within \\rngmed range', """
            Make an attack vs. Mental against each target.
            \\hit Each target falls \\glossterm<prone>.
            \\crit As above, and as a \\glossterm<condition>, each target is unable to stand up.
            If a target is somehow brought into a standing position, it will immediately fall and become prone again.

            \\rankline
            \\rank<4> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<6> The accuracy bonus increases to +2.
            \\rank<8> The accuracy bonus increases to +3.
        """, tags=['Compulsion']),
        Spell('Stop', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<slowed> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<decelerated> as a \\glossterm<condition>.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Compulsion']),
        Spell('Mass Stop', 1, '\\glossterm<Enemies> in a \\areamed radius within \\rngmed range', """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\glossterm<slowed> until the end of the next round.
            \\crit Each target is \\glossterm<slowed> as a \\glossterm<condition>.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Compulsion']),
        Spell('Confusion', 5, 'One creature within \\rngclose range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\confused as a \\glossterm<condition>.

            \\rankline
            \\rank<7> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=['Compulsion']),
        Spell('Mass Confusion', 5, '\\glossterm<Enemies> in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\confused until the end of the next round.
            \\crit Each target is \\glossterm<confused> as a \\glossterm<condition>.

            \\rankline
            \\rank<7> The area increases to a \\areamed radius.
        """, tags=['Compulsion']),
        Spell('Dominate', 5, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<stunned> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<stunned> and \\glossterm<confused> as a single \\glossterm<condition>.
            If the target is humanoid and was already stunned and confused from a previous casting of this spell, it becomes \\glossterm<dominated> by you as long as you \\glossterm<attune> to this ability.

            \\rankline
            \\rank<7> You can dominate the target even if it is not humanoid.
        """, tags=['Compulsion']),
        Spell('Sleep', 8, 'One creature within \\rngclose range', """
            Make an attack vs. Mental against the target.
            \\hit The falls asleep as a \\glossterm<condition>.
            It cannot be awakened while the condition lasts unless it takes a \\glossterm<vital wound>, which causes it to wake up and ends the sleeping part of the condition.
            After the condition ends, the target can wake up normally, though it continues to sleep until it would wake up naturally.
        """, tags=['Compulsion']),
        Spell('Close Your Eyes', 6, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.

            \\rankline
            \\rank<8> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=['Compulsion']),
        Spell('Close Their Eyes', 7, '\\glossterm<Enemies> in a \\areamed radius within \\rngmed range', """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\blinded until the end of the next round.
            \\crit Each target is \\glossterm<blinded> as a \\glossterm<condition>.

            \\rankline
            \\rank<7> The area increases to a \\areamed radius.
        """, tags=['Compulsion']),
        Spell('Run', 2, 'One creature within \\rngmed range', """
            Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit As a \\glossterm<condition>, the target must move its maximum movement speed in a straight line during each \\glossterm<movement phase>.
            It must use its movement mode with the highest speed to move this way.
            It is not required to use the \\textit<sprint> ability, or use any other special movement ability, though it may choose to do so.
            If it is unable to move its full speed without making a skill check or encountering a solid obstacle, it may choose to stop its movement after moving the maximum possible distance without doing so.

            \\rankline
            \\rank<4> The accuracy bonus increases to +3.
            \\rank<6> The accuracy bonus increases to +4.
            \\rank<8> The accuracy bonus increases to +5.
        """, tags=['Compulsion']),
        Spell('Follow the Leader', 3, ['Yourself', '\\glossterm<Enemies> adjacent to you'], """
            You emanate an aura around you that compels creatures to follow you.
            During each \\glossterm<action phase>, make an attack vs. Mental against each secondary target.
            \\hit Each secondary target is compelled to mimic your movements during the next \\glossterm<movement phase>.
            If you move during that movement phase, it must move with the same movement mode in the same distance and direction up to the limit of its ability to follow you.
            It is not compelled to sprint to keep up with you, though it may choose to (see \\pcref<Sprint>).
            If you do not move, or if you move with a movement mode that it is incapable of using, it is simply \\glossterm<immobilized> for that movement phase.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Attune (self)', 'Compulsion']),
        Spell('Blink', 4, '\\glossterm<Enemies> in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\glossterm<blinded> until the end of the next round.

            \\rankline
            \\rank<6> The area increases to a \\areamed radius.
            \\rank<8> The area increases to a \\arealarge radius.
        """, tags=['Compulsion']),
        Spell('Heedless Rush', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit As a \\glossterm<condition>, the target is forced to use the \\textit<sprint> action whenever it moves (see \\pcref<Sprint>).
            It can still stop before reaching its maximum movement speed, but it must pay the hit point cost if it moves from its current position.

            \\rankline
            \\rank<3> The accuracy bonus increases to +3.
            \\rank<5> The accuracy bonus increases to +4.
            \\rank<7> The accuracy bonus increases to +5.
        """, tags=['Compulsion']),
        Spell('Selfstrike', 4, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit During the next \\glossterm<action phase>, the target is compelled to make a \\glossterm<strike> against itself instead of taking any other actions.
            If it has any weapons in hand or natural weapons at that time, it must use one of them.
            Otherwise, it uses its unarmed attack.
            This does not use up any of the creature's actions for the round, and it can take any unused actions during the \\glossterm<delayed action phase> of that round.

            \\rankline
            \\rank<6> The accuracy bonus increases to +2.
            \\rank<8> The accuracy bonus increases to +3.
        """, tags=['Compulsion']),
        Spell('Discordant Song', 4, '\\glossterm<Enemies> in a \\areamed radius from you', """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\disoriented until the end of the next round.
            \\crit Each target is \\glossterm<disoriented> as a \\glossterm<condition>.

            \\rankline
            \\rank<6> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=['Compulsion']),
    ],
    rituals=[
        Spell('Tell the Truth', 4, 'Up to five creatures within \\rngmed range', """
            Make an attack vs. Mental against each target.

            \\hit Each target is unable to say things it knows to be untrue.

            This ritual takes one minute to perform.
        """, tags=['Attune (ritual)']),
    ],
    category='debuff, combat',
)
