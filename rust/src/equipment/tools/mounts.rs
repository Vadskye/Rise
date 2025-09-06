use crate::equipment::{Tool, ToolCategory};

// How many details should creatures provide for their statistics? Currently just HP and DR.
// TODO: define pony statistics
pub fn mounts() -> Vec<Tool> {
    let mut mounts = vec![];

    fn mount() -> Tool {
        return Tool {
            category: ToolCategory::Mount,
            ..Default::default()
        };
    }

    mounts.push(Tool {
        name: "Riding Dog".to_string(),
        rank: 1,
        short_description: "Medium dog trained for battle or riding".to_string(),
        description: String::from(r"
            This is a Medium dog that knows the Guard and Heel tricks (see \pcref<Creature Handling>).
            It is trained to be effective in battle, and is a suitable mount for creatures with the \textit<short stature> ability, such as kobolds and halflings.
        "),
        ..mount()
    });

    mounts.push(Tool {
        name: "Horse, Light".to_string(),
        rank: 1,
        short_description: "Large horse trained for riding".to_string(),
        description: String::from(r"
            This is a Large light horse intended for riding.
            It is not trained to be effectively ridden in battle.
            % TODO: calculate horse as a monster
            It has 12 hit points.
        "),
        ..mount()
    });

    mounts.push(Tool {
        name: "Horse, Draft".to_string(),
        rank: 1,
        short_description: "Large horse trained for labor".to_string(),
        description: String::from(r"
            This is a Large draft horse intended for working a farm or similar labor.
            It is not trained to be effectively ridden in battle.
            % TODO: calculate horse as a monster
            It has 16 hit points.
        "),
        ..mount()
    });

    mounts.push(Tool {
        name: "Warhorse".to_string(),
        rank: 2,
        short_description: "Large horse trained for battle".to_string(),
        description: String::from(r"
            This is a Large warhorse.
            It is trained to be effectively ridden in battle.
            % TODO: calculate horse as a monster
            It has 20 hit points.
        "),
        ..mount()
    });

    mounts.push(Tool {
        name: "Pony".to_string(),
        rank: 1,
        short_description: "Medium pony trained for riding".to_string(),
        description: String::from(r"
            This is a Medium pony.
            It is not trained to be effectively ridden in battle.
            However, it is an appropriate mount outside of battle for creatures with the \textit<short stature> ability, such as kobolds and halflings.
        "),
        ..mount()
    });

    mounts.push(Tool {
        name: "War Pony".to_string(),
        rank: 2,
        short_description: "Medium pony trained for battle".to_string(),
        description: String::from(r"
            This is a Medium horse.
            It is trained to be effectively ridden in battle, and it is an appropriate mount for creatures with the \textit<short stature> ability, such as kobolds and halflings.
        "),
        ..mount()
    });

    mounts
}
