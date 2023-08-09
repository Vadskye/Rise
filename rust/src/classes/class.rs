use crate::classes::archetype_rank_abilities::RankAbility;
use crate::classes::{generate_latex_basic_class_abilities, ClassArchetype};
use crate::core_mechanics::{Defense, Resource};
use crate::equipment::{Armor, ArmorUsageClass, StandardWeapon, Weapon, WeaponGroup};
use crate::latex_formatting;
use crate::skills::{KnowledgeSubskill, Skill};
use std::fmt;
use titlecase::titlecase;

pub struct ArmorProficiencies {
    pub specific_armors: Option<Vec<Armor>>,
    pub usage_classes: Vec<ArmorUsageClass>,
}

pub struct WeaponProficiencies {
    pub custom_weapon_groups: i32,
    pub specific_weapon_groups: Option<Vec<WeaponGroup>>,
    pub specific_weapons: Option<Vec<Weapon>>,
    pub simple_weapons: bool,
}

pub enum Class {
    Barbarian,
    Cleric,
    Dragon,
    Druid,
    Fighter,
    Harpy,
    Monk,
    Oozeborn,
    Paladin,
    Ranger,
    Rogue,
    Sorcerer,
    Warlock,
    Wizard,
}

impl Class {
    pub fn all() -> Vec<Self> {
        vec![
            Self::Barbarian,
            Self::Cleric,
            Self::Druid,
            Self::Fighter,
            Self::Monk,
            Self::Paladin,
            Self::Ranger,
            Self::Rogue,
            Self::Sorcerer,
            Self::Warlock,
            Self::Wizard,
            // Optional classes
            Self::Dragon,
            Self::Harpy,
            Self::Oozeborn,
        ]
    }

    pub fn core_classes() -> Vec<Self> {
        vec![
            Self::Barbarian,
            Self::Cleric,
            Self::Druid,
            Self::Fighter,
            Self::Monk,
            Self::Paladin,
            Self::Ranger,
            Self::Rogue,
            Self::Sorcerer,
            Self::Warlock,
            Self::Wizard,
        ]
    }

    pub fn validate_points() {
        let expected_points = 34;
        for class in Self::all() {
            let actual_points = class.calculate_point_total();
            if actual_points != expected_points {
                eprintln!(
                    "Class {} has {} points; expected {}",
                    class.name(),
                    actual_points,
                    expected_points
                )
            }
        }
    }

    fn calculate_point_total(&self) -> i32 {
        let custom_modifier = 0;
        self.attunement_points() * 5
            + hp_dr_points(self.damage_resistance())
            // 3 points to get an Armor defense
            + self.defense_bonus(&Defense::Armor) * 3
            // 2 points per fatigue tolerance
            + self.fatigue_tolerance() * 2
            // 2 points per insight point
            + self.insight_points() * 2
            + hp_dr_points(self.hit_points())
            // 1 point per trained skill
            + self.trained_skills()
            // 1 point per armor proficiency
            + (self.armor_proficiencies().usage_classes.len() as i32)
            // 1 point for each weapon proficiency
            + self.weapon_proficiencies().custom_weapon_groups
            // 1 extra point for a specific weapon group
            + if self.weapon_proficiencies().specific_weapon_groups.is_some() { 1 } else { 0 }
            // Arbitrary class-specific modifiers
            + custom_modifier
    }

    pub fn attunement_points(&self) -> i32 {
        match self {
            Self::Barbarian => 2,
            Self::Cleric => 3,
            Self::Dragon => 2,
            Self::Druid => 3,
            Self::Fighter => 2,
            Self::Harpy => 2,
            Self::Monk => 2,
            Self::Oozeborn => 2,
            Self::Paladin => 2,
            Self::Ranger => 2,
            Self::Rogue => 3,
            Self::Sorcerer => 4,
            Self::Warlock => 3,
            Self::Wizard => 4,
        }
    }

    pub fn archetypes(&self) -> Vec<ClassArchetype> {
        ClassArchetype::all()
            .into_iter()
            .filter(|a| a.class().name() == self.name())
            .collect()
    }

    pub fn alignment(&self) -> &str {
        "Any"
    }

