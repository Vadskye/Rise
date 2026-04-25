use crate::core_mechanics::abilities::{AbilityTag, AttuneType};
use crate::equipment::{ItemUpgrade, Tool, ToolCategory};

fn elixir() -> Tool {
    return Tool {
        category: ToolCategory::Potion,
        magical: true,
        tags: vec![AbilityTag::Attune(AttuneType::Personal)],
        ..Default::default()
    };
}


// Elixirs with 10 minute durations: as apparel of rank X+3, or equivalently as a
// spell of rank X+1. So:
// R0: 0.75 EA
// R2: 1 EA
// R4: 1.25 EA
// R6: 1.5 EA
//
// With 8 hour durations, as apparel of rank X+2, or as a spell of rank X.
pub fn elixirs() -> Vec<Tool> {
    let mut elixirs = vec![];

    elixirs.push(Tool {
        name: "Antitoxin Elixir".to_string(),
        rank: 1,
        short_description: "Resistant to poison".to_string(),
        description: String::from(r"
            When you drink this \glossterm<potion>, if you \glossterm<attune> to its effects, you become \resistant to \atPoison effects.
            This effect expires after 10 minutes.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Immune to poison", r"
                You become immune instead of resistant.
            "),
        ],
        ..elixir()
    });

    elixirs.push(Tool {
        name: "Elixir of the Silver Tongue".to_string(),
        rank: 2,
        short_description: "Grants +2 to Creature Handling, Deception, and Persuasion".to_string(),
        description: r"
            When you drink this \glossterm<potion>, if you \glossterm<attune> to its effects, you gain a +2 \glossterm<enhancement bonus> to your Creature Handling, Deception, and Persuasion skills.
            This effect expires after 10 minutes.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(4, "Grants +3 to Creature Handling, Deception, and Persuasion", r"
                The bonus increases to +3.
            "),
            ItemUpgrade::new(6, "Grants +4 to Creature Handling, Deception, and Persuasion", r"
                The bonus increases to +4.
            "),
        ],
        ..elixir()
    });

    elixirs.push(Tool {
        name: "Elixir of Grace".to_string(),
        rank: 2,
        short_description: "Grants +2 to Balance, Flexibility, and Stealth".to_string(),
        description: r"
            When you drink this \glossterm<potion>, if you \glossterm<attune> to its effects, you gain a +2 \glossterm<enhancement bonus> to your Balance, Flexibility, and Stealth skills.
            This effect expires after 10 minutes.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(4, "Grants +3 to Balance, Flexibility, and Stealth", r"
                The bonus increases to +3.
            "),
            ItemUpgrade::new(6, "Grants +4 to Balance, Flexibility, and Stealth", r"
                The bonus increases to +4.
            "),
        ],
        ..elixir()
    });

    elixirs.push(Tool {
        name: "Fireproof Elixir".to_string(),
        rank: 1,
        short_description: "Resistant to fire".to_string(),
        description: r"
            When you drink this \glossterm<potion>, if you \glossterm<attune> to its effects, you become \resistant to \atFire effects.
            This effect expires after 10 minutes.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(4, "Immune to fire", r"
                You become immune instead of resistant.
            "),
        ],
        ..elixir()
    });

    elixirs.push(Tool {
        name: "Elixir of Strength".to_string(),
        rank: 1,
        short_description: "Grants +1 bonus for weight limits".to_string(),
        description: r"
            When you drink this \glossterm<potion>, if you \glossterm<attune> to its effects, you gain a +1 \glossterm<enhancement bonus> to your Strength that only applies for the purpose of determining your \glossterm<weight limits> (see \pcref<Weight Limits>).
            This effect expires after 8 hours.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(4, "Grants +2 bonus for weight limits", r"
                The bonus increases to +2.
            "),
        ],
        ..elixir()
    });

    elixirs.push(Tool {
        name: "Fortifying Elixir".to_string(),
        rank: 6,
        short_description: "Fortifies you".to_string(),
        description: r"
            When you drink this \glossterm<potion>, if you \glossterm<attune> to its effects, you become \fortified.
            This effect expires after 10 minutes.
        ".to_string(),
        ..elixir()
    });

    return elixirs;
}
