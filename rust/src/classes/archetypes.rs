use crate::classes::{archetype_rank_abilities, Class, RankAbility};
use titlecase::titlecase;

pub enum ClassArchetype {
    Blank, // For testing purposes
    // Barbarian
    BattleforgedResilience,
    Battlerager,
    OutlandSavage,
    PrimalWarrior,
    Totemist,
    // Cleric
    ClericDivineMagic,
    DivineSpellMastery,
    DomainInfluence,
    Healer,
    Preacher,
    // Druid
    Elementalist,
    NatureMagic,
    NatureSpellMastery,
    Shifter,
    Wildspeaker,
    // Fighter
    CombatDiscipline,
    EquipmentTraining,
    MartialMastery,
    Sentinel,
    Tactician,
    // Monk
    Airdancer,
    EsotericWarrior,
    Ki,
    PerfectedForm,
    TranscendentSage,
    // Paladin
    DevotedParagon,
    PaladinDivineMagic,
    DivineSpellExpertise,
    StalwartGuardian,
    ZealousWarrior,
    // Ranger
    Beastmaster,
    BoundaryWarden,
    Huntmaster,
    Scout,
    WildernessWarrior,
    // Rogue
    Assassin,
    BardicMusic,
    CombatTrickster,
    JackOfAllTrades,
    SuaveScoundrel,
    // Sorcerer
    SorcererArcaneMagic,
    SorcererArcaneSpellMastery,
    DraconicMagic,
    InnateArcanist,
    WildMagic,
    // Warlock
    BlessingsOfTheAbyss,
    KeeperOfForbiddenKnowledge,
    PactMagic,
    PactSpellMastery,
    SoulkeepersChosen,
    // Wizard
    WizardArcaneMagic,
    WizardArcaneSpellMastery,
    Alchemist,
    ArcaneScholar,
    SchoolSpecialist,
    // Uncommon species
    Automaton,
}

impl ClassArchetype {
    pub fn class(&self) -> Class {
        match self {
            Self::Blank => Class::Fighter,
            // Barbarian
            Self::BattleforgedResilience => Class::Barbarian,
            Self::Battlerager => Class::Barbarian,
            Self::OutlandSavage => Class::Barbarian,
            Self::PrimalWarrior => Class::Barbarian,
            Self::Totemist => Class::Barbarian,
            // Cleric
            Self::ClericDivineMagic => Class::Cleric,
            Self::DivineSpellMastery => Class::Cleric,
            Self::DomainInfluence => Class::Cleric,
            Self::Healer => Class::Cleric,
            Self::Preacher => Class::Cleric,
            // Druid
            Self::Elementalist => Class::Druid,
            Self::NatureMagic => Class::Druid,
            Self::NatureSpellMastery => Class::Druid,
            Self::Shifter => Class::Druid,
            Self::Wildspeaker => Class::Druid,
            // Fighter
            Self::CombatDiscipline => Class::Fighter,
            Self::EquipmentTraining => Class::Fighter,
            Self::MartialMastery => Class::Fighter,
            Self::Sentinel => Class::Fighter,
            Self::Tactician => Class::Fighter,
            // Monk
            Self::Airdancer => Class::Monk,
            Self::EsotericWarrior => Class::Monk,
            Self::Ki => Class::Monk,
            Self::PerfectedForm => Class::Monk,
            Self::TranscendentSage => Class::Monk,
            // Paladin
            Self::DevotedParagon => Class::Paladin,
            Self::PaladinDivineMagic => Class::Paladin,
            Self::DivineSpellExpertise => Class::Paladin,
            Self::StalwartGuardian => Class::Paladin,
            Self::ZealousWarrior => Class::Paladin,
            // Ranger
            Self::Beastmaster => Class::Ranger,
            Self::BoundaryWarden => Class::Ranger,
            Self::Huntmaster => Class::Ranger,
            Self::Scout => Class::Ranger,
            Self::WildernessWarrior => Class::Ranger,
            // Rogue
            Self::Assassin => Class::Rogue,
            Self::BardicMusic => Class::Rogue,
            Self::CombatTrickster => Class::Rogue,
            Self::JackOfAllTrades => Class::Rogue,
            Self::SuaveScoundrel => Class::Rogue,
            // Sorcerer
            Self::SorcererArcaneMagic => Class::Sorcerer,
            Self::SorcererArcaneSpellMastery => Class::Sorcerer,
            Self::DraconicMagic => Class::Sorcerer,
            Self::InnateArcanist => Class::Sorcerer,
            Self::WildMagic => Class::Sorcerer,
            // Warlock
            Self::BlessingsOfTheAbyss => Class::Warlock,
            Self::KeeperOfForbiddenKnowledge => Class::Warlock,
            Self::PactMagic => Class::Warlock,
            Self::PactSpellMastery => Class::Warlock,
            Self::SoulkeepersChosen => Class::Warlock,
            // Wizard
            Self::Alchemist => Class::Wizard,
            Self::WizardArcaneMagic => Class::Wizard,
            Self::WizardArcaneSpellMastery => Class::Wizard,
            Self::ArcaneScholar => Class::Wizard,
            Self::SchoolSpecialist => Class::Wizard,
            // Uncommon species
            Self::Automaton => Class::Automaton,
        }
    }

