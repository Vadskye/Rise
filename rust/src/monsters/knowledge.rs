use crate::monsters::creature_type::CreatureType;
use std::collections::HashMap;

#[derive(Clone, Debug)]
pub struct Knowledge {
    knowledge: HashMap<i32, String>,
}

impl Knowledge {
    pub fn new(knowledge_pairs: Vec<(i32, &str)>) -> Self {
        let mut knowledge_map = HashMap::new();
        for (modifier, text) in knowledge_pairs {
            knowledge_map.insert(modifier, text.to_string());
        }
        Self {
            knowledge: knowledge_map,
        }
    }

    pub fn to_latex(&self, creature_type: &CreatureType, level: i32) -> String {
        let mut knowledge_keys = self.knowledge.keys().collect::<Vec<&i32>>();
        knowledge_keys.sort();
        knowledge_keys
            .into_iter()
            .map(|difficulty| {
                format!(
                    "\\par Knowledge ({subskill}) {difficulty}: {text}",
                    subskill = creature_type.knowledge(), // TODO
                    difficulty = difficulty + (level / 2) + 5,
                    text = self.knowledge[difficulty],
                )
            })
            .collect::<Vec<String>>()
            .join("\n")
    }
}