    pub fn class_skills(&self) -> Vec<Skill> {
        match self {
            Self::Barbarian => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
                Skill::Craft,
                Skill::CreatureHandling,
                Skill::Deception,
                Skill::Endurance,
                Skill::Flexibility,
                Skill::Intimidate,
                Skill::Jump,
                Skill::Medicine,
                Skill::Persuasion,
                Skill::Ride,
                Skill::Survival,
                Skill::Swim,
            ],
            Self::Cleric => vec![
                Skill::Awareness,
                Skill::Craft,
                Skill::Deception,
                Skill::Deduction,
                Skill::Intimidate,
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Arcana,
                    KnowledgeSubskill::Local,
                    KnowledgeSubskill::Religion,
                    KnowledgeSubskill::Planes,
                ]),
                Skill::Linguistics,
                Skill::Medicine,
                Skill::Persuasion,
                Skill::SocialInsight,
            ],
            Self::Dragon => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
                Skill::Craft,
                Skill::CreatureHandling,
                Skill::Deception,
                Skill::Endurance,
                Skill::Flexibility,
                Skill::Intimidate,
                Skill::Knowledge(vec![KnowledgeSubskill::Arcana]),
                Skill::Jump,
                Skill::Persuasion,
                Skill::SocialInsight,
                Skill::Stealth,
                Skill::Survival,
                Skill::Swim,
            ],
            Self::Druid => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
                Skill::Craft,
                Skill::CreatureHandling,
                Skill::Deception,
                Skill::Deduction,
                Skill::Endurance,
                Skill::Intimidate,
                Skill::Jump,
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Dungeoneering,
                    KnowledgeSubskill::Nature,
                ]),
                Skill::Persuasion,
                Skill::Ride,
                Skill::Stealth,
                Skill::Survival,
                Skill::Swim,
            ],
            Self::Fighter => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
                Skill::Craft,
                Skill::Deception,
                Skill::Endurance,
                Skill::Flexibility,
                Skill::Intimidate,
                Skill::Medicine,
                Skill::Jump,
                Skill::Persuasion,
                Skill::Ride,
                Skill::Swim,
            ],
            // This is in OptionalRules.tex, not here
            Self::Harpy => vec![],
            Self::Monk => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
                Skill::Craft,
                Skill::CreatureHandling,
                Skill::Deception,
                Skill::Deduction,
                Skill::Endurance,
                Skill::Flexibility,
                Skill::Intimidate,
                Skill::Jump,
                Skill::Medicine,
                Skill::Perform,
                Skill::Persuasion,
                Skill::Ride,
                Skill::SocialInsight,
                Skill::Stealth,
                Skill::Survival,
                Skill::Swim,
            ],
            Self::Oozeborn => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
                Skill::Craft,
                Skill::Endurance,
                Skill::Flexibility,
                Skill::Intimidate,
                Skill::Jump,
                Skill::Knowledge(vec![KnowledgeSubskill::Dungeoneering]),
                Skill::SleightOfHand,
                Skill::Stealth,
                Skill::Survival,
                Skill::Swim,
            ],
            Self::Paladin => vec![
                Skill::Awareness,
                Skill::Deception,
                Skill::Deduction,
                Skill::Endurance,
                Skill::Intimidate,
                Skill::Knowledge(vec![KnowledgeSubskill::Local, KnowledgeSubskill::Religion]),
                Skill::Medicine,
                Skill::Persuasion,
                Skill::Ride,
                Skill::SocialInsight,
            ],
            Self::Ranger => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
                Skill::Craft,
                Skill::CreatureHandling,
                Skill::Deception,
                Skill::Deduction,
                Skill::Endurance,
                Skill::Flexibility,
                Skill::Intimidate,
                Skill::Jump,
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Dungeoneering,
                    KnowledgeSubskill::Nature,
                ]),
                Skill::Medicine,
                Skill::Persuasion,
                Skill::Ride,
                Skill::Stealth,
                Skill::Survival,
                Skill::Swim,
            ],
            Self::Rogue => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
                Skill::Craft,
                Skill::Deception,
                Skill::Deduction,
                Skill::Devices,
                Skill::Disguise,
                Skill::Flexibility,
                Skill::Intimidate,
                Skill::Jump,
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Dungeoneering,
                    KnowledgeSubskill::Engineering,
                    KnowledgeSubskill::Items,
                    KnowledgeSubskill::Local,
                ]),
                Skill::Linguistics,
                Skill::Perform,
                Skill::Persuasion,
                Skill::Ride,
                Skill::SleightOfHand,
                Skill::SocialInsight,
                Skill::Stealth,
                Skill::Swim,
            ],
            Self::Sorcerer => vec![
                Skill::Awareness,
                Skill::Craft,
                Skill::Deception,
                Skill::Deduction,
                Skill::Intimidate,
                Skill::Knowledge(vec![KnowledgeSubskill::Arcana, KnowledgeSubskill::Planes]),
                Skill::Linguistics,
                Skill::Persuasion,
            ],
            Self::Warlock => vec![
                Skill::Awareness,
                Skill::Craft,
                Skill::Deception,
                Skill::Deduction,
                Skill::Disguise,
                Skill::Intimidate,
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Arcana,
                    KnowledgeSubskill::Planes,
                    KnowledgeSubskill::Religion,
                ]),
                Skill::Linguistics,
                Skill::Persuasion,
                Skill::Ride,
                Skill::SocialInsight,
            ],
            Self::Wizard => vec![
                Skill::Awareness,
                Skill::Craft,
                Skill::Deception,
                Skill::Deduction,
                Skill::Intimidate,
                Skill::Knowledge(KnowledgeSubskill::all()),
                Skill::Linguistics,
                Skill::Persuasion,
            ],
        }
    }

    pub fn damage_resistance(&self) -> i32 {
        match self {
            Self::Barbarian => 0,
            Self::Cleric => 2,
            Self::Dragon => 2,
            Self::Druid => 1,
            Self::Fighter => 0,
            Self::Harpy => 0,
            Self::Monk => 4,
            Self::Oozeborn => 0,
            Self::Paladin => 3,
            Self::Ranger => 0,
            Self::Rogue => 0,
            Self::Sorcerer => 4,
            Self::Warlock => 4,
            Self::Wizard => 3,
        }
    }

    pub fn defense_bonus(&self, defense: &Defense) -> i32 {
        match self {
            Self::Barbarian => match defense {
                Defense::Armor => 0,
                Defense::Fortitude => 7,
                Defense::Reflex => 5,
                Defense::Mental => 3,
            },
            Self::Cleric => match defense {
                Defense::Armor => 0,
                Defense::Fortitude => 5,
                Defense::Reflex => 3,
                Defense::Mental => 7,
            },
            Self::Dragon => match defense {
                Defense::Armor => 1,
                Defense::Fortitude => 7,
                Defense::Reflex => 3,
                Defense::Mental => 5,
            },
            Self::Druid => match defense {
                Defense::Armor => 0,
                Defense::Fortitude => 5,
                Defense::Reflex => 4,
                Defense::Mental => 6,
            },
            Self::Fighter => match defense {
                Defense::Armor => 1,
                Defense::Fortitude => 7,
                Defense::Reflex => 3,
                Defense::Mental => 5,
            },
            Self::Harpy => match defense {
                Defense::Armor => 1,
                Defense::Fortitude => 3,
                Defense::Reflex => 7,
                Defense::Mental => 5,
            },
            Self::Monk => match defense {
                Defense::Armor => 1,
                Defense::Fortitude => 3,
                Defense::Reflex => 7,
                Defense::Mental => 5,
            },
            Self::Oozeborn => match defense {
                Defense::Armor => 0,
                Defense::Fortitude => 7,
                Defense::Reflex => 3,
                Defense::Mental => 5,
            },
            Self::Paladin => match defense {
                Defense::Armor => 1,
                Defense::Fortitude => 6,
                Defense::Reflex => 3,
                Defense::Mental => 6,
            },
            Self::Ranger => match defense {
                Defense::Armor => 1,
                Defense::Fortitude => 5,
                Defense::Reflex => 6,
                Defense::Mental => 4,
            },
            Self::Rogue => match defense {
                Defense::Armor => 0,
                Defense::Fortitude => 3,
                Defense::Reflex => 7,
                Defense::Mental => 5,
            },
            Self::Sorcerer => match defense {
                Defense::Armor => 0,
                Defense::Fortitude => 3,
                Defense::Reflex => 5,
                Defense::Mental => 7,
            },
            Self::Warlock => match defense {
                Defense::Armor => 0,
                Defense::Fortitude => 5,
                Defense::Reflex => 3,
                Defense::Mental => 7,
            },
            Self::Wizard => match defense {
                Defense::Armor => 0,
                Defense::Fortitude => 3,
                Defense::Reflex => 5,
                Defense::Mental => 7,
            },
        }
    }

    pub fn fatigue_tolerance(&self) -> i32 {
        match self {
            Self::Barbarian => 5,
            Self::Cleric => 3,
            Self::Dragon => 3,
            Self::Druid => 3,
            Self::Fighter => 4,
            Self::Harpy => 4,
            Self::Monk => 3,
            Self::Oozeborn => 5,
            Self::Paladin => 4,
            Self::Ranger => 4,
            Self::Rogue => 3,
            Self::Sorcerer => 2,
            Self::Warlock => 3,
            Self::Wizard => 1,
        }
    }

    // Each +1 level to hit points is about 10% more HP
    // +3 is about 40% more HP
    // +4 is about 60% more HP
    pub fn hit_points(&self) -> i32 {
        match self {
            Self::Barbarian => 5,
            Self::Cleric => 2,
            Self::Dragon => 4,
            Self::Druid => 2,
            Self::Fighter => 3,
            Self::Harpy => 2,
            Self::Monk => 2,
            Self::Oozeborn => 5,
            Self::Paladin => 3,
            Self::Ranger => 3,
            Self::Rogue => 1,
            Self::Sorcerer => 0,
            Self::Warlock => 2,
            Self::Wizard => 0,
        }
    }

    pub fn insight_points(&self) -> i32 {
        match self {
            Self::Barbarian => 0,
            Self::Cleric => 2,
            Self::Dragon => 1,
            Self::Druid => 2,
            Self::Fighter => 1,
            Self::Harpy => 2,
            Self::Monk => 1,
            Self::Oozeborn => 1,
            Self::Paladin => 1,
            Self::Ranger => 1,
            Self::Rogue => 2,
            Self::Sorcerer => 1,
            Self::Warlock => 1,
            Self::Wizard => 3,
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Barbarian => "barbarian",
            Self::Cleric => "cleric",
            Self::Dragon => "dragon",
            Self::Druid => "druid",
            Self::Fighter => "fighter",
            Self::Harpy => "harpy",
            Self::Monk => "monk",
            Self::Oozeborn => "oozeborn",
            Self::Paladin => "paladin",
            Self::Ranger => "ranger",
            Self::Rogue => "rogue",
            Self::Sorcerer => "sorcerer",
            Self::Warlock => "warlock",
            Self::Wizard => "wizard",
        }
    }

    pub fn resource_bonus(&self, resource: &Resource) -> i32 {
        match resource {
            Resource::AttunementPoint => self.attunement_points(),
            Resource::FatigueTolerance => self.fatigue_tolerance(),
            Resource::InsightPoint => self.insight_points(),
            Resource::TrainedSkill => self.trained_skills(),
        }
    }

    pub fn shorthand_name(&self) -> &str {
        match self {
            Self::Barbarian => "Bbn",
            Self::Cleric => "Clr",
            Self::Dragon => "Drg",
            Self::Druid => "Drd",
            Self::Fighter => "Ftr",
            Self::Harpy => "Hrp",
            Self::Monk => "Mnk",
            Self::Oozeborn => "Ooz",
            Self::Paladin => "Pal",
            Self::Ranger => "Rgr",
            Self::Rogue => "Rog",
            Self::Sorcerer => "Sor",
            Self::Warlock => "War",
            Self::Wizard => "Wiz",
        }
    }

    pub fn trained_skills(&self) -> i32 {
        match self {
            Self::Barbarian => 4,
            Self::Cleric => 4,
            Self::Dragon => 3,
            Self::Druid => 5,
            Self::Fighter => 3,
            Self::Harpy => 6,
            Self::Monk => 5,
            Self::Oozeborn => 4,
            Self::Paladin => 3,
            Self::Ranger => 5,
            Self::Rogue => 7,
            Self::Sorcerer => 3,
            Self::Warlock => 4,
            Self::Wizard => 3,
        }
    }

    pub fn armor_proficiencies(&self) -> ArmorProficiencies {
        match self {
            Self::Barbarian => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![ArmorUsageClass::Light, ArmorUsageClass::Medium],
            },
            Self::Cleric => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![ArmorUsageClass::Light, ArmorUsageClass::Medium],
            },
            Self::Dragon => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![ArmorUsageClass::Light, ArmorUsageClass::Medium],
            },
            Self::Druid => ArmorProficiencies {
                specific_armors: Some(vec![Armor::Hide(None)]),
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Fighter => ArmorProficiencies {
                specific_armors: None,
                usage_classes: ArmorUsageClass::all(),
            },
            Self::Harpy => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Monk => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Oozeborn => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Paladin => ArmorProficiencies {
                specific_armors: None,
                usage_classes: ArmorUsageClass::all(),
            },
            Self::Ranger => ArmorProficiencies {
                specific_armors: Some(vec![Armor::Hide(None)]),
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Rogue => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Sorcerer => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![],
            },
            Self::Warlock => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Wizard => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![],
            },
        }
    }

    pub fn narrative_text(&self) -> String {
        match self {
            Self::Barbarian => r"
                Barbarians are primal warriors that draw power from their physical prowess and unfettered emotions.
                They fight with a raw, untamed aggression that draws inspiration from more primitive times.

                Most barbarians originate from to the outskirts of civilization, where the societal constraints of civilization are less present.
                Of course, becoming a barbarian is no secret rite.
                The only thing that is required is a willingness to fully experience one's emotions and channel them into physical betterment.
                This path evokes an ancient memory of more primitive times, before the complexity of civilized warfare, where physical supremacy was sufficient for victory.
                Anyone can discover that path for themselves.

                Barbarians are famous for their furious battle-rage.
                Anger is one of the easiest emotions to access and channel into the violence of battle, and it is a common starting point for new barbarians who are still learning how to tap into their emotions.
                However, any emotion can be used as a source of primal power, as long as it is sufficiently intense.

                Barbarians and monks are, in some ways, two sides of the same coin.
                Both groups develop their physical body to its peak, and believe that the mind and body must work together to maximize their potential.
                However, a typical monk sees emotions as a tool at best and an obstacle at worst.
                They value serenity and control over their mind and body.
                From the perspective of a barbarian, monks completely surrender to civilization's taming and placating influences, and abandon their primal heritage.
                Barbarian-monk multiclass characters are exceptionally rare, but not impossible.
                Typically, they control all of their emotions in the style of monks except for a single emotion, which they unleash in the style of barbarians.

                Rangers and druids are natural allies of barbarians, since all three groups prefer to live at the edges of civilization.
                However, each has different reasons for their preference.
                Barbarians enjoy the emotional and societal freedom of the frontier, but are typically too social to prefer life as a hermit in the deep wilderness.
                Druids prefer nature to civilization ideologically, and rangers are best able to fulfill their responsibilities on the frontier.
            ".to_string(),
            Self::Cleric => r"
                Clerics are divine spellcasters who draw power from their veneration of a single deity.
                The powers of any individual cleric can vary greatly depending on their deity, and the specific aspects of that deity they choose to emulate.
                Many clerics have exceptional healing or oratory talents, which are powerful tools in spreading the influence of their deity.

                Deities are a constant background presence in the world of Rise.
                Commoners acknowledge the influence of many deities on their life, and offer gifts or prayers to each deity according to their purview.
                Clerics are the primary means by which deities answer these prayers.
                In exchange for their mighty divine power, clerics are charged with serving the deity's interests in the world.

                Clerics are the most common spellcasting class in the world.
                The path to becoming a cleric is easier than for any other spellcasting class except for sorcerers, and unlike sorcerers, clerics require no special birthright.
                Many clerics have specific responsibilities to their deity that preclude adventuring.
                The most well-known example of this would be clerics who offer divine healing to anyone who enters their temple, but similar responsibilities exist for all deities.

                Adventuring clerics can exist for a variety of reasons.
                They may be charged to help spread knowledge of their deity, and becoming well-known as an adventurer can serve that end.
                Alternately, they may simply be charged by their deity to grow their personal power.
                Deities need powerful clerics to maximize their influence on the mortal world.

                Paladins and druids are closely related to clerics, since all three draw power from their veneration of external entities.
                However, the specific nature of each connection is quite different.
                From the perspective of clerics, the largest difference is that paladins and druids have no oversight and unclear responsibilities.
                Clerics can always be confident that they are serving their deity's best interest, while paladins and druids simply act as they see fit.
                This makes them unreliable allies at best and ideological foes at worst.
                In particular, clerics and druids have some intrinsic tension.
                Clerics want to expand the worship of their specific deity, which is easiest in civilized areas where many potential worshippers can be found.
                This runs opposite to the typical druidic preference against civilization.
            ".to_string(),
            Self::Dragon => r"".to_string(),
            Self::Druid => r"
                Druids are nature spellcasters who draw power from their veneration of the natural world.
                They worship Nature herself, the over-deity who guides and nurtures all living things.
                Nature grants her followers influence over her domain in gratitude for their service.

                All druids value the continuation of life - in the abstract, universal sense, not the specific sense.
                Predation is a critical part of the natural world, and most druids have no prohibitions against killing.
                Life as a whole, across all species and levels of sentience, must continue.
                The worst nightmare of all druids is a dead world, inhabited only by rocks and memories of the life that once existed.

                Individual druids have a great variety of opinions and interpretations about which aspects of Nature's domain are most important.
                Some druids treat all forms of life as equal.
                Others draw distinctions between different forms of life, such as prioritizing the needs of highly sentient or highly complex life over others.
                Of course, many druids don't dwell on philosophical questions about the precise value of Nature's various aspects. 
                They focus more on practical maintenance of nature in the world around them according to their own instincts.
                Nature's domain is immense, and her guidance is virtually nonexistent.

                Many druids avoid or actively reject overly developed civilization.
                The details and causes of this aversion can be source of great disagreement between different druids.
                Civilization tends to displace or kill natural life, and replaces the vibrant diversity of a forest or jungle with a the smaller subset of life that can exist in cities and cultivated farms.
                In general, druids who value all forms of life equally and consider diversity to be intrinsically valuable tend to reject civilization most strongly.
                On the other hand, druids who value life according to its sentience or complexity are typically more tolerant of civilization.

                Most druids belong to a specific druidic circle.
                Druidic circles are groups of druids that share a similar philosophy.
                Like druids, druidic circles have highly varied structures.
                Some druidic circles function as communes where all members live together, either nomadically or in a specific area of land claimed by the circle.
                Others simply have annual meetings to discuss critical matters, with many of the circle's members living in isolation at all other times.

                Since druids tend to be more isolated than most, their attachment to druidic circles may seem odd to outsiders.
                There are many reasons for this tradition, but foremost among them is the importance of continuity of knowledge in the absence of advanced civilization.
                Druids are unlikely to simply go to a library in a city to gain important knowledge about the natural world.
                Instead, they must learn from someone who has the knowledge they lack.
                This means they need access to wise elders who are willing to pass on what they know.
                Their wisdom must be kept alive between generations through oral traditions.
                Druidic circles provide a place for this knowledge transfer to occur, and offer a path to welcoming new druids into the fold.
            ".to_string(),
            Self::Fighter => r"
                Fighters are highly disciplined warriors who excel in physical combat of any kind.
                They have a deep mastery of the implements and strategies of battle thanks to their extensive training.
                Other martial characters may be physically stronger or capable of strange and improbable tricks, but fighters are unmatched as battlefield champions.

                Each fighter has a different area of specialization, but most fighters have some amount of battlefield control.
                They can guard their allies, impede the movement of their foes, or give battle commands to their allies to guide them.
                This makes fighters invaluable in large-scale battles, and they are the most common class found in organized military forces.
                The regimented nature of army life tends to drive away many people used to more freedom, but fighters are often compatible with the discipline found in armed forces.

                More broadly, fighters are the most common class in many civilized settings.
                A fighter's training requires no secret wisdom, and it can be self-taught or guided by a mentor.
                Many people undergo some battle training regardless of their ultimate path in life, leading them to discover that they may enjoy it for its own sake.

                Monks are closely related to fighters, since both classes use training and discipline to improve themselves.
                However, monks focus more on mental control and exploring the supernatural powers that come from tapping into the body's potential.
                In constrast, fighters have a more grounded approach, and focus more on practical knowledge that can be directly applied to physical combat.
                A typical monk would consider fighters to be overly limited in their focus on day-to-day combat, while a typical fighter would consider monks to be wasting their training with mysticism and esoteric nonsense.
            ".to_string(),
            Self::Harpy => r"".to_string(),
            Self::Monk => r"
                Monks are agile masters of ``ki'' who hone their personal abilities to strike down foes and perform supernatural feats.
                They undergo extensive training to control their mind and body in unison, using each to improve the other.
                The techniques required to become a monk are strange and unintuitive, and only a legendary few can discover them on their own.
                Instead, most monks are trained at monastaries, where they learn how to master themselves long before they turn their attention to besting others in combat.

                Unlike every other class capable of magical feats, monks draw their power entirely from themselves.
                They have learned to tap into the life energy within their bodies, use it to cause dramatic effects in the world around them, and then reclaim that energy instead of letting it dissipate into the world.
                This process is deeply dangerous if misapplied, which is why the training required to become a monk is so rigorous.
                Expending one's life energy without being able to reclaim it is a fast path to inadvertent death.

                Monks are famous for their ability to fight completely unarmed, and for their tendency to use unusual weapons that few non-monks use.
                This is more a matter of tradition than any necessity.
                Some monks prefer more common weapons, and any fighter could learn how to use monk weapons given time to train with them.
                However, the monk weapons are well suited to the fighting styles that monks learn as part of their training.

                The combat training for monks often consists of dueling other monks, and rarely involves fighting non-humanoid monsters.
                As a result, they often try to trip, grapple, or distract their foes in combat.
                These strategies are all most effective against humanoid opponents.
            ".to_string(),
            Self::Oozeborn => r"".to_string(),
            Self::Paladin => r"
                Paladins are divinely empowered warriors who exemplify a particular alignment.
                They can shift easily between physical combat and spellcasting depending on the situation.
                Many paladins can heal themselves and their allies, and can share their divine connection with those nearby, making them a beacon on a battlefield.

                The scope of each alignment is quite broad, so even paladins of the same alignment can be as diverse in personality and morality as any other class.
                Paladins of law tend to be the most homogeneous in their beliefs, but even they may have stark disagreements about the rightful code to follow, and in what circumstances a personal or universal code of ethics can supercede the law in a specific territory.

                Paladins are both famous and infamous for their dedication, and for their tendency to exhort those around them to act according to the paladin's ideals.
                There is some truth to the stereotype of the stony-faced paladin who regards any form of compromise as unacceptable.
                However, few of those overly zealous paladins make their way into adventuring parties.
                Only paladins who understand the necessity of working as an effective team with others who do not share their ideals are likely to have any success adventuring.
                For some paladins, this is a compromise they grudgingly make in the pursuit of the greater good - or the greater evil.
                Others perceive no conflict at all, and eagerly work with those of opposed alignments with the goal of demonstrating the superiority of their moral compass by example.

                Of all spellcasting classes, paladins are in some ways the most limited.
                They have access to a relatively small number of mystic spheres.
                However, they are also the only spellcasting class that can naturally use heavy armor, and they have some unique abilities that can make them powerful frontline casters.

                Paladins and fighters share a similar ability to influence a battlefield at a large scale while being difficult to kill.
                Their methods and ideology may be different, but they can often work together easily and effectively.
                It is more difficult to characterize the relationship between paladins and other classes, since so much depends on the paladin's alignment and personal interpretation of that alignment.
                Paladins of law typically despise barbarians and rogues, while paladins of chaos distrust the rigid mentality common to monks and fighters.
                Warlocks are deeply suspicious to paladins of good, though paladins of good tend to be more forgiving than other paladins.
                Paladins of evil despise druids who have too much respect for the sanctity of life.
                All paladins may have strong feelings about clerics depending on the alignment of that cleric's deity.
            ".to_string(),
            Self::Ranger => r"
                Rangers are skilled hunters who bridge the divide between nature and civilization.
                They are typically most at home on the frontiers, keeping monsters and civilized groups from interfering with each other.
                Different rangers may have more personal affinity for civilization or for monsters.

                Like druids and monks, rangers are seldom self-taught.
                Just as rangers occupy a middle space between society and the wilds beyond it, their abilities are a complex combination of training, experience, and gifts freely granted by Nature herself.
                The vast majority of people who might attempt to learn how to be a ranger on their own would focus too much on only one aspect of a ranger's abilities.
                These people might find the path to becoming a fighter, druid, or rogue instead.

                Rangers draw their core power from their training, which includes extensive experience with weapons and armaments like a fighter.
                However, they also study the natural world and the environment around them.
                This study is more focused on practical knowlege about survival and hunting than the more reverent study of druids.
                During this wilderness experience, some rangers forge a deep bond with a single animal who follows them everywhere.
                This bond is intensified by Nature's influence, and has a hint of her magic in it.
                Others shy away from that level of commitment or find no meaning in it, and prefer a more solitary hunt.

                Traditionally, a ranger's training occurs under an experienced ranger leader.
                Some rangers train small packs of new recruits at once, while others prefer to oversee a single apprentice.
                There are many ways that a would-be ranger might find a mentor, but no single certain way.
                Rangers in the wild do not tend to maintain long-term societal bonds like druidic circles, so there are fewer obvious ways to easily find an experienced mentor.
                Without druidic magic for long-distance communication, rangers struggle to maintain cohesion across the vast territories that they patrol, so they typically make no attempt to do so.

                Rangers are sometimes employed by a government to keep its borders safe from monsters.
                They may also be found as bounty hunters, using their skills to hunt prey within civilization instead of at its edges.
                Still others live among druidic circles.
                More than any other class, rangers struggle to find a place to fully call home, and may wander between widely varied walks of life for years at a time.
                They are caught between worlds, and only some rangers find peace in that division.
            ".to_string(),
            Self::Rogue => r"
                Rogues are exceptionally skillful characters known for their ability to strike at their foe's weak points in combat.
                It is dangerous to make any assumptions about rogues.
                They can be acrobatic fighters, charismatic tricksters, inspiring musicians, stealthy assassins, or all of the above.
                All rogues share a fundamental flexibility, preferring to use the right tools for the situation rather than solving all of their problems in the same way.

                A rogue's power fundamentally comes from experience, but it is seldom the rigorous, structured training that a fighter or monk might undertake.
                More often, rogues develop their talents by following their instincts and seeing what works and what doesn't.
                They may have a natural gift for persuasion that they develop into a fine edge through years of charismatic conversations.
                The back alleys of cities are a natural training ground, where education comes in the form of evading or receiving punishments for misdeeds.

                While most of a rogue's skills are intuitively understandable and mundane, bardic music is an odd exception.
                There is an underlying structure to the universe that some scholars call the Universal Harmony.
                Exceptionally talented performances can hit tones that resonate with the Universal Harmony, which amplifies the effects of the performance beyond mundane limits.
                This is always a simple amplification, taking effects that would be a natural result of the music and multiplying their effects.
                A humorous musical piece can become outrageously funny, and an ominous piece can become utterly terrifying, but the full complexity of true spellcasting cannot be replicated in this way.

                Some rogues discover the effects of the Universal Harmony for themselves.
                There also exist bardic colleges that are dedicated to the study and replication of effects amplified in this way, and rogues may attend these colleges to deepen their skills.
                Officially, bardic colleges train their attendees in musical theory and practical performance.
                Unofficially, many bardic colleges have recognized that many of their students have a variety of less reputable talents.
                These colleges may have night classes that train rogues in other skills, including effective deception and even assassination.
                They maintain a level of plausible deniability, but would-be rogues can often discover the truth and complete their training there.
            ".to_string(),
            Self::Sorcerer => r"
                Sorcerers are arcane spellcasters who draw power from their inherently magical nature.
                They require no training or external sources to access their magical abilities.
                Many sorcerers intuitively used their magic to influence their surroundings long before they understood exactly what they were doing, or that they were tapping into powers others could not.

                Of all classes, sorcerers are the most likely to be completely self-trained.
                Each sorcerer has a unique connection to their magical nature, and they often have idiosyncratic requirements or limitations.
                For example, a sorcerer may feel ravenously hungry after tapping into their powers, or they may need to spend time upside down each day to ``recharge'' their magic.

                The gestures and incanations spoken by sorcerers are similarly diverse - if they require any spellcasting components at all.
                Some sorcerers channel their magic through martial arts and battle cries, and may be easily confused with barbarians or monks.
                Others believe their magic comes from external forces, such as nature spirits or strange entities that they imagine for themselves.
                Still others study magic extensively and imagine themselves to be wizards, but their conclusions are nonsensical and no one else can replicate their findings.
                The only certainty is that each sorcerer is unique.

                The true cause of a sorcerer's magic has more consistency than its expression.
                Sorcerers do not draw power from their life energy or any internal storage, like monks do.
                Instead, they steal power from the primal forces of the universe, as wizards do.
                Sorcerers are intrinsic conduits for that raw power, and they can deepen their connection with experience.
                A sorcerer's nature is fundamentally their birthright, and it cannot be learned.

                Of course, that doesn't entirely explain why sorcerers are intrinsic conduits.
                No one knows exactly how to predict or explain sorcerous potential.
                However, sorcerers are much more common in bloodlines that have immortal ancestors.
                Most commonly, this means draconic ancestry, and some sorcerers specifically tap into their draconic potential.
                However, celestial or infernal heritage is also not unheard of, and even stranger ancestry is possible.
                In addition, sorcerers seem to be more common in areas that have been affected by powerful magic.
            ".to_string(),
            Self::Warlock => r"
                Warlocks are pact spellcasters who draw their power from a sinister deal made with infernal creatures.
                Their soulkeeper grants them access to great magical power.
                However, they must content with the whispers of demonic influence throughout their life, and they risk losing their immortal soul.

                Most people view warlocks with suspicion, if not outright hostility.
                Few warlocks are noble individuals who undertook their pact out of some self-sacrificing necessity.
                Instead, warlocks are often power-hungry individuals who willingly fall under demonic influence to serve their own ends.
                Even warlocks who start out with good intentions can be led astray over the years.
                It takes great wisdom and mental fortitude to resist the constant pressure of a soulkeeper's twisted advice.

                Warlocks are typically self-taught, or more accurately, educated by their soulkeeper in the use of their powers.
                It is not uncommon for warlocks to search for warlock mentors so they can master their powers without completely trusting their soulkeeper.
                These relationships are typically based on contracts and expectations of future services from the apprentice once their training is complete, just like a soul pact.
                A certain level of mistrust is common, and apprentices sometimes successfully betray their mentors, just like they hope to escape their soulkeeper's clutches.
                To minimize the danger of these relationships, warlock mentors almost never take more than a single apprentice at a time.

                Clerics and warlocks have a complicated relationship.
                From a certain perspective, they both gain power in exchange for their service to a powerful extraplanar entity.
                Warlocks often enjoy emphasizing the similarity, which can be a useful rhetorical tool to mitigate anti-warlock prejudice.
                For their part, clerics tend to strongly disagree with this analogy.

                Rogues tend to get along better with warlocks than most classes do.
                Many rogues have a ``do whatever works'' attitude that helps them understand why warlocks would make a soul pact, even if they might not make the same pact themselves.
                In addition, rogues are generally flexible about their companions, and wouldn't begrudge having a warlock in a group as long as the warlock doesn't cause problems.
            ".to_string(),
            Self::Wizard => r"
                Wizards are arcane spellcasters who study magic to unlock its powerful secrets.
                They have spent years studying the primal forces that define the universe.
                Their extensive research has revealed complicated ways in which those forces can be accessed and manipulated by mere mortals.

                Wizards are almost never completely self-taught.
                The primal forces of the universe do not give up their power easily, and the methods used to access that power are unintuitive.
                Most wizards learn at arcane colleges or through direct mentorship by older, wiser wizards.
                Even wizard prodigies who learn alone have some access to the research performed by wizards over the centuries, generally in the form of massive books.

                There are two fundamental principles of arcane magic that are shared by all wizards.
                The first principle is the creation of links between planes.
                A wizard can expend a small amount of energy to open an extremely small, extremely short-lived interdimensional gate that leads to a source of power.
                The destination for this gate depends on the \glossterm{mystic sphere} the wizard are manipulating.
                As a simple example, \sphere{pyromancy} spells generally require gates to the Plane of Fire.
                Other spheres can be more complex.
                For example, \sphere{revelation} spells generally require gates that lead to prescient entities or extraplanar sites with powerful ambient magic.

                The second principle is the manipulation of raw power accessed through these gates.
                Wizards learn how to create complex magical bindings that can store power and release it in highly specific ways.
                This allows them to create long-lasting effects that were fueled by extremely brief flashes of power.

                Sorcerers are an endless fascination and source of frustration to wizards.
                While wizards must spend years or decades perfecting their art, sorcerers are able to easily and intuitively replicate the same techniques for accessing and binding magical energy.
                This often makes younger wizards jealous.
                Wizards have spent centuries trying to understand how to mimic the shortcuts that sorcerers use, with little success.
                However, sorcerers lack the ability to perform complex arcane rituals that do not allow any simple shortcuts.
                Many older wizards regard this as a crippling weakness.
            ".to_string(),
        }
    }

    pub fn weapon_proficiencies(&self) -> WeaponProficiencies {
        match self {
            Self::Barbarian => WeaponProficiencies {
                custom_weapon_groups: 2,
                specific_weapon_groups: None,
                specific_weapons: None,
                simple_weapons: true,
            },
            Self::Cleric => WeaponProficiencies {
                custom_weapon_groups: 0,
                specific_weapon_groups: None,
                specific_weapons: None,
                simple_weapons: true,
            },
            Self::Dragon => WeaponProficiencies {
                custom_weapon_groups: 0,
                specific_weapon_groups: None,
                specific_weapons: None,
                simple_weapons: false,
            },
            Self::Druid => WeaponProficiencies {
                custom_weapon_groups: 0,
                specific_weapon_groups: None,
                specific_weapons: Some(vec![
                    StandardWeapon::Scimitar.weapon(),
                    StandardWeapon::Sickle.weapon(),
                ]),
                simple_weapons: true,
            },
            Self::Fighter => WeaponProficiencies {
                custom_weapon_groups: 2,
                specific_weapon_groups: None,
                specific_weapons: None,
                simple_weapons: true,
            },
            Self::Harpy => WeaponProficiencies {
                custom_weapon_groups: 0,
                specific_weapon_groups: None,
                specific_weapons: None,
                simple_weapons: false,
            },
            Self::Monk => WeaponProficiencies {
                custom_weapon_groups: 0,
                specific_weapon_groups: Some(vec![WeaponGroup::Monk]),
                specific_weapons: None,
                simple_weapons: true,
            },
            Self::Oozeborn => WeaponProficiencies {
                custom_weapon_groups: 0,
                specific_weapon_groups: None,
                specific_weapons: None,
                simple_weapons: true,
            },
            Self::Paladin => WeaponProficiencies {
                custom_weapon_groups: 2,
                specific_weapon_groups: None,
                specific_weapons: None,
                simple_weapons: true,
            },
            Self::Ranger => WeaponProficiencies {
                custom_weapon_groups: 1,
                specific_weapon_groups: Some(vec![
                    WeaponGroup::Bows,
                    WeaponGroup::Crossbows,
                    WeaponGroup::Thrown,
                ]),
                specific_weapons: None,
                simple_weapons: true,
            },
            Self::Rogue => WeaponProficiencies {
                custom_weapon_groups: 1,
                specific_weapon_groups: None,
                specific_weapons: Some(vec![StandardWeapon::Sap.weapon()]),
                simple_weapons: true,
            },
            Self::Sorcerer => WeaponProficiencies {
                custom_weapon_groups: 0,
                specific_weapon_groups: None,
                specific_weapons: None,
                simple_weapons: true,
            },
            Self::Warlock => WeaponProficiencies {
                custom_weapon_groups: 0,
                specific_weapon_groups: None,
                specific_weapons: None,
                simple_weapons: true,
            },
            Self::Wizard => WeaponProficiencies {
                custom_weapon_groups: 0,
                specific_weapon_groups: None,
                specific_weapons: None,
                simple_weapons: true,
            },
        }
    }
}

