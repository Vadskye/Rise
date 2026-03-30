use crate::equipment::{ItemUpgrade, Tool, ToolCategory};

fn potion() -> Tool {
    return Tool {
        category: ToolCategory::Potion,
        magical: true,
        ..Default::default()
    };
}

pub fn potions() -> Vec<Tool> {
    let mut potions = vec![];

    potions.push(Tool {
        name: "Cleansing Potion".to_string(),
        rank: 2,
        short_description: "Removes a condition".to_string(),
        description: r"
            When you drink this \glossterm<potion>, you remove a \glossterm<condition> affecting you and increase your \glossterm<fatigue level> by one.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(4, "Removes two conditions", r"
                You remove two conditions instead of only one.
                You increase your fatigue level by one for each condition that you remove in this way.
            "),
        ],
        ..potion()
    });

    // rank 2 personal healing spell would be dr4l
    potions.push(Tool {
        name: "Potion of Healing".to_string(),
        rank: 0,
        short_description: "Restores $dr4l hit points and mitigates vital wounds".to_string(),
        description: r"
            When you drink this \glossterm<potion>, you regain $dr4l hit points and increase your \glossterm{fatigue level} by one.
            In addition, you can increase one of your \glossterm{vital wounds} with a \glossterm{vital roll} of 0 to be equal to 1 instead (see \pcref{Vital Wounds}).
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(1, "Restores $dr5l hit points and mitigates vital wounds", r"
                The healing increases to $dr5l, and the minimum vital roll affected improves to \minus1.
            "),
            // Rank 6 personal healing spell would be dr8l
            ItemUpgrade::new(3, "Restores $dr8l hit points and mitigates vital wounds", r"
                The healing increases to $dr8l, and the minimum vital roll affected improves to \minus2.
            "),
            ItemUpgrade::new(5, "Restores $dr10l hit points and mitigates vital wounds", r"
                The healing increases to $dr10l, and the minimum vital roll affected improves to \minus3.
            "),
        ],
        ..potion()
    });

    potions.push(Tool {
        name: "Godsblood".to_string(),
        // rank 10 personal healing spell would be dr12l
        rank: 7,
        short_description: "Restores $dr10l hit points over time".to_string(),
        description: r"
            When you drink this \glossterm<potion>, you regain $dr10l hit points and increase your \glossterm{fatigue level} by one.
            In addition, you increase all of your vital wounds with a \glossterm{vital roll} of less than 1 to be equal to 1.
            At the end of your next turn, this effect repeats.
        ".to_string(),
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

    // Self-buff potion ranks:
    // Same as spell of (rank + 1), so:
    // R0: 0.8 EA
    // R3: 1.0 EA
    // R5: 1.1 EA
    // R7: 1.2 EA

    // 0.4 + 0.3
    potions.push(Tool {
        name: "Invigorating Potion".to_string(),
        rank: 0,
        short_description: "Grants power and fortification".to_string(),
        description: r"
            When you drink this \glossterm<potion>, you are \glossterm{briefly} \empowered and \fortified.
        ".to_string(),
        ..potion()
    });

    // 0.4 + 0.4
    potions.push(Tool {
        name: "Mind-Whetting Potion".to_string(),
        rank: 0,
        short_description: "Grants focus".to_string(),
        description: r"
            When you drink this \glossterm<potion>, you are \glossterm{briefly} \empowered and \focused.
        ".to_string(),
        ..potion()
    });

    // 0.8
    potions.push(Tool {
        name: "Potion of Impending Violence".to_string(),
        rank: 1,
        short_description: "Primes and enrages you".to_string(),
        description: r"
            When you drink this \glossterm<potion>, you are \glossterm{briefly} \primed and \enraged.
        ".to_string(),
        ..potion()
    });

    // Honed + steeled is 0.8 EA, but they combine poorly since they are both circumstantial,
    // so call it 0.7 EA.
    potions.push(Tool {
        name: "Potion of Sharpened Steel".to_string(),
        rank: 1,
        short_description: "Grants critical benefits".to_string(),
        description: r"
            When you drink this \glossterm<potion>, you are \glossterm{briefly} \honed and \steeled.
        "
        .to_string(),
        ..potion()
    });

    potions.push(Tool {
        name: "Potion of Maximal Might".to_string(),
        rank: 1,
        short_description: "Grants maximum damage".to_string(),
        description: r"
            When you drink this \glossterm<potion>, you are \glossterm{briefly} \maximized.
        "
        .to_string(),
        ..potion()
    });

    // 0.4 + 0.7 = 1.1 EA
    potions.push(Tool {
        name: "Potion of Pure Power".to_string(),
        rank: 5,
        short_description: "Grants power and maximum damage".to_string(),
        description: r"
            When you drink this \glossterm<potion>, you are \glossterm{briefly} \empowered and \maximized.
        ".to_string(),
        ..potion()
    });

    return potions;
}
