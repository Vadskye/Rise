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

// Normally, a "this round and next round" spell at Medium range is drX-2.
// "Every poison stage" is worse than "this round and next round" because it isn't
// guaranteed to deal damage next round, but it's better because it can deal damage three times
// total instead of twice, so call it equivalent.
//
// Pure debuff "debuff while poisoned, remove at stage 3" poisons are the same rank as a spell which inflicts that
// debuff as a condition.
// They gain +1 rank if their stage 3 instead escalates the debuff.

// A powder poison typically requires a standard action to apply to an adjacent creature.
// Its effective spell rank is (item rank)+3 for contact/ingestion, never injury
// A liquid contact poison typically requires a non-action to apply with a weapon.
// Its effective spell rank is (item rank) for contact, +3 for ingestion, +4 for injury.
// A gas poison typically requires a standard action to apply to a creature within Short range.
// Its effective spell rank is (item rank)+2 for contact, +1 for ingestion.
pub fn poisons() -> Vec<Tool> {
    let mut poisons = vec![];

    // Contact powder means this is effective spell rank 3
    poisons.push(Tool {
        name: "Poison, Nightshade".to_string(),
        rank: 0,
        short_description: "Stuns with each stage".to_string(),
        description: poison_description(
            Contact,
            Powder,
            r"
                The poison's accuracy is $accuracy.
                It inflicts $dr1l poison damage per \glossterm<poison stage>.
                Its stage 3 effect also ends the poison.
            ",
        ),
        ..poison()
    });

    // Stun per poison stage is very similar to stun as a condition. Maybe -1 rank?
    poisons.push(Tool {
        name: "Poison, Nitharit".to_string(),
        rank: 1,
        short_description: "Stuns with each stage".to_string(),
        description: poison_description(
            Contact,
            Powder,
            r"
                The poison's accuracy is $accuracy.
                Each poison stage makes the target \glossterm<briefly> \stunned.
                Its stage 3 effect also ends the poison.
            ",
        ),
        ..poison()
    });

    // Contact powder means this is effective spell rank 4
    poisons.push(Tool {
        name: "Poison, Sassone Leaf".to_string(),
        rank: 1,
        short_description: "Deals $dr2l damage per stage".to_string(),
        description: poison_description(
            Contact,
            Powder,
            r"
                The poison's accuracy is $accuracy.
                It inflicts $dr2l poison damage per \glossterm<poison stage>.
                Its stage 3 effect also ends the poison.
            ",
        ),
        ..poison()
    });

    // Contact liquid means this is effective spell rank 2.
    poisons.push(Tool {
        name: "Poison, Jellyfish Extract".to_string(),
        rank: 2,
        short_description: "Deals $dr0l damage per stage".to_string(),
        description: poison_description(
            Contact,
            Liquid,
            r"
                The poison's accuracy is $accuracy.
                It inflicts $dr0l poison damage per \glossterm<poison stage>.
                Its stage 3 effect also ends the poison.
            ",
        ),
        ..poison()
    });

    // Contact powder means this is effective spell rank 5
    // +1 rank for +1 accuracy
    poisons.push(Tool {
        name: "Poison, Bloodroot".to_string(),
        rank: 2,
        short_description: "Slows with each stage".to_string(),
        description: poison_description(
            Contact,
            Powder,
            r"
                The poison's accuracy is $accuracy+1.
                Each poison stage makes the target \glossterm<briefly> \slowed.
                Its stage 3 effect also ends the poison.
            ",
        ),
        ..poison()
    });

    // Ingestion powder means this is effective spell rank 6
    poisons.push(Tool {
        name: "Poison, Arsenic".to_string(),
        rank: 3,
        short_description: "Deals $dr4l damage per stage".to_string(),
        description: poison_description(
            Ingestion,
            Powder,
            r"
                The poison's accuracy is $accuracy.
                It inflicts $dr4l poison damage per \glossterm<poison stage>.
                Its stage 3 effect also ends the poison.
            ",
        ),
        ..poison()
    });

    // Contact liquid means this is effective spell rank 5
    poisons.push(Tool {
        name: "Poison, Dragon Bile".to_string(),
        rank: 5,
        short_description: "Deals $dr3l damage endlessly".to_string(),
        description: poison_description(
            Contact,
            Liquid,
            r"
                The poison's accuracy is $accuracy.
                It inflicts $dr3l poison damage per \glossterm<poison stage>.
            ",
        ),
        ..poison()
    });

    // Ingestion gas means this is effective spell rank 6
    poisons.push(Tool {
        name: "Poison, Insanity Mist".to_string(),
        rank: 5,
        short_description: "Stuns and eventually confuses".to_string(),
        description: poison_description(
            Ingestion,
            Gas,
            r"
                The poison's accuracy is $accuracy.
                Its stage 1 effect makes the target \stunned while the poison lasts.
                Its stage 3 effect makes the target \confused while the poison lasts.
            ",
        ),
        ..poison()
    });

    // Contact liquid means this is effective spell rank 7
    poisons.push(Tool {
        name: "Poison, Black Lotus".to_string(),
        rank: 7,
        short_description: "Deals $dr5l damage endlessly".to_string(),
        description: poison_description(
            Contact,
            Liquid,
            r"
                The poison's accuracy is $accuracy.
                It inflicts $dr5l poison damage per \glossterm<poison stage>.
            ",
        ),
        ..poison()
    });

    poisons.append(&mut injury_poisons());

    return poisons;
}

