use crate::classes::archetype_rank_abilities::RankAbility;

pub fn blessings_of_the_abyss<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Fiendish Resistance",
            is_magical: true,
            rank: 0,
            description: r"
                You gain a bonus equal to twice your rank in this archetype to your \glossterm{damage resistance} (minimum 1).
            ",
        },
        RankAbility {
            name: "Abyssal Blast",
            is_magical: true,
            rank: 1,
            description: r"
                You can use the \textit{abyssal blast} ability as a standard action.
                \begin{instantability}{Abyssal Blast}[Instant]
                    \rankline
                    Make an attack vs. Armor against one creature or object within \rngmed range.
                    \hit The target takes fire damage equal to 1d10 plus your \glossterm{power}.

                    \rankline
                    \rank{2} The damage increases to 2d6.
                    \rank{3} The damage increases to 2d10.
                        In addition, if you miss by 2 or less, the target takes half damage.
                        This is called a \glossterm{glancing blow}.
                    \rank{4} The damage increases to 4d6.
                    \rank{5} The damage increases to 4d10.
                    \rank{6} The damage increases to 5d10.
                    \rank{7} The damage increases to 7d10.
                \end{instantability}
            ",
        },
        RankAbility {
            name: "Abyssal Sphere",
            is_magical: true,
            rank: 2,
            description: r"
                If you have access to pact magic, choose one of the following \glossterm{mystic spheres}: \sphere{astromancy}, \sphere{enchantment}, \sphere{pyromancy}, or \sphere{summoning}.
                You gain access to that mystic sphere.
            ",
        },
        RankAbility {
            name: "Resist the Dark Call",
            is_magical: true,
            rank: 2,
            description: r"
                If you do not have access to pact magic, you gain a +2 bonus to your Mental defense and a +1 bonus to your \glossterm{fatigue tolerance}.
            ",
        },
        RankAbility {
            name: "Banish to the Abyss",
            is_magical: true,
            rank: 3,
            description: r"
         You can use the \textit{banish to the abyss} ability as a standard action.
        \begin{durationability}{Banish to the Abyss}[Duration]
            \rankline
            Make an attack vs. Mental against one creature within \rngmed range.
            \hit The subject takes 2d6 \add half \glossterm{power} fire damage.
            If it loses \glossterm{hit points} from this damage, it is briefly teleported into the Abyss.
            At the end of the next round, it teleports back to its original location, or into the closest open space if that location is occupied.
            After it returns, it becomes immune to being teleported in this way until it takes a \glossterm{short rest}.
            \glance Half damage.

            \rankline
            The damage increases by \plus1d for each rank beyond 3.
            \rank{5} You gain a \plus1 bonus to \glossterm{accuracy} with the attack.
            \rank{7} The accuracy bonus increases to \plus2.
        \end{durationability}

                ",
        },
        RankAbility {
            name: "Hellfire",
            is_magical: true,
            rank: 4,
            description: r"
         You gain a \plus2 bonus to your \glossterm{magical} \glossterm{power}.
        In addition, whenever you use an ability that deals fire damage, you can change the type of the damage to be energy damage in place of fire damage.
        Any other aspects of the ability, including damage types other than fire, remain unchanged.

                ",
        },
        RankAbility {
            name: "Greater Fiendish Resistance",
            is_magical: true,
            rank: 5,
            description: r"
                The bonus from your \textit{fiendish resistance} ability increases to three times your rank in this archetype.
            ",
        },
        RankAbility {
            name: "Abyssal Curse",
            is_magical: true,
            rank: 6,
            description: r"
         You can use the \textit{abyssal curse} ability as a standard action.
        \begin{durationability}{Abyssal Curse}[Duration]
            \abilitytag{Curse}
            \rankline
            Make an attack vs. Fortitude against one creature or object within \rngmed range.
            \hit The target is \nauseated until it takes a \glossterm{short rest}.
            \glance The target is \glossterm{briefly} nauseated.
            \crit The target is nauseated until this curse is removed.

            \rankline
            You gain a \plus1 bonus to \glossterm{accuracy} with the attack for each rank beyond 6.
        \end{durationability}

                ",
        },
        RankAbility {
            name: "Brimstone",
            is_magical: true,
            rank: 7,
            description: r"
                The power bonus from your \textit{hellfire} ability increases to \plus4.
                In addition, whenever you cause a creature to lose \glossterm{hit points} with fire damage or energy damage, it becomes \glossterm{briefly} \sickened.
                After the effect ends, that creature then becomes immune to it until it takes a \glossterm{short rest}.
            ",
        },
    ];
}

