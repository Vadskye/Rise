use crate::classes::archetype_rank_abilities::RankAbility;

pub fn assassin<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Stealthy Instincts",
            is_magical: false,
            rank: 0,
            description: r"
         You gain a \plus2 bonus to the Stealth skill.
        In addition, using the \textit{desperate exertion} ability to affect a roll using the Stealth skill only causes you to increase your \glossterm{fatigue level} by one instead of two.


                ",
        },
        RankAbility {
            name: "Sneak Attack",
            is_magical: false,
            rank: 1,
            description: r"
        
        You can use the \textit{sneak attack} ability as a standard action.
        % This ability gets rank upgrades while maneuvers don't
        % because maneuvers are upgraded into higher rank maneuvers,
        % while this has no upgrades and should remain relevant alone.
        \begin{instantability}{Sneak Attack}[Instant]
            \rankline
            Make a \glossterm{strike} with a \glossterm{light weapon} or a \glossterm{projectile weapon} against a creature within \rngshort range.
            If the target is \unaware or \partiallyunaware of your attack, or if the target is adjacent to one of your \glossterm{allies}, you gain a \plus2d damage bonus with the strike.
            You do not gain this damage bonus against creatures who that you are unable to score a \glossterm{critical hit} against, such as excessively large creatures or oozes.

            \rankline
            \rank{3} The damage bonus increases to \plus3d.
            \rank{5} The damage bonus increases to \plus4d.
            \rank{7} The damage bonus increases to \plus5d.
        \end{instantability}

                ",
        },
        RankAbility {
            name: "Evasion",
            is_magical: false,
            rank: 2,
            description: r"
         You take half damage from abilities that affect an area and attack your Armor or Reflex defense.
        This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.

                ",
        },
        RankAbility {
            name: "Darkstalker",
            is_magical: true,
            rank: 3,
            description: r"
        You can use the \textit{darkstalker} ability as a standard action.
        \begin{attuneability}{Darkstalker}[\abilitytag{Attune} (self)]
            \rankline
            You become completely undetectable by your choice of one of the following sense groups:
            \begin{itemize}
                \item \glossterm{Blindsense} and \glossterm{blindsight}
                \item \glossterm{Darkvision}
                \item \abilitytag{Detection} abilities
                \item \glossterm{Lifesense} and \glossterm{lifesight}
                \item \glossterm{Scent}
                \item \abilitytag{Scrying} abilities
                \item \glossterm{Tremorsense} and \glossterm{tremorsight}
            \end{itemize}
            If you have access to any other more unusual senses, such as the \textit{blood sense} ability from the Executioner feat, you may also choose one of those senses as a separate sense group.
        \end{attuneability}

                ",
        },
        RankAbility {
            name: "Hide in Plain Sight",
            is_magical: false,
            rank: 4,
            description: r"
        
        You can use the \textit{hide} ability without moving in a way that causes observers to lose sight of you.
        This does not remove the bonus that observers receive if you have no cover or concealment at all.
        After you hide in this way, you \glossterm{briefly} cannot do so again.

                ",
        },
        RankAbility {
            name: "Greater Evasion",
            is_magical: false,
            rank: 5,
            description: r"
         Your \textit{evasion} ability also protects you from area attacks against your Fortitude and Mental defenses.

                ",
        },
        RankAbility {
            name: "Assassination",
            is_magical: false,
            rank: 6,
            description: r"
         You can use the \textit{assassination} ability as a \glossterm{minor action}.
        \begin{durationability}{Assassination}[Duration]
            \abilitytag{Swift}
            \rankline
            You study a creature within \rngmed range, finding weak points you can take advantage of.
            The subject \glossterm{briefly} takes maximum damage from your melee \glossterm{strikes} that it is \unaware of.
        \end{durationability}

                ",
        },
        RankAbility {
            name: "Greater Darkstalker",
            is_magical: true,
            rank: 7,
            description: r"
                When you use your \textit{darkstalker} ability, you become undetectable by any number of the possible sense groups, not just one.
            ",
        },
    ];
}