// These are stored in a separate function since they have different scaling.
// The baseline damage over time for a liquid injury poison would be drX+3.
// That's a bit absurd, so generally use $accuracy+1 and drX+2.
fn injury_poisons() -> Vec<Tool> {
    let mut poisons = vec![];
    
    // TODO: update injury liquids to match new poison balance
    poisons.push(Tool {
        name: "Poison, Asp Venom".to_string(),
        rank: 1,
        short_description: "Stuns and eventually blinds".to_string(),
        description: poison_description(
            Injury,
            Liquid,
            r"
                The poison's accuracy is $accuracy+1.
                Its stage 1 effect makes the target \stunned while the poison lasts.
                Its stage 3 effect makes the target \blinded while the poison lasts.
            ",
        ),
        ..poison()
    });

    poisons.push(Tool {
        name: "Poison, Giant Wasp Venom".to_string(),
        rank: 2,
        short_description: "Slows and eventually immobilizes".to_string(),
        description: poison_description(
            Injury,
            Liquid,
            r"
                The poison's accuracy is $accuracy+2.
                Its stage 1 effect makes the target \slowed while the poison lasts.
                Its stage 3 effect makes the target \immobilized while the poison lasts.
            ",
        ),
        ..poison()
    });

    poisons.push(Tool {
        name: "Poison, Black Adder Venom".to_string(),
        rank: 2,
        short_description: "Deals $dr4l damage endlessly".to_string(),
        description: poison_description(
            Injury,
            Liquid,
            r"
                The poison's accuracy is $accuracy+1.
                It inflicts $dr4l poison damage per \glossterm<poison stage>.
            ",
        ),
        ..poison()
    });

    poisons.push(Tool {
        name: "Poison, Wyvern Venom".to_string(),
        rank: 3,
        short_description: "Deals $dr5l damage endlessly".to_string(),
        description: poison_description(
            Injury,
            Liquid,
            r"
                The poison's accuracy is $accuracy+1.
                It inflicts $dr5l poison damage per \glossterm<poison stage>.
            ",
        ),
        ..poison()
    });

    poisons.push(Tool {
        name: "Poison, Purple Worm Venom".to_string(),
        rank: 4,
        short_description: "Deals $dr6l damage endlessly".to_string(),
        description: poison_description(
            Injury,
            Liquid,
            r"
                The poison's accuracy is $accuracy+1.
                It inflicts $dr6l poison damage per \glossterm<poison stage>.
            ",
        ),
        ..poison()
    });

    poisons.push(Tool {
        name: "Poison, Blood Leech Venom".to_string(),
        rank: 4,
        short_description: "Inflicts damage vulnerability".to_string(),
        description: poison_description(
            Injury,
            Liquid,
            r"
                The poison's accuracy is $accuracy.
                Its stage 1 effect makes the target \vulnerable to all damage while the poison lasts.
            ",
        ),
        ..poison()
    });

    poisons.push(Tool {
        name: "Poison, Cockatrice Venom".to_string(),
        rank: 5,
        short_description: "Slows and stuns, eventually petrifies".to_string(),
        description: poison_description(
            Injury,
            Liquid,
            r"
                The poison's accuracy is $accuracy+1.
                Its stage 1 effect makes the target \slowed and \stunned while the poison lasts.
                Its stage 3 effect makes the target petrified while the poison lasts.
                This makes the target \paralyzed, except that they remain standing in the form of a statue.
            ",
        ),
        ..poison()
    });

    return poisons;
}
