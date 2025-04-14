import { combatStyles } from "@src/combat_styles";
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
} from "@src/latex";
import { mysticSpheres } from "@src/mystic_spheres";
import cli from "commander";
import fs from "fs";

function generateLatex(latexType: string): string {
  let latex = "";
  if (latexType === "monster_descriptions") {
    latex = generateMonsterDescriptions();
  } else if (latexType === "mystic_sphere_lists") {
    latex = generateMysticSphereLists();
  } else if (latexType === "mystic_sphere_spell_summaries") {
    latex = generateMysticSphereSpellSummaries();
  } else if (latexType === "mystic_sphere_ritual_summaries") {
    latex = generateMysticSphereRitualSummaries();
  } else if (latexType === "mystic_sphere_descriptions") {
    latex = mysticSpheres.map(convertMysticSphereToLatex).join("\n\\newpage\n");
  } else if (latexType === "ritual_descriptions") {
    latex = generateRitualDescriptions();
  } else if (latexType === "combat_style_lists") {
    latex = generateCombatStyleLists();
  } else if (latexType === "combat_style_summaries") {
    latex = generateCombatStyleSummaries();
  } else if (latexType === "combat_style_descriptions") {
    latex = combatStyles.map(convertCombatStyleToLatex).join("\n\\newpage\n");
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
  cli
    .option("-o, --output <outputFilename>")
    .option("-t, --type <latexType>")
    .parse(process.argv);
  if (!cli.type) {
    throw new Error("Must provide --type");
  }
  main(cli.type, cli.output);
}
