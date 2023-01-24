use crate::creatures::{Creature, Monster};
use serde::Serialize;
use std::cmp::max;

#[derive(Copy, Clone, Debug, PartialEq, Serialize)]
pub enum ChallengeRating {
    Half,
    One,
    Four,
}

impl ChallengeRating {
    pub fn all() -> Vec<Self> {
        return vec![Self::One, Self::Four];
    }

    pub fn accuracy_bonus(&self) -> i32 {
        match self {
            Self::Half => 0,
            Self::One => 0,
            Self::Four => 2,
        }
    }

    pub fn damage_increments(&self) -> i32 {
        match self {
            Self::Half => 0,
            Self::One => 0,
            Self::Four => 0,
        }
    }

    pub fn max_base_attribute(&self) -> i32 {
        match self {
            Self::Half => 3,
            Self::One => 4,
            Self::Four => 6,
        }
    }

    // CR 4+ monsters should be taking multiple actions per round, so their damage
    // is higher than it would appear based purely on their damage dice.
    pub fn damage_per_round_multiplier(&self) -> f64 {
        match self {
            Self::Half => 1.0,
            Self::One => 1.0,
            Self::Four => 2.0,
        }
    }

    pub fn defense_bonus(&self) -> i32 {
        match self {
            Self::Half => 0,
            Self::One => 0,
            Self::Four => 2,
        }
    }

    // These values happen to have extremely good correlations with damage dice - don't
    // change this unless a bunch of system match changes!
    pub fn power_scaling_multiplier(&self) -> f64 {
        match self {
            Self::Half => 0.5,
            Self::One => 1.0,
            Self::Four => 1.0,
        }
    }

    pub fn rank_modifier(&self) -> i32 {
        match self {
            Self::Half => 0,
            Self::One => 0,
            Self::Four => 1,
        }
    }

    pub fn dr_multiplier(&self) -> f64 {
        match self {
            Self::Half => 0.0,
            Self::One => 2.0,
            Self::Four => 8.0,
        }
    }

    pub fn hp_multiplier(&self) -> f64 {
        match self {
            Self::Half => 1.0,
            Self::One => 1.0,
            Self::Four => 4.0,
        }
    }

    pub fn from_string(text: String) -> Self {
        match text.as_str() {
            "0.5" => ChallengeRating::Half,
            "1" => ChallengeRating::One,
            "4" => ChallengeRating::Four,
            _ => panic!("Invalid challenge rating '{}'", text),
        }
    }

    pub fn to_string(&self) -> &str {
        match self {
            ChallengeRating::Half => "0.5",
            ChallengeRating::One => "1",
            ChallengeRating::Four => "4",
        }
    }

    pub fn difficult_encounter(level: i32, count: i32) -> Vec<Creature> {
        fn sm(cr: ChallengeRating, l: i32) -> Creature {
            let mut monster = Monster::standard_monster(cr, max(l, 1), None, None);
            monster.add_magical_attack();
            return monster.creature;
        }

        match count {
            1 => vec![
                sm(ChallengeRating::Four, level + 3),
            ],
            2 => vec![
                sm(ChallengeRating::Four, level),
                sm(ChallengeRating::One, level + 3),
            ],
            3 => vec![
                sm(ChallengeRating::Four, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
            ],
            4 => vec![
                sm(ChallengeRating::One, level + 3),
                sm(ChallengeRating::One, level + 3),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
            ],
            5 => vec![
                sm(ChallengeRating::One, level + 3),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
            ],
            6 => vec![
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
            ],
            7 => vec![
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
            ],
            8 => vec![
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
            ],
            _ => panic!("Invalid monster count {}", count),
        }
    }

    pub fn standard_encounter(level: i32, count: i32) -> Vec<Creature> {
        fn sm(cr: ChallengeRating, l: i32) -> Creature {
            let mut monster = Monster::standard_monster(cr, max(l, 1), None, None);
            monster.add_magical_attack();
            return monster.creature;
        }

        match count {
            1 => vec![sm(ChallengeRating::Four, level)],
            2 => vec![
                sm(ChallengeRating::One, level + 3),
                sm(ChallengeRating::One, level + 3),
            ],
            3 => vec![
                sm(ChallengeRating::One, level + 3),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
            ],
            4 => vec![
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
            ],
            5 => vec![
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
            ],
            6 => vec![
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
            ],
            7 => vec![
                sm(ChallengeRating::One, level),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
            ],
            8 => vec![
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
                sm(ChallengeRating::One, level - 3),
            ],
            _ => panic!("Invalid monster count {}", count),
        }
    }
}
