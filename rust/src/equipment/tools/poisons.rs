use crate::core_mechanics::abilities::AbilityTag;
use crate::equipment::poison::poison_description;
use crate::equipment::poison::Exposure::{Contact, Ingestion, Injury};
use crate::equipment::poison::Form::{Gas, Liquid, Powder};
use crate::equipment::{Tool, ToolCategory};

fn poison() -> Tool {
    return Tool {
        category: ToolCategory::Poison,
        tags: vec![AbilityTag::Poison],
        ..Default::default()
    };
}

// The baseline for a consumable item of rank X is a spell of rank X+2.
//
// Normally, a "this round and next round" spell at Medium range is drX-2.
// "Every poison stage" is worse than "this round and next round" because it isn't
// guaranteed to deal damage next round, but it's better because it can deal damage three times
// total instead of twice, so call it equivalent.
// Since poison deals flat damage, that translates to drX-1.
// Apply -1dr if the poison is not removed at the second escalation.
//
// Damage that only applies against injured targets is weak as a concept, and will rarely reach a
// very high escalation count, so it is not removed on second escalation like normal poison damage.
// Applying this as a separate modifier instead of increasing the effective rank of injury poisons
// means that injury-only debuffs don't get too strong.
//
// Pure debuff "debuff while poisoned" poisons are +1 rank over a regular spell.
// Although they can be removed eventually, that's generally less important than getting three
// tries to succeed from a single usage, especially on elites.
// Poisons gain +1 rank if their stage 3 escalates the debuff.
//
// A powder poison typically requires a standard action to apply to an adjacent creature.
// Its effective spell rank is X+4 for contact/ingestion, never injury (including the +2 rank
// modifier for adjacent range).
// As a reminder, that means drX+1 is the standard damage value (dr5 -> dr3 from double hit -> dr2
// from flat)
//
// A liquid contact poison typically requires a non-action to apply with a weapon.
// Its effective spell rank is X for contact, X+2 for ingestion, X+4 for injury.
// As a reminder, that means drX-1 is the standard damage value, drX for ingestion, and drX+1 for
// injury.
//
// A gas poison typically requires a standard action to apply to a Tiny radius zone within Short range.
// Its effective spell rank is X+1 for contact and ingestion (which can be blocked by holding
// breath, which is sometimes beneficial to make them asymmetric).
//
// Applying a debuff only on the third escalation is not quite as big of a penalty as injured-only,
// but it's significant. Injured is 0.4x, say that third escalation is x0.67 EA.
// It could possibly be lower, but this gives room to include damage so the poison does something
// before the third escalation debuff.
// So stunned is 2 EA or r4.
pub fn poisons() -> Vec<Tool> {
    let mut poisons = vec![];

    // Contact powder means this is effective spell rank 4
    poisons.push(Tool {
        name: "Poison, Snakeroot".to_string(),
        rank: 0,
        short_description: "Repeatedly deals $dr1l damage".to_string(),
        description: poison_description(
            Contact,
            Powder,
            r"
                The poison's accuracy is $consumableaccuracy.
                It inflicts $dr1l damage immediately and with each escalation.
                The second escalation also ends the poison.
            ",
        ),
        ..poison()
    });

    // Contact powder means this is effective spell rank 6, or 5 for a pure debuff.
    poisons.push(Tool {
        name: "Poison, Nightshade".to_string(),
        rank: 2,
        short_description: "Repeatedly deals $dr3l damage".to_string(),
        description: poison_description(
            Ingestion,
            Powder,
            r"
                The poison's accuracy is $consumableaccuracy-3.
                It inflicts $dr4l damage immediately and with each escalation.
                The second escalation also ends the poison.
            ",
        ),
        ..poison()
    });

    // Contact powder means this is effective spell rank 5
    // +4a for -1 flat dr
    poisons.push(Tool {
        name: "Poison, Wolfsbane".to_string(),
        rank: 1,
        short_description: "Repeatedly deals $dr1l damage".to_string(),
        description: poison_description(
            Contact,
            Powder,
            r"
                The poison's accuracy is $consumableaccuracy+4.
                It inflicts $dr1l damage immediately and with each escalation.
                The second escalation also ends the poison.
            ",
        ),
        ..poison()
    });

    // Contact liquid means this is effective spell rank 2.
    poisons.push(Tool {
        name: "Poison, Jellyfish Extract".to_string(),
        rank: 1,
        short_description: "Repeatedly deals $dr0l damage".to_string(),
        description: poison_description(
            Contact,
            Liquid,
            r"
                The poison's accuracy is $consumableaccuracy.
                It inflicts $dr0l damage immediately and with each escalation.
                The second escalation also ends the poison.
            ",
        ),
        ..poison()
    });

    // Ingestion liquid is drX
    poisons.push(Tool {
        name: "Poison, Baneberry".to_string(),
        rank: 1,
        short_description: "Repeatedly deals $dr1l damage".to_string(),
        description: poison_description(
            Ingestion,
            Liquid,
            r"
                The poison's accuracy is $consumableaccuracy.
                It inflicts $dr1l damage immediately and with each escalation.
                The second escalation also ends the poison.
            ",
        ),
        ..poison()
    });

    // -3a for +1dr on flat damage
    poisons.push(Tool {
        name: "Poison, Tree Frog Coating".to_string(),
        rank: 2,
        short_description: "Repeatedly deals $dr2l damage".to_string(),
        description: poison_description(
            Contact,
            Liquid,
            r"
                The poison's accuracy is $consumableaccuracy-3.
                It inflicts $dr2l damage immediately and with each escalation.
                The second escalation also ends the poison.
            ",
        ),
        ..poison()
    });

    poisons.push(Tool {
        name: "Poison, Bloodroot".to_string(),
        rank: 3,
        short_description: "Repeatedly deals $dr3l damage".to_string(),
        description: poison_description(
            Contact,
            Powder,
            r"
                The poison's accuracy is $consumableaccuracy.
                It inflicts $dr4l damage immediately and with each escalation.
                The second escalation also ends the poison.
            ",
        ),
        ..poison()
    });

    // Ingestion powder means this is effective spell rank 6
    poisons.push(Tool {
        name: "Poison, Arsenic".to_string(),
        rank: 2,
        short_description: "Repeatedly deals $dr4l damage".to_string(),
        description: poison_description(
            Ingestion,
            Powder,
            r"
                The poison's accuracy is $consumableaccuracy.
                It inflicts $dr3l damage immediately and with each escalation.
                The second escalation also ends the poison.
            ",
        ),
        ..poison()
    });

    // Contact liquid means this is effective spell rank 5
    poisons.push(Tool {
        name: "Poison, Dragon Bile".to_string(),
        rank: 4,
        short_description: "Endlessly deals $dr3l damage".to_string(),
        description: poison_description(
            Contact,
            Liquid,
            r"
                The poison's accuracy is $consumableaccuracy.
                It inflicts $dr3l damage immediately and with each escalation.
            ",
        ),
        ..poison()
    });

    poisons.push(Tool {
        name: "Poison, Mind Fog".to_string(),
        rank: 4,
        short_description: "Repeatedly deals $dr2l damage and eventually stuns".to_string(),
        description: poison_description(
            Ingestion,
            Gas,
            r"
                The poison's accuracy is $consumableaccuracy.
                It inflicts $dr2l damage immediately and with each escalation.
                The second escalation also makes the target \stunned.
            ",
        ),
        ..poison()
    });

    // -1dr for +1a, endless damage
    poisons.push(Tool {
        name: "Poison, Black Lotus".to_string(),
        rank: 6,
        short_description: "Endlessly deals $dr5l damage".to_string(),
        description: poison_description(
            Contact,
            Liquid,
            r"
                The poison's accuracy is $consumableaccuracy+1.
                It inflicts $dr5l damage per \glossterm<poison stage>.
            ",
        ),
        ..poison()
    });

    poisons.append(&mut injury_poisons());

    return poisons;
}

