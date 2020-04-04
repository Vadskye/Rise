from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects



# Primary: buff
# Secondary: utility
# None: damage, debuff
glamer=MysticSphere(
    name="Glamer",
    short_description="Change how creatures and objects are perceived",
    cantrips=[
        Effects('Beautify', 'Yourself', """
            You alter your appearance in minor ways.
            This functions like the \\textit<disguise creature>  ability with a +4 bonus, except that you cannot change the appearance of your equipment, species, creature type, or number of limbs (see \pcref{Disguise Creature}).
            This ability is commonly used to hide blemishes or to appear younger or older than one's true age.

            This ability lasts until you use it again.

            \\rankline
            \\rank<3> The bonus increases to +6.
            \\rank<5> The bonus increases to +8.
            \\rank<7> The bonus increases to +10.
        """, tags=['Sensation', 'Visual']),
    ],
    lists=['Arcane'],
    spells=[
        Spell('Dark Shroud', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target takes a -2 penalty to \\glossterm<accuracy> and visual Awareness checks as a \\glossterm<condition>.
            \\crit The target is \\glossterm<blinded> as a \\glossterm<condition>.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Sensation', 'Visual']),
        Spell('Blinding Shroud', 6, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.

            \\rankline
            \\rank<8> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=['Sensation', 'Visual']),
        Spell('Blur', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target's physical outline is distorted so it appears blurred, shifting, and wavering.
            It gains a +1 \\glossterm<magic bonus> to Armor defense and the Stealth skill.
            This effect provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The bonus to Stealth increases to +2.
            \\rank<5> The bonus to Armor defense increases to +2.
            \\rank<7> The bonus to Stealth increases to +4.
        """, tags=['Attune (target)', 'Sensation', 'Visual']),
        Spell('Hidden Blade', 1, 'Yourself or one \\glossterm<ally> within \\rngmed range', """
            You can only cast this spell during the \\glossterm<action phase>.

            The target's weapons become invisible, and its hands are blurred.
            The target gains a +5 bonus to \\glossterm<accuracy> with its next melee \\glossterm<strike>,
                as if the target was \\glossterm<unaware> of the attack.
            This effect ends at the end of the current round if the target has not made a strike by that time.
            % TODO: wording
            The target is not actually \\glossterm<unaware> of the attack, and this does not work with abilities that have effects if the target is unaware of attacks.
            If you cast this spell on yourself, it affects the first strike you make until the end of the next round.

            This effect provides no offensive benefit against creatures immune to \\glossterm<Visual> abilities.

            \\rankline
            \\rank<3> The strike gains a +1 bonus to \\glossterm<accuracy>.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Sensation', 'Visual']),
        Spell('Darklantern', 1, 'One Small or smaller unattended object within \\rngclose range', """
            This spell suppresses light in a \\areamed radius \\glossterm<emanation> from the target.
            Light within or passing through the area is dimmed to be no brighter than shadowy illumination.
            Any object or effect which blocks light also blocks this spell's effect.

            \\rankline
            \\rank<3> The area increases to a \\arealarge radius \\glossterm<emanation>.
            \\rank<5> The area increases to a \\areahuge radius \\glossterm<emanation>.
            \\rank<7> The area increases to a \\areaext radius \\glossterm<emanation>.
        """, tags=['Attune (self)', 'Sensation']),
        Spell('Darkness', 4, 'One \\areamed radius \\glossterm<zone> within \\rngmed range', """
            All light within the area is suppressed.
            Light within or passing through the area is snuffed out.
            Any object or effect which blocks light also blocks this spell's effect.
            Darkvision and similar abilities which do not require light still function within the area.

            \\rankline
            \\rank<6> The area increases to a \\arealarge radius \\glossterm<zone>.
            \\rank<8> The area increases to a \\areaext radius \\glossterm<zone>.
        """, tags=[]),
        Spell('Conceal', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains a +3 \\glossterm<magic bonus> to the Stealth skill.

            \\rankline
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +5.
            \\rank<7> The bonus increases to +6.
        """, tags=['Attune (target)', 'Sensation']),
        Spell('Disguise Image', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
            You gain a +4 bonus on the check, and you can freely alter the appearance of the target's clothes and equipment, regardless of their original form.
            However, this effect is unable to alter the sound, smell, texture, or temperature of the target or its clothes and equipment.

            \\rankline
            \\rank<5> The bonus increases to +6.
            \\rank<7> The bonus increases to +8.
        """, tags=['Attune (target)', 'Sensation', 'Visual']),
        Spell('Mirror Image', 3, 'Yourself', """
            Four illusory duplicates appear around you that mirror your every move.
            The duplicates shift chaotically in your space, making it difficult to identify your real location.

            All \\glossterm<targeted> against you have a 50\\% miss chance.
            When an attack misses in this way, it affects an image, destroying it.
            This ability provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.

            \\rankline
            \\rank<5> At the end of each round, if no images were destroyed that round, a destroyed image respawns.
            \\rank<7> At the end of each round, a destroyed image respawns.
        """, tags=['Attune (self)', 'Sensation', 'Visual']),
        Spell('Shadow Mantle', 4, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target's physical form becomes blurred and shifts in and out of existence.
            This is not a mere trick of the light, but an alteration of reality to make its existence more ambiguous.
            The target gains a +1 \\glossterm<magic bonus> to all defenses and to the Stealth skill.

            \\rankline
            \\rank<6> The bonus to Armor defense and Stealth increases to +2.
            \\rank<8> The bonus to all defenses increases to +2.
        """, tags=['Attune (target)']),
        Spell('Displacement', 8, 'Yourself', """
            Your image appears to be two to three feet from its real location.
            \\glossterm<Mundane> \\glossterm<targeted> attacks against you suffer a 50\\% miss chance.
            This ability provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.
        """, tags=['Sensation', 'Visual']),
        Spell('Shadow Double', 1, None, """
            You create an illusory duplicate of yourself overlayed on your body.
            Whenever you move, you may also move the illusory duplicate the same distance in any direction.
            If the duplicate was sharing a space with you before this movement, onlookers cannot tell which is the real you and which is the duplicate.
            When the duplicate is attacked by a \\glossterm<targeted> attack, it is destroyed.
            At the end of each round, if the duplicate is outside of \\rngmed range from you, it is destroyed.
            This effect ends when there are no duplicates remaining.

            \\rankline
            \\rank<3> The maximum range increases to \\rnglong.
            \\rank<5> You can create a second duplicate of yourself.
            \\rank<7> The maximum range increases to \\rngext.
        """, tags=['Sustain (minor)']),
        Spell('Shadowcaster', 3, 'Yourself', """
            Whenever you cast a spell, you may replace the visual effects of the spell with the visual effects of another spell you can cast.
            Both spells must be from the same \\glossterm<mystic sphere>.
            An onlooker can detect the substitution and perceive the original effects using an Awareness check with a \\glossterm<difficulty rating> equal to 15 \\add your \\glossterm<power>.

            \\rankline
            \\rank<5> You can also replace the auditory effects of the spell.
            \\rank<7> The two spells do not have to be from the same \\glossterm<mystic sphere>.
        """, tags=['Attune (self)']),
        Spell('Conceal Trail', 1, 'Yourself and up to five \\glossterm<allies>', """
            At the end of each round, the footprints, scent, and other tracks left by each target during that round are magically concealed.
            This increases the \\glossterm<difficulty rating> to follow the trail by 10, but does not prevent creatures from seeing or smelling each target normally in combat.
            At the end of each round, if any target is outside of \\rnglong range from you, the effect is broken for that target and its trail is revealed.

            \\rankline
            \\rank<3> The \\glossterm<difficulty rating> increase increases to 15.
            \\rank<5> The \\glossterm<difficulty rating> increase increases to 20.
            \\rank<7> The \\glossterm<difficulty rating> increase increases to 25.
        """, tags=['Attune (self)']),
    ],
    rituals=[
        Spell('Magic Mouth', 1, 'Yourself or one large or smaller \\glossterm<ally> or unattended object within \\rngmed range', """
            Choose a triggering condition and a message of twenty-five words or less.
            The condition must be something that a typical human in the target's place could detect.

            When the triggering condition occurs, the target appears to grow a magically animated mouth.
            The mouth speaks the chosen message aloud.
            After the message is spoken, this effect is \\glossterm<dismissed>.

            This ritual takes one minute to perform.
        """, tags=['Attune (ritual)', 'Sensation']),
        Spell('Sunlight Ward', 3, 'Yourself or one \\glossterm<ally> within \\rngmed range', """
            The target is never considered to be in natural sunlight.
            This does not impair its vision, but protects it if it would otherwise suffer negative consequences for being in natural sunlight.

            This ritual takes one hour to perform.
        """, tags=['Attune (target)']),
    ],
    category='buff, defense',
)
