use crate::core_mechanics::{DicePool, Die, PowerScaling};
use crate::equipment::Weapon;

#[derive(Clone, Debug)]
pub struct DamageScaling {
    pub base_dice: DicePool,
    pub power_scalings: Vec<PowerScaling>,
}

impl DamageScaling {
    pub fn from_weapon(weapon: &Weapon) -> Self {
        Self {
            base_dice: weapon.damage_dice.clone(),
            power_scalings: weapon.power_scalings(),
        }
    }

    pub fn scaled_pool(&self, power: i32) -> DicePool {
        self.base_dice.calc_scaled_pool(&self.power_scalings, power)
    }
}

// This lists all of the standard damage values for abilities of each rank.
// "dr" stands for "damage rank": the damage that you should get at the given rank.
// There are a bunch of high and low power variants that haven't been filled in yet.
impl DamageScaling {
    pub fn dr0() -> Self {
        Self {
            base_dice: DicePool::d4(),
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_plus1_modifier: 2,
            }],
        }
    }

    pub fn dr1() -> Self {
        Self {
            base_dice: DicePool::d6(),
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_plus1_modifier: 2,
            }],
        }
    }

    pub fn dr2() -> Self {
        Self {
            base_dice: DicePool::d6(),
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_plus1_modifier: 1,
            }],
        }
    }

    pub fn dr3() -> Self {
        Self {
            base_dice: DicePool::d8(),
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_plus1_modifier: 1,
            }],
        }
    }

    pub fn dr4() -> Self {
        Self {
            base_dice: DicePool::empty(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 2,
                power_per_plus1_modifier: 0,
            }],
        }
    }

    pub fn dr5() -> Self {
        Self {
            base_dice: DicePool::d6(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 2,
                power_per_plus1_modifier: 0,
            }],
        }
    }

    pub fn dr6() -> Self {
        Self {
            base_dice: DicePool::d8(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 2,
                power_per_plus1_modifier: 0,
            }],
        }
    }

    pub fn dr7() -> Self {
        Self {
            base_dice: DicePool::d10(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 2,
                power_per_plus1_modifier: 0,
            }],
        }
    }

    pub fn dr8() -> Self {
        Self {
            base_dice: DicePool::d6(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 1,
                power_per_plus1_modifier: 0,
            }],
        }
    }

    pub fn dr9() -> Self {
        Self {
            base_dice: DicePool::xdy(2, 8),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 1,
                power_per_plus1_modifier: 0,
            }],
        }
    }

    pub fn dr(rank: i32) -> Self {
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
impl DamageScaling {
    pub fn dr0l() -> Self {
        Self {
            base_dice: DicePool::d6(),
            power_scalings: vec![],
        }
    }

    pub fn dr1l() -> Self {
        Self {
            base_dice: DicePool::d10(),
            power_scalings: vec![],
        }
    }

    pub fn dr2l() -> Self {
        Self {
            base_dice: DicePool::d8().add_dice(vec![Die::d6()]),
            power_scalings: vec![],
        }
    }

    pub fn dr3l() -> Self {
        Self {
            base_dice: DicePool::xdy(3, 6),
            power_scalings: vec![],
        }
    }

    pub fn dr4l() -> Self {
        Self {
            base_dice: DicePool::xdy(3, 10),
            power_scalings: vec![],
        }
    }

    pub fn dr5l() -> Self {
        Self {
            base_dice: DicePool::xdy(5, 8),
            power_scalings: vec![],
        }
    }

    pub fn dr6l() -> Self {
        Self {
            base_dice: DicePool::xdy(7, 8),
            power_scalings: vec![],
        }
    }

    pub fn dr7l() -> Self {
        Self {
            base_dice: DicePool::xdy(8, 10),
            power_scalings: vec![],
        }
    }

    pub fn dr8l() -> Self {
        Self {
            base_dice: DicePool::xdy(11, 10),
            power_scalings: vec![],
        }
    }

    pub fn dr9l() -> Self {
        Self {
            base_dice: DicePool::xdy(16, 10),
            power_scalings: vec![],
        }
    }

    pub fn drl(rank: i32) -> Self {
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
