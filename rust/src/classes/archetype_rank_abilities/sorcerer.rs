use crate::classes::archetype_rank_abilities::RankAbility;

use crate::core_mechanics::{Defense, Resource};
use crate::creatures::Modifier;

use super::standard_modifiers::add_standard_spell_modifiers;

pub fn arcane_magic<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            name: "Arcane Spells",
            is_magical: true,
            rank: 1,
            description: r"
                Your innate talents grant you the ability to use arcane magic.
                You gain access to one arcane \glossterm{mystic sphere}, plus the \sphere{universal} mystic sphere (see \pcref{Arcane Mystic Spheres}).
                You may spend \glossterm{insight points} to gain access to one additional arcane \glossterm{mystic sphere} per two \glossterm{insight points}.
                You can only learn arcane spells from arcane mystic spheres that you have access to.

                You automatically learn all \glossterm{cantrips} from each mystic sphere you have access to.
                In addition, you learn two rank 1 arcane \glossterm{spells}.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per insight point.

                Arcane spells require both \glossterm{verbal components} and \glossterm{somatic components} to cast (see \pcref{Casting Components}).
                Unless otherwise noted in a spell's description, casting any spell requires a \glossterm{standard action}.
                For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.

                When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
                    you can forget any number of spells you know to learn that many new spells in exchange,
                    including spells of the higher rank.

                \advancement The maximum rank of arcane spells that you can learn is equal to your rank in this archetype.
                Arcane spells also increase in power in unique ways based on your rank in this archetype, as indicated in their descriptions.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Arcane Spells+",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional arcane spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Arcane Spells+",
            is_magical: true,
            rank: 4,
            description: r"
                You learn an additional arcane spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Arcane Spells+",
            is_magical: true,
            rank: 7,
            description: r"
                You learn an additional arcane spell.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \textit{mage armor} ability as a standard action.
                \begin{magicalactiveability}{Mage Armor}
                    \rankline
                    You create a translucent suit of magical armor on your body and over your hands.
                    This functions like body armor that provides a \plus2 bonus to your Armor defense and has no \glossterm{encumbrance}.
                    It also provides a bonus to \glossterm{damage resistance} equal to your rank in this archetype.

                    You can also use a \glossterm{free hand} to wield the barrier as a shield.
                    This functions like a buckler, granting you a \plus1 bonus to your Armor defense, except that you do not need to be proficient with light armor.
                    Since this bonus comes from a shield, it does not stack with the benefits of using any other shield.

                    This ability lasts until you use it again or until you \glossterm{dismiss} it as a free action.
                    In addition, it is automatically dismissed if you wear other body armor of any kind.
                \end{magicalactiveability}
            ",
            // Assuming no other armor
            modifiers: Some(vec![
                Modifier::Defense(Defense::Armor, 3),
                Modifier::DamageResistance(2),
            ]),
        },
        RankAbility {
            name: "Mage Armor+",
            is_magical: true,
            rank: 3,
            description: r"        
                The damage resistance bonus increases to twice your rank in this archetype.
            ",
            // Rank 2: 4. Rank 3: 9.
            modifiers: None,
        },
        RankAbility {
            name: "Mage Armor+",
            is_magical: true,
            rank: 6,
            description: r"
                The damage resistance bonus increases to three times your rank in this archetype.
                In addition, the defense bonus from the body armor increases to \plus3.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Armor, 1)]),
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 2,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(4)]),
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(9)]),
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 4,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(12)]),
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 5,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(15)]),
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 6,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(24)]),
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(28)]),
        },
    ];
    add_standard_spell_modifiers(&mut abilities);
    return abilities;
}

