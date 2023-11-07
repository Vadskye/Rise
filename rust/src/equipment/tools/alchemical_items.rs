use crate::equipment::{Tool, ToolCategory, ItemUpgrade};

fn alchemical_item() -> Tool {
    return Tool {
        category: ToolCategory::Alchemical,
        magical: false,
        ..Default::default()
    };
}

pub fn alchemical_items() -> Vec<Tool> {
    let mut tools = vec![];

    tools.append(&mut thrown_attacks());

    tools.push(Tool {
        name: "Smokestick".to_string(),
        rank: 1,
        short_description: "Creates a cloud of smoke".to_string(),
        description: r"
            You can activate this item as a standard action.
            As part of that action, you can optionally throw it anywhere within \shortrange.
            When you activate this item, it immediately creates a cloud of smoke in a \medarea radius from its location.
            The smoke provides \glossterm{concealment} for everything in the area.

            This item continues emitting smoke for one minute.
            After that time, the smoke dissipates normally, which generally takes about a minute.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(3, "Creates a massive cloud of smoke", r"
                The area increases to a \hugearea radius.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Tindertwig".to_string(),
        rank: 0,
        short_description: "Quickly activated flame".to_string(),
        description: r"
            You can activate this small, wooden stick by striking it against any hard surface as a \glossterm<minor action>.
            When you do, it bursts into flame, allowing you to light other fires with it.
            A tindertwig burns for one minute.
        ".to_string(),
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Flash Powder".to_string(),
        rank: 0,
        short_description: "Emits burst of bright light".to_string(),
        description: r"
            You can throw this powder in the air in your location as a standard action.
            When you do, it \glossterm<briefly> emits \glossterm<bright illumination> in a \largearea radius.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(2, "Emits burst of brilliant light", r"
                The light is \glossterm{brilliant illumination}, which banishes shadows completely, instead of bright illumination.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Moonrod".to_string(),
        rank: 1,
        short_description: "Emits bright illumination".to_string(),
        description: r"
            You can activate this item as a standard action.
            When you do, it creates \glossterm<bright illumination> in a 60 foot radius for 10 minutes.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(3, "Emits bright illumination for 8 hours", r"
                The effect lasts for 8 hours.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Sunrod".to_string(),
        rank: 2,
        short_description: "Emits brilliant illumination".to_string(),
        description: r"
            You can activate this item as a standard action.
            When you do, it creates \glossterm<brilliant illumination> in a 60 foot radius for 10 minutes.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(4, "Emits brilliant illumination for 8 hours", r"
                The effect lasts for 8 hours.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Torch".to_string(),
        rank: -1,
        short_description: "Emits light".to_string(),
        description: r"
            \label<Torch>
            As a standard action, you can light a torch if you have flint and steel or another source of flame handy.
            When you do, it sheds \glossterm<bright illumination> in a \smallarea radius.
            A torch burns for one hour before it is destroyed.
            You can extinguish the torch to preserve its remaining usable time.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(2, "Emits light for one week", r"
                The torch burns for up to one week.
            "),
        ],
        ..alchemical_item()
    });

    tools
}

fn thrown_attacks() -> Vec<Tool> {
    let mut tools = vec![];

    // +1dr for Short range, +2dr for double defense
    tools.push(Tool {
        name: "Alchemist's Fire".to_string(),
        rank: 1,
        short_description: "Throw to deal $dr2 damage".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against anything within \shortrange.
            \hit $dr2 fire damage.
        ".to_string(),
        upgrades: vec![
            // This "should" be 2d8, but the pattern is much nicer as 2d10.
            ItemUpgrade::new(3, "Throw to deal 2d10 damage", r"
                The damage increases to 2d10.
            "),
            ItemUpgrade::new(5, "Throw to deal $dr6 damage", r"
                The damage increases to $dr6.
            "),
            ItemUpgrade::new(7, "Throw to deal $dr8 damage", r"
                The damage increases to $dr8.
            "),
        ],
        ..alchemical_item()
    });

    // +1dr for Short range, +2dr for double defense
    tools.push(Tool {
        name: "Acid Flask".to_string(),
        rank: 2,
        short_description: "Throw to deal $dr3 damage over time".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex and Fortitude against anything within \shortrange.
            \hit $dr3 acid damage immediately, and again during your next action.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(4, "Throw to deal $dr5 damage over time", r"
                The damage increases to $dr5.
            "),
            ItemUpgrade::new(6, "Throw to deal $dr7 damage over time", r"
                The damage increases to $dr7.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Firebomb".to_string(),
        rank: 2,
        short_description: "Throw to deal $dr1 damage in an area".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against everything in a \smallarea radius within \shortrange.
            Your minimum accuracy is $accuracy.
            \hit $dr1 fire damage.
            \miss Half damage.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(4, "Throw to deal $dr3 damage in an area", r"
                The minimum accuracy increases to $accuracy, and the damage increases to $dr3.
            "),
            // This area is not quite large enough, but no clear way to improve that
            ItemUpgrade::new(6, "Throw to deal $dr5 damage in an area", r"
                The minimum accuracy increases to $accuracy, and the damage increases to $dr5.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Thunderstone".to_string(),
        rank: 3,
        short_description: "Throw to deal $dr1 damage and deafen in an area".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against everything in a \smallarea radius within \shortrange.
            Your minimum accuracy is $accuracy.
            \hit $dr2 bludgeoning damage.
            Each creature that loses \glossterm<hit points> is \deafened as a \glossterm<condition>.
            \miss Half damage.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(5, "Throw to deal $dr4 damage and deafen in an area", r"
                The minimum accuracy increases to $accuracy, and the damage increases to $dr4.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Avalanchestone".to_string(),
        rank: 7,
        short_description: "Throw to deal $dr6 damage and deafen in an area".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against everything in a \smallarea radius within \shortrange.
            Your minimum accuracy is $accuracy.
            \hit $dr6 bludgeoning damage.
            Each creature that takes damage is \deafened as a \glossterm<condition>.
            \miss Half damage.
        ".to_string(),
        ..alchemical_item()
    });

    // dX-1 at Short range, effective rank 3 for double defense
    tools.push(Tool {
        name: "Snowball".to_string(),
        rank: 1,
        short_description: "Throw to deal $dr2 damage and slow".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex and Fortitude against anything within \shortrange.
            \hit $dr2 cold damage.
            If the target loses \glossterm{hit points}, it is \slowed as a \glossterm{condition}.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(3, "Throw to deal $dr4 damage and slow", r"
                The damage increases to $dr4.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Iceball".to_string(),
        rank: 5,
        short_description: "Throw to deal $dr6 damage and slow".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex and Fortitude against anything within \shortrange.
            \hit $dr6 cold damage.
            If the target takes damage, it is \slowed as a \glossterm{condition}.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(7, "Throw to deal $dr8 damage and slow", r"
                The damage increases to $dr8.
            "),
        ],
        ..alchemical_item()
    });

    // Same removal effect as Entangle
    tools.push(Tool {
        name: "Tanglefoot Bag".to_string(),
        rank: 2,
        short_description: "Slows a foe, though it is easily removable".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against one Large or smaller creature within \shortrange.
            On a hit, the target is \slowed as a \glossterm<condition>.

            This condition can be removed if the target makes a \glossterm{difficulty value} 10 Strength check as a \glossterm{movement} to break the plants.
            If the target makes this check as a standard action, it gains a +5 bonus.
            In addition, this condition is removed if the target is dealt fire damage.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(4, "Slows a foe", r"
                The condition cannot be removed with a Strength check.
                It is still removed if the target is dealt fire damage.
            "),
        ],
        ..alchemical_item()
    });

    tools
}
