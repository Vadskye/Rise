use super::latex::latex_ability_block;
use crate::core_mechanics::abilities::{AbilityTag, AbilityType, UsageTime};
use crate::core_mechanics::attacks::{DamageEffect, HasAttacks, SimpleDamageEffect};
use crate::core_mechanics::DamageType;
use crate::creatures::Creature;
use crate::equipment::Weapon;
use regex::Match;
use regex::Regex;

#[derive(Clone, Debug)]
pub enum ActiveAbility {
    Custom(CustomAbility),
    Strike(StrikeAbility),
}

impl ActiveAbility {
    pub fn latex_ability_block(self, creature: &Creature) -> String {
        match self {
            Self::Custom(c) => c.latex_ability_block(creature),
            Self::Strike(s) => s.latex_ability_block(creature),
        }
    }

    pub fn name(&self) -> String {
        match self {
            Self::Custom(c) => c.name.clone(),
            Self::Strike(s) => s.name.clone(),
        }
    }

    pub fn is_magical(&self) -> bool {
        match self {
            Self::Custom(c) => c.is_magical,
            Self::Strike(s) => s.is_magical,
        }
    }
}

#[derive(Clone, Debug)]
pub struct CustomAbility {
    pub ability_type: AbilityType,
    // This supports a standard list of automatic replacements to make it easier to write ability
    // descriptions. For details, see ??foo??.
    pub effect: String,
    pub is_magical: bool,
    pub name: String,
    // We only use ability tags instead of all tags here; active abilities shouldn't need
    // weapon tags
    pub tags: Vec<AbilityTag>,
    pub usage_time: UsageTime,
}

impl CustomAbility {
    pub fn latex_ability_block(self, creature: &Creature) -> String {
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
            Some(self.usage_time),
        );
    }

    pub fn battle_command(rank: i32) -> Self {
        return Self {
            ability_type: AbilityType::Normal,
            effect: format!(
                "
                    The $name chooses an ally within \\medrange.
                    Whenever the target makes a strike this round, it gains a \\plus{accuracy_modifier} \\glossterm<accuracy> bonus and rolls twice, keeping the higher result.
                ",
                // r1: +2, r3: +3, etc.
                accuracy_modifier = 1 + ((rank + 1) / 2),
            ),
            is_magical: true,
            name: "Battle Command".to_string(),
            tags: vec![],
            usage_time: UsageTime::Standard,
        };
    }

    // This is just Mystic Bolt with a specific common flavor
    pub fn divine_judgment(rank: i32) -> Self {
        return Self {
            ability_type: AbilityType::Normal,
            effect: format!(
                "
                    The $name makes a $accuracy+{accuracy_modifier} vs. Mental against one creature within \\medrange.
                    \\hit The target takes $dr1 energy damage.
                ",
                accuracy_modifier = rank - 1,
            ),
            is_magical: true,
            name: "Divine Judgment".to_string(),
            tags: vec![],
            usage_time: UsageTime::Standard,
        };
    }

    pub fn inflict_wound(rank: i32) -> Self {
        return Self {
            ability_type: AbilityType::Normal,
            effect: format!(
                "
                    The $name makes a $accuracy+{accuracy_modifier} vs. Fortitude against one living creature within \\shortrange.
                    \\hit The target takes $dr1 energy damage.
                    If it loses hit points from this damage, it takes the damage again.
                ",
                accuracy_modifier = rank - 2,
            ),
            is_magical: true,
            name: "Inflict Wound".to_string(),
            tags: vec![],
            usage_time: UsageTime::Standard,
        };
    }

    pub fn stabilize_life(rank: i32) -> Self {
        return Self {
            ability_type: AbilityType::Normal,
            effect: format!(
                "
                    The $name, or one living \\glossterm<ally> within \\shortrange of it, regains $dr{rank} hit points.
                    This cannot increase the target's hit points above half its maximum hit points.
                ",
                rank = rank,
            ),
            is_magical: true,
            name: "Stabilize Life".to_string(),
            tags: vec![],
            usage_time: UsageTime::Standard,
        };
    }

    pub fn true_strike(rank: i32) -> Self {
        return Self {
            ability_type: AbilityType::Normal,
            effect: format!(
                "
                    The $name chooses an ally within \\medrange.
                    The first time the target makes a strike this round, it gains a \\plus{accuracy_modifier} \\glossterm<accuracy> bonus and rolls twice, keeping the higher result.
                ",
                // r1: +1, r3: +2, etc.
                accuracy_modifier = ((rank + 1) / 2),
            ),
            is_magical: true,
            name: "True Strike".to_string(),
            tags: vec![],
            usage_time: UsageTime::Standard,
        };
    }
}

#[derive(Clone, Debug)]
pub struct StrikeAbility {
    pub effect: String,
    pub is_magical: bool,
    pub name: String,
    pub tags: Vec<AbilityTag>,
    pub weapon: Weapon,
}

