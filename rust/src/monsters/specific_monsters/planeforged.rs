use crate::core_mechanics::abilities::{AbilityTag, AbilityType, ActiveAbility};
use crate::core_mechanics::attacks::attack_effect::{AttackTriggeredEffect, PoisonEffect};
use crate::core_mechanics::attacks::{Maneuver, PureDamage, StandardAttack};
use crate::core_mechanics::{
    DamageType, Debuff, Defense, FlightManeuverability, MovementMode, MovementSpeed,
    PassiveAbility, Sense, Size, SpecialDefenseType, SpeedCategory,
};
use crate::creatures::{calculate_standard_rank, Modifier, ModifierBundle, Monster};
use crate::equipment::{StandardWeapon, Weapon, WeaponMaterial};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::Planeforged;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{monster_group, FullMonsterDefinition, Role};
use crate::skills::Skill;

struct FullPlaneforgedDefinition {
    alignment: String,
    attributes: Vec<i32>,
    challenge_rating: ChallengeRating,
    description: Option<String>,
    knowledge: Option<Knowledge>,
    level: i32,
    modifiers: Option<Vec<Modifier>>,
    movement_speeds: Option<Vec<MovementSpeed>>,
    name: String,
    role: Role,
    senses: Option<Vec<Sense>>,
    size: Size,
    trained_skills: Option<Vec<Skill>>,
    weapons: Vec<Weapon>,
}

impl FullPlaneforgedDefinition {
    fn monster(self) -> Monster {
        return FullMonsterDefinition {
            // From self
            alignment: self.alignment,
            attributes: self.attributes,
            challenge_rating: self.challenge_rating,
            description: self.description,
            knowledge: self.knowledge,
            level: self.level,
            modifiers: self.modifiers,
            movement_speeds: self.movement_speeds,
            name: self.name,
            role: self.role,
            senses: self.senses,
            size: self.size,
            trained_skills: self.trained_skills,
            weapons: self.weapons,

            // Default values
            creature_type: Planeforged,
        }
        .monster();
    }
}

pub fn planeforgeds() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    add_angels(&mut monsters);

    add_demons(&mut monsters);

    add_formians(&mut monsters);

    add_elementals(&mut monsters);

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        name: "Imps".to_string(),
        knowledge: None,
        monsters: vec![FullPlaneforgedDefinition {
            alignment: "Always chaotic evil".to_string(),
            attributes: vec![2, 4, 2, 1, 0, -2],
            challenge_rating: ChallengeRating::One,
            description: None,
            knowledge: None,
            level: 10,
            modifiers: None,
            movement_speeds: None,
            name: "Flamefist Imp".to_string(),
            role: Role::Skirmisher,
            senses: None,
            size: Size::Small,
            trained_skills: None,
            weapons: vec![StandardWeapon::Slam
                .weapon()
                .except(|w| w.damage_types.push(DamageType::Fire))],
        }
        .monster()],
    }));

    monsters.push(MonsterEntry::Monster(
        FullPlaneforgedDefinition {
            alignment: "Always chaotic evil".to_string(),
            attributes: vec![3, 2, 3, 2, 4, 4],
            challenge_rating: ChallengeRating::Four,
            description: None,
            knowledge: None,
            level: 13,
            modifiers: Some(vec![
                Modifier::Attack(StandardAttack::Combustion(6).attack()),
                Modifier::Attack(StandardAttack::Pyroclasm(6).attack()),
                Modifier::Attack(StandardAttack::Pyrohemia(6).attack()),
                Modifier::Attack(StandardAttack::Ignition(6).attack()),
                Modifier::Attack(StandardAttack::Pyrophobia(6).attack()),
                Modifier::Vulnerable(SpecialDefenseType::WeaponMaterial(WeaponMaterial::ColdIron)),
            ]),
            movement_speeds: None,
            name: "Soulfire Demon".to_string(),
            role: Role::Sniper,
            senses: None,
            size: Size::Large,
            trained_skills: None,
            weapons: vec![StandardWeapon::HeavyFlail
                .weapon()
                .except(|w| w.damage_types.push(DamageType::Fire))],
        }
        .monster(),
    ));

    return monsters;
}

