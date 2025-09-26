use crate::classes::archetype_rank_abilities::RankAbility;

pub fn dryad<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 2,
            name: "Tree Stride",
            is_magical: true,
            rank: 1,
            description: r"
                You can walk into and through living trees.
                Moving through a tree does not impede your movement in any way, and you can end your movement inside a tree.
                When you do, you can choose to be partially melded or fully melded with the tree.
                While partially melded, the tree provides \glossterm{cover} against all attacks against you.
                While fully melded, the tree blocks \glossterm{line of sight} or \glossterm{line of effect} between you and the outside world as long as it remains intact.

                At the end of each round, if you are fully or partially melded with a tree that you are bonded with using your \textit{tree bond} ability, you regain hit points equal to half your maximum hit points.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Natural Speech",
            is_magical: true,
            rank: 2,
            description: r"
                You can speak with plants and animals as if they were capable of ordinary speech.
                This ability does not make them any more friendly or cooperative than normal.
                Wary and cunning animals are likely to be terse and evasive, while stupid ones tend to make inane comments and are unlikely to say or understand anything of use.
                Plants do not have complex thought processes, but can provide information about events that have happened near them.
                In general, plants can remember events that happened within the most recent quarter of their lifespan.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Tree Stride+",
            is_magical: true,
            rank: 3,
            description: r"
                You can \glossterm{teleport} between living trees instead of moving using your \glossterm{walk speed}.
                Teleporting a given distance costs movement equal to half that distance.
                If this teleportation fails for any reason, you still expend that movement.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Fey Charm",
            is_magical: true,
            rank: 4,
            description: r"
                \begin{magicalsustainability}{Fey Charm}{\abilitytag{Emotion}, \abilitytag{Subtle}, \abilitytag{Sustain} (minor)}
                    \abilityusagetime \glossterm{Minor action}.
                    \rankline
                    Make an attack vs. Mental against a creature within \medrange that is an animal, plant, or humanoid.
                    You take a \minus10 penalty to \glossterm{accuracy} with this attack against creatures who have made an attack or been attacked since the start of the last round.
                    \hit The target is \charmed by you.
                    Any act by you or by creatures that appear to be your allies that threatens or harms the charmed person breaks the effect.
                    Harming the target is not limited to dealing it damage, but also includes causing it significant subjective discomfort.
                    An observant target may interpret overt threats to its allies as a threat to itself.

                    \rankline

                    \noindent The attack's \glossterm{accuracy} increases by \plus2 for each rank beyond 4.
                \end{magicalsustainability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 1,
            name: "Tree Bond+",
            is_magical: true,
            rank: 5,
            description: r"
                You can bond to a grove of trees instead of a single tree.
                The cumulative age of all trees in the grove must be at least a thousand years, and the grove must fit within a 500 foot radius.
                While bonded to a grove, the bonuses from your \textit{tree bond} and \textit{enchanting appearance} abilities double.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Tree Union",
            is_magical: true,
            rank: 6,
            description: r"
                When you meld with a tree using your \textit{tree stride} ability, you can fully unite with it.
                When you do, you have \glossterm{line of sight} and \glossterm{line of effect} from all areas of the tree simultaneously, as if you were everywhere in the tree's body.
                Attacks against the tree simultaneously affect both you and the tree.
                You and the tree are both \impervious to damaging attacks, but \vulnerable to \atFire attacks and cold iron weapons.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 2,
            name: "Acorns of Life",
            is_magical: true,
            rank: 7,
            description: r"
                Whenever you visit a tree you are bonded to with your \textit{tree bond} ability, you can gather acorns of life.
                You can have up to ten acorns of life at once.
                As a \glossterm{minor action}, you can throw an acorn of life onto an unoccupied \glossterm{grounded} space within \medrange of you.
                The space must be made of dirt, earth, or stone.
                When the acorn lands, a tree immediately grows in that space.
                The tree has a five foot diameter trunk and grows vertically until it reaches a hundred feet tall or until it encounters a solid obstacle preventing its growth.
            ",
            modifiers: None,
        },
    ]
}
