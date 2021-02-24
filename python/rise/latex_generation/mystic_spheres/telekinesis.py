from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: damage
# Secondary: utility
# Tertiary: debuff
# None: buff
telekinesis = MysticSphere(
    name="Telekinesis",
    short_description="Manipulate kinetic energy at a distance",
    cantrips=[
        Effects(
            "Distant Hand",
            "Medium or smaller unattended object within \\rngshort range",
            """
            You can telekinetically control the target object as if you were holding it in an extra hand.
            Any attacks you make with the object or checks you make to manipulate the object have a maximum bonus equal to your \\glossterm<power>.
            At the end of each round, if the target is outside of this ability's range, this ability ends.

            During the movement phase, you can move the target up to five feet in any direction.
            You use your \\glossterm<power> instead of your Strength to determine your maximum carrying capacity when moving objects in this way.
        """,
            scaling="""
            \\rank<2> You can move the target up to ten feet in any direction.
            \\rank<4> The range increases to \\rngmed.
            \\rank<6> You can move the target up to thirty feet in any direction.
        """,
            tags=["Sustain (minor)"],
        ),
        Effects(
            "Gentle Force",
            None,
            """
            You can exert minor force on objects and creatures around you.
            As part of the action you take to sustain this spell, you may choose any object or creature within \\rngmed range of you.
            That object or creature feels a push in a direction of your choice.
            The force is sufficient to lift a 1 lb\\. object, or to push a 5 lb\\. object across the ground.
            Generally, the force exerted by this ability is insufficient to physically move or even meaningfully impede any creature, but it can influence their actions.
        """,
            scaling="""
            \\rank<2> The force increases to lift a 2 lb.\\ object, or to push a 10 lb\\. object.
            \\rank<4> The force increases to lift a 4 lb.\\ object, or to push a 20 lb\\. object.
            \\rank<6> The force increases to lift a 8 lb.\\ object, or to push a 40 lb\\. object.
        """,
            tags=["Sustain (minor)"],
        ),
    ],
    lists=["Arcane", "Pact"],
    spells=[
        Spell(
            "Interposing Force",
            1,
            "One creature within \\rngmed range",
            """
            Make an attack vs. Mental against the target.
            \\hit The target is unable to move closer to you without effort.
            This does not impede its movement unless its movement would decrease the distance between you and it.
            As part of movement, it can make a Strength check with a \\glossterm<difficulty rating> of 10.
            If it succeeds, it can move towards you at half speed.
            \\crit As above, except that the difficulty rating of the Strength check increases by 10.
        """,
            scaling="accuracy",
            tags=["Sustain (minor)"],
        ),
        Spell(
            "Force Slam",
            1,
            "One creature or object within \\rngmed range",
            """
            Make an attack vs. Armor against the target.
            \\hit The target takes bludgeoning damage equal to 1d10 plus your \\glossterm<power>.
        """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Force Lance",
            1,
            "Everything in a \\areamed, 5 ft.\\ wide line from you",
            """
            Make an attack vs. Armor against each target.
            \\hit Each target takes piercing damage equal to 1d8 plus half your \\glossterm<power>.
        """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Force Extension",
            3,
            "Yourself",
            """
            You can cast this spell as a \\glossterm<minor action>.

            Melee weapons wielded by the target gain +5 foot \\glossterm<magic bonus> to \\glossterm<reach>.
            This has no effect on ranged attacks the target makes.
        """,
            scaling="""
            \\rank<5> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<7> The bonus to \\glossterm<reach> increases to +10 feet.
        """,
            tags=["Attune (target)"],
        ),
        # extra strong crit, but Large or smaller, so it sort of cancels out?
        Spell(
            "Kinetic Impedance",
            2,
            "One Large or smaller target within \\rngmed range",
            """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<slowed> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<decelerated> as a \\glossterm<condition>.
        """,
            scaling="accuracy",
            tags=[],
        ),
        Spell(
            "Reload",
            2,
            "Yourself",
            """
            This spell does not have \\glossterm<somatic components>, and you can cast it as a \\glossterm<minor action>.
            You reload any projectile weapon you wield with ammunition easily accessible on your body.
        """,
            scaling="""
            \\rank<4> This spell no longer has the \\glossterm<Focus> tag.
            \\rank<6> You can cast this spell as a \\glossterm<free action>.
            However, you can only cast it once per round.
        """,
            tags=[],
        ),
        Spell(
            "Mass Kinetic Impedance",
            1,
            "Large or smaller creatures in a \\areasmall radius within \\rngmed range",
            """
            Make an attack vs. Mental against each target.
            \\hit Each target is \\glossterm<slowed> until the end of the next round.
            \\crit Each target is \\glossterm<slowed> as a \\glossterm<condition>.
        """,
            scaling="accuracy",
            tags=["Compulsion"],
        ),
        # +2 levels relative to normal damage for push
        Spell(
            "Blastwave",
            3,
            "Everything in a \\areasmall radius from you",
            """
            Make an attack vs. Mental against each target.
            \\hit You move each target up to 30 feet in a straight line away from you.
            Moving a target upwards costs twice the normal movement cost.
            If the target impacts a solid object before the maximum distance, it stops moving and both it and the object take bludgoning damage equal to 2d6 plus half your \\glossterm<power>.
            Any individual object or creature can only take damage once in this way, even if it is hit by multiple targets that are knocked flying.
            \\glance As above, except that that each target moves half as far and takes half damage.
        """,
            scaling="damage",
            tags=[],
        ),
        # Spell('Repulsive Grasp', 1, 'One creature or object within your \\glossterm<reach>', """
        #     This spell does not have the \\glossterm<Focus> tag.
        #     You must have a \\glossterm<free hand> to cast this spell.
        #     Make a melee attack vs. Reflex against the target.
        #     \\hit You \\glossterm<knockback> the target up to 5 feet per \\glossterm<power> in a straight line directly away from you.
        #         Moving the target upwards costs twice the normal movement cost.
        #         If the target impacts a solid object before the maximum distance, it stops moving and both it and the object take bludgeoning \\glossterm<standard damage>.
        # """, scaling="damage", tags=[]),
        Spell(
            "Telekinetic Throw",
            2,
            "One Large or smaller creature or object within \\rngmed range",
            """
            Make an attack vs. Mental against the target.
            % This is +1d over the normal damage to help split the difference since the effect isn't consistently t2 worthy.
            % Making this spell 2nd level also helps with the Dimensional Jaunt -- Plane of Air mirroring.
            \\hit The target takes 1d10 bludgeoning damage.
            If it loses \\glossterm<hit points> from this damage, you \\glossterm<push> it up to 50 feet in any direction (see \\pcref<Push Effects>).
            Moving the target upwards costs twice the normal movement cost.
        """,
            scaling="damage",
            tags=[],
        ),
        Spell(
            "Telekinetic Lift",
            1,
            "Yourself or one Medium or smaller \\glossterm<ally> or unattended object within \\rngmed range",
            """
            The target is reduced to half of its normal weight.
            This gives it a +4 \\glossterm<magic bonus> to the Jump skill, if applicable, and makes it easier to lift and move.
        """,
            scaling="""
            \\rank<3> The bonus increases to +6.
            \\rank<5> The target is reduced to a quarter of its normal weight. In addition, the bonus increases to +8.
            \\rank<7> The bonus increases to +10.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Levitate",
            4,
            "Yourself",
            """
            % TODO: Wording
            As long as you remain within 50 feet above a surface that could support your weight, you float in midair, unaffected by gravity.
            During the movement phase, you can move yourself up to ten feet in any direction as a \\glossterm<move action>.
        """,
            scaling="""
            \\rank<6> The maximum height above the surface increases to 100 feet.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Wall of Force",
            1,
            None,
            """
            You create a wall of magical energy within \\rngmed range.
            You can choose the dimensions of the wall, up to a maximum of a 15 ft.\\ high, \\areasmall length line.
            If you create the wall within a space too small to hold it, it fills as much of the space as possible, starting from the middle of the chosen space.
            This can allow you to completely block off small tunnels.
            The wall is visible as a shimmering magical field that does not block sight.
            Nothing can pass through the wall until it is destroyed.
            Each 5-ft.\\ square of wall has \\glossterm<hit points> equal to twice your \\glossterm<power>.
        """,
            scaling="""
            \\rank<3> The \\glossterm<hit points> of each 5-ft.\\ square increases to be equal to three times your \\glossterm<power>.
            \\rank<5> The area increases to a \\areamed line.
            \\rank<7> The \\glossterm<hit points> of each 5-ft.\\ square increases to be equal to four times your \\glossterm<power>.
        """,
            tags=["Manifestation", "Sustain (minor)"],
        ),
        Spell(
            "Forcecage",
            7,
            None,
            """
            You slowly create a 10 ft.\\ cube of telekinetic force within \\rngmed range.
            The cage appears at the end of the next round after you cast this spell.
            Before that time, there is no visible indication of where the cage will appear, but its location can be observed with a \\glossterm<difficulty rating> 25 Spellsense check (see \\pcref<Spellsense>).
            Any physical obstacles in the way of the cage at the time that it forms prevent it from appearing.
            You can create the cube around a sufficiently small creature to trap it inside.
            Each wall is transparent, but blocks physical passage and \\glossterm<line of effect>.
            Each five-foot square of wall has hit points equal to twice your \\glossterm<power>, and all of its defenses are 0.
        """,
            tags=["Sustain (minor)"],
        ),
        Spell(
            "Steal Item",
            2,
            "One Small or smaller object within \\rngmed range",
            """
            If the target is \\glossterm<attended>, make an attack vs. Reflex with a +2 bonus to \\glossterm<accuracy> against the attending creature.
            Otherwise, this attack automatically hits.
            \\hit Unless the target is held in a creature's hand or otherwise well secured (such as an equipped ring or shield), it flies towards you, allowing you to catch it.
            If you are unable or unwilling to catch it, it falls to the ground in your space.
            \\crit As above, except that you can also pull objects that are held in a single hand.
        """,
            scaling="accuracy",
            tags=[],
        ),
        Spell(
            "Animated Weapon",
            4,
            "Yourself",
            """
            As a \\glossterm<minor action>, you can make a \\glossterm<magical strike> with a -3 penalty to \\glossterm<accuracy>.
            You take a -2d penalty to damage with the strike, and your \\glossterm<power> is halved.
        """,
            scaling="""
            \\rank<6> The accuracy penalty is reduced to -2.
        """,
            tags=["Attune (self)"],
        ),
        Spell(
            "Mind Arrow",
            1,
            [
                "One Tiny or smaller \\glossterm<unattened> projectile within \\rngshort range",
                "One creature or object within \\rngshort range",
            ],
            """
            You make a \\glossterm<magical strike> using the primary target against the secondary target.
            The projectile flies directly toward the secondary target instead of originating from your position, which may allow you to avoid \\glossterm<cover> and similar obstacles.
        """,
            scaling="""
            \\rank<3> The range increases to \\rngmed.
            \\rank<5> The range increases to \\rnglong.
            \\rank<7> The range increases to \\rngdist.
        """,
            tags=[],
        ),
        Spell(
            "Reactive Deflection",
            1,
            "Yourself",
            """
            You can cast this spell as a \\glossterm<minor action>.

            You gain a +1 \\glossterm<magic bonus> to Armor defense.
            In addition, you gain a +2 bonus to defenses against \\glossterm<mundane> ranged attacks from weapons or projectiles that are Small or smaller.
        """,
            scaling="""
            \\rank<3> The bonus against ranged attacks increases to +4.
            \\rank<5> The bonus to Armor defense increases to +2.
            \\rank<7> The bonus to Armor defense increases to +3.
        """,
            tags=["Attune (self)"],
        ),
    ],
    category="debuff, combat",
)
