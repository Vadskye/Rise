use crate::core_mechanics::attacks::{DamageEffect, HasAttacks, SimpleDamageEffect};
use crate::core_mechanics::{DicePool, PowerScaling};
use crate::creatures::Creature;
use crate::equipment::Weapon;
use regex::Match;
use regex::Regex;

pub fn replace_attack_terms(
    effect: &str,
    creature: &Creature,
    is_magical: bool,
    weapon: Option<&Weapon>,
) -> String {
    let mut replaced_effect = effect.to_string();

    // Generally, $fullweapondamage is the easiest way to indicate strike damage. However, the
    // individual $damage terms are available to make it easier to write
    // special weapon effects.
    replaced_effect = replace_full_weapon_damage_terms(&replaced_effect);
    replaced_effect = replace_accuracy_terms(&replaced_effect, creature, weapon);
    replaced_effect = replace_brawling_accuracy_terms(&replaced_effect, creature);
    replaced_effect = replace_damage_terms(&replaced_effect, creature, is_magical, weapon);
    replaced_effect = replace_damage_rank_terms(&replaced_effect, creature, is_magical);
    replaced_effect = replace_power_terms(&replaced_effect, creature);
    replaced_effect = replace_weapon_name_terms(&replaced_effect, &weapon);
    replaced_effect = replace_extra_damage_terms(&replaced_effect, creature, is_magical);

    replaced_effect.to_string()
}

fn replace_full_weapon_damage_terms(effect: &str) -> String {
    let full_weapon_damage_pattern = Regex::new(r"\$fullweapondamage").unwrap();
    return full_weapon_damage_pattern
        .replace_all(effect, "$$damage damage")
        .to_string();
}

fn replace_accuracy_terms(effect: &str, creature: &Creature, weapon: Option<&Weapon>) -> String {
    let mut replaced_effect = effect.to_string();
    // Find each block of "$accuracy", including any local accuracy modifiers. We'll split up those
    // modifiers in a separate step. Doing this as a two-step process makes it easier to associate
    // local modifiers with the right accuracy text.
    let accuracy_pattern = Regex::new(r"(\$accuracy[+-]?\d*)\b").unwrap();
    for accuracy_match in accuracy_pattern.find_iter(&replaced_effect.clone()) {
        let parsed_text = parse_accuracy_match(accuracy_match, creature, weapon);
        replaced_effect = accuracy_pattern
            .replacen(&replaced_effect, 1, parsed_text)
            .to_string();
    }
    replaced_effect
}

fn replace_brawling_accuracy_terms(effect: &str, creature: &Creature) -> String {
    let mut replaced_effect = effect.to_string();
    // Find each block of "$brawlingaccuracy", including any local accuracy modifiers. We'll split up those
    // modifiers in a separate step. Doing this as a two-step process makes it easier to associate
    // local modifiers with the right accuracy text.
    let accuracy_pattern = Regex::new(r"(\$brawlingaccuracy[+-]?\d*)\b").unwrap();
    for accuracy_match in accuracy_pattern.find_iter(&replaced_effect.clone()) {
        let parsed_text = parse_brawling_accuracy_match(accuracy_match, creature);
        replaced_effect = accuracy_pattern
            .replacen(&replaced_effect, 1, parsed_text)
            .to_string();
    }
    replaced_effect
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
    let damage_pattern = Regex::new(r"\$damage(\*\d)?\b").unwrap();
    // $damage never has local modifiers, so we don't need to pay attention to the captured text
    for damage_match in damage_pattern.find_iter(&replaced_effect.clone()) {
        let parsed_text = calc_weapon_damage(damage_match, creature, is_magical, weapon.unwrap());
        replaced_effect = damage_pattern
            .replacen(&replaced_effect, 1, parsed_text)
            .to_string();
    }
    replaced_effect
}