    pub fn name(&self) -> &str {
        match self {
            Self::Blank => "Blank",
            // Barbarian
            Self::BattleforgedResilience => "Battleforged Resilience",
            Self::Battlerager => "Battlerager",
            Self::OutlandSavage => "Outland Savage",
            Self::PrimalWarrior => "Primal Warrior",
            Self::Totemist => "Totemist",
            // Cleric
            Self::ClericDivineMagic => "Divine Magic",
            Self::DivineSpellMastery => "Divine Spell Mastery",
            Self::DomainInfluence => "Domain Influence",
            Self::Healer => "Healer",
            Self::Preacher => "Preacher",
            // Druid
            Self::Elementalist => "Elementalist",
            Self::NatureMagic => "Nature Magic",
            Self::NatureSpellMastery => "Nature Spell Mastery",
            Self::Shifter => "Shifter",
            Self::Wildspeaker => "Wildspeaker",
            // Fighter
            Self::CombatDiscipline => "Combat Discipline",
            Self::EquipmentTraining => "Equipment Training",
            Self::MartialMastery => "Martial Mastery",
            Self::Sentinel => "Sentinel",
            Self::Tactician => "Tactician",
            // Monk
            Self::Airdancer => "Airdancer",
            Self::EsotericWarrior => "Esoteric Warrior",
            Self::Ki => "Ki",
            Self::PerfectedForm => "Perfected Form",
            Self::TranscendentSage => "Transcendent Sage",
            // Paladin
            Self::DevotedParagon => "Devoted Paragon",
            Self::PaladinDivineMagic => "Divine Magic",
            Self::DivineSpellExpertise => "Divine Spell Expertise",
            Self::StalwartGuardian => "Stalwart Guardian",
            Self::ZealousWarrior => "Zealous Warrior",
            // Ranger
            Self::Beastmaster => "Beastmaster",
            Self::BoundaryWarden => "Boundary Warden",
            Self::Huntmaster => "Huntmaster",
            Self::Scout => "Scout",
            Self::WildernessWarrior => "Wilderness Warrior",
            // Rogue
            Self::Assassin => "Assassin",
            Self::BardicMusic => "Bardic Music",
            Self::CombatTrickster => "Combat Trickster",
            Self::JackOfAllTrades => "Jack of All Trades",
            Self::SuaveScoundrel => "Suave Scoundrel",
            // Sorcerer
            Self::SorcererArcaneMagic => "Arcane Magic",
            Self::SorcererArcaneSpellMastery => "Arcane Spell Mastery",
            Self::DraconicMagic => "Draconic Magic",
            Self::InnateArcanist => "Innate Arcanist",
            Self::WildMagic => "Wild Magic",
            // Warlock
            Self::BlessingsOfTheAbyss => "Blessings of the Abyss",
            Self::KeeperOfForbiddenKnowledge => "Keeper of Forbidden Knowledge",
            Self::PactMagic => "Pact Magic",
            Self::PactSpellMastery => "Pact Spell Mastery",
            Self::SoulkeepersChosen => "Soulkeeper's Chosen",
            // Wizard
            Self::Alchemist => "Alchemist",
            Self::WizardArcaneMagic => "Arcane Magic",
            Self::WizardArcaneSpellMastery => "Arcane Spell Mastery",
            Self::ArcaneScholar => "Arcane Scholar",
            Self::SchoolSpecialist => "School Specialist",
            // Uncommon species
            Self::Automaton => "Automaton",
        }
    }

    pub fn complexity_at_rank(&self, rank: i32) -> i32 {
        let abilities = self.abilities_at_rank(rank);
        let mut complexity = 0;
        for ability in abilities {
            complexity += ability.complexity;
        }

        complexity
    }

