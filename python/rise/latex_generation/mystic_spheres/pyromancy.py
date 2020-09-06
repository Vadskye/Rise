from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects



# Primary: damage
# Tertiary: buff, debuff
# None: utility
pyromancy=MysticSphere(
    name='Pyromancy',
    short_description="Create fire to incinerate foes",
    cantrips=[
        Effects('Detect Flame', None, """
            You learn the approximate distance and direction to any active fires within \\rnglong \\glossterm<range> of you.
            This spell can sense fires as small as a candle flame, but no smaller.

            \\rankline
            \\rank<3> The range increases to \\rngext.
            \\rank<5> The range increases to 2,000 feet.
            \\rank<7> The range increases to 5,000 feet.
        """, tags=['Detection']),
        Effects('Kindle', 'One creature or object within \\rngclose range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes 2 fire damage.
            If the target is highly flammable, such as a torch or campfire, it ignites.

            \\rankline
            \\rank<3> The damage increases to 5.
            \\rank<5> The damage increases to 10.
            \\rank<7> The damage increases to 20.
        """, tags=[]),
        Effects('Extinguish', 'One Medium or smaller active flame within \\rngmed range', """
            If the target is \\glossterm<attended> by a creature, such as a torch being carried, you must make an attack vs. Reflex against the attending creature.
            Otherwise, the attack automatically hits.
            \\hit The target flame is extinguished.

            \\rankline
            \\rank<3> The maximum size increases to Large.
            \\rank<5> The maximum size increases to Huge.
            \\rank<7> The maximum size increases to Gargantuan.
        """, tags=[]),
        Effects('Personal Torch', 'Yourself', """
            You create a flame in your hand.
            You can create it at any intensity, up to a maximum heat equivalent to a burning torch.
            At it most intense, it sheds \\glossterm<bright illumination> in a 20 foot radius and shadowy illumination in an 40 foot radius.
            As a standard action, you can make a melee attack vs. Reflex against a creature or object.
            On a hit, the target takes fire \\glossterm<standard damage> -1d.

            This effect lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> -1d.
            \\rank<5> The damage increases to \\glossterm<standard damage>.
            \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=[]),
    ],
    lists=['Arcane', 'Nature', 'Pact'],
    spells=[
        Spell('Burning Grasp', 2, 'One creature or object within your \\glossterm<reach>', """
            This spell does not have the \\glossterm<Focus> tag.
            You must have a \\glossterm<free hand> to cast this spell.

            Make a melee attack vs. Reflex against the target.
            \\hit The target takes fire \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[], focus=False),
        Spell('Pyroclasm', 5, 'Everything in a a \\areamed radius within \\rngmed range', """
            Make an attack vs. Reflex against each target.
            \\hit Each target takes fire \\glossterm<standard damage> -1d.
            In addition, if the target is a flammable object, it is \\glossterm<ignited>.

            \\rankline
            \\rank<7> The area increases to a \\arealarge radius.
        """, tags=[]),
        Spell('Fireball', 3, 'Everything in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Reflex against each target.
            \\hit Each target takes fire \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<5> The damage increases to \\glossterm<standard damage>.
            \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=[]),
        Spell('Firebolt', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Armor against the target.
            \\hit The target takes fire \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Cone of Fire', 1, 'Everything in a \\areamed cone from you', f"""
            Make an attack vs. Reflex against each target.
            \\hit Each target takes fire \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage>.
            \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=[]),
        Spell('Ignition', 4, 'One creature within \\rngmed range', f"""
            Make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<ignited> as a \\glossterm<condition>.
            This condition can be removed if the target makes a \\glossterm<difficulty rating> 10 Dexterity check as a \\glossterm<move action> to put out the flames.
            Dropping \\glossterm<prone> as part of this action gives a +5 bonus to this check.
            \\crit As above, except that the condition cannot be removed with a \\glossterm<move action>.

            \\rankline
            \\rank<6> The condition cannot be removed with a \\glossterm<move action>.
            \\rank<8> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=[]),
        Spell('Combustion', 1, 'One creature within \\rngmed range', """
            You set the target on fire from the inside out.
            Make an attack vs. Fortitude against the target.
            \\hit The target takes fire \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Immolate', 5, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes fire \\glossterm<standard damage> +3d.
            If this damage would inflict a \\glossterm<vital wound>, it inflicts an additional \\glossterm<vital wound>.
            A target that dies from those vital wounds is completely disintegrated, leaving behind only a pinch of ash.
            Its equipment is unaffected.

            \\rankline
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Heat Metal', 2, 'One Small or smaller metal object within \\rngmed range', """
            If the target is \\glossterm<attended>, make an attack vs. Reflex against the attending creature.
            Otherwise, this attack automatically hits.
            \\hit The target object becomes burning hot to the touch.
            At the end of each round, it and anything touching it takes fire \\glossterm<standard damage>.

            \\rankline
            \\rank<4> The maximum size of the target increases to Medium.
            \\rank<6> The maximum size of the target increases to Large.
            \\rank<8> The maximum size of the target increases to Huge.
        """, tags=['Sustain (minor)']),
        Spell('Flame Breath', 4, 'Yourself (see text)', """
            As a standard action, you can breathe fire like a dragon.
            When you do, make an attack vs. Reflex against everything within a \\arealarge cone from you.
            \\hit Each target takes fire \\glossterm<standard damage>.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=['Attune (self)']),
        Spell('Eyes of Flame', 2, 'Yourself (see text)', """
            As a standard action, you can set something on fire simply by staring at it.
            When you do, make an attack vs. Fortitude against one creature or object within \\rngmed range from you.
            \\hit The target takes fire \\glossterm<standard damage> +2d.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<4> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<6> The damage increases to \\glossterm<standard damage> +4d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +5d.
        """, tags=['Attune (self)']),
        Spell('Flaming Spheres', 4, 'Yourself (see text)', """
            When you cast this spell, five flaming spheres appear over your head.
            Each sphere is approximately one foot in diameter.
            As a \\glossterm<minor action>, you can fire an orb at a creature or object within \\rngclose range.
            When you do, make an attack vs. Armor against that target.
            \\hit The target takes fire \\glossterm<standard damage> -2d.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> -1d.
            \\rank<8> The damage increases to \\glossterm<standard damage>.
        """, tags=['Attune (self)']),
        # Pyromancy specifically doesn't get "enemies only" self-radius
        # spells like most spheres do.
        Spell('Inferno', 2, 'Everything in a \\areamed radius from you', """
            Make an attack vs. Reflex against each target.
            \\hit Each target takes fire \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<4> The area increases to a \\arealarge radius.
            \\rank<6> The area increases to a \\areahuge radius.
            \\rank<8> The area increases to a \\areaext radius.
        """, tags=[]),
        Spell('Flame Serpent', 3, 'Everything in a \\areamed, 5 ft.\\ wide shapeable line within \\rngclose range', f"""
            Make an attack vs. Reflex against each target.
            \\hit Each target takes fire \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<5> The area increases to a \\arealarge, 5 ft.\\ wide shapeable line.
            \\rank<7> The range increases to \\rngmed.
        """, tags=[]),
        Spell('Flame Aura', 4, ['Yourself', 'Everything in a \\areasmall radius from you (see text)'], """
            Heat constantly radiates in a \\areasmall radius emanation from you.
            As a \\glossterm<minor action>, you can intensify the flames to make an attack vs. Fortitude against everything in the area.
            \\hit Each secondary target takes fire \\glossterm<standard damage> -2d.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> -1d.
            \\rank<8> The damage increases to \\glossterm<standard damage>.
        """, tags=['Attune (self)']),
        Spell('Flame Blade', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            All damage the target deals with \\glossterm<strikes> becomes fire damage in addition to the attack's normal damage types.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<5> Whenever the target \\glossterm<vitally wounds> a creature with a \\glossterm<strike>, the struck creature is also \\glossterm<ignited> as a \\glossterm<condition>.
            This condition can be removed if the target makes a \\glossterm<difficulty rating> 10 Dexterity check as a \\glossterm<move action> to put out the flames.
            Dropping \\glossterm<prone> as part of this action gives a +5 bonus to this check.
            \\rank<7> The condition cannot be removed with a \\glossterm<move action>.
        """, tags=['Attune (target)']),
        Spell('Wall of Fire', 4, 'Each creature that moves through the area (see text)', """
            You create a wall of fire in a 20 ft.\\ high, \\arealarge \\glossterm<wall> within \\rngmed range.
            The flames and heat make it difficult to see through the wall, granting \\glossterm<concealment> to targets on the opposite side of the wall.
            When a creature passes through the wall, you make an attack vs. Reflex against that creature.
            You can only make an attack in this way against a given creature once per \\glossterm<phase>.
            \\hit The target takes fire \\glossterm<standard damage>.

            Each five-foot square of wall has hit points equal to twice your \\glossterm<power>, and all of its defenses are 0.
            It is immune to most forms of attack, but it can be destroyed by \\glossterm<cold damage> and similar effects that can destroy water.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=['Sustain (minor)']),
        Spell('Personal Ignition', 3, ['Yourself', 'See text'], """
            You catch on fire.
            You are immune to being \\glossterm<ignited>.
            In addition, at the end of each round, make an attack vs. Fortitude against each creature adjacent to you that either is \\glossterm<grappling> with you or that attacked you with a melee weapon that round.
            \\hit Each secondary target takes fire \\glossterm<standard damage>.

            \\rankline
            \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=['Attune (self)']),
        Spell('Pyrophobia', 2, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<shaken> by you and all other sources of fire as a \\glossterm<condition>.
            \\crit The target is \\glossterm<panicked> by you and all other sources of fire as a \\glossterm<condition>.

            \\rankline
            \\rank<4> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<6> The accuracy bonus increases to +2.
            \\rank<8> The accuracy bonus increases to +3.
        """, tags=[]),
        Spell('Pyrohemia', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes fire \\glossterm<standard damage> -2d.
            In addition, it is \\glossterm<sickened> as a \\glossterm<condition>.

            \\rankline
            \\rank<4> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<6> The accuracy bonus increases to +2.
            \\rank<8> The accuracy bonus increases to +3.
        """, tags=[]),
        Spell('Curse of Flammability', 5, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is highly flammable until it takes a \\glossterm<short rest>.
            Like dry wood or kindling, it becomes \\glossterm<ignited> whenever it takes any \\glossterm<fire damage>.
            This ignited effect can be removed if the target makes a \\glossterm<difficulty rating> 10 Dexterity check as a \\glossterm<move action> to put out the flames.
            Dropping \\glossterm<prone> as part of this action gives a +5 bonus to this check.
            \\crit As above, except that the effect lasts until the curse is removed.

            \\rankline
            \\rank<7> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=['Curse']),
        Spell('Kindled Fireburst', 1, 'One Tiny or larger active fire within \\rngclose range (see text)', """
            You cause a small source of fire, such as a torch, to erupts into a larger burst of flame.
            Make an attack vs. Reflex against everything within an \\areasmall radius from the target.
            \\hit Each target takes fire \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage>.
            \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=[]),
    ],
    rituals=[
        Spell('Heat Wave', 4, None, """
            The temperature in a two mile radius cylinder-shaped \\glossterm<zone> from your location increases rapidly.
            Over the next minute after you finish this ritual, the temperature increases by 40 degrees Fahrenheit, to a maximum of 120 degrees.
            Unlike normal, this effect does not require \\glossterm<line of effect> to you.
            Instead, it affects all outdoor locations within the area.
            Even a thin barrier, such as a tent, is enough to protect locations from the effect of this ritual.

            This ritual takes one hour to perform.

            \\rankline
            \\rank<6> The temperature increases by 50 degrees, to a maximum of 140 degrees.
            \\rank<8> The temperature increases by 60 degrees, to a maximum of 160 degrees.
        """, tags=['Attune (self)']),
    ],
    category='damage',
)