fn replace_damage_rank_terms(effect: &str, creature: &Creature, is_magical: bool) -> String {
    let mut replaced_effect = effect.to_string();

    let damage_pattern = Regex::new(r"\$dr\d[hl]?\b").unwrap();
    for damage_match in damage_pattern.find_iter(&replaced_effect.clone()) {
        // TODO: figure out how to trim the leading "$"
        let parsed_damage_effect = SimpleDamageEffect::from_string(damage_match.as_str(), vec![]);
        let damage_dice = parsed_damage_effect.calc_damage_dice(creature, is_magical, false);
        replaced_effect = damage_pattern
            .replacen(&replaced_effect, 1, damage_dice.to_string())
            .to_string();
    }

    replaced_effect
}

fn replace_power_terms(effect: &str, creature: &Creature) -> String {
    let mundane_power_pattern = Regex::new(r"\$mundanepower").unwrap();
    let replaced_effect =
        mundane_power_pattern.replace_all(effect, creature.calc_power(false).to_string());

    let magical_power_pattern = Regex::new(r"\$magicalpower").unwrap();
    let replaced_effect =
        magical_power_pattern.replace_all(&replaced_effect, creature.calc_power(false).to_string());

    replaced_effect.to_string()
}

fn replace_weapon_name_terms(effect: &str, weapon: &Option<&Weapon>) -> String {
    let mut replaced_effect = effect.to_string();

    // TODO: should we match "$weapons" with different behavior?
    let weapon_pattern = Regex::new(r"\$weapon").unwrap();
    for _ in weapon_pattern.find_iter(&replaced_effect.clone()) {
        // Unwrap the weapon here. If we found a $weapon match but we don't have a weapon,
        // crashing is appropriate.
        let weapon_name = &weapon.unwrap().name.to_lowercase();
        replaced_effect = weapon_pattern
            .replacen(&replaced_effect, 1, weapon_name)
            .to_string();
    }

    replaced_effect
}

