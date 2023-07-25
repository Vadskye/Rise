mod the_house_of_liberation;

use crate::latex_formatting::latexify;

pub struct Module {
    pub description: String,
    pub introduction: String,
    pub name: String,
}

impl Module {
    pub fn all() -> Vec<Self> {
        vec![the_house_of_liberation::generate_module()]
    }

    pub fn to_latex(&self) -> String {
        latexify(format!(
            "
                \\chapter<{name}>

                {introduction}

                {description}
            ",
            description = self.description,
            introduction = self.introduction,
            name = self.name,
        ))
    }
}
