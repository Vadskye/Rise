use crate::equipment::MagicWeapon::Unrestricted;
use crate::equipment::{ItemUpgrade, MagicWeapon, StandardItem};
use crate::core_mechanics::abilities::{AbilityTag, AttuneType};

// Standard weapon templates:
// * Grant minor passive effect (damage type) and appropriately leveled maneuver
// * Grant damage or accuracy with various conditions
pub fn unrestricted() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.append(&mut energy_weapons());

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Frenzy"),
        rank: 3,
        short_description: String::from(
            "Grants +1 accuracy with continuous strikes",
        ),
        description: String::from(
            r"
                Whenever you make a \glossterm<strike> with this weapon, you \glossterm<briefly> gain a +1 bonus to \glossterm<accuracy> with all \glossterm<strikes>.
                As normal, this bonus does not stack with itself.
            ",
        ),
        upgrades: vec![ItemUpgrade::new(
            6,
            "Grants +2 accuracy with continuous strikes",
            "The bonus increases to +2.",
        )],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Bloodfrenzy"),
        rank: 1,
        short_description: String::from(r"Grants +2 accuracy when you injure a foe"),
        description: String::from(r"
            Whenever you cause a creature to lose \glossterm{hit points} with a strike using this weapon, you \glossterm{briefly} gain a +2 accuracy bonus against that creature.
            As normal, this bonus does not stack with itself, even if you make the same creature lose hit points multiple times.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Grants +4 accuracy when you injure a foe", r"
                The accuracy bonus increases to +4.
            "),
            ItemUpgrade::new(7, "Grants +6 accuracy when you injure a foe", r"
                The accuracy bonus increases to +6.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        // +1.5 damage
        name: String::from("Brutish"),
        rank: 1,
        short_description: String::from(r"Deals +1d6-2 damage if you have 3 Str"),
        description: String::from(r"
            If your Strength is at least 3, this weapon deals +1d6 damage, but the damage is also reduced by 2.
            This changes your \glossterm{weapon damage}, and is not considered \glossterm{extra damage}.
        "),
        upgrades: vec![
            // +2.5 damage
            ItemUpgrade::new(4, "Deals +1d8-2 damage if you have 4 Str", r"
                The damage die increases to 1d8 if your Strength is at least 4.
            "),
            // +4 damage
            ItemUpgrade::new(7, "Deals +2d6-3 damage if you have 5 Str", r"
                If your Strength is at least 5, the damage dice increase to 2d6 and the damage penalty increases to -3.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Educated"),
        rank: 1,
        short_description: String::from(r"Deals +1 damage if you have 3 Int"),
        description: String::from(r"
            If your Intelligence is at least 3, this weapon deals +1 damage.
            This changes your \glossterm{weapon damage}, and is not considered \glossterm{extra damage}.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Deals +2 damage if you have 4 Int", r"
                The damage bonus increases to +2 if your Intelligence is at least 4.
            "),
            ItemUpgrade::new(7, "Deals +4 damage if you have 5 Int", r"
                The damage bonus increases to +4 if your Intelligence is at least 5.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Finesse"),
        rank: 4,
        short_description: String::from(r"Grants +1 accuracy if you have 4 Dex"),
        description: String::from(r"
            If your Dexterity is at least 4, you gain a +1 accuracy bonus with this weapon.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Grants +2 accuracy if you have 5 Dex", r"
                The accuracy bonus increases to +2 if your Dexterity is at least 5.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Tireless"),
        rank: 1,
        short_description: String::from(r"Ignore 2 fatigue with strikes"),
        description: String::from(r"
            You reduce your \glossterm<fatigue penalty> by 2 when determining your \glossterm<accuracy> with \glossterm<strikes> using this weapon.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Ignore fatigue with strikes", r"
                You ignore your \glossterm<fatigue penalty> when determining your \glossterm<accuracy> with \glossterm<strikes> using this weapon.
            "),
        ],
        ..MagicWeapon::default()
    }));

    // 20% chance of +5.5 accuracy = +1.1 accuracy. So you're spending an attunement point on
    // +0.1 accuracy unless you have synergies.
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Unbalanced"),
        rank: 2,
        short_description: String::from(r"-1 accuracy, but explode on 8 and 9"),
        description: String::from(r"
            You take a -1 \glossterm<accuracy> penalty to strikes using this weapon.
            However, you reduce your \glossterm{explosion target} with strikes using this weapon by 2 (see \pcref{Exploding Attacks}).
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "-2 accuracy, but explode on 6 or higher", r"
                The accuracy penalty increases to -2, but the explosion target reduction increases to 4.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Bloodfuel"),
        rank: 4,
        short_description: String::from(r"Can spend 4 HP for double damage"),
        description: String::from(r"
            As a standard action, you can make a \glossterm<strike> using this weapon that uses your own blood to fuel its power.
            When you do, you lose 4 \glossterm<hit points>.
            The strike's minimum accuracy is $accuracy.
            The strike deals double weapon damage.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Can spend 8 HP for triple damage", r"
                Your weapon damage is tripled instead of doubled, but the hit point loss increases to 8.
                In addition, the strike's minimum accuracy increases to $accuracy.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Routing"),
        rank: 1,
        short_description: String::from(r"Grants +1 accuracy vs scared foes"),
        description: String::from(r"
            You gain a +1 bonus to \glossterm<accuracy> with \glossterm<strikes> using this weapon against creatures that are suffering penalties for being \frightened or \panicked.
        "),
        upgrades: vec![
            ItemUpgrade::new(3, "Grants +2 accuracy vs scared foes", r"
                The accuracy bonus increases to +2.
            "),
            ItemUpgrade::new(5, "Grants +3 accuracy vs scared foes", r"
                The accuracy bonus increases to +3.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Baneswallow"),
        rank: 2,
        short_description: String::from(r"Can exert and remove a condition to gain +2 accuracy"),
        description: String::from(r"
            You can activate this weapon as a standard action.
            When you do, you may remove a \glossterm{condition} affecting you.
            If you remove a condition in this way, you \glossterm{briefly} gain a +2 accuracy bonus with this weapon.

            After you activate this item, you increase your \glossterm<fatigue level> by one.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Can remove a condition to gain +2 accuracy", r"
                Activating this weapon does not increase your fatigue level, and it no longer has the \abilitytag{Exertion} tag.
            "),
        ],
        tags: vec![AbilityTag::Exertion],
        ..MagicWeapon::default()
    }));

    // TODO: weird rank, unclear scaling? Can't make the range too long or else you can
    // teleport to allies / bags of rats with a dimensional trace longbow.
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Dimensional Trace"),
        rank: 3,
        short_description: String::from(r"Can briefly teleport next to struck creature"),
        description: String::from(r"
            As a standard action, you can make a \glossterm{strike} using this weapon.
            The strike's minimum accuracy is $accuracy.
            If the target takes damage, you can apply a dimensional trace on it that lasts \glossterm{briefly}.
            While the dimensional trace lasts, you can activate this weapon as a \glossterm{minor action}.
            When you do, you \glossterm{teleport} into the closest unoccupied square adjacent to that creature, if such a space exists within \medrange.
        "),
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Fixating"),
        rank: 3,
        short_description: String::from(r"Grants stacking +1 accuracy bonus"),
        description: String::from(r"
            Once per round, when you make a \glossterm<strike> with this weapon, you gain a +1 accuracy bonus against one target of the strike with future strikes using this weapon.
            If the strike had multiple targets, you choose which target you gain the bonus against.
            This effect lasts until you make a strike with this weapon that does not include that creature as a target.
            It stacks with itself, up to a maximum of a +4 bonus.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Grants stacking +2 accuracy bonus", r"
                The bonus increases to +2 per strike.
            "),
        ],
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Merciful"),
        rank: 1,
        short_description: String::from(r"Deals subdual damage"),
        description: String::from(r"
            This weapon deals \glossterm<subdual damage>.
        "),
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Morphing"),
        rank: 1,
        short_description: String::from(r"Can change into similar weapons"),
        description: String::from(r"
             You can activate this weapon as a \glossterm{minor action}.
             When you do, it changes shape into a new weapon of your choice from the weapon's original weapon group.
             If the weapon's original form belongs to multiple weapon groups, this property only applies to one of those weapon groups.
             The new shape lasts until you activate the weapon again.

             When this effect ends for any reason, the weapon returns to its original form.
        "),
        upgrades: vec![
            ItemUpgrade::new(3, "Can change into any weapon", r"
                 The weapon can change shape into any weapon of your choice that you are proficient with, not just weapons from a single weapon group.
                 This can only change into existing manufactured weapons, not improvised weapons.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Seeking"),
        rank: 2,
        short_description: String::from(r"Reduces miss chances"),
        description: String::from(r"
            This weapon automatically veers towards its intended target.
            Any \glossterm<miss chance> the strike would normally have is reduced.
            A 50\% miss chance is reduced to a 20\% miss chance, and a 20\% miss chance is removed entirely.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Removes miss chances", r"
                Any \glossterm<miss chance> the strike would normally have is removed completely instead of only being reduced.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Soulreaving"),
        rank: 5,
        short_description: String::from(r"Deals delayed damage"),
        description: String::from(r"
            This weapon is transluscent and has no physical presence for anyone except you.
            It has no effect on objects or constructs, and creatures do not feel any pain or even notice attacks from it.

            Attacks with this weapon deal no damage immediately.
            This means that any effects which trigger when you deal damage with the attack, such as conditions, do not happen.
            Instead, the damage is delayed.
            Damage that would be dealt by the weapon can be delayed indefinitely.
            While the damage is delayed, it cannot be removed by any means short of the destruction of this weapon or the creature's death.

            As a \glossterm<minor action>, you can hurt yourself with this weapon to activate it.
            This deals a single point of physical damage to you.
            When you do, each creature with delayed damage from this weapon takes untyped damage equal to the total delayed damage built up by the weapon for that target.
            Creatures farther than one mile away from the weapon are unaffected by this damage.
            This ability expends all delayed damage built up by the weapon for all targets, including targets farther than one mile from the weapon.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Deals delayed damage", r"
                You gain a +1 accuracy bonus with strikes using this weapon against creatures that have delayed damage from this weapon.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Fated"),
        rank: 7,
        short_description: String::from(r"Rerolls missed attacks"),
        description: String::from(r"
            Whenever you miss with an attack using this weapon, you can reroll the attack and take the higher result.
            After you reroll an attack in this way, you \glossterm<briefly> cannot do so again.
        "),
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        ..MagicWeapon::default()
    }));

    // Same damage scaling as Resilient Strike
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Vampiric"),
        rank: 3,
        short_description: String::from(r"Can attack with +1d4 damage to steal HP"),
        description: String::from(r"
            As a standard action, you can make a \glossterm<strike> using this weapon.
            The strike's minimum accuracy is $accuracy.
            The strike deals 1d4 \glossterm{extra damage}, and damage dealt by the strike is energy damage in addition to its other types.
            If a living creature loses \glossterm{hit points} from this strike, you can increase your \glossterm{fatigue level} by one.
            When you do, you regain $dr3 hit points at the end of the round.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Can attack with +2d8 damage to steal HP", r"
                The extra damage increases to 2d8, and the healing increases to $dr5.
                In addition, the strike's minimum accuracy increases to $accuracy.
            "),
            ItemUpgrade::new(7, "Can attack with +5d10 damage to steal HP", r"
                The extra damage increases to 5d10, and the healing increases to $dr7.
                In addition, the strike's minimum accuracy increases to $accuracy.
            "),
        ],
        tags: vec![AbilityTag::Exertion],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Surestrike"),
        rank: 3,
        short_description: String::from(r"Can attack with +3 accuracy"),
        description: String::from(r"
            As a standard action, you can make a \glossterm<strike> with a +3 accuracy bonus using this weapon.
            Your minimum accuracy with the strike is $accuracy+3.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Can attack with +6 accuracy", r"
                The accuracy bonus increases to +6, and the minimum accuracy increases to $accuracy+6.
            "),
            ItemUpgrade::new(7, "Can attack with +10 accuracy" , r"
                The accuracy bonus increases to +10, and the minimum accuracy increases to $accuracy+10.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Grounded"),
        rank: 2,
        short_description: String::from(r"Grants +1 accuracy while stationary"),
        description: String::from(r"
            At the start of each \glossterm{action phase}, if you are in the same location you were in at the start of the round, you gain a \plus1 accuracy bonus during that round.
            You immediately lose this accuracy bonus if you leave that location.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants +2 accuracy while stationary", r"
                The accuracy bonus increases to +2.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Psionic"),
        rank: 2,
        short_description: String::from(r"Can attack Mental defense for psychic damage"),
        description: String::from(r"
            As a standard action, you can make a \glossterm<strike> using this weapon that is imbued with psychic power.
            The strike is made against the target's Mental defense instead of its Armor defense, and it only affects creatures with a mind.
            Its minimum accuracy is $accuracy.
            Damage dealt by the strike is psychic damage instead of the weapon's normal damage type.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Attacks Mental defense and deals psychic damage", r"
                All damage dealt by this weapon is psychic damage instead of its normal damage types.
                Strikes with this weapon are made against the target's Mental defense instead of its Armor defense.
                When imbue this weapon with psychic power as a standard action, the strike deals double \glossterm{weapon damage}, and its minimum accuracy is $accuracy.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Toxic"),
        rank: 2,
        short_description: String::from(r"Can attack Fortitude defense for poison damage"),
        description: String::from(r"
            As a standard action, you can make a \glossterm<strike> using this weapon that transforms the striking surface to poison.
            The strike is made against the target's Fortitude defense instead of its Armor defense, and it only affects living creatures.
            Its minimum accuracy is $accuracy.
            Damage dealt by the strike is poison damage instead of the weapon's normal damage type.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Attacks Fortitude defense and deals poison damage", r"
                All damage dealt by this weapon is poison damage instead of its normal damage types.
                Strikes with this weapon are made against the target's Fortitude defense instead of its Armor defense, and they only affect living creatures.
                When imbue this weapon with poison as a standard action, the strike deals double \glossterm{weapon damage}, and its minimum accuracy is $accuracy.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Prismatic"),
        rank: 4,
        short_description: String::from(r"Can attack Reflex defense for energy damage"),
        description: String::from(r"
            As a standard action, you can make a \glossterm<strike> using this weapon that transforms the striking surface to elemental energy.
            The strike is made against the target's Reflex defense instead of its Armor defense.
            Its minimum accuracy is $accuracy.
            Damage dealt by the strike is cold, electricity, and fire damage instead of the weapon's normal damage type.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Attacks Reflex defense and deals energy damage", r"
                All damage dealt by this weapon is cold, electricity, and fire damage instead of its normal damage types.
                Strikes with this weapon are made against the target's Reflex defense instead of its Armor defense.
                When imbue this weapon with poison as a standard action, the strike deals double \glossterm{weapon damage}, and its minimum accuracy is $accuracy.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons
}

fn energy_weapons() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Vibrating"),
        rank: 1,
        short_description: String::from(r"Deals bludgeoning damage"),
        description: String::from(r"
            This weapon continuously emits a low-pitched rumbling noise and vibrates in the hand.
            All damage dealt with it is bludgeoning damage in addition to its normal damage types (see \pcref<Multiple Damage Types>).
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Deals 1d4 bludgeoning extra damage", r"
                The weapon also deals 1d4 bludgeoning \glossterm{extra damage}.
            "),
            ItemUpgrade::new(6, "Deals 1d10 bludgeoning extra damage", r"
                The extra damage increases to 1d10.
            "),
        ],
        ..MagicWeapon::default()
    }));

    // Target is 125% of High power scaling damage without significant power investment, but with
    // hitting an extra defense, damage delay, and item slot.
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Flaming"),
        rank: 3,
        short_description: String::from(r"Deals fire damage and can ignite"),
        description: String::from(r"
            This weapon is on fire.
            It sheds light in a 15 foot radius of \glossterm{bright illumination}.
            All damage dealt with it is fire damage in addition to its normal damage types (see \pcref<Multiple Damage Types>).

            As a standard action, you can make a \glossterm<strike> using this weapon that is imbued with fiery energy.
            The strike's minimum accuracy is $accuracy.
            Each damaged creature burns if your attack result beats its Reflex defense.
            A burning creature takes 2d6 fire damage during your next action.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Deals fire damage and can ignite", r"
                The burning damage increases to 4d10 fire damage.
                In addition, the strike's minimum accuracy increases to $accuracy.
            "),
            ItemUpgrade::new(7, "Deals fire damage and can ignite", r"
                The burning damage increases to 9d10 fire damage.
                In addition, the strike's minimum accuracy increases to $accuracy.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Arcing"),
        rank: 3,
        short_description: String::from(r"Deals electricity damage and can chain"),
        description: String::from(r"
            This weapon continuously crackles with electricity.
            It sheds light in a 5 foot radius of \glossterm{bright illumination}.
            All damage dealt with it is electricity damage in addition to its normal damage types (see \pcref<Multiple Damage Types>).

            As a standard action, you can make a \glossterm<strike> using this weapon that is imbued with electrical energy.
            The strike's minimum accuracy is $accuracy.
            It \glossterm<chains> once.
            Damage dealt to the secondary target is exclusively electricity damage, regardless of the strike's normal damage types.
        "),
        // The baseline r3 strike deals (71%/69%) single-target damage.
        // At higher levels, the multi-target becomes slightly less exciting since people have
        // better AOE access, so we can scale that up, but it should still be less than 100%
        // single-target damage for a character with a reasonably high power.
        upgrades: vec![
            // 2d6 extra gives (13.6/16.8) damage, or (97%/75%)
            ItemUpgrade::new(5, "Deals electricity damage and can chain", r"
                The chaining strike also deals 2d6 \glossterm{extra damage}.
                In addition, the strike's minimum accuracy increases to $accuracy.
            "),
            // 4d10 extra gives (30.2/34.5) damage, or (108%/77%)
            ItemUpgrade::new(7, "Deals electricity damage and can chain", r"
                The chaining strike's \glossterm{extra damage} increases to 4d10.
                In addition, the strike's minimum accuracy increases to $accuracy.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Freezing"),
        rank: 2,
        short_description: String::from(r"Deals cold damage and can slow"),
        description: String::from(r"
            This weapon is bitterly cold to the touch.
            All damage dealt with it is cold damage in addition to its normal damage types (see \pcref<Multiple Damage Types>).

            As a standard action, you can make a \glossterm<strike> using this weapon that is imbued with frigid energy.
            The strike's minimum accuracy is $accuracy.
            % TODO: wording? Creatures immune to cold damage should not be slowed.
            If the target loses hit points from cold damage, it is \slowed as a \glossterm{condition}.
        "),
        upgrades: vec![
            // At this point, the strike deals (59%/56%) damage.
            ItemUpgrade::new(4, "Deals cold damage and can slow", r"
                The target of the strike is slowed if it takes cold damage, even if it does not lose hit points.
                In addition, the strike's minimum accuracy increases to $accuracy.
            "),
            // With 2d10, it deals (92%/69%) damage, which is about on par with "double weapon
            // damage".
            ItemUpgrade::new(6, "Deals cold damage and can slow", r"
                The frigid strike also deals 2d10 \glossterm{extra damage}.
                In addition, the strike's minimum accuracy increases to $accuracy.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons
}
