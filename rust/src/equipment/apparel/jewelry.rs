use crate::core_mechanics::abilities::AbilityTag;
use crate::equipment::Apparel::{Amulet, Ring};
use crate::equipment::{Apparel, ItemUpgrade, StandardItem};

pub fn jewelry() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.append(&mut amulets());
    apparel.append(&mut rings());

    apparel
}

// Class ability improvements / alterations
fn amulets() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Undead Control"),
        rank: 3,
        short_description: String::from(r"Can control undead"),
        description: String::from(r"
            Whenever you would kill an undead creature with a healing ability, you may activate this amulet.
            If the creature's \glossterm{character rank} is less than or equal to your rank, and it is not \glossterm{elite}, it becomes \dominated by you instead of dying.

            This effect lasts for 24 hours.
            You can only control one undead at a time in this way.
            If you activate this amulet again, the effect ends on any previously dominated undead.
            % Necessary to prevent reapplying this every 10 minutes to keep a permanent minion
            Whenever this effect ends for any reason, the previously dominated creature immediately dies.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, r"Can permanently control some undead", r"
                If the creature is \trait{simple-minded}, this effect is permanent.
                It is still removed if you dominate a different undead.
            "),
            ItemUpgrade::new(7, r"Can permanently control undead", r"
                The effect is also permanent if the creature's character rank is less than yours, even if it is not simple-minded.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of the Undead Horde"),
        rank: 5,
        short_description: String::from(r"Can control several undead"),
        description: String::from(r"
            This item functions like a \mitem{amulet of undead control}, except that you can control up to three different undead creatures.
            Each individual creature must be \trait{simple-minded}, and its \glossterm{rank} must be at least two lower than yours.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, r"Can control many undead", r"
                You can control up to five undead rather than up to three.
            "),
        ],      
        ..Apparel::default()
    }));

    // +1 Armor and Reflex is half of Shielded, so 0.8 EA.
    // But rage requirement means it's about 75% effective, so about 0.6 EA.
    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Controlled Rage"),
        rank: 2,
        short_description: String::from(r"Reduces defense penalties from \ability{rage}"),
        description: String::from(r"
            Your penalties to Armor and Reflex defense from using the \ability{rage} barbarian ability are reduced by 1.
        "),
        upgrades: vec![
            // Shielded is normally 1.6 EA, or 1.2 with rage requirement.
            ItemUpgrade::new(7, r"Removes defense penalties from \ability{rage}", r"
                The penalty reduction increases to 2, which normally removes the defense penalty entirely.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Mystic Rage"),
        rank: 2,
        short_description: String::from(r"\ability{Rage} also affects magical attacks"),
        description: String::from(r"
            Your accuracy bonus from the \ability{rage} barbarian ability also applies to \magical abilities.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, r"+1 magical power, and \ability{rage} also affects magical attacks", r"
                You also gain a +1 \glossterm{enhancement bonus} to your \magical \glossterm{power}.
            "),
        ],
        ..Apparel::default()
    }));

    // TODO: document why these values were chosen
    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Divine Healing"),
        rank: 2,
        short_description: String::from(r"Grants +1d8 healing with \ability{divine aid} and \ability{lay on hands}"),
        description: String::from(r"
            When you use the \ability<divine aid> cleric ability or the \ability<lay on hands> paladin ability, the target regains an additional 1d8 hit points.
            This is still limited by half the target's maximum hit points unless you increase your fatigue, as normal.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, r"Grants +2d8 healing with \ability{divine aid} and \ability{lay on hands}", r"
                The extra healing increases to 2d8.
            "),
            ItemUpgrade::new(6, r"Grants +4d8 healing with \ability{divine aid} and \ability{lay on hands}", r"
                The extra healing increases to 4d8.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Revivification"),
        rank: 7,
        short_description: String::from(r"Reduces fatigue from \ability<revivify>"),
        description: String::from(r"
            When you use the \ability<revivify> cleric ability, you only increase your \glossterm<fatigue level> by three instead of by four.
        "),
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Shared Discipline"),
        rank: 4,
        short_description: String::from(r"Using \ability<cleansing discipline> also helps an adjacent ally"),
        description: String::from(r"
            Whenever you use the \ability<cleansing discipline> fighter ability, one \glossterm<ally> adjacent to you can also remove a \glossterm<condition>.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, r"Using \ability<cleansing discipline> also helps a nearby ally", r"
                The ally can be within \medrange.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Distant Protector's Amulet"),
        rank: 3,
        short_description: String::from(r"Increases range of \ability{protect}"),
        description: String::from(r"
            When you use the \ability<protect> fighter ability or the \ability{divine protection} cleric ability, the ally can be within \shortrange instead of adjacent.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, r"Greatly increases range of \ability{protect}", r"
                The range increases to \medrange.
            "),
            ItemUpgrade::new(7, r"Greatly increases range of \ability{protect}", r"
                The range increases to \distrange.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Sturdy Companionship"),
        rank: 3,
        short_description: String::from(r"Grants +1 defenses to animal allies"),
        description: String::from(r"
            Each creature you command with the \ability<natural servant> druid ability or the \ability<animal companion> ranger ability gains a +1 \glossterm<enhancement bonus> to all of its defenses.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, r"Grants +1 defenses and injury resistance to animal allies", r"
                Each creature's \glossterm{injury point} is also halved.
            "),
            ItemUpgrade::new(7, r"Grants +2 defenses and injury resistance to animal allies", r"
                The defense bonus increases to +2.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Perfect Equality"),
        rank: 5,
        short_description: String::from(r"Improves \ability<perfect body> on your lowest attribute"),
        description: String::from(r"
            If you have the \ability<perfect body> monk ability, you gain a +1 \glossterm{enhancement bonus} to your lowest physical attribute.
            If your two lowest physical attributes are equal, this amulet has no effect.
        "),
        ..Apparel::default()
    }));

    // Accuracy is normally rank 3, but this isn't enhancement bonus, so it's fancy
    apparel.push(Amulet(StandardItem {
        name: String::from("Holy Avenger's Amulet"),
        rank: 3,
        short_description: String::from(r"Grants +1 accuracy with \ability<smite> when avenging allies"),
        description: String::from(r"
            When you use the \ability<smite> paladin ability, you gain a +1 \glossterm<accuracy> bonus against creatures that dealt damage to one of your \glossterm<allies> during the previous round.
            This accuracy bonus is doubled if the target caused one of your allies to gain a vital wound during the previous round.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, r"Grants +2 accuracy with \ability<smite> when avenging allies", r"
                The accuracy bonus increases to +2.
            "),
        ],
        ..Apparel::default()
    }));

    // This is kind of a scaling fix; Smite doesn't work as well with Heavy weapons at very high
    // levels.
    apparel.push(Amulet(StandardItem {
        name: String::from("Zealous Titan's Amulet"),
        rank: 5,
        short_description: String::from(r"Deal extra damage with \ability<smite> using \weapontag<Heavy> weapons"),
        // 2.24x normal damage / 1.88x normal damage = 19% more damage, which is on par for a
        // rank 5 attunement.
        description: String::from(r"
            When you use the \ability<smite> paladin ability using a \weapontag{Heavy} weapon, you deal \glossterm{extra damage} equal to half your \glossterm{power}.
        "),
        upgrades: vec![
            // 2.15x / 1.69x = +27% more damage
            ItemUpgrade::new(7, r"Deal extra damage with \ability<smite> using \weapontag<Heavy> weapons", r"
                The extra damage increases to be equal to your power.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Twinhunter Amulet"),
        rank: 3,
        short_description: String::from(r"Adds an additional target with \ability<quarry>"),
        description: String::from(
            r"
                When you use the \ability<quarry> ranger ability, you may target an additional creature.
            ",
        ),
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Swarmhunter Amulet"),
        rank: 6,
        short_description: String::from(r"Allows unlimited targets with \ability<quarry>"),
        description: String::from(r"
            When you use the \ability<quarry> ranger ability, you may target any number of creatures.
        "),
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Distant Stealth"),
        rank: 2,
        short_description: String::from(r"Increases range with \ability<sneak attack>"),
        description: String::from(r"
            When you use the \ability<sneak attack> rogue ability, you may target a creature within \medrange instead of \shortrange.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, r"Increases range with \ability<sneak attack>", r"
                The range increases to \distrange.
            "),
            ItemUpgrade::new(7, r"Increases range and distant precision with \ability<sneak attack>", r"
                You also reduce your \glossterm{longshot penalty} with \ability{sneak attack} by 2.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Mighty Stealth"),
        rank: 3,
        short_description: String::from(r"Can \ability<sneak attack> with any weapon"),
        description: String::from(r"
            You can use the \ability<sneak attack> rogue ability with any weapon.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, r"Can \ability<sneak attack> with any weapon for extra damage", r"
                When you \ability{sneak attack} with a \weapontag{Heavy} weapon, it deals 1d6 \glossterm{extra damage}.
            "),
            ItemUpgrade::new(7, r"Can \ability<sneak attack> with any weapon for extra damage", r"
                The extra damage increases to 2d10.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Exemplar's Amulet"),
        rank: 2,
        short_description: String::from(r"Increase \ability<skill exemplar> bonus with untrained skills by 1"),
        description: String::from(r"
            If you have the \ability<skill exemplar> rogue ability, you gain a +1 \glossterm<enhancement bonus> to all untrained skills.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, r"Increase \ability<skill exemplar> bonus with untrained skills by 3", r"
                The bonus increases to +3.
            "),
            ItemUpgrade::new(7, r"Increase \ability<skill exemplar> bonus with untrained skills by 5", r"
                The bonus increases to +5.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Wild Might"),
        rank: 3,
        short_description: String::from(r"+1d4 damage, but increased chaos with \ability{wildspell}"),
        description: String::from(r"
            When you use your \ability{wildspell} sorcerer ability, the spell deals 1d4 \glossterm{extra damage}.
            However, you take a -1 penalty to your wild magic rolls.
            If your result is 0 or less, you are the only target of the spell.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, r"+1d8 damage, but increased chaos with \ability{wildspell}", r"
                The extra damage increases to 1d8.
            "),
            ItemUpgrade::new(7, r"+2d6 damage, but increased chaos with \ability{wildspell}", r"
                The extra damage increases to 2d6.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Wild Control"),
        rank: 3,
        short_description: String::from(r"Reduces chaos with \ability{wildspell}"),
        description: String::from(r"
            When you use the \ability{wildspell} ability, instead of rolling 1d10 for your wild magic effect, you roll 2d6\minus1.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, r"Reduces and improves chaos with \ability{wildspell}", r"
                The wild magic roll improves to 2d6.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Haranguing Amulet"),
        rank: 1,
        short_description: String::from(r"Goad with \ability{denounce the heathens}"),
        description: String::from(r"
            You can use the Intimidate skill in place of the Persuasion skill for the \ability{denounce the heathens} cleric ability.
            When you do, each target is \goaded by you instead of stunned.
        "),
        tags: vec![AbilityTag::Emotion, AbilityTag::personal_attunement()],
        ..Apparel::default()
    }));

    apparel
}

// Cleansing
// Magical defenses
// Magic manipulation
fn rings() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.push(Ring(StandardItem {
        name: String::from("Baneswallow Ring"),
        rank: 3,
        short_description: String::from(r"Can exert and remove a condition to gain power"),
        description: String::from(
            r"
            You can activate this ring as a standard action.
            When you do, you may remove a \glossterm{condition} affecting you.
            If you remove a condition in this way, you are \glossterm{briefly} \empowered.

            After you activate this item, you increase your \glossterm<fatigue level> by one.
        ",
        ),
        upgrades: vec![ItemUpgrade::new(
            5,
            "Can remove a condition to gain power",
            r"
                Activating this ring does not increase your fatigue level.
            ",
        )],
        ..Apparel::default()
    }));

    apparel.push(Ring(StandardItem {
        name: String::from("Ring of Desperate Breath"),
        rank: 1,
        short_description: String::from("Can exert to breathe briefly"),
        description: String::from(r"
            You can activate this item as a \glossterm<minor action>.
            When you do, you increase your \glossterm<fatigue level> by one, and you can breathe in clean, fresh air regardless of your environment for one minute.
            This can be used in emergencies to save yourself from drowning or other perils.
        "),
        tags: vec![AbilityTag::Air, AbilityTag::personal_attunement()],
        ..Apparel::default()
    }));

    apparel.push(Ring(StandardItem {
        name: String::from("Ring of Water Breathing"),
        rank: 3,
        short_description: String::from("Allows breathing water like air"),
        description: String::from(
            r"
            You can breathe water as easily as a human breathes air.
            This does not grant you the ability to breathe other liquids.
        ",
        ),
        tags: vec![AbilityTag::Water, AbilityTag::personal_attunement()],
        ..Apparel::default()
    }));

    apparel.push(Ring(StandardItem {
        name: String::from("Ring of the True Form"),
        rank: 2,
        short_description: String::from("Impervious to form-altering attacks"),
        description: String::from(r"
            You are \impervious to attacks from the \sphere<polymorph> sphere.
            This bonus also applies against other attacks that significantly alter your physical form, such as an aboleth's slime.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Immune to form-altering attacks", r"
                You become immune instead of impervious.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Ring(StandardItem::skill_item("Liar's Ring", "Deception")));

    apparel.push(Ring(StandardItem {
        name: String::from("Ring of Nourishment"),
        rank: 2,
        short_description: String::from("Provides food and water"),
        description: String::from(r"
            You continuously gain nourishment, and no longer need to eat or drink.
            This ring must be worn for 24 hours before it begins to work.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Provides food, water, and sleep", r"
                You also need only a quarter of your normal amount of sleep (or similar activity, such as elven trance) each day.
            "),
        ],
        tags: vec![AbilityTag::Creation, AbilityTag::personal_attunement()],
        ..Apparel::default()
    }));

    apparel.push(Ring(StandardItem {
        name: String::from("Hexward Ring"),
        rank: 4,
        short_description: String::from("Grants +1 defenses against targeted spells"),
        description: String::from(r"
            You gain a +1 bonus to your defenses against \glossterm{targeted} spells.
            This does not protect you from abilities that affect an area, or from magical abilities that are not spells.
        "),
        upgrades: vec![
            ItemUpgrade::new(7, "Grants +2 defenses against targeted spells", r"
                The bonus increases to +2.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Ring(StandardItem {
        name: String::from("Ring of Spell Investment"),
        rank: 3,
        short_description: String::from("Can invest a spell to gain its effect later"),
        description: String::from(r"
            When you or an adjacent \glossterm<ally> casts a spell that does not have the \abilitytag<Attune> or \abilitytag<Sustain> tags,
                you can invest the magic of the spell in the ring.
            If you do, the spell does not have its normal effect.
            All decisions about the spell's effect, except for targeting, must be made at the time that the spell is invested in this way.
            The \textit<desperate exertion> ability cannot be used to affect the spell, either at the time it is invested or when it is activated.
            Only one spell can be stored this way.

            You can activate this ring as a standard action.
            When you do, you cause the effect of the last spell invested in the ring.
            You choose the area and targets affected by the spell at this time.
            This does not require \glossterm<verbal components> or \glossterm<somatic components>, even if they would normally be required to cast the spell.
            The spell's effect is determined based on the \glossterm<power> and other abilities of the original caster who invested the spell into the ring, not yours.
            You do not have to have the ability to cast the spell to activate a spell in this way.

            After you use a spell in this way, the energy in the ring is spent, and you must invest a new spell to activate the ring again.
            Any lingering effects of spells activated through this ring automatically end after ten minutes, and whenever you invest a new spell into the ring.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Can invest spells to gain their effects later", r"
                You can invest up to two spells in the ring.
                When you activate the ring, you choose which spell to use.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Ring(StandardItem {
        name: String::from("Cleansing Ring"),
        rank: 2,
        short_description: String::from("Can exert to remove a condition"),
        description: String::from(
            r"
            You can activate this ring as a standard action.
            When you do, you remove one \glossterm<condition> affecting you.

            After you activate this item, you increase your \glossterm<fatigue level> by one.
        ",
        ),
        upgrades: vec![ItemUpgrade::new(
            4,
            "Can remove a condition",
            r"
                Activating this item does not increase your fatigue level.
            ",
        )],
        ..Apparel::default()
    }));

    apparel.push(Ring(StandardItem {
        name: String::from("Quickcleanse Ring"),
        rank: 5,
        short_description: String::from("Can exert to quickly remove a condition"),
        description: String::from(
            r"
            You can activate this ring as a \glossterm{minor action}.
            When you do, you remove one \glossterm<condition> affecting you.

            After you activate this item, you increase your \glossterm<fatigue level> by two.
        ",
        ),
        upgrades: vec![ItemUpgrade::new(
            7,
            "Can exert to quickly remove a condition",
            r"
                Activating this item only increases your fatigue level by one.
            ",
        )],
        ..Apparel::default()
    }));

    apparel
}
