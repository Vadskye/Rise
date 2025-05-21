use crate::core_mechanics::abilities::AbilityTag;
use crate::equipment::MagicWeapon::Melee;
use crate::equipment::{ItemUpgrade, MagicWeapon, StandardItem};

pub fn melee() -> Vec<MagicWeapon> {
    let mut weapons = vec![];

    weapons.push(Melee(StandardItem {
        name: String::from("Aquatic"),
        rank: 1,
        short_description: String::from("No accuracy penalty in water"),
        description: String::from(
            r"
                You do not take an accuracy penalty with attacks using this weapon while \submerged.
            ",
        ),
        tags: vec![AbilityTag::Water],
        ..MagicWeapon::default()
    }));

    weapons.push(Melee(StandardItem {
        name: String::from("Eager"),
        rank: 2,
        short_description: String::from("Can be drawn quickly, +1 accuracy when drawn"),
        description: String::from(
            r"
                You can draw this weapon as a \glossterm{free action} that does not count as an object manipulation (see \pcref{Manipulating Objects}).
                When you draw this weapon, if you did not also sheathe it this round, you gain a \plus1 accuracy bonus to strikes using it this round.
            ",
        ),
        upgrades: vec![
            ItemUpgrade::new(5, "Can be drawn quickly, +2 accuracy when drawn", r"
                The accuracy bonus increases to +2.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons.push(Melee(StandardItem {
        name: String::from("Reckless"),
        rank: 3,
        short_description: String::from(
            "Grants +1 accuracy and -1 defenses against adjacent creatures",
        ),
        description: String::from(
            r"
            You gain a +1 accuracy bonus against creatures adjacent to you.
            However, you also take a -1 penalty to all defenses against creatures adjacent to you.
        ",
        ),
        upgrades: vec![ItemUpgrade::new(
            6,
            "Grants +2 accuracy and -2 defenses against adjacent creatures",
            "The bonus and penalty both increase to +2.",
        )],
        ..MagicWeapon::default()
    }));

    // r1 area is normally drX. Balance this assuming you use it for 2 rounds, so average the
    // first and second round for effectiveness. This is roughly dr2 area in a r1 area, which is on
    // rate.
    weapons.push(Melee(StandardItem {
        name: String::from("Blade Barrage"),
        rank: 2,
        short_description: String::from(r"Can deal damage in a cone"),
        description: String::from(r"
            You can activate this weapon as a standard action.
            When you do, you make a mundane melee \glossterm<strike> using this weapon that spawns a swarm of blades.
            The strike targets all \glossterm{enemies} in a \smallarea cone from you.
            For each previous consecutive round in which you used this ability, you gain a +2 accuracy bonus with the strike, up to a maximum of +4.
            On a miss, you deal half damage.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Can deal high damage in a cone", r"
                The strike deals double damage.
            "),
            ItemUpgrade::new(7, "Can deal massive damage in a cone", r"
                The strike deals triple damage.
            "),
        ],
        tags: vec![AbilityTag::Manifestation],
        ..MagicWeapon::default()
    }));

    weapons.push(Melee(StandardItem {
        name: String::from("Iridescent"),
        rank: 1,
        short_description: String::from(r"Can dazzle"),
        description: String::from(r"
            This weapon shimmers with a chaotic pattern of colors, shedding multicolored \glossterm{bright illumination} in a \smallarea radius.
            As a standard action, you can make a mundane melee \glossterm{strike} using this weapon that accentuates its bewildering effect.
            This attack has the \atVisual tag.
            If your attack result beats the target's Reflex defense, it becomes \dazzled as a \glossterm{condition}.
        "),
        upgrades: vec![
            ItemUpgrade::new(3, "Can dazzle in an area", r"
                When you make the strike, you also make an attack vs. Reflex against all \glossterm{enemies} within a \smallarea radius of the strike's target.
                This attack has the \atVisual tag.
                Your minimum accuracy with this area attack is $accuracy.
                \hit Each target is \dazzled as a \glossterm{condition}.
            "),
        ],
        tags: vec![AbilityTag::Visual],
        ..MagicWeapon::default()
    }));

    weapons.push(Melee(StandardItem {
        name: String::from("Vorpal"),
        rank: 7,
        short_description: String::from(r"Can decapitate foes"),
        description: String::from(r"
            As a standard action, you can make a mundane melee \glossterm<strike> using this weapon that can decapitate enemies.
            If the target has no remaining \glossterm{damage resistance}, the strike deals five times normal damage.
            If the damage dealt by this strike is at least half the creature's maximum hit points, it immediately dies.
            Creatures that do not have a head are immune to this death effect.
        "),
        ..MagicWeapon::default()
    }));

    weapons.push(Melee(StandardItem {
        name: String::from("Ambushing"),
        rank: 3,
        short_description: String::from(r"Can silently teleport and strike"),
        description: String::from(r"
            You can activate this weapon as a standard action.
            When you do, you \glossterm{teleport} horizontally to a location within \shortrange.
            Then, you can make a mundane melee \glossterm{strike} at your destination.
            Unlike most teleportation effects, both your departure and arrival with this effect are silent.

            After you activate this item, you \glossterm{briefly} cannot activate it again.
        "),
        upgrades: vec![
            ItemUpgrade::new(5, "Can silently teleport and strike", r"
                The strike deals double damage against creatures that are at least \partiallyunaware.
            "),
            ItemUpgrade::new(7, "Can silently teleport and strike", r"
                The damage multiplier increases to triple damage.
            "),
        ],
        ..MagicWeapon::default()
    }));

    weapons
}
