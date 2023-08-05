use crate::equipment::{Apparel, ItemUpgrade, StandardItem};
use crate::equipment::Apparel::{Blindfold, Circlet, Crown};
use crate::core_mechanics::Attribute;

pub fn head() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.append(&mut blindfolds());
    apparel.append(&mut circlets());
    apparel.append(&mut crowns());

    apparel
}

// Mental effects
// Social effects?
// Visual effects
fn circlets() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.push(Circlet(StandardItem {
        name: String::from("Blind Seer's Circlet"),
        rank: 2,
        short_description: String::from("Increases range of blindsense and blindsight"),
        description: String::from(r"
            If you have \trait<blindsense>, you increase its range by 30 feet.
            If you have \trait<blindsight>, you increase its range by 15 feet.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Increases range of blindsense and blindsight", "
                Your blindsense increases by 60 feet, and your blindsight increases by 30 feet.
            "),
            ItemUpgrade::new(6, "Increases range of blindsense and blindsight", "
                Your blindsense increases by 120 feet, and your blindsight increases by 60 feet.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Circlet(StandardItem::skill_item(
        "Ruler's Circlet",
        "Persuasion",
    )));

    apparel.push(Circlet(StandardItem::skill_item(
        "Imperious Circlet",
        "Intimidate",
    )));

    apparel.push(Circlet(StandardItem {
        name: String::from("Ocular Circlet"),
        rank: 2,
        short_description: String::from("Can allow you to see at distance"),
        description: String::from(r"
            You can activate this item as a standard action.
            When you do, a \glossterm<scrying sensor> appears floating in the air in an unoccupied square within \medrange.
            As long as you \glossterm<sustain> the effect as a standard action, you see through the sensor instead of from your body.

            While viewing through the sensor, your visual acuity is the same as your normal body,
                except that it does not share the benefits of any \magical effects that improve your vision.
            You otherwise act normally, though you may have difficulty moving or taking actions if the sensor cannot see your body or your intended targets, effectively making you \blinded.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Can allow you to quickly see at distance", r"
                You can activate the item and sustain its effect as a \glossterm{minor action}.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Circlet(StandardItem::reliable_skill_item(
        "Circlet of Reliable Observation", "Awareness, Social Insight, or Survival", "observation-based",
    )));

    apparel.push(Circlet(StandardItem::reliable_skill_item(
        "Circlet of Reliable Intuition", "Deduction, Knowledge, or Medicine", "intuition-based",
    )));

    apparel.push(Circlet(StandardItem::attribute_item(
        "Circlet of Epic Perception",
        &Attribute::Perception,
    )));

    apparel.push(Circlet(StandardItem::attribute_item(
        "Circlet of Epic Willpower",
        &Attribute::Willpower,
    )));

    apparel
}

// Aura effects
// Light effects
fn crowns() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.push(Crown(StandardItem {
        name: String::from("Radiant Crown"),
        rank: 1,
        short_description: String::from("Sheds light as a torch"),
        description: String::from(r"
            This crown sheds \glossterm{bright illumination} in a \smallarea radius.
            You can touch the crown as a \glossterm{minor action} to suppress or resume the light.
        "),
        upgrades: vec![
            ItemUpgrade::new(3, "Sheds great light", r"
                The area increases to a \largearea radius.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Crown(StandardItem {
        name: String::from("Solar Crown"),
        rank: 4,
        short_description: String::from("Sheds brilliant light"),
        description: String::from(r"
            This crown sheds \glossterm{brilliant illumination} in a \medarea radius.
            You can touch the crown as a \glossterm{minor action} to suppress or resume the light.
        "),
        upgrades: vec![
            ItemUpgrade::new(6, "Sheds brilliant light", r"
                The area increases to a \hugearea radius.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Crown(StandardItem {
        name: String::from("Crown of Flame"),
        rank: 3,
        short_description: String::from("Can deal $dr3 damage around you"),
        description: String::from(r"
            This crown constantly burns harmlessly, emitting \glossterm{bright illumination} in a \smallarea radius.
            You can touch the crown as a standard action to activate it.
            When you do, a burst of flame erupts around you.
            Make an attack vs. Reflex against everything in a \smallarea radius from you.
            Your minimum accuracy is $accuracy.
            \hit $dr3 fire damage.
            \miss \glossterm{Glancing blow}.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Can deal $dr5 damage around you", r"
                The minimum accuracy increases to $accuracy, and the damage increases to $dr5.
            "),
            ItemUpgrade::new(7, "Can deal $dr7 damage around you", r"
                The minimum accuracy increases to $accuracy, and the damage increases to $dr7.
            "),
        ],
        ..Apparel::default()
    }));

    apparel.push(Crown(StandardItem {
        name: String::from("Crown of Thunder"),
        rank: 5,
        short_description: String::from("Continously deafens nearby enemies"),
        description: String::from(r"
            The crown constantly emits a low-pitched rumbling.
            To you and your \glossterm<allies>, the sound is barely perceptible.
            However, all other creatures within a \medarea radius \glossterm<emanation> from you hear the sound as a deafening, continuous roll of thunder.
            The noise blocks out all other sounds quieter than thunder, causing them to be \deafened while they remain in the area.
        "),
        ..Apparel::default()
    }));

    apparel
}

// Vision effects?
fn blindfolds() -> Vec<Apparel> {
    let mut apparel = vec![];

    apparel.push(Blindfold(StandardItem {
        name: String::from("Blindfold of the Third Eye"),
        rank: 3,
        short_description: String::from("Grants blindsight, blindsense, and blindness"),
        description: String::from(r"
            While you wear this blindfold covering your eyes, you gain \trait<blindsight> with a 15 foot range and \trait<blindsense> with a 60 foot range.
            You are also blind, as normal for wearing a blindfold.

            You can shift this blindfold to cover or stop covering your eyes as a \glossterm<free action> that requires a \glossterm<free hand>.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Grants blindsight, blindsense, and blindness", r"
                The blindsense increases to 120 feet, and the blindsight increases to 30 feet.
            "),
            ItemUpgrade::new(7, "Grants blindsight, blindsense, and blindness", r"
                The blindsense increases to 240 feet, and the blindsight increases to 60 feet.
            "),
        ],
        ..Apparel::default()
    }));

    apparel
}
