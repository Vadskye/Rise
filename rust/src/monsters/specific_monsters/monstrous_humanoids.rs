use crate::core_mechanics::attacks::{Maneuver, StandardAttack};
use crate::core_mechanics::{MovementSpeed, Sense, Size};
use crate::creatures::{Modifier, Monster};
use crate::equipment::{StandardWeapon, Weapon, WeaponTag};
use crate::monsters::challenge_rating::ChallengeRating;
use crate::monsters::creature_type::CreatureType::MonstrousHumanoid;
use crate::monsters::knowledge::Knowledge;
use crate::monsters::monster_entry::MonsterEntry;
use crate::monsters::monster_group::MonsterGroup;
use crate::monsters::FullMonsterDefinition;
use crate::skills::Skill;

struct FullMonstrousHumanoidDefinition {
    alignment: String,
    attributes: Vec<i32>,
    challenge_rating: ChallengeRating,
    description: Option<String>,
    knowledge: Option<Knowledge>,
    level: i32,
    modifiers: Option<Vec<Modifier>>,
    movement_speeds: Option<Vec<MovementSpeed>>,
    name: String,
    senses: Option<Vec<Sense>>,
    size: Size,
    trained_skills: Option<Vec<Skill>>,
    weapons: Vec<Weapon>,
}

impl FullMonstrousHumanoidDefinition {
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
            senses: self.senses,
            size: self.size,
            trained_skills: self.trained_skills,
            weapons: self.weapons,

            creature_type: MonstrousHumanoid,
        }
        .monster();
    }
}