pub fn bardic_music<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Bardic Lore",
            is_magical: false,
            rank: 0,
            description: r"
                You gain two additional skill points.
                In addition, you gain all Knowledge skills as \glossterm{class skills}.
            ",
        },
        RankAbility {
            name: "Bardic Performances",
            is_magical: true,
            rank: 1,
            description: r"
        You learn two \textit{bardic performances} from the list below.
        You can also spend \glossterm{insight points} to learn one additional bardic performance per \glossterm{insight point}.
        You can use any bardic performance you know as a \glossterm{standard action} unless it specifies that it requires a different type of action to activate.

        All \textit{bardic performances} have the \abilitytag{Auditory} tag.
        When you use a \textit{bardic performance} ability, you begin a performance using one of your Perform skills.
        You must use either an instrumental performance or a vocal performance, and not a visual performance.
        If you use a vocal performance, the bardic performance gains the \abilitytag{Speech} tag, preventing it from affecting creatures that do not speak the language you perform in.
        You must be \glossterm{trained} with a Perform skill capable of making an auditory performance to use a bardic performance ability.
        If you are \glossterm{mastered} with an appropriate Perform skill, you gain a \plus2 bonus to \glossterm{accuracy} with the ability.

        The names of bardic performances do not have to precisely match your actual performance.
        For example, you can use the \textit{palliative poem} ability with a gentle song using Perform (wind instruments) or a distracting joke using Perform (comedy) instead of a poem.

        Many bardic performances require you to sustain the performance as a \glossterm{minor action}.
        If the targets stop being able to see or hear you, depending on the nature of your performance, the effect ends for them as if you had stopped sustaining the performance.
        However, targets do not stop being affected by your performance simply by travelling beyond the initial range of the bardic performance ability.
        Using a bardic performance ability with an immediate effect does not interfere with your ability to sustain other bardic performance abilities.
        {
            \begin{durationability}{Aria of Alacrity}[\abilitytag{Sustain} (minor)]
                \abilitytag{Auditory}
                \par \noindent Usage time: One \glossterm{minor action}.
                \rankline
                For the duration of your performance, all \glossterm{allies} within a \arealarge radius from you each gain a \plus5 foot bonus to their speed with all of their \glossterm{movement modes}.

                \rankline
                \rank{3} The speed bonus increases to \plus10 feet.
                \rank{5} The speed bonus increases to \plus15 feet.
                \rank{7} The speed bonus increases to \plus20 feet.
            \end{durationability}

            % Bardic performance power guidelines:
            % These generally start from the same rank 1 baseline effect as spells.
            % Since there are no higher rank bardic performances, they need more aggressive rank scalings to ensure
            % that a rank 7 bardic performance is comparable to a rank 7 spell. That is provided by the greater/supreme
            % bardic performance class abilities, and doesn't need to be included in each individual performance.
            % In general, bardsongs are likely to trade damage or accuracy for increased area.
            %
            % Bardsong debuffs are interesting, since they can't be removed like conditions, but also can't be stacked.
            % For now, they're just ranked in the same way as conditions.
            \begin{durationability}{Ballad of Belligerence}[\abilitytag{Sustain} (minor)]
                \abilitytag{Auditory}, \abilitytag{Emotion}
                \rankline
                Make an attack vs. Mental against all \glossterm{enemies} in a \areamed radius from you.
                \hit For the duration of your performance, each subject is unable to take any \glossterm{standard actions} that do not cause it to make an attack.
                For example, a subject could make a \glossterm{strike} or cast an offensive spell, but it could not heal itself or summon a creature.

                \rankline
                You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 1.
            \end{durationability}

            \begin{durationability}{Boastful Bravura}[Duration]
                \abilitytag{Auditory}
                \rankline
                This ability affects all \glossterm{enemies} within a \arealarge radius from you.
                You \glossterm{briefly} gain a \plus4 bonus to \glossterm{accuracy} with \textit{bardic performance} abilities against each subject.

                \rankline
                \rank{3} The bonus increases to \plus6.
                \rank{5} The bonus increases to \plus8.
                \rank{7} The bonus increases to \plus10.
            \end{durationability}

            \begin{instantability}{Cacaphony}[Instant]
                \abilitytag{Auditory}
                \rankline
                Make an attack vs. Fortitude against all \glossterm{enemies} in a \tinyarea radius from you.
                \hit Each subject takes 1d6 \add half \glossterm{power} sonic damage.

                \rankline
                \rank{2} The damage increases to 1d8, and the area increases to a \smallarea radius.
                \rank{3} The damage increases to 1d10, and the area increases to a \medarea radius.
                    In addition, if you miss by 2 or less, each subject takes half damage.
                    This is called a \glossterm{glancing blow}.
                \rank{4} The damage increases to 2d6.
                \rank{5} The damage increases to 2d8, and the area increases to a \largearea radius.
                \rank{6} The damage increases to 2d10.
                \rank{7} The damage increases to 4d6, and the area increases to a \hugearea radius.
            \end{instantability}

            \begin{durationability}{Cadenza of Courage}[Sustain (minor)]
                \abilitytag{Auditory}, \abilitytag{Emotion}
                \par \noindent Usage time: One \glossterm{minor action}.
                \rankline
                Choose yourself or one \glossterm{ally} within \medrange.
                For the duration of your performance, the subject gains a \plus1 bonus to \glossterm{accuracy}.

                \rankline
                \rank{3} The subject also gains a \plus2 bonus to Mental defense.
                \rank{5} The accuracy bonus increases to \plus2.
                \rank{7} The bonus to Mental defense increases to \plus4.
            \end{durationability}

            \begin{durationability}{Cantata of Caution}[Sustain (minor)]
                \abilitytag{Auditory}, \abilitytag{Emotion}
                \par \noindent Usage time: One \glossterm{minor action}.
                \rankline
                Choose yourself or one \glossterm{ally} within \medrange.
                For the duration of your performance, the subject gains a \plus1 bonus to Armor and Reflex defenses.

                \rankline
                \rank{3} The bonus applies to all defenses.
                \rank{5} The bonus to Armor and Reflex defenses increases to \plus2.
                \rank{7} The bonus to Fortitude and Mental defenses also increases to \plus2.
            \end{durationability}

            \begin{durationability}{Cleansing Counterpoint}[Sustain (minor)]
                \abilitytag{Auditory}
                \rankline
                Choose yourself or one \glossterm{ally} within \rngmed range.
                The subject chooses one of its \glossterm{brief} effects or \glossterm{conditions}.
                It cannot choose an effect applied during the current round.
                For the duration of your performance, the subject ignores that effect.

                \rankline
                \rank{3} You can target an additional \glossterm{ally} within range.
                \rank{5} This ability loses the \abilitytag{Sustain} (minor) tag.
                    Instead, the chosen effect is removed entirely.
                \rank{7} Each subject can remove two effects instead of one.
            \end{durationability}

            \begin{durationability}{Dazzling Discordance}[Duration]
                \abilitytag{Auditory}
                \rankline
                Make an attack vs. Mental against all \glossterm{enemies} within a \areamed radius from you.
                \hit Each subject is \glossterm{briefly} \dazzled.
                \crit Each subject is dazzled as a \glossterm{condition}.

                \rankline
                \rank{2} You gain a \plus1 \glossterm{accuracy} bonus with the attack, and the area increases to a \largearea radius.
                \rank{3} The accuracy bonus increases to \plus2.
                \rank{4} The accuracy bonus increases to \plus3, and the area increases to a \hugearea radius.
                \rank{5} The accuracy bonus increases to \plus4.
                \rank{6} The accuracy bonus increases to \plus5, and the area increases to a \gargarea radius.
                \rank{7} The accuracy bonus increases to \plus6.
            \end{durationability}

            \begin{instantability}{Dirge of Doom}[Instant]
                \abilitytag{Auditory}
                \rankline
                Make an attack vs. Mental against anything within \medrange.
                \hit The subject takes sonic damage equal to 1d10 plus your \glossterm{power}.

                \rankline
                \rank{2} The damage increases to 2d6.
                \rank{3} The damage increases to 2d10.
                    In addition, if you miss by 2 or less, the subject takes half damage.
                    This is called a \glossterm{glancing blow}.
                \rank{4} The damage increases to 4d6.
                \rank{5} The damage increases to 4d10.
                \rank{6} The damage increases to 5d10.
                \rank{7} The damage increases to 7d10.
            \end{instantability}

            \begin{durationability}{Dizzying Ditty}[\abilitytag{Sustain} (minor)]
                \abilitytag{Auditory}, \abilitytag{Compulsion}
                \rankline
                Make an attack vs. Mental against one creature within \shortrange.
                \hit For the duration of your performance, the subject is \dazed.
                \crit For the duration of your performance, the subject is \stunned.

                \rankline
                You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 1.
            \end{durationability}

            \begin{durationability}{Frightening Fugue}[\abilitytag{Sustain} (minor)]
                \abilitytag{Auditory}, \abilitytag{Emotion}
                \rankline
                Make an attack vs. Mental against one creature within \medrange.
                \hit The subject takes 1d6 sonic damage.
                If it loses \glossterm{hit points} from this damage, it is \frightened by you for the duration of your performance.
                Unlike normal, the subject continues to suffer the penalties of being frightened while it is beyond \rngmed range from you as long as it is still affected by your performance.

                \rankline
                \rank{2} The damage increases to 1d8.
                \rank{3} The damage increases to 2d6.
                    In addition, if you miss by 2 or less, the subject takes half damage.
                    This is called a \glossterm{glancing blow}.
                \rank{4} The damage increases to 2d8.
                \rank{5} The damage increases to 4d6.
                \rank{6} The damage increases to 4d8.
                \rank{7} The damage increases to 5d10.
            \end{durationability}

            \begin{durationability}{Hypnotic Hymn}[\abilitytag{Sustain} (minor)]
                \abilitytag{Auditory}, \abilitytag{Emotion}
                \rankline
                Make an attack vs. Mental against one creature within \medrange.
                You take a \minus10 penalty to \glossterm{accuracy} with this attack against creatures who are engaged in combat during the current phase.
                \hit For the duration of your performance, the subject is \charmed by you.
                Any act by you or by creatures that appear to be your allies that threatens or harms the charmed person breaks the effect.
                Harming the subject is not limited to dealing it damage, but also includes causing it significant subjective discomfort.
                An observant subject may interpret overt threats to its allies as a threat to itself.
                This ability does not have the \abilitytag{Subtle} tag, so an observant subject may notice it is being influenced.

                \rankline
                You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 1.
            \end{durationability}

            \begin{durationability}{Inspiring Intonation}[\abilitytag{Sustain} (minor)]
                \abilitytag{Auditory}, \abilitytag{Emotion}
                \par \noindent Usage time: One \glossterm{minor action}.
                \rankline
                Choose yourself or one \glossterm{ally} within \rngmed range.
                For the duration of your performance, the subject gains a \plus2 bonus to \glossterm{checks}.

                \rankline
                \rank{3} The bonus increases to \plus3.
                \rank{5} The bonus increases to \plus4.
                \rank{7} The bonus increases to \plus5.
            \end{durationability}

            \begin{durationability}{Mesmerizing Melody}[\abilitytag{Sustain} (minor)]
                \abilitytag{Auditory}, \abilitytag{Emotion}
                \rankline
                Make an attack vs. Mental against all creatures in a \largearea radius from you.
                You take a \minus10 penalty to \glossterm{accuracy} with this attack against creatures who are engaged in combat during the current phase.
                \hit For the duration of your performance, each subject is \fascinated by you.
                Any act by you or your apparent allies that harms a subject or that causes it to feel that it is in danger breaks the effect for that creature.
                Harming a subject is not limited to dealing it damage, but also includes causing it significant subjective discomfort.
                An observant subject may interpret overt threats to its allies as a threat to itself.

                \rankline
                You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 1.
            \end{durationability}

            \begin{instantability}{Palliative Poem}[\abilitytag{Sustain} (minor)]
                \abilitytag{Auditory}, \abilitytag{Healing}
                \rankline
                Choose one living \glossterm{ally} within \shortrange.
                The subject regains 1d10 \add \glossterm{power} \glossterm{hit points}.
                After you use this ability, you \\glossterm{briefly} cannot use it or any other \abilitytag{Healing} ability.

                \rankline
                \rank{2} The healing increases to 2d6.
                \rank{3} The healing increases to 2d10.
                \rank{4} The healing increases to 4d6.
                \rank{5} The healing increases to 4d10.
                \rank{6} The healing increases to 5d10.
                \rank{7} The healing increases to 7d10.
            \end{instantability}

            \begin{durationability}{Partita of Provocation}[\abilitytag{Sustain} (minor)]
                \abilitytag{Auditory}, \abilitytag{Emotion}
                \rankline
                Make an attack vs. Mental against all \glossterm{enemies} within a \largearea radius from you.
                \hit For the duration of your performance, each subject is \glossterm{goaded} by you.
                \crit There is no range limit to the accuracy penalty from the goaded effect.

                \rankline
                You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 1.
            \end{durationability}

            \begin{durationability}{Serenade of Serenity}[\abilitytag{Sustain} (minor)]
                \abilitytag{Auditory}, \abilitytag{Emotion}
                \par \noindent Usage time: One \glossterm{minor action}.
                \rankline
                For the duration of your performance, you and all \glossterm{allies} within a \largearea radius from you gain a \plus4 bonus to defenses against hostile \abilitytag{Compulsion} and \abilitytag{Emotion} effects.

                \rankline
                \rank{3} At the end of each round, each subject removes all \glossterm{brief} effects and \glossterm{conditions} caused by Compulsion and Emotion effects that were not applied during that round.
                \rank{5} The area increases to a \areahuge radius.
                \rank{7} Each subject is immune to Compulsion and Emotion attacks.
            \end{durationability}

            \begin{durationability}{Sickening Staccato}[Duration]
                \abilitytag{Auditory}
                \rankline
                Make an attack vs. Fortitude against all \glossterm{enemies} within a \areamed radius from you.
                \hit Each subject is \glossterm{briefly} \sickened.
                \crit Each subject is sickened as a \glossterm{condition}.

                \rankline
                \rank{2} You gain a \plus1 \glossterm{accuracy} bonus with the attack, and the area increases to a \largearea radius.
                \rank{3} The accuracy bonus increases to \plus2.
                \rank{4} The accuracy bonus increases to \plus3, and the area increases to a \hugearea radius.
                \rank{5} The accuracy bonus increases to \plus4.
                \rank{6} The accuracy bonus increases to \plus5, and the area increases to a \gargarea radius.
                \rank{7} The accuracy bonus increases to \plus6.
            \end{durationability}

            \begin{durationability}{Vigorous Verse}[Duration]
                \abilitytag{Auditory}
                \par \noindent Usage time: One \glossterm{minor action}.
                \rankline
                Choose yourself or one \glossterm{ally} within \rngmed range.
                For the duration of your performance, the subject gains a \plus4 bonus to its maximum \glossterm{hit points}.
                In addition, it immediately gains that many hit points.
                When this effect ends, the subject loses hit points equal to the hit points it gained this way.

                \rankline
                \rank{3} The bonus increases to \plus8.
                \rank{5} The bonus increases to \plus16.
                \rank{7} The bonus increases to \plus32.
            \end{durationability}
        }

                ",
        },
        RankAbility {
            name: "Combat Inspiration",
            is_magical: true,
            rank: 2,
            description: r"
                Once per round, when you make a Perform check, you may choose an \glossterm{ally} that can see or hear your performance.
                That ally gains a \plus1 bonus to \glossterm{accuracy} this round.
                This ability has the \glossterm{Swift} tag, so it affects attacks made during the current phase.
            ",
        },
        RankAbility {
            name: "Loremaster",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus2 bonus to all Knowledge skills.
            ",
        },
        RankAbility {
            name: "Virtuoso",
            is_magical: true,
            rank: 4,
            description: r"
                Once per round, you can \glossterm{sustain} two bardic performances as a single \glossterm{minor action}.
            ",
        },
        RankAbility {
            name: "Greater Combat Inspiration",
            is_magical: true,
            rank: 5,
            description: r"
         The bonus from your \textit{combat inspiration} ability increases to \plus2.

                ",
        },
        RankAbility {
            name: "Greater Loremaster",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{loremaster} ability increases to \plus4.
            ",
        },
        RankAbility {
            name: "Greater Virtuoso",
            is_magical: true,
            rank: 7,
            description: r"
                The number of bardic performances you can sustain with your \textit{virtuoso} ability increases to three.
            ",
        },
    ];
}

