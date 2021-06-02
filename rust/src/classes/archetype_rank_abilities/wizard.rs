use crate::classes::archetype_rank_abilities::RankAbility;

pub fn alchemist<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Alchemical Infusion",
            rank: 0,
            description: r"
        [Magical] Whenever you create or use an alchemical item, you may use your \glossterm{magical} \glossterm{power} in place of the item's normal power to determine its effects.
        % TODO: what if alchemical items deal damage over time?
        In addition, you may add half your magical power to the damage dealt by any alchemical items you use.


                ",
        },
        RankAbility {
            name: "Portable Workshop",
            rank: 1,
            description: r"
        [Magical]
        You carry materials necessary to refine low-grade alchemical items wherever you are.
        Where you lack material components, you fill in with some of your own magic, allowing you to create items more easily.
        The items are just as effective when used as items created normally.
        However, they are less durable, since they are partially sustained by your magic.
        Items created with this ability deteriorate and become useless after 24 hours or after you finish a long rest, whichever comes first.

        You can use this ability to create alchemical items with a item level up to your level (see \pcref{Item Levels}).
        Creating an item in this way functions in the same way as crafting alchemical items normally, with the following changes.
        First, you do not require any raw materials.
        Second, the maximum duration of any item created with this ability is five minutes.
        Third, you can only maintain the existence of three items with this ability at once.
        If you try to create a fourth item, you must stop maintaining the existence of another item created.
        You can do this as a \glossterm{free action} regardless of distance.
        This removes any lingering effects from the removed item, such as the protective qualities of an \textit{antitoxin elixir}.

                ",
        },
        RankAbility {
            name: "Alchemical Discovery",
            rank: 2,
            description: r"
         You learn how to create alchemical items more effectively.
        You gain your choice of one of the following benefits.
        Each benefit can only be chosen once.
        {
            \parhead{Aerodynamic Construction} The range of thrown alchemical items you create increases by 30 feet.
                This does not affect alchemical items that are not designed to be thrown.
            \parhead{Complex Construction} You can use your portable workshop ability to create items with an item level up to two levels higher than your level.
            \parhead{Efficient Crafting} It takes you half the normal time and material components to craft alchemical items without using your \textit{portable workshop} ability.
            \parhead{Enduring Construction} The duration of any alchemical item you create is doubled.
                % TODO: wording
                % In addition, alchemical items that last for a fixed number of uses have their number of uses doubled.
            \parhead{Explosive Construction} The area affected by any alchemical item you create is doubled.
            \parhead{Potent Construction} The damage dealt by any alchemical item you create gains a bonus equal to your rank in this archetype.
            \parhead{Repetitive Construction} Whenever you use your \textit{portable workshop} ability, you can create two copies of the same alchemical item.
            This only counts as one item for the purpose of determining the number of items you can maintain with that ability.
        }

                ",
        },
        RankAbility {
            name: "Experienced Quaffing",
            rank: 3,
            description: r"
         You can drink up to two doses of potions, elixirs, and other drinkable alchemical items as part of the same standard action.

                ",
        },
        RankAbility {
            name: "Alchemical Discovery",
            rank: 4,
            description: r"
         You gain an additional \textit{alchemical discovery} ability.

                ",
        },
        RankAbility {
            name: "Greater Portable Workshop",
            rank: 5,
            description: r"
        [Magical] The number of items you can maintain with your \textit{portable workshop} ability increases to 5.

                ",
        },
        RankAbility {
            name: "Alchemical Discovery",
            rank: 6,
            description: r"
         You gain an additional \textit{alchemical discovery} ability.

                ",
        },
        RankAbility {
            name: "Greater Experienced Quaffing",
            rank: 7,
            description: r"
         You can drink a single dose of a potion, elixir, or other drinkable alchemical item as a \glossterm{minor action}.
                ",
        },
    ];
}

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
            This bonus is considered to come from a shield, and does not stack with the benefits of using a physical shield.

            This ability lasts until you use it again or until you \glossterm{dismiss} it as a free action.
            In addition, it is automatically dismissed if you wear body armor.
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

