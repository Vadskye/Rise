use super::creature::CreatureCategory;
use crate::classes::{calc_rank_abilities, Class, ClassArchetype};
use crate::core_mechanics::{Attribute, HasAttributes, HasResources, Resource};
use crate::creatures::{creature, latex, HasModifiers, Modifier};
use crate::equipment::{Armor, ArmorMaterial, ArmorUsageClass, HasArmor, HasWeapons, Weapon};

pub struct Character {
    archetypes: [ClassArchetype; 3],
    class: Class,
    pub creature: creature::Creature,
}

impl Character {
    // archetypes should be provided in the order that they should be ranked up
    pub fn new(class: Class, level: i32, archetypes: [ClassArchetype; 3]) -> Character {
        let mut creature = creature::Creature::new(level, CreatureCategory::Character);

        for rank_ability in calc_rank_abilities(level, &archetypes) {
            if let Some(rank_modifiers) = rank_ability.modifiers {
                for modifier in rank_modifiers {
                    creature.add_modifier(
                        modifier.clone(),
                        Some(rank_ability.name),
                        Some(rank_ability.rank),
                    );
                }
            }
        }

        for resource in Resource::all() {
            creature.add_modifier(
                Modifier::Resource(resource, class.resource_bonus(&resource)),
                Some(class.name()),
                None,
            );
        }

        return Character {
            archetypes,
            class,
            creature,
        };
    }

    // Currently this creates a Martial Mastery fighter
    pub fn standard_character(level: i32, use_point_buy: bool) -> Self {
        let mut character = Self::new(
            Class::Fighter,
            level,
            [
                ClassArchetype::MartialMastery,
                ClassArchetype::EquipmentTraining,
                ClassArchetype::CombatDiscipline,
            ],
        );

        character.creature.add_weapon(Weapon::Broadsword);
        character
            .creature
            .add_armor(standard_armor_by_level(level, ArmorUsageClass::Heavy));
        character.creature.add_armor(Armor::StandardShield);
        character.creature.set_name("Standard Character");

        if use_point_buy {
            character
                .creature
                .set_base_attribute(Attribute::Strength, 4);
            character
                .creature
                .set_base_attribute(Attribute::Dexterity, 0);
            character
                .creature
                .set_base_attribute(Attribute::Constitution, 2);
            character
                .creature
                .set_base_attribute(Attribute::Intelligence, 1);
            character
                .creature
                .set_base_attribute(Attribute::Perception, 2);
            character
                .creature
                .set_base_attribute(Attribute::Willpower, 0);
        }

        for modifier in calc_standard_magic_modifiers(level) {
            character.creature.add_magic_modifier(modifier);
        }

        return character;
    }

    pub fn description(&self) -> String {
        // let mut attacks = self.calc_all_attacks();
        // attacks.sort_by(|a, b| a.name.to_lowercase().cmp(&b.name.to_lowercase()));
        return format!(
            "
                {creature_latex}
                {class_name} {level}
                AP {ap}, FT {ft}, IP {ip}, SP {sp}
            ",
            creature_latex = latex::format_creature(&self.creature),
            class_name = self.class.name(),
            level = self.creature.level,
            ap = self.creature.calc_resource(&Resource::AttunementPoint),
            ft = self.creature.calc_resource(&Resource::FatigueTolerance),
            ip = self.creature.calc_resource(&Resource::InsightPoint),
            sp = self.creature.calc_resource(&Resource::TrainedSkill),
            // attacks = attacks
            //     .iter()
            //     .map(|a| a.shorthand_description(self))
            //     .collect::<Vec<String>>()
            //     .join("\n"),
        );
    }
}

