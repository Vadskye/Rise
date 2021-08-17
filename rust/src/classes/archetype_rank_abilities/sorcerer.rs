use crate::classes::archetype_rank_abilities::RankAbility;

pub fn arcane_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Cantrips",
            is_magical: true,
            rank: 0,
            description: r"
        
        You have the ability to use arcane magic.
        You gain access to one arcane \glossterm{mystic sphere} (see \pcref{Arcane Mystic Spheres}).
        You may spend \glossterm{insight points} to gain access to one additional arcane \glossterm{mystic sphere} per two \glossterm{insight points}.
        You automatically learn all \glossterm{cantrips} from any mystic sphere you have access to.
        You do not yet gain access to any other spells from those mystic spheres.

        Arcane spells require both \glossterm{verbal components} and \glossterm{somatic components} to cast (see \pcref{Casting Components}).
        For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.


                ",
        },
        RankAbility {
            name: "Mage Armor",
            is_magical: true,
            rank: 0,
            description: r"
                You can use the \textit{mage armor} ability as a standard action.
                \begin{durationability}{Mage Armor}[Duration]
                    \rankline
                    You create a translucent suit of magical armor on your body and over your hands.
                    This functions like body armor that provides a \plus2 bonus to your Armor defense and has no \glossterm{encumbrance}.
                    It also provides a bonus to \glossterm{damage resistance} equal to twice your rank in this archetype (minimum 1).

                    You can also use a \glossterm{free hand} to wield the barrier as a shield.
                    This functions like a buckler, granting you a \plus1 bonus to your Armor defense, except that you do not need to be proficient with light armor.
                    Since this bonus comes from a shield, it does not stack with the benefits of using any other shield.

                    This ability lasts until you use it again or until you \glossterm{dismiss} it as a free action.
                    In addition, it is automatically dismissed if you wear other body armor of any kind.
                \end{durationability}
            ",
        },
        RankAbility {
            name: "Spellcasting",
            is_magical: true,
            rank: 1,
            description: r"
        
        You become a rank 1 arcane spellcaster.
        You learn two rank 1 \glossterm{spells} from arcane \glossterm{mystic spheres} you have access to.
        You can also spend \glossterm{insight points} to learn one additional rank 1 spell per \glossterm{insight point}.
        Unless otherwise noted in a spell's description, casting a spell requires a \glossterm{standard action}.

        When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
            you can forget any number of spells you know to learn that many new spells in exchange,
            including spells of the higher rank.
        All of those spells must be from arcane mystic spheres you have access to.

                ",
        },
        RankAbility {
            name: "Spell Rank (2)",
            is_magical: true,
            rank: 2,
            description: r"
         You become a rank 2 arcane spellcaster.
        This gives you access to spells that require a minimum rank of 2.

                ",
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional arcane \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
        },
        RankAbility {
            name: "Spell Rank (3)",
            is_magical: true,
            rank: 3,
            description: r"
         You become a rank 3 arcane spellcaster.
        This gives you access to spells that require a minimum rank of 3 and can improve the effectiveness of your existing spells.

                ",
        },
        RankAbility {
            name: "Greater Mage Armor",
            is_magical: true,
            rank: 3,
            description: r"        
                The damage resistance bonus from your \textit{mage armor} ability increases to three times your rank in this archetype.
            ",
        },
        RankAbility {
            name: "Spell Rank (4)",
            is_magical: true,
            rank: 4,
            description: r"
         You become a rank 4 arcane spellcaster.
        This gives you access to spells that require a minimum rank of 4 and can improve the effectiveness of your existing spells.

                ",
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 4,
            description: r"
                You learn an additional arcane \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
        },
        RankAbility {
            name: "Spell Rank (5)",
            is_magical: true,
            rank: 5,
            description: r"
         You become a rank 5 arcane spellcaster.
        This gives you access to spells that require a minimum rank of 5 and can improve the effectiveness of your existing spells.

                ",
        },
        RankAbility {
            name: "Spell Rank (6)",
            is_magical: true,
            rank: 6,
            description: r"
         You become a rank 6 arcane spellcaster.
        This gives you access to spells that require a minimum rank of 6 and can improve the effectiveness of your existing spells.

                ",
        },
        RankAbility {
            name: "Supreme Mage Armor",
            is_magical: true,
            rank: 6,
            description: r"
                The damage resistance bonus from your \textit{mage armor} ability increases to four times your rank in this archetype.
                In addition, the defense bonus from the body armor increases to \plus4.
            ",
        },
        RankAbility {
            name: "Spell Rank (7)",
            is_magical: true,
            rank: 7,
            description: r"
                You become a rank 7 arcane spellcaster.
                This gives you access to spells that require a minimum rank of 7 and can improve the effectiveness of your existing spells.
            ",
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 7,
            description: r"
         You learn an additional arcane \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
                ",
        },
    ];
}

