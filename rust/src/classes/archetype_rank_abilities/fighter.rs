use crate::classes::archetype_rank_abilities::RankAbility;

pub fn combat_discipline<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Enduring Discipline",
            rank: 0,
            description: r"
         You gain a \plus2 bonus to your \glossterm{fatigue tolerance}.


                ",
        },
        RankAbility {
            name: "Discipline",
            rank: 1,
            description: r"
         You can use the \textit{discipline} ability as a \glossterm{standard action}.
        \begin{instantability}{Discipline}
            Instant
            \rankline
            Remove up to two \glossterm{conditions} affecting you.
            This cannot remove a condition applied during the current round.

            \rankline
            \rank{3} This ability gains the \abilitytag{Swift} tag.
            When you use it, the penalties from the removed conditions do not affect you during the current phase.
            In addition, you cannot gain any additional \glossterm{conditions} until after the end of the next round.
            \rank{5} You can use this ability as a \glossterm{minor action}.
            When you do, you increase your \glossterm{fatigue level} by one.
            \rank{7} You can remove any number of \glossterm{conditions}.
        \end{instantability}

                ",
        },
        RankAbility {
            name: "Greater Enduring Discipline",
            rank: 2,
            description: r"
        
        The bonus from your \textit{enduring discipline} ability increases to \plus3.
        In addition, you gain a \plus1 bonus to \glossterm{vital rolls} (see \pcref{Vital Rolls}).

                ",
        },
        RankAbility {
            name: "Disciplined Force",
            rank: 3,
            description: r"
        
        You gain a \plus1d bonus to your damage with all weapons.

                ",
        },
        RankAbility {
            name: "Disciplined Reaction",
            rank: 4,
            description: r"
        
        You do not suffer any effects from \glossterm{conditions} or \glossterm{vital wounds} until the next round after they are applied.
        While a vital wound is delayed in this way, you do not consider it when calculating your penalties to future \glossterm{vital rolls}, and you do not suffer any effects from its specific vital wound effect.
        You suffer their normal effects in the following round.

                ",
        },
        RankAbility {
            name: "Supreme Enduring Discipline",
            rank: 5,
            description: r"
        
        The bonus from your \textit{enduring discipline} ability increases to \plus4.
        In addition, the bonus to vital rolls from your \textit{greater enduring discipline} ability increases to \plus2.

                ",
        },
        RankAbility {
            name: "Greater Disciplined Force",
            rank: 6,
            description: r"
         The bonus from your \textit{disciplined force} ability increases to \plus2d.

                ",
        },
        RankAbility {
            name: "Greater Disciplined Reaction",
            rank: 7,
            description: r"
        
        The delay from your \textit{disciplined} reaction ability increases by an additional round.
        You suffer their normal effects after that time.
                ",
        },
    ];
}

pub fn equipment_training<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Armor Expertise",
            rank: 0,
            description: r"
         You reduce the \glossterm{encumbrance} of body armor you wear by 1.

                ",
        },
        RankAbility {
            name: "Weapon Training",
            rank: 1,
            description: r"
         You can use the \textit{weapon training} ability by spending an hour training with a weapon.
        You cannot use this ability with an \glossterm{exotic weapon} that is from a \glossterm{weapon group} you are not proficient with.
        \begin{instantability}{Weapon Training}
            Instant
            \rankline
            You become proficient with the weapon you trained with.
            You gain a \plus1 bonus to \glossterm{accuracy} with that weapon unless it is an \glossterm{exotic weapon} that you would not be proficient with without this ability.
            This ability's effect lasts until you use this ability again.

            \rankline
            \rank{4} You can use this ability with only five minutes of training.
            \rank{6} You can use this ability as a \glossterm{minor action}.
        \end{instantability}

                ",
        },
        RankAbility {
            name: "Equipment Efficiency",
            rank: 2,
            description: r"
         You gain an additional \glossterm{attunement point}.
        You can only use this attunement point to \glossterm{attune} to magic weapons and magic armor.

                ",
        },
        RankAbility {
            name: "Greater Armor Expertise",
            rank: 3,
            description: r"
        
        The penalty reduction from your \textit{armor expertise} ability increases to 2.
        In addition, you treat body armor were one usage class lighter than normal when doing so would be beneficial for you (see \pcref{Armor Usage Classes}).

                ",
        },
        RankAbility {
            name: "Weapon Expertise",
            rank: 4,
            description: r"
         You gain a \plus1d bonus to your damage with all weapons.

                ",
        },
        RankAbility {
            name: "Greater Equipment Efficiency",
            rank: 5,
            description: r"
         The number of attunement points you gain from your \textit{efficient equipment} ability increases to two.
        In addition, you can use the attunement points from that ability to attune to any magic item, not just weapons and armor.

                ",
        },
        RankAbility {
            name: "Supreme Armor Expertise",
            rank: 6,
            description: r"
        
        The \glossterm{encumbrance} reduction from your \textit{armor expertise} ability increases to 3.
        In addition, you treat body armor as if it were an additional usage class lighter than normal when doing so would be beneficial for you.

                ",
        },
        RankAbility {
            name: "Greater Weapon Expertise",
            rank: 7,
            description: r"
         The bonus from your \textit{weapon expertise} ability increases to \plus3d.
                ",
        },
    ];
}