pub fn monstrous_humanoids() -> Vec<MonsterEntry> {
    let mut monsters: Vec<MonsterEntry> = vec![];

    monsters.push(MonsterEntry::Monster(FullMonstrousHumanoidDefinition {
        alignment: "Always true neutral".to_string(),
        attributes: vec![5, -1, 3, 0, 2, 1],
        challenge_rating: ChallengeRating::Four,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                A minotaur is a Large bull-headed creature.
                Minotaurs are known for their poor sense of direction.
                They can be cunning in battle, but have a tendency to become trapped in dungeons of even moderate complexity.
            "),
        ])),
        level: 6,
        modifiers: Some(vec![
            // TODO: add shove
        ]),
        movement_speeds: None,
        name: "Minotaur".to_string(),
        senses: None,
        size: Size::Large,
        trained_skills: Some(vec![
            Skill::Awareness,
        ]),
        weapons: vec![
            StandardWeapon::MultipedalGore.weapon(),
        ],
    }.monster()));

    monsters.push(MonsterEntry::Monster(FullMonstrousHumanoidDefinition {
        alignment: "Usually chaotic evil".to_string(),
        attributes: vec![4, 4, -1, -5, 0, -1],
        challenge_rating: ChallengeRating::One,
        description: None,
        knowledge: Some(Knowledge::new(vec![
            (0, "
                A choker is a vicious predator that delights in strangling its foes.
                Chokers are bipedal, but their arms are inhumanly long and sinuous, terminating in hands with spiny pads to help them hold on tightly to walls and foes.
                They live to hear the desperate gasping for breath and crunching of bones that their powerful arms can inflict on their prey.
            "),
        ])),
        level: 4,
        modifiers: Some(vec![
            Modifier::Maneuver(Maneuver::GraspingStrike),
        ]),
        movement_speeds: None,
        name: "Choker".to_string(),
        senses: None,
        size: Size::Medium,
        trained_skills: Some(vec![
            Skill::Awareness,
        ]),
        weapons: vec![
            StandardWeapon::Slam.weapon(),
        ],
    }.monster()));

    // This uses a new struct, so it's cleaner to split it into a separate function
    add_ogres(&mut monsters);

    let giant_club = StandardWeapon::Club
        .weapon()
        .except(|w| w.tags.push(WeaponTag::Sweeping(1)));

    // TODO: add Giant language
    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        knowledge: Some(Knowledge::new(vec![
            (0, "
              Giants are massive humanoid creatures that tower over lesser creatures.
              All giants have immense strength and unimpressive agility - except when it comes to throwing and catching rocks, which they tend to excel at.
            "),
            (5, "
                A giant can throw objects no larger than two size categories smaller than itself with ease.
                Giants prefer to throw boulders, but in a pinch they can throw almost anything.
            "),
            (10, "
                A giant's \\glossterm{range limits} with an object other than a boulder are generally half its range limit with a boulder.
                The object may also deal less damage than a boulder depending on its construction.
            "),
        ])),
        name: "Giants".to_string(),
        monsters: vec![
            FullMonstrousHumanoidDefinition {
                alignment: "Usually chaotic evil".to_string(),
                attributes: vec![5, -2, 4, -2, -2, -2],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                      A hill giant is a Huge giant that is usually found in hilly areas.
                      Hill giants prefer to fight from high, rocky outcroppings, where they can pelt opponents with rocks and boulders while limiting the risk to themselves.
                      Skin color among hill giants ranges from light tan to deep ruddy brown.
                      They wear layers of crudely prepared hides with the fur left on.
                    "),
                    (5, "
                      Hill giants lack the intelligence or desire to retreat if their enemies survive to approach them, and prefer to draw their massive clubs and enter melee.
                      If possible, they smash their foes off of cliffs.

                      The hair of hill giants is brown or black, with eyes the same color.
                      They seldom wash or repair their garments, preferring to simply add more hides as their old ones wear out.
                      Adult hill giants are about 25 feet tall.
                      They can live to be 70 years old.
                    "),
                ])),
                level: 10,
                modifiers: None,
                movement_speeds: None,
                name: "Hill Giant".to_string(),
                senses: None,
                size: Size::Huge,
                trained_skills: Some(vec![]),
                weapons: vec![
                    StandardWeapon::GiantBoulder.weapon(),
                    giant_club.clone(),
                ],
            }.monster(),
            FullMonstrousHumanoidDefinition {
                alignment: "Usually true neutral".to_string(),
                attributes: vec![5, -1, 5, 0, 0, -2],
                challenge_rating: ChallengeRating::One,
                description: None,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                      A stone giant is a Gargantuan giant that is usually found in mountainous regions.
                      Stone giants fight from a great distance whenever possible, using their ability to hurl stones up to 1,000 feet.
                      They prefer thick leather garments, dyed in shades of brown and gray to match the stone around them.
                    "),
                    (5, "
                      Adult stone giants stand about 50 feet tall.
                      They can live to be 300 years old.
                      Young stone giants can be capricious, hunting tiny creatures like goats and humanoids on a whim.
                      Elder stone giants tend to be wiser and more cautious, and avoid unnecessary conflict.
                    "),
                ])),
                level: 13,
                modifiers: None,
                movement_speeds: None,
                name: "Stone Giant".to_string(),
                senses: None,
                size: Size::Gargantuan,
                trained_skills: Some(vec![]),
                weapons: vec![
                    StandardWeapon::GiantBoulder.weapon(),
                    giant_club.clone(),
                ],
            }.monster(),
        ],
    }));

    return monsters;
}

