use crate::classes::archetype_rank_abilities::RankAbility;

pub fn harpy<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Luring Song",
            is_magical: true,
            rank: 1,
            description: r"
                \begin{magicalactiveability}{Luring Song}[\abilitytag{Auditory}, \abilitytag{Compulsion}]
                    \abilityusagetime Standard action.
                    \rankline
                    Make an attack vs. Mental against a creature within \longrange.
                    In addition, you begin a vocal performance (see \pcref{Performance Types}).
                    \hit As a \glossterm{condition}, the target must move towards you as best it can during each \glossterm{movement phase}.
                    In addition, it cannot move farther away from you at any time, except as necessary to get closer to you (such as to avoid an intervening obstacle).
                    It can otherwise act freely, and is still able to attack you and your allies.

                    The target will risk danger to reach you, such as moving towards your allies or swimming through rough water.
                    However, it is not compelled to take actions that are guaranteed to damage harm it, such as jumping off of a cliff.
                    If it cannot make any progress towards you, it remains in place.

                    If you attack the target with any ability other than this one, or if you stop your vocal performance, this effect is automatically broken.
                    When this effect ends, the target becomes immune to this effect until it finishes a \glossterm{short rest}.
                    \crit The condition must be removed twice before the effect ends.

                    \rankline
                    The attack\'s \glossterm{accuracy} increases by \plus1 for each rank beyond 1.
                    In addition:
                    \rank{3} You can target an additional creature within range.
                    \rank{5} The maximum number of targets increases to 3.
                    \rank{7} The maximum number of targets increases to 5.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Harpy Wings",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a slow \glossterm{fly speed} with a maximum height of 10 feet (see \pcref{Flight}).
                As a \glossterm{free action}, you can increase your \glossterm{fatigue level} by one to ignore this height limit until the end of the round.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Sharp Talons",
            is_magical: false,
            rank: 3,
            description: r"
                Your talons deal 1d6 damage.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Winged Agility+",
            is_magical: false,
            rank: 3,
            description: r"
                The Armor defense bonus increases to \plus3, and the Balance bonus increases to \plus8.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Siren Song",
            is_magical: true,
            rank: 4,
            description: r"
                \begin{magicalsustainability}{Siren Song}{\abilitytag{Auditory}, \abilitytag{Emotion}, \abilitytag{Sustain} (minor)}
                    \abilityusagetime Standard action.
                    \rankline
                    Make an attack vs. Mental against all \glossterm{enemies} within a \medarea radius from you.
                    In addition, you begin a vocal performance (see \pcref{Performance Types}).
                    \hit The target is both \charmed by you and \stunned as long as it can still hear your vocal performance.
                    It remains stunned even if it stops being charmed, such as if you or your allies attack it.
                    This ability does not have the \abilitytag{Subtle} tag, so an observant target may notice that it is being influenced.
                    \rankline
                    The attack\'s \glossterm{accuracy} increases by \plus1 for each rank beyond 4.
                    In addition:
                    \rank{6} The area increases to a \largearea radius.
                \end{magicalsustainability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Caress the Enthralled",
            is_magical: false,
            rank: 5,
            description: r"
                You gain a \plus2 accuracy bonus against creatures that are affected by either your \ability{luring song} or \ability{siren song} ability.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Agile Flight",
            is_magical: false,
            rank: 6,
            description: r"
                You reduce the penalties to your Armor and Reflex defenses from gliding or flying by 2.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Harpy Wings+",
            is_magical: false,
            rank: 6,
            description: r"
                Your maximum height increases to 30 feet, and the speed increases to average.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Sharp Talons+",
            is_magical: false,
            rank: 7,
            description: r"
                Your talons deal 1d8 damage and gain the \abilitytag{Keen} \glossterm{ability tag}.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Mythic Siren",
            is_magical: true,
            rank: 7,
            description: r"
                You gain a \plus5 \glossterm{accuracy} bonus with your \ability{luring song} and \ability{siren song} abilities.
            ",
            modifiers: None,
        },
    ]
}