pub fn combat_trickster<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Tricky Finesse",
            is_magical: false,
            rank: 0,
            description: r"
                 You gain a \plus1 bonus to Dexterity-based \glossterm{checks}, except \glossterm{initiative} checks.
            ",
        },
        RankAbility {
            name: "Combat Styles",
            is_magical: false,
            rank: 1,
            description: r"
                You can confuse and confound your foes in combat.
                You gain access to one of the following \glossterm{combat styles}: \textit{dirty fighting}, \textit{ebb and flow}, or \textit{mobile assault}.
                In addition, you gain access to any two combat styles of your choice (see \pcref{Combat Styles}).
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.

                You learn two rank 1 \glossterm{maneuvers} from combat styles you have access to.
                You may spend \glossterm{insight points} to learn to one additional maneuver per insight point.
                Unless otherwise noted in an ability's description, using a maneuver requires a \glossterm{standard action}.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of the higher rank.
            ",
        },
        RankAbility {
            name: "Combat Style Rank (2)",
            is_magical: false,
            rank: 2,
            description: r"
                You become a rank 2 combat style user.
                This gives you access to maneuvers that require a minimum rank of 2.
            ",
        },
        RankAbility {
            name: "Tricky Force",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
        },
        RankAbility {
            name: "Combat Style Rank (3)",
            is_magical: false,
            rank: 3,
            description: r"
                You become a rank 3 combat style user.
                This gives you access to maneuvers that require a minimum rank of 3.
            ",
        },
        RankAbility {
            name: "Glancing Strikes",
            is_magical: false,
            rank: 3,
            description: r"
                Whenever you miss by 2 or less with a \glossterm{strike}, the target takes half damage from the strike.
                This is called a \glossterm{glancing blow}.
            ",
        },
        RankAbility {
            name: "Combat Style Rank (4)",
            is_magical: false,
            rank: 4,
            description: r"
                You become a rank 4 combat style user.
                This gives you access to maneuvers that require a minimum rank of 4.
            ",
        },
        RankAbility {
            name: "Combat Style Rank (5)",
            is_magical: false,
            rank: 5,
            description: r"
                You become a rank 5 combat style user.
                This gives you access to maneuvers that require a minimum rank of 5.
            ",
        },
        RankAbility {
            name: "Greater Tricky Force",
            is_magical: false,
            rank: 5,
            description: r"
                The bonus from your \textit{tricky force} ability increases to \plus2d.
            ",
        },
        RankAbility {
            name: "Combat Style Rank (6)",
            is_magical: false,
            rank: 6,
            description: r"
                You become a rank 6 combat style user.
                This gives you access to maneuvers that require a minimum rank of 6.
            ",
        },
        RankAbility {
            name: "Greater Tricky Finesse",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{tricky finesse} ability increases to \plus2.
            ",
        },
        RankAbility {
            name: "Combat Style Rank (7)",
            is_magical: false,
            rank: 7,
            description: r"
                You become a rank 7 combat style user.
                This gives you access to maneuvers that require a minimum rank of 7.
            ",
        },
        RankAbility {
            name: "Esoteric Maneuver",
            is_magical: false,
            rank: 7,
            description: r"
                You learn an additional \glossterm{maneuver} from a combat style you have access to (see \pcref{Combat Styles}).
            ",
        },
    ];
}

