use super::latex::latex_ability_block;
use crate::core_mechanics::abilities::{AbilityTag, AbilityType, UsageTime};
use crate::core_mechanics::attacks::{DamageEffect, HasAttacks, SimpleDamageEffect};
use crate::core_mechanics::{DamageType, DicePool, PowerScaling};
use crate::creatures::Creature;
use crate::equipment::Weapon;
use regex::Match;
use regex::Regex;

#[derive(Clone, Debug)]
pub enum ActiveAbility {
    Custom(CustomAbility),
    Strike(StrikeAbility),
}

const CONDITION_CRIT: &str = r"
    \crit The condition must be removed an additional time before the effect ends.
";

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

    pub fn is_elite(&self) -> bool {
        match self {
            Self::Custom(c) => c.usage_time == UsageTime::Elite,
            Self::Strike(_) => false,
        }
    }

    pub fn plus_accuracy(self, modifier: i32) -> Self {
        match self {
            Self::Custom(c) => Self::Custom(c.plus_accuracy(modifier)),
            Self::Strike(s) => Self::Strike(s.plus_accuracy(modifier)),
        }
    }
}

#[derive(Clone, Debug, Default)]
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
    pub fn set_usage_time(mut self, usage_time: UsageTime) -> Self {
        self.usage_time = usage_time;

        self
    }

    pub fn except_elite(mut self) -> Self {
        self.usage_time = UsageTime::Elite;

        self
    }

    pub fn latex_ability_block(self, creature: &Creature) -> String {
        // We have to stringify the tags before sending them over
        let latex_tags: Vec<String> = self.tags.iter().map(|t| t.latex()).collect();

        // This function is used by both ActiveAbility and Attack, which explains the odd
        // duplication.
        latex_ability_block(
            self.ability_type,
            replace_attack_terms(&self.effect, creature, self.is_magical, None),
            latex_tags,
            self.is_magical,
            self.name,
            Some(self.usage_time),
        )
    }

    pub fn plus_accuracy(mut self, modifier: i32) -> Self {
        self.effect = add_accuracy_to_effect(modifier, &self.effect, &self.name);

        self
    }

    pub fn battle_command(rank: i32) -> Self {
        Self {
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
        }
    }

    // This is just Mystic Bolt with a specific common flavor
    pub fn divine_judgment(rank: i32) -> Self {
        Self {
            ability_type: AbilityType::Normal,
            effect: format!(
                "
                    The $name makes a $accuracy+{accuracy_modifier} attack vs. Mental against one creature within \\medrange.
                    \\hit $dr1 energy damage.
                ",
                accuracy_modifier = rank - 1,
            ),
            is_magical: true,
            name: "Divine Judgment".to_string(),
            tags: vec![],
            usage_time: UsageTime::Standard,
        }
    }

    pub fn enrage(rank: i32) -> Self {
        Self {
            ability_type: AbilityType::Normal,
            effect: format!(
                "
                    The $name makes a $accuracy+{accuracy_modifier} attack vs. Mental against one creature within \\medrange.
                    \\hit The target is \\debuff<enraged> as a \\glossterm<condition>.
                    Every round, it must spend a \\glossterm<standard action> to make an attack.
                ",
                // +2 base modifier, plus normal rank scaling
                accuracy_modifier = 2 + (rank - 1),
            ),
            is_magical: true,
            name: "Enrage".to_string(),
            tags: vec![AbilityTag::Emotion],
            usage_time: UsageTime::Standard,
        }
    }

    pub fn heed_the_dark_call(rank: i32) -> Self {
        Self {
            ability_type: AbilityType::Normal,
            effect: format!(
                "
                    The $name makes a $accuracy+{accuracy_modifier} attack vs. Mental against one creature within \\medrange.
                    It gains a +4 accuracy bonus if the target is \\glossterm<shadowed>.
                    \\hit The target feels the call of darkness as a \\glossterm<condition>.
                    While it is below its maximum \\glossterm<hit points>, it is \\frightened by the $name.
                    {condition_crit}
                ",
                accuracy_modifier = rank - 1,
                condition_crit = CONDITION_CRIT,
            ),
            is_magical: false,
            name: "Heed the Dark Call".to_string(),
            tags: vec![],
            usage_time: UsageTime::Standard,
        }
    }

    pub fn inflict_wound(rank: i32) -> Self {
        Self {
            ability_type: AbilityType::Normal,
            effect: format!(
                "
                    The $name makes a $accuracy+{accuracy_modifier} attack vs. Fortitude against one living creature within \\shortrange.
                    \\hit $dr1 energy damage.
                    If the target loses hit points from this damage, it takes the damage again.
                ",
                accuracy_modifier = rank - 2,
            ),
            is_magical: true,
            name: "Inflict Wound".to_string(),
            tags: vec![],
            usage_time: UsageTime::Standard,
        }
    }

    pub fn mind_blank(rank: i32) -> Self {
        Self {
            ability_type: AbilityType::Normal,
            effect: format!(
                "
                    The $name makes a $accuracy+{accuracy_modifier} attack vs. Mental against one creature within \\medrange.
                    \\hit If the target has no remaining \\glossterm<damage resistance>, it is compelled to spend its next \\glossterm<standard action> doing nothing at all.
                    After it takes this standard action, it becomes \\trait<immune> to this effect until it finishes a \\glossterm<short rest>.
                ",
                accuracy_modifier = rank - 1,
            ),
            is_magical: true,
            name: "Mind Blank".to_string(),
            tags: vec![AbilityTag::Compulsion],
            usage_time: UsageTime::Standard,
        }
    }

    // The Enchantment version of Mystic Bolt
    pub fn mind_blast(rank: i32) -> Self {
        Self {
            ability_type: AbilityType::Normal,
            effect: format!(
                "
                    The $name makes a $accuracy+{accuracy_modifier} attack vs. Mental against one creature within \\medrange.
                    \\hit The target takes $dr1 psychic \\glossterm<subdual damage>.
                ",
                accuracy_modifier = rank - 1,
            ),
            is_magical: true,
            name: "Mind Blast".to_string(),
            tags: vec![],
            usage_time: UsageTime::Standard,
        }
    }

    pub fn stabilize_life(rank: i32) -> Self {
        Self {
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
        }
    }

    pub fn shove() -> Self {
        Self {
            effect: format!(
                "
                    The $name makes a $brawlingaccuracy attack to shove foes.
                    For details, see \\pcref<Shove>.
                ",
            ),
            name: "Shove".to_string(),
            ..Default::default()
        }
    }

    pub fn true_strike(rank: i32) -> Self {
        Self {
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
        }
    }
}

