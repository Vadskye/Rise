use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
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
            If the creature has a \glossterm{rank} less than or equal to your rank, and it is not \glossterm{elite}, it becomes \dominated by you instead of dying.

            This effect lasts for 24 hours.
            You can only control one undead at a time in this way.
            If you activate this amulet again, the effect ends on any previously dominated undead.
            % Necessary to prevent reapplying this every 10 minutes to keep a permanent minion
            Whenever this effect ends for any reason, the previously dominated creature immediately dies.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, r"Can permanently control undead", r"
                The effect is permanent.
                It is still removed if you dominate a different undead. 
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of the Undead Horde"),
        rank: 5,
        short_description: String::from(r"Can control many undead"),
        description: String::from(r"
            This item functions like a \mitem{amulet of undead control}, except that you can control up to five different undead creatures.
            Each individual undead creature must have a \glossterm{rank} lower than yours.
        "),
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
        short_description: String::from(r"Accuracy from \ability{rage} affects magical attacks"),
        description: String::from(r"
            Your accuracy bonus from the \ability{rage} barbarian ability also applies to \magical abilities.
        "),
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
            ItemUpgrade::new(7, r"Using \ability<cleansing discipline> also helps an ally", r"
                The ally can be within \medrange instead of adjacent.
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
            ItemUpgrade::new(6, r"Greatly increases range of \ability{protect}", r"
                The range increases to \longrange.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Sturdy Companionship"),
        rank: 2,
        short_description: String::from(r"Grants +8 hit points to animal allies"),
        description: String::from(r"
            Each creature you command with the \ability<natural servant> druid ability or the \ability<animal companion> ranger ability gains a +8 \glossterm<enhancement bonus> to its \glossterm<hit points>.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, r"Grants +16 hit points to animal allies", r"
                The bonus increases to +16.
            "),
            ItemUpgrade::new(6, r"Grants +32 hit points to animal allies", r"
                The bonus increases to +32.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Perfect Equality"),
        rank: 5,
        short_description: String::from(r"Improves \ability<perfect body> on your lowest attribute"),
        description: String::from(r"
            If you have the \ability<perfect body> monk ability, you gain a +1 bonus to your lowest physical attribute.
            If your two lowest physical attributes are equal, this amulet has no effect.
        "),
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Holy Avenger's Amulet"),
        rank: 3,
        short_description: String::from(r"Grants +1 accuracy with \ability<smite> when avenging allies"),
        description: String::from(r"
            When you use the \ability<smite> paladin ability, you gain a +1 \glossterm<accuracy> bonus against creatures that dealt damage to one of your \glossterm<allies> during the previous round.
            This accuracy bonus is doubled if the target caused one of your allies to gain a vital wound during the previous round.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, r"Grants +2 accuracy with \ability<smite> when avenging allies", r"
                The accuracy bonus increases to +2.
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
        rank: 7,
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
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Mighty Stealth"),
        rank: 3,
        short_description: String::from(r"Can \ability<sneak attack> with non-Light weapons"),
        description: String::from(r"
            You can use the \ability<sneak attack> rogue ability with any weapon that you use in one hand.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, r"Can \ability<sneak attack> with any weapon", r"
                You can \ability{sneak attack} with any weapon, including \weapontag{Heavy} weapons held in two hands.
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
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Wild Magic Amulet"),
        rank: 3,
        short_description: String::from(r"Increases damage and chaos with \ability{wild magic}"),
        description: String::from(r"
            The extra damage you gain from the \ability{wildspell} sorcerer ability increases by 1d6.
            However, you take a -2 penalty to your wild magic rolls.
            If your result is 0 or less, you are the only target of the spell.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, r"Increases damage and chaos with \ability{wild magic}", r"
                The extra damage is doubled, rather than calculated as if you were one rank higher.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Amulet(StandardItem {
        name: String::from("Amulet of Wild Control"),
        rank: 3,
        short_description: String::from(r"Reduces damage and chaos with \ability{wild magic}"),
        description: String::from(r"
            The extra damage you gain from the \ability{wildspell} sorcerer ability is calculated as if your rank in that archetype was one lower, to a minimum of 1.
            However, you gain a +1 bonus to your wild magic rolls.
            A result of 11 or more is treated as a 10.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, r"Reduces power and chaos with \ability{wild magic}", r"
                The rank penalty for calculating extra damage increases to two ranks, but the wild magic roll bonus increases to +2.
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
        description: String::from(r"
            You can activate this ring as a standard action.
            When you do, you may remove a \glossterm{condition} affecting you.
            If you remove a condition in this way, you are \glossterm{briefly} \empowered.

            After you activate this item, you increase your \glossterm<fatigue level> by one.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Can remove a condition to gain power", r"
                Activating this ring does not increase your fatigue level.
            "),
        ],
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