pub fn arcane_scholar<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Deep Knowledge",
            rank: 0,
            description: r"
         You gain a \plus2 bonus to all Knowledge skills.
        In addition, using the \textit{desperate exertion} ability to affect a roll using a Knowledge skill only causes you to increase your \glossterm{fatigue level} by one instead of two.


                ",
        },
        RankAbility {
            name: "Ritualist",
            rank: 1,
            description: r"
        [Magical] You gain the ability to perform arcane rituals to create unique magical effects (see \pcref{Rituals}).
        The maximum \glossterm{rank} of arcane ritual you can learn or perform is equal to the maximum rank of arcane spell that you can cast.
        If you have the ability to cast rank 1 arcane spells, you may immediately scribe one rank 1 ritual without paying the normal costs.
        In addition, whenever you gain access to a new spell rank, you can scribe one ritual of that rank or lower without paying the normal costs.

                ",
        },
        RankAbility {
            name: "Scholastic Insight",
            rank: 2,
            description: r"
        [Magical]
        You gain one of the following insights.
        Some insights can be chosen multiple times, as indicated in their descriptions.

        {
            \parhead{Esoteric Spell Knowledge} You learn a single spell from any arcane \glossterm{mystic sphere}.
            You do not not need to have access to that mystic sphere.
            This does not grant you access to that mystic sphere for any other purposes.
            Whenever you gain access to a new mystic sphere or spell rank, you may choose a different spell with this ability.
            \par You can choose this insight multiple times, learning an additional spell each time.

            \parhead{Expanded Sphere Access} You gain access to a new \glossterm{mystic sphere}.
            \par You cannot choose this insight multiple times.

            \parhead{Sphere Specialization} Choose a a \glossterm{mystic sphere} you have access to.
            You gain a \plus1 bonus to \glossterm{accuracy} with abilities from that \glossterm{mystic sphere}.
            In addition, you learn an additional \glossterm{spell} from that \glossterm{mystic sphere}.
            In exchange, you must lose access to another \glossterm{mystic sphere} you have.
            You must exchange all spells you know from that \glossterm{mystic sphere} with spells from other \glossterm{mystic spheres} you have access to.
            \par You cannot choose this insight multiple times.

            \parhead{Memorized Sphere} % TODO: clarify you need to be high enough rank?
            Choose a \glossterm{mystic sphere} you have access to.
            You can perform rituals from that \glossterm{mystic sphere} without having them written in your ritual book.
            If you lead a ritual from that \glossterm{mystic sphere}, it requires half the normal amount of time to perform and requires half the normal number of \glossterm{fatigue levels}, to a minimum of zero fatigue levels.
            \par You can choose this insight multiple times, choosing a different \glossterm{mystic sphere} each time.
        }

                ",
        },
        RankAbility {
            name: "Contingency",
            rank: 3,
            description: r"
        [Magical] You gain the ability to prepare a spell so it takes effect automatically if specific circumstances arise.
        % If any spells take more than one standard action, they would need to be excluded from Contingency, but none exist
        % You can apply this ability to any arcane spell that can be cast as a \glossterm{standard action} or \glossterm{minor action}.
        Preparing a spell with this ability takes 5 minutes.
        When the preparation is complete, the spell has no immediate effect.
        Instead, it automatically takes effect when some specific circumstances arise.
        During the time required to cast the spell, you specify what circumstances cause the spell to take effect.

        The spell can be set to trigger in response to any circumstances that a typical human observing you and your situation could detect.
        For example, you could specify ``when I fall at least 50 feet'' or ``when I take a \glossterm{vital wound}'', but not ``when there is an invisible creature within 50 feet of me'' or ``when I have only one \glossterm{hit point} remaining.''
        The more specific the required circumstances, the better -- vague requirements, such as ``when I am in danger'', may cause the spell to trigger unexpectedly or fail to trigger at all.
        If you attempt to specify multiple separate triggering conditions, such as ``when I take damage or when an enemy is adjacent to me'', the spell will randomly ignore all but one of the conditions.

        If the spell needs to be targeted, the trigger condition can specify a simple rule for identifying how to target the spell, such as ``the closest enemy''.
        If the rule is poorly worded or imprecise, the spell may target incorrectly or fail to activate at all.
        Any spells which require decisions, such as the \spell{dimension door} spell, must have those decisions made at the time it is cast.
        You cannot alter those decisions when the contingency takes effect.

        You can have only one spell with this ability active at a time.
        If you use this ability again with a different spell, the old contingency is removed.

                ",
        },
        RankAbility {
            name: "Scholastic Insight",
            rank: 4,
            description: r"
        [Magical]
        You learn an additional \textit{scholastic insight}.

                ",
        },
        RankAbility {
            name: "Greater Ritualist",
            rank: 5,
            description: r"
        [Magical] Whenever you lead a ritual, it requires half the normal number of \glossterm{fatigue levels} and half the normal time to complete, to a minimum of zero fatigue levels.

                ",
        },
        RankAbility {
            name: "Scholastic Insight",
            rank: 6,
            description: r"
        [Magical]
        You learn an additional \textit{scholastic insight}.

                ",
        },
        RankAbility {
            name: "Multiple Contingency",
            rank: 7,
            description: r"
        [Magical] You may have two separate \textit{contingency} abilities active at the same time.
        Each contingency can have separate triggering conditions.
        Only one contigency can trigger each round.
        If multiple contingencies would activate simultaneously, choose one to activate randomly.
                ",
        },
    ];
}

