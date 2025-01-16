use crate::core_mechanics::StandardPassiveAbility;
use crate::creatures::{Creature, HasModifiers, Modifier, Monster};
use serde::Serialize;
use std::cmp::max;

#[derive(Copy, Clone, Debug, PartialEq, Serialize)]
pub enum ChallengeRating {
    One,
    Four,
}

impl ChallengeRating {
    pub fn all() -> Vec<Self> {
        vec![Self::One, Self::Four]
    }

    pub fn add_modifiers(&self, creature: &mut Creature) {
        // Elites used to have an intrinsic accuracy bonus. Maybe they should? Needs more testing.
        // creature.add_modifier(
        //     Modifier::Accuracy(self.accuracy_bonus()),
        //     Some("challenge rating"),
        //     None,
        // );
        creature.add_modifier(
            Modifier::AllDefenses(self.defense_bonus(creature.level)),
            Some("challenge rating"),
            None,
        );
        creature.add_modifier(
            Modifier::Power(self.power_bonus()),
            Some("challenge rating"),
            None,
        );
        if self == &ChallengeRating::Four {
            creature
                .passive_abilities
                .push(StandardPassiveAbility::EliteActions.ability());
            // TODO: figure out whether this should scale with level
            creature
                .passive_abilities
                .push(StandardPassiveAbility::ConditionRemoval.ability());
        }
    }

    pub fn max_base_attribute(&self) -> i32 {
        match self {
            Self::One => 4,
            Self::Four => 6,
        }
    }

    // CR 4+ monsters should be taking multiple actions per round, so their damage
    // is higher than it would appear based purely on their damage dice.
    pub fn damage_per_round_multiplier(&self) -> f64 {
        match self {
            Self::One => 1.0,
            Self::Four => 2.0,
        }
    }

    pub fn elite(&self) -> bool {
        match self {
            Self::One => false,
            Self::Four => true,
        }
    }

    pub fn defense_bonus(&self, level: i32) -> i32 {
        match self {
            Self::One => 0,
            Self::Four => {
                let levels_with_defense_bonuses = vec![8, 14];
                let mut defense_modifier = 2;
                for &bonus_level in levels_with_defense_bonuses.iter() {
                    if level >= bonus_level {
                        defense_modifier += 1;
                    }
                }
                
                defense_modifier
            },
        }
    }

    pub fn power_bonus(&self) -> i32 {
        match self {
            Self::One => 0,
            Self::Four => 2,
        }
    }

    // PCs have effectively 2x their base DR because of the Recover mechanic.
    // Normal monsters don't factor this in, so their DR relative to HP is lower than PCs.
    // Elite monsters have a multiplier to compensate for this.
    pub fn dr_multiplier(&self) -> f64 {
        match self {
            Self::One => 1.0,
            Self::Four => 4.0,
        }
    }

    pub fn hp_multiplier(&self) -> f64 {
        match self {
            Self::One => 1.0,
            Self::Four => 3.0,
        }
    }

    pub fn from_string(text: String) -> Self {
        match text.as_str() {
            "1" => ChallengeRating::One,
            "4" => ChallengeRating::Four,
            _ => panic!("Invalid challenge rating '{}'", text),
        }
    }

    pub fn to_string(&self) -> &str {
        match self {
            ChallengeRating::One => "1",
            ChallengeRating::Four => "4",
        }
    }

    pub fn difficult_encounter(level: i32, count: i32) -> Vec<Creature> {
        fn standard(l: i32) -> Creature {
            let mut monster = Monster::standard_example_monster(max(l, 1));
            monster.add_magical_attack();
            monster.creature
        }

        fn elite(l: i32) -> Creature {
            let mut monster = Monster::elite_example_monster(max(l, 1));
            monster.add_magical_attack();
            monster.creature
        }

        match count {
            1 => vec![elite(level + 3)],
            2 => vec![
                elite(level),
                standard(level + 3),
            ],
            3 => vec![
                elite(level),
                standard(level),
                standard(level),
            ],
            4 => vec![
                standard(level + 3),
                standard(level + 3),
                standard(level),
                standard(level),
            ],
            5 => vec![
                standard(level + 3),
                standard(level),
                standard(level),
                standard(level),
                standard(level),
            ],
            6 => vec![
                standard(level),
                standard(level),
                standard(level),
                standard(level),
                standard(level),
                standard(level),
            ],
            7 => vec![
                standard(level),
                standard(level),
                standard(level),
                standard(level),
                standard(level),
                standard(level - 3),
                standard(level - 3),
            ],
            8 => vec![
                standard(level),
                standard(level),
                standard(level),
                standard(level),
                standard(level - 3),
                standard(level - 3),
                standard(level - 3),
                standard(level - 3),
            ],
            _ => panic!("Invalid monster count {}", count),
        }
    }

    pub fn standard_encounter(level: i32, count: i32) -> Vec<Creature> {
        fn standard(l: i32) -> Creature {
            let mut monster = Monster::standard_example_monster(max(l, 1));
            monster.add_magical_attack();
            monster.creature
        }

        fn elite(l: i32) -> Creature {
            let mut monster = Monster::elite_example_monster(max(l, 1));
            monster.add_magical_attack();
            monster.creature
        }

        match count {
            1 => vec![elite(level)],
            2 => vec![
                standard(level + 3),
                standard(level + 3),
            ],
            3 => vec![
                standard(level + 3),
                standard(level),
                standard(level),
            ],
            4 => vec![
                standard(level),
                standard(level),
                standard(level),
                standard(level),
            ],
            5 => vec![
                standard(level),
                standard(level),
                standard(level),
                standard(level - 3),
                standard(level - 3),
            ],
            6 => vec![
                standard(level),
                standard(level),
                standard(level - 3),
                standard(level - 3),
                standard(level - 3),
                standard(level - 3),
            ],
            7 => vec![
                standard(level),
                standard(level - 3),
                standard(level - 3),
                standard(level - 3),
                standard(level - 3),
                standard(level - 3),
                standard(level - 3),
            ],
            8 => vec![
                standard(level - 3),
                standard(level - 3),
                standard(level - 3),
                standard(level - 3),
                standard(level - 3),
                standard(level - 3),
                standard(level - 3),
                standard(level - 3),
            ],
            _ => panic!("Invalid monster count {}", count),
        }
    }
}
