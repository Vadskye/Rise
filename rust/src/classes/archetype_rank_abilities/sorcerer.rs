use crate::classes::archetype_rank_abilities::RankAbility;

pub fn arcane_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Cantrips",
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
            rank: 0,
            description: r"
         You can use the \textit{mage armor} ability as a standard action.
        \begin{durationability}{Mage Armor}
            Duration
            \rankline
            You create a translucent suit of magical armor on your body and over your hands.
            This functions like body armor that provides a \plus2 bonus to Armor defense and has no \glossterm{encumbrance}.
            It also provides a bonus to \glossterm{damage resistance} equal to your rank in this archetype.

            As long as you have a free hand, the barrier also manifests as a shield that provides a \plus1 bonus to Armor defense.
            This bonus is considered to come from a shield, and does not stack with the benefits of using any other shield.

            This ability lasts until you use it again or until you \glossterm{dismiss} it as a free action.
            In addition, it is automatically dismissed if you wear other body armor of any kind.
        \end{durationability}

                ",
        },
        RankAbility {
            name: "Spellcasting",
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
            name: "Spell Rank",
            rank: 2,
            description: r"
         You become a rank 2 arcane spellcaster.
        This gives you access to spells that require a minimum rank of 2.

                ",
        },
        RankAbility {
            name: "Spell Knowledge",
            rank: 2,
            description: r"
         You learn an additional arcane \glossterm{spell} from a \glossterm{mystic sphere} you have access to.

                ",
        },
        RankAbility {
            name: "Spell Rank",
            rank: 3,
            description: r"
         You become a rank 3 arcane spellcaster.
        This gives you access to spells that require a minimum rank of 3 and can improve the effectiveness of your existing spells.

                ",
        },
        RankAbility {
            name: "Greater Mage Armor",
            rank: 3,
            description: r"
        
        The defense bonus from the body armor created by your \textit{mage armor} ability increases to \plus3.
        In addition, its bonus to \glossterm{damage resistance} increases to twice your rank in this archetype.

                ",
        },
        RankAbility {
            name: "Spell Rank",
            rank: 4,
            description: r"
         You become a rank 4 arcane spellcaster.
        This gives you access to spells that require a minimum rank of 4 and can improve the effectiveness of your existing spells.

                ",
        },
        RankAbility {
            name: "Spell Knowledge",
            rank: 4,
            description: r"
         You learn an additional arcane \glossterm{spell} from a \glossterm{mystic sphere} you have access to.

                ",
        },
        RankAbility {
            name: "Spell Rank",
            rank: 5,
            description: r"
         You become a rank 5 arcane spellcaster.
        This gives you access to spells that require a minimum rank of 5 and can improve the effectiveness of your existing spells.

                ",
        },
        RankAbility {
            name: "Spell Rank",
            rank: 6,
            description: r"
         You become a rank 6 arcane spellcaster.
        This gives you access to spells that require a minimum rank of 6 and can improve the effectiveness of your existing spells.

                ",
        },
        RankAbility {
            name: "Supreme Mage Armor",
            rank: 6,
            description: r"
        
        The defense bonus from the body armor created by your \textit{mage armor} ability increases to \plus4.
        In addition, its bonus to \glossterm{damage resistance} increases to three times times your rank in this archetype.

                ",
        },
        RankAbility {
            name: "Spell Rank",
            rank: 7,
            description: r"
         You become a rank 7 arcane spellcaster.
        This gives you access to spells that require a minimum rank of 7 and can improve the effectiveness of your existing spells.

                ",
        },
        RankAbility {
            name: "Spell Knowledge",
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
            rank: 0,
            description: r"
         You reduce your \glossterm{focus penalties} by 2.


                ",
        },
        RankAbility {
            name: "Mystic Insight",
            rank: 1,
            description: r"
        
        You gain your choice of one of the following abilities.
        Whenever you increase your rank in this archetype, you may change your choice.
        This can allow you to apply the benefits of insights like \textit{signature spell} to higher rank spells.
        {
            \parhead{Focused Caster} You reduce your \glossterm{focus penalty} by 1.
                You cannot choose this ability multiple times.
            \parhead{Insight Point} You gain an additional \glossterm{insight point}.
                You can choose this ability multiple times, gaining an additional insight point each time.
            \parhead{Signature Spell} Choose an arcane \glossterm{spell} you know.
                The spell loses the \abilitytag{Focus} tag, allowing you to cast it without lowering your guard in combat.
                In adition, you gain a \plus1 bonus to \glossterm{accuracy} with that spell.
                You can choose this ability multiple times, choosing a different spell each time.
            \parhead{Spell Power} Choose an arcane \glossterm{spell} you know.
                You gain a bonus equal to your rank in this archetype to your \glossterm{power} with that spell.
                You can choose this ability multiple times, choosing a different spell each time.
        }

                ",
        },
        RankAbility {
            name: "Arcane Attunement",
            rank: 2,
            description: r"
         You gain an additional \glossterm{attunement point}.

                ",
        },
        RankAbility {
            name: "Wellspring of Power",
            rank: 3,
            description: r"
        
        You gain a \plus2 bonus to your \glossterm{magical} \glossterm{power}.

                ",
        },
        RankAbility {
            name: "Mystic Insight",
            rank: 4,
            description: r"
        
        You gain an additional \textit{mystic insight} ability.

                ",
        },
        RankAbility {
            name: "Greater Arcane Attunement",
            rank: 5,
            description: r"
         The number of attunement points you gain from your \textit{arcane attunement} ability increases to two.

                ",
        },
        RankAbility {
            name: "Greater Wellspring of Power",
            rank: 6,
            description: r"
        
        The bonus from your \textit{wellspring of power} ability increases to \plus6.

                ",
        },
        RankAbility {
            name: "Mystic Insight",
            rank: 7,
            description: r"
        
        You gain an additional \textit{mystic insight} ability.
                ",
        },
    ];
}