pub fn jack_of_all_trades<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Dabbler",
            is_magical: false,
            rank: 0,
            description: r"
         You gain an additional \glossterm{insight point}.
        In addition, choose any two skills.
        You treat those skills as \glossterm{class skills} for you.


                ",
        },
        RankAbility {
            name: "Skill Exemplar",
            is_magical: false,
            rank: 1,
            description: r"
         You gain two additional skill points.
        In addition, you gain a \plus1 bonus to all skills.

                ",
        },
        RankAbility {
            name: "Greater Dabbler",
            is_magical: false,
            rank: 2,
            description: r"
         You gain an additional \glossterm{insight point}.

                ",
        },
        RankAbility {
            name: "Versatile Power",
            is_magical: false,
            rank: 3,
            description: r"
        
        You gain a \plus2 bonus to your \glossterm{power} with all abilities.

                ",
        },
        RankAbility {
            name: "Greater Skill Exemplar",
            is_magical: false,
            rank: 4,
            description: r"
         The skill bonus from your \textit{skill exemplar} ability increases to \plus3.

                ",
        },
        RankAbility {
            name: "Supreme Dabbler",
            is_magical: false,
            rank: 5,
            description: r"
         You gain an additional \glossterm{insight point}.

                ",
        },
        RankAbility {
            name: "Greater Versatile Power",
            is_magical: false,
            rank: 6,
            description: r"
         The bonus from your \textit{versatile power} ability increases to \plus6.

                ",
        },
        RankAbility {
            name: "Supreme Skill Exemplar",
            is_magical: false,
            rank: 7,
            description: r"
                The skill bonus from your \textit{skill exemplar} ability increases to \plus5.
            ",
        },
    ];
}