#[derive(Clone, Debug, Default)]
pub struct StrikeAbility {
    pub effect: String,
    pub is_magical: bool,
    pub name: String,
    pub tags: Vec<AbilityTag>,
    pub usage_time: UsageTime,
    pub weapon: Weapon,
}

impl StrikeAbility {
    // Some monsters take standard maneuvers and use them as elite actions.
    pub fn except_elite(mut self) -> Self {
        self.usage_time = UsageTime::Elite;

        self
    }

    pub fn latex_ability_block(mut self, creature: &Creature) -> String {
        // We have to stringify the tags before sending them over
        let mut latex_tags: Vec<String> = self.tags.iter().map(|t| t.latex()).collect();
        // Add the tags from the weapon
        for tag in self.weapon.tags.iter() {
            if tag.visible_in_monster_tags() {
                latex_tags.push(tag.latex());
            }
        }
        // If the creature is massive, add the appropriate tag and add a "glance on miss"
        // effect.
        if let Some(tag) = creature.size.massive_weapon_tag() {
            // TODO: remove Sweeping if it exists
            latex_tags.push(tag.latex());
            if !self.effect.contains(r"\miss") {
                self.effect.push_str(
                    r"
                    \miss Half damage.
                ",
                );
            }
        }

        // TODO: does this sort by the visible tag name, or does it put all \\abilitytag
        // entries before all \\weapontag entries?
        latex_tags.sort();

        // This function is used by both ActiveAbility and Attack, which explains the odd
        // duplication.
        latex_ability_block(
            AbilityType::Normal,
            replace_attack_terms(&self.effect, creature, self.is_magical, Some(&self.weapon)),
            latex_tags,
            self.is_magical,
            self.name,
            Some(self.usage_time),
        )
    }

    pub fn plus_accuracy(mut self, modifier: i32) -> Self {
        self.effect = add_accuracy_to_effect(modifier, &self.effect, &self.name);

        self
    }