pub fn draconic_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Draconic Bloodline",
            rank: 0,
            description: r"
         Choose a type of dragon from among the dragons on \trefnp{Draconic Bloodline Types}.
        You have the blood of that type of dragon in your veins.
        You gain a \plus4 bonus to \glossterm{defenses} against attacks that deal damage of the type dealt by that dragon's breath weapon.

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
            rank: 0,
            description: r"
         You reduce your \glossterm{focus penalties} by 1.

                ",
        },
        RankAbility {
            name: "Draconic Spells",
            rank: 1,
            description: r"
         If you already have access to your dragon's mystic sphere, you learn two spells from that sphere.
        Otherwise, you gain access to that mystic sphere, including all \glossterm{cantrips} from that sphere.

                ",
        },
        RankAbility {
            name: "Greater Draconic Focus",
            rank: 2,
            description: r"
         The focus penalty reduction from your \textit{draconic focus} ability increases to 2.

                ",
        },
        RankAbility {
            name: "Greater Draconic Bloodline",
            rank: 2,
            description: r"
         The defense bonus from your \textit{draconic bloodline} ability increases to \plus6.

                ",
        },
        RankAbility {
            name: "Draconic Hide",
            rank: 3,
            description: r"
         You gain a bonus equal to twice your rank in this archetype to your \glossterm{damage resistance}.

                ",
        },
        RankAbility {
            name: "Draconic Precision",
            rank: 4,
            description: r"
         You gain a \plus1 bonus to \glossterm{accuracy} with any spell that either deals damage of your dragon's damage type or is from your dragon's \glossterm{mystic sphere}.

                ",
        },
        RankAbility {
            name: "Draconic Spell",
            rank: 5,
            description: r"
         You learn an additional arcane spell from your dragon's mystic sphere.

                ",
        },
        RankAbility {
            name: "Energy Immunity",
            rank: 5,
            description: r"
         You become immune to your dragon's damage type.

                ",
        },
        RankAbility {
            name: "Greater Draconic Hide",
            rank: 6,
            description: r"
         The bonus from your \textit{draconic hide} ability increases to three times your rank in this archetype.

                ",
        },
        RankAbility {
            name: "Greater Draconic Precision",
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
            rank: 0,
            description: r"
         None of your arcane spells have \glossterm{somatic components} or \glossterm{verbal components}.


                ",
        },
        RankAbility {
            name: "Mystic Tolerance",
            rank: 1,
            description: r"
         You gain a bonus equal to twice your rank in this archetype to your \glossterm{damage resistance}.

                ",
        },
        RankAbility {
            name: "Personal Enhancement",
            rank: 2,
            description: r"
         You gain a \glossterm{magic bonus} equal to half your rank in this archetype to \glossterm{accuracy} and \glossterm{defenses}.
        Because this is a magic bonus, it does not stack with other magic bonuses (see \pcref{Stacking Rules}).

                ",
        },
        RankAbility {
            name: "Spell Absorption",
            rank: 3,
            description: r"
         Whenever another creature uses a spell to attack you, if that spell does not have the \glossterm{Attune} tag, you can choose to absorb its energy.
        This does not reduce the spell's effect on you, but it grants you the ability to cast the spell.
        When you cast the spell, you use your own \glossterm{accuracy}, \glossterm{power}, and abilities to determine the effects of the spell.

        Whenever you are attacked by a new spell, if you already have the ability to cast a spell with this ability, you choose which spell you gain the ability to cast.
        When you take a \glossterm{long rest}, you lose the ability to cast any spells you have stored with this ability.

                ",
        },
        RankAbility {
            name: "Implement Freedom",
            rank: 4,
            description: r"
         You can gain the benefits of one magical implement, such as a staff or wand, without having to hold it in your hands.
        You must still have it on your person, such as in a pocket or strapped to your back, and you must still be attuned to it to gain its benefits.
        This ability only affects one implement at a time.

                ",
        },
        RankAbility {
            name: "Greater Mystic Tolerance",
            rank: 5,
            description: r"
         The bonus from your \textit{mystic tolerance} ability increases to three times your rank in this archetype.

                ",
        },
        RankAbility {
            name: "Greater Spell Absorption",
            rank: 6,
            description: r"
         You can retain up to two spells with your \glossterm{spell absorption} ability.

                ",
        },
        RankAbility {
            name: "Greater Implement Freedom",
            rank: 7,
            description: r"
         You can use your \textit{implement freedom} ability to affect an additional magical implement.
        In addition, you gain an additional \glossterm{attunement point}.
        You can only use this attunement point to \glossterm{attune} to magic implements.
                ",
        },
    ];
}

