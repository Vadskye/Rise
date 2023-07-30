use crate::equipment::{Tool, ToolCategory, ItemUpgrade};

pub fn alchemical_items() -> Vec<Tool> {
    let mut tools = vec![];

    fn alchemical_item() -> Tool {
        return Tool {
            category: ToolCategory::Alchemical,
            magical: false,
            ..Default::default()
        };
    }

    // +1dr for Short range, +2dr for double defense
    tools.push(Tool {
        name: "Alchemist's Fire".to_string(),
        rank: 1,
        short_description: "Throw to deal $dr2 fire damage".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against anything within \shortrange.
            \hit $dr2 fire damage.
        ".to_string(),
        upgrades: vec![
            // This "should" be 2d8, but the d10 is much more clear as 2d10
            ItemUpgrade::new(3, "Throw to deal 2d10 fire damage", r"
                The damage increases to 2d10.
            "),
            ItemUpgrade::new(5, "Throw to deal $dr6 fire damage", r"
                The damage increases to $dr6.
            "),
            ItemUpgrade::new(7, "Throw to deal $dr8 fire damage", r"
                The damage increases to $dr8.
            "),
        ],
        ..alchemical_item()
    });

    // +1dr for Short range, +2dr for double defense
    tools.push(Tool {
        name: "Acid Flask".to_string(),
        rank: 2,
        short_description: "Throw to deal $dr5 acid damage".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex and Fortitude against anything within \shortrange.
            \hit $dr5 acid damage.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(4, "Throw to deal $dr7 acid damage", r"
                The damage increases to $dr7.
            "),
            ItemUpgrade::new(6, "Throw to deal $dr9 acid damage", r"
                The damage increases to $dr9.
            "),
        ],
        ..alchemical_item()
    });

    return tools;
}
