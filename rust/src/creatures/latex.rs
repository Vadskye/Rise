use crate::core_mechanics::attacks::HasAttacks;
use crate::core_mechanics::{Attribute, Defense, HasAttributes, HasDamageAbsorption, HasDefenses};
use crate::creatures::Creature;

pub fn format_creature(creature: &Creature) -> String {
    format!(
        "
            HP {hit_points}, DR {damage_resistance}
            AD {armor}, Fort {fortitude}, Ref {reflex}, Ment {mental}
            {attacks}
            Attr: {attributes}
        ",
        attacks = creature
            .calc_all_attacks()
            .iter()
            .map(|a| a.shorthand_description(creature))
            .collect::<Vec<String>>()
            .join("; "),
        attributes = format_creature_attributes(creature).join(", "),
        armor = creature.calc_defense(&Defense::Armor),
        fortitude = creature.calc_defense(&Defense::Fortitude),
        damage_resistance = creature.calc_damage_resistance(),
        hit_points = creature.calc_hit_points(),
        mental = creature.calc_defense(&Defense::Mental),
        reflex = creature.calc_defense(&Defense::Reflex),
    )
}

pub fn format_creature_attributes(creature: &impl HasAttributes) -> Vec<String> {
    return Attribute::all()
        .iter()
        .map(|attribute| {
            let base = creature.get_base_attribute(attribute);
            return format!("{} {}", attribute.shorthand_name(), base);
        })
        .collect::<Vec<String>>();
}
