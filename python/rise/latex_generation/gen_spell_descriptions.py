#!/usr/bin/env python3

import click
from rise.latex.effects import Effects
from rise.latex.header import Header
from rise.latex.spell import Spell
from rise.latex.subspell import Subspell
from rise.latex.util import latexify
import rise.latex.rise_data as rise_data
from logging import getLogger, WARNING
# from pprint import pformat
logger = getLogger(__name__)
def log(*args):
    logger.log(*args)
def warn(*args):
    logger.log(WARNING, *args)


def generate_spells():
    spells = []
    spells.append(Spell(
        name='Aeromancy',
        short_description="Command air to protect allies and blast foes",
        header=Header('You blast a foe with wind.'),
        effects=Effects('Cantrip', """
            Make a Spellpower vs. Fortitude attack against a creature or object within \\rngmed range.
            \\hit The target takes bludgeoning \\glossterm<standard damage> -1d.
        """),
        schools=['Transmutation'],
        lists=['Nature'],
        subspells=[
            Subspell('Wind Screen', 1, """
                Choose a willing creature in \\rngclose range.
                The target gains a +1 \\glossterm<magic bonus> to Armor defense.
                This bonus is increased to +5 against ranged \\glossterm<physical attacks> from weapons or projectiles that are Small or smaller.

                Any effect which increases the size of creature this subspell can affect also increases the size of ranged weapon it defends against by the same amount.
                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Air', 'Attune (shared)', 'Shielding']),
            Subspell('Windstrike', 1, """
                Make a Spellpower vs. Fortitude attack against a creature or object within \\rngmed range.
                \\hit The target takes bludgeoning \\glossterm<standard damage> +1d.
            """, tags=['Air']),
            Subspell('Gentle Descent', 1, """
                Choose a willing, Medium or smaller creature in \\rngclose range.
                The target gains a 30 foot \\glossterm<glide speed> (see \\pcref<Gliding>).
            """),
            Subspell('Gust of Wind', 3, """
                Make a Spellpower vs. Fortitude attack against everything in a \\arealarge, 10 ft. wide line from you.
                \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d.
            """, tags=['Air']),
            Subspell('Windblade', 3, """
                Choose a willing creature within \\rngclose range.
                Melee weapons wielded by the target gain an additional ten feet of \\glossterm<reach>.
                This has no effect on ranged attacks the target makes.

                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Air', 'Attune (shared)', 'Shaping']),
            Subspell('Wind Screen', 4, """
                This subspell functions like the \\spell<wind screen> subspell, except that the defense bonus against ranged attacks increases to +10.
            """),
            Subspell('Air Walk', 4, """
                This subspell functions like the \\spell<wind screen> subspell, except that the target can also walk on air as if it were solid ground.
                The magic only affects the target's legs and feet.
                By choosing when to treat the air as solid, it can traverse the air with ease.
            """),
            Subspell('Stormlord', 5, """
                This subspell functions like the \\spell<wind screen> subspell, except that the air also retaliates against creature that attack the target.
                Whenever a creature within \\rngclose range of the target attacks it, wind strikes the attacking creature.
                The wind deals bludgeoning \\glossterm<standard damage> -1d.
                Any individual creature can only be dealt damage in this way once per round.

                Any effect which increases this spell's range increases the range of this retaliation by the same amount.
            """),
            Subspell('Control Weather', 7, """
                When you cast this subspell, you choose a new weather pattern.
                You can only choose weather which would be possible in the climate and season of the area you are in.
                For example, you can normally create a thunderstorm, but not if you are in a desert.

                When you complete the spell, the weather begins to take effect in a two mile radius cylinder-shaped zone centered on from your location.
                After five minutes, your chosen weather pattern fully takes effect.

                You can control the general tendencies of the weather, such as the direction and intensity of the wind.
                You cannot control specific applications of the weather -- where lightning strikes, for example, or the exact path of a tornado.
                Contradictory weather conditions are not possible simultaneously.

                After the spell's effect ends, the weather continues on its natural course, which may cause your chosen weather pattern to end.
                % TODO: This should be redundant with generic spell mechanics
                If another ability would magically manipulate the weather in the same area, the most recently used ability takes precedence.
            """, ['Air', 'Attune']),
        ],
        category='buff, defense',
    ))
    spells.append(Spell(
        name='Barrier',
        short_description="Shield allies from hostile forces",
        header=Header('You create a barrier around your ally that resists physical intrusion.'),
        effects=Effects('Cantrip', """
            Choose a willing creature in \\rngclose range.
            The target gains \\glossterm<damage reduction> equal to your spellpower against \\glossterm<physical damage>.
        """, tags=['Sustain (standard)']),
        schools=['Abjuration'],
        lists=['Arcane'],
        subspells=[
            Subspell('Ablative Shield', 1, """
                Choose a willing creature in \\rngclose range.
                The target gains \\glossterm<damage reduction> equal to your spellpower against all damage except for \\glossterm<energy damage>.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (shared)', 'Shielding']),
            Subspell('Resist Energy', 1, """
                This subspell functions like the \\spell<ablative shield> spell, except that the damage reduction only applies against \\glossterm<energy damage>.
            """),
            Subspell('Complete Shield', 3, """
                This subspell functions like the \\spell<ablative shield> spell, except that the damage reduction applies against all damage.
            """),
            Subspell('Repulsion', 2, """
                This subspell creates a repulsive field in a \\areamed radius zone from your location.
                Whenever a creature makes physical contact with the spell's area for the first time, you make a Spellpower vs. Mental attack against it.
                \\hit The target is unable to enter the spell's area with any part of its body.
                The rest of its movement in the current phase is cancelled.

                Creatures in the area at the time that the spell is cast are unaffected by the spell.
            """, tags=['Sustain (minor)']),
            Subspell('Immunity', 4, """
                Choose a willing creature in \\rngclose range, and a type of damage other than physical damage (see \pcref{Damage Types}).
                The target becomes immune to damage of the chosen type.
                Attacks that deal damage of multiple types still inflict damage normally unless the target is immune to all types of damage dealt.
            """),
            Subspell('Retributive Shield', 4, """
                This subspell functions like the \\spell<ablative shield> spell, except that damage resisted by this subspell is dealt back to the attacker as life damage.
                If the attacker is beyond \\rngclose range of the target, this reflection fails.

                Any effect which increases this subspell's range increases the range of this effect by the same amount.
                This subspell is from both the Abjuration and Vivimancy schools and gains the \\glossterm<Life> tag in addition to the tags from the \\spell<ablative shield> spell.
            """),
            Subspell('Empowered Shield', 5, """
                This subspell functions like the \\spell<ablative shield> spell, except that the damage reduction increases by an amount equal to your spellpower.
            """),
            Subspell("Deflective Shield", 4, """
                This subspell functions like the \\spell<ablative shield> spell, except that the target also gains a +1 \\glossterm<magic bonus> to Armor defense.
            """),
            Subspell('Antilife Shell', 7, """
                This effect functions like the \\spell<repulsion> subspell, except that you gain a +10 bonus to accuracy with the attack against living creatures.
            """),
        ],
        category='buff, defense',
    ))

    # To restrict the narrative scope of Fabrication, it should be able to
    # create any kind of object, but it can't manipulate objects in specific
    # ways after their creation.
    spells.append(Spell(
        name='Fabrication',
        short_description="Create objects to damage and impair foes",
        header=Header("You conjure acid from thin air to land on a foe."),
        # TODO: Narrative implications of at-will acid are annoying
        effects=Effects('Cantrip', """
            Make a Spellpower vs. Reflex attack against one creature or object within \\rngmed range.
            \\hit The target takes acid \\glossterm<standard damage> -1d.
        """, tags=['Acid', 'Manifestation']),
        schools=['Conjuration'],
        lists=['Arcane'],
        subspells=[
            Subspell('Acid Splash', 1, """
                Make a Spellpower vs. Reflex attack against one creature or object within \\rngmed range.
                \\hit The target takes acid \\glossterm<standard damage> +1d.
            """, tags=['Acid', 'Manifestation']),
            Subspell('Forge', 1, """
                Choose a type of weapon or shield that you are proficient with.
                You create a normal item of that type anywhere within \\rngclose range.

                The item cannot be constructed of any magical or extraordinary material.
                % This should allow the Giant augment; is this worded to allow that?
                It is sized appropriately for you, up to a maximum of a Medium size item.
            """, tags=['Attune']),
            Subspell('Greater Forge', 3, """
                This subspell functions like the \\spell<forge> subspell, except that you can also create any type of body armor you are proficient with.
                If you create body armor, you can create it already equipped to a willing creature within range.
            """),
            Subspell('Corrosive Splash', 3, """
                This subspell functions like the \\spell<acid splash> spell, except that it deals double damage to objects.
            """),
            Subspell('Meteor', 5, """
                You create a meteor in midair that falls to the ground, crushing foes in its path.
                The meteor takes up a \\areamed radius, and must be created in unoccupied space.
                After being summoned, it falls up to 100 feet before disappearing.
                Make a Spellpower vs. Reflex attack against everything in its path.
                \\hit Each target takes bludgeoning and fire \\glossterm<standard damage>.
            """, tags=['Manifestation']),
            Subspell("Meteor Swarm", 8, f"""
                This subspell functions like the \\textit<meteor> subspell, except that you can create up to five different meteors.
                The areas affected by two different meteors cannot overlap.
                If one of the meteors is created in an invalid area, that meteor is not created, but the others are created and dealt their damage normally.
            """),
            Subspell('Lingering Acid Splash', 5, f"""
                This subspell functions like the \\spell<acid splash> spell, except that the spell deals -1d damage.
                However, if the spell hits, it deals damage to the target again at the end of every \\glossterm<action phase> in subsequent rounds.
                This is a \\glossterm<condition>, and lasts until removed.
            """),
            Subspell('Web', 2, """
                You fill a \\areasmall radius zone in \\rngclose range with webs.
                The webs make the area \\glossterm<difficult terrain>.
                Each 5-ft.\\ square of webbing has hit points equal to your spellpower, and is \\glossterm<vulnerable> to fire.

                In addition, you make a Spellpower vs. Reflex attack against all creatures in the area when the spell is cast.
                \\hit Each target is \\immobilized as long as it has webbing from this ability in its space.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Subspell("Reinforced Webbing", 4, f"""
                This subspell functions like the \\textit<web> subspell, except that each 5-ft.\\ square of webbing gains additional hit points equal to your spellpower.
                In addition, the webs are no longer \\glossterm<vulnerable> to fire damage.
            """),
            Subspell('Poison', 2, """
                Make a Spellpower vs. Fortitude attack against a creature within \\rngmed range.

                \\hit The target takes poison \\glossterm<standard damage> -3d, and is poisoned as a \\glossterm<condition>.
                If the target is poisoned, repeat this attack at the end of each \\glossterm<action phase> after the first round.
                On the second hit, the target takes damage and becomes \\glossterm<sickened>.
                On the third hit, the target takes damage and becomes \\glossterm<nauseated> instead of sickened.
            """, tags=['Manifestation', 'Poison']),
        ],
        category='damage',
    ))

    spells.append(Spell(
        name='Thaumaturgy',
        short_description="Suppress and manipulate magical effects",
        effects=Effects('Cantrip', """
            Make a Spellpower attack against one creature within \\rngmed range.
            The attack result is applied to every \\glossterm<magical> effect on the target.
            The DR for each effect is equal to 5 + the \\glossterm<power> of that effect.
            \\hit Each effect is \\glossterm<suppressed>.
        """, tags=['Mystic', 'Sustain (standard)']),
        schools=['Abjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[
            Subspell('Suppress Magic', 1, """
                Make a Spellpower attack against one creature, object, or magical effect within \\rngmed range.
                If you target a creature or object, the attack result is applied to every \\glossterm<magical> effect on the target.
                If you target a magical effect directly, the attack result is applied against the effect itself.
                The DR for each effect is equal to 5 + the \\glossterm<power> of that effect.
                \\hit Each effect is \\glossterm<suppressed>.
            """, tags=['Mystic', 'Sustain (standard)']),
            Subspell('Alter Magic Aura', 1, """
                Make a Spellpower vs. Mental attack against one Large or smaller magical object in \\rngmed range.
                \\hit One of the target's magic auras is altered (see \pcref{Spellcraft}).
                You can change the school and descriptors of the aura.
                In addition, you can decrease the spellpower of the aura by up to half your spellpower, or increase the spellpower of the aura up to a maximum of your spellpower.
            """, tags=['Attune', 'Mystic']),
            Subspell('Suppress Item', 1, """
                Make a Spellpower vs. Mental attack against one Large or smaller magical object in \\rngmed range.
                \\hit All magical properties the target has are \\glossterm<suppressed>.
            """, tags=['Mystic', 'Sustain (minor)']),
            Subspell('Dismissal', 3, """
                Make a Spellpower attack against one creature or object within \\rngmed range.
                If the target is an effect of an ongoing \\glossterm<magical> ability, such as a summoned monster or created object, the DR is equal to 5 + add the \\glossterm<power> of the ability.
                Otherwise, this subspell has no effect.
                \\hit The target is treated as if the ability that created it was \\glossterm<dismissed>.
                This usually causes the target to disappear.
            """, tags=['Mystic']),
            Subspell('Malign Transferance', 2, """
                Choose a willing ally within \\rngmed range.
                The ally must be currently affected by a \\glossterm<magical> \\glossterm<condition>.
                In addition, make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                \\hit One magical condition of your choice is removed from the chosen ally and applied to the struck creature.
                \\crit As above, except that you can transfer any number of magical conditions in this way.
            """, tags=['Mystic']),
            Subspell('Enhance Magic', 4, """
                Choose a willing creature within \\rngmed range.
                The target gains a +1 enhancement bonus to \\glossterm<spellpower>.
            """, tags=['Attune (shared)', 'Mystic']),
            Subspell('Greater Enhance Magic', 8, """
                This subspell functions like the \\textit<enhance magic> subspell, except that the bonus is increased to +2.
            """, tags=['Attune (shared)', 'Mystic']),
            Subspell('Antimagic Field', 7, """
                All other magical abilities and objects are \\glossterm<suppressed> within a \\areasmall radius emanation from you.
                % How much of this is redundant with suppression?
                Creatures within the area cannot activate, sustain, or dismiss magical abilities.
                You cannot exclude yourself from this emanation.
                However, this subspell does not prevent you from sustaining or dismissing this subspell.
            """, tags=['Mystic', 'Sustain (minor)']),
            Subspell('Dimensional Anchor', 2, """
                Make a Spellpower vs. Mental attack against a creature or object within \\rngmed range.
                \\hit As a \\glossterm<condition>, the target is unable to travel extradimensionally.
                This prevents all \\glossterm<Manifestation>, \\glossterm<Planar>, and \\glossterm<Teleportation> effects.
            """, tags=['Mystic']),
            Subspell('Dimensional Lock', 5, """
                This subspell creates a dimensional lock in a \\arealarge radius zone from your location.
                Extraplanar travel into or out of the area is impossible.
                This prevents all \\glossterm<Manifestation>, \\glossterm<Planar>, and \\glossterm<Teleportation> effects.
            """, tags=['Attune', 'Mystic']),
            Subspell('Greater Malign Transferance', 7, """
                Choose any number of willing allies within \\rngmed range.
                Each ally must be currently affected by a \\glossterm<magical> \\glossterm<condition>.
                In addition, make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                \\hit Up to two magical conditions of your choice are removed from the chosen allies and applied to the struck creature.
                \\crit As above, except that you can transfer any number of magical conditions in this way.
            """),
        ],
        category='debuff, combat',
    ))

    spells.append(Spell(
        name='Pyromancy',
        short_description="Create fire to incinerate foes",
        header=Header('You create a small burst of flame.'),
        effects=Effects('Cantrip', """
            Make a Spellpower vs. Reflex attack against one creature or object within \\rngmed range.
            \\hit The target takes fire \\glossterm<standard damage> -1d.
        """, tags=['Fire']),
        schools=['Evocation'],
        lists=['Arcane', 'Fire', 'Nature'],
        subspells=[
            Subspell('Fireball', 1, """
                Make a Spellpower vs. Reflex attack against everything in a \\areasmall radius within \\rngclose range.
                \\hit Each target takes fire \\glossterm<standard damage> -1d.
            """, tags=['Fire']),
            Subspell('Firebolt', 1, """
                Make a Spellpower vs. Reflex attack against one creature within \\rngmed range.
                \\hit The target takes fire \\glossterm<standard damage> +1d.
            """, tags=['Fire']),
            Subspell("Burning Hands", 2, f"""
                Make a Spellpower vs. Reflex attack against everything in a \\arealarge cone.
                \\hit Each target takes fire \\glossterm<standard damage> -1d.
            """, tags=['Fire']),
            Subspell("Blast Furnace", 2, f"""
                This subspell functions like the \\spell<fireball> subspell, except that it gains the \\glossterm<Sustain> (standard) tag.
                The area affected by the spell becomes a \\glossterm<zone> that is continuously engulfed in flames.
                At the end of each \\glossterm<action phase> in subsequent rounds, the attack is repeated in that area.
            """),
            Subspell("Greater Blast Furnace", 5, f"""
                This subspell functions like the \\textit<blast furnace> subspell, except that the spell gains the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Sustain> (standard) tag.
            """),
            Subspell("Ignition", 3, f"""
                This subspell functions like the \\spell<fireball> subspell, except that each target hit is also \\glossterm<ignited> until it puts out the fire.
            """),
            Subspell('Inferno', 5, """
                This subspell functions like the \\textit<fireball> subspell, except that it affects a \\arealarge radius within \\rngmed range.
            """),
            Subspell('Greater Inferno', 9, """
                This subspell functions like the \\textit<fireball> subspell, except that it affects a 200 ft.\\ radius within \\rnglong range.
            """),
            Subspell("Greater Ignition", 6, f"""
                This subspell functions like the \\spell<fireball> subspell, except that each target hit is also \\glossterm<ignited> as a \\glossterm<condition>.
                Unlike the normal ignited effect, this condition cannot be removed by putting out the fire.
                In addition, the ignited effect deals fire \\glossterm<standard damage> -3d instead of the normal 1d6 fire damage each round.
            """),
            Subspell("Supreme Ignition", 9, f"""
                This subspell functions like the \\textit<greater ignition> subspell, except that the condition must be removed twice before the effect ends.
            """),
            Subspell("Fearsome Flame", 4, f"""
                This subspell functions like the \\spell<fireball> subspell, except that the attack result is also compared to each target's Mental defense.
                \\hit Each target is \\glossterm<shaken> as a \\glossterm<condition>.
            """),
            Subspell("Flame Serpent", 4, f"""
                This subspell functions like the \\spell<fireball> subspell, except that it targets everything in a \\arealarge, 10 ft.\\ wide shapeable line within \\rngmed range.
            """),
            Subspell('Flame Aura', 6, """
                Choose a willing creature within \\rngclose range.
                Heat constantly radiates in a \\areamed radius emanation from the target.
                At the end of each \\glossterm<action phase>, make a Spellpower vs. Reflex attack against everything in the area.
                \\hit Each target takes fire \\glossterm<standard damage> -2d.

                You can cast this subspell as a \\glossterm<minor action>.
                In addition, you can apply the Widened \\glossterm<augment> to this subspell.
                If you do, it increases the area of the emanation.
            """, tags=['Attune (shared)', 'Fire']),
            Subspell('Flame Blade', 3, """
                Choose a willing creature within \\rngclose range.
                Weapons wielded by the target gain a +1d \\glossterm<magic bonus> to \\glossterm<strike damage>.
                In addition, all \\glossterm<strike damage> dealt with its weapons becomes fire damage in addition to the attack's normal damage types.

                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Attune (shared)', 'Fire']),
            Subspell('Fire Trap', 3, """
                Choose an Large or smaller unattended openable object within \\rngclose range.
                If the target object becomes opened, it explodes.
                When it explodes, you make a Spellpower vs. Reflex attack against everything within a \\areamed radius burst from the target, including the target itself.
                \\hit Each target takes fire \\glossterm<standard damage> -1d.

                After the object explodes in this way, the spell is \\glossterm<dismissed>.
            """, tags=['Attune', 'Fire', 'Trap']),
        ],
        category='damage',
    ))

    spells.append(Spell(
        name="Aquamancy",
        short_description="Command water to crush and drown foes",
        header=Header("You create a wave of water to crush your foes."),
        effects=Effects('Cantrip', """
            Make a Spellpower vs. Fortitude attack against everything in a \\areamed, 5 ft.\\ wide line from you.
            \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d.
        """, tags=['Manifestation', 'Water']),
        schools=['Conjuration'],
        lists=['Nature', 'Water'],
        subspells=[
            Subspell('Crushing Wave', 1, """
                Make a Spellpower vs. Fortitude attack against everything in a \\arealarge, 10 ft.\\ wide line from you.
                \\hit Each target takes bludgeoning \\glossterm<standard damage> -1d.
            """, tags=['Manifestation', 'Water']),
            Subspell('Underwater Freedom', 1, """
                Choose a willing creature within \\rngclose range.
                The target suffers no penalties for acting underwater, except for those relating to using ranged weapons.
            """, tags=['Attune (shared)']),
            Subspell('Greater Underwater Freedom', 3, """
                This subspell functions like the \\spell<underwater freedom> subspell, except that the target can also breathe water as if it was air.
            """),
            Subspell('Dampen', 2, """
                Choose up to five willing creatures within \\rngclose range.
                Each target gains damage reduction against fire damage equal to twice your \\glossterm<spellpower>.
            """, tags=['Attune (shared)']),
            Subspell('Raging River', 4, """
                This subspell functions like the \\spell<crushing wave> subspell, except that it gains the \\glossterm<Sustain> (standard) tag.
                The area affected by the spell becomes a \\glossterm<zone> that is continuously filled with rushing water.
                Creatures in area suffer penalties appropriate for fighting underwater, and may be unable to breathe.
                In addition, at the end of each \\glossterm<action phase> in subsequent rounds, the attack is repeated in that area.
            """),
            Subspell("Greater Raging River", 7, f"""
                This subspell functions like the \\textit<raging river> subspell, except that the spell gains the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Sustain> (standard) tag.
            """),
            Subspell('Geyser', 3, """
                Make a Spellpower vs. Fortitude attack against everything in a \\arealarge, 5 ft.\\ wide vertical line within \\rngmed range.
                \\hit Each target takes takes bludgeoning \\glossterm<standard damage> +1d.
            """, tags=['Manifestation', 'Water']),
            Subspell("Aqueous Sphere", 2, f"""
                This subspell functions like the \\spell<crushing wave> subspell, except that it targets everything in a \\areasmall radius within \\rngclose range.
            """),
            Subspell("Aqueous Blade", 3, """
                Choose a willing creature within \\rngclose range.
                Whenever the target makes a \\glossterm<strike> with a melee weapon, the attack is made against Reflex defense instead of Armor defense.
                However, the target takes a -2d penalty to \\glossterm<strike damage>.

                You can cast this subspell as a \\glossterm<minor action>.
                This subspell is from the Transmutation school instead of the Conjuration school.
            """, tags=['Attune (shared)', 'Shaping', 'Water']),
            Subspell('Greater Aqueous Blade', 6, """
                This subspell functions like the \\spell<aqueous blade> subspell, except that the penalty to strike damage is reduced to -1d.
            """),
            Subspell('Supreme Aqueous Blade', 9, """
                This subspell functions like the \\spell<aqueous blade> subspell, except that the penalty to strike damage is removed.
            """),
        ],
        category='damage',
    ))

    spells.append(Spell(
        name="Delusion",
        short_description="Instill false emotions to influence creatures",
        header=Header("You terrify your foe."),
        effects=Effects('Cantrip', """
            Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
            \\hit The target is \\glossterm<shaken> by you as a \\glossterm<condition>.
            \\crit The target is \\glossterm<frightened> by you as a \\glossterm<condition>.
        """, tags=['Emotion', 'Mind']),
        schools=['Enchantment'],
        lists=['Arcane'],
        subspells=[
            Subspell('Cause Fear', 1, """
                Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                \\hit The target is \\frightened by you as a \\glossterm<condition>.
                \\crit The target is \\panicked by you as a \\glossterm<condition>.
            """, tags=['Emotion', 'Mind']),
            # Math: at 1st level, spellpower is probably ~2, so standard damage is probably 2d6.
            # Casting this spell and then two standard damage spells deals 4d6+2d8 = 23 damage
            # casting three standard damage spells deals 6d6 = 21 damage
            # So when fighting alone, this takes 3 rounds of effectiveness to be equal
            # in power to a simple damage spell.

            # At 20th level, spellpower is ~22, so standard damage is 9d10
            # Casting this spell and then two standard damage spells deals 18d10+7d10=25d10
            # Casting three standard damage spells deals 27d10
            Subspell("Agony", 1, """
                Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                \\hit The target is inflicted with agonizing pain as a \\glossterm<condition>.
                It suffers a -2 penalty to Mental defense.
                % Does this need to clarify that it takes effect in the round the spell was cast?
                In addition, at the end of each \\glossterm<delayed action phase>, if the target took damage that round, it takes \\glossterm<standard damage> -2d.
                This damage is of all damage types that the target was damaged by during that round.
            """, tags=['Emotion', 'Mind']),
            Subspell("Redirected Fear", 2, """
                This subspell functions like the \\spell<cause fear> subspell, except that you also choose a willing ally within the spell's range.
                The target is afraid of the chosen ally instead of being afraid of you.
            """),
            Subspell("Charm", 3, """
                Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                If the target thinks that you or your allies are threatening it, you take a -5 penalty to accuracy on the attack.
                \\hit The target is \\charmed by you.
                Any act by you or your apparent allies that threatens or damages the \\spell<charmed> person breaks the effect.
                This effect is automatically \\glossterm<dismissed> after one hour.
                \\crit As above, except that the effect is not automatically dismissed.
            """, tags=['Attune', 'Emotion', 'Mind', 'Subtle']),
            Subspell("Amnesiac Charm", 7, """
                This subspell functions like the \\spell<charm> subspell, except that when the spell ends, an affected target forgets all events that transpired during the spell's duration.
                It becomes aware of its surroundings as if waking up from a daydream.
                The target is not directly aware of any magical influence on its mind, though unusually paranoid or perceptive creatures may deduce that their minds were affected.
            """),
            Subspell("Calm Emotions", 3, """
                Make a Spellpower vs. Mental attack against all creatures within a \\areamed radius from you.
                \\hit Each target has its emotions calmed.
                The effects of all other \\glossterm<Emotion> abilities on that target are \\glossterm<suppressed>.
                It cannot take violent actions (although it can defend itself) or do anything destructive.
                If the target takes damage or feels that it is in danger, this effect is \\glossterm<dismissed>.
            """, tags=['Emotion', 'Mind', 'Sustain (standard)']),
            Subspell("Enrage", 4, """
                Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                \\hit As a \\glossterm<condition>, the target is unable to take any \\glossterm<standard actions> that do not cause it to make an attack.
                For example, it could make a \\glossterm<strike> or cast an offensive spell, but it could not heal itself or summon an ally.
                This cannot prevent it from taking the \\textit<recover> or \\textit<desperate recovery> actions.
                \\crit As a \\glossterm<condition>, the target cannot take any \\glossterm<standard actions> that do not cause it to make a \\glossterm<strike>.
                This cannot prevent it from taking the \\textit<recover> or \\textit<desperate recovery> actions.
            """, tags=['Emotion', 'Mind']),
        ],
        category='debuff, combat',
    ))

    spells.append(Spell(
        name="Compel",
        short_description="Bend creatures to your will by controlling their actions",
        header=Header("You compel a foe to fall down."),
        effects=Effects('Cantrip', """
            Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
            \\hit The target falls \\glossterm<prone>.
        """, tags=['Compulsion', 'Mind']),
        schools=['Enchantment'],
        lists=['Arcane', 'Divine'],
        subspells=[
            Subspell('Fall', 1, """
                Make a Spellpower vs. Mental attack against all creatures in a \\areamed radius from you.
                \\hit Each target falls \\glossterm<prone>.
                \\crit As above, and as a \\glossterm<condition>, each target is unable to stand up.
                If a target is somehow brought into a standing position, it will immediately fall and become prone again.
            """),
            Subspell('Stay', 1, """
                Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                \\hit The target is \\immobilized as a \\glossterm<condition>.
                \\crit The target is \\glossterm<immobilized> twice as two separate conditions.
                Both must be removed before the target can move again.
            """, tags=['Compulsion', 'Mind']),
            Subspell("Confusion", 2, """
                Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                \\hit The target is \\disoriented as a \\glossterm<condition>.
                \\crit The target is \\confused as a \\glossterm<condition>.
            """, tags=['Compulsion', 'Mind']),
            Subspell("Sleep", 4, """
                Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                \\hit The target is \\blinded as a \\glossterm<condition>.
                \\crit The target falls asleep.
                It cannot be awakened by any means while the spell lasts.
                After that time, it can wake up normally, though it continues to sleep until it would wake up naturally.
                % Awkward to sustain without the Sustain tag
                This effect lasts as long as you \\glossterm<sustain> it as a \\glossterm<minor action>.
                However, it is a \\glossterm<condition>, and can be removed by effects which remove conditions.
            """, tags=['Compulsion', 'Mind']),
            Subspell("Discordant Song", 4, """
                Make a Spellpower vs. Mental attack against all creatures in a \\areamed radius from you.
                \\hit Each target is \\disoriented as a \\glossterm<condition>.
                \\crit Each target is \\confused as a \\glossterm<condition>.
            """, tags=['Compulsion', 'Mind']),
            Subspell("Dance", 3, """
                Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                \\hit As a \\glossterm<condition>, the target is compelled to dance.
                It can spend a \\glossterm<move action> to dance, if it is physically capable of dancing.
                At the end of each round, if the target did not dance during that round, it takes a -2 penalty to \\glossterm<accuracy>, \\glossterm<checks>, and \\glossterm<defenses> as the compulsion intensifies.
                This penalty stacks each round until the target dances, which resets the penalties to 0.
                \\crit As above, except that the target must dance as a \\glossterm<standard action> to reset the penalties, instead of as a move action.
            """, tags=['Compulsion', 'Mind']),
            Subspell("Irresistible Dance", 9, """
                This subspell functions like the \\textit<dance> subspell, except that you gain a +4 bonus to accuracy on the attack.
            """),
            Subspell("Dominate", 5, """
                Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                \\hit The target is \\glossterm<confused> as a \\glossterm<condition>.
                \\crit The target is \\glossterm<dominated> by you.
                % Awkward to sustain/attune without the Sustain/Attune tags
                This effect lasts as long as you \\glossterm<sustain> it as a \\glossterm<minor action>.
                If the target was already dominated by you, including from a previous use of this ability, this effect instead lasts as long as you \\glossterm<attune> to it.
            """, tags=['Compulsion', 'Mind']),
        ],
        category='debuff, combat',
    ))

    spells.append(Spell(
        name='Bless',
        short_description="Grant divine blessings to aid allies and improve combat prowess",
        header=Header('You ask your deity for a blessing of resilience to aid an ally.'),
        effects=Effects('Cantrip', """
            Choose a willing creature within \\rngclose range.
            The target removes one \\glossterm<condition> affecting it.
        """),
        schools=['Channeling'],
        lists=['Divine'],
        subspells=[
            Subspell('Battle Blessing', 1, """
                The target gains a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with all attacks.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (shared)']),
            Subspell('Greater Battle Blessing', 5, """
                This subspell functions like the \\spell<battle blessing> subspell, except that the bonus increases to +2.
            """),
            Subspell('Blessing of Resilience', 1, """
                Choose a willing creature within \\rngclose range.
                The target removes one \\glossterm<condition> affecting it.
                In addition, the target ignores the next two \\glossterm<conditions> it would receive.
                After resisting two conditions in this way, this spell ends.
            """, tags=['Attune (shared)']),
            Subspell('Greater Blessing of Resilience', 4, """
                This subspell functions like the \\textit<blessing of resilience> subspell, except that the spell does not end until it resists five \\glossterm<conditions>.
            """),
            Subspell('Supreme Blessing of Resilience', 7, """
                This subspell functions like the \\textit<blessing of resilience> subspell, except that the spell can resist any number of conditions without ending.
            """),
            Subspell('Blessing of the Mighty', 3, """
                The target gains a +1d \\glossterm<magic bonus> to all abilities that deal damage or grant healing measured in dice.
            """, tags=['Attune (shared)']),
            Subspell("Greater Blessing of the Mighty", 7, """
                The target gains a +2d \\glossterm<magic bonus> to all abilities that deal damage or grant healing measured in dice.
            """),
            Subspell("Blessed Blade", 3, """
                Choose a willing creature within \\rngclose range.
                \\glossterm<Strikes> made with melee weapons wielded by the target are made against Mental defense instead of Armor defense.
                However, the target takes a -2d penalty to \\glossterm<strike damage>.

                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Attune (shared)', 'Fire']),
            Subspell('Greater Blessed Blade', 6, """
                This subspell functions like the \\spell<blessed blade> subspell, except that the penalty to strike damage is reduced to -1d.
            """),
            Subspell('Supreme Blessed Blade', 9, """
                This subspell functions like the \\spell<blessed blade> subspell, except that the penalty to strike damage is removed.
            """),
            Subspell("Divine Shield", 6, """
                Choose a willing creature within \\rngclose range.
                The target gains \\glossterm<damage reduction> equal to your spellpower against all damage.

                You can cast this subspell as a \\glossterm<minor action>.
            """),
            Subspell("Divine Might", 3, """
                You increase your size by one size category.
                This increases your \\glossterm<strike damage> and usually increases your \\glossterm<reach> (see \\pcref<Size in Combat>).
                However, you take a -1d penalty to \\glossterm<strike damage>, as your muscles are not increased fully to match your new size.

                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Attune', 'Shaping', 'Sizing']),
            Subspell("Divine Might, Greater", 6, """
                This subspell functions like the \\textit<divine might> subspell, except that the penalty to \\glossterm<strike damage> is removed.
            """),
            Subspell("Divine Might, Supreme", 9, """
                This subspell functions like the \\spell<divine might> subspell, except that your size is increased by two size categories.
            """),
        ],
        category='buff, offense',
    ))

    spells.append(Spell(
        name="Divine Judgment",
        short_description="Smite foes with divine power",
        header=Header("You smite a foe with holy (or unholy) power."),
        effects=Effects('Cantrip', """
            Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
            \\hit The target takes divine \\glossterm<standard damage> -1d.
        """),
        schools=['Channeling'],
        lists=['Divine'],
        subspells=[
            Subspell('Divine Judgment', 1, """
                Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                \\hit The target takes divine \\glossterm<standard damage> +1d.
            """),
            Subspell("Word of Faith", 2, """
                Make a Spellpower vs. Mental attack against all enemies in a \\areamed radius from you.
                \\hit Each target takes divine \\glossterm<standard damage> -1d.
            """),
        ],
        category='damage',
    ))

    spells.append(Spell(
        name='Cryomancy',
        short_description='Drain heat to injure and freeze foes',
        header=Header('You drain the heat from a foe.'),
        effects=Effects('Cantrip', """
            Make a Spellpower vs. Fortitude attack against one creature or object within \\rngmed range.
            \\hit The target takes cold \\glossterm<standard damage> -1d.
        """, tags=['Cold']),
        schools=['Evocation'],
        lists=['Arcane', 'Nature'],
        subspells=[
            Subspell('Cone of Cold', 1, """
                Make a Spellpower vs. Fortitude attack against everything in a \\areamed cone from you.
                \\hit Each target takes cold \\glossterm<standard damage> -1d, and is \\glossterm<fatigued> as a \\glossterm<condition>.
            """, tags=['Cold']),
            Subspell('Frostbite', 1, """
                Make a Spellpower vs. Fortitude attack against one creature or object within \\rngmed range.
                \\hit The target takes cold \\glossterm<standard damage> +1d.
            """, tags=['Cold']),
            Subspell('Frostbite', 4, """
                This subspell functions like the \\subspell<frostbite> subspell, except that a struck target is also \\glossterm<exhausted> as a \\glossterm<condition>.
            """),
            Subspell('Cold Snap', 2, """
                This subspell functions like the \\spell<cone of cold> subspell, except that it gains the \\glossterm<Sustain> (standard) tag.
                The area affected by the spell becomes a \\glossterm<zone> that is supernaturally chilled.
                At the end of each \\glossterm<action phase> in subsequent rounds, the attack is repeated in that area.
            """),
            Subspell("Greater Cold Snap", 5, f"""
                This subspell functions like the \\textit<cold snap> subspell, except that the spell gains the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Sustain> (standard) tag.
            """),
            Subspell("Freezing", 4, """
                This subspell functions like the \\spell<cone of cold> subspell, except that each struck target is also \\glossterm<immobilized> as an additional \\glossterm<condition>.
            """),
            Subspell('Blizzard', 3, """
                This subspell functions like the \\spell<cone of cold> subspell, except that the area becomes a \\areamed radius from you.
            """),
            Subspell('Icecraft', 2, """
                Choose a pool of unattended, nonmagical water within \\rngclose range.
                This subspell creates an icy weapon or a suit of icy armor from the target pool of water.
                You can create any weapon, shield, or body armor that you are proficient with, and which would normally be made entirely from metal, except for heavy body armor.
                The pool of water targeted must be at least as large as the item you create.

                The item functions like a normal item of its type, except that it is more fragile.
                It has hit points equal to twice your spellpower, does not have any \\glossterm<hardness>, and is \\glossterm<vulnerable> to fire damage.
                If the item would take cold damage, it instead heals that many hit points.

                Whenever a creature wearing armor created in this way takes physical damage, cold damage, or fire damage, that damage is also dealt to the armor.
                Likewise, whenever a creature wielding a weapon created in this way deals damage with the weapon, that damage is also dealt to the weapon.
                If the item loses all of its hit points, this effect is \\glossterm<dismissed>.
            """, tags=['Attune', 'Cold']),
            Subspell('Sturdy Icecraft', 4, """
                This subspell functions like the \\subspell<icecraft> subspell, except that the item created has hit points equal to four times your spellpower.
                In addition, you can create heavy body armor.
            """),
            Subspell('Enhanced Icecraft', 6, """
                This subspell functions like the \\subspell<icecraft> subspell, except that the item created is magically enhanced.
                A weapon gains a +1d \\glossterm<magic bonus> to \\glossterm<strike damage>, and armor grants a +1 \\glossterm<magic bonus> to the defenses it improves.
            """),
        ],
        category='damage',
    ))

    spells.append(Spell(
        name="Electromancy",
        short_description='Create electricity to injure and stun foes',
        header=Header("You create a bolt of electricity that fries your foes."),
        effects=Effects('Electromancy', """
            Make a Spellpower vs. Reflex attack against everything in a \\areamed, 5 ft.\\ wide line from you.
            \\hit Each target takes electricity \\glossterm<standard damage> -1d.
        """, tags=['Electricity']),
        schools=['Evocation'],
        lists=['Arcane', 'Nature'],
        subspells=[
            Subspell('Lightning Bolt', 1, """
                Make a Spellpower vs. Reflex attack against everything in a \\arealarge, 10 ft.\\ wide line from you.
                \\hit Each target takes electricity \\glossterm<standard damage> -1d.
            """, tags=['Electricity']),
            Subspell('Shocking Grasp', 1, """
                Make a Spellpower vs. Reflex attack against one creature or object you \\glossterm<threaten>.
                You gain a +5 bonus to \\glossterm<concentration> checks to cast this subspell.
                \\hit The target takes electricity \\glossterm<standard damage> +1d.
            """, tags=['Electricity']),
            Subspell('Static Discharge', 2, """
                This subspell functions like the \\spell<lightning bolt> subspell, except that it affects everything within a \\areamed radius from you.
            """),
            Subspell('Magnetic', 2, """
                This subspell functions like the \\spell<lightning bolt> subspell, except that you gain a +2 bonus to accuracy against creatures wearing metal armor or otherwise carrying a significant amount of metal.
            """),
            Subspell('Dynamo', 2, """
                This subspell functions like the \\spell<lightning bolt> subspell, except that it gains the \\glossterm<Sustain> (standard) tag.
                The area affected by the spell becomes a \\glossterm<zone> that is continuously filled with electrical pulses.
                At the end of each \\glossterm<action phase> in subsequent rounds, the attack is repeated in that area.
            """),
            Subspell("Greater Dynamo", 5, f"""
                This subspell functions like the \\textit<dynamo> subspell, except that the spell gains the \\glossterm<Sustain> (minor) tag instead of the \\glossterm<Sustain> (standard) tag.
            """),
            # This is fairly aggressively costed - should maybe be 7
            Subspell('Chain Lightning', 6, """
                Make a Spellpower vs. Reflex attack against one creature or object within \\rngmed range.
                \\hit The target takes electricity \\glossterm<standard damage> +2d.
                In addition, make an additional Spellpower vs. Reflex attack against any number of creatures in a \\areamed radius from the struck target.
                \\hit Each secondary target takes electricity \\glossterm<standard damage>.
            """, tags=['Electricity']),
            Subspell("Forked Lightning", 3, """
                This subspell functions like the \\spell<lightning bolt> subspell, except that you create two separate line-shaped areas instead of one.
                The two areas can overlap, but targets in the overlapping area are only affected once.
            """),
            Subspell("Shocking", 5, """
                This subspell functions like the \\spell<lightning bolt> subspell, except that each struck target is also \\glossterm<dazed> as a \\glossterm<condition>.
                Each critically struck target is \\glossterm<stunned> instead of dazed.
            """),
            Subspell("Instantaneous", 4, """
                This subspell functions like the \\spell<lightning bolt> subspell, except that the spell's attack is made against Fortitude defense instead of Reflex defense.
            """),
            Subspell("Call Lightning", 3, """
                Make a Spellpower vs. Reflex attack against everything in a \\arealarge, 5 ft.\\ wide vertical line from you.
                If you are outdoors in cloudy or stormy weather, you gain a +2 bonus to \\glossterm<accuracy> with the attack.
                \\hit Each target takes takes electricity \\glossterm<standard damage> +1d.
            """, tags=['Electricity']),
        ],
        category='damage',
    ))

    spells.append(Spell(
        name="Corruption",
        short_description="Weaken the life force of foes, reducing their combat prowess",
        header=Header("You corrupt your foe's life force, weakening it."),
        effects=Effects('Corruption', """
            Make a Spellpower vs. Fortitude attack against a living creature within \\rngclose range.
            \\hit The target is \\glossterm<sickened> as a \\glossterm<condition>.
            \\crit The target is \\glossterm<nauseated> as a \\glossterm<condition>.
        """, tags=['Life']),
        schools=['Vivimancy'],
        lists=['Arcane', 'Divine', 'Nature'],
        cantrip="""
            You take a -2 penalty to accuracy with the spell.
        """,
        subspells=[
            Subspell('Sickening Decay', 1, """
                Make a Spellpower vs. Fortitude attack against a living creature within \\rngclose range.
                \\hit The target is \\glossterm<sickened> as a \\glossterm<condition>.
                % TODO: clarify when exactly this damage is taken (should be at the end of the phase)
                In addition, it takes life \\glossterm<standard damage> -3d whenever it takes a \\glossterm<standard action>.
                It can only take damage in this way once per round.
                \\crit The target is \\glossterm<nauseated> as a \\glossterm<condition>.
                In addition, it takes life \\glossterm<standard damage> -1d whenever it takes a \\glossterm<standard action>.
                It can only take damage in this way once per round.
            """, tags=['Life']),
            Subspell("Corruption of Blood and Bone", 4, """
                This subspell functions like the \\spell<sickening decay> spell, except that it gains a +1d bonus to damage.
                In addition, damage from the spell reduces the target's maximum hit points by the same amount.
                This hit point reduction is part of the same \\glossterm<condition> as the spell's other effects.
                When the condition is removed, the target's maximum hit points are restored.
            """),
            Subspell("Curse of Decay", 6, """
                This subspell functions like the \\spell<sickening decay> subspell, except that the attack is made against Mental defense instead of Fortitude defense.
                In addition, if the attack critically hits, the spell's effect becomes a permanent curse.
                It is no longer a condition, and cannot be removed by abilities that remove conditions.
            """, tags=['Curse']),
            Subspell('Miasma', 1, """
                Make a Spellpower vs. Fortitude attack against all living creatures within an \\areamed radius from you.
                \\hit Each target is \\glossterm<sickened> as a \\glossterm<condition>.
            """),
            Subspell('Greater Miasma', 4, """
                This subspell functions like the \\spell<miasma> subspell, except that a struck target is \\glossterm<nauseated> instead of sickened.
            """),
            Subspell("Eyebite", 4, """
                Make a Spellpower vs. Fortitude attack against a living creature within \\rngclose range.
                \\hit The target is \\glossterm<blinded> as a \\glossterm<condition>.
                \\crit The target is \\glossterm<blinded> twice by two separate \\glossterm<conditions>.
                    Both conditions must be removed before the target can see again.
            """, tags=['Life']),
            Subspell("Finger of Death", 7, """
                Make a Spellpower vs. Fortitude attack against a living creature within \\rngclose range.
                \\hit The target takes life \\glossterm<standard damage> +3d.
                \\crit The target immediately dies.
            """, tags=['Death', 'Life']),
            Subspell("Bleed", 4, """
                This subspell functions like the \\spell<sickening decay> subspell, except that a struck target also begins bleeding as an additional \\glossterm<condition>.
                At the end of every subsequent \\glossterm<action phase>, the target takes slashing \\glossterm<standard damage> -2d.
            """),
            Subspell("Crippling Decay", 5, """
                This subspell functions like the \\spell<sickening decay> spell, except that a struck target is also \\glossterm<immobilized> as an additional \\glossterm<condition>.
            """),
        ],
        category='debuff, combat',
    ))

    spells.append(Spell(
        name="Vital Surge",
        short_description="Alter life energy to cure or inflict wounds",
        # header=Header("description"),
        effects=Effects('Vital Surge', """
            Make a Spellpower vs. Fortitude attack against a creature within \\rngmed range.
            \\hit The target takes life damage equal to \\glossterm<standard damage> -1d.
        """, tags=['Life']),
        schools=['Vivimancy'],
        lists=['Divine', 'Nature'],
        subspells=[
            Subspell("Cure Wounds", 1, """
                Choose a willing creature within \\rngmed range.
                The target heals hit points equal to \\glossterm<standard damage> +1d.
            """, tags=['Life']),
            Subspell('Inflict Wounds', 1, """
                Make a Spellpower vs. Fortitude attack against a creature within \\rngmed range.
                \\hit The target takes life damage equal to \\glossterm<standard damage> +1d.
            """, tags=['Life']),
            Subspell("Greater Cure Wounds", 3, """
                This subspell functions like the \\spell<cure wounds> subspell, except that for every 5 points of healing you provide, you can instead heal one point of \\glossterm<vital damage>.
            """),
            Subspell("Heal", 6, """
                This subspell functions like the \\spell<cure wounds> subspell, except that it gains a +1d \\glossterm<magic bonus> to healing.
                In addition, it heals \\glossterm<vital damage> as easily as it heals hit points.
            """),
            # TODO: make "Undead Bane" subspell after figuring out undead / life
            # damage interaction
            Subspell("Drain Life", 3, """
                This subspell functions like the \\spell<inflict wounds> subspell, except that you heal hit points equal to half the damage dealt.
            """),
            Subspell("Death Knell", 4, """
                This subspell functions like the \\spell<inflict wounds> subspell, except that a struck target suffers a death knell as an additional \\glossterm<condition>.
                At the end of each round, if the target has 0 hit points, it immediately dies.
            """, tags=['Death']),
            Subspell("Circle of Death", 3, """
                You are surrounded by an aura of death in a \\areamed radius emanation from you.
                When this spell resolves, and the end of each \\glossterm<action phase> in subsequent rounds, make a Spellpower vs. Fortitude attack against all creatures in the area.
                \\hit Each target takes life \\glossterm<standard damage> -3d.
            """, tags=['Life', 'Sustain (minor)']),
            Subspell("Circle of Healing", 4, """
                You are surrounded by an aura of healing in a \\areamed radius emanation from you.
                When this spell resolves, and the end of each \\glossterm<action phase> in subsequent rounds, make a Spellpower vs. Fortitude attack against all creatures in the area.
                \\hit Each target heals hit points equal to \\glossterm<standard damage> -3d.
            """, tags=['Life', 'Sustain (minor)']),
            Subspell("Remove Disease", 3, """
                Choose a willing creature within \\rngclose range.
                All diseases affecting the target are removed.
            """, tags=['Flesh']),
            Subspell("Restore Senses", 2, """
                Choose a willing creature within \\rngclose range.
                One of the target's physical senses, such as sight or hearing, is restored to full capacity.
                This can heal both magical and mundane conditions, but it cannot completely replace missing body parts required for a sense to function (such as missing eyes).
            """, tags=['Flesh']),
        ],
        category='damage',
    ))

    # Should this allow you to summon two monsters at once? I think that is
    # okay maybe?
    spells.append(Spell(
        name="Summon",
        short_description="Summon creatures to fight with you",
        header=Header("You summon a creature to fight by your side."),
        # TODO: this shouldn't reference the subspell effect
        effects=Effects('Summon Monster', """
                This cantrip functions like the \\spell<summon monster> subspell, except that it has the \\glossterm<Sustain> (standard) tag instead of the \\glossterm<Sustain> (minor) tag.
        """, tags=["Manifestation", 'Sustain (standard)']),
        schools=['Conjuration'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[
            # TODO: this needs more subspells
            Subspell('Summon Monster', 1, """
                You summon a creature in an unoccupied square within \\rngmed range.
                It visually appears to be a common Small or Medium animal of your choice, though in reality it is a manifestation of magical energy.
                Regardless of the appearance and size chosen, the creature has hit points equal to twice your spellpower.
                All of its defenses are equal to your 4 \\add your spellpower, and its \\glossterm<land speed> is equal to 30 feet.

                Each round, you choose the creature's actions.
                There are only two actions it can take.
                As a move action, it can move as you direct.
                As a standard action, it can make a melee \\glossterm{strike} against a creature it threatens.
                Its accuracy is equal to your spellpower.
                If it hits, it deals \\glossterm<standard damage> -2d.
                The type of damage dealt by this attack depends on the creature's appearance.
                Most animals bite or claw their foes, which deals bludgeoning and slashing damage.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Subspell("Summon Bear", 2, """
                This subspell functions like the \\spell<summon monster> spell, except that the creature appears to be a Medium bear.
                As a standard action, it can make a \\glossterm<grapple> attack against a creature it threatens.
                Its accuracy is the same as its accuracy with \\glossterm<strikes>.
                While grappling, the manifested creature can either make a strike or attempt to escape the grapple.

                This augment replaces the effects of any other augments that change the appearance of the creature.
            """),
        ],
        # What category does this belong to?
        category='buff, offense',
    ))

    spells.append(Spell(
        name="Scry",
        short_description="See and hear at great distances",
        header=Header("You create a scrying sensor that allows you to see at a distance."),
        # TODO: this shouldn't reference the subspell effect.
        effects=Effects('Cantrip', """
            This cantrip functions like the \\textit<arcane eye> subspell, except that it gains the \\glossterm<Sustain> (minor) tag in place of the \\glossterm<Attune> tag.",
            In addition, the sensor cannot be moved after it is originally created.
        """, tags=['Attune', 'Scrying']),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[
            Subspell("Alarm", 1, """
                A \\glossterm<scrying sensor> appears floating in the air in an unoccupied square within \\rngmed range.
                The sensor passively observes its surroundings.
                If it sees a creature or object of Tiny size or larger moving within 50 feet of it, it will trigger a mental "ping" that only you can notice.
                You must be within 1 mile of the sensor to receive this mental alarm.
                This mental sensation is strong enough to wake you from normal sleep, but does not otherwise disturb concentration.
            """),
            Subspell('Arcane Eye', 1, """
                A \\glossterm<scrying sensor> appears floating in the air in an unoccupied square within \\rngmed range.
                At the start of each round, you choose whether you see from this sensor or from your body.

                While viewing through the sensor, your visual acuity is the same as your normal body, except that it does not share the benefits of any \\glossterm<magical> effects that improve your vision.
                You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \\blinded.

                If undisturbed, the sensor floats in the air in its position.
                As a \\glossterm<minor action>, you can concentrate to move the sensor up to 30 feet in any direction, even vertically.
                At the end of each round, if the sensor is does not have \\glossterm<line of effect> from you, it is destroyed.
            """, tags=['Attune', 'Scrying']),
            Subspell('Greater Alarm', 3, """
                This subspell functions like the \\textit<alarm> subspell, except that the sensor gains 100 ft.\ \\glossterm<darkvision> and its Awareness bonus is equal to your \\glossterm<spellpower>.
            """),
            Subspell("Auditory Eye", 2, """
                This subspell functions like the \\spell<arcane eye> subspell, except that you can you can also hear through the sensor.
                At the start of each round, you can choose whether you hear from the sensor or from your body.
                This choice is made independently from your sight.
                The sensor's auditory acuity is the same as your own, except that it does not share the benefits of any \\glossterm<magical> effects that improve your hearing.
            """),
            Subspell("Accelerated Eye", 2, """
                This subspell functions like the \\spell<arcane eye> subspell, except that the sensor moves up to 100 feet when moved instead of up to 30 feet.
            """),
            Subspell("Autonomous Eye", 3, """
                This subspell functions like the \\spell<arcane eye> subspell, except that the sensor is not destroyed when it loses \\glossterm<line of effect> to you.
            """),
            Subspell("Penetrating Eye", 5, """
                This subspell functions like the \\spell<autonomous> subspell, except that you do not need \\glossterm<line of sight> or \\glossterm<line of effect> to target a location.
                You must specify a distance and direction to target a location you cannot see.
                This can allow you to cast the spell beyond walls and similar obstacles.
                As normal, if the intended location is occupied or otherwise impossible, the spell is \\glossterm<miscast>.
            """),
            # Need to make sure this can't be used for high-bandwidth bidirectional communication
            Subspell("Scry Creature", 5, """
                Make a Spellpower vs. Mental attack against a creature on the same plane as you.
                You do not need \\glossterm<line of sight> or \\glossterm<line of effect> to the target.
                However,  must specify your target with a precise mental image of its appearance.
                The image does not have to be perfect, but it must unambiguously identify the target.
                If you specify its appearance incorrectly, or if the target has changed its appearance, you may accidentally target a different creature, or the spell may simply be \\glossterm<miscast>.
                This attack roll cannot \\glossterm<explode>.
                \\hit A scrying sensor appears in the target's space.
                This sensor functions like the sensor created by the \\spell<arcane eye> subspell, except that you cannot move the sensor manually.
                Instead, it automatically tries to follow the target to stay in its space.
                At the end of each phase, if the sensor is not in the target's space, this effect is \\glossterm<dismissed>.
            """),
            Subspell("Twin Eye", 5, """
                This subspell functions like the \\spell<arcane eye> subspell, except that you constantly receive sensory input from both your body and the sensor.
                This allows you to see simultaneously from your body and from the sensor.
            """),
            Subspell("Reverse Scrying", 4, """
                Choose a magical sensor within \\rngmed range.
                A new scrying sensor appears at the location of the source of the the ability that created the target sensor.
                This sensor functions like the sensor created by the \\spell<arcane eye> subspell, except that the sensor cannot move and it is not destroyed if it does not have \\glossterm<line of effect> to you.
            """),
        ],
        category='narrative',
    ))

    spells.append(Spell(
        name="Revelation",
        short_description="Share visions of the present and future, granting insight or combat prowess",
        header=Header("You grant a creature the ability to see fractions of a second into the future."),
        effects=Effects('Cantrip', """
            Choose a willing creature within \\rngclose range.
            On the first \\glossterm<strike> the target makes during the next round, it rolls twice and takes the higher result.
        """),
        schools=['Divination'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[
            Subspell('True Strike', 1, """
                Choose a willing creature within \\rngclose range.
                On the first \\glossterm<strike> the target makes during the next round, it gains a +4 bonus to \\glossterm<accuracy> and rolls twice and takes the higher result.
            """),
            Subspell('Greater True Strike', 6, """
                This subspell functions like the \\textit<true strike> subspell, except that the bonus is increased to +8.
            """),
            Subspell('Precognitive Offense', 1, """
                Choose a willing creature within \\rngclose range.
                The target gains a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with all attacks.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (shared)']),
            Subspell('Greater Precognitive Offense', 5, """
                This subspell functions like the \\spell<precognitive offense> subspell, except that the bonus is increased to +2.
            """),
            Subspell('Precognitive Defense', 1, """
                Choose a willing creature within \\rngclose range.
                The target gains a +1 \\glossterm<magic bonus> to Armor defense and Reflex defense.
            """),
            Subspell('Greater Precognitive Defense', 5, """
                This subspell functions like the \\spell<precognitive defense> subspell, except that the bonus is increased to +2.
            """),
            Subspell("Discern Lies", 2, """
                Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                \\hit You know when the target deliberately and knowingly speaks a lie.
                This ability does not reveal the truth, uncover unintentional inaccuracies, or necessarily reveal evasions.
            """, tags=['Attune', 'Detection']),
            Subspell('Foresight', 2, """
                Choose a willing creature within \\rngclose range.
                The target gains a +4 \\glossterm<magic bonus> to \\glossterm<initiative> checks.
            """),
            Subspell('Greater Foresight', 7, """
                This subspell functions like the \\subspell<foresight> subspell, except that the bonus is increased to +8.
                In addition, the target is not \\glossterm<unaware> when attacked by surprise.
            """),
            Subspell("Boon of Mastery", 2, """
                Choose a willing creature within \\rngclose range.
                The target gains a +2 \\glossterm<magic bonus> to all skills.
            """),
            Subspell("Greater Boon of Mastery", 6, """
                This subspell functions like the \\spell<boon of mastery> spell, except that the bonus is increased to +4.
            """),
            Subspell("Boon of Many Eyes", 4, """
                Choose a willing creature within \\rngclose range.
                The target gains a +1 \\glossterm<magic bonus> to \\glossterm<overwhelm resistance>.
            """),
            Subspell("Boon of Knowledge", 3, """
                The target gains a +4 \\glossterm<magic bonus> to all Knowledge skills (see \\pcref<Knowledge>).
            """),
            Subspell("Augury", 3, """
                Choose a willing creature within \\rngclose range, and an action which that creature could take.
                You learn whether the stated action is likely to bring good or bad results for the target within the next hour.
                This subspell provides one of four results:
                \\begin<itemize>
                    \\item Weal (if the action will probably bring good results).
                    \\item Woe (for bad results).
                    \\item Weal and woe (for both).
                    \\item No response (for actions that don't have especially good or bad results).
                \\end<itemize>

                This subspell does not describe the future with certainty.
                It describes which result is most probable.
                The more unambiguous the action's effects, the more likely the spell is to be correct.

                After using this subspell, you cannot cast it again until the hour affected by the previous casting is over, regardless of whether the action was taken.
            """),
            Subspell("Third Eye", 3, """
                Choose a willing creature within \\rngclose range.
                The target gains \\glossterm<blindsight> with a 50 foot range.
                This can allow it to see perfectly without any light, regardless of concealment or invisibility.
            """),
        ],
        category='buff, offense',
    ))

    spells.append(Spell(
        name="Telekinesis",
        short_description="Manipulate creatures and objects at a distance",
        header=Header("You crush your foe's body with telekinetic force."),
        effects=Effects('Telekinesis', """
            Make a Spellpower vs. Mental attack against one creature or object within \\rngmed range.
            \\hit The target takes bludgeoning \\glossterm<standard damage> +1d.
        """, tags=['Telekinesis']),
        schools=['Evocation'],
        lists=['Arcane'],
        cantrip="The spell deals -2d damage.",
        subspells=[
            Subspell('Telekinetic Movement', 1, """
                Make a Spellpower vs. Mental attack against a Medium or smaller creature or object within \\rngmed range.
                \\hit You move the target up to thirty feet in any direction.
                    You can change direction partway through the movement.
                    Moving the target upwards costs twice the normal movement cost.
            """),
            Subspell('Greater Telekinetic Movement', 4, """
                This subspell functions like the \\textit<telekinetic movement> spell, except that you can move the target up to one hundred feet.
            """),
            Subspell('Move Ally', 2, """
                Choose a willing creature within \\rngmed range.
                You move the target up to one hundred feet in any direction.
                You can change direction partway through the movement.
                Moving the target upwards costs twice the normal movement cost.
            """),
            Subspell("Precise", 2, """
                Make a Spellpower vs. Mental attack against a Medium or smaller creature or object within \\rngclose range.
                \\hit You move the target up to five feet in any direction.
                In addition, you can make a check to manipulate the target as if you were using your hands.
                The check's result has a maximum equal to your attack result.
            """, tags=['Telekinesis']),
            Subspell("Binding", 3, """
                This subspell functions like the \\spell<telekinesis> spell, except that the struck creature is also \\immobilized as a \\glossterm<condition>.
            """),
            Subspell("Levitate", 3, """
                Choose a Medium or smaller willing creature or unattended object within \\rngclose range.
                The target floats in midair, unaffected by gravity.
                During the movement phase, you can move the target up to ten feet in any direction as a \\glossterm<free action>.
            """, tags=['Attune']),
            Subspell("Accelerated Levitate", 5, """
                This subspell functions like the \\spell<levitate> subspell, except that you can move the target up to thirty feet instead of up to ten feet.
            """),
        ],
        category='debuff, combat',
    ))

    spells.append(Spell(
        name="Glamer",
        short_description="Change how creatures and objects are perceived",
        header=Header(""),
        effects=Effects('Cantrip', """
            TODO
        """, tags=['Sensation', 'Visual']),
        schools=['Illusion'],
        lists=['Arcane'],
        cantrip="The spell requires a \\glossterm<standard action> to cast, and it gains the \\glossterm<Sustain> (minor) tag in place of the \\glossterm<Attune> tag.",
        subspells=[
            Subspell('Blur', 1, """
                Choose a willing creature within \\rngmed range.
                The target's physical outline is distorted so it appears blurred, shifting, and wavering.
                It gains a +1 \\glossterm<magic bonus> to Armor defense and Stealth (see \\pcref<Stealth>).
                This effect provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.

                You can cast this spell as a \\glossterm<minor action>.
            """, tags=['Attune (shared)', 'Sensation', 'Visual']),
            Subspell("Suppress Light", 2, """
                Choose a Small or smaller unattended object within \\rngclose range.
                This subspell suppresses light in a \\areamed radius emanation from the target.
                Light within or passing through the area is dimmed to be no brighter than shadowy illumination.
                Any effect or object which blocks light also blocks this spell's emanation.
            """, tags=['Attune', 'Light', 'Sensation']),
            Subspell("Disguise Image", 3, """
                Choose a willing creature within \\rngclose range.
                You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
                You gain a +5 bonus on the check, and you can freely alter the appearance of the target's clothes and equipment, regardless of their original form.
                However, this effect is unable to alter the sound, smell, texture, or temperature of the target or its clothes and equipment.
            """, tags=['Attune (shared)', 'Sensation', 'Visual']),
            Subspell("Mirror Image", 2, """
                Choose a willing creature within \\rngclose range.
                Four illusory duplicates appear around the target that mirror its every move.
                The duplicates shift chaotically in its space, making it difficult to identify the real creature.

                All \\glossterm<targeted> attacks against the target have a 50\\% miss chance.
                Whenever an attack misses in this way, it affects an image, destroying it.
                This ability provides no defensive benefit against creatures immune to \\glossterm<Visual> abilities.
            """, tags=['Attune (shared)', 'Sensation', 'Visual']),
            Subspell("Greater Mirror Image", 5, """
                This subspell functions like the \\textit<mirror image> subspell, except that destroyed images can reappear.
                At the end of each \\glossterm<action phase>, one destroyed image reappears, to a maximum of four images.
            """),
            Subspell("Shadow Mantle", 4, """
                This subspell functions like the \\spell<blur> subspell, except that the spell's deceptive nature extends beyond altering light to affect the nature of reality itself.
                The defense bonus it provides applies to all defenses.
                In addition, the spell loses the \\glossterm<Visual> tag, and can protect against attacks from creatures immune to Visual abilities.
            """),
            Subspell("Displacement", 7, """
                This subspell functions like the \\spell<blur> subspell, except that the target's image is futher distorted, and appears to be two to three feet from its real location.
                \\glossterm<Targeted> \\glossterm<physical attacks> against the target suffer a 50\\% miss chance.
            """),
        ],
        category='buff, defense',
    ))

    spells.append(Spell(
        name="Photomancy",
        short_description="Create bright light to blind foes and illuminate your surroundings",
        # header=Header("description"),
        effects=Effects('Cantrip', """
            Make a Spellpower vs. Reflex attack against one creature, object, or location within \\rngmed range.
            Bright light illuminates a 100 foot radius around the target until the end of the round.
            \\hit The target is \\dazzled as a \\glossterm<condition>.
            \\crit The target is \\blinded as a \\glossterm<condition>.
        """, tags=['Light', 'Sensation', 'Visual']),
        schools=['Illusion'],
        lists=['Arcane', 'Divine', 'Nature'],
        subspells=[
            Subspell('Flare', 1, """
                A burst of light light fills a \\areasmall radius within \\rngmed range of you.
                Bright light illuminates a 100 foot radius around the area until the end of the round.
                Make a Spellpower vs. Reflex attack against all creatures in the source area.
                \\hit Each target is \\dazzled as a \\glossterm<condition>.
                \\crit Each target is \\blinded as a \\glossterm<condition>.
            """, tags=['Light', 'Sensation', 'Visual']),
            Subspell("Kaleidoscopic", 3, """
                This subspell creates a brilliant, rapidly shifting rainbow of lights in a \\areasmall radius within \\rngmed range of you.
                They illuminate a 100 foot radius around the area with bright light until the end of the round.
                Make a Spellpower vs. Mental attack against all creatures in the source area.
                \\hit Each target is \\disoriented as a \\glossterm<condition>.
                \\crit Each target is \\confused as a \\glossterm<condition>.
            """, tags=['Light', 'Mind', 'Sensation', 'Visual']),
            Subspell("Faerie Fire", 3, """
                This subspell functions like the \\spell<flare> subspell, except that each struck target is surrounded with a pale glow made of hundreds of ephemeral points of light.
                This causes the struck target to radiate bright light in a 5 foot radius, as a candle.
                The lights impose a -10 penalty to Stealth checks.
                In addition, they reveal the outline of the creatures if they become \\glossterm<invisible>.
                This allows observers to see their location, though not to see them perfectly.
            """),
            Subspell("Illuminating", 2, """
                This subspell functions like the \\spell<flare> subspell, except that it gains the \\glossterm<Sustain> (minor) tag.
                The area affected by the spell becomes an illuminated \\glossterm<zone>.
                At the end of each \\glossterm<action phase> in subsequent rounds, the attack is repeated in that area.
            """),
            Subspell("Flashbang", 4, """
                This subspell functions like the \\spell<flare> subspell, except that an intense sound accompanies the flash of light caused by the spell.
                Each struck target is also \\glossterm<deafened> as an additional \\glossterm<condition>.
                This subspell gains the \\glossterm<auditory> tag in addition to the tags from the \\spell<flare> subspell.
            """),
            Subspell('Blinding', 5, """
                This subspell functions like the \\spell<flare> subspell, except that each struck target is \\glossterm<blinded> instead of \\glossterm<dazzled>.
            """),
            Subspell('Pillars of Light', 4, """
                This subspell functions like the \\spell<flare> subspell, except that it affects up to five different \\areasmall radius, 50 ft. tall cylinders within range.
                The areas can overlap, but targets in the overlapping area are only affected once.
            """),
            Subspell('Solar', 6, """
                This subspell functions like the \\spell<flare> subspell, except that you gain a +2 bonus to accuracy with the attack.
                In addition, the light is treated as being natural sunlight for the purpose of abilities.
                This can allow it to destroy vampires and have similar effects.
            """),
        ],
        category='debuff, combat',
    ))

    spells.append(Spell(
        name="Polymorph",
        short_description="Change the physical forms of objects and creatures",
        header=Header("You transform a foe's body into a more broken state."),
        effects=Effects('Polymorph', """
            Make a Spellpower vs. Fortitude attack against a creature within \\rngmed range.
            \\hit The target takes physical \\glossterm<standard damage> -1d.
        """, tags=['Shaping']),
        schools=['Transmutation'],
        lists=['Arcane', 'Nature'],
        subspells=[
            Subspell('Baleful Polymorph', 1, """
                Make a Spellpower vs. Fortitude attack against a creature within \\rngmed range.
                \\hit The target takes physical \\glossterm<standard damage> +1d.
            """, tags=['Shaping']),
            Subspell("Mending", 1, """
                % TODO: unattended or attended by a willing creature
                Choose an unattended object within \\rngclose range.
                The target is healed for hit points equal to \\glossterm<standard damage> +1d.
            """),
            Subspell("Shrink", 1, """
                Choose a willing creature within \\rngclose range.
                The target's size decreases by one size category, to a minimum of Tiny.
                This decreases its \\glossterm<strike damage> and usually decreases its \\glossterm<reach> (see \\pcref<Size in Combat>).

                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Attune (shared)', 'Shaping', 'Sizing']),
            Subspell('Greater Shrink', 6, """
                This subspell functions like the \\spell<shrink> subspell, except that the target's size decreases by two size categories, to a minimum of Diminuitive.
            """),
            Subspell("Barkskin", 2, """
                Choose a willing creature within \\rngclose range.
                The target gains \\glossterm{damage reduction} equal to your spellpower against damage dealt by \\glossterm<physical attacks>.
                In addition, it is \\glossterm<vulnerable> to fire damage.

                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Attune (shared)']),
            Subspell('Regeneration', 4, """
                Choose a willing creature within \\rngclose range.
                A the end of each round, the target heals hit points equal to your \\glossterm<spellpower>.
            """, tags=['Attune (shared)']),
            Subspell('Greater Regeneration', 8, """
                This subspell functions like the \\textit<regeneration> subspell, except that the healing is equal to twice your \\glossterm<spellpower>.
            """),
            Subspell("Stoneskin", 3, """
                This subspell functions like the \\textit<barkskin> subspell, except that the target becomes \\glossterm<vulnerable> to damage from adamantine weapons instead of fire damage.
            """),
            Subspell("Ironskin", 7, """
                This subspell functions like the \\textit<stoneskin> subspell, except that the damage reduction is equal to twice your spellpower.
            """),
            Subspell("Enlarge", 3, """
                Choose a Large or smaller willing creature within \\rngclose range.
                The target's size increases by one size category.
                This increases its \\glossterm<strike damage> and usually increases its \\glossterm<reach> (see \\pcref<Size in Combat>).
                However, the target takes a -1d penalty to \\glossterm<strike damage>, as its muscles are not increased fully to match its new size.

                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Attune (shared)', 'Shaping', 'Sizing']),
            Subspell("Enlarge, Greater", 6, """
                This subspell functions like the \\textit<enlarge> subspell, except that the penalty to \\glossterm<strike damage> is removed.
            """),
            Subspell("Enlarge, Supreme", 9, """
                This subspell functions like the \\spell<enlarge> subspell, except that the target's size is increased by two size categories.
            """),
            Subspell("Alter Appearance", 3, """
                Choose a Large or smaller willing creature within \\rngclose range.
                You make a Disguise check to alter the target's appearance (see \\pcref<Disguise Creature>).
                You gain a +5 bonus on the check, and you ignore penalties for changing the target's gender, race, subtype, or age.
                However, this effect is unable to alter the target's clothes or equipment in any way.

                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Attune (shared)', 'Shaping']),
            Subspell("Craft Object", 4, """
                Choose any number of unattended, nonmagical objects within \\rngclose range.
                You make a Craft check to transform the targets into a new item (or items) made of the same materials.
                You require none of the tools or time expenditure that would normally be necessary.
                The total size of all targets combined must be Large size or smaller.
            """, tags=['Shaping']),
            Subspell("Disintegrate", 6, """
                Make a Spellpower vs. Fortitude attack against a creature within \\rngmed range.
                \\hit Physical \\glossterm<standard damage> +1d.
                In addition, if the target has no hit points remaining, it dies.
                Its body is completely disintegrated, leaving behind only a pinch of fine dust.
                Its equipment is unaffected.
            """, tags=['Shaping']),
        ],
        category='damage',
    ))

    spells.append(Spell(
        name="Astromancy",
        short_description="Transport creatures through the Astral Plane",
        header=Header("You disrupt a creature's body by partially thrusting it into another plane."),
        effects=Effects('Cantrip', """
            Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
            \\hit The target takes physical \\glossterm<standard damage> -1d.
        """, tags=['Planar', 'Teleportation']),
        schools=['Conjuration'],
        lists=['Arcane'],
        cantrip="The spell deals -2d damage.",
        subspells=[
            Subspell('Dimensional Jaunt', 1, """
                Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                \\hit The target takes physical \\glossterm<standard damage> +1d.
                \\crit As above, but double damage.
                In addition, if the creature is an \\glossterm<outsider> native to another plane, it is sent back to its home plane.
            """, tags=['Planar', 'Teleportation']),
            Subspell("Teleport", 1, """
                Choose a Medium or smaller willing creature within \\rngclose range.
                The target teleports into an unoccupied destination within range.
                If the destination is invalid, this subspell is \\glossterm<miscast>.
            """, tags=['Teleportation']),
            Subspell("Dimension Door", 4, """
                You teleport to a location within \\rngext range of you.
                You must clearly visualize the destination's appearance, but you do not need \\glossterm<line of sight> or \\glossterm<line of effect> to your destination.
            """, tags=['Teleportation']),
            Subspell("Dimensional Jaunt -- Plane of Fire", 2, """
                This subspell functions like the \\spell<dimensional jaunt> subspell, except that the target is partially teleported into the Plane of Fire.
                The damage becomes fire damage, and a struck target is \\glossterm<ignited> until it puts out the fire.
            """),
            Subspell("Dimensional Jaunt -- Plane of Earth", 4, """
                This subspell functions like the \\spell<dimensional jaunt> subspell, except that the target is partially teleported into the Plane of Earth.
                The damage becomes bludgeoning damage, and a struck target is \\glossterm<immobilized> as a \\glossterm<condition>.
            """),
            Subspell("Dimensional Jaunt -- Deep Astral Plane", 6, """
                This subspell functions like the \\spell<dimensional jaunt> subspell, except that the target is partially teleported into the deep Astral Plane.
                A struck target is \\glossterm<stunned> as a \\glossterm<condition>.
            """),
            Subspell('Dimensional Jaunt -- Myriad', 9, """
                This subspell functions like the \\spell<dimensional jaunt> subspell, except that the target is partially teleported through a dizzying array of planes.
                The damage increases by +3d and becomes damage of all types.
            """),
            Subspell('Dimensional Shuffle', 2, """
                Choose up to five willing creatures within \\rngmed range.
                Each target teleports into the location of a different target.
                This subspell does not have the \\glossterm<Delayed> tag (see \pcref<Delayed Abilities>).
            """, tags=['Teleportation']),
            Subspell('Blink', 5, """
                Choose a willing creature within \\rngclose range.
                The target randomly blinks between its current plane and the Astral Plane.
                This blinking stops if the target takes actions on its current plane.
                In any phase where it does not take any actions, the target has a 50\% chance to completely ignore any effect that targets it directly.
                It is still affected normally by abilities that affect an area.
            """, tags=['Attune (shared)', 'Teleportation', 'Planar']),
            Subspell('Greater Blink', 9, """
                This subspell functions like the \\subspell<blink> subspell, except that the target also has a 20\% chance to completely ignore any effect that targets it directly during phases where it takes an action.
            """),
        ],
        category='damage',
    ))

    spells.append(Spell(
        name="Chronomancy",
        short_description="Manipulate the passage of time to inhibit foes and aid allies",
        header=Header("You slow a foe's passage through time, inhibiting its actions."),
        effects=Effects('Cantrip', """
            Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
            \\hit The target is \\glossterm<slowed> as a \\glossterm<condition>.
            \\crit the target is \\glossterm<immobilized> a \\glossterm<condition>.
        """, tags=['Temporal']),
        schools=['Transmutation'],
        lists=['Arcane'],
        subspells=[
            Subspell('Slow', 1, """
                Make a Spellpower vs. Mental attack against a creature within \\rngmed range.
                \\hit The target is \\glossterm<slowed> and \\glossterm<dazed> as a single \\glossterm<condition>.
                \\crit the target is \\glossterm<immobilized> and \\glossterm<dazed> as a single \\glossterm<condition>.
            """, tags=['Temporal']),
            Subspell('Accelerated Movement', 1, """
                Choose a willing creature within \\rngmed range.
                The target gains a +10 foot \\glossterm<magic bonus> to its speed in all its movement modes.
                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Attune (shared)', 'Temporal']),
            Subspell("Haste", 3, """
                Choose a willing creature within \\rngmed range.
                The target gains a +30 foot \\glossterm<magic bonus> to its speed in all its movement modes, up to a maximum of double its \\glossterm<base speed>.
                In addition, it gains a +2 \\glossterm<magic bonus> to Reflex defense.

                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Attune (shared)', 'Temporal']),
            Subspell("Temporal Duplicate", 5, """
                Choose a willing creature within \\rngmed range.
                You reach into a possible future and create a duplicate of the target.
                The duplicate is identical in all ways to the target when the spell resolves, except that it has no \\glossterm<legend points>.
                The target and its duplicate can act during the next round.
                At the end of that round, the target and its duplicate cease to exist.
                At the end of the following round, the target reappears in the place where it ceased to exist.
                If that space is occupied, it appears in the closest unoccupied space.

                When the target reappears, its condition is unchanged from when it left, except that it loses all action points, spell points, and all similar resources equal to the amount used by its duplicate.
                Its hit points, conditions, and all other statistics are unaffected, regardless of any damage or other negative effects suffered by the duplicate.
                If this would reduce any of the target's resources below 0, it takes physical \\glossterm<standard damage> +3d from the paradox and becomes \\glossterm<stunned> as a \\glossterm<condition>.
            """, tags=['Temporal']),
            Subspell("Time Hop", 2, """
                Choose a Medium or smalller willing creature or unattended object within \\rngmed range.
                You send the target into the future, causing it to temporarily cease to exist.
                When you cast this subspell, you choose how many rounds the target ceases to exist for, up to a maximum of five rounds.
                At the end of the last round, it reappears in the same location where it disappeared.

                The area the target occupied can be physically crossed, but it is treated as an invalid destination for teleportation and other similar magic.
                When the target reappears, all of its surroundings are adjusted as if the object had retroactively always existed in its space.
                For example, if the location is occupied by a creature that walked into the area, the creature is relocated to the closest unoccupied space along the path it took to reach the target.

                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Temporal']),
            Subspell("Temporal Stasis", 3, """
                Choose a Medium or smaller willing creature within \\rngmed range.
                The target is placed into stasis, rendering it unconscious.
                While in stasis, it cannot take any actions and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.

                % TODO: wording
                This effect normally lasts as long as you \\glossterm<attune> to it, and until the end of the round when you release the attunement.
                If you use this ability on yourself, it instead lasts for a number of rounds you choose when you cast the spell, up to a maximum of five rounds.

                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Attune', 'Temporal']),
            Subspell("Delay Damage", 4, """
                Whenever you take damage, half of the damage (rounded down) is not dealt to you immediately.
                This damage is tracked separately.
                When the ends, you take all of the delayed damage at once.
                This damage has no type, and ignores all effects that reduce or negate damage.
                Damage dealt in this way in excess of your hit points is dealt as \\glossterm<vital damage>.

                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Sustain (minor)', 'Temporal']),
            Subspell("Time Lock", 6, """
                Choose a willing creature within \\rngmed range.
                You lock the state of the target's body in time.
                Note the target's hit points, vital damage, and active conditions.
                If the target dies, this effect ends immediately.

                As a \\glossterm<standard action>, you can reach through time to restore the target's state.
                If you do, the target's hit points, vital damage, and active conditions become identical to what they were when you cast this subspell.
                This does not affect any other properties of the target, such as any resources expended.
                After you restore the target's state in this way, the spell ends.

                You can cast this subspell as a \\glossterm<minor action>.
            """, tags=['Sustain (minor)', 'Temporal']),
            Subspell("Greater Time Lock", 9, """
                This subspell functions like the \\textit<time lock> subspell, except that the effect is not ended if the target dies, and restoring the target's state can also restore it to life.
                If the target is restored to life in this way, all of its properties not locked by this subspell, such as any resources expended, are identical to what they were when the target died.
            """),
            Subspell("Time Stop", 9, """
                You can take two full rounds of actions immediately.
                During this time, all other creatures and objects are fixed in time, and cannot be targeted, moved, damaged, or otherwise affected by outside forces in any way.
                You can still affect yourself and create areas or new effects.

                You are still vulnerable to danger, such as from heat or dangerous gases.
                However, you cannot be detected by any means while you travel.
            """, tags=['Temporal']),
        ],
        category='debuff, combat',
    ))

    # Weaponcraft can create and manipulate weapons of all varieties; all of it
    # subspells should involve a mixture of creating a weapon and manipulating
    # it after it is created.
    spells.append(Spell(
        name="Weaponcraft",
        short_description="Create and manipulate weapons to attack foes",
        header=Header("You create a dancing blade that attacks nearby foes"),
        effects=Effects('Cantrip', """
            Make a Spellpower vs. Armor attack against one creature or object within \\rngmed range.
            \\hit The target takes piercing \\glossterm<standard damage> -1d.
        """, tags=['Manifestation', 'Sustain (minor)']),
        schools=['Conjuration', 'Transmutation'],
        lists=['Arcane', 'Divine'],
        cantrip="The spell gains the \\glossterm<Sustain> (standard) tag in place of the \\glossterm<Sustain> (minor) tag.",
        subspells=[
            Subspell('Mystic Bow', 1, """
                Make a Spellpower vs. Armor attack against one creature or object within \\rngmed range.
                \\hit The target takes piercing \\glossterm<standard damage> +1d.
            """, tags=['Manifestation']),
            Subspell("Blade Barrier", 1, """
                A wall of whirling blades appears within \\rngmed range.
                The wall either takes the form of a 20 ft.\\ high, \\arealarge line.
                The wall provides \\glossterm<active cover> (20\\% miss chance) against attacks made through it.
                Attacks that miss in this way harmlessly strike the wall.
                Whenever a creature or object passes through the wall, make a Spellpower vs. Reflex attack against it.
                \\hit The target takes slashing \\glossterm<standard damage> -1d.
            """, tags=['Sustain (minor)']),
            Subspell('Summon Weapon', 1, """
                A melee weapon that you are proficient with appears in an unoccupied square within \\rngmed range.
                The weapon floats about three feet off the ground, and is sized appropriately for a creature of your size.
                The specific weapon you choose affects the type of damage it deals.
                Regardless of the weapon chosen, it has hit points equal to twice your spellpower.
                All of its defenses are equal to 5 \\add your spellpower, and it has a 30 foot fly speed with good maneuverability, though it cannot travel farther than five feet above the ground.

                Each round, the weapon automatically moves towards the creature closest to it during the \\glossterm<movement phase>.
                During the \\glossterm<action phase>, it makes a melee \\glossterm<strike> against a random creature adjacent to it.
                Its accuracy is equal to your spellpower.
                If it hits, it deals \\glossterm<standard damage> -1d.
            """, tags=['Manifestation', 'Sustain (minor)']),
            Subspell('Blade Perimeter', 3, """
                This subspell functions like the \\spell<blade barrier> subspell, except that the wall is an 20 ft.\\ high, \\areamed radius circle.
            """),
            Subspell("Contracting Blade Perimeter", 5, """
                This subspell functions like the \\spell<blade perimeter> subspell, except that the wall's radius shrinks by 5 feet at the end of every \\glossterm<action phase>, dealing damage to everything it moves through.
                % Clarify interaction with solid obstacles that block contraction?
            """),
            Subspell("Aerial", 2, """
                This subspell functions like the \\spell<weaponcraft> spell, except that the weapon's height above the ground is not limited.
                This allows the weapon to fly up to fight airborne foes.
            """),
            Subspell("Blade Barrier, Dual", 4, """
                This subspell functions like the \\spell<blade barrier> subspell, except that the area must be a line.
                In addition, the spell creates two parallel walls of the same length, five feet apart.
            """),
            Subspell("Create Ballista", 3, """
                This subspell functions like the \\spell<weaponcraft> spell, except that it creates a fully functional Large ballista instead of a weapon of your choice.
                The ballista functions like any other weapon, with the following exceptions.

                It cannot move, and makes ranged \\glossterm<strikes> instead of melee strikes.
                Its attacks deal piercing damage, and its hit points are equal to three times your spellpower.
                In addition, the ballista attacks the creature farthest from it, instead of the creature closest to it.
            """),
            Subspell("Create Ballista, Dual Track", 6, """
                This subspell functions like the \\spell<create ballista> subspell, except that the ballista is created with two separate bolt tracks.
                This allows it to fire at two different targets in the same round whenever you command it to fire.
                It cannot fire at the same target twice.
                Each round, it attacks the two creatures farthest from it.
            """),
            Subspell('Giant Blade', 4, """
                This subspell functions like the \\spell<weaponcraft> spell, except that the weapon takes the form of a Large greatsword.
                The weapon's attacks hit everything in a \\areasmall cone from it.
                It aims the cone to hit as many creatures as possible.
            """),
            Subspell('Titan Blade', 8, """
                This subspell functions like the \\spell<weaponcraft> spell, except that the weapon takes the form of a Gargantuan greatsword.
                The weapon's attacks hit everything in a \\areamed cone from it.
                It aims the cone to hit as many creatures as possible.
            """),
            Subspell('Paired', 9, """
                This subspell functions like the \\spell<weaponcraft> spell, except that you summon two weapons instead of one.
                Each weapon attacks independently.
            """),
        ],
        category='buff, offense',
    ))

    return sorted(spells, key=lambda spell: spell.name)


def sanity_check(spells):
    # Make sure that the right kinds of spells exist

    # Every spell source should have one spell of each category
    for category in rise_data.categories:
        has_spell = {source: False for source in rise_data.spell_sources}
        for spell in spells:
            if spell.category == category:
                for source in spell.lists:
                    if source in has_spell:
                        has_spell[source] = True
        for source in rise_data.spell_sources:
            if not has_spell[source]:
                warn(f"Source {source} has no spell for {category}")

    # Every spell source should have both single target and multi damage spells
    # that target every defense
    for defense in rise_data.defenses:
        has_damage = {source: False for source in rise_data.spell_sources}
        # Every source should also have debuffs against every defense
        has_debuff = {source: False for source in rise_data.spell_sources}
        for spell in spells:
            if spell.effects.attack and spell.effects.attack.defense == defense:
                if spell.category == 'damage':
                    for source in spell.lists:
                        if source in rise_data.spell_sources:
                            has_damage[source] = True
                elif spell.category[:6] == 'debuff':
                    for source in spell.lists:
                        if source in rise_data.spell_sources:
                            has_debuff[source] = True

        for source in rise_data.spell_sources:
            if not has_damage[source]:
                warn(f"Source {source} has no damage spell against {defense}")
            if not has_debuff[source]:
                warn(f"Source {source} has no debuff spell against {defense}")

    # Every spell school should have at least two unique categories of
    # spells
    categories_in_school = {school: {} for school in rise_data.schools}
    for spell in spells:
        for school in spell.schools:
            categories_in_school[school][spell.category] = True
    for school in rise_data.schools:
        if len(categories_in_school[school]) < 2:
            warn(f"School {school} has only {len(categories_in_school[school])} spell categories")


@click.command()
@click.option('-c', '--check/--no-check', default=False)
@click.option('-o', '--output/--no-output', default=False)
def main(output, check):
    spells = generate_spells()
    if check:
        sanity_check(spells)
    spell_texts = []
    for spell in spells:
        try:
            spell_texts.append(spell.to_latex())
        except Exception as e:
            raise Exception(f"Error converting spell '{spell.name}' to LaTeX") from e
    spell_text = latexify('\n\\newpage'.join(spell_texts))
    if output is None:
        print(spell_text)
    else:
        with open('../../core_book/spell_descriptions.tex', 'w') as spell_descriptions_file:
            spell_descriptions_file.write(spell_text)


if __name__ == "__main__":
    main()
