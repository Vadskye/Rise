from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects



# Primary: buff
# Secondary: utility
# None: damage, debuff
barrier=MysticSphere(
    name='Barrier',
    short_description="Shield allies and areas from hostile forces",
    cantrips=[
    ],
    lists=['Arcane', 'Divine', 'Nature'],
    spells=[
        Spell('Mystic Barrier', 1, None, """
            You create a wall of magical energy in a 20 ft.\\ high, \\areamed line within \\rngmed range.
            The wall is visible as a shimmering magical membrane that does not block sight.
            Nothing can pass through the wall until it is destroyed.
            Each 5-ft.\\ square of wall has a \\glossterm<wound resistance> equal to twice your \\glossterm<power>.

            \\rankline
            \\rank<3> The \\glossterm<wound resistance> of each 5-ft.\\ square increases to be equal to three times your \\glossterm<power>.
            \\rank<5> The area increases to a \\arealarge line.
            \\rank<7> The \\glossterm<wound resistance> of each 5-ft.\\ square increases to be equal to four times your \\glossterm<power>.
        """, tags=['Sustain (minor)']),
        Spell('Invulnerable Mystic Barrier', 6, None, """
            You create a wall of magical energy in a 20 ft.\\ high, \\areamed line within \\rngmed range.
            The wall is visible as a shimmering magical membrane that does not block sight.
            Nothing can pass through the wall until it is destroyed.
            Each 5-ft.\\ square of wall has a \\glossterm<wound resistance> equal to twice your \\glossterm<power>.
            The wall is immune to \\glossterm<physical damage>.

            \\rankline
            \\rank<8> The area increases to a \\arealarge line.
        """, tags=['Sustain (minor)']),
        Spell('Wall of Energy Impedance', 3, None, """
            You create a wall of magical energy in a 20 ft.\\ high, \\areamed line within \\rngmed range.
            The wall is visible as a shimmering magical membrane that does not block sight.
            It does not impede passage for objects or creatures, but any ability that deals \\glossterm<energy damage> treats the wall as an impassable barrier.

            \\rankline
            \\rank<5> The area increases to a \\arealarge line.
            \\rank<7> The height increases to 20 ft.\\ high.
        """, tags=['Sustain (minor)']),
        Spell('Wall of Magic Impedance', 5, None, """
            You create a wall of magical energy in a 20 ft.\\ high, \\areamed line within \\rngmed range.
            The wall is visible as a shimmering magical membrane that does not block sight.
            It does not impede passage for objects or creatures, but any \\glossterm<magical> ability treats the wall as an impassable barrier.

            \\rankline
            \\rank<7> The area increases to a \\arealarge line.
        """, tags=['Sustain (minor)']),
        Spell('Kinetic Shield', 4, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
            The target gains a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<physical> damage.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The target also gains a +1 \\glossterm<magic bonus> to \\glossterm<wound rolls> on \\glossterm<vital wounds> from \\glossterm<physical> damage.
            \\rank<8> The bonus increases to be equal to your \\glossterm<power>.
        """, tags=['Attune (target)']),
        Spell('Resist Energy', 4, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
            The target gains a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<energy> damage.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The target also gains a +1 \\glossterm<magic bonus> to \\glossterm<wound rolls> on \\glossterm<vital wounds> from \\glossterm<energy> damage.
            \\rank<8> The bonus increases to be equal to your \\glossterm<power>.
        """, tags=['Attune (target)']),
        Spell('Universal Shield', 6, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
            The target gains a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against all damage.

            \\rankline
            \\rank<8> The target also gains a +1 \\glossterm<magic bonus> to \\glossterm<wound rolls>.
        """, tags=['Attune (target)']),
        Spell('Repulsion Field', 3, '\\glossterm<Enemies> that enter the area (see text)', """
            This spell creates a repulsive field in a \\areamed radius \\glossterm<zone> from your location.
            When an enemy makes physical contact with the spell's area for the first time, you make an attack vs. Mental against it.
            \\hit The target is unable to enter the spell's area with any part of its body.
            The rest of its movement in the current phase is cancelled.

            Creatures in the area at the time that the spell is cast are unaffected by the spell.

            \\rankline
            \\rank<5> The area increases to a \\arealarge radius.
            \\rank<7> The area increases to a \\areahuge radius.
        """, tags=['Sustain (minor)']),
        Spell('Energetic Immunity', 5, 'Yourself', """
            Choose a subtype of \\glossterm<energy damage>: cold, electricity, or fire.
            You become immune to damage of the chosen type.
            Attacks that deal damage of multiple types still inflict damage normally unless you are immune to all types of damage dealt.

            \\rankline
            \\rank<7> You may attune to this spell any number of times, choosing a different subtype of energy damage each time.
        """, tags=['Attune (self)']),
        Spell('Retributive Shield', 6, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
            The target gains a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<physical> damage.
            Whenever an attack that deals \\glossterm<physical damage> fails to beat the target's \\glossterm<damage resistance>, the attacker takes that damage.
            If the attacker is beyond \\rngclose range of the target, this reflection fails.
            Any effect which increases this spell's range increases the range of this effect by the same amount.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<8> The range of the spell and the range of the reflection increase to \\rngmed.
        """, tags=['Attune (target)']),
        Spell('Deflective Shield', 1, 'Yourself or an \\glossterm<ally> in \\rngclose range', """
            The target gains a +1 \\glossterm<magic bonus> to Armor defense and Reflex defense.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The bonus to Reflex defense increases to +2.
            \\rank<5> The bonus to Armor defense increases to +2.
            \\rank<7> The bonus to Reflex dfense increases to +3.
        """, tags=['Attune (target)']),
        Spell('Antilife Shell', 6, '\\glossterm<Enemies> that enter the area (see text)', """
            This spell creates a repulsive field in a \\areamed radius \\glossterm<zone> from your location.
            When an enemy makes physical contact with the spell's area for the first time, you make an attack vs. Mental against it.
            You gain a +10 bonus to \\glossterm<accuracy> against living creatures.
            \\hit The target is unable to enter the spell's area with any part of its body.
            The rest of its movement in the current phase is cancelled.

            Creatures in the area at the time that the spell is cast are unaffected by the spell.

            \\rankline
            \\rank<8> The area increases to a \\arealarge radius.
        """, tags=['Sustain (minor)']),
    ],
    rituals=[
        Spell('Endure Elements', 1, 'Yourself or an \\glossterm<ally> or unattended object within \\rngclose range', """
            The target suffers no harm from being in a hot or cold environment.
            It can exist comfortably in conditions between \minus50 and 140 degrees Fahrenheit.
            Its equipment, if any, is also protected.
            This does not protect the target from fire or cold damage.

            This ritual takes one minute to perform.
        """, tags=['Attune (ritual)']),
        Spell('Mystic Lock', 3, 'One large or smaller closable, nonmagical object within \\rngclose range, such as a door or box', """
            The target object becomes magically locked.
            It can be unlocked with a Devices check against a \\glossterm<difficulty rating> equal to 20 \\add your \\glossterm<power>.
            The \\glossterm<difficulty rating> to break it open forcibly increases by 10.

            You can freely pass your own \\ritual<arcane lock> as if the object were not locked.
            This effect lasts as long as you \\glossterm<attune> to it.
            If you use this ability multiple times, you can attune to it each time.

            This ritual takes one minute to perform.
        """, tags=['Attune (ritual)']),
        Spell('Resilient Lock', 5, 'One large or smaller closable, nonmagical object within \\rngclose range, such as a door or box', f"""
            This ritual functions like the \\ritual<mystic lock> ritual, except that the \\glossterm<difficulty rating> to unlock the target with a Devices check is instead equal to 30 + your \\glossterm<power>.
            In addition, the \\glossterm<difficulty rating> to break it open increases by 20 instead of by 10.
        """, tags=['Attune (ritual)']),
        Spell('Explosive Runes', 4, 'One Small or smaller unattended object with writing on it within \\rngclose range', """
            % TODO: clarify how to identify that this is Explosive Runes instead of bad handwriting
            The writing on the target is altered by the runes in subtle ways, making it more difficult to read.
            It becomes a \\glossterm<trap>.
            To read the writing, a creature must concentrate on reading it, which requires a standard action.
            If a creature reads the target, the target explodes.
            You make an attack vs. Armor against everything within a \\areamed radius from the target.
            Each struck target takes energy \\glossterm<standard damage> from the explosion.

            After the target object explodes in this way, the ritual is \\glossterm<dismissed>.
            If the target is destroyed or rendered illegible, the ritual is dismissed without exploding.
            This ritual takes one hour to perform.
        """, tags=['Attune (ritual)']),
        Spell('Scryward', 3, None, """
            This ritual creates a ward against scrying in a \\arealarge radius \\glossterm<zone> centered on your location.
            All \\glossterm<Scrying> effects fail to function in the area.
            This effect is permanent.

            This ritual takes 24 hour to perform, and requires 8 action points from its participants.
        """, tags=['AP']),
        Spell('Private Sanctum', 5, None, """
            This ritual creates a ward against any external perception in a \\arealarge radius \\glossterm<zone> centered on your location.
            This effect is permanent.
            Everything in the area is completely imperceptible from outside the area.
            Anyone observing the area from outside sees only a dark, silent void, regardless of darkvision and similar abilities.
            In addition, all \\glossterm<Scrying> effects fail to function in the area.
            Creatures inside the area can see within the area and outside of it without any difficulty.

            This ritual takes 24 hours to perform, and requires 32 action points from its participants.
        """, tags=['AP']),
    ],
    category='buff, defense',
)
