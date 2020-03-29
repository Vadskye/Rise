from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# This seems weird?
# Secondary: buff, damage, debuff, utility
summon=MysticSphere(
    name="Summoning",
    short_description="Summon creatures to fight with you",
    cantrips=[
    ],
    lists=['Arcane', 'Divine', 'Nature'],
    spells=[
        # TODO: this needs more spell
        Spell('Summon Monster', 1, 'One unoccupied square on stable ground within \\rngmed range', """
            You summon a creature in the target location.
            It visually appears to be a common Small or Medium animal of your choice, though in reality it is a manifestation of magical energy.
            Regardless of the appearance and size chosen, the creature's statistics use the values below.
            If a summoned creature gains a \\glossterm<vital wound> or has no hit points remaining at the end of a phase, it disappears.

            \\begin<itemize>
                \\item Its \\glossterm<wound resistance> and \\glossterm<vital resistance> are equal to the base values for your level (see \\pcref<Resistance Values>).
                \\item It has 6 \\glossterm<hit points>.
                \\item Each of its \\glossterm<defenses> is equal to 4 \\add your level.
                \\item Its \\glossterm<accuracy> is equal to your level \\add half your base Perception \\sub 2.
                \\item Its \\glossterm<power> with its attacks is equal to your \\glossterm<power>.
                \\item Its \\glossterm<land speed> is 30 feet.
                \\item It has no \\glossterm<action points>.
            \\end<itemize>

            Each round, you can choose the creature's actions by mentally commanding it as a \\glossterm<minor action>.
            There are only two actions it can take.
            As a \\glossterm<move action>, it can move as you direct.
            As a standard action, it can make a melee \\glossterm{strike} against a creature it threatens.
            If it hits, it deals physical \\glossterm<standard damage> -2d.
            The subtypes of damage dealt by this attack depend on the creature's appearance.
            Most animals bite or claw their foes, which deals bludgeoning and slashing damage.

            If you do not command the creature's actions, it will continue to obey its last instructions if possible or do nothing otherwise.
            Summoned creatures have no mind or agency, and will not act on their own even if attacked.

            \\rankline
            \\rank<3> The creature gains a +1 bonus to \\glossterm<accuracy>.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Summon Weapon', 3, 'One unoccupied square within \\rngmed range', """
            This spell functions like the \\textit<summon monster> spell, with the following exceptions.
            The summoned creature takes the form of a melee weapon of your choice that you are proficient with.
            It is sized appropriately to be wielded by a creature of your size.
            It floats three feet off the ground, and has a 30 foot \\glossterm<fly speed> instead of a \\glossterm<land speed>, with good \\glossterm<maneuverability> (see \\pcref<Fly Speed>).
            The weapon's maximum height above the ground is limited to 10 feet.
            The creature's accuracy and damage are modified appropriately for based on your chosen weapon, and it gains the effect of the weapon's normal tags (see \\pcref<Weapon Tags>).
            The weapon is considered to be held in two hands if possible, which can increase the damage dealt by medium weapons (see \\pcref<Weapon Usage Classes>).

            You cannot control the summoned weapon's actions.
            Each round, the weapon automatically moves towards the creature closest to it during the \\glossterm<movement phase>, following that creature to the best of its abilities.
            During the \\glossterm<action phase>, it makes a melee \\glossterm<strike> against a creature that it \\glossterm<threatens>.
            The weapon prefers to avoid accuracy and damage penalties that would be imposed by cover or special weapon grips.
            It choses randomly if all possible targets are equally easy to attack.

            \\rankline
            \\rank<3> The damage dealt by the weapon increases to \\glossterm<standard damage> -1d.
            \\rank<5> The damage dealt by the weapon increases to \\glossterm<standard damage>.
            \\rank<7> The damage dealt by the weapon increases to \\glossterm<standard damage> +1d.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Aerial Weapon', 4, 'One unoccupied square within \\rngmed range', """
            This spell functions like the \\spell<summon weapon> spell, except that the weapon's maximum height above the ground is increased to 100 feet.
            This allows the weapon to fly up to fight airborne foes.

            \\rankline
            \\rank<6> The weapon has no maximum height above the ground.
            \\rank<8> The damage dealt by the weapon increases to \\glossterm<standard damage> -1d.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Summon Ballista', 3, 'One unoccupied square within \\rngmed range', """
            This spell functions like the \\spell<summon weapon> spell, except that it creates a fully functional Large ballista instead of a weapon.
            The ballista functions like any other weapon, with the following exceptions.

            It cannot move, and makes ranged \\glossterm<strikes> instead of melee strikes.
            Its attacks have a maximum range of 100 feet and deal piercing damage.
            In addition, the ballista attacks the creature farthest from it, instead of the creature closest to it.

            \\rankline
            \\rank<5> The damage dealt by the ballista increases to \\glossterm<standard damage> -1d.
            \\rank<7> The ballista gains a second bolt track, allowing it to fire at two different targets.
            It canot fire at the same target twice.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Summon Paired Weapons', 8, 'One unoccupied square within \\rngmed range', """
            This spell functions like the \\spell<summon weapon> spell, except that you summon two weapons instead of one.
            Each weapon attacks independently.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Summon Earth Elemental', 4, 'One unoccupied square on stable ground within \\rngmed range', """
            This spell functions like the \\spell<summon monster> spell, except that the summoned creature appears to be an earth elemental and deals bludgeoning damage.
            It has two additional \\glossterm<hit points>, a bonus to \\glossterm<resistances> against \\glossterm<physical damage> equal to half your \\glossterm<power>, and is immune to electricity damage.

            \\rankline
            \\rank<6> The creature gains a +1 bonus to \\glossterm<accuracy>.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Summon Water Elemental', 3, 'One unoccupied square on stable ground within \\rngmed range', """
            This spell functions like the \\spell<summon monster> spell, except that the summoned creature appears to be an water elemental and deals bludgeoning damage.
            It has a 30 foot \\glossterm<swim speed> and suffer no penalties for fighting underwater (see \\pcref<Underwater Combat>).
            In addition, it is \\glossterm<vulnerable> to electricity damage.

            \\rankline
            \\rank<5> The creature gains a +1 bonus to \\glossterm<accuracy>.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Summon Air Elemental', 4, 'One unoccupied square on stable ground within \\rngmed range', """
            This spell functions like the \\spell<summon monster> spell, except that the summoned creature appears to be an air elemental and deals bludgeoning damage.
            It has a 30 foot \\glossterm<fly speed> with good \\glossterm<maneuverability>.

            \\rankline
            \\rank<6> The creature gains a +1 bonus to \\glossterm<accuracy>.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Summon Fire Elemental', 5, 'One unoccupied square on stable ground within \\rngmed range', """
            This spell functions like the \\spell<summon monster> spell, except that the summoned creature appears to be a fire elemental and deals fire damage.
            When it deals fire damage to a creature with a \\glossterm<critical hit>, that creature is \\glossterm<ignited> as a \\glossterm<condition>.
            This condition can be removed if the target makes a \\glossterm<difficulty rating> 10 Dexterity check as a \\glossterm<move action> to put out the flames.
            Dropping \\glossterm<prone> as part of this action gives a +5 bonus to this check.
            The flames can also be extinguished if the target is drenched in water, takes at least 5 cold damage, or other similar effects.

            In addition, the fire elemental is immune to fire damage.

            \\rankline
            \\rank<7> The creature gains a +1 bonus to \\glossterm<accuracy>.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Summon Bear', 3, 'One unoccupied square on stable ground within \\rngmed range', """
            This spell functions like the \\spell<summon monster> spell, except that the creature appears to be a Medium bear.
            As a standard action, it can make a \\glossterm<grapple> attack against a creature it threatens.
            While grappling, the manifested creature can either make a strike or attempt to escape the grapple.

            \\rankline
            \\rank<5> The creature gains a +1 bonus to \\glossterm<accuracy>.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Summon Mount', 3, 'One unoccupied square on stable ground within \\rngmed range', """
            This spell functions like the \\spell<summon monster> spell, except that you must also choose an \\glossterm<ally> within \\rngmed range to ride the summoned creature.
            The summoned creature appears to be either a Large horse or a Medium pony.
            It comes with a bit and bridle and a riding saddle, and will only accept the target as a rider.
            The creature follows its rider's directions to the extent that a well-trained horse would and it cannot attack.

            \\rankline
            \\rank<5> The creature gains a +1 bonus to its maximum \\glossterm<hit points>.
            \\rank<7> The hit point bonus increases to +2.
        """, tags=['Attune (target)', 'Manifestation']),
        Spell('Summon Wolfpack', 5, 'One unoccupied square on stable ground within \\rngmed range', """
            This spell functions like the \\spell<summon monster> spell, except that it summons a pack of four wolf-shaped creatures instead of a single creature.
            Each creature has a -2 penalty to \\glossterm<accuracy> and \\glossterm<defenses> compared to a normal summoned creature.
            % TODO: wording?
            You must command the creatures as a group, rather than as individuals.
            Each creature obeys your command to the extent it can.

            \\rankline
            \\rank<7> The creature gains a +1 bonus to \\glossterm<accuracy>.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Summon Pegasus', 5, 'One unoccupied location on stable ground within \\rngmed range', """
            This spell functions like the \\spell<summon mount> spell, except that the summoned creature appears to be either a Large or Medium pegasus.
            % TODO: wording of "trained as a mount"?
            It has a 30 foot \\glossterm<fly speed> and is trained as a mount.

            \\rankline
            \\rank<7> The creature gains a +1 bonus to its maximum \\glossterm<hit points>.
        """, tags=['Attune (target)', 'Manifestation']),
    ],
    rituals=[
        # weird to have a spell and a ritual but both are useful
        Spell('Ritual Mount', 3, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
            This ritual summons your choice of a Large light horse or a Medium pony to serve as a mount.
            The creature appears in an unoccupied location within \\rngclose range.
            It comes with a bit and bridle and a riding saddle, and will only accept the target as a rider.
            It has the same statistics as a creature from the \\spell<summon monster> spell, except that it follows its rider's directions to the extent that a well-trained horse would and it cannot attack.
        """, tags=['Attune (ritual)', 'Manifestation']),
    ],
    # What category does this belong to?
    category='buff, offense',
)