pub fn keeper_of_forbidden_knowledge<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Reader of Hidden Tomes",
            is_magical: true,
            rank: 0,
            description: r"
         You treat all Knowledge skills as class skills for you.
        In addition, you gain a \plus2 bonus to all Knowledge skills.


                ",
        },
        RankAbility {
            name: "Eldritch Secret",
            is_magical: true,
            rank: 1,
            description: r"
         You learn one secret of your choice from the following list.
        Each secret grants great power at a cost.
        {
            \parhead{Secret of Bloodforging} While you are not wearing other body armor, your blood flows to the surface of your skin, manifesting a carapace of armor around you.
            This functions like body armor that provides a \plus4 bonus to your Armor defense and has no \glossterm{encumbrance}.
            It also provides a bonus equal to three times your rank in this archetype to your \glossterm{damage resistance}.
            However, the \textit{recover} action causes you to regain half as many hit points as it normally would.

            \parhead{Secret of Bloodsharing} Once per round, when you deal damage to a creature that causes it to lose \glossterm{hit points}, you regain \glossterm{hit points} equal to half the the hit points the creature lost this way.
            However, whenever you take damage, half of that damage is applied to your \glossterm{hit points} directly, ignoring your resistances.

            \parhead{Secret of Soulcursing} Whenever you would inflict a \glossterm{condition} on a creature that is not already under the effects of a Curse, that effect becomes a Curse on it instead of a condition.
            It is removed when the creature takes a \glossterm{short rest}.
            However, whenever you would gain a \glossterm{condition} that you are not \glossterm{immune} to, that effect becomes a \abilitytag{Curse} on you instead of a condition.
            If you were not already affected by a Curse from this ability, the old Curse becomes a condition instead.
            Whenever you take a \glossterm{short rest}, you remove any Curse affecting you as a result of this ability.
        }

                ",
        },
        RankAbility {
            name: "Unnatural Insight",
            is_magical: true,
            rank: 2,
            description: r"
         You gain up to two additional \glossterm{insight points}.
        For each insight point you gain in this way, you take a \minus1 penalty to all skills other than Knowledge skills.
        For each insight point you choose not to gain in this way, you gain a \plus1 bonus to all Knowledge skills.

                ",
        },
        RankAbility {
            name: "Lore of Corrupting Power",
            is_magical: true,
            rank: 3,
            description: r"
         You gain a \plus4 bonus to \glossterm{power}.
        However, you take a \minus2 penalty to Mental defense.

                ",
        },
        RankAbility {
            name: "Greater Eldritch Secret",
            is_magical: true,
            rank: 4,
            description: r"
         Your understanding of your chosen secret improves.
        {
            \parhead{Secret of Bloodforging} The bonus to damage resistance from the armor increases to five times your rank in this archetype.

            \parhead{Secret of Bloodsharing} The healing increases to be equal to the hit points lost by the creature you deal damage to.

            \parhead{Secret of Soulcursing} You can convert conditions into Curse effects against creatures that already have a single Curse effect active on them.
        }

                ",
        },
        RankAbility {
            name: "Greater Unnatural Insight",
            is_magical: true,
            rank: 5,
            description: r"
         The maximum number of insight points you can gain with your \textit{unnatural insight} ability increases to four.

                ",
        },
        RankAbility {
            name: "Greater Lore of Corrupting Power",
            is_magical: true,
            rank: 6,
            description: r"
         The bonus from your \textit{lore of corrupting power} ability increases to \plus8.

                ",
        },
        RankAbility {
            name: "Supreme Eldritch Secret",
            is_magical: true,
            rank: 7,
            description: r"
         Your understanding of your chosen secret improves again.
        {
            \parhead{Secret of Bloodforging} The bonus to damage resistance from the armor increases to seven times your rank in this archetype.
            In addition, the defense bonus increases to \plus5.

            \parhead{Secret of Bloodsharing} You can trigger the healing effect twice per round.

            \parhead{Secret of Soulcursing} You can convert conditions into Curse effects with this ability regardless of the number of Curse effects active on the subject.
        }
                ",
        },
    ];
}