pub fn martial_mastery<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Defensive Expertise",
            rank: 0,
            description: r"
         You gain a \plus1 bonus to Armor defense.
                ",
        },
        RankAbility {
            name: "Combat Styles",
            rank: 1,
            description: r"
            
            You can channel your martial prowess into dangerous attacks.
            You gain access to one of the following \glossterm{combat styles}: \textit{blunt force}, \textit{penetrating precision}, or \textit{rip and tear}.
            In addition, you gain access to any two combat styles of your choice (see \pcref{Combat Styles}).
            You may spend \glossterm{insight points} to gain access to one additional combat style per insight point.

            You learn two rank 1 \glossterm{maneuvers} from combat styles you have access to.
            You may spend \glossterm{insight points} to learn to one additional maneuver per insight point.
            Unless otherwise noted in an ability's description, using a maneuver requires a \glossterm{standard action}.

            When you gain access to a new \glossterm{rank} in this archetype,
                you can exchange any number of maneuvers you know for other maneuvers, including maneuvers of the higher rank.
                        ",
        },
        RankAbility {
            name: "Combat Style Rank",
            rank: 2,
            description: r"
             You become a rank 2 combat style user.
            This gives you access to maneuvers that require a minimum rank of 2.

                ",
        },
        RankAbility {
            name: "Martial Force",
            rank: 2,
            description: r"
 You gain a \plus1d bonus to your damage with all weapons.
                        ",
        },
        RankAbility {
            name: "Combat Style Rank",
            rank: 3,
            description: r"
             You become a rank 3 combat style user.
            This gives you access to maneuvers that require a minimum rank of 3 and can improve the effectiveness of your existing maneuvers.

                ",
        },
        RankAbility {
            name: "Glancing Strikes",
            rank: 3,
            description: r"
             Whenever you miss by 2 or less with a \glossterm{strike}, the target takes half damage from the strike.
This is called a \glossterm{glancing blow}.
                        ",
        },
        RankAbility {
            name: "Combat Style Rank",
            rank: 4,
            description: r"
             You become a rank 4 combat style user.
            This gives you access to maneuvers that require a minimum rank of 4 and can improve the effectiveness of your existing maneuvers.

                ",
        },
        RankAbility {
            name: "Martial Maneuver",
            rank: 4,
            description: r"
                You learn an additional \glossterm{maneuver} from a combat style you have access to (see \pcref{Combat Styles}).
            ",
        },
        RankAbility {
            name: "Combat Style Rank (5)",
            rank: 5,
            description: r"
                You become a rank 5 combat style user.
                This gives you access to maneuvers that require a minimum rank of 5.
            ",
        },
        RankAbility {
            name: "Greater Martial Force",
            rank: 5,
            description: r"
                The bonus from your \textit{martial force} ability increases to \plus2d.
            ",
        },
        RankAbility {
            name: "Combat Style Rank (6)",
            rank: 6,
            description: r"
                You become a rank 6 combat style user.
                This gives you access to maneuvers that require a minimum rank of 6.
            ",
        },
        RankAbility {
            name: "Greater Defensive Expertise",
            rank: 6,
            description: r"
                The bonuses from your \textit{defensive expertise} ability increases to \plus2.
            ",
        },
        RankAbility {
            name: "Combat Style Rank (7)",
            rank: 7,
            description: r"
                You become a rank 7 combat style user.
                This gives you access to maneuvers that require a minimum rank of 7.
            ",
        },
        RankAbility {
            name: "Martial Maneuver",
            rank: 7,
            description: r"
                You learn an additional \glossterm{maneuver} from a combat style you have access to (see \pcref{Combat Styles}).
            ",
        },
    ];
}

