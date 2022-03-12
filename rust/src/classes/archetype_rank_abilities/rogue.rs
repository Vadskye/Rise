use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::Resource;
use crate::creatures::Modifier;
use crate::skills::{KnowledgeSubskill, Skill};

pub fn assassin<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Sneak Attack",
            is_magical: false,
            rank: 1,
            description: r"
                You can use the \textit{sneak attack} ability as a standard action.
                \begin{instantability}{Sneak Attack}
                    \rankline
                    Make a \glossterm{strike} with a \glossterm{light weapon} or any weapon with the Stealthy \glossterm{weapon tag} against a creature within \rngshort range.

                    If the target is \unaware or \partiallyunaware of your attack, or if the target is adjacent to one of your \glossterm{allies}, you gain two benefits.
                    First, you gain a \plus2 damage bonus with the strike.
                    Second, if you get a \glossterm{critical hit}, you double all of your damage bonuses along with your damage dice.
                    You do not gain these benefits against creatures that you are unable to score a \glossterm{critical hit} against, such as excessively large creatures or oozes.

                    \rankline
                    \rank{3} The damage bonus increases to \plus4.
                    \rank{5} The damage bonus increases to \plus8.
                    \rank{7} The damage bonus increases to \plus16.
                \end{instantability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Evasion",
            is_magical: false,
            rank: 2,
            description: r"
                You take half damage from abilities that affect an area and attack your Armor or Reflex defense.
                This does not protect you from any non-damaging effects of those abilities, or from abilities that affect multiple specific targets without affecting an area.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Darkstalker",
            is_magical: false,
            rank: 3,
            description: r"
                You can use the \textit{darkstalker} ability as a standard action.
                \begin{attuneability}{Darkstalker}[\abilitytag{Attune} (self)]
                    \rankline
                    You become completely undetectable by your choice of one of the following sense groups:
                    \begin{itemize}
                        \item \trait{Blindsense} and \trait{blindsight}
                        \item \trait{Darkvision}
                        \item \abilitytag{Detection} abilities
                        \item \trait{Lifesense} and \trait{lifesight}
                        \item \trait{Scent}
                        \item \abilitytag{Scrying} abilities
                        \item \trait{Tremorsense} and \trait{tremorsight}
                    \end{itemize}
                    If you have access to any other more unusual senses, such as the \textit{blood sense} ability from the Executioner feat, you may also choose one of those senses as a separate sense group.
                \end{attuneability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Assassin's Finesse",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1d bonus to your damage with \glossterm{light weapons} and any weapon with the Stealthy \glossterm{weapon tag}.
            ",
            modifiers: None,
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
            modifiers: None,
        },
        RankAbility {
            name: "Assassination",
            is_magical: false,
            rank: 5,
            description: r"
                You can use the \textit{assassination} ability as a \glossterm{minor action}.
                \begin{durationability}{Assassination}[Duration]
                    \abilitytag{Swift}
                    \rankline
                    You study a creature within \rngmed range, finding weak points you can take advantage of.
                    As a \glossterm{brief} effect, whenever you make a melee \glossterm{strikes} against the target that it is \unaware, the strike deals maximum damage and automatically \glossterm{explodes} regardless of what you roll.
                \end{durationability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Evasion",
            is_magical: false,
            rank: 6,
            description: r"
                Your \textit{evasion} ability also protects you from area attacks against your Fortitude and Mental defenses.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Assassin's Finesse",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{assassin's finesse} ability increases to \plus2d.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Darkstalker",
            is_magical: false,
            rank: 7,
            description: r"
                When you use your \textit{darkstalker} ability, you become undetectable by any number of the possible sense groups, not just one.
            ",
            modifiers: None,
        },
    ];
}

