import { combatStyles } from '@src/abilities/combat_styles';
import {
  convertCombatStyleToLatex,
  convertMysticSphereToLatex,
  generateCombatStyleLists,
  generateCombatStyleSummaries,
  generateMonsterDescriptions,
  generateMysticSphereLists,
  generateMysticSphereRitualSummaries,
  generateMysticSphereSpellSummaries,
  generateRitualDescriptions,
} from '@src/latex';
import { generateArchetypeDescriptions, generateClassesChapter } from '@src/latex/classes';
import { mysticSpheres } from '@src/abilities/mystic_spheres';
import {
  generateMagicArmorDescriptions,
  generateMagicArmorTables,
  generateMagicWeaponsDescriptions,
  generateMagicWeaponsTables,
  generateImplementsDescriptions,
  generateImplementsTables,
  generateApparelDescriptions,
  generateApparelTables,
  generateConsumableToolsDescriptions,
  generateConsumableToolsTables,
  generatePermanentToolsDescriptions,
  generatePermanentToolsTables,
  generateRelicDescriptions,
  generateRelicsTable,
  generateEverythingTable,
} from '@src/equipment/latex';
import { getAllModules, moduleToLatex } from '@src/modules';
import cli from 'commander';
import fs from 'fs';

function generateLatex(latexType: string): string {
  let latex = '';
  if (latexType === 'monster_descriptions') {
    latex = generateMonsterDescriptions();
  } else if (latexType === 'mystic_sphere_lists') {
    latex = generateMysticSphereLists();
  } else if (latexType === 'mystic_sphere_spell_summaries') {
    latex = generateMysticSphereSpellSummaries();
  } else if (latexType === 'mystic_sphere_ritual_summaries') {
    latex = generateMysticSphereRitualSummaries();
  } else if (latexType === 'mystic_sphere_descriptions') {
    latex = mysticSpheres.map(convertMysticSphereToLatex).join('\n\\newpage\n');
  } else if (latexType === 'ritual_descriptions') {
    latex = generateRitualDescriptions();
  } else if (latexType === 'archetype_descriptions') {
    latex = generateArchetypeDescriptions();
  } else if (latexType === 'classes_chapter') {
    latex = generateClassesChapter();
  } else if (latexType === 'combat_style_lists') {
    latex = generateCombatStyleLists();
  } else if (latexType === 'combat_style_summaries') {
    latex = generateCombatStyleSummaries();
  } else if (latexType === 'combat_style_descriptions') {
    latex = combatStyles.map(convertCombatStyleToLatex).join('\n\\newpage\n');
  } else if (latexType === 'equipment_magic_armor_descriptions') {
    latex = generateMagicArmorDescriptions();
  } else if (latexType === 'equipment_magic_armor_tables') {
    latex = generateMagicArmorTables();
  } else if (latexType === 'equipment_magic_weapons_descriptions') {
    latex = generateMagicWeaponsDescriptions();
  } else if (latexType === 'equipment_magic_weapons_tables') {
    latex = generateMagicWeaponsTables();
  } else if (latexType === 'equipment_implements_descriptions') {
    latex = generateImplementsDescriptions();
  } else if (latexType === 'equipment_implements_tables') {
    latex = generateImplementsTables();
  } else if (latexType === 'equipment_apparel_descriptions') {
    latex = generateApparelDescriptions();
  } else if (latexType === 'equipment_apparel_tables') {
    latex = generateApparelTables();
  } else if (latexType === 'equipment_consumable_tools_descriptions') {
    latex = generateConsumableToolsDescriptions();
  } else if (latexType === 'equipment_consumable_tools_tables') {
    latex = generateConsumableToolsTables();
  } else if (latexType === 'equipment_permanent_tools_descriptions') {
    latex = generatePermanentToolsDescriptions();
  } else if (latexType === 'equipment_permanent_tools_tables') {
    latex = generatePermanentToolsTables();
  } else if (latexType === 'equipment_relic_descriptions') {
    latex = generateRelicDescriptions();
  } else if (latexType === 'equipment_relic_tables') {
    latex = generateRelicsTable();
  } else if (latexType === 'equipment_everything_table') {
    latex = generateEverythingTable();
  } else if (latexType === 'modules') {
    latex = getAllModules()
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(moduleToLatex)
      .join('\n');
  } else {
    throw new Error(`Unrecognized latexType: '${latexType}'`);
  }
  return latex;
}

function main(latexType: string, outputFilename?: string) {
  const latex = generateLatex(latexType);
  if (outputFilename) {
    fs.writeFileSync(outputFilename, latex);
  } else {
    console.log(latex);
  }
}

if (require.main === module) {
  cli.option('-o, --output <outputFilename>').option('-t, --type <latexType>').parse(process.argv);
  if (!cli.type) {
    throw new Error('Must provide --type');
  }
  main(cli.type, cli.output);
}
