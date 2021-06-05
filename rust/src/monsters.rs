mod animals;
pub mod challenge_rating;
pub mod creature_type;
pub mod monster_entry;
pub mod monster_group;

use crate::core_mechanics::attacks::HasAttacks;
use crate::core_mechanics::attributes::{Attribute, HasAttributes};
use crate::core_mechanics::damage_absorption::HasDamageAbsorption;
use crate::core_mechanics::defenses::{Defense, HasDefenses};
use crate::core_mechanics::resources::{self, HasResources};
use crate::core_mechanics::{attacks, creature, movement_modes, sizes, HasCreatureMechanics};
use crate::equipment::{weapons, HasEquipment};
use crate::skills::{Skill, HasSkills};
use crate::latex_formatting;
use std::collections::HashMap;
use titlecase::titlecase;

pub struct Monster {
    alignment: Option<String>,
    challenge_rating: challenge_rating::ChallengeRating,
    creature: creature::Creature,
    creature_type: creature_type::CreatureType,
    description: Option<String>,
    knowledge: Option<HashMap<i8, String>>,
    movement_modes: Vec<movement_modes::MovementMode>,
}

pub struct FullMonsterDefinition {
    alignment: &'static str,
    attributes: Vec<i8>,
    challenge_rating: challenge_rating::ChallengeRating,
    creature_type: creature_type::CreatureType,
    description: Option<&'static str>,
    knowledge: Vec<(i8, &'static str)>,
    level: i8,
    movement_modes: Option<Vec<movement_modes::MovementMode>>,
    name: &'static str,
    skill_points: Option<Vec<(Skill, i8)>>,
    size: sizes::Size,
    special_attacks: Option<Vec<attacks::Attack>>,
    weapons: Vec<weapons::Weapon>,
}

pub struct MinimalMonsterDefinition {
    attributes: Vec<i8>,
    challenge_rating: challenge_rating::ChallengeRating,
    creature_type: creature_type::CreatureType,
    level: i8,
    name: &'static str,
    size: sizes::Size,
    special_attacks: Option<Vec<attacks::Attack>>,
    weapons: Vec<weapons::Weapon>,
}

impl Monster {
    pub fn new(
        challenge_rating: challenge_rating::ChallengeRating,
        creature_type: creature_type::CreatureType,
        level: i8,
    ) -> Monster {
        return Monster {
            alignment: None,
            challenge_rating,
            creature_type,
            creature: creature::Creature::new(level),
            description: None,
            knowledge: None,
            movement_modes: vec![],
        };
    }

    pub fn minimally_defined(def: MinimalMonsterDefinition) -> Monster {
        return Self::fully_defined(FullMonsterDefinition {
            // From def
            attributes: def.attributes,
            challenge_rating: def.challenge_rating,
            creature_type: def.creature_type,
            level: def.level,
            name: def.name,
            size: def.size,
            special_attacks: def.special_attacks,
            weapons: def.weapons,
            // Default values
            alignment: "Usually true neutral",
            description: None,
            knowledge: vec![],
            movement_modes: None,
            skill_points: None,
        });
    }

    pub fn fully_defined(def: FullMonsterDefinition) -> Monster {
        let mut creature = creature::Creature::new(def.level);
        creature.set_name(def.name.to_string());
        for (i, attribute) in Attribute::all().iter().enumerate() {
            creature.set_base_attribute(attribute.clone(), def.attributes[i]);
        }
        for weapon in def.weapons {
            creature.add_weapon(weapon);
        }
        let base_knowledge_difficulty = def.level + 5;
        let mut knowledge_option = None;
        if def.knowledge.len() > 0 {
            let mut knowledge = HashMap::new();
            for (modifier, text) in def.knowledge {
                knowledge.insert(base_knowledge_difficulty + modifier, text.to_string());
            }
            knowledge_option = Some(knowledge)
        }
        creature.set_size(def.size);
        if let Some(skill_points) = def.skill_points {
            for (skill, points) in skill_points {
                creature.set_skill_points(skill, points);
            }
        }
        if let Some(special_attacks) = def.special_attacks {
            for a in special_attacks {
                creature.add_special_attack(a);
            }
        }

        return Monster {
            alignment: Some(def.alignment.to_owned()),
            challenge_rating: def.challenge_rating,
            creature_type: def.creature_type,
            creature,
            description: if let Some(d) = def.description {
                Some(d.to_string())
            } else {
                None
            },
            knowledge: knowledge_option,
            movement_modes: if let Some(m) = def.movement_modes {
                m
            } else {
                vec![movement_modes::MovementMode::Land(
                    movement_modes::SpeedCategory::Normal,
                )]
            },
        };
    }

