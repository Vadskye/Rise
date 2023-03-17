use crate::core_mechanics::attacks::{HasAttacks, PureDamage};
use crate::core_mechanics::{
    Attribute, DamageType, Defense, HasAttributes, HasDamageAbsorption, HasDefenses,
    SpecialDefenseType,
};
use crate::creatures::{Creature, CreatureCategory, HasModifiers, Modifier};
use crate::equipment::StandardWeapon;
use crate::latex_formatting;
use crate::monsters::{ChallengeRating, CreatureType, Knowledge, Role};
use crate::skills::{HasSkills, Skill, SkillCategory};
use regex::Regex;
use titlecase::titlecase;

use super::ModifierType;

pub struct Monster {
    pub alignment: Option<String>,
    pub challenge_rating: ChallengeRating,
    pub creature: Creature,
    pub creature_type: CreatureType,
    pub description: Option<String>,
    pub knowledge: Option<Knowledge>,
    pub role: Role,
}

impl Monster {
    pub fn new(
        challenge_rating: ChallengeRating,
        creature_type: CreatureType,
        role: Role,
        level: i32,
    ) -> Monster {
        let mut creature = Creature::new(level, CreatureCategory::Monster(challenge_rating));
        role.set_core_statistics(&mut creature);
        challenge_rating.add_modifiers(&mut creature);

        // Level modifiers
        let defense_modifier = if level >= 15 {
            2
        } else if level >= 3 {
            1
        } else {
            0
        };
        creature.add_modifier(
            Modifier::AllDefenses(defense_modifier),
            Some("level scaling"),
            None,
        );
        let power_modifier = if level >= 21 {
            2
        } else if level >= 9 {
            1
        } else {
            0
        };
        creature.add_modifier(
            Modifier::Power(power_modifier),
            Some("level scaling"),
            None,
        );

        return Monster {
            alignment: None,
            challenge_rating,
            creature_type,
            creature,
            description: None,
            knowledge: None,
            role,
        };
    }

    pub fn standard_monster(
        challenge_rating: ChallengeRating,
        level: i32,
        role: Option<Role>,
        starting_attribute: Option<i32>,
    ) -> Monster {
        let role = if let Some(r) = role {
            r
        } else {
            Role::Leader
        };
        let mut monster = Monster::new(challenge_rating, CreatureType::Planeforged, role, level);
        monster.creature.weapons.push(StandardWeapon::Claws.weapon());
        monster.creature.weapons.push(StandardWeapon::MultipedalBite.weapon());
        monster.creature.name = Some("Standard Monster".to_string());

        if let Some(attribute_value) = starting_attribute {
            for attribute_name in Attribute::all() {
                monster.creature.set_base_attribute(attribute_name, attribute_value);
            }
        } else {
            Role::Leader.set_standard_attributes(&mut monster.creature);
        }

        monster.creature.set_attribute_scaling(level, [Attribute::Strength, Attribute::Willpower]);

        return monster;
    }

