use crate::core_mechanics::abilities::AbilityTag;
use crate::equipment::{Tool, ToolCategory, ItemUpgrade};

fn alchemical_item() -> Tool {
    return Tool {
        category: ToolCategory::Alchemical,
        magical: false,
        ..Default::default()
    };
}

// Standard action single-use items of rank X are treated as spells of rank X+2.
pub fn alchemical_items() -> Vec<Tool> {
    let mut tools = vec![];

    tools.append(&mut thrown_attacks());

    tools.push(Tool {
        name: "Smokestick".to_string(),
        rank: 0,
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
        tags: vec![AbilityTag::Fire],
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
        tags: vec![AbilityTag::Visual],
        upgrades: vec![
            ItemUpgrade::new(2, "Emits burst of brilliant light", r"
                The light is \glossterm{brilliant illumination}, which banishes shadows completely, instead of bright illumination.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Moonrod".to_string(),
        rank: 0,
        short_description: "Emits bright illumination".to_string(),
        description: r"
            You can activate this item as a standard action.
            When you do, it creates \glossterm<bright illumination> in a 60 foot radius for 10 minutes.
        ".to_string(),
        tags: vec![AbilityTag::Visual],
        upgrades: vec![
            ItemUpgrade::new(2, "Emits bright illumination for 8 hours", r"
                The effect lasts for 8 hours.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Sunrod".to_string(),
        rank: 3,
        short_description: "Emits brilliant illumination".to_string(),
        description: r"
            You can activate this item as a standard action.
            When you do, it creates \glossterm<brilliant illumination> in a 60 foot radius for 10 minutes.
        ".to_string(),
        tags: vec![AbilityTag::Visual],
        upgrades: vec![
            ItemUpgrade::new(5, "Emits brilliant illumination for 8 hours", r"
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
            ItemUpgrade::new(1, "Emits light for one week", r"
                The torch burns for up to one week.
            "),
        ],
        ..alchemical_item()
    });

    tools
}

fn thrown_attacks() -> Vec<Tool> {
    let mut tools = vec![];

    // +1dr for Short range, -1dr for single-target Reflex attack
    tools.push(Tool {
        name: "Alchemist's Fire".to_string(),
        rank: 0,
        short_description: "Throw to deal $dr2l damage".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against something within \shortrange.
            \hit $dr2l damage.
        ".to_string(),
        tags: vec![AbilityTag::Fire],
        upgrades: vec![
            ItemUpgrade::new(2, "Throw to deal $dr4l damage", r"
                The damage increases to $dr4l.
            "),
            ItemUpgrade::new(4, "Throw to deal $dr6l damage", r"
                The damage increases to $dr6l.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Bottled Hellfire".to_string(),
        rank: 6,
        short_description: "Throw to deal $dr8l damage".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against something within \shortrange.
            \hit $dr8l damage.
        ".to_string(),
        tags: vec![AbilityTag::Fire],
        ..alchemical_item()
    });

    // +1dr for Short range, +2dr for double defense
    tools.push(Tool {
        name: "Acid Flask".to_string(),
        rank: 1,
        short_description: "Throw to deal $dr3l damage over time".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex and Fortitude against something within \shortrange.
            \hit $dr3l damage immediately, and again during your next action.
        ".to_string(),
        tags: vec![AbilityTag::Acid],
        upgrades: vec![
            ItemUpgrade::new(3, "Throw to deal $dr5l damage over time", r"
                The damage increases to $dr5l.
            "),
            ItemUpgrade::new(5, "Throw to deal $dr7l damage over time", r"
                The damage increases to $dr7l.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Firebomb".to_string(),
        rank: 0,
        short_description: "Throw to deal $dr1l damage in an area".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against everything in a \smallarea radius within \shortrange.
            Your minimum accuracy is $consumableaccuracy.
            \hit $dr1l damage.
            \miss Half damage.
        ".to_string(),
        tags: vec![AbilityTag::Fire],
        upgrades: vec![
            ItemUpgrade::new(2, "Throw to deal $dr3l damage in an area", r"
                The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr3l.
            "),
            // This area is not quite large enough, but no easy way to improve that
            ItemUpgrade::new(4, "Throw to deal $dr5l damage in an area", r"
                The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr5l.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Mindbomb".to_string(),
        rank: 1,
        short_description: "Throw to deal $dr2l damage in an area".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Mental against all creatures in a \smallarea radius within \shortrange.
            Your minimum accuracy is $consumableaccuracy.
            \hit $dr2l \glossterm{subdual damage}.
            \miss Half damage.
        ".to_string(),
        tags: vec![AbilityTag::Compulsion],
        upgrades: vec![
            ItemUpgrade::new(3, "Throw to deal $dr3l damage in an area", r"
                The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr3l.
            "),
            // This area is not quite large enough, but no easy way to improve that
            ItemUpgrade::new(5, "Throw to deal $dr5l damage in an area", r"
                The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr5l.
            "),
        ],
        ..alchemical_item()
    });

    // drX-2 in t1 area would give stun on lose HP at effective rank 3 (rank 2 item)
    // add +1 rank for t2 area instead of t1, so rank 3 item
    tools.push(Tool {
        name: "Shockstone".to_string(),
        rank: 2,
        short_description: "Throw to deal $dr1l damage in an area".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against everything in a \smallarea radius within \shortrange.
            Your minimum accuracy is $consumableaccuracy.
            \hit $dr1l damage.
            Each creature that loses \glossterm<hit points> is \stunned as a \glossterm<condition>.
            \miss Half damage, and creatures are not stunned.
        ".to_string(),
        tags: vec![AbilityTag::Electricity],
        upgrades: vec![
            // Now drX-1 instead of drX-2, and X is 5 instead of 3
            ItemUpgrade::new(4, "Throw to deal $dr4l damage in an area", r"
                The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr4l.
            "),
            // drX-2 in t1 area would give stun on damage at effective rank 7 (rank 6 item)
            // add +1 rank for t2 area instead of t1, so rank 7 item
            ItemUpgrade::new(6, "Throw to deal $dr5l damage in an area", r"
                The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr5l.
                In addition, each creature that takes damage from the hit is stunned, even if it does not lose hit points.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Stunning Sphere".to_string(),
        rank: 3,
        short_description: "Throw to stun creatures in an area".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against everything in a \smallarea radius within \shortrange.
            Your minimum accuracy is $consumableaccuracy.
            \hit Each creature with no remaining damage resistance is \stunned as a \glossterm<condition>.
        ".to_string(),
        tags: vec![AbilityTag::Electricity],
        upgrades: vec![
            ItemUpgrade::new(6, "Throw to stun creatures in a large area", r"
                The minimum accuracy increases to $consumableaccuracy, and the area increases to a \largearea radius.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Thunderstone".to_string(),
        rank: 1,
        short_description: "Throw to deal $dr2l damage and deafen in an area".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against all creatures in a \smallarea radius within \shortrange.
            Your minimum accuracy is $consumableaccuracy.
            \hit $dr2l damage.
            Each creature that loses \glossterm<hit points> is \deafened as a \glossterm<condition>.
            \miss Half damage, and creatures are not deafened.
        ".to_string(),
        tags: vec![AbilityTag::Auditory],
        upgrades: vec![
            ItemUpgrade::new(3, "Throw to deal $dr4l damage and deafen in an area", r"
                The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr4l.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Avalanchestone".to_string(),
        rank: 5,
        short_description: "Throw to deal $dr6l damage and deafen in an area".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against everything in a \smallarea radius within \shortrange.
            Your minimum accuracy is $consumableaccuracy.
            \hit $dr6l damage.
            Each creature that takes damage is \deafened as a \glossterm<condition>.
            \miss Half damage, and creatures are not deafened.
        ".to_string(),
        tags: vec![AbilityTag::Auditory],
        ..alchemical_item()
    });

    // dX-1 at Short range
    tools.push(Tool {
        name: "Snowball".to_string(),
        rank: 1,
        short_description: "Throw to deal $dr2l damage and slow".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against something within \shortrange.
            \hit $dr2l damage.
            If the target loses \glossterm{hit points}, it becomes \slowed as a \glossterm{condition}.
        ".to_string(),
        tags: vec![AbilityTag::Cold],
        upgrades: vec![
            // dX at Short range
            ItemUpgrade::new(3, "Throw to deal $dr5l damage and slow", r"
                The damage increases to $dr5l.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Iceball".to_string(),
        rank: 5,
        short_description: "Throw to deal $dr6l damage and slow".to_string(),
        // dX - 1 at Short range
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against something within \shortrange.
            \hit $dr6l damage.
            If the target takes damage, it becomes \slowed as a \glossterm{condition}.
        ".to_string(),
        tags: vec![AbilityTag::Cold],
        ..alchemical_item()
    });

    // Same removal effect as Entangle
    tools.push(Tool {
        name: "Tanglefoot Bag".to_string(),
        rank: 1,
        short_description: "Slows a foe, though it is easily removable".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against one Large or smaller creature within \shortrange.
            On a hit, the target is \slowed as a \glossterm<condition>.

            This condition can be removed if the target makes a \glossterm{difficulty value} 8 Strength check as a \glossterm{movement} to break the entangling glue.
            If the target makes this check as a standard action, it gains a +5 bonus.
            In addition, this condition is removed if the target takes damage from a \atAcid or \atFire ability.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(3, "Slows a foe", r"
                The condition cannot be removed with a Strength check.
                It is still removed if the target takes damage from a \atAcid or \atFire ability. 
            "),
        ],
        ..alchemical_item()
    });

    tools
}