impl fmt::Display for Class {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.name())
    }
}

// LaTeX class generation
impl Class {
    pub fn latex_section(&self) -> String {
        let archetypes = self.archetypes();
        let archetype_names: Vec<&str> = archetypes.iter().map(|a| a.name()).collect();
        latex_formatting::latexify(format!(
            "
                \\newpage
                \\section<{class_name_title}>\\label<{class_name_title}>

                \\includegraphics[width=\\columnwidth]<classes/{class_name_lower}>

                {archetype_table}

                {description}

                \\classbasics<Alignment> {class_alignment}.

                \\classbasics<Archetypes> {class_name_title}s have the {archetype_names} archetypes.

                {basic_class_abilities}

                {special_class_abilities}

                {archetypes}

                {suffix}
            ",
            archetype_names = latex_formatting::join_str_list(&archetype_names).unwrap(),
            archetype_table = self.latex_archetype_table().trim(),
            archetypes = self
                .archetypes()
                .iter()
                .map(|a| a
                    .latex_description(self.shorthand_name())
                    .trim()
                    .to_string())
                .collect::<Vec<String>>()
                .join("\n\n"),
            basic_class_abilities = generate_latex_basic_class_abilities(self).trim(),
            description = self.narrative_text(),
            special_class_abilities = self.latex_special_class_abilities().trim(),
            class_name_title = titlecase(self.name()),
            class_name_lower = self.name(),
            class_alignment = self.alignment(),
            suffix = self.latex_suffix(),
        ))
    }

