from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: buff
# Secondary: utility
# Tertiary: debuff, damage
# None: none
polymorph=MysticSphere(
    name="Polymorph",
    short_description="Change the physical shape or outward form of objects and creatures",
    cantrips=[
        Effects('Alter Object', 'Unattended, nonmagical object you can touch', """
            You make a Craft check to alter the target (see \\pcref<Craft>), except that you do not need any special tools to make the check (such as an anvil and furnace).
            The maximum \\glossterm<vital resistance> of a material you can affect with this ability is equal to your \\glossterm<power>.

            % too short?
            Each time you cast this spell, you can accomplish work that would take up to two rounds with a normal Craft check.
        """, scaling="""
            \\rank<3> The amount of work you accomplish with the spell increases to five rounds.
            \\rank<5> The amount of work you accomplish with the spell increases to one minute.
            \\rank<7> The amount of work you accomplish with the spell increases to two minutes.
        """, tags=[]),
    ],
    lists=['Arcane', 'Nature', 'Pact'],
    spells=[
        Spell('Natural Weapon', 1, 'Yourself', """
            You gain your choice of one of the following \\glossterm<natural weapons>: bite, claw, constrict, gore, ram, slam, or talon.
            For details, see \\tref<Natural Weapons>.
        """, scaling="""
            \\rank<3> You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with natural weapons.
            \\rank<5> You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with natural weapons.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Attune (self)']),
        Spell('Piercing Grasp', 1, 'One creature within your \\glossterm<reach>', """
            This spell does not have the \\glossterm<Focus> tag.
            You must have a \\glossterm<free hand> to cast this spell.

            You twist your hand into a spike that bends past armor to injure your foe.
            Make a melee attack vs. Reflex against the target.
            \\hit The target takes piercing damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=[], focus=False),
        # +1 level for shrinking two size categories
        Spell('Baleful Polymorph', 5, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes 2d8 physical damage.
            If it loses \\glossterm<hit points> from this damage, it is balefully polymorphed as a \\glossterm<condition>.
            It shrinks by two \\glossterm<size categories> and is \\glossterm<confused>.
        """, scaling="damage", tags=[]),
        Spell('Twist Flesh', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes physical damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=[]),
        Spell('Shrink', 1, 'Yourself', """
            The target's size decreases by one \\glossterm<size category>.
            This decreases its \\glossterm<base speed> and improves its \\glossterm<Stealth> skill.
            It may also decrease the target's \\glossterm<reach> (see \\pcref<Size in Combat>).
            However, its physical form is not altered fully to match its new size, and its Strength and Dexterity are unchanged.

            You can cast this spell as a \\glossterm<minor action>.
        """, scaling="""
            \\rank<3> This spell can target a Small or larger \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<5> The minimum size category is reduced to Diminuitive.
            \\rank<7> You can decrease the target's size category by up to two size categories.
        """, tags=['Attune (target)']),
        Spell('Stoneskin', 1, 'Yourself or an \\glossterm<ally> in \\rngmed range', """
            The target gains a +2 \\glossterm<magic bonus> to \\glossterm<resistances> against \\glossterm<physical> damage.

            You can cast this spell as a \\glossterm<minor action>.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            In addition, the bonus increases to +4.
            \\rank<5> The bonus increases to +8.
            \\rank<7> The bonus increases to +16.
        """, tags=['Attune (target)']),
        Spell('Enlarge', 3, 'Yourself', """
            The target's size increases by one \\glossterm<size category>.
            This increases its \\glossterm<base speed> and reduces its \\glossterm<Stealth> skill.
            It may also increase the target's \\glossterm<reach> (see \\pcref<Size in Combat>).
            However, its physical form is not altered fully to match its new size, and its Strength and Dexterity are unchanged.

            You can cast this spell as a \\glossterm<minor action>.
        """, scaling="""
            \\rank<5> This spell can target a Large or smaller \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<7> You can increase the target's size category by up to two size categories.
        """, tags=['Attune (target)']),
        Spell('Alter Appearance', 3, 'Yourself', """
            You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
            You gain a +4 bonus on the check, and you ignore penalties for changing the target's gender, species, subtype, or age.
            However, this effect is unable to alter the target's clothes or equipment in any way.
        """, scaling="""
            \\rank<5> This spell can target a Large or smaller \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<7> The bonus increases to +6.
        """, tags=['Attune (target)']),
        Spell('Craft Object', 5, 'Any number of unattended, nonmagical objects within \\rngclose range', """
            You make a Craft check to transform the targets into a new item (or items) made of the same materials.
            You require none of the tools or time expenditure that would normally be necessary.
            The total size of all targets combined must be Large size or smaller.
        """, scaling="""
            \\rank<7> The maximum combined size is increased to Huge.
        """, tags=[]),
        # +4 levels for +2d, disintegration is free?
        Spell('Disintegrate', 5, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes physical damage equal to 4d6 plus your \\glossterm<power>.
            In addition, if the target has no hit points remaining at the end of the current \\glossterm<phase>, it dies.
            Its body is completely disintegrated, leaving behind only a pinch of fine dust.
            Its equipment is unaffected.
        """, scaling="damage", tags=[]),
        Spell('Malleable Body', 4, 'Yourself', """
            Your body and equipment becomes highly flexible and malleable, allowing you to compress your body or contort yourself into odd shapes.
            This has the following effects:
            \\begin<itemize>
                \\item You gain a \\glossterm<climb speed> equal to your \\glossterm<base speed>.
                \\item You gain a +8 \\glossterm<magic bonus> to the Flexibility skill. In addition, the minimum size you can squeeze down to is reduced to one inch, which can dramatically improve your ability to squeeze through tight spaces.
                \\item You are immune to \\glossterm<critical hits> from \\glossterm<strikes>.
                \\item Your \\glossterm<resistance> to \\glossterm<physical damage> is reduced to 0.
            \\end<itemize>
        """, scaling="""
            \\rank<6> The bonus to Flexibility increases to +12.
        """, tags=['Attune (self)']),
        Spell('Spikeform', 3, ['Yourself', 'See text'], """
            You transform your body to have dangerous spikes.
            At the end of each round, make an attack vs. Armor against each creature adjacent to you that either is \\glossterm<grappling> with you or that attacked you with a melee weapon that round.
            % full dice, but half power
            \\hit Each secondary target takes electricity damage equal to 2d8 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Attune (self)']),
        Spell('Extruding Spikeform', 7, ['Yourself', '\\glossterm<Enemies> adjacent to you (see text)'], """
            You transform your body to have dangerous spikes that you can consciously extrude to impale nearby foes.
            As a \\glossterm<minor action>, you can extend the spikes to make an attack vs. Armor against each creature adjacent to you.
            \\hit Each secondary target takes piercing damage equal to 4d8 plus half your \\glossterm<power>.
        """, scaling="damage", tags=['Attune (self)']),
        Spell('Absorb Object', 3, 'One Small or smaller \\glossterm<unattended> object you touch', """
            You absorb the target into your body.
            Your weight is increased by the weight of the object, but the object's presence cannot be otherwise physically detected.
            A reactive object, such as alchemist's fire or poison, continues reacting inside your body, which may be harmful to you.
            You cannot absorb only part of a larger object.

            This effect lasts until you use it again, \\glossterm<dismiss> it as a \\glossterm<free action>, or fall unconscious.
            When this effect ends, the object appears in a free hand, if you have one available, or drops to the floor.
        """, scaling="""
            \\rank<5> The maximum size of the object increases to Medium.
            \\rank<7> The maximum size of the object increases to Large.
        """, tags=[]),
        Spell('Camouflage', 1, 'Yourself', """
            The target gains a +3 \\glossterm<magic bonus> to the Stealth skill.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<5> The bonus increases to +5.
            \\rank<7> The bonus increases to +7.
        """, tags=['Attune (target)']),
        Spell('Sludgeform', 7, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes 4d6 physical damage.
            If it loses \\glossterm<hit points> from this damage, its physical form loses coherence and partially collapses into a sludgelike mass as a \\glossterm<condition>.
            It has no \\glossterm<free hands>, causing it to drop anything it is holding and making it unable to take any actions that require free hands.
            Its speed with all of its \\glossterm<mundane> movement modes are reduced to one quarter normal.
            It is also unable to speak normally or use verbal or somatic \\glossterm<components>.
        """, tags=[]),
    ],
    rituals=[
        # Should this also be a spell? Incredibly niche, but golem makers
        # would want it...
        Spell('Mending', 1, 'One \\glossterm<unattended> object within \\rngclose range', """
            The target is regains hit points equal to 1d6 plus half your \\glossterm<power>.
        """, tags=[], ritual_time='one minute'),
        Spell('Morph Weapon', 1, 'One unattended manufactured weapon', """
            The target changes into another weapon from the same weapon group.
            At least one ritual participant must be proficient with that weapon group.
            You cannot change it into an exotic weapon in this way.
            When this effect ends, the target returns to its original shape.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
        Spell('Exotic Morph Weapon', 3, 'One unattended manufatured weapon', """
            This ritual functions like the \\spell<morph weapon> ritual, except that you can also change the target into an exotic weapon.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
        Spell('Fortify', 1, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
            Unlike most abilities, this ritual can affect individual parts of a whole object.

            % How should this affect Strength break difficulty ratings?
            The target gains a +5 \\glossterm<magic bonus> to \\glossterm<resistances>.
            If the target is moved, this effect ends.
            Otherwise, it lasts for one year.
        """, tags=['Attune (ritual)'], ritual_time='one hour'),
        Spell('Enduring Fortify', 4, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
            This ritual functions like the \\spell<fortify> ritual, except that the effect lasts for one hundred years.
        """, tags=[], ritual_time='24 hours'),
        Spell('Enduring Greater Fortify', 5,'Greater Fortify', """
            This ritual functions like the \\spell<greater fortify> ritual, except that the effect lasts for one hundred years.
        """, tags=[], ritual_time='24 hours'),
        Spell('Greater Fortify', 4, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
            This ritual functions like the \\spell<fortify> ritual, except that the bonus to \\glossterm<resistances> increases to 10.
        """, tags=['Attune (ritual)'], ritual_time='one hour'),
        Spell('Supreme Fortify', 7, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
            This ritual functions like the \\spell<fortify> ritual, except that the bonus to \\glossterm<resistances> increases to 15.
        """, tags=['Attune (ritual)'], ritual_time='one hour'),
        Spell('Ironwood', 4, 'One Small or smaller unattended, nonmagical wooden object within \\rngclose range', """
            The target is transformed into ironwood.
            While remaining natural wood in almost every way, ironwood is as strong, heavy, and resistant to fire as iron.
            Metallic armor and weapons, such as full plate, can be crafted from ironwood.
        """, tags=[], ritual_time='24 hours'),
        Spell('Purify Sustenance', 1, 'All food and water in a single square within \\rngclose range', """
            The targets are purified.
            Spoiled, rotten, poisonous, or otherwise contaminated food and water becomes pure and suitable for eating and drinking.
            This does not prevent subsequent natural decay or spoiling.
        """, tags=[], ritual_time='one hour'),
    ],
    category='damage',
)
