use crate::classes::archetype_rank_abilities::RankAbility;

pub fn dragon<'a>() -> Vec<RankAbility<'a>> {
    vec![
        // Cooldown abilities are treated as +1 rank.
        // At rank 1, we deal drX in a R1 area.
        // At rank 3, we change to drX-1 in a R3 area.
        // At rank 7, we cheat and increase the area as part of the rank 7 upgrades.
        RankAbility {
            complexity: 2,
            name: "Dragon Breath",
            is_magical: true,
            rank: 1,
            description: r"
                \begin{activeability}{Dragon Breath}{Standard action}
                    \abilitycost You \briefly can't use this ability again.
                    \rankline
                    This ability's tag depends on your dragon type (see Dragon Types, above).
                    Make an attack vs. Reflex against everything in the area defined by your dragon type.
                    \hit \damageranktwo.
                    \miss Half damage.

                    \rankline
                    \rank{2} The damage increases to \damagerankthree.
                    \rank{3} The area increases.
                    A line breath weapon becomes a \arealarge, 10 ft.\ wide line.
                    A cone breath weapon becomes a \areamed cone.
                    \rank{4} The damage increases to \damagerankfour.
                    \rank{5} The damage increases to \damagerankfive.
                    \rank{6} The damage increases to \damageranksix.
                    \rank{7} The damage increases to \damagerankseven, and the area increases.
                    A line breath weapon becomes a \areagargantuan, 15 ft.\ wide line.
                    A cone breath weapon becomes a \arealarge cone.
                \end{activeability}
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Draconic Power",
            is_magical: false,
            rank: 2,
            description: r"
                You add half your Strength to your \glossterm{magical power}.
                In addition, you add half your Willpower to your \glossterm{mundane power}.
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Draconic Bulk",
            is_magical: false,
            rank: 3,
            description: r"
                Your size category increases to Medium.
                This increases your \glossterm{base speed} to 30 feet.
                You reduce your Dexterity by 1 and increase your Strength by 2.
                In addition, you gain a \plus1 bonus to your Armor defense.
            ",
        },
        RankAbility {
            complexity: 1,
            name: "Draconic Flight",
            is_magical: true,
            rank: 4,
            description: r"
                Your wings grow larger, granting you a limited ability to fly.
                You gain an average \glossterm{fly speed} with a maximum height of 10 feet (see \pcref{Flight}).
                As a \glossterm{free action}, you can increase your \glossterm{fatigue level} by one to ignore this height limit this turn.
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Draconic Mind",
            is_magical: false,
            rank: 5,
            description: r"
                You gain a \plus1 bonus to your Intelligence, Perception, or Willpower. 
                If your Constitution is higher than your chosen attribute before applying this bonus, the bonus increases to \plus2.
            ",
        },
        RankAbility {
            complexity: 0,
            name: "Draconic Bulk+",
            is_magical: false,
            rank: 6,
            description: r"
                Your size category increases to Large.
                This increases your \glossterm{base speed} to 40 feet.
                Your attribute modifiers to Dexterity and Strength increase to \minus2 and \plus3 respectively, and you gain a \plus1 bonus to your Constitution.
                You also gain a tail slam \glossterm{natural weapon}.
                It deals 1d8 damage and has the \abilitytag{Impact} weapon tag (see \pcref{Weapon Tags}).
            ",
        },
        RankAbility {
            complexity: 1,
            name: "Draconic Flight+",
            is_magical: true,
            rank: 7,
            description: r"
                The height limit of your flight increases to 60 feet.
            ",
        },
        RankAbility {
            complexity: 1,
            name: "Draconic Hoard",
            is_magical: true,
            rank: 7,
            description: r"
                You draw power from your accumulated wealth.
                Your hoard must be owned exclusively by you, and you must know its location at all times.
                Only wealth items that consist of gold, gems, and similar objects of intrinsic mundane value contribute to your hoard's effects, though you may have other items in your hoard.
                For each rank 7 wealth item in your hoard, you gain a \plus1 \glossterm{enhancement bonus} to your Constitution, to a maximum of \plus5.
                Fr each rank 8 wealth item in your hoard, you gain an additional \glossterm{attunement point}, to a maximum of 3.
            ",
        },
    ]
}
