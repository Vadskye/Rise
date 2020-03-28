from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: debuff
# Secondary: buff
# Tertiary: utility
# None: damage
chronomancy=MysticSphere(
    name="Chronomancy",
    short_description="Manipulate the passage of time to inhibit foes and aid allies",
    cantrips=[
        Effects('Accelerated Reading', 'Yourself', """
            You can read at twice your normal speed.
            However, the mental effort imposes a -4 penalty to Mental defense.

            \\rankline
            \\rank<3> You can read at four times your normal speed.
            \\rank<5> You can read at six times your normal speed.
            \\rank<7> You can read at ten times your normal speed.
        """, tags=['Sustain (free)']),
        Effects('Accelerated Search', 'Yourself', """
            Make an Awareness check to notice things in a single 10-ft.\\ squrae within 10 feet of you.
            You gain a +4 bonus to this check.

            \\rankline
            \\rank<3> The bonus increases to +6.
            \\rank<5> The bonus increases to +8.
            \\rank<7> The bonus increases to +10.
        """, tags=[]),
    ],
    lists=['Arcane', 'Pact'],
    spells=[
        Spell('Slowing Curse', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<slowed> until it takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until the curse is removed.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Curse']),
        Spell('Curse of Temporal Dislocation', 4, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit At the end of each round, if the target took damage that round, it has a 50\\% chance to be sent forward in time by one round.
            At the end of the next round, it returns to its original location, or the closest open space if that location is occupied.
            This effect lasts until the target takes a \\glossterm<short rest>.
            \\crit As above, except that the effect lasts until the curse is removed.
        """, tags=['Curse']),
        Spell('Slow', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<slowed> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<decelerated> as a \\glossterm<condition>.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=[]),
        Spell('Mental Lag', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<slowed> and \\glossterm<dazed> as a single \\glossterm<condition>.

            \\rankline
            \\rank<5> On a \\glossterm<critical hit>, the target is \\glossterm<decelerated> and \\glossterm<stunned> instead of \\glossterm<slowed> and \\glossterm<dazed>.
            \\rank<7> On a hit, the target is decelerated and stunned instead of slowed and dazed.
        """, tags=[]),
        Spell('Haste', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains a +10 foot \\glossterm<magic bonus> to its \\glossterm<base speed>, up to a maximum of double its \\glossterm<base speed>.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The speed bonus increases to +15 feet.
            \\rank<5> The speed bonus increases to +20 feet.
            \\rank<7> The speed bonus increases to +30 feet.
        """, tags=['Attune (target)']),
        Spell('Accelerated Strike', 4, 'Yourself', """
            As a \\glossterm<minor action>, you can make a \\glossterm<strike> with a -2 penalty to \\glossterm<accuracy> and a -2d penalty to damage.

            \\rankline
            \\rank<6> The damage penalty is reduced to -1d.
            \\rank<8> The accuracy penalty is reduced to -1.
        """, tags=['Attune (self)']),
        Spell('Temporal Duplicate', 5, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You reach into a possible future and create a duplicate of the target.
            The duplicate is identical in all ways to the target when the spell resolves.
            The target and its duplicate can act during the next round.
            At the end of that round, the target and its duplicate cease to exist.
            At the end of the following round, the target reappears in the place where it ceased to exist.
            If that space is occupied, it appears in the closest unoccupied space.

            When the target reappears, its condition is unchanged from when it left, except that it loses \\glossterm<action points> equal to the amount used by its duplicate.
            Its \\glossterm<hit points>, conditions, and all other statistics are unaffected, regardless of any damage or other negative effects suffered by the duplicate.
            If this would reduce any of the target's resources below 0, it takes energy \\glossterm<standard damage> +4d from the paradox and becomes \\glossterm<stunned> as a \\glossterm<condition>.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<7> If you cast this spell as a standard action, you can choose to have the duplicate persist for two rounds instead of one.
                If you do, the target disappears for two rounds at the same time as the duplicate.
        """, tags=[]),
        Spell('Time Hop', 3, 'Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngmed range', """
            You send the target into the future, causing it to temporarily cease to exist.
            When you cast this spell, you choose how many rounds the target ceases to exist for, up to a maximum of five rounds.
            At the end of the last round, it reappears in the same location where it disappeared.

            The area the target occupied can be physically crossed, but it is treated as an invalid destination for teleportation and other similar magic.
            When the target reappears, all of its surroundings are adjusted as if the object had retroactively always existed in its space.
            For example, if the location is occupied by a creature that walked into the area, the creature is relocated to the closest unoccupied space along the path it took to reach the target.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<5> The maximum size of the target increases to Large.
            \\rank<7> The maximum size of the target increases to Huge.
        """, tags=[]),
        Spell('Temporal Stasis', 4, 'Yourself or one Medium or smaller \\glossterm<ally> within \\rngmed range', """
            The target is placed into stasis, rendering it unconscious.
            While in stasis, it cannot take any actions and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.

            % TODO: wording
            This effect normally lasts as long as you \\glossterm<attune> to it, and until the end of the round when you release the attunement.
            If you use this ability on yourself, it instead lasts for a number of rounds you choose when you cast the spell, up to a maximum of five rounds.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The maximum size of the target increases to Large.
            \\rank<8> The maximum size of the target increases to Huge.
        """, tags=['Attune (self)']),
        Spell('Time Lock', 4, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You lock the state of the target's body in time.
            Note the target's \\glossterm<hit points>, \\glossterm<vital wounds> (including \\glossterm<vital roll> results), and \\glossterm<conditions>.
            If the target dies, this effect ends immediately.

            As a \\glossterm<standard action>, you can reach through time to restore the target's state.
            If you do, the target's \\glossterm<hit points> and \\glossterm<conditions> become identical to what they were when you cast this spell.
            This effect cannot restore \\glossterm<vital wounds>.
            This does not affect any other properties of the target, such as any resources expended.
            After you restore the target's state in this way, the spell ends.

            \\rankline
            \\rank<6> The restoration effect can also remove \\glossterm<vital wounds> gained since the target was locked.
            \\rank<8> The effect is not ended if the target dies, and restoring the target's state can also restore it to life.
            If the target is restored to life in this way, all of its properties not locked by this spell, such as any resources expended, are identical to what they were when the target died.
            You cannot restore yourself to life in this way since you cannot take the action to restore your own state while dead.
        """, tags=['Sustain (minor)']),
        Spell('Time Stop', 8, 'Yourself', """
            You can take two full rounds of actions immediately.
            During this time, all other creatures and objects are fixed in time, and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.
            You can still affect yourself and create areas or new effects.

            You are still vulnerable to danger, such as from heat or dangerous gases.
            However, you cannot be detected by any means while you travel.

            After casting this spell, you cannot cast it again until you take a \\glossterm<short rest>.
        """, tags=[]),
        Spell('Evasion', 4, 'Yourself', """
            When you are attacked by an ability that affects an area, you can use your Reflex defense in place of any other defenses against that attack.

            \\rankline
            \\rank<6> You also gain a +1 \\glossterm<magic bonus> to Reflex defense.
            \\rank<8> The defense bonus increases to +2.
        """, tags=['Attune (self)']),
    ],
    rituals=[
        Spell('Gentle Repose', 3, 'One unattended, nonmagical object within \\rngclose range', """
            Time does not pass for the target, preventing it from decaying or spoiling.
            This can extend the time a poison or similar item lasts before becoming inert.
            % What effects have an explicit time limit?
            If used on a corpse, this effectively extends the time limit for effects that require a fresh or intact body.
            Additionally, this can make transporting a fallen comrade more pleasant.

            % Does this need to explicitly clarify that it doesn't stop time from passing for the creature's soul?

            This ritual takes one minute to perform.
        """, tags=['Attune (ritual)']),
    ],
    category='debuff, combat',
)