impl StrikeAbility {
    pub fn latex_ability_block(self, creature: &Creature) -> String {
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

    pub fn armorcrusher(weapon: Weapon) -> Self {
        return Self {
            effect: r"
                The $name makes a $accuracy \glossterm{weak strike} vs. Fortitude with its $weapon.
                \hit Each target takes $damage $damagetypes damage.
            ".to_string(),
            is_magical: false,
            name: strike_prefix("Armorcrusher", &weapon),
            tags: vec![],
            weapon,
        };
    }

    pub fn armorpiercer(weapon: Weapon) -> Self {
        return Self {
            effect: r"
                The $name makes a $accuracy \glossterm{weak strike} vs. Reflex with its $weapon.
                \hit Each target takes $damage $damagetypes damage.
            ".to_string(),
            is_magical: false,
            name: strike_prefix("Armorpiercer", &weapon),
            tags: vec![],
            weapon,
        };
    }

    pub fn bloodletting_strike(weapon: Weapon) -> Self {
        return Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                Each damaged creature bleeds if this attack beats its Fortitude defense.
                A bleeding creature takes $dr0 slashing damage during the $name's next action.
                \hit Each target takes $damage $damagetypes damage.
            ".to_string(),
            is_magical: false,
            name: strike_prefix("Bloodletting Strike", &weapon),
            tags: vec![],
            weapon,
        };
    }

    pub fn consecrated_strike(rank: i32, weapon: Weapon) -> Self {
        return Self {
            effect: format!(
                "
                    The $name makes a $accuracy+{accuracy_modifier} strike vs. Armor with its $weapon.
                    In addition, it \\glossterm<briefly> gains a +2 bonus to its Mental defense.
                    \\hit Each target takes $damage $damagetypes damage.
                ",
                accuracy_modifier = rank - 1,
            ),
            is_magical: true,
            name: strike_prefix("Consecrated Strike", &weapon),
            tags: vec![],
            weapon,
        };
    }

    pub fn defensive_strike(weapon: Weapon) -> Self {
        return Self {
            effect: r"
                The $name makes a $accuracy \glossterm{weak strike} vs. Armor with its $weapon.
                In addition, it gains a +1 bonus to its Armor and Reflex defenses as a \abilitytag<Swift> effect.
                \hit Each target takes $damage $damagetypes damage.
            ".to_string(),
            is_magical: true,
            name: strike_prefix("Defensive Strike", &weapon),
            tags: vec![],
            weapon,
        };
    }

    pub fn distant_shot(weapon: Weapon) -> Self {
        return Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                It reduces its \glossterm{longshot penalty} with the strike by 4.
                \hit Each target takes $damage $damagetypes damage.
            ".to_string(),
            is_magical: true,
            name: strike_prefix("Distant Shot", &weapon),
            tags: vec![],
            weapon,
        };
    }

    // Must be melee-only
    pub fn frenzied_strike(weapon: Weapon) -> Self {
        return Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                For each previous consecutive round in which it used this ability, it gains a +2 accuracy bonus with the strike, up to a maximum of +4.
                \hit Each target takes $damage $damagetypes damage.
            ".to_string(),
            is_magical: true,
            name: strike_prefix("Frenzied Strike", &weapon),
            tags: vec![],
            weapon,
        };
    }

    pub fn guardbreaker(weapon: Weapon) -> Self {
        return Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                In addition, it chooses one of its allies.
                Each creature damaged by the strike takes a -2 penalty to all defenses against that ally's attacks this round.
                \hit Each target takes $damage $damagetypes damage.
            ".to_string(),
            is_magical: true,
            name: strike_prefix("Guardbreaker", &weapon),
            tags: vec![],
            weapon,
        };
    }

    pub fn hamstring(weapon: Weapon) -> Self {
        return Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                Each creature that loses hit points from the strike is \slowed as a \glossterm{condition}.
                \hit Each target takes $damage $damagetypes damage.
            ".to_string(),
            is_magical: true,
            name: strike_prefix("Hamstring", &weapon),
            tags: vec![],
            weapon,
        };
    }

    pub fn heartpiercer(weapon: Weapon) -> Self {
        return Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its {weapon}.
                It gains a +3 accuracy bonus with the strike for the purpose of determining whether it gets a \\glossterm<critical hit>.
                \hit Each target takes $damage $damagetypes damage.
                \glance No effect.
            ".to_string(),
            is_magical: false,
            name: strike_prefix("Heartpiercer", &weapon),
            tags: vec![],
            weapon,
        };
    }

    pub fn power_strike(weapon: Weapon) -> Self {
        return Self {
            effect: r"
                The $name makes a $accuracy-3 strike vs. Armor with its $weapon.
                \hit Each target takes $damage*2 $damagetypes damage.
            ".to_string(),
            is_magical: true,
            name: strike_prefix("Power Strike", &weapon),
            tags: vec![],
            weapon,
        };
    }

    pub fn reckless_strike(weapon: Weapon) -> Self {
        return Self {
            effect: r"
                The $name makes a $accuracy+2 strike vs. Armor with its $weapon.
                After making the attack, it briefly takes a -4 penalty to all defenses.
                \hit Each target takes $damage $damagetypes damage.
            ".to_string(),
            is_magical: false,
            name: strike_prefix("Reckless Strike", &weapon),
            tags: vec![],
            weapon,
        };
    }

    pub fn redeeming_followup(weapon: Weapon) -> Self {
        return Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                It gains a +2 accuracy bonus with this strike against each creature that it missed with a strike last round.
                \hit Each target takes $damage $damagetypes damage.
            ".to_string(),
            is_magical: false,
            name: strike_prefix("Redeeming Followup", &weapon),
            tags: vec![],
            weapon,
        };
    }

    pub fn normal_strike(weapon: Weapon) -> Self {
        return Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit Each target takes $damage $damagetypes.
            ".to_string(),
            is_magical: false,
            name: weapon.name.clone(),
            tags: vec![],
            weapon,
        };
    }

    pub fn dual_strike(weapon: Weapon) -> Self {
        return Self {
            effect: r"
                The $name makes two $accuracy strikes vs. Armor with its $weapons.
                \hit Each target takes $damage $damagetypes.
            ".to_string(),
            is_magical: false,
            name: weapon.name.clone(),
            tags: vec![],
            weapon,
        };
    }
}

