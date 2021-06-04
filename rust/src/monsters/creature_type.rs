use crate::core_mechanics::defenses::Defense;
use crate::latex_formatting;
use titlecase::titlecase;
use std::fmt;
use std::cmp::PartialEq;

#[derive(Eq, Hash)]
pub enum CreatureType {
    Aberration,
    Animal,
    Planeforged,
    Undead,
}

impl CreatureType {
    pub fn defense_bonus(&self, defense: &Defense) -> i8 {
        match self {
            Self::Aberration => match defense {
                Defense::Armor => 4,
                Defense::Fortitude => 5,
                Defense::Reflex => 4,
                Defense::Mental => 6,
            },
            Self::Animal => match defense {
                Defense::Armor => 4,
                Defense::Fortitude => 6,
                Defense::Reflex => 5,
                Defense::Mental => 4,
            },
            Self::Planeforged => match defense {
                Defense::Armor => 4,
                Defense::Fortitude => 5,
                Defense::Reflex => 5,
                Defense::Mental => 5,
            },
            Self::Undead => match defense {
                Defense::Armor => 4,
                Defense::Fortitude => 4,
                Defense::Reflex => 5,
                Defense::Mental => 6,
            },
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
            Self::Planeforged => "planes",
            Self::Undead => "religion",
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Aberration => "aberration",
            Self::Animal => "animal",
            Self::Planeforged => "planeforged",
            Self::Undead => "undead",
        }
    }

    pub fn plural_name(&self) -> String {
        match self {
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
