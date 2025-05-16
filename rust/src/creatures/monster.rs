use crate::core_mechanics::attacks::{HasAttacks, PureDamageAbility};
use crate::core_mechanics::Attribute::{Intelligence, Strength, Willpower};
use crate::core_mechanics::{
    Attribute, Defense, HasAttributes, HasDamageAbsorption, HasDefenses, HasMovement,
    SpecialDefenseType,
};
use crate::creatures::{Creature, CreatureCategory, HasModifiers, Modifier};
use crate::equipment::Weapon;
use crate::latex_formatting;
use crate::monsters::{ChallengeRating, CreatureType, Knowledge, Role};
use crate::skills::{HasSkills, Skill, SkillCategory};
use regex::Regex;
use titlecase::titlecase;

pub struct Monster {
    pub alignment: Option<String>,
    pub art: bool,
    pub challenge_rating: ChallengeRating,
    pub creature: Creature,
    pub creature_type: CreatureType,
    pub description: Option<String>,
    pub knowledge: Option<Knowledge>,
    pub role: Role,
}

// Constructor and methods
impl Monster {
    pub fn new(elite: bool, creature_type: CreatureType, role: Role, level: i32) -> Monster {
        let cr = if elite {
            ChallengeRating::Four
        } else {
            ChallengeRating::One
        };
        let mut creature = Creature::new(level, CreatureCategory::Monster(cr, role));
        role.set_core_statistics(&mut creature);
        cr.add_modifiers(&mut creature);

        // Level modifiers: accuracy and defenses
        let levels_with_accuracy_bonuses = vec![7, 19];
        let mut accuracy_modifier = 0;
        for &bonus_level in levels_with_accuracy_bonuses.iter() {
            if level >= bonus_level {
                accuracy_modifier += 1;
            }
        }
        creature.add_modifier(
            Modifier::Accuracy(accuracy_modifier),
            Some("level scaling"),
            None,
        );

        let levels_with_defense_bonuses = vec![5, 11, 17];
        let mut defense_modifier = 0;
        for &bonus_level in levels_with_defense_bonuses.iter() {
            if level >= bonus_level {
                defense_modifier += 1;
            }
        }
        creature.add_modifier(
            Modifier::AllDefenses(defense_modifier),
            Some("level scaling"),
            None,
        );

        Monster {
            alignment: None,
            art: false,
            challenge_rating: cr,
            creature_type,
            creature,
            description: None,
            knowledge: None,
            role,
        }
    }

    // TODO: store `elite` instead of `challenge_rating`
    pub fn elite(&self) -> bool {
        self.challenge_rating == ChallengeRating::Four
    }

    pub fn standard_example_monster(level: i32) -> Monster {
        Self::example_monster(false, level)
    }

    pub fn elite_example_monster(level: i32) -> Monster {
        Self::example_monster(true, level)
    }

    pub fn add_magical_attack(&mut self) {
        self.creature.add_modifier(
            Modifier::Attack(
                PureDamageAbility {
                    defense: Defense::Armor,
                    is_magical: true,
                    name: "Generic Monster Damage".to_string(),
                    rank: self.creature.rank(),
                }
                .attack(),
            ),
            Some("Generic Monster Damage"),
            None,
        );
    }

    // TODO: validate that -10 int monsters have Mindless and vice versa
    pub fn validate_design(&self) {
        self.validate_active_abilities();
        self.validate_attribute_sum();
        self.validate_attribute_max();
        self.validate_elite_abilities();
        self.validate_skills();
    }

    pub fn name(&self) -> String {
        return self
            .creature
            .name
            .as_ref()
            .unwrap_or(&"ANONYMOUS".to_string())
            .to_string();
    }

    fn validate_active_abilities(&self) {
        if self.creature.active_abilities().is_empty() {
            eprintln!("Monster {} has no active abilities", self.name());
        }

        let attack_pattern = Regex::new(r" vs\. ").unwrap();
        let mut has_attack = false;
        for active_ability in self.creature.active_abilities() {
            if attack_pattern.is_match(&active_ability.latex_ability_block(&self.creature)) {
                has_attack = true;
                break;
            }
        }
        if !has_attack {
            eprintln!("Monster {} has no attacks", self.name());
        }
    }

