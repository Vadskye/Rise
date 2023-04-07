use crate::core_mechanics::Size;
use crate::equipment::StandardWeapon;
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{FullMonsterDefinition, Role};

pub fn generate_stock_monsters() -> Vec<MonsterEntry> {
    let mut stock_monsters: Vec<MonsterEntry> = vec![];
    for creature_type in CreatureType::all() {
        for level in vec![1, 2, 3, 4, 5] {
            for challenge_rating in vec![ChallengeRating::One, ChallengeRating::Four] {
                stock_monsters.push(MonsterEntry::Monster(
                    FullMonsterDefinition {
                        alignment: "always true neutral".to_string(),
                        attributes: creature_type.stock_base_attributes(level),
                        creature_type,
                        description: None,
                        knowledge: None,
                        level,
                        modifiers: None,
                        movement_speeds: None,
                        name: format!(
                            "Stock {} {}{}",
                            creature_type.name(),
                            level,
                            if matches!(challenge_rating, ChallengeRating::Four) {
                                " (Elite)"
                            } else {
                                ""
                            },
                        ),
                        role: Role::Leader,
                        senses: None,
                        size: Size::Medium,
                        trained_skills: None,
                        weapons: vec![StandardWeapon::Bite.weapon()],
                        challenge_rating,
                    }
                    .monster(),
                ));
            }
        }
    }
    return stock_monsters;
}
