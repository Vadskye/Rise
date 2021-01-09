from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: debuff
# Secondary: utility
# Tertiary: damage
# None: buff
verdamancy=MysticSphere(
    name="Verdamancy",
    short_description="Animate and manipulate plants",
    cantrips=[
        Effects('Fertile Patch', 'One unattended, nonmagical 1-ft.\\ square of earth', """
            The soil in the target becomes suffused with plant-sustaining nutrients, making it fertile ground for plants.
            This effect lasts for one year.
        """, scaling="""
            \\rankline
            \\rank<2> The area increases to a 2-ft.\\ square.
            \\rank<4> The area increases to a 5-ft.\\ square.
            \\rank<6> The area increases to a 10-ft.\\ square.
        """, tags=[]),
        Effects('Rapid Growth', 'One Large or smaller inanimate plant within \\rngshort range', """
            Choose any number of days up to a week.
            The target grows as if much time had passed, assuming that it received adequate nutrition during that time.
            When this spell ends, the plant returns to its original state.
        """, scaling="""
            \\rank<2> You can choose up to a month of time to grow.
            \\rank<4> You can choose up to three months of time to grow.
            \\rank<6> You can choose up to a year of time to grow.
        """, tags=['Sustain (minor)']),
    ],
    lists=['Nature'],
    spells=[
        Spell('Entangle', 2, 'One Large or smaller creature within \\rngmed range', """
            You cause plants to grow and trap a foe.
            Make an attack vs. Reflex against the target.
            You gain a +2 bonus to \\glossterm<accuracy> with this attack if the target is in standing in \\glossterm<undergrowth>.
            \\hit The target is \\glossterm<slowed> as a \\glossterm<condition>.
            This condition can be removed if the target or a creature that can reach the target makes a \\glossterm<difficulty rating> 10 Strength check to break the target free of the plants around its body.
            The target can make this check as a \\glossterm<move action>, while other creatures can make the check as a standard action.
            \\crit As above, except that the target also cannot move farther than 10 feet from its original location until it ends the effect.
        """, scaling="accuracy", tags=['Manifestation']),
        # no level modifier for accuracy bonus due to its rarity
        Spell('Vine Whip', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Armor against the target.
            You gain a +2 bonus to \\glossterm<accuracy> with this attack if the target is in standing in \\glossterm<undergrowth>.
            \\hit The target takes bludgeoning damage equal to 1d10 plus your \\glossterm<power>.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Strangling Vines', 7, 'One Large or smaller creature within \\rngshort range', """
            Make an attack vs. Fortitude against the target.
            You gain a +2 bonus to \\glossterm<accuracy> with this attack if the target is in standing in \\glossterm<undergrowth>.
            \\hit The target is \\glossterm<immobilized> by a mass of vines as a \\glossterm<condition>.
            In addition, it is unable to breathe.
            This condition can be removed if the target or a creature that can reach the target makes a \\glossterm<difficulty rating> 15 Strength check to break the target free of the vines.
            The target can make this check as a \\glossterm<move action>, while other creatures can make the check as a standard action.
            \\glance As above, except that the condition is removed at the end of the next round.
            \\crit As above, except that the condition must be removed twice before the effect ends.
        """, tags=['Manifestation']),
        # no level modifier for accuracy bonus due to its rarity
        Spell('Vineburst', 1, 'Creatures in a \\areasmall radius from you', """
            Make an attack vs. Armor against each target.
            You gain a +2 bonus to \\glossterm<accuracy> with this attack against targets standing in \\glossterm<undergrowth>.
            \\hit Each target takes bludgeoning damage equal to 1d6 plus half your \\glossterm<power>.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Vinestorm', 4, '\\glossterm<Enemies> in a \\arealarge radius from you', """
            Make an attack vs. Armor against each target.
            You gain a +2 bonus to \\glossterm<accuracy> with this attack against targets standing in \\glossterm<undergrowth>.
            \\hit Each target takes bludgeoning damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Manifestation']),
        Spell('Vine Tentacles', 2, 'Yourself', """
            You grow a massive vine tentacle from your body.
            The tentacle grants you a slam \\glossterm<natural weapon> (see \\tref<Natural Weapons>).
            The natural weapon deals 1d10 damage, as normal for a slam natural weapon.
            In addition, it has the Reach \\glossterm<weapon tag> (see \\pcref<Weapon Tags>).
        """, scaling="""
            \\rank<4> You gain a +5 foot bonus to \\glossterm<reach> with attacks using the tentacle.
            \\rank<6> The bonus to reach increases to 10 feet.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Poison -- Nitharit', 2, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target becomes \\glossterm<poisoned> by the first \\glossterm<poison stage> of nitharit.
            At the end of each subsequent round, you repeat this attack, as normal for poisons (see \\pcref<Poison>).
            A creature poisoned by nitharit becomes \\glossterm<sickened> as long as it is poisoned.
            Reaching the third \\glossterm<poison stage> causes the target to become \\glossterm<nauseated> as long as it is poisoned.
            A third failed attack ends the poison.
            \\crit As above, except that target immediately reaches the second \\glossterm<poison stage>, as normal for poisons.
        """, scaling="accuracy", tags=['Manifestation']),
        Spell('Poison -- Sassone Leaf', 1, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target becomes \\glossterm<poisoned> with sassone leaf.
            At the end of each subsequent round, you repeat this attack, as normal for poisons.
            For each \\glossterm<poison stage>, including the initial stage, the target loses 1d6 \\glossterm<hit points>.
            Reaching the third \\glossterm<poison stage> ends the poison.
            A third failed attack also ends the poison.
            \\crit As above, except that target immediately reaches the second \\glossterm<poison stage>, as normal for poisons.
        """, scaling="""
            The hit point loss from the poison increases by +1d for each rank beyond 1.
        """, tags=['Manifestation']),
        Spell('Poison -- Arsenic', 3, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target becomes \\glossterm<poisoned> with arsenic.
            At the end of each subsequent round, you repeat this attack, as normal for poisons.
            For each \\glossterm<poison stage>, including the initial stage, the target loses 1d10 \\glossterm<hit points>.
            Reaching the third \\glossterm<poison stage> causes the target to gain a \\glossterm<vital wound> and ends the poison.
            A third failed attack also ends the poison.
            % No \\glance effect
            \\crit As above, except that target immediately reaches the second \\glossterm<poison stage>, as normal for poisons.
        """, scaling="""
            The hit point loss from the poison increases by +1d for each rank beyond 3.
        """, tags=['Manifestation']),
        Spell('Poison -- Black Lotus', 5, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target becomes \\glossterm<poisoned> with arsenic.
            At the end of each subsequent round, you repeat this attack, as normal for poisons.
            For each \\glossterm<poison stage>, including the initial stage, the target loses 2d8 \\glossterm<hit points>.
            Reaching the third \\glossterm<poison stage> causes the target to gain a \\glossterm<vital wound>.
            A third failed attack ends the poison.
            % No \\glance effect
            \\crit As above, except that target immediately reaches the second \\glossterm<poison stage>, as normal for poisons.
        """, scaling="""
            The hit point loss from the poison increases by +1d for each rank beyond 5.
        """, tags=['Manifestation']),
        Spell('Herbal Antidote', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains an additional success to resist a poison currently affecting it (see \\pcref<Poison>).
        """, scaling="""
            \\rank<3> The number of additional successes increases to two.
            \\rank<5> The number of additional successes increases to three.
            \\rank<7> The number of additional successes increases to four.
        """, tags=['Sustain (minor)']),
        Spell('Barkskin', 1, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            The target gains a +2 \\glossterm<magic bonus> to \\glossterm<resistances> against \\glossterm<physical> damage.
        """, scaling="""
            \\rank<3> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            In addition, the bonus increases to +4.
            \\rank<5> The bonus increases to +8.
            \\rank<7> The bonus increases to +16.
        """, tags=['Attune (target)']),
        Spell('Embedded Growth', 1, 'One creature within \\rngshort range', """
            You throw a seed that embeds itself in a foe and grows painfully.
            Make an attack vs. Fortitude against the target.
            \\hit As a \\glossterm<condition>, the target takes 1d6 physical damage at the end of each round.
            If the the target gains a \\glossterm<vital wound> from this damage, the condition ends.

            This condition can be removed with the \\textit<treat condition> ability from the Medicine skill (see \\pcref<Medicine>).
            The \\glossterm<difficulty rating> of the check is equal to 10.
            \\crit As above, except that the damage from the condition is doubled.
        """, scaling="damage", tags=[]),
        Spell('Fire Seeds', 3, 'One unattended acorn or similar seed structure you touch', """
            % Does "seed structure" make sense?
            You transform up to three unattended acorns or similar seed structures into small bombs.
            As a standard action, you or another creature can throw the acorn up to 30 feet.
            % More accurate version: the acorn has a range increment of 10 feet to hit its target, but that accuracy roll is completely independent of the explosion.
            % Doesn't seem worth the complexity, and implicitly gives the fire seed surprisingly long range since objects are easy to hit.
            On impact, the acorn detonates, and you make an attack vs. Reflex against everything within a \\areasmall radius of the struck creature or object.
            \\hit Each target takes fire damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.
        """, scaling="damage", tags=['Sustain (free)']),
        Spell('Wall of Thorns', 3, 'Each creature that moves through the area (see text)', """
            You create a wall of thorns in 15 ft.\\ high, \\areasmall \\glossterm<wall> within \\rngmed range.
            The base of at least half of the wall must be in arable earth.
            The wall is four inches thick, but permeable.
            It provides \\glossterm<cover> to attacks made through the wall.
            Creatures can pass through the wall, though it costs five extra feet of movement to move through the wall.
            When a creature moves through the wall, make an attack vs. Armor against it.
            You can only make an attack in this way against a given creature once per \\glossterm<phase>.
            \\hit The target takes piercing damage equal to 2d6 plus half your \\glossterm<power>.
            \\glance As above, except that that each target takes half damage.

            Each five-foot square of wall has hit points equal to three times your \\glossterm<power>, and all of its defenses are 0.
            It is \\glossterm<vulnerable> to fire damage.
        """, scaling="damage", tags=['Attune (self)']),
        Spell('Plant Growth', 1, 'All plants and arable earth in a \\areasmall radius within \\rngmed range', """
            Choose whether you want plants within the area to grow or diminish.

            If you choose for plants to grow, all arable earth within the area becomes \\glossterm<light undergrowth>.
            Light undergrowth within the area is increased in density to \\glossterm<heavy undergrowth>.
            If you choose for plants to diminish, all \\glossterm<heavy undergrowth> in the area is reduced to \\glossterm<light undergrowth>, and all \\glossterm<light undergrowth> is removed.

            When this spell's duration ends, the plants return to their natural size.
        """, scaling="""
            \\rank<3> The area increases to a \\areamed radius.
            \\rank<5> The area increases to a \\arealarge radius.
            \\rank<7> The area increases to a \\areahuge radius.
        """, tags=['Sustain (minor)']),
        Spell('Blight', 2, 'One living creature or plant within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            % TODO: is this the right damage type?
            \\hit The target takes acid damage equal to 2d6 plus your \\glossterm<power>.
            This damage is doubled if the target is a plant, including plant creatures.
        """, scaling="damage", tags=[]),
        Spell('Shillelagh', 1, 'One nonmagical stick of wood', """
            You transform the target into a club, greatclub, or quarterstaff, as you choose (see \\pcref<Weapons>).
            You cannot change the target's size by more than one size category.
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> on attacks with it.
        """, scaling="""
            \\rank<3> You also gain +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with the weapon.
            \\rank<5> The power bonus increases to +4.
            \\rank<7> The accuracy bonus increases to +2, and the power bonus increases to +8.
        """, tags=['Attune (self)']),
        Spell('Natural Camouflage', 1, 'Yourself', """
            You gain a +4 \\glossterm<magic bonus> to the Stealth skill while you have \\glossterm<cover> or \\glossterm<concealment> from plants.
            In addition, you are treated as being \\glossterm<trained> in that skill if you would otherwise be untrained.
        """, scaling="""
            \\rank<3> The bonus increases to +5.
            \\rank<5> The bonus increases to +6.
            \\rank<7> The bonus increases to +7.
        """, tags=['Sustain (minor)']),
        Spell('Flourishing Vines', 4, 'Yourself', """
            Long, thin vines continuously grow and writhe on your body.
            At the end of each round, you may choose to cause the vines to extend out onto the ground in a \\areasmall radius around you.
            When you do, that area becomes covered in \\glossterm<light undergrowth>.
            Whenever you move, the vines retreat back to your body.
            That prevents the vines from impeding your movement, though they do impede the movement of any other creatures that move simultaneously.
        """, scaling="""
            \\rank<6> The area increases to a \\areamed radius.
        """, tags=['Attune (self)']),
        Spell('Thornblade', 3, 'Yourself', """
            You can cast this spell as a \\glossterm<minor action>.

            All damage the target deals with \\glossterm<strikes> becomes piercing damage in addition to the attack's normal damage types.
            Whenever the target causes a creature to lose \\glossterm<hit points> with a \\glossterm<strike>, thorns from the striking weapon enter the target's body.
            As a \\glossterm<condition>, the target unable to heal the \\glossterm<hit points> lost to the attack.

            This condition can be removed by the \\textit<treat condition> ability (see \\pcref<Treat Condition>).
            The \\glossterm<difficulty rating> of the check is equal to 5 \\add your \\glossterm<power>.
        """, scaling="""
            \\rank<5> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<7> The condition cannot be removed without taking a \\glossterm<short rest>.
        """, tags=['Attune (target)']),
        Spell('Verdant Armor', 1, 'Yourself', """
            When you cast this spell, you choose a type of armor you are proficient with that is not normally made from metal.
            Plants grow around your body, functioning like your chosen type of armor for you, except that the \\glossterm<encumbrance penalty> of the armor is reduced by 2.
            These plants are considered to be normal plants for the purpose of abilities that require plants to be near targets, such as spells from this mystic sphere.
        """, scaling="""
            \\rank<3> You also gain a +1 bonus to Armor defense.
            \\rank<5> The encumbrance penalty reduction is increased to 3.
            \\rank<7> The bonus to Armor defense increases to +2.
        """, tags=['Attune (self)', 'Manifestation']),
    ],
    rituals=[
        Spell('Fertility', 3, None, """
            This ritual creates an area of bountiful growth in a one mile radius \\glossterm<zone> from your location.
            Normal plants within the area become twice as productive as normal for the next year.
            This ritual does not stack with itself.
            If the \\ritual<infertility> ritual is also applied to the same area, the most recently performed ritual takes precedence.
        """, tags=[], ritual_time='24 hours'),
        Spell('Infertility', 3, None, """
            This ritual creates an area of death and decay in a one mile radius \\glossterm<zone> from your location.
            Normal plants within the area become half as productive as normal for the next year.
            This ritual does not stack with itself.
            If the \\ritual<fertility> ritual is also applied to the same area, the most recently performed ritual takes precedence.
        """, tags=[], ritual_time='24 hours'),
        Spell('Lifeweb Transit', 5, 'Up to five Medium or smaller ritual participants', """
            Choose up a living plant that all ritual participants touch during the ritual.
            The plant must be at least one size category larger than the largest target.
            In addition, choose a destination up to 100 miles away from you on your current plane.
            By walking through the chosen plant, each target is teleported to the closest plant to the destination that is at least one size category larger than the largest target.

            You must specify the destination with a precise mental image of its appearance.
            The image does not have to be perfect, but it must unambiguously identify the destination.
            If you specify its appearance incorrectly, or if the area has changed its appearance, the destination may be a different area than you intended.
            The new destination will be one that more closely resembles your mental image.
            If no such area exists, the ritual simply fails.
            % TODO: does this need more clarity about what teleportation works?
        """, tags=[], ritual_time='24 hours'),
    ],
)