    // Validate that the monster has approximately the right total number of attributes.
    // For this purpose, we use raw attributes instead of point value like PCs use,
    // and we ignore Intelligence since it does not affect monster power level.
    fn validate_attribute_sum(&self) {
        // TODO: verify that this sum is reasonable. A baseline level 1 PC has a sum of
        // approximately 10, but that includes Intelligence.
        let mut expected_attribute_sum = 8;

        // Elite monsters should have higher attributes
        if self.elite() {
            // TODO: validate that this difference is reasonable
            expected_attribute_sum += 5;
        }

        // Add scaling from level, just like PCs use. Note that the order affects rounding.
        expected_attribute_sum += ((self.creature.level + 3) / 6) * 2;

        let mut actual_attribute_sum = 0;
        for attribute in Attribute::monster_validation() {
            // Willpower shouldn't be considered when determining the power of mindless creatures
            if !(attribute == Attribute::Willpower && self.creature.is_mindless()) {
                actual_attribute_sum += self.creature.get_base_attribute(&attribute);
            }
        }

        let diff = (actual_attribute_sum - expected_attribute_sum).abs();

        // At low levels, attribute sums are often significantly below the expected sum for
        // narrative reasons.
        let weak_and_low_level =
            self.creature.level <= 2 && actual_attribute_sum <= expected_attribute_sum;

        // TODO: tune this threshold
        let threshold = 4;
        if diff >= threshold && !weak_and_low_level {
            eprintln!(
                "Monster {} has attribute sum {}, expected {}",
                self.name(),
                actual_attribute_sum,
                expected_attribute_sum
            );
        }
    }

    fn validate_attribute_max(&self) {
        // A normal monster should cap at 4 base, +2 from role
        let mut expected_attribute_max = 6;

        // Elite monsters can have higher attributes
        if self.elite() {
            expected_attribute_max += 2;
        }

        // Add scaling from level, just like PCs use
        expected_attribute_max += (self.creature.level + 3) / 6;

        for attribute in Attribute::monster_validation() {
            let actual = self.creature.get_base_attribute(&attribute);
            if actual > expected_attribute_max {
                eprintln!(
                    "Monster {} has {} of {}, expected max {}",
                    self.name(),
                    attribute.name(),
                    actual,
                    expected_attribute_max,
                );
            }
        }
    }

    fn validate_elite_abilities(&self) {
        let mut has_elite_ability = false;
        for ability in self.creature.active_abilities() {
            if ability.is_elite() {
                has_elite_ability = true;
            }
        }
        if has_elite_ability != self.elite() {
            eprintln!(
                "Monster {} {}",
                self.name(),
                if has_elite_ability {
                    "has elite ability but is not elite"
                } else {
                    "is elite but does not have an elite ability"
                },
            );
        }
    }

    // TODO: Should all monsters have skills?
    fn validate_skills(&self) {
        if self.creature.get_base_attribute(&Intelligence) >= 0
            && self.creature.skill_training.is_none()
            // Low level creatures sometimes have no skills because they are generally bad at
            // everything
            && self.creature.level > 1
        {
            eprintln!(
                "Monster {} has a non-negative intelligence but has no skills",
                self.name(),
            );
        }
    }

    pub fn explain_statistics(&self) -> String {
        format!(
            "
*Modifiers*:
{modifiers}

*Damage Absorption*:
{damage_absorption}

*Attacks*:
{attacks}

*Movement*:
{movement}
            ",
            modifiers = self.creature.explain_modifiers().join("\n").trim(),
            damage_absorption = self.creature.explain_damage_absorption().trim(),
            attacks = self.creature.explain_attacks().join("\n").trim(),
            movement = self.latex_movement(),
        )
    }
}

// Static generators
impl Monster {
    pub fn standard_set(level: i32) -> Vec<Self> {
        vec![
            Self::standard_brute(level),
            Self::standard_leader(level),
            Self::standard_mystic(level),
            Self::standard_skirmisher(level),
            Self::standard_sniper(level),
            Self::standard_warrior(level),
        ]
    }

    pub fn standard_brute(level: i32) -> Self {
        let mut monster = Self::new(false, CreatureType::Planeforged, Role::Brute, level);
        monster.creature.set_base_attributes([4, 2, 2, 0, 0, 0]);
        monster
            .creature
            .set_attribute_scaling(level, vec![Attribute::Strength, Attribute::Constitution]);
        monster.creature.add_standard_maneuvers();
        monster.creature.weapons = vec![Weapon::bite()];
        monster.creature.set_name("Brute");

        monster
    }