fn add_angels(monsters: &mut Vec<MonsterEntry>) {
    struct Angel {
        alignment: String,
        attributes: Vec<i32>,
        challenge_rating: ChallengeRating,
        knowledge: Option<Knowledge>,
        level: i32,
        modifiers: Option<Vec<Modifier>>,
        name: String,
        size: Size,
        trained_skills: Option<Vec<Skill>>,
        weapons: Vec<Weapon>,
    }

    impl Angel {
        fn monster(self) -> Monster {
            let rank = calculate_standard_rank(self.level) + self.challenge_rating.rank_modifier();
            let teleport_range = if rank >= 7 {
                "\\extrange"
            } else if rank >= 5 {
                "\\distrange"
            } else if rank >= 3 {
                "\\longrange"
            } else {
                "\\medrange"
            };

            let mut modifiers = self.modifiers.unwrap_or(vec![]);
            modifiers.push(Modifier::Immune(SpecialDefenseType::Debuff(
                Debuff::Shaken("".to_string()),
            )));
            modifiers.push(Modifier::Immune(SpecialDefenseType::Debuff(
                Debuff::Frightened("".to_string()),
            )));
            modifiers.push(Modifier::Immune(SpecialDefenseType::Debuff(
                Debuff::Panicked("".to_string()),
            )));
            modifiers.push(Modifier::Attack(
                StandardAttack::DivineJudgment(rank).attack(),
            ));
            modifiers.push(Modifier::Attack(StandardAttack::WordOfFaith(rank).attack()));
            modifiers.push(Modifier::ActiveAbility(ActiveAbility {
                ability_type: AbilityType::Normal,
                cooldown: None,
                effect: format!(
                    "
                        The $name teleports horizontally into an unoccupied location within {range}.
                        If the destination is invalid, this ability fails with no effect.
                    ",
                    range = teleport_range,
                ),
                is_magical: true,
                name: "Divine Translocation".to_string(),
                tags: None,
                usage_time: None,
            }));
            modifiers.push(Modifier::PassiveAbility(PassiveAbility {
                description: format!("
                    The $name can perform any ritual of rank {} or lower from the \\sphere{{channel divinity}} or \\sphere{{prayer}} mystic spheres.
                    It does not need to expend material components or increase its \\glossterm{{fatigue level}} to perform those ritauls.
                ", rank),
                is_magical: true,
                name: "Divine Rituals".to_string(),
            }));

            return FullPlaneforgedDefinition {
                // From self
                alignment: self.alignment,
                attributes: self.attributes,
                challenge_rating: self.challenge_rating,
                knowledge: self.knowledge,
                level: self.level,
                modifiers: Some(modifiers),
                name: self.name,
                size: self.size,
                trained_skills: self.trained_skills,

                // Default values
                description: None,
                movement_speeds: Some(vec![
                    MovementSpeed::new(
                        MovementMode::Fly(FlightManeuverability::Perfect),
                        SpeedCategory::Fast,
                    ),
                    MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
                ]),
                role: Role::Mystic,
                senses: Some(vec![Sense::Darkvision(120), Sense::LowLightVision]),
                weapons: self.weapons,
            }
            .monster();
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        knowledge: Some(Knowledge::new(vec![
            (-10, "
                Angels are the ultimate champions of good in the endless battle of good and evil.
                They are native to the Celestial Heavens, and they often serve the interests of good-aligned deities.
            "),
            (0, "
                All angels have a striking and highly memorable appearance that evokes strong emotions in most viewers.
                Most angels evoke an overpowering sense of awe and beauty, but individual angels may have highly varied appearances.
            "),
            (10, "
                In battle, angels are feared for their fundamental perfection.
                They tend not to have any weaknesses for attackers to use against them.
                Their only true foes are demons, who use overwhelming hordes rather than any clever tactics.
            "),
        ])),
        name: "Angels".to_string(),
        monsters: vec![
            Angel {
                alignment: "Always neutral good".to_string(),
                attributes: vec![5, 6, 4, 4, 4, 6],
                challenge_rating: ChallengeRating::Four,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Seraphim are six-winged angels of immense power.
                        They burn with holy fire, which they use to immolate evildoers.
                        A seraph resembles a massive serpent that leaves a trail of fire as it flies.
                    "),
                    (5, "
                        Despite their serpentine appearance, seraphim have beautiful singing voices.
                        They sing almost constaintly both in and out of combat.
                    "),
                ])),
                level: 16,
                modifiers: Some(vec![
                    Modifier::Attack(StandardAttack::Combustion(7).attack()),
                    Modifier::Attack(
                        Maneuver::Tenderize
                            .attack(StandardWeapon::MultipedalRam.weapon())
                            .except_hit_damage(|w| w.damage_types.push(DamageType::Fire)),
                    ),
                ]),
                name: "Seraph".to_string(),
                size: Size::Huge,
                trained_skills: Some(vec![
                    Skill::Awareness,
                    Skill::Endurance,
                ]),
                weapons: vec![
                    StandardWeapon::MultipedalBite.weapon()
                        .except(|w| w.damage_types.push(DamageType::Fire)),
                    StandardWeapon::MultipedalRam.weapon()
                        .except(|w| w.damage_types.push(DamageType::Fire)),
                ],
            }
            .monster(),
            Angel {
                alignment: "Always lawful good".to_string(),
                attributes: vec![5, 5, 5, 4, 6, 4],
                challenge_rating: ChallengeRating::Four,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Justicars enforce justice on good-aligned planes.
                        They are extremely skilled at identifying the truth of any situation, and act to deal justice however they see fit.
                        Physically, a justicar appears similar to a large human with strong muscles and a constantly stern expression.
                    "),
                    (5, "
                        In rare circumstances, justicars may leave good-aligned planes to pursue those they see as exceptionally heinous criminals.
                        Generally, this requires that the perpetrator committed a direct offense against a good deity or desecrated an area of a good-aligned plane.
                        Justicars have no interest in mortal matters or minor crimes.
                    "),
                    (10, "
                        Once, a powerful group of thugs and murderers broke through a magic seal guarding an ancient wizard's tower, intending to loot everything inside.
                        They were shocked when a justicar suddenly appeared in front of them, and prepared to fight for their lives.
                        However, the justicar ignored them.
                        Instead, it murdered the ancient wizard of the tower and disappeared, leaving the spoils to the evildoers who broke the seal.

                        This is the morality of a justicar.
                        They consider only truly immense evils to be worthy of their attention, and ignore all lesser sins.
                    "),
                ])),
                level: 14,
                modifiers: Some(vec![
                    Modifier::Attack(
                        Maneuver::StripTheFlesh
                            .attack(StandardWeapon::Greatsword.weapon())
                    ),
                ]),
                name: "Justicar".to_string(),
                size: Size::Large,
                trained_skills: Some(vec![
                    Skill::Awareness,
                    Skill::Deduction,
                    Skill::Endurance,
                    Skill::Intimidate,
                    Skill::SocialInsight,
                ]),
                weapons: vec![
                    StandardWeapon::Greatsword.weapon()
                        .except(|w| w.damage_types.push(DamageType::Energy)),
                ],
            }
            .monster(),
            Angel {
                alignment: "Always neutral good".to_string(),
                attributes: vec![4, 5, 7, 4, 4, 6],
                challenge_rating: ChallengeRating::Four,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Ophanim resemble burning wheels rimmed with many eyes.
                        They serve as sentries and guardians of planar portals in good-aligned planes.
                        In combat, they spin into a raging whirlwind.
                    "),
                ])),
                level: 12,
                modifiers: Some(vec![
                    Modifier::Attack(StandardAttack::Pyroclasm(5).attack()),
                    Modifier::Attack(
                        Maneuver::Whirlwind
                            .attack(StandardWeapon::Slam.weapon())
                            .except_hit_damage(|w| w.damage_types.push(DamageType::Fire)),
                    ),
                ]),
                name: "Ophan".to_string(),
                size: Size::Large,
                trained_skills: Some(vec![
                    Skill::Awareness,
                    Skill::Endurance,
                ]),
                weapons: vec![
                    StandardWeapon::Slam.weapon()
                        .except(|w| w.damage_types.push(DamageType::Fire)),
                ],
            }
            .monster(),
        ],
    }));
}