    pub fn add_magical_attack(&mut self) {
        self.creature.add_modifier(
            Modifier::Attack(
                PureDamage {
                    damage_types: vec![DamageType::Energy],
                    defense: Defense::Armor,
                    is_magical: true,
                    is_maneuver: false,
                    name: "Generic Monster Damage".to_string(),
                    range: None,
                    rank: self.creature.rank() + self.challenge_rating.rank_modifier(),
                }
                .attack(),
            ),
            Some("Generic Monster Damage"),
            None,
        );
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
        let latex = latex_formatting::latexify(format!(
            "
                \\begin<{section_name}><{name}><{level}>{elite}
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
            elite = if matches!(self.challenge_rating, ChallengeRating::Four) { "[Elite]" } else {""},
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
        // Remove trailing spaces
        let terminal_spaces_pattern = Regex::new(r"(?m: +$)").unwrap();
        let latex = terminal_spaces_pattern.replace_all(&latex, "").to_string();
        // Condense repetitive line breaks to avoid bloating file size and make testing
        // easier.
        let empty_line_pattern = Regex::new(r"\n+").unwrap();
        return empty_line_pattern.replace_all(&latex, "\n").to_string();
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
                    {social}
                    {other_skills}
                    \\rankline
                    \\pari \\textbf<Attributes> {attributes}
                    \\pari \\textbf<Alignment> {alignment}
                \\end<monsterstatistics>
            ",
            special_defense_modifiers = self.latex_special_defense_modifiers(),
            defensive_statistics = self.latex_defensive_statistics(),
            movement = self.latex_movement(),
            senses = self.latex_senses(),
            attributes = self.latex_attributes(),
            social = self.latex_social(),
            other_skills = self.latex_other_skills(),
            alignment =
                latex_formatting::uppercase_first_letter(self.alignment.as_deref().unwrap_or("")),
            space_and_reach = "", // TODO: only display for monsters with nonstandard space/reach

                                  // This is sometimes useful for debugging, but isn't actually useful information in general.
                                  // To the extent that raw accuracy or power is important, that should already be
                                  // included in more specific attacks or abilities.
                                  // accuracy = latex_formatting::modifier(self.creature.calc_accuracy()),
                                  // power = self.latex_power(),
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
                        .join(", ")
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
        let mut skills = Skill::all_from_skill_category(skill_category)
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
        skills.sort_by(|a, b| a.to_lowercase().cmp(&b.to_lowercase()));
        return skills;
    }

    fn latex_movement(&self) -> String {
        let mut movement_components = self
            .creature
            .movement_speeds
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
            .map(|s| s.latex_description())
            .collect::<Vec<String>>();
        sense_components.extend(self.latex_skill_modifiers_from_category(&SkillCategory::Senses));
        if sense_components.len() > 0 {
            return format!(
                "
                    \\pari \\textbf<Senses> {senses}
                ",
                senses = latex_formatting::uppercase_first_letter(&sense_components.join(", ")),
            );
        } else {
            return "".to_string();
        }
    }

    fn latex_social(&self) -> String {
        let skills = self.latex_skill_modifiers_from_category(&SkillCategory::Social);
        if skills.len() > 0 {
            return format!(
                "
                    \\pari \\textbf<Social> {skills}
                ",
                skills = skills.join(", "),
            );
        } else {
            return "".to_string();
        }
    }

    fn latex_other_skills(&self) -> String {
        let skills = self.latex_skill_modifiers_from_category(&SkillCategory::Other);
        if skills.len() > 0 {
            return format!(
                "
                    \\pari \\textbf<Other skills> {skills}
                ",
                skills = skills.join(", "),
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
                \\pari \\textbf<Defenses>
                    Armor {armor}
                    \\monsep Fort {fort}
                    \\monsep Ref {ref}
                    \\monsep Ment {ment}
            ",
            hp = self.creature.calc_hit_points(),
            dr = self.creature.calc_damage_resistance(),
            armor = self.creature.calc_defense(&Defense::Armor),
            fort = self.creature.calc_defense(&Defense::Fortitude),
            ref = self.creature.calc_defense(&Defense::Reflex),
            ment = self.creature.calc_defense(&Defense::Mental),
        );
    }

    // fn latex_power(&self) -> String {
    //     return format!("\\textbf<Power> {}", self.creature.calc_power());
    // }

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

        let mut active_abilities = vec![];
        for modifier in self
            .creature
            .get_modifiers_by_type(ModifierType::ActiveAbility)
        {
            if let Modifier::ActiveAbility(a) = modifier {
                active_abilities.push(a);
            }
        }
        active_abilities.sort_by(|a, b| a.name.to_lowercase().cmp(&b.name.to_lowercase()));
        for active_ability in active_abilities {
            ability_texts.push(active_ability.clone().latex_ability_block());
        }

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
