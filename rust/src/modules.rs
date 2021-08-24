mod the_house_of_liberation;

use crate::latex_formatting::latexify;

pub struct Module {
    pub introduction: String,
    pub name: String,
}

impl Module {
    pub fn all() -> Vec<Self> {
        return vec![
            the_house_of_liberation::generate_module()
        ];
    }

    pub fn to_latex(&self) -> String {
        return latexify(format!(
            "
                \\section<{name}>

                {introduction}
            ",
            introduction=self.introduction,
            name=self.name,
        ));
    }
}
