use crate::core_mechanics::sizes::Size;
use crate::equipment::weapons::Weapon;
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{FullMonsterDefinition, Monster};

pub fn generate_stock_monsters() -> Vec<MonsterEntry> {
    let mut stock_monsters: Vec<MonsterEntry> = vec![];
    for creature_type in CreatureType::all() {
        for level in 1..22 {
            stock_monsters.push(MonsterEntry::Monster(Monster::fully_defined(
                FullMonsterDefinition {
                    alignment: "always true neutral".to_string(),
                    attributes: creature_type.stock_base_attributes(level),
                    challenge_rating: ChallengeRating::Two,
                    creature_type,
                    description: None,
                    knowledge: None,
                    level,
                    movement_modes: None,
                    name: format!("Stock {} {}", creature_type.name(), level),
                    passive_abilities: None,
                    senses: None,
                    size: Size::Medium,
                    special_attacks: None,
                    special_defense_modifiers: None,
                    trained_skills: None,
                    weapons: vec![Weapon::Bite],
                },
            )));
        }
    }
    return stock_monsters;
}
