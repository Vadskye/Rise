use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, Defense, Resource};
use crate::creatures::Modifier;

use super::standard_modifiers::add_standard_spell_modifiers;

pub fn arcane_magic<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
        RankAbility {
            complexity: 4,
            name: "Arcane Spells",
            is_magical: true,
            rank: 1,
            description: r"
                Your innate talents grant you the ability to use arcane magic.
                You gain access to one arcane \glossterm{mystic sphere}, plus the \sphere{universal} mystic sphere (see \pcref{Arcane Mystic Spheres}).
                You may spend \glossterm{insight points} to gain access to one additional arcane \glossterm{mystic sphere} per two \glossterm{insight points}.
                You can only learn arcane spells from arcane mystic spheres that you have access to.

                You automatically learn all \glossterm{cantrips} from each of your mystic spheres.
                In addition, you learn two rank 1 arcane \glossterm{spells}.
                You can also spend \glossterm{insight points} to learn one additional rank 1 spell per insight point.

                Arcane spells require both \glossterm{verbal components} and \glossterm{somatic components} to cast (see \pcref{Ability Usage Components}).
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
            complexity: 1,
            name: "Arcane Spells+",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional arcane spell.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Arcane Spells+",
            is_magical: true,
            rank: 5,
            description: r"
                You learn an additional arcane spell.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Mage Armor",
            is_magical: true,
            rank: 1,
            description: r"
                \begin{magicalactiveability}{Mage Armor}
                    \abilityusagetime Standard action.
                    \rankline
                    You create a translucent suit of magical armor on your body and over your hands.
                    This functions like body armor that provides a \plus2 bonus to your Armor defense and \glossterm{durability}.
                    It has no \glossterm{encumbrance} and does not require \glossterm{proficiency} with armor to use.

                    You can also use a \glossterm{free hand} to wield the barrier as a shield.
                    This functions like a buckler, granting you a \plus1 bonus to your Armor and Reflex defenses, except that you do not need to be proficient with light armor.
                    Since this bonus comes from a shield, it does not stack with the benefits of using any other shield.

                    This ability lasts until you \glossterm{dismiss} it or until you use it again.
                    In addition, it is automatically dismissed if you wear other body armor of any kind.
                \end{magicalactiveability}
            ",
            // Assuming no other armor
            modifiers: Some(vec![Modifier::Defense(Defense::Armor, 2)]),
        },
    ];
    add_standard_spell_modifiers(&mut abilities);
    abilities
}

pub fn arcane_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Arcane Dynamo",
            is_magical: true,
            rank: 1,
            description: r"
                You gain a \plus1 bonus to your \glossterm{magical power}.
                If your Constitution is 4 or higher, you gain an additional \plus1 bonus.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Metamagic",
            is_magical: true,
            rank: 2,
            description: r"
                You learn how to further refine your spellcasting abilities.
                Choose two metamagic abilities from the list below.

                Some metamagic abilities affect specific spells.
                Each individual spell can only have one metamagic applied.
                Whenever you learn a new spell, you may change which specific spells your metamagic abilities affect.
                {
                    \parhead{Distant Spell} Choose an arcane \glossterm{spell} you know with a standard \glossterm{range}: \shortrangeless, \medrangeless, \longrangeless, \distrangeless, or \extrangeless.
                        You increase that spell's range to the next standard range category, to a maximum of Extreme range.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Dragonbreath Spell} Choose an arcane \glossterm{spell} you know that has a standard \glossterm{area}: \smallarea, \medarea, \largearea, \hugearea, or \gargarea.
                        It must not have a \glossterm{range}, and it must not create an \glossterm{emanation}.
                        The spell's area becomes a cone instead of its normal shape.
                        In addition, if the area was not originally a line, the area increases to to the next standard area category, to a maximum of a Gargantuan area.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Energetic Spell} Choose an arcane \glossterm{spell} you know.
                        You add any one of the following tags to that spell: \atCold, \atFire, or \atElectricity.
                        In addition, if it deals damage, it gains \glossterm{extra damage} equal to your rank in this archetype.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Precise Spell} Choose an arcane \glossterm{spell} you know.
                        You gain a \plus1 accuracy bonus with that spell.
                        You can choose this ability multiple times, choosing a different spell each time.
                    \parhead{Widened Spell} Choose an arcane \glossterm{spell} you know with a standard \glossterm{area}: \smallarea, \medarea, \largearea, \hugearea, or \gargarea.
                        The spell cannot also be affected by the Dragonbreath Spell metamagic.
                        You increase that spell's area to the next standard area category, to a maximum of a Gargantuan area.
                        You can choose this ability multiple times, choosing a different spell each time.
                }
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Metamagic+",
            is_magical: true,
            rank: 5,
            description: r"
                You gain an additional metamagic ability.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Spell Knowledge",
            is_magical: true,
            rank: 3,
            description: r"
                You learn an additional arcane spell.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Spell-Trained Mind",
            is_magical: true,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Willpower.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Willpower, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Attunement Point",
            is_magical: true,
            rank: 6,
            description: r"
                You gain an additional \glossterm{attunement point}.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Experienced Spellcaster",
            is_magical: true,
            rank: 7,
            description: r"
                You gain a \plus1 bonus to your \glossterm{accuracy} and Fortitude defense.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
    ]
}