    fn latex_archetype_table(&self) -> String {
        let archetypes = self.archetypes();
        format!(
            "
                \\begin<dtable!*>
                    \\lcaption<{class_name} Progression>
                    \\begin<dtabularx><\\textwidth><l {archetype_columns}>
                        \\tb<Rank (Level)> & {archetype_headers} \\tableheaderrule
                        {rank_rows}
                    \\end<dtabularx>
                \\end<dtable!*>
            ",
            archetype_columns = vec![">{\\lcol}X"; archetypes.len()].join(" "),
            archetype_headers = archetypes
                .iter()
                .map(|a| format!(
                    "\\tb<\\archetyperef{}<{}><{}>>",
                    if a.is_magical() { "*" } else { "" },
                    self.shorthand_name(),
                    a.name()
                ))
                .collect::<Vec<String>>()
                .join(" & "),
            class_name = titlecase(self.name()),
            rank_rows = self.latex_archetype_rank_table_rows(),
        )
    }

    fn latex_archetype_rank_table_rows(&self) -> String {
        let mut rank_rows = Vec::new();
        let abilities_by_archetype_rank = self.generate_ability_names_by_archetype_rank();
        for rank in 1..abilities_by_archetype_rank.len() {
            rank_rows.push(format!(
                "
                    {rank} ({minimum_level}) & {archetype_abilities} \\\\
                ",
                rank = rank,
                minimum_level = if rank == 0 {
                    "\\tdash".to_string()
                } else {
                    format!("{}", rank * 3 - 2)
                },
                archetype_abilities = abilities_by_archetype_rank[rank],
            ))
        }
        return rank_rows
            .iter()
            .map(|s| s.trim())
            .collect::<Vec<&str>>()
            .join("\n");
    }

