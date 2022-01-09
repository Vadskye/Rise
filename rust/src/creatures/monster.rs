use std::cmp::max;

use crate::core_mechanics::{
    Attribute, Defense, HasAttributes, HasDamageAbsorption, HasDefenses, MovementMode,
    SpecialDefenseType, StandardPassiveAbility,
};
use crate::creatures::attacks::{HasAttacks, PowerProgression};
use crate::creatures::{Creature, CreatureCategory, HasModifiers, Modifier};
use crate::equipment::StandardWeapon;
use crate::latex_formatting;
use crate::monsters::{ChallengeRating, CreatureType, Knowledge};
use crate::skills::{HasSkills, Skill, SkillCategory};
use titlecase::titlecase;

use super::Maneuver;

pub struct Monster {
    pub alignment: Option<String>,
    pub challenge_rating: ChallengeRating,
    pub creature: Creature,
    pub creature_type: CreatureType,
    pub description: Option<String>,
    pub knowledge: Option<Knowledge>,
    pub movement_modes: Vec<MovementMode>,
}

impl Monster {
    pub fn new(
        challenge_rating: ChallengeRating,
        creature_type: CreatureType,
        level: i32,
    ) -> Monster {
        let mut creature = Creature::new(level, CreatureCategory::Monster(challenge_rating));
        // Creature type modifiers
        for defense in Defense::all() {
            creature.add_modifier(
                Modifier::Defense(defense, creature_type.defense_bonus(&defense)),
                Some(creature_type.name()),
                None,
            );
        }

        // CR modifiers
        creature.add_modifier(
            Modifier::Accuracy(challenge_rating.accuracy_bonus()),
            Some("challenge rating"),
            None,
        );
        for defense in Defense::all() {
            creature.add_modifier(
                Modifier::Defense(defense, challenge_rating.defense_bonus()),
                Some("challenge rating"),
                None,
            );
        }
        if challenge_rating == ChallengeRating::Four {
            creature
                .passive_abilities
                .push(StandardPassiveAbility::TwoActions.ability());
        } else if challenge_rating == ChallengeRating::Six {
            creature
                .passive_abilities
                .push(StandardPassiveAbility::ThreeActions.ability());
        }

        if level >= 19 {
            creature.add_modifier(
                Modifier::Accuracy(1),
                Some("challenge rating"),
                None,
            );
        }
        for defense in Defense::all() {
            creature.add_modifier(
                Modifier::Defense(defense, (level + 6) / 9),
                Some("challenge rating"),
                None,
            );
        }
        creature.add_modifier(
            Modifier::StrikeDamageDice((level - 1) / 3),
            Some("challenge rating"),
            None,
        );
        let power_scaling = PowerProgression::Medium.calc_power((level + 2) / 3);
        let power_scaling =
            ((power_scaling as f64) * challenge_rating.power_scaling_multiplier()).floor() as i32;
        if power_scaling > 0 {
            creature.add_modifier(
                Modifier::Power(power_scaling),
                Some("challenge rating"),
                None,
            );
        }

        let rank = max(0, (level + 2) / 3 + challenge_rating.rank_modifier());
        creature.add_modifier(
            Modifier::Maneuver(Maneuver::MonstrousStrike(rank)),
            Some("Basic Maneuver"),
            None,
        );

        return Monster {
            alignment: None,
            challenge_rating,
            creature_type,
            creature,
            description: None,
            knowledge: None,
            movement_modes: vec![],
        };
    }