pub fn bardic_music<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Bardic Lore",
            is_magical: false,
            rank: 1,
            description: r"
                You gain all Knowledge skills as \glossterm{class skills}.
            ",
            modifiers: None,
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
                If you are \glossterm{trained} with a Perform skill capable of making an auditory performance, you gain a \plus1 bonus to \glossterm{accuracy} with any \textit{bardic performance} ability using that perform skill.

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
                        Choose one \glossterm{ally} within \medrange.
                        For the duration of your performance, the target gains a \plus5 foot bonus to its speed with all of its \glossterm{movement modes}.

                        \rankline
                        \rank{3} The target also gains a \plus2 bonus to its Reflex defense.
                        \rank{5} The speed bonus increases to \plus10 feet.
                        \rank{7} The bonus to Reflex defense increases to \plus4.
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
                        Make an attack vs. Mental against one creature within \medrange.
                        \hit For the duration of your performance, the target is unable to take any \glossterm{standard actions} that do not cause it to make an attack.
                        For example, it could make a \glossterm{strike} or cast an offensive spell, but it could not heal itself or summon a creature.

                        \rankline
                        You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 1.
                    \end{durationability}

                    \begin{durationability}{Boastful Bravura}[Duration]
                        \abilitytag{Auditory}
                        \rankline
                        This ability affects all \glossterm{enemies} within a \arealarge radius from you.
                        You \glossterm{briefly} gain a \plus4 bonus to \glossterm{accuracy} with \textit{bardic performance} abilities against each target.

                        \rankline
                        \rank{3} The bonus increases to \plus5.
                        \rank{5} The bonus increases to \plus6.
                        \rank{7} The bonus increases to \plus7.
                    \end{durationability}

                    \begin{instantability}{Cacaphony}
                        \abilitytag{Auditory}
                        \rankline
                        Make an attack vs. Fortitude against all \glossterm{enemies} in a \tinyarea radius from you.
                        \hit Each target takes 1d4 \add half \glossterm{power} sonic damage.

                        \rankline
                        \rank{2} The damage increases to 1d6, and the area increases to a \smallarea radius.
                        \rank{3} The damage increases to 1d8, and the area increases to a \medarea radius.
                        \rank{4} The damage increases to 1d10.
                        \rank{5} The damage increases to 2d6, and the area increases to a \largearea radius.
                        \rank{6} The damage increases to 2d8.
                        \rank{7} The damage increases to 2d10, and the area increases to a \hugearea radius.
                    \end{instantability}

                    \begin{durationability}{Cadenza of Courage}[Sustain (minor)]
                        \abilitytag{Auditory}, \abilitytag{Emotion}
                        \par \noindent Usage time: One \glossterm{minor action}.
                        \rankline
                        Choose one \glossterm{ally} within \medrange.
                        For the duration of your performance, the target gains a \plus1 bonus to \glossterm{accuracy}.

                        \rankline
                        \rank{3} The target also gains a \plus2 bonus to its Mental defense.
                        \rank{5} The accuracy bonus increases to \plus2.
                        \rank{7} The bonus to Mental defense increases to \plus4.
                    \end{durationability}

                    \begin{durationability}{Cantata of Caution}[Sustain (minor)]
                        \abilitytag{Auditory}, \abilitytag{Emotion}
                        \par \noindent Usage time: One \glossterm{minor action}.
                        \rankline
                        Choose one \glossterm{ally} within \medrange.
                        For the duration of your performance, the target gains a \plus1 bonus to its Armor and Reflex defenses.

                        \rankline
                        \rank{3} The bonus applies to all defenses.
                        \rank{5} The bonus to Armor and Reflex defenses increases to \plus2.
                        \rank{7} The bonus to Fortitude and Mental defenses also increases to \plus2.
                    \end{durationability}

                    \begin{durationability}{Cleansing Counterpoint}[Sustain (minor)]
                        \abilitytag{Auditory}
                        \rankline
                        Choose yourself or one \glossterm{ally} within \rngmed range.
                        The target chooses one of its \glossterm{brief} effects or \glossterm{conditions}.
                        It cannot choose an effect applied during the current round.
                        For the duration of your performance, the target ignores that effect.

                        \rankline
                        \rank{3} You can target an additional \glossterm{ally} within range.
                        \rank{5} This ability loses the \abilitytag{Sustain} (minor) tag.
                            Instead, the chosen effect is removed entirely.
                        \rank{7} Each target can remove two effects instead of one.
                    \end{durationability}

                    \begin{durationability}{Dazzling Discordance}[Duration]
                        \abilitytag{Auditory}
                        \rankline
                        Make an attack vs. Mental against all \glossterm{enemies} within a \areamed radius from you.
                        \hit Each target is \glossterm{briefly} \dazzled.
                        \crit The effect becomes a \glossterm{condition}.

                        \rankline
                        \rank{2} You gain a \plus1 \glossterm{accuracy} bonus with the attack, and the area increases to a \largearea radius.
                        \rank{3} The accuracy bonus increases to \plus2.
                        \rank{4} The accuracy bonus increases to \plus3, and the area increases to a \hugearea radius.
                        \rank{5} The accuracy bonus increases to \plus4.
                        \rank{6} The accuracy bonus increases to \plus5, and the area increases to a \gargarea radius.
                        \rank{7} The accuracy bonus increases to \plus6.
                    \end{durationability}

                    \begin{instantability}{Dirge of Doom}
                        \abilitytag{Auditory}
                        \rankline
                        Make an attack vs. Mental against anything within \medrange.
                        \hit The target takes sonic damage equal to 1d8 plus your \glossterm{power}.

                        \rankline
                        \rank{2} The damage increases to 1d10.
                        \rank{3} The damage increases to 2d8.
                        \rank{4} The damage increases to 2d10.
                        \rank{5} The damage increases to 4d8.
                        \rank{6} The damage increases to 4d10.
                        \rank{7} The damage increases to 6d10.
                    \end{instantability}

                    \begin{durationability}{Dizzying Ditty}[\abilitytag{Sustain} (minor)]
                        \abilitytag{Auditory}, \abilitytag{Compulsion}
                        \rankline
                        Make an attack vs. Mental against one creature within \medrange.
                        \hit For the duration of your performance, the target is \dazed.
                        \crit For the duration of your performance, the target is \stunned.

                        \rankline
                        You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 1.
                    \end{durationability}

                    \begin{durationability}{Frightening Fugue}[\abilitytag{Sustain} (minor)]
                        \abilitytag{Auditory}, \abilitytag{Emotion}
                        \rankline
                        Make an attack vs. Mental against one creature within \medrange.
                        \hit The target takes 1d4 sonic damage.
                        If it loses \glossterm{hit points} from this damage, it is \frightened by you for the duration of your performance.
                        Unlike normal, the target continues to suffer the penalties of being frightened while it is beyond \rngmed range from you as long as it is still affected by your performance.

                        \rankline
                        You gain a \plus1 \glossterm{accuracy} bonus and a \plus1d damage bonus with the attack for each rank beyond 1.
                    \end{durationability}

                    \begin{durationability}{Hypnotic Hymn}[\abilitytag{Sustain} (minor)]
                        \abilitytag{Auditory}, \abilitytag{Emotion}
                        \rankline
                        Make an attack vs. Mental against one creature within \medrange.
                        You take a \minus10 penalty to \glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of the last round, including during the current phase.
                        \hit For the duration of your performance, the target is \charmed by you.
                        Any act by you or by creatures that appear to be your allies that threatens or harms the charmed person breaks the effect.
                        Harming the target is not limited to dealing it damage, but also includes causing it significant subjective discomfort.
                        An observant target may interpret overt threats to its allies as a threat to itself.
                        This ability does not have the \abilitytag{Subtle} tag, so an observant target may notice it is being influenced.

                        \rankline
                        You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 1.
                    \end{durationability}

                    \begin{durationability}{Intonation of Ingenuity}[\abilitytag{Sustain} (minor)]
                        \abilitytag{Auditory}, \abilitytag{Emotion}
                        \par \noindent Usage time: One \glossterm{minor action}.
                        \rankline
                        Choose yourself or one \glossterm{ally} within \rngmed range.
                        For the duration of your performance, the target gains a \plus2 bonus to \glossterm{checks}.

                        \rankline
                        \rank{3} The bonus increases to \plus3.
                        \rank{5} The bonus increases to \plus4.
                        \rank{7} The bonus increases to \plus5.
                    \end{durationability}

                    \begin{instantability}{Palliative Poem}
                        \abilitytag{Auditory}
                        \rankline
                        Choose one living \glossterm{ally} within \medrange.
                        The target regains 1d8 \add \glossterm{power} \glossterm{damage resistance} and increases its \glossterm{fatigue level} by one.

                        \rankline
                        \rank{2} The recovery increases to 1d10.
                        \rank{3} The recovery increases to 2d8.
                        \rank{4} The recovery increases to 2d10.
                        \rank{5} The recovery increases to 4d8.
                        \rank{6} The recovery increases to 4d10.
                        \rank{7} The recovery increases to 6d10.
                    \end{instantability}

                    \begin{durationability}{Partita of Provocation}[Duration]
                        \abilitytag{Auditory}, \abilitytag{Emotion}
                        \rankline
                        Make an attack vs. Mental against all \glossterm{enemies} within a \medarea radius from you.
                        \hit Each target is \glossterm{briefly} \goaded by you.
                        \crit The effect becomes a \glossterm{condition}.

                        \rankline
                        You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 1.
                    \end{durationability}

                    \begin{durationability}{Serenade of Serenity}[\abilitytag{Sustain} (minor)]
                        \abilitytag{Auditory}, \abilitytag{Emotion}
                        \par \noindent Usage time: One \glossterm{minor action}.
                        \rankline
                        For the duration of your performance, you and all \glossterm{allies} within a \largearea radius from you gain a \plus4 bonus to their defenses against \abilitytag{Compulsion} and \abilitytag{Emotion} attacks.

                        \rankline
                        \rank{3} At the end of each round, each target removes all \glossterm{conditions} caused by Compulsion and Emotion effects that were not applied during that round.
                        \rank{5} The area increases to a \areahuge radius.
                        \rank{7} Each target is immune to Compulsion and Emotion attacks.
                    \end{durationability}

                    \begin{durationability}{Stutterstep Staccato}[Duration]
                        \abilitytag{Auditory}
                        \rankline
                        Make an attack vs. Fortitude against all \glossterm{enemies} within a \areamed radius from you.
                        \hit Each target is \glossterm{briefly} \slowed.
                        \crit Each target is \slowed as a \glossterm{condition}.

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
                        Choose one \glossterm{ally} within \rngmed range.
                        For the duration of your performance, the target gains a \plus4 bonus to its maximum \glossterm{hit points}.
                        In addition, it immediately gains that many hit points.
                        When this effect ends, the target loses hit points equal to the hit points it gained this way.

                        \rankline
                        \rank{3} The bonus increases to \plus8.
                        \rank{5} The bonus increases to \plus16.
                        \rank{7} The bonus increases to \plus32.
                    \end{durationability}
                }
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Musical Tolerance",
            is_magical: false,
            rank: 2,
            description: r"
                You are \glossterm{impervious} to \abilitytag{Auditory} attacks.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Bardic Lore",
            is_magical: false,
            rank: 3,
            description: r"
                You gain an additional \glossterm{trained} skill (see \pcref{Trained Skills}).
                In addition, you gain a bonus equal to your rank in this archetype to Knowledge skills that you are \glossterm{untrained} with.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::TrainedSkill, 1)]),
        },
        RankAbility {
            name: "Martial Performance",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Virtuoso",
            is_magical: true,
            rank: 4,
            description: r"
                Once per round, you can \glossterm{sustain} two bardic performances as a single \glossterm{minor action}.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Bardic Performance",
            is_magical: true,
            rank: 5,
            description: r"
                You learn an additional bardic performance.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Supreme Bardic Lore",
            is_magical: true,
            rank: 6,
            description: r"
                You gain a +2 bonus to all Knowledge skills.
            ",
            modifiers: Some(vec![Modifier::Skill(
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Arcana,
                    KnowledgeSubskill::Dungeoneering,
                    KnowledgeSubskill::Engineering,
                    KnowledgeSubskill::Items,
                    KnowledgeSubskill::Local,
                    KnowledgeSubskill::Nature,
                    KnowledgeSubskill::Planes,
                    KnowledgeSubskill::Religion,
                ]),
                2,
            )]),
        },
        RankAbility {
            name: "Greater Virtuoso",
            is_magical: true,
            rank: 7,
            description: r"
                The number of bardic performances you can sustain with your \textit{virtuoso} ability increases to three.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Martial Performance",
            is_magical: false,
            rank: 7,
            description: r"
                The bonus from your \textit{martial performance} ability increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
    ];
}

