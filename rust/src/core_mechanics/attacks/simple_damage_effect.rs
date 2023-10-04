use crate::core_mechanics::attacks::DamageEffect;
use crate::core_mechanics::{DamageType, DicePool, PowerScaling};

#[derive(Clone, Debug)]
pub struct SimpleDamageEffect {
    pub base_dice: DicePool,
    pub damage_types: Vec<DamageType>,
    pub power_scalings: Vec<PowerScaling>,
}

impl SimpleDamageEffect {
    pub fn damage_effect(&self) -> DamageEffect {
        DamageEffect {
            // from self
            base_dice: self.base_dice.clone(),
            damage_types: self.damage_types.clone(),
            power_scalings: self.power_scalings.clone(),

            // default values
            extra_defense_effect: None,
            lose_hp_effect: None,
            take_damage_effect: None,
            vampiric_healing: None,
        }
    }

    pub fn from_string(text: &str, damage_types: Vec<DamageType>) -> DamageEffect {
        // TODO: remove the leading $
        match text {
            "$dr0" => Self::dr0(damage_types),
            "$dr1" => Self::dr1(damage_types),
            "$dr2" => Self::dr2(damage_types),
            "$dr3" => Self::dr3(damage_types),
            "$dr4" => Self::dr4(damage_types),
            "$dr5" => Self::dr5(damage_types),
            "$dr6" => Self::dr6(damage_types),
            "$dr7" => Self::dr7(damage_types),
            "$dr8" => Self::dr8(damage_types),
            "$dr9" => Self::dr9(damage_types),
            "$dr1h" => Self::dr1h(damage_types),
            "$dr2h" => Self::dr2h(damage_types),
            "$dr3h" => Self::dr3h(damage_types),
            "$dr4h" => Self::dr4h(damage_types),
            "$dr5h" => Self::dr5h(damage_types),
            "$dr6h" => Self::dr6h(damage_types),
            "$dr7h" => Self::dr7h(damage_types),
            "$dr8h" => Self::dr8h(damage_types),
            "$dr9h" => Self::dr9h(damage_types),
            "$dr1l" => Self::dr1l(damage_types),
            "$dr2l" => Self::dr2l(damage_types),
            "$dr3l" => Self::dr3l(damage_types),
            "$dr4l" => Self::dr4l(damage_types),
            "$dr5l" => Self::dr5l(damage_types),
            "$dr6l" => Self::dr6l(damage_types),
            "$dr7l" => Self::dr7l(damage_types),
            "$dr8l" => Self::dr8l(damage_types),
            "$dr9l" => Self::dr9l(damage_types),
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
    pub fn dr0(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::d4(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_plus1_modifier: 2,
            }],
        }
        .damage_effect()
    }

    pub fn dr1(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::d6(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_plus1_modifier: 2,
            }],
        }
        .damage_effect()
    }

    pub fn dr2(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::d8(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_plus1_modifier: 2,
            }],
        }
        .damage_effect()
    }

    pub fn dr3(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::d8(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 4,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr4(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::d8(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 4,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr5(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(2, 6),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr6(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(1, 10),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr7(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(2, 10),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr8(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(4, 10),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr9(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(4, 10),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 2,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr(rank: i32, damage_types: Vec<DamageType>) -> DamageEffect {
        match rank {
            0 => Self::dr0(damage_types),
            1 => Self::dr1(damage_types),
            2 => Self::dr2(damage_types),
            3 => Self::dr3(damage_types),
            4 => Self::dr4(damage_types),
            5 => Self::dr5(damage_types),
            6 => Self::dr6(damage_types),
            7 => Self::dr7(damage_types),
            8 => Self::dr8(damage_types),
            9 => Self::dr9(damage_types),
            _ => panic!("Unable to find equivalent dr() for rank {}", rank),
        }
    }
}

// This lists all the high power scaling effects for each rank.
impl SimpleDamageEffect {
    // Same scaling, unfortunately
    pub fn dr1h(damage_types: Vec<DamageType>) -> DamageEffect {
        Self::dr1(damage_types)
    }

    pub fn dr2h(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::d6(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 4,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr3h(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::d6(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 4,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr4h(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::empty(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr5h(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::empty(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr6h(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::empty(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 2,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr7h(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::empty(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 2,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr8h(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(2, 10),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 2,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr9h(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::empty(),
            damage_types,
            power_scalings: vec![
                PowerScaling {
                    dice: Some(DicePool::d10()),
                    power_per_dice: 2,
                    power_per_plus1_modifier: 0,
                },
                PowerScaling {
                    dice: Some(DicePool::d6()),
                    power_per_dice: 2,
                    power_per_plus1_modifier: 0,
                },
            ],
        }
        .damage_effect()
    }

    pub fn drh(rank: i32, damage_types: Vec<DamageType>) -> DamageEffect {
        match rank {
            1 => Self::dr1h(damage_types),
            2 => Self::dr2h(damage_types),
            3 => Self::dr3h(damage_types),
            4 => Self::dr4h(damage_types),
            5 => Self::dr5h(damage_types),
            6 => Self::dr6h(damage_types),
            7 => Self::dr7h(damage_types),
            8 => Self::dr8h(damage_types),
            9 => Self::dr9h(damage_types),
            _ => panic!("Unable to find equivalent drh() for rank {}", rank),
        }
    }
}

// This lists all the low power scaling effects for each rank.
impl SimpleDamageEffect {
    pub fn dr1l(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::d8(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_plus1_modifier: 2,
            }],
        }
        .damage_effect()
    }

    pub fn dr2l(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::d10(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: None,
                power_per_dice: 0,
                power_per_plus1_modifier: 2,
            }],
        }
        .damage_effect()
    }

    pub fn dr3l(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::d8(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 4,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr4l(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::d10(),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 4,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr5l(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(2, 8),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 4,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr6l(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(4, 6),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 4,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr7l(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(6, 6),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d6()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr8l(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(7, 8),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d8()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn dr9l(damage_types: Vec<DamageType>) -> DamageEffect {
        Self {
            base_dice: DicePool::xdy(8, 10),
            damage_types,
            power_scalings: vec![PowerScaling {
                dice: Some(DicePool::d10()),
                power_per_dice: 3,
                power_per_plus1_modifier: 0,
            }],
        }
        .damage_effect()
    }

    pub fn drl(rank: i32, damage_types: Vec<DamageType>) -> DamageEffect {
        match rank {
            1 => Self::dr1l(damage_types),
            2 => Self::dr2l(damage_types),
            3 => Self::dr3l(damage_types),
            4 => Self::dr4l(damage_types),
            5 => Self::dr5l(damage_types),
            6 => Self::dr6l(damage_types),
            7 => Self::dr7l(damage_types),
            8 => Self::dr8l(damage_types),
            9 => Self::dr9l(damage_types),
            _ => panic!("Unable to find equivalent drl() for rank {}", rank),
        }
    }
}
