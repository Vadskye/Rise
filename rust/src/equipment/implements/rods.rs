use crate::equipment::{Implement, ItemUpgrade, StandardItem};
use crate::equipment::Implement::Rod;

pub fn rods() -> Vec<Implement> {
    let mut implements = vec![];

    implements.push(Rod(StandardItem {
        name: String::from("Rod of Flame"),
        rank: 2,
        short_description: String::from(r"Deals $dr1 damage in a cone"),
        description: String::from(r"
            You can activate this rod as a standard action.
            When you do, make an attack vs. Reflex against everything within a \medarea cone.
            Your minimum accuracy is $accuracy.
            \hit $dr1 fire damage.
            \miss \glossterm{Glancing blow}.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Deals $dr3 damage in a cone", r"
                The minimum accuracy increases to $accuracy and the damage increases to $dr3.
            "),
        ],
        ..Implement::default()
    }));

    implements.push(Rod(StandardItem {
        name: String::from("Rod of Dragonflame"),
        rank: 6,
        short_description: String::from(r"Deals $dr5 damage in a large cone"),
        description: String::from(r"
            You can activate this rod as a standard action.
            When you do, make an attack vs. Reflex against everything within a \largearea cone.
            Your minimum accuracy is $accuracy.
            \hit $dr5 fire damage.
            \miss \glossterm{Glancing blow}.
        "),
        ..Implement::default()
    }));

    implements.push(Rod(StandardItem {
        name: String::from("Rod of Translocation"),
        rank: 2,
        short_description: String::from(r"Can teleport up to 30 feet"),
        description: String::from(r"
            You can activate this rod as a standard action.
            When you do, you \glossterm{teleport} to an unoccupied location within \shortrange.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Can teleport up to 60 feet", r"
                The range increases to \medrange.
            "),
            ItemUpgrade::new(6, "Can teleport up to 90 feet", r"
                The range increases to \longrange.
            "),
        ],
        ..Implement::default()
    }));

    implements
}