pub fn arcane_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Metamagic",
            is_magical: true,
            rank: 1,
            description: r"
                You learn how to further refine your spellcasting abilities.
                Choose two metamagic abilities from the list below.
                You can also spend \glossterm{insight points} to learn one additional metamagic ability per insight point.

                Some metamagic abilities affect specific spells.
                You can only choose spells with a rank no higher than your rank in this archetype.
                In addition, you cannot choose the same spell with more than two metamagic abilities.
                {
                    \parhead{Distant Spell} Choose an arcane \glossterm{spell} you know with a standard \glossterm{range}: Short, Medium, Long, Distant, or Extreme.
                        You increase that spell's range to the next standard range category, to a maximum of Extreme range.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                    \parhead{Precise Spell} Choose an arcane \glossterm{spell} you know.
                        You gain a \plus1 bonus to \glossterm{accuracy} with that spell.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                    \parhead{Powerful Spell} Choose a pact \glossterm{spell} you know.
                        You gain a +2 bonus to your \glossterm{magical power} with that spell.
                        This bonus increases to +3 at rank 4, and to +4 at rank 7.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                    \parhead{Widened Spell} Choose an arcane \glossterm{spell} you know with a standard \glossterm{area}: Small, Medium, Large, Huge, or Gargantuan.
                        You increase that spell's area to the next standard area category, to a maximum of a Gargantuan area.
                        You can choose this ability multiple times, choosing a different spell each time.
                        Whenever you learn a new spell, you may change which of your spells this ability affects.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Metamagic+",
            is_magical: true,
            rank: 4,
            description: r"
                You gain an additional metamagic ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Metamagic+",
            is_magical: true,
            rank: 7,
            description: r"
                You gain two additional metamagic abilities.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Desperate Improvization",
            is_magical: true,
            rank: 2,
            description: r"
                Whenever you use the \ability{desperate exertion} ability to affect an attack roll from a spell you cast during the current phase, you can change which spell you cast before rerolling.
                The new spell must still make an attack.
                You can make different choices for how you resolve the new spell, such as choosing different targets.
                However, the new spell must still have all of the same choices about how it was cast, including the use of the \textit{wildspell} ability.
                This does not cause you to reroll the wild magic roll.

                When you use this ability to change your spell, you must take the result of the second roll, even if it is worse.
                The new spell takes its full effect as if you had cast it originally, and the original spell has no effect of any kind.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Wellspring of Power",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your \glossterm{magical power}.
            ",
            modifiers: Some(vec![Modifier::Power(1)]),
        },
        RankAbility {
            name: "Wellspring of Power+",
            is_magical: true,
            rank: 6,
            description: r"
                The power bonus increases to \plus3.
            ",
            modifiers: Some(vec![Modifier::Power(2)]),
        },
        RankAbility {
            name: "Attunement Point",
            is_magical: true,
            rank: 5,
            description: r"
                You gain an additional \glossterm{attunement point}.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
    ];
}

pub fn draconic_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Draconic Bloodline",
            is_magical: false,
            rank: 1,
            description: r"
                Choose a type of dragon from among the dragons on \trefnp{Draconic Bloodline Types}.
                You have the blood of that type of dragon in your veins.
                You are \trait{impervious} to damage of the type dealt by that dragon's breath weapon.

                \begin{dtable}
                    \lcaption{Draconic Bloodline Types}
                    \begin{dtabularx}{\columnwidth}{l >{\lcol}X >{\lcol}X}
                        \tb{Dragon} & \tb{Damage Type} & \tb{Mystic Sphere} \tableheaderrule
                        Black       & Acid             & Vivimancy    \\
                        Blue        & Electricity      & Electromancy \\
                        Brass       & Fire             & Enchantment  \\
                        Bronze      & Electricity      & Revelation   \\
                        Copper      & Acid             & Terramancy   \\
                        Gold        & Fire             & Photomancy   \\
                        Green       & Acid             & Compulsion   \\
                        Red         & Fire             & Pyromancy    \\
                        Silver      & Cold             & Telekinesis  \\
                        White       & Cold             & Cryomancy    \\
                    \end{dtabularx}
                \end{dtable}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Draconic Spells",
            is_magical: true,
            rank: 1,
            description: r"
                If you already have access to your dragon's mystic sphere, you learn two spells from that sphere.
                Otherwise, you gain access to that mystic sphere, including all \glossterm{cantrips} from that sphere.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Draconic Hide",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a bonus equal to three times your rank in this archetype to your \glossterm{damage resistance}.
            ",
            modifiers: Some(vec![Modifier::DamageResistance(6)]),
        },
        RankAbility {
            name: "Draconic Hide+",
            is_magical: false,
            rank: 6,
            description: r"
                The damage resistance bonus increases to five times your rank in this archetype.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Draconic Hide",
            is_magical: false,
            rank: 3,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(9)]),
        },
        RankAbility {
            name: "Draconic Hide",
            is_magical: false,
            rank: 4,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(12)]),
        },
        RankAbility {
            name: "Draconic Hide",
            is_magical: false,
            rank: 5,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(15)]),
        },
        RankAbility {
            name: "Draconic Hide",
            is_magical: false,
            rank: 6,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(30)]),
        },
        RankAbility {
            name: "Draconic Hide",
            is_magical: false,
            rank: 7,
            description: "",
            modifiers: Some(vec![Modifier::DamageResistance(35)]),
        },
        RankAbility {
            name: "Draconic Scales",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your Armor defense.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Armor, 1)]),
        },
        RankAbility {
            name: "Draconic Precision",
            is_magical: true,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to \glossterm{accuracy} with any spell that either deals damage of your dragon's damage type or is from your dragon's \glossterm{mystic sphere}.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Draconic Precision+",
            is_magical: true,
            rank: 7,
            description: r"
                The accuracy bonus increases to +2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Energy Immunity",
            is_magical: false,
            rank: 5,
            description: r"
                You become immune to your dragon's damage type.
            ",
            modifiers: None,
        },
    ];
}