    fn generate_ability_names_by_archetype_rank(&self) -> Vec<String> {
        let mut abilities_by_rank_and_archetype: Vec<Vec<String>> = Vec::new();
        for archetype in self.archetypes() {
            for rank in 0..8 {
                let mut abilities_at_rank: Vec<RankAbility> =
                    archetype.visible_abilities_at_rank(rank as i32);
                abilities_at_rank.sort_by(|a, b| a.name.cmp(b.name));
                if abilities_by_rank_and_archetype.get(rank).is_none() {
                    abilities_by_rank_and_archetype.push(Vec::new());
                }
                abilities_by_rank_and_archetype[rank].push(
                    latex_formatting::uppercase_first_letter(
                        &abilities_at_rank
                            .iter()
                            .map(|a| a.name.replace('+', r"\plus"))
                            .collect::<Vec<String>>()
                            .join(", ")
                            .to_lowercase(),
                    ),
                );
            }
        }
        let mut abilities_by_rank: Vec<String> = Vec::new();
        for rank in 0..abilities_by_rank_and_archetype.len() {
            abilities_by_rank.push(abilities_by_rank_and_archetype[rank].join(" & "));
        }
        abilities_by_rank
    }

    fn latex_special_class_abilities(&self) -> &str {
        match self {
            Self::Cleric => {
                r"
                    \subsection{Special Class Abilities}

                    \cf{Clr}{Deity}
                    You must worship a specific deity to be a cleric.
                    For details, see \tref{Deities}.

                    \magicalcf{Clr}{Seek Guidance}
                    You can ask your deity for guidance about how best to serve your deity's interests.
                    This requires a ritual or prayer lasting ten minutes, with the details depending on the deity.
                    By the end, you will have received a vision, emotional instinct, or other guidance.
                    You cannot ask specific questions of your deity, and this is not a general method for sharing information.
                    Deities tend to disapprove of clerics who seek guidance to solve mortal problems that they should be able to deal with themselves.
                    You are generally informed what your current responsibilities are, such as ``tend to the wounded who enter my temple'' or ``do battle with those who serve evil''.
                "
            }
            Self::Paladin => {
                r"
                    \subsection{Special Class Abilities}

                    \cf{Pal}{Devoted Alignment} 
                    You are devoted to a specific alignment.
                    You must choose one of your alignment components: good, evil, lawful, or chaotic.
                    The alignment you choose is your devoted alignment.
                    Your paladin abilities are affected by this choice.
                    % seems unnecessary
                    % You excel at slaying creatures with alignments opposed to your devoted alignment.
                    Your alignment cannot be changed without extraordinary repurcussions.
                "
            }
            Self::Warlock => {
                r"
                    \subsection{Special Class Abilities}

                    \magicalcf{War}{Soul Pact}
                    To become a warlock, you must make a pact with a creature capable of sharing its power with you.
                    Such a creature must be 21st level, and must be a planeforged from a plane other than your own.
                    You must make a sacrifice, the details of which are subject to negotiation, and offer a part of your immortal soul.
                    In exchange, you gain the powers of a warlock.
                    The creature you make the pact with is called your soulkeeper.
                    Almost all warlocks make pacts with demons, though other soulkeepers are possible.

                    Offering your soul to an entity in this way grants it the ability to communicate with you in limited ways.
                    This communication typically manifests as unnatural emotional urges or whispered voices audible only to you.
                    Many soulkeepers use this influence to tempt their warlocks into greater evils, though the skill and subtlety of this influence can vary drastically between different soulkeepers.

                    Your pact specifies how much of your soul is granted to your soulkeeper, and the circumstances of the transfer.
                    The most common arrangement is for a soulkeeper to gain possession of your soul immediately after you die.
                    It will keep the soul for one decade per year of your life that you spend as a warlock.
                    During that time, it will not prevent you from being resurrected.
                    At the end of that time, if your soul remains intact, your soul will pass on to its intended afterlife.
                    However, other arrangements are possible, and each warlock's pact can be unique.

                    The longer you spend in an afterlife that is not your own, the more likely you are to lose your sense of self and become subsumed by the plane you are on.
                    Only a soul of extraordinary strength can maintain its integrity after decades or centuries in any plane.
                    Of course, soulkeepers generally try to accelerate this process as much as possible with various forms of torture.
                    Many warlocks seek power zealously while mortal to gain the mental fortitude necessary to keep their soul intact after death.

                    \magicalcf{War}{Whispers of the Lost}[\sparkle]
                    You hear the voices of souls that inhabit your soulkeeper's plane, linked to you through your soulkeeper.
                    Choose one of the following types of whispers that you hear.
                    {
                        \subcf{Mentoring Whispers} You hear the voice of a dead warlock whose soul is bound to the same soulkeeper as yours.

                        \subcf{Spiteful Whispers} You hear the voices of cruel souls who berate you for your flaws and mistakes.

                        \subcf{Sycophantic Whispers} You hear the voices of adoring souls who praise your talents and everything you do.

                        \subcf{Warning Whispers} You hear the voices of paranoid and fearful souls warning you of danger, both real and imagined.

                        \subcf{Whispers of the Mighty} Your soulkeeper forges the connection to your soul into a boon granted to any soul in the Abyss strong enough to claim it in battle.
                        You hear the voice of whatever soul currently possesses the boon, which may change suddenly and unexpectedly.
                    }
                "
            }
            _ => "",
        }
    }

