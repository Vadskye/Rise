use super::add_accuracy_to_effect::add_accuracy_to_effect;
use super::replace_attack_terms::replace_attack_terms;
use crate::core_mechanics::abilities::{latex_ability_block, AbilityTag, AbilityType, UsageTime};
use crate::creatures::Creature;

const CONDITION_CRIT: &str = r"
    \crit The condition must be removed an additional time before the effect ends.
";
const IMMUNITY_CRIT: &str = r"
    \crit The target does not become immune to this effect.
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
            effect: "
                The $name makes a $accuracy attack vs. Mental against one creature within \\medrange.
                \\hit $dr1 energy damage.
            ".to_string(),
            is_magical: true,
            name: "Divine Judgment".to_string(),
            tags: vec![],
            usage_time: UsageTime::Standard,
        }.plus_accuracy(rank - 1)
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

    // Like Mind Blank, but slightly different flavor
    pub fn demand_obeisance(rank: i32) -> Self {
        Self {
            effect: format!("
                The $name makes a $accuracy attack vs. Mental against one creature within \\medrange.
                \\hit If the target has no remaining damage resistance, it is compelled to spend its next standard action doing nothing but groveling before the $name.
                After it takes this standard action, it becomes \\trait<immune> to this effect until it finishes a \\glossterm<short rest>.
                {IMMUNITY_CRIT}
            "),
            is_magical: true,
            name: "Demand Obeisance".to_string(),
            tags: vec![AbilityTag::Compulsion],
            ..Default::default()
        }.plus_accuracy(rank - 1)
    }

    pub fn terrifying_shout(rank: i32) -> Self {
        Self {
            effect: format!("
                The $name makes a $accuracy attack vs. Mental against one creature within \\medrange.
                \\hit The target is \\frightened of the $name as a condition.
                {CONDITION_CRIT}
            "),
            is_magical: true,
            name: "Terrifying Shout".to_string(),
            tags: vec![AbilityTag::Emotion],
            ..Default::default()
        }.plus_accuracy(rank - 3)
    }
}

// Enchantment
impl CustomAbility {
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
}

// Terramancy
impl CustomAbility {
    pub fn earthbind(rank: i32) -> Self {
        Self {
            effect: format!("
                The $name makes a $accuracy attack vs. Fortitude against one creature within \\medrange that is no more than 60 feet above a stable surface that could support its weight.
                It gains a +2 \\glossterm<accuracy> bonus if it is \\glossterm<grounded> on stone.
                \\hit As a \\glossterm<condition>, the target is pulled towards the ground with great force, approximately doubling the gravity it experiences.
                It is unable to use any fly speed or glide speed, and its jump distance is halved.
                All \\glossterm<falling damage> that it takes is doubled.
                Standing up while \\prone costs its full speed rather than only half its speed.
                {CONDITION_CRIT}
            "),
            is_magical: true,
            name: "Earthbind".to_string(),
            ..Default::default()
        }.plus_accuracy(rank - 3)
    }

    pub fn quagmire(rank: i32) -> Self {
        Self {
            ability_type: AbilityType::Sustain("Minor".to_string()),
            effect: format!("
                The $name chooses a \\{areasize} radius \\glossterm<zone> within \\medrange.
                All earth and stone in the area is softened into a thick sludge, creating a quagmire that is difficult to move through.
                The area becomes \\glossterm<difficult terrain>.

                This does not affect objects under structural stress, such as walls and support columns.
                Affected objects retain their own fundamental structural integrity and do not blend with other objects.
                When the spell ends, affected objects regain their original shape, suffering no damage from their time spent softened.
            ", areasize = if rank >= 6 { "medarea" } else { "smallarea" }),
            is_magical: true,
            name: "Quagmire".to_string(),
            ..Default::default()
        }
    }

    pub fn tremor(rank: i32) -> Self {
        Self {
            effect: "
                The earth shakes in a \\medarea radius \\glossterm{zone} around the $name.
                When it uses this ability, and during its next action, it makes a $accuracy attack vs. Reflex against everything in the area that is \\glossterm{grounded}.
                \\hit $dr1 bludgeoning damage.
                \\miss Half damage.
            ".to_string(),
            is_magical: true,
            name: "Tremor".to_string(),
            ..Default::default()
        }.plus_accuracy(rank - 3)
    }
}

// Thaumaturgy
impl CustomAbility {
    pub fn magic_missile(rank: i32) -> Self {
        Self {
            effect: "
                The $name makes a $accuracy attack vs. Armor against anything within \\shortrange.
                This attack ignores \\glossterm{cover} and all \\glossterm{miss chances}.
                \\hit $dr1 energy damage.
                \\miss Half damage.
            "
            .to_string(),
            is_magical: true,
            name: "Magic Missile".to_string(),
            ..Default::default()
        }
        .plus_accuracy(rank - 1)
    }

    pub fn magic_missile_storm(rank: i32) -> Self {
        Self {
            effect: "
                The $name makes a $accuracy attack vs. Armor against anything within \\shortrange.
                This attack ignores \\glossterm{cover} and all \\glossterm{miss chances}.
                \\hit $dr1l energy damage.
                \\miss Half damage.
            "
            .to_string(),
            is_magical: true,
            name: "Magic Missile Storm".to_string(),
            ..Default::default()
        }
        .plus_accuracy(rank - 3)
    }

    pub fn reflect_magic() -> Self {
        Self {
            effect: "
                The $name gains a +2 bonus to all defenses this round.
                In addition, whenever a creature within \\medrange of it misses or \\glossterm{glances} it with a \\magical attack this round, that creature treats itself as a target of that strike in addition to any other targets.
                The attacker cannot choose to reduce its accuracy or damage against itself.
            ".to_string(),
            is_magical: true,
            name: "Reflect Magic".to_string(),
            tags: vec![AbilityTag::Swift],
            ..Default::default()
        }
    }
}

// Pyromancy
impl CustomAbility {
    pub fn burning_hands(rank: i32) -> Self {
        Self {
            effect: "
                The $name makes a $accuracy attack vs. Reflex against everything in a \\smallarea cone from it.
                \\hit $dr2 fire damage.
                \\miss Half damage.
            ".to_string(),
            is_magical: true,
            name: "Burning Hands".to_string(),
            ..Default::default()
        }.plus_accuracy(rank - 1)
    }

    pub fn fireball(rank: i32) -> Self {
        Self {
            effect: "
                The $name makes a $accuracy attack vs. Reflex against everything in a \\smallarea radius within \\medrange.
                \\hit $dr2h fire damage.
                \\miss Half damage.
            ".to_string(),
            is_magical: true,
            name: "Fireball".to_string(),
            ..Default::default()
        }.plus_accuracy(rank - 3)
    }

    pub fn flame_breath(rank: i32) -> Self {
        Self {
            effect: "
                The $name makes a $accuracy attack vs. Reflex against everything in a \\largearea cone from it.
                After it uses this ability, it \\glossterm{briefly} cannot use it again.
                \\hit $dr3h fire damage.
                \\miss Half damage.
            ".to_string(),
            is_magical: true,
            name: "Flame Breath".to_string(),
            ..Default::default()
        }.plus_accuracy(rank - 3)
    }

    pub fn ignition(rank: i32) -> Self {
        Self {
            effect: "
                The $name makes a $accuracy attack vs. Fortitude and Reflex against one creature within \\medrange.
                \\hit The target catches on fire as a \\glossterm{condition}.
                  It takes $dr1 fire damage immediately and during each of your subsequent actions.

                  The condition can be removed if the target makes a \\glossterm{difficulty value} 10 Dexterity check as a \\glossterm{movement} to put out the flames.
                  Dropping \\prone as part of this action gives a +5 bonus to this check.
                \\crit All damage from the condition is doubled, not just the initial damage.
            ".to_string(),
            is_magical: true,
            name: "Ignition".to_string(),
            ..Default::default()
        }.plus_accuracy(rank - 1)
    }
}

// Revelation
impl CustomAbility {
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

// Umbramancy
impl CustomAbility {
    pub fn heed_the_dark_call(rank: i32) -> Self {
        Self {
            ability_type: AbilityType::Normal,
            effect: format!(
                "
                    The $name makes a $accuracy+{accuracy_modifier} attack vs. Mental against one creature within \\medrange.
                    It gains a +4 accuracy bonus if the target is \\glossterm<shadowed>.
                    \\hit The target feels the call of darkness as a \\glossterm<condition>.
                    While it is below its maximum \\glossterm<hit points>, it is \\frightened by the $name.
                    {CONDITION_CRIT}
                ",
                accuracy_modifier = rank - 1,
            ),
            is_magical: false,
            name: "Heed the Dark Call".to_string(),
            tags: vec![],
            usage_time: UsageTime::Standard,
        }
    }
}

// Vivimancy
impl CustomAbility {
    pub fn inflict_wound(rank: i32) -> Self {
        Self {
            ability_type: AbilityType::Normal,
            effect: "
                The $name makes a $accuracy attack vs. Fortitude against one living creature within \\shortrange.
                \\hit $dr1 energy damage.
                If the target loses hit points from this damage, it takes the damage again.
            ".to_string(),
            is_magical: true,
            name: "Inflict Wound".to_string(),
            tags: vec![],
            usage_time: UsageTime::Standard,
        }.plus_accuracy(rank - 1)
    }

    pub fn restoration(rank: i32) -> Self {
        Self {
            ability_type: AbilityType::Normal,
            effect: format!(
                "
                    The $name, or one living \\glossterm<ally> within \\shortrange of it, regains $dr{rank} hit points and increases its fatigue level by one.
                ",
                rank = rank + 1,
            ),
            is_magical: true,
            name: "Restoration".to_string(),
            tags: vec![AbilityTag::Swift],
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