    pub fn standard_monster(
        challenge_rating: challenge_rating::ChallengeRating,
        level: i8,
        starting_attribute: Option<i8>,
        creature_type: Option<creature_type::CreatureType>,
    ) -> Monster {
        let mut creature = creature::Creature::new(level);
        creature.add_weapon(weapons::Weapon::Slam);
        if let Some(value) = starting_attribute {
            for a in Attribute::all() {
                creature.set_base_attribute(a, value);
            }
        }
        let creature_type = if let Some(a) = creature_type {
            a
        } else {
            creature_type::CreatureType::Planeforged
        };
        return Monster {
            alignment: None,
            challenge_rating,
            creature,
            creature_type,
            description: None,
            knowledge: None,
            movement_modes: vec![movement_modes::MovementMode::Land(
                movement_modes::SpeedCategory::Normal,
            )],
        };
    }

    pub fn set_level(&mut self, level: i8) {
        self.creature.level = level;
    }
}

impl HasAttributes for Monster {
    fn get_base_attribute(&self, attribute: &Attribute) -> i8 {
        return self.creature.get_base_attribute(attribute);
    }
    fn calc_total_attribute(&self, attribute: &Attribute) -> i8 {
        return self.creature.calc_total_attribute(attribute);
    }
    fn set_base_attribute(&mut self, attribute: Attribute, value: i8) {
        self.creature.set_base_attribute(attribute, value);
    }
}

impl HasAttacks for Monster {
    fn add_special_attack(&mut self, attack: attacks::Attack) {
        self.creature.add_special_attack(attack);
    }

    fn calc_all_attacks(&self) -> Vec<attacks::Attack> {
        return self.creature.calc_all_attacks();
    }

    fn calc_accuracy(&self) -> i8 {
        return self.creature.calc_accuracy()
            + self.challenge_rating.accuracy_bonus()
            + (self.creature.level + 1) / 6;
    }

    fn calc_damage_per_round_multiplier(&self) -> f64 {
        return self.creature.calc_damage_per_round_multiplier()
            * self.challenge_rating.damage_per_round_multiplier();
    }

    fn calc_damage_increments(&self, is_strike: bool) -> i8 {
        let level_modifier = if is_strike {
            (self.creature.level - 1) / 3
        } else {
            0
        };
        // A rank 3 spell can get a +1d damage bonus just from rank upgrades.
        // This is a little overly specific, but it represents the idea that monsters are using
        // more powerful spells and maneuvers at higher levels. The numbers are a little spiky for
        // strikes, but this has to be at the same level as the strike damage upgrades - the whole
        // point is that the strike upgrades are trying to keep pace with the automatic spell rank
        // upgrades.
        let special_attack_modifier = (self.creature.level - 1) / 6;

        return self.creature.calc_damage_increments(is_strike)
            + self.challenge_rating.damage_increments()
            + level_modifier
            + special_attack_modifier;
    }

    fn calc_power(&self, is_magical: bool) -> i8 {
        let level_scaling = match self.creature.level / 3 {
            0 => 0,
            1 => 1,
            2 => 2,
            3 => 3,
            4 => 4,
            5 => 6,
            6 => 8,
            7 => 12,
            8 => 16,
            _ => panic!("Invalid level '{}'", self.creature.level),
        };
        return self.creature.calc_power(is_magical) + level_scaling;
    }
}

impl HasEquipment for Monster {
    fn add_weapon(&mut self, weapon: weapons::Weapon) {
        self.creature.add_weapon(weapon);
    }

    fn weapons(&self) -> Vec<&weapons::Weapon> {
        return self.creature.weapons();
    }
}

impl HasDamageAbsorption for Monster {
    fn calc_damage_resistance(&self) -> i32 {
        return ((self.creature.calc_damage_resistance() as f64)
            * 2.0
            * self.challenge_rating.dr_multiplier()) as i32;
    }
    fn calc_hit_points(&self) -> i32 {
        return ((self.creature.calc_hit_points() as f64)
            * 1.5
            * self.challenge_rating.hp_multiplier()) as i32;
    }
}

impl HasDefenses for Monster {
    fn calc_defense(&self, defense: &Defense) -> i8 {
        return self.creature.calc_defense(defense)
            + self.creature_type.defense_bonus(defense)
            + self.challenge_rating.defense_bonus()
            + (self.creature.level + 3) / 6;
    }
}

impl HasResources for Monster {
    fn calc_resource(&self, resource: &'static resources::Resource) -> i8 {
        return self.creature.calc_resource(resource);
    }
}

impl HasSkills for Monster {
    fn set_skill_points(&mut self, skill: Skill, value: i8) {
        return self.creature.set_skill_points(skill, value);
    }

    fn get_skill_points(&self, skill: &Skill) -> i8 {
        return self.creature.get_skill_points(skill);
    }