    pub fn standard_monster(
        challenge_rating: ChallengeRating,
        level: i32,
        starting_attribute: Option<i32>,
        creature_type: Option<CreatureType>,
    ) -> Monster {
        let creature_type = if let Some(a) = creature_type {
            a
        } else {
            CreatureType::Planeforged
        };
        let mut monster = Monster::new(challenge_rating, creature_type, level);
        monster.creature.weapons.push(StandardWeapon::Slam.weapon());
        monster.creature.name = Some("Standard Monster".to_string());
        let starting_attribute = if let Some(a) = starting_attribute {
            a
        } else {
            2
        };

        for a in Attribute::all() {
            monster.creature.set_base_attribute(a, starting_attribute);
        }
        monster
            .creature
            .set_base_attribute(Attribute::Strength, challenge_rating.max_base_attribute());
        monster
            .creature
            .set_base_attribute(Attribute::Willpower, challenge_rating.max_base_attribute());

        return monster;
    }
}

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

                    \\RaggedRight
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
            knowledge = if let Some(ref k) = self.knowledge { k.to_latex(&self.creature_type, self.creature.level)} else { "".to_string() },
            content = self.latex_content().trim(),
            abilities = self.latex_abilities().trim(),
        ))
        .replace(
            "$name",
            self.creature.lowercase_name().as_deref().unwrap_or(""),
        )
        .replace(
            "$Name",
            titlecase(self.creature.name.as_deref().unwrap_or("")).as_str(),
        );
    }

    fn latex_content(&self) -> String {
        return format!(
            "
                \\begin<monsterstatistics>
                    {defensive_statistics}
                    {special_defense_modifiers}
                    {movement}
                    {space_and_reach}
                    {senses}
                    \\rankline
                    \\pari \\textbf<Attributes> {attributes}
                    % This is sometimes useful for debugging, but isn't actually useful information in general.
                    % To the extent that raw accuracy or power is important, that should already be
                    % included in more specific attacks or abilities.
                    % \\pari \\textbf<Accuracy> {accuracy} \\monsep {power}
                    \\pari \\textbf<Alignment> {alignment}
                \\end<monsterstatistics>
            ",
            special_defense_modifiers = self.latex_special_defense_modifiers(),
            defensive_statistics = self.latex_defensive_statistics(),
            movement = self.latex_movement(),
            senses = self.latex_senses(),
            attributes = self.latex_attributes(),
            accuracy = latex_formatting::modifier(self.creature.calc_accuracy()),
            power = self.latex_power(),
            alignment = latex_formatting::uppercase_first_letter(
                self.alignment.as_deref().unwrap_or("")
            ),
            space_and_reach = "", // TODO: only display for monsters with nonstandard space/reach
        );
    }

    fn latex_special_defense_modifiers(&self) -> String {
        let special_defenses = self.creature.calc_special_defenses();

        fn explain_special_defense_types(header: &str, types: Vec<SpecialDefenseType>) -> String {
            if types.len() == 0 {
                return "".to_string();
            }
            return format!(
                "\\pari \\textbf<{header}> {types}",
                header = header,
                types = latex_formatting::uppercase_first_letter(
                    types
                        .iter()
                        .map(|t| t.description())
                        .collect::<Vec<String>>()
                        .join("\\monsep")
                        .as_str()
                ),
            );
        }

        return format!(
            "
                {immune}
                {impervious}
                {vulnerable}
            ",
            immune = explain_special_defense_types("Immune", special_defenses.immune),
            impervious = explain_special_defense_types("Impervious", special_defenses.impervious),
            vulnerable = explain_special_defense_types("Vulnerable", special_defenses.vulnerable),
        );
    }

    fn latex_skill_modifiers_from_category(&self, skill_category: &SkillCategory) -> Vec<String> {
        return Skill::all_from_skill_category(skill_category)
            .iter()
            .filter(|s| self.creature.is_skill_trained(s))
            .map(|s| {
                format!(
                    "{}~{}",
                    titlecase(s.name()),
                    latex_formatting::modifier(self.creature.calc_skill_modifier(s))
                )
            })
            .collect::<Vec<String>>();
    }

    fn latex_movement(&self) -> String {
        let mut movement_components = self
            .movement_modes
            .iter()
            .map(|m| m.description(&self.creature.size))
            .collect::<Vec<String>>();
        movement_components
            .extend(self.latex_skill_modifiers_from_category(&SkillCategory::Movement));
        if movement_components.len() > 0 {
            return format!(
                "
                    \\pari \\textbf<Movement> {movement}
                ",
                movement = movement_components.join("\\monsep "),
            );
        } else {
            return "".to_string();
        }
    }

    fn latex_senses(&self) -> String {
        let senses = vec![];
        let senses = self.creature.senses.as_ref().unwrap_or(&senses);
        let mut sense_components = senses
            .iter()
            .map(|s| latex_formatting::uppercase_first_letter(&s.latex_description()))
            .collect::<Vec<String>>();
        sense_components.extend(self.latex_skill_modifiers_from_category(&SkillCategory::Senses));
        if sense_components.len() > 0 {
            return format!(
                "
                    \\pari \\textbf<Senses> {senses}
                ",
                senses = &sense_components.join("\\monsep "),
            );
        } else {
            return "".to_string();
        }
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
            hp = self.creature.calc_hit_points(),
            immunities = "", // TODO
            dr = self.creature.calc_damage_resistance(),
            armor = self.creature.calc_defense(&Defense::Armor),
            fort = self.creature.calc_defense(&Defense::Fortitude),
            ref = self.creature.calc_defense(&Defense::Reflex),
            ment = self.creature.calc_defense(&Defense::Mental),
        );
    }

    fn latex_power(&self) -> String {
        return format!("\\textbf<Power> {}", self.creature.calc_power());
    }

    fn latex_attributes(&self) -> String {
        return Attribute::all()
            .iter()
            .map(|a| {
                format!(
                    "{} {}",
                    a.shorthand_name(),
                    self.creature.get_base_attribute(a)
                )
            })
            .collect::<Vec<String>>()
            .join(", ");
    }

    // This could probably be moved to Creature instead of Monster
    fn latex_abilities(&self) -> String {
        let mut attacks = self.creature.calc_all_attacks();
        attacks.sort_by(|a, b| a.name.to_lowercase().cmp(&b.name.to_lowercase()));
        let mut ability_texts = attacks
            .iter()
            .map(|a| a.latex_ability_block(&self.creature))
            .collect::<Vec<String>>();
        let mut passive_ability_texts = self
            .creature
            .get_passive_abilities()
            .iter()
            .map(|a| a.to_latex())
            .collect::<Vec<String>>();
        passive_ability_texts.sort();
        ability_texts = [&passive_ability_texts[..], &ability_texts[..]].concat();
        return ability_texts.join("\\par ");
    }
}

#[cfg(test)]
mod tests;
