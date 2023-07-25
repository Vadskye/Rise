#[derive(Clone, Debug)]
pub enum Sense {
    Blindsense(i32),
    Blindsight(i32),
    Darkvision(i32),
    Lifesense(i32),
    Lifesight(i32),
    LowLightVision,
    Scent,
    Telepathy(i32),
    Tremorsense(i32),
    Tremorsight(i32),
}

impl Sense {
    pub fn latex_description(&self) -> String {
        match self {
            Self::Blindsense(feet) => format_range("blindsense", feet),
            Self::Blindsight(feet) => format_range("blindsight", feet),
            Self::Darkvision(feet) => format_range("darkvision", feet),
            Self::Lifesense(feet) => format_range("lifesense", feet),
            Self::Lifesight(feet) => format_range("lifesight", feet),
            Self::LowLightVision => "low-light vision".to_string(),
            Self::Scent => "scent".to_string(),
            Self::Telepathy(feet) => format_range("telepathy", feet),
            Self::Tremorsense(feet) => format_range("tremorsense", feet),
            Self::Tremorsight(feet) => format_range("tremorsight", feet),
        }
    }
}

fn format_range(name: &str, feet: &i32) -> String {
    format!("{}~({}~ft.)", name, feet)
}
