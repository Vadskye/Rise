use crate::core_mechanics::attack_effects::AttackEffect;
use crate::core_mechanics::attacks::{Attack, AttackTargeting, SimpleAttack, AreaSize, AreaTargets};
use crate::core_mechanics::damage_types::DamageType;
use crate::core_mechanics::debuffs::Debuff;
use crate::core_mechanics::defenses::Defense;
use crate::core_mechanics::movement_modes::{FlightManeuverability, MovementMode, SpeedCategory};
use crate::core_mechanics::{attack_effects, damage_types, debuffs, defenses};
use crate::equipment::weapons::Weapon;
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Aberration;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::sizes::Size;
use crate::core_mechanics::passive_abilities::PassiveAbility;
use crate::monsters::{monster_group, FullMonsterDefinition, Monster};
use crate::core_mechanics::senses::Sense;
use crate::skills::Skill;

struct FullAberrationDefinition {
    alignment: &'static str,
    attributes: Vec<i8>,
    challenge_rating: ChallengeRating,
    description: Option<&'static str>,
    knowledge: Option<Vec<(i8, &'static str)>>,
    level: i8,
    movement_modes: Option<Vec<MovementMode>>,
    name: &'static str,
    passive_abilities: Option<Vec<PassiveAbility>>,
    senses: Option<Vec<Sense>>,
    skill_points: Option<Vec<(Skill, i8)>>,
    size: Size,
    special_attacks: Option<Vec<Attack>>,
    weapons: Vec<Weapon>,
}

fn aberration(def: FullAberrationDefinition) -> Monster {
    return Monster::fully_defined(FullMonsterDefinition {
        // From def
        alignment: def.alignment,
        attributes: def.attributes,
        challenge_rating: def.challenge_rating,
        description: def.description,
        knowledge: def.knowledge,
        level: def.level,
        movement_modes: def.movement_modes,
        name: def.name,
        passive_abilities: def.passive_abilities,
        senses: def.senses,
        size: def.size,
        skill_points: def.skill_points,
        special_attacks: def.special_attacks,
        weapons: def.weapons,

        // Default values
        creature_type: Aberration,
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
    aboleth_slam.glance = Some(AttackEffect::HalfDamage);
    monsters.push(MonsterEntry::Monster(aberration(FullAberrationDefinition {
        alignment: "Usually lawful evil",
        attributes: vec![3, -1, 4, 3, 2, 4],
        challenge_rating: ChallengeRating::Four,
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
        passive_abilities: None,
        senses: Some(vec![Sense::Darkvision(240), Sense::Telepathy(900)]),
        size: Size::Huge,
        skill_points: Some(vec![
            (Skill::Endurance, 3),
            (Skill::Spellsense, 3),
            (Skill::Swim, 3),
        ]),
        special_attacks: Some(vec![
            aboleth_slam,
            Attack::aoe_damage(SimpleAttack {
                damage_types: vec![DamageType::Energy],
                defense: Defense::Mental,
                glance_half: true,
                is_magical: true,
                name: "Mind Crush".to_string(),
                rank: 5,
                targeting: AttackTargeting::Cone(AreaSize::Large, AreaTargets::Enemies),
            }),
        ]),
        weapons: vec![Weapon::Slam],
    })));

    return monsters;
}
