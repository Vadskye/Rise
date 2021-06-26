use crate::latex_formatting;
use crate::monsters::creature_type::CreatureType;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::Monster;
use std::collections::HashMap;
use titlecase::titlecase;

pub struct MonsterGroup {
    pub knowledge: Option<Knowledge>,
    pub monsters: Vec<Monster>,
    pub name: String,
}

impl MonsterGroup {
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
                {knowledge}
                {monsters}
            ",
            knowledge = if let Some(ref k) = self.knowledge {
                k.to_latex(&monsters[0].creature_type, monsters[0].creature.level)
            } else {
                "".to_string()
            },
            name = titlecase(self.name.as_str()),
            monsters = monsters
                .iter()
                .map(|m| m.to_section(Some("monsubsubsection")))
                .collect::<Vec<String>>()
                .join("\n"),
        ));
    }
}