// These are stored in a separate function since they have different scaling.
// The baseline damage over time for a liquid injury poison would be drX+3.
// That's a bit absurd, so generally add +1 accuracy or make the poison endless.
fn injury_poisons() -> Vec<Tool> {
    let mut poisons = vec![];
    
    poisons.push(Tool {
        name: "Poison, Asp Venom".to_string(),
        rank: 1,
        short_description: "Stuns".to_string(),
        description: poison_description(
            Injury,
            Liquid,
            r"
                The poison's accuracy is $consumableaccuracy.
                A poisoned creature is \stunned while the poison lasts.
                The second escalation also inflicts $dr2l damage.
            ",
        ),
        ..poison()
    });

    poisons.push(Tool {
        name: "Poison, Giant Wasp Venom".to_string(),
        rank: 2,
        short_description: "Slows".to_string(),
        description: poison_description(
            Injury,
            Liquid,
            r"
                The poison's accuracy is $consumableaccuracy+2.
                A poisoned creature is \slowed while the poison lasts.
                The second escalation also inflicts $dr3l damage.
            ",
        ),
        ..poison()
    });

    poisons.push(Tool {
        name: "Poison, Black Adder Venom".to_string(),
        rank: 2,
        short_description: "Endlessly deals $dr3l damage".to_string(),
        description: poison_description(
            Injury,
            Liquid,
            r"
                The poison's accuracy is $consumableaccuracy.
                It inflicts $dr3l damage immediately and with each escalation.
            ",
        ),
        ..poison()
    });

    poisons.push(Tool {
        name: "Poison, Wyvern Venom".to_string(),
        rank: 3,
        short_description: "Endlessly deals $dr3l damage".to_string(),
        description: poison_description(
            Injury,
            Liquid,
            r"
                The poison's accuracy is $consumableaccuracy+4.
                It inflicts $dr3l damage immediately and with each escalation.
            ",
        ),
        ..poison()
    });

    poisons.push(Tool {
        name: "Poison, Blood Leech Venom".to_string(),
        rank: 4,
        short_description: "Endlessly deals $dr5l damage".to_string(),
        description: poison_description(
            Injury,
            Liquid,
            r"
                The poison's accuracy is $consumableaccuracy.
                It inflicts $dr5l damage immediately and with each escalation.
            ",
        ),
        ..poison()
    });

    poisons.push(Tool {
        name: "Poison, Purple Worm Venom".to_string(),
        rank: 5,
        short_description: "Endlessly deals $dr6l damage".to_string(),
        description: poison_description(
            Injury,
            Liquid,
            r"
                The poison's accuracy is $consumableaccuracy.
                It inflicts $dr6l damage immediately and with each escalation.
            ",
        ),
        ..poison()
    });

    return poisons;
}