pub fn combat_trickster<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Combat Styles",
            is_magical: false,
            rank: 1,
            description: r"
                You can confuse and confound your foes in combat.
                You gain access to one of the following \glossterm{combat styles}: \textit{dirty fighting}, \textit{ebb and flow}, or \textit{mobile assault}.
                In addition, you gain access to any combat style of your choice (see \pcref{Combat Styles}).
                You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.

                You learn two rank 1 \glossterm{maneuvers} from combat styles you have access to.
                You may spend \glossterm{insight points} to learn to one additional maneuver per insight point.
                Unless otherwise noted in an ability's description, using a maneuver requires a \glossterm{standard action}.

                When you gain access to a new \glossterm{rank} in this archetype,
                    you can exchange any number of maneuvers you know for other maneuvers,
                    including maneuvers of the higher rank.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Combat Style Rank (2)",
            is_magical: false,
            rank: 2,
            description: r"
                You become a rank 2 combat style user.
                This gives you access to maneuvers that require a minimum rank of 2.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Tricky Force",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Combat Style Rank (3)",
            is_magical: false,
            rank: 3,
            description: r"
                You become a rank 3 combat style user.
                This gives you access to maneuvers that require a minimum rank of 3.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Tricky Finesse",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1 bonus to Dexterity-based \glossterm{checks}, except \glossterm{initiative} checks.
            ",
            modifiers: Some(vec![
                Modifier::Skill(Skill::Balance, 1),
                Modifier::Skill(Skill::Flexibility, 1),
                Modifier::Skill(Skill::Ride, 1),
                Modifier::Skill(Skill::SleightOfHand, 1),
                Modifier::Skill(Skill::Stealth, 1),
            ]),
        },
        RankAbility {
            name: "Combat Style Rank (4)",
            is_magical: false,
            rank: 4,
            description: r"
                You become a rank 4 combat style user.
                This gives you access to maneuvers that require a minimum rank of 4.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Trick Maneuver",
            is_magical: false,
            rank: 4,
            description: r"
                You learn an additional \glossterm{maneuver} from a combat style you have access to (see \pcref{Combat Styles}).
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Combat Style Rank (5)",
            is_magical: false,
            rank: 5,
            description: r"
                You become a rank 5 combat style user.
                This gives you access to maneuvers that require a minimum rank of 5.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Tricky Force",
            is_magical: false,
            rank: 5,
            description: r"
                The bonus from your \textit{tricky force} ability increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
        },
        RankAbility {
            name: "Combat Style Rank (6)",
            is_magical: false,
            rank: 6,
            description: r"
                You become a rank 6 combat style user.
                This gives you access to maneuvers that require a minimum rank of 6.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Tricky Finesse",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{tricky finesse} ability increases to \plus2.
            ",
            modifiers: Some(vec![
                Modifier::Skill(Skill::Balance, 1),
                Modifier::Skill(Skill::Flexibility, 1),
                Modifier::Skill(Skill::Ride, 1),
                Modifier::Skill(Skill::SleightOfHand, 1),
                Modifier::Skill(Skill::Stealth, 1),
            ]),
        },
        RankAbility {
            name: "Combat Style Rank (7)",
            is_magical: false,
            rank: 7,
            description: r"
                You become a rank 7 combat style user.
                This gives you access to maneuvers that require a minimum rank of 7.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Trick Maneuver",
            is_magical: false,
            rank: 7,
            description: r"
                You learn an additional \glossterm{maneuver} from a combat style you have access to (see \pcref{Combat Styles}).
            ",
            modifiers: None,
        },
    ];
}

