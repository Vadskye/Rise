use crate::core_mechanics::attacks::attack_effect::HealingEffect;
use crate::core_mechanics::attacks::{Maneuver, StandardAttack};
use crate::core_mechanics::{
    DamageDice, DamageType, Defense, FlightManeuverability, MovementMode, MovementSpeed,
    PassiveAbility, Sense, Size, SpecialDefenseType, SpeedCategory,
};
use crate::creatures::{Modifier, ModifierBundle, Monster};
use crate::equipment::{StandardWeapon, Weapon};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::MagicalBeast;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::{monster_group, FullMonsterDefinition, Role};
use crate::skills::Skill;

struct FullMagicalBeastDefinition {
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

impl FullMagicalBeastDefinition {
    fn monster(self) -> Monster {
        return FullMonsterDefinition {
            // From def
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

            creature_type: MagicalBeast,
        }
        .monster();
    }
}

pub fn magical_beasts() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::Monster(FullMagicalBeastDefinition {
        alignment: "Always true neutral".to_string(),
        attributes: vec![5, 4, 1, -8, 2, -2],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                An ankheg is a Large burrowing ant-like creature with large mandibles and a taste for fresh meat.
                It has six legs, and most ankhegs are brown.
                In battle, they try to emerge briefly out of tunnels to ambush unwary foes and drag them underground.
            "),
            (5, "
                A typical adult ankheg is about 10 feet long and weighs about 800 pounds.
                Ankhegs burrow quickly thanks to the powerful acid they naturally produce.
                They are able spit that acid at foes up to 20 feet away.
                When burrowing, they usually do not leave usable tunnels behind them.
                They can choose to do so, though this halves their burrowing speed.
            "),
            (10, "
                When hunting, ankhegs usually dig a winding tunnel up to 40 feet below the surface in the rich soil of forests or farmlands.
                The tunnel usually 5 feet tall and wide, and up to 150 feet long.
                If they have been in an area for some time, they generally store the remains from previous kills at the end of the tunnel.
                When they move on, they leave any valuable objects behind with their old tunnels.
            "),
        ])),
        level: 4,
        modifiers: Some(ModifierBundle::Multipedal.plus_modifiers(vec![
            Modifier::Attack(
                StandardAttack::BreathWeaponLine(2, DamageType::Acid, Defense::Reflex)
                    .attack()
                    .except(|a| a.name = "Spit Acid".to_string()),
            ),
        ])),
        movement_speeds: Some(vec![
            MovementSpeed::new(MovementMode::Burrow, SpeedCategory::Slow),
            MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
        ]),
        name: "Ankheg".to_string(),
        role: Role::Skirmisher,
        senses: Some(vec![Sense::Darkvision(60), Sense::Tremorsense(60)]),
        size: Size::Large,
        trained_skills: Some(vec![
            Skill::Awareness,
            Skill::Climb,
        ]),
        weapons: vec![
            StandardWeapon::MultipedalBite.weapon().except(|w| w.damage_types.push(DamageType::Acid)),
        ],
    }.monster()));

    monsters.push(MonsterEntry::Monster(FullMagicalBeastDefinition {
        alignment: "Always true neutral".to_string(),
        attributes: vec![3, 4, 1, -8, 0, 3],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                A nightcrawler is a Large worm imbued with umbramantic power.
                Its body is colored only in shades of gray.
                In battle, they wriggle towards their foes and try to eat them.
            "),
            (5, "
                A typical nightcrawler is about 9 feet long and weighs about 700 pounds.
                They move slowly, but are surprisingly agile in combat.
                They can easily contort their body to avoid attacks or wrap around the defenses of foes.
                Nightcrawlers have several magical abilities that draw on their umbramantic power to inflict cold damage on nearby foes.
            "),
            (10, "
                Nightcrawlers hate and fear light.
                They can be driven away by light, but if they have no escape, they ferociously attack any sources of light.
            "),
        ])),
        level: 7,
        modifiers: Some(vec![
            Modifier::Attack(
                StandardAttack::DarkMiasma(3)
                    .attack()
                    .except(|a| a.name = "Crawling Darkness".to_string())
            ),
            Modifier::Attack(
                StandardAttack::DarkGrasp(3)
                    .attack()
                    .except(|a| a.name = "Dark Embrace".to_string())
            ),
        ]),
        movement_speeds: Some(vec![
            MovementSpeed::new(MovementMode::Climb, SpeedCategory::Slow),
            MovementSpeed::new(MovementMode::Land, SpeedCategory::Slow),
        ]),
        name: "Nightcrawler".to_string(),
        role: Role::Brute,
        senses: Some(vec![Sense::Darkvision(60), Sense::Blindsense(120)]),
        size: Size::Large,
        trained_skills: Some(vec![
            Skill::Climb,
        ]),
        weapons: vec![StandardWeapon::Slam.weapon()],
    }.monster()));

    monsters.push(MonsterEntry::Monster(FullMagicalBeastDefinition {
        alignment: "Always true neutral".to_string(),
        attributes: vec![4, 4, 1, -8, 2, -1],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                A hydra maggot is a Large maggot-like creature that wriggles across the ground in search of food.
                It is named for the cluster of tentacles that sprout from its heads, which it uses to grab foes so it can eat them.
            "),
            (5, "
                Hydra maggots are carnivorous, but are not picky, and will feast on rotting carcasses just as happily as they feast on fresh meat.
                When hydra maggots attack, they can shape the tip of their tentacles into a point, allowing them to impale their foes.
                Their tentacles are quite adept at slipping past defenses and through cracks in armor.
            "),
        ])),
        level: 7,
        modifiers: Some(vec![
            Modifier::Attack(
                Maneuver::ArmorpiercerPlus
                    .attack(StandardWeapon::Slam.weapon())
                    .except(|a| a.name = "Impaling Tentacles".to_string())
                    .except_hit_damage(|d| d.damage_types = vec![DamageType::Piercing])
            ),
            Modifier::Maneuver(Maneuver::GraspingStrike),
        ]),
        movement_speeds: None,
        name: "Hydra Maggot".to_string(),
        role: Role::Brute,
        senses: Some(vec![Sense::Darkvision(60)]),
        size: Size::Large,
        trained_skills: Some(vec![
            Skill::Climb,
        ]),
        weapons: vec![StandardWeapon::Slam.weapon()],
    }.monster()));

    let stygian_leech_bite = StandardWeapon::MultipedalBite
        .weapon()
        .except(|w| w.damage_types.push(DamageType::Energy));
    monsters.push(MonsterEntry::Monster(FullMagicalBeastDefinition {
        alignment: "Always true neutral".to_string(),
        attributes: vec![2, 3, 0, -6, 2, 3],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                A stygian leech is a Medium worm-like creature that feeds on life energy.
                It uses its ability to crawl on walls and ceilings to drop on unsuspecting foes.
            "),
            (5, "
                Stygian leeches instinctively avoid feeding on other stygian leeches, but will otherwise attempt to drain the life from any living creatures, regardless of danger.
                They can instinctively sense the location of any living creatures nearby.
                Their life-draining attacks can allow them to heal themselves.
            "),
            (10, "
                Stygian leeches ignore non-living creatures entirely unless severely provoked.
                Some non-living creatures, such as intelligent undead, take advantage of this by gathering stygian leeches to guard their homes.
            "),
        ])),
        level: 7,
        modifiers: Some(vec![
            Modifier::Attack(
                stygian_leech_bite.attack()
                    .except(|a| a.name = "Leech Life".to_string())
                    .except_hit_damage(|d| d.vampiric_healing = Some(HealingEffect {
                            healing_dice: DamageDice::aoe_damage(3),
                            is_magical: true,
                            power_multiplier: 1.0,
                        }
                    ))
            ),
        ]),
        movement_speeds: Some(vec![
            MovementSpeed::new(MovementMode::Climb, SpeedCategory::Normal),
            MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
        ]),
        name: "Stygian Leech".to_string(),
        role: Role::Brute,
        senses: Some(vec![Sense::Darkvision(120), Sense::Lifesense(120)]),
        size: Size::Medium,
        trained_skills: Some(vec![
            Skill::Climb,
        ]),
        weapons: vec![stygian_leech_bite],
    }.monster()));

    monsters.push(MonsterEntry::Monster(FullMagicalBeastDefinition {
        alignment: "Always true neutral".to_string(),
        attributes: vec![4, 4, -2, -6, 3, 0],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                A darkmantle has a small body and a large number of strong tentacles.
                It hides itself on walls and ceilings and drops on its foes to strangle them to death.
            "),
            (5, r#"
                Darkmantles hang from ceilings using a muscular "foot" at the top of their bodies.
                They can look like a stalactite by holding their tentacles stiffly under themeselves, or like a lump of rock by spreading their tentacles so the membrane between them covers their bodies.
                Their shell and skin usually resemble limestone, but a darkmantle can change its color to match almost any type of stony background.
            "#),
            (10, "
                A darkmantle that misses its initial attack often climbs away and tries to drop on the opponent again if there is a conveniently placed wall.
                Otherwise, it tries to climb its opponent's body to suffocate its head.
                Darkmantles move very slowly, so they rely heavily on stealth to ambush their foes.
            "),
        ])),
        level: 2,
        modifiers: Some(vec![
            Modifier::Maneuver(Maneuver::GraspingStrike),
        ]),
        movement_speeds: Some(vec![
            MovementSpeed::new(MovementMode::Climb, SpeedCategory::Slow),
            MovementSpeed::new(MovementMode::Land, SpeedCategory::Slow),
        ]),
        name: "Darkmantle".to_string(),
        role: Role::Skirmisher,
        senses: Some(vec![Sense::Darkvision(120)]),
        size: Size::Small,
        trained_skills: Some(vec![
            Skill::Awareness,
            Skill::Climb,
            Skill::Stealth,
        ]),
        weapons: vec![StandardWeapon::Slam.weapon()],
    }.monster()));

    monsters.push(MonsterEntry::Monster(FullMagicalBeastDefinition {
        alignment: "Usually true neutral".to_string(),
        attributes: vec![4, 4, 1, -3, 2, 2],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                Griffons are powerful, majestic creatures with characteristics of both lions and eagles.
                A pair of broad, golden wings emerge from the creature’s back that can span 25 feet or more.
                In battle, they pounce on their foes like a lion.
            "),
            (5, "
                From nose to tail, an adult griffon can measure as much as 8 feet.
                Neither males nor females are endowed with a mane.
                Griffons cannot speak, but they understand Common.
            "),
        ])),
        level: 5,
        modifiers: Some(ModifierBundle::Multipedal.plus_modifiers(vec![
            Modifier::Attack(
                Maneuver::PouncingStrike.attack(StandardWeapon::Claws.weapon()),
            ),
        ])),
        movement_speeds: Some(vec![
            MovementSpeed::new(MovementMode::Fly(FlightManeuverability::Poor), SpeedCategory::Fast),
            MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
        ]),
        name: "Griffon".to_string(),
        role: Role::Skirmisher,
        senses: Some(vec![Sense::LowLightVision]),
        size: Size::Large,
        trained_skills: Some(vec![
            Skill::Awareness,
        ]),
        weapons: vec![
            StandardWeapon::MultipedalBite.weapon(),
            StandardWeapon::Claws.weapon(),
        ],
    }.monster()));

    monsters.push(MonsterEntry::Monster(FullMagicalBeastDefinition {
        alignment: "Usually true neutral".to_string(),
        attributes: vec![4, 2, 2, -4, 6, -1],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, r#"
              Yrthaks are virtually blind.
              They can "see" in a short range around them with their blindsight ability, which relies on their incredible hearing.
              Beyond that range, they cannot see, though they can still identify the existence and location of creatures at great range by sound.
            "#),
        ])),
        level: 6,
        modifiers: Some(vec![
            Modifier::Attack(
                StandardAttack::BreathWeaponLine(3, DamageType::Bludgeoning, Defense::Fortitude)
                    .attack()
                    .except(|a| a.name = "Sonic Lance".to_string()),
            ),
            Modifier::Attack(
                StandardAttack::YrthakThunderingHide.attack(),
            ),
            Modifier::Maneuver(Maneuver::PouncingStrike),
        ]),
        movement_speeds: Some(vec![
            MovementSpeed::new(MovementMode::Fly(FlightManeuverability::Poor), SpeedCategory::Fast),
            MovementSpeed::new(MovementMode::Land, SpeedCategory::Normal),
        ]),
        name: "Yrthak".to_string(),
        role: Role::Skirmisher,
        senses: Some(vec![Sense::Blindsight(120)]),
        size: Size::Huge,
        trained_skills: Some(vec![
            Skill::Awareness,
        ]),
        weapons: vec![
            StandardWeapon::MultipedalBite.weapon(),
        ],
    }.monster()));

    struct IchorDefinition {
        attributes: Vec<i32>,
        challenge_rating: ChallengeRating,
        level: i32,
        modifiers: Option<Vec<Modifier>>,
        name: String,
        role: Role,
        size: Size,
        trained_skills: Option<Vec<Skill>>,
        weapons: Vec<Weapon>,
    }

    impl IchorDefinition {
        fn monster(self) -> Monster {
            let mut modifiers = self.modifiers.unwrap_or(vec![]);
            modifiers.push(
                Modifier::PassiveAbility(PassiveAbility {
                    name: "Spreading Ichor".to_string(),
                    is_magical: true,
                    description: r"
                        Whenever the $name causes a living creature to lose \glossterm{hit points}, that creature becomes unable to regain hit points as a \glossterm{condition}.
                    ".to_string(),
                })
            );
            modifiers.push(Modifier::Vulnerable(SpecialDefenseType::Damage(
                DamageType::Fire,
            )));
            modifiers.push(Modifier::Immune(SpecialDefenseType::CriticalHits));
            return FullMagicalBeastDefinition {
                alignment: "Always true neutral".to_string(),
                attributes: self.attributes,
                challenge_rating: self.challenge_rating,
                description: None,
                knowledge: None,
                // Should be (base animal + 4)
                level: self.level,
                modifiers: Some(modifiers),
                movement_speeds: Some(vec![MovementSpeed::new(
                    MovementMode::Land,
                    SpeedCategory::Normal,
                )]),
                name: self.name,
                role: self.role,
                senses: Some(vec![Sense::Darkvision(60)]),
                size: self.size,
                trained_skills: self.trained_skills,
                weapons: self.weapons,
            }
            .monster();
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(monster_group::MonsterGroup {
        knowledge: Some(Knowledge::new(vec![
            (0, "
                The dreadful magical liquid known as ichor has no known origin.
                All is known is that it can corrupt creatures who contact it.
                Creatures who become tainted in this way recklessly attack anything they encounter, making them extremely dangerous.
            "),
            (5, "
                Ichor-tainted creatures have had their internal organs restructured in unnatural ways, making them difficult to dispatch quickly.
                When the ichor spreads, as it often does during a fight, it inhibits healing as it tries to corrupt its new host.
            "),
            (10, "
                Only animals can be fully transformed by ichor.
                Other creatures suffer temporary effects at worst.
                The biological structure of transformed animals bears some resemblance to aberrations.
                Some scholars theorize that this means the ichor originated from the Far Realm, while others think it is a mere imitation.
            "),
        ])),
        name: "Ichor-Tainted".to_string(),
        monsters: vec![
            IchorDefinition {
                attributes: vec![4, 0, 4, -9, 0, -1],
                challenge_rating: ChallengeRating::One,
                level: 7,
        modifiers: Some(ModifierBundle::Multipedal.modifiers()),
                name: "Ichor Black Bear".to_string(),
                role: Role::Brute,
                size: Size::Medium,
                trained_skills: Some(vec![Skill::Climb, Skill::Endurance, Skill::Swim]),
                weapons: vec![
                    StandardWeapon::MultipedalBite.weapon(),
                    StandardWeapon::Claws.weapon(),
                ],
            }
            .monster(),
            IchorDefinition {
                attributes: vec![5, 0, 6, -9, 2, 0],
                challenge_rating: ChallengeRating::Four,
                level: 9,
        modifiers: Some(ModifierBundle::Multipedal.modifiers()),
                name: "Ichor Brown Bear".to_string(),
                role: Role::Brute,
                size: Size::Large,
                trained_skills: Some(vec![Skill::Climb, Skill::Endurance, Skill::Swim]),
                weapons: vec![
                    StandardWeapon::MultipedalBite.weapon(),
                    StandardWeapon::Claws.weapon(),
                ],
            }
            .monster(),
            IchorDefinition {
                attributes: vec![-1, 4, -1, -9, 2, -3],
                challenge_rating: ChallengeRating::One,
                level: 1,
        modifiers: Some(ModifierBundle::Multipedal.modifiers()),
                name: "Ichor Rat".to_string(),
                role: Role::Skirmisher,
                size: Size::Tiny,
                trained_skills: Some(vec![Skill::Awareness]),
                weapons: vec![StandardWeapon::MultipedalBite.weapon()],
            }
            .monster(),
            IchorDefinition {
                attributes: vec![6, 1, 4, -7, 4, -1],
                challenge_rating: ChallengeRating::Four,
                level: 13,
                modifiers: None,
                name: "Ichor Roc".to_string(),
                role: Role::Brute,
                size: Size::Gargantuan,
                trained_skills: Some(vec![Skill::Awareness]),
                weapons: vec![
                    StandardWeapon::MultipedalBite.weapon(),
                    StandardWeapon::Talon.weapon(),
                ],
            }
            .monster(),
            IchorDefinition {
                attributes: vec![3, 4, 3, -9, 3, -1],
                challenge_rating: ChallengeRating::One,
                level: 5,
        modifiers: Some(ModifierBundle::Multipedal.modifiers()),
                name: "Ichor Wolf".to_string(),
                role: Role::Skirmisher,
                size: Size::Medium,
                trained_skills: Some(vec![Skill::Awareness]),
                weapons: vec![StandardWeapon::MultipedalBite.weapon()],
            }
            .monster(),
        ],
    }));

    return monsters;
}
