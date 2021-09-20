#[derive(Clone)]
pub struct PassiveAbility {
    pub description: String,
    pub is_magical: bool,
    pub name: String,
}

impl PassiveAbility {
    pub fn to_latex(&self) -> String {
        return format!(
            "
                \\parhead<{name}>{magical} {description}
            ",
            description = self.description,
            magical = if self.is_magical {
                "[\\glossterm<Magical>]"
            } else {
                ""
            },
            name = self.name,
        );
    }
}
