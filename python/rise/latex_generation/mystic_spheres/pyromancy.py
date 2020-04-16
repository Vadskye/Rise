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
        Effects('Kindle', 'Object within \\rngclose range', """
            Make an attack vs. Armor against the target.
            \\hit The target takes fire damage equal to your \\glossterm<power>.
            If the target is highly flammable, such as a torch or campfire, it ignites.

            \\rankline
            \\rank<3> The range increases to \\rngmed.
            \\rank<5> The range increases to \\rnglong.
            \\rank<7> The range increases to \\rngext.
        """, tags=[]),
        Effects('Personal Torch', 'Yourself', """
            You create a flame in your hand.
            You can create it at any intensity, up to a maximum heat equivalent to a burning torch.
            At it most intense, it sheds bright light in a 20 foot radius and dim light in an 40 foot radius.
            If you touch a creature or object with it, the target takes fire \\glossterm<standard damage> -2d.
            This effect lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> -1d.
            \\rank<5> The damage increases to \\glossterm<standard damage>.
            \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=[]),
    ],
    lists=['Arcane', 'Nature', 'Pact'],
    spells=[
        Spell('Burning Grasp', 1, 'One creature or object you \\glossterm<threaten>', """
            This spell does not have the \\glossterm<Focus> tag.
            You must have a \\glossterm<free hand> to cast this spell.

            Make a melee attack vs. Reflex against the target.
            \\hit The target takes fire \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[], focus=False),
        Spell('Fireball', 3, 'Everything in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Armor against each target.
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
            Make an attack vs. Armor against each target.
            \\hit Each target takes fire \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage>.
            \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=[]),
        Spell('Ignition', 4, 'One creature within \\rngmed range', f"""
            Make an attack vs. Reflex against the target.
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
            Make an attack vs. Reflex against the target.
            \\hit The target takes fire \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Immolate', 4, 'One creature within \\rngmed range', """
            Make an attack vs. Reflex against the target.
            \\hit The target takes fire \\glossterm<standard damage> +2d.
            In addition, if the target has no hit points remaining at the end of the current \\glossterm<phase>, it dies.
            Its body is completely disintegrated, leaving behind only a pinch of ash.
            Its equipment is unaffected.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Heat Metal', 5, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            This attack automatically misses if the target is not wearing metal armor, wielding a metal weapon, or significantly composed of metal.
            \\hit The target is \\glossterm<ignited> as a \\glossterm<condition>.
            The condition can be removed if the target stops touching or being composed of metal of any kind.

            \\rankline
            \\rank<7> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=[]),
        Spell('Flame Breath', 4, ['Yourself', 'Everything within a \\arealarge cone'], """
            As a standard action, you can breathe fire like a dragon.
            When you do, make an attack vs Armor against each secondary target.
            \\hit Each secondary target takes fire \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +3d.
        """, tags=['Attune (self)']),
        # Pyromancy specifically doesn't get "enemies only" self-radius
        # spells like most spheres do.
        Spell('Inferno', 1, 'Everything in a \\areamed radius from you', """
            Make an attack vs. Armor against each target.
            \\hit Each target takes fire \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> The area increases to a \\arealarge radius.
            \\rank<5> The area increases to a \\areahuge radius.
            \\rank<7> The area increases to a \\areaext radius.
        """, tags=[]),
        Spell('Flame Serpent', 3, 'Everything in a \\areamed, 5 ft.\\ wide shapeable line within \\rngclose range', f"""
            Make an attack vs. Armor against each target.
            \\hit Each target takes fire \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<5> The area increases to a \\arealarge, 5 ft.\\ wide shapeable line.
            \\rank<7> The range increases to \\rngmed.
        """, tags=[]),
        Spell('Flame Aura', 4, ['Yourself', 'Everything in a \\areasmall radius from you (see text)'], """
            Heat constantly radiates in a \\areasmall radius emanation from you.
            As a \\glossterm<minor action>, you can intensify the flames to make an attack vs. Armor against everything in the area.
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
            When a creature passes through the wall, you make an attack vs. Armor against that creature.
            You can only make an attack in this way against a given creature once per \\glossterm<phase>.
            \\hit The target takes fire \\glossterm<standard damage>.

            Each five-foot square of wall has hit points equal to twice your \\glossterm<power>, and all of its defenses are 0.
            It is immune to most forms of attack, but it can be destroyed by \\glossterm<cold damage> and similar effects that can destroy water.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=['Sustain (minor)']),
        Spell('Heat Wave', 4, None, """
            The temperature in a two mile radius cylinder-shaped \\glossterm<zone> from your location increases rapidly.
            Unlike normal, this effect does not require \\glossterm<line of effect> to you.
            Instead, it affects all outdoor locations within the area.
            Even a thin barrier, such as a tent, is enough to protect locations from the effect of this ritual.
            After one minute, the temperature increases by 50 degrees Fahrenheit, to a maximum of 140 degrees.

            \\rankline
            \\rank<6> The temperature increases by 70 degrees, to a maximum of 160 degrees.
            \\rank<8> The temperature increases by 90 degrees, to a maximum of 180 degrees.
        """, tags=['Sustain (minor)']),
    ],
    category='damage',
)
