use super::creature::CreatureCategory;
use crate::classes::{calc_rank_abilities, Class, ClassArchetype};
use crate::core_mechanics::{Attribute, Defense, HasAttributes, HasResources, Resource};
use crate::creatures::{creature, latex, HasModifiers, Modifier};
use crate::equipment::{Armor, ArmorMaterial, ArmorUsageClass, HasArmor, StandardWeapon};

pub struct Character {
    // archetypes: [ClassArchetype; 3],
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

        for defense in Defense::all() {
            creature.add_modifier(
                Modifier::Defense(defense, class.defense_bonus(&defense)),
                Some(class.name()),
                None,
            );
        }
        for resource in Resource::all() {
            creature.add_modifier(
                Modifier::Resource(resource, class.resource_bonus(&resource)),
                Some(class.name()),
                None,
            );
        }
        if class.hit_points() > 0 {
            creature.add_modifier(
                Modifier::HitPointsFromLevel(class.hit_points()),
                Some(class.name()),
                None,
            );
        }

        return Character {
            // archetypes,
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

        character
            .creature
            .weapons
            .push(StandardWeapon::Battleaxe.weapon());
        character
            .creature
            .add_armor(standard_armor_by_level(level, ArmorUsageClass::Heavy));
        character.creature.add_armor(Armor::StandardShield);
        character.creature.name = Some("Standard Character".to_string());

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
                .set_base_attribute(Attribute::Intelligence, 0);
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

    pub fn standard_greataxe(level: i32, use_point_buy: bool) -> Self {
        let mut character = Self::standard_character(level, use_point_buy);
        character.creature.remove_armor(Armor::StandardShield);
        // Replace existing weapons with a greataxe
        character.creature.weapons.retain(|_| false);
        character.creature.weapons.push(StandardWeapon::Greataxe.weapon());
        return character;
    }

    pub fn standard_barbarian(level: i32, use_point_buy: bool) -> Self {
        let mut character = Self::new(
            Class::Barbarian,
            level,
            [
                ClassArchetype::PrimalWarrior,
                ClassArchetype::Battlerager,
                ClassArchetype::BattleforgedResilience,
            ],
        );

        character
            .creature
            .weapons
            .push(StandardWeapon::Greataxe.weapon());
        character
            .creature
            .add_armor(standard_armor_by_level(level, ArmorUsageClass::Medium));
        character.creature.name = Some("Standard Barbarian".to_string());

        if use_point_buy {
            character
                .creature
                .set_base_attribute(Attribute::Strength, 3);
            character
                .creature
                .set_base_attribute(Attribute::Dexterity, 2);
            character
                .creature
                .set_base_attribute(Attribute::Constitution, 2);
            character
                .creature
                .set_base_attribute(Attribute::Intelligence, 0);
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

    pub fn standard_sorcerer(level: i32, use_point_buy: bool) -> Self {
        let mut character = Self::new(
            Class::Sorcerer,
            level,
            [
                ClassArchetype::SorcererArcaneMagic,
                ClassArchetype::SorcererArcaneSpellMastery,
                ClassArchetype::InnateArcanist,
            ],
        );

        character.creature.name = Some("Standard Sorcerer".to_string());

        if use_point_buy {
            character
                .creature
                .set_base_attribute(Attribute::Strength, 0);
            character
                .creature
                .set_base_attribute(Attribute::Dexterity, 2);
            character
                .creature
                .set_base_attribute(Attribute::Constitution, 0);
            character
                .creature
                .set_base_attribute(Attribute::Intelligence, 0);
            character
                .creature
                .set_base_attribute(Attribute::Perception, 2);
            character
                .creature
                .set_base_attribute(Attribute::Willpower, 4);
        }

        // This is a hacky way to represent the fact that casters can attune to more powerful
        // self-buffs
        for modifier in calc_standard_magic_modifiers(level + 3) {
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
    // In general, characters acquire one item of their appropriate rank per level, to a max of 5
    // relevant items.
    // For most characters, damage is most important, followed by DR and then hit points.
    // The level breakpoints for HP/DR items are 4/10/16.
    // This ignores legacy items, but assumes that items are acquired as soon as possible. On
    // average, this should make the levels reasonably accurate.

    let strike_damage = if level >= 17 {
        2
    } else if level >= 8 {
        1
    } else {
        0
    };
    if strike_damage > 0 {
        modifiers.push(Modifier::StrikeDamageDice(strike_damage));
    }

    let dr = if level >= 22 {
        32
    } else if level >= 16 {
        16
    } else if level >= 10 {
        8
    } else if level >= 4 {
        4
    } else {
        0
    };
    if dr > 0 {
        modifiers.push(Modifier::DamageResistance(dr));
    }

    let hp = if level >= 23 {
        32
    } else if level >= 17 {
        16
    } else if level >= 11 {
        8
    } else if level >= 5 {
        4
    } else {
        0
    };
    if hp > 0 {
        modifiers.push(Modifier::HitPoints(hp));
    }

    return modifiers;
}

// Use a relatively smooth level progression for a rank-appropriate item
fn standard_armor_by_level(level: i32, max_usage_class: ArmorUsageClass) -> Armor {
    let magic_item_rank = (level + 2) / 3;
    match max_usage_class {
        ArmorUsageClass::Heavy => {
            if level >= 7 {
                return Armor::FullPlate(Some(ArmorMaterial::Magic(magic_item_rank)));
            } else if level >= 4 {
                return Armor::PlatedMail(None);
            } else {
                return Armor::ScaleMail(None);
            }
        }
        ArmorUsageClass::Medium => {
            if level >= 4 {
                return Armor::Breastplate(Some(ArmorMaterial::Magic(magic_item_rank)));
            } else {
                return Armor::ScaleMail(None);
            }
        }
        ArmorUsageClass::Light => {
            return Armor::ChainShirt(Some(ArmorMaterial::Magic(magic_item_rank)));
        }
    }
}

#[cfg(test)]
mod tests;
