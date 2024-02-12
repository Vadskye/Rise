use crate::core_mechanics::abilities::ActiveAbility;
use crate::core_mechanics::{
    Attribute, HasAttributes, MovementMode, MovementSpeed, Sense, Size, SpeedCategory,
};
use crate::creatures::{Creature, Monster};
use crate::creatures::{HasModifiers, Modifier, ModifierBundle};
use crate::monsters::{CreatureType, Knowledge, Role};
use crate::skills::{HasSkills, Skill};

#[derive(Clone, Debug)]
pub struct MonsterDef {
    pub abilities: MonsterAbilities,
    pub narrative: Option<MonsterNarrative>,
    // Name is listed separately from MonsterNarrative since it's mandatory, and the rest of the
    // narrative is skippable.
    pub name: String,
    pub statistics: MonsterStatistics,
}

#[derive(Clone, Debug, Default)]
pub struct MonsterAbilities {
    pub active_abilities: Vec<ActiveAbility>,
    pub modifiers: Vec<Modifier>,
    pub movement_speeds: Option<Vec<MovementSpeed>>,
    pub senses: Vec<Sense>,
    pub trained_skills: Vec<Skill>,
}

impl MonsterAbilities {
    fn update_creature(self, creature: &mut Creature) {
        let mut modifiers = self.modifiers;
        for ability in self.active_abilities {
            // TODO: is this the right place to warn?
            ability.validate();
            modifiers.push(Modifier::ActiveAbility(ability));
        }
        for modifier in modifiers {
            creature.add_modifier(modifier, None, None);
        }
        creature.movement_speeds = self.movement_speeds.unwrap_or(vec![MovementSpeed::new(
            MovementMode::Land,
            SpeedCategory::Normal,
        )]);
        for sense in self.senses {
            creature.add_sense(sense);
        }
        for skill in self.trained_skills {
            creature.set_skill_trained(skill, true);
        }
    }
}

// These help define a monster's place in the narrative universe.
#[derive(Clone, Debug, Default)]
pub struct MonsterNarrative {
    pub alignment: String,
    pub art: bool,
    pub description: Option<String>,
    pub knowledge: Option<Knowledge>,
}

impl MonsterNarrative {
    fn update_monster(self, monster: &mut Monster) {
        monster.alignment = Some(self.alignment);
        monster.art = self.art;
        monster.description = self.description;
        monster.knowledge = self.knowledge;
    }
}

// These are simple, mandatory fields that every monster should have defined.
#[derive(Clone, Debug)]
pub struct MonsterStatistics {
    pub attributes: Vec<i32>,
    pub elite: bool,
    pub level: i32,
    pub role: Role,
    pub size: Size,
}

impl MonsterStatistics {
    fn monster(self, creature_type: CreatureType) -> Monster {
        let mut monster = Monster::new(
            self.elite,
            creature_type,
            self.role,
            self.level,
        );

        for (i, attribute) in Attribute::all().iter().enumerate() {
            monster
                .creature
                .set_base_attribute(*attribute, self.attributes[i]);
        }
        monster.creature.size = self.size;

        monster
    }
}

impl MonsterDef {
    pub fn monster(mut self, creature_type: CreatureType) -> Monster {
        // Some creature types automatically come with extra modifiers.
        let maybe_bundle = match creature_type {
            CreatureType::Undead => Some(ModifierBundle::Undead),
            _ => None,
        };
        if let Some(bundle) = maybe_bundle {
            self.abilities.modifiers.append(&mut bundle.modifiers())
        }

        let mut monster = self.statistics.monster(creature_type);
        monster.creature.name = Some(self.name);

        if let Some(narrative) = self.narrative {
            narrative.update_monster(&mut monster);
        }
        self.abilities.update_creature(&mut monster.creature);

        monster.validate_design();

        monster
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    // Useful to have a baseline, since the choices here are mandatory and somewhat arbitrary.
    fn default_statistics() -> MonsterStatistics {
        MonsterStatistics {
            attributes: vec![0, 0, 0, 0, 0, 0],
            elite: false,
            level: 1,
            role: Role::Leader,
            size: Size::Medium,
        }
    }

    // This just asserts that we don't throw an error while trying to create the monster. It's too
    // complicated to assert equality for monsters right now.
    #[test]
    fn can_create_default_humanoid() {
        let def = MonsterDef {
            name: "Test Monster".to_string(),
            abilities: MonsterAbilities {
                ..Default::default()
            },
            narrative: None,
            statistics: default_statistics(),
        };
        def.monster(CreatureType::Humanoid);
    }
}
