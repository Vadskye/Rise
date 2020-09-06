from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: damage
# Secondary: utility
# Tertiary: debuff
# None: buff
telekinesis=MysticSphere(
    name="Telekinesis",
    short_description="Manipulate kinetic energy at a distance",
    cantrips=[
        Effects('Distant Hand', 'Medium or smaller unattended object within \\rngclose range', """
            You can move the target up to five feet in any direction within range, using your \\glossterm<power> instead of your Strength to determine your maximum carrying capacity.

            In addition, you can manipulate the target as if you were holding it in your hands.
            Any attacks you make with the object or checks you make to manipulate the object have a maximum bonus equal to your \\glossterm<power>.

            \\rankline
            \\rank<3> You can move the target up to ten feet in any direction.
            \\rank<5> The range increases to \\rngmed.
            \\rank<7> You can move the target up to thirty feet in any direction.
        """, tags=['Sustain (standard)']),
    ],
    lists=['Arcane', 'Pact'],
    spells=[
        Spell('Force Slam', 1, 'One creature or object within \\rngmed range', """
            Make an attack vs. Armor against the target.
            \\hit The target takes bludgeoning \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Force Lance', 1, 'Everything in a \\areamed, 10 ft.\\ wide line from you', """
            Make an attack vs. Armor against each target.
            \\hit Each target takes piercing \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage>.
            \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=[]),
        Spell('Force Extension', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            Melee weapons wielded by the target gain +5 foot \\glossterm<magic bonus> to \\glossterm<reach>.
            This has no effect on ranged attacks the target makes.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<5> The target also gains a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<mundane> abilities.
            \\rank<7> The bonus to \\glossterm<reach> increases to +10 feet.
        """, tags=['Attune (target)']),
        Spell('Kinetic Impedance', 1, 'One Large or smaller target within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<slowed> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<decelerated> as a \\glossterm<condition>.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=[]),
        Spell('Reload', 2, 'Yourself', """
            This spell does not have \\glossterm<somatic components>, and you can cast it as a \\glossterm<minor action>.
            You reload any projectile weapon you wield with ammunition easily accessible on your body.

            \\rankline
            \\rank<4> This spell no longer has the \\glossterm<Focus> tag.
            \\rank<6> You can cast this spell as a \\glossterm<free action>.
            However, you can only cast it once per round.
            \\rank<8> This spell no longer has \\glossterm<verbal components>.
        """, tags=[]),
        Spell('Mass Kinetic Impedance', 1, '\\glossterm<Enemies> in a \\areamed radius within \\rngmed range', """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\glossterm<slowed> until the end of the next round.
            \\crit Each target is \\glossterm<slowed> as a \\glossterm<condition>.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Compulsion']),
        Spell('Blastwave', 3, '\\glossterm<Enemies> and objects in a \\areamed radius from you', """
            Make an attack vs. Mental against each target.
            \\hit You move each target up to 5 feet per two \\glossterm<power> in a straight line away from you.
            Moving a target upwards costs twice the normal movement cost.
            If the target impacts a solid object before the maximum distance, it stops moving and both it and the object take bludgoning \\glossterm<standard damage> -2d.
            Any individual object or creature can only take damage once in this way, even if it is hit by multiple targets that are knocked flying.

            \\rankline
            \\rank<5> The area increases to a \\arealarge radius.
            \\rank<7> The area increases to a \\areahuge radius.
        """, tags=[]),
        Spell('Repulsive Grasp', 2, 'One creature or object you \\glossterm<threaten>', """
            This spell does not have the \\glossterm<Focus> tag.
            You must have a \\glossterm<free hand> to cast this spell.

            Make a melee attack vs. Reflex against the target.
            \\hit You \\glossterm<knockback> the target up to 5 feet per \\glossterm<power> in a straight line directly away from you.
                Moving the target upwards costs twice the normal movement cost.
                If the target impacts a solid object before the maximum distance, it stops moving and both it and the object take bludgeoning \\glossterm<standard damage>.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
        """, tags=[]),
        Spell('Telekinetic Throw', 2, 'One Medium or smaller creature or object within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit You \\glossterm<knockback> the target up to 5 feet per \\glossterm<power> in a straight line in any direction.
                Moving the target upwards costs twice the normal movement cost.
                If the target impacts a solid object before the maximum distance, it stops moving and both it and the object take bludgeoning \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<4> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<6> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Telekinetic Lift', 1, 'Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngmed range', """
            The target is reduced to half of its normal weight.
            This gives it a +4 \\glossterm<magic bonus> to the Jump skill, if applicable, and makes it easier to lift and move.

            \\rankline
            \\rank<3> The bonus increases to +6.
            \\rank<5> The target is reduced to a quarter of its normal weight. In addition, the bonus increases to +8.
            \\rank<7> The bonus increases to +10.
        """, tags=['Attune (target)']),
        Spell('Levitate', 4, 'Yourself', """
            % TODO: Wording
            As long as you remain within 50 feet above a surface that could support its weight, it floats in midair, unaffected by gravity.
            During the movement phase, you can move yourself up to ten feet in any direction as a \\glossterm<move action>.

            \\rankline
            \\rank<6> The maximum height above the surface increases to 100 feet.
            \\rank<8> The distance you can move increases to 30 feet.
        """, tags=['Attune (self)']),
        Spell('Wall of Force', 1, None, """
            You create a wall of magical energy within \\rngmed range.
            You can choose the dimensions of the wall, up to a maximum of a 20 ft.\\ high, \\areamed length line.
            If you create the wall within a space too small to hold it, it fills as much of the space as possible, starting from the middle of the chosen space.
            This can allow you to completely block off small tunnels.
            The wall is visible as a shimmering magical field that does not block sight.
            Nothing can pass through the wall until it is destroyed.
            Each 5-ft.\\ square of wall has a \\glossterm<vital resistance> equal to twice your \\glossterm<power>.

            \\rankline
            \\rank<3> The \\glossterm<vital resistance> of each 5-ft.\\ square increases to be equal to three times your \\glossterm<power>.
            \\rank<5> The area increases to a \\arealarge line.
            \\rank<7> The \\glossterm<vital resistance> of each 5-ft.\\ square increases to be equal to four times your \\glossterm<power>.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Forcecage', 8, None, """
            You create a 10 ft.\\ cube of telekinetic force within \\rngmed range.
            You can create the cube around a sufficiently small creature to trap it inside.
            Each wall is transparent, but blocks physical passage and \\glossterm<line of effect>.
            Each five-foot square of wall has hit points equal to twice your \\glossterm<power>, and all of its defenses are 0.
        """, tags=['Attune (self)']),
        Spell('Steal Item', 2, 'One Small or smaller object within \\rngmed range', """
            If the target is \\glossterm<attended>, make an attack vs. Reflex against the attending creature.
            Otherwise, this attack automatically hits.
            \\hit Unless the target is held in a creature's hand or otherwise well secured (such as an equipped ring or shield), it flies towards you, allowing you to catch it.
            If you are unable or unwilling to catch it, it falls to the ground in your space.
            \\crit As above, except that you can also pull objects that are held in the hand of an attending creature, but not objects that are well secured.

            \\rankline
            \\rank<4> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<6> The accuracy bonus increases to +2.
            \\rank<8> The accuracy bonus increases to +3.
        """, tags=[]),
        Spell('Animated Weapon', 4, 'Yourself', """
            As a \\glossterm<minor action>, you can make a \\glossterm<magical strike> with a -4 penalty to \\glossterm<accuracy> and a -2d penalty to damage.

            \\rankline
            \\rank<6> The accuracy penalty is reduced to -3.
            \\rank<8> The accuracy penalty is reduced to -2.
        """, tags=['Attune (self)']),
        Spell('Mind Arrow', 2, ['One Tiny or smaller \\glossterm<unattened> projectile within \\rngmed range', 'One creature or object within \\rngmed range'], """
            You make a \\glossterm<magical strike> with a +1 bonus to \\glossterm<accuracy> using the primary target against the secondary target.
            The projectile flies directly toward the secondary target instead of originating from your position, which may allow you to avoid \\glossterm<cover> and similar obstacles.

            \\rankline
            \\rank<4> The accuracy bonus increases to +2.
            \\rank<6> The accuracy bonus increases to +3.
            \\rank<8> The accuracy bonus increases to +4.
        """, tags=[]),
        Spell('Reactive Deflection', 1, 'Yourself', """
            You gain a +1 \\glossterm<magic bonus> to Armor defense.
            This bonus is increased to +4 against \\glossterm<mundane> ranged attacks from weapons or projectiles that are Small or smaller.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The bonus against ranged attacks increases to +6.
            \\rank<5> The bonus to Armor defense increases to +2.
            \\rank<7> The bonus against ranged attacks increases to +8.
        """, tags=['Attune (self)']),
    ],
    category='debuff, combat',
)
