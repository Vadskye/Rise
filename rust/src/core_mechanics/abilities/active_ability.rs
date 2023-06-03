use super::latex::latex_ability_block;
use crate::core_mechanics::abilities::{AbilityTag, AbilityType, UsageTime};
use crate::core_mechanics::attacks::{DamageEffect, HasAttacks, SimpleDamageEffect};
use crate::creatures::Creature;
use crate::equipment::Weapon;
use regex::Match;
use regex::Regex;

pub trait LatexAbility {
    fn latex_ability_block(self, creature: &Creature) -> String;
}

#[derive(Clone, Debug)]
pub struct ActiveAbility {
    pub ability_type: AbilityType,
    // This supports a standard list of automatic replacements to make it easier to write ability
    // descriptions. For details, see ??foo??.
    pub effect: String,
    pub is_magical: bool,
    pub name: String,
    // We only use ability tags instead of all tags here; active abilities shouldn't need
    // weapon tags
    pub tags: Vec<AbilityTag>,
    pub usage_time: Option<UsageTime>,
}

#[derive(Clone, Debug)]
pub struct StrikeAbility {
    pub effect: String,
    pub is_magical: bool,
    pub name: String,
    pub tags: Vec<AbilityTag>,
    pub weapon: Weapon,
}

impl LatexAbility for ActiveAbility {
    fn latex_ability_block(self, creature: &Creature) -> String {
        // We have to stringify the tags before sending them over
        let latex_tags: Vec<String> = self.tags.iter().map(|t| t.latex()).collect();

        // This function is used by both ActiveAbility and Attack, which explains the odd
        // duplication.
        return latex_ability_block(
            self.ability_type,
            replace_attack_terms(&self.effect, creature, self.is_magical, None),
            latex_tags,
            self.is_magical,
            self.name,
            self.usage_time,
        );
    }
}

impl LatexAbility for StrikeAbility {
    fn latex_ability_block(self, creature: &Creature) -> String {
        // We have to stringify the tags before sending them over
        let mut latex_tags: Vec<String> = self.tags.iter().map(|t| t.latex()).collect();
        // Add the tags from the weapon
        for tag in self.weapon.tags.iter() {
            latex_tags.push(tag.latex());
        }
        // TODO: does this sort by the visible tag name, or does it put all \\abilitytag
        // entries before all \\weapontag entries?
        latex_tags.sort();

        // This function is used by both ActiveAbility and Attack, which explains the odd
        // duplication.
        return latex_ability_block(
            AbilityType::Normal,
            replace_attack_terms(&self.effect, creature, self.is_magical, Some(&self.weapon)),
            latex_tags,
            self.is_magical,
            self.name,
            None,
        );
    }
}

fn replace_attack_terms(
    effect: &str,
    creature: &Creature,
    is_magical: bool,
    weapon: Option<&Weapon>,
) -> String {
    let mut replaced_effect = effect.to_string();

    replaced_effect = replace_accuracy_terms(&replaced_effect, creature, weapon);
    replaced_effect = replace_damage_terms(&replaced_effect, creature, is_magical, weapon);
    replaced_effect = replace_damage_rank_terms(&replaced_effect, creature, is_magical);

    return replaced_effect.to_string();
}

fn replace_accuracy_terms(effect: &str, creature: &Creature, weapon: Option<&Weapon>) -> String {
    let mut replaced_effect = effect.to_string();
    // Find each block of "$accuracy", including any local accuracy modifiers. We'll split up those
    // modifiers in a separate step. Doing this as a two-step process makes it easier to associate
    // local modifiers with the right accuracy text.
    let accuracy_pattern = Regex::new(r"(\$accuracy[+-]?\d*)").unwrap();
    for accuracy_match in accuracy_pattern.find_iter(&replaced_effect.clone()) {
        let parsed_text = parse_accuracy_match(accuracy_match, creature, weapon);
        replaced_effect = accuracy_pattern
            .replacen(&replaced_effect, 1, parsed_text)
            .to_string();
    }
    return replaced_effect;
}

