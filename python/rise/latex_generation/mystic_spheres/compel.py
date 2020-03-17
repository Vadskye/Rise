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
    ],
    lists=['Arcane', 'Divine', 'Pact'],
    spells=[
        Spell('Curse of Repetition', 6, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit Whenever the target takes a standard action voluntarily, it is compelled to repeat the same action next round.
            It can choose different targets or otherwise make different decisions about its action, but the action must be the same.
            If it is unable to take the same action, such as if the action exhausted one of the creature's resources, it cannot take a standard action that round.
            This effect lasts until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until the curse is removed.
        """, tags=['Compulsion', 'Curse']),
        Spell('Drop', 5, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target drops anything it is holding in its hands.
            \\crit As above, and as a \\glossterm<condition> the target is unable to pick up the dropped items.
        """, tags=['Compulsion']),
        Spell('Monologue', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit As a \\glossterm<condition>, the target is forced to speak all of its current thoughts out loud.
            This does not control what it thinks about, so a quick-thinking target may be able to avoid revealing anything of great interest.
            In combat, most creatures will think about what they are planning on doing, which can help you predict their actions.
        """, tags=['Compulsion']),
        Spell('Dance', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit As a \\glossterm<condition>, the target is compelled to dance.
            It can spend a \\glossterm<move action> to dance, if it is physically capable of dancing.
            At the end of each round, if the target did not dance during that round, it takes a -2 penalty to \\glossterm<accuracy> and Mental defense as the compulsion intensifies.
            This penalty stacks each round until the target dances, which resets the penalties to 0.
            \\crit As above, except that the target must dance as a \\glossterm<standard action> to reset the penalties, instead of as a move action.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Compulsion']),
        Spell('Collapse', 1, '\\glossterm<Enemies> in a \\areamed radius from you', """
            Make an attack vs. Mental against each target.
            \\hit Each target falls \\glossterm<prone>.
            \\crit As above, and as a \\glossterm<condition>, each target is unable to stand up.
            If a target is somehow brought into a standing position, it will immediately fall and become prone again.

            \\rankline
            \\rank<3> The area increases to a \\arealarge radius.
            \\rank<5> The area increases to a \\areahuge radius.
            \\rank<7> The area increases to a \\areaext radius.
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
        Spell('Confusion', 5, 'One creature within \\rngclose range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\confused as a \\glossterm<condition>.

            \\rankline
            \\rank<6> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=['Compulsion']),
        Spell('Discordant Song', 7, '\\glossterm<Enemies> in a \\areasmall radius from you', """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\disoriented as a \\glossterm<condition>.
        """, tags=['Compulsion']),
        Spell('Dominate', 5, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<stunned> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<stunned> and \\glossterm<confused> as a single \\glossterm<condition>.
            As a standard action, you can make an additional attack vs. Mental against the target as long as it remains affected by this condition is within \\rngmed range of you.
            On a hit, the target becomes stunned and confused in the same way as an additional condition, continuing the effect even if the target removed the original condition in the same phase.
            On a critical hit, if the target is humanoid, it becomes \\glossterm<dominated> by you as long as you \\glossterm<attune> to this ability.

            \\rankline
            \\rank<7> You can dominate the target even if it is not humanoid.
        """, tags=['Compulsion']),
        Spell('Sleep', 4, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<exhausted> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<exhausted> and falls asleep as a \\glossterm<condition>.
            It cannot be awakened while the condition lasts unless it takes a \\glossterm<vital wound>, which causes it to wake up and ends the sleeping part of the condition.
            After the condition ends, the target can wake up normally, though it continues to sleep until it would wake up naturally.
        """, tags=['Compulsion']),
    ],
    category='debuff, combat',
)
