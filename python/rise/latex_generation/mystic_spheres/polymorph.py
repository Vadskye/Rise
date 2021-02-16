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
        Effects('Alter Object', 'One unattended, nonmagical object you touch', """
            You make a Craft check to alter the target (see \\pcref<Craft>), except that you do not need any special tools to make the check (such as an anvil and furnace).
            The maximum \\glossterm<resistance> of a material you can affect with this ability is equal to your \\glossterm<power>.

            % too short?
            Each time you cast this spell, you can accomplish work that would take up to two rounds with a normal Craft check.
        """, scaling="""
            \\rank<2> The amount of work you accomplish with the spell increases to five rounds.
            \\rank<4> The amount of work you accomplish with the spell increases to one minute.
            \\rank<6> The amount of work you accomplish with the spell increases to two minutes.
        """, tags=[]),
        Effects('Alter Appearance', 'Yourself', """
            You alter your appearance in minor ways.
            This functions like the \\textit<disguise creature>  ability with a +4 bonus, except that you cannot change the appearance of your equipment, species, creature type, or number of limbs (see \\pcref<Disguise Creature>).
            This ability is commonly used to hide blemishes or to appear younger or older than one's true age.

            This ability lasts until you use it again or until you \\glossterm<dismiss> it as a \\glossterm<free action>.
        """, scaling="""
            \\rank<2> The bonus increases to +6.
            \\rank<4> The bonus increases to +8.
            \\rank<6> The bonus increases to +10.
        """, tags=[]),
    ],
    lists=['Arcane', 'Nature', 'Pact'],
    spells=[
        Spell('Reforge Armor', 3, 'One suit of body armor', """
            When you cast this spell, you choose one of the following special materials: dragonhide, dragonscale, ironwood, mithral, or starmetal.
            The target changes to be composed of that material, and gains all properties and benefits of that material instead of its original properties.
            For details about armor special materials, see \\tref<Armor Special Materials>.

            You can only change the target into a special material appropriate for its base composition of either leather or metal.
            For example, you cannot create mithral hide armor with this spell.
        """, scaling="""
            \\rank<5> You can also choose one of the following special materials: adamantine, deepforged, diamondsteel, or elvenweave.
            \\rank<7> You can also choose one of the following special materials: ancient dragonhide, ancient dragonscale, pure mithral, or pure starmetal.
        """, tags=['Attune (self)']),
        Spell('Natural Weapon', 1, 'Yourself', """
            You gain your choice of one of the following \\glossterm<natural weapons>: bite, claw, constrict, gore, ram, slam, or talon.
            For details, see \\tref<Natural Weapons>.
        """, scaling="""
            \\rank<3> You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with natural weapons.
            \\rank<5> The power bonus increases to +4.
            \\rank<7> The power bonus increases to +8.
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
            \\glance As above, except that the condition is removed at the end of the next round.
        """, scaling="damage", tags=[]),
        Spell('Twist Flesh', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes physical damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=[]),
        Spell('Shrink', 2, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            The target's size decreases by one \\glossterm<size category>, to a minimum of Tiny.
            This decreases its \\glossterm<base speed> and improves its \\glossterm<Stealth> skill.
            It may also decrease the target's \\glossterm<reach> (see \\pcref<Size in Combat>).
            However, its physical form is not altered fully to match its new size, and its Strength and Dexterity are unchanged.
        """, scaling="""
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> You can decrease the target's size category by up to two size categories.
        """, tags=['Attune (target)']),
        Spell('Stoneskin', 1, 'Yourself or an \\glossterm<ally> in \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a +2 \\glossterm<magic bonus> to its \\glossterm<resistance> against \\glossterm<physical> damage.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            In addition, the bonus increases to +4.
            \\rank<5> The bonus increases to +8.
            \\rank<7> The bonus increases to +16.
        """, tags=['Attune (target)']),
        # This has to be relatively high level if only because large creatures
        # are so hard to surround
        Spell('Enlarge', 3, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            The target's size increases by one \\glossterm<size category>, to a maximum of Huge.
            This increases its \\glossterm<base speed> and reduces its \\glossterm<Stealth> skill.
            It may also increase the target's \\glossterm<reach> (see \\pcref<Size in Combat>).
            However, its physical form is not altered fully to match its new size, and its Strength and Dexterity are unchanged.
        """, scaling="""
            \\rank<5> This spell can target a Large or smaller \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<7> You can increase the target's size category by up to two size categories.
        """, tags=['Attune (target)']),
        Spell('Reshape Appearance', 2, 'Yourself', """
            You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
            You gain a +4 bonus on the check, and you ignore penalties for changing the target's gender, species, subtype, or age.
            However, this effect is unable to alter the target's equipment in any way.
        """, scaling="""
            \\rank<4> This spell can target a Large or smaller \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The bonus increases to +6.
        """, tags=['Attune (target)']),
        # +4 levels for +2d, disintegration is free?
        Spell('Disintegrate', 5, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes physical damage equal to 4d10 plus your \\glossterm<power>.
            In addition, if the target has no hit points remaining at the end of the current \\glossterm<phase>, it dies.
            Its body is completely disintegrated, leaving behind only a pinch of fine dust.
            Its equipment is unaffected.
            \\glance As above, except that that the target takes half damage.
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
            You can cast this spell as a \\glossterm<minor action>.

            You transform your body to have dangerous spikes.
            At the end of each round, make an attack vs. Armor against each creature adjacent to you that either is \\glossterm<grappling> with you or that attacked you with a melee weapon that round.
            % full dice, but half power
            \\hit Each secondary target takes piercing damage equal to 2d8 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Attune (self)']),
        Spell('Extruding Spikeform', 6, ['Yourself', '\\glossterm<Enemies> adjacent to you (see text)'], """
            You can cast this spell as a \\glossterm<minor action>.

            You transform your body to have dangerous spikes that you can consciously extrude to impale nearby foes.
            As a \\glossterm<minor action>, you can extend the spikes to make an attack vs. Armor against each creature adjacent to you.
            \\hit Each secondary target takes piercing damage equal to 4d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
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
            You gain a +3 \\glossterm<magic bonus> to the Stealth skill.
            In addition, you are treated as being \\glossterm<trained> in that skill if you would otherwise be untrained.
        """, scaling="""
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +5.
            \\rank<7> The bonus increases to +6.
        """, tags=['Attune (target)']),
        Spell('Sludgeform', 7, 'One creature within \\rngshort range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes 4d6 physical damage.
            If it loses \\glossterm<hit points> from this damage, its physical form loses coherence and partially collapses into a sludgelike mass as a \\glossterm<condition>.
            It has no \\glossterm<free hands>, causing it to drop anything it is holding and making it unable to take any actions that require free hands.
            Its speed with all of its \\glossterm<mundane> movement modes are reduced to one quarter normal.
            It is also unable to speak normally or use verbal or somatic \\glossterm<components>.
            \\glance As above, except that that the target takes half damage.
            \\crit As above, except that the condition must be removed twice before the effect ends.
        """, tags=[]),
        Spell('Brief Regeneration', 2, 'Yourself or one living \\glossterm<ally> within \\rngshort range', """
            The target regains \\glossterm<hit points> equal to 1d6 plus half your \\glossterm<power>.
        """, scaling="""
            The healing increases by +1d for each rank beyond 2.
        """, tags=[]),
        Spell('Vital Regeneration', 5, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            You can cast this spell as a \\glossterm<minor action>.

            A the end of each round, the target can remove one of its \\glossterm<vital wounds>.
            If it does, it gains two \\glossterm<fatigue points>.
        """, scaling="""
            \\rank<7> The target can remove two \\glossterm<vital wounds> instead of one.
            It gains two \\glossterm<fatigue points> per vital wound removed this way.
        """, tags=['Attune (target)']),
        Spell('Regeneration', 4, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            At the end of each round, if you did not lose any \\glossterm<hit points> that round, you regain 1d10 \\glossterm<hit points>.
        """, scaling="""
            The healing increases by +1d for each rank beyond 4.
        """, tags=['Attune (self)']),
        Spell('Physical Enhancement', 2, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            When you cast this spell, choose a physical attribute: Strength, Dexterity, or Constitution.
            You gain a +2 \\glossterm<magic bonus> to checks using the chosen attribute.
            In addition, if you choose Strength, you gain a +2 \\glossterm<magic bonus> to Strength for the purpose of determining your \\glossterm<carrying capacity>.
        """, scaling="""
            \\rank<4> The bonus increases to +3.
            \\rank<6> The bonus increases to +4.
        """, tags=['Attune (self)']),
        Spell('Scent', 3, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            You gain the \\glossterm<scent> ability, giving you a +10 bonus to scent-based Awareness checks (see \\pcref<Senses>).
        """, scaling="""
            \\rank<5> The bonus increases to +15.
            \\rank<7> The bonus increases to +20.
        """, tags=['Attune (self)']),
        Spell('Eyebite', 4, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes 2d6 physical damage.
            If it loses \\glossterm<hit points> from this damage, it is \\glossterm<blinded> as a \\glossterm<condition>.
            \\glance As above, except that that the target takes half damage.
        """, scaling="damage", tags=[]),
        Spell('Organ Failure', 1, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes 1d6 physical damage.
            If it loses \\glossterm<hit points> from this damage, it is \\glossterm<nauseated> as a \\glossterm<condition>.
        """, scaling="damage", tags=[]),
        Spell('Cripple', 7, 'One living creature within \\rngshort range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<immobilized> as a \\glossterm<condition>.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit The target is \\glossterm<paralyzed> as a \\glossterm<condition>.
        """, tags=[]),
        Spell('Bleed', 2, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target begins bleeding as a \\glossterm<condition>.
            At the end of each round, it takes 1d8 physical damage.
            If the the target gains a \\glossterm<vital wound> from this damage, the condition ends.

            This condition can be removed with the \\textit<treat condition> ability from the Medicine skill (see \\pcref<Medicine>).
            The \\glossterm<difficulty rating> of the check is equal to 10.
            \\crit As above, except that the damage from the condition is doubled.
        """, scaling="damage", tags=[]),
        Spell('Blood Fountain', 5, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target begins bleeding as a \\glossterm<condition>.
            At the end of each round, it takes 2d8 physical damage.
            If the the target gains a \\glossterm<vital wound> from this damage, the condition ends.

            This condition can be removed with the \\textit<treat condition> ability from the Medicine skill (see \\pcref<Medicine>).
            The \\glossterm<difficulty rating> of the check is equal to 20.
            \\glance As above, except that the condition is removed at the end of the next round after its damage is dealt.
            \\crit As above, except that the damage from the condition is doubled.
        """, scaling="damage", tags=[]),
        Spell('Eyes of Darksight', 2, 'Yourself', """
            The target gains \\glossterm<darkvision> with a 60 foot radius.
        """, scaling="""
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The radius increases to 120 feet.
        """, tags=['Attune (target)']),
        Spell('Draconic Senses', 4, 'Yourself', """
            You gain \\glossterm<darkvision> with a 60 foot radius, \\glossterm<low-light vision>, and \\glossterm<blindsense> with a 30 foot radius.
            If you already have darkvision or blindsense, the range of that ability increases by the given amount instead.
            If you already have low-light vision, you double its effectiveness, allowing you to treat sources of light as if they had four times their normal illumination range.
        """, scaling="""
            \\rank<6> The radius of the darkvision increases by 60 feet, and the radius of the blindsense increases by 30 feet.
        """, tags=['Attune (self)']),
        Spell('Swimmer', 2, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a \\glossterm<swim speed> equal to its \\glossterm<base speed>.
            In addition, it gains a +2 \\glossterm<magic bonus> to Swim checks.
        """, scaling="""
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The bonus increases to +4.
        """, tags=['Attune (target)']),
        Spell('Climber', 2, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a \\glossterm<climb speed> equal to its \\glossterm<base speed>.
            In addition, it gains a +2 \\glossterm<magic bonus> to Climb checks.
        """, scaling="""
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The bonus increases to +4.
        """, tags=['Attune (target)']),
        Spell('Runner', 2, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a +10 foot \\glossterm<magic bonus> to its \\glossterm<land speed>.
        """, scaling="""
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The bonus increases to +20 feet.
        """, tags=['Attune (target)']),
        # +1 level for damage -> attuned std action
        # +1 level over other dragon breaths for damage choice, including both
        # physical and energy
        Spell('Dragon Breath', 4, 'Yourself (see text)', """
            You can cast this spell as a \\glossterm<minor action>.

            You gain the ability to breath energy like a dragon.
            When you cast this spell, choose a type of damage: acid, cold, electricity, or fire.
            As a standard action, you can breath a cone of that type of energy.
            When you do, make an attack vs. Reflex against everything within a \\arealarge cone from you.
            After you use this ability, you cannot use it again until after the end of the next round.

            \\hit Each target takes damage of the chosen type equal to 2d8 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Attune (self)']),
    ],
    rituals=[
        Spell('Create Handholds', 1, 'One inanimate wall up to 50 feet high and 10 feet wide within \\rngmed range', """
            You shape handholds into the target object, making it easier to climb.
            This reduces the \\glossterm<difficulty rating> to climb the object by 10.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
        Spell('Craft Object', 3, 'Any number of unattended, nonmagical objects within \\rngshort range', """
            You make a Craft check to transform the targets into a new item (or items) made of the same materials.
            You require none of the tools that would normally be necessary, such as an anvil and furnace.
            The total size of all targets combined must be Medium size or smaller.

            This ritual takes time equal to one tenth of the time that would normally be required to craft the object, to a minimum of one hour.
        """, tags=[], ritual_time='special'),
        Spell('Craft Large Object', 5, 'Any number of unattended, nonmagical objects within \\rngshort range', """
            This ritual functions like the \\spell<craft object> ritual, except that the maximum combined size of all targets increases to Large.
            % No "This ritual takes", since this functions like another ritual
        """, tags=[], ritual_time='special'),
        Spell('Craft Huge Object', 7, 'Any number of unattended, nonmagical objects within \\rngshort range', """
            This ritual functions like the \\spell<craft object> ritual, except that the maximum combined size of all targets increases to Huge.
            % No "This ritual takes", since this functions like another ritual
        """, tags=[], ritual_time='special'),
        # Should this also be a spell? Incredibly niche, but golem makers
        # would want it...
        Spell('Mending', 1, 'One \\glossterm<unattended> object within \\rngshort range', """
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
            The target gains a +5 \\glossterm<magic bonus> to its \\glossterm<resistances> against \\glossterm<physical damage> and \\glossterm<energy damage>.
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
        Spell('Ironwood', 4, 'One Small or smaller unattended, nonmagical wooden object within \\rngshort range', """
            The target is transformed into ironwood.
            While remaining natural wood in almost every way, ironwood is as strong, heavy, and resistant to fire as iron.
            Metallic armor and weapons, such as full plate, can be crafted from ironwood.
        """, tags=[], ritual_time='24 hours'),
        Spell('Purify Sustenance', 1, 'All food and water in a single square within \\rngshort range', """
            The targets are purified.
            Spoiled, rotten, poisonous, or otherwise contaminated food and water becomes pure and suitable for eating and drinking.
            This does not prevent subsequent natural decay or spoiling.
        """, tags=[], ritual_time='one hour'),
        Spell('Awaken', 6, 'One Large or smaller \\glossterm<ally> within \\rngmed range', """
            The target becomes sentient.
            Its Intelligence becomes 1d6 - 5.
            Its type changes from animal to magical beast.
            It gains the ability to speak and understand one language that you know of your choice.
            Its maximum age increases to that of a human (rolled secretly).
            This effect is permanent.

            You can only learn this ritual if you have access to this mystic sphere through the nature \\glossterm<magic source>.
        """, tags=[], ritual_time='24 hours'),
        Spell('Air Breathing', 3, 'One Medium or smaller ritual participant', """
            The target can breathe air as easily as a human breathes air, preventing it from suffocating above water if it can normally only breathe water or some other substance.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
        Spell('Water Breathing', 3, 'One Medium or smaller ritual participant', """
            The target can breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.
        """, tags=['Attune (ritual)'], ritual_time='one minute'),
    ],
    category='damage',
)
