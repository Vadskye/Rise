import { Class, ClassArchetype } from '@src/classes/types';
import {
  getClassName,
  getClassAlignment,
  getCoreClasses,
  validateClassPoints,
  getClassNarrativeText,
} from '@src/classes/metadata';
import {
  getClassSpecialAbilities,
  getClassSuffix,
  latexBasicClassAbilities,
} from '@src/classes/base_class_abilities';
import {
  getArchetypesForClass,
  getArchetypeName,
  latexArchetypeTable,
  latexArchetypeDescription,
} from '@src/classes/archetypes';
import { titleCase } from '@src/latex/format/title_case';
import { joinStringList } from '@src/latex/format/join_string_list';
import { latexify } from '@src/latex/format/latexify';

export { validateClassPoints, latexify, latexArchetypeDescription };

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

export function generateClassesChapter(): string {
  return getCoreClasses().map(latexClassSection).join('\n');
}

export function latexClassSection(cls: Class): string {
  const archetypes = getArchetypesForClass(cls);
  const archetypeNames = joinStringList(archetypes.map(getArchetypeName));
  const classNameTitle = titleCase(getClassName(cls));

  return latexify(`
        \\newpage
        \\section{${classNameTitle}}\\label{${classNameTitle}}

        \\includegraphics[width=\\columnwidth]{classes/${getClassName(cls).toLowerCase()}}

        ${latexArchetypeTable(cls)}

        ${getClassNarrativeText(cls)}

        \\classbasics{Alignment} ${getClassAlignment(cls)}.

        \\classbasics{Archetypes} ${classNameTitle}s have the ${archetypeNames} archetypes.

        ${latexBasicClassAbilities(cls)}

        ${getClassSpecialAbilities(cls)}

        ${archetypes.map(latexArchetypeDescription).join('\n\n')}

        ${getClassSuffix(cls)}
    `);
}
