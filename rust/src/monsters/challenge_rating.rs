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
        creature.add_modifier(
            Modifier::Accuracy(self.accuracy_bonus()),
            Some("challenge rating"),
            None,
        );
        creature.add_modifier(
            Modifier::AllDefenses(self.defense_bonus()),
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

    pub fn accuracy_bonus(&self) -> i32 {
        match self {
            Self::One => 0,
            Self::Four => 2,
        }
    }

    pub fn defense_bonus(&self) -> i32 {
        match self {
            Self::One => 0,
            Self::Four => 2,
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
            Self::Four => 1.5,
        }
    }

    pub fn hp_multiplier(&self) -> f64 {
        match self {
            Self::One => 1.0,
            Self::Four => 4.0,
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
        fn sm(cr: ChallengeRating, l: i32) -> Creature {
            let mut monster = Monster::standard_monster(cr, max(l, 1), None, None);
            monster.add_magical_attack();
            monster.creature
        }

        match count {
            1 => vec![sm(ChallengeRating::Four, level + 3)],
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
            monster.creature
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