    fn calc_skill_modifier(&self, skill: &Skill) -> i8 {
        return self.creature.calc_skill_modifier(skill);
    }
}

// No need for explicit functions here - it's handled by the above functions
impl HasCreatureMechanics for Monster {}

// LaTeX conversion
impl Monster {
    pub fn to_section(&self, section_name: Option<&str>) -> String {
        let section_name = section_name.unwrap_or("monsubsection");
        let name = if let Some(ref n) = self.creature.name {
            titlecase(n)
        } else {
            panic!("Monster has no name")
        };
        return latex_formatting::latexify(format!(
            "
                \\begin<{section_name}><{name}><{level}>[{cr}]
                    \\monstersize{size_star}<{size} {type}>

                    {description}
                    {knowledge}

                    {content}
                \\end<{section_name}>
                \\monsterabilitiesheader<$Name>
                {abilities}
            ",
            section_name = section_name,
            size_star = if section_name == "monsubsubsection" { "*" } else { "" },
            name = name,
            level = self.creature.level,
            cr = self.challenge_rating.to_string(),
            size = self.creature.size.name(),
            type = self.creature_type.name(),
            description = self.description.as_deref().unwrap_or(""),
            knowledge = self.latex_knowledge().trim(),
            content = self.latex_content().trim(),
            abilities = self.latex_abilities().trim(), // TODO
        ))
            .replace("$name", self.creature.lowercase_name().as_deref().unwrap_or(""))
            .replace("$Name", titlecase(self.creature.name.as_deref().unwrap_or("")).as_str());
    }

    fn latex_content(&self) -> String {
        return format!(
            "
                \\begin<monsterstatistics>
                    {defensive_statistics}
                    \\pari \\textbf<Movement> {movement_modes}{movement_skills}
                    {space_and_reach}
                    \\pari \\textbf<Senses> {awareness}
                    \\rankline
                    \\pari \\textbf<Attributes> {attributes}
                    % This is sometimes useful for debugging, but isn't actually useful information in general.
                    % To the extent that raw accuracy or power is important, that should already be
                    % included in more specific attacks or abilities.
                    % \\pari \\textbf<Accuracy> {accuracy} \\monsep {power}
                    \\pari \\textbf<Alignment> {alignment}
                \\end<monsterstatistics>
            ",
            defensive_statistics = self.latex_defensive_statistics(),
            movement_skills = "", // TODO
            movement_modes = self.movement_modes.iter().map(
                |m| format!("{} {} ft.", m.name(), m.calc_speed(&self.creature.size))
            ).collect::<Vec<String>>().join("\\monsep "),
            // TODO: figure out skill training
            awareness = format!(
                "Awareness {}", 
                latex_formatting::modifier(self.creature.get_base_attribute(&Attribute::Perception))
            ),
            attributes = self.latex_attributes(),
            accuracy = latex_formatting::modifier(self.calc_accuracy()),
            power = self.latex_power(),
            alignment = latex_formatting::uppercase_first_letter(
                self.alignment.as_deref().unwrap_or("")
            ),
            space_and_reach = "", // TODO: only display for monsters with nonstandard space/reach
        );
    }

    fn latex_defensive_statistics(&self) -> String {
        return format!(
            "
                \\pari \\textbf<HP> {hp}
                    \\monsep \\textbf<DR> {dr}
                    {immunities}
                \\pari \\textbf<Defenses>
                    Armor {armor}
                    \\monsep Fort {fort}
                    \\monsep Ref {ref}
                    \\monsep Ment {ment}
            ",
            hp = self.calc_hit_points(),
            immunities = "", // TODO
            dr = self.calc_damage_resistance(),
            armor = self.calc_defense(&Defense::Armor),
            fort = self.calc_defense(&Defense::Fortitude),
            ref = self.calc_defense(&Defense::Reflex),
            ment = self.calc_defense(&Defense::Mental),
        );
    }

    fn latex_power(&self) -> String {
        let mundane_power = self.calc_power(false);
        let magical_power = self.calc_power(true);
        if mundane_power == magical_power {
            return format!("\\textbf<Power> {}", mundane_power);
        } else {
            return format!(
                "\\textbf<Mundane Power> {mundane} \\monsep \\textbf<Magical Power> {magical}",
                mundane = mundane_power,
                magical = magical_power
            );
        }
    }

    fn latex_attributes(&self) -> String {
        return Attribute::all()
            .iter()
            .map(|a| format!("{} {}", a.shorthand_name(), self.calc_total_attribute(a)))
            .collect::<Vec<String>>()
            .join(", ");
    }

    fn latex_knowledge(&self) -> String {
        if let Some(ref knowledge) = self.knowledge {
            let mut knowledge_keys = knowledge.keys().collect::<Vec<&i8>>();
            knowledge_keys.sort();
            return knowledge_keys
                .iter()
                .map(|difficulty| {
                    return format!(
                        "\\par Knowledge ({subskill}) {difficulty}: {text}",
                        subskill = self.creature_type.knowledge(), // TODO
                        difficulty = difficulty,
                        text = knowledge[difficulty],
                    );
                })
                .collect::<Vec<String>>()
                .join("\n");
        } else {
            return "".to_string();
        }
    }

    fn latex_abilities(&self) -> String {
        let mut attacks = self.calc_all_attacks();
        attacks.sort_by(|a, b| a.name.to_lowercase().cmp(&b.name.to_lowercase()));
        return attacks
                .iter()
                .map(|a| a.latex_ability_block(self))
                .collect::<Vec<String>>()
                .join("\\par ");
    }
}