    // Hard to generalize
    pub fn standard_leader(level: i32) -> Self {
        let mut monster = Self::new(false, CreatureType::Planeforged, Role::Leader, level);
        monster.creature.set_base_attributes([2, 2, 2, 2, 2, 2]);
        monster
            .creature
            .set_attribute_scaling(level, vec![Attribute::Constitution, Attribute::Willpower]);
        monster.creature.add_standard_maneuvers();
        monster.creature.add_standard_spells();
        monster.creature.weapons = vec![Weapon::bite()];
        monster.creature.set_name("Leader");

        monster
    }

    pub fn standard_mystic(level: i32) -> Self {
        let mut monster = Self::new(false, CreatureType::Planeforged, Role::Mystic, level);
        monster.creature.set_base_attributes([0, 0, 2, 0, 2, 4]);
        monster
            .creature
            .set_attribute_scaling(level, vec![Attribute::Perception, Attribute::Willpower]);
        monster.creature.add_standard_spells();
        monster.creature.weapons = vec![];
        monster.creature.set_name("Mystic");

        monster
    }

    pub fn standard_skirmisher(level: i32) -> Self {
        let mut monster = Self::new(false, CreatureType::Planeforged, Role::Skirmisher, level);
        monster.creature.set_base_attributes([2, 4, 0, 0, 2, 0]);
        monster
            .creature
            .set_attribute_scaling(level, vec![Attribute::Dexterity, Attribute::Perception]);
        monster.creature.add_standard_maneuvers();
        monster.creature.weapons = vec![Weapon::bite()];
        monster.creature.set_name("Skirmisher");

        monster
    }

    pub fn standard_warrior(level: i32) -> Self {
        let mut monster = Self::new(false, CreatureType::Planeforged, Role::Warrior, level);
        monster.creature.set_base_attributes([2, 0, 4, 0, 0, 2]);
        monster
            .creature
            .set_attribute_scaling(level, vec![Attribute::Strength, Attribute::Constitution]);
        monster.creature.add_standard_maneuvers();
        monster.creature.weapons = vec![Weapon::bite()];
        monster.creature.set_name("Warrior");

        monster
    }

    pub fn standard_sniper(level: i32) -> Self {
        let mut monster = Self::new(false, CreatureType::Planeforged, Role::Sniper, level);
        monster.creature.set_base_attributes([2, 2, 0, 0, 4, 0]);
        monster
            .creature
            .set_attribute_scaling(level, vec![Attribute::Strength, Attribute::Perception]);
        monster.creature.add_standard_maneuvers();
        monster.creature.weapons = vec![Weapon::longbow()];
        monster.creature.set_name("Sniper");

        monster
    }

    // Useful for comparing the relative power of various attributes
    // fn pure_attribute(level: i32, attribute: Attribute) -> Self {
    //     let mut monster = Self::new(false, CreatureType::Planeforged, Role::Leader, level);
    //     monster.creature.set_base_attribute(attribute, 4);
    //     // We use Intelligence because it doesn't affect any monster statistics
    //     monster
    //         .creature
    //         .set_attribute_scaling(level, vec![attribute, Attribute::Intelligence]);
    //     monster
    //         .creature
    //         .set_name(&format!("Pure {}", attribute.name()));

    //     monster
    // }

    pub fn example_monster(
        elite: bool,
        level: i32,
    ) -> Monster {
        let cr = if elite {
            ChallengeRating::Four
        } else {
            ChallengeRating::One
        };

        let mut monster = Monster::new(elite, CreatureType::Planeforged, Role::Leader, level);
        monster.creature.weapons = vec![Weapon::bite()];
        monster.creature.add_standard_maneuvers();
        monster.creature.add_standard_spells();
        monster.creature.name = Some("Example Monster".to_string());

        // 2 for most attributes, 4 str, 4 wil
        for attribute_name in Attribute::all() {
            monster
                .creature
                .set_base_attribute(attribute_name, 2);
        }
        monster
            .creature
            .set_base_attribute(Strength, cr.max_base_attribute());
        monster
            .creature
            .set_base_attribute(Willpower, cr.max_base_attribute());

        monster
            .creature
            .set_attribute_scaling(level, vec![Strength, Willpower]);

        monster
    }
}