    pub fn complexity_by_rank(&self, max_rank: i32) -> i32 {
        let mut complexity = 0;
        for rank in 1..(max_rank+1) {
            complexity += self.complexity_at_rank(rank);
        }

        complexity
    }

    pub fn abilities_at_rank(&self, rank: i32) -> Vec<RankAbility> {
        return archetype_rank_abilities(self)
            .into_iter()
            .filter(|a| a.rank == rank)
            .collect();
    }

    // Rank abilities with description == "" should be invisible, and are only used for
    // calculating modifier values.
    pub fn visible_abilities_at_rank(&self, rank: i32) -> Vec<RankAbility> {
        return self
            .abilities_at_rank(rank)
            .into_iter()
            .filter(|a| a.description.trim() != "" || a.name.contains('+'))
            .collect();
    }

    pub fn is_magical(&self) -> bool {
        return archetype_rank_abilities(self).iter().all(|a| a.is_magical);
    }

    pub fn short_description(&self) -> String {
        let description = match self {
            Self::Blank => "For testing purposes",
            // Barbarian
            Self::BattleforgedResilience => "This archetype improves your durability in combat.",
            Self::Battlerager => "This archetype grants you a devastating rage, improving your combat prowess.",
            Self::OutlandSavage => "This archetype improves your mobility and combat prowess with direct, brutal abilities.",
            Self::PrimalWarrior => "This archetype grants you abilities to use in combat and improves your physical skills.",
            Self::Totemist => "This archetype allows you to embody the spirits of apex predators to improve your combat ability.",
            // Cleric
            Self::ClericDivineMagic => "
                This archetype grants you the ability to cast divine spells.
            ",
            Self::DivineSpellMastery => "
                This archetype improves the divine spells you cast.
                You must have the Divine Magic archetype from the cleric class to gain the abilities from this archetype.
            ",
            Self::DomainInfluence => "
                This archetype grants you divine influence over two domains of your choice.
            ",
            Self::Healer => "This archetype grants you healing abilities.",
            Self::Preacher => "This archetype grants you the ability to inspire your allies and denounce or even convert your foes.",
            // Druid
            Self::Elementalist => r"
                This archetype grants you influence over four elements that define the natural world: air, earth, fire, and water.
            ",
            Self::NatureMagic => r"
                This archetype grants you the ability to cast nature spells.
            ",
            Self::NatureSpellMastery => r"
                This archetype improves the nature spells you cast.
                You must have the Nature Magic archetype from the cleric class to gain the abilities from this archetype.
            ",
            Self::Shifter => r"
                This archetype grants you the ability to embody aspects of the natural world in your own form.
            ",
            Self::Wildspeaker => r"
                This archetypes deepens your connection to animals and plants, and allows you to call animals to aid you in combat.
            ",
            // Fighter
            Self::CombatDiscipline => r"
                This archetype allows you to improve your defenses and resist conditions.
            ",
            Self::EquipmentTraining => r"
                This archetype improves your combat prowess with weapons and armor.
            ",
            Self::MartialMastery => r"
                This archetype grants you special abilities to use in combat.
            ",
            Self::Sentinel => r"
                This archetype improves your ability to protect your allies in combat and control the battlefield.
            ",
            Self::Tactician => r"
                This archetype helps you lead your allies in combat with tactical abilities that allow you to adapt to different circumstances.
            ",
            // Monk
            Self::Airdancer => r"
                This archetype improves your acrobatic ability and mobility in combat.
            ",
            Self::EsotericWarrior => r"
                This archetype improves your combat prowess with unusual abilities you can use in combat.
            ",
            Self::Ki => r"
                This archtype grants you unusual abilities based on tapping into your inner ki.
                If you have any \glossterm{encumbrance}, you lose the benefit of all abilities from this archetype.
            ",
            Self::PerfectedForm => r"
                This archetype improves the perfection of your physical body through rigorous training.
            ",
            Self::TranscendentSage => r"
                This archetype grants you abilities to ignore debilitating effects and sense life energy.
            ",
            // Paladin
            Self::DevotedParagon => r"
                This archetype deepens your connection to your alignment, granting you an aura and improving your combat abilities.
            ",
            Self::PaladinDivineMagic => r"
                This archetype grants you the ability to cast divine spells.
            ",
            Self::DivineSpellExpertise => r"
                This archetype improves the divine spells you cast.
                You must have the Divine Magic archetype from the paladin class to gain the abilities from this archetype.
            ",
            Self::StalwartGuardian => r"
                This archetype grants you healing abilities and improves your defensive prowess.
            ",
            Self::ZealousWarrior => r"
                This archetype improves your combat prowess, especially against foes who do not share your devoted alignment.
            ",
            // Ranger
            Self::Beastmaster => r"
                This archetype improves your connection to animals, allowing you to control and command them in battle.
            ",
            Self::BoundaryWarden => r"
                This archetype improves your ability to guard the boundaries between civilization and nature.
            ",
            Self::Huntmaster => r"
                This archetype grants you and your allies abilities to hunt down specific foes.
            ",
            Self::Scout => r"
                This archetype improves your senses and overall scouting ability.
            ",
            Self::WildernessWarrior => r"
                This archetype grants you abilities to use in combat and improves your physical skills.
            ",
            // Rogue
            Self::Assassin => r"
                This archetype improves your agility, stealth, and combat prowess against unaware targets.
            ",
            Self::BardicMusic => r"
                This archetype grants you the ability to inspire your allies and impair your foes with musical performances.
            ",
            Self::CombatTrickster => r"
                This archetype grants you abilities to use in combat and improves your combat prowess.
            ",
            Self::JackOfAllTrades => r"
                This archetype improves your skills and versatility.
            ",
            Self::SuaveScoundrel => r"
                This archetype improves your deceptiveness and helps you make use of that talent in combat.
            ",
            // Sorcerer
            Self::SorcererArcaneMagic => r"
                This archetype grants you the ability to cast arcane spells.
            ",
            Self::SorcererArcaneSpellMastery => r"
                This archetype improves the arcane spells you cast.
                You must have the Arcane Magic archetype from the sorcerer class to gain the abilities from this archetype.
            ",
            Self::DraconicMagic => r"
                Not all sorcerers know the reason for their innate connection to magic.
                Some discover that they have draconic blood in their veins, and some of those sorcerers learn how to tap into their heritage.
                This archetype deepens your magical connection to your draconic ancestor and enhances your spellcasting.
                You must have the Arcane Magic archetype from the sorcerer class to gain the abilities from this archetype.
            ",
            Self::InnateArcanist => r"
                This archetype deepens your innate connection to arcane magic and improves your ability to defeat other spellcasters.
                You must have the Arcane Magic archetype from the sorcerer class to gain the abilities from this archetype.
            ",
            Self::WildMagic => r"
                This archetype makes the magic you cast more chaotic, generally increasing its power at the cost of your control over your magic.
                You must have the Arcane Magic archetype from the sorcerer class to gain the abilities from this archetype.
            ",
            // Warlock
            Self::BlessingsOfTheAbyss => r"
                You can only choose this archetype if your soulkeeper is a demon.
                This archetype enhances your connection to the Abyss and allows you to channel its sinister power more directly.
            ",
            Self::KeeperOfForbiddenKnowledge => r"
                This archetype grants you access to dangerous secrets revealed to you by your soulkeeper.
            ",
            Self::PactMagic => r"
                This archetype grants you the ability to cast pact spells.
            ",
            Self::PactSpellMastery => r"
                This archetype improves your ability to cast spells with the power of your dark pact.
                You must have the Pact Magic archetype to gain the abilities from this archetype.
            ",
            Self::SoulkeepersChosen => r"
                This archetype enhances your connection to your soulkeeper, granting you abilities relating to your pact.
            ",
            // Wizard
            Self::Alchemist => r"
                This archetype improves your ability to use alchemy to create unusual concoctions to aid your allies and harm your foes.
            ",
            Self::WizardArcaneMagic => r"
                This archetype grants you the ability to cast arcane spells.
            ",
            Self::ArcaneScholar => r"
                This archetype deepens your study of arcane magic.
                You have the Arcane Magic archetype from the wizard class to gain the abilities from this archetype.
            ",
            Self::WizardArcaneSpellMastery => r"
                This archetype improves the arcane spells you cast.
                You must have the Arcane Magic archetype from the wizard class to gain the abilities from this archetype.
            ",
            Self::SchoolSpecialist => r"
                This archetype improves your ability to cast spells from a particular school of magic while sacrificing some versatility.
                You have the Arcane Magic archetype from the wizard class to gain the abilities from this archetype.
            ",
            // Uncommon species
            Self::Automaton => "",
        };
        format!(
            "{} {}",
            description,
            if self.is_magical() {
                "All abilities from this archetype are \\magical."
            } else {
                ""
            }
        )
    }
}