    pub fn armorcrusher(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy \glossterm{weak strike} vs. Fortitude with its $weapon.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Armorcrushing", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn armorpiercer(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy \glossterm{weak strike} vs. Reflex with its $weapon.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Armorpiercing", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn bloodletting_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                Each damaged creature bleeds if this attack beats its Fortitude defense.
                A bleeding creature takes $dr0 slashing damage during the $name's next action.
                \hit $damage $damagetypes damage.
            "
            .to_string(),
            name: strike_prefix("Bloodletting", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn consecrated_strike(rank: i32, weapon: Weapon) -> Self {
        Self {
            effect: format!(
                "
                    The $name makes a $accuracy+{accuracy_modifier} strike vs. Armor with its $weapon.
                    In addition, it \\glossterm<briefly> gains a +2 bonus to its Mental defense.
                    \\hit $damage $damagetypes damage.
                ",
                accuracy_modifier = rank - 1,
            ),
            is_magical: true,
            name: strike_prefix("Consecrated", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn defensive_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy \glossterm{weak strike} vs. Armor with its $weapon.
                In addition, it gains a +1 bonus to its Armor and Reflex defenses as a \abilitytag<Swift> effect.
                \hit $damage $damagetypes damage.
            ".to_string(),
            name: strike_prefix("Defensive", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn distant_shot(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                It reduces its \glossterm{longshot penalty} with the strike by 4.
                \hit $damage $damagetypes damage.
            "
            .to_string(),
            name: strike_prefix("Distant", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn enraging_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $damage $damagetypes.
                If the target loses hit points, it is \debuff{enraged} as a \glossterm{condition}.
                Every round, it must spend a \glossterm{standard action} to make an attack.
            "
            .to_string(),
            name: strike_prefix("Enraging", &weapon),
            weapon,
            ..Default::default()
        }
    }

    // Must be melee-only
    pub fn frenzied_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                For each previous consecutive round in which it used this ability, it gains a +2 accuracy bonus with the strike, up to a maximum of +4.
                \hit $damage $damagetypes damage.
            ".to_string(),
            name: strike_prefix("Frenzied", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn guardbreaker(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                In addition, it chooses one of its allies.
                Each creature damaged by the strike takes a -2 penalty to all defenses against that ally's attacks this round.
                \hit $damage $damagetypes damage.
            ".to_string(),
            name: strike_prefix("Guardbreaking", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn hamstring(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                Each creature that loses hit points from the strike is \slowed as a \glossterm{condition}.
                \hit $damage $damagetypes damage.
            ".to_string(),
            name: strike_prefix("Hamstring --", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn heartpiercer(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its {weapon}.
                It gains a +3 accuracy bonus with the strike for the purpose of determining whether it gets a \glossterm<critical hit>.
                \hit $damage $damagetypes damage.
                \glance No effect.
            ".to_string(),
            name: strike_prefix("Heartpiercing", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn power_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy-3 strike vs. Armor with its $weapon.
                \hit $damage*2 $damagetypes damage.
            "
            .to_string(),
            name: strike_prefix("Power", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn reckless_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy+2 strike vs. Armor with its $weapon.
                After making the attack, it briefly takes a -4 penalty to all defenses.
                \hit $damage $damagetypes damage.
            "
            .to_string(),
            name: strike_prefix("Reckless", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn redeeming_followup(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                It gains a +2 accuracy bonus with this strike against each creature that it missed with a strike last round.
                \hit $damage $damagetypes damage.
            ".to_string(),
            name: strike_prefix("Redeeming", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn rushed_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy-1 strike vs. Armor with its $weapon.
                It can also move up to half its speed either before or after making the strike.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Rushed", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn rushed_strike_plus(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy-2 strike vs. Armor with its $weapon.
                It can also move up to its speed either before or after making the strike.
                \hit $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Rushed", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn normal_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $damage $damagetypes.
            "
            .to_string(),
            name: weapon.name.clone(),
            weapon,
            ..Default::default()
        }
    }

    // Note that this ignores any accuracy penalty from non-Light weapons or a low Dex.
    pub fn dual_strike(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes two $accuracy strikes vs. Armor with its $weapons.
                \hit $damage $damagetypes.
            "
            .to_string(),
            name: weapon.name.clone(),
            weapon,
            ..Default::default()
        }
    }

    pub fn knockdown(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $fullweapondamage.
                If the target loses hit points, it falls \prone.
                This is a \abilitytag{Size-Based} effect.
            "
            .to_string(),
            name: strike_prefix("Knockdown --", &weapon),
            weapon,
            ..Default::default()
        }
    }

    pub fn knockdown_plus(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy strike vs. Armor with its $weapon.
                \hit $fullweapondamage.
                If the target takes damage, it falls \prone.
                This is a \abilitytag{Size-Based} effect.
            "
            .to_string(),
            name: strike_prefix("Knockdown --", &weapon),
            weapon,
            ..Default::default()
        }
    }

    // If you're treating trip as a strike ability, it's because you're using it with a weapon.
    // Non-weapon trips are under CustomAbility.
    pub fn trip(weapon: Weapon) -> Self {
        Self {
            effect: r"
                The $name makes a $accuracy melee attack vs. Fortitude and Reflex with its $weapon.
                \hit The target becomes \prone.
                If the attack also beat the target's Armor defense, the $name deals it $fullweapondamage.
            "
            .to_string(),
            name: strike_prefix("Trip --", &weapon),
            tags: vec![AbilityTag::SizeBased],
            weapon,
            ..Default::default()
        }
    }
}

fn strike_prefix(prefix: &str, weapon: &Weapon) -> String {
    format!("{} {}", prefix, weapon.name)
}

pub fn replace_attack_terms(
    effect: &str,
    creature: &Creature,
    is_magical: bool,
    weapon: Option<&Weapon>,
) -> String {
    let mut replaced_effect = effect.to_string();

    // Generally, $fullweapondamage is the easiest way to indicate strike damage. However, the
    // individual $damage and $damagetypes terms are avaiable to make it easier to write
    // special weapon effects.
    replaced_effect = replace_full_weapon_damage_terms(&replaced_effect);
    replaced_effect = replace_accuracy_terms(&replaced_effect, creature, weapon);
    replaced_effect = replace_brawling_accuracy_terms(&replaced_effect, creature);
    replaced_effect = replace_damage_terms(&replaced_effect, creature, is_magical, weapon);
    replaced_effect = replace_damage_rank_terms(&replaced_effect, creature, is_magical);
    replaced_effect = replace_damage_type_terms(&replaced_effect, weapon);
    replaced_effect = replace_weapon_name_terms(&replaced_effect, &weapon);
    replaced_effect = replace_extra_damage_terms(&replaced_effect, creature, is_magical);

    replaced_effect.to_string()
}

fn replace_full_weapon_damage_terms(effect: &str) -> String {
    let full_weapon_damage_pattern = Regex::new(r"\$fullweapondamage").unwrap();
    return full_weapon_damage_pattern
        .replace_all(effect, "$$damage $$damagetypes damage")
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

fn replace_damage_type_terms(effect: &str, weapon: Option<&Weapon>) -> String {
    let mut replaced_effect = effect.to_string();

    let damage_type_pattern = Regex::new(r"\$damagetypes\b").unwrap();
    for _ in damage_type_pattern.find_iter(&replaced_effect.clone()) {
        // Unwrap the weapon here. If we found a $damagetypes match but we don't have a weapon,
        // crashing is appropriate.
        let damage_type_text = DamageType::format_damage_types(&weapon.unwrap().damage_types);
        replaced_effect = damage_type_pattern
            .replacen(&replaced_effect, 1, damage_type_text)
            .to_string();
    }

    replaced_effect
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
            damage_types: vec![],
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

fn add_accuracy_to_effect(modifier: i32, effect: &str, name: &str) -> String {
    let mut replaced_effect = effect.to_string();
    let mut replaced_accuracy = false;

    let accuracy_pattern = Regex::new(r"\$(brawlingaccuracy|accuracy)([+-]?)(\d*)\b").unwrap();
    for (_, [accuracy_type, modifier_sign, existing_modifier]) in
        accuracy_pattern.captures_iter(effect).map(|c| c.extract())
    {
        let existing_modifier_abs = existing_modifier.parse::<i32>().unwrap_or(0);
        let existing_modifier_value = if modifier_sign == "-" {
            -existing_modifier_abs
        } else {
            existing_modifier_abs
        };

        let new_modifier_value = existing_modifier_value + modifier;
        let new_modifier_sign = if new_modifier_value > 0 { "+" } else { "" };
        let new_modifier_text = if new_modifier_value == 0 {
            "".to_string()
        } else {
            new_modifier_value.to_string()
        };

        replaced_effect = accuracy_pattern
            .replacen(
                &replaced_effect,
                1,
                format!(
                    "$${accuracy_type}{sign}{value}",
                    accuracy_type = accuracy_type,
                    sign = new_modifier_sign,
                    value = new_modifier_text,
                ),
            )
            .to_string();

        if replaced_accuracy {
            panic!(
                "Cannot add accuracy to ability {}: more than one $accuracy present",
                name
            );
        } else {
            replaced_accuracy = true;
        }
    }
    // If there was no accuracy to replace, something has gone wrong.
    if !replaced_accuracy {
        panic!(
            "Cannot add accuracy to ability {}: no $accuracy to replace",
            name
        );
    }
    replaced_effect
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::core_mechanics::abilities::SustainAction;
    use crate::creatures::CreatureCategory;
    use crate::testing::assert_multiline_eq;

    fn sample_creature() -> Creature {
        Creature::new(10, CreatureCategory::Character)
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

    mod replace_full_weapon_damage_terms {
        use super::*;

        #[test]
        fn replaces_one_term() {
            assert_eq!(
                "takes $damage $damagetypes damage.",
                replace_full_weapon_damage_terms("takes $fullweapondamage."),
            );
        }

        #[test]
        fn replaces_two_terms() {
            assert_eq!(
                "takes $damage $damagetypes damage and $damage $damagetypes damage.",
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
        use crate::equipment::StandardWeapon;

        #[test]
        fn replaces_mind_crush() {
            assert_multiline_eq(
                // dr4 is 1d8 + (1d8 per 4 power)
                r"
                    The $name makes a +5 attack vs. Mental against one creature within \medrange.
                    \hit 2d8 psychic damage.
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
                    \hit 1d6+1d8 bludgeoning damage.
                    Each creature that loses hit points from this damage is poisoned by aboleth slime.

                    Aboleth slime is an injury-based liquid poison (see \pcref{Poison}).
                    The poison's accuracy is +7.
                    Its stage 1 effect makes the target \slowed while the poison lasts.
                    Its stage 3 effect makes the target dissolve into an sludgelike mass while the poison lasts, as the \textit{sludgeform} spell.
                ",
                replace_attack_terms(
                    r"
                    The $name makes a $accuracy melee strike with a tentacle.
                    \hit $damage $damagetypes damage.
                    Each creature that loses hit points from this damage is poisoned by aboleth slime.

                    Aboleth slime is an injury-based liquid poison (see \pcref{Poison}).
                    The poison's accuracy is $accuracy+2.
                    Its stage 1 effect makes the target \slowed while the poison lasts.
                    Its stage 3 effect makes the target dissolve into an sludgelike mass while the poison lasts, as the \textit{sludgeform} spell.
                ",
                    &sample_creature(),
                    false,
                    Some(&StandardWeapon::MultipedalRam.weapon()),
                ),
            );
        }
    }

    mod add_accuracy_to_effect {
        use super::*;

        #[test]
        fn can_add_new_modifier() {
            assert_eq!(
                "Attack with $accuracy+1 accuracy",
                add_accuracy_to_effect(1, "Attack with $accuracy accuracy", "arbitrary name")
            );
        }

        #[test]
        fn can_increase_existing_modifier() {
            assert_eq!(
                "Attack with $accuracy+3 accuracy",
                add_accuracy_to_effect(2, "Attack with $accuracy+1 accuracy", "arbitrary name")
            );
        }

        #[test]
        fn can_decrease_existing_modifier() {
            assert_eq!(
                "Attack with $accuracy+1 accuracy",
                add_accuracy_to_effect(-2, "Attack with $accuracy+3 accuracy", "arbitrary name")
            );
        }

        #[test]
        fn can_flip_existing_modifier_sign() {
            assert_eq!(
                "Attack with $accuracy-2 accuracy",
                add_accuracy_to_effect(-4, "Attack with $accuracy+2 accuracy", "arbitrary name")
            );
        }

        #[test]
        fn can_add_new_modifier_to_brawling() {
            assert_eq!(
                "Attack with $brawlingaccuracy+1 accuracy",
                add_accuracy_to_effect(1, "Attack with $brawlingaccuracy accuracy", "arbitrary name")
            );
        }
    }
}
