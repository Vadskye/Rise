use crate::core_mechanics::attacks::{DamageEffect, DamageScaling};
use crate::core_mechanics::{DicePool, PowerScaling};

#[derive(Clone, Debug)]
pub struct SimpleDamageEffect {
    pub base_dice: DicePool,
    pub power_scalings: Vec<PowerScaling>,
}

impl SimpleDamageEffect {
    pub fn damage_effect(&self) -> DamageEffect {
        DamageEffect {
            // from self
            base_dice: self.base_dice.clone(),
            power_scalings: self.power_scalings.clone(),

            // default values
            extra_defense_effect: None,
            lose_hp_effect: None,
            take_damage_effect: None,
            vampiric_healing: None,
        }
    }

    pub fn from_damage_scaling(scaling: DamageScaling) -> DamageEffect {
        DamageEffect {
            base_dice: scaling.base_dice,
            power_scalings: scaling.power_scalings,

            // TODO: add support for Default
            extra_defense_effect: None,
            lose_hp_effect: None,
            take_damage_effect: None,
            vampiric_healing: None,
        }
    }

    pub fn from_string(text: &str) -> DamageEffect {
        // TODO: remove the leading $
        match text {
            "$dr0" => Self::dr0(),
            "$dr1" => Self::dr1(),
            "$dr2" => Self::dr2(),
            "$dr3" => Self::dr3(),
            "$dr4" => Self::dr4(),
            "$dr5" => Self::dr5(),
            "$dr6" => Self::dr6(),
            "$dr7" => Self::dr7(),
            "$dr8" => Self::dr8(),
            "$dr9" => Self::dr9(),
            "$dr0l" => Self::dr0l(),
            "$dr1l" => Self::dr1l(),
            "$dr2l" => Self::dr2l(),
            "$dr3l" => Self::dr3l(),
            "$dr4l" => Self::dr4l(),
            "$dr5l" => Self::dr5l(),
            "$dr6l" => Self::dr6l(),
            "$dr7l" => Self::dr7l(),
            "$dr8l" => Self::dr8l(),
            "$dr9l" => Self::dr9l(),
            _ => panic!("Unable to parse damage string: '{}'", text),
        }
    }
}

// This lists all of the standard damage values for abilities of each rank.
// "dr" stands for "damage rank": the damage that you should get at the given rank.
// There are a bunch of high and low power variants that haven't been filled in yet.
// These return `DamageEffect` instead of `SimpleDamageEffect` because that's basically what we
// always want anyway.
impl SimpleDamageEffect {
    pub fn dr0() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr0())
    }

    pub fn dr1() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr1())
    }

    pub fn dr2() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr2())
    }

    pub fn dr3() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr3())
    }

    pub fn dr4() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr4())
    }

    pub fn dr5() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr5())
    }

    pub fn dr6() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr6())
    }

    pub fn dr7() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr7())
    }

    pub fn dr8() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr8())
    }

    pub fn dr9() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr9())
    }

    pub fn dr(rank: i32) -> DamageEffect {
        match rank {
            0 => Self::dr0(),
            1 => Self::dr1(),
            2 => Self::dr2(),
            3 => Self::dr3(),
            4 => Self::dr4(),
            5 => Self::dr5(),
            6 => Self::dr6(),
            7 => Self::dr7(),
            8 => Self::dr8(),
            9 => Self::dr9(),
            _ => panic!("Unable to find equivalent dr() for rank {}", rank),
        }
    }
}

// This lists all the low power scaling effects for each rank.
impl SimpleDamageEffect {
    pub fn dr0l() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr0l())
    }

    pub fn dr1l() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr1l())
    }

    pub fn dr2l() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr2l())
    }

    pub fn dr3l() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr3l())
    }

    pub fn dr4l() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr4l())
    }

    pub fn dr5l() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr5l())
    }

    pub fn dr6l() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr6l())
    }

    pub fn dr7l() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr7l())
    }

    pub fn dr8l() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr8l())
    }

    pub fn dr9l() -> DamageEffect {
        Self::from_damage_scaling(DamageScaling::dr9l())
    }

    pub fn drl(rank: i32) -> DamageEffect {
        match rank {
            0 => Self::dr0l(),
            1 => Self::dr1l(),
            2 => Self::dr2l(),
            3 => Self::dr3l(),
            4 => Self::dr4l(),
            5 => Self::dr5l(),
            6 => Self::dr6l(),
            7 => Self::dr7l(),
            8 => Self::dr8l(),
            9 => Self::dr9l(),
            _ => panic!("Unable to find equivalent drl() for rank {}", rank),
        }
    }
}