fn add_ogres(monsters: &mut Vec<MonsterEntry>) {
    struct OgreDefinition {
        attributes: Vec<i32>,
        challenge_rating: ChallengeRating,
        knowledge: Option<Knowledge>,
        level: i32,
        modifiers: Option<Vec<Modifier>>,
        movement_speeds: Option<Vec<MovementSpeed>>,
        name: String,
        senses: Option<Vec<Sense>>,
        trained_skills: Option<Vec<Skill>>,
    }

    impl OgreDefinition {
        // TODO: add Giant language
        fn monster(self) -> Monster {
            return FullMonstrousHumanoidDefinition {
                // From def
                attributes: self.attributes,
                challenge_rating: self.challenge_rating,
                knowledge: self.knowledge,
                level: self.level,
                modifiers: self.modifiers,
                movement_speeds: self.movement_speeds,
                name: self.name,
                senses: self.senses,
                trained_skills: self.trained_skills,

                // Ogre shared traits
                alignment: "Usually chaotic evil".to_string(),
                description: None,
                size: Size::Large,
                weapons: vec![
                    StandardWeapon::Club.weapon(),
                    StandardWeapon::Javelin.weapon(),
                ],
            }
            .monster();
        }
    }

    monsters.push(MonsterEntry::MonsterGroup(MonsterGroup {
        knowledge: Some(Knowledge::new(vec![
            (0, "
              Ogres are Large, hideous humanoid creatures with a taste for human flesh.
              If that is unavailable, they also enjoy the flesh of other humanoid creatures.
              They lack the intelligence for complex plans, but they like lying in wait to ambush helpless travelers.
            "),
            (5, "
              Ogre skin color ranges from dull yellow to dull brown.
              Their clothing consists of poorly cured furs and hides, which add to their naturally repellent odor.
            "),
            (10, "
              Ogres are intelligent enough to throw their javelins first to soften up their foes before closing into melee, but ogre gangs and bands fight as unorganized individuals.
              They use massive clubs in battle to tenderize their meat instead of wastefully hacking off bits.
            "),
        ])),
        name: "Ogres".to_string(),
        monsters: vec![
            OgreDefinition {
                attributes: vec![4, -1, 1, -4, 0, -1],
                challenge_rating: ChallengeRating::One,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                      Ogre gangers are relatively weak or young ogres that tend to gather together in gangs for mutual protection.
                    "),
                ])),
                level: 3,
                modifiers: None,
                movement_speeds: None,
                name: "Ogre Ganger".to_string(),
                senses: None,
                trained_skills: None,
            }.monster(),
            // TODO: add Sweeping tag or Sweeping Strike maneuver
            OgreDefinition {
                attributes: vec![4, -1, 3, -2, 0, -1],
                challenge_rating: ChallengeRating::One,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                      Ogre menaces are mature adult ogres that often terrorize small towns.
                      They tend to work in pairs or with minions like goblins that they bully into submission.
                    "),
                ])),
                level: 5,
                modifiers: None,
                movement_speeds: None,
                name: "Ogre Menace".to_string(),
                senses: None,
                trained_skills: Some(vec![Skill::Intimidate]),
            }.monster(),
            OgreDefinition {
                attributes: vec![4, -1, 0, 0, 2, 3],
                challenge_rating: ChallengeRating::One,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                      Ogre mages are unusual ogres that have innate arcane magical talent.
                      They are generally identifiable as the only ogres who do not go into battle wearing armor.
                      They are more intelligent than other ogres, and more likely to use combat strategies like hiding behind their minions.
                    "),
                ])),
                level: 6,
                modifiers: Some(vec![
                    // TODO: is pyromancy the right school?
                    Modifier::Attack(StandardAttack::Firebolt(2).attack()),
                    Modifier::Attack(StandardAttack::Ignition(2).attack()),
                    Modifier::Attack(StandardAttack::Inferno(2).attack()),
                ]),
                movement_speeds: None,
                name: "Ogre Mage".to_string(),
                senses: None,
                trained_skills: None,
            }.monster(),
            // TODO: add Sweeping tag or Sweeping Strike maneuver
            OgreDefinition {
                attributes: vec![6, -1, 3, -1, 2, 1],
                challenge_rating: ChallengeRating::Four,
                knowledge: Some(Knowledge::new(vec![
                    (0, "
                      Ogre skullclaimers are the leaders of large roaming bands of ogres.
                      Ogre bands are often accompanied by goblins or other similar creatures that help the ogres in exchange for a share of the valuable items they find, since the ogres care more about the creatures they kill.
                    "),
                    (5, "
                      Ogre skullclaimers are named after their right to eat the most prized part of any humanoid the band kills: the head.
                    "),
                ])),
                level: 6,
                modifiers: None,
                movement_speeds: None,
                name: "Ogre Skullclaimer".to_string(),
                senses: None,
                trained_skills: Some(vec![Skill::Intimidate]),
            }.monster(),
        ],
    }));
}