pub fn arcane_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Combat Caster",
            is_magical: true,
            rank: 0,
            description: r"
         You reduce your \glossterm{focus penalty} by 2.


                ",
        },
        RankAbility {
            name: "Mystic Insight",
            is_magical: true,
            rank: 1,
            description: r"
        
        You gain your choice of one of the following abilities.
        Whenever you increase your rank in this archetype, you may change your choice.
        This can allow you to apply the benefits of insights like \textit{signature spell} to higher rank spells.
        {
            \parhead{Distant Spell} Choose an arcane \glossterm{spell} you know with a standard \glossterm{range}: Short, Medium, Long, Distant, or Extreme.
                You double your range with that spell.
                You can choose this ability multiple times, choosing a different spell each time.
            \parhead{Focused Caster} You reduce your \glossterm{focus penalty} by 1.
                You cannot choose this ability multiple times.
            \parhead{Signature Spell} Choose an arcane \glossterm{spell} you know.
                The spell loses the \abilitytag{Focus} tag, allowing you to cast it without lowering your guard in combat.
                In addition, you gain a \plus1 bonus to \glossterm{accuracy} with that spell.
                You can choose this ability multiple times, choosing a different spell each time.
            \parhead{Spell Knowledge} You learn an additional spell.
                You can choose this ability multiple times, learning an additional spell each time.
            \parhead{Spell Power} Choose an arcane \glossterm{spell} you know.
                You gain a bonus equal to your rank in this archetype to your \glossterm{power} with that spell.
                You can choose this ability multiple times, choosing a different spell each time.
        }

                ",
        },
        RankAbility {
            name: "Desperate Improvization",
            is_magical: true,
            rank: 2,
            description: r"
                % TODO: clarify that this doesn't work with Eyes of Flame / poison / etc.
                Whenever you use the \ability{desperate exertion} ability to affect a spell you just cast, you can change which spell you cast before rerolling.
                You can make different choices for the new spell, such as choosing different targets.
                If you do, you must take the result of the second roll, even if it is worse.
                The new spell takes its full effect as if you had cast it originally, and the original spell has no effect of any kind.
                This is a \glossterm{Swift} ability.
            ",
        },
        RankAbility {
            name: "Wellspring of Power",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus3 bonus to your \glossterm{magical} \glossterm{power}.
            ",
        },
        RankAbility {
            name: "Mystic Insight",
            is_magical: true,
            rank: 4,
            description: r"
                You gain an additional \textit{mystic insight} ability.
            ",
        },
        RankAbility {
            name: "Attunement Point",
            is_magical: true,
            rank: 5,
            description: r"
                You gain an additional \glossterm{attunement point}.
            ",
        },
        RankAbility {
            name: "Greater Wellspring of Power",
            is_magical: true,
            rank: 6,
            description: r"
                The bonus from your \textit{wellspring of power} ability increases to \plus9.
            ",
        },
        RankAbility {
            name: "Mystic Insights",
            is_magical: true,
            rank: 7,
            description: r"
                You gain two additional \textit{mystic insight} abilities.
            ",
        },
    ];
}

