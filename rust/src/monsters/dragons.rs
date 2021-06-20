use crate::core_mechanics::attack_effects::{
    AttackEffect, AttackEffectDuration, DamageEffect, DebuffEffect,
};
use crate::core_mechanics::attacks::{
    AreaSize, AreaTargets, Attack, AttackRange, AttackTargeting, UsageTime,
};
use crate::core_mechanics::damage_dice;
use crate::core_mechanics::damage_types::DamageType;
use crate::core_mechanics::debuffs::Debuff;
use crate::core_mechanics::defenses::Defense;
use crate::core_mechanics::movement_modes::{FlightManeuverability, MovementMode, SpeedCategory};
use crate::core_mechanics::passive_abilities::PassiveAbility;
use crate::core_mechanics::senses::Sense;
use crate::core_mechanics::{attack_effects, damage_types, debuffs, defenses};
use crate::equipment::weapons::Weapon;
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Dragon;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::monster_group::MonsterGroup;
use crate::monsters::sizes::Size;
use crate::monsters::{monster_group, FullMonsterDefinition, Monster};
use crate::skills::Skill;

enum AgeCategory {
    Wyrmling,
    Juvenile,
    Adult,
    Ancient,
    Wyrm,
}

impl AgeCategory {
    fn all() -> Vec<Self> {
        return vec![
            Self::Wyrmling,
            Self::Juvenile,
            Self::Adult,
            Self::Ancient,
            Self::Wyrm,
        ];
    }

    fn attributes(&self) -> Vec<i8> {
        match self {
            Self::Wyrmling => vec![-1, 3, 1, 1, 0, 0],
            Self::Juvenile => vec![3, 1, 4, 2, 2, 2],
            Self::Adult => vec![4, 0, 4, 3, 3, 3],
            Self::Ancient => vec![5, -2, 5, 4, 4, 4],
            Self::Wyrm => vec![6, -3, 6, 5, 5, 5],
        }
    }

    fn frightful_presence(&self) -> Option<Attack> {
        match self {
            Self::Wyrmling => None,
            Self::Juvenile => Some(frightful_presence(AreaSize::Large)),
            Self::Adult => Some(frightful_presence(AreaSize::Huge)),
            Self::Ancient => Some(frightful_presence(AreaSize::Gargantuan)),
            Self::Wyrm => Some(frightful_presence(AreaSize::Custom(480))),
        }
    }

    fn level(&self) -> i8 {
        match self {
            Self::Wyrmling => 5,
            Self::Juvenile => 9,
            Self::Adult => 13,
            Self::Ancient => 17,
            Self::Wyrm => 21,
        }
    }

    fn name(&self) -> &str {
        match self {
            Self::Wyrmling => "Wyrmling",
            Self::Juvenile => "Juvenile",
            Self::Adult => "Adult",
            Self::Ancient => "Ancient",
            Self::Wyrm => "Wyrm",
        }
    }

    fn size(&self) -> Size {
        match self {
            Self::Wyrmling => Size::Small,
            Self::Juvenile => Size::Large,
            Self::Adult => Size::Huge,
            Self::Ancient => Size::Gargantuan,
            Self::Wyrm => Size::Colossal,
        }
    }
}

enum DragonType {
    Black,
    Blue,
    Brass,
    Bronze,
    Copper,
    Gold,
    Green,
    Red,
    Silver,
    White,
}

impl DragonType {
    fn all() -> Vec<Self> {
        return vec![
            Self::Black,
            Self::Blue,
            Self::Brass,
            Self::Bronze,
            Self::Copper,
            Self::Gold,
            Self::Green,
            Self::Red,
            Self::Silver,
            Self::White,
        ];
    }

    fn attribute_modifiers(&self) -> Vec<i8> {
        match self {
            Self::Black => vec![0, 0, 0, 0, 0, 0],
            Self::Blue => vec![0, 0, 0, 0, 0, 0],
            Self::Brass => vec![0, 0, 0, 0, 0, 0],
            Self::Bronze => vec![0, 0, 0, 0, 0, 0],
            Self::Copper => vec![0, 0, 0, 0, 0, 0],
            Self::Gold => vec![0, 0, 0, 0, 0, 0],
            Self::Green => vec![0, 0, 0, 0, 0, 0],
            Self::Red => vec![0, 0, 0, 0, 0, 0],
            Self::Silver => vec![0, 0, 0, 0, 0, 0],
            Self::White => vec![0, 0, 0, 0, 0, 0],
        }
    }

    fn alignment(&self) -> &str {
        match self {
            Self::Black => "Usually chaotic evil",
            Self::Blue => "Usually lawful evil",
            Self::Brass => "Usually chaotic good",
            Self::Bronze => "Usually lawful good",
            Self::Copper => "Usually chaotic good",
            Self::Gold => "Usually lawful good",
            Self::Green => "Usually lawful evil",
            Self::Red => "Usually chaotic evil",
            Self::Silver => "Usually lawful good",
            Self::White => "Usually chaotic evil",
        }
    }

    fn name(&self) -> &str {
        match self {
            Self::Black => "Black",
            Self::Blue => "Blue",
            Self::Brass => "Brass",
            Self::Bronze => "Bronze",
            Self::Copper => "Copper",
            Self::Gold => "Gold",
            Self::Green => "Green",
            Self::Red => "Red",
            Self::Silver => "Silver",
            Self::White => "White",
        }
    }
}

fn dragon(dragon_type: &DragonType, age_category: &AgeCategory) -> Monster {
    return Monster::fully_defined(FullMonsterDefinition {
        alignment: dragon_type.alignment().to_string(),
        attributes: age_category.attributes(),
        challenge_rating: ChallengeRating::Four,
        creature_type: Dragon,
        description: None,
        knowledge: None,
        level: age_category.level(),
        passive_abilities: None,
        movement_modes: Some(vec![
            MovementMode::Land(SpeedCategory::Normal),
            MovementMode::Fly(SpeedCategory::VeryFast, FlightManeuverability::Poor),
        ]),
        name: format!("{} {} Dragon", age_category.name(), dragon_type.name()),
        senses: None,
        size: age_category.size(),
        skill_points: None,
        special_attacks: if let Some(f) = age_category.frightful_presence() {
            Some(vec![f])
        } else {
            None
        },
        weapons: vec![Weapon::MonsterBite, Weapon::MonsterClaws],
    });
}

// TODO: handle immunity after initial attack
fn frightful_presence(size: AreaSize) -> Attack {
    return Attack {
        accuracy: 0,
        crit: Some(AttackEffect::Debuff(DebuffEffect {
            debuffs: vec![Debuff::Frightened],
            duration: AttackEffectDuration::Condition,
        })),
        defense: Defense::Mental,
        glance: Some(AttackEffect::Debuff(DebuffEffect {
            debuffs: vec![Debuff::Shaken],
            duration: AttackEffectDuration::Condition,
        })),
        hit: AttackEffect::Debuff(DebuffEffect {
            debuffs: vec![Debuff::Shaken],
            duration: AttackEffectDuration::Condition,
        }),
        is_magical: false,
        name: "Frightful Presence".to_string(),
        targeting: AttackTargeting::Radius(None, size, AreaTargets::Enemies),
        usage_time: UsageTime::Minor,
        weapon: None,
    };
}

pub fn dragons() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    for dragon_type in DragonType::all() {
        let dragons = AgeCategory::all()
            .iter()
            .map(|a| dragon(&dragon_type, a))
            .collect();

        monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
            name: format!("{} Dragons", dragon_type.name()),
            monsters: dragons,
        }));
    }

    return monsters;
}