fn add_demons(monsters: &mut Vec<MonsterEntry>) {
    struct Demon {
        alignment: String,
        attributes: Vec<i32>,
        challenge_rating: ChallengeRating,
        knowledge: Option<Knowledge>,
        level: i32,
        modifiers: Option<Vec<Modifier>>,
        movement_speeds: Option<Vec<MovementSpeed>>,
        name: String,
        role: Role,
        size: Size,
        trained_skills: Option<Vec<Skill>>,
        weapons: Vec<Weapon>,
    }

    impl Demon {
        fn monster(self) -> Monster {
            let mut modifiers = self.modifiers.unwrap_or(vec![]);
            modifiers.push(Modifier::Immune(SpecialDefenseType::Damage(
                DamageType::Fire,
            )));

            return FullPlaneforgedDefinition {
                // From self
                alignment: self.alignment,
                attributes: self.attributes,
                challenge_rating: self.challenge_rating,
                knowledge: self.knowledge,
                level: self.level,
                modifiers: Some(modifiers),
                movement_speeds: self.movement_speeds,
                name: self.name,
                role: self.role,
                size: self.size,
                trained_skills: self.trained_skills,
                weapons: self.weapons,

                // Default values
                description: None,
                senses: None,
            }
            .monster();
        }
    }

    let painborn_demon_spike = StandardWeapon::Slam
        .weapon()
        .except(|w| w.name = "Spike".to_string())
        .except(|w| w.damage_types = vec![DamageType::Piercing]);

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Demonspawn are infernal beings that live in the Abyss.
                They are the weakest and least intelligent type of demon, but they are still dangerous to mortals.
            "),
            (5, "
                Demonspawn were formed in the torturous flames of the Abyss.
                They all share an immunity to fire.
            "),
        ])),
        name: "Demonspawn".to_string(),
        monsters: vec![
            Demon {
                alignment: "Always chaotic evil".to_string(),
                attributes: vec![6, 4, 3, -4, 2, 4],
                challenge_rating: ChallengeRating::Four,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Rageborn demons are anger personified.
                        They lash out constantly and violently at everything around them.
                        If they are left alone, they simply destroy their environment.
                    "),
                    (5, "
                        Since rageborn demons normally feel only anger, they have little experience with other emotions.
                        This makes them easy to mislead with magical effects that manipulate their emotions.
                    "),
                ])),
                level: 5,
                modifiers: Some(vec![
                    Modifier::Attack(StandardAttack::Enrage(2).attack()),
                    Modifier::Maneuver(Maneuver::PowerStrike),
                    Modifier::Vulnerable(SpecialDefenseType::AbilityTag(
                        AbilityTag::Emotion,
                    )),
                ]),
                movement_speeds: None,
                name: "Rageborn Demon".to_string(),
                role: Role::Brute,
                size: Size::Large,
                trained_skills: Some(vec![
                    Skill::Endurance,
                ]),
                weapons: vec![
                    StandardWeapon::MultipedalBite.weapon(),
                    StandardWeapon::Claws.weapon(),
                ],
            }
            .monster(),
            Demon {
                alignment: "Always neutral evil".to_string(),
                attributes: vec![3, 2, 6, -4, 1, 1],
                challenge_rating: ChallengeRating::Four,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Painborn demons are pain personified.
                        They are covered in spikes that pierce their own skin, shifting and causing them pain whenever they move.
                        These unfortunate creatures suffer continously, and they try to share that suffering with anything around them.
                    "),
                    (5, "
                        Painborn demons have a hidden desire that most of them do not even consciously realize: the desire to give up control.
                        Fighting through their constant pain is mentally taxing.
                        Magical effects that compel their actions, freeing them from the burden of choice, are their greatest weakness.
                    "),
                ])),
                level: 5,
                modifiers: Some(vec![
                    Modifier::Attack(
                        Maneuver::GraspingStrike.attack(StandardWeapon::Claws.weapon())
                        .except(|a| a.name = "Impale".to_string())
                    ),
                    Modifier::Attack(StandardAttack::MonsterSpikes(2).attack()),
                    Modifier::Vulnerable(SpecialDefenseType::AbilityTag(
                        AbilityTag::Compulsion,
                    )),
                ]),
                role: Role::Warrior,
                movement_speeds: None,
                name: "Painborn Demon".to_string(),
                size: Size::Medium,
                trained_skills: Some(vec![
                    Skill::Endurance,
                ]),
                weapons: vec![painborn_demon_spike],
            }
            .monster(),
        ],
    }));
}