pub fn innate_arcanist<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Innate Magic",
            is_magical: true,
            rank: 1,
            description: r"
                None of your arcane spells have \glossterm{somatic components} or \glossterm{verbal components}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Arcane Infusion",
            is_magical: true,
            rank: 1,
            description: r"
                You gain a \glossterm{magic bonus} equal to twice your rank in this archetype to your \glossterm{hit points} and \glossterm{damage resistance}.
                Because this is a magic bonus, it does not stack with other magic bonuses (see \pcref{Stacking Rules}).
            ",
            // TODO: figure out stacking limitations? For now, this conflicts with magic items, so
            // treat it like you have extra attunement points instead.
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 2)]),
        },
        RankAbility {
            name: "Arcane Infusion+",
            is_magical: true,
            rank: 4,
            description: r"
                The magic bonuses increase to three times your rank in this archetype.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Absorption",
            is_magical: true,
            rank: 2,
            description: r"
                Whenever another creature uses a spell to attack you, if that spell does not have the \abilitytag{Attune} tag, you can choose to absorb its energy.
                This does not reduce the spell's effect on you, but it grants you the ability to cast the spell.
                When you cast the spell, you use your own \glossterm{accuracy}, \glossterm{power}, and abilities to determine the effects of the spell.

                Whenever you are attacked by a new spell, if you already have the ability to cast a spell with this ability, you choose whether to absorb the new spell or retain your currently absorbed spell.
                When you take a \glossterm{long rest}, you lose the ability to cast any spells you have stored with this ability.

            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Absorption+",
            is_magical: true,
            rank: 5,
            description: r"
                You can retain up to two spells with this ability.
                In addition, whenever you absorb a spell, you gain a +2 \glossterm{accuracy} bonus with that spell during the next round.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Spell Absorption+",
            is_magical: true,
            rank: 7,
            description: r"
                You can absorb and retain any \magical attack with this ability, not just spells.
                In addition, the accuracy bonus increases to +4.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Implement Freedom",
            is_magical: true,
            rank: 3,
            description: r"
                You can gain the benefits of one magical implement, such as a staff or wand, without having to hold it in your hands.
                You must still have it on your person, such as in a pocket or strapped to your back, and you must still be attuned to it to gain its benefits.
                This ability only affects one implement at a time.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Implement Freedom+",
            is_magical: true,
            rank: 6,
            description: r"
                You can gain the benefits of an additional magical implement with this ability.
                In addition, you gain an additional \glossterm{attunement point}.
                You can only use this attunement point to \glossterm{attune} to magic implements.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
    ];
}

