use crate::classes::{calc_rank_abilities, Class, ClassArchetype};
use crate::core_mechanics::{Attribute, Defense, HasAttributes, HasResources, Resource};
use crate::creatures::{creature, latex, HasModifiers, Modifier};
use crate::equipment::{Armor, ArmorMaterial, ArmorUsageClass, HasArmor, StandardWeapon, Weapon};
use titlecase::titlecase;

pub struct Character {
    // archetypes: [ClassArchetype; 3],
    pub class: Class,
    pub creature: creature::Creature,
}

impl Character {
    // archetypes should be provided in the order that they should be ranked up
    pub fn new(class: Class, level: i32, archetypes: [ClassArchetype; 3]) -> Character {
        let mut creature = creature::Creature::new(level);

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
            let bonus = class.defense_bonus(&defense);
            if bonus != 0 {
                creature.add_modifier(Modifier::Defense(defense, bonus), Some(class.name()), None);
            }
        }
        for resource in Resource::all() {
            let bonus = class.resource_bonus(&resource);
            if bonus != 0 {
                creature.add_modifier(
                    Modifier::Resource(resource, bonus),
                    Some(class.name()),
                    None,
                );
            }
        }

        Character {
            // archetypes,
            class,
            creature,
        }
    }

    // Not every individual predefined character is represented here, but it includes a good
    // variety of classes
    pub fn standard_set(level: i32) -> Vec<Character> {
        vec![
            Character::barbarian_glass(level),
            Character::barbarian_shield(level),
            Character::fighter_greatmace(level),
            Character::fighter_shield(level),
            Character::monk_kama(level),
            Character::paladin_shield(level),
            Character::ranger_longbow(level),
            Character::rogue_smallsword(level),
            Character::sorcerer_dexterity(level),
            Character::wizard_perception(level),
        ]
    }

    pub fn fighter_shield(level: i32) -> Self {
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
            .push(StandardWeapon::Broadsword.weapon());
        character
            .creature
            .add_armor(standard_body_armor_for_level(level, ArmorUsageClass::Heavy));
        character.creature.add_armor(Armor::StandardShield);
        character.creature.name = Some("Fighter Shield".to_string());

        character.creature.set_base_attributes([4, 0, 10, 0, 2, 0]);
        character
            .creature
            .set_attribute_scaling(level, vec![Attribute::Strength, Attribute::Constitution]);

        for modifier in calc_standard_magic_modifiers(level) {
            character.creature.add_magic_modifier(modifier);
        }

        character
    }

    // Only slightly different from regular fighter, but Tactician gives more accuracy
    pub fn fighter_shield_tactician(level: i32) -> Self {
        let mut character = Self::new(
            Class::Fighter,
            level,
            [
                ClassArchetype::MartialMastery,
                ClassArchetype::Tactician,
                // We make sure to use Combat Discipline here instead of Equipment Training
                // to make this overall +3 accuracy at max rank, which is convenient for the
                // accuracy golden file.
                ClassArchetype::CombatDiscipline,
            ],
        );

        character
            .creature
            .weapons
            .push(StandardWeapon::Broadsword.weapon());
        character
            .creature
            .add_armor(standard_body_armor_for_level(level, ArmorUsageClass::Heavy));
        character.creature.add_armor(Armor::StandardShield);
        character.creature.name = Some("Fighter Tactician".to_string());

        character.creature.set_base_attributes([4, 0, 2, 0, 2, 0]);
        character
            .creature
            .set_attribute_scaling(level, vec![Attribute::Strength, Attribute::Constitution]);

        for modifier in calc_standard_magic_modifiers(level) {
            character.creature.add_magic_modifier(modifier);
        }

        character
    }

    pub fn fighter_greatmace(level: i32) -> Self {
        let mut character = Self::fighter_shield(level);
        character.creature.remove_armor(Armor::StandardShield);
        // Replace existing weapons with a greatmace
        character.creature.weapons.retain(|_| false);
        character.creature.weapons.push(Weapon::greatmace());
        character.creature.set_name("Fighter Greatmace");
        character
    }

    pub fn fighter_perception_shield(level: i32) -> Self {
        let mut character = Self::fighter_shield(level);
        character.creature.set_base_attributes([2, 0, 2, 0, 4, 0]);
        character
            .creature
            .set_attribute_scaling(level, vec![Attribute::Perception, Attribute::Strength]);
        character.creature.set_name("Fighter Perception");
        character
    }

    pub fn fighter_perception_greataxe(level: i32) -> Self {
        let mut character = Self::fighter_perception_shield(level);
        character.creature.remove_armor(Armor::StandardShield);
        // Replace existing weapons with a greataxe
        character.creature.weapons.retain(|_| false);
        character
            .creature
            .weapons
            .push(StandardWeapon::Greataxe.weapon());
        character.creature.set_name("Fighter Perception Greataxe");
        character
    }

    pub fn barbarian_greatmace(level: i32) -> Self {
        let mut character = Self::new(
            Class::Barbarian,
            level,
            [
                ClassArchetype::PrimalWarrior,
                ClassArchetype::Battlerager,
                ClassArchetype::BattleforgedResilience,
            ],
        );

        character.creature.weapons.push(Weapon::greatmace());
        character.creature.add_armor(standard_body_armor_for_level(
            level,
            ArmorUsageClass::Medium,
        ));
        character.creature.name = Some("Barbarian Greatmace".to_string());

        character.creature.set_base_attributes([3, 2, 2, 0, 2, 0]);
        character
            .creature
            .set_attribute_scaling(level, vec![Attribute::Strength, Attribute::Constitution]);

        for modifier in calc_standard_magic_modifiers(level) {
            character.creature.add_magic_modifier(modifier);
        }

        character
    }

    pub fn barbarian_shield(level: i32) -> Self {
        let mut character = Self::new(
            Class::Barbarian,
            level,
            [
                ClassArchetype::PrimalWarrior,
                ClassArchetype::Totemist,
                ClassArchetype::BattleforgedResilience,
            ],
        );

        character
            .creature
            .weapons
            .push(StandardWeapon::Broadsword.weapon());
        character.creature.add_armor(standard_body_armor_for_level(
            level,
            ArmorUsageClass::Medium,
        ));
        character.creature.add_armor(Armor::StandardShield);
        character.creature.name = Some("Barbarian Shield".to_string());

        character.creature.set_base_attributes([3, 2, 2, 0, 2, 0]);
        character
            .creature
            .set_attribute_scaling(level, vec![Attribute::Strength, Attribute::Constitution]);

        for modifier in calc_standard_magic_modifiers(level) {
            character.creature.add_magic_modifier(modifier);
        }

        character
    }

    // Nearly pure glass cannon, high accuracy and damage
    pub fn barbarian_glass(level: i32) -> Self {
        let mut character = Self::new(
            Class::Barbarian,
            level,
            [
                ClassArchetype::Battlerager,
                ClassArchetype::PrimalWarrior,
                ClassArchetype::Totemist,
            ],
        );

        character.creature.weapons.push(Weapon::greatmace());
        character.creature.add_armor(standard_body_armor_for_level(
            level,
            ArmorUsageClass::Medium,
        ));
        character.creature.name = Some("Barbarian Glass".to_string());

        character.creature.set_base_attributes([4, 0, 2, 0, 2, 0]);
        character
            .creature
            .set_attribute_scaling(level, vec![Attribute::Strength, Attribute::Perception]);

        for modifier in calc_standard_magic_modifiers(level) {
            character.creature.add_magic_modifier(modifier);
        }

        character
    }

    // TODO: add dual strikes
    pub fn monk_kama(level: i32) -> Self {
        let mut character = Self::new(
            Class::Monk,
            level,
            [
                ClassArchetype::EsotericWarrior,
                ClassArchetype::PerfectedForm,
                ClassArchetype::Ki,
            ],
        );

        character.creature.weapons.push(Weapon::kama());
        // No armor; using ki barrier
        character.creature.name = Some("Monk Kama".to_string());

        // Assume we are scaling Str instead of using magical strikes, since magical strikes
        // aren't supported in the system and Str is scaled by Perfected Form anyway.
        character.creature.set_base_attributes([2, 4, 2, 0, 0, 0]);
        character
            .creature
            .set_attribute_scaling(level, vec![Attribute::Dexterity, Attribute::Strength]);

        for modifier in calc_standard_magic_modifiers(level) {
            character.creature.add_magic_modifier(modifier);
        }

        character
    }

    pub fn paladin_shield(level: i32) -> Self {
        let mut character = Self::new(
            Class::Paladin,
            level,
            [
                ClassArchetype::PaladinDivineMagic,
                ClassArchetype::ZealousWarrior,
                ClassArchetype::DivineSpellExpertise,
            ],
        );

        character
            .creature
            .weapons
            .push(StandardWeapon::Broadsword.weapon());
        character
            .creature
            .add_armor(standard_body_armor_for_level(level, ArmorUsageClass::Heavy));
        character.creature.add_armor(Armor::StandardShield);
        character.creature.name = Some("Paladin Shield".to_string());

        character.creature.set_base_attributes([4, 0, 2, 0, 0, 2]);
        character
            .creature
            .set_attribute_scaling(level, vec![Attribute::Strength, Attribute::Constitution]);

        for modifier in calc_self_attune_magic_modifiers(level) {
            character.creature.add_magic_modifier(modifier);
        }

        character
    }

    pub fn ranger_longbow(level: i32) -> Self {
        let mut character = Self::new(
            Class::Ranger,
            level,
            [
                ClassArchetype::WildernessWarrior,
                ClassArchetype::Scout,
                ClassArchetype::Huntmaster,
            ],
        );

        character.creature.weapons.push(Weapon::longbow());
        character
            .creature
            .add_armor(standard_body_armor_for_level(level, ArmorUsageClass::Light));
        character.creature.name = Some("Ranger Longbow".to_string());

        character.creature.set_base_attributes([1, 3, 2, 0, 3, 0]);
        character
            .creature
            .set_attribute_scaling(level, vec![Attribute::Dexterity, Attribute::Perception]);

        for modifier in calc_standard_magic_modifiers(level) {
            character.creature.add_magic_modifier(modifier);
        }

        character
    }

    // TODO: add dual strikes
    pub fn rogue_smallsword(level: i32) -> Self {
        let mut character = Self::new(
            Class::Rogue,
            level,
            [
                ClassArchetype::Assassin,
                ClassArchetype::CombatTrickster,
                ClassArchetype::JackOfAllTrades,
            ],
        );

        character.creature.weapons.push(Weapon::smallsword());
        character
            .creature
            .add_armor(standard_body_armor_for_level(level, ArmorUsageClass::Light));
        character.creature.name = Some("Rogue Smallsword".to_string());

        character.creature.set_base_attributes([0, 4, 0, 1, 3, 0]);
        character
            .creature
            .set_attribute_scaling(level, vec![Attribute::Dexterity, Attribute::Perception]);

        for modifier in calc_standard_magic_modifiers(level) {
            character.creature.add_magic_modifier(modifier);
        }

        character
    }

    pub fn sorcerer_dexterity(level: i32) -> Self {
        let mut character = Self::new(
            Class::Sorcerer,
            level,
            [
                ClassArchetype::SorcererArcaneMagic,
                ClassArchetype::SorcererArcaneSpellMastery,
                ClassArchetype::DraconicMagic,
            ],
        );

        character.creature.set_name("Sorcerer Dexterity");

        character.creature.set_base_attributes([0, 2, 0, 0, 2, 4]);
        character
            .creature
            .set_attribute_scaling(level, vec![Attribute::Dexterity, Attribute::Willpower]);

        for modifier in calc_self_attune_magic_modifiers(level) {
            character.creature.add_magic_modifier(modifier);
        }

        character
    }

    pub fn wizard_perception(level: i32) -> Self {
        let mut character = Self::new(
            Class::Wizard,
            level,
            [
                ClassArchetype::WizardArcaneMagic,
                ClassArchetype::WizardArcaneSpellMastery,
                ClassArchetype::SchoolSpecialist,
            ],
        );

        character.creature.set_name("Wizard Perception");

        character.creature.set_base_attributes([0, 2, 0, 0, 2, 4]);
        character
            .creature
            .set_attribute_scaling(level, vec![Attribute::Perception, Attribute::Willpower]);

        for modifier in calc_self_attune_magic_modifiers(level) {
            character.creature.add_magic_modifier(modifier);
        }

        character
    }

    pub fn description(&self) -> String {
        format!(
            "
            {class_name} {level}
            AP {ap}, FT {ft}, IP {ip}, Skills {skills}
            {creature_latex}
            ",
            creature_latex = latex::format_creature(&self.creature).trim(),
            class_name = titlecase(self.class.name()),
            level = self.creature.level,
            ap = self.creature.calc_resource(&Resource::AttunementPoint),
            ft = self.creature.calc_resource(&Resource::FatigueTolerance),
            ip = self.creature.calc_resource(&Resource::InsightPoint),
            skills = self.creature.calc_resource(&Resource::TrainedSkill),
        )
    }
}

