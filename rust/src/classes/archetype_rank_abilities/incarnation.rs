use crate::classes::archetype_rank_abilities::RankAbility;

pub fn incarnation<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Essence Spike",
            is_magical: true,
            rank: 1,
            description: r"
                \begin{magicalactiveability}{Essence Spike}{Standard action}
                    \rankline
                    Make an attack against something within \medrange.
                    The defense against this attack depends on your \textit{essence infusion}.
                    \begin{raggeditemize}
                        \item Armor defense: \atWater.
                        \item Brawn defense: \atAir, \atEarth.
                        \item Fortitude defense: \atAcid, \atAuditory, \atCold.
                        \item Reflex defense: \atElectricity, \atFire, \atVisual.
                        \item Mental defense: \atCompulsion, \atEmotion.
                    \end{raggeditemize}
                    \hit \damageranktwo.

                    \rankline
                    \rank{2} The damage increases to \damagerankthree.
                    \rank{3} The damage increases to \damagerankfour.
                    \rank{4} The damage increases to \damagerankfive.
                    \rank{5} The damage increases to \damageranksix.
                    \rank{6} The damage increases to \damagerankseven.
                    \rank{7} The damage increases to \damagerankeight.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Essence Flare",
            is_magical: true,
            rank: 2,
            description: r"
                \begin{magicalactiveability}{Essence Flare}{Standard action}
                    \rankline
                    You are \glossterm{briefly} \focused.
                    At the end of the next round, if you hit with an attack that has your \textit{essence infusion} tag during that round, you repeat the full effect of this ability.
                    Otherwise, you are \glossterm{briefly} \maximized.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Deep Tether",
            is_magical: false,
            rank: 3,
            description: r"
                You gain a special ability depending on whether you are tethered or untethered.
                \begin{raggeditemize}
                    \item Tethered: Choose an \atAttune spell of rank 3 or lower from any \glossterm{mystic sphere}.
                    The spell must have your \textit{essence infusion} tag, and it must not be a \glossterm{deep attunement}.
                    You gain the effect of that spell on you permanently.
                    If the spell disables itself, you gain its benefit again after 5 minutes.
                    \item Untethered: The height limit of your fly speed increases to 10 feet.
                    In addition, whenever you use the \ability{sprint} ability, you can become \trait{intangible} during that phase.
                    This ability has the \abilitytag{Swift} tag, so it affects attacks against you during the current phase.
                \end{raggeditemize}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Essence Exemplar",
            is_magical: false,
            rank: 4,
            description: r"
                The bonus to an attribute that you gain from being an incarnate increases to \plus2.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Essence Infusion+",
            is_magical: true,
            rank: 5,
            description: r"
                You become \glossterm{immune} instead of impervious to attacks with your \textit{essence infusion} tag.
                In addition, you gain a \plus1 accuracy bonus with all abilities which have that tag.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Deep Tether+",
            is_magical: false,
            rank: 6,
            description: r"
                You gain a special ability depending on whether you are tethered or untethered.
                \begin{raggeditemize}
                    \item Tethered: You can choose up two spells with a combined rank of 6 or lower.
                    % TODO: weak?
                    \item Untethered: The height limit of your fly speed increases to 20 feet.
                    In addition, you gain a \plus1 bonus to your \glossterm{mundane power} and \glossterm{magical power}.
                \end{raggeditemize}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 3,
            name: "Essence Incarnate",
            is_magical: true,
            rank: 7,
            description: r"
                \begin{magicalactiveability}{Essence Incarnate}{\glossterm{Minor action}}
                    \abilitytags \abilitytag{Swift}
                    \abilitycost One \glossterm{fatigue level}, and you \glossterm{briefly} cannot use this ability again
                    \rankline
                    You gain a benefit depending on whether you are tethered or untethered:
                    \begin{raggeditemize}
                        \item Tethered: You \glossterm{briefly} \primed with abilities that have your \textit{essence infusion} tag.
                        \item Untethered: You \glossterm{briefly} become \trait{incorporeal}.
                        If this effect ends while you are inside of a solid object, you are pushed back in the direction from which you entered that object until you emerge.
                        You take 5d10 damage for every 5 feet that you are pushed in this way.
                    \end{raggeditemize}

                    % don't end with an itemize right before an ability closes
                    {}
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
    ]
}