pub fn wild_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Wildspell",
            is_magical: true,
            rank: 1,
            description: r"
                Whenever you cast a spell that does not have the \abilitytag{Attune} or \abilitytag{Sustain} tags, you may use this ability after making all other decisions for the spell (such as targets, intended area, and so on).
                When you do, you gain a +2 bonus to your \glossterm{magical power} with the spell.
                In addition, roll 1d10 and apply the corresponding wild magic effect from \trefnp{Wild Magic Effects}.
                Some wild magic effects cannot be meaningfully applied to all spells.
                For example, changing the damage dealt by a spell does not affect spells that do not deal damage.
                Any wildspell effects that do not make sense for a particular spell have no effect.
                The rolled wild magic effect always applies to the round that you cast the spell, even if the spell doesn't have its normal effect immediately.

                \begin{dtable}
                    \lcaption{Wild Magic Effects}
                    \begin{dtabularx}{\textwidth}{l X}
                        \tb{Roll} & \tb{Effect} \tableheaderrule
                        1 & The spell fails with no effect \\
                        2 & When you attack with the spell this round, you roll twice and take the lower result \\
                        3 & When you attack with the spell this round, you are a target of the attack in addition to any other targets \\
                        4 & The spell's area is halved this round \\
                        5 & The spell's area is doubled this round \\
                        6 & Each target that resists damage from the spell this round takes energy \glossterm{extra damage} equal to your \glossterm{power} with the spell \\
                        7 & Each target that loses hit points from the spell this round takes energy \glossterm{extra damage} equal to your \glossterm{power} with the spell \\
                        8 & When you deal damage with the spell this round, you roll twice for the damage and take the higher result \\
                        9 & When you attack with the spell this round, you roll twice for the attack roll and take the higher result \\
                        10 & During your next action, the spell takes effect again with the same choices for all decisions, such as targets \\
                    \end{dtabularx}
                \end{dtable}
            ",
            modifiers: Some(vec![Modifier::Power(2)]),
        },
        RankAbility {
            name: "Wildspell+",
            is_magical: true,
            rank: 4,
            description: r"
                The power bonus increases to +3.
                In addition, if you use the \textit{desperate exertion} ability on a spell affected by this ability, you can reroll the wild magic roll for that spell in addition to the normal effects of the \textit{desperate exertion} ability.
                You do not gain any bonus to the wild magic reroll.
            ",
            modifiers: Some(vec![Modifier::Power(1)]),
        },
        RankAbility {
            name: "Wildspell+",
            is_magical: true,
            rank: 7,
            description: r"
                The power bonus increases to +4.
                In addition, you replace your normal wild magic effects with the effects from the \trefnp{Epic Wild Magic Effects} table.
                \begin{dtable}
                    \lcaption{Epic Wild Magic Effects}
                    \begin{dtabularx}{\textwidth}{l X}
                        \tb{Roll} & \tb{Effect} \tableheaderrule
                        1 & The spell has its normal effect \\
                        2 & All damage dealt by the spell is considered to be all damage types \\
                        3 & When you deal damage with the spell this round, you roll twice for the spell and take the higher result \\
                        4 & When you attack with the spell this round, you roll twice and take the higher result \\
                        5 & Any \glossterm{conditions} inflicted by the spell this round become a \abilitytag{Curse} instead of a condition, and are removed when the target takes a \glossterm{short rest} \\
                        6 & When the spell would cause a creature to lose hit points this round, that creature loses twice as many hit points \\
                        7 & The spell's area is tripled this round \\
                        8 & Each target that loses hit points from the spell this round is also \glossterm{briefly} \stunned \\
                        9 & You gain a \plus4 bonus to \glossterm{accuracy} with the spell this round, but you take the minimum possible result when the spell would deal damage \\
                        10 & During each of your next two actions, the spell takes effect again with the same choices for all decisions, such as targets \\
                    \end{dtabularx}
                \end{dtable}
            ",
            modifiers: Some(vec![Modifier::Power(1)]),
        },
        RankAbility {
            name: "Chaotic Insight",
            is_magical: true,
            rank: 2,
            description: r"
                You learn a spell that does not have the \abilitytag{Attune} or \abilitytag{Sustain} tags from any \glossterm{mystic sphere}, even if you do not have access to that mystic sphere.
                The spell does not have to be from a mystic sphere on the arcane mystic sphere list.
                As normal, you can change which spell you learn with this ability as you gain access to new spell ranks.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Chaotic Insight+",
            is_magical: true,
            rank: 5,
            description: r"
                You learn an additional spell with this ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Chaotic Exertion",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus2 bonus to the roll when you use the \textit{desperate exertion} ability.
                This bonus stacks with the normal \plus2 bonus provided by that ability.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Chaotic Exertion+",
            is_magical: true,
            rank: 6,
            description: r"
                Once per \glossterm{short rest}, you can use the \textit{desperate exertion} ability without increasing your \glossterm{fatigue level}.
            ",
            modifiers: None,
        },
    ];
}