fn replace_damage_terms(
    effect: &str,
    creature: &Creature,
    is_magical: bool,
    weapon: Option<&Weapon>,
) -> String {
    let mut replaced_effect = effect.to_string();
    // Find each block of "$damage". This is only relevant for strike-based attacks, so it would be
    // an error if this didn't include a weapon.
    let damage_pattern = Regex::new(r"\$damage").unwrap();
    // $damage never has local modifiers, so we don't need to pay attention to the captured text
    for _ in damage_pattern.find_iter(&replaced_effect.clone()) {
        let parsed_text = calc_weapon_damage(creature, is_magical, weapon.unwrap());
        replaced_effect = damage_pattern
            .replacen(&replaced_effect, 1, parsed_text)
            .to_string();
    }
    return replaced_effect;
}

fn replace_damage_rank_terms(effect: &str, creature: &Creature, is_magical: bool) -> String {
    let mut replaced_effect = effect.to_string();

    let damage_pattern = Regex::new(r"\$dr\d[hl]?").unwrap();
    for damage_match in damage_pattern.find_iter(&replaced_effect.clone()) {
        // TODO: figure out how to trim the leading "$"
        let parsed_damage_effect = SimpleDamageEffect::from_string(damage_match.as_str(), vec![]);
        let damage_dice = parsed_damage_effect.calc_damage_dice(creature, is_magical, false);
        replaced_effect = damage_pattern
            .replacen(&replaced_effect, 1, damage_dice.to_string())
            .to_string();
    }

    return replaced_effect;
}

// Convert a given accuracy block, such as "$accuracy" or "$accuracy+2", to the specific text that
// should replace it, such as "+5".
fn parse_accuracy_match(
    accuracy_match: Match,
    creature: &Creature,
    weapon: Option<&Weapon>,
) -> String {
    let mut accuracy = creature.calc_accuracy();

    // Handle local accuracy modifiers
    let split_accuracy_pattern = Regex::new(r"\$accuracy([+-])?(\d+)?").unwrap();
    // We can unwrap here because this should definitely have the right pattern - it was originally
    // found by the regex in `find_all_accuracy_matches`.
    let split_accuracy_captures = split_accuracy_pattern
        .captures(accuracy_match.as_str())
        .unwrap();
    // If we find this group, there's a modifier on the accuracy
    if let Some(accuracy_modifier) = split_accuracy_captures.get(2) {
        let accuracy_modifier: i32 = accuracy_modifier.as_str().parse::<i32>().unwrap();
        let accuracy_modifier_sign = split_accuracy_captures.get(1).unwrap();
        if accuracy_modifier_sign.as_str() == "+" {
            accuracy += accuracy_modifier;
        } else {
            accuracy -= accuracy_modifier;
        }
    }

    // Handle weapon modifiers
    if let Some(weapon) = weapon {
        accuracy += weapon.accuracy;
    }

    let accuracy_sign = if accuracy >= 0 { "+" } else { "-" };
    return format!("{}{}", accuracy_sign, accuracy);
}

