use crate::classes::archetype_rank_abilities::RankAbility;

pub fn naiad<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Water Bond",
            is_magical: true,
            rank: 1,
            description: r"\
                You can form a bond with a fresh stream, lake, or other Gargantuan or larger body of fresh water (not salt water).
                Forming or severing a bond takes one week of meditation and ritual, periodically interrupted by rest.
                Forming a bond also requires asking permission from the water, which you are able to do as part of the ritual.
                Any individual body of water can only be bonded to one naiad or naiadi in this way.

                As long as your bonded water remains clean, pure, and large enough to be a valid subject of bonding, you gain a \plus1 \glossterm{enhancement bonus} to your \glossterm{magical power} and \glossterm{mundane power}, and a \plus2 bonus to your \glossterm{vital rolls}.
                While you are within 60 feet of your bonded body of water, these bonuses double.
                If your bonded water becomes contaminated or shrinks below the minimum size, these bonuses are inverted into penalties until you sever the bond.
                You can passively observe the general health and status of water you are bonded to, including knowing when significant pollutants enter the water and when the water grows or shrinks significantly.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Fluid Freedom",
            is_magical: true,
            rank: 2,
            description: r"\
                While your \textit{water bond} is active, all of your \magical attacks have the \atWater tag.
                In addition, whenever you use a \magical \atWater ability, you can choose to \glossterm{exclude} your \glossterm{allies} from it.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Freshwater Fountain",
            is_magical: true,
            rank: 2,
            description: r"\
                The volume of water you can create with the \spell{create water} cantrip is doubled.
                In addition, you do not consider casting that cantrip to be strenuous activity, so you can cast it continuously for longer than five minutes (see \pcref{Maintain Exertion}).
                This generally means that you can create a Small body of water with half a minute of work.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Bonded Boon",
            is_magical: true,
            rank: 3,
            description: r"\
                While your \textit{water bond} is active, you gain a benefit based on the body of water you bonded.
                If it\'s ambiguous how to categorize your body of water, you can choose any one applicable category when you gain this ability and when you form any future bonds.
                \begin{raggeditemize}
                    \itemhead{Geyser or spring} You gain a \plus2 accuracy bonus against creatures that are at \unaware or \partiallyunaware of your attacks.
                    In addition, when you use the \ability{desperate exertion} ability to affect an attack, the target is considered \partiallyunaware of that attack.
                    \itemhead{Lake} You gain a \plus3 bonus to your \glossterm{durability}.
                    \itemhead{River or stream} You gain a \plus2 bonus to your Reflex defense.
                    In addition, when you \ability{sprint} downhill, you gain a \plus10 foot bonus to your \glossterm{movement speed}.
                    This bonus is doubled as normal by the sprint ability.
                    \itemhead{Underground reservoir} You gain \trait{darkvision} with a 60 foot range, allowing you to see in complete darkness (see \pcref{Darkvision}).
                    In addition, you gain a \plus2 \glossterm{enhancement bonus} to the Deception and Stealth skills.
                \end{raggeditemize}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Aqueous Form",
            is_magical: true,
            rank: 4,
            description: r"\
                You can cast the \spell{aqueous form} spell.
                When you do, you do not require \glossterm{verbal components} or \glossterm{somatic components}, and you use your rank in this archetype as your your spellcasting rank.
                In addition, it has the \atAttune tag instead of the \atAttune (deep) tag.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Enchanting Appearance+",
            is_magical: true,
            rank: 4,
            description: r"\
                The bonuses from your \textit{enchanting appearance} ability are doubled.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Freshwater Fountain+",
            is_magical: true,
            rank: 5,
            description: r"\
                The multiplier from your \textit{freshwater fountain} ability increases to ten times the normal volume of water.
                This generally means that you can create a Medium body of water with one minute of work, or a Gargantuan body of water with 8 hours of work.
                You can bond with a body of water you create with this ability just like any other body of water.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Fluid Force+",
            is_magical: true,
            rank: 5,
            description: r"\
                The bonuses increase to \plus2.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Bonded Boon+",
            is_magical: true,
            rank: 6,
            description: r"\
                The benefit from your bonded body of water improves.
                \begin{raggeditemize}
                    \itemhead{Geyser or spring} The accuracy bonus increases to \plus4.
                    \itemhead{Lake} The hit point bonus increases to five times your rank in this archetype.
                    \itemhead{River or stream} You gain a \plus10 foot \glossterm{enhancement bonus} to your \glossterm{movement speed}.
                    \itemhead{Underground reservoir} The range of your \trait{darkvision} increases by 60 feet.
                    In addition, the skill bonuses increase to \plus4.
                \end{itemize}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Water Bond+",
            is_magical: true,
            rank: 7,
            description: r"\
                The bonuses from your \textit{water bond} ability increase to \plus4.
                In addition, your bonded body of water becomes effectively impossible to contaminate.
                The entire body of water is continuously purified, as if by the \spell{purify water} ability, with contaminants shunted to the outside.
                It can still be physically destroyed with sufficient effort.
            ",
            modifiers: None,
        },
    ]
}
