use crate::core_mechanics::{DicePool, PowerScaling};
use crate::equipment::Weapon;

#[derive(Clone, Debug)]
pub struct DamageScaling {
    pub base_dice: DicePool,
    pub power_scalings: Vec<PowerScaling>,
}

impl DamageScaling {
    pub fn from_weapon(weapon: &Weapon) -> Self {
        return Self {
            base_dice: weapon.damage_dice.clone(),
            power_scalings: weapon.power_scalings(),
        };
    }

    pub fn scaled_pool(&self, power: i32) -> DicePool {
        return self.base_dice.calc_scaled_pool(&self.power_scalings, power);
    }
}

// This lists all of the standard damage values for abilities of each rank.
// "dr" stands for "damage rank": the damage that you should get at the given rank.
// There are a bunch of high and low power variants that haven't been filled in yet.
impl DamageScaling {
    pub fn dr0() -> Self {
        return Self {
            base_dice: DicePool::d4(),
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_increment: 3,
            }],
        };
    }

    pub fn dr1() -> Self {
        return Self {
            base_dice: DicePool::d6(),
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_increment: 2,
            }],
        };
    }

    pub fn dr2() -> Self {
        return Self {
            base_dice: DicePool::d8(),
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_increment: 2,
            }],
        };
    }

    pub fn dr3() -> Self {
        return Self {
            base_dice: DicePool::d8(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 4,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr4() -> Self {
        return Self {
            base_dice: DicePool::d8(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 4,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr5() -> Self {
        return Self {
            base_dice: DicePool::xdy(2, 6),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 3,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr6() -> Self {
        return Self {
            base_dice: DicePool::xdy(1, 10),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 3,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr7() -> Self {
        return Self {
            base_dice: DicePool::xdy(2, 10),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 3,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr8() -> Self {
        return Self {
            base_dice: DicePool::xdy(4, 10),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 3,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr9() -> Self {
        return Self {
            base_dice: DicePool::xdy(4, 10),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 2,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr(rank: i32) -> Self {
        return match rank {
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
        };
    }
}

// This lists all the high power scaling effects for each rank.
impl DamageScaling {
    // Same scaling, unfortunately
    pub fn dr1h() -> Self {
        return Self::dr1();
    }

    pub fn dr2h() -> Self {
        return Self {
            base_dice: DicePool::d6(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 4,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr3h() -> Self {
        return Self {
            base_dice: DicePool::d6(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 4,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr4h() -> Self {
        return Self {
            base_dice: DicePool::empty(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 3,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr5h() -> Self {
        return Self {
            base_dice: DicePool::empty(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 3,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr6h() -> Self {
        return Self {
            base_dice: DicePool::empty(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 2,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr7h() -> Self {
        return Self {
            base_dice: DicePool::empty(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 2,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr8h() -> Self {
        return Self {
            base_dice: DicePool::xdy(2, 10),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 2,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr9h() -> Self {
        return Self {
            base_dice: DicePool::empty(),
            power_scalings: vec![
                PowerScaling {
                    dice: Some(DicePool::d10()),
                    power_per_dice: 2,
                    power_per_increment: 0,
                },
                PowerScaling {
                    dice: Some(DicePool::d6()),
                    power_per_dice: 2,
                    power_per_increment: 0,
                },
            ],
        };
    }

    pub fn drh(rank: i32) -> Self {
        return match rank {
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
        };
    }
}

// This lists all the low power scaling effects for each rank.
impl DamageScaling {
    pub fn dr1l() -> Self {
        return Self {
            base_dice: DicePool::d8(),
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_increment: 2,
            }],
        };
    }

    pub fn dr2l() -> Self {
        return Self {
            base_dice: DicePool::d10(),
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_increment: 2,
            }],
        };
    }

    pub fn dr3l() -> Self {
        return Self {
            base_dice: DicePool::d8(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 4,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr4l() -> Self {
        return Self {
            base_dice: DicePool::d10(),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 4,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr5l() -> Self {
        return Self {
            base_dice: DicePool::xdy(2, 8),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 4,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr6l() -> Self {
        return Self {
            base_dice: DicePool::xdy(4, 6),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 4,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr7l() -> Self {
        return Self {
            base_dice: DicePool::xdy(6, 6),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 3,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr8l() -> Self {
        return Self {
            base_dice: DicePool::xdy(7, 8),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 3,
                power_per_increment: 0,
            }],
        };
    }

    pub fn dr9l() -> Self {
        return Self {
            base_dice: DicePool::xdy(8, 10),
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 3,
                power_per_increment: 0,
            }],
        };
    }

    pub fn drl(rank: i32) -> Self {
        return match rank {
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
        };
    }
}
