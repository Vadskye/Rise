use crate::equipment::{ItemUpgrade, Tool};

pub fn objects() -> Vec<Tool> {
    let mut objects = vec![];

    objects.append(&mut transportation());

    objects.push(Tool {
        name: String::from("Lock"),
        rank: 0,
        short_description: String::from("Devices 12 to unlock"),
        description: String::from(r"
            This is a lock.
            Opening the lock without the appropriate key requires a \glossterm<difficulty value> 12 Devices check (see \pcref<Devices>).
        "),
        upgrades: vec![
            ItemUpgrade::new(1, "Devices 15 to unlock", "
                The Devices DV increases to 15.
            "),
            ItemUpgrade::new(2, "Devices 20 to unlock", "
                The Devices DV increases to 20.
            "),
        ],
        ..Tool::permanent("metal")
    });

    objects.push(Tool {
        name: String::from("Lock, Mystic"),
        rank: 4,
        magical: true,
        short_description: String::from("Devices 12 to unlock"),
        description: String::from(r"
            This is a magical lock.
            Opening the lock without the appropriate key requires a \glossterm<difficulty value> 25 Devices check (see \pcref<Devices>).
        "),
        ..Tool::permanent("metal")
    });

    objects.push(Tool {
        name: String::from("Manacles"),
        rank: 0,
        short_description: String::from("Flexibility 12 to escape"),
        description: String::from(r"
            This is a set of manacles designed for Medium humanoid creatures.
            Escaping the manacles while they are being worn requires a \glossterm<difficulty value> 12 Flexibility check or a difficulty value 15 Strength check (see \pcref<Flexibility>).
        "),
        upgrades: vec![
            ItemUpgrade::new(1, "Flexibility 15 to escape", "
                The Devices DV increases to 15.
            "),
            ItemUpgrade::new(2, "Flexibility 20 to escape", "
                The Flexibility DV increases to 20.
            "),
        ],
        ..Tool::permanent("metal")
    });

    objects.push(Tool {
        name: String::from("Manacles, Mystic"),
        rank: 4,
        magical: true,
        short_description: String::from("Flexibility 25 to escape"),
        description: String::from(r"
            This is a set of magical manacles designed for Medium humanoid creatures.
            Escaping the manacles while they are being worn requires a \glossterm<difficulty value> 25 Flexibility check or a difficulty value 20 Strength check (see \pcref<Flexibility>).
        "),
        ..Tool::permanent("metal")
    });

    objects.push(Tool {
        name: String::from("Battering Ram"),
        rank: 0,
        short_description: String::from("Grants +3 bonus when breaking objects"),
        description: String::from("
            If you use this portable battering ram with two hands while trying to break down a door or similar object, you gain a \\plus3 bonus to your Strength check.
        "),
        ..Tool::permanent("wood")
    });

    objects.push(Tool {
        name: String::from("Outfit, Courtier's"),
        rank: 1,
        short_description: String::from("Typical attire for courtiers in noble society"),
        description: String::from("
            This outfit includes fancy, tailored clothes in whatever fashion happens to be the current style in the courts of the nobles.
            It also includes appropriate jewelry.
        "),
        ..Tool::permanent("jewelry, textiles")
    });
    objects.push(Tool {
        name: String::from("Outfit, Noble's"),
        rank: 2,
        short_description: String::from("Typical attire for nobility"),
        description: String::from("
            This set of clothes is designed specifically to be expensive and to show it.
            Precious metals and gems are worked into the clothing.
        "),
        ..Tool::permanent("jewelry, textiles")
    });
    objects.push(Tool {
        name: String::from("Outfit, Royal"),
        rank: 4,
        short_description: String::from("Typical attire for royalty"),
        description: String::from("
            Royal clothes are ostentatious, with gems, gold, silk, and fur in abundance.
        "),
        ..Tool::permanent("jewelry, textiles")
    });

    objects.push(Tool {
        name: "Belt Lantern".to_string(),
        rank: 1,
        short_description: "Emits light without being held".to_string(),
        description: r"
            This is a belt with an attached lantern.
            As a standard action, you can light the lantern if you have flint and steel or another source of flame handy.
            When you do, it sheds \glossterm<bright illumination> in a \smallarea radius.

            The lantern burns for one hour before it must be refueled with oil.
            You can extinguish the lantern to preserve its remaining oil.

            The lantern is \glossterm{loose equipment}, making it vulnerable to damage and being attacked directly.
            It has 10 hit points and no damage resistance.
            For details about repairing a damaged or broken belt lantern, see \pcref{Common Craft Tasks}.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(3, "Emits light without being held", r"
                The lantern's hit points increase to 15, and it has 5 damage resistance.
                It treats all damage as \glossterm{environmental damage} (See \pcref{Environmental Damage}).
            "),
        ],
        ..Tool::permanent("metal")
    });

    objects.push(Tool {
        name: "Bag of Shrinking".to_string(),
        rank: 1,
        short_description: "Shrinks items by one size category".to_string(),
        description: r"
            This bag appears to be a common Small cloth sack.
            However, it reduces the size of any \glossterm<unattended>, nonmagical objects placed inside of it by one size category.
            This allows it to hold items of up to Medium size as long as they can fit inside the bag's opening, which is two feet in diameter.
            This reduction does not affect the weight of those objects.

            If this bag is destroyed, the items within it return to their original size.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(3, "Shrinks items by two size categories", r"
                The bag reduces the size of contained objects by two size categories instead of one.
            "),
        ],
        ..Tool::permanent("textiles")
    });

    objects.push(Tool {
        name: "Bag of Holding".to_string(),
        rank: 4,
        short_description: "Shrinks items by one size category".to_string(),
        description: r"
            This bag appears to be a bulky Medium cloth sack.
            However, it reduces the size and weight of any \\glossterm<unattended>, nonmagical objects placed inside of it by one size category and weight category.
            This allows it to hold items of up to Large size as long as they can fit inside the bag's opening, which is five feet in diameter.

            If this bag is destroyed, the items within it return to their original size.
        ".to_string(),
        upgrades: vec![
            ItemUpgrade::new(6, "Shrinks items by two size categories", r"
                The bag reduces the size and weight of contained objects by two size and weight categories instead of one.
            "),
        ],
        ..Tool::permanent("textiles")
    });

    objects
}

fn transportation() -> Vec<Tool> {
    let mut objects = vec![];

    objects.push(Tool {
        name: String::from("Carriage"),
        rank: 2,
        short_description: String::from("Fancy carriage that carries up to four people"),
        description: String::from("
            This four-wheeled vehicle can transport as many as four people within an enclosed cab, plus two drivers.
            In general, two horses (or other beasts of burden) draw it.
            A carriage comes with the harness needed to pull it.
        "),
        ..Tool::permanent("textiles, wood")
    });

    objects.push(Tool {
        name: String::from("Rowboat"),
        rank: 1,
        short_description: String::from("Simple boat for short journeys"),
        description: String::from("
            This 8- to 12 foot long boat holds two or three Medium passengers.
            It moves about one and a half miles per hour.
            A rowboat comes with oars to row it.
        "),
        ..Tool::permanent("wood")
    });

    objects.push(Tool {
        name: String::from("Galley"),
        rank: 5,
        short_description: String::from("Massive, fast-moving boat with 200 crew"),
        description: String::from("
            This three-masted ship has seventy oars on either side and requires a total crew of 200.
            A typical galley is 130 feet long and 20 feet wide, and it can carry 150 tons of cargo or 250 soldiers.
            Some rare galleys are fitted with a ram and castles with firing platforms fore, aft, and amidships.
            This ship cannot make sea voyages and sticks to the coast. It moves about 4 miles per hour when being rowed or under sail.
        "),
        ..Tool::permanent("metal, textiles, wood")
    });

    objects.push(Tool {
        name: String::from("Keelboat"),
        rank: 3,
        short_description: String::from("Slow-moving, seaworthy ship with 15 crew"),
        description: String::from("
            This 50 to 75 foot long ship is 15 to 20 feet wide and has a few oars to supplement its single mast with a square sail. It requires a total crew of 15 and can carry 40 to 50 tons of cargo or 100 soldiers. It can make sea voyages, as well as sail down rivers (thanks to its flat bottom). It moves about 1 mile per hour.
        "),
        ..Tool::permanent("metal, textiles, wood")
    });

    objects.push(Tool {
        name: String::from("Longship"),
        rank: 4,
        short_description: String::from("Long, seaworthy ship with 50 crew"),
        description: String::from("
            This 75 foot long ship with forty oars requires a total crew of 50. It has a single mast and a square sail, and it can carry 50 tons of cargo or 120 soldiers. A longship can make sea voyages. It moves about 3 miles per hour when being rowed or under sail.
        "),
        ..Tool::permanent("metal, textiles, wood")
    });

    objects.push(Tool {
        name: String::from("Wagon"),
        rank: 1,
        short_description: String::from("Simple wagon for transporting heavy loads"),
        description: String::from("
            This is a four-wheeled, open vehicle for transporting heavy loads. In general, two horses (or other beasts of burden) draw it. A wagon comes with the harness needed to pull it.
        "),
        ..Tool::permanent("wood")
    });

    objects
}
