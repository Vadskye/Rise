use crate::latex_formatting;
use crate::monsters::Monster;
use titlecase::titlecase;

pub struct MonsterGroup {
    monsters: Vec<Monster>,
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
        let mut monsters: Vec<&Monster> = self.monsters.iter().collect();
        monsters.sort_by(|a, b| a.creature.name.cmp(&b.creature.name));
        // TODO: include general description and/or knowledge checks
        return latex_formatting::latexify(format!(
            "
                \\section*<{name}>
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
