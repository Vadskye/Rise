use crate::classes::ClassArchetype;
use crate::creatures::Modifier;
use titlecase::titlecase;

mod barbarian;
mod cleric;
mod druid;
mod fighter;
mod monk;
mod paladin;
mod ranger;
mod rogue;
mod sorcerer;
mod standard_modifiers;
mod warlock;
mod wizard;

pub struct RankAbility<'a> {
    pub description: &'a str,
    pub is_magical: bool,
    pub modifiers: Option<Vec<Modifier>>,
    pub rank: i32,
    pub name: &'a str,
}

// LaTeX
impl RankAbility<'_> {
    pub fn latex_class_feature(&self, class_shorthand: &str, include_magical_tag: bool) -> String {
        return format!(
            "
                \\cf<{class_shorthand}>[{rank}]<{ability_name}>{magical}
                {ability_description}
            ",
            ability_description = self.description,
            ability_name = titlecase(self.name),
            class_shorthand = class_shorthand,
            magical = if self.is_magical && include_magical_tag {
                "[\\sparkle]"
            } else {
                ""
            },
            rank = self.rank,
        );
    }
}

pub fn archetype_rank_abilities(archetype: &ClassArchetype) -> Vec<RankAbility> {
    match archetype {
        // Barbarian
        ClassArchetype::BattleforgedResilience => barbarian::battleforged_resilience(),
        ClassArchetype::Battlerager => barbarian::battlerager(),
        ClassArchetype::OutlandSavage => barbarian::outland_savage(),
        ClassArchetype::PrimalWarrior => barbarian::primal_warrior(),
        ClassArchetype::Totemist => barbarian::totemist(),
        // Cleric
        ClassArchetype::ClericDivineMagic => cleric::divine_magic(),
        ClassArchetype::DivineSpellMastery => cleric::divine_spell_mastery(),
        ClassArchetype::DomainInfluence => cleric::domain_influence(),
        ClassArchetype::Healer => cleric::healer(),
        ClassArchetype::Preacher => cleric::preacher(),
        // Druid
        ClassArchetype::Elementalist => druid::elementalist(),
        ClassArchetype::NatureMagic => druid::nature_magic(),
        ClassArchetype::NatureSpellMastery => druid::nature_spell_mastery(),
        ClassArchetype::Shifter => druid::shifter(),
        ClassArchetype::Wildspeaker => druid::wildspeaker(),
        // Fighter
        ClassArchetype::CombatDiscipline => fighter::combat_discipline(),
        ClassArchetype::EquipmentTraining => fighter::equipment_training(),
        ClassArchetype::MartialMastery => fighter::martial_mastery(),
        ClassArchetype::Sentinel => fighter::sentinel(),
        ClassArchetype::Tactician => fighter::tactician(),
        // Monk
        ClassArchetype::Airdancer => monk::airdancer(),
        ClassArchetype::EsotericWarrior => monk::esoteric_warrior(),
        ClassArchetype::Ki => monk::ki(),
        ClassArchetype::PerfectedForm => monk::perfected_form(),
        ClassArchetype::TranscendentSage => monk::transcendent_sage(),
        // Paladin
        ClassArchetype::DevotedParagon => paladin::devoted_paragon(),
        ClassArchetype::PaladinDivineMagic => paladin::divine_magic(),
        ClassArchetype::DivineSpellExpertise => paladin::divine_spell_expertise(),
        ClassArchetype::StalwartGuardian => paladin::stalwart_guardian(),
        ClassArchetype::ZealousWarrior => paladin::zealous_warrior(),
        // Ranger
        ClassArchetype::Beastmaster => ranger::beastmaster(),
        ClassArchetype::BoundaryWarden => ranger::boundary_warden(),
        ClassArchetype::Huntmaster => ranger::huntmaster(),
        ClassArchetype::Scout => ranger::scout(),
        ClassArchetype::WildernessWarrior => ranger::wilderness_warrior(),
        // Rogue
        ClassArchetype::Assassin => rogue::assassin(),
        ClassArchetype::BardicMusic => rogue::bardic_music(),
        ClassArchetype::CombatTrickster => rogue::combat_trickster(),
        ClassArchetype::JackOfAllTrades => rogue::jack_of_all_trades(),
        ClassArchetype::SuaveScoundrel => rogue::suave_scoundrel(),
        // Sorcerer
        ClassArchetype::SorcererArcaneMagic => sorcerer::arcane_magic(),
        ClassArchetype::SorcererArcaneSpellMastery => sorcerer::arcane_spell_mastery(),
        ClassArchetype::DraconicMagic => sorcerer::draconic_magic(),
        ClassArchetype::InnateArcanist => sorcerer::innate_arcanist(),
        ClassArchetype::WildMagic => sorcerer::wild_magic(),
        // Warlock
        ClassArchetype::BlessingsOfTheAbyss => warlock::blessings_of_the_abyss(),
        ClassArchetype::KeeperOfForbiddenKnowledge => warlock::keeper_of_forbidden_knowledge(),
        ClassArchetype::PactMagic => warlock::pact_magic(),
        ClassArchetype::PactSpellMastery => warlock::pact_spell_mastery(),
        ClassArchetype::SoulkeepersChosen => warlock::soulkeepers_chosen(),
        // Wizard
        ClassArchetype::Alchemist => wizard::alchemist(),
        ClassArchetype::WizardArcaneMagic => wizard::arcane_magic(),
        ClassArchetype::WizardArcaneSpellMastery => wizard::arcane_spell_mastery(),
        ClassArchetype::ArcaneScholar => wizard::arcane_scholar(),
        ClassArchetype::SchoolSpecialist => wizard::school_specialist(),
    }
}

pub fn calc_rank_abilities<'a>(
    level: i32,
    archetypes: &'a [ClassArchetype; 3],
) -> Vec<RankAbility<'a>> {
    let mut rank_abilities: Vec<RankAbility> = vec![];
    for i in 0..level {
        rank_abilities.append(
            archetypes[(i % 3) as usize]
                .abilities_at_rank((i / 3) + 1)
                .as_mut(),
        );
    }
    return rank_abilities;
}
