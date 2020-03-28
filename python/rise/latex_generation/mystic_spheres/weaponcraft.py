from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Weaponcraft can create and manipulate weapons of all varieties; all of its
# spells should involve a mixture of creating a weapon and manipulating
# it after it is created.

# Primary: damage
# Secondary: utility
# None: buff, debuff
weaponcraft=MysticSphere(
    name="Weaponcraft",
    short_description="Create and manipulate weapons to attack foes",
    cantrips=[
        Effects('Personal Weapon', 'Yourself', """
            Choose a type of weapon that you are proficient with.
            You create a normal item of that type in your hand.
            If the item stops touching you, it disappears, and this effect ends.

            If you create a projectile weapon, you can fire it without ammunition by creating projectiles as you fire.
            The projectiles disappear after the attack is complete.

            % Strange duration for a cantrip
            This spell lasts until you use it again, or until you \\glossterm<dismiss> it as a \\glossterm<free action>.

            \\rankline
            \\rank<3> You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with \\glossterm<strikes> using the weapon.
            \\rank<5> You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using the weapon.
            \\rank<7> The bonus to accuracy increases to +2.
        """, tags=['Manifestation']),
    ],
    lists=['Arcane', 'Divine', 'Pact'],
    spells=[
        Spell('Mystic Arrow', 1, 'One creature or object within \\rngmed range', """
            Make an attack vs. Armor against the target.
            \\hit The target takes piercing \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=['Manifestation']),
        Spell('Mystic Blast Arrow', 4, 'One creature or object within \\rngmed range', """
            Make an attack vs. Armor agains the target.
            \\hit The target takes piercing \\glossterm<standard damage> +2d.
            If this attack \\glossterm<injures> the target, it is knocked \\glossterm<prone>.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=['Manifestation']),
        Spell('Bladestorm', 3, '\\glossterm<Enemies> adjacent to you', """
            This spell does not have the \\glossterm<Focus> tag.
            Make an attack vs. Armor against each target.
            \\hit Each target takes slashing \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<5> The damage increases to \\glossterm<standard damage>.
            \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=['Manifestation'], focus=False),
        Spell('Missile Storm', 3, '\\glossterm<Enemies> in a \\areamed radius from you', """
            Make an attack vs. Armor against each target.
            \\hit Each target takes piercing \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<6> The area increases to a \\arealarge radius.
            \\rank<8> The area increases to a \\areahuge radius.
        """, tags=['Manifestation']),
        Spell('Hail of Arrows', 4, 'Everything in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Armor against each target.
            \\hit Each target takes piercing \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage>.
            \\rank<8> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=['Manifestation']),
        Spell('Blade Barrier', 3, 'Each creature that moves through the area (see text)', """
            A wall of whirling blades appears within \\rngmed range.
            The wall takes the form of a 20 ft.\\ high, \\arealarge line.
            The wall provides \\glossterm<cover> against attacks made through it.
            When a creature or object passes through the wall, make an attack vs. Armor against it.
            \\hit The target takes slashing \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<5> The damage increases to \\glossterm<standard damage>.
            \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=['Sustain (minor)']),
        Spell('Blade Perimeter', 4, 'Each creature that moves through the area (see text)', """
            A wall of whirling blades appears within \\rngmed range.
            The wall takes the form of a 20 ft.\\ high, \\areamed radius line.
            The wall provides \\glossterm<cover> against attacks made through it.
            When a creature or object passes through the wall, make an attack vs. Armor against it.
            \\hit The target takes slashing \\glossterm<standard damage> -1d.

            % TODO: Clarify interaction with solid obstacles that block contraction?
            \\rankline
            \\rank<6> The wall's radius shrinks by 5 feet at the end of each round, dealing damage to everything it moves through.
            When the wall shrinks to have no radius, this spell ends.
            \\rank<8> After the wall shrinks to have no radius, it begins expanding again at a rate of 5 feet per round.
            Once it expands back to its maximum radius, it begins shrinking again.
        """, tags=['Sustain (minor)']),
        Spell('Summon Club', 1, 'One unoccupied square within \\rngmed range', """
            A creature in the shape of a club appears in the target location.
            The weapon floats about three feet off the ground, and is sized appropriately to be wielded by a creature of your size.
            The creature's statistics use the values below.
            If a summoned weapon gains a \\glossterm<vital wound> or has no hit points remaining at the end of a phase, it disappears.
            \\begin<itemize>
                \\item Its \\glossterm<damage resistance> and \\glossterm<vital resistance> are equal to the base values for your level (see \\pcref<Character Advancement>).
                \\item It has 8 \\glossterm<hit points>.
                \\item Each of its \\glossterm<defenses> is equal to 4 \\add your level.
                \\item Its \\glossterm<accuracy> is equal to your level \\add half your base Perception \\sub 2.
                \\item Its \\glossterm<power> with its attacks is equal to your \\glossterm<power> \\sub 2.
                \\item Its \\glossterm<fly speed> is 30 feet, with good \\glossterm<maneuverability>.
                \\item It has no \\glossterm<action points>.
            \\end<itemize>

            Each round, the weapon automatically moves towards the creature closest to it during the \\glossterm<movement phase>, following that creature to the best of its abilities.
            During the \\glossterm<action phase>, it makes a melee \\glossterm<strike> against a random creature adjacent to it.
            If it hits, it deals \\glossterm<standard damage>.

            \\rankline
            \\rank<3> The damage dealt by the weapon increases to \\glossterm<standard damage>.
            \\rank<5> The damage dealt by the weapon increases to \\glossterm<standard damage> +1d.
            \\rank<7> The damage dealt by the weapon increases to \\glossterm<standard damage> +2d.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Aerial Weapon', 3, 'One unoccupied square within \\rngmed range', """
            This spell functions like the \\spell<summon club> spell, except that the weapon's maximum height above the ground is increased to 100 feet.
            This allows the weapon to fly up to fight airborne foes.

            \\rankline
            \\rank<5> The damage dealt by the weapon increases to \\glossterm<standard damage>.
            \\rank<7> The weapon has no maximum height above the ground.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Summon Ballista', 3, 'One unoccupied square within \\rngmed range', """
            This spell functions like the \\spell<summon club> spell, except that it creates a fully functional Large ballista instead of a club.
            The ballista functions like any other weapon, with the following exceptions.

            It cannot move, and makes ranged \\glossterm<strikes> instead of melee strikes.
            Its attacks have a maximum range of 100 feet and deal piercing damage.
            In addition, the ballista attacks the creature farthest from it, instead of the creature closest to it.

            \\rankline
            \\rank<5> The damage dealt by the ballista increases to \\glossterm<standard damage>.
            \\rank<7> The ballista gains a second bolt track, allowing it to fire at two different targets.
            It canot fire at the same target twice.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Giant Blade', 4, 'One unoccupied square within \\rngmed range', """
            This spell functions like the \\spell<summon club> spell, except that the weapon takes the form of a Large greatsword.
            The weapon's attacks hit everything in a \\areasmall cone from it.
            It aims the cone to hit as many creatures as possible.

            \\rankline
            \\rank<6> The damage dealt by the weapon increases to \\glossterm<standard damage>.
            \\rank<8> The damage dealt by the weapon increases to \\glossterm<standard damage> +1d.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Titan Blade', 7, 'One unoccupied square within \\rngmed range', """
            This spell functions like the \\spell<summon club> spell, except that the weapon takes the form of a Gargantuan greatsword.
            The weapon's attacks hit everything in a \\areamed cone from it.
            It aims the cone to hit as many creatures as possible.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Paired Weapons', 8, 'One unoccupied square within \\rngmed range', """
            This spell functions like the \\spell<summon club> spell, except that you summon two weapons instead of one.
            Each weapon attacks independently.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Shieldbearer', 1, 'Yourself', """
            You gain a +1 \\glossterm<magic bonus> to Armor defense.

            \\rankline
            \\rank<3> You are not considered \\glossterm<defenseless> as long as you are not \\glossterm<unaware>, even if you are not wielding a weapon or shield.
            \\rank<5> The bonus increases to +2.
            \\rank<7> You are not considered \\glossterm<defenseless> even if you are \\glossterm<unaware>.
        """, tags=['Attune (self)', 'Manifestation']),
    ],
    category='buff, offense',
)