pub fn suave_scoundrel<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Smooth Liar",
            is_magical: false,
            rank: 0,
            description: r"
         You gain a \plus2 bonus to the Deception skill.
        In addition, using the \textit{desperate exertion} ability to affect a roll using the Deception skill only causes you to increase your \glossterm{fatigue level} by one instead of two.


                ",
        },
        RankAbility {
            name: "Confound",
            is_magical: false,
            rank: 1,
            description: r"
         You can use the \textit{confound} ability as a standard action.
        \begin{durationability}{Confound}[Duration]
            \abilitytag{Compulsion}
            \rankline
            Make a attack vs. Mental against a creature within \shortrange.
            Your \glossterm{accuracy} is equal to your Deception skill.
            \hit The subject is \dazed as a \glossterm{condition}.

            \rankline
            \rank{3} You can target an additional creature within range.
            \rank{5} The range increases to \rngmed.
            \rank{7} The number of targets increases to be up to 5.
        \end{durationability}

                ",
        },
        RankAbility {
            name: "Trick Magic Device",
            is_magical: true,
            rank: 2,
            description: r"
         You can use wands as if you were able to cast spells from all \glossterm{magic sources}.
        Your maximum spell rank is equal to your rank in this archetype.
        In addition, you gain an additional \glossterm{attunement point}.
        You can only use this attunement point to \glossterm{attune} to magic wands or apparel items.

                ",
        },
        RankAbility {
            name: "Exploit Distraction",
            is_magical: false,
            rank: 3,
            description: r"
         You gain a \plus1 \glossterm{accuracy} bonus against creatures affected by any \glossterm{condition}.

                ",
        },
        RankAbility {
            name: "What's That Over There",
            is_magical: false,
            rank: 4,
            description: r"
         You can use the \textit{what's that over there} ability as a standard action.
        \begin{durationability}{What's That Over There}[Duration]
            \abilitytag{Compulsion}
            \rankline
            Make a attack vs. Mental against a creature within \medrange.
            Your \glossterm{accuracy} is equal to your Deception skill.
            In addition, choose a location on stable ground within range.
            \hit As a \glossterm{brief} effect, the subject is compelled to move to the location you chose if it can do so safely, and it cannot take any actions except to move to the location and look around at it.
            This effect automatically ends if the subject takes any damage.
            After this effect ends, the subject becomes immune to it until it takes a \glossterm{short rest}.

            \rankline
            \rank{6} You can target an additional creature within range.
        \end{durationability}

                ",
        },
        RankAbility {
            name: "Greater Trick Magic Device",
            is_magical: true,
            rank: 5,
            description: r"
         The number of attunement points you gain from your \textit{trick magic device} ability increases to two.
        In addition, you can use the attunement points from that ability to attune to any magic item, not just wands and apparel.

                ",
        },
        RankAbility {
            name: "Greater Exploit Distraction",
            is_magical: false,
            rank: 6,
            description: r"
         The bonus from your \textit{exploit distraction} ability increases to \plus2.

                ",
        },
        RankAbility {
            name: "Nothing Is Real",
            is_magical: false,
            rank: 7,
            description: r"
                You can use the \textit{nothing is real} ability as a standard action.
                \begin{freeability}{Nothing Is Real}[Duration]
                    \abilitytag{Compulsion}
                    \rankline
                    Make an attack vs. Mental against a creature within \shortrange.
                    Your \glossterm{accuracy} is equal to your Deception skill.
                    \hit The subject is \glossterm{briefly} convinced that nothing is real.
                    It is unable to take any actions and is \unaware of all attacks against it.
                    After this effect ends, the subject becomes immune to it until it takes a \glossterm{short rest}.
                \end{freeability}
            ",
        },
    ];
}
