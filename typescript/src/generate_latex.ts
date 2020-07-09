import { monsterToLatex } from "@src/latex/monster_to_latex";
import { monstersByType } from "@src/monsters";
import { monsterTypes } from "@src/monsters/types";
import { titleCase } from "change-case";
import cli from "commander";
import fs from "fs";
import _ from "lodash";

function generateLatex(latexType: string): string {
  let latex = "";
  if (latexType === "monsters") {
    for (const monsterType of monsterTypes) {
      const pluralText = monsterType === "undead" ? "undead" : `${monsterType}s`;
      // TODO: handle weird plurals as necessary
      latex += `
        \\section{${titleCase(pluralText)}}
      `;
      for (const monster of monstersByType[monsterType]) {
        latex += monsterToLatex(monster);
      }
    }
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
