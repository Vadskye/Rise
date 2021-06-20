use crate::latex_formatting;
use crate::monsters::Monster;
use titlecase::titlecase;

pub struct MonsterGroup {
    pub monsters: Vec<Monster>,
    pub name: String,
}

impl MonsterGroup {
    pub fn new(name: &str, monsters: Vec<Monster>) -> MonsterGroup {
        return MonsterGroup {
            monsters,
            name: name.to_string(),
        };
    }

    pub fn to_latex(&self) -> String {
        // Note that we do not sort the monsters within a monster group.
        // There are various reasons we might want a non-alphabetical order, such as ordering by
        // size or age.
        let monsters: Vec<&Monster> = self.monsters.iter().collect();
        // TODO: include general description and/or knowledge checks
        return latex_formatting::latexify(format!(
            "
                \\subsection*<{name}>
                \\vspace<0.5em>
                {monsters}
            ",
            name = titlecase(self.name.as_str()),
            monsters = monsters
                .iter()
                .map(|m| m.to_section(Some("monsubsubsection")))
                .collect::<Vec<String>>()
                .join("\n"),
        ));
    }
}
