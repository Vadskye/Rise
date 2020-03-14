from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: damage
# Secondary: buff
# Tertiary: utility
# None: debuff
polymorph=MysticSphere(
    name="Polymorph",
    short_description="Change the physical forms of objects and creatures",
    cantrips=[
        Effects('Alter Object', 'Unattended, nonmagical object you can touch', """
            You make a Craft check to alter the target (see \\pcref<Craft>), except that you do not need any special tools to make the check (such as an anvil and furnace).
            The maximum \\glossterm<damage resistance> of a material you can affect with this ability is equal to your \\glossterm<power>.

            % too short?
            Each time you use this ability, you can accomplish work that would take up to five minutes with a normal Craft check.
        """, tags=[]),
    ],
    lists=['Arcane', 'Nature', 'Pact'],
    spells=[
        Spell('Natural Weapon', 1, 'Yourself', """
            You gain your choice of one of the following \\glossterm<natural weapons>: bite, claw, constrict, gore, ram, slam, or talon.
            For details, see \\tref<Natural Weapons>.

            \\rankline
            \\rank<3> You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with natural weapons.
            \\rank<5> You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with natural weapons.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Attune (target)']),
        Spell('Piercing Grasp', 1, 'One creature you \\glossterm<threaten>', """
            This spell does not have the \\glossterm<Focus> tag.
            You must have a \\glossterm<free hand> to cast this spell.

            You twist your hand into a spike that bends past armor to injure your foe.
            Make a \\glossterm<physical attack> vs. Reflex against the target.
            \\hit The target takes piercing \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[], focus=False),
        Spell('Baleful Polymorph', 7, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit As a \\glossterm<condition>, the target shrinks by two \\glossterm<size categories> and is \\glossterm<confused>.
        """, tags=[]),
        Spell('Twist Flesh', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes physical \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Fleshbite', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target is \\glossterm<sickened> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<nauseated> as a \\glossterm<condition>.

            \\rankline
            \\rank<3> The attack gains a +1 bonus to \\glossterm<accuracy>.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=[]),
        Spell('Shrink', 1, 'Yourself or one Small or larger \\glossterm<ally> within \\rngclose range', """
            The target's size decreases by one \\glossterm<size category>.
            This decreases its \\glossterm<base speed> and improves its \\glossterm<Stealth> skill.
            It may also decrease the target's \\glossterm<reach> (see \\pcref<Size in Combat>).
            However, its physical form is not altered fully to match its new size, and its Strength and Dexterity are unchanged.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The minimum size category is reduced to Diminuitive.
            \\rank<5> You can decrease the target's size category by up to two size categories.
            \\rank<7> The minimum size category is reduced to Fine.
        """, tags=['Attune (target)']),
        Spell('Spider Climb', 1, 'Yourself', """
            You gain a \\glossterm<climb speed> equal to your \\glossterm<base speed>.
            You also gain a +2 \\glossterm<magic bonus> to Climb checks.

            \\rankline
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to +6.
            \\rank<7> The bonus increases to +8.
        """, tags=['Attune (self)']),
        Spell('Stoneskin', 4, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
            The target gains a \\glossterm<magic bonus> equal to half your \\glossterm<power> to \\glossterm<resistances> against \\glossterm<physical damage>.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The target also gains a +1 \\glossterm<magic bonus> to Armor defense.
            \\rank<8> The bonus increases to be equal to your \\glossterm<power>.
        """, tags=['Attune (target)']),
        Spell('Regeneration', 1, 'Yourself or an \\glossterm<ally> within \\rngclose range', """
            A the end of each round, the target may gain a +1 bonus to the \\glossterm<wound roll> of its most recent \\glossterm<vital wound>.
            If it does, the \\glossterm<wound roll> for that \\glossterm<vital wound> cannot be modified again.

            \\rankline
            \\rank<3> The bonus increases to +2.
            \\rank<5> The bonus increases to +3.
            \\rank<7> The bonus increases to +4.
        """, tags=['Attune (target)']),
        Spell('Enlarge', 4, 'Yourself or one Large or smaller \\glossterm<ally> within \\rngclose range', """
            The target's size increases by one \\glossterm<size category>.
            This increases its \\glossterm<base speed> and reduces its \\glossterm<Stealth> skill.
            It may also increase the target's \\glossterm<reach> (see \\pcref<Size in Combat>).
            However, its physical form is not altered fully to match its new size, and its Strength and Dexterity are unchanged.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The target also gains a +2 \\glossterm<magic bonus> to Strength.
            \\rank<8> You may increase the target by two size categories instead of one.
        """, tags=['Attune (target)']),
        Spell('Alter Appearance', 3, 'Yourself or one large or smaller \\glossterm<ally> within \\rngclose range', """
            You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
            You gain a +4 bonus on the check, and you ignore penalties for changing the target's gender, species, subtype, or age.
            However, this effect is unable to alter the target's clothes or equipment in any way.

            \\rankline
            \\rank<5> The bonus increases to +6.
            \\rank<7> The bonus increases to +8.
        """, tags=['Attune (target)']),
        Spell('Craft Object', 4, 'Any number of unattended, nonmagical objects within \\rngclose range', """
            You make a Craft check to transform the targets into a new item (or items) made of the same materials.
            You require none of the tools or time expenditure that would normally be necessary.
            The total size of all targets combined must be Large size or smaller.

            You can apply the Giant \\glossterm<augment> to this spell.
            If you do, it increases the maximum size of all targets combined.

            \\rankline
            \\rank<6> The maximum combined size is increased to Huge.
            \\rank<8> The maximum combined size is increased to Gargantuan.
        """, tags=[]),
        Spell('Disintegrate', 4, 'One creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target takes physical \\glossterm<standard damage> +2d.
            In addition, if the target has no hit points remaining at the end of the current \\glossterm<phase>, it dies.
            Its body is completely disintegrated, leaving behind only a pinch of fine dust.
            Its equipment is unaffected.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Malleable Body', 4, 'Yourself', """
            Your body and equipment becomes highly flexible and malleable, allowing you to compress your body or contort yourself into odd shapes.
            You gain a +8 \\glossterm<magic bonus> to the Escape Artist skill, and are immune to \\glossterm<critical hits> from \\glossterm<strikes>.
            However, your \\glossterm<damage resistance> against \\glossterm<physical damage> is halved.

            \\rankline
            \\rank<6> The skill bonus increases to +12.
            \\rank<8> The skill bonus increases to +16.
        """, tags=['Attune (self)']),
        Spell('Enhanced Senses', 1, 'Yourself', """
            You gain a +3 \\glossterm<magic bonus> to Awareness checks.

            \\rankline
            \\rank<3> The bonus increases to +5.
            \\rank<5> The bonus increases to +7.
            \\rank<7> The bonus increases to +10.
        """, tags=['Attune (self)']),
        Spell('Enhanced Muscles', 3, 'Yourself', """
            You gain a +2 \\glossterm<magic bonus> to your choice of either Strength-based checks or Dexterity-based checks.

            \\rankline
            \\rank<5> The bonus increases to +3.
            \\rank<7> The bonus increases to +4.
        """, tags=['Attune (self)']),
        Spell('Scent', 3, 'Yourself', """
            You gain the \\glossterm<scent> ability, giving you a +10 bonus to scent-based Awareness checks (see \\pcref<Senses>).

            \\rankline
            \\rank<5> The bonus increases to +15.
            \\rank<7> The bonus increases to +20.
        """, tags=['Attune (self)']),
        Spell('Spikeform', 4, ['Yourself', '\\glossterm<Enemies> adjacent to you (see text)'], """
            You transform your body to have dangerous spikes.
            As a \\glossterm<minor action>, you can extend the spikes to make an attack vs. Armor against each creature adjacent to you.
            \\hit Each secondary target takes piercing \\glossterm<standard damage> -2d.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage> -1d.
            \\rank<8> The damage increases to \\glossterm<standard damage>.
        """, tags=['Attune (self)']),
        Spell('Absorb Object', 1, 'One Tiny or smaller \\glossterm<unattended> object you touch', """
            You absorb the target into your body.
            Your weight is increased by the weight of the object, but the object's presence cannot be otherwise physically detected.
            A reactive object, such as alchemist's fire or poison, continues reacting inside your body, which may be harmful to you.
            You cannot absorb only part of a larger object.

            This effect lasts until you use it again, \\glossterm<dismiss> it as a \\glossterm<free action>, or fall unconscious.
            When this effect ends, the object appears in a free hand, if you have one available, or drops to the floor.

            \\rankline
            \\rank<3> The maximum size of the object increases to Small.
            \\rank<5> The maximum size of the object increases to Medium.
            \\rank<7> The maximum size of the object increases to Large.
        """, tags=[]),
        Spell('Acidic Blood', 1, ['Yourself or one \\glossterm<ally> within \\rngclose range', 'Everything adjacent to the primary target'], """
            The primary target's blood becomes acidic.
            This does not harm it, but the blood can be dangerous to anything nearby when it bleeds.
            At the end of each phase, if the primary target lost a \\glossterm<hit point> during that phase, make an attack vs. Armor against everything adjacent to the target.
            \\hit Each secondary target takes acid \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage>.
            \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=['Attune (target)']),
        Spell('Bleed', 4, 'One living creature within \\rngclose range', """
            Make an attack vs. Fortitude against the target.
            \\hit As a \\glossterm<condition>, the target begins bleeding.
            At the end of each round, it takes physical \\glossterm<standard damage> -1d.
            This damage cannot inflict a \\glossterm<vital wound>, even if the target has no \\glossterm<hit points> remaining.
            \\crit As above, except that the damage can inflict a \\glossterm<vital wound>.

            \\rankline
            \\rank<6> The damage increases to \\glossterm<standard damage>.
            \\rank<8> The damage increases to \\glossterm<standard damage> +1.
        """, tags=[]),
    ],
    rituals=[
        # Should this also be a spell? Incredibly niche, but golem makers
        # would want it...
        Spell('Mending', 1, 'One \\glossterm<unattended> object within \\rngclose range', """
            The target is regains one \\glossterm<hit point>.

            This ritual takes one minute to perform.
        """, tags=['AP']),
        Spell('Fortify', 1, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
            Unlike most abilities, this ritual can affect individual parts of a whole object.

            % How should this affect Strength break difficulty ratings?
            The target gains a +5 \\glossterm<magic bonus> to \\glossterm<resistances>.
            If the target is moved, this effect ends.
            Otherwise, it lasts for one year.

            This ritual takes one hour to perform.
        """, tags=['Attune (ritual)']),
        Spell('Enduring Fortify', 4, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
            This ritual functions like the \\spell<fortify> ritual, except that the effect lasts for one hundred years.
        """, tags=['AP']),
        Spell('Enduring Greater Fortify', 5,'Greater Fortify', """
            This ritual functions like the \\spell<greater fortify> ritual, except that the effect lasts for one hundred years.
        """, tags=['AP']),
        Spell('Greater Fortify', 4, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
            This ritual functions like the \\spell<fortify> ritual, except that the bonus to \\glossterm<resistances> increases to 10.
        """, tags=['Attune (ritual)']),
        Spell('Supreme Fortify', 7, 'One \\glossterm<unattended>, nonmagical object or part of an object of up to Large size.', """
            This ritual functions like the \\spell<fortify> ritual, except that the bonus to \\glossterm<resistances> increases to 15.
        """, tags=['Attune (ritual)']),
        Spell('Awaken', 6, 'One Large or smaller \\glossterm<ally> within \\rngclose range', """
            The target becomes sentient.
            Its Intelligence becomes 1d6 - 5.
            Its type changes from animal to magical beast.
            It gains the ability to speak and understand one language that you know of your choice.
            Its maximum age increases to that of a human (rolled secretly).
            This effect is permanent.

            This ritual takes 24 hours to perform, and requires 50 action points from its participants.
            It can only be learned with the nature \\glossterm<magic source>.
        """, tags=['AP', ]),
        Spell('Ironwood', 4, 'One Small or smaller unattended, nonmagical wooden object within \\rngclose range', """
            The target is transformed into ironwood.
            While remaining natural wood in almost every way, ironwood is as strong, heavy, and resistant to fire as iron.
            Metallic armor and weapons, such as full plate, can be crafted from ironwood.

            % Should this have an action point cost? May be too rare...
            This ritual takes 24 hours to perform.
        """, tags=['AP']),
        Spell('Purify Sustenance', 1, 'All food and water in a single square within \\rngclose range', """
            The targets are purified.
            Spoiled, rotten, poisonous, or otherwise contaminated food and water becomes pure and suitable for eating and drinking.
            This does not prevent subsequent natural decay or spoiling.

            This ritual takes one hour to perform.
        """, tags=['AP']),
        Spell('Air Breathing', 3, 'One Medium or smaller ritual participant', """
            The target can breathe air as easily as a human breathes air, preventing it from suffocating above water if it can normally only breathe water or some other substance.

            This ritual takes one minute to perform.
        """, tags=['Attune (ritual)']),
        Spell('Water Breathing', 3, 'One Medium or smaller ritual participant', """
            The target can breathe water as easily as a human breathes air, preventing it from drowning or suffocating underwater.

            This ritual takes one minute to perform.
        """, tags=['Attune (ritual)']),
    ],
    category='damage',
)
