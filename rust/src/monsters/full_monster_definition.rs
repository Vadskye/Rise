use crate::core_mechanics::{Attribute, HasAttributes, MovementMode, Sense, Size, SpeedCategory};
use crate::creatures::Monster;
use crate::creatures::{HasModifiers, Modifier};
use crate::equipment::Weapon;
use crate::monsters::{ChallengeRating, CreatureType, Knowledge};
use crate::skills::{HasSkills, Skill};

pub struct FullMonsterDefinition {
    pub alignment: String,
    pub attributes: Vec<i32>,
    pub challenge_rating: ChallengeRating,
    pub creature_type: CreatureType,
    pub description: Option<&'static str>,
    pub knowledge: Option<Knowledge>,
    pub level: i32,
    pub modifiers: Option<Vec<Modifier>>,
    pub movement_modes: Option<Vec<MovementMode>>,
    pub name: String,
    pub senses: Option<Vec<Sense>>,
    pub size: Size,
    pub trained_skills: Option<Vec<Skill>>,
    pub weapons: Vec<Weapon>,
}

impl FullMonsterDefinition {
    pub fn monster(self) -> Monster {
        let mut monster = Monster::new(self.challenge_rating, self.creature_type, self.level);
        if let Some(d) = self.description {
            monster.description = Some(d.to_string());
        }
        monster.movement_modes = self
            .movement_modes
            .unwrap_or(vec![MovementMode::Land(SpeedCategory::Normal)]);

        let creature = &mut monster.creature;
        creature.name = Some(self.name);
        for (i, attribute) in Attribute::all().iter().enumerate() {
            creature.set_base_attribute(attribute.clone(), self.attributes[i]);
        }
        for weapon in self.weapons {
            creature.weapons.push(weapon);
        }
        creature.set_size(self.size);
        if let Some(modifiers) = self.modifiers {
            for modifier in modifiers {
                creature.add_modifier(modifier, None, None);
            }
        }
        if let Some(senses) = self.senses {
            for sense in senses {
                creature.add_sense(sense);
            }
        }
        if let Some(trained_skills) = self.trained_skills {
            for skill in trained_skills {
                creature.set_skill_trained(skill, true);
            }
        }

        return monster;
    }
}
