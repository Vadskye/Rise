use super::add_accuracy_to_effect::add_accuracy_to_effect;
use super::replace_attack_terms::replace_attack_terms;
use crate::core_mechanics::abilities::{latex_ability_block, AbilityTag, AbilityType, UsageTime};
use crate::creatures::Creature;

const CONDITION_CRIT: &str = r"
    \crit The condition must be removed an additional time before the effect ends.
";

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
    pub fn validate(&self) {
        let warn = |message| {
            eprintln!("CustomAbility {} {}", self.name, message);
        };

        if self.name.contains("Breath") && !self.effect.contains("cannot use it again") {
            warn("should have a cooldown because it is a breath attack");
        }
    }

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
                    \\hit The target is \\enraged as a \\glossterm<condition>.
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
                rank = rank + 1,
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
\par \noindent Usage: Minor action.
                \rankline
                The $name glows like a torch for a minute.
            \end<magicalactiveability>",
            ability
                .latex_ability_block(&sample_creature())
                .trim()
                .to_string(),
        );
    }
}
