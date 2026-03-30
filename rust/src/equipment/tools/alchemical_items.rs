use crate::core_mechanics::abilities::AbilityTag;
use crate::equipment::{ItemUpgrade, Tool, ToolCategory};

fn alchemical_item() -> Tool {
    return Tool {
        category: ToolCategory::Alchemical,
        magical: false,
        ..Default::default()
    };
}

// Standard action single-use items of rank 0-1 are treated as spells of rank X+2.
// Standard action single-use items of ranks 2-7 are treated as spells of rank X+3.
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
        rank: 2,
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

    tools
}

fn thrown_attacks() -> Vec<Tool> {
    let mut tools = vec![];

    tools.push(Tool {
        name: "Holy Water".to_string(),
        rank: 0,
        short_description: "Throw to deal $dr3l damage to evil".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against something within \shortrange.
            \hit If the target is \creaturetype{undead} or an evil \creaturetype{soulforged}, it takes $dr2l damage.
            Some creatures have specific effects when they are hit by holy water.
        "
        .to_string(),
        upgrades: vec![
            ItemUpgrade::new(
                2,
                "Throw to deal $dr5l damage to evil",
                r"
                The damage increases to $dr5l.
            ",
            ),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Sanctified Divine Ichor".to_string(),
        rank: 4,
        short_description: "Throw to heal or deal $dr7l damage to evil".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against something within \shortrange.
            \hit If the target is \creaturetype{undead} or an evil \creaturetype{soulforged}, it takes $dr7l damage.
            Otherwise, it regains $dr7l \glossterm{hit points} and increases its \glossterm{fatigue level} by one. 
        "
        .to_string(),
        upgrades: vec![
            ItemUpgrade::new(
                6,
                "Throw to heal or deal $dr9l damage to evil",
                r"
                    The damage and healing increases to $dr9l.
                ",
            ),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Corrupted Divine Ichor".to_string(),
        rank: 4,
        short_description: "Throw to heal evil or deal $dr7l damage".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against something within \shortrange.
            \hit If the target is \creaturetype{undead} or an evil \creaturetype{soulforged}, it regains $dr7l \glossterm{hit points} and increases its \glossterm{fatigue level} by one.
            Otherwise, it takes $dr7l damage.
        "
        .to_string(),
        upgrades: vec![
            ItemUpgrade::new(
                6,
                "Throw to heal evil or deal $dr9l damage",
                r"
                    The damage and healing increases to $dr9l.
                ",
            ),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Unholy Water".to_string(),
        rank: 0,
        short_description: "Throw to deal $dr3l damage".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against something within \shortrange.
            \hit If the target is a good \creaturetype{soulforged}, it takes $dr3l damage.
            Some creatures have specific effects when they are hit by unholy water.
        "
        .to_string(),
        upgrades: vec![
            ItemUpgrade::new(
                2,
                "Throw to deal $dr5l damage",
                r"The damage increases to $dr5l.",
            ),
        ],
        ..alchemical_item()
    });

    // +1dr for Short range, -1dr for single-target Reflex attack
    tools.push(Tool {
        name: "Alchemist's Fire".to_string(),
        rank: 0,
        short_description: "Throw to deal $dr2l damage".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against something within \shortrange.
            \hit $dr2l damage.
        "
        .to_string(),
        tags: vec![AbilityTag::Fire],
        upgrades: vec![
            ItemUpgrade::new(
                2,
                "Throw to deal $dr5l damage",
                r"The damage increases to $dr5l.",
            ),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Bottled Hellfire".to_string(),
        rank: 4,
        short_description: "Throw to deal $dr5l damage over time".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against something within \shortrange.
            \hit $dr5l damage immediately, and again at the end of the target's next turn.
        "
        .to_string(),
        tags: vec![AbilityTag::Fire],
        upgrades: vec![
            ItemUpgrade::new(
                6,
                "Throw to deal $dr7l damage over time",
                r"The damage increases to $dr7l.",
            ),
        ],
        ..alchemical_item()
    });

    // +1dr for Short range, +1dr for double defense, -2dr for damage over time
    tools.push(Tool {
        name: "Acid Flask".to_string(),
        rank: 1,
        short_description: "Throw to deal $dr3l damage over time".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex and Fortitude against something within \shortrange.
            \hit $dr3l damage immediately, and again at the end of the target's next turn.
        ".to_string(),
        tags: vec![AbilityTag::Acid],
        upgrades: vec![
            ItemUpgrade::new(3, "Throw to deal $dr6l damage over time", r"
                The damage increases to $dr6l.
            "),
        ],
        ..alchemical_item()
    });

    // -1dr for tiny area. No half damage on miss because it's very strong with only -1dr for the
    // area.
    tools.push(Tool {
        name: "Precursor Bile".to_string(),
        rank: 5,
        short_description: "Throw to deal $dr7l damage over time".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex and Fortitude against everything in a \tinyarea radius within \shortrange.
            Your minimum accuracy is $consumableaccuracy.
            \hit $dr7l damage immediately, and again at the end of the target's next turn.
        ".to_string(),
        tags: vec![AbilityTag::Acid],
        upgrades: vec![
            ItemUpgrade::new(7, "Throw to deal $dr9l damage over time", r"
                The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr9l.
            "),
        ],
        ..alchemical_item()
    });

    // Rank 3 spell should deal drX-2 damage in a rank 3 area 
    tools.push(Tool {
        name: "Firebomb".to_string(),
        rank: 1,
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
            // as a rank 6 spell, a r3 area is drX-1, so it gets dr5.
            // TODO: damage jump is too high from the rank 1?
            ItemUpgrade::new(3, "Throw to deal $dr5l damage in an area", r"
                The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr5l.
            "),
        ],
        ..alchemical_item()
    });

    // As a level 8 spell, a r4 area is almost drX, so it gets dr6. Using med range makes the
    // rank 7 upgrade make more sense.
    tools.push(Tool {
        name: "Lavabomb".to_string(),
        rank: 5,
        short_description: "Throw to deal $dr7l damage in an area".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against everything in a \medarea radius within \shortrange.
            Your minimum accuracy is $consumableaccuracy.
            \hit $dr7l damage.
            \miss Half damage.
        ".to_string(),
        tags: vec![AbilityTag::Fire],
        upgrades: vec![
            ItemUpgrade::new(7, "Throw to deal $dr9l damage in an area", r"
                The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr9l.
            "),
        ],
        ..alchemical_item()
    });

    // Rank 5 spell should deal drX-2 damage in a rank 5 area.
    // We use a rank 3 area to allow the upgrade to make more sense.
    tools.push(Tool {
        name: "Mindbomb".to_string(),
        rank: 2,
        short_description: "Throw to deal $dr3l damage in an area".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Mental against all creatures in a \smallarea radius within \shortrange.
            Your minimum accuracy is $consumableaccuracy.
            \hit $dr3l \glossterm{subdual damage}.
            \miss Half damage.
        ".to_string(),
        tags: vec![AbilityTag::Compulsion],
        upgrades: vec![
            // Rank 7 spell can get a rank 3 area with drX-1 damage. 
            ItemUpgrade::new(4, "Throw to deal $dr6l damage in an area", r"
                The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr6l.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Brainfry".to_string(),
        rank: 6,
        short_description: "Throw to deal $dr8l damage to enemies in an area".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Mental against all \glossterm{enemies} in a \smallarea radius within \shortrange.
            Your minimum accuracy is $consumableaccuracy.
            \hit $dr8l \glossterm{subdual damage}.
            \miss Half damage.
        ".to_string(),
        tags: vec![AbilityTag::Compulsion],
        ..alchemical_item()
    });

    // Stun as injury condition with damage is rank 5. Rank 2 item is rank 5 spell.
    // -1dr for debuff, +1dr for short range.
    tools.push(Tool {
        name: "Shockstone".to_string(),
        rank: 2,
        short_description: "Throw to deal $dr4l damage and stun".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against something within \medrange.
            \hit $dr4l damage.
            \injury The target is \stunned as a \glossterm<condition>.
        ".to_string(),
        tags: vec![AbilityTag::Electricity],
        upgrades: vec![
            ItemUpgrade::new(4, "Throw to deal $dr6l damage and stun", r"
                The damage increases $dr6l.
            "),
        ],
        ..alchemical_item()
    });

    tools.push(Tool {
        name: "Bottled Lightning".to_string(),
        rank: 6,
        short_description: "Throw to deal $dr6l damage and stun".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against something within \medrange.
            \hit $dr4l damage.
            \injury The target is \stunned as a \glossterm<condition> and \briefly \blinded.
        ".to_string(),
        tags: vec![AbilityTag::Electricity],
        ..alchemical_item()
    });

    // Injury stun is rank 0. +1 rank for a larger area, +1 rank for +2 accuracy. 
    tools.push(Tool {
        name: "Stunning Sphere".to_string(),
        rank: 0,
        short_description: "Throw to stun injured creatures".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against all creatures in a \smallarea radius within \shortrange.
            Your minimum accuracy is $consumableaccuracy+2.
            \hit Each \glossterm{injured} creature is \stunned as a \glossterm<condition>.
        ".to_string(),
        tags: vec![AbilityTag::Electricity],
        upgrades: vec![
            // Stun is rank 9. This is limited area, so it gets away with effective rank 8.
            ItemUpgrade::new(5, "Throw to stun creatures", r"
                The minimum accuracy increases to $consumableaccuracy, and each target does not have to be injured to be stunned.
            "),
        ],
        ..alchemical_item()
    });

    // Injury deafen is rank 2. -1dr for debuff, +1dr for short range.
    tools.push(Tool {
        name: "Thunderstone".to_string(),
        rank: 1,
        short_description: "Throw to deal $dr2l damage and deafen".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against something within \shortrange.
            \hit $dr2l damage.
            \injury The target is \deafened as a \glossterm<condition>.
        ".to_string(),
        tags: vec![AbilityTag::Auditory],
        upgrades: vec![
            ItemUpgrade::new(3, "Throw to deal $dr5l damage and deafen", r"
                The damage increases to $dr5l, and each target does not have to be injured to be deafened.
            "),
        ],
        ..alchemical_item()
    });

    // Deafened as a condition is rank 5. drX-1 damage from limited area, -1dr from debuff.
    tools.push(Tool {
        name: "Avalanchestone".to_string(),
        rank: 5,
        short_description: "Throw to deal $dr6l damage and deafen in an area".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against everything in a \smallarea radius within \shortrange.
            Your minimum accuracy is $consumableaccuracy.
            \hit $dr6l damage, and the target is \deafened as a \glossterm<condition>.
            \miss Half damage, and creatures are not deafened.
        ".to_string(),
        tags: vec![AbilityTag::Auditory, AbilityTag::Earth],
        upgrades: vec![
            ItemUpgrade::new(7, "Throw to deal $dr8l damage and deafen in an area", r"
                The minimum accuracy increases to $consumableaccuracy, and the damage increases to $dr8l.
            "),
        ],
        ..alchemical_item()
    });

    // Injury slow is rank 3/4 at short range.
    tools.push(Tool {
        name: "Snowball".to_string(),
        rank: 1,
        short_description: "Throw to slow an injured creature".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against something within \shortrange.
            \hit If the target is \glossterm{injured}, it becomes \slowed as a \glossterm{condition}.
        "
        .to_string(),
        tags: vec![AbilityTag::Cold],
        upgrades: vec![
            // longer range means slow is rank 5 base. +1r for long range.
            ItemUpgrade::new(
                3,
                "Throw to slow an injured creature",
                r"
                    The range increases to \longrange.
                ",
            ),
        ],
        ..alchemical_item()
    });

    // Injury slow with damage at short range is rank 8/9. -1dr for debuff, +1dr for short range.
    tools.push(Tool {
        name: "Iceball".to_string(),
        rank: 5,
        short_description: "Throw to deal $dr8l damage and slow".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Fortitude against something within \shortrange.
            \hit $dr8l damage.
            \injury The target is \slowed as a \glossterm{condition}.
        "
        .to_string(),
        tags: vec![AbilityTag::Cold],
        upgrades: vec![
            // longer range means slow is rank 5 base.
            ItemUpgrade::new(
                7,
                "Throw to deal $dr9l damage and slow",
                r"
                    The range increases to \medrange, and the damage increases to $dr9l.
                ",
            ),
        ],
        ..alchemical_item()
    });

    // Brief short range entangle is r3. Drop by -1r for single target only.
    tools.push(Tool {
        name: "Tanglefoot Bag".to_string(),
        rank: 0,
        short_description: "Briefly slows a foe".to_string(),
        description: r"
            You can throw this item as a standard action.
            When you do, make an attack vs. Reflex against one Large or smaller creature within \shortrange.
            \hit The target is \glossterm{briefly} \slowed.
            This effect is immediately removed if the target takes damage from a \atAcid or \atFire ability.
        ".to_string(),
        upgrades: vec![
            // Brief ranged slow is r4
            ItemUpgrade::new(2, "Briefly slows in an area", r"
                The attack affects each Large or smaller creature in a \smallarea radius within \medrange. 
            "),
        ],
        ..alchemical_item()
    });

    tools
}
