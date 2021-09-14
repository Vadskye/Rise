use crate::core_mechanics::{
    Attribute, Defense, HasAttributes, HasDamageAbsorption, HasDefenses, MovementMode,
    SpecialDefenseModifier, SpecialDefenseType, SpeedCategory,
};
use crate::creatures::attacks::HasAttacks;
use crate::creatures::{Creature, CreatureCategory, HasModifiers, Modifier};
use crate::equipment::{HasWeapons, Weapon};
use crate::latex_formatting;
use crate::monsters::{ChallengeRating, CreatureType, Knowledge};
use crate::skills::{HasSkills, Skill, SkillCategory};
use titlecase::titlecase;

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

        // Level scaling modifiers
        creature.add_modifier(
            Modifier::Accuracy(level / 9),
            Some("challenge rating"),
            None,
        );
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
        let power_scaling = match level / 3 {
            0 => 0,
            1 => 1,
            2 => 2,
            3 => 3,
            4 => 4,
            5 => 6,
            6 => 8,
            7 => 12,
            8 => 16,
            _ => panic!("Invalid level '{}'", level),
        };
        if power_scaling > 0 {
            creature.add_modifier(
                Modifier::MagicalPower(power_scaling),
                Some("challenge rating"),
                None,
            );
            creature.add_modifier(
                Modifier::MundanePower(power_scaling),
                Some("challenge rating"),
                None,
            );
        }

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
        monster.creature.add_weapon(Weapon::Slam);
        monster.creature.set_name("Standard Monster");
        let starting_attribute = if let Some(a) = starting_attribute {
            a
        } else {
            2
        };

        for a in Attribute::all() {
            monster.creature.set_base_attribute(a, starting_attribute);
        }

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
        if self.creature.special_defense_modifiers.is_none() {
            return "".to_string();
        }
        let special_defense_modifiers = self.creature.special_defense_modifiers.as_ref().unwrap();
        let mut immune = vec![];
        let mut impervious = vec![];
        let mut vulnerable = vec![];
        for special_defense_modifier in special_defense_modifiers {
            match special_defense_modifier {
                SpecialDefenseModifier::Immune(t) => immune.push(t),
                SpecialDefenseModifier::Impervious(t) => impervious.push(t),
                SpecialDefenseModifier::Vulnerable(t) => vulnerable.push(t),
            }
        }

        fn explain_special_defense_types(header: &str, types: Vec<&SpecialDefenseType>) -> String {
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
            immune = explain_special_defense_types("Immune", immune),
            impervious = explain_special_defense_types("Impervious", impervious),
            vulnerable = explain_special_defense_types("Vulnerable", vulnerable),
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
        let mundane_power = self.creature.calc_power(false);
        let magical_power = self.creature.calc_power(true);
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
            .map(|a| {
                format!(
                    "{} {}",
                    a.shorthand_name(),
                    self.creature.calc_total_attribute(a)
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
        if let Some(ref passive_abilities) = self.creature.passive_abilities {
            let mut passive_ability_texts = passive_abilities
                .iter()
                .map(|a| a.to_latex())
                .collect::<Vec<String>>();
            passive_ability_texts.sort();
            ability_texts = [&passive_ability_texts[..], &ability_texts[..]].concat();
        }
        return ability_texts.join("\\par ");
    }
}
