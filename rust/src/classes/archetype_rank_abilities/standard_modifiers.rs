use crate::classes::archetype_rank_abilities::RankAbility;



pub fn add_standard_spell_modifiers(rank_abilities: &mut Vec<RankAbility<'_>>) {
    rank_abilities.append(&mut vec![
        RankAbility {
            complexity: 0,
            name: "Spells",
            is_magical: true,
            rank: 1,
            description: "",
        },
        RankAbility {
            complexity: 0,
            name: "Spells",
            is_magical: true,
            rank: 2,
            description: "",
        },
        RankAbility {
            complexity: 0,
            name: "Spells",
            is_magical: true,
            rank: 3,
            description: "",
        },
        RankAbility {
            complexity: 0,
            name: "Spells",
            is_magical: true,
            rank: 4,
            description: "",
        },
        RankAbility {
            complexity: 0,
            name: "Spells",
            is_magical: true,
            rank: 5,
            description: "",
        },
        RankAbility {
            complexity: 0,
            name: "Spells",
            is_magical: true,
            rank: 6,
            description: "",
        },
        RankAbility {
            complexity: 0,
            name: "Spells",
            is_magical: true,
            rank: 7,
            description: "",
        },
    ]);
}

pub fn add_standard_maneuver_modifiers(rank_abilities: &mut Vec<RankAbility<'_>>) {
    rank_abilities.append(&mut vec![
        RankAbility {
            complexity: 0,
            name: "Maneuvers",
            is_magical: false,
            rank: 1,
            description: "",
        },
        RankAbility {
            complexity: 0,
            name: "Maneuvers",
            is_magical: false,
            rank: 3,
            description: "",
        },
        RankAbility {
            complexity: 0,
            name: "Maneuvers",
            is_magical: false,
            rank: 5,
            description: "",
        },
        RankAbility {
            complexity: 0,
            name: "Maneuvers",
            is_magical: false,
            rank: 7,
            description: "",
        },
    ]);
}