fn calc_weapon_damage(creature: &Creature, is_magical: bool, weapon: &Weapon) -> String {
    let damage_effect = DamageEffect::from_weapon(weapon);
    let damage_dice = damage_effect.calc_damage_dice(creature, is_magical, true);
    return damage_dice.to_string();
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::core_mechanics::abilities::SustainAction;
    use crate::creatures::CreatureCategory;
    use crate::testing::assert_multiline_eq;

    fn sample_creature() -> Creature {
        return Creature::new(10, CreatureCategory::Character);
    }

    #[test]
    fn formats_complex_ability() {
        let ability = ActiveAbility {
            ability_type: AbilityType::Normal,
            effect: "The $name glows like a torch for a minute.".to_string(),
            is_magical: true,
            name: "Torchlight".to_string(),
            tags: vec![AbilityTag::Elite, AbilityTag::Sustain(SustainAction::Minor)],
            usage_time: Some(UsageTime::Minor),
        };
        assert_multiline_eq(
            r"\begin<magicalactiveability>*<Torchlight>
                \abilitytag{Elite}, \abilitytag{Sustain} (minor)
\par \noindent Usage time: One \glossterm{minor action}.
                \rankline
The $name glows like a torch for a minute.
            \end<magicalactiveability>",
            ability
                .latex_ability_block(&sample_creature())
                .trim()
                .to_string(),
        );
    }

    mod replace_accuracy_terms {
        use super::*;
        use crate::equipment::StandardWeapon;

        #[test]
        fn ignores_irrelevant_text() {
            assert_eq!(
                "banana accuracy turnip with +3 vs. Armor",
                replace_accuracy_terms(
                    "banana accuracy turnip with +3 vs. Armor",
                    &sample_creature(),
                    None
                ),
            );
        }

        #[test]
        fn replaces_single_accuracy() {
            assert_eq!(
                "A +5 attack vs. Armor",
                replace_accuracy_terms("A $accuracy attack vs. Armor", &sample_creature(), None),
            );
        }

        #[test]
        fn replaces_added_accuracy() {
            assert_eq!(
                "A +7 attack vs. Armor",
                replace_accuracy_terms("A $accuracy+2 attack vs. Armor", &sample_creature(), None),
            );
        }

        #[test]
        fn replaces_subtracted_accuracy() {
            assert_eq!(
                "A +3 attack vs. Armor",
                replace_accuracy_terms("A $accuracy-2 attack vs. Armor", &sample_creature(), None),
            );
        }

        #[test]
        fn replaces_two_accuracies_one_modified() {
            assert_eq!(
                "A +2 attack vs. Armor, and a +5 attack vs. Mental",
                replace_accuracy_terms(
                    "A $accuracy-3 attack vs. Armor, and a $accuracy attack vs. Mental",
                    &sample_creature(),
                    None
                ),
            );
        }

        #[test]
        fn replaces_two_accuracies() {
            assert_eq!(
                "A +2 attack vs. Armor, and a +8 attack vs. Mental",
                replace_accuracy_terms(
                    "A $accuracy-3 attack vs. Armor, and a $accuracy+3 attack vs. Mental",
                    &sample_creature(),
                    None
                ),
            );
        }

        #[test]
        fn replaces_weapon_bonus() {
            assert_eq!(
                "A +7 attack vs. Armor",
                replace_accuracy_terms(
                    "A $accuracy attack vs. Armor",
                    &sample_creature(),
                    Some(&StandardWeapon::Claw.weapon())
                ),
            );
        }

        #[test]
        fn replaces_weapon_penalty() {
            assert_eq!(
                "A +4 attack vs. Armor",
                replace_accuracy_terms(
                    "A $accuracy attack vs. Armor",
                    &sample_creature(),
                    Some(&StandardWeapon::Sledgehammer.weapon())
                ),
            );
        }
    }

    // Note that the default creature has 5 power, so +2d normally or +3d for a heavy weapon.
    mod replace_damage_terms {
        use super::*;
        use crate::equipment::StandardWeapon;

        #[test]
        fn ignores_irrelevant_text() {
            assert_eq!(
                "banana damage turnip with +3 vs. Armor",
                replace_damage_terms(
                    "banana damage turnip with +3 vs. Armor",
                    &sample_creature(),
                    true,
                    None
                ),
            );
        }

        #[test]
        fn replaces_broadsword_damage() {
            assert_eq!(
                // 1d6+2d = 1d10
                "Deals 1d10 electricity damage",
                replace_damage_terms(
                    "Deals $damage electricity damage",
                    &sample_creature(),
                    true,
                    Some(&StandardWeapon::Broadsword.weapon())
                ),
            );
        }

        #[test]
        fn replaces_greatsword_damage() {
            assert_eq!(
                // 1d8+3d = 1d8+1d6. TODO: standardize dice order?
                "Deals 1d6+1d8 electricity damage",
                replace_damage_terms(
                    "Deals $damage electricity damage",
                    &sample_creature(),
                    true,
                    Some(&StandardWeapon::Greatsword.weapon())
                ),
            );
        }
    }

    mod replace_damage_rank_terms {
        use super::*;
        use crate::core_mechanics::{Attribute, HasAttributes};

        // We want a creature who has a different magical power and mundane power.
        // This should have a magical power of 5 and a mundane power of 10.
        fn dr_sample_creature() -> Creature {
            let mut creature = Creature::new(10, CreatureCategory::Character);
            creature.set_base_attribute(Attribute::Strength, 5);
            return creature;
        }

        #[test]
        fn ignores_irrelevant_text() {
            assert_eq!(
                "banana dr2 turnip with +3 vs. Armor",
                replace_damage_rank_terms(
                    "banana dr2 turnip with +3 vs. Armor",
                    &sample_creature(),
                    true,
                ),
            );
        }

        #[test]
        fn replaces_regular_scaling() {
            // dr2 is 1d8 +1d per 2 power
            assert_eq!(
                // +2d from 5 power
                "Deals 2d6 electricity damage",
                replace_damage_rank_terms(
                    "Deals $dr2 electricity damage",
                    &dr_sample_creature(),
                    true
                ),
            );
            assert_eq!(
                // +5d from 10 power
                "Deals 3d6 electricity damage",
                replace_damage_rank_terms(
                    "Deals $dr2 electricity damage",
                    &dr_sample_creature(),
                    false
                ),
            );
        }

        #[test]
        fn replaces_high_scaling() {
            // dr3h is 1d6 + (1d8 per 4 power)
            assert_eq!(
                "Deals 1d6+1d8 electricity damage",
                replace_damage_rank_terms(
                    "Deals $dr3h electricity damage",
                    &dr_sample_creature(),
                    true
                ),
            );
            assert_eq!(
                "Deals 1d6+2d8 electricity damage",
                replace_damage_rank_terms(
                    "Deals $dr3h electricity damage",
                    &dr_sample_creature(),
                    false
                ),
            );
        }

        #[test]
        fn replaces_low_scaling() {
            // dr4l is d10 + (1d6 per 4 power)
            assert_eq!(
                "Deals 1d6+1d10 electricity damage",
                replace_damage_rank_terms(
                    "Deals $dr4l electricity damage",
                    &dr_sample_creature(),
                    true
                ),
            );
            assert_eq!(
                "Deals 2d6+1d10 electricity damage",
                replace_damage_rank_terms(
                    "Deals $dr4l electricity damage",
                    &dr_sample_creature(),
                    false
                ),
            );
        }
    }

    mod replace_attack_terms {
        use super::*;
        use crate::equipment::StandardWeapon;

        #[test]
        fn replaces_mind_crush() {
            assert_multiline_eq(
                // dr4 is 1d8 + (1d8 per 4 power)
                r"
                    The $name makes a +5 attack vs. Mental against one creature within \medrange.
                    \hit The target takes 2d8 psychic damage.
                    Each creature that loses hit points from this damage is \stunned as a condition.
                ",
                replace_attack_terms(
                    r"
                    The $name makes a $accuracy attack vs. Mental against one creature within \medrange.
                    \hit The target takes $dr4 psychic damage.
                    Each creature that loses hit points from this damage is \stunned as a condition.
                ",
                    &sample_creature(),
                    true,
                    None,
                ),
            );
        }

        #[test]
        fn replaces_aboleth_slime() {
            assert_multiline_eq(
                // Slam is 1d10 base, but not heavy
                r"
                    The $name makes a +5 melee strike with a tentacle.
                    \hit Each target takes 1d6+1d8 bludgeoning damage.
                    Each creature that loses hit points from this damage is poisoned by aboleth slime.

                    Aboleth slime is an injury-based liquid poison (see \pcref{Poison}).
                    The poison's accuracy is +7.
                    Its stage 1 effect makes the target \slowed while the poison lasts.
                    Its stage 3 effect makes the target dissolve into an sludgelike mass while the poison lasts, as the \textit{sludgeform} spell.
                ",
                replace_attack_terms(
                    r"
                    The $name makes a $accuracy melee strike with a tentacle.
                    \hit Each target takes $damage bludgeoning damage.
                    Each creature that loses hit points from this damage is poisoned by aboleth slime.

                    Aboleth slime is an injury-based liquid poison (see \pcref{Poison}).
                    The poison's accuracy is $accuracy+2.
                    Its stage 1 effect makes the target \slowed while the poison lasts.
                    Its stage 3 effect makes the target dissolve into an sludgelike mass while the poison lasts, as the \textit{sludgeform} spell.
                ",
                    &sample_creature(),
                    false,
                    Some(&StandardWeapon::Slam.weapon()),
                ),
            );
        }
    }
}
