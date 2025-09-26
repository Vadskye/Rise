struct Effect {
    exposure: Exposure,
    form: Form,
    effect: String,
}

pub fn poison_description(exposure: Exposure, form: Form, effect: &str) -> String {
    Effect::new(exposure, form, effect).description()
}

impl Effect {
    fn description(&self) -> String {
        if !self.effect.trim().starts_with("The poison") {
            eprintln!(
                "Poison effects should start with 'The poison': '{}'",
                self.effect.trim()
            );
        }

        format!(
            "
                This is {a_an} {exposure}-based {form} poison (see \\pcref<Poison>).
                {effect}
            ",
            a_an = match self.exposure {
                Exposure::Contact => "a",
                Exposure::Ingestion => "an",
                Exposure::Injury => "an",
            },
            exposure = self.exposure.name(),
            form = self.form.name(),
            effect = self.effect,
        )
    }

    fn new(exposure: Exposure, form: Form, effect: &str) -> Self {
        Self {
            exposure,
            form,
            effect: String::from(effect),
        }
    }
}

pub enum Exposure {
    Contact,
    Ingestion,
    Injury,
}

impl Exposure {
    fn name(&self) -> &str {
        match self {
            Self::Contact => "contact",
            Self::Ingestion => "ingestion",
            Self::Injury => "injury",
        }
    }
}

pub enum Form {
    Gas,
    Liquid,
    Pellet,
    Powder,
}

impl Form {
    fn name(&self) -> &str {
        match self {
            Self::Gas => "gas",
            Self::Liquid => "liquid",
            Self::Pellet => "pellet",
            Self::Powder => "powder",
        }
    }
}