pub fn wild_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Chaotic Exertion",
            rank: 0,
            description: r"
         You gain a \plus2 bonus to the roll when you use the \textit{desperate exertion} ability.
        This bonus stacks with the normal \plus2 bonus provided by that ability.


                ",
        },
        RankAbility {
            name: "Wildspell",
            rank: 1,
            description: r"
         Whenever you cast a spell that does not have the \abilitytag{Attune} or \abilitytag{Sustain} tags, you may use this ability after making all other decisions for the spell (such as targets, intended area, and so on).
        When you do, you reduce your \glossterm{focus penalties} for casting the spell by 2, and you gain a bonus equal to your rank in this archetype to \glossterm{power} with the spell.
        In addition, roll 1d10 and apply the corresponding wild magic effect from \trefnp{Wild Magic Effects}.
        Some wild magic effects cannot be meaningfully applied to all spells.
        For example, changing the damage dealt by a spell does not affect spells that do not deal damage.
        Any wildspell effects that do not make sense for a particular spell should be ignored.

        \begin{dtable}
            \lcaption{Wild Magic Effects}
            \begin{dtabularx}{\textwidth}{l X}
                \tb{Roll} & \tb{Effect} \tableheaderrule
                1 & The spell fails with no effect \\
                2 & When you attack with the spell this round, you roll twice and take the lower result \\
                3 & When you attack with the spell this round, you are a target of the attack in addition to any other targets \\
                4 & The spell's area is halved this round \\
                5 & The spell's area is doubled this round \\
                6 & Each target that resists damage from the spell this round is also \dazed until the end of the next round \\
                7 & Each target that loses hit points from the spell this round is also \sickened until the end of the next round \\
                8 & When you deal damage with the spell this round, you roll twice for the spell and take the higher result \\
                9 & When you attack with the spell this round, you roll twice and take the higher result \\
                10 or higher & During the \glossterm{action phase} of the next round, the spell takes effect again with the same choices for all decisions, such as targets \\
            \end{dtabularx}
        \end{dtable}

                ",
        },
        RankAbility {
            name: "Chaotic Insight",
            rank: 2,
            description: r"
         You learn a spell that does not have the \abilitytag{Attune} or \abilitytag{Sustain} tags from any \glossterm{mystic sphere}, even if you do not have access to that mystic sphere.
        The spell does not have to be from a mystic sphere on the arcane mystic sphere list.
        As normal, you can change which spell you learn with this ability as you gain access to new spell ranks.

                ",
        },
        RankAbility {
            name: "Greater Chaotic Exertion",
            rank: 3,
            description: r"
         Once per \glossterm{long rest}, you can use the \textit{desperate exertion} ability without increasing your \glossterm{fatigue level}.

                ",
        },
        RankAbility {
            name: "Greater Wildspell",
            rank: 4,
            description: r"
         The bonus to \glossterm{power} from your \textit{wildspell} ability increases to twice your rank in this archetype.

                ",
        },
        RankAbility {
            name: "Greater Chaotic Insight",
            rank: 5,
            description: r"
         You learn an additional spell with your \textit{chaotic insight} ability.

                ",
        },
        RankAbility {
            name: "Supreme Chaotic Exertion",
            rank: 6,
            description: r"
         You can use your \textit{chaotic exertion} ability once per \glossterm{short rest} instead of once per long rest.

                ",
        },
        RankAbility {
            name: "Supreme Wildspell",
            rank: 7,
            description: r"

         You replace your normal wild magic effects from your \textit{wildspell} ability with the effects from the table below.
        \begin{dtable}
            \lcaption{Epic Wild Magic Effects}
            \begin{dtabularx}{\textwidth}{l X}
                \tb{Roll} & \tb{Effect} \tableheaderrule
                1 or lower & The spell has its normal effect \\
                2 & All damage dealt by the spell is considered to be all damage types \\
                3 & When you attack with the spell this round, you roll twice and take the higher result \\
                4 & When you deal damage with the spell this round, you roll twice for the spell and take the higher result \\
                5 & Any \glossterm{conditions} inflicted by the spell this round become a \abilitytag{Curse} instead of a condition, and are removed when the target takes a \glossterm{short rest} \\
                6 & When the spell would cause a creature to lose hit points this round, that creature loses twice as many hit points \\
                7 & The spell's area is tripled this round \\
                8 & Each target that loses hit points from the spell this round is also \stunned until the end of the next round \\
                9 & You gain a \plus4 bonus to \glossterm{accuracy} with the spell this round, but you take the minimum possible result when the spell would deal damage \\
                10 or higher & During both the \glossterm{action phase} and \glossterm{delayed action phase} of the next round, the spell takes effect again with the same choices for all decisions, such as targets \\
            \end{dtabularx}
        \end{dtable}
                ",
        },
    ];
}