pub fn arcane_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Mystic Sphere",
            rank: 0,
            description: r"
         You gain access to an additional arcane \glossterm{mystic sphere}, including all \glossterm{cantrips} from that sphere.


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
            \parhead{Rituals} You gain the ability to perform arcane rituals to create unique magical effects (see \pcref{Rituals}).
                The maximum \glossterm{rank} of arcane ritual you can learn or perform is equal to the maximum rank of arcane spell that you can cast.
                You cannot choose this ability multiple times.
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

pub fn school_specialist<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "School Specialization",
            rank: 0,
            description: r"
         The arcane mystic spheres can be divided into six traditional schools of magic.
        Choose one of the following schools of magic.
        You are a specialist in your chosen school.
        You cannot gain access to any arcane mystic spheres outside of your specialist school.
        In exchange, you gain an additional \glossterm{insight point}.
        \begin{itemize}
            \item Abjuration: \sphere{barrier}, \sphere{telekinesis}, \sphere{thaumaturgy}
            \item Conjuration: \sphere{astromancy}, \sphere{fabrication}, \sphere{summoning}
            \item Evocation: \sphere{cryomancy}, \sphere{electromancy}, \sphere{pyromancy}
            \item Illusion: \sphere{enchantment}, \sphere{photomancy}, \sphere{umbramancy}
            \item Transmutation: \sphere{chronomancy}, \sphere{polymorph}, \sphere{terramancy}
            \item Necromancy: \sphere{revelation}, \sphere{vivimancy}
        \end{itemize}


                ",
        },
        RankAbility {
            name: "Scholastic Discovery",
            rank: 1,
            description: r"
         You gain an ability based on your chosen school.
        {
            \subcf{Abjuration} You gain a bonus equal to twice your rank in this archetype to your \glossterm{damage resistance}.

            \subcf{Conjuration} You double the \glossterm{range} of arcane spells you cast.

            \subcf{Evocation} You gain a \plus2 bonus to \glossterm{power}.

            \subcf{Illusion} You gain a \plus1 bonus to \glossterm{accuracy}.

            \subcf{Transmutation} You gain a \plus2 bonus to Fortitude, Reflex, or Mental defense.
            You can change the defense this bonus applies to as a \glossterm{minor action}.

            \subcf{Necromancy} You gain a bonus equal to three times your rank in this archetype to your maximum \glossterm{hit points}.
            In addition, you gain a \plus1 bonus to Fortitude defense.
        }

                ",
        },
        RankAbility {
            name: "Spell Knowledge",
            rank: 2,
            description: r"
         You learn an additional arcane spell.

                ",
        },
        RankAbility {
            name: "Scholastic Attunement",
            rank: 3,
            description: r"
         You gain an additional \glossterm{attunement point}.
        You can only use this attunement point to \glossterm{attune} to a spell from your chosen school.

                ",
        },
        RankAbility {
            name: "Greater Scholastic Discovery",
            rank: 4,
            description: r"
         Your understanding of your chosen school improves.
        {
            % it's normally impossible to get 3x rank DR at rank 4 - is this too early?
            % generally this gives bonuses that wizards can't normally access due to the sphere limitations, so it might be ok
            \subcf{Abjuration} The bonus to damage resistance increases to three times your rank in this archetype.

            \subcf{Conjuration} The range improvement increases to triple your range.

            \subcf{Evocation} The power bonus increases to \plus4.

            \subcf{Illusion} The accuracy bonus increases to \plus2.

            \subcf{Transmutation} The defense bonus increases to \plus3.
            In addition, changing which defense the bonus applies to becomes a \abilitytag{Swift} effect, so it protects you from attacks during the phase that you change it.

            \subcf{Necromancy} The hit point bonus increases to five times your rank in this archetype.
            In addition, the Fortitude bonus increases to \plus2.
        }

                ",
        },
        RankAbility {
            name: "Spell Knowledge",
            rank: 5,
            description: r"
         You learn an additional arcane spell.

                ",
        },
        RankAbility {
            name: "Greater Scholastic Attunement",
            rank: 6,
            description: r"
         The number of attunement points you gain from your \textit{scholastic attunement} ability increases to two.

                ",
        },
        RankAbility {
            name: "Supreme Scholastic Discovery",
            rank: 7,
            description: r"

         Your understanding of your chosen school improves further.
        {
            \subcf{Abjuration} The bonus to damage resistance increases to four times your rank in this archetype.

            \subcf{Conjuration} The range improvement increases to quadruple your range.

            \subcf{Evocation} The power bonus increases to \plus8.

            \subcf{Illusion} The accuracy bonus increases to \plus3.

            \subcf{Transmutation} The defense bonus increases to \plus4.
            In addition, you can change which defense the bonus applies to as a \glossterm{free action}.

            \subcf{Necromancy} The hit point bonus increases to seven times your rank in this archetype.
            In addition, the Fortitude bonus increases to \plus3.
        }
                ",
        },
    ];
}