// LaTeX generation
impl ClassArchetype {
    pub fn latex_description(&self, class_shorthand: &str) -> String {
        let mut rank_ability_descriptions = archetype_rank_abilities(self)
            .iter()
            .filter(|a| a.description.trim() != "")
            .map(|a| {
                a.latex_class_feature(class_shorthand)
                    .trim()
                    .to_string()
            })
            .collect::<Vec<String>>();
        rank_ability_descriptions.sort();
        format!(
            "
                \\archetypedef{magical_sparkle}<{class_shorthand}><{archetype_name}>
                {short_description}

                {rank_abilities}
            ",
            archetype_name = titlecase(self.name()),
            class_shorthand = class_shorthand,
            magical_sparkle = if self.is_magical() { "*" } else { "" },
            rank_abilities = rank_ability_descriptions.join("\n\n"),
            short_description = self.short_description(),
        )
    }

    pub fn all() -> Vec<Self> {
        vec![
            // Barbarian
            ClassArchetype::BattleforgedResilience,
            ClassArchetype::Battlerager,
            ClassArchetype::OutlandSavage,
            ClassArchetype::PrimalWarrior,
            ClassArchetype::Totemist,
            // Cleric
            ClassArchetype::ClericDivineMagic,
            ClassArchetype::DivineSpellMastery,
            ClassArchetype::DomainInfluence,
            ClassArchetype::Healer,
            ClassArchetype::Preacher,
            // Druid
            ClassArchetype::Elementalist,
            ClassArchetype::NatureMagic,
            ClassArchetype::NatureSpellMastery,
            ClassArchetype::Shifter,
            ClassArchetype::Wildspeaker,
            // Fighter
            ClassArchetype::CombatDiscipline,
            ClassArchetype::EquipmentTraining,
            ClassArchetype::MartialMastery,
            ClassArchetype::Sentinel,
            ClassArchetype::Tactician,
            // Monk
            ClassArchetype::Airdancer,
            ClassArchetype::EsotericWarrior,
            ClassArchetype::Ki,
            ClassArchetype::PerfectedForm,
            ClassArchetype::TranscendentSage,
            // Paladin
            ClassArchetype::DevotedParagon,
            ClassArchetype::PaladinDivineMagic,
            ClassArchetype::DivineSpellExpertise,
            ClassArchetype::StalwartGuardian,
            ClassArchetype::ZealousWarrior,
            // Ranger
            ClassArchetype::Beastmaster,
            ClassArchetype::BoundaryWarden,
            ClassArchetype::Huntmaster,
            ClassArchetype::Scout,
            ClassArchetype::WildernessWarrior,
            // Rogue
            ClassArchetype::Assassin,
            ClassArchetype::BardicMusic,
            ClassArchetype::CombatTrickster,
            ClassArchetype::JackOfAllTrades,
            ClassArchetype::SuaveScoundrel,
            // Sorcerer
            ClassArchetype::SorcererArcaneMagic,
            ClassArchetype::SorcererArcaneSpellMastery,
            ClassArchetype::DraconicMagic,
            ClassArchetype::InnateArcanist,
            ClassArchetype::WildMagic,
            // Warlock
            ClassArchetype::BlessingsOfTheAbyss,
            ClassArchetype::KeeperOfForbiddenKnowledge,
            ClassArchetype::PactMagic,
            ClassArchetype::PactSpellMastery,
            ClassArchetype::SoulkeepersChosen,
            // Wizard
            ClassArchetype::WizardArcaneMagic,
            ClassArchetype::WizardArcaneSpellMastery,
            ClassArchetype::Alchemist,
            ClassArchetype::ArcaneScholar,
            ClassArchetype::SchoolSpecialist,
        ]
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_calculates_abilities_at_rank() {
        assert_eq!(
            vec!["Exotic Weapon Training", "Weapon Training"],
            ClassArchetype::EquipmentTraining
                .abilities_at_rank(1)
                .iter()
                .map(|a| a.name)
                .collect::<Vec<&str>>(),
            "Should have expected ability from rank 1 equipment training",
        );

        assert_eq!(
            vec!["Augmented Maneuvers"],
            ClassArchetype::MartialMastery
                .abilities_at_rank(2)
                .iter()
                .map(|a| a.name)
                .collect::<Vec<&str>>(),
            "Should have expected abilities from rank 2 martial mastery",
        );
    }
}
