use crate::equipment::{Implement, StandardItem};
use crate::equipment::Implement::Wand;

pub fn wands() -> Vec<Implement> {
    let mut implements = vec![];

    implements.push(Wand(StandardItem {
        name: String::from("Spell Wand, 1st"),
        rank: 1,
        short_description: String::from(r"Grants knowledge of a rank 1 spell"),
        description: String::from(r"
            This wand grants you knowledge of a single rank 1 spell that does not have the \abilitytag<Attune> or \abilitytag<Sustain> tags.
            Each wand is associated with a specific spell.
            You must have the ability to cast spells that are no more than one rank lower than the wand's rank.
            In addition, your \glossterm{magic source} must grant access to the \glossterm{mystic sphere} that the spell belongs to.
            However, you do not need to have access to the \glossterm<mystic sphere> that the spell belongs to.

            If you can cast spells of a higher rank than the wand's rank, the spell from the wand gains any appropriate rank upgrades.
            If you stop wielding this wand, deattune from it, or otherwise lose access to its magical effects, the effects of any active spells that you know because of the wand also end, regardless of their normal duration.
        "),
        ..Implement::default()
    }));

    implements.push(Wand(StandardItem {
        name: String::from("Spell Wand, 2nd"),
        rank: 2,
        short_description: String::from(r"Grants knowledge of a rank 2 spell"),
        description: String::from(r"
            This item functions like a \mitem<spell wand>, except that it grants knowledge of a single rank 2 spell.
        "),
        ..Implement::default()
    }));

    implements.push(Wand(StandardItem {
        name: String::from("Spell Wand, 3rd"),
        rank: 3,
        short_description: String::from(r"Grants knowledge of a rank 3 spell"),
        description: String::from(r"
            This item functions like a \mitem<spell wand>, except that it grants knowledge of a single rank 3 spell.
        "),
        ..Implement::default()
    }));

    fn nth(rank: i32) -> Implement {
        Wand(StandardItem {
            name: format!("Spell Wand, {}th", rank),
            rank,
            short_description: format!("Grants knowledge of a rank {} spell", rank),
            description: format!("
                This item functions like a \\mitem<spell wand>, except that it grants knowledge of a single rank {} spell.
            ", rank),
            ..Implement::default()
        })
    }

    implements.push(nth(4));
    implements.push(nth(5));
    implements.push(nth(6));
    implements.push(nth(7));

    implements
}
