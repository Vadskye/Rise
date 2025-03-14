use crate::equipment::{ItemUpgrade, Tool, ToolCategory};
use crate::core_mechanics::abilities::{AbilityTag, AttuneType};

pub fn potions() -> Vec<Tool> {
    let mut potions = vec![];

    fn elixir() -> Tool {
        return Tool {
            category: ToolCategory::Potion,
            magical: true,
            tags: vec![AbilityTag::Attune(AttuneType::Personal)],
            ..Default::default()
        };
    }

    fn potion() -> Tool {
        return Tool {
            category: ToolCategory::Potion,
            magical: true,
            ..Default::default()
        };
    }

    potions.push(Tool {
        name: "Cleansing Potion".to_string(),
        rank: 3,
        short_description: "Removes a condition".to_string(),
        description: r"
            When you drink this \glossterm<potion>, you remove a \glossterm<condition> affecting you and increase your \glossterm<fatigue level> by one.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(5, "Removes two conditions", r"
                You remove two conditions instead of only one.
                You increase your fatigue level by one for each condition that you remove in this way.
            "),
        ],
        ..potion()
    });

    potions.push(Tool {
        name: "Potion of Healing".to_string(),
        rank: 0,
        short_description: "Restores $dr3l hit points and mitigates vital wounds".to_string(),
        description: r"
            When you drink this \glossterm<potion>, you regain $dr3l hit points and increase your \glossterm{fatigue level} by one.
            In addition, if you have a \glossterm{vital wound} gith a \glossterm{vital roll} of 0 or -1, you treat that vital roll as a 1 instead (see \pcref{Vital Wounds}).
        ".to_string(),
        tags: vec![AbilityTag::Swift],
        upgrades: vec![
            ItemUpgrade::new(2, "Restores $dr5l hit points and mitigates vital wounds", r"
                The healing increases to $dr5l, and the minimum vital roll affected improves to -2.
            "),
            ItemUpgrade::new(4, "Restores $dr7l hit points and mitigates vital wounds", r"
                The healing increases to $dr7l, and the minimum vital roll affected improves to -3.
            "),
            ItemUpgrade::new(6, "Restores $dr9l hit points and mitigates vital wounds", r"
                The healing increases to $dr9l, and the minimum vital roll affected improves to -4.
            "),
        ],
        ..potion()
    });

    potions.push(Tool {
        name: "Potion of Regeneration".to_string(),
        rank: 1,
        short_description: "Remove vital wound after long rest".to_string(),
        description: r"
            When you drink this \glossterm<potion>, your body's natural healing process is accelerated.
            The next time you finish a \glossterm<long rest>, you can remove an additional \glossterm<vital wound>.
            If you drink multiple potions of regeneration, their effects do not stack.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(4, "Removes two vital wounds after a long rest", r"
                You remove two additional vital wounds instead of only one.
            "),
        ],
        ..potion()
    });

    potions.push(Tool {
        name: "Antitoxin Elixir".to_string(),
        rank: 0,
        short_description: "Impervious to poison".to_string(),
        description: String::from(r"
            When you drink this \glossterm<potion>, if you \glossterm<attune> to its effects, you become \impervious to poisons.
            This effect expires after 10 minutes.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Immune to poison", r"
                You become immune instead of impervious.
            "),
        ],
        ..elixir()
    });

    potions.push(Tool {
        name: "Elixir of Resilience".to_string(),
        rank: 0,
        short_description: "Grants +4 damage resistance".to_string(),
        description: r"
            When you drink this \glossterm<potion>, if you \glossterm<attune> to its effects, you gain a +4 \glossterm<enhancement bonus> to your \glossterm<damage resistance>.
            This effect expires after 10 minutes.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(2, "Grants +8 damage resistance", r"
                The damage resistance bonus increases to +8.
            "),
            ItemUpgrade::new(4, "Grants +16 damage resistance", r"
                The damage resistance bonus increases to +16.
            "),
            ItemUpgrade::new(6, "Grants +32 damage resistance", r"
                The damage resistance bonus increases to +32.
            "),
        ],
        ..elixir()
    });

    potions.push(Tool {
        name: "Elixir of Hardiness".to_string(),
        rank: 1,
        short_description: "Grants +2 to vital rolls".to_string(),
        description: r"
            When you drink this \glossterm<potion>, if you \glossterm<attune> to its effects, you gain a +2 \glossterm<enhancement bonus> to your \glossterm<vital rolls>.
            This effect expires after 10 minutes.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(3, "Grants +3 vital rolls", r"
                The bonus increases to +3.
            "),
            ItemUpgrade::new(5, "Grants +4 vital rolls", r"
                The bonus increases to +4.
            "),
        ],
        ..elixir()
    });

    potions.push(Tool {
        name: "Elixir of Strength".to_string(),
        rank: 1,
        short_description: "Grants +1 bonus for weight limits".to_string(),
        description: r"
            When you drink this \glossterm<potion>, if you \glossterm<attune> to its effects, you gain a +1 \glossterm<enhancement bonus> to your Strength for the purpose of determining your \glossterm<weight limits> (see \pcref<Weight Limits>).
            This effect expires after 8 hours.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(4, "Grants +2 bonus for weight limits", r"
                The bonus increases to +2.
            "),
        ],
        ..elixir()
    });

    return potions;
}
