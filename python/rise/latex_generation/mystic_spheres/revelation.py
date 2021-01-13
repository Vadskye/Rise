from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects



# Primary: buff
# Secondary: utility
# None: damage, debuff
revelation=MysticSphere(
    name="Revelation",
    short_description="Share visions of the present and future, granting insight or combat prowess",
    cantrips=[
        Effects('Reveal Sensation', 'Yourself', """
            Choose a sense, such as vision or hearing.
            You gain a +4 bonus to Awareness checks using that sense until the end of the next round.
        """, scaling="""
            \\rank<2> The bonus increases to +6.
            \\rank<4> The bonus increases to +8.
            \\rank<6> The bonus increases to +10.
        """, tags=[]),
        Effects('Reveal Truth', 'Yourself', """
            You may reroll one Knowledge check you made last round.
            You can only cast this spell once per hour.
        """, scaling="""
            \\rank<2> You also gain a +2 bonus to the Knowledge check.
            \\rank<4> The bonus increases to +4.
            \\rank<6> The bonus increases to +6.
        """, tags=[]),
        # Effects('Remote Sensing', 'One unoccupied location within \\rngmed range', """
        #     This cantrip functions like the \\spell<arcane eye> spell, except that it gains the \\glossterm<Sustain> (minor) tag in place of the \\glossterm<Attune> (self) tag.",
        #     In addition, the sensor cannot be moved after it is originally created.
        # """, tags=['Scrying', 'Sustain (minor)']),
    ],
    lists=['Arcane', 'Divine', 'Nature'],
    spells=[
        Spell('Proficiency', 1, 'One weapon within \\rngmed range', """
            You gain \\glossterm<proficiency> with one weapon group the target belongs to.
        """, scaling="""
            \\rank<3> You also gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with the chosen weapon group.
            \\rank<5> You also gain \\glossterm<exotic proficiency> with the chosen weapon group.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Attune (self)']),
        Spell('Purge Invisibility', 2, 'Everything in a \\areamed radius \\glossterm<emanation> from you', """
            All invisibility effects are \\glossterm<suppressed> on all targets in the area.
        """, scaling="""
            \\rank<4> The area increases to a \\arealarge radius \\glossterm<emanation>.
            \\rank<6> The area increases to a \\areahuge radius \\glossterm<emanation>.
        """, tags=['Attune (self)']),
        Spell('True Strike', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The first time the target makes a \\glossterm<strike> this round,
                it gains a +2 bonus to \\glossterm<accuracy> and rolls twice and takes the higher result.
            Because this ability has the \\glossterm<Swift> tag, it can affect an attack the target makes during the current phase.
            If you cast this spell on yourself, it affects the first strike you make until the end of the next round.
        """, scaling="""
            \\rank<3> The bonus increases to +3.
            \\rank<5> The bonus increases to +4.
            \\rank<7> The bonus increases to +5.
        """, tags=['Swift']),
        Spell('Precognitive Offense', 1, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with all attacks.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<5> The bonus increases to +2.
            \\rank<7> The bonus increases to +3.
        """, tags=['Attune (target)']),
        Spell('Precognitive Defense', 1, 'Yourself', """
            The target gains a +1 \\glossterm<magic bonus> to Armor defense and Reflex defense.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<5> The bonus increases to +2.
            \\rank<7> The bonus increases to +3.
        """, tags=['Attune (target)']),
        Spell('Discern Lies', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit When you hear the target deliberately and knowingly speaks a lie, you know that the target was lying.
            This ability does not reveal the truth, uncover unintentional inaccuracies, or necessarily reveal evasions.
            \\glance As above, except that the effect ends at the end of the next round.
            % No \\crit effect
        """, scaling="accuracy", tags=['Sustain (minor)']),
        Spell('Boon of Mastery', 3, 'Yourself', """
            You gain a +2 \\glossterm<magic bonus> to all skills.
        """, scaling="""
            \\rank<5> The bonus increases to +3.
            \\rank<7> The bonus increases to +4.
        """, tags=['Attune (self)']),
        # Spell('Boon of Many Eyes', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
        #     The target reduces its \\glossterm<overwhelm penalty> by 2.
        # """, scaling="""
        #     \\rank<5> The penalty reduction increases to 3.
        #     \\rank<7> The penalty reduction increases to 4.
        # """, tags=['Attune (self)']),
        Spell('Boon of Knowledge', 4, 'Yourself', """
            You gain a +4 \\glossterm<magic bonus> to all Knowledge skills (see \\pcref<Knowledge>).
            In addition, once per hour you may reroll one Knowledge check you make and take the higher result.
        """, scaling="""
            \\rank<6> The bonus increases to +6.
        """, tags=['Attune (self)']),
        Spell('Third Eye', 2, 'Yourself', """
            You gain \\glossterm<blindsight> with a 15 foot range.
            This can allow it to see perfectly without any light, regardless of concealment or invisibility.
        """, scaling="""
            \\rank<4> The range increases to 30 feet.
            \\rank<6> The range increases to 60 feet.
        """, tags=['Attune (self)']),
        Spell('Reveal Weakness', 2, 'One creature within \\rngmed range', """
            When you cast this spell, choose one of the four defenses: Armor, Fortitude, Reflex, or Mental.
            \\hit As a \\glossterm<condition>, the target's weaknesses are highlighted, and openings in its defenses are revealed to attackers moments before they exist.
            It takes a -2 penalty to the chosen defense.
            \\crit As above, except that the penalty is doubled.
        """, scaling="accuracy", tags=[]),
        # TODO: figure out if this is balanced? it has a sort of arbitrary level
        Spell('Reveal Vulnerability', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit As a \\glossterm<condition>, the target's vulnerabilities become clear for all to see.
            Its \\glossterm<resistances> are reduced by an amount equal to twice your \\glossterm<power>.
            When this effect ends, it regains resistances equal to the amount it lost this way.
            \\crit As above, except that the reduction increases to four times your \\glossterm<power>.
        """, scaling="accuracy", tags=[]),
        Spell('Myriad Visions', 2, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target sees visions of possible futures that confuse its ability to determine reality.
            It is \\glossterm<dazzled> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<blinded> as a \\glossterm<condition>.
        """, scaling="accuracy", tags=[]),
        Spell('Stunning Truth', 6, 'One creature within \\rngmed range', """
            Choose a fact that you know and make an attack vs. Mental against the target.
            If the target does not already know that fact to be true or false,
                and the target has sufficient cognitive ability to understand the fact,
                you gain a +2 bonus to \\glossterm<accuracy>.
            Otherwise, you take a -2 penalty to accuracy.
            The fact does not have to be true to gain this bonus.
            \\hit The target's mind is overwhelmed by a total awareness of your chosen fact.
            It is \\glossterm<stunned> as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit As above, except that the condition must be removed twice before the effect ends.
        """, scaling="accuracy", tags=[]),
        Spell('Arcane Eye', 2, 'One unoccupied square within \\rngmed range', """
            A \\glossterm<scrying sensor> appears floating in the air in the target location.
            At the start of each round, you choose whether you see and hear from this sensor or from your body.

            While viewing through the sensor, your observation ability is the same as your normal body, except that it does not share the benefits of any \\glossterm<magical> effects that improve your vision.
            You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

            If undisturbed, the sensor floats in the air in its position.
            During each \\glossterm<movement phase>, you can move the sensor up to 30 feet in any direction, even vertically.
            At the end of each round, if the sensor is does not have \\glossterm<line of effect> from you, it is destroyed.
        """, scaling="""
            \\rank<4> The sensor is not destroyed if you do not have \\glossterm<line of effect> to it.
            \\rank<6> You constantly receive sensory input from both your body and the sensor.
        """, tags=['Sustain (minor)', 'Scrying']),
        Spell('Clairvoyance', 5, 'One unoccupied square within \\rngmed range (see text)', """
            You do not need \\glossterm<line of sight> or \\glossterm<line of effect> to target a location.
            You must specify a distance and direction to target a location you cannot see.
            This can allow you to cast the spell beyond walls and similar obstacles.

            A \\glossterm<scrying sensor> appears floating in the air in the target location.
            At the start of each round, you choose whether you see and hear from this sensor or from your body.
            While viewing through the sensor, your observation ability is the same as your normal body, except that it does not share the benefits of any \\glossterm<magical> effects that improve your vision.
            You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

            If undisturbed, the sensor floats in the air in its position.
        """, scaling="""
            \\rank<7> You constantly receive sensory input from both your body and the sensor.

            % The use of attune (self) is intentional to make the "scout the dungeon exclusively using clairvoyance" plan improbably difficult to pull off
        """, tags=['Attune (self)', 'Scrying']),
        Spell('Reverse Scrying', 3, 'One magical sensor within \\rngshort range', """
            A \\glossterm<scrying sensor> appears at the location of the source of the the ability that created the target sensor.
            At the start of each round, you choose whether you see and hear from this sensor or from your body.
            While viewing through the sensor, your observation ability is the same as your normal body, except that it does not share the benefits of any \\glossterm<magical> effects that improve your vision.
            You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

            If undisturbed, the sensor floats in the air in its position.
        """, scaling="""
            \\rank<5> The range increases to \\rngmed.
            \\rank<7> The range increases to \\rnglong.
        """, tags=['Sustain (minor)', 'Scrying']),
        Spell('Longshot', 1, 'Yourself', """
            The target reduces its penalties for \\glossterm<range increments> by 1.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<5> The penalty reduction increases to 2.
            \\rank<7> The penalty reduction increases to 3.
        """, tags=['Attune (target)']),
        Spell('Enhanced Senses', 1, 'Yourself', """
            You gain a +3 \\glossterm<magic bonus> to the Awareness skill.
            In addition, you are treated as being \\glossterm<trained> in that skill if you would otherwise be untrained.
        """, scaling="""
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +5.
            \\rank<7> The bonus increases to +6.
        """, tags=['Attune (target)']),
        Spell('Sensory Chain', 4, 'One creature within \\rngmed range (see text)', """
            Make an attack vs. Mental against the target.
            Whenever you attack a creature with this spell, any additional attacks from this spell automatically fail until the spell ends.
            \\hit As a \\glossterm<condition>, you can see and hear out of the target's eyes and ears instead of your own.
            If the target stops being within 1 mile from you, regardless of intervening barriers
            Whenever the target touches another creature, you can make an attack against the new creature.
            On a hit, the touched creature becomes the new target of this spell and the condition is transferred to it.
            On a miss, the condition remains on the previous creature.
            % No \\glance
            % No \\crit
        """, scaling="accuracy", tags=['Sustain (standard)']),
        # spell to cast spells from the eye instead of from your body?
    ],
    rituals=[
        Spell('Reveal True Form', 3, 'One creature within \\rngshort range', """
            You can see the target's true form, regardless of any shapechanging or illusion effects.
        """, tags=['Attune (self)'], ritual_time='one hour'),
        Spell('Augury', 2, None, """
            You receive a limited glimpse into your immediate future.
            When you perform this ritual, you specify a course of action that you could hypothetically take during the next hour.
            You can be as broad or as detailed as you want in your description of your plan, though more specific and plausible plans generally yield more accurate results.
            The GM specifies one of four possible outcomes for the augury based on what is most likely to occur if you follow your plan.
            This is not a guarantee of success or failure, especially for plans that have some intrinsic randomness or chance of failure (such as planning to defeat a monster in combat).
            \\begin<itemize>
                \\itemhead<Weal>: The plan is likely to yield good outcomes for you.
                \\itemhead<Woe>: The plan is likely to yield bad outcomes for you.
                \\itemhead<Weal and Woe>: The plan is likely to yield a mixture of good and bad outcomes for you.
                \\itemhead<None>: Either plan is unlikely to to have any significant outcomes, or the outcomes of the plan are too vague to accurately predict.
            \\end<itemize>

            This ritual only yields accurate results once for any given situation.
            If you perform the ritual again in a situation that has not meaningfully changed, the augury always has no outcome regardless of the plan you specify.
            For example, if you are presented with seven doorways, with one doorway leading to a magnificent treasure and all other doorways leading to certain death, you cannot simply perform this ritual six times to determine the correct doorway.
        """, tags=[], ritual_time='one hour'),
        Spell('Greater Augury', 4, None, """
            This spell functions like the \\spell<augury> spell, except that the augury considers events up to 4 hours into your future when evaluating the outcomes of your plan.
        """, tags=[], ritual_time='one hour'),
        Spell('Supreme Augury', 6, None, """
            This spell functions like the \\spell<augury> spell, except that the augury considers events up to 12 hours into your future when evaluating the outcomes of your plan.
        """, tags=[], ritual_time='one hour'),
        Spell('Alarm', 1, 'One unoccupied square within \\rngmed range', """
            A \\glossterm<scrying sensor> appears floating in the air in the target location.
            The sensor passively observes its surroundings.
            As with other \\glossterm<Scrying> effects, its visual acuity is the same as yours.
            You can choose the minimum size category that the alarm will notify you for when you cast this spell.
            If it sees a creature or object of that size or larger moving within 50 feet of it, it will trigger an alarm.
            When you perform this ritual, you choose whether the alarm causes the sound of a ringing bell or a mental "ping" that only you can notice.
            You must be within 1 mile of the sensor to receive this mental alarm.
            This mental sensation is strong enough to wake you from normal sleep, but does not otherwise disturb concentration.
        """, tags=['Attune (self)', 'Scrying'], ritual_time='one minute'),
        Spell('Locate Creature', 3, None, """
            When you perform this ritual, choose a creature.
            You must have seen the chosen creature in person and either be able to clearly visualize its appearance or know its proper name to find it with this ritual.
            A creature without a proper name cannot be identified by name in this way.
            If you specify the chosen creature's appearance incorrectly, or if it has significantly changed its appearance, you may accidentally affect a different creature, or the ritual may simply fail.

            If the creature is within 100 miles of your location, you unerringly learn the relative direction from your location to the location it was in when you started performing this ritual.
        """, tags=[], ritual_time='one hour'),
        Spell('Locate Object', 3, None, """
            This ritual functions like the \\spell<locate creature> ritual, except that it locates objects instead of creatures.
            Objects currently being worn or carried by creatures cannot be found by this ritual.
        """, tags=[], ritual_time='one minute'),
        Spell('Read Magic', 1, 'Yourself', """
            You gain the ability to decipher magical inscriptions that would otherwise be unintelligible.
            This can allow you to read ritual books and similar objects created by other creatures.
            After you have read an inscription in this way, you are able to read that particular writing without the use of this ritual.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
        Spell('Discern Location', 4, None, """
            When you perform this ritual, choose a creature or object.
            You must have seen the chosen creature or object in person and either be able to clearly visualize its appearance or know its proper name to find it with this ritual.
            A creature or object without a proper name cannot be identified by name in this way.
            If you specify the chosen creature or object's appearance incorrectly, or if it has significantly changed its appearance, you may accidentally affect a different creature, or the ritual may simply fail.

            If the chosen creature or object on the same plane as you, you learn the location (place, name, business name, or the like), community, country, and continent where the target was at when you started performing this ritual.
            % Wording?
            If there is no corresponding information about an aspect of the target's location, such as if the target is in a location which is not part of a recognized country,
                you learn only that that that aspect of the information is missing.
        """, tags=[], ritual_time='24 hours'),
        Spell('Interplanar Discern Location', 6, 'Any creature or object on the same plane as you', """
            This ritual functions like the \\ritual<discern location> ritual, except that the target does not have to be on the same plane as you.
            It gains the \\glossterm<Planar> tag in addition to the tags from the \\ritual<discern location> ritual.
        """, tags=[], ritual_time='24 hours'),
        Spell('Sending', 3, 'Any creature on the same plane as you', """
            You do not need \\glossterm<line of sight> or \\glossterm<line of effect> to the target.
            However,  must specify your target with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the target.
            If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the ritual may simply fail.

            You send the target a short verbal message.
            The message must be twenty-five words or less, and speaking the message must not take longer than five rounds.

            After the the target receives the message, it may reply with a message of the same length as long as the ritual's effect continues.
            Once it speaks twenty-five words, or you stop sustaining the effect, the ritual is \\glossterm<dismissed>.
        """, tags=['Sustain (standard)'], ritual_time='one hour'),
        Spell('Interplanar Sending', 7, 'Any creature on the same plane as you', """
            This ritual functions like the \\ritual<sending> ritual, except that the target does not have to be on the same plane as you.
            It gains the \\glossterm<Planar> tag in addition to the tags from the \\ritual<sending> ritual.
        """, tags=['Sustain (standard)'], ritual_time='one hour'),
        Spell('Telepathic Bond', 3, 'Up to five ritual participants', """
            Each target can communicate mentally through telepathy with each other target.
            This communication is instantaneous, though it cannot reach more than 100 miles or across planes.

            % Is this grammatically correct?
            Each target must attune to this ritual independently.
            If a target breaks its attunement, it stops being able to send and receive mental messages with other targets.
            However, the effect continues as long as at least one target attunes to it.
            If you \\glossterm<dismiss> the ritual, the effect ends for all targets.
        """, tags=['Attune (ritual; see text)'], ritual_time='one minute'),
        Spell('Long-Distance Bond', 5, 'Up to five ritual participants', """
            This ritual functions like the \\ritual<telepathic bond> ritual, except that the effect works at any distance.
            The communication still does not function across planes.
        """, tags=['Attune (ritual; see text)'], ritual_time='one minute'),
        Spell('Planar Bond', 7, 'Up to five ritual participants', """
            This ritual functions like the \\ritual<telepathic bond> ritual, except that the effect works at any distance and across planes.
            It gains the \\glossterm<Planar> tag in addition to the tags from the \\ritual<telepathic bond> ritual.
        """, tags=['Attune (ritual; see text)'], ritual_time='one minute'),
        Spell('Seek Legacy', 2, 'One ritual participant', """
            The target learns the precise distance and direction to their \\glossterm<legacy item>, if it is on the same plane.
        """, tags=[], ritual_time='24 hours'),
        Spell('Scry Creature', 5, 'One creature on the same plane as you', """
            Make an attack vs. Mental against the target.
            You do not need \\glossterm<line of sight> or \\glossterm<line of effect> to the target.
            However,  must specify your target with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the target.
            If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the spell may simply be \\glossterm<miscast>.
            This attack roll cannot \\glossterm<explode>.
            \\hit A scrying sensor appears in the target's space.
            This sensor functions like the sensor created by the \\spell<arcane eye> spell, except that you cannot move the sensor manually.
            Instead, it automatically tries to follow the target to stay in its space.
            At the end of each phase, if the sensor is not in the target's space, this effect is \\glossterm<dismissed>.
            % No \\crit effect
        """, tags=['Scrying'], ritual_time='one hour'),
        Spell('Interplanar Scry Creature', 7, 'One creature on the same plane as you', """
            This ritual functions like the \\ritual<scry creature> ritual, except that the target does not have to be on the same plane as you.
            It gains the \\glossterm<Planar> tag in addition to the tags from the \\ritual<scry creature> ritual.
        """, tags=['Scrying'], ritual_time='one hour'),
    ],
    category='buff, offense',
)