    // TODO: organize this in a way that makes sense
    fn latex_suffix(&self) -> &str {
        match self {
            Self::Cleric => {
                r"
                \newpage
                \subsection{Cleric Domain Abilities}\label{Cleric Domain Abilities}
                    These domain abilities can be granted by the \textit{domain influence} cleric archetype.
                    All cleric domain abilities are \magical unless otherwise specified.

                    \subsubsection{Air Domain}
                        If you choose this domain, you add the \sphere{aeromancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).
                        In addition, you add the Jump skill to your \glossterm{class skill} list.

                        \parhead{Gift} You gain a \plus4 bonus to the Jump skill (see \pcref{Jump}).
                        In addition, you take half damage from \glossterm{falling damage}.
                        \parhead{Aspect} You gain a \glossterm{glide speed} equal to the \glossterm{base speed} for your size (see \pcref{Gliding}).
                        \parhead{Essence} You can use the \textit{speak with air} ability as a standard action.
                        \begin{magicalattuneability}{Speak with Air}{\abilitytag{Attune} (deep)}
                            \rankline
                            You can speak with and command air within a \areahuge radius \glossterm{zone} from your location.
                            You can ask the air simple questions and understand its responses.
                            If you command the air to perform a task, it will do so do the best of its ability until this effect ends.
                            You cannot compel the air to move faster than 50 mph.

                            After you use this ability on a particular area of air, you cannot use it again on that same area for 24 hours.

                            \rankline
                            \rank{6} The area increases to a \areagarg radius.
                        \end{magicalattuneability}
                        \parhead{Mastery} You gain a \glossterm{fly speed} equal to the \glossterm{base speed} for your size with a maximum height of 60 feet (see \pcref{Flight}).
                        As a \glossterm{free action}, you can increase your \glossterm{fatigue level} by one to ignore this height limit until the end of the round.

                    \subsubsection{Chaos Domain}
                        \parhead{Gift} You are immune to \abilitytag{Compulsion} attacks.
                        \parhead{Aspect} If you roll a 9 on an attack roll, it explodes (see \pcref{Exploding Attacks}).
                        This does not affect bonus dice rolled for exploding attacks.
                        \parhead{Essence} You can use the \textit{twist of fate} ability as a standard action.
                        \begin{magicalactiveability}{Twist of Fate}
                            \rankline
                            An improbable event occurs within \distrange.
                            You can specify in general terms what you want to happen, such as ``Make the bartender leave the bar''.
                            You cannot control the exact nature of the event, though it always beneficial for you in some way.
                            After using this ability, you cannot use it again until you finish a \glossterm{long rest}.
                        \end{magicalactiveability}
                        \parhead{Mastery} Whenever you \glossterm{explode} with an attack roll, you gain a \plus4 \glossterm{accuracy} bonus with the attack (see \pcref{Exploding Attacks}).
                        As normal, this bonus does not stack with itself, even if you explode multiple times with the same attack roll.

                    \subsubsection{Death Domain}
                        \parhead{Gift} You gain a \plus1 bonus to \glossterm{accuracy} against creatures that are below their maximum hit points.
                        \parhead{Aspect} The bonus from this domain's gift increases to \plus2.
                        \parhead{Essence} You can use the \textit{speak with dead} ability as a standard action.
                        \begin{magicalattuneability}{Speak with Dead}{\abilitytag{Attune}}
                            \rankline
                            Choose a corpse within \rngshort range.
                            The corpse must have died no more than 24 hours ago.
                            It regains a semblance of life, allowing you to speak with it as if it were the creature the corpse belonged to.
                            The creature is able to refuse to speak with you, though you can attempt to persuade it to speak normally, and some creatures may be more willing to talk if they know they are already dead.
                            The corpse must have an intact mouth to be able to speak.
                            This ability ends if 24 hours have passed since the creature died.
                        \end{magicalattuneability}
                        \parhead{Mastery} The bonus from this domain's gift increases to \plus3.

                    \subsubsection{Destruction Domain}
                        \parhead{Gift} Your abilities deal double damage to objects.
                        \parhead{Aspect} You can use the \textit{destructive strike} ability as a standard action.
                        \begin{magicalactiveability}{Destructive Strike}
                            \rankline
                            Make a \glossterm{strike} with 1d4 \glossterm{extra damage}.
                            You use the higher of your \glossterm{magical power} and your \glossterm{mundane power} to determine your damage with this ability (see \pcref{Power}).

                            \rankline
                            \rank{4} The extra damage increases to 1d4 per 4 \glossterm{power} (minimum 1d4).
                            \rank{5} The extra damage increases to 1d6 per 4 power.
                            \rank{6} The extra damage increases to 1d6 per 3 power.
                            \rank{7} The extra damage increases to 1d10 per 3 power.
                        \end{magicalactiveability}
                        \parhead{Essence} You can use the \textit{lay waste} ability as a standard action.
                        \begin{magicalactiveability}{Lay Waste}
                            \rankline
                            Make an attack vs. Fortitude against all \glossterm{unattended} objects in a \areamed radius.
                            You may freely exclude any number of 5-ft. cubes from the area, as long as the resulting area is still contiguous.
                            \hit For each target, if its \glossterm{damage resistance} is lower than your \glossterm{power}, it crumbles into a fine power and is irreparably \glossterm{destroyed}.

                            \rankline
                            \rank{6} The area increases to a \arealarge radius.
                        \end{magicalactiveability}
                        \parhead{Mastery} You gain a \plus2 bonus to your \glossterm{power} with all abilities.

                    \subsubsection{Earth Domain}
                        If you choose this domain, you add the \sphere{terramancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).

                        \parhead{Gift} You gain a \plus2 bonus to your Fortitude defense.
                        \parhead{Aspect} You gain a bonus equal to three times your rank in the Domain Mastery archetype to your maximum \glossterm{hit points}.
                        \parhead{Essence} You can use the \textit{speak with earth} ability as a standard action.
                        \begin{magicalattuneability}{Speak with Earth}{\abilitytag{Attune}}
                            \rankline
                            You can speak with earth within a \areahuge radius \glossterm{zone} from your location.
                            You can ask the earth simple questions and understand its responses.

                            After you use this ability on a particular area of earth, you cannot use it again on that same area for 24 hours.

                            \rankline
                            \rank{6} The area increases to a \areagarg radius.
                        \end{magicalattuneability}
                        \parhead{Mastery} The bonus from this domain's gift increases to \plus3, and the number of hit points you gain from its aspect increases to four times your rank in the Domain Mastery archetype.

                    \subsubsection{Evil Domain}
                        % intentionally adjacent rather than touch
                        \parhead{Gift} As a \glossterm{free action}, you may choose an adjacent \glossterm{ally}.
                        Whenever you lose \glossterm{hit points} this round, that ally loses half of those hit points in place of you.
                        You are both considered to have lost hit points from the attack for the purpose of any special effects from the attack.
                        This ability has the \abilitytag{Swift} tag.
                        \parhead{Aspect} You can use this domain's domain gift to target any \glossterm{ally} within \rngmed range.
                        \parhead{Essence} You can use the \textit{compel evil} ability as a standard action.
                        \begin{magicalactiveability}{Compel Evil}[\abilitytag{Compulsion}]
                            \rankline
                            Make an attack vs. Mental against a creature within \rngmed range.
                            Creatures who have strict codes prohibiting them from taking evil actions, such as paladins devoted to Good, are immune to this ability.
                            \hit The target takes an evil action as soon as it can.
                            Once it takes the evil action, this effect ends.
                            You have no control over the act the creature takes, but circumstances can make the target more likely to take an action you desire.
                            After this effect ends, the target becomes immune to this effect until it finishes a \glossterm{short rest}.

                            \rankline
                            You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 4.
                        \end{magicalactiveability}
                        \parhead{Mastery} You can use your domain gift to redirect your hit point loss to an adjacent unwilling creature.
                        You cannot target the same unwilling creature more than once with this ability between \glossterm{short rests}.

                    \subsubsection{Fire Domain}
                        If you choose this domain, you add the \sphere{pyromancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).

                        \parhead{Gift} You are \trait{impervious} to fire damage.
                        \parhead{Aspect} Your abilities cannot deal fire damage to your \glossterm{allies}.
                        \parhead{Essence} You can use the \textit{speak with fire} ability as a standard action.
                        \begin{magicalattuneability}{Speak with Fire}{\abilitytag{Attune}}
                            \rankline
                            You can speak with and command fire within a \areahuge radius \glossterm{zone} from your location.
                            You can ask the fire simple questions and understand its responses.
                            If you command the fire to perform a task, it will do so do the best of its ability until this effect ends.
                            You cannot compel the fire to move farther than 30 feet in a single round.
                            Fire that ends the round on non-combustable materials usually goes out, depending on the circumstances.

                            After you use this ability on a particular area of fire, you cannot use it again on that same area for 24 hours.
                            % TODO: What does an ``area of fire'' mean?

                            \rankline
                            \rank{6} The area increases to a \areagarg radius.
                        \end{magicalattuneability}
                        \parhead{Mastery} Whenever you deal fire damage, you also treat that damage as being pure energy damage.
                        This can help you deal damage to enemies that are highly resistant to fire damage.
                        Your \glossterm{allies} are still immune to fire damage that you convert in this way.
                        In addition, you become immune to fire damage.

                    \subsubsection{Good Domain}
                        % intentionally adjacent rather than touch
                        \parhead{Gift} Whenever an adjacent \glossterm{ally} suffers a \glossterm{vital wound}, you may gain a \glossterm{vital wound} instead.
                        You gain a \plus2 bonus to the \glossterm{vital roll} of each \glossterm{vital wound} you gain this way.
                        The original target suffers any other effects of the attack normally.
                        \parhead{Aspect} This domain's domain gift affects any \glossterm{ally} within a \areamed radius \glossterm{emanation} from you.
                        \parhead{Essence} You can use the \textit{compel good} ability as a standard action.
                        \begin{magicalactiveability}{Compel Good}[\abilitytag{Compulsion}]
                            \rankline
                            Make an attack vs. Mental against a creature within \rngmed range.
                            Creatures who have strict codes prohibiting them from taking evil actions, such as paladins devoted to Good, are immune to this ability.
                            \hit The target takes a good action as soon as it can.
                            Once it takes the good action, this effect ends.
                            You have no control over the act the creature takes, but circumstances can make the target more likely to take an action you desire.
                            After this effect ends, the target becomes immune to this effect until it finishes a \glossterm{short rest}.

                            \rankline
                            You gain a \plus2 bonus to \glossterm{accuracy} with the attack for each rank beyond 4.
                        \end{magicalactiveability}
                        \parhead{Mastery} Once per round, when an \glossterm{ally} within a \areamed radius \glossterm{emanation} from you would lose \glossterm{hit points}, you may lose those hit points instead.
                        The target suffers any other effects of the attack normally, though it is not treated as if it lost hit points from the attack for the purpose of special attack effects.

                    \subsubsection{Knowledge Domain}
                        If you choose this domain, you add all Knowledge skills to your cleric \glossterm{class skill} list.

                        \parhead{Gift} You gain an additional \glossterm{trained skill} (see \pcref{Trained Skills}).
                        \parhead{Aspect} Your extensive knowledge of all methods of attack and defense grants you a \plus1 bonus to Fortitude, Reflex, and Mental defenses.
                        \parhead{Essence} You can use the \textit{share knowledge} ability as a standard action.
                        \begin{magicalactiveability}{Share Knowledge}
                            \rankline
                            Make a Knowledge check of any kind.
                            Your \glossterm{allies} within a \arealarge radius learn the results of your check.
                            Creatures believe the information gained in this way to be true as if they it had seen it with their own eyes.

                            You cannot alter the knowledge you share with this check in any way, such as by adding or withholding information.

                            \rankline
                            \rank{6} You gain a \plus3 bonus to the Knowledge check.
                        \end{magicalactiveability}
                        \parhead{Mastery} You gain a \plus1 bonus to \glossterm{accuracy} with all attacks.
                        In addition, you can use your \textit{share knowledge} ability to affect all creatures, not just your allies.

                    \subsubsection{Law Domain}
                        \parhead{Gift} You gain a \plus2 bonus to Mental defense.
                        % Clarify - does this apply to exploding dice?
                        \parhead{Aspect} When you roll a 1 on an \glossterm{attack roll}, it is treated as if you had rolled a 6.
                        This does not affect bonus dice rolled for exploding attacks (see \pcref{Exploding Attacks}).
                        \parhead{Essence} You can use the \textit{compel law} ability as a standard action.
                        \begin{magicalactiveability}{Compel Law}[\abilitytag{Compulsion}]
                            \rankline
                            Make an attack vs. Mental against all creatures within a \arealarge radius from you.
                            \hit Each target is unable to break the laws that apply in the area, and any attempt to do so simply fails.
                            The laws which are applied are those which are most appropriate for the area, regardless of whether you or any other creature know those laws.

                            % Sufficiently clear that this isn't part of the hit effect?
                            When you use this ability, you also gain the condition.
                            If this condition is removed from you, it is also removed from all other affected creatures.
                            In areas under ambiguous or nonexistent government, this ability may have unexpected effects, or it may have no effect at all.

                            \rankline
                            You gain a \plus1 bonus to \glossterm{accuracy} with the attack for each rank beyond 4.
                        \end{magicalactiveability}
                        \parhead{Mastery} When you roll a 1 or a 2 on an \glossterm{attack roll} or \glossterm{check}, it is treated as if you had rolled a 6.

                    \subsubsection{Life Domain}
                        \parhead{Gift} You gain a \plus3 bonus to the Medicine skill (see \pcref{Medicine}).
                        \parhead{Aspect} You gain a bonus to your \glossterm{hit points} equal to three times your rank in the Domain Influence archetype.
                        \parhead{Essence} At the end of each round, if you became \unconscious from a \glossterm{vital wound} during that round, you can use one \magical ability that removes \glossterm{vital wounds} on yourself without taking an action.
                        You cannot affect any other creatures with this ability.
                        \parhead{Mastery} You gain a \plus1 bonus to your Constitution.

                    \subsubsection{Magic Domain}
                        If you choose this domain, you add the \sphere{thaumaturgy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).
                        % TODO: power bonus is less relevant than it used to be, maybe grant attunement point or more spells known instead?

                        \parhead{Gift} You gain a \plus3 bonus to the Knowledge (arcana) skill (see \pcref{Knowledge}).
                        \parhead{Aspect} You learn an additional divine \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
                        \parhead{Essence} You gain a \plus1 bonus to your \glossterm{power} with \magical abilities.
                        \parhead{Mastery} The power bonus from this domain's essence increases to \plus2.

                    \subsubsection{Protection Domain}
                        \parhead{Gift} You gain a bonus equal to twice your rank in this archetype to your \glossterm{damage resistance} (see \pcref{Damage Resistance}).
                        \parhead{Aspect} You can use the \textit{divine protection} ability as a \glossterm{free action}.
                        \begin{magicalactiveability}{Divine Protection}[\abilitytag{Swift}]
                            \rankline
                            % Intentionally adjacent rather than touch
                            Choose an \glossterm{ally} adjacent to you.
                            It gains a \plus1 bonus to all defenses this round.

                            A creature that sees an attack against an ally protected in this way can observe that you are the cause of the protection with a \glossterm{difficulty value} 5 Awareness check.
                            While this ability is active, you cannot gain a defense bonus from this ability, even if another creature with this ability uses it on you.
                        \end{magicalactiveability}
                        \parhead{Essence} The bonus from this domain's gift increases to three times your rank in this archetype.
                        \parhead{Mastery} The bonus from your \textit{divine protection} ability increases to \plus2.

                    \subsubsection{Strength Domain}
                        If you choose this domain, you add the Climb, Jump, and Swim skills to your cleric \glossterm{class skill} list.

                        \parhead{Gift} You gain an additional \glossterm{trained skill} (see \pcref{Trained Skills}).
                        \parhead{Aspect} You can use the \textit{divine strength} ability as a standard action.
                        \begin{magicalattuneability}{Divine Strength}{\abilitytag{Attune}}
                            \rankline
                            You gain a \plus1 \glossterm{magic bonus} to your Strength.
                        \end{magicalattuneability}
                        \parhead{Essence} You gain a \plus1 bonus to your Strength for the purpose of checks and determining your weight limits (see \pcref{Weight Limits}).
                        \parhead{Mastery} Your \textit{divine strength} ability loses the \abilitytag{Attune} tag.
                        Instead, it lasts until you use it again.

                    \subsubsection{Travel Domain}
                        If you choose this domain, you add the \sphere{astromancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).
                        In addition, you add the Knowledge (nature), Survival, and Swim skills to your cleric \glossterm{class skill} list.

                        \parhead{Gift} You gain an additional \glossterm{trained skill} (see \pcref{Trained Skills}).
                        \parhead{Aspect} You can ignore \glossterm{difficult terrain} from inanimate natural sources, such as \glossterm{heavy undergrowth}.
                        \parhead{Essence} You can use the \textit{dimensional travel} ability as a standard action.
                        \begin{magicalactiveability}{Dimensional Travel}
                            \rankline
                            You teleport up to 1 mile in any direction.
                            You do not need \glossterm{line of sight} or \glossterm{line of effect} to your destination, but you must be able to clearly visualize it.

                            \rankline
                            \rank{6} The maximum distance increases to 5 miles.
                        \end{magicalactiveability}
                        \parhead{Mastery} When you would move using one of your movement speeds, you can teleport the same distance instead.
                        This does not change the total distance you can move, but you can teleport in any direction, including vertically.
                        Being \grappled or otherwise physically constrained does not prevent you from teleporting in this way.

                        You can even attempt to move to locations outside of \glossterm{line of sight} and \glossterm{line of effect}, up to the limit of your remaining movement speed.
                        If your intended destination is invalid, the distance you tried to teleport is taken from your remaining movement, but you suffer no other ill effects.

                    \subsubsection{Trickery Domain}
                        If you choose this domain, you add the Deception, Disguise, and Stealth skills to your cleric \glossterm{class skill} list.

                        \parhead{Gift} You gain an additional \glossterm{trained skill} (see \pcref{Trained Skills}).
                        \parhead{Aspect} You gain a \plus2 bonus to the Deception, Disguise, and Stealth skills.
                        \parhead{Essence} You can use the \textit{compel belief} ability as a standard action.
                        \begin{magicalsustainability}{Compel Belief}{\abilitytag{Compulsion}, \abilitytag{Sustain} (minor)}
                            \rankline
                            Make an attack vs. Mental against a creature within \rngmed range.
                            You must also choose a belief that the target has.
                            The belief may be a lie that you told it, or even a simple misunderstanding (such as believing a hidden creature is not present in a room).
                            If the creature does not already hold the chosen belief, this ability automatically fails.
                            \hit The target continues to maintain the chosen belief, regardless of any evidence to the contrary.
                            It will interpret any evidence that the falsehood is incorrect to be somehow wrong -- an illusion, a conspiracy to decieve it, or any other reason it can think of to continue believing the falsehood.
                            At the end of the effect, the creature can decide whether it believes the falsehood or not, as normal.
                            After this effect ends, the target becomes immune to this effect until it finishes a \glossterm{short rest}.

                            \rankline
                            You gain a \plus1 bonus to \glossterm{accuracy} with the attack for each rank beyond 4.
                        \end{magicalsustainability}
                        % This seems like it's a complicated muddle of weird and possibly hilarious edge cases
                        \parhead{Mastery} You are undetectable to all \magical abilities.
                        They cannot detect your presence, sounds you make, or any actions you take.
                        For example, a scrying sensor created by a \abilitytag{Scrying} effect would be unable to detect your presence, and a creature with magical \trait{darkvision} would not be able to see you without light.

                    \subsubsection{War Domain}
                        \parhead{Gift} You gain proficiency with an additional \glossterm{weapon group} of your choice.
                        In addition, you gain proficiency with an additional \glossterm{usage class} of armor.
                        You must be proficient with light armor to become proficient with medium armor, and you must be proficient with medium armor to become proficient with heavy armor.
                        \parhead{Aspect} You gain a +1 \glossterm{accuracy} bonus with \glossterm{strikes}.
                        \parhead{Essence} You gain a \plus1 bonus to your Armor defense.
                        \parhead{Mastery} The bonus from this domain's aspect increases to \plus2.

                    \subsubsection{Water Domain}
                        If you choose this domain, you add the \sphere{aquamancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).
                        In addition, you add the Flexibility and Swim skills to your cleric \glossterm{class skill} list.

                        \parhead{Gift} You gain a \plus2 bonus to the Flexibility and Swim skills.
                        \parhead{Aspect} You can breathe water as easily as a human breathes air, preventing you from drowning or suffocating underwater.
                        \parhead{Essence} You can use the \textit{speak with water} ability as a standard action.
                        \begin{magicalattuneability}{Speak with Water}{\abilitytag{Attune}}
                            \rankline
                            You can speak with and command water within a \areahuge \glossterm{zone} from your location.
                            You can ask the water simple questions and understand its responses.
                            If you command the water to perform a task, it will do so do the best of its ability until this effect ends.
                            You cannot compel the water to move faster than 30 feet per round.

                            After you use this ability on a particular area of water, you cannot use it again on that same area for 24 hours.

                            \rankline
                            \rank{6} The area increases to a \areagarg radius.
                        \end{magicalattuneability}
                        \parhead{Mastery} Your body becomes partially aquatic, allowing you to manipulate it more easily.
                        The bonuses from this domain's gift increase to \plus10.
                        In addition, you gain a \plus1 bonus to Armor and Reflex defenses.

                    \subsubsection{Wild Domain}
                        If you choose this domain, you add the \sphere{verdamancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).
                        In addition, you add the Creature Handling, Knowledge (nature), and Survival skills to your cleric \glossterm{class skill} list.

                        \parhead{Gift} You gain an additional \glossterm{trained skill} (see \pcref{Trained Skills}).
                        % TODO: clarify whether you can have this and the druid ability
                        \parhead{Aspect} This ability functions like the \textit{wild aspect} druid ability from the Shifter archetype (see \pcref{Shifter}), except that you cannot spend \glossterm{insight points} to learn additional wild aspects.
                        \parhead{Essence} You learn an additional \textit{wild aspect}.
                        \parhead{Mastery} When you use your aspect ability from this domain, you can take on two wild aspects at once, gaining the full benefits of both.
                        When you do, you increase your \glossterm{fatigue level} by two.
                        This hybrid wild aspect only lasts for ten minutes, at which point you choose which single wild aspect remains active.

                \subsection{Ex-Clerics}
                    If you grossly violate the code of conduct required by your deity, you lose all spells and magical cleric class abilities.
                    You cannot regain those abilities until you atone for your transgressions to your deity.
            "
            }
            Self::Druid => {
                r"
                \subsection{Ex-Druids}
                    A druid who ceases to revere nature or who changes to a prohibited alignment loses all \magical druid class abilities.
                    They cannot thereafter gain levels as a druid until they atone for their transgressions.
            "
            }
            Self::Paladin => {
                r"
                \subsection{Ex-Paladins}
                    If you cease to follow your devoted alignment, you lose all \magical paladin class abilities.
                    If your atone for your misdeeds and resume the service of your devoted alignment, you can regain your abilities.
            "
            }
            _ => "",
        }
    }
}

// Going above +3 HP or DR costs an extra point per value
fn hp_dr_points(value: i32) -> i32 {
    if value < 4 {
        value
    } else {
        3 + (value - 3) * 2
    }
}
