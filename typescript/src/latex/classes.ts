import { ClassArchetype } from '@src/classes/types';
import { latexArchetypeDescription } from '@src/classes/metadata';

export function generateArchetypeDescriptions(): string {
  const archetypes: ClassArchetype[] = [
    // Barbarian
    'BattleforgedResilience',
    'Battlerager',
    'OutlandSavage',
    'PrimalWarrior',
    'Totemist',
    // Cleric
    'ClericDivineMagic',
    'DivineSpellMastery',
    'DomainInfluence',
    'Healer',
    'Preacher',
    // Druid
    'Elementalist',
    'NatureMagic',
    'NatureSpellMastery',
    'Shifter',
    'Wildspeaker',
    // Fighter
    'CombatDiscipline',
    'EquipmentTraining',
    'MartialMastery',
    'Sentinel',
    'Tactician',
    // Monk
    'Airdancer',
    'EsotericWarrior',
    'Ki',
    'PerfectedForm',
    'TranscendentSage',
    // Paladin
    'DevotedParagon',
    'PaladinDivineMagic',
    'DivineSpellExpertise',
    'StalwartGuardian',
    'ZealousWarrior',
    // Ranger
    'Beastmaster',
    'BoundaryWarden',
    'Huntmaster',
    'Scout',
    'WildernessWarrior',
    // Rogue
    'Assassin',
    'BardicMusic',
    'CombatTrickster',
    'JackOfAllTrades',
    'SuaveScoundrel',
    // Sorcerer
    'SorcererArcaneMagic',
    'SorcererArcaneSpellMastery',
    'DraconicMagic',
    'InnateArcanist',
    'WildMagic',
    // Votive
    'CovenantKeeper',
    'PactMagic',
    'PactSpellMastery',
    'PactboundWarrior',
    'Soulforged',
    // Wizard
    'WizardArcaneMagic',
    'WizardArcaneSpellMastery',
    'Alchemist',
    'ArcaneScholar',
    'SchoolSpecialist',
    // Uncommon species
    'Automaton',
    'Dragon',
    'Dryad',
    'Harpy',
    'Incarnation',
    'Naiad',
    'Oozeborn',
    'Treant',
    'Troll',
    'Vampire',
  ];

  return archetypes.map(latexArchetypeDescription).join('\n\\newpage\n');
}
