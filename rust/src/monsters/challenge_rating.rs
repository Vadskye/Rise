use crate::creatures::{Creature, Monster};

#[derive(Copy, Clone, PartialEq)]
pub enum ChallengeRating {
    Half,
    One,
    Two,
    Four,
    Six,
}

impl ChallengeRating {
    pub fn all() -> Vec<Self> {
        return vec![Self::Half, Self::One, Self::Two, Self::Four, Self::Six];
    }

    pub fn accuracy_bonus(&self) -> i32 {
        match self {
            Self::Half => 0,
            Self::One => 0,
            Self::Two => 1,
            Self::Four => 2,
            Self::Six => 2,
        }
    }

    pub fn damage_increments(&self) -> i32 {
        match self {
            Self::Half => 0,
            Self::One => 0,
            Self::Two => 0,
            Self::Four => 0,
            Self::Six => 0,
        }
    }

    pub fn max_base_attribute(&self) -> i32 {
        match self {
            Self::Half => 3,
            Self::One => 4,
            Self::Two => 5,
            Self::Four => 6,
            Self::Six => 7,
        }
    }

    // CR 4+ monsters should be taking multiple actions per round, so their damage
    // is higher than it would appear based purely on their damage dice.
    pub fn damage_per_round_multiplier(&self) -> f64 {
        match self {
            Self::Half => 1.0,
            Self::One => 1.0,
            Self::Two => 1.0,
            Self::Four => 1.5,
            Self::Six => 2.0,
        }
    }

    pub fn defense_bonus(&self) -> i32 {
        match self {
            Self::Half => -1,
            Self::One => 0,
            Self::Two => 0,
            Self::Four => 1,
            Self::Six => 2,
        }
    }

    // These values happen to have extremely good correlations with damage dice - don't
    // change this unless a bunch of system match changes!
    pub fn power_scaling_multiplier(&self) -> f64 {
        match self {
            Self::Half => 0.5,
            Self::One => 1.0,
            Self::Two => 2.0,
            Self::Four => 2.0,
            Self::Six => 3.0,
        }
    }

    pub fn rank_modifier(&self) -> i32 {
        match self {
            Self::Half => -1,
            Self::One => 0,
            Self::Two => 0,
            Self::Four => 0,
            Self::Six => 1,
        }
    }

    pub fn dr_multiplier(&self) -> f64 {
        match self {
            Self::Half => 0.0,
            Self::One => 2.0,
            Self::Two => 4.0,
            Self::Four => 8.0,
            Self::Six => 12.0,
        }
    }

    pub fn hp_multiplier(&self) -> f64 {
        match self {
            Self::Half => 1.0,
            Self::One => 1.0,
            Self::Two => 3.0,
            Self::Four => 4.0,
            Self::Six => 6.0,
        }
    }

    pub fn from_string(text: String) -> Self {
        match text.as_str() {
            "0.5" => ChallengeRating::Half,
            "1" => ChallengeRating::One,
            "2" => ChallengeRating::Two,
            "4" => ChallengeRating::Four,
            "6" => ChallengeRating::Six,
            _ => panic!("Invalid challenge rating '{}'", text),
        }
    }

    pub fn to_string(&self) -> &str {
        match self {
            ChallengeRating::Half => "0.5",
            ChallengeRating::One => "1",
            ChallengeRating::Two => "2",
            ChallengeRating::Four => "4",
            ChallengeRating::Six => "6",
        }
    }

    pub fn standard_encounter(self, level: i32) -> Vec<Creature> {
        let creature = Monster::standard_monster(self, level, None, None).creature;
        match self {
            ChallengeRating::Half => vec![
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
            ],
            ChallengeRating::One => vec![
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
            ],
            ChallengeRating::Two => vec![creature.clone(), creature.clone()],
            ChallengeRating::Four => vec![creature.clone()],
            // This is too hard
            ChallengeRating::Six => vec![creature.clone()],
        }
    }

    pub fn difficult_encounter(self, level: i32) -> Vec<Creature> {
        let creature = Monster::standard_monster(self, level, None, None).creature;
        match self {
            ChallengeRating::Half => vec![
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
            ],
            ChallengeRating::One => vec![
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
                creature.clone(),
            ],
            ChallengeRating::Two => vec![creature.clone(), creature.clone(), creature.clone()],
            ChallengeRating::Four => vec![
                creature.clone(),
                Monster::standard_monster(Self::Two, level, None, None).creature,
            ],
            ChallengeRating::Six => vec![creature.clone()],
        }
    }
}
