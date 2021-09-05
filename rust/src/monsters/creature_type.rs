use crate::core_mechanics::defenses::Defense;
use crate::latex_formatting;
use std::cmp::{PartialEq, max};
use std::fmt;
use titlecase::titlecase;

#[derive(Copy, Clone, Eq, Hash)]
pub enum CreatureType {
    Aberration,
    Animal,
    Animate,
    Dragon,
    Humanoid,
    MagicalBeast,
    MonstrousHumanoid,
    Planeforged,
    Undead,
}

impl CreatureType {
    pub fn all() -> Vec<Self> {
        return vec![
            Self::Aberration,
            Self::Animal,
            Self::Animate,
            Self::Dragon,
            Self::Humanoid,
            Self::MagicalBeast,
            Self::MonstrousHumanoid,
            Self::Planeforged,
            Self::Undead,
        ];
    }

    pub fn defense_bonus(&self, defense: &Defense) -> i32 {
        match defense {
            Defense::Armor => 5,
            Defense::Fortitude => 5,
            Defense::Reflex => 5,
            Defense::Mental => 5,
        }
    }

    pub fn from_string(text: String) -> Self {
        match text.as_str() {
            "aberration" => CreatureType::Aberration,
            "animal" => CreatureType::Animal,
            "planeforged" => CreatureType::Planeforged,
            "undead" => CreatureType::Undead,
            _ => panic!("Invalid creature type '{}'", text),
        }
    }

    // If knowledge subskills later become a first class concept, this should return those instead
    // of strings.
    pub fn knowledge(&self) -> &str {
        match self {
            Self::Aberration => "dungeoneering",
            Self::Animal => "nature",
            Self::Animate => "nature",
            Self::Dragon => "arcana",
            Self::Humanoid => "local",
            Self::MagicalBeast => "nature",
            Self::MonstrousHumanoid => "local",
            Self::Planeforged => "planes",
            Self::Undead => "religion",
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Aberration => "aberration",
            Self::Animal => "animal",
            Self::Animate => "animate",
            Self::Dragon => "dragon",
            Self::Humanoid => "humanoid",
            Self::MagicalBeast => "magical beast",
            Self::MonstrousHumanoid => "monstrous humanoid",
            Self::Planeforged => "planeforged",
            Self::Undead => "undead",
        }
    }

    pub fn plural_name(&self) -> String {
        match self {
            Self::Planeforged => self.name().to_string(),
            Self::Undead => self.name().to_string(),
            _ => format!("{}s", self.name()),
        }
    }

    pub fn latex_section_header(&self) -> String {
        return latex_formatting::latexify(format!(
            "
                \\newpage
                \\section<{plural_name_title}>

                All {plural_name} have the following properties unless noted otherwise in their description:
                \\begin<itemize>
                    \\item {defenses}
                \\end<itemize>
                \\vspace<0.5em>
            ",
            plural_name_title = titlecase(self.plural_name().as_str()),
            plural_name = self.plural_name(),
            defenses = self.latex_defenses(),
        ));
    }

    fn latex_defenses(&self) -> String {
        return format!(
            "\\textbf<Defenses:> {armor} Armor, {fort} Fortitude, {ref} Reflex, {ment} Mental",
            armor=latex_formatting::modifier(self.defense_bonus(&Defense::Armor)),
            fort=latex_formatting::modifier(self.defense_bonus(&Defense::Fortitude)),
            ref=latex_formatting::modifier(self.defense_bonus(&Defense::Reflex)),
            ment=latex_formatting::modifier(self.defense_bonus(&Defense::Mental)),
        );
    }

    pub fn stock_base_attributes(&self, level: i32) -> Vec<i32> {
        let at_level_1 = match self {
            Self::Aberration => vec![2, 0, 2, 1, 2, 1],
            Self::Animal => vec![2, 2, 2, -8, 2, -1],
            Self::Animate => vec![3, 0, 3, 0, 0, 0],
            Self::Dragon => vec![3, 0, 2, 2, 2, 2],
            Self::Humanoid => vec![1, 1, 1, 2, 2, 2],
            Self::MagicalBeast => vec![2, 2, 2, -6, 2, 0],
            Self::MonstrousHumanoid => vec![2, 2, 2, 1, 1, 1],
            Self::Planeforged => vec![2, 2, 2, 2, 2, 2],
            Self::Undead => vec![2, 1, 3, 0, 0, 3],
        };
        return at_level_1
            .into_iter()
            .map(|a| a + max(0, (a * level) / 16))
            .collect();
    }
}

impl fmt::Display for CreatureType {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name())
    }
}

impl PartialEq for CreatureType {
    fn eq(&self, other: &Self) -> bool {
        return self.name() == other.name();
    }
}
