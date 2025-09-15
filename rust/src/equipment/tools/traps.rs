use crate::core_mechanics::abilities::AbilityTag;
use crate::creatures::calculate_minimum_level;
use crate::equipment::{ItemUpgrade, Tool, ToolCategory};

pub fn traps() -> Vec<Tool> {
    let mut traps = vec![];

    fn awareness_dv(rank: i32) -> i32 {
        9 + calculate_minimum_level(rank)
    }

    fn trap(crafting: &str) -> Tool {
        return Tool {
            category: ToolCategory::Trap(String::from(crafting)),
            ..Default::default()
        };
    }

    fn ground_deployment(rank: i32) -> String {
        format!("
            You can deploy this trap on a space on the ground adjacent to you as a standard action.
            While this trap is deployed, a creature can notice it with a \\glossterm<difficulty value> {} Awareness check.
            A creature that notices the trap can avoid triggering it while moving.
            The first time something enters the trap's space without avoiding the trap, the trap activates.
        ", awareness_dv(rank))
    }

    traps.push(Tool {
        name: String::from("Foothold Trap"),
        rank: 1,
        short_description: String::from("Temporarily immobilizes"),
        description: format!("
            {}

            When the trap is activated, it makes a $accuracy \\glossterm<reactive attack> vs. Reflex against the source of that activation.
            After the trap triggers, it must be manually deployed again.
            \\hit The target is \\slowed until it breaks free of the trap.
            Breaking free of the trap requires making a DV 10 Strength or Devices check as a standard action.
        ", ground_deployment(1)),
        upgrades: vec![
            ItemUpgrade::new(3, "Temporarily immobilizes", &format!("
                The accuracy increases to $accuracy, and the Awareness DV increases to {}.
            ", awareness_dv(3))),
        ],
        ..trap("metal")
    });

    traps.push(Tool {
        name: String::from("Bear Trap"),
        rank: 2,
        short_description: String::from("Deals $dr4l damage and immobilizes"),
        description: format!("
            {}

            When the trap is activated, it makes a $accuracy \\glossterm<reactive attack> vs. Armor and Reflex against the source of that activation.
            After the trap triggers, it must be manually deployed again.
            \\hit $dr4l piercing damage.
            If the target takes damage, it is \\slowed until it breaks free of the trap.
            Breaking free of the trap requires making a DV 10 Strength or Devices check as a standard action.
        ", ground_deployment(2)),
        upgrades: vec![
            ItemUpgrade::new(4, "Deals $dr6l damage and immobilizes", &format!("
                The accuracy increases to $accuracy, the Awareness DV increases to {}, and the damage increases to $dr6l.
            ", awareness_dv(4))),
        ],
        ..trap("metal")
    });

    traps.push(Tool {
        name: String::from("Fireburst Trap"),
        rank: 2,
        short_description: String::from("Deals $dr3l damage in a small area"),
        description: format!("
            {}

            When the trap is activated, it makes a $accuracy \\glossterm<reactive attack> vs. Reflex against everything in a \\smallarea radius of it.
            After the trap triggers, it must be repaired with a DV {} Devices check before it can be deployed again.
            \\hit $dr3l damage.
        ", ground_deployment(2), awareness_dv(2)),
        tags: vec![AbilityTag::Fire],
        upgrades: vec![
            // Increase to +2dr instead of +1dr because the area size does not scale
            ItemUpgrade::new(4, "Deals $dr6l damage in a small area", &format!("
                The accuracy increases to $accuracy, the damage increases to $dr6l, and the Awareness and Devices DVs each increase to {}.
            ", awareness_dv(4))),
            ItemUpgrade::new(6, "Deals $dr8l damage in a small area", &format!("
                The accuracy increases to $accuracy, the damage increases to $dr8l, and the Awareness and Devices DVs each increase to {}.
            ", awareness_dv(6))),
        ],
        ..trap("alchemy, metal")
    });

    // TODO: Why dr1l specifically? This is priced assuming it's not consumable.
    traps.push(Tool {
        name: String::from("Caltrops"),
        rank: 2,
        short_description: String::from("Deals $dr1l damage when stepped on"),
        description: String::from(r"
            A caltrop is a four-pronged iron spike crafted so that one prong faces up no matter how the caltrop comes to rest.
            As a standard action, you can scatter caltrops on the ground in the hope that your enemies step on them or are at least forced to slow down to avoid them.
            One 2-pound bag of caltrops covers a 5-foot square.
            They can generally be noticed with a \glossterm{difficulty value} 8 Awareness check.

            Whenever a creature moves into the area, unless the creature moves at half speed to avoid the danger, the caltrops make a $accuracy \glossterm<reactive attack> vs. Armor against the creature.
            \hit $dr1l piercing damage.

            Caltrops may not be effective against creatures with an unusual anatomy.
            Multiple applications of caltrops in the same area have no additional effect.
        "),
        upgrades: vec![
            ItemUpgrade::new(4, "Deals $dr3l damage when stepped on", "
                The accuracy increases to $accuracy, and the damage increases to $dr3l.
            "),
            ItemUpgrade::new(6, "Deals $dr5l damage when stepped on", "
                The accuracy increases to $accuracy, and the damage increases to $dr5l.
            "),
        ],
        ..trap("alchemy, metal")
    });

    traps
}
