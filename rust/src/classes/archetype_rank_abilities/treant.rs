use crate::classes::archetype_rank_abilities::RankAbility;
use crate::core_mechanics::Attribute;
use crate::creatures::Modifier;

pub fn treant<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            complexity: 1,
            name: "Nourishing Ingrain",
            is_magical: false,
            rank: 1,
            description: r"
                At the end of each round while you are \ability{ingrained}, you regain hit points equal to your rank in this archetype, and you may choose to remove a \glossterm{condition}.
                If you do, you increase your \glossterm{fatigue level} by one.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Sturdy as the Mighty Oak",
            is_magical: false,
            rank: 2,
            description: r"
                You gain a \plus3 bonus to your \glossterm{durability}.
            ",
            modifiers: Some(vec![Modifier::Durability(3)]),
        },
        RankAbility {
            complexity: 2,
            name: "Animate Plants",
            is_magical: true,
            rank: 3,
            description: r"
                \begin{magicalactiveability}{Animate Plants}[\abilitytag{Manifestation}]
                    \abilityusagetime Standard action.
                    \rankline
                    Make an attack vs. Reflex against one Large or smaller \glossterm{grounded} creature within \medrange.
                    You gain a \plus2 accuracy bonus if the target is in \glossterm{undergrowth}.

                    \hit The target is \glossterm{briefly} \slowed.
                    In addition, it is attacked by plants as a \glossterm{condition}.
                    It takes 1d8 damage immediately, and during each of your subsequent actions while this condition lasts.

                    This condition can be removed if the target makes a \glossterm{difficulty value} 10 Strength check as a \glossterm{move action} to break the plants.
                    If the target makes this check as a standard action, it gains a \plus5 bonus.
                    In addition, this condition is removed if the target takes damage from a \atFire ability.
                    \crit The condition must be removed an additional time before the effect ends.
                    \rankline
                    For each rank beyond 3, the attack's \glossterm{accuracy} increases by \plus2 and the \glossterm{difficulty value} to break the plants increases by 2.
                    In addition, the damage increases at each rank as described below.
                    \rank{4} 1d10 damage.
                    \rank{5} 2d6 damage.
                    \rank{6} 2d8 damage.
                    \rank{7} 2d10 damage.
                \end{magicalactiveability}
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Tall as the Noble Pine",
            is_magical: false,
            rank: 4,
            description: r"
                Your size category increases to Large.
                Unlike normal for increasing your size, this does not increase your \glossterm{base speed}.
                You also gain a \plus1 bonus to your Strength, and a \minus1 penalty to your Dexterity.
            ",
            modifiers: Some(vec![
                Modifier::Attribute(Attribute::Strength, 1),
                Modifier::Attribute(Attribute::Dexterity, -1),
            ]),
        },
        RankAbility {
            complexity: 1,
            name: "Nourishing Ingrain+",
            is_magical: false,
            rank: 5,
            description: r"
                The healing from your \textit{nourishing ingrain} ability increases to three times your rank in this archetype.
                In addition, removing a condition with that ability no longer increases your fatigue level.
            ",
            modifiers: None,
        },
        RankAbility {
            complexity: 0,
            name: "Sturdy as the Mighty Oak+",
            is_magical: false,
            rank: 6,
            description: r"
                The durability bonus increases to \plus5.
            ",
            modifiers: Some(vec![Modifier::Durability(2)]),
        },
        RankAbility {
            complexity: 0,
            name: "Tall as the Noble Pine+",
            is_magical: false,
            rank: 7,
            description: r"
                Your size category increases to Huge.
                This increases your \glossterm{base speed} to 40 feet.
                Your normal movement speed is still only 30 feet due to the penalty from \textit{unhurried and unfaltering}.
                The modifiers to Strength and Dexterity increase to \plus2 and \minus2, respectively.
            ",
            modifiers: Some(vec![
                Modifier::BaseSpeed(10),
                Modifier::Attribute(Attribute::Strength, 1),
                Modifier::Attribute(Attribute::Dexterity, -1),
            ]),
        },
    ]
}
