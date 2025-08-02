use crate::equipment::MagicWeapon::Unrestricted;
use crate::equipment::{ItemUpgrade, MagicWeapon, StandardItem};
use crate::core_mechanics::abilities::{AbilityTag, AttuneType};

// Standard weapon templates:
// * Grant minor passive effect (energy tag) and appropriately leveled maneuver
// * Grant damage or accuracy with various conditions
pub fn unrestricted() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.append(&mut energy_weapons());
    weapons.append(&mut utility_weapons());
    weapons.append(&mut composite_weapons());

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Bloodfrenzy"),
        rank: 3,
        short_description: String::from(r"Grants +2 accuracy when you injure a foe"),
        description: String::from(r"
            Whenever you \glossterm{injure} a living creature with a strike using this weapon, you \glossterm{briefly} gain a +2 accuracy bonus with \glossterm{strikes} against that creature.
            As normal, this bonus does not stack with itself, even if you injure the same creature multiple times.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants +3 accuracy when you injure a foe", r"
                The accuracy bonus increases to +3.
            "),
            ItemUpgrade::new(7, "Grants +4 accuracy when you injure a foe", r"
                The accuracy bonus increases to +4.
            "),
        ],
        ..MagicWeapon::default()
    }));

    // Assume you have a 80% hit rate (+0 vs AD 3). Expected dpr is normally 0.98.
    // With Lucky, on an 8, you have a 60% chance to crit on the explosion (crit on 5). On a 9, you
    // have a 70% chance to crit on the explosion. Those simply add to the regular dpr, so it's
    // 0.98 + 0.1 * 0.6 + 0.1 * 0.7 = 1.11, which is 13% more damage than baseline.
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Lucky"),
        rank: 2,
        short_description: String::from(r"Attack rolls explode on 8+"),
        description: String::from(r"
            When you roll an 8 or 9 on your first die for an attack roll, the attack roll \glossterm{explodes} (see \pcref{Exploding Attacks}).
            This does not affect bonus dice from explosions.
        "),
        // This adds 0.1 * 0.5 + 0.1 * 0.4 + 0.1 * 0.3 = 1.23, which is 26% more damage than baseline.
        upgrades: vec![
            ItemUpgrade::new(5, "Attack rolls explode on 5+", r"
                The die also explodes if you roll an 5, 6, or 7.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        // +1.5 damage, which is a normal value for this rank. This doesn't get any extra damage from the strength 
        // requirement because you probably want Strength anyway.
        // Also, increasing weapon damage instead of granting extra damage is situationally useful,
        // though not generally a big power swing.
        name: String::from("Brutish"),
        rank: 3,
        short_description: String::from(r"Deals +1d6-2 damage if you have 3 Str"),
        description: String::from(r"
            If your Strength is at least 3, this weapon deals +1d6 damage, but the damage is also reduced by 2.
            This changes your \glossterm{weapon damage}, and is not considered \glossterm{extra damage}.
        "),
        upgrades: vec![
            // +3.5 damage
            ItemUpgrade::new(5, "Deals +1d10-2 damage if you have 4 Str", r"
                If your Strength is at least 4, the damage die increases to 1d10.
            "),
            // +5.5 damage
            ItemUpgrade::new(7, "Deals +1d10 damage if you have 5 Str", r"
                If your Strength is at least 5, the damage die increases to 1d10 and the damage penalty is removed.
            "),
        ],
        ..MagicWeapon::default()
    }));

    // Int-based fighting is a pretty meaningful cost, so this gets +1dr.
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Educated"),
        rank: 3,
        short_description: String::from(r"Deals +1d6 damage if you have 3 Int"),
        description: String::from(r"
            If your Intelligence is at least 3, this weapon deals 1d4 \glossterm{extra damage}.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Deals +1d8 damage if you have 4 Int", r"
                If your Intelligence is at least 4, the extra damage increases to 1d8.
            "),
            ItemUpgrade::new(7, "Deals +2d6 damage if you have 5 Int", r"
                If your Intelligence is at least 5, the extra damage increases to 2d6.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Finesse"),
        rank: 3,
        short_description: String::from(r"Grants +1 accuracy if you have 3 Dex"),
        description: String::from(r"
            If your Dexterity is at least 3, you gain a +1 \glossterm{enhancement bonus} to accuracy with \glossterm{strikes} using this weapon.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Grants +2 accuracy if you have 5 Dex", r"
                The accuracy bonus increases to +2 if your Dexterity is at least 5.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Perceptive"),
        rank: 3,
        short_description: String::from(r"Grants +1 accuracy if you have 3 Per"),
        description: String::from(r"
            If your Perception is at least 3, you gain a +1 \glossterm{enhancement bonus} to accuracy with \glossterm{strikes} using this weapon.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Grants +2 accuracy if you have 5 Per", r"
                The accuracy bonus increases to +2 if your Perception is at least 5.
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
            // This is maybe a little weak, but rank 3 is overloaded and it's circumstantially
            // strong, since the non-accuracy penalties from fatigue don't really matter in combat.
            // With this weapon, you can pretty reasonably go up to -4 fatigue penalty.
            ItemUpgrade::new(4, "Gain power while fatigued", r"
                You ignore your \glossterm<fatigue penalty> when determining your \glossterm<accuracy> with \glossterm<strikes> using this weapon.
            "),
        ],
        ..MagicWeapon::default()
    }));

    // Assume you already have a 70% chance to hit and +4 accuracy with crits.
    // +4 accuracy for crits means you crit on a 10.
    // You normally have 0.7 + 0.2*0.5 + 0.1 = 0.9x hit damage per round.
    // With an Unbalanced weapon, you hit on a 5+ and crit on a 8+.
    // That means 0.6 + 0.2*0.5 + 0.3 = 1x hit damage per round.
    //
    // Assume you have a 120% hit chance (+1 vs AD 0, so you crit on 9/10).
    // Hit 100%, crit 20%, double crit 0.02 = 1.22 dpr.
    // With unbalanced you hit 100%, crit 40%, double crit 4% = 1.44 dpr.
    // That's 18% more damage, making this strong but reasonable.
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Unbalanced"),
        rank: 2,
        short_description: String::from(r"-1 accuracy, but +3 for criticals"),
        description: String::from(r"
            You take a -1 \glossterm<accuracy> penalty to strikes using this weapon.
            However, you gain a \plus3 bonus to your \glossterm{accuracy} with \glossterm{strikes} using this weapon for the purpose of determining whether you get a \glossterm{critical hit}.
        "),
        upgrades: vec![
            // In the second scenario, you hit 100%, crit 50%, and double crit 5% = 1.55 dpr.
            // That's 27% more damage than baseline, but with very high requirements, so r4 is
            // fine.
            ItemUpgrade::new(4, "-2 accuracy, but +5 for criticals", r"
                The accuracy penalty increases to -2, but the critical hit accuracy bonus increases to +6.
            "),
            // Start from 130%, so 1.33 DPR. With this, you hit 100%, crit 70%, and double crit 7% = 1.77 dpr.
            // That's 33% more damage than baseline, which is fine for r7 with such high
            // requirements.
            ItemUpgrade::new(7, "-3 accuracy, but +8 for criticals", r"
                The accuracy penalty increases to -3, but the critical hit accuracy bonus increases to +8.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Bloodfuel"),
        rank: 3,
        // Expected HP at rank 3 is approximately 25.
        // This gets +1r of extra damage for the HP cost.
        short_description: String::from(r"Can spend 4 HP for +1d4 damage"),
        description: String::from(r"
            Once per round, you can feed this weapon your blood as a \glossterm{free action}.
            When you do, you lose 4 \glossterm{hit points}.
            In exchange, you deal 1d4 \glossterm{extra damage} with strikes using this weapon during the current round.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Can spend 8 HP for +1d8 damage", r"
                The HP loss increases to 8, and the extra damage increases to 1d8.
            "),
            ItemUpgrade::new(7, "Can spend 16 HP for +2d6 damage", r"
                The HP loss increases to 16, and the extra damage increases to 2d6.
            "),
        ],
        ..MagicWeapon::default()
    }));

    // This gets -2r for the unusual circumstances
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Routing"),
        rank: 2,
        short_description: String::from(r"Grants +1d4 damage vs scared foes"),
        description: String::from(r"
            You deal 1d4 \glossterm{extra damage} with \glossterm<strikes> using this weapon against creatures that are suffering penalties for being \frightened or \panicked.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants +1d10 damage vs scared foes", r"
                The extra damage increases to 1d10.
            "),
        ],
        ..MagicWeapon::default()
    }));

    // Roughly focused, which is 0.4 EA, but the cooldown makes it closer to 0.3 EA
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Fated"),
        rank: 7,
        short_description: String::from(r"Rerolls missed attacks"),
        description: String::from(r"
            Whenever you miss with an attack using this weapon, you can reroll the attack and keep the higher result.
            After you reroll an attack in this way, you \glossterm<briefly> cannot do so again.
        "),
        ..MagicWeapon::default()
    }));

    // It would make more sense if the healing was limited by the HP remaining, but that's
    // complicated to track.
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Vampiric"),
        rank: 2,
        short_description: String::from(r"Steals HP"),
        description: String::from(r"
            At the end of each round, if you \glossterm{injured} a living creature other than yourself with a \glossterm{strike} using this weapon that round, you regain 1d10 hit points.
        "),
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        upgrades: vec![
            // -1dr for no downsides or requirements and the healing effect
            ItemUpgrade::new(4, "Deals +1 damage and steals HP", r"
                The weapon also deals 1 \glossterm{extra damage} to living creatures, and the healing increases to 3d8.
            "),
            ItemUpgrade::new(6, "Deals +1d6 damage and steals HP", r"
                The \glossterm{extra damage} increases to 1d6, and the healing increases to 5d10.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Grounded"),
        rank: 2,
        short_description: String::from(r"Grants +1 accuracy while stationary"),
        description: String::from(r"
            Whenever you make a \glossterm{strike}, if you have not changed location since start of the round, you gain a \plus1 \glossterm{enhancement bonus} to \glossterm{accuracy} with that strike.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Grants +2 accuracy while stationary", r"
                The accuracy bonus increases to +2.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Psionic Burst"),
        rank: 1,
        short_description: String::from(r"Can attack Mental defense"),
        description: String::from(r"
            As a standard action, you can make a mundane \glossterm<strike> using this weapon that is imbued with psychic power.
            The strike is made against the target's Mental defense instead of its Armor defense, and it gains the \atCompulsion tag.
        "),
        ..MagicWeapon::default()
    }));

    // A little sketchy at 3, but how often do you make Mental defense strikes? Compulsion is more
    // often a downside than an upside.
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Psionic"),
        rank: 3,
        short_description: String::from(r"Is psychic, +1 damage"),
        description: String::from(r"
            This weapon's striking surface is ephemeral, and it echoes the thoughts of anyone touching it back into their head.
            You can suppress or resume its psionic nature as a \glossterm{free action}.
            While the weapon is psionic:
            \begin{raggeditemize}
                \item All strikes with it have the \atCompulsion tag. This means that it is unable to damage most objects.
                \item It deals 1 \glossterm{extra damage}.
                \item Creatures take a -2 penalty to Mental defense against your strikes with it.
            \end{raggeditemize}
        "),
        tags: vec![AbilityTag::Compulsion, AbilityTag::personal_attunement()],
        upgrades: vec![
            ItemUpgrade::new(5, "Is psychic, +1d6 damage", r"
                The extra damage increases to 1d6.
            "),
            ItemUpgrade::new(7, "Is psychic, +1d10 damage", r"
                The extra damage increases to 1d10.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Toxic Burst"),
        rank: 1,
        short_description: String::from(r"Can attack Fortitude defense"),
        description: String::from(r"
            As a standard action, you can make a mundane \glossterm<strike> using this weapon that transforms the striking surface to poison.
            The strike is made against the target's Fortitude defense instead of its Armor defense, and it gains the \atPoison tag.
        "),
        tags: vec![AbilityTag::Poison, AbilityTag::personal_attunement()],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Toxic"),
        rank: 4,
        short_description: String::from(r"Is poisonous, +1d4 damage"),
        description: String::from(r"
            This weapon's striking surface is liquified into a sinister poison.
            You can suppress or resume its poisonous nature as a \glossterm{free action}.
            While the weapon is poisonous:
            \begin{raggeditemize}
                \item All strikes with it have the \atPoison tag. This means that it is unable to damage most objects.
                \item It deals 1d4 \glossterm{extra damage}.
                \item Poisons delivered with strikes using it gain a +2 accuracy bonus.
            \end{raggeditemize}
        "),
        tags: vec![AbilityTag::Poison, AbilityTag::personal_attunement()],
        upgrades: vec![
            ItemUpgrade::new(6, "Is poisonous, +1d8 damage", r"
                The extra damage increases to 1d8.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons
}

// These weapons aren't expected to be primary damage dealers. They have weird utility options that
// make them useful for applying unique debuffs or other effects.
fn utility_weapons() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    // TODO: weird rank, unclear scaling? Can't make the range too long or else you can
    // teleport to allies / bags of rats with a dimensional trace longbow.
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Dimensional Trace"),
        rank: 3,
        short_description: String::from(r"Can briefly teleport next to struck creature"),
        description: String::from(r"
            As a standard action, you can make a \glossterm{strike} using this weapon.
            Each creature you hit with the strike \glossterm{briefly} has a dimensional trace applied to it.
            While the dimensional trace lasts, you can activate this weapon as a \glossterm{minor action}.
            When you do, you \glossterm{teleport} into the closest unoccupied square adjacent to a traced creature, if such a space exists within \medrange.
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
        rank: 4,
        short_description: String::from(r"Can inflict a curse"),
        description: String::from(r"
            Whenever you would inflict a \glossterm{condition} on a non-cursed creature with a strike using this weapon, that condition becomes a curse instead.
            The curse cannot be removed by effects that remove conditions, and lasts until the target takes a \glossterm{short rest}.
            If the effect has a special method of being removed, such as the \spell{entangle} spell, that removal method still functions normally.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Can inflict multiple curses", r"
                The target does not have to be non-cursed, allowing you to apply multiple curses to the same creature.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Seeking"),
        rank: 2,
        short_description: String::from(r"Ignores cover and concealment"),
        description: String::from(r"
            This weapon automatically veers towards its intended target.
            Your \glossterm{strikes} with the weapon are unaffected by \glossterm{cover} and 20\% \glossterm{miss chances}, such as from \glossterm{concealment}.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Ignores cover and miss chances", r"
                Your strikes with the weapon are also unaffected by 50\% miss chances.
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
            It has no effect on anything without a soul, such as an object or construct.
            Creatures with a soul cannot be \trait{impervious} or \trait{immune} to damage from this weapon.

            Attacks with this weapon deal no damage immediately.
            This means that any effects which trigger when you deal damage with the attack, such as conditions, do not happen.
            Instead, the damage is delayed.
            Damage that would be dealt by the weapon can be delayed indefinitely.
            While the damage is delayed, it cannot be removed by any means short of the destruction of this weapon or the creature's death.

            As a \glossterm<minor action>, you can hurt yourself with this weapon to activate it.
            This deals a single point of damage to you.
            When you do, each creature with delayed damage from this weapon takes damage equal to the total delayed damage built up by the weapon for that target.
            Creatures farther than one mile away from the weapon are unaffected by this damage.
            This ability expends all delayed damage built up by the weapon for all targets, including targets farther than one mile from the weapon.
        "),
        ..MagicWeapon::default()
    }));

    weapons
}

fn energy_weapons() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Prismatic"),
        rank: 4,
        short_description: String::from(r"+1d4 damage, is energetic"),
        description: String::from(r"
            This weapon is infused with prismatic energy.
            You can suppress or resume this infusion as a \glossterm{free action}.
            While the weapon is infused:
            \begin{raggeditemize}
                \item All strikes with it have the \atCold, \atElectricity, and \atFire tags.
                \item It deals 1d4 \glossterm{extra damage}.
                \item It sheds light in a 15 foot radius of \glossterm{bright illumination}.
            \end{raggeditemize}
        "),
        tags: vec![AbilityTag::Cold, AbilityTag::Electricity, AbilityTag::Fire, AbilityTag::personal_attunement()],
        upgrades: vec![
            ItemUpgrade::new(6, "+1d8 damage, is energetic", r"
                The extra damage increases to 1d8.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Vibrating"),
        rank: 2,
        short_description: String::from(r"+1 damage, -10 Stealth"),
        description: String::from(r"
            This weapon continuously emits a low-pitched rumbling noise and vibrates in the hand.
            Strikes with it deal 1 \glossterm{extra damage}.
            However, you take a -10 penalty to Stealth checks.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "+1d4 damage, -10 Stealth", r"
                The extra damage increases to 1d4.
            "),
            ItemUpgrade::new(6, "+1d8 damage, -10 Stealth", r"
                The extra damage increases to 1d8.
            "),
        ],
        ..MagicWeapon::default()
    }));

    // Target is 125% of High power scaling damage without significant power investment, but with
    // hitting an extra defense, damage delay, and item slot.
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Flaming"),
        rank: 3,
        short_description: String::from(r"Is burning and ignites"),
        description: String::from(r"
            This weapon constantly burns.
            You can suppress or resume this fire as a \glossterm{free action}.
            While the weapon is burning:
            \begin{raggeditemize}
                \item All strikes with it have the \atFire tag.
                \item Whenever you hit a creature with a strike using it, the creature burns.
                    It takes 1d6 damage during your next action.
                    This damage is doubled by critical hits and attacks that deal double damage.
                \item It sheds red light in a 15 foot radius of \glossterm{bright illumination}.
            \end{raggeditemize}
        "),
        tags: vec![AbilityTag::Fire, AbilityTag::personal_attunement()],
        upgrades: vec![
            ItemUpgrade::new(5, "Is burning and ignites", r"
                The damage increases to 1d10.
            "),
            ItemUpgrade::new(7, "Is burning and ignites", r"
                The damage increases to 2d8.
            "),
        ],
        ..MagicWeapon::default()
    }));

    // How strong is chaining once? Electromancy spells treat chain (1) as being worth -1dr, which
    // is about a 20% damage loss, but that's a bit cheating since it's sphere-specific. Say that
    // this is a bit stronger than that, so it's rank 4.
    weapons.push(Unrestricted(StandardItem {
        name: String::from("Arcing"),
        rank: 4,
        short_description: String::from(r"Is charged and chains"),
        description: String::from(r"
            This weapon continuously crackles with electricity.
            You can suppress or resume this charge as a \glossterm{free action}.
            While the weapon is charged:
            \begin{raggeditemize}
                \item All strikes with it have the \atElectricity tag.
                \item Your strikes using it \glossterm{chain} once.
                \item It sheds yellow light in a 5 foot radius of \glossterm{bright illumination}.
            \end{raggeditemize}
        "),
        tags: vec![AbilityTag::Electricity, AbilityTag::personal_attunement()],
        upgrades: vec![
            ItemUpgrade::new(7, "+1d4 damage, is charged and chains", r"
                While the weapon is charged, it also deals 1d4 \glossterm{extra damage}.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Freezing"),
        rank: 2,
        short_description: String::from(r"+1 damage, is chilled"),
        description: String::from(r"
            This weapon is bitterly cold to the touch.
            You can suppress or resume this chill as a \glossterm{free action}.
            While the weapon is chilled:
            \begin{raggeditemize}
                \item All strikes with it have the \atCold tag.
                \item Your strikes using it deal 1 \glossterm{extra damage}.
                \item It sheds blue light in a 5 foot radius of \glossterm{bright illumination}.
            \end{raggeditemize}
        "),
        tags: vec![AbilityTag::Cold, AbilityTag::personal_attunement()],
        upgrades: vec![
            ItemUpgrade::new(4, "+1d4 damage, is chilled", r"
                The extra damage increases to 1d4.
            "),
            ItemUpgrade::new(6, "+1d8 damage, is chilled", r"
                The extra damage increases to 1d8.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons
}

fn composite_weapons() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Composite Weapon, 1st"),
        rank: 2,
        short_description: String::from(r"Has two rank 1 properties"),
        description: String::from(r"
            This weapon has two different rank 1 magic weapon properties.
            Each property must not already require a \glossterm{deep attunement}.
            You cannot choose a composite weapon as your \glossterm{legacy item} (see \pcref{Legacy Items}).
        "),
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Composite Weapon, 2nd"),
        rank: 3,
        short_description: String::from(r"Has two rank 2 or lower properties"),
        description: String::from(r"
            This weapon has two different magic weapon properties that are rank 2 or lower.
            Each property must not already require a \glossterm{deep attunement}.
            You cannot choose a composite weapon as your \glossterm{legacy item} (see \pcref{Legacy Items}).
        "),
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        ..MagicWeapon::default()
    }));

    weapons.push(Unrestricted(StandardItem {
        name: String::from("Composite Weapon, 3rd"),
        rank: 4,
        short_description: String::from(r"Has two rank 3 or lower properties"),
        description: String::from(r"
            This weapon has two different magic weapon properties that are rank 3 or lower.
            Each property must not already require a \glossterm{deep attunement}.
            You cannot choose a composite weapon as your \glossterm{legacy item} (see \pcref{Legacy Items}).
        "),
        tags: vec![AbilityTag::Attune(AttuneType::Deep)],
        ..MagicWeapon::default()
    }));

    fn nth(weapons: &mut Vec<MagicWeapon>, n: i32) {
        weapons.push(Unrestricted(StandardItem {
            name: format!("Composite Weapon, {}th", n),
            rank: n+1,
            short_description: format!("Has two rank {} or lower properties", n),
            description: String::from(r"
                This weapon has two different magic weapon properties that are rank 2 or lower.
                Each property must not already require a \glossterm{deep attunement}.
                You cannot choose a composite weapon as your \glossterm{legacy item} (see \pcref{Legacy Items}).
            "),
            tags: vec![AbilityTag::Attune(AttuneType::Deep)],
            ..MagicWeapon::default()
        }));
    }

    nth(&mut weapons, 4);
    nth(&mut weapons, 5);
    nth(&mut weapons, 6);
    nth(&mut weapons, 7);

    weapons
}
