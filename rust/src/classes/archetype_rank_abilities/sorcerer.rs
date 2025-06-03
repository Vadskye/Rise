use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Attribute, Defense, Resource};
use crate::creatures::Modifier;

use super::standard_modifiers::{add_dr_scaling, add_standard_spell_modifiers};

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
                    This functions like body armor that provides a \plus2 bonus to your Armor defense and has no \glossterm{encumbrance}.
                    It also provides a bonus to your maximum \glossterm{damage resistance} equal to three times your rank in this archetype.

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
        RankAbility {
            complexity: 0,
            name: "Mage Armor+",
            is_magical: true,
            rank: 4,
            description: r"        
                The damage resistance bonus increases to four times your rank in this archetype.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Mage Armor+",
            is_magical: true,
            rank: 7,
            description: r"
                The damage resistance bonus increases to six times your rank in this archetype.
            ",
            modifiers: None,
        },
    ];
    add_standard_spell_modifiers(&mut abilities);
    add_dr_scaling(&mut abilities, 1, 3, Some(6));
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
                Each individual spell can normally have one metamagic applied.
                If the spell's rank is lower than your maximum spellcasting rank, you can apply two metamagic effects to it.
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
            rank: 4,
            description: r"
                You gain an additional metamagic ability.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Metamagic+",
            is_magical: true,
            rank: 7,
            description: r"
                You gain two additional metamagic abilities.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Spell-Trained Mind",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your Willpower.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Willpower, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Attunement Point",
            is_magical: true,
            rank: 5,
            description: r"
                You gain an additional \glossterm{attunement point}.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Experienced Spellcaster",
            is_magical: true,
            rank: 6,
            description: r"
                You gain a \plus1 accuracy bonus.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
    ]
}

