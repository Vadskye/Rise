use crate::creatures::Monster;
use crate::latex_formatting;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::CreatureType;
use titlecase::titlecase;

pub struct MonsterGroup {
    pub art: bool,
    pub description: Option<String>,
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
                \\newpage
                {art}
                \\subsection*<{name}>
                \\vspace<0.5em>
                {description}
                {knowledge}
                {monsters}
            ",
            art = self.latex_art(),
            description = self.description.as_ref().unwrap_or(&"".to_string()),
            knowledge = if let Some(ref k) = self.knowledge {
                if monsters.len() > 0 {
                    k.to_latex(&monsters[0].creature_type, monsters[0].creature.level)
                } else {
                    // TODO: correctly support empty monster groups
                    k.to_latex(&CreatureType::Dragon, 0)
                }
            } else {
                "".to_string()
            },
            name = titlecase(self.name.as_str()),
            monsters = monsters
                .iter()
                .map(|m| m.to_section(Some(self.name.clone())))
                .collect::<Vec<String>>()
                .join("\n\\vspace{2em}\n"),
        ));
    }

    fn latex_art(&self) -> String {
        if self.art {
            let name = self.name.to_lowercase();
            return format!(
                "\\noindent\\includegraphics[width=\\columnwidth]<monsters/{name}>\\vspace<0.5em>",
                name = name,
            );
        } else {
            return "".to_string();
        }
    }
}
