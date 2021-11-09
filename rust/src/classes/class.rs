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
    Druid,
    Fighter,
    Monk,
    Paladin,
    Ranger,
    Rogue,
    Sorcerer,
    Warlock,
    Wizard,
}

impl Class {
    pub fn all() -> Vec<Self> {
        return vec![
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
        ];
    }

    pub fn attunement_points(&self) -> i32 {
        match self {
            Self::Barbarian => 2,
            Self::Cleric => 3,
            Self::Druid => 3,
            Self::Fighter => 2,
            Self::Monk => 3,
            Self::Paladin => 2,
            Self::Ranger => 2,
            Self::Rogue => 2,
            Self::Sorcerer => 4,
            Self::Warlock => 3,
            Self::Wizard => 4,
        }
    }

    pub fn archetypes(&self) -> Vec<ClassArchetype> {
        return ClassArchetype::all()
            .into_iter()
            .filter(|a| a.class().name() == self.name())
            .collect();
    }

    pub fn alignment(&self) -> &str {
        match self {
            _ => "Any",
        }
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
                Skill::Spellsense,
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
                    KnowledgeSubskill::Geography,
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
                Skill::Jump,
                Skill::Persuasion,
                Skill::Ride,
                Skill::Swim,
            ],
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
                Skill::Spellsense,
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
                    KnowledgeSubskill::Geography,
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
                Skill::Spellsense,
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
                Skill::Spellsense,
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
                Skill::Spellsense,
            ],
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
                Defense::Mental => 4,
            },
            Self::Monk => match defense {
                Defense::Armor => 1,
                Defense::Fortitude => 3,
                Defense::Reflex => 6,
                Defense::Mental => 5,
            },
            Self::Paladin => match defense {
                Defense::Armor => 1,
                Defense::Fortitude => 6,
                Defense::Reflex => 3,
                Defense::Mental => 5,
            },
            Self::Ranger => match defense {
                Defense::Armor => 1,
                Defense::Fortitude => 5,
                Defense::Reflex => 5,
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
            Self::Barbarian => 4,
            Self::Cleric => 2,
            Self::Druid => 2,
            Self::Fighter => 3,
            Self::Monk => 2,
            Self::Paladin => 3,
            Self::Ranger => 3,
            Self::Rogue => 2,
            Self::Sorcerer => 2,
            Self::Warlock => 3,
            Self::Wizard => 1,
        }
    }

    pub fn insight_points(&self) -> i32 {
        match self {
            Self::Barbarian => 1,
            Self::Cleric => 2,
            Self::Druid => 2,
            Self::Fighter => 2,
            Self::Monk => 2,
            Self::Paladin => 2,
            Self::Ranger => 2,
            Self::Rogue => 3,
            Self::Sorcerer => 2,
            Self::Warlock => 3,
            Self::Wizard => 3,
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Barbarian => "barbarian",
            Self::Cleric => "cleric",
            Self::Druid => "druid",
            Self::Fighter => "fighter",
            Self::Monk => "monk",
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
            Self::Druid => "Drd",
            Self::Fighter => "Ftr",
            Self::Monk => "Mnk",
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
            Self::Barbarian => 5,
            Self::Cleric => 4,
            Self::Druid => 5,
            Self::Fighter => 4,
            Self::Monk => 5,
            Self::Paladin => 3,
            Self::Ranger => 6,
            Self::Rogue => 8,
            Self::Sorcerer => 4,
            Self::Warlock => 3,
            Self::Wizard => 4,
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
            Self::Druid => ArmorProficiencies {
                specific_armors: Some(vec![Armor::Hide(None)]),
                usage_classes: vec![ArmorUsageClass::Light],
            },
            Self::Fighter => ArmorProficiencies {
                specific_armors: None,
                usage_classes: ArmorUsageClass::all(),
            },
            Self::Monk => ArmorProficiencies {
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

    pub fn weapon_proficiencies(&self) -> WeaponProficiencies {
        match self {
            Self::Barbarian => WeaponProficiencies {
                custom_weapon_groups: 3,
                specific_weapon_groups: None,
                specific_weapons: None,
                simple_weapons: true,
            },
            Self::Cleric => WeaponProficiencies {
                custom_weapon_groups: 1,
                specific_weapon_groups: None,
                specific_weapons: None,
                simple_weapons: true,
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
            Self::Monk => WeaponProficiencies {
                custom_weapon_groups: 0,
                specific_weapon_groups: Some(vec![WeaponGroup::Monk]),
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
        return latex_formatting::latexify(format!(
            "
                \\newpage
                \\section<{class_name}>\\label<{class_name}>

                {archetype_table}

                \\classbasics<Alignment> {class_alignment}.

                \\classbasics<Archetypes> {class_name}s have the {archetype_names} archetypes.

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
            special_class_abilities = self.latex_special_class_abilities().trim(),
            class_name = titlecase(self.name()),
            class_alignment = self.alignment(),
            suffix = self.latex_suffix(),
        ));
    }

    fn latex_archetype_table(&self) -> String {
        let archetypes = self.archetypes();
        return format!(
            "
                \\begin<dtable!*>
                    \\lcaption<{class_name} Progression>
                    \\begin<dtabularx><\\textwidth><l l {archetype_columns}>
                        \\tb<Rank> & \\tb<Min Level> & {archetype_headers} \\tableheaderrule
                        {rank_rows}
                    \\end<dtabularx>
                \\end<dtable!*>
            ",
            archetype_columns = vec![">{\\lcol}X"; archetypes.len()].join(" "),
            archetype_headers = archetypes
                .iter()
                .map(|a| format!("\\tb<{}>", a.name()))
                .collect::<Vec<String>>()
                .join(" & "),
            class_name = titlecase(self.name()),
            rank_rows = self.latex_archetype_rank_table_rows(),
        );
    }

    fn latex_archetype_rank_table_rows(&self) -> String {
        let mut rank_rows = Vec::new();
        let abilities_by_archetype_rank = self.generate_ability_names_by_archetype_rank();
        for rank in 0..abilities_by_archetype_rank.len() {
            rank_rows.push(format!(
                "
                    {rank} & {minimum_level} & {archetype_abilities} \\\\
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
                            .map(|a| a.name.to_owned())
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
        return abilities_by_rank;
    }

    fn latex_special_class_abilities(&self) -> &str {
        match self {
            Self::Cleric => {
                r"
                    \subsection{Special Class Abilities}

                    \cf{Clr}{Deity}
                    You must worship a specific deity to be a cleric.
                    Deities and their associated domains are listed in \trefnp{Deities}.

                    \begin{dtable!*}
                        \lcaption{Deities}
                        \begin{dtabularx}{\textwidth}{X l X}
                            \tb{Deity} & \tb{Alignment} & \tb{Domains} \tableheaderrule
                            Gregory, warrior god of mundanity     & Lawful good     & Law, Protection, Strength, War         \\
                            Guftas, horse god of justice          & Lawful good     & Good, Law, Strength, Travel            \\
                            Lucied, paladin god of justice        & Lawful good     & Destruction, Good, Protection, War     \\
                            Simor, fighter god of protection      & Lawful good     & Good, Protection, Strength, War        \\
                            Ayala, naiad god of water             & Neutral good    & Life, Magic, Water, Wild               \\
                            Pabs Beerbeard, dwarf god of drink    & Neutral good    & Good, Life, Strength, Wild             \\
                            Rucks, monk god of pragmatism         & Neutral good    & Good, Law, Protection, Travel          \\
                            Vanya, centaur god of nature          & Neutral good    & Good, Strength, Travel, Wild           \\
                            Brushtwig, pixie god of creativity    & Chaotic good    & Chaos, Good, Trickery, Wild            \\
                            Camilla, tiefling god of fire         & Chaotic good    & Fire, Good, Magic, Protection          \\
                            Chavi, wandering god of stories       & Chaotic good    & Chaos, Knowledge, Trickery             \\
                            Chort, dwarf god of optimism          & Chaotic good    & Good, Life, Travel, Wild               \\
                            Ivan Ivanovitch, bear god of strength & Chaotic good    & Chaos, Strength, War, Wild             \\
                            Krunch, barbarian god of destruction  & Chaotic good    & Destruction, Good, Strength, War       \\
                            Sir Cakes, dwarf god of freedom       & Chaotic good    & Chaos, Good, Strength                  \\
                            Mikolash, scholar god of knowledge    & Lawful neutral  & Knowledge, Law, Magic, Protection      \\
                            Raphael, monk god of retribution      & Lawful neutral  & Death, Law, Protection, Travel         \\
                            Declan, god of fire                   & True neutral    & Destruction, Fire, Knowledge, Magic    \\
                            Mammon, golem god of endurance        & True neutral    & Knowledge, Magic, Protection, Strength \\
                            Kurai, shaman god of nature           & True neutral    & Air, Earth, Fire, Water                \\
                            Amanita, druid god of decay           & Chaotic neutral & Chaos, Destruction, Life, Wild         \\
                            Antimony, elf god of necromancy       & Chaotic neutral & Death, Knowledge, Life, Magic          \\
                            Clockwork, elf god of time            & Chaotic neutral & Chaos, Magic, Trickery, Travel         \\
                            Diplo, doll god of destruction        & Chaotic neutral & Chaos, Destruction, Strength, War      \\
                            Lord Khallus, fighter god of pride    & Chaotic neutral & Chaos, Strength, War                   \\
                            Celeano, sorcerer god of deception    & Chaotic neutral & Chaos, Magic, Protection, Trickery     \\
                            Murdoc, god of mercenaries            & Chaotic neutral & Destruction, Knowledge, Travel, War    \\
                            Ribo, halfling god of trickery        & Chaotic neutral & Chaos, Trickery, Water                 \\
                            Tak, orc god of war                   & Lawful evil     & Law, Strength, Trickery, War           \\
                            Theodolus, sorcerer god of ambition   & Neutral evil    & Evil, Knowledge, Magic, Trickery       \\
                            Daeghul, demon god of slaughter       & Chaotic evil    & Destruction, Evil, Magic, War          \\
                        \end{dtabularx}
                    \end{dtable!*}
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

                    \cf{War}{Soul Pact}
                    To become a warlock, you must make a pact with a creature capable of sharing its power with you.
                    Generally, such a creature must be 21st level, and must be a planeforged from a plane other than your own.
                    You must make a sacrifice, the details of which are subject to negotiation, and offer a part of your immortal soul.
                    In exchange, you gain the powers of a warlock.
                    The creature you make the pact with is called your soulkeeper.
                    Most warlocks make pacts with demons or devils, though other soulkeepers are possible.

                    Offering your soul to an entity in this way grants it the ability to communicate with you in limited ways.
                    This communication typically manifests as unnatural emotional urges or whispered voices audible only to you.

                    Your pact specifies how much of your soul is granted to your soulkeeper, and the circumstances of the transfer.
                    The most common arrangement is for a soulkeeper to gain possession of your soul immediately after you die.
                    It will keep the soul for one decade per year of your life that you spend as a warlock.
                    During that time, it will not prevent you from being resurrected.
                    At the end of that time, if your soul remains intact, your soul will pass on to its intended afterlife.
                    However, other arrangements are possible, and each warlock's pact can be unique.

                    The longer you spend in an afterlife that is not your own, the more likely you are to lose your sense of self and become subsumed by the plane you are on.
                    Only a soul of extraordinary strength can maintain its integrity after decades or centuries in any plane.
                    Many warlocks seek power zealously while mortal to gain the mental fortitude necessary to keep their soul intact after death.

                    \cf{War}{Whispers of the Lost}[Magical]
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
                    All cleric domain abilities are \glossterm{magical} unless otherwise specified.

                    \subsubsection{Air}
                        If you choose this domain, you add the \sphere{aeromancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).
                        In addition, you add the Jump skill to your \glossterm{class skill} list.

                        \parhead{Gift} You gain a \plus4 bonus to the Jump skill (see \pcref{Jump}).
                        In addition, you take half damage from \glossterm{falling damage}.
                        \parhead{Aspect} You gain a \glossterm{glide speed} equal to the \glossterm{base speed} for your size (see \pcref{Gliding}).
                        \parhead{Essence} You can use the \textit{speak with air} ability as a standard action.
                        \begin{attuneability}{Speak with Air}
                            \abilitytag{Attune} (self)
                            \rankline
                            You can speak with and command air within a \areahuge radius \glossterm{zone} from your location.
                            You can ask the air simple questions and understand its responses.
                            If you command the air to perform a task, it will do so do the best of its ability until this effect ends.
                            You cannot compel the air to move faster than 50 mph.

                            After you use this ability on a particular area of air, you cannot use it again on that same area for 24 hours.

                            \rankline
                            \rank{6} The area increases to a \areagarg radius.
                        \end{attuneability}
                        \parhead{Mastery} You gain a \glossterm{fly speed} equal to the \glossterm{base speed} for your size with a maximum height of 120 feet (see \pcref{Flying}).
                        At the start of each phase, you can increase your \glossterm{fatigue level} by one to ignore this height limit until the end of the round.

                    \subsubsection{Chaos}
                        \parhead{Gift} You are immune to \abilitytag{Compulsion} attacks.
                        \parhead{Aspect} If you roll a 1 on an attack roll, it explodes (see \pcref{Exploding Attacks}).
                        This does not affect bonus dice rolled for exploding attacks.
                        \parhead{Essence} You can use the \textit{twist of fate} ability as a standard action.
                        \begin{instantability}{Twist of Fate}
                            Instant
                            \rankline
                            An improbable event occurs within \rnglong range.
                            You can specify in general terms what you want to happen, such as ``Make the bartender leave the bar''.
                            You cannot control the exact nature of the event, though it always beneficial for you in some way.
                            After using this ability, you cannot use it again until you take a \glossterm{long rest}.
                        \end{instantability}
                        \parhead{Mastery} Whenever you \glossterm{explode} with an attack roll, you gain a \plus4 \glossterm{accuracy} bonus with the attack (see \pcref{Exploding Attacks}).
                        As normal, this bonus does not stack with itself, even if you explode multiple times with the same attack roll.

                    \subsubsection{Death}
                        % Lame gift
                        \parhead{Gift} You gain a \plus2 bonus to Fortitude defense.
                        \parhead{Aspect} You gain a \plus2 bonus to \glossterm{accuracy} against creatures that are below their maximum hit points.
                        \parhead{Essence} You can use the \textit{speak with dead} ability as a standard action.
                        \begin{attuneability}{Speak with Dead}
                            \abilitytag{Attune} (self)
                            \rankline
                            Choose a corpse within \rngshort range.
                            The corpse must have died no more than 24 hours ago.
                            It regains a semblance of life, allowing you to speak with it as if it were the creature the corpse belonged to.
                            The creature is able to refuse to speak with you, though you can attempt to persuade it to speak normally, and some creatures may be more willing to talk if they know they are already dead.
                            The corpse must have an intact mouth to be able to speak.
                            This ability ends if 24 hours have passed since the creature died.
                        \end{attuneability}
                        \parhead{Mastery} The bonus from this domain's aspect increases to \plus5.

                    \subsubsection{Destruction}
                        \parhead{Gift} You can use the \textit{destructive attack} ability as a standard action.
                        \begin{instantability}{Destructive Attack}
                            Instant
                            \rankline
                            Make a \glossterm{strike} with a \minus2 penalty to \glossterm{accuracy}.
                            You gain a \plus5 damage bonus with the strike.

                            \rankline
                            \rank{3} The damage bonus increases to \plus10.
                            \rank{5} The damage bonus increases to \plus15.
                            \rank{7} The damage bonus increases to \plus20.
                        \end{instantability}
                        \parhead{Aspect} Your abilities deal double damage to objects.
                        \parhead{Essence} You can use the \textit{lay waste} ability as a standard action.
                        \begin{instantability}{Lay Waste}
                            Instant
                            \rankline
                            Make an attack vs. Fortitude against all \glossterm{unattended} objects in a \areamed radius.
                            You may freely exclude any number of 5-ft. cubes from the area, as long as the resulting area is still contiguous.
                            \hit For each target, if its \glossterm{damage resistance} is lower than your \glossterm{power}, it crumbles into a fine power and is irreparably \glossterm{destroyed}.

                            \rankline
                            \rank{6} The area increases to a \arealarge radius.
                        \end{instantability}
                        \parhead{Mastery} You gain a \plus4 bonus to your \glossterm{power} with all abilities.

                    \subsubsection{Earth}
                        If you choose this domain, you add the \sphere{terramancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).

                        \parhead{Gift} You gain a \plus2 bonus to Fortitude defense.
                        \parhead{Aspect} You gain a bonus equal to three times your rank in the Domain Mastery archetype to your maximum \glossterm{hit points}.
                        \parhead{Essence} You can use the \textit{speak with earth} ability as a standard action.
                        \begin{attuneability}{Speak with Earth}
                            \abilitytag{Attune} (self)
                            \rankline
                            You can speak with earth within a \areahuge radius \glossterm{zone} from your location.
                            You can ask the earth simple questions and understand its responses.

                            After you use this ability on a particular area of earth, you cannot use it again on that same area for 24 hours.

                            \rankline
                            \rank{6} The area increases to a \areagarg radius.
                        \end{attuneability}
                        \parhead{Mastery} The bonus from this domain's gift increases to \plus3, and the number of hit points you gain from its aspect increases to four times your rank in the Domain Mastery archetype.

                    \subsubsection{Evil}
                        \parhead{Gift} At the start of each phase, you may choose an adjacent \glossterm{ally}.
                        If you do, the first time you would lose a \glossterm{hit point} that phase, the target loses that hit point instead.
                        If the target is unable to lose hit points, such as if it has no hit points remaining, you suffer the hit point loss normally.
                        \parhead{Aspect} You can use this domain's domain gift to target any \glossterm{ally} within \rngmed range.
                        \parhead{Essence} You can use the \textit{compel evil} ability as a standard action.
                        \begin{durationability}{Compel Evil}
                            \spelltwocol{Duration}{\abilitytag{Compulsion}}
                            \rankline
                            Make an attack vs. Mental against a creature within \rngmed range.
                            Creatures who have strict codes prohibiting them from taking evil actions, such as paladins devoted to Good, are immune to this ability.
                            \hit The target takes an evil action as soon as it can.
                            Once it takes the evil action, this effect ends.
                            You have no control over the act the creature takes, but circumstances can make the target more likely to take an action you desire.
                            After this effect ends, the subject becomes immune to this effect until it takes a \glossterm{short rest}.

                            \rankline
                            You gain a \plus1 bonus to \glossterm{accuracy} with the attack for each rank beyond 4.
                        \end{durationability}
                        \parhead{Mastery} You can use your domain gift to redirect your hit point loss to an adjacent unwilling creature.
                        You cannot target the same unwilling creature more than once with this ability between \glossterm{short rests}.

                    \subsubsection{Fire}
                        If you choose this domain, you add the \sphere{pyromancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).

                        \parhead{Gift} You are \glossterm{impervious} to fire damage.
                        \parhead{Aspect} Your abilities cannot deal fire damage to your \glossterm{allies}.
                        \parhead{Essence} You can use the \textit{speak with fire} ability as a standard action.
                        \begin{attuneability}{Speak with Fire}
                            \abilitytag{Attune} (self)
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
                        \end{attuneability}
                        \parhead{Mastery} Whenever you deal fire damage, you also treat that damage as being pure energy damage.
                        This can help you deal damage to enemies that are highly resistant to fire damage.
                        In addition, you become immune to fire damage.

                    \subsubsection{Good}
                        \parhead{Gift} Whenever an adjacent \glossterm{ally} suffers a \glossterm{vital wound}, you may gain a \glossterm{vital wound} instead.
                        You gain a \plus2 bonus to the \glossterm{vital roll} of each \glossterm{vital wound} you gain this way.
                        The original target suffers any other effects of the attack normally.
                        \parhead{Aspect} This domain's domain gift affects any \glossterm{ally} within a \areamed radius \glossterm{emanation} from you.
                        \parhead{Essence} You can use the \textit{compel good} ability as a standard action.
                        \begin{instantability}{Compel Good}
                            \spelltwocol{Instant}{\abilitytag{Compulsion}}
                            \rankline
                            Make an attack vs. Mental against a creature within \rngmed range.
                            Creatures who have strict codes prohibiting them from taking evil actions, such as paladins devoted to Good, are immune to this ability.
                            \hit The target takes a good action as soon as it can.
                            Once it takes the good action, this effect ends.
                            You have no control over the act the creature takes, but circumstances can make the target more likely to take an action you desire.
                            After this effect ends, the subject becomes immune to this effect until it takes a \glossterm{short rest}.

                            \rankline
                            You gain a \plus1 bonus to \glossterm{accuracy} with the attack for each rank beyond 4.
                        \end{instantability}
                        \parhead{Mastery} Once per round, when an \glossterm{ally} within a \areamed radius \glossterm{emanation} from you would lose \glossterm{hit points}, you may lose those hit points instead.
                        The target suffers any other effects of the attack normally, though it is not treated as if it lost hit points from the attack for the purpose of special attack effects.

                    \subsubsection{Knowledge}
                        If you choose this domain, you add all Knowledge skills to your cleric \glossterm{class skill} list.

                        \parhead{Gift} You gain an additional \glossterm{trained} skill (see \pcref{Trained Skills}).
                        \parhead{Aspect} Your extensive knowledge of all methods of attack and defense grants you a \plus1 bonus to Fortitude, Reflex, and Mental defenses.
                        \parhead{Essence} You can use the \textit{share knowledge} ability as a standard action.
                        \begin{instantability}{Share Knowledge}
                            Instant
                            \rankline
                            Make a Knowledge check of any kind.
                            Your \glossterm{allies} within a \arealarge radius learn the results of your check.
                            Creatures believe the information gained in this way to be true as if they it had seen it with their own eyes.

                            You cannot alter the knowledge you share with this check in any way, such as by adding or withholding information.

                            \rankline
                            \rank{6} You gain a \plus3 bonus to the Knowledge check.
                        \end{instantability}
                        \parhead{Mastery} You gain a \plus1 bonus to \glossterm{accuracy} with all attacks.
                        In addition, you can use your \textit{share knowledge} ability to affect all creatures, not just your allies.

                    \subsubsection{Law}
                        \parhead{Gift} You gain a \plus2 bonus to Mental defense.
                        % Clarify - does this apply to exploding dice?
                        \parhead{Aspect} When you roll a 1 on an \glossterm{attack roll}, it is treated as if you had rolled a 6.
                        \parhead{Essence} You can use the \textit{compel law} ability as a standard action.
                        \begin{durationability}{Compel Law}
                            \spelltwocol{Duration}{\abilitytag{Compulsion}}
                            \rankline
                            Make an attack vs. Mental against all creatures within a \arealarge radius from you.
                            \hit Each subject is unable to break the laws that apply in the area, and any attempt to do so simply fails.
                            The laws which are applied are those which are most appropriate for the area, regardless of whether you or any other creature know those laws.

                            % Sufficiently clear that this isn't part of the hit effect?
                            When you use this ability, you also gain the condition.
                            If this condition is removed from you, it is also removed from all other affected creatures.
                            In areas under ambiguous or nonexistent government, this ability may have unexpected effects, or it may have no effect at all.

                            \rankline
                            You gain a \plus1 bonus to \glossterm{accuracy} with the attack for each rank beyond 4.
                        \end{durationability}
                        % on average, slightly better than +1 accuracy
                        \parhead{Mastery} When you roll less than a 6 on an \glossterm{attack roll}, it is treated as if you had rolled a 6.

                    \subsubsection{Life}
                        \parhead{Gift} You gain a \plus3 bonus to the Medicine skill (see \pcref{Medicine}).
                        \parhead{Aspect} You gain a \plus1 bonus to \glossterm{vital rolls} (see \pcref{Vital Rolls}).
                        \parhead{Essence} At the end of each phase, if you became \unconscious from a \glossterm{vital wound} during that phase, you can use one \glossterm{magical} ability you have that modifies \glossterm{vital rolls} or removes \glossterm{vital wounds} on yourself without taking an action.
                        \parhead{Mastery} You gain a \plus1 bonus to your base Constitution.

                    \subsubsection{Magic}
                        If you choose this domain, you add the \sphere{thaumaturgy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).

                        \parhead{Gift} You gain a \plus4 bonus to the Spellsense skill (see \pcref{Spellsense}).
                        \parhead{Aspect} You learn an additional divine \glossterm{spell} from a \glossterm{mystic sphere} you have access to.
                        \parhead{Essence} You gain a \plus3 bonus to your \glossterm{magical} \glossterm{power}.
                        \parhead{Mastery} The power bonus from this domain's essence increases to \plus6.

                    \subsubsection{Protection}
                        \parhead{Gift} You gain a bonus equal to twice your rank in this archetype to your \glossterm{damage resistance} (see \pcref{Damage Resistance}).
                        \parhead{Aspect} You can use the \textit{divine protection} ability as a \glossterm{minor action}.
                        \begin{durationability}{Divine Protection}
                            \spelltwocol{Duration}{\abilitytag{Swift}}
                            \rankline
                            Choose an \glossterm{ally} adjacent to you.
                            It gains a \plus1 bonus to all defenses until the end of the round.
                            Because this ability has the \abilitytag{Swift} tag, this bonus applies against attacks made in the current phase.

                            A creature that sees an attack against an ally protected in this way can observe that you are the cause of the protection with a \glossterm{difficulty value} 5 Awareness check.
                            While this ability is active, you cannot gain a defense bonus from this ability, even if another creature with this ability uses it on you.
                        \end{durationability}
                        \parhead{Essence} The bonus from this domain's gift increases to three times your rank in this archetype.
                        \parhead{Mastery} The bonus from your \textit{divine protection} ability increases to \plus2.

                    \subsubsection{Strength}
                        If you choose this domain, you add the Climb, Jump, and Swim skills to your cleric \glossterm{class skill} list.

                        \parhead{Gift} You gain an additional \glossterm{trained} skill (see \pcref{Trained Skills}).
                        \parhead{Aspect} You can use the \textit{divine strength} ability as a \glossterm{minor action}.
                        \begin{attuneability}{Divine Strength}
                            \abilitytag{Attune} (self)
                            \rankline
                            You gain a \plus1 bonus to your base Strength.
                        \end{attuneability}
                        \parhead{Essence} You gain a \plus4 bonus to your Strength for the purpose of checks and determining your weight limits (see \pcref{Weight Limits}).
                        \parhead{Mastery} Your \textit{divine strength} ability loses the \glossterm{Attune} (self) tag.
                        Instead, it lasts until you use it again.

                    \subsubsection{Travel}
                        If you choose this domain, you add the \sphere{astromancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).
                        In addition, you add the Knowledge (geography), Survival, and Swim skills to your cleric \glossterm{class skill} list.

                        \parhead{Gift} You gain an additional \glossterm{trained} skill (see \pcref{Trained Skills}).
                        \parhead{Aspect} You gain a \plus5 foot bonus to your speed with all of your \glossterm{movement modes}.
                        \parhead{Essence} You can use the \textit{dimensional travel} ability as a standard action.
                        \begin{instantability}{Dimensional Travel}
                            Instant
                            \rankline
                            You teleport up to 1 mile in any direction.
                            You do not need \glossterm{line of sight} or \glossterm{line of effect} to your destination, but you must be able to clearly visualize it.

                            \rankline
                            \rank{6} The maximum distance increases to 5 miles.
                        \end{instantability}
                        \parhead{Mastery} When you would move using one of your movement speeds, you can teleport the same distance instead.
                        This does not change the total distance you can move, but you can teleport in any direction, including vertically.
                        Being \grappled or otherwise physically constrained does not prevent you from teleporting in this way.

                        You can even attempt to move to locations outside of \glossterm{line of sight} and \glossterm{line of effect}, up to the limit of your remaining movement speed.
                        If your intended destination is invalid, the distance you tried to teleport is taken from your remaining movement, but you suffer no other ill effects.

                    \subsubsection{Trickery}
                        If you choose this domain, you add the Deception, Disguise, and Stealth skills to your cleric \glossterm{class skill} list.

                        \parhead{Gift} You gain an additional \glossterm{trained} skill (see \pcref{Trained Skills}).
                        \parhead{Aspect} You gain a \plus2 bonus to the Deception, Disguise, and Stealth skills.
                        \parhead{Essence} You can use the \textit{compel belief} ability as a standard action.
                        \begin{durationability}{Compel Belief}
                            \spelltwocol{\abilitytag{Sustain} (minor)}{\abilitytag{Compulsion}}
                            \rankline
                            Make an attack vs. Mental against a creature within \rngmed range.
                            You must also choose a belief that the target has.
                            The belief may be a lie that you told it, or even a simple misunderstanding (such as believing a hidden creature is not present in a room).
                            If the creature does not already hold the chosen belief, this ability automatically fails.
                            \hit The subject continues to maintain the chosen belief, regardless of any evidence to the contrary.
                            It will interpret any evidence that the falsehood is incorrect to be somehow wrong -- an illusion, a conspiracy to decieve it, or any other reason it can think of to continue believing the falsehood.
                            At the end of the effect, the creature can decide whether it believes the falsehood or not, as normal.
                            After this effect ends, the subject becomes immune to this effect until it takes a \glossterm{short rest}.

                            \rankline
                            You gain a \plus1 bonus to \glossterm{accuracy} with the attack for each rank beyond 4.
                        \end{durationability}
                        % This seems like it's a complicated muddle of weird and possibly hilarious edge cases
                        \parhead{Mastery} You are undetectable to all \glossterm{magical} abilities.
                        They cannot detect your presence, sounds you make, or any actions you take.
                        For example, a scrying sensor created by a \abilitytag{Scrying} effect would be unable to detect your presence, and a creature with magical \glossterm{darkvision} would not be able to see you without light.

                    \subsubsection{War}
                        \parhead{Gift} You gain proficiency with an additional \glossterm{weapon group} of your choice.
                        In addition, you gain proficiency with an additional \glossterm{usage class} of armor.
                        You must be proficient with light armor to become proficient with medium armor, and you must be proficient with medium armor to become proficient with heavy armor.
                        \parhead{Aspect} You gain a \plus1d bonus to your damage with all weapons.
                        \parhead{Essence} You gain a \plus1 bonus to your Armor defense.
                        \parhead{Mastery} The bonus from this domain's aspect increases to \plus2d.

                    \subsubsection{Water}
                        If you choose this domain, you add the \sphere{aquamancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).
                        In addition, you add the Flexibility and Swim skills to your cleric \glossterm{class skill} list.

                        \parhead{Gift} You gain a \plus2 bonus to the Flexibility and Swim skills.
                        \parhead{Aspect} You can breathe water as easily as a human breathes air, preventing you from drowning or suffocating underwater.
                        \parhead{Essence} You can use the \textit{speak with water} ability as a standard action.
                        \begin{attuneability}{Speak with Water}
                            \abilitytag{Attune} (self)
                            \rankline
                            You can speak with and command water within a \areahuge \glossterm{zone} from your location.
                            You can ask the water simple questions and understand its responses.
                            If you command the water to perform a task, it will do so do the best of its ability until this effect ends.
                            You cannot compel the water to move faster than 30 feet per round.

                            After you use this ability on a particular area of water, you cannot use it again on that same area for 24 hours.

                            \rankline
                            \rank{6} The area increases to a \areagarg radius.
                        \end{attuneability}
                        \parhead{Mastery} Your body becomes partially aquatic, allowing you to manipulate it more easily.
                        The bonuses from this domain's gift increase to \plus10.
                        In addition, you gain a \plus1 bonus to Armor and Reflex defenses.

                    \subsubsection{Wild}
                        If you choose this domain, you add the \sphere{verdamancy} \glossterm{mystic sphere} to your list of divine mystic spheres (see \pcref{Mystic Spheres}).
                        In addition, you add the Creature Handling, Knowledge (nature), and Survival skills to your cleric \glossterm{class skill} list.

                        \parhead{Gift} You gain an additional \glossterm{trained} skill (see \pcref{Trained Skills}).
                        % TODO: clarify whether you can have this and the druid ability
                        \parhead{Aspect} This ability functions like the \textit{wild aspect} druid ability from the Shifter archetype (see \pcref{Shifter}), except that you cannot spend \glossterm{insight points} to learn additional wild aspects.
                        \parhead{Essence} You learn an additional \textit{wild aspect}.
                        \parhead{Mastery} You can maintain both of your wild aspects simultaneously.

                \subsection{Ex-Clerics}
                    If you grossly violate the code of conduct required by your deity, you lose all spells and magical cleric class abilities.
                    You cannot regain those abilities until you atone for your transgressions to your deity.
            "
            }
            Self::Druid => {
                r"
                \subsection{Ex-Druids}
                    A druid who ceases to revere nature or who changes to a prohibited alignment loses all \glossterm{magical} druid class abilities.
                    They cannot thereafter gain levels as a druid until they atone for their transgressions.
            "
            }
            Self::Paladin => {
                r"
                \subsection{Ex-Paladins}
                    If you cease to follow your devoted alignment, you lose all \glossterm{magical} paladin class abilities.
                    If your atone for your misdeeds and resume the service of your devoted alignment, you can regain your abilities.
            "
            }
            _ => "",
        }
    }
}