pub fn pact_magic<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Cantrips",
            is_magical: true,
            rank: 0,
            description: r"
        
        Your soulkeeper grants you the ability to use pact magic.
        You gain access to one pact \glossterm{mystic sphere} (see \pcref{Pact Mystic Spheres}).
        You may spend \glossterm{insight points} to gain access to one additional pact \glossterm{mystic sphere} per two \glossterm{insight points}.
        You automatically learn all \glossterm{cantrips} from any mystic sphere you have access to.
        You do not yet gain access to any other spells from those mystic spheres.

        Pact spells require both \glossterm{verbal components} and \glossterm{somatic components} to cast (see \pcref{Casting Components}).
        For details about mystic spheres and casting spells, see \pcref{Spell and Ritual Mechanics}.


                ",
        },
        RankAbility {
            name: "Armor Tolerance",
            is_magical: true,
            rank: 0,
            description: r"
         You reduce your \glossterm{encumbrance} by 2 when determining your \glossterm{somatic component failure}.

                ",
        },
        RankAbility {
            name: "Spellcasting",
            is_magical: true,
            rank: 1,
            description: r"
        
        You become a rank 1 pact spellcaster.
        You learn two rank 1 \glossterm{spells} from pact \glossterm{mystic spheres} you have access to.
        You can also spend \glossterm{insight points} to learn one additional rank 1 spell per \glossterm{insight point}.
        Unless otherwise noted in a spell's description, casting a spell requires a \glossterm{standard action}.

        When you gain access to a new \glossterm{mystic sphere} or spell \glossterm{rank},
            you can forget any number of spells you know to learn that many new spells in exchange,
            including spells of the higher rank.
        All of those spells must be from pact mystic spheres you have access to.

                ",
        },
        RankAbility {
            name: "Spell Rank (2)",
            is_magical: true,
            rank: 2,
            description: r"
         You become a rank 2 pact spellcaster.
        This gives you access to spells that require a minimum rank of 2.

                ",
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 2,
            description: r"
                You learn an additional pact \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
        },
        RankAbility {
            name: "Spell Rank (3)",
            is_magical: true,
            rank: 3,
            description: r"
         You become a rank 3 pact spellcaster.
        This gives you access to spells that require a minimum rank of 3 and can improve the effectiveness of your existing spells.

                ",
        },
        RankAbility {
            name: "Greater Armor Tolerance",
            is_magical: true,
            rank: 3,
            description: r"
         The penalty reduction from your \textit{armor tolerance} ability increases to 3.

                ",
        },
        RankAbility {
            name: "Spell Rank (4)",
            is_magical: true,
            rank: 4,
            description: r"
         You become a rank 4 pact spellcaster.
        This gives you access to spells that require a minimum rank of 4 and can improve the effectiveness of your existing spells.

                ",
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 4,
            description: r"
                You learn an additional pact \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
            ",
        },
        RankAbility {
            name: "Spell Rank (5)",
            is_magical: true,
            rank: 5,
            description: r"
         You become a rank 5 pact spellcaster.
        This gives you access to spells that require a minimum rank of 5 and can improve the effectiveness of your existing spells.

                ",
        },
        RankAbility {
            name: "Spell Rank (6)",
            is_magical: true,
            rank: 6,
            description: r"
         You become a rank 6 pact spellcaster.
        This gives you access to spells that require a minimum rank of 6 and can improve the effectiveness of your existing spells.

                ",
        },
        RankAbility {
            name: "Supreme Armor Tolerance",
            is_magical: true,
            rank: 6,
            description: r"
         The penalty reduction from your \textit{armor tolerance} ability increases to 4.

                ",
        },
        RankAbility {
            name: "Spell Rank (7)",
            is_magical: true,
            rank: 7,
            description: r"
         You become a rank 7 pact spellcaster.
        This gives you access to spells that require a minimum rank of 7 and can improve the effectiveness of your existing spells.

                ",
        },
        RankAbility {
            name: "Spell Knowledge",
            is_magical: true,
            rank: 7,
            description: r"
         You learn an additional pact \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
                ",
        },
    ];
}

