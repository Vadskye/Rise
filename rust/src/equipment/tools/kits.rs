use crate::equipment::{Tool, ItemUpgrade};

pub fn kits() -> Vec<Tool> {
    let mut kits = vec![];

    kits.push(Tool {
        name: String::from("Artisan's Tools"),
        rank: 0,
        short_description: String::from("Required for some Craft checks"),
        description: String::from(r"
            These are Small tools that are appropriate to a particular Craft skill other than Craft (alchemy).
            It is very difficult to create items using the Craft skill without this item (see \pcref<Craft>).
        "),
        upgrades: vec![
            ItemUpgrade::new(2, "Useful for many Craft checks", "
                The tools are incredibly versatile, making them suitable for any Craft skill other than Craft (alchemy).
            "),
        ],
        ..Tool::permanent("metal")
    });

    kits.push(Tool {
        name: String::from("Alchemist's Lab"),
        rank: 2,
        short_description: String::from("Required for some Craft (alchemy) checks"),
        description: String::from(r"
            This is a Medium workstation that contains a wide variety of compounds and reagents.
            It is very difficult to create items using the Craft (alchemy) skill without this item (see \pcref<Craft>).
        "),
        ..Tool::permanent("alchemy")
    });

    kits.push(Tool {
        name: String::from("Disguise Kit"),
        rank: 1,
        short_description: String::from("Required for some Disguise checks"),
        description: String::from(r"
            This is a Small kit that contains a wide variety of fabrics, makeup, and other useful tools for disguising your appearance.
            It is very difficult to create disguises using the Disguise skill without this item (see \pcref<Disguise>).
        "),
        ..Tool::permanent("alchemy, textiles")
    });

    kits.push(Tool {
        name: String::from("Medical Kit"),
        rank: 1,
        short_description: String::from("Required for some Medicine checks"),
        description: String::from(r"
            This is a Small kit that contains a wide variety of bandages, salves, and other useful tools for treating wounds.
            It is very difficult to treat wounds using the Medicine skill without this item (see \pcref<Medicine>).
        "),
        ..Tool::permanent("textiles")
    });

    kits.push(Tool {
        name: String::from("Thieves' Tools"),
        rank: 1,
        short_description: String::from("Required for some Devices checks"),
        description: String::from(r"
            This is a Small kit that contains a wide variety of lockpicks and device-manipulation tools.
            It is very difficult to manipulate devices using the Devices skill without this item (see \pcref<Devices>).
        "),
        ..Tool::permanent("metal, textiles")
    });

    kits
}
