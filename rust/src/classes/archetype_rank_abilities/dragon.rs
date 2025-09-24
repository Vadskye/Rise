use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::{Defense, Attribute};
use crate::creatures::Modifier;

pub fn dragon<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Dragon Breath",
            is_magical: true,
            rank: 1,
            description: r"\\
                \begin{activeability}{Dragon Breath}
                    \abilityusagetime Standard action.
                    \abilitycost You \glossterm{briefly} cannot use this ability again.
                    \rankline
                    This ability\'s tag depends on your dragon type (see Dragon Types, above).
                    Make an attack vs. Reflex against everything in the area defined by your dragon type.
                    \hit \damageranktwo.
                    \miss Half damage.

                    \rankline
                    \rank{2} The area increases.
                    A line breath weapon becomes a \arealarge, 5 ft.\ wide line.
                    A cone breath weapon becomes a \areamed cone.
                    \rank{3} The damage increases to \damagerankthree.
                    \rank{4} The damage increases to \damagerankfour.
                    \rank{5} The area increases.
                    A line breath weapon becomes a \areahuge, 10 ft.\ wide line.
                    A cone breath weapon becomes a \arealarge cone.
                    \rank{6} The damage increases to \damageranksix.
                    \rank{7} The damage increases to \damagerankseven.
                \end{activeability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Draconic Flight",
            is_magical: true,
            rank: 2,
            description: r"\\
                Your wings grow larger, granting you a limited ability to fly.
                You gain a slow \glossterm{fly speed} with a maximum height of 10 feet (see \pcref{Flight}).
                As a \glossterm{free action}, you can increase your \glossterm{fatigue level} by one to ignore this height limit until the end of the round.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Draconic Body",
            is_magical: false,
            rank: 3,
            description: r"\\
                You gain a \plus1 bonus to your Armor defense.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Armor, 1)]),
        },
        RankAbility {
            complexity: 0,
            name: "Draconic Bulk",
            is_magical: false,
            rank: 4,
            description: r"\\
                Your size category increases to Medium.
                This increases your \glossterm{base speed} to 30 feet.
                You reduce your Dexterity by 1 and increase your Strength by 2.
                In addition, you gain a \plus1 bonus to your \glossterm{magical power} and \glossterm{mundane power}.
            ",
            modifiers: Some(vec![
                Modifier::BaseSpeed(10),
                Modifier::Attribute(Attribute::Dexterity, -1),
                Modifier::Attribute(Attribute::Strength, 2),
                Modifier::Power(1),
            ]),
        },
        RankAbility {
            complexity: 0,
            name: "Draconic Body+",
            is_magical: false,
            rank: 5,
            description: r"\\
                The Armor bonus from your \textit{draconic body} ability increases to \plus2.
            ",
            modifiers: Some(vec![Modifier::Defense(Defense::Armor, 1)]),
        },
        RankAbility {
            complexity: 1,
            name: "Draconic Flight+",
            is_magical: true,
            rank: 6,
            description: r"\\
                The maximum height increases to 30 feet, and the speed increases to average.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Draconic Bulk+",
            is_magical: false,
            rank: 7,
            description: r"\\
                Your size category increases to Large.
                This increases your \glossterm{base speed} to 40 feet.
                In addition, the attribute modifiers to Dexterity and Strength increase to \minus2 and \plus3 respectively, and the power bonus increases to \plus2.
                You also gain a tail slam \glossterm{natural weapon}.
                It deals 1d10 damage and has the \abilitytag{Impact} weapon tag (see \pcref{Weapon Tags}).
            ",
            modifiers: Some(vec![
                Modifier::BaseSpeed(10),
                Modifier::Attribute(Attribute::Dexterity, -1),
                Modifier::Attribute(Attribute::Strength, 1),
                Modifier::Power(1),
            ]),
        },
    ]
}