pub fn draconic_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Draconic Bloodline",
            is_magical: true,
            rank: 0,
            description: r"
         Choose a type of dragon from among the dragons on \trefnp{Draconic Bloodline Types}.
        You have the blood of that type of dragon in your veins.
        You are \glossterm{impervious} to damage of the type dealt by that dragon's breath weapon.

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
        },
        RankAbility {
            name: "Draconic Focus",
            is_magical: true,
            rank: 0,
            description: r"
         You reduce your \glossterm{focus penalty} by 1.

                ",
        },
        RankAbility {
            name: "Draconic Spells",
            is_magical: true,
            rank: 1,
            description: r"
         If you already have access to your dragon's mystic sphere, you learn two spells from that sphere.
        Otherwise, you gain access to that mystic sphere, including all \glossterm{cantrips} from that sphere.

                ",
        },
        RankAbility {
            name: "Greater Draconic Focus",
            is_magical: true,
            rank: 2,
            description: r"
         The focus penalty reduction from your \textit{draconic focus} ability increases to 2.

                ",
        },
        RankAbility {
            name: "Draconic Hide",
            is_magical: true,
            rank: 3,
            description: r"
         You gain a bonus equal to three times your rank in this archetype to your \glossterm{damage resistance}.

                ",
        },
        RankAbility {
            name: "Draconic Precision",
            is_magical: true,
            rank: 4,
            description: r"
         You gain a \plus1 bonus to \glossterm{accuracy} with any spell that either deals damage of your dragon's damage type or is from your dragon's \glossterm{mystic sphere}.

                ",
        },
        RankAbility {
            name: "Energy Immunity",
            is_magical: true,
            rank: 5,
            description: r"
                You become immune to your dragon's damage type.
            ",
        },
        RankAbility {
            name: "Greater Draconic Hide",
            is_magical: true,
            rank: 6,
            description: r"
         The bonus from your \textit{draconic hide} ability increases to four times your rank in this archetype.

                ",
        },
        RankAbility {
            name: "Greater Draconic Precision",
            is_magical: true,
            rank: 7,
            description: r"
                The bonus from your \textit{draconic precision} ability increases to \plus2.
            ",
        },
    ];
}

pub fn innate_arcanist<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Innate Magic",
            is_magical: true,
            rank: 0,
            description: r"
                None of your arcane spells have \glossterm{somatic components} or \glossterm{verbal components}.
            ",
        },
        RankAbility {
            name: "Spell Absorption",
            is_magical: true,
            rank: 1,
            description: r"
                Whenever another creature uses a spell to attack you, if that spell does not have the \glossterm{Attune} tag, you can choose to absorb its energy.
                This does not reduce the spell's effect on you, but it grants you the ability to cast the spell.
                When you cast the spell, you use your own \glossterm{accuracy}, \glossterm{power}, and abilities to determine the effects of the spell.

                Whenever you are attacked by a new spell, if you already have the ability to cast a spell with this ability, you choose whether to absorb the new spell or retain your currently absorbed spell.
                When you take a \glossterm{long rest}, you lose the ability to cast any spells you have stored with this ability.
            ",
        },
        RankAbility {
            name: "Arcane Infusion",
            is_magical: true,
            rank: 2,
            description: r"
                You gain a \glossterm{magic bonus} equal to twice your rank in this archetype to your \glossterm{hit points} and \glossterm{damage resistance}.
                Because this is a magic bonus, it does not stack with other magic bonuses (see \pcref{Stacking Rules}).
            ",
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
        },
        RankAbility {
            name: "Greater Spell Absorption",
            is_magical: true,
            rank: 4,
            description: r"
                You can retain up to two spells with your \glossterm{spell absorption} ability.
                In addition, whenever you absorb a spell with that ability, you gain a +2 \glossterm{accuracy} bonus with that spell during the next round.
            ",
        },
        RankAbility {
            name: "Greater Personal Enhancement",
            is_magical: true,
            rank: 5,
            description: r"
                The bonus from your \textit{personal enhancement} ability increases to three times your rank in this archetype.
            ",
        },
        RankAbility {
            name: "Greater Implement Freedom",
            is_magical: true,
            rank: 6,
            description: r"
                You can use your \textit{implement freedom} ability to affect an additional magical implement.
                In addition, you gain an additional \glossterm{attunement point}.
                You can only use this attunement point to \glossterm{attune} to magic implements.
            ",
        },
        RankAbility {
            name: "Magic Absorption",
            is_magical: true,
            rank: 7,
            description: r"
                You can absorb and retain any \glossterm{magical} attack with your \textit{spell absorption} ability, not just spells.
                In addition, the accuracy bonus from your \textit{greater spell absorption} ability increases to +4.
            ",
        },
    ];
}

