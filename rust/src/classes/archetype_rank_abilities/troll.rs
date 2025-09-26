use crate::classes::archetype_rank_abilities::RankAbility;

pub fn troll<'a>() -> Vec<RankAbility<'a>> {
    vec![
        RankAbility {
            name: "Regeneration",
            complexity: 1,
            description: r"
                At the end of each round, if you did not take damage from a \atAcid or \atFire ability that round, you regain hit points equal to your rank in this archetype.
            ",
            is_magical: false,
            modifiers: None,
            rank: 1,
        },
        RankAbility {
            name: "Tough Hide",
            complexity: 1,
            description: r"
                You gain a \plus2 bonus to your \glossterm{durability}.
                In addition, you gain a \plus1 bonus to your \glossterm{vital rolls} (see \pcref{Vital Wounds}).
            ",
            is_magical: false,
            modifiers: None,
            rank: 2,
        },
        RankAbility {
            name: "Subspecies Specialization",
            complexity: 2,
            description: r"
                You gain a bonus based on your troll subspecies.
                \begin{raggeditemize}
                  \item Cave: The range of your darkvision increases by 60 feet.
                    In addition, the Stealth bonus increases to \plus4.
                  \item Forest: You gain an additional \glossterm{insight point}.
                  \item Mountain: You gain a \plus1 bonus to your \glossterm{mundane power}.
                  \item Scrag: You gain a \glossterm{swim speed} 10 feet slower than your \glossterm{base speed}.
                \end{raggeditemize}
            ",
            is_magical: false,
            modifiers: None,
            rank: 3,
        },
        RankAbility {
            name: "Tusks",
            complexity: 1,
            description: r"
                Your bite natural weapon deals 1d10 damage instead of the normal 1d8.
            ",
            is_magical: false,
            modifiers: None,
            rank: 3,
        },
        RankAbility {
            name: "Regeneration+",
            complexity: 2,
            description: r"
                The recovery increases to three times your rank in this archetype.
                In addition, you also automatically remove one \glossterm{vital wound}.
                You can choose to suppress this healing, and it does not function if you took damage from a \atAcid or \atFire ability that round.
                While you are unconscious, this automatically removes your most severe vital wound.
                Whenever you remove a vital wound in this way, you increase your \glossterm{fatigue level} by three.
            ",
            is_magical: false,
            modifiers: None,
            rank: 4,
        },
        RankAbility {
            name: "Hulking Size",
            complexity: 1,
            description: r"
                Your size category increases to Large.
                This increases your \glossterm{base speed} to 40 feet, among other effects (see \pcref{Size and Weight}).
            ",
            is_magical: false,
            modifiers: None,
            rank: 5,
        },
        RankAbility {
            name: "Subspecies Specialization+",
            complexity: 2,
            description: r"
                Your bonus based on your troll subspecies improves.
                \begin{raggeditemize}
                  \item Cave: You gain a \plus1 bonus to your Dexterity.
                  \item Forest: You gain a \plus1 bonus to your Intelligence.
                  \item Mountain: You gain a \plus1 bonus to your Strength.
                  \item Scrag: You gain a \plus1 bonus to your Constitution.
                \end{raggeditemize}
            ",
            is_magical: false,
            modifiers: None,
            rank: 6,
        },
        RankAbility {
            name: "Tusks+",
            complexity: 1,
            description: r"
                Your bite natural weapon deals 2d6 damage instead of the normal 1d8.
            ",
            is_magical: false,
            modifiers: None,
            rank: 6,
        },
        RankAbility {
            name: "Regeneration++",
            complexity: 1,
            description: r"
                The recovery increases to six times your rank in this archetype.
                In addition, removing a vital wound with this ability only increases your fatigue level by two.
            ",
            is_magical: false,
            modifiers: None,
            rank: 7,
        },
    ]
}