pub fn sentinel<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Threatening Influence",
            rank: 0,
            description: r"
         Your \glossterm{enemies} treat each space adjacent to you as \glossterm{difficult terrain}.

                ",
        },
        RankAbility {
            name: "Guarding Strike",
            rank: 1,
            description: r"
         You can use the \textit{guarding strike} ability as a standard action.
        \begin{durationability}{Guarding Strike}
            Duration
            \rankline
            Make a \glossterm{strike} with a \minus2d damage penalty.
            Your \glossterm{power} with the strike is halved.
            Each creature damaged by the strike is \goaded by you as a \glossterm{condition}.
            \rankline
            \rank{3} You gain a \plus1 \glossterm{accuracy} bonus with the strike.
            \rank{5} The accuracy bonus increases to \plus2.
            \rank{7} The accuracy bonus increases to \plus3.
        \end{durationability}

                ",
        },
        RankAbility {
            name: "Protect",
            rank: 2,
            description: r"
         You can use the \textit{protect} ability as a \glossterm{minor action}.
        \begin{durationability}{Protect}
            \spelltwocol{Duration}{\abilitytag{Swift}}
            \rankline
            Choose an \glossterm{ally} adjacent to you.
            It gains a \plus2 bonus to Armor defense until the end of the round.
            Because this ability has the \abilitytag{Swift} tag, this bonus applies against attacks made in the current phase.

            A creature that sees an attack against an ally protected in this way can observe that you are the cause of the protection with a \glossterm{difficulty rating} 5 Awareness check.
            While this ability is active, you cannot gain a defense bonus from this ability, even if another creature with this ability uses it on you.
        \end{durationability}

                ",
        },
        RankAbility {
            name: "Greater Threatening Influence",
            rank: 3,
            description: r"
         The area affected by your \textit{threatening influence} ability increases to a \smallarea radius \glossterm{emanation} from you.
        However, it does not affect creatures who are moving in a straight line directly towards you.

                ",
        },
        RankAbility {
            name: "Sentinel's Challenge",
            rank: 4,
            description: r"
         You can use the \textit{sentinel's challenge} ability as a standard action.
        \begin{durationability}{Sentinel's Challenge}
            Duration
            \rankline
            Make an attack vs. Mental against all \glossterm{enemies} in a \largearea radius from you.
            \hit Each subject is \goaded by you as a \glossterm{condition}.
            \rankline
            \rank{6} The area increases to a \hugearea radius.
        \end{durationability}

                ",
        },
        RankAbility {
            name: "Sentinel's Force",
            rank: 4,
            description: r"
         You gain a \plus1d bonus to your damage with all weapons.

                ",
        },
        RankAbility {
            name: "Greater Protect",
            rank: 5,
            description: r"
         The bonus from your \textit{protect} ability increases to \plus3.

                ",
        },
        RankAbility {
            name: "Supreme Threatening Influence",
            rank: 6,
            description: r"
         Your \textit{threatening influence} ability applies \glossterm{difficult terrain} twice, causing enemies to move at one quarter speed.

                ",
        },
        RankAbility {
            name: "Greater Sentinel's Force",
            rank: 7,
            description: r"
         The bonus from your \textit{sentinel's force} ability increases to \plus2d.

                ",
        },
        RankAbility {
            name: "Greater Sentinel's Goad's Goad",
            rank: 7,
            description: r"
         Any creature that is \goaded by you suffers a \minus4 accuracy penalty instead of the normal \minus2.

                ",
        },
    ];
}

pub fn tactician<'a>() -> Vec<RankAbility<'a>> {
    return vec![
        RankAbility {
            name: "Tactical Insight",
            rank: 0,
            description: r"
         You gain an additional \glossterm{insight point}.

                ",
        },
        RankAbility {
            name: "Battle Tactics",
            rank: 1,
            description: r"
        
        You can lead your allies using tactics appropriate for the situation.
        Choose a single battle tactic from the list below.
        You can also spend \glossterm{insight points} to learn one additional \textit{battle tactic} per \glossterm{insight point}.

        You can initiate a \textit{battle tactic} as a \glossterm{minor action}.
        When you initiate a battle tactic, you choose whether to use visual cues like gestures, auditory cues like shouts, or both to communicate your tactic with your allies.
        Your \textit{battle tactics} affect yourself and your \glossterm{allies} within a \areahuge radius \glossterm{emanation} from you who can either see or hear your chosen communication style.

        All \textit{battle tactics} have the \abilitytag{Sustain} (free) tag, so they last as long as you \glossterm{sustain} them (see \pcref{Sustained Abilities}).
        You cannot sustain multiple battle tactics simultaneously.

        {
            \begin{durationability}{Break Through}
                \abilitytag{Sustain} (free)
                \rankline
                Each target gains a \plus2 bonus to \glossterm{accuracy} with the \textit{overrun} and \textit{shove} abilities (see \pcref{Special Combat Abilities}).

                \rankline
                \rank{3} The bonus increases to \plus3.
                \rank{5} The bonus increases to \plus4.
                \rank{7} The bonus increases to \plus4.
            \end{durationability}

            \begin{durationability}{Dogpile}
                \abilitytag{Sustain} (free)
                \rankline
                Each target gains a \plus2 bonus to \glossterm{accuracy} with the \textit{grapple} ability and with all grapple actions (see \pcref{Grapple}, and \pcref{Grapple Actions}).
                This does not affect any other abilities that may have similar effects, such as the Strangle maneuver (see Strangle, page \pref{maneuver:Strangle}).

                \rankline
                \rank{3} The bonus increases to \plus3.
                \rank{5} The bonus increases to \plus4.
                \rank{7} The bonus increases to \plus5.
            \end{durationability}

            \begin{durationability}{Duck and Cover}
                \abilitytag{Sustain} (free)
                \rankline
                Each target gains a \plus1 bonus to Armor defense against non-\glossterm{melee} attacks.

                \rankline
                \rank{3} The bonus increases to \plus2.
                \rank{5} The bonus increases to \plus3.
                \rank{7} The bonus increases to \plus4.
            \end{durationability}

            \begin{durationability}{Group Up}
                \abilitytag{Sustain} (free)
                \rankline
                Each target that is adjacent to at least one other target gains a \plus1 bonus to Armor defense.

                \rankline
                \rank{3} Each target affected by the Armor defense bonus also gains a \plus2 bonus to Mental defense.
                \rank{5} The Armor defense bonus increases to \plus2.
                \rank{7} The Mental defense bonus increases to \plus4.
            \end{durationability}

            \begin{durationability}{Hold The Line}
                \abilitytag{Sustain} (free)
                \rankline
                Your \glossterm{enemies} treat all areas adjacent to any target as \glossterm{difficult terrain}.

                \rankline
                \rank{3} Each area adjacent to any target is doubly difficult terrain, and costs quadruple the normal movement cost to move out of.
                \rank{5} Each area within a 10 foot radius \glossterm{emanation} from each target is difficult terrain.
                \rank{7} Each area within a 10 foot radius \glossterm{emanation} from each target is doubly difficult terrain.
            \end{durationability}

            \begin{durationability}{Hustle}
                \abilitytag{Sustain} (free)
                \rankline
                Each subject gains a \plus5 foot bonus to its speed with all of its \glossterm{movement modes} during any phase that it takes the \textit{sprint} action, or if it moves using a \glossterm{standard action}.

                \rankline
                \rank{3} The speed bonus increases to \plus10 feet.
                \rank{5} The speed bonus increases to \plus15 feet.
                \rank{7} The speed bonus increases to \plus20 feet.
            \end{durationability}

            \begin{durationability}{Keep Moving}
                \abilitytag{Sustain} (free)
                \rankline
                Each target that ends the \glossterm{movement phase} at least twenty feet away from where it started the round
                    gains a \plus1 bonus to Armor defense until the end of the round.

                \rankline
                \rank{3} Each target affected by the Armor defense bonus also gains a \plus2 bonus to Reflex defense.
                \rank{5} The Armor defense bonus increases to \plus2.
                \rank{7} The Reflex defense bonus increases to \plus4.
            \end{durationability}

            \begin{durationability}{Stand Your Ground}
                \abilitytag{Sustain} (free)
                \rankline
                Each target that ends the \glossterm{movement phase} without changing its location gains a \plus1 bonus to Armor defense until its location changes.

                \rankline
                \rank{3} Each target affected by the Armor defense bonus also gains a \plus2 bonus to Fortitude defense.
                \rank{5} The Armor defense bonus increases to \plus2.
                \rank{7} The Fortitude defense bonus increases to \plus4.
            \end{durationability}
        }

                ",
        },
        RankAbility {
            name: "Tactical Precision",
            rank: 2,
            description: r"
         You gain a \plus1 bonus to \glossterm{accuracy}.

                ",
        },
        RankAbility {
            name: "Greater Tactical Insight",
            rank: 3,
            description: r"
         You gain an additional \glossterm{insight point}.
        In addition, you learn an additional \textit{battle tactic}.

                ",
        },
        RankAbility {
            name: "Reactive Tactics",
            rank: 4,
            description: r"
         You gain a \plus3 bonus to \glossterm{initiative} checks.
        In addition, you can initiate a new \textit{battle tactic} as a \glossterm{free action} instead of as a \glossterm{minor action}.

                ",
        },
        RankAbility {
            name: "Greater Tactical Precision",
            rank: 5,
            description: r"
         The bonus from your \textit{tactical precision} ability increases to \plus2.

                ",
        },
        RankAbility {
            name: "Supreme Tactical Insight",
            rank: 6,
            description: r"
         You gain an additional \glossterm{insight point}.
        In addition, you learn an additional \textit{battle tactic}.

                ",
        },
        RankAbility {
            name: "Greater Reactive Tactics",
            rank: 7,
            description: r"
         The bonus from your \textit{reactive tactics} ability increases to \plus10.
        In addition, all of your \textit{battle tactics} abilities gain the \abilitytag{Swift} tag, so their bonuses and penalties take effect in the phase that you active them.

                ",
        },
    ];
}
