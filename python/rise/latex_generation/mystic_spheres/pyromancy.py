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
        Effects('Kindle', 'One creature or object within \\rngshort range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes 2 fire damage.
            If the target is highly flammable, such as a torch or campfire, it ignites.
        """, scaling="""
            \\rank<2> The damage increases to 5.
            \\rank<4> The damage increases to 10.
            \\rank<6> The damage increases to 20.
        """, tags=[]),
        Effects('Extinguish', 'One Medium or smaller active flame within \\rngmed range', """
            If the target is \\glossterm<attended> by a creature, such as a torch being carried, you must make an attack vs. Reflex against the attending creature.
            Otherwise, the attack automatically hits.
            \\hit The target flame is extinguished.
        """, scaling="""
            \\rank<2> The maximum size increases to Large.
            \\rank<4> The maximum size increases to Huge.
            \\rank<6> The maximum size increases to Gargantuan.
        """, tags=[]),
        Effects('Personal Torch', 'Yourself', """
            You create a flame in your hand.
            You can create it at any intensity, up to a maximum heat equivalent to a roaring campfire.
            At it most intense, it sheds \\glossterm<bright illumination> in a 30 foot radius and shadowy illumination in an 60 foot radius.
            As a standard action, you can make a melee attack vs. Reflex against a creature or object.
            On a hit, the target takes 2 fire damage.

            This effect lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.
        """, scaling="""
            \\rank<2> The damage increases to 5.
            \\rank<4> The damage increases to 10.
            \\rank<6> The damage increases to 20.
        """, tags=[]),
        Effects('Heat Air', None, """
            The temperatuture of the air within a \\areamed radius \\glossterm<emanation> from you is increased by an amount of your choice, to a maximum increase of 20 degrees Fahrenheit.
            You cannot increase the temperature above 100 degrees in this way.
            This typically imposes no direct penalties on other creatures, but it may make them more or less comfortable depending on their preferred temperature.

            This ability lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.
        """, scaling="""
            \\rank<2> The area increases to a \\arealarge radius \\glossterm<emanation>, and the maximum temperature increase increases to 30 degrees.
            \\rank<4> The area increases to a \\areahuge radius \\glossterm<emanation>, and the maximum temperature increase increases to 40 degrees.
            \\rank<6> The area increases to a \\areagarg radius \\glossterm<emanation>, and the maximum temperature increase increases to 50 degrees.
        """, tags=[]),
    ],
    lists=['Arcane', 'Nature', 'Pact'],
    spells=[
        Spell('Burning Grasp', 1, 'One creature or object within your \\glossterm<reach>', """
            This spell does not have the \\glossterm<Focus> tag.
            You must have a \\glossterm<free hand> to cast this spell.

            Make a melee attack vs. Reflex against the target.
            \\hit The target takes fire damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=[], focus=False),
        # +0 levels for catching objects on fire
        Spell('Pyroclasm', 5, 'Everything in a \\areamed radius within \\rnglong range', """
            Make an attack vs. Reflex against each target.
            \\hit Each target takes fire damage equal to 2d10 plus half your \\glossterm<power>.
            In addition, if the target is a flammable object, it catches on fire.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Fireball', 3, 'Everything in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Reflex against each target.
            \\hit Each target takes fire damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Firebolt', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Armor against the target.
            \\hit The target takes fire damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=[]),
        Spell('Cone of Fire', 1, 'Everything in a \\areasmall cone from you', f"""
            Make an attack vs. Reflex against each target.
            \\hit Each target takes fire damage equal to 1d8 plus half your \\glossterm<power>.
        """, scaling="damage", tags=[]),
        Spell('Cone of Conflagration', 3, 'Everything in a \\arealarge cone from you', f"""
            Make an attack vs. Reflex against each target.
            \\hit Each target takes fire damage equal to 1d8 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Ignition', 2, 'One creature within \\rngmed range', f"""
            Make an attack vs. Fortitude against the target.
            \\hit The target catches on fire as a \\glossterm<condition>.
            At the end of each round, it takes 1d6 fire damage.

            If the the target gains a \\glossterm<vital wound> from this damage, the condition ends.
            The condition can also be removed if the target makes a \\glossterm<difficulty rating> 10 Dexterity check as a \\glossterm<move action> to put out the flames.
            Dropping \\glossterm<prone> as part of this action gives a +5 bonus to this check.
            \\crit As above, except that the damage from the condition is doubled.
        """, scaling="damage", tags=[]),
        Spell('Persistent Ignition', 5, 'One creature within \\rngmed range', f"""
            Make an attack vs. Fortitude against the target.
            \\hit The target catches on fire as a \\glossterm<condition>.
            At the end of each round, it takes 2d6 fire damage.
            If the the target gains a \\glossterm<vital wound> from this damage, the condition ends.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit As above, except that the damage from the condition is doubled.
        """, scaling="damage", tags=[]),
        # +2 levels for +1d
        Spell('Combustion', 2, 'One creature within \\rngshort range', """
            You set the target on fire from the inside out.
            Make an attack vs. Fortitude against the target.
            \\hit The target takes fire damage equal to 2d8 plus your \\glossterm<power>.
        """, scaling="damage", tags=[]),
        # +4 levels for +2d, disintegration is free?
        Spell('Immolate', 5, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes fire damage equal to 4d10 plus your \\glossterm<power>.
            In addition, if the target has no hit points remaining at the end of the current \\glossterm<phase>, it dies.
            Its body is completely incinerated, leaving behind only a pinch of fine ash.
            Its equipment is unaffected.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Heat Metal', 2, 'One Medium or smaller metal object within \\rngmed range', """
            If the target is \\glossterm<attended>, make an attack vs. Reflex against the attending creature.
            Otherwise, this attack automatically hits.
            \\hit The target object becomes burning hot to the touch.
            At the end of each round, it and anything touching it takes fire damage equal to 1d10 plus half your \\glossterm<power>.
        """, scaling="accuracy", tags=['Sustain (minor)']),
        Spell('Flame Breath', 3, 'Yourself (see text)', """
            You can cast this spell as a \\glossterm<minor action>.

            As a standard action, you can breathe fire like a dragon.
            When you do, make an attack vs. Reflex against everything within a \\areamed cone from you.
            \\hit Each target takes fire damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Attune (self)']),
        Spell('Eyes of Flame', 2, 'Yourself (see text)', """
            You can cast this spell as a \\glossterm<minor action>.

            As a standard action, you can set something on fire simply by staring at it.
            When you do, make an attack vs. Fortitude against one creature or object within \\rngmed range from you.
            \\hit The target takes fire damage equal to 2d6 plus your \\glossterm<power>.
        """, scaling="damage", tags=['Attune (self)']),
        Spell('Flaming Spheres', 4, 'Yourself (see text)', """
            You can cast this spell as a \\glossterm<minor action>.

            When you cast this spell, a cluster of flaming spheres appears over your head.
            Each sphere is approximately one foot in diameter.
            As a \\glossterm<minor action>, you can fire an orb at a creature or object within \\rngshort range.
            When you do, make an attack vs. Armor against that target.
            After the sphere deals damage, it disappears and another sphere appears in the cluster.
            \\hit The target takes 2d6 fire damage.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=['Attune (self)']),
        # Pyromancy specifically doesn't get "enemies only" self-radius
        # spells like most spheres do.
        Spell('Inferno', 1, 'Everything in a \\areasmall radius from you', """
            Make an attack vs. Reflex against each target.
            \\hit Each target takes fire damage equal to 1d8 plus half your \\glossterm<power>.
        """, scaling="damage", tags=[]),
        # level as an enemies-only medium radius; ability to extend farther
        # beyond range compensates for lower maximum target count
        Spell('Flame Serpent', 4, 'Everything in a \\areamed, 5 ft.\\ wide shapeable line that starts within \\rngmed range', f"""
            Make an attack vs. Reflex against each target.
            \\hit Each target takes fire damage equal to 2d8 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Personal Ignition', 3, ['Yourself', 'See text'], """
            You can cast this spell as a \\glossterm<minor action>.

            You catch on fire.
            This does not cause you any harm, as the flames burn around your body without burning you.
            At the end of each round, make an attack vs. Reflex against each creature adjacent to you that either is \\glossterm<grappling> with you or that attacked you with a melee weapon that round.
            \\hit Each secondary target takes fire damage equal to 2d8 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Attune (self)']),
        Spell('Flame Aura', 7, ['Yourself', 'Everything in a \\areasmall radius from you (see text)'], """
            You can cast this spell as a \\glossterm<minor action>.

            Heat constantly radiates in a \\areasmall radius emanation from you.
            As a \\glossterm<minor action>, you can intensify the flames to make an attack vs. Fortitude against everything in the area.
            \\hit Each secondary target takes fire damage equal to 4d8 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Attune (self)']),
        Spell('Flame Blade', 3, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            The target's weapons shed light like a torch.
            In addition, all damage the target deals with \\glossterm<strikes> becomes fire damage in addition to the attack's normal damage types.
        """, scaling="""
            \\rank<5> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<7> The target also gains a +4 \\glossterm<magic bonus> to \\glossterm<power> with strikes.
        """, tags=['Attune (target)']),
        Spell('Wall of Fire', 3, 'Each creature that moves through the area (see text)', """
            You create a wall of fire in a 15 ft.\\ high, \\areamed \\glossterm<wall> within \\rngmed range.
            The flames and heat make it difficult to see through the wall, granting \\glossterm<concealment> to targets on the opposite side of the wall.
            When a creature passes through the wall, you make an attack vs. Reflex against that creature.
            You can only make an attack in this way against a given creature once per \\glossterm<phase>.
            \\hit The target takes fire damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.

            Each five-foot square of wall has hit points equal to twice your \\glossterm<power>, and all of its defenses are 0.
            It is immune to most forms of attack, but it can be destroyed by \\glossterm<cold damage> and similar effects that can destroy water.
        """, scaling="damage", tags=['Sustain (minor)']),
        # +1 level because pyromancy isn't supposed to be a Mental attack debuff
        # sphere. Also because it's less picky than a normal shaken condition.
        Spell('Pyrophobia', 2, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<shaken> by you and all other sources of fire as a \\glossterm<condition>.
            \\crit The target is \\glossterm<frightened> by you and all other sources of fire as a \\glossterm<condition>.
        """, scaling="accuracy", tags=['Emotion']),
        Spell('Primal Pyrophobia', 5, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is \\glossterm<frightened> by you and all other sources of fire as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit The target is \\glossterm<panicked> by you and all other sources of fire as a \\glossterm<condition>.
        """, scaling="accuracy", tags=['Emotion']),
        # Pyromancy gets medium damage / r1 instead of low damage / r2 to
        # reinforce its identity as a damage sphere instead of debuffs
        Spell('Pyrohemia', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes fire damage equal to 1d8 plus half your \\glossterm<power>.
            If it loses \\glossterm<hit points> from this damage, it is \\glossterm<sickened> as a \\glossterm<condition>.
        """, scaling="damage", tags=[]),
        Spell('Nauseating Pyrohemia', 4, 'target', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes fire damage equal to 2d8 plus half your \\glossterm<power>.
            If it loses \\glossterm<hit points> from this damage, it is \\glossterm<nauseated> as a \\glossterm<condition>.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Curse of Flammability', 5, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is highly flammable until it takes a \\glossterm<short rest>.
            Like dry wood or kindling, it catches on fire whenever it takes any fire damage.
            While ignited in this way, it takes 2d8 fire damage at the end of each round.

            It can put out the fire by making a \\glossterm<difficulty rating> 10 Dexterity check as a \\glossterm<move action> to put out the flames.
            Dropping \\glossterm<prone> as part of this action gives a +5 bonus to this check.
            Putting out the flames in this way does not remove this effect.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit As above, except that the effect lasts until the curse is removed.
        """, scaling="accuracy", tags=['Curse']),
        Spell('Kindled Fireburst', 2, 'One Tiny or larger active fire within \\rngmed range (see text)', """
            You cause a small source of fire, such as a torch, to erupts into a larger burst of flame.
            Make an attack vs. Reflex against everything within an \\areasmall radius from the target.
            \\hit Each target takes fire damage equal to 1d10 plus half your \\glossterm<power>.
        """, scaling="damage", tags=[]),
        Spell('Wings of the Phoenix', 5, 'Yourself', """
            You gain a 30 foot \\glossterm<fly speed> with a maximum height of 30 feet (see \\pcref<Flying>).
            If you are above that height, you gain a 30 foot \\glossterm<glide speed> instead.
        """, scaling="""
            \\rank<7> The maximum height increases to 60 feet.
        """, tags=['Attune (self)']),
    ],
    rituals=[
        Spell('Heat Wave', 4, None, """
            The temperature in a two mile radius cylinder-shaped \\glossterm<zone> from your location increases rapidly.
            Over the next minute after you finish this ritual, the temperature increases by 40 degrees Fahrenheit, to a maximum of 120 degrees.
            Unlike normal, this effect does not require \\glossterm<line of effect> to you.
            Instead, it affects all outdoor locations within the area.
            Even a thin barrier, such as a tent, is enough to protect locations from the effect of this ritual.
        """, tags=['Attune (self)'], ritual_time='one hour'),
        Spell('Pyrostorm', 8, None, """
            This ritual functions like the \\spell<heat wave> ritual, except that the temperature in the area increases by 60 degrees, to a minimum of 160 degrees.
        """, tags=['Attune (self)'], ritual_time='one hour'),
        Spell('Detect Flame', 1, None, """
            You learn the approximate distance and direction to any active fires within \\rnglong \\glossterm<range> of you.
            Since this is a \\glossterm<Detection> ability, its range can penetrate some solid objects (see \\pcref<Detection>).
            This spell can sense fires as small as a candle flame, but no smaller.
        """, tags=['Detection'], ritual_time='one minute'),
        Spell('Greater Detect Flame', 3, None, """
            This ritual functions like the \\spell<detect flame> ritual, except that the range increases to \\rngext.
        """, tags=['Detection'], ritual_time='one minute'),
        Spell('Supreme Detect Flame', 5, None, """
            This ritual functions like the \\spell<detect flame> ritual, except that the range increases to 2,000 feet.
        """, tags=['Detection'], ritual_time='one minute'),
    ],
    category='damage',
)