pub fn wild_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Chaotic Exertion",
            is_magical: true,
            rank: 0,
            description: r"
         You gain a \plus2 bonus to the roll when you use the \textit{desperate exertion} ability.
        This bonus stacks with the normal \plus2 bonus provided by that ability.


                ",
        },
        RankAbility {
            name: "Wildspell",
            is_magical: true,
            rank: 1,
            description: r"
         Whenever you cast a spell that does not have the \abilitytag{Attune} or \abilitytag{Sustain} tags, you may use this ability after making all other decisions for the spell (such as targets, intended area, and so on).
        When you do, you reduce your \glossterm{focus penalty} for casting the spell by 2, and you gain a +2 bonus to \glossterm{power} with the spell.
        In addition, roll 1d10 and apply the corresponding wild magic effect from \trefnp{Wild Magic Effects}.
        Some wild magic effects cannot be meaningfully applied to all spells.
        For example, changing the damage dealt by a spell does not affect spells that do not deal damage.
        Any wildspell effects that do not make sense for a particular spell should be ignored.
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
                6 & Each target that resists damage from the spell this round is also \glossterm{briefly} \dazed \\
                7 & Each target that loses hit points from the spell this round is also \glossterm{briefly} \sickened \\
                8 & When you deal damage with the spell this round, you roll twice for the spell and take the higher result \\
                9 & When you attack with the spell this round, you roll twice and take the higher result \\
                10 & During the \glossterm{action phase} of the next round, the spell takes effect again with the same choices for all decisions, such as targets \\
            \end{dtabularx}
        \end{dtable}

                ",
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
        },
        RankAbility {
            name: "Greater Chaotic Exertion",
            is_magical: true,
            rank: 3,
            description: r"
                Once per \glossterm{long rest}, you can use the \textit{desperate exertion} ability without increasing your \glossterm{fatigue level}.
            ",
        },
        RankAbility {
            name: "Greater Wildspell",
            is_magical: true,
            rank: 4,
            description: r"
                The bonus to \glossterm{power} from your \textit{wildspell} ability increases to +5.
                In addition, if you use the \textit{desperate exertion} ability to affect a spell you cast with the \textit{wildspell} ability, you can reroll the wild magic roll for that spell in addition to the normal effects of the \textit{desperate exertion} ability.
                You do not gain any bonus to the wild magic reroll.
            ",
        },
        RankAbility {
            name: "Greater Chaotic Insight",
            is_magical: true,
            rank: 5,
            description: r"
                You learn an additional spell with your \textit{chaotic insight} ability.
            ",
        },
        RankAbility {
            name: "Supreme Chaotic Exertion",
            is_magical: true,
            rank: 6,
            description: r"
                You can use your \textit{chaotic exertion} ability once per \glossterm{short rest} instead of once per long rest.
            ",
        },
        RankAbility {
            name: "Supreme Wildspell",
            is_magical: true,
            rank: 7,
            description: r"
                The bonus to \glossterm{power} from your \textit{wildspell} ability increases to +12.
                In addition, you replace your normal wild magic effects from your \textit{wildspell} ability with the effects from the table below.
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
                        10 & During both the \glossterm{action phase} and \glossterm{delayed action phase} of the next round, the spell takes effect again with the same choices for all decisions, such as targets \\
                    \end{dtabularx}
                \end{dtable}
            ",
        },
    ];
}
