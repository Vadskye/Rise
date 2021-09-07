use crate::core_mechanics::Size;
use crate::equipment::Weapon;
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{FullMonsterDefinition, Monster};

pub fn generate_stock_monsters() -> Vec<MonsterEntry> {
    let mut stock_monsters: Vec<MonsterEntry> = vec![];
    for creature_type in CreatureType::all() {
        for level in vec![1, 2, 3, 4, 5] {
            for challenge_rating in vec![
                ChallengeRating::Two,
                ChallengeRating::Four,
            ] {
                stock_monsters.push(MonsterEntry::Monster(Monster::fully_defined(
                    FullMonsterDefinition {
                        alignment: "always true neutral".to_string(),
                        attributes: creature_type.stock_base_attributes(level),
                        creature_type,
                        description: None,
                        knowledge: None,
                        level,
                        movement_modes: None,
                        name: format!(
                            "Stock {} {} (CR {})",
                            creature_type.name(),
                            level,
                            challenge_rating.to_string()
                        ),
                        passive_abilities: None,
                        senses: None,
                        size: Size::Medium,
                        special_attacks: None,
                        special_defense_modifiers: None,
                        trained_skills: None,
                        weapons: vec![Weapon::Bite],
                        challenge_rating,
                    },
                )));
            }
        }
    }
    return stock_monsters;
}