fn add_elementals(monsters: &mut Vec<MonsterEntry>) {
    struct AirElemental {
        attributes: Vec<i32>,
        challenge_rating: ChallengeRating,
        level: i32,
        name: String,
        size: Size,
    }

    impl AirElemental {
        fn monster(self) -> Monster {
            let rank = calculate_standard_rank(self.level) + self.challenge_rating.rank_modifier();
            let mut modifiers = vec![];
            modifiers.push(Modifier::Vulnerable(SpecialDefenseType::Damage(
                DamageType::Electricity,
            )));
            modifiers.push(Modifier::Attack(StandardAttack::Windslash(rank).attack()));
            if rank >= 3 {
                modifiers.push(Modifier::Attack(StandardAttack::Windsnipe(rank).attack()));
            }
            return FullPlaneforgedDefinition {
                // From self
                attributes: self.attributes,
                challenge_rating: self.challenge_rating,
                level: self.level,
                name: self.name,
                size: self.size,

                // Default values
                alignment: "Usually true neutral".to_string(),
                description: None,
                knowledge: None,
                modifiers: Some(modifiers),
                movement_speeds: Some(vec![MovementSpeed::new(
                    MovementMode::Land,
                    SpeedCategory::Fast,
                )]),
                role: Role::Skirmisher,
                senses: None,
                trained_skills: None,
                weapons: vec![StandardWeapon::Slam.weapon()],
            }
            .monster();
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Air elementals are formed from the pure essence of the Plane of Air.
                They can fly through the air with agile ease, but they tend to be physically frail.
            "),
            (5, "
                Air elementals have no insulation in their wispy bodies, making them vulnerable to electrical attacks.
            "),
        ])),
        name: "Air Elementals".to_string(),
        monsters: vec![
            AirElemental {
                attributes: vec![2, 4, 0, -3, 2, 0],
                challenge_rating: ChallengeRating::One,
                level: 4,
                name: "Breeze".to_string(),
                size: Size::Small,
            }
            .monster(),
            AirElemental {
                attributes: vec![4, 5, 0, -2, 3, 0],
                challenge_rating: ChallengeRating::One,
                level: 8,
                name: "Gale".to_string(),
                size: Size::Medium,
            }
            .monster(),
            AirElemental {
                attributes: vec![4, 5, 0, -2, 4, 0],
                challenge_rating: ChallengeRating::One,
                level: 12,
                name: "Tempest".to_string(),
                size: Size::Large,
            }
            .monster(),
            AirElemental {
                attributes: vec![4, 6, 2, 1, 5, 1],
                challenge_rating: ChallengeRating::Four,
                level: 16,
                name: "Tornado".to_string(),
                size: Size::Large,
            }
            .monster(),
            AirElemental {
                attributes: vec![6, 6, 2, 2, 6, 2],
                challenge_rating: ChallengeRating::Four,
                level: 20,
                name: "Elder".to_string(),
                size: Size::Huge,
            }
            .monster(),
        ],
    }));

    struct FireElemental {
        attributes: Vec<i32>,
        challenge_rating: ChallengeRating,
        level: i32,
        name: String,
        size: Size,
    }

    impl FireElemental {
        fn monster(self) -> Monster {
            let rank = calculate_standard_rank(self.level) + self.challenge_rating.rank_modifier();
            let mut modifiers = vec![];
            modifiers.push(Modifier::Vulnerable(SpecialDefenseType::Damage(
                DamageType::Cold,
            )));
            modifiers.push(Modifier::Attack(StandardAttack::Combustion(rank).attack()));
            modifiers.push(Modifier::Attack(StandardAttack::Firebolt(rank).attack()));
            if rank >= 3 {
                modifiers.push(Modifier::Attack(StandardAttack::Ignition(rank).attack()));
                modifiers.push(Modifier::Attack(StandardAttack::Fireball(rank).attack()));
            }
            return FullPlaneforgedDefinition {
                // From self
                attributes: self.attributes,
                challenge_rating: self.challenge_rating,
                level: self.level,
                name: self.name,
                size: self.size,

                // Default values
                alignment: "Usually true neutral".to_string(),
                description: None,
                knowledge: None,
                modifiers: Some(modifiers),
                movement_speeds: Some(vec![MovementSpeed::new(
                    MovementMode::Land,
                    SpeedCategory::Fast,
                )]),
                role: Role::Skirmisher,
                senses: None,
                trained_skills: None,
                weapons: vec![StandardWeapon::Slam
                    .weapon()
                    .except(|w| w.damage_types.push(DamageType::Fire))],
            }
            .monster();
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Fire elementals are formed from the pure essence of the Plane of Fire.
                They tend to be fast and agile, and they burn their opponents to ash in combat.
            "),
            (5, "
                Fire elementals burn fast and bright, with little insulation from their surroundings.
                This makes them vulnerable to cold attacks, which can chill their very core.
            "),
        ])),
        name: "Fire Elementals".to_string(),
        monsters: vec![
            FireElemental {
                attributes: vec![2, 4, 0, -3, 0, 2],
                challenge_rating: ChallengeRating::One,
                level: 4,
                name: "Ember".to_string(),
                size: Size::Small,
            }
            .monster(),
            FireElemental {
                attributes: vec![4, 5, 0, -2, 0, 2],
                challenge_rating: ChallengeRating::One,
                level: 8,
                name: "Kindled".to_string(),
                size: Size::Medium,
            }
            .monster(),
            FireElemental {
                attributes: vec![4, 5, 0, -2, 0, 2],
                challenge_rating: ChallengeRating::One,
                level: 12,
                name: "Bonfire".to_string(),
                size: Size::Large,
            }
            .monster(),
            FireElemental {
                attributes: vec![4, 6, 2, 1, 2, 4],
                challenge_rating: ChallengeRating::Four,
                level: 16,
                name: "Inferno".to_string(),
                size: Size::Large,
            }
            .monster(),
            FireElemental {
                attributes: vec![6, 6, 2, 2, 2, 4],
                challenge_rating: ChallengeRating::Four,
                level: 20,
                name: "Elder".to_string(),
                size: Size::Huge,
            }
            .monster(),
        ],
    }));

    struct MagmaElemental {
        attributes: Vec<i32>,
        challenge_rating: ChallengeRating,
        level: i32,
        modifiers: Vec<Modifier>,
        name: String,
        size: Size,
    }

    impl MagmaElemental {
        fn monster(mut self) -> Monster {
            self.modifiers
                .push(Modifier::Vulnerable(SpecialDefenseType::Damage(
                    DamageType::Piercing,
                )));
            self.modifiers
                .push(Modifier::Impervious(SpecialDefenseType::Damage(
                    DamageType::Cold,
                )));
            return FullPlaneforgedDefinition {
                // From self
                attributes: self.attributes,
                challenge_rating: self.challenge_rating,
                level: self.level,
                modifiers: Some(self.modifiers),
                name: self.name,
                size: self.size,

                // Default values
                alignment: "Usually true neutral".to_string(),
                description: None,
                knowledge: None,
                movement_speeds: None,
                role: Role::Brute,
                senses: None,
                trained_skills: None,
                weapons: vec![StandardWeapon::Slam
                    .weapon()
                    .except(|w| w.damage_types.push(DamageType::Fire))],
            }
            .monster();
        }
    }

    fn generate_magma_throw(rank: i32) -> Modifier {
        return Modifier::Attack(
            StandardAttack::Firebolt(rank)
                .attack()
                .except(|a| a.name = "Magma Throw".to_string())
                .except(|a| a.is_magical = false)
                .except_hit_damage(|d| d.damage_types.push(DamageType::Bludgeoning)),
        );
    }

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        knowledge: Some(Knowledge::new(vec![(
            0,
            "
                Magma elementals are a fusion of the Plane of Earth and the Plane of Fire.
                They combine the durability of earth elementals with some of the agility of fire elementals.
                Their outer shell appears rocky, but inside that shell they hold molten rock at incredible temperatures.
            ",
        ), (
            5,
            "
                Magma elementals lack the usual weaknesses of both fire elementals and earth elementals.
                Their massive internal heat, shielded from outside attack, actually makes them less vulnerable to cold.
                However, piercing attacks can penetrate their outer shell, causing the magma inside to spew out until it cools.
            ",
        )])),
        name: "Magma Elementals".to_string(),
        monsters: vec![
            MagmaElemental {
                attributes: vec![4, 4, 5, -4, 0, 0],
                challenge_rating: ChallengeRating::One,
                level: 6,
                modifiers: vec![
                    Modifier::Attack(StandardAttack::Combustion(2).attack()),
                    generate_magma_throw(2),
                ],
                name: "Volcanite".to_string(),
                size: Size::Medium,
            }
            .monster(),
            MagmaElemental {
                attributes: vec![5, 5, 6, -3, 0, 0],
                challenge_rating: ChallengeRating::One,
                level: 12,
                modifiers: vec![
                    Modifier::Attack(StandardAttack::Combustion(4).attack()),
                    generate_magma_throw(4),
                ],
                name: "Volcano".to_string(),
                size: Size::Large,
            }
            .monster(),
            MagmaElemental {
                attributes: vec![5, 5, 6, -3, 0, 0],
                challenge_rating: ChallengeRating::Four,
                level: 18,
                modifiers: vec![
                    Modifier::Attack(StandardAttack::Combustion(6).attack()),
                    generate_magma_throw(6),
                ],
                name: "Volcanic Titan".to_string(),
                size: Size::Huge,
            }
            .monster(),
        ],
    }));

    monsters.push(MonsterEntry::Monster(
        FullPlaneforgedDefinition {
            alignment: "Always chaotic neutral".to_string(),
            attributes: vec![-2, 4, 0, 0, 2, -2],
            challenge_rating: ChallengeRating::One,
            description: None,
            knowledge: None,
            level: 5,
            modifiers: Some(vec![Modifier::Attack(
                PureDamage {
                    damage_types: vec![DamageType::Electricity],
                    defense: Defense::Fortitude,
                    is_magical: true,
                    is_maneuver: false,
                    name: "Static Shock".to_string(),
                    range: None,
                    rank: 2,
                }
                .attack(),
            )]),
            movement_speeds: None,
            name: "Spark Elemental".to_string(),
            role: Role::Skirmisher,
            senses: None,
            size: Size::Small,
            trained_skills: None,
            weapons: vec![StandardWeapon::Slam
                .weapon()
                .except(|w| w.damage_types.push(DamageType::Electricity))],
        }
        .monster(),
    ));
}