pub fn draconic_magic<'a>() -> Vec<RankAbility<'a>> {
    let mut abilities = vec![
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
            complexity: 1,
            name: "Draconic Hide",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a bonus equal to three times your rank in this archetype to your maximum \glossterm{damage resistance}.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Draconic Hide+",
            is_magical: false,
            rank: 6,
            description: r"
                The damage resistance bonus increases to four times your rank in this archetype.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Draconic Body",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to your Constitution.
            ",
            modifiers: Some(vec![Modifier::Attribute(Attribute::Constitution, 1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Energy Immunity",
            is_magical: false,
            rank: 4,
            description: r"
                You become immune to attacks that have your dragon's associated ability tag.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Draconic Precision",
            is_magical: true,
            rank: 5,
            description: r"
                You gain a \plus1 accuracy bonus with any ability that has your dragon's associated ability tag.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
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
    ];
    add_dr_scaling(&mut abilities, 2, 6, None);
    abilities
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
        RankAbility {
            complexity: 1,
            name: "Arcane Infusion",
            is_magical: true,
            rank: 1,
            description: r"
                You gain an \glossterm{enhancement bonus} equal to twice your rank in this archetype to your maximum \glossterm{hit points} and \glossterm{damage resistance}.
                Because this is an enhancement bonus, it does not stack with other enhancement bonuses (see \pcref{Stacking Rules}).
            ",
            // TODO: figure out stacking limitations? For now, this conflicts with magic items, so
            // treat it like you have extra attunement points instead.
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 2)]),
        },
        RankAbility {
            complexity: 0,
            name: "Arcane Infusion+",
            is_magical: true,
            rank: 4,
            description: r"
                The enhancement bonuses increase to three times your rank in this archetype.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Magic Absorption",
            is_magical: true,
            rank: 2,
            description: r"
                Whenever another creature uses a \magical ability to attack you, if that ability does not have the \abilitytag{Attune} or \abilitytag{Sustain} tags, you can choose to absorb its energy.
                This does not reduce the ability's effect on you, but it allows you to use that ability as a standard action.
                When you use the ability, you choose the area and targets affected by it.
                In all other ways, the ability functions in the same way as when it was used on you, including its \glossterm{accuracy} and \glossterm{power}.
                You cannot change its effects with your other abilities, including \ability{desperate exertion}.

                Whenever you are attacked by a new magical ability, if you already have a stored ability, you choose whether to absorb the new ability or retain your currently absorbed ability.
                When you finish a \glossterm{long rest}, you lose all stored abilities.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Magic Absorption+",
            is_magical: true,
            rank: 5,
            description: r"
                You can store up to three magical abilities.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
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
            complexity: 1,
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
        RankAbility {
            complexity: 2,
            name: "Magic Absorption++",
            is_magical: true,
            rank: 7,
            description: r"
                Whenever you absorb an attack with your \textit{magic absorption} ability, if you have no stored abilities, that attack has no effect on you.
                Whenever you use a stored ability, you gain a +2 accuracy bonus with it for each other ability that you have stored.
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
                Whenever you cast a spell that does not have the \abilitytag{Attune} or \abilitytag{Sustain} tags, you may use this ability after making all other decisions for the spell (such as targets, intended area, and so on).
                When you do, the spell deals 1d4 \glossterm{extra damage}.
                In addition, roll 1d10 and apply the corresponding wild magic effect from the table below.

                \begin{columntable}
                    \begin{dtabularx}{\textwidth}{l X}
                        \tb{Roll} & \tb{Effect} \tableheaderrule
                        1 & The spell fails with no effect \\
                        2 & On your first attack roll with the spell, you \glossterm{reroll} once and keep the lower result \\
                        3 & On your first attack with the spell, you are a target of the attack in addition to any other targets \\
                        4 & The spell leaves an unpleasant but harmless magical sludge on you, with the color and texture based on the spell you cast \\
                        5 & The spell's area is halved this round \\
                        6 & The spell's area is doubled this round \\
                        7 & On your first attack with the spell, it \glossterm{chains} once to the unaffected creature that is closest to one of the spell's targets, choosing randomly between equally close creatures \\
                        8 & When you first deal damage with the spell, you \glossterm{reroll} once and keep the higher result \\
                        9 & On your first attack roll with the spell, you \glossterm{reroll} once keep the higher result \\
                        10 & During your next action, the spell \glossterm{repeats} \\
                    \end{dtabularx}
                \end{columntable}

                Some wild magic effects cannot be meaningfully applied to all spells.
                For example, changing the damage dealt by a spell does not affect spells that do not deal damage.
                Any wildspell effects that do not make sense for a particular spell have no effect.

                The extra damage increases as your rank in this archetype increases:
                % Use a slightly slower progression than normal for extra damage.
                % At higher levels, a sorcerer has more tools to mitigate the downsides of wildspell, and the extra damage is strong.
                \rank{3} The extra damage increases to 1d6.   % +27% damage
                \rank{4} The extra damage increases to 1d8.   % +25% damage
                \rank{5} The extra damage increases to 1d10.  % +42% damage, assuming double extra damage
                \rank{6} The extra damage increases to 2d6.   % +39% damage, assuming double extra damage
                \rank{7} The extra damage increases to 2d8.   % +52% damage, assuming double extra damage
            ",
            // TODO: define extra damage modifier for scaling
            modifiers: Some(vec![Modifier::Power(2)]),
        },
        RankAbility {
            complexity: 1,
            name: "Wildspell+",
            is_magical: true,
            rank: 4,
            description: r"
                If you use the \textit{desperate exertion} ability on a spell affected by this ability, you can reroll the wild magic roll for that spell in addition to the normal effects of the \textit{desperate exertion} ability.
                You do not gain any bonus to the wild magic reroll.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Wildspell++",
            is_magical: true,
            rank: 7,
            description: r"
                You replace your normal wild magic effects with the effects from the table below.
                \begin{columntable}
                    \begin{dtabularx}{\textwidth}{l X}
                        \tb{Roll} & \tb{Effect} \tableheaderrule
                        1 & The spell has no immediate effect, but takes effect at the start of your next action \\
                        2 & Your first attack roll with the spell only \glossterm{explodes} on a 1 or 2 \\
                        3 & On your first attack with the spell, you are a target of the attack in addition to any other targets, but with a \minus4 accuracy penalty \\
                        4 & The spell leaves an pleasant fragrance on you, with the smell based on the spell you cast \\
                        5 & The spell's area is doubled this round \\
                        6 & The spell's area is tripled this round \\
                        7 & On your first attack with the spell, it \glossterm{chains} twice to the unaffected creatures that are closest to one of the spell's targets, choosing randomly between equally close creatures \\
                        8 & When you first deal damage with the spell, you \glossterm{reroll} once and keep the higher result \\
                        9 & Your first attack roll with the spell \glossterm{explodes} on any value, not just on a 10 \\
                        10 & During your next action, the spell \glossterm{repeats} \\
                    \end{dtabularx}
                \end{columntable}
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
                You gain a \plus2 bonus to the roll when you use the \textit{desperate exertion} ability.
                This bonus stacks with the normal \plus2 bonus provided by that ability.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Chaotic Exertion+",
            is_magical: true,
            rank: 6,
            description: r"
                Once per \glossterm{short rest}, you can use the \textit{desperate exertion} ability without increasing your \glossterm{fatigue level}.
            ",
            modifiers: None,
        },
    ]
}