fn calc_standard_magic_modifiers(level: i32) -> Vec<Modifier> {
    let mut modifiers = vec![];
    // Wealth is one item of current level, two items of one level lower, and two items of two
    // levels lower.
    // For most characters, power is most important, followed by damage resistance, and finally
    // hit points.
    // The level breakpoints for standard power and DR items are 4/10/16.
    // This ignores legacy items, but assumes that items are acquired as soon as possible. On
    // average, this should make the levels reasonably accurate.

    let mut power = 0;
    if level >= 16 {
        power = 8;
    } else if level >= 10 {
        power = 4;
    } else if level >= 4 {
        power = 2;
    }
    if power > 0 {
        modifiers.push(Modifier::MagicalPower(power));
        modifiers.push(Modifier::MundanePower(power));
    }

    let mut dr = 0;
    if level >= 17 {
        dr = 16;
    } else if level >= 11 {
        dr = 8;
    } else if level >= 5 {
        dr = 4;
    }
    if dr > 0 {
        modifiers.push(Modifier::DamageResistance(dr));
    }

    let mut hp = 0;
    if level >= 18 {
        hp = 16;
    } else if level >= 12 {
        hp = 8;
    } else if level >= 6 {
        hp = 4;
    }
    if hp > 0 {
        modifiers.push(Modifier::HitPoints(hp));
    }

    return modifiers;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_calculates_rank_abilities() {
        let mut fighter_1_abilities = calc_rank_abilities(
            1,
            &[
                ClassArchetype::MartialMastery,
                ClassArchetype::EquipmentTraining,
                ClassArchetype::CombatDiscipline,
            ],
        )
        .iter()
        .map(|a| a.name)
        .collect::<Vec<&str>>();
        fighter_1_abilities.sort();
        assert_eq!(
            vec![
                "Armor Expertise",
                "Combat Styles",
                "Martial Expertise",
                "Martial Expertise",
                "Mental Discipline",
            ],
            fighter_1_abilities,
            "Should have correct abilities for a level 1 fighter",
        );

        let mut fighter_10_abilities = calc_rank_abilities(
            10,
            &[
                ClassArchetype::MartialMastery,
                ClassArchetype::EquipmentTraining,
                ClassArchetype::CombatDiscipline,
            ],
        )
        .iter()
        .map(|a| a.name)
        .collect::<Vec<&str>>();
        fighter_10_abilities.sort();
        assert_eq!(
            vec![
                "Armor Expertise",
                "Cleansing Discipline",
                "Combat Style Rank",
                "Combat Style Rank",
                "Combat Style Rank",
                "Combat Styles",
                "Disciplined Force",
                "Enduring Discipline",
                "Equipment Efficiency",
                "Glancing Strikes",
                "Greater Armor Expertise",
                // 5 of these since there are 4 ranks in this archetype plus the rank 0
                "Martial Expertise",
                "Martial Expertise",
                "Martial Expertise",
                "Martial Expertise",
                "Martial Expertise",
                "Martial Force",
                "Martial Maneuver",
                "Mental Discipline",
                "Weapon Training"
            ],
            fighter_10_abilities,
            "Should have correct abilities for a level 10 fighter",
        );
    }
}

// Use a relatively smooth level progression for a (level - 1) item
fn standard_armor_by_level(level: i32, max_usage_class: ArmorUsageClass) -> Armor {
    match max_usage_class {
        ArmorUsageClass::Heavy => {
            if level == 21 {
                return Armor::FullPlate(Some(ArmorMaterial::AncientDragonscale(
                    "red".to_string(),
                )));
            } else if level >= 18 {
                return Armor::FullPlate(Some(ArmorMaterial::PureDeepforged));
            } else if level >= 15 {
                return Armor::FullPlate(Some(ArmorMaterial::Dragonscale("red".to_string())));
            } else if level >= 12 {
                return Armor::FullPlate(Some(ArmorMaterial::Deepforged));
            } else if level >= 9 {
                return Armor::LayeredHide(Some(ArmorMaterial::Elvenweave));
            } else if level >= 6 {
                return Armor::FullPlate(None);
            } else if level >= 3 {
                return Armor::LayeredHide(None);
            } else {
                return Armor::ScaleMail(None);
            }
        }
        ArmorUsageClass::Medium => {
            if level >= 18 {
                return Armor::Breastplate(Some(ArmorMaterial::AncientDragonscale(
                    "red".to_string(),
                )));
            } else if level >= 15 {
                return Armor::Breastplate(Some(ArmorMaterial::PureDeepforged));
            } else if level >= 12 {
                return Armor::Breastplate(Some(ArmorMaterial::Dragonscale("red".to_string())));
            } else if level >= 9 {
                return Armor::Breastplate(Some(ArmorMaterial::Deepforged));
            } else if level >= 3 {
                return Armor::Breastplate(None);
            } else {
                return Armor::ScaleMail(None);
            }
        }
        ArmorUsageClass::Light => {
            if level >= 17 {
                return Armor::ChainShirt(Some(ArmorMaterial::AncientDragonscale(
                    "red".to_string(),
                )));
            } else if level >= 14 {
                return Armor::ChainShirt(Some(ArmorMaterial::PureDeepforged));
            } else if level >= 11 {
                return Armor::ChainShirt(Some(ArmorMaterial::Dragonscale("red".to_string())));
            } else if level >= 8 {
                return Armor::ChainShirt(Some(ArmorMaterial::Deepforged));
            } else {
                return Armor::ChainShirt(None);
            }
        }
    }
}
