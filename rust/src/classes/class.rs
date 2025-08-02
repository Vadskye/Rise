use crate::classes::archetype_rank_abilities::RankAbility;
use crate::classes::{generate_latex_basic_class_abilities, ClassArchetype};
use crate::core_mechanics::{Defense, HitPointProgression, Resource};
use crate::equipment::{Armor, ArmorUsageClass};
use crate::latex_formatting;
use crate::skills::{KnowledgeSubskill, Skill};
use std::cmp::max;
use std::fmt;
use titlecase::titlecase;

pub struct ArmorProficiencies {
    pub specific_armors: Option<Vec<Armor>>,
    pub usage_classes: Vec<ArmorUsageClass>,
}

pub struct WeaponProficiencies {
    pub custom_weapons: Option<String>,
    pub simple_weapons: bool,
    pub non_exotic_weapons: bool,
}

#[derive(Clone, Eq, PartialEq)]
pub enum Class {
    Automaton,
    Barbarian,
    Cleric,
    Dragon,
    Druid,
    Dryaidi,
    Fighter,
    Harpy,
    Incarnation,
    Monk,
    Naiad,
    Oozeborn,
    Paladin,
    Ranger,
    Rogue,
    Sorcerer,
    Treant,
    Troll,
    Vampire,
    Votive,
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
            Self::Votive,
            Self::Wizard,
            // Optional classes
            Self::Automaton,
            Self::Dragon,
            Self::Dryaidi,
            Self::Harpy,
            Self::Incarnation,
            Self::Naiad,
            Self::Oozeborn,
            Self::Troll,
            Self::Treant,
            Self::Vampire,
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
            Self::Votive,
            Self::Wizard,
        ]
    }

    pub fn uncommon_classes() -> Vec<Self> {
        Self::all()
            .into_iter()
            .filter(|c| c.is_uncommon_class())
            .collect()
    }

    pub fn validate_points() {
        let expected_points = 24;
        for class in Self::all() {
            let actual_points = class.calculate_point_total();
            let class_expected_points =
                expected_points + if class.is_uncommon_class() { 2 } else { 0 };
            let too_weak = actual_points < class_expected_points;
            let too_strong = actual_points > class_expected_points + 1;
            if too_weak || too_strong {
                eprintln!(
                    "Class {} has {} points; expected {}",
                    class.name(),
                    actual_points,
                    class_expected_points
                )
            }
        }
    }

    fn is_uncommon_class(&self) -> bool {
        return !Self::core_classes().contains(self);
    }

    // At level 10, one attunement is worth 8 HP generically, or about 11 to a caster.
    // Assume 2 Con
    // Low HP is (14 + 6 + 4) = 24 HP
    // Med HP is (18 + 6 + 4) = 28 HP
    // High HP is (20 + 9 + 6) = 35 HP
    // Very high HP is (24 + 12 + 8) = 44 HP
    // Conclusion: HP gap is slightly less valuable than attunement, or similar? Seems weird.
    // Assume that a third of the value of Con comes from the HP modifier (+1 Fort, +1 fatigue, HP)
    // So 2 points of Con should be similar to 2 points of HP progression.
    // Low HP is (14 + 6 + 8) = 28 HP
    // Med HP is (18 + 6 + 8) = 32 HP
    // High HP is (20 + 9 + 12) = 41 HP
    // Very high HP is (24 + 12 + 16) = 49 HP
    // Conclusion: HP progression advancement should be 4 points
    pub fn calculate_point_total(&self) -> i32 {
        self.attunement_points() * 6
            + self.hit_point_progression().creation_point_cost()
            // 3 points per insight point. Int gives (insight + trained + skill bonuses), but
            //   insight is the strongest of those, so assume it's half the value of Int.
            + self.insight_points() * 3
            // 2 points per trained skill
            + self.trained_skills() * 2
            // 1 point per 8 class skills
            + ((self.class_skills().len() as f64) / 8.0).round() as i32
            // 1 point per armor proficiency after the first. Light armor proficiency isn't
            // worth much.
            + max(0, (self.armor_proficiencies().usage_classes.len() as i32) - 1)
            // 1 point for custom weapons
            + if self.weapon_proficiencies().custom_weapons.is_some() { 1 } else { 0 }
            // 2 points for all nonexotics
            + if self.weapon_proficiencies().non_exotic_weapons { 2 } else { 0 }
            // 2 points per non-Armor defense
            + 2 * (self.defense_bonus(&Defense::Brawn) + self.defense_bonus(&Defense::Fortitude) + self.defense_bonus(&Defense::Reflex) + self.defense_bonus(&Defense::Mental))
            // 4 points per Armor defense
            + self.defense_bonus(&Defense::Armor) * 4
    }

    pub fn attunement_points(&self) -> i32 {
        match self {
            Self::Automaton => 1,
            Self::Barbarian => 0,
            Self::Cleric => 1,
            Self::Dragon => 1,
            Self::Druid => 1,
            Self::Dryaidi => 1,
            Self::Fighter => 0,
            Self::Harpy => 1,
            Self::Incarnation => 2,
            Self::Monk => 1,
            Self::Naiad => 1,
            Self::Oozeborn => 0,
            Self::Paladin => 1,
            Self::Ranger => 0,
            Self::Rogue => 1,
            Self::Sorcerer => 2,
            Self::Treant => 0,
            Self::Troll => 0,
            Self::Vampire => 1,
            Self::Votive => 1,
            Self::Wizard => 1,
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
            Self::Automaton => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
                Skill::Craft,
                Skill::Deduction,
                Skill::Devices,
                Skill::Disguise,
                Skill::Endurance,
                Skill::Jump,
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Engineering,
                    KnowledgeSubskill::Items,
                ]),
            ],
            Self::Barbarian => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
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
                Skill::Deception,
                Skill::Deduction,
                Skill::Intimidate,
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Arcana,
                    KnowledgeSubskill::Items,
                    KnowledgeSubskill::Local,
                    KnowledgeSubskill::Religion,
                    KnowledgeSubskill::Planes,
                ]),
                Skill::Medicine,
                Skill::Persuasion,
                Skill::SocialInsight,
            ],
            Self::Dragon => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
                Skill::CreatureHandling,
                Skill::Deception,
                Skill::Endurance,
                Skill::Flexibility,
                Skill::Intimidate,
                Skill::Knowledge(vec![KnowledgeSubskill::Arcana, KnowledgeSubskill::Items]),
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
                Skill::Disguise,
                Skill::Endurance,
                Skill::Intimidate,
                Skill::Jump,
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Dungeoneering,
                    KnowledgeSubskill::Items,
                    KnowledgeSubskill::Nature,
                ]),
                Skill::Persuasion,
                Skill::Ride,
                Skill::Stealth,
                Skill::Survival,
                Skill::Swim,
            ],
            Self::Dryaidi => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
                Skill::Craft,
                Skill::CreatureHandling,
                Skill::Deception,
                Skill::Disguise,
                Skill::Flexibility,
                Skill::Intimidate,
                Skill::Jump,
                Skill::Knowledge(vec![KnowledgeSubskill::Arcana, KnowledgeSubskill::Nature]),
                Skill::Medicine,
                Skill::Perform,
                Skill::Persuasion,
                Skill::SocialInsight,
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
                Skill::Jump,
                Skill::Knowledge(vec![KnowledgeSubskill::Items]),
                Skill::Medicine,
                Skill::Persuasion,
                Skill::Ride,
                Skill::Swim,
            ],
            Self::Harpy => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
                Skill::CreatureHandling,
                Skill::Deception,
                Skill::Flexibility,
                Skill::Intimidate,
                Skill::Jump,
                Skill::Perform,
                Skill::Persuasion,
                Skill::SocialInsight,
                Skill::Stealth,
                Skill::Survival,
            ],
            // Assume tethered
            Self::Incarnation => vec![
                Skill::Climb,
                Skill::Jump,
                Skill::Balance,
                Skill::Flexibility,
                Skill::Endurance,
                Skill::Craft,
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Arcana,
                    KnowledgeSubskill::Nature,
                    KnowledgeSubskill::Planes,
                ]),
                Skill::Awareness,
                Skill::Intimidate,
            ],
            Self::Monk => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
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
            Self::Naiad => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::CreatureHandling,
                Skill::Deception,
                Skill::Deduction,
                Skill::Flexibility,
                Skill::Intimidate,
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Nature
                ]),
                Skill::Medicine,
                Skill::Perform,
                Skill::Persuasion,
                Skill::SleightOfHand,
                Skill::SocialInsight,
                Skill::Stealth,
                Skill::Survival,
                Skill::Swim,
            ],
            Self::Oozeborn => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
                Skill::Endurance,
                Skill::Flexibility,
                Skill::Intimidate,
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
                Skill::Knowledge(KnowledgeSubskill::all()),
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
                Skill::Deception,
                Skill::Deduction,
                Skill::Endurance,
                Skill::Intimidate,
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Arcana,
                    KnowledgeSubskill::Items,
                    KnowledgeSubskill::Planes,
                ]),
                Skill::Persuasion,
            ],
            Self::Treant => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Craft,
                Skill::CreatureHandling,
                Skill::Endurance,
                Skill::Intimidate,
                Skill::Knowledge(vec![KnowledgeSubskill::Nature]),
                Skill::Survival,
                Skill::Swim,
            ],
            Self::Troll => vec![
                Skill::Awareness,
                Skill::Climb,
                Skill::Endurance,
                Skill::Intimidate,
                Skill::Jump,
                Skill::Stealth,
                Skill::Survival,
                Skill::Swim,
            ],
            Self::Vampire => vec![
                Skill::Awareness,
                Skill::Balance,
                Skill::Climb,
                Skill::CreatureHandling,
                Skill::Deception,
                Skill::Deduction,
                Skill::Disguise,
                Skill::Intimidate,
                Skill::Jump,
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Dungeoneering,
                    KnowledgeSubskill::Religion,
                ]),
                Skill::Persuasion,
                Skill::SocialInsight,
                Skill::Stealth,
            ],
            Self::Votive => vec![
                Skill::Awareness,
                Skill::Deception,
                Skill::Deduction,
                Skill::Disguise,
                Skill::Intimidate,
                Skill::Knowledge(vec![
                    KnowledgeSubskill::Arcana,
                    KnowledgeSubskill::Items,
                    KnowledgeSubskill::Planes,
                    KnowledgeSubskill::Religion,
                ]),
                Skill::Persuasion,
                Skill::Ride,
                Skill::SocialInsight,
            ],
            Self::Wizard => vec![
                Skill::Awareness,
                Skill::Craft,
                Skill::Deception,
                Skill::Deduction,
                Skill::Devices,
                Skill::Intimidate,
                Skill::Knowledge(KnowledgeSubskill::all()),
                Skill::Persuasion,
            ],
        }
    }

    pub fn defense_bonus(&self, defense: &Defense) -> i32 {
        match self {
            Self::Cleric => match defense {
                Defense::Mental => 2,
                _ => 0,
            },
            Self::Dryaidi => match defense {
                Defense::Fortitude => 1,
                Defense::Mental => 1,
                _ => 0,
            },
            Self::Fighter => match defense {
                Defense::Armor => 1,
                _ => 0,
            },
            Self::Harpy => match defense {
                Defense::Reflex => 2,
                _ => 0,
            },
            Self::Naiad => match defense {
                Defense::Mental => 2,
                _ => 0,
            },
            Self::Oozeborn => match defense {
                Defense::Fortitude => 2,
                _ => 0,
            },
            Self::Treant => match defense {
                Defense::Fortitude => 2,
                _ => 0,
            },
            Self::Troll => match defense {
                Defense::Fortitude => 1,
                // Hack: they actually gain +1 vital rolls, but it's not worth the effort to
                // build that into the point calc system.
                Defense::Reflex => 2,
                _ => 0,
            },
            Self::Votive => match defense {
                Defense::Mental => 2,
                _ => 0,
            },
            _ => 0,
        }
    }

    pub fn hit_point_progression(&self) -> HitPointProgression {
        match self {
            Self::Automaton => HitPointProgression::High,
            Self::Barbarian => HitPointProgression::VeryHigh,
            Self::Cleric => HitPointProgression::Medium,
            Self::Dragon => HitPointProgression::High,
            Self::Druid => HitPointProgression::Medium,
            Self::Dryaidi => HitPointProgression::Medium,
            Self::Fighter => HitPointProgression::High,
            Self::Harpy => HitPointProgression::Medium,
            Self::Incarnation => HitPointProgression::High,
            Self::Monk => HitPointProgression::High,
            Self::Naiad => HitPointProgression::Medium,
            Self::Oozeborn => HitPointProgression::VeryHigh,
            Self::Paladin => HitPointProgression::High,
            Self::Ranger => HitPointProgression::High,
            Self::Rogue => HitPointProgression::Medium,
            Self::Sorcerer => HitPointProgression::Medium,
            Self::Treant => HitPointProgression::VeryHigh,
            Self::Troll => HitPointProgression::VeryHigh,
            Self::Vampire => HitPointProgression::High,
            Self::Votive => HitPointProgression::Medium,
            Self::Wizard => HitPointProgression::Medium,
        }
    }

    pub fn insight_points(&self) -> i32 {
        match self {
            Self::Cleric => 1,
            Self::Druid => 1,
            Self::Dryaidi => 1,
            Self::Wizard => 1,
            _ => 0,
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Automaton => "automaton",
            Self::Barbarian => "barbarian",
            Self::Cleric => "cleric",
            Self::Dragon => "dragon",
            Self::Druid => "druid",
            Self::Dryaidi => "dryaidi",
            Self::Fighter => "fighter",
            Self::Harpy => "harpy",
            Self::Incarnation => "incarnation",
            Self::Monk => "monk",
            Self::Naiad => "naiad",
            Self::Oozeborn => "oozeborn",
            Self::Paladin => "paladin",
            Self::Ranger => "ranger",
            Self::Rogue => "rogue",
            Self::Sorcerer => "sorcerer",
            Self::Treant => "treant",
            Self::Troll => "troll",
            Self::Vampire => "vampire",
            Self::Votive => "votive",
            Self::Wizard => "wizard",
        }
    }

    pub fn resource_bonus(&self, resource: &Resource) -> i32 {
        match resource {
            Resource::AttunementPoint => self.attunement_points(),
            Resource::FatigueTolerance => 0,
            Resource::InsightPoint => self.insight_points(),
            Resource::TrainedSkill => self.trained_skills(),
        }
    }

    pub fn shorthand_name(&self) -> &str {
        match self {
            Self::Automaton => "Aut",
            Self::Barbarian => "Bbn",
            Self::Cleric => "Clr",
            Self::Dragon => "Drg",
            Self::Druid => "Drd",
            Self::Dryaidi => "Dry",
            Self::Fighter => "Ftr",
            Self::Harpy => "Hrp",
            Self::Incarnation => "Inc",
            Self::Monk => "Mnk",
            Self::Naiad => "Nai",
            Self::Oozeborn => "Ooz",
            Self::Paladin => "Pal",
            Self::Ranger => "Rgr",
            Self::Rogue => "Rog",
            Self::Sorcerer => "Sor",
            Self::Treant => "Tre",
            Self::Troll => "Trl",
            Self::Vampire => "Vmp",
            Self::Votive => "Vot",
            Self::Wizard => "Wiz",
        }
    }

    pub fn trained_skills(&self) -> i32 {
        match self {
            Self::Automaton => 4,
            Self::Barbarian => 4,
            Self::Cleric => 3,
            Self::Dragon => 5,
            Self::Druid => 4,
            Self::Dryaidi => 4,
            Self::Fighter => 3,
            Self::Harpy => 5,
            Self::Incarnation => 3,
            Self::Monk => 4,
            Self::Naiad => 5,
            Self::Oozeborn => 4,
            Self::Paladin => 3,
            Self::Ranger => 6,
            Self::Rogue => 6,
            Self::Sorcerer => 4,
            Self::Treant => 3,
            Self::Troll => 3,
            Self::Vampire => 4,
            Self::Votive => 3,
            Self::Wizard => 5,
        }
    }

    pub fn armor_proficiencies(&self) -> ArmorProficiencies {
        match self {
            Self::Automaton => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![
                    ArmorUsageClass::Light,
                    ArmorUsageClass::Medium,
                    ArmorUsageClass::Heavy,
                ],
            },
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
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Druid => ArmorProficiencies {
                specific_armors: Some(vec![Armor::LeatherLamellar(None), Armor::StandardShield]),
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Dryaidi => ArmorProficiencies {
                specific_armors: None,
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
            Self::Incarnation => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Monk => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Naiad => ArmorProficiencies {
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
                specific_armors: None,
                usage_classes: vec![ArmorUsageClass::Light, ArmorUsageClass::Medium],
            },
            Self::Rogue => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Sorcerer => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![],
            },
            Self::Treant => ArmorProficiencies {
                specific_armors: None,
                usage_classes: ArmorUsageClass::all(),
            },
            Self::Troll => ArmorProficiencies {
                specific_armors: Some(vec![Armor::LeatherLamellar(None), Armor::LayeredHide(None), Armor::StandardShield]),
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Vampire => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Votive => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![ArmorUsageClass::Light, ArmorUsageClass::Medium],
            },
            Self::Wizard => ArmorProficiencies {
                specific_armors: None,
                usage_classes: vec![],
            },
        }
    }

    pub fn narrative_text(&self) -> String {
        match self {
            Self::Automaton => String::from(""),
            Self::Barbarian => r"
                Barbarians are primal warriors who fight using raw physical prowess and unfettered emotions.
                Most barbarians originate from the outskirts of civilization, where the societal constraints of civilization are less present.
                Of course, becoming a barbarian is no secret rite.
                The only thing that is required is a willingness to fully experience one's emotions and channel them into physical betterment.
                This path evokes ancient memories from a time when physical supremacy was sufficient for victory, before the complexity of organized warfare.
                Anyone can discover that path for themselves.

                Barbarians are famous for their furious battlerage.
                Anger is one of the easiest emotions to channel into the violence of battle.
                It is a common starting point for new barbarians.
                However, any emotion can be used as a source of primal power, as long as it is sufficiently intense.

                Barbarians and monks have a curious relationship.
                Members of both classes place a great importance on physical excellence, and believe that the mind and body must work together to maximize potential.
                However, a typical monk sees emotions as a tool at best and an obstacle at worst.
                They value serenity and control over their mind and body.
                From the perspective of a barbarian, monks completely surrender to civilization's taming and placating influences, and abandon their primal heritage.

                Rangers and druids are natural allies of barbarians, since all three groups prefer to live at the edges of civilization.
                However, each has different reasons for their preference.
                Barbarians enjoy the freedom of the frontier.
                However, they are often too social to live as hermits in the deep wilderness.
                Druids prefer nature to civilization ideologically, and rangers are best able to fulfill their responsibilities on the frontier.
            ".to_string(),
            Self::Cleric => r"
                Clerics are divine spellcasters who draw power from their worship of a single deity.
                The powers of any individual cleric can vary greatly depending on their deity, and the specific aspects of that deity they choose to emulate.
                Many clerics have exceptional healing or oratory talents, which are powerful tools in spreading the influence of their deity.

                Deities are a constant background presence in the world of Rise.
                Commoners acknowledge the influence of many deities on their life, and offer gifts or prayers to each deity according to their purview.
                Clerics are the primary conduits through which deities answer these prayers.
                In exchange for their mighty divine power, clerics are charged with serving the deity's interests in the world.

                Clerics are the most common spellcasting class in the world.
                The path to becoming a cleric is easier than for any other spellcasting class except for sorcerers, and unlike sorcerers, clerics require no special birthright.
                Many clerics have responsibilities to their deity that preclude adventuring.
                For example, some clerics provide healing services to anyone who enters their temple.

                Adventuring clerics can exist for a variety of reasons.
                They may be charged to help spread knowledge of their deity, and becoming well-known as an adventurer can serve that end.
                Alternately, they may simply be charged by their deity to grow their personal power.
                Deities need powerful clerics to maximize their influence on the mortal world.

                Paladins and druids are closely related to clerics, since all three draw power from their veneration of external entities.
                However, the specific nature of each connection is quite different.
                Clerics can always be confident that they serve their deity's best interests.
                In contrast, paladins and druids have no oversight and unclear responsibilities.
                This makes them unreliable allies at best and ideological foes at worst.

                Druids and clerics have a degree of intrinsic tension.
                Clerics generally want to expand the worship of their specific deity.
                That task is easiest in civilized areas where many potential worshippers can be found.
                However, it is contrary to the typical druidic preference against civilization.

                The standard pantheon of deities is listed below.
                You can also talk to your GM about worshipping an unusual deity.

                % Keep in sync with the list in core_book/TheUniverse.tex
                \begin{dtable!*}
                \lcaption{Deities}
                \begin{dtabularx}{\textwidth}{X l X}
                \tb{Deity} & \tb{Alignment} & \tb{Domains} \tableheaderrule
                    Gregory, warrior god of mundanity     & Lawful good     & Good, Law, Protection, War         \\
                    Guftas, horse god of justice          & Lawful good     & Good, Law, Life, Travel            \\
                    Lucied, paladin god of justice        & Lawful good     & Destruction, Good, Law, War     \\
                    Simor, fighter god of protection      & Lawful good     & Good, Law, Protection, War        \\
                    Ayala, naiad god of water             & Neutral good    & Good, Magic, Ocean, Wild               \\
                    Pabs Beerbeard, dwarf god of drink    & Neutral good    & Good, Earth, Forge, Life             \\
                    Rucks, monk god of pragmatism         & Neutral good    & Good, Law, Protection, Travel          \\
                    Vanya, centaur god of nature          & Neutral good    & Good, Travel, War, Wild           \\
                    Brushtwig, pixie god of creativity    & Chaotic good    & Chaos, Good, Trickery, Wild            \\
                    Camilla, tiefling god of fire         & Chaotic good    & Chaos, Good, Magic, Sun          \\
                    Chavi, wandering god of stories       & Chaotic good    & Chaos, Good, Knowledge, Trickery             \\
                    Chort, dwarf god of optimism          & Chaotic good    & Chaos, Good, Life, Travel, Wild               \\
                    Ivan Ivanovitch, bear god of strength & Chaotic good    & Chaos, Good, War, Wild             \\
                    Krunch, barbarian god of destruction  & Chaotic good    & Chaos, Destruction, Good, War       \\
                    Sir Cakes, dwarf god of freedom       & Chaotic good    & Chaos, Good, Earth, Forge                  \\
                    Mikolash, scholar god of knowledge    & Lawful neutral  & Knowledge, Law, Magic, Protection      \\
                    Raphael, monk god of retribution      & Lawful neutral  & Death, Destiny, Law, Protection         \\
                    Declan, god of fire                   & True neutral    & Destruction, Knowledge, Magic, Sun    \\
                    Mammon, golem god of endurance        & True neutral    & Destiny, Knowledge, Magic, Protection \\
                    Kurai, shaman god of nature           & True neutral    & Earth, Ocean, Sky, Sun                \\
                    Amanita, druid god of decay           & Chaotic neutral & Chaos, Destruction, Life, Wild         \\
                    Antimony, elf god of necromancy       & Chaotic neutral & Chaos, Death, Knowledge, Life          \\
                    Clockwork, elf god of time            & Chaotic neutral & Chaos, Magic, Trickery, Travel         \\
                    Diplo, doll god of destruction        & Chaotic neutral & Chaos, Destruction, Trickery, War      \\
                    Lord Khallus, fighter god of pride    & Chaotic neutral & Chaos, Forge, Protection, War                   \\
                    Celeano, sorcerer god of deception    & Chaotic neutral & Chaos, Magic, Protection, Trickery     \\
                    Murdoc, god of mercenaries            & Chaotic neutral & Destruction, Knowledge, Travel, War    \\
                    Tak, orc god of war                   & Lawful evil     & Forge, Evil, Law, War           \\
                    Theodolus, sorcerer god of ambition   & Neutral evil    & Evil, Knowledge, Magic, Trickery       \\
                    Daeghul, demon god of slaughter       & Chaotic evil    & Chaos, Destruction, Evil, War          \\
                \end{dtabularx}
                \end{dtable!*}
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
                They focus more on practical maintenance of the natural world according to their own instincts.
                Nature's domain is immense, and her guidance is virtually nonexistent.

                Many druids avoid or actively reject overly developed civilization.
                The details and causes of this aversion can be source of great disagreement between different druids.
                Civilization tends to displace or kill natural life.
                It replaces the vibrant diversity of life in a forest with a comparatively bland and homogeneous subset of species.
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
            Self::Dryaidi => r"".to_string(),
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
            Self::Incarnation => r"".to_string(),
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
            Self::Naiad => r"".to_string(),
            Self::Oozeborn => r"".to_string(),
            Self::Paladin => r"
                Paladins are divinely imbued warriors who exemplify a particular alignment.
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
                Votives are deeply suspicious to paladins of good, though paladins of good tend to be more forgiving than other paladins.
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
                Sorcerers are arcane spellcasters who are inherently magical.
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
                Instead, they directly manipulate the primal forces of the universe, as wizards do.
                Sorcerers are intrinsic conduits for that raw power, and they can deepen their connection with experience.
                A sorcerer's nature is fundamentally their birthright, and it cannot be learned.

                Of course, that doesn't entirely explain why sorcerers are intrinsic conduits.
                No one knows exactly how to predict or explain sorcerous potential.
                However, sorcerers are much more common in bloodlines that have immortal ancestors.
                Most commonly, this means draconic ancestry, and some sorcerers specifically tap into their draconic potential.
                However, celestial or infernal heritage is also not unheard of, and even stranger ancestry is possible.
                In addition, sorcerers seem to be more common in areas that have been affected by powerful magic.
            ".to_string(),
            Self::Treant => String::from(""),
            Self::Troll => String::from(""),
            Self::Votive => r"
                Votives are pact spellcasters who draw power from a powerful ally through a binding magical pact.
                In life, they gain great magical power.
                However, their soul passes to their soulkeeper on death, and the pact may have other costs as well.

                Many people view votives with suspicion.
                Votives wield power that is not entirely their own, and may not have any great training or wisdom about how to apply it appropriately.
                Many are short-term thinkers, prioritizing their present needs over the long-term costs, just as they did when they made their pacts.
                In addition, votives may act as unknowing pawns in the cosmic games of their soulkeepers.

                Votives are typically self-taught, or more accurately, educated by their soulkeeper in the use of their powers.
                It is not uncommon for votives to search for votive mentors so they can master their powers without completely trusting their soulkeeper.
                These relationships are typically based on contracts and expectations of future services from the apprentice once their training is complete, just like a soul pact.
                A certain level of mistrust is common, and apprentices sometimes successfully betray their mentors, just like they hope to escape their soulkeeper's clutches.
                To minimize the danger of these relationships, votive mentors almost never take more than a single apprentice at a time.

                Clerics and votives have a complicated relationship.
                From a certain perspective, they both gain power in exchange for their service to a powerful extraplanar entity.
                Votives often enjoy emphasizing the similarity, which can be a useful rhetorical tool to mitigate anti-votive prejudice.
                For their part, clerics tend to strongly disagree with this analogy.

                Rogues tend to get along better with votives than most classes do.
                Many rogues have a ``do whatever works'' attitude that helps them understand why votives would make a soul pact, even if they might not make the same pact themselves.
                In addition, rogues are generally flexible about their companions, and wouldn't begrudge having a votive in a group as long as the votive doesn't cause problems.
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
            Self::Vampire => String::from(""),
        }
    }

    pub fn weapon_proficiencies(&self) -> WeaponProficiencies {
        match self {
            Self::Automaton => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: true,
                simple_weapons: true,
            },
            Self::Barbarian => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: true,
                simple_weapons: true,
            },
            Self::Cleric => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: false,
                simple_weapons: true,
            },
            Self::Dragon => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: false,
                simple_weapons: false,
            },
            Self::Druid => WeaponProficiencies {
                custom_weapons: Some("the shepherd's axe, sickle, and scythe".to_string()),
                non_exotic_weapons: false,
                simple_weapons: true,
            },
            Self::Dryaidi => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: false,
                simple_weapons: true,
            },
            Self::Fighter => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: true,
                simple_weapons: true,
            },
            Self::Harpy => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: false,
                simple_weapons: false,
            },
            Self::Incarnation => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: false,
                simple_weapons: true,
            },
            Self::Monk => WeaponProficiencies {
                custom_weapons: Some("monk weapons".to_string()),
                non_exotic_weapons: false,
                simple_weapons: true,
            },
            Self::Naiad => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: false,
                simple_weapons: true,
            },
            Self::Oozeborn => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: false,
                simple_weapons: true,
            },
            Self::Paladin => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: true,
                simple_weapons: true,
            },
            Self::Ranger => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: true,
                simple_weapons: true,
            },
            Self::Rogue => WeaponProficiencies {
                custom_weapons: Some(r"weapons with the \weapontag{Compact} and \weapontag{Light} weapon tags (see \pcref{Weapon Tags})".to_string()),
                non_exotic_weapons: false,
                simple_weapons: true,
            },
            Self::Sorcerer => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: false,
                simple_weapons: true,
            },
            Self::Treant => WeaponProficiencies {
                custom_weapons: Some(r"club-like weapons".to_string()),
                non_exotic_weapons: false,
                simple_weapons: true,
            },
            Self::Troll => WeaponProficiencies {
                custom_weapons: Some(r"club-like weapons".to_string()),
                non_exotic_weapons: false,
                simple_weapons: true,
            },
            Self::Vampire => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: true,
                simple_weapons: true,
            },
            Self::Votive => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: true,
                simple_weapons: true,
            },
            Self::Wizard => WeaponProficiencies {
                custom_weapons: None,
                non_exotic_weapons: false,
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
                    \\lcaption<{class_name} Archetypes>
                    \\begin<dtabularx><\\textwidth><l {archetype_columns}>
                        \\tb<Rank> & {archetype_headers} \\tableheaderrule
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

    pub fn latex_base_class_table(&self) -> String {
        format!(
            "
                \\begin<columntable>
                    \\begin<dtabularx><\\columnwidth><l l l l {xcol}>
                        \\tb<Level> & \\tb<Rank> & \\tb<HP> & \\tb<HP Per Con> & \\tb<Universal Benefits> \\tableheaderrule
                        {level_rows}
                    \\end<dtabularx>
                \\end<columntable>
            ",
            xcol = r">{\lcol}X",
            level_rows = self.latex_base_class_table_rows(),
        )
    }

    fn latex_base_class_table_rows(&self) -> String {
        let mut level_rows = Vec::new();
        for level in 1..22 {
            level_rows.push(format!(
                "
                    {level} & {rank} & {base_hp} & {hp_per_con} & {special} \\\\
                ",
                level = level,
                rank = (level + 2) / 3,
                base_hp = self.hit_point_progression().hp_from_level(level),
                hp_per_con = self.hit_point_progression().hp_from_con(level, 1),
                special = universal_character_progression_at_level(level),
            ))
        }
        return level_rows
            .iter()
            .map(|s| s.trim())
            .collect::<Vec<&str>>()
            .join("\n");
    }

    fn latex_archetype_rank_table_rows(&self) -> String {
        let mut rank_rows = Vec::new();
        let abilities_by_archetype_rank = self.generate_ability_names_by_archetype_rank();
        for rank in 1..abilities_by_archetype_rank.len() {
            rank_rows.push(format!(
                "
                    {rank} & {archetype_abilities} \\\\
                ",
                rank = rank,
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
                    You can seek guidance from your deity through a ten minute ritual or prayer.
                    This provides a vision, emotional instinct, or other guidance on how you can best serve your deity's interests.
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
            // Chaos: fae
            // Evil: devils, precursors
            // Law: moirai
            Self::Votive => {
                r"
                    \subsection{Special Class Abilities}

                    \magicalcf{War}{Soul Pact}
                    To become a votive, you must make a pact with a creature capable of sharing its power with you.
                    That creature is called your soulkeeper, and it will claim your soul for a period of time following your death.
                    Your soulkeeper may gain other benefits after your death as well.
                    In exchange, it will grant you power during your mortal life.

                    Your pact forges a deep connection between you and your soulkeeper.
                    This grants your soulkeeper the ability to observe your actions and communicate with you in limited ways.
                    Communication from your soulkeeper typically manifests as unnatural emotional urges, whispered voices audible only to you, or intrusive thoughts you can recognize as not your own.
                    Each soulkeeper will have its own goals and communication style.

                    As part of the terms of a typical pact, your soulkeeper cannot prevent you from being \glossterm{resurrected} after death.
                    However, if your pact imposes a time limit on how long your soulkeeper can retain your soul after death, resurrection restarts that time from zero.

                    \subsubsection{Soulkeepers}
                        There are four common types of soulkeeper: devils, fae, moirai, and precursors.
                        Each type of soulkeeper has different terms for its pacts and offers different rewards.

                        \parhead{Devils}
                        Devils are lawful evil creatures native to the Abyss, the Aligned Plane of evil.
                        Their pacts offer the most generous terms of all soulkeepers, in theory.
                        They impose no restrictions on your actions in life, and only affect your soul after death.
                        A typical devil will keep your soul in the Abyss for one year for each year that you live after making the pact, to a minimum of ten years.
                        Particularly long-lived species like elves can often negotiate better terms than this.
                        If your soul survives this period intact, it will proceed to its normal afterlife with no permanent cost.
                        Devils offer this bargain because they are experts in torture.
                        They can reliably break the will of their votives during that time period, allowing them to permanently gain the power of a full soul.

                        Power struggles in the Abyss are common, and mortal souls are an important currency there.
                        It is possible for one devil to assume control over another devil's souls, becoming the new soulkeeper for their votives.

                        Devil soulkeepers tend to be engaged and communicative.
                        They try tempt their votives into greater evil, and encourage acquiring power by any means necessary.

                        \parhead{Fae}
                        Fae are chaotic neutral creatures native to Discord, the Aligned Plane of chaos.
                        Their pacts can be idiosyncratic, and often come with seemingly arbitrary restrictions on how you must act in life.
                        They are also more likely to renegotiate pact details than other soul keepers, often seeking to change the restrictions that the votive must obey in life to suit their whims.
                        After death, they will typically keep your soul in Discord until you become boring to them, with a guarantee that you will eventually reach your proper afterlife.

                        Fae soulkeepers will periodically pay great attention to their votives.
                        When they do, they may send a distracting flurry of thoughts and urges that may or may not be relevant to the situation at hand.
                        Eventually, they will get bored and disappear entirely until their attention is caught again.

                        \parhead{Moirai}
                        Moirai are lawful neutral creatures native to Ordus, the Aligned Plane of law.
                        Each moirai is an impartial arbiter of some fundamental concept.
                        Their pacts always impose one restriction on you in life, and retain your soul in Ordus for a hundred years after your death.
                        The restriction is always relevant to the moirai's identity, and is focused on you as an individual rather than the world you inhabit.
                        For example, a moirai of cleanliness may require you to remain personally clean, but would not require you to clean everywhere you go.

                        Moirai soulkeepers typically remain aloof from their votives.
                        They only rarely bother to directly observe their votives' current circumstances.
                        They will send periodic reminders to maintain the terms of the pact and similar generic urges.

                        \parhead{Precursors}
                        The precursors are ancient aberrations that now live in the Eternal Void.
                        They generally despite the mortals and deities that replaced them, though their current goals are inscrutable.
                        Precursor pacts impose no restrictions on you in life, but they are the only pacts which are guaranteed to claim your soul.
                        While you are dead, your soul will be constantly pulled away from your afterlife towards the Eternal Void.
                        You can fight this pull to remain in your afterlife for a time.
                        As your will and sense of self deteriorates over the years, your concentration will slip and you will drift away.
                        There is no return from the Eternal Void.

                        Precursor pacts are attractive to votives because they do not constrain you in life or significantly interfere with your normal afterlife experience.
                        However, deities universally revile votives who make precusor pacts.
                        Stealing souls from deities and feeding them to the precursors threatens to upend the balance of the cosmos and undo the ancient wars that established mortal life.
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

                    \subsubsection{Chaos Domain}
                        \domainability{Gift} You are \impervious to \atCompulsion attacks.
                        \magicaldomainability{Aspect} Your skill checks can explode, like attacks (see \pcref{Exploding Attacks}).
                        Unlike attacks, your skill checks can only explode once.
                        \magicaldomainability{Essence}
                        \begin{magicalactiveability}{Twist of Fate}
                            \abilitycost You cannot use this ability again until you finish a \glossterm{long rest}.
                            \abilityusagetime Standard action.
                            \rankline
                            An improbable event occurs within \distrange.
                            You can specify in general terms what you want to happen, such as ``Make the bartender leave the bar''.
                            You cannot control the exact nature of the event, though it always beneficial for you in some way.
                        \end{magicalactiveability}
                        \magicaldomainability{Mastery} Your skill checks explode on a 9 or 10, not just a 10.

                    % TODO: actual math
                    \subsubsection{Death Domain}
                        % This tracks staff extra damage fairly closely
                        \magicaldomainability{Gift} When you get a critical hit with a damaging ability, it deals \glossterm{extra damage} equal to your rank in the Domain Influence archetype.
                        This extra damage is multiplied as normal by the critical hit.
                        \domainability{Aspect} You gain a \plus1 accuracy bonus for the purpose of determining whether your attacks get a critical hit.
                        \magicaldomainability{Essence} Whenever you kill a Small or larger living creature, you are \glossterm{briefly} \honed.
                        \domainability{Mastery} The accuracy bonus with critical hits increases to \plus3.

                    \subsubsection{Destiny Domain}
                        \domainability{Gift} You are immune to being \partiallyunaware.
                        \domainability{Aspect} When you use the \ability{desperate exertion} ability, if your attack result still does not hit, the ability \glossterm{repeats} during your next action on each target that it did not hit.
                        \domainability{Essence} Your \glossterm{allies} within a \largearea radius \glossterm{emanation} from you also gain the benefit of this domain's aspect.
                        \domainability{Mastery} You gain a \plus1 bonus to your \glossterm{accuracy}.

                    \subsubsection{Destruction Domain}
                        \magicaldomainability{Gift} Your damaging attacks deal double damage to objects.
                        \domainability{Aspect} You gain a \plus1 bonus to your \glossterm{magical power} and \glossterm{mundane power}.
                        \magicaldomainability{Essence}
                        \begin{magicalactiveability}{Lay Waste}
                            \abilityusagetime Standard action.
                            \rankline
                            Make an attack vs. Fortitude against all \glossterm{unattended} \glossterm{mundane} objects in a \areamed radius.
                            You may freely exclude any number of 5-ft. cubes from the area, as long as the resulting area is still contiguous.
                            \hit If the target's \glossterm{damage resistance} is lower than your \glossterm{power}, it crumbles into a fine power and is irreparably \glossterm{destroyed}.

                            \rankline
                            \rank{6} The area increases to a \arealarge radius.
                        \end{magicalactiveability}
                        \domainability{Mastery} The power bonuses increase to \plus3.

                    \subsubsection{Earth Domain}
                        If you choose this domain, you add the \sphere{terramancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).

                        \domainability{Gift} You are \impervious to Earth attacks.
                        \domainability{Aspect} You gain a bonus equal to three times your rank in the Domain Influence archetype to your maximum \glossterm{damage resistance}.
                        \domainability{Essence} You gain a \plus1 bonus to your Brawn and Fortitude defenses.
                        \domainability{Mastery} The defense bonuses increase to \plus2, and the damage resistance bonus increases to four times your rank in the Domain Influence archetype.

                    \subsubsection{Evil Domain}
                        \domainability{Gift} You are immune to being \charmed and \goaded.
                        \domainability{Aspect} You gain a \plus1 accuracy bonus with abilities that inflict \glossterm{conditions}.
                        \magicaldomainability{Essence}
                        \begin{magicalactiveability}{Blood Sacrifice}[\abilitytag{Swift}]
                            \abilityusagetime Standard action.
                            \rankline
                            Choose an \glossterm{ally} you \glossterm{touch}.
                            Whenever you would lose \glossterm{hit points} while you are adjacent to that ally, it loses half of those hit points in place of you.
                            You are both considered to have lost hit points from the attack for the purpose of any special effects from the attack.
                            This ability lasts until you \glossterm{dismiss} it or until you use it again.
                        \end{magicalactiveability}
                        \magicaldomainability{Mastery} Whenever you inflict a \glossterm{condition} on a creature, that condition must be removed an additional time before the effect ends.

                    \subsubsection{Forge Domain}
                        \domainability{Gift} You gain a \plus2 bonus to all Craft skills.
                        \domainability{Aspect} You are proficient with all non-exotic weapons.
                            In addition, you become proficient with an additional \glossterm{usage class} of armor (light, medium, or heavy).
                            You must be proficient with light armor to become proficient with medium armor, and you must be proficient with medium armor to become proficient with heavy armor.
                        \magicaldomainability{Essence} Crafting items takes you half the normal amount of time, and you do not require appropriate tools to craft items.
                        \domainability{Mastery} The Craft skill bonus increases to \plus4.
                        In addition, you gain a \plus1 bonus to your Armor defense.

                    \subsubsection{Good Domain}
                        \domainability{Gift} You are immune to \atCurse attacks and being \dominated.
                        \magicaldomainability{Aspect} 
                        \begin{magicalactiveability}{Sacrificial Bond}[\abilitytag{Swift}]
                            \abilityusagetime Standard action.
                            \rankline
                            Choose an \glossterm{ally} within \medrange.
                            Whenever that ally would gain a \glossterm{vital round} while they are within a \largearea radius \glossterm{emanation} from you, you gain that \glossterm{vital wound} instead.
                            You gain a \plus2 bonus to the \glossterm{vital roll} of each \glossterm{vital wound} you gain this way.
                            This ability lasts until you \glossterm{dismiss} it.
                            You can use it multiple times on different allies to redirect all of their vital wounds to you.
                        \end{magicalactiveability}
                        \magicaldomainability{Essence} You suffer no penalty for being \glossterm{resurrected}, and any rituals to resurrect you do not require material components.
                        \magicaldomainability{Mastery} When you use your \ability{sacrifical bond} ability, you can choose whether it also redirects all \glossterm{hit point} loss from the target to you.

                    \subsubsection{Knowledge Domain}
                        If you choose this domain, you add all Knowledge skills to your cleric \glossterm{class skill} list.

                        \domainability{Gift} You gain an additional \glossterm{trained skill} (see \pcref{Trained Skills}).
                        \magicaldomainability{Aspect} You are proficient with any tool or weapon you are currently touching.
                        This includes \glossterm{exotic weapons} and improvised weapons.
                        \domainability{Essence} You gain an additional \glossterm{insight point}.
                        \domainability{Mastery} You gain a \plus1 bonus to your Brawn, Fortitude, Mental, and Reflex defenses.

                    \subsubsection{Law Domain}
                        \domainability{Gift} You are \impervious to \atEmotion attacks.
                        \magicaldomainability{Aspect} When you roll a 1 on an \glossterm{attack roll}, it is treated as if you had rolled a 6.
                        This does not affect bonus dice rolled for exploding attacks (see \pcref{Exploding Attacks}).
                        \magicaldomainability{Essence}
                        \begin{magicalactiveability}{Compel Law}[\abilitytag{Compulsion}]
                            \abilitycost One \glossterm{fatigue level}.
                            \abilityusagetime Standard action.
                            \rankline
                            Make an attack vs. Mental against all creatures within a \largearea radius from you.
                            This attack also automatically succeeds against you, ignoring all forms of immunity.
                            If the condition from this ability is removed from you, it is also removed from all other targets.
                            \hit The target is unable to break the laws that apply in the area, and any attempt to do so simply fails.
                            The laws which are applied are those which are most appropriate for the area, regardless of whether you or any other target know those laws.
                            In areas under ambiguous or nonexistent government, this ability may have unexpected effects, or it may have no effect at all.

                            \rankline
                            You gain a \plus1 \glossterm{accuracy} bonus with the attack for each rank beyond 4.
                        \end{magicalactiveability}
                        \magicaldomainability{Mastery} When you roll a 1 or a 2 on an \glossterm{attack roll} or \glossterm{check}, it is treated as if you had rolled a 6.

                    \subsubsection{Life Domain}
                        \magicaldomainability{Gift} Whenever you cause a creature to regain hit points, they regain additional hit points equal to your rank in the Domain Influence archetype.
                        % TODO: wording
                        This additional healing applies once per ability.
                        \domainability{Aspect} You gain a bonus equal to three times your rank in the Domain Influence archetype to your maximum \glossterm{hit points}.
                        \magicaldomainability{Essence} The additional healing increases to twice your rank in the Domain Influence archetype.
                        \domainability{Mastery} The hit point bonus increases to five times your rank in the Domain Influence archetype.

                    \subsubsection{Magic Domain}
                        If you choose this domain, you add the \sphere{thaumaturgy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).
                        % TODO: power bonus is less relevant than it used to be, maybe grant attunement point or more spells known instead?

                        \domainability{Gift} You gain a \plus2 bonus to the Knowledge (arcana) skill (see \pcref{Knowledge}).
                        \magicaldomainability{Aspect} You learn an additional divine \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
                        \magicaldomainability{Essence} You gain a \plus1 bonus to your \glossterm{magical power}.
                        \magicaldomainability{Mastery} The power bonus increases to \plus2, and the skill bonus increases to \plus4.

                    \subsubsection{Ocean Domain}
                        If you choose this domain, you add the \sphere{aquamancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).
                        In addition, you add the Flexibility and Swim skills to your cleric \glossterm{class skill} list.

                        \domainability{Gift} You gain a \plus1 bonus to the Flexibility and Swim skills.
                        \magicaldomainability{Aspect} You increase the distance of your \glossterm{push} and \glossterm{knockback} abilities by 10 feet.
                        This does not allow you to push creatures out of your reach with abilities that would not normally allow that, such as the \ability{shove} ability.
                        \magicaldomainability{Essence} You gain a slow \glossterm{swim speed} (see \pcref{Swimming}).
                        If you already have a slow swim speed, your swim speed becomes average instead.
                        \magicaldomainability{Mastery} The skill bonuses increase to \plus2.
                        In addition, the push and knockback distance bonus increases to 20 feet.

                    \subsubsection{Protection Domain}
                        \domainability{Gift} You become proficient with an additional \glossterm{usage class} of armor (light, medium, or heavy).
                            You must be proficient with light armor to become proficient with medium armor, and you must be proficient with medium armor to become proficient with heavy armor.
                        \magicaldomainability{Aspect}
                        \begin{magicalactiveability}{Divine Protection}{\abilitytag{Swift}}
                            \abilityusagetime Standard action.
                            \rankline
                            Choose an \glossterm{ally} you \glossterm{touch}.
                            It gains a \plus1 \glossterm{enhancement bonus} to all defenses while it is adjacent to you.
                            This ability lasts until you \glossterm{dismiss} it or until you use it again.

                            A creature that sees an attack against an ally protected in this way can observe that you are the cause of the protection with a \glossterm{difficulty value} 5 Awareness check.
                            While this ability is active, you cannot be affected by other creatures using this ability on you.
                        \end{magicalactiveability}
                        \magicaldomainability{Essence} You gain a \plus1 bonus to your Armor defense.
                        \domainability{Mastery} The defense bonus from your \textit{divine protection} ability increases to \plus2.

                    % TODO: revelry / celebration domain? Nothing for Dionysus currently

                    \subsubsection{Sky Domain}
                        If you choose this domain, you add the \sphere{aeromancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).
                        In addition, you add the Jump skill to your list of class skills.

                        \magicaldomainability{Gift} You gain a \plus10 foot bonus to your maximum horizontal jump distance (see \pcref{Jump}).
                        This increases your maximum vertical jump distance normally.
                        \magicaldomainability{Aspect} You gain an average \glossterm{glide speed} (see \pcref{Gliding}).
                        In addition, you take half damage from \glossterm{falling damage}.
                        \magicaldomainability{Essence} You gain a slow \glossterm{fly speed} with a maximum height of 15 feet (see \pcref{Flight}).
                        As a \glossterm{free action}, you can increase your \glossterm{fatigue level} by one to ignore this height limit until the end of the round.
                        \magicaldomainability{Mastery} Your fly speed improves to average speed, with a maximum height of 30 feet.

                    \subsubsection{Storm Domain}
                        If you choose this domain, you add the \sphere{electromancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).

                        \magicaldomainability{Gift} You are \impervious to \atElectricity attacks.
                        \magicaldomainability{Essence} Whenever you use a damaging \atElectricity ability that affects an area, you \glossterm{repeat} that ability during your next action.
                        The repeat has the \atAuditory tag instead of the \atElectricity tag, deals half damage, and affects each \glossterm{enemy} adjacent to you instead of its normal targets.
                        \magicaldomainability{Aspect} You also cause a \glossterm{repeat} when you \glossterm{chain} to yourself with a damaging \atElectricity ability.
                        The repeat has the \atAuditory tag instead of the \atElectricity tag and deals half damage.
                        \magicaldomainability{Mastery} Whenever you inflict a \glossterm{condition} on a creature with a \atAuditory or \atElectricity ability, that condition must be removed twice before the effect ends.

                    \subsubsection{Sun Domain}
                        If you choose this domain, you add the \sphere{pyromancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).

                        \domainability{Gift} You radiate \glossterm{bright illumination} in a \medarea radius.
                        You can suppress or resume this illumination as a \glossterm{free action} once per round.
                        \magicaldomainability{Aspect} Whenever you use an ability that creates illumination, you can give it the \atFire \glossterm{ability tag}.
                        In addition, your \glossterm{allies} are immune to damage from your \atFire abilities.
                        % TODO: wording
                        \magicaldomainability{Essence} You gain a \plus1 bonus to your \glossterm{magical power}.
                        \magicaldomainability{Mastery} The power bonus increases to \plus2, and you radiate \glossterm{brilliant illumination} instead of bright illumination.

                    \subsubsection{Travel Domain}
                        If you choose this domain, you add the \sphere{astromancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).
                        In addition, you add the Knowledge (nature) and Survival skills to your cleric \glossterm{class skill} list.

                        \domainability{Gift} You gain a \plus1 bonus to the Knowledge (nature) and Survival skills.
                        \magicaldomainability{Aspect} You can ignore \glossterm{difficult terrain} from inanimate natural sources, such as \glossterm{heavy undergrowth}.
                        \magicaldomainability{Essence} Once per phase, you can teleport horizontally instead of moving using your \glossterm{walk speed}.
                            Teleporting a given distance costs movement equal to twice that distance.
                            If this teleportation fails for any reason, you still expend that movement.
                        \magicaldomainability{Mastery} Teleporting a given distance only costs movement equal to that distance.

                    \subsubsection{Trickery Domain}
                        If you choose this domain, you add the Deception, Disguise, and Stealth skills to your cleric \glossterm{class skill} list.

                        \domainability{Gift} You gain a \plus1 bonus to the Deception, Disguise, and Stealth skills.
                        \magicaldomainability{Aspect} Whenever a \atCompulsion or \atEmotion attack misses you, you learn the effect it would have had if it had succeeded.
                        Creatures that miss you in this way believe that their attack hit, though they may realize the truth if you do not act appropriately.
                        \magicaldomainability{Essence} You are \impervious to \atCompulsion and \atEmotion attacks.
                        If you would already be impervious to either tag, you become immune to attacks with that tag instead.
                        % This seems like it's a complicated muddle of weird and possibly hilarious edge cases
                        \magicaldomainability{Mastery} The skill bonuses increase to \plus2.
                        In addition, you are undetectable to all \magical abilities.
                        They cannot detect your presence, sounds you make, or any actions you take.
                        For example, a scrying sensor created by a \abilitytag{Scrying} effect would be unable to detect your presence, and a creature with magical \trait{darkvision} would not be able to see you without light.

                    \subsubsection{War Domain}
                        \domainability{Gift} You gain proficiency with all non-exotic weapons.
                        \domainability{Aspect} You learn one \glossterm{maneuver} from any \glossterm{combat style} (see \pcref{Combat Styles}).
                        Its rank must not exceed your rank in the Domain Influence archetype.
                        You gain an accuracy bonus with that maneuver equal to the amount by which your rank in the Domain Influence archetype exceeds the maneuver's rank.
                        When you gain access to a new \glossterm{rank} in the Domain Influence archetype,
                            you can exchange that maneuver for another maneuver with a rank that does not exceed your rank in the Domain Influence archetype.
                        \domainability{Essence} You gain a \plus1 bonus to your \glossterm{magical power} and \glossterm{mundane power}.
                        \domainability{Mastery} You gain a +1 \glossterm{accuracy} bonus with \glossterm{strikes}.

                    \subsubsection{Wild Domain}
                        If you choose this domain, you add the \sphere{verdamancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).
                        In addition, you add the Creature Handling, Knowledge (nature), and Survival skills to your cleric \glossterm{class skill} list.

                        \domainability{Gift} You gain a \plus1 bonus to the Creature Handling, Knowledge (nature), and Survival skills.
                        \magicaldomainability{Aspect} You gain one \textit{wild aspect}, as the druid ability from the Shifter archetype (see \pcref{Shifter}).
                        You cannot spend \glossterm{insight points} to learn additional wild aspects.
                        The aspect's effect improves based on your rank in the Domain Influence archetype.
                        If you already have that ability, you simply learn an additional wild aspect, and the aspect's effect continues to scale with your Shifter archetype rank.
                        \magicaldomainability{Essence} The skill bonuses increase to \plus2.
                        \magicaldomainability{Mastery} You learn an additional \textit{wild aspect}.

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

// This should match the Character Advancement and Gaining Levels table
fn universal_character_progression_at_level(level: i32) -> String {
    match level {
        5 => "+1 to two attributes",
        6 => "Legacy item: rank 3",
        9 => "Legacy item: ranks 3 and 3",
        11 => "+1 to two attributes",
        12 => "Legacy item: ranks 5 and 3",
        15 => "Legacy item: ranks 5 and 5",
        17 => "+1 to two attributes",
        18 => "Legacy item: ranks 7 and 5",
        21 => "Legacy item: ranks 7 and 7",
        _ => r"\tdash",
    }.to_string()
}