fn replace_extra_damage_terms(effect: &str, creature: &Creature, is_magical: bool) -> String {
    let mut replaced_effect = effect.to_string();

    let extra_damage_pattern = Regex::new(r"\$d(\d)p(\d)").unwrap();
    for (_, [die_size, per_power]) in extra_damage_pattern
        .captures_iter(effect)
        .map(|c| c.extract())
    {
        let damage_effect = SimpleDamageEffect {
            base_dice: DicePool::empty(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::xdy(1, die_size.parse::<i32>().unwrap())),
                power_per_dice: per_power.parse::<i32>().unwrap(),
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect();
        let damage_dice = damage_effect.calc_damage_dice(creature, is_magical, false);
        replaced_effect = extra_damage_pattern
            .replacen(&replaced_effect, 1, damage_dice.to_string())
            .to_string();
    }

    replaced_effect
}

// For a given accuracy block, such as "$accuracy" or "$accuracy+2", return the specific text that
// should replace it, such as "+5".
fn parse_accuracy_match(
    accuracy_match: Match,
    creature: &Creature,
    weapon: Option<&Weapon>,
) -> String {
    let mut accuracy = creature.calc_accuracy();

    // Handle local accuracy modifiers
    let split_accuracy_pattern = Regex::new(r"\$accuracy([+-])?(\d+)?\b").unwrap();
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
    format!("{}{}", accuracy_sign, accuracy)
}

// For a given brawling accuracy block, such as "$brawlingaccuracy" or "$brawlingaccuracy+2", return the specific text that
// should replace it, such as "+5".
fn parse_brawling_accuracy_match(brawling_accuracy_match: Match, creature: &Creature) -> String {
    let mut brawling_accuracy = creature.calc_brawling_accuracy();

    // Handle local accuracy modifiers
    let split_brawling_accuracy_pattern = Regex::new(r"\$brawlingaccuracy([+-])?(\d+)?\b").unwrap();
    // We can unwrap here because this should definitely have the right pattern - it was originally
    // found by the regex in `find_all_accuracy_matches`.
    let split_captures = split_brawling_accuracy_pattern
        .captures(brawling_accuracy_match.as_str())
        .unwrap();
    // If we find this group, there's a modifier on the accuracy
    if let Some(modifier) = split_captures.get(2) {
        let modifier: i32 = modifier.as_str().parse::<i32>().unwrap();
        let accuracy_modifier_sign = split_captures.get(1).unwrap();
        if accuracy_modifier_sign.as_str() == "+" {
            brawling_accuracy += modifier;
        } else {
            brawling_accuracy -= modifier;
        }
    }

    let accuracy_sign = if brawling_accuracy >= 0 { "+" } else { "-" };
    format!("{}{}", accuracy_sign, brawling_accuracy)
}

fn calc_weapon_damage(
    damage_match: Match,
    creature: &Creature,
    is_magical: bool,
    weapon: &Weapon,
) -> String {
    // Handle weapon damage multipliers
    let multiplier_pattern = Regex::new(r"\$damage\*?(\d)?\b").unwrap();
    let multiplier_captures = multiplier_pattern.captures(damage_match.as_str()).unwrap();
    let multiplier = if let Some(multiplier_match) = multiplier_captures.get(1) {
        multiplier_match.as_str().parse::<i32>().unwrap()
    } else {
        1
    };

    let damage_effect = DamageEffect::from_weapon(weapon);
    let mut damage_dice = damage_effect.calc_damage_dice(creature, is_magical, true);
    damage_dice.multiplier = multiplier;
    damage_dice.to_string()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::creatures::CreatureCategory;
    use crate::testing::assert_multiline_eq;

    fn sample_creature() -> Creature {
        Creature::new(10, CreatureCategory::Character)
    }

    mod replace_full_weapon_damage_terms {
        use super::*;

        #[test]
        fn replaces_one_term() {
            assert_eq!(
                "takes $damage damage.",
                replace_full_weapon_damage_terms("takes $fullweapondamage."),
            );
        }

        #[test]
        fn replaces_two_terms() {
            assert_eq!(
                "takes $damage damage and $damage damage.",
                replace_full_weapon_damage_terms("takes $fullweapondamage and $fullweapondamage."),
            );
        }
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

    // Note that the default creature has 5 power, so +2 normally or +3 for a heavy weapon.
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
                "Deals 1d6+2 electricity damage",
                replace_damage_terms(
                    "Deals $damage electricity damage",
                    &sample_creature(),
                    true,
                    Some(&StandardWeapon::Broadsword.weapon())
                ),
            );
        }

        #[test]
        fn replaces_doubled_broadsword_damage() {
            assert_eq!(
                "Deals 2d6+4 electricity damage",
                replace_damage_terms(
                    "Deals $damage*2 electricity damage",
                    &sample_creature(),
                    true,
                    Some(&StandardWeapon::Broadsword.weapon())
                ),
            );
        }

        #[test]
        fn replaces_greatsword_damage() {
            assert_eq!(
                "Deals 1d8+3 electricity damage",
                replace_damage_terms(
                    "Deals $damage electricity damage",
                    &sample_creature(),
                    true,
                    Some(&StandardWeapon::Greatsword.weapon())
                ),
            );
        }

        #[test]
        fn replaces_tripled_greatsword_damage() {
            assert_eq!(
                "Deals 3d8+9 electricity damage",
                replace_damage_terms(
                    "Deals $damage*3 electricity damage",
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
            creature
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
            // dr2 is 1d8 +1 per 2 power
            assert_eq!(
                "Deals 1d8+2 electricity damage",
                replace_damage_rank_terms(
                    "Deals $dr2 electricity damage",
                    &dr_sample_creature(),
                    true
                ),
            );
            assert_eq!(
                "Deals 1d8+5 electricity damage",
                replace_damage_rank_terms(
                    "Deals $dr2 electricity damage",
                    &dr_sample_creature(),
                    false
                ),
            );
        }

        #[test]
        fn replaces_high_scaling() {
            // dr3h is 1d6 + (1d6 per 3 power)
            assert_eq!(
                "Deals 2d6 electricity damage",
                replace_damage_rank_terms(
                    "Deals $dr3h electricity damage",
                    &dr_sample_creature(),
                    true
                ),
            );
            assert_eq!(
                "Deals 4d6 electricity damage",
                replace_damage_rank_terms(
                    "Deals $dr3h electricity damage",
                    &dr_sample_creature(),
                    false
                ),
            );
        }

        #[test]
        fn replaces_low_scaling() {
            // dr4l is 4d6
            assert_eq!(
                "Deals 4d6 electricity damage",
                replace_damage_rank_terms(
                    "Deals $dr4l electricity damage",
                    &dr_sample_creature(),
                    true
                ),
            );
            assert_eq!(
                "Deals 4d6 electricity damage",
                replace_damage_rank_terms(
                    "Deals $dr4l electricity damage",
                    &dr_sample_creature(),
                    false
                ),
            );
        }
    }

    mod replace_weapon_name_terms {
        use super::*;
        use crate::equipment::StandardWeapon;

        #[test]
        fn replaces_broadsword_name() {
            assert_eq!(
                "Deals some damage with a broadsword.",
                replace_weapon_name_terms(
                    "Deals some damage with a $weapon.",
                    &Some(&StandardWeapon::Broadsword.weapon()),
                ),
            );
        }

        #[test]
        fn replaces_claws_name() {
            assert_eq!(
                "Deals some damage with its claws.",
                replace_weapon_name_terms(
                    "Deals some damage with its $weapons.",
                    &Some(&StandardWeapon::Claw.weapon()),
                ),
            );
        }
    }

    // Note that the default creature has 5 power
    mod replace_extra_damage_terms {
        use super::*;

        #[test]
        fn replaces_1d6_per_4_power() {
            assert_eq!(
                // 1d6 per 4 power should be 1d6 total
                "Deals 1d6 electricity damage",
                replace_extra_damage_terms(
                    "Deals $d6p4 electricity damage",
                    &sample_creature(),
                    true,
                ),
            );
        }

        #[test]
        fn replaces_1d8_per_1_power() {
            assert_eq!(
                "Deals 5d8 electricity damage",
                replace_extra_damage_terms(
                    "Deals $d8p1 electricity damage",
                    &sample_creature(),
                    true,
                ),
            );
        }
    }

    mod replace_attack_terms {
        use super::*;

        #[test]
        fn replaces_mind_crush() {
            assert_multiline_eq(
                // dr4 is 1d10 + (1d6 per 3 power)
                r"
                    The $name makes a +5 attack vs. Mental against one creature within \medrange.
                    \hit 1d6+1d10 psychic damage.
                    Each creature that loses hit points from this damage is \stunned as a condition.
                ",
                replace_attack_terms(
                    r"
                    The $name makes a $accuracy attack vs. Mental against one creature within \medrange.
                    \hit $dr4 psychic damage.
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
                r"
                    The $name makes a +5 melee strike with a tentacle.
                    \hit 1d8+3 damage.
                    Each creature that loses hit points from this damage is poisoned by aboleth slime.

                    Aboleth slime is an injury-based liquid poison (see \pcref{Poison}).
                    The poison's accuracy is +7.
                    Its stage 1 effect makes the target \slowed while the poison lasts.
                    Its stage 3 effect makes the target dissolve into an sludgelike mass while the poison lasts, as the \textit{sludgeform} spell.
                ",
                replace_attack_terms(
                    r"
                    The $name makes a $accuracy melee strike with a $weapon.
                    \hit $damage damage.
                    Each creature that loses hit points from this damage is poisoned by aboleth slime.

                    Aboleth slime is an injury-based liquid poison (see \pcref{Poison}).
                    The poison's accuracy is $accuracy+2.
                    Its stage 1 effect makes the target \slowed while the poison lasts.
                    Its stage 3 effect makes the target dissolve into an sludgelike mass while the poison lasts, as the \textit{sludgeform} spell.
                ",
                    &sample_creature(),
                    false,
                    Some(&Weapon::tentacle()),
                ),
            );
        }
    }
}
