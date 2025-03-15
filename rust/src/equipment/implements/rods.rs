use crate::core_mechanics::abilities::AbilityTag;
use crate::equipment::Implement::Rod;
use crate::equipment::{Implement, ItemUpgrade, StandardItem};

pub fn rods() -> Vec<Implement> {
    let mut implements = vec![];

    implements.push(Rod(StandardItem {
        name: String::from("Rod of Flame"),
        rank: 2,
        short_description: String::from(r"Deals $dr2l damage in a cone"),
        description: String::from(
            r"
            You can activate this rod as a standard action.
            When you do, make an attack vs. Reflex against everything within a \smallarea cone.
            Your minimum accuracy is $accuracy.
            \hit $dr2l damage.
            \miss Half damage.
        ",
        ),
        tags: vec![AbilityTag::Fire],
        upgrades: vec![ItemUpgrade::new(
            4,
            "Deals $dr4l damage in a cone",
            r"
                The minimum accuracy increases to $accuracy and the damage increases to $dr4l.
            ",
        )],
        ..Implement::default()
    }));

    implements.push(Rod(StandardItem {
        name: String::from("Rod of Dragonflame"),
        rank: 6,
        short_description: String::from(r"Deals $dr5l damage in a large cone"),
        description: String::from(
            r"
            You can activate this rod as a standard action.
            When you do, make an attack vs. Reflex against everything within a \largearea cone.
            Your minimum accuracy is $accuracy.
            \hit $dr5l damage.
            \miss Half damage.
        ",
        ),
        tags: vec![AbilityTag::Fire],
        ..Implement::default()
    }));

    implements.push(Rod(StandardItem {
        name: String::from("Rod of Translocation"),
        rank: 2,
        short_description: String::from(r"Can teleport up to 30 feet"),
        description: String::from(
            r"
            You can activate this rod as a standard action.
            When you do, you \glossterm{teleport} to an unoccupied location within \shortrange.
        ",
        ),
        upgrades: vec![
            ItemUpgrade::new(
                4,
                "Can teleport up to 60 feet",
                r"
                The range increases to \medrange.
            ",
            ),
            ItemUpgrade::new(
                6,
                "Can teleport up to 90 feet",
                r"
                The range increases to \longrange.
            ",
            ),
        ],
        ..Implement::default()
    }));

    implements.push(Rod(StandardItem {
        name: String::from("Radiant Rod"),
        rank: 2,
        short_description: String::from("Can deal $dr2l damage"),
        description: String::from(r"
            This rod sheds \glossterm{bright illumination} in a \smallarea radius.
            You can activate it as a standard action.
            When you do, it fires a ray of light at anything within \shortrange.
            Make an attack against the target's Reflex defense.
            Your minimum accuracy is $accuracy.
            Whether you hit or miss, \glossterm{bright illumination} \glossterm{briefly} fills a 30 foot radius around a 5 ft. wide straight line between you and the target.
            \hit $dr2l damage.
            If this attack beats a creature's Fortitude defense, it deals maximum damage.
        "),
        tags: vec![AbilityTag::Visual],
        upgrades: vec![
            ItemUpgrade::new(4, "Can deal $dr4l damage", r"
                The minimum accuracy increases to $accuracy, and the damage increases to $dr4l.
            "),
            ItemUpgrade::new(6, "Can deal $dr6l damage", r"
                The minimum accuracy increases to $accuracy, and the damage increases to $dr6l.
            "),
        ],
        ..Implement::default()
    }));

    implements
}
