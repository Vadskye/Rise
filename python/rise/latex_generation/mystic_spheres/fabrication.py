from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: damage
# Secondary: utility
# Tertiary: debuff
# None: buff
fabrication=MysticSphere(
    name='Fabrication',
    short_description="Create objects to damage and impair foes",
    cantrips=[
        Effects('Fabricate Trinket', 'Yourself', """
            You make a Craft check to create an object of Tiny size or smaller.
            The object appears in your hand or at your feet.
            It must be made of nonliving, nonmagical, nonreactive vegetable matter, such as wood or cloth.
            At the end of each round, this spell ends if you are not within \\rngmed range of the item.

            This spell lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.
        """, scaling="""
            \\rank<2> The maximum size of the object increases to Small.
            \\rank<4> The maximum size of the object increases to Medium.
            \\rank<6> The maximum size of the object increases to Large.
        """, tags=['Manifestation']),
    ],
    lists=['Arcane', 'Pact'],
    spells=[
        Spell('Shieldbearer', 1, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            You gain a +1 \\glossterm<magic bonus> to Armor defense.
        """, scaling="""
            \\rank<3> You are not considered \\glossterm<defenseless> as long as you are not \\glossterm<unaware>, even if you are not wielding a weapon or shield.
            \\rank<5> The bonus increases to +2.
            \\rank<7> The bonus increases to +3.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Mystic Arrow', 1, 'One creature or object within \\rngmed range', """
            Make an attack vs. Armor against the target.
            \\hit The target takes piercing damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Mystic Blast Arrow', 3, 'One creature or object within \\rngmed range', """
            Make an attack vs. Armor against the target.
            \\hit The target takes piercing damage equal to 2d8 plus your \\glossterm<power>.
            If the target loses \\glossterm<hit points> from this damage, it is knocked \\glossterm<prone>.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=['Manifestation']),
        # +2 levels for no focus
        Spell('Bladestorm', 3, '\\glossterm<Enemies> adjacent to you', """
            This spell does not have the \\glossterm<Focus> tag.
            Make an attack vs. Armor against each target.
            \\hit Each target takes slashing damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Manifestation'], focus=False),
        Spell('Missile Storm', 5, '\\glossterm<Enemies> in a \\areahuge radius from you', """
            Make an attack vs. Armor against each target.
            \\hit Each target takes piercing damage equal to 2d10 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Hail of Arrows', 3, 'Everything in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Armor against each target.
            \\hit Each target takes piercing damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Blade Barrier', 2, 'Each creature that moves through the area (see text)', """
            A wall of whirling blades appears within \\rngmed range.
            The wall takes the form of a 15 ft.\\ high, \\areamed wall.
            The wall provides \\glossterm<cover> against attacks made through it.
            When a creature or object passes through the wall, make an attack vs. Armor against it.
            \\hit The target takes slashing damage equal to 1d10 plus half your \\glossterm<power>.
        """, scaling="damage", tags=['Sustain (minor)']),
        Spell('Blade Perimeter', 3, 'Each creature that moves through the area (see text)', """
            A wall of whirling blades appears within \\rngmed range.
            The wall takes the form of a 15 ft.\\ high, \\areasmall radius wall.
            The wall provides \\glossterm<cover> against attacks made through it.
            When a creature or object passes through the wall, make an attack vs. Armor against it.
            \\hit The target takes slashing damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Sustain (minor)']),
        Spell('Contracting Blade Perimeter', 6, 'Each creature that moves through the area (see text)', """
            This spell functions like the \\textit<blade perimeter> spell, except that the damage is increased to 4d6 plus half your \\glossterm<power>.
            % TODO: Clarify interaction with solid obstacles that block contraction?
            In addition, the wall's radius shrinks by 5 feet at the end of each round, dealing damage to everything it moves through.
            After the wall shrinks to have no radius, it begins expanding again at a rate of 5 feet per round.
            Once it expands back to its maximum radius, it begins shrinking again.
        """, scaling="damage", tags=[]),
        Spell('Personal Weapon', 1, 'Yourself', """
            Choose a type of weapon that you are proficient with.
            You create a normal item of that type in your hand.
            If the item stops touching you, it disappears, and this effect ends.

            If you create a projectile weapon, you can fire it without ammunition by creating projectiles as you fire.
            The projectiles disappear after the attack is complete.

            % Strange duration for a spell
            This spell lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.
        """, scaling="""
            \\rank<3> You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with \\glossterm<strikes> using the weapon.
            \\rank<5> You gain a +4 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using the weapon.
            \\rank<7> The bonus to accuracy increases to +2, and the bonus to power increases to +8.
        """, tags=['Manifestation']),
        Spell('Forge', 1, 'One unoccupied square within \\rngshort range', """
            Choose a type of body armor, weapon, or shield that you are proficient with.
            You cannot create heavy armor.
            You create a normal item of that type at the target location.

            The item cannot be constructed of any magical or extraordinary material.
            It is sized appropriately for you, up to a maximum of a Medium size item.
        """, scaling="""
            \\rank<3> You can also create heavy armor.
            In addition, the item created is magically enhanced.
                A weapon grants a +2 \\glossterm<magic bonus> to your \\glossterm<mundane> \\glossterm<power>,
                    and armor grants a +1 \\glossterm<magic bonus> to Armor defense.
            \\rank<5> The magic bonus for a weapon increases to +4, and the magic bonus for armor increases to +2.
            \\rank<7> The magic bonus for a weapon increases to +8, and the magic bonus for armor increases to +3.
        """, tags=['Attune (self)']),
        # +2 levels for fire + bludgeoning, which breaks resistances
        # +1 level for meteor path
        Spell('Meteor', 6, 'Special', """
            You create a meteor in midair within \\rngmed range that falls to the ground, crushing foes in its path.
            The meteor takes up a \\areasmall radius, and must be created in unoccupied space.
            After being summoned, it falls up to 100 feet before disappearing.
            Make an attack vs. Armor against everything in its path.
            \\hit Each target takes bludgeoning and fire damage equal to 4d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Manifestation']),
        # treated like r1 softener, +2 levels for leaving behind something, +1
        # for crit effect
        Spell('Web', 4, 'All Large or smaller creatures in the area (see text)', """
            You fill a \\areasmall radius \\glossterm<zone> within \\rngshort range with webs.
            The webs make the area \\glossterm<difficult terrain>.
            Each 5-ft.\\ square of webbing has a \\glossterm<vital resistance> equal to twice your \\glossterm<power> and is \\glossterm<vulnerable> to fire damage.

            In addition, make an attack vs. Reflex against each target.
            \\hit Each secondary target is \\glossterm<slowed> as long as it has webbing from this ability in its space.
            \\glance As above, except that the effect is removed at the end of the next round.
            \\crit Each secondary target is \\glossterm<immobilized> as long as it has webbing from this ability in its space.
        """, scaling="accuracy", tags=['Manifestation', 'Sustain (minor)']),
        Spell('Caltrops', 1, 'One 5 ft.\\ square within \\rngshort range (see text)', """
            You create exceptionally sharp caltrops in the target location.
            Whenever a creature moves into the area, unless the creature moves at one quarter speed to avoid the danger, you make an attack vs. Armor against them.
            Unlike most attacks, this attack can happen during the \\glossterm<movement phase>.
            Caltrops may not be effective against creatures with an unusual anatomy.
            \\hit The target takes piercing damage equal to 1d8 plus half your \\glossterm<power>.
        """, scaling="damage", tags=['Manifestation', 'Sustain (minor)']),
        Spell('Instant Ammunition', 2, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            You create a nonmagical arrow or crossbow bolt in a bow or crossbow that you are holding.
            The ammunition can be blunted, but you cannot create other forms of special ammunition like fire arrows or repeating bolts.
            The object persists until the end of the round, at which point it disappears.
            Because this spell has the \\glossterm<Swift> tag, you can fire the created projectile from the weapon in the same phase that you cast this spell.
        """, scaling="""
            \\rankline
            \\rank<4> You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with any \\glossterm<strike> using ammunition created with this spell.
            \\rank<6> The accuracy bonus increases to +2.
        """, tags=['Manifestation', 'Swift']),
        Spell('Daggerswarm', 4, 'Yourself (see text)', """
            You can cast this spell as a \\glossterm<minor action>.

            When you cast this spell, a small swarm of daggers appears floating over your head.
            As a \\glossterm<minor action>, you can fling one dagger at a creature or object within \\rngshort range.
            When you do, make an attack vs. Armor against that target.
            After the dagger deals damage, it disappears and another dagger appears in the swarm.
            \\hit The target takes 2d6 piercing damage.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=['Attune (self)']),
        # +2 levels because it sticks around
        Spell('Daggercloud', 4, 'Everything in a \\areatiny radius \\glossterm<zone> within \\rngmed range (see text)', """
            At the end of each round, make an attack vs. Armor against each target in the area.
            \\hit Each target takes piercing damage equal to 2d8 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Manifestation', 'Sustain (minor)']),
    ],
    rituals=[
        Spell('Manifest Object', 3, 'One unoccupied square within \\rngshort range', """
            Make a Craft check to create an object of Small size or smaller.
            The object appears out of thin air in the target location.
            % TODO: add ability to create objects of other sizes/materials
            It must be made of nonliving, nonmagical, nonreactive vegetable matter, such as wood or cloth.
        """, tags=['Attune (ritual)', 'Manifestation'], ritual_time='one hour'),
        Spell('Fabricate Water', 1, None, """
            You create up to two gallons of wholesome, drinkable water at any number of locations within \\rngshort range, allowing you to fill multiple small water containers.
            You must create a minimum of one ounce of water in each location.
        """, tags=['Creation'], ritual_time='one minute'),
        Spell('Fabricate Sustenance', 2, None, """
            This ritual creates food and drink in one unoccupied square within \\rngshort range that is sufficient to sustain five Medium creatures for 24 hours.
            It also creates basic receptacles to hold the food and drink.
            The food that this ritual creates is simple fare of your choice -- highly nourishing, if rather bland.
        """, tags=['Creation'], ritual_time='one hour'),
        Spell('Fabricate Feast', 3, None, """
            This ritual creates food and drink in any number of unoccupied squares within \\rngshort range that is sufficient to sustain twenty Medium creatures for 24 hours.
            It also creates basic receptacles to hold the food and drink.
            The food that this ritual creates is simple fare of your choice -- highly nourishing, if rather bland.
        """, tags=['Creation'], ritual_time='one hour'),
        Spell('Copy Writing', 1, ['One Small or smaller written work within \\rngshort range', 'One Small or smaller set of blank pages within \\rngshort range'], """
            You copy the writing from the primary target onto the secondary target.
            The secondary target must have enough room for the writing.
            This ritual takes half the time required to copy the writing by hand, to a minimum of one minute, and does not require writing materials.
            It requires one \\glossterm<fatigue point> from its participants.
        """, tags=[], ritual_time='special'),
        Spell('Greater Copy Writing', 4, ['One Medium or smaller written work within \\rngshort range', 'One Medium or smaller set of blank pages within \\rngshort range'], """
            This ritual functions like the \\spell<copy writing> ritual, except that it can target objects of Medium or smaller size.
            % "This ritual takes" -- make checks happy
            In addition, the time required to perform this ritual decreases to one tenth of the time required to copy the writing by hand, to a minimum of one minute.
            It requires one \\glossterm<fatigue point> from its participants.
        """, tags=[], ritual_time='special'),
        Spell('Ammunition Stockpile', 3, None, """
            You create a Large pile of either nonmagical arrows or crossbow bolts in any unoccupied location adjacent to you.
            You can choose to create blunted ammunition, but you cannot create other forms of special ammunition like fire arrows or repeating bolts.
            Any creature may take ammunition from the pile to use.
        """, tags=['Attune (ritual)', 'Manifestation'], ritual_time='one hour'),
    ],
    category='damage',
)
