from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: damage
# Secondary: debuff
# Tertiary: buff
# None: utility
cryomancy=MysticSphere(
    name='Cryomancy',
    short_description='Drain heat to injure and freeze foes',
    cantrips=[
        Effects('Chill', 'One creature or object within \\rngclose range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes 2 cold damage.

            \\rankline
            \\rank<3> The damage increases to 5.
            \\rank<5> The damage increases to 10.
            \\rank<7> The damage increases to 20.
        """, tags=[]),
    ],
    lists=['Arcane', 'Nature', 'Pact'],
    spells=[
        Spell('Freezing Grasp', 1, 'One creature or object within your \\glossterm<reach>', """
            This spell does not have the \\glossterm<Focus> tag.
            You must have a \\glossterm<free hand> to cast this spell.

            Make a melee attack vs. Reflex against the target.
            \\hit The target takes cold \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[], focus=False),
        Spell('Cone of Cold', 1, 'Everything in a \\areamed cone from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes cold \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage>.
            \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=[]),
        Spell('Frozen Legs', 5, 'One creature within \\rngclose range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<immobilized> as a \\glossterm<condition>.

            \\rankline
            \\rank<7> The range increases to \\rngmed.
        """, tags=[]),
        Spell('Mass Frozen Legs', 5, '\\glossterm<Enemies> in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target is \\glossterm<immobilized> until the end of the next round.
            \\crit Each target is \\glossterm<immobilized> as a \\glossterm<condition>.

            \\rankline
            \\rank<7> The area increases to a \\areamed radius.
        """, tags=[]),
        Spell('Ice Lance', 3, 'Everything in a \\arealarge, 5 ft.\\ wide line from you', """
            Make an attack vs. Armor against each target.
            \\hit Each target takes piercing and cold \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<5> The damage increases to \\glossterm<standard damage>.
            \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=['Manifestation']),
        Spell('Ice Spike', 1, 'One creature or object within \\rngclose range', """
            Make an attack vs. Armor against the target.
            \\hit The target takes piercing and cold \\glossterm<standard damage>.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
        """, tags=['Manifestation']),
        Spell('Freeze Poison', 1, 'Yourself or one \\glossterm<ally> within \\rngmed range', """
            The target takes cold damage equal to your \\glossterm<power>.
            In addition, it gains an additional success to resist a poison currently affecting it (see \\pcref<Poisons>).

            \\rankline
            \\rank<3> The number of additional successes increases to two.
            \\rank<5> The number of additional successes increases to three, which is enough to remove most poisons immediately.
            \\rank<7> The target can also gain the same number of successes to remove an additional poison affecting it.
        """, tags=[]),
        Spell('Brittle Chill', 4, 'One creature or object within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes cold \\glossterm<standard damage> -2d.
            In addition, it becomes \\glossterm<vulnerable> to bludgeoning damage until the end of the round.

            \\rankline
            \\rank<6> The vulnerability lasts until the end of the next round.
        """, tags=[]),
        Spell('Chilled Mind', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<stunned> as a \\glossterm<condition>.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Mass Chilled Mind', 4, '\\glossterm<Enemies> in a \\areamed radius within \\rngmed range', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target is \\glossterm<stunned> until the end of the next round.
            \\crit Each target is \\glossterm<stunned> as a \\glossterm<condition>.

            \\rankline
            \\rank<6> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Skate', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target can move on top of calm water as if it were land.
            It treats the water as \\glossterm<difficult terrain>.

            \\rankline
            \\rank<3> The target can also move on top of rough water.
            \\rank<5> The target can also move on top of stormy water.
            \\rank<7> The target no longer treats the water as difficult terrain.
        """, tags=['Attune (target)']),
        Spell('Skyskate', 3, 'Yourself', """
            Whenever you move, you can leave a trail of ice behind you.
            The ice lasts until the end of the round before disappearing.

            While you are leaving a trail of ice behind you, you can move into thin air by walking on your own ice trail, just as if it was solid ground.
            If you are still standing on your own ice trail when it disappears at the end of the round, you fall.

            Creatures following closely behind you while you move may also be able to use your ice trail.
            However, most Large or larger creatures will break the ice trail if they step onto it, which may cause both of you to fall.

            \\rankline
            \\rank<5> Your ice trail collapses more gradually.  If you are still standing on your own ice trail when it disappears, you can fall up to 50 feet before you start taking \\glossterm<falling damage>.
            \\rank<7> Your ice trail lasts until the end of the next round after your movement.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Icy Shell', 1, 'Yourself', """
            You cover your body with three overlapping layers of ice that crumple when they take damage.
            The ice does not cover your joints, allowing you to move freely.
            You are \\glossterm<resistant> to \\glossterm<physical damage> and \\glossterm<fire damage>.
            Whenever you take physical damage or fire damage, one layer of ice is destroyed.
            When the last layer of ice is destroyed, this ability provides no further benefit.

            \\rankline
            \\rank<3> The spell creates five layers of ice.
            \\rank<5> The spell creates seven layers of ice.
            \\rank<7> The spell creates ten layers of ice.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Winterwave', 3, 'Everything in a \\arealarge cone from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes cold \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<5> The area increases to a \\areahuge cone.
            \\rank<7> The area increases to a \\areaext cone.
        """, tags=[]),
        Spell('Frostbite', 3, 'One creature or object within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes cold \\glossterm<standard damage> -2d and is \\glossterm<slowed> as a \\glossterm<condition>.

            \\rankline
            \\rank<5> The damage increases to \\glossterm<standard damage> -1d.
            \\rank<7> The damage increases to \\glossterm<standard damage>.
        """, tags=[]),
        # +1 level for cold + bludgeoning, which breaks resistances
        Spell('Hailstorm', 4, 'Everything in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Armor against each target.
            \\hit Each target takes cold and bludgeoning \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage>.
            \\rank<8> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=[]),
        Spell('Blizzard', 1, '\\glossterm<Enemies> and objects in a \\areasmall radius from you', """
            Make an attack vs. Fortitude against each target.
            \\hit Each target takes cold \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> The area increases to a \\areamed radius.
            \\rank<5> The area increases to a \\arealarge radius.
            \\rank<7> The area increases to a \\areahuge radius.
        """, tags=[]),
        Spell('Ray of Frost', 1, 'One creature or object within \\rngclose range', """
            Make an attack vs. Reflex against the target.
            \\hit The target takes cold \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Icecraft', 1, 'One pool of unattended, nonmagical water within \\rngclose range.', """
            This spell creates an icy weapon or a suit of icy armor from the target pool of water.
            You can create any weapon, shield, or body armor that you are proficient with, and which would normally be made entirely from metal, except for heavy armor.
            The pool of water targeted must be at least as large as the item you create.

            The item functions like a normal item of its type, except that it is more fragile.
            Its \\glossterm<vital resistance> is equal to twice your \\glossterm<power>, and it is \\glossterm<vulnerable> to fire damage.

            When a creature wearing armor created in this way takes physical damage, cold damage, or fire damage, that damage is also dealt to the armor.
            Likewise, when a creature wielding a weapon created in this way deals damage with the weapon, that damage is also dealt to the weapon.
            If the item becomes \\glossterm<broken>, this effect is \\glossterm<dismissed>.

            This spell lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.

            \\rankline
            \\rank<3> The \\glossterm<vital resistance> of the item increases to three times your power.
                In addition, you can also create heavy armor.
            \\rank<5> The item created is magically enhanced.
                A weapon grants a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<mundane> abilities,
                    and armor grants a +1 \\glossterm<magic bonus> to Armor defense.
            \\rank<7> The \\glossterm<vital resistance> of the item increases to four times your power.
        """, tags=[]),
        Spell('Frost Breath', 4, 'Yourself', """
            As a standard action, you can breathe cold like a dragon.
            When you do, make an attack vs Armor against everything in a \\arealarge cone.
            \\hit Each target takes cold \\glossterm<standard damage>.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=['Attune (self)']),
        Spell('Frostfall', 4, None, """
            The temperature in a two mile radius cylinder-shaped \\glossterm<zone> from your location decreases rapidly.
            After one minute, the temperature decreases by 50 degrees Fahrenheit, to a minimum of \\minus50 degrees.
            Unlike normal, this effect does not require \\glossterm<line of effect> to you.
            Instead, it affects all outdoor locations within the area.
            Even a thin barrier, such as a tent, is enough to protect locations from the effect of this ritual.

            \\rankline
            \\rank<6> The temperature decreases by 70 degrees, to a minimum of \\minus70 degrees.
            \\rank<8> The temperature decreases by 90 degrees, to a minimum of \\minus90 degrees.
        """, tags=['Sustain (minor)']),
        Spell('Frostburn', 6, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit As a \\glossterm<condition>, the target is seared by painful cold.
            At the end of each round, it takes cold \\glossterm<standard damage> -1d per round since it became affected by this condition.
            If this damage fails to \\glossterm<wound> the target, the condition is removed.

            \\rankline
            \\rank<8> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=[]),
    ],
    category='damage',
)