pub fn draconic_magic<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Draconic Bloodline",
            is_magical: false,
            rank: 1,
            description: r"
                Choose a type of dragon from among the dragons on \trefnp{Draconic Bloodline Types}.
                You have the blood of that type of dragon in your veins.
                You are \trait{impervious} to attacks with that dragon's associated ability tag.

                \begin{dtable}
                    \lcaption{Draconic Bloodline Types}
                    \begin{dtabularx}{\columnwidth}{l >{\lcol}X >{\lcol}X}
                        \tb{Dragon} & \tb{Tag} & \tb{Mystic Sphere} \tableheaderrule
                        Black       & \atAcid             & Vivimancy    \\
                        Blue        & \atElectricity      & Electromancy \\
                        Brass       & \atFire             & Enchantment  \\
                        Bronze      & \atElectricity      & Revelation   \\
                        Copper      & \atAcid             & Terramancy   \\
                        Gold        & \atFire             & Photomancy   \\
                        Green       & \atAcid             & Compulsion   \\
                        Red         & \atFire             & Pyromancy    \\
                        Silver      & \atCold             & Telekinesis  \\
                        White       & \atCold             & Cryomancy    \\
                    \end{dtabularx}
                \end{dtable}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Draconic Spell",
            is_magical: true,
            rank: 1,
            description: r"
                You learn a spell from your dragon's \glossterm{mystic sphere}, even if you do not have access to that mystic sphere.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Draconic Hide",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a +3 bonus to your \glossterm{durability}.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Draconic Hide+",
            is_magical: false,
            rank: 6,
            description: r"
                The durability bonus increases to +5.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Draconic Precision",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus1 accuracy bonus with any ability that has your dragon's associated ability tag.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Draconic Body",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1 bonus to your Constitution.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Constitution, 1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Energy Immunity",
            is_magical: false,
            rank: 5,
            description: r"
                You become immune to attacks that have your dragon's associated ability tag.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Draconic Mind",
            is_magical: true,
            rank: 7,
            description: r"
                You gain a \plus1 bonus to your Intelligence and Willpower.
            ",
            modifiers: Some(vec![
                Modifier::Attribute(Attribute::Intelligence, 1),
                Modifier::Attribute(Attribute::Willpower, 1),
            ]),
        },
    ]
}

pub fn innate_arcanist<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Innate Magic",
            is_magical: true,
            rank: 1,
            description: r"
                None of your arcane spells have \glossterm{somatic components} or \glossterm{verbal components}.
            ",
            modifiers: None,
        },
        // Normal / infused progression:
        // R1: +4 / +3
        // R3: +8 / +9
        // R5: +16 / +15
        // R7: +32 / +35
        RankAbility {
            complexity: 1,
            name: "Arcane Infusion",
            is_magical: true,
            rank: 2,
            description: r"
                You gain an \glossterm{enhancement bonus} to your maximum \glossterm{hit points} equal to three times your rank in this archetype.
                In addition, you gain a \plus1 \glossterm{enhancement bonus} to your \glossterm{vital rolls}.
                Because these are enhancement bonuses, they do not stack with other enhancement bonuses (see \pcref{Stacking Rules}).
            ",
            // TODO: figure out stacking limitations? For now, this conflicts with magic items, so
            // treat it like you have extra attunement points instead.
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 2)]),
        },
        RankAbility {
            complexity: 0,
            name: "Arcane Infusion+",
            is_magical: true,
            rank: 6,
            description: r"
                The hit point bonus increases to five times your rank in this archetype, and the vital roll bonus increases to \plus2.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Magic Absorption",
            is_magical: true,
            rank: 3,
            description: r"
                Whenever another creature uses a \magical ability to attack you, if that ability does not have the \abilitytag{Attune} or \abilitytag{Sustain} tags, you \glossterm{briefly} absorb that ability.
                This does not reduce the ability's effect on you.

                As a standard action, you can use any ability that you have absorbed.
                When you use an absorbed ability, you choose the area and targets affected by it.
                In all other ways, the ability functions in the same way as when it was used on you, including its \glossterm{accuracy} and \glossterm{power}.
                You cannot change its effects with your other abilities, including \ability{desperate exertion}.

                As a \glossterm{minor action}, you can reserve one ability that you have absorbed so you can use it later.
                This removes any other reserved abilities that you have absorbed.
                When you finish a \glossterm{long rest}, you lose all reserved abilities.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Magic Absorption+",
            is_magical: true,
            rank: 5,
            description: r"
                You can reserve up to three magical abilities that you have absorbed.
                If you reserve a fourth ability, you choose which reserved ability to remove.
                You still lose all reserved abilities when you finish a long rest.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Implement Freedom",
            is_magical: true,
            rank: 4,
            description: r"
                You can gain the benefits of one magical implement that requires a single free hand, such as a short staff or wand, without having to hold it in your hands.
                You must still have it on your person, such as in a pocket or strapped to your back, and you must still be attuned to it to gain its benefits.
                This ability only affects one implement at a time.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Mystic Supremacy",
            is_magical: true,
            rank: 7,
            description: r"
                You gain a \plus2 bonus to your defenses against \magical attacks.
                In addition, you are immune to magical attacks from creatures that are rank 5 or lower.
            ",
            modifiers: None,
        },
    ]
}

