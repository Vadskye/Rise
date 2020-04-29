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
            \\hit The target takes cold \\glossterm<standard damage>.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
        """, tags=[]),
    ],
    lists=['Arcane', 'Nature', 'Pact'],
    spells=[
        Spell('Freezing Grasp', 1, 'One creature or object you \\glossterm<threaten>', """
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
        Spell('Frost Breath', 4, ['Yourself', 'Everything within a \\arealarge cone'], """
            As a standard action, you can breathe cold like a dragon.
            When you do, make an attack vs Armor against each secondary target.
            \\hit Each secondary target takes cold \\glossterm<standard damage>.

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