pub fn jack_of_all_trades<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Dabbler",
            is_magical: false,
            rank: 1,
            description: r"
                You gain two additional \glossterm{insight points}.
                In addition, you can spend insight points to gain one additional \glossterm{trained skill} per insight point.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::InsightPoint, 2)]),
        },
        RankAbility {
            name: "Skill Exemplar",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus1 bonus to all skills.
            ",
            modifiers: Some(vec![
                Modifier::Resource(Resource::TrainedSkill, 1),
                Modifier::Skill(Skill::Awareness, 1),
                Modifier::Skill(Skill::Balance, 1),
                Modifier::Skill(Skill::Climb, 1),
                Modifier::Skill(Skill::Craft, 1),
                Modifier::Skill(Skill::CreatureHandling, 1),
                Modifier::Skill(Skill::Deception, 1),
                Modifier::Skill(Skill::Deduction, 1),
                Modifier::Skill(Skill::Devices, 1),
                Modifier::Skill(Skill::Disguise, 1),
                Modifier::Skill(Skill::Endurance, 1),
                Modifier::Skill(Skill::Flexibility, 1),
                Modifier::Skill(Skill::Intimidate, 1),
                Modifier::Skill(Skill::Jump, 1),
                Modifier::Skill(
                    Skill::Knowledge(vec![
                        KnowledgeSubskill::Arcana,
                        KnowledgeSubskill::Dungeoneering,
                        KnowledgeSubskill::Engineering,
                        KnowledgeSubskill::Items,
                        KnowledgeSubskill::Local,
                        KnowledgeSubskill::Nature,
                        KnowledgeSubskill::Planes,
                        KnowledgeSubskill::Religion,
                    ]),
                    1,
                ),
                Modifier::Skill(Skill::Linguistics, 1),
                Modifier::Skill(Skill::Medicine, 1),
                Modifier::Skill(Skill::Perform, 1),
                Modifier::Skill(Skill::Persuasion, 1),
                Modifier::Skill(Skill::Profession, 1),
                Modifier::Skill(Skill::Ride, 1),
                Modifier::Skill(Skill::SleightOfHand, 1),
                Modifier::Skill(Skill::SocialInsight, 1),
                Modifier::Skill(Skill::Stealth, 1),
                Modifier::Skill(Skill::Survival, 1),
                Modifier::Skill(Skill::Swim, 1),
            ]),
        },
        RankAbility {
            name: "Versatile Power",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus2 bonus to your \glossterm{power} with all abilities.
            ",
            modifiers: Some(vec![Modifier::Power(2)]),
        },
        RankAbility {
            name: "Greater Dabbler",
            is_magical: false,
            rank: 4,
            description: r"
                You gain an additional \glossterm{insight point}.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::InsightPoint, 1)]),
        },
        RankAbility {
            name: "Greater Skill Exemplar",
            is_magical: false,
            rank: 5,
            description: r"
                The skill bonus from your \textit{skill exemplar} ability increases to \plus3.
            ",
            modifiers: Some(vec![
                Modifier::Resource(Resource::TrainedSkill, 2),
                Modifier::Skill(Skill::Awareness, 2),
                Modifier::Skill(Skill::Balance, 2),
                Modifier::Skill(Skill::Climb, 2),
                Modifier::Skill(Skill::Craft, 2),
                Modifier::Skill(Skill::CreatureHandling, 2),
                Modifier::Skill(Skill::Deception, 2),
                Modifier::Skill(Skill::Deduction, 2),
                Modifier::Skill(Skill::Devices, 2),
                Modifier::Skill(Skill::Disguise, 2),
                Modifier::Skill(Skill::Endurance, 2),
                Modifier::Skill(Skill::Flexibility, 2),
                Modifier::Skill(Skill::Intimidate, 2),
                Modifier::Skill(Skill::Jump, 2),
                Modifier::Skill(
                    Skill::Knowledge(vec![
                        KnowledgeSubskill::Arcana,
                        KnowledgeSubskill::Dungeoneering,
                        KnowledgeSubskill::Engineering,
                        KnowledgeSubskill::Items,
                        KnowledgeSubskill::Local,
                        KnowledgeSubskill::Nature,
                        KnowledgeSubskill::Planes,
                        KnowledgeSubskill::Religion,
                    ]),
                    2,
                ),
                Modifier::Skill(Skill::Linguistics, 2),
                Modifier::Skill(Skill::Medicine, 2),
                Modifier::Skill(Skill::Perform, 2),
                Modifier::Skill(Skill::Persuasion, 2),
                Modifier::Skill(Skill::Profession, 2),
                Modifier::Skill(Skill::Ride, 2),
                Modifier::Skill(Skill::SleightOfHand, 2),
                Modifier::Skill(Skill::SocialInsight, 2),
                Modifier::Skill(Skill::Stealth, 2),
                Modifier::Skill(Skill::Survival, 2),
                Modifier::Skill(Skill::Swim, 2),
            ]),
        },
        RankAbility {
            name: "Greater Versatile Power",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{versatile power} ability increases to \plus6.
            ",
            modifiers: Some(vec![Modifier::Power(4)]),
        },
        RankAbility {
            name: "Supreme Skill Exemplar",
            is_magical: false,
            rank: 7,
            description: r"
                The skill bonus from your \textit{skill exemplar} ability increases to \plus5.
            ",
            modifiers: Some(vec![
                Modifier::Resource(Resource::TrainedSkill, 2),
                Modifier::Skill(Skill::Awareness, 2),
                Modifier::Skill(Skill::Balance, 2),
                Modifier::Skill(Skill::Climb, 2),
                Modifier::Skill(Skill::Craft, 2),
                Modifier::Skill(Skill::CreatureHandling, 2),
                Modifier::Skill(Skill::Deception, 2),
                Modifier::Skill(Skill::Deduction, 2),
                Modifier::Skill(Skill::Devices, 2),
                Modifier::Skill(Skill::Disguise, 2),
                Modifier::Skill(Skill::Endurance, 2),
                Modifier::Skill(Skill::Flexibility, 2),
                Modifier::Skill(Skill::Intimidate, 2),
                Modifier::Skill(Skill::Jump, 2),
                Modifier::Skill(
                    Skill::Knowledge(vec![
                        KnowledgeSubskill::Arcana,
                        KnowledgeSubskill::Dungeoneering,
                        KnowledgeSubskill::Engineering,
                        KnowledgeSubskill::Items,
                        KnowledgeSubskill::Local,
                        KnowledgeSubskill::Nature,
                        KnowledgeSubskill::Planes,
                        KnowledgeSubskill::Religion,
                    ]),
                    2,
                ),
                Modifier::Skill(Skill::Linguistics, 2),
                Modifier::Skill(Skill::Medicine, 2),
                Modifier::Skill(Skill::Perform, 2),
                Modifier::Skill(Skill::Persuasion, 2),
                Modifier::Skill(Skill::Profession, 2),
                Modifier::Skill(Skill::Ride, 2),
                Modifier::Skill(Skill::SleightOfHand, 2),
                Modifier::Skill(Skill::SocialInsight, 2),
                Modifier::Skill(Skill::Stealth, 2),
                Modifier::Skill(Skill::Survival, 2),
                Modifier::Skill(Skill::Swim, 2),
            ]),
        },
    ];
}

