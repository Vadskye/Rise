use crate::core_mechanics::HasCreatureMechanics;
use crate::core_mechanics::attributes::{self, HasAttributes};
use crate::core_mechanics::defenses::Defense;

pub fn format_creature<T: HasCreatureMechanics>(
    creature: &T,
) -> String {
    format!(
        "
            HP {hit_points}, DR {damage_resistance}
            AD {armor}, Fort {fortitude}, Ref {reflex}, Ment {mental}
            {attacks}
            Attr: {attributes}
        ",
        attacks = creature.calc_all_attacks()
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
    return attributes::Attribute::all()
        .iter()
        .map(|attribute| {
            let base = creature.get_base_attribute(attribute);
            if base > 0 {
                return format!(
                    "{} {} ({})",
                    attribute.shorthand_name(),
                    creature.calc_total_attribute(attribute),
                    base
                );
            } else {
                return format!("{} {}", attribute.shorthand_name(), base);
            }
        })
        .collect::<Vec<String>>();
}
