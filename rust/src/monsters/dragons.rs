use crate::core_mechanics::attack_effects::{
    AttackEffect, AttackEffectDuration, DamageEffect, DebuffEffect,
};
use crate::core_mechanics::attacks::{
    AreaSize, AreaTargets, Attack, AttackRange, AttackTargeting, UsageTime,
};
use crate::core_mechanics::damage_dice;
use crate::core_mechanics::damage_types::{DamageType, DamageTypeEffect};
use crate::core_mechanics::debuffs::Debuff;
use crate::core_mechanics::defenses::{Defense, SpecialDefenseModifier};
use crate::core_mechanics::movement_modes::{FlightManeuverability, MovementMode, SpeedCategory};
use crate::core_mechanics::passive_abilities::PassiveAbility;
use crate::core_mechanics::senses::Sense;
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

    fn attributes(&self) -> Vec<i32> {
        match self {
            Self::Wyrmling => vec![-1, 3, 1, 1, 0, 0],
            Self::Juvenile => vec![3, 1, 2, 2, 2, 2],
            Self::Adult => vec![4, 0, 3, 3, 3, 3],
            Self::Ancient => vec![6, -1, 4, 4, 4, 4],
            Self::Wyrm => vec![8, -2, 5, 5, 5, 5],
        }
    }

    fn breath_weapon_line(&self) -> AttackTargeting {
        let (width, size) = match self {
            Self::Wyrmling => (5, AreaSize::Medium),
            Self::Juvenile => (5, AreaSize::Large),
            Self::Adult => (10, AreaSize::Huge),
            Self::Ancient => (15, AreaSize::Gargantuan),
            Self::Wyrm => (20, AreaSize::Custom(480)),
        };
        return AttackTargeting::Line(width, size, AreaTargets::Everything);
    }

    fn breath_weapon_cone(&self) -> AttackTargeting {
        let size = match self {
            Self::Wyrmling => AreaSize::Small,
            Self::Juvenile => AreaSize::Medium,
            Self::Adult => AreaSize::Large,
            Self::Ancient => AreaSize::Huge,
            Self::Wyrm => AreaSize::Gargantuan,
        };
        return AttackTargeting::Cone(size, AreaTargets::Everything);
    }

    fn glancing_blow(&self) -> bool {
        match self {
            Self::Wyrmling => false,
            Self::Juvenile => true,
            Self::Adult => true,
            Self::Ancient => true,
            Self::Wyrm => true,
        }
    }

    // TODO: handle immunity after initial attack
    fn frightful_presence(&self) -> Option<Attack> {
        let size = match self {
            Self::Wyrmling => None,
            Self::Juvenile => Some(AreaSize::Large),
            Self::Adult => Some(AreaSize::Huge),
            Self::Ancient => Some(AreaSize::Gargantuan),
            Self::Wyrm => Some(AreaSize::Custom(480)),
        };
        if size.is_none() {
            return None;
        }
        let size = size.unwrap();
        return Some(Attack {
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
        });
    }

    fn level(&self) -> i32 {
        match self {
            Self::Wyrmling => 5,
            Self::Juvenile => 9,
            Self::Adult => 13,
            Self::Ancient => 17,
            Self::Wyrm => 21,
        }
    }

    fn damage_rank(&self) -> i32 {
        return ((self.level() - 1) / 3) + 2;
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

    fn attribute_modifiers(&self) -> Vec<i32> {
        match self {
            Self::Black => vec![1, 1, -1, 0, -1, -1],
            Self::Blue => vec![0, 0, 1, 0, 0, -1],
            Self::Brass => vec![0, 0, -1, 0, 1, 1],
            Self::Bronze => vec![0, 0, 0, 0, -1, 1],
            Self::Copper => vec![-1, 1, -1, 1, 1, 0],
            Self::Gold => vec![1, 0, 0, 1, 0, 2],
            Self::Green => vec![-1, 0, -1, 2, 1, 0],
            Self::Red => vec![1, 0, 0, 0, -1, 1],
            Self::Silver => vec![0, 0, 0, 0, 0, 1],
            Self::White => vec![0, 0, 0, -2, -1, -1],
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

    fn damage_type(&self) -> DamageType {
        match self {
            Self::Black => DamageType::Acid,
            Self::Blue => DamageType::Electricity,
            Self::Brass => DamageType::Fire,
            Self::Bronze => DamageType::Electricity,
            Self::Copper => DamageType::Acid,
            Self::Gold => DamageType::Fire,
            Self::Green => DamageType::Acid,
            Self::Red => DamageType::Fire,
            Self::Silver => DamageType::Cold,
            Self::White => DamageType::Cold,
        }
    }

    fn breath_weapon_is_line(&self) -> bool {
        match self {
            Self::Black => true,
            Self::Blue => true,
            Self::Brass => true,
            Self::Bronze => true,
            Self::Copper => true,
            Self::Gold => false,
            Self::Green => false,
            Self::Red => false,
            Self::Silver => false,
            Self::White => false,
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

fn breath_weapon(dragon_type: &DragonType, age_category: &AgeCategory) -> Attack {
    let targeting = if dragon_type.breath_weapon_is_line() {
        age_category.breath_weapon_line()
    } else {
        age_category.breath_weapon_cone()
    };
    // TODO: add cooldown
    return Attack {
        accuracy: 0,
        crit: None,
        defense: Defense::Reflex,
        glance: if age_category.glancing_blow() { Some(AttackEffect::HalfDamage) } else { None },
        hit: AttackEffect::Damage(
            DamageEffect {
                damage_dice: damage_dice::DamageDice::aoe_damage(age_category.damage_rank()),
                damage_modifier: 0,
                damage_types: vec![dragon_type.damage_type()],
                lose_hp_effects: None,
                power_multiplier: 0.5,
                take_damage_effects: None,
            },
        ),
        is_magical: false,
        name: "Breath Weapon".to_string(),
        targeting,
        usage_time: UsageTime::Minor,
        weapon: None,
    };
}

fn dragon(dragon_type: &DragonType, age_category: &AgeCategory) -> Monster {
    let mut attributes = age_category.attributes();
    for (i, modifier) in dragon_type.attribute_modifiers().iter().enumerate() {
        attributes[i] += modifier;
    }
    let mut special_attacks = vec![breath_weapon(dragon_type, age_category)];
    if let Some(f) = age_category.frightful_presence() {
        special_attacks.push(f);
    }
    return Monster::fully_defined(FullMonsterDefinition {
        alignment: dragon_type.alignment().to_string(),
        attributes,
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
        special_attacks: Some(special_attacks),
        special_defense_modifiers: Some(vec![SpecialDefenseModifier::immune_damage(
            dragon_type.damage_type(),
        )]),
        weapons: vec![Weapon::MonsterBite, Weapon::MonsterClaws],
    });
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