fn add_formians(monsters: &mut Vec<MonsterEntry>) {
    struct Formian {
        attributes: Vec<i32>,
        challenge_rating: ChallengeRating,
        knowledge: Option<Knowledge>,
        level: i32,
        modifiers: Option<Vec<Modifier>>,
        movement_speeds: Option<Vec<MovementSpeed>>,
        name: String,
        role: Role,
        size: Size,
        trained_skills: Option<Vec<Skill>>,
        weapons: Vec<Weapon>,
    }

    impl Formian {
        fn monster(self) -> Monster {
            let rank = calculate_standard_rank(self.level) + self.challenge_rating.rank_modifier();
            let tremorsense_radius = if rank >= 7 {
                480
            } else if rank >= 5 {
                240
            } else if rank >= 3 {
                120
            } else {
                60
            };
            let tremorsight_radius = tremorsense_radius / 4;

            let mut modifiers = self.modifiers.unwrap_or(vec![]);
            modifiers.push(Modifier::PassiveAbility(PassiveAbility {
                description: r"
                    All formians within 50 miles of their queen are in constant telepathic communication with her, regardless of any intervening physical obstacles.
                    They instantaneously share information about threats and discoveries.
                    This allows formians to usually respond to new information intelligently and in perfect unison, regardless of each formian's individual intelligence.
                ".to_string(),
                is_magical: true,
                name: "Hive Mind".to_string(),
            }));
            modifiers.push(Modifier::Immune(SpecialDefenseType::Damage(
                DamageType::Fire,
            )));

            return FullPlaneforgedDefinition {
                // From self
                attributes: self.attributes,
                challenge_rating: self.challenge_rating,
                knowledge: self.knowledge,
                level: self.level,
                modifiers: Some(ModifierBundle::Mindless.plus_modifiers(modifiers)),
                movement_speeds: self.movement_speeds,
                name: self.name,
                role: self.role,
                size: self.size,
                trained_skills: self.trained_skills,
                weapons: self.weapons,

                // Default values
                alignment: "Always lawful neutral".to_string(),
                description: None,
                senses: Some(vec![
                    Sense::Tremorsense(tremorsense_radius),
                    Sense::Tremorsight(tremorsight_radius),
                ]),
            }
            .monster();
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Formians are ant-like inhabitants native to Ordus, the Aligned Plane of law.
                They share a hive mind that allows telepathic communication at great distances.
            "),
            (5, "
                All formians can sense their surroundings instinctively by feeling tremors in the ground.
                Most formians are simple drones with no independent thought or agency; they act only as directed by their queen.
                As a result, they fight with no concern for their own lives, serving only the greater good of the group.
                They may still retreat to avoid expending unnecessary resources on a battle that is already lost.
            "),
            (10, "
                Formians often attempt to set up colonies in unclaimed locations on other planes to expand their influence, though they never attack civilizations or sentient creatures to do so.
                Once they have established their colonies, they consider themselves to have a rightful claim to that land, and they can be highly territorial.

                If a formian queen is killed, all formians it was controlling immediately become inert, taking no actions of any kind.
                These isolated formians typically die of dehydration or similar causes, though in rare cases they may be claimed by another formian queen.
            "),
        ])),
        name: "Formians".to_string(),
        monsters: vec![
            Formian {
                attributes: vec![1, 3, -1, -2, 0, -2],
                challenge_rating: ChallengeRating::One,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Workers are the basic building blocks of formian society.
                        A typical worker is about 3 feet long and about 2-1/2 feet high at the front.
                        Its hands are suitable only for manual labor.
                    "),
                    (5, "
                        Individual workers are mindless, but they are given instructions by the hive mind.
                        Even the smallest formian colony typically has hundreds of workers, and larger colonies can have tens of thousands.
                        Workers are generally given orders by a formian queen in groups of at least five, and it is rare to see an individual worker on its own.
                    "),
                ])),
                level: 1,
                modifiers: Some(ModifierBundle::Multipedal.modifiers()),
                movement_speeds: None,
                name: "Worker".to_string(),
                role: Role::Skirmisher,
                size: Size::Medium,
                trained_skills: Some(vec![
                    Skill::Craft,
                ]),
                weapons: vec![
                    StandardWeapon::MultipedalBite.weapon(),
                ],
            }
            .monster(),
            Formian {
                attributes: vec![3, 3, 1, -4, 3, 0],
                challenge_rating: ChallengeRating::One,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                        Warriors are the basic fighting unit of formian society.
                        In combat, warriors use their high mobility to ruthlessly coordinate attacks on their most dangerous or most vulnerable foes.
                    "),
                    (5, "
                        Even the smallest formian colony typically has dozens of warriors, and larger colonies can have thousands.
                    "),
                ])),
                level: 5,
                modifiers: Some(ModifierBundle::Multipedal.plus_modifiers(vec![
                    Modifier::Attack(
                        StandardWeapon::MultipedalStinger.weapon().attack()
                        .except_hit_damage(
                            |d| d.lose_hp_effect = Some(
                                AttackTriggeredEffect::Poison(PoisonEffect {
                                    stage1: vec![Debuff::Dazed],
                                    stage3_debuff: Some(vec![Debuff::Stunned]),
                                    stage3_vital: None,
                                })
                            )
                        )
                    ),
                ])),
                movement_speeds: Some(vec![
                    MovementSpeed::new(MovementMode::Land, SpeedCategory::Fast)
                ]),
                name: "Warrior".to_string(),
                role: Role::Warrior,
                size: Size::Medium,
                trained_skills: Some(vec![
                    Skill::Awareness,
                    Skill::Climb,
                    Skill::Endurance,
                    Skill::Jump,
                ]),
                weapons: vec![StandardWeapon::MultipedalStinger.weapon()],
            }
            .monster(),
        ],
    }));
}
