use crate::core_mechanics::attacks::HasAttacks;
use crate::core_mechanics::{Attribute, Defense, HasAttributes, HasDamageAbsorption, HasDefenses};
use crate::creatures::Creature;

pub fn format_creature(creature: &Creature) -> String {
    format!(
        "
            HP {hit_points}, IP {injury_point}
            AD {armor}, Brn {brawn}, Fort {fortitude}, Ref {reflex}, Ment {mental}
            {attacks}
            Attr: {attributes}
            Power: {magical_power}✨/{mundane_power}
        ",
        attacks = creature
            .calc_all_attacks()
            .iter()
            .map(|a| a.shorthand_description(creature))
            .collect::<Vec<String>>()
            .join("; "),
        attributes = format_creature_attributes(creature).join(", "),
        armor = creature.calc_defense(&Defense::Armor),
        brawn = creature.calc_defense(&Defense::Brawn),
        fortitude = creature.calc_defense(&Defense::Fortitude),
        injury_point = creature.calc_injury_point(),
        hit_points = creature.calc_hit_points(),
        mental = creature.calc_defense(&Defense::Mental),
        reflex = creature.calc_defense(&Defense::Reflex),
        magical_power = creature.calc_power(true),
        mundane_power = creature.calc_power(false),
    )
}

pub fn format_creature_attributes(creature: &impl HasAttributes) -> Vec<String> {
    return Attribute::all()
        .iter()
        .map(|attribute| {
            let base = creature.get_base_attribute(attribute);
            format!("{} {}", attribute.shorthand_name(), base)
        })
        .collect::<Vec<String>>();
}
