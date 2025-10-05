use crate::classes::archetype_rank_abilities::RankAbility;

pub fn oozeborn<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Acidic Pseudopod",
            complexity: 1,
            description: r"
                One of your arms becomes a pseudopod \glossterm{natural weapon}.
                It deals 1d8 damage and has the \atAcid and \weapontag{Long} tags (see \pcref{Weapon Tags}).
                You do not have a \glossterm{free hand} on that arm while using it as a weapon in this way.

                In addition, all of your attacks with natural weapons have the \atAcid tag.
                This does not affect damage you deal with manufactured weapons.
            ",
            is_magical: false,
            modifiers: None,
            rank: 1,
        },
        RankAbility {
            name: "Darkborn Senses",
            complexity: 1,
            description: r"
              You gain \trait{blindsense} with a 60 foot range, allowing you to sense your surroundings without light (see \pcref{Blindsense}).
              If you already have the blindsense ability, you increase its range by 60 feet.
              In addition, you gain \trait{blindsight} with a 15 foot range, allowing you to see without light (see \pcref{Blindsight}).
              If you already have the blindsight ability, you increase its range by 15 feet.
            ",
            is_magical: false,
            modifiers: None,
            rank: 2,
        },
        RankAbility {
            name: "Ingest Object",
            complexity: 2,
            description: r"
              \begin{activeability}{Ingest Object}{Standard action}
                \abilitytags \atAcid
                \rankline
                This ability functions like the \spell{absorb object} spell, except that the maximum size of the object is equal to your size.
                Anything you absorb in this way takes a single point of \glossterm{environmental} damage during each of your actions while it remains absorbed.
                This damage is insufficient to hurt most objects made from wood, stone, or metal, but it can destroy more fragile objects like paper or complex mechanical traps.
              \end{activeability}
            ",
            is_magical: false,
            modifiers: None,
            rank: 2,
        },
        RankAbility {
            name: "Amorphous Form+",
            complexity: 2,
            description: r"
              You gain a \plus4 bonus to your defenses when determining whether a \glossterm{strike} gets a \glossterm{critical hit} against you instead of a normal hit.
              In addition, your \ability{mold body} ability loses the \abilitytag{Sustain} (free) tag.
              Instead, it lasts until you choose to \glossterm{dismiss} it.
              This allows you to maintain your shape while unconscious.
            ",
            is_magical: false,
            modifiers: None,
            rank: 3,
        },
        RankAbility {
            name: "Compressible Body+",
            complexity: 1,
            description: r"
                You reduce your penalties for \squeezing by 1.
            ",
            is_magical: false,
            modifiers: None,
            rank: 3,
        },
        RankAbility {
            name: "Acidic Pseudopod+",
            complexity: 1,
            description: r"
                The damage dealt by your pseudopod increases to 1d10.
            ",
            is_magical: false,
            modifiers: None,
            rank: 4,
        },
        RankAbility {
            name: "Acidic Body+",
            complexity: 1,
            description: r"
                You are \trait{immune} to \atAcid and \atPoison attacks.
            ",
            is_magical: false,
            modifiers: None,
            rank: 4,
        },
        RankAbility {
            name: "Darkborn Senses+",
            complexity: 0,
            description: r"
              The range of your \trait{blindsense} increases by 60 feet.
              In addition, the range of your \trait{blindsight} increases by 15 feet.
            ",
            is_magical: false,
            modifiers: None,
            rank: 5,
        },
        RankAbility {
            name: "Ingest Object+",
            complexity: 1,
            description: r"
                The maximum number of objects you can absorb with your \textit{ingest object} ability increases to 2.
                In addition, you may absorb \glossterm{allies} with that ability in addition to unattended objects.
            ",
            is_magical: false,
            modifiers: None,
            rank: 5,
        },
        RankAbility {
            name: "Amorphous Form++",
            complexity: 0,
            description: r"
                The defense bonus against critical hits from strikes increases to \plus10.
            ",
            is_magical: false,
            modifiers: None,
            rank: 6,
        },
        RankAbility {
            name: "Compressible Body++",
            complexity: 0,
            description: r"
              The reduction of squeezing penalties increases to 2.
              This means you take no penalties for squeezing unless you use the \ability{tight squeeze} ability (see \pcref{Flexibility}).
            ",
            is_magical: false,
            modifiers: None,
            rank: 6,
        },
        RankAbility {
            name: "Third Arm",
            complexity: 2,
            description: r"
              When you use your \ability{mold body} ability, you can create three arms instead of two.
              You can use all three hands as free hands.
              For example, this can allow you to use a \weapontag{Heavy} weapon and a shield simultaneously.

              In addition, your arms become stronger and more agile.
              You can use any of your arms as a pseudopod natural weapon, and your pseudopods gain the \weapontag{Light} weapon tag (see \pcref{Weapon Tags}).
            ",
            is_magical: false,
            modifiers: None,
            rank: 7,
        },
    ]
}