pub fn suave_scoundrel<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Confound",
            is_magical: false,
            rank: 1,
            description: r"
                You can use the \textit{confound} ability as a standard action.
                \begin{durationability}{Confound}[Duration]
                    \abilitytag{Compulsion}
                    \rankline
                    Make an attack vs. Mental against a creature within \shortrange.
                    Your \glossterm{accuracy} is equal to your Deception skill.
                    \hit The target is \dazed as a \glossterm{condition}.

                    \rankline
                    \rank{3} You can target an additional creature within range.
                    \rank{5} The range increases to \rngmed.
                    \rank{7} The maximum number of targets increases to 5.
                \end{durationability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Trick Magic Device",
            is_magical: true,
            rank: 2,
            description: r"
                You can use wands as if you were able to cast arcane spells.
                Your maximum spell rank is equal to your rank in this archetype.
                In addition, you gain an additional \glossterm{attunement point}.
                You can only use this attunement point to \glossterm{attune} to magic wands or apparel items.
            ",
            modifiers: Some(vec![Modifier::Resource(Resource::AttunementPoint, 1)]),
        },
        RankAbility {
            name: "Exploit Distraction",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a \plus1 \glossterm{accuracy} bonus against creatures affected by any \glossterm{condition}.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Deceptive Force",
            is_magical: false,
            rank: 4,
            description: r"
                You gain a \plus1d bonus to your damage with all weapons.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
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
                    \hit As a \glossterm{brief} effect, the target is compelled to move to the location you chose if it can do so safely, and it cannot take any actions except to move to the location and look around at it.
                    This effect automatically ends if the target takes any damage.
                    After this effect ends, the target becomes immune to it until it takes a \glossterm{short rest}.

                    \rankline
                    \rank{6} You can target an additional creature within range.
                \end{durationability}
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Trick Magic Device",
            is_magical: true,
            rank: 5,
            description: r"
                You can use wands as if you were able to cast spells from all \glossterm{magic sources}, not just arcane spells.
                In addition, you gain a \plus2 bonus to \glossterm{accuracy} with abilities granted to you by magic items.
                This includes spells cast from wands, the special strike you can make with a \mitem{surestrike} weapon, and other similar abilities.
                However, it does not include ordinary strikes or maneuvers that simply use a magic weapon.
            ",
            modifiers: None,
        },
        RankAbility {
            name: "Greater Exploit Distraction",
            is_magical: false,
            rank: 6,
            description: r"
                The bonus from your \textit{exploit distraction} ability increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Accuracy(1)]),
        },
        RankAbility {
            name: "Greater Deceptive Force",
            is_magical: false,
            rank: 7,
            description: r"
                The bonus from your \textit{deceptive force} ability increases to \plus2d.
            ",
            modifiers: Some(vec![Modifier::StrikeDamageDice(1)]),
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
                    \hit The target is \glossterm{briefly} convinced that nothing is real.
                    It is unable to take any actions and is \unaware of all attacks against it.
                    After this effect ends, the target becomes immune to it until it takes a \glossterm{short rest}.
                \end{freeability}
            ",
            modifiers: None,
        },
    ];
}
