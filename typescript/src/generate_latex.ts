import { monsterToLatex } from "@src/latex/monster_to_latex";
import { monsters } from "@src/monsters";
import cli from "commander";
import _ from "lodash";

function generateLatex(latexType: string): string {
  let latex = "";
  if (latexType === "monsters") {
    for (const monster of _.sortBy(monsters, "name")) {
      latex += monsterToLatex(monster);
    }
  }
  return latex;
}

function main(latexType: string) {
  console.log(generateLatex(latexType));
}

if (require.main === module) {
  cli.option("-t, --type <latexType>").parse(process.argv);
  if (!cli.type) {
    throw new Error("Must provide --type");
  }
  main(cli.type);
}
