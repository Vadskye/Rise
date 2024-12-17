use crate::equipment::MagicWeapon::Unrestricted;
use crate::equipment::{ItemUpgrade, MagicWeapon, StandardItem};
use crate::core_mechanics::abilities::{AbilityTag, AttuneType};

// Standard weapon templates:
// * Grant minor passive effect (energy tag) and appropriately leveled maneuver
// * Grant damage or accuracy with various conditions
pub fn unrestricted() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.append(&mut energy_weapons());

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Frenzy"),
        rank: 3,
        short_description: String::from("Grants +1 accuracy with continuous strikes"),
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
        rank: 2,
        short_description: String::from(r"Grants +2 accuracy when you injure a foe"),
        description: String::from(r"
            Whenever you cause a creature to lose \glossterm{hit points} with a strike using this weapon, you \glossterm{briefly} gain a +2 accuracy bonus with \glossterm{strikes} against that creature.
            As normal, this bonus does not stack with itself, even if you make the same creature lose hit points multiple times.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants +4 accuracy when you injure a foe", r"
                The accuracy bonus increases to +4.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        // +1.5 damage
        name: String::from("Brutish"),
        rank: 3,
        short_description: String::from(r"Deals +1d6-2 damage if you have 3 Str"),
        description: String::from(r"
            If your Strength is at least 3, this weapon deals +1d6 damage, but the damage is also reduced by 2.
            This changes your \glossterm{weapon damage}, and is not considered \glossterm{extra damage}.
        "),
        upgrades: vec![
            // +2.5 damage
            ItemUpgrade::new(5, "Deals +1d8-2 damage if you have 4 Str", r"
                If your Strength is at least 4, the damage die increases to 1d8.
            "),
            // +5 damage
            ItemUpgrade::new(7, "Deals +2d6-2 damage if you have 5 Str", r"
                If your Strength is at least 5, the damage dice increase to 2d6.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Educated"),
        rank: 2,
        short_description: String::from(r"Deals +1 damage if you have 3 Int"),
        description: String::from(r"
            If your Intelligence is at least 3, this weapon gains a +1 bonus to its \glossterm{weapon damage}.
            This is not considered \glossterm{extra damage}.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Deals +2 damage if you have 4 Int", r"
                If your Intelligence is at least 4, the damage bonus increases to +2.
            "),
            ItemUpgrade::new(6, "Deals +4 damage if you have 5 Int", r"
                If your Intelligence is at least 5, the damage bonus increases to +4.
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
        rank: 3,
        // Expected HP at rank 3 is approximately 25.
        short_description: String::from(r"Can spend 4 HP for +1d8 damage"),
        description: String::from(r"
            You can feed this weapon your blood as a \glossterm{minor action}.
            When you do, you lose 4 \glossterm{hit points}.
            In exchange, you deal 1d8 \glossterm{extra damage} with strikes using this weapon during the current round.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Can spend 8 HP for +2d8 damage", r"
                The HP loss increases to 8, and the extra damage increases to 2d6.
            "),
            ItemUpgrade::new(7, "Can spend 16 HP for +4d8 damage", r"
                The HP loss increases to 16, and the extra damage increases to 4d6.
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
                Activating this weapon does not increase your fatigue level.
            "),
        ],
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
             If the weapon's original form belongs to multiple weapon groups, the weapon can only change into weapons from one of those weapon groups.
             The new shape lasts until you activate the weapon again.

             When this effect ends for any reason, the weapon returns to its original form.
        "),
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Anchoring Burst"),
        rank: 2,
        short_description: String::from(r"Can prevent teleportation"),
        description: String::from(r"
            As a standard action, you can make a mundane \glossterm<strike> using this weapon.
            On a damaging hit, the target \glossterm{briefly} cannot be \glossterm{teleported}.
            An object subject to this effect is left behind if it is carried by a creature that teleports.
        "),
        upgrades: vec![
            // TODO: awkward wording
            ItemUpgrade::new(5, "Prevents teleportation", r"
                This effect no longer requires a special attack.
                It automatically affects the target whenever you get a damaging hit with a strike using this weapon.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Anchoring"),
        rank: 5,
        short_description: String::from(r"Prevent teleportation"),
        description: String::from(r"
            Whenever you get a damaging hit with this weapon, that target becomes dimensionally anchored.
            Creatures are anchored as a \glossterm{condition}, and objects are anchored \glossterm{briefly}.
            While dimensionally anchored, the target cannot be \glossterm{teleported}.
            An object subject to this effect is left behind if it is carried by a creature that teleports.
        "),
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Cursebite"),
        rank: 3,
        short_description: String::from(r"Can inflict a curse"),
        description: String::from(r"
            Whenever you would inflict a \glossterm{condition} on a non-cursed creature with a strike using this weapon, that condition becomes a curse instead.
            The curse cannot be removed by effects that remove conditions, and lasts until the target takes a \glossterm{short rest}.
            If the effect has a special method of being removed, such as the \spell{entangle} spell, that removal method still functions normally.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Can inflict multiple curses", r"
                The target does not have to be non-cursed, allowing you to apply multiple curses to the same creature.
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

    // Same damage scaling as Resilient Blow
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Vampiric"),
        rank: 3,
        short_description: String::from(r"Can attack with +1d4 damage to steal HP"),
        description: String::from(r"
            As a standard action, you can make a mundane \glossterm<strike> using this weapon.
            The strike's minimum accuracy is $accuracy.
            The strike deals 1d4 \glossterm{extra damage}.
            If a living creature loses \glossterm{hit points} from this strike, you can increase your \glossterm{fatigue level} by one.
            When you do, you regain $dr3l hit points at the end of the round.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Can attack with +2d8 damage to steal HP", r"
                The extra damage increases to 2d8, and the healing increases to $dr5l.
                In addition, the strike's minimum accuracy increases to $accuracy.
            "),
            ItemUpgrade::new(7, "Can attack with +5d10 damage to steal HP", r"
                The extra damage increases to 5d10, and the healing increases to $dr7l.
                In addition, the strike's minimum accuracy increases to $accuracy.
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
        name: String::from("Psionic Burst"),
        rank: 2,
        short_description: String::from(r"Can attack Mental defense"),
        description: String::from(r"
            As a standard action, you can make a mundane \glossterm<strike> using this weapon that is imbued with psychic power.
            The strike is made against the target's Mental defense instead of its Armor defense, and it gains the \atCompulsion tag.
            Its minimum accuracy is $accuracy.
        "),
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Psionic"),
        rank: 4,
        short_description: String::from(r"Is psychic, can attack Mental defense"),
        description: String::from(r"
            This weapon's striking surface is ephemeral, and it echoes the thoughts of anyone touching it back into their head.
            You can suppress or resume its psionic nature as a \glossterm{free action}.
            While psionic, the weapon gains a \plus1 bonus to \glossterm{weapon damage}, and all strikes with it have the \atCompulsion tag.
            This means that it is unable to damage most objects.

            As a standard action while this weapon is psionic, you can make a mundane \glossterm<strike> using this weapon that is imbued with psychic power.
            The strike is made against the target's Mental defense instead of its Armor defense.
            Its minimum accuracy is $accuracy.
            \damaginghit The target becomes \stunned as a \glossterm{condition}.
            If it was already stunned, it takes double damage from this attack instead.
        "),
        tags: vec![AbilityTag::Poison],
        upgrades: vec![
            ItemUpgrade::new(6, "Is psychic, can attack Mental defense", r"
                The weapon damage bonus increases to \plus2.
                In addition, the psychic attack's minimum accuracy increases to $accuracy, and it deals triple damage to stunned creatures.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Toxic Burst"),
        rank: 2,
        short_description: String::from(r"Can attack Fortitude defense"),
        description: String::from(r"
            As a standard action, you can make a mundane \glossterm<strike> using this weapon that transforms the striking surface to poison.
            The strike is made against the target's Fortitude defense instead of its Armor defense, and it gains the \atPoison tag.
            Its minimum accuracy is $accuracy.
        "),
        tags: vec![AbilityTag::Poison],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Toxic"),
        rank: 4,
        short_description: String::from(r"Is poisonous, can attack Fortitude defense"),
        description: String::from(r"
            This weapon's striking surface is liquified into a sinister poison.
            You can suppress or resume its poisonous nature as a \glossterm{free action}.
            While poisonous, the weapon gains a \plus1 bonus to \glossterm{weapon damage}, and all strikes with it have the \atPoison tag.
            This means that it is unable to damage most objects.

            As a standard action while this weapon is poisonous, you can make a mundane \glossterm<strike> using this weapon that fully transforms the striking surface to poison.
            The strike is made against the target's Fortitude defense instead of its Armor defense.
            Its minimum accuracy is $accuracy.
            If the target loses hit points from this strike, it becomes poisoned by the weapon.
            The poison's accuracy is equal to the original strike's accuracy.
            It inflicts 2d10 damage per poison stage.
            Its stage 3 effect also ends the poison.
        "),
        tags: vec![AbilityTag::Poison],
        upgrades: vec![
            ItemUpgrade::new(6, "Is poisonous, can attack Fortitude defense", r"
                The weapon damage bonus increases to \plus2.
                In addition, the poisoning attack's minimum accuracy increases to $accuracy, and its poison damage increases to 6d10.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons
}

fn energy_weapons() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Prismatic"),
        rank: 4,
        short_description: String::from(r"Is infused with cold, electricity, and fire"),
        description: String::from(r"
            This weapon is infused with prismatic energy.
            You can suppress or resume this infusion as a \glossterm{free action}.
            While infused, the weapon gains a \plus1 bonus to \glossterm{weapon damage}, and all strikes with it have the \atCold, \atElectricity, and \atFire tags.
            In addition, it sheds gradually shifting red, blue, and yellow light in a 15 foot radius of \glossterm{bright illumination}.

            As a standard action, you can make a mundane \glossterm<strike> using this weapon that intensifies the energy.
            The strike deals double \glossterm{weapon damage}.
            Its minimum accuracy is $accuracy.
        "),
        tags: vec![AbilityTag::Cold, AbilityTag::Electricity, AbilityTag::Fire],
        upgrades: vec![
            ItemUpgrade::new(6, "Is infused with cold, electricity, and fire", r"
                The weapon damage bonus increases to \plus2.
                In addition, the transformed attack's minimum accuracy increases to $accuracy, and it deals triple weapon damage.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Vibrating"),
        rank: 4,
        short_description: String::from(r"Deals 1d4 extra damage"),
        description: String::from(r"
            This weapon continuously emits a low-pitched rumbling noise and vibrates in the hand.
            Strikes with it deal 1d4 \glossterm{extra damage}.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Deals 1d10 extra damage", r"
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
        short_description: String::from(r"Is on fire and can ignite"),
        description: String::from(r"
            This weapon constantly burns.
            You can suppress or resume this fire as a \glossterm{free action}.
            While burning, the weapon gains a \plus1 bonus to \glossterm{weapon damage}, and all strikes with it have the \atFire tag.
            It also sheds light in a 15 foot radius of \glossterm{bright illumination}.

            As a standard action while the weapon is burning, you can make a mundane \glossterm<strike> using this weapon that is imbued with fiery energy.
            The strike's minimum accuracy is $accuracy.
            \damaginghit If your attack result also beats the target's Reflex defense, the target burns.
            A burning creature takes 2d6 damage during your next action.
        "),
        tags: vec![AbilityTag::Fire],
        upgrades: vec![
            ItemUpgrade::new(5, "Is on fire and can ignite", r"
                The weapon damage bonus increases to \plus2.
                In addition, the burning attack's minimum accuracy increases to $accuracy, and its burning damage increases to 4d10.
            "),
            ItemUpgrade::new(7, "Is on fire and can ignite", r"
                The weapon damage bonus increases to \plus4.
                In addition, the burning attack's minimum accuracy increases to $accuracy, and its burning damage increases to 10d10.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Arcing"),
        rank: 3,
        short_description: String::from(r"Is electrically charged and can chain"),
        description: String::from(r"
            This weapon continuously crackles with electricity.
            You can suppress or resume this charge as a \glossterm{free action}.
            While charged, the weapon gains a \plus1 bonus to \glossterm{weapon damage}, and all strikes with it have the \atElectricity tag.
            It also sheds light in a 5 foot radius of \glossterm{bright illumination}.

            As a standard action while the weapon is charged, you can make a mundane \glossterm<strike> using this weapon that is imbued with electrical energy.
            The strike's minimum accuracy is $accuracy.
            It \glossterm<chains> once.
        "),
        tags: vec![AbilityTag::Electricity],
        // The baseline r3 strike deals (71%/69%) single-target damage.
        // At higher levels, the multi-target becomes slightly less exciting since people have
        // better AOE access, so we can scale that up, but it should still be less than 100%
        // single-target damage for a character with a reasonably high power.
        upgrades: vec![
            // 2d6 extra gives (13.6/16.8) damage, or (97%/75%)
            ItemUpgrade::new(5, "Is electrically charged and can chain", r"
                The weapon damage bonus increases to \plus2.
                In addition, the chaining attack's minimum accuracy increases to $accuracy, and it deals 2d6 \glossterm{extra damage}.
            "),
            // 4d10 extra gives (30.2/34.5) damage, or (108%/77%)
            ItemUpgrade::new(7, "Is electrically charged and can chain", r"
                The weapon damage bonus increases to \plus4.
                In addition, the chaining attack's minimum accuracy increases to $accuracy, and its extra damage increases to 4d10.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Freezing"),
        rank: 3,
        short_description: String::from(r"Is cold and can slow"),
        description: String::from(r"
            This weapon is bitterly cold to the touch.
            You can suppress or resume this chill as a \glossterm{free action}.
            While chilled, the weapon gains a \plus1 bonus to \glossterm{weapon damage}, and all strikes with it have the \atCold tag.

            As a standard action, you can make a mundane \glossterm<strike> using this weapon that is imbued with frigid energy.
            The strike's minimum accuracy is $accuracy.
            If the target loses hit points from the strike, it is \slowed as a \glossterm{condition}.
        "),
        tags: vec![AbilityTag::Cold],
        upgrades: vec![
            ItemUpgrade::new(5, "Is cold and can slow", r"
                The weapon damage bonus increases to \plus2.
                In addition, the slowing attack's minimum accuracy increases to $accuracy, and it deals 2d6 \glossterm{extra damage}.
            "),
            ItemUpgrade::new(7, "Is cold and can slow", r"
                The weapon damage bonus increases to \plus4.
                In addition, the slowing attack's minimum accuracy increases to $accuracy, and the extra damage increases to 4d10.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons
}
