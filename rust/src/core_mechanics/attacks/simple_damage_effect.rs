use crate::core_mechanics::attacks::DamageEffect;
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
            "$dr1h" => Self::dr1h(),
            "$dr2h" => Self::dr2h(),
            "$dr3h" => Self::dr3h(),
            "$dr4h" => Self::dr4h(),
            "$dr5h" => Self::dr5h(),
            "$dr6h" => Self::dr6h(),
            "$dr7h" => Self::dr7h(),
            "$dr8h" => Self::dr8h(),
            "$dr9h" => Self::dr9h(),
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
        Self {
            base_dice: DicePool::d4(),
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_plus1_modifier: 3,
            }],
        }
        .damage_effect()
    }

    pub fn dr1() -> DamageEffect {
        Self {
            base_dice: DicePool::d6(),
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_plus1_modifier: 2,
            }],
        }
        .damage_effect()
    }

    pub fn dr2() -> DamageEffect {
        Self {
            base_dice: DicePool::d8(),
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_plus1_modifier: 2,
            }],
        }
        .damage_effect()
    }

    pub fn dr3() -> DamageEffect {
        Self {
            base_dice: DicePool::d8(),
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_plus1_modifier: 1,
            }],
        }
        .damage_effect()
    }

    pub fn dr4() -> DamageEffect {
        Self {
            base_dice: DicePool::d10(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr5() -> DamageEffect {
        Self {
            base_dice: DicePool::d8(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr6() -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(2, 8),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr7() -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(2, 8),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 2,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr8() -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(4, 8),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 2,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr9() -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(5, 6),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 1,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
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

// This lists all the high power scaling effects for each rank.
impl SimpleDamageEffect {
    // Same scaling, unfortunately
    pub fn dr1h() -> DamageEffect {
        Self::dr1()
    }

    pub fn dr2h() -> DamageEffect {
        Self {
            base_dice: DicePool::empty(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr3h() -> DamageEffect {
        Self {
            base_dice: DicePool::d6(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr4h() -> DamageEffect {
        Self {
            base_dice: DicePool::empty(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr5h() -> DamageEffect {
        Self {
            base_dice: DicePool::d6(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 2,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr6h() -> DamageEffect {
        Self {
            base_dice: DicePool::empty(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 2,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr7h() -> DamageEffect {
        Self {
            base_dice: DicePool::d10(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 2,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr8h() -> DamageEffect {
        Self {
            base_dice: DicePool::empty(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 1,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr9h() -> DamageEffect {
        Self {
            base_dice: DicePool::empty(),
            power_scalings: vec![
                PowerScaling {
                    dice: Some(DicePool::d8()),
                    power_per_dice: 1,
                    power_per_plus1_modifier: 0,
                },
            ],
        }
        .damage_effect()
    }

    pub fn drh(rank: i32) -> DamageEffect {
        match rank {
            1 => Self::dr1h(),
            2 => Self::dr2h(),
            3 => Self::dr3h(),
            4 => Self::dr4h(),
            5 => Self::dr5h(),
            6 => Self::dr6h(),
            7 => Self::dr7h(),
            8 => Self::dr8h(),
            9 => Self::dr9h(),
            _ => panic!("Unable to find equivalent drh() for rank {}", rank),
        }
    }
}

// This lists all the low power scaling effects for each rank.
impl SimpleDamageEffect {
    pub fn dr0l() -> DamageEffect {
        Self {
            base_dice: DicePool::d6(),
            power_scalings: vec![],
        }
        .damage_effect()
    }

    pub fn dr1l() -> DamageEffect {
        Self {
            base_dice: DicePool::d10(),
            power_scalings: vec![],
        }
        .damage_effect()
    }

    pub fn dr2l() -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(2, 6),
            power_scalings: vec![],
        }
        .damage_effect()
    }

    pub fn dr3l() -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(2, 10),
            power_scalings: vec![],
        }
        .damage_effect()
    }

    pub fn dr4l() -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(4, 6),
            power_scalings: vec![],
        }
        .damage_effect()
    }

    pub fn dr5l() -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(6, 6),
            power_scalings: vec![],
        }
        .damage_effect()
    }

    pub fn dr6l() -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(5, 10),
            power_scalings: vec![],
        }
        .damage_effect()
    }

    pub fn dr7l() -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(7, 10),
            power_scalings: vec![],
        }
        .damage_effect()
    }

    pub fn dr8l() -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(10, 10),
            power_scalings: vec![],
        }
        .damage_effect()
    }

    pub fn dr9l() -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(14, 10),
            power_scalings: vec![],
        }
        .damage_effect()
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