pub fn wild_magic<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Wildspell",
            is_magical: true,
            rank: 1,
            description: r"
                Whenever you cast a damaging spell that does not have the \abilitytag{Attune} or \abilitytag{Sustain} tags, you may use this ability after making all other decisions for the spell (such as targets, intended area, and so on).
                When you do, roll 1d10 and apply the corresponding wild magic effect from the table below.

                % 1 and 2 are bad. 3, 4 and 5, and 6 are mixed upside/downside.
                % 6 and above are strictly positive.
                \begin{columntable}
                    \begin{dtabularx}{\textwidth}{l X}
                        \tb{Roll} & \tb{Effect} \tableheaderrule
                        1 & The spell has no immediate effect, but it \glossterm{repeats} during your next action \\
                        2 & You are a target of the spell in addition to any other targets, but with a -4 accuracy penalty against yourself \\
                        3 & Your first attack roll with the spell only \glossterm{explodes} on a 1 or 2 \\
                        4 & You gain a \plus10 \glossterm{accuracy} bonus with the spell, but cannot get a \glossterm{critical hit} \\
                        5 & The spell gains the \atCold, \atElectricity, and \atFire ability tags \\
                        6 & The spell's area is doubled \\
                        7 & The spell \glossterm{chains} once to the unaffected \glossterm{enemy} that is closest to one of the spell's \glossterm{primary targets}, choosing randomly between equally close creatures \\
                        8 & The spell deals \glossterm{extra damage} equal to your rank in this archetype \\
                        9 & Each target hit by the spell is \glossterm{briefly} \confused, \braced, and \focused \\
                        10 & Your first attack roll with the spell \glossterm{explodes} on any value, not just on a 10 \\
                        11\plus & The spell \glossterm{repeats} during your next action \\
                    \end{dtabularx}
                \end{columntable}

                Some wild magic effects cannot be meaningfully applied to all spells.
                For example, doubling the area of a spell does not affect spells that do not deal damage.
                Any wildspell effects that do not make sense for a particular spell have no effect.
            ",
            // TODO: define extra damage modifier for scaling
            modifiers: Some(vec![Modifier::Power(2)]),
        },
        RankAbility {
            complexity: 0,
            name: "Wildspell+",
            is_magical: true,
            rank: 7,
            description: r"
                You gain a \plus2 bonus to the wild magic roll.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
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
            complexity: 1,
            name: "Chaotic Insight+",
            is_magical: true,
            rank: 5,
            description: r"
                You learn an additional spell with this ability.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Chaotic Exertion",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus2 bonus to the roll when you use the \ability{desperate exertion} ability.
                This bonus stacks with the normal \plus2 bonus provided by that ability.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Desperate Wildspell",
            is_magical: true,
            rank: 4,
            description: r"
                If you use the \textit{desperate exertion} ability on a spell affected by this ability, you can reroll the wild magic roll for that spell in addition to the normal effects of the \textit{desperate exertion} ability.
                You do not gain any bonus to the wild magic reroll.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Chaotic Exertion+",
            is_magical: true,
            rank: 6,
            description: r"
                Once per \glossterm{short rest}, you can use the \ability{desperate exertion} ability without increasing your \glossterm{fatigue level}.
            ",
            modifiers: None,
        },
    ]
}
