from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: debuff
# Secondary: buff
# Tertiary: utility
# None: damage
chronomancy = MysticSphere(
    name="Chronomancy",
    short_description="Manipulate the passage of time to inhibit foes and aid allies",
    cantrips=[
        Effects(
            "Accelerated Reading",
            "Yourself",
            """
            You can read at twice your normal speed.
            However, the mental effort imposes a -4 penalty to Mental defense.
        """,
            scaling="""
            \\rank<2> You can read at four times your normal speed.
            \\rank<4> You can read at six times your normal speed.
            \\rank<6> You can read at ten times your normal speed.
        """,
            tags=["Sustain (free)"],
        ),
        Effects(
            "Accelerated Search",
            "Yourself",
            """
            Make an Awareness check to notice things in a single 10-ft.\\ squrae within 10 feet of you.
            You gain a +4 bonus to this check.
        """,
            scaling="""
            \\rank<2> The bonus increases to +6.
            \\rank<4> The bonus increases to +8.
            \\rank<6> The bonus increases to +10.
        """,
            tags=[],
        ),
        Effects(
            "Rapid Aging",
            "Small or smaller inanimate object within \\rngshort range",
            """
            Choose any number of hours, up to 24 hours.
            The target ages as if that much time had passed.
            When this spell ends, the object returns to its original state.
        """,
            scaling="""
            \\rank<2> You can choose to age the target by up to a week.
            \\rank<4> You can choose to age the target by up to a month.
            \\rank<6> You can choose to age the target by up to three months.
        """,
            tags=["Sustain (minor)"],
        ),
    ],
    lists=["Arcane", "Pact"],
    spells=[
        Spell(
            "Slowing Curse",
            3,
            "One creature within \\rngmed range",
            """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<slowed> until it takes a \\glossterm<short rest>.
            \\glance As above, except that the effect is removed at the end of the next round.
            \\crit As above, except that the effect lasts until the curse is removed.
        """,
            scaling="accuracy",
            tags=["Curse"],
        ),
        Spell(
            "Curse of Temporal Dislocation",
            5,
            "One creature within \\rngmed range",
            """
            Make an attack vs. Mental against the target.
            \\hit At the end of each round, if the target lost hit points that round, it has a 50\\% chance to be sent forward in time by one round.
            At the end of the next round, it returns to its original location, or the closest open space if that location is occupied.
            This effect lasts until the target takes a \\glossterm<short rest>.
            \\glance As above, except that the effect is removed at the end of the next round.
            \\crit As above, except that the effect lasts until the curse is removed.
        """,
            scaling="accuracy",
            tags=["Curse"],
        ),
        Spell(
            "Accelerated Timestream",
            5,
            "Everything within a \\areasmall radius \\glossterm<zone> from your location",
            """
            Make an attack vs. Mental against each target.
            Whenever a creature enters the area, you make this attack against them.
            A creature that leaves the area and re-enters it uses the original attack result against it.
            \\hit Each target acts at half speed within the area.
            It skips every other round, starting with the round after it becomes affected by this affect.
            In addition, it takes a -2 penalty to \\glossterm<accuracy> and \\glossterm<defenses> against creatures moving at normal speed.
            \\glance As above, except that the effect is removed at the end of the next round, allowing to creature to act normally in the zone after that time.
            % No \\crit effect
        """,
            scaling="accuracy",
            tags=[],
        ),
        Spell(
            "Slow",
            1,
            "One creature within \\rngshort range",
            """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<slowed> as a \\glossterm<condition>.
            \\crit As above, except that the condition must be removed twice before the effect ends.
        """,
            scaling="accuracy",
            tags=[],
        ),
        Spell(
            "Decelerate",
            7,
            "One creature within \\rngshort range",
            """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<decelerated> as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit As above, except that the condition must be removed twice before the effect ends.
        """,
            tags=[],
        ),
        Spell(
            "Mass Slow",
            1,
            "Creatures in a \\areasmall radius within \\rngmed range",
            """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\glossterm<slowed> until the end of the next round.
            \\crit Each target is \\glossterm<slowed> as a \\glossterm<condition>.
        """,
            scaling="accuracy",
            tags=[],
        ),
        Spell(
            "Stutterstop",
            5,
            "One creature within \\rngmed range",
            """
            Make an attack vs. Mental against the target.
            \\hit As a \\glossterm<condition>, the target is \\glossterm<slowed> and randomly \\glossterm<immobilized>.
            At the start of each round, it has a 50\\% chance to be \\glossterm<immobilized> during that round.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit The target is \\glossterm<slowed> and \\glossterm<immobilized> as a single condition.
        """,
            scaling="accuracy",
            tags=[],
        ),
        Spell(
            "Mental Lag",
            4,
            "One creature within \\rngshort range",
            """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<slowed> and \\glossterm<dazed> as a single \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit The target is \\glossterm<slowed> and \\glossterm<stunned> as a single \\glossterm<condition>.
        """,
            scaling="accuracy",
            tags=[],
        ),
        Spell(
            "Haste",
            1,
            "Yourself",
            """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a +10 foot \\glossterm<magic bonus> to its \\glossterm<base speed>, up to a maximum of double its \\glossterm<base speed>.
        """,
            scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<5> The speed bonus increases to +20 feet.
            \\rank<7> The speed bonus increases to +30 feet.
        """,
            tags=["Attune (target)"],
        ),
        Spell(
            "Accelerated Strike",
            4,
            "Yourself",
            """
            As a \\glossterm<minor action>, you can make a \\glossterm<strike> with a -3 penalty to \\glossterm<accuracy>.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
        """,
            scaling="""
            \\rank<6> The accuracy penalty is reduced to -2.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Temporal Duplicate",
            5,
            "Yourself or an \\glossterm<ally> within \\rngmed range",
            """
            You can cast this spell as a \\glossterm<minor action>.

            You reach into a possible future and create a duplicate of the target.
            The duplicate is identical in all ways to the target when the spell resolves.
            The target and its duplicate can act during the next round.
            At the end of that round, the target and its duplicate cease to exist.
            At the end of the following round, the target reappears in the place where it ceased to exist.
            If that space is occupied, it appears in the closest unoccupied space.

            When the target reappears, its condition is unchanged from when it left, except that it gains \\glossterm<fatigue points> equal to the amount used by its duplicate.
            Its \\glossterm<hit points>, conditions, and all other statistics are unaffected, regardless of any damage or other negative effects suffered by the duplicate.
            If this would reduce any of the target's resources below 0, it takes 4d10 energy damage from the paradox and becomes \\glossterm<stunned> as a \\glossterm<condition>.
        """,
            scaling="""
            \\rank<7> If you cast this spell as a standard action, you can choose to have the duplicate persist for two rounds instead of one.
                If you do, the target disappears for two rounds at the same time as the duplicate.
        """,
            tags=[],
        ),
        Spell(
            "Time Hop",
            2,
            "Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngmed range",
            """
            You can cast this spell as a \\glossterm<minor action>.

            You send the target into the future, causing it to temporarily cease to exist.
            When you cast this spell, you choose how many rounds the target ceases to exist for, up to a maximum of five rounds.
            At the end of the last round, it reappears in the same location where it disappeared.

            The area the target occupied can be physically crossed, but it is treated as an invalid destination for teleportation and other similar magic.
            When the target reappears, all of its surroundings are adjusted as if the object had retroactively always existed in its space.
            For example, if the location is occupied by a creature that walked into the area, the creature is relocated to the closest unoccupied space along the path it took to reach the target.
        """,
            scaling="""
            \\rank<4> The maximum size of the target increases to Large.
            \\rank<6> The maximum size of the target increases to Huge.
        """,
            tags=[],
        ),
        Spell(
            "Accelerated Reaction",
            1,
            "Yourself",
            """
            You gain a +2 \\glossterm<magic bonus> to Reflex defense and \\glossterm<initiative> checks.
        """,
            scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<5> The bonuses increase to +3.
            \\rank<7> The bonuses increase to +4.
        """,
            tags=["Attune (target)"],
        ),
        Spell(
            "Temporal Stasis",
            4,
            "Yourself or one Medium or smaller \\glossterm<ally> within \\rngmed range",
            """
            You can cast this spell as a \\glossterm<minor action>.

            The target is placed into stasis, rendering it unconscious.
            While in stasis, it cannot take any actions and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.

            % TODO: wording
            This effect normally lasts as long as you \\glossterm<attune> to it, and until the end of the round when you release the attunement.
            If you use this ability on yourself, it instead lasts for a number of rounds you choose when you cast the spell, up to a maximum of five rounds.
        """,
            scaling="""
            \\rank<6> The maximum size of the target increases to Large.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Time Lock",
            4,
            "Yourself or an \\glossterm<ally> within \\rngmed range",
            """
            You lock the state of the target's body in time.
            Note the target's \\glossterm<hit points>, \\glossterm<vital wounds> (including \\glossterm<vital roll> results), and \\glossterm<conditions>.
            If the target dies, this effect ends immediately.

            As a \\glossterm<standard action>, you can reach through time to restore the target's state.
            If you do, the target's \\glossterm<hit points> and \\glossterm<conditions> become identical to what they were when you cast this spell.
            This effect cannot restore \\glossterm<vital wounds>.
            This does not affect any other properties of the target, such as any resources expended.
            After you restore the target's state in this way, the spell ends.
        """,
            scaling="""
            \\rank<6> The restoration effect can also remove \\glossterm<vital wounds> gained since the target was locked.
        """,
            tags=["Sustain (minor)"],
        ),
        Spell(
            "Time Stop",
            7,
            "Yourself",
            """
            You can take two full rounds of actions immediately.
            During this time, all other creatures and objects are fixed in time, and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.
            You can still affect yourself and create areas or new effects.
            When this effect ends, you are \\glossterm<stunned> as a \\glossterm<condition>.

            You are still vulnerable to danger, such as from heat or dangerous gases.
            However, you cannot be detected by any means while you travel.

            After you cast this spell, you cannot cast it again until you take a \\glossterm<short rest>.
        """,
            tags=[],
        ),
        Spell(
            "Evasion",
            4,
            "Yourself",
            """
            You take half damage from abilities that affect an area.
            This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
        """,
            scaling="""
            \\rank<6> You also gain a +2 \\glossterm<magic bonus> to Reflex defense.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Greater Evasion",
            7,
            "Yourself",
            """
            You can use your Reflex defense in place of any other defense against abilities that affect an area.
            This does not protect you from abilities that affect multiple specific targets without affecting an area.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Minor Acceleration",
            6,
            "Yourself",
            """
            You can take two \\glossterm<minor actions> each round instead of one.
            You cannot take the same minor action twice in the same round.
        """,
            tags=["Attune (self)"],
        ),
        # This is sort of a tier 2.5 condition
        Spell(
            "Accelerate Aging",
            6,
            "One creature within \\rngmed range",
            """
            Make an attack vs. Mental against the target.
            \\hit As a \\glossterm<condition>, the target's body temporarily ages to become extremely old.
            The target suffers a -4 penalty to \\glossterm<accuracy>, \\glossterm<checks>, Armor defense, Fortitude defense, and Reflex defense.
            These penalties are doubled if the target was already suffering age-related penalties.
            In addition, the target moves at half speed.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit As above, except that the penalties increase to -6, and the target moves at one quarter speed.
        """,
            scaling="accuracy",
            tags=[],
        ),
        Spell(
            "Instant Analysis",
            3,
            "Yourself",
            """
            You accelerate your mind to incredible speed, allowing you to process information quickly.
            From your perspective, you freeze time for five rounds.
            During this time, all creatures and objects are fixed in time, and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.
            Your mind remains active during this time, and you are the only one aware of the stoppage of time.
            You cannot move or take any actions other than to observe your surroundings.
            In addition, you can release the time freeze as a \\glossterm<free action>.
            When this spell ends, time resumes in the same phase that it was originally frozen.

            After casting this spell, you cannot cast it again until you take a \\glossterm<short rest>.
        """,
            scaling="""
            \\rank<5> You can cast this spell as a \\glossterm<minor action>.
            \\rank<7> The length of frozen time increases to five minutes.
        """,
            tags=[],
        ),
        Spell(
            "Disjointed Slow",
            1,
            "One creature within \\rngmed range",
            """
            You wildly and inconsistently slow down time within the target's body, weaponizing the accidental mishaps of inexperienced chronomancers.
            Make an attack vs. Mental against the target.
            \\hit The target takes energy damage equal to 1d8 plus half your \\glossterm<power>.
            If it loses \\glossterm<hit points> from this damage, it is \\glossterm<slowed> as a \\glossterm<condition>.
        """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Disjointed Deceleration",
            4,
            "target",
            """
            You wildly and inconsistently decelerate time within the target's body, weaponizing the accidental mishaps of dangerously inexperienced chronomancers.
            Make an attack vs. Mental against the target.
            \\hit The target takes 2d6 energy damage.
            If it loses \\glossterm<hit points> from this damage, it is \\glossterm<decelerated> as a \\glossterm<condition>.
            \\glance As above, except that that the target takes half damage.
        """,
            scaling="damage",
            tags=[],
        ),
    ],
    rituals=[
        Spell(
            "Gentle Repose",
            3,
            "One unattended, nonmagical object within \\rngshort range",
            """
            Time does not pass for the target, preventing it from decaying or spoiling.
            This can extend the time a poison or similar item lasts before becoming inert.
            % What effects have an explicit time limit?
            If used on a corpse, this effectively extends the time limit for effects that require a fresh or intact body.
            Additionally, this can make transporting a fallen comrade more pleasant.

            % Does this need to explicitly clarify that it doesn't stop time from passing for the creature's soul?
        """,
            tags=["Attune (ritual)"],
            ritual_time="one minute",
        ),
    ],
    category="debuff, combat",
)
