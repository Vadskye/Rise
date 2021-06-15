use crate::core_mechanics::attack_effects::AttackEffect;
use crate::core_mechanics::attacks::Attack;
use crate::core_mechanics::debuffs::Debuff;
use crate::core_mechanics::movement_modes::{FlightManeuverability, MovementMode, SpeedCategory};
use crate::core_mechanics::{attack_effects, damage_types, debuffs, defenses};
use crate::equipment::weapons::Weapon;
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Aberration;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::sizes::Size;
use crate::monsters::{monster_group, FullMonsterDefinition, Monster};
use crate::skills::{HasSkills, Skill};

struct MinimalAberrationDefinition {
    attributes: Vec<i8>,
    challenge_rating: ChallengeRating,
    level: i8,
    name: &'static str,
    size: Size,
    special_attacks: Option<Vec<Attack>>,
    weapons: Vec<Weapon>,
}

fn minimal_aberration(def: MinimalAberrationDefinition) -> Monster {
    return Monster::fully_defined(FullMonsterDefinition {
        // From def
        attributes: def.attributes,
        challenge_rating: def.challenge_rating,
        creature_type: Aberration,
        level: def.level,
        name: def.name,
        size: def.size,
        special_attacks: def.special_attacks,
        weapons: def.weapons,
        // Default values
        alignment: "Always true neutral",
        description: None,
        knowledge: None,
        movement_modes: None,
        skill_points: None,
    });
}

pub fn aberrations() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    // TODO: add ritual casting
    let mut aboleth_slam = Attack::from_weapon(Weapon::Slam);
    if let Some(e) = aboleth_slam.damage_effect_mut() {
        e.lose_hp_effects = Some(vec![attack_effects::AttackEffect::Poison(
            attack_effects::PoisonEffect {
                stage1: vec![Debuff::Nauseated],
                stage3_debuff: None,
                stage3_vital: Some(attack_effects::VitalWoundEffect {
                    special_effect: Some("
                        Instead of making a \\glossterm{vital roll} for the \\glossterm{vital wound},
                          the target's skin is transformed into a clear, slimy membrane.
                        Every 5 minutes, an afflicted creature must be moistened with cool, fresh water
                          or it will gain two \\glossterm<fatigue points>.
                        This effect lasts until the \\glossterm{vital wound} is removed.
                    ".to_string()),
                }),
            },
        )]);
    }
    monsters.push(MonsterEntry::Monster(Monster::fully_defined(
        FullMonsterDefinition {
            alignment: "Usually lawful evil",
            attributes: vec![3, -1, 4, 3, 2, 4],
            challenge_rating: ChallengeRating::Four,
            creature_type: Aberration,
            description: None,
            knowledge: Some(vec![
                (-10, "
                    Legends speak of revolting water-dwelling creatures called aboleths that lurk in the deepest caves.
                    They are said to have power over people's minds.
                "),
                (0, "
                    An aboleth is a Huge fishlike creature found primarily in subterranean lakes and rivers.
                    It has four tentacles and two vertically stacked eyes in the center of its ridged forehead.
                    It uses its powerful mental abilities to overwhelm the minds of its foes.
                "),
                (5, "
                    Four pulsating dark blue orifices line the bottom of an aboleth's body and secrete gray slime that smells like rancid grease.
                    This slime coats its tentacles, and creatures struck by the tentacles can have their skin transformed into a similar slime.
                    Aboleths are amphibious, and they are able to drag themselves along with their tentacles on land, though they are much faster in the water.
                    A typical aboleth weighs about 6,500 pounds.
                "),
                (10, "
                    Aboleths can completely dominate the minds of lesser creatures.
                    They sometimes use their minions as agents to spy in cities or otherwise further their sinister goals.
                "),
            ]),
            level: 12,
            movement_modes: None,
            name: "Aboleth",
            size: Size::Huge,
            skill_points: Some(vec![
                (Skill::Endurance, 3),
                (Skill::Spellsense, 3),
                (Skill::Swim, 3),
            ]),
            special_attacks: Some(vec![aboleth_slam]),
            weapons: vec![Weapon::Slam],
        },
    )));

    return monsters;
}
