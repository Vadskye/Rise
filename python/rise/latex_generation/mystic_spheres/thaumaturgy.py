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
            You gain a +4 bonus to the Spellcraft skill until the end of the next round.

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
            If this damage does not \\glossterm<wound> the target, it has no effect, and the target does not lose any \\glossterm<hit points>.

            \\rankline
            \\rank<3> The damage increases to \\glossterm<standard damage> -1d.
            \\rank<5> The damage increases to \\glossterm<standard damage>.
            \\rank<7> The damage increases to \\glossterm<standard damage> +1d.
        """, tags=[]),
        Spell('Magic Missile Storm', 4, 'Each \\glossterm<enemy> within a \\areamed radius from you', """
            You send an unerring projectile made of pure magical energy towards each target.
            Each target takes energy \\glossterm<standard damage> -3d.
            If this damage does not \\glossterm<wound> a target, it has no effect, and that target does not lose any \\glossterm<hit points>.

            \\rankline
            \\rank<6> The area increases to a \\arealarge radius.
            \\rank<8> The area increases to a \\areahuge radius.
        """, tags=[]),
        Spell('Suppress Magic', 1, 'One creature, object, or magical effect within \\rngmed range', """
            Make an attack against the target.
            If you target a creature or object, the attack result is applied to every \\glossterm<magical> effect on the target.
            % Is this clear enough?
            This does not affect the passive effects of any magic items the target has equipped.
            If you target a magical effect directly, the attack result is applied against the effect itself.
            The \\glossterm<difficulty rating> for each effect is equal to the \\glossterm<power> of that effect.
            \\hit Each effect is \\glossterm<suppressed>.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=['Sustain (standard)']),
        Spell('Alter Magic Aura', 1, 'One Large or smaller magical object in \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit One of the target's magic auras is altered (see \pcref{Spellcraft}).
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
            If an \\glossterm<attuned> effect is \\glossterm<dismissed> in this way,
                the attuning creature can regain the \\glossterm<action point> spent to attune to the spell when it takes a \\glossterm<short rest>.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=[]),
        Spell('Deattunement', 1, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target stops being \\glossterm<attuned> to one ability of its choice that it is currently attuned to.
                This ability does not affect attunement to magic items.
            \\crit The target breaks its attunement to all abilities that it is attuned to other than \\glossterm<magic items>.

            \\rankline
            \\rank<3> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<5> The accuracy bonus increases to +2.
            \\rank<7> The accuracy bonus increases to +3.
        """, tags=[]),
        Spell('Reattunement', 3, 'Yourself or one \\glossterm<ally> within \\rngmed range', """
            The target can reattune to one ability that it stopped being attuned to since the start of the last round without spending an additional action point.
            Any choices and effects of the attuned ability are restored to their exact state before the attunement was broken.

            \\rankline
            \\rank<5> You can target an additional ally within range.
            \\rank<7> You can target an additional ally within range.
        """, tags=[]),
        Spell('Dispel Magic', 3, 'One creature, object, or magical effect within \\rngmed range', """
            Make an attack against the target.
            If you target a creature or object, the attack result is applied to every \\glossterm<magical> effect on the target.
            % Is this clear enough?
            This does not affect the passive effects of any magic items the target has equipped.
            If you target a magical effect directly, the attack result is applied against the effect itself.
            The \\glossterm<difficulty rating> for each effect is equal to the \\glossterm<power> of that effect.
            \\hit Each effect is \\glossterm<dismissed>
            If an \\glossterm<attuned> effect is \\glossterm<dismissed> in this way,
                the attuning creature can regain the \\glossterm<action point> spent to attune to the spell when it takes a \\glossterm<short rest>.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Sustain (standard)']),
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
            \\hit One magical condition of your choice is removed from primary target and applied to the secondary target.
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
        Spell('Enhance Magic', 3, 'Yourself or an \\glossterm<ally> within \\rngmed range', """
            The target gains a +2 \\glossterm<magic bonus> to \\glossterm<power> with \\glossterm<magical> abilities.
            You can cast this spell as a \\glossterm<minor action>.

            \\rankline
            \\rank<5> The target also reduces its \\glossterm<focus penalties> by 1.
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
        # Does having this be Swift break anything?
        Spell('Dimensional Anchor', 3, 'One creature or object within \\rngmed range', """
            Make an attack vs. Mental against the target.
            \\hit The target is unable to travel extradimensionally.
            This prevents all \\glossterm<Manifestation> effects and effects that teleport the target or move it between planes.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
        """, tags=['Swift', 'Sustain (minor)']),
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
        Spell('Augmented Spells', 5, 'Yourself', """
            Choose one \\glossterm<augment> you know with a rank modifier of up to +2.
            You can apply the augment once to spells you cast without increasing the minimum rank of those spells.
            If the augment can be applied multiple times, you can apply it again to the same spell, increasing the spell's minimum rank normally.

            \\rankline
            \\rank<7> You can choose an additional \\glossterm<augment> you know with a rank modifier of up to +2.
            Whenever you cast a spell, you can choose which augment to apply for free.
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
            You gain a +2 \\glossterm<magic bonus> to defenses against \\glossterm<magical> effects.
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
        Spell('Spellseal', 3, 'One creature within \\rngmed range', """
            Make an attack vs. Mental against the target.
            You gain a +2 bonus to \\glossterm<accuracy> if the target is casting a spell in the current phase.
            \\hit As a \\glossterm<condition>, the next time the target tries to cast a spell, it \\glossterm<miscasts> that spell instead.
            When the target miscasts a spell in this way, this effect ends.

            \\rankline
            \\rank<5> You gain a +1 bonus to \\glossterm<accuracy> with the attack.
            \\rank<7> The accuracy bonus increases to +2.
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
        Spell('Spellseal', 4, 'Creatures in a \\areasmall radius \\glossterm<zone> within \\rngmed range', """
            You seal off an area's connection to magic.
            Whenever a creature casts a spell in the area, it has a 50\% chance to \\glossterm<miscast> the spell.

            \\rankline
            \\rank<6> The area increases to a \\areamed radius.
            \\rank<8> The range increases to \\rnglong.
        """, tags=['Sustain (minor)']),
    ],
    category='debuff, combat',
)
