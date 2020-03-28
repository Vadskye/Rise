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

            \\rankline
            \\rank<3> The maximum size of the object increases to Small.
            \\rank<5> The maximum size of the object increases to Medium.
            \\rank<7> The maximum size of the object increases to Large.
        """, tags=['Attune (self)', 'Manifestation']),
    ],
    lists=['Arcane', 'Pact'],
    spells=[
        Spell('Shieldbearer', 1, 'Yourself', """
            You gain a +1 \\glossterm<magic bonus> to Armor defense.

            \\rankline
            \\rank<3> You are not considered \\glossterm<defenseless> as long as you are not \\glossterm<unaware>, even if you are not wielding a weapon or shield.
            \\rank<5> The bonus increases to +2.
            \\rank<7> You are not considered \\glossterm<defenseless> even if you are \\glossterm<unaware>.
        """, tags=['Attune (self)', 'Manifestation']),
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
        Spell('Personal Weapon', 1, 'Yourself', """
            Choose a type of weapon that you are proficient with.
            You create a normal item of that type in your hand.
            If the item stops touching you, it disappears, and this effect ends.

            If you create a projectile weapon, you can fire it without ammunition by creating projectiles as you fire.
            The projectiles disappear after the attack is complete.

            % Strange duration for a spell
            This spell lasts until you use it again, or until you \\glossterm<dismiss> it as a \\glossterm<free action>.

            \\rankline
            \\rank<3> You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with \\glossterm<strikes> using the weapon.
            \\rank<5> You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<strikes> using the weapon.
            \\rank<7> The bonus to accuracy increases to +2.
        """, tags=['Manifestation']),
        Spell('Acid Orb', 1, 'One creature or object within \\rngmed range', """
            Make an attack vs. Armor against the target.
            \\hit The target takes acid \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=['Manifestation']),
        Spell('Cone of Acid', 1, 'Everything in a \\areamed cone from you', """
            Make an attack vs. Armor against each target.
            \\hit Each target takes acid \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage>.
            \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=['Manifestation']),
        Spell('Acid Breath', 4, ['Yourself', 'Everything within a \\arealarge cone'], """
            As a standard action, you can breathe acid like a dragon.
            When you do, make an attack vs Armor against each secondary target.
            \\hit Each secondary target takes acid \\glossterm<standard damage> +1d.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +3d.
        """, tags=['Attune (self)']),
        Spell('Corrosive Orb', 3, 'One creature or object within \\rngmed range', """
            Make an attack vs. Reflex against the target.
            \\hit The target takes acid \\glossterm<standard damage> +1d.
            This attack deals double damage to objects.

            \\rankline
            \\rank<5> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +3d.
        """, tags=['Manifestation']),
        Spell('Acid Rain', 4, 'Everything in a \\areasmall radius within \\rngmed range', """
            Make an attack vs. Armor against each target.
            \\hit Each target takes acid \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage>.
            \\rank<8> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=['Manifestation']),
        Spell('Forge', 1, 'One unoccupied square within \\rngclose range', """
            Choose a type of body armor, weapon, or shield that you are proficient with.
            You cannot create heavy armor.
            You create a normal item of that type at the target location.

            The item cannot be constructed of any magical or extraordinary material.
            % This should allow the Giant augment; is this worded to allow that?
            It is sized appropriately for you, up to a maximum of a Medium size item.

            \\rankline
            \\rank<3> You can also create heavy armor.
            \\rank<5> The item created is magically enhanced.
                A weapon grants a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<mundane> abilities,
                    and armor grants a +1 \\glossterm<magic bonus> to Armor defense.
            \\rank<7> You can cast this spell with the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Attune> (self) tag.
        """, tags=['Attune (self)']),
        Spell('Meteor', 4, 'Special', """
            You create a meteor in midair within \\rngclose range that falls to the ground, crushing foes in its path.
            The meteor takes up a \\areasmall radius, and must be created in unoccupied space.
            After being summoned, it falls up to 100 feet before disappearing.
            Make an attack vs. Armor against everything in its path.
            \\hit Each target takes bludgeoning and fire \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage>.
            \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=['Manifestation']),
        Spell('Meteor Swarm', 8, 'Special', f"""
            You create up to five meteors in midair within \\rnglong range that each fall to the ground, crushing foes in their paths.
            Each meteor takes up a \\areasmall radius, and must be created in unoccupied space.
            The areas affected by two different meteors cannot overlap.
            If one of the meteors is created in an invalid area, that meteor is not created, but the others are created and dealt their damage normally.

            After being summoned, each meteor falls up to 100 feet before disappearing.
            Make an attack vs. Armor against everything in the path of any meteor.
            \\hit Each target takes bludgeoning and fire \\glossterm<standard damage> -1d.
        """, tags=['Manifestation']),
        Spell('Web', 3, 'All Large or smaller creatures in the area (see text)', """
            You fill a \\areasmall radius \\glossterm<zone> within \\rngclose range with webs.
            The webs make the area \\glossterm<difficult terrain>.
            Each 5-ft.\\ square of webbing has a \\glossterm<vital resistance> equal to twice your \\glossterm<power> and is \\glossterm<vulnerable> to fire damage.

            In addition, make an attack vs. Reflex against each target.
            \\hit Each secondary target is \\glossterm<immobilized> as long as it has webbing from this ability in its space.

            \\rankline
            \\rank<5> The webs are no longer \\glossterm<vulnerable> to fire damage.
            \\rank<7> The vital resistance of each 5-ft.\\ square of webs increases to three times your \\glossterm<power>.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Poison -- Nitharit', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.

            \\hit The target becomes \\glossterm<poisoned> with nitharit.
            The primary effect causes the target to become \\glossterm<sickened>.
            The secondary effect causes the target to become \\glossterm<nauseated>.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Manifestation']),
        Spell('Poison -- Dragon Bile', 5, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.

            \\hit The target becomes \\glossterm<poisoned> with dragon bile.
            The primary effect causes the target to become \\glossterm<sickened> and lose a \\glossterm<hit point>.
            The secondary effect causes the target to become \\glossterm<nauseated> and lose two \\glossterm<hit points>.

            \\rankline
            \\rank<7> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=[]),
        Spell('Poison -- Black Lotus', 7, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.

            \\hit The target becomes \\glossterm<poisoned> with black lotus extract.
            The primary effect causes the target to become lose a \\glossterm<hit point> from each successful poison attack, including this attack.
            The secondary effect causes the target to gain a \\glossterm<vital wound>.
        """, tags=['Manifestation']),
        Spell('Caltrops', 1, 'One 5 ft.\\ square within \\rngclose range (see text)', """
            You create exceptionally sharp caltrops in the target location.
            Whenever a creature moves into the area, unless the creature moves at one quarter speed to avoid the danger, you make an attack vs. Armor against them.
            Unlike most attacks, this attack can happen during the \\glossterm<movement phase>.
            Caltrops may not be effective against creatures with an unusual anatomy.
            \\hit The target takes \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> You can affect an additional square within range.
            \\rank<5> The number of additional squares you can affect increases to two.
            \\rank<7> The number of additional squares you can affect increases to three.
        """, tags=['Manifestation', 'Sustain (minor)']),
    ],
    rituals=[
        Spell('Manifest Object', 3, 'One unoccupied square within \\rngclose range', """
            Make a Craft check to create an object of Small size or smaller.
            The object appears out of thin air in the target location.
            % TODO: add ability to create objects of other sizes/materials
            It must be made of nonliving, nonmagical, nonreactive vegetable matter, such as wood or cloth.

            This ritual takes one hour to perform.
        """, tags=['Attune (ritual)', 'Manifestation']),
        Spell('Create Sustenance', 3, 'One unoccupied squre within \\rngclose range', """
            This ritual creates food and drink in that square that is sufficient to sustain two Medium creatures per \\glossterm<power> for 24 hours.
            The food that this ritual creates is simple fare of your choice -- highly nourishing, if rather bland.

            This ritual takes one hour to perform.
        """, tags=['AP', 'Creation']),
        Spell('Copy Writing', 1, ['One Small or smaller written work within \\rngclose range', 'One Small or smaller set of blank pages within \\rngclose range'], """
            You copy the writing from the primary target onto the secondary target.
            The secondary target must have enough room for the writing.
            Copying the writing takes a tenth the time required to copy it by hand and requires no writing materials.
        """, tags=['Sustain (standard)']),
    ],
    category='damage',
)
