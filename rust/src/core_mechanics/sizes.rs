#[derive(Clone)]
pub enum Size {
    Fine,
    Diminuitive,
    Tiny,
    Small,
    Medium,
    Large,
    Huge,
    Gargantuan,
    Colossal,
}

impl Size {
    pub fn base_speed(&self) -> i32 {
        match self {
            Size::Fine => 5,
            Size::Diminuitive => 10,
            Size::Tiny => 15,
            Size::Small => 20,
            Size::Medium => 30,
            Size::Large => 40,
            Size::Huge => 50,
            Size::Gargantuan => 70,
            Size::Colossal => 100,
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Size::Fine => "Fine",
            Size::Diminuitive => "Diminuitive",
            Size::Tiny => "Tiny",
            Size::Small => "Small",
            Size::Medium => "Medium",
            Size::Large => "Large",
            Size::Huge => "Huge",
            Size::Gargantuan => "Gargantuan",
            Size::Colossal => "Colossal",
        }
    }
}
