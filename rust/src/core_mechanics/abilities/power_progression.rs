pub enum PowerProgression {
    Fast,
    Medium,
    // Nothing actually uses a Slow progression, but it's useful to have around in case the design
    // changes later.
    Slow,
}

impl PowerProgression {
    pub fn calc_power(&self, rank: i32) -> i32 {
        match self {
            Self::Fast => match rank {
                1 => 3,
                2 => 4,
                3 => 5,  // +1
                4 => 7,  // +2
                5 => 10, // +3
                6 => 14, // +4
                7 => 20, // +6
                _ => panic!("Invalid rank {}", rank),
            },
            Self::Medium => match rank {
                1 => 2,
                2 => 3,
                3 => 4,  // +1
                4 => 6,  // +2
                5 => 8,  // +2
                6 => 12, // +4
                7 => 16, // +4
                _ => panic!("Invalid rank {}", rank),
            },
            Self::Slow => match rank {
                1 => 1,
                2 => 2,
                3 => 3,  // +1
                4 => 4,  // +1
                5 => 6,  // +2
                6 => 8,  // +2
                7 => 12, // +4
                _ => panic!("Invalid rank {}", rank),
            },
        }
    }
}
