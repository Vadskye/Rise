#[derive(Copy, Clone, PartialEq)]
pub enum ChallengeRating {
    Half,
    One,
    Two,
    Three,
    Four,
}

impl ChallengeRating {
    pub fn accuracy_bonus(&self) -> i32 {
        match self {
            Self::Half => 0,
            Self::One => 0,
            Self::Two => 0,
            Self::Three => 0,
            Self::Four => 0,
        }
    }

    pub fn damage_increments(&self) -> i32 {
        match self {
            Self::Half => -1,
            Self::One => 0,
            Self::Two => 1,
            Self::Three => 1,
            Self::Four => 2,
        }
    }

    pub fn max_base_attribute(&self) -> i32 {
        match self {
            Self::Half => 3,
            Self::One => 4,
            Self::Two => 5,
            Self::Three => 5,
            Self::Four => 6,
        }
    }

    // CR 4 monsters should be taking multiple actions per round, so their damage
    // is higher than it would appear based purely on their damage dice.
    pub fn damage_per_round_multiplier(&self) -> f64 {
        match self {
            Self::Half => 1.0,
            Self::One => 1.0,
            Self::Two => 1.0,
            Self::Three => 1.0,
            Self::Four => 1.5,
        }
    }

    pub fn defense_bonus(&self) -> i32 {
        match self {
            Self::Half => 0,
            Self::One => 0,
            Self::Two => 0,
            Self::Three => 0,
            Self::Four => 0,
        }
    }

    pub fn dr_multiplier(&self) -> f64 {
        match self {
            Self::Half => 0.0,
            Self::One => 1.0,
            Self::Two => 2.0,
            Self::Three => 4.0,
            Self::Four => 6.0,
        }
    }

    pub fn hp_multiplier(&self) -> f64 {
        match self {
            Self::Half => 0.5,
            Self::One => 1.0,
            Self::Two => 2.0,
            Self::Three => 3.0,
            Self::Four => 4.0,
        }
    }

    pub fn from_string(text: String) -> Self {
        match text.as_str() {
            "0.5" => ChallengeRating::Half,
            "1" => ChallengeRating::One,
            "2" => ChallengeRating::Two,
            "3" => ChallengeRating::Three,
            "4" => ChallengeRating::Four,
            _ => panic!("Invalid challenge rating '{}'", text),
        }
    }

    pub fn to_string(&self) -> &str {
        match self {
            ChallengeRating::Half => "0.5",
            ChallengeRating::One => "1",
            ChallengeRating::Two => "2",
            ChallengeRating::Three => "3",
            ChallengeRating::Four => "4",
        }
    }
}