// This is a hacky way to represent the fact that casters can attune to more powerful
// self-buffs
fn calc_self_attune_magic_modifiers(level: i32) -> Vec<Modifier> {
    calc_standard_magic_modifiers(level + 3)
}

fn calc_standard_magic_modifiers(level: i32) -> Vec<Modifier> {
    let mut modifiers = vec![];
    // In general, characters acquire one item of their appropriate rank per level, to a max of 5
    // relevant items.
    // For most characters, damage is most important, followed by DR and then hit points.
    // The level breakpoints for HP/DR items are 4/10/16.
    // This ignores legacy items, but assumes that items are acquired as soon as possible. On
    // average, this should make the levels reasonably accurate.

    // Some people get +1d earlier with the rank 3 weapons; ignore that for this purpose.
    let strike_damage = if level >= 19 {
        2
    } else if level >= 10 {
        1
    } else {
        0
    };
    if strike_damage > 0 {
        modifiers.push(Modifier::StrikeDamageDice(strike_damage));
    }

    // TODO: should any magic modifier replace the old DR modifier that used to go here? Maybe
    // vital rolls?

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

    modifiers
}

// Use a relatively smooth level progression for a rank-appropriate item
pub fn standard_body_armor_for_level(level: i32, max_usage_class: ArmorUsageClass) -> Armor {
    let magic_item_rank = (level + 2) / 3;
    match max_usage_class {
        ArmorUsageClass::Heavy => {
            if level >= 7 {
                Armor::FullPlate(Some(ArmorMaterial::Magic(magic_item_rank)))
            } else if level >= 4 {
                return Armor::HalfPlate(None);
            } else {
                return Armor::Breastplate(None);
            }
        }
        ArmorUsageClass::Medium => {
            if level >= 4 {
                Armor::Brigandine(Some(ArmorMaterial::Magic(magic_item_rank)))
            } else {
                Armor::Scale(None)
            }
        }
        ArmorUsageClass::Light => Armor::MailShirt(Some(ArmorMaterial::Magic(magic_item_rank))),
    }
}

#[cfg(test)]
mod tests;