// LaTeX conversion
impl Monster {
    pub fn to_section(&self, parent_monster_group_name: Option<String>) -> String {
        let section_name = if parent_monster_group_name.is_some() {
            "monsubsubsection"
        } else {
            "monsubsection"
        };
        let name = if let Some(ref n) = self.creature.name {
            titlecase(n)
        } else {
            panic!("Monster has no name")
        };
        let latex = latex_formatting::latexify(format!(
            "
                {pagebreak}
                \\par\\noindent
                \\begin<minipage><\\columnwidth>
                    \\{section_name}<{name}><{level} {role}>{elite}
                    \\monstersize{size_star}<{size} {type}>
                    {art}
                \\end<minipage>
                {description}
                {knowledge}
                {content_buffer}

                \\par \\RaggedRight
                {content}
                \\monsterabilitiesheader<$Name>
                {abilities}
            ",
            pagebreak = if parent_monster_group_name.is_some() { r"" } else { r"\newpage" },
            art = self.latex_art(parent_monster_group_name),
            section_name = section_name,
            size_star = if section_name == "monsubsubsection" { "*" } else { "" },
            name = name,
            level = self.creature.level,
            role = self.role.name(),
            elite = if matches!(self.challenge_rating, ChallengeRating::Four) { "[Elite]" } else {""},
            size = self.creature.size.name(),
            type = self.creature_type.name(),
            description = self.description.as_deref().unwrap_or(""),
            knowledge = if let Some(ref k) = self.knowledge { k.to_latex(&self.creature_type, self.creature.level)} else { r"".to_string() },
            content_buffer = if self.description.is_some() || self.knowledge.is_some() {
                r"\vspace{0.5em}"
            } else { "" },
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

        // Now that we have replaced "$name", there should be no more dollar signs
        let dollar_sign_pattern = Regex::new(r"\$").unwrap();
        if dollar_sign_pattern.is_match(&latex) {
            eprintln!("Monster {} contains a '$'", self.name());
        }

        // Remove trailing spaces
        let terminal_spaces_pattern = Regex::new(r"(?m: +$)").unwrap();
        let latex = terminal_spaces_pattern.replace_all(&latex, "").to_string();
        // Condense repetitive line breaks to avoid bloating file size and make testing
        // easier.
        let empty_line_pattern = Regex::new(r"\n+").unwrap();
        return empty_line_pattern.replace_all(&latex, "\n").to_string();
    }

    fn latex_art(&self, parent_monster_group_name: Option<String>) -> String {
        if self.art {
            let name = self.creature.name.as_ref().unwrap().to_lowercase();
            let path = if let Some(p) = parent_monster_group_name {
                format!("{} - {}", p.to_lowercase(), name)
            } else {
                name.to_string()
            };
            format!(
                "\\noindent\\includegraphics[width=\\columnwidth]<monsters/{path}>\\vspace<0.5em>",
                path = path,
            )
        } else {
            "".to_string()
        }
    }

    fn latex_content(&self) -> String {
        format!(
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
                    \\pari \\textbf<Power> {magical_power}\\sparkle \\monsep {mundane_power}
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
            magical_power = self.creature.calc_magical_power(),
            mundane_power = self.creature.calc_mundane_power(),
            alignment =
                latex_formatting::uppercase_first_letter(self.alignment.as_deref().unwrap_or("")),
            space_and_reach = "", // TODO: only display for monsters with nonstandard space/reach

                                  // This is sometimes useful for debugging, but isn't actually useful information in general.
                                  // To the extent that raw accuracy or power is important, that should already be
                                  // included in more specific attacks or abilities.
                                  // accuracy = latex_formatting::modifier(self.creature.calc_accuracy()),
                                  // power = self.latex_power(),
        )
    }

    fn latex_special_defense_modifiers(&self) -> String {
        let special_defenses = self.creature.calc_special_defenses();

        fn explain_special_defense_types(header: &str, types: Vec<SpecialDefenseType>) -> String {
            if types.is_empty() {
                return "".to_string();
            }
            format!(
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
            )
        }

        format!(
            "
                {immune}
                {impervious}
                {vulnerable}
            ",
            immune = explain_special_defense_types("Immune", special_defenses.immune),
            impervious = explain_special_defense_types("Impervious", special_defenses.impervious),
            vulnerable = explain_special_defense_types("Vulnerable", special_defenses.vulnerable),
        )
    }

    fn latex_skill_modifiers_from_category(&self, skill_category: &SkillCategory) -> Vec<String> {
        let mut skills = Skill::all_from_skill_category(skill_category)
            .iter()
            // Jump has special handling
            .filter(|s| self.creature.is_skill_trained(s) && s != &&Skill::Jump)
            .map(|s| {
                format!(
                    "{}~{}",
                    titlecase(s.name()),
                    latex_formatting::modifier(self.creature.calc_skill_modifier(s))
                )
            })
            .collect::<Vec<String>>();
        skills.sort_by_key(|a| a.to_lowercase());
        skills
    }

    fn latex_movement(&self) -> String {
        let mut movement_components = self.creature.calc_movement_mode_descriptions();

        if self.creature.is_skill_trained(&Skill::Jump) {
            movement_components.push(format!(
                "{} ft. (+{})",
                self.creature.calc_jump_distance(),
                self.creature.calc_skill_modifier(&Skill::Jump),
            ));
        }

        // We want to sort the foot-based components before adding skill modifiers
        movement_components.sort();

        movement_components
            .extend(self.latex_skill_modifiers_from_category(&SkillCategory::Movement));
        if !movement_components.is_empty() {
            format!(
                "
                    \\pari \\textbf<Movement> {movement}
                ",
                movement = movement_components.join("\\monsep "),
            )
        } else {
            "".to_string()
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
        if !sense_components.is_empty() {
            format!(
                "
                    \\pari \\textbf<Senses> {senses}
                ",
                senses = latex_formatting::uppercase_first_letter(&sense_components.join(", ")),
            )
        } else {
            "".to_string()
        }
    }

    fn latex_social(&self) -> String {
        let skills = self.latex_skill_modifiers_from_category(&SkillCategory::Social);
        if !skills.is_empty() {
            format!(
                "
                    \\pari \\textbf<Social> {skills}
                ",
                skills = skills.join(", "),
            )
        } else {
            "".to_string()
        }
    }

    fn latex_other_skills(&self) -> String {
        let skills = self.latex_skill_modifiers_from_category(&SkillCategory::Other);
        if !skills.is_empty() {
            format!(
                "
                    \\pari \\textbf<Other skills> {skills}
                ",
                skills = skills.join(", "),
            )
        } else {
            "".to_string()
        }
    }

    fn latex_defensive_statistics(&self) -> String {
        let ment_text = if self.creature.is_mindless() {
            "".to_string()
        } else {
            format!(
                "\\monsep Ment {}",
                self.creature.calc_defense(&Defense::Mental)
            )
        };
        format!(
            "
                \\pari \\textbf<HP> {hp}
                    \\monsep \\textbf<DR> {dr}
                \\pari \\textbf<Defenses>
                    Armor {armor}
                    \\monsep Brn {brawn}
                    \\monsep Fort {fort}
                    \\monsep Ref {ref}
                    {ment_text}
            ",
            hp = self.creature.calc_hit_points(),
            dr = self.creature.calc_damage_resistance(),
            armor = self.creature.calc_defense(&Defense::Armor),
            brawn = self.creature.calc_defense(&Defense::Brawn),
            fort = self.creature.calc_defense(&Defense::Fortitude),
            ref = self.creature.calc_defense(&Defense::Reflex),
        )
    }

    // fn latex_power(&self) -> String {
    //     return format!("\\textbf<Power> {}", self.creature.calc_power());
    // }

    fn latex_attributes(&self) -> String {
        return Attribute::all()
            .iter()
            .map(|a| {
                let val = self.creature.get_base_attribute(a);
                format!(
                    "{} {}",
                    a.shorthand_name(),
                    if val > -10 {
                        format!("{}", val)
                    } else {
                        "\\tdash".to_string()
                    },
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

        let mut active_abilities = self.creature.active_abilities();
        active_abilities.sort_by_key(|a| a.name().to_lowercase());
        for active_ability in active_abilities {
            ability_texts.push(active_ability.latex_ability_block(&self.creature));
        }

        let mut passive_ability_texts = self
            .creature
            .get_passive_abilities()
            .iter()
            .map(|a| a.to_latex())
            .collect::<Vec<String>>();
        passive_ability_texts.sort();
        ability_texts = [&passive_ability_texts[..], &ability_texts[..]].concat();
        ability_texts.join("\\par ")
    }
}

#[cfg(test)]
mod tests;
