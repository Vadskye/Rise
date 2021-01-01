from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects

# Primary: damage
# Secondary: utility
# Tertiary: debuff
# None: buff
# Many terramany effects are limited by the requirement that either you or
# your target must be near earth.

# Requiring the caster to be near earth is an easily mitigatable downside,
# so those spells gain no special bonus.
# Requiring the target to be near earth is a more significant downside,
# so those spells gain a bonus - generally increased area or range.
terramancy=MysticSphere(
    name="Terramancy",
    short_description="Manipulate earth to crush foes",
    cantrips=[
        Effects('Shape Earth', 'One unattended, nonmagical body of earth or unworked stone you touch', """
            You make a Craft check to alter the target (see \\pcref<Craft>), except that you do not need any special tools to make the check (such as a shovel or hammer and chisel).
            The maximum \\glossterm<resistance> of a material you can affect with this ability is equal to your \\glossterm<power>.

            % should be longer than polymorph's alter object ability
            Each time you cast this spell, you can accomplish work that would take up to five rounds with a normal Craft check.
        """, scaling="""
            \\rank<2> The amount of work you accomplish with the spell increases to one minute.
            \\rank<4> The amount of work you accomplish with the spell increases to two minutes.
            \\rank<6> The amount of work you accomplish with the spell increases to five minutes.
        """, tags=[]),
    ],
    lists=['Arcane', 'Nature'],
    spells=[
        Spell('Rock Throw', 1, 'One creature or object within \\rngmed range', """
            % TODO: define maximum resistance?
            You extract a Tiny chunk from a body of earth or unworked stone within 5 feet of you and throw it at a foe.
            If no such chunk can be extracted, this spell is \\glossterm<miscast>.
            Otherwise, make an attack vs. Armor against the target.
            \\hit The target takes bludgeoning damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Shrapnel Blast', 1, 'Everything in a \\areasmall cone from you', """
            You extract a Tiny chunk from a body of earth or unworked stone within 5 feet of you and blast it at your foes.
            If no such chunk can be extracted, this spell is \\glossterm<miscast>.
            Otherwise, make an attack vs. Reflex against each target.
            \\hit Each target takes bludgeoning and piercing damage equal to 1d8 plus half your \\glossterm<power>.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Earthcraft', 1, 'One body of earth or unworked stone within 5 feet of you', """
            You create a weapon or suit of armor from the target.
            You can create any weapon, shield, or body armor that you are proficient with, and which could normally be made entirely from metal, except for heavy armor.
            The body targeted must be at least as large as the item you create.
            The item appears in your hands.

            The item functions like a normal item of its type, except that it is twice as heavy.
            If the item loses all of its hit points, this effect is \\glossterm<dismissed>.
        """, scaling="""
            \\rank<3> You can also create heavy armor.
            In addition, the item created is magically enhanced.
                A weapon grants a +2 \\glossterm<magic bonus> to your \\glossterm<mundane> \\glossterm<power>,
                    and armor grants a +1 \\glossterm<magic bonus> to Armor defense.
            \\rank<5> The magic bonus for a weapon increases to +4, and the magic bonus for armor increases to +2.
            \\rank<7> The magic bonus for a weapon increases to +8, and the magic bonus for armor increases to +3.
        """, tags=['Attune (self)']),
        Spell('Earthspike', 4, 'One creature or object within \\rngmed range', """
            You create a spike of earth from the ground.
            Make an attack vs. Armor against the target.
            The target must be within 5 feet of a Small or larger body of earth or stone.
            \\hit The target takes 2d6 piercing damage.
            If it loses \\glossterm<hit points> from this damage, it is \\glossterm<immobilized> as a \\glossterm<condition>.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        # -1 level for Large or smaller + earth or stone
        Spell('Earthcage', 6, 'One Large or smaller creature or object within \\rngshort range', """
            You create a cage of solid earth from the ground.
            Make an attack vs. Reflex against the target.
            The target must be within 5 feet of a Small or larger body of earth or stone.
            \\hit The target is is \\glossterm<immobilized> as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit As above, except that the condition must be removed twice before the effect ends.
        """, scaling="accuracy", tags=[]),
        Spell('Meld into Stone', 3, 'One stone object you can touch that is at least as large as your body', """
            You and up to 100 pounds of nonliving equipment meld into the stone.
            If you try to bring excess equipment into the stone, the spell is \\glossterm<miscast>.

            As long as the spell lasts, you can move within the stone as if it was thick water.
            However, at least part of you must remain within one foot of the place you originally melded with the stone.
            You gain no special ability to breathe or see while embedded the stone, and you cannot speak if your mouth is within the stone.
            The stone muffles sound, but very loud noises may reach your ears within it.
            If you fully exit the stone, this spell ends.

            If this spell ends before you exit the stone, or if the stone stops being a valid target for the spell (such as if it is broken into pieces), you are forcibly expelled from the stone.
            When you are forcibly expelled from the stone, you take 4d10 bludgeoning damage and become \\glossterm<nauseated> as a \\glossterm<condition>.
        """, scaling="""
            \\rank<5> Exiting the stone does not cause this spell to end.
            You can repeatedly exit and re-enter the stone as long as you maintain attunement to the spell.
            \\rank<7> You can leave tiny tunnels carrying air through the stone as you move through it, allowing you to effectively breathe within the stone.
            These trails disappear when this spell ends.
        """, tags=['Attune (self)']),
        # The tremor/fissure/earthquake line of spells only require "solid
        # ground" since they're just shaking things around, not doing weird
        # stuff like sealing people inside the ground.
        # level as r1 eonr debuff; normal hit is a little worse than r1, but
        # crit is better
        Spell('Tremor', 2, 'Large or smaller creatures in a \\areasmall radius within \\rngmed range that are standing on solid ground', """
            You create an highly localized tremor that rips through the ground.
            Make an attack vs. Reflex against each target.
            \\hit Each target is knocked \\glossterm<prone>.
            \\crit As above, except that each target is also unable to stand up as a \\glossterm<condition>.
        """, scaling="accuracy", tags=[]),
        # +1.5 level for highly conditional prone effect,
        # -0.5 for "standing on" limitation
        Spell('Fissure', 4, 'Everything in a \\areasmall radius within \\rngmed range that is standing on solid ground', """
            You create an intense but highly localized tremor that rips through the ground.
            Make an attack vs. Reflex against each target.
            \\hit Each target takes bludgeoning damage equal to 2d8 plus half your \\glossterm<power>.
            Each Large or smaller target that loses \\glossterm<hit points> from this damage is also knocked \\glossterm<prone>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=[]),
        # +3 levels for somewhat conditional prone effect,
        # -1 for "standing on" limitation that matters more at high levels
        Spell('Earthquake', 7, 'Everything in a \\areamed radius within \\rnglong range that is standing on solid ground', """
            You create an intense tremor that rips through the ground.
            Make an attack vs. Reflex against each target.
            \\hit Each target takes bludgeoning damage equal to 4d8 plus your \\glossterm<power>.
            Ecah Large or smaller target that takes damage this way is also knocked \\glossterm<prone>.
            \\glance As above, except that that each target takes half damage.
        """, tags=[]),
        Spell('Swallowed by Earth', 7, 'One creature within \\rngmed range that is standing on earth or unworked stone', """
            You open up a rift in the ground that swallows and traps a foe.
            Make an attack vs. Reflex against the target.
            \\hit The target takes 4d6 bludgeoning damage.
            If it is Large or smaller and it loses \\glossterm<hit points> from this damage, it is swallowed by the earth as a \\glossterm<condition>.
            While it is swallowed by the earth, it is \\glossterm<paralyzed> and does not have \\glossterm<line of sight> or \\glossterm<line of effect> to any creature other than itself.
            At the end of each subsequent round, it takes 4d6 bludgeoning damage as the earth grinds it into paste.
            If the earth or stone it is swallowed by is destroyed or otherwise rendered unable to contain the creature, this effect ends.
            Special movement abilities such as teleportation can also remove the target from the fissure.
            \\glance As above, except that that the target takes half damage.
        """, tags=[]),
        # +1 level since it's stronger than a typical rank 1 debuff
        Spell('Earthbind', 3, 'One creature within \\rngmed range that is within 100 feet of the ground', """
            Make an attack vs. Fortitude against the target.
            \\hit As a \\glossterm<condition>, the target is pulled towards the ground with great force, approximately doubling the gravity it experiences.
            This imposes a -2 penalty to \\glossterm<accuracy>, physical \\glossterm<checks>, and \\glossterm<defenses>.
            In addition, most flying creatures are unable to fly with this increased gravity and crash to the ground.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit As above, except that the force of gravity is increased by approximately four times instead.
            This increases the penalties to -4.
        """, scaling="accuracy", tags=[]),
        Spell('Quagmire', 4, 'All earth and unworked stone in a \\areasmall radius within \\rnglong range', """
            % TODO: wording to allow it to affect smaller parts of larger objects
            % TODO: define maximum resistance
            The targets are softened into a thick sludge, creating a quagmire that is difficult to move through.
            The movement cost required to move out of each affected square within the area is quadrupled.
            This does not affect objects under significant structural stress, such as walls and support columns.
        """, scaling="""
            \\rank<6> The area increases to a \\areamed radius.
        """, tags=['Sustain (minor)']),
        Spell('Earthen Fortification', 4, None, """
            You construct a fortification made of packed earth within \\rngmed range.
            This takes the form of up to ten contiguous 5-foot squares, each of which is four inches thick.
            The squares can be placed at any angle and used to form any structure as long as that structure is stable.
            Since the fortifications are made of packed earth, their maximum weight is limited, and structures taller than ten feet high are usually impossible.
            % TODO: define hit points and resistances of earth

            The fortifications form slowly, rather than instantly.
            The structure becomes complete at the end of the action phase in the next round after this spell is cast.
            This makes it difficult to trap creatures within structures formed.
        """, scaling="""
            % TODO: define hit points and resistances of stone
            \\rank<6> You can also construct fortifications from stone.
            This makes them more resistant to attack and allows the construction of more complex structures.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Earthglide', 5, 'Yourself', """
            You can move through earth and unworked stone at a rate of 5 feet per round.
            This does not allow you to breathe while inside the earth or stone, so your ability to traverse long distances may be limited.
        """, scaling="""
            \\rank<7> Your speed increases to be equal to half your \\glossterm<base speed>.
        """, tags=['Attune (self)']),
        Spell('Rocky Shell', 2, 'Yourself', """
            You cover your body with four overlapping layers of rock that crumple when they take damage.
            The rock does not cover your joints, allowing you to move, though the shell increases your \\glossterm<encumbrance> by 2.
            You are \\glossterm<impervious> to all \\glossterm<damage>.
            Whenever you take damage, one layer of rock is destroyed.
            When the last layer of rock is destroyed, this ability provides no further benefit.
        """, scaling="""
            \\rank<4> The spell creates six layers of rock.
            \\rank<6> The spell creates eight layers of rock.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Earthen Anchor', 2, 'Yourself', """
            The target is immune to \\glossterm<knockback> or \\glossterm<push> effects from attacks, unless the effects come from an attack that scores a \\glossterm<critical hit>.
            This does not make it immune to \\glossterm<teleportation>, and does not affect movement effects used by its \\glossterm<allies>.
        """, scaling="""
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The target is also immune to \\glossterm<teleport> effects from attacks that are not critical hits.
        """, tags=['Attune (target)']),
        # +2 levels for fire + bludgeoning, which breaks resistances
        Spell('Volcano', 5, 'Everything in a \\areasmall radius from a point on solid ground within \\rngmed range', """
            You create a small volcano that bursts forth, showing nearby creatures in burning shrapnel.
            Make an attack vs. Reflex against each target.
            \\hit Each target takes bludgeoning and fire damage equal to 2d10 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling='damage', tags=['Manifestation']),
    ],
    rituals=[
    ],
)
