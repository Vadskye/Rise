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
        Effects('Rapid Growth', 'Small or smaller inanimate plant within \\rngclose range', """
            Choose any number of days up to a week.
            The target grows as if that many days had passed.
            When this spell ends, the plant returns to its original state.

            \\rankline
            \\rank<3> You can choose up to a month of time to grow.
            \\rank<5> You can choose up to three months months of time to grow.
            \\rank<7> You can choose up to a year of time to grow.
        """, tags=['Sustain (minor)']),
        Effects('Verdant Conduit', 'Yourself', """
            You are considered to be a source of unworked earth.
            This can allow you to cast spells from this sphere that require unworked earth without having other sources of unworked earth nearby.

            \\rankline
            \\rank<3> All components of Medium or larger solid objects within a \\areasmall \\glossterm<emanation> from you are also considered to be sources of unworked earth.
            Unlike most spells, this can affect only part of a larger object, and it only affects the part of the object within the radius.
            \\rank<5> The area of the emanation increases to a \\areamed radius.
            \\rank<7> The area of the emanation increases to a \\arealarge radius.
        """, tags=['Attune (self)']),
    ],
    lists=['Nature'],
    spells=[
        Spell('Entangle', 3, 'One Large or smaller creature within \\rngclose range', """
            You cause plants to grow and trap a foe.
            The target must be within 10 feet of unworked earth or plants.
            Make an attack vs. Reflex against the target.
            You gain a +2 bonus to \\glossterm<accuracy> with this attack if the target is in standing in \\glossterm<undergrowth>.
            \\hit The target is \\glossterm<immobilized> as a \\glossterm<condition>.
            This condition can be removed if the target or a creature that can reach the target makes a \\glossterm<difficulty rating> 10 Strength check to break the target free of the plants.
            The target can make this check as a \\glossterm<move action>, while other creatures can make the check as a standard action.

            \\rankline
            \\rank<5> The condition cannot be removed with a check.
            \\rank<7> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=['Manifestation']),
        Spell('Vine Whip', 1, 'One creature within \\rngmed range', """
            The target must be within 30 feet of unworked earth or plants.
            Make an attack vs. Armor against the target.
            You gain a +2 bonus to \\glossterm<accuracy> with this attack if the target is in standing in \\glossterm<undergrowth>.
            \\hit The target takes bludgeoning \\glossterm<standard damage> +1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<5> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=['Manifestation']),
        Spell('Strangling Vines', 6, 'One Large or smaller creature within \\rngclose range', """
            The target must be within 10 feet of unworked earth or plants.
            Make an attack vs. Fortitude against the target.
            You gain a +2 bonus to \\glossterm<accuracy> with this attack if the target is in standing in \\glossterm<undergrowth>.
            \\hit The target is \\glossterm<immobilized> by a mass of vines as a \\glossterm<condition>.
            In addition, it is unable to breathe, and it takes bludgeoning \\glossterm<standard damage> -3d at the end of each round.
            This condition can be removed if the target or a creature that can reach the target makes a Strength check to break the target free of the vines.
            The \\glossterm<difficulty rating> of the check is equal to your \\glossterm<power>.
            The target can make this check as a \\glossterm<move action>, while other creatures can make the check as a standard action.

            \\rankline
            \\rank<8> The \\glossterm<difficulty rating> to escape the condition increases by 5.
        """, tags=['Manifestation']),
        Spell('Vineburst', 1, '\\glossterm<Enemies> and objects in a \\areasmall radius from you', """
            Make an attack vs. Armor against each target that is within 10 feet of unworked earth or plants..
            You gain a +2 bonus to \\glossterm<accuracy> with this attack against targets standing in \\glossterm<undergrowth>.
            \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage>.
            \\rank<5> The damage increases to \\glossterm<standard damage> +1d.
            \\rank<7> The damage increases to \\glossterm<standard damage> +2d.
        """, tags=['Manifestation']),
        Spell('Vine Tentacles', 1, 'Yourself', """
            You grow vine tentacles from your body.
            The tentacles grant you a slam \\glossterm<natural weapon> (see \\tref<Natural Weapons>).
            The natural weapon deals +2d damage, as normal for a slam natural weapon.
            The natural weapon has the Reach \\glossterm<weapon tag> and does not require a \\glossterm<free hand> to use (see \\pcref<Weapon Tags>).

            \\rankline
            \\rank<3> You gain a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with attacks using the tentacles.
            \\rank<5> You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> with attacks using the tentacles.
            \\rank<7> You gain a +5 bonus to \\glossterm<reach> with attacks using the tentacles.
        """, tags=['Attune (self)', 'Manifestation']),
        Spell('Poison -- Nitharit', 1, 'One living creature within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            \\hit The target becomes \\glossterm<poisoned> with nitharit.
            At the end of each subsequent round, you repeat this attack, as normal for poisons.
            A creature poisoned by nitharit becomes \\glossterm<sickened> as long as it is poisoned.
            A third successful attack causes the target to become \\glossterm<nauseated> as long as it is poisoned.
            A third failed attack ends the poison.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Manifestation', 'Sustain (minor)']),
        Spell('Poison -- Sassone Leaf', 2, 'One living creature within \\rngmed range', """
            This spell functions like this \\spell<poison -- nitharit> spell, except that the target becomes poisoned with sassone leaf instead (see \\pcref<Poisons>).
            A creature poisoned by sassone leaf loses a \\glossterm<hit point> from each successful attack, including the first.
            A third successful attack causes the target to lose an additional hit point and ends the poison.
            A third failed attack ends the poison.

            \\rankline
            \\rank<4> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<6> The accuracy bonus increases to +2.
            \\rank<8> The accuracy bonus increases to +3.
        """, tags=[]),
        Spell('Poison -- Arsenic', 3, 'One living creature within \\rngmed range', """
            This spell functions like this \\spell<poison -- nitharit> spell, except that the target becomes poisoned with arsenic instead (see \\pcref<Poisons>).
            A creature poisoned by arsenic loses a \\glossterm<hit point> from each successful attack, including the first.
            A third successful attack causes the target gain a \\glossterm<vital wound> and ends the poison.
            A third failed attack ends the poison.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Poison -- Black Lotus', 4, 'One living creature within \\rngmed range', """
            This spell functions like this \\spell<poison -- nitharit> spell, except that the target becomes poisoned with black lotus extract instead (see \\pcref<Poisons>).
            A creature poisoned by black lotus extract loses a \\glossterm<hit point> from each successful attack, including the first.
            A third successful attack causes the target to gain a \\glossterm<vital wound>.
            A third failed attack ends the poison.

            \\rankline
            \\rank<7> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=['Manifestation']),
        Spell('Herbal Antidote', 1, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains an additional success to resist a poison currently affecting it (see \\pcref<Poisons>).

            \\rankline
            \\rank<3> The number of additional successes increases to two.
            \\rank<5> The number of additional successes increases to three.
            \\rank<7> The number of additional successes increases to four.
        """, tags=['Sustain (minor)']),
        Spell('Barkskin', 1, 'Yourself', """
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<resistances> against \\glossterm<physical> damage.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<3> The bonus increases to +4.
            \\rank<5> The bonus increases to be equal to half your \\glossterm<power>.
            \\rank<7> The bonus increases to be equal to your \\glossterm<power>.
        """, tags=['Attune (target)']),
        Spell('Embedded Growth', 4, 'One creature within \\rngclose range', """
            You throw a seed that embeds itself in a foe and grows painfully.
            Make an attack vs. Fortitude against the target.
            \\hit As a \\glossterm<condition>, the target takes physical \\glossterm<standard damage> at the end of each round.

            \\rankline
            \\rank<6> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Fire Seeds', 3, 'One unattended acorn or similar seed structure you touch', """
            % Does "seed structure" make sense?
            You transform up to three unattended acorns or similar seed structures into small bombs.
            As a standard action, you or another creature can throw the acorn anywhere within \\rngclose range.
            % More accurate version: the acorn has a range increment of 10 feet to hit its target, but that accuracy roll is completely independent of the explosion.
            % Doesn't seem worth the complexity, and implicitly gives the fire seed surprisingly long range since objects are easy to hit.
            On impact, the acorn detonates, and you make an attack vs. Armor against everything within a \\areasmall radius of the struck creature or object.
            \\hit Each target takes fire \\glossterm<standard damage> -1d.

            \\rankline
            \\rank<5> The damage increases to \\glossterm<standard damage>.
            \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=['Sustain (free)']),
        Spell('Wall of Thorns', 3, 'Each creature that moves through the area (see text)', """
            You create a wall of thorns in 20 ft.\\ high, \\areamed \\glossterm<wall> within \\rngmed range.
            The base of at least half of the wall must be in arable earth.
            The wall is four inches thick, but permeable.
            It provides \\glossterm<cover> to attacks made through the wall.
            Creatures can pass through the wall, though it costs five extra feet of movement to move through the wall.
            When a creature moves through the wall, make an attack vs. Armor against it.
            You can only make an attack in this way against a given creature once per \\glossterm<phase>.
            \\hit The target takes piercing \\glossterm<standard damage> -1d.

            Each five-foot square of wall has hit points equal to three times your \\glossterm<power>, and all of its defenses are 0.
            It is \\glossterm<vulnerable> to fire damage.

            \\rankline
            \\rank<5> The area increases to a \\arealarge shapeable line.
            \\rank<7> The damage increases to \\glossterm<standard damage>.
        """, tags=['Attune (self)']),
        Spell('Plant Growth', 2, 'All plants and arable earth in a \\areamed radius within \\rngmed range', """
            Choose whether you want plants within the area to grow or diminish.

            If you choose for plants to grow, all arable earth within the area becomes \\glossterm<light undergrowth>.
            Light undergrowth within the area is increased in density to \\glossterm<heavy undergrowth>.
            If you choose for plants to diminish, all \\glossterm<heavy undergrowth> in the area is reduced to \\glossterm<light undergrowth>, and all \\glossterm<light undergrowth> is removed.

            When this spell's duration ends, the plants return to their natural size.

            \\rankline
            \\rank<4> The area increases to a \\arealarge radius.
            \\rank<6> The range increases to \\rnglong.
            \\rank<8> The area increases to a \\areahuge radius.
        """, tags=['Sustain (minor)']),
        Spell('Blight', 2, 'One living creature or plant within \\rngmed range', """
            Make an attack vs. Fortitude against the target.
            % TODO: is this the right damage type?
            \\hit The target takes acid \\glossterm<standard damage> +1d.
            This damage is doubled if the target is a plant, including plant creatures.

            \\rankline
            \\rank<4> The damage increases to \\glossterm<standard damage> +2d.
            \\rank<6> The damage increases to \\glossterm<standard damage> +3d.
            \\rank<8> The damage increases to \\glossterm<standard damage> +4d.
        """, tags=[]),
        Spell('Shillelagh', 1, 'One nonmagical stick of wood', """
            You transform the target into a club, greatclub, or quarterstaff, as you choose (see \\pcref<Weapons>).
            You cannot change the target's size by more than one size category.
            You gain a +2 \\glossterm<magic bonus> to \\glossterm<power> on attacks with it.

            \\rankline
            \\rank<3> You also gain +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with the weapon.
            \\rank<5> The power bonus increases to +4.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Attune (self)']),
        Spell('Natural Camouflage', 1, 'Yourself', """
            You gain a +4 \\glossterm<magic bonus> to the Stealth skill while you have \\glossterm<cover> or \\glossterm<concealment> from plants.

            \\rankline
            \\rank<3> The bonus increases to +6.
            \\rank<5> The bonus increases to +8.
            \\rank<7> The bonus increases to +10.
        """, tags=['Sustain (minor)']),
        Spell('Flourishing Vines', 4, 'Yourself', """
            Long, thin vines continuously grow and writhe on your body.
            At the end of each round, you may choose to cause the vines to extend out onto the ground in a \\areamed radius around you.
            When you do, that area becomes covered in \\glossterm<light undergrowth>.
            Whenever you move, the vines retreat back to your body.
            That prevents the vines from impeding your movement, though they do impede the movement of any other creatures that move simultaneously.

            \\rankline
            \\rank<6> The area increases to a \\arealarge radius.
            \\rank<8> The area increases to a \\areahuge radius.
        """, tags=['Attune (self)']),
        Spell('Thornblade', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            All damage the target deals with \\glossterm<strikes> becomes piercing damage in addition to the attack's normal damage types.
            Whenever the target \\glossterm<wounds> a creature with a \\glossterm<strike>, thorns from the striking weapon enter the target's body.
            As a \\glossterm<condition>, the target unable to heal the \\glossterm<hit points> lost to the attack.

            This condition can be removed by the \\textit<treat condition> ability (see \\pcref<Treat Condition>).
            The \\glossterm<difficulty rating> of the check is equal to 5 \\add your \\glossterm<power>.

            \\rankline
            \\rank<5> The difficulty rating of the check to remove the condition increases to 15 \\add your \\glossterm<power>.
            \\rank<7> The condition cannot be removed without taking a \\glossterm<short rest>.
        """, tags=['Attune (target)']),
        Spell('Verdant Armor', 1, 'Yourself', """
            When you cast this spell, you choose a type of armor you are proficient with that is not normally made from metal.
            Plants grow around your body, functioning like your chosen type of armor for you, except that the \\glossterm<encumbrance penalty> of the armor is reduced by 2.
            These plants are considered to be normal plants for the purpose of abilities that require plants to be near targets, such as spells from this mystic sphere.

            \\rankline
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

            This ritual takes 24 hours to perform, and requires 8 action points from its participants.
        """, tags=['AP']),
        Spell('Infertility', 3, None, """
            This ritual creates an area of death and decay in a one mile radius \\glossterm<zone> from your location.
            Normal plants within the area become half as productive as normal for the next year.
            This ritual does not stack with itself.
            If the \\ritual<fertility> ritual is also applied to the same area, the most recently performed ritual takes precedence.

            This ritual takes 24 hours to perform, and requires 8 action points from its participants.
        """, tags=['AP']),
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

            This ritual takes 24 hours to perform and requires 32 action points from its ritual participants.
        """, tags=['AP']),
    ],
)
