from rise.latex.mystic_sphere import MysticSphere
from rise.latex.spell import Spell
from rise.latex.effects import Effects


# Primary: utility
# Secondary: debuff
# Tertiary: buff
# None: damage
thaumaturgy=MysticSphere(
    name='Thaumaturgy',
    short_description="Suppress and manipulate magical effects",
    cantrips=[
        Effects('Sense Magic', 'Yourself', """
            You gain a +4 bonus to the Spellsense skill until the end of the next round.

            \\rankline
            \\rank<3> The bonus increases to +6.
            \\rank<5> The bonus increases to +8.
            \\rank<7> The bonus increases to +10.
        """, tags=[]),
    ],
    lists=['Arcane'],
    spells=[
        Spell('Magic Missile', 1, 'One creature within \\rngmed range', """
            You send an unerring projectile made of pure magical energy towards the target.
            The target takes energy \\glossterm<standard damage> -2d.
            If this damage does not make the target \\glossterm<bleed>, it has no effect, and the target does not lose any \\glossterm<hit points>.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> -1d.
            \\rank<5> The damage increases to \\glossterm<standard damage>.
            \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=[]),
        Spell('Magic Missile Storm', 5, '\\glossterm<Enemies> in a \\areasmall radius within \\rngmed range', """
            You send an unerring projectile made of pure magical energy towards each target.
            Each target takes energy \\glossterm<standard damage> -2d.
            If this damage does not make a target \\glossterm<bleed>, it has no effect, and that target does not lose any \\glossterm<hit points>.

            \\rankline
            \\rank<7> The area increases to a \\areamed radius.
        """, tags=[]),
        Spell('Alter Magic Aura', 1, 'One Large or smaller magical object in \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit One of the target's magic auras is altered (see \\pcref<Spellsense>).
            You can change the \\glossterm<ability tags> the aura has.
            In addition, you can decrease the \\glossterm<power> of the aura by up to half your power, or increase the power of the aura up to a maximum of your power.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Attune (self)']),
        Spell('Suppress Item', 1, 'One Large or smaller magical object in \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit All magical properties the target has are \\glossterm<suppressed>.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Sustain (minor)']),
        Spell('Dismissal', 3, 'One creature or object within \\rngmed range', """
            Make an attack against the target.
            If the target is an effect of an ongoing \\glossterm<magical> ability, such as a summoned monster or created object, the \\glossterm<difficulty rating> is equal to the \\glossterm<power> of the ability.
            Otherwise, this spell has no effect.
            \\hit The target is treated as if the ability that created it was \\glossterm<dismissed>.
            This usually causes the target to disappear.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Deattunement', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit The target stops being \\glossterm<attuned> to one effect of its choice that it is currently attuned to.
            \\crit The target stops being \\glossterm<attuned> to two abilities of its choice that it is currently attuned to.
            In addition, as a \\glossterm<condition>, it becomes unable to \\glossterm<attune> to any additional abilities.

            \\rankline
            \\rank<5> The accuracy bonus increases to +3.
            \\rank<7> The accuracy bonus increases to +4.
        """, tags=[]),
        Spell('Reattunement', 3, 'Yourself or one \\glossterm<ally> within \\rngmed range', """
            The target can reattune to one ability that it stopped being attuned to since the start of the last round without spending an additional \\glossterm<attunement point>.
            Any choices and effects of the attuned ability are restored to their exact state before the attunement was broken.

            \\rankline
            \\rank<5> You can target an additional ally within range.
            \\rank<7> You can target an additional ally within range.
        """, tags=[]),
        Spell('Suppress Magic', 2, 'One magical effect within \\rngmed range (see text)', """
            The target must be the source or result of an active \\glossterm<magical> effect.
            This includes magical \\glossterm<conditions>, \\glossterm<sustained> effects, and \\glossterm<attuned> effects.
            It does not include \\glossterm<Curse> effects, which are more difficult to remove.
            This spell cannot be used to interrupt or negate immediate effects.
            Identifying non-visual magical effects to target with this spell may require the use of the Spellsense skill (see \\pcref<Spellsense>).

            Make an attack against the target.
            Its defense against this attack is equal to its \\glossterm<power>.
            \\hit The effect is \\glossterm<suppressed> as long as you \\glossterm<sustain> this ability.

            \\rankline
            \\rank<4> You gain a +2 bonus to \\glossterm<accuracy> with the attack.
            \\rank<6> The accuracy bonus increases to +4.
            \\rank<8> The accuracy bonus increases to +6.
        """, tags=['Sustain (minor)']),
        Spell('Dispel Magic', 4, 'One magical effect within \\rngmed range (see text)', """
            The target must be the source or result of an active \\glossterm<magical> effect with a duration.
            This includes magical \\glossterm<conditions>, \\glossterm<sustained> effects, and \\glossterm<attuned> effects.
            It does not include \\glossterm<Curse> effects, which are more difficult to remove.
            This spell cannot be used to interrupt or negate immediate effects.
            Identifying non-visual magical effects to target with this spell may require the use of the Spellsense skill (see \\pcref<Spellsense>).

            Make an attack against the target.
            Its defense against this attack is equal to its \\glossterm<power>.
            \\hit The effect is \\glossterm<dismissed>.
            If it required attunement, that attunement is broken.

            \\rankline
            \\rank<6> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Malign Transferance', 3, ['Yourself or an \\glossterm<ally> within \\rngmed range', 'One other creature within that range'], """
            The primary target must be currently affected by a \\glossterm<magical> \\glossterm<condition>.
            Make an attack vs. Mental against the secondary target.
            \\hit One magical condition of your choice is removed from the primary target and applied to the secondary target.
            \\crit As above, except that you can transfer any number of magical conditions in this way.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Malign Confluence', 6, ['Yourself and each \\glossterm<ally> within \\rngmed range', 'One other creature within that range'], """
            Make an attack vs. Mental against the secondary target.
            \\hit One magical condition of your choice is removed from each primary target and applied to the secondary target.
            \\crit As above, except that you can transfer any number of magical conditions from each primary target in this way.

            \\rankline
            \\rank<8> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
        """, tags=[]),
        Spell('Spell Absoption', 7, 'Yourself', """
            Whenever you are targeted by a spell cast by another creature, before determining if it hits you, you absorb the spell.
            It has no effect on you.
            You cannot voluntarily allow spells to affect you while this effect lasts.
            After you absorb three spells in this way, this effect ends.
        """, tags=['Attune (self)']),
        Spell('Enhance Magic', 3, 'Yourself', """
            The target gains a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<magical> abilities.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<5> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<7> The bonus increases to +4.
        """, tags=['Attune (target)']),
        # Is this worth the complexity it adds to the system?
        Spell('Antimagic Field', 8, 'Special', """
            All other magical abilities and objects are \\glossterm<suppressed> within a \\areamed radius \\glossterm<emanation> from you.
            % How much of this is redundant with suppression?
            Creatures within the area cannot activate, sustain, or dismiss magical abilities.
            % TODO: wording
            This does not affect aspects of creatures that cannot be suppressed, such as the knowledge of abilities.
            You cannot exclude yourself from this \\glossterm<emanation>.
            However, this spell does not prevent you from sustaining or dismissing this spell.
        """, tags=['Sustain (minor)']),
        Spell('Dimensional Anchor', 3, 'One creature or object within \\rngmed range', """
            Make an attack vs. Mental with a +2 bonus to \\glossterm<accuracy> against the target.
            \\hit The target is unable to travel extradimensionally.
            This prevents all \\glossterm<Manifestation> effects and effects that teleport the target or move it between planes.

            \\rankline
            \\rank<5> The accuracy bonus increases to +1.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Sustain (minor)']),
        Spell('Dimensional Lock', 6, None, """
            This spell creates a dimensional lock in a \\arealarge radius \\glossterm<zone> from your location.
            Extraplanar travel into or out of the area is impossible.
            This prevents all \\glossterm<Manifestation> effects and effects teleport targets or move them between planes.

            \\rankline
            \\rank<8> The area increases to a \\areahuge radius \\glossterm<zone>.
        """, tags=['Attune (self)']),
        Spell('Teleportation Ward', 4, 'Everything in a \\arealarge radius \\glossterm<emanation> from you (see text)', """
            Teleportation into and out of the area is impossible.
            Any abilities which would cause creatures to teleport within the area have no effect.

            \\rankline
            \\rank<6> The area increases to a \\areahuge radius \\glossterm<emanation>.
            \\rank<8> The area increases to a \\areaext radius \\glossterm<emanation>.
        """, tags=['Attune (self)']),
        Spell('Disrupt Casting', 4, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit As a \\glossterm<condition>, the target has a 50\\% chance to \\glossterm<miscast> any spell it casts.
            \\crit As a \\glossterm<condition>, the target automatically \\glossterm<miscasts> any spell it casts.

            \\rankline
            \\rank<6> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Absorb Magic', 6, 'Yourself', """
            You gain a +2 bonus to defenses against \\glossterm<magical> effects.
            In addition, the next time a \\glossterm<magical> attack beats your defenses, it has no effect on you.
            When you negate an attack in this way, you regain one \\glossterm<hit point> and this spell's effect ends.

            \\rankline
            \\rank<8> The effect can negate two magical attacks before ending instead of only one.
        """, tags=['Attune (self)']),
        Spell('Second Mind', 4, 'Yourself', """
            Choose a \\glossterm<magical> ability you are currently sustaining that requires either a \\glossterm<free action> or a \\glossterm<minor action> to sustain.
            That ability is automatically sustained as long as this effect lasts.
            This can allow you to sustain that ability for longer than 5 minutes.
            This does not allow you to make any choices as part of sustaining the chosen ability, such as telling summoned creatures how to act.
            Instead, you always make the same choice you made the last time you manually sustained the effect.

            \\rankline
            \\rank<6> Whenever you sustain an ability with this effect, you can also make any relevant choices as part of sustaining the ability.
            \\rank<8> You can sustain a second ability with this effect.
        """, tags=['Attune (self)']),
        Spell('Spellseal', 2, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            You gain a +2 bonus to \\glossterm<accuracy> if the target is casting a spell in the current phase.
            \\hit As a \\glossterm<condition>, the next time the target tries to cast a spell, it \\glossterm<miscasts> that spell instead.
            When the target miscasts a spell in this way, this effect ends.

            \\rankline
            \\rank<4> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<6> The accuracy bonus increases to +2.
            \\rank<8> The accuracy bonus increases to +3.
        """, tags=[]),
        Spell('Delay Teleportation', 4, 'See text', """
            Whenever a creature or object would teleport into the area in a \\arealarge radius \\glossterm<emanation> from you, that teleportation is delayed by a round.
            The teleporting creature or object remains stuck in the Astral Plane and can take no actions during that time.
            Creatures delayed in this way do not experience a delay, though they may be able to deduce that they were delayed based on observable evidence.

            Whenever something is delayed in this way, you learn its approximate size and location within the area, allowing you to know which space or spaces it will occupy when it arrives.
            Creatures and objects delayed by this effect remain delayed even if you move such that their destination is no longer within the area of this effect.
            This does not affect teleportation away from the area unless that teleportation's destination lies within the area.

            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<6> The area increases to a \\areahuge radius emanation.
            \\rank<8> The delay increases to two rounds.
        """, tags=['Attune (self)']),
        Spell('Spellward', 4, 'Creatures in a \\areasmall radius \\glossterm<zone> within \\rngmed range', """
            You seal off an area's connection to magic.
            Whenever a creature casts a spell in the area, it has a 50\\% chance to \\glossterm<miscast> the spell.

            \\rankline
            \\rank<6> The area increases to a \\areamed radius.
            \\rank<8> The range increases to \\rnglong.
        """, tags=['Sustain (minor)']),
        Spell('Cryptic Spells', 2, 'Yourself', """
            Whenever the target casts a spell, they may choose a different spell they know.
            If they do, the visual effects and magical aura of the spell they are casting change to match their chosen spell.
            This affects inspection of the spell itself by any means, such as with the Spellsense skill (see \\pcref<Spellsense>).
            However, it does not alter the mechanical effects of the spell in any way.

            An observer can make a Spellsense check with a \\glossterm<difficulty rating> of 15 \\add your magical \\glossterm<power> to identify the spell's true nature.
            If the spell's effects depend on visual components, the spell may fail to work if the target alters the spell's visuals too much.

            \\rankline
            \\rank<4> This spell can target an \\glossterm<ally> within \\rngmed range instead of you.
            \\rank<6> The target also gains a +1 \\glossterm<magic bonus> to \\glossterm<accuracy> with spells.
            \\rank<8> The accuracy bonus increases to +2.
        """, tags=['Attune (target)']),
    ],
    rituals=[
        Spell('Dispel Curse', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            All curses affecting the target are removed.
            This ritual cannot remove a curse that is part of the effect of an item the target has equipped.
            However, it can allow the target to remove any cursed items it has equipped.
        """, tags=[], ritual_time='24 hours'),
    ],
    category='debuff, combat',
)