fn strike_prefix(prefix: &str, weapon: &Weapon) -> String {
    return format!("{} -- {}", prefix, weapon.name);
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
    replaced_effect = replace_damage_type_terms(&replaced_effect, weapon);
    replaced_effect = replace_weapon_name_terms(&replaced_effect, &weapon); 

    return replaced_effect.to_string();
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
    let damage_pattern = Regex::new(r"\$damage(\*\d)?\b").unwrap();
    // $damage never has local modifiers, so we don't need to pay attention to the captured text
    for damage_match in damage_pattern.find_iter(&replaced_effect.clone()) {
        let parsed_text = calc_weapon_damage(damage_match, creature, is_magical, weapon.unwrap());
        replaced_effect = damage_pattern
            .replacen(&replaced_effect, 1, parsed_text)
            .to_string();
    }
    return replaced_effect;
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

    return replaced_effect;
}

fn replace_damage_type_terms(effect: &str, weapon: Option<&Weapon>) -> String {
    let mut replaced_effect = effect.to_string();

    let damage_type_pattern = Regex::new(r"\$damagetypes\b").unwrap();
    for _ in damage_type_pattern.find_iter(&replaced_effect.clone()) {
        // Unwrap the weapon here. If we found a $damagetypes match but we don't have a weapon,
        // crashing is appropriate.
        let damage_type_text = DamageType::format_damage_types(&weapon.unwrap().damage_types);
        replaced_effect = damage_type_pattern.replacen(&replaced_effect, 1, damage_type_text).to_string();
    }

    return replaced_effect;
}

fn replace_weapon_name_terms(effect: &str, weapon: &Option<&Weapon>) -> String {
    let mut replaced_effect = effect.to_string();

    // TODO: should we match "$weapons" with different behavior?
    let weapon_pattern = Regex::new(r"\$weapon").unwrap();
    for _ in weapon_pattern.find_iter(&replaced_effect.clone()) {
        // Unwrap the weapon here. If we found a $weapon match but we don't have a weapon,
        // crashing is appropriate.
        let weapon_name = &weapon.unwrap().name.to_lowercase();
        replaced_effect = weapon_pattern.replacen(&replaced_effect, 1, weapon_name).to_string();
    }

    return replaced_effect;
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
    return format!("{}{}", accuracy_sign, accuracy);
}

fn calc_weapon_damage(damage_match: Match, creature: &Creature, is_magical: bool, weapon: &Weapon) -> String {
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
        let ability = CustomAbility {
            ability_type: AbilityType::Normal,
            effect: "The $name glows like a torch for a minute.".to_string(),
            is_magical: true,
            name: "Torchlight".to_string(),
            tags: vec![
                AbilityTag::Compulsion,
                AbilityTag::Sustain(SustainAction::Minor),
            ],
            usage_time: UsageTime::Minor,
        };
        assert_multiline_eq(
            r"\begin<magicalactiveability>*<Torchlight>
                \abilitytag{Compulsion}, \abilitytag{Sustain} (minor)
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
        fn replaces_doubled_broadsword_damage() {
            assert_eq!(
                "Deals 2d10 electricity damage",
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

        #[test]
        fn replaces_tripled_greatsword_damage() {
            assert_eq!(
                "Deals 3d6+3d8 electricity damage",
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

    mod replace_damage_type_terms {
        use super::*;
        use crate::equipment::StandardWeapon;

        #[test]
        fn replaces_broadsword_types() {
            assert_eq!(
                "Deals some slashing damage",
                replace_damage_type_terms(
                    "Deals some $damagetypes damage",
                    Some(&StandardWeapon::Broadsword.weapon()),
                ),
            );
        }

        #[test]
        fn replaces_morning_star_types() {
            assert_eq!(
                "Deals some bludgeoning and piercing damage",
                replace_damage_type_terms(
                    "Deals some $damagetypes damage",
                    Some(&StandardWeapon::MorningStar.weapon()),
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
                    \hit Each target takes $damage $damagetypes damage.
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