pub fn pact_spell_mastery<'a>() -> Vec<RankAbility<'a>> {
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
            \parhead{Distant Spell} Choose a pact \glossterm{spell} you know with a standard \glossterm{range}: Short, Medium, Long, Distant, or Extreme.
                You double your range with that spell.
                You can choose this ability multiple times, choosing a different spell each time.
            \parhead{Focused Caster} You reduce your \glossterm{focus penalty} by 1.
                You cannot choose this ability multiple times.
            \parhead{Rituals} You gain the ability to perform pact rituals to create unique magical effects (see \pcref{Rituals}).
                The maximum \glossterm{rank} of pact ritual you can learn or perform is equal to the maximum rank of pact spell that you can cast.
                In addition, you automatically learn one free pact ritual of each rank you have access to, including new ranks as you gain access to them.
                You cannot choose this ability multiple times.
            \parhead{Signature Spell} Choose a pact \glossterm{spell} you know.
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
            name: "Desperate Power",
            is_magical: true,
            rank: 2,
            description: r"
                Whenever you use the \textit{desperate exertion} ability to affect a \glossterm{magical} attack, you double your magical \glossterm{power} with that attack.
            ",
        },
        RankAbility {
            name: "Wellspring of Power",
            is_magical: true,
            rank: 3,
            description: r"
                You gain a \plus2 bonus to your \glossterm{magical} \glossterm{power}.
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
                The bonus from your \textit{wellspring of power} ability increases to \plus6.
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

pub fn soulkeepers_chosen<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Empowering Whispers",
            is_magical: true,
            rank: 0,
            description: r"
        
        You gain an ability based on the type of whispers you hear with your \textit{whispers of the lost} ability.
        {
            \subcf{Mentoring Whispers} You gain an additional \glossterm{trained} skill (see \pcref{Trained Skills}).

            \subcf{Spiteful Whispers} Whenever you miss a creature with an attack, you \glossterm{briefly} gain a \plus1 bonus to \glossterm{accuracy} against that creature.
            As normal, this bonus does not stack with itself, even if you miss the same creature multiple times.

            \subcf{Sycophantic Whispers} You gain a \plus2 bonus to your Mental defense.

            \subcf{Warning Whispers} You gain a \plus2 bonus to \glossterm{initiative} checks and Reflex defense.

            \subcf{Whispers of the Mighty} You gain a \plus2 bonus to your Fortitude defense.
        }


                ",
        },
        RankAbility {
            name: "Possession",
            is_magical: true,
            rank: 1,
            description: r"
         You can use the \textit{possession} ability as a \glossterm{free action} to allow your soulkeeper a greater influence over your actions.
        \begin{durationability}{Possession}[\abilitytag{Sustain} (free)]
            \rankline
            You gain the following benefits and drawbacks:
            \begin{itemize}
                \item You gain a \plus2 bonus to your \glossterm{magical} \glossterm{power}.
                \item You gain a \plus4 bonus to your \glossterm{fatigue tolerance}.
                    If you would be unconscious due to fatigue without this bonus, your soulkeeper directly controls all of your actions.
                    Your soulkeeper's objectives may differ from your own, but except in very unusual circumstances, your soulkeeper is invested in continuing your life and ensuring your victory in difficult circumstances.
                \item You take a \minus2 penalty to Fortitude and Mental defenses.
                \item You are unable to take \glossterm{standard actions} that do not cause you to make \glossterm{magical} attacks.
                \item At the end of each round, if you did not make a \glossterm{magical} attack that round, this ability ends.
                \item When this ability ends for any reason, you \glossterm{briefly} cannot use it again.
            \end{itemize}

            \rankline
            \rank{3} The power bonus increases to \plus4.
            \rank{5} The power bonus increases to \plus8.
            \rank{7} The power bonus increases to \plus16.
        \end{durationability}

                ",
        },
        RankAbility {
            name: "Exchange Soul Fragment",
            is_magical: true,
            rank: 2,
            description: r"
         Your connection to your soulkeeper deepens, allowing you to send a fragment of your experiences through the link.
        You can use the \textit{exchange soul fragment} ability as a \glossterm{minor action}.
        \begin{instantability}{Exchange Soul Fragment}[Instant]
            \abilitytag{Swift}
            \rankline
            When you use this ability, you increase your \glossterm{fatigue level} by one.

            Remove a \glossterm{brief} effect or \glossterm{condition} affecting you.
            This cannot remove an effect applied during the current round.
            Because this ability has the \abilitytag{Swift} tag, the penalties from the removed effect do not affect you during the current phase.
        \end{instantability}

                ",
        },
        RankAbility {
            name: "Greater Empowering Whispers",
            is_magical: true,
            rank: 3,
            description: r"
         You gain an additional ability depending on the voices you chose with your \textit{whispers of the lost} ability.
        {
            \subcf{Mentoring Whispers} You gain an additional \glossterm{insight point}.

            \subcf{Spiteful Whispers} The bonus from your \textit{empowering whispers} ability increases to \plus2.

            \subcf{Sycophantic Whispers} The bonus from your \textit{empowering whispers} ability increases to \plus4.

            \subcf{Warning Whispers} The bonuses from your \textit{empowering whispers} ability increases to \plus4.

            \subcf{Whispers of the Mighty} The bonus from your \textit{empowering whispers} ability increases to \plus4.
        }

                ",
        },
        RankAbility {
            name: "Greater Possession",
            is_magical: true,
            rank: 4,
            description: r"
                You are immune to being \dazed, \stunned, \confused, and \disoriented during your \textit{possession} ability.
            ",
        },
        RankAbility {
            name: "Exchange Vitality",
            is_magical: true,
            rank: 5,
            description: r"
         Your connection to your soulkeeper deepens, allowing you to send a fragment of your vitality through the link.
        You can use the \textit{exchange vitality} ability as a \glossterm{minor action}.
        \begin{instantability}{Exchange Vitality}[Instant]
            \abilitytag{Swift}
            \rankline
            When you use this ability, you increase your \glossterm{fatigue level} by two.

            Remove one of your \glossterm{vital wounds}.
            This cannot remove a vital wound applied during the current round.
            Because this ability has the \abilitytag{Swift} tag, the penalties from the removed vital wound do not affect you during the current phase.
        \end{instantability}

                ",
        },
        RankAbility {
            name: "Supreme Empowering Whispers",
            is_magical: true,
            rank: 6,
            description: r"
         You gain an additional ability depending on the voices you chose with your \textit{whispers of the lost} ability.
        {
            \subcf{Mentoring Whispers} You gain an additional \glossterm{insight point}.

            \subcf{Spiteful Whispers} The bonus from your \textit{empowering whispers} ability increases to \plus3.

            \subcf{Sycophantic Whispers} You are immune to all \abilitytag{Emotion} attacks.

            \subcf{Warning Whispers} You are never \unaware or \partiallyunaware.

            \subcf{Whispers of the Mighty} You gain a \plus1 bonus to \glossterm{vital rolls}.
        }

                ",
        },
        RankAbility {
            name: "Supreme Possession",
            is_magical: true,
            rank: 7,
            description: r"
                You double the range of spells you cast during your \textit{possession} ability.
            ",
        },
    ];
}
