import { ChallengeRating, MonsterType } from "@src/data";
import { generateStandardMonster } from "@src/simulation/standard_monsters";
import cli from "commander";
import {monsterToLatex} from '@src/latex/monster_to_latex';

function main({
  challengeRating,
  level,
  monsterType,
  startingAttribute,
}: {
  challengeRating: ChallengeRating;
  level: number;
  monsterType?: MonsterType;
  startingAttribute?: number;
}): void {
  if (!level) {
    throw new Error("Must provide level");
  }
  if (!challengeRating) {
    throw new Error("Must provide challenge rating");
  }
  const monster = generateStandardMonster(level, challengeRating, {
    monsterType,
    startingAttribute,
  });
  console.log(monsterToLatex(monster));
}

if (require.main === module) {
  cli
    .option("-a, --starting-attribute [startingAttribute]")
    .option("-c, --challenge-rating <challengeRating>")
    .option("-l, --level <level>")
    .option("-m, --monster-type [monsterType]")
    .parse(process.argv);
  main({
    challengeRating: Number(cli.challengeRating) as ChallengeRating,
    level: Number(cli.level),
    monsterType: cli.monsterType,
    startingAttribute: Number(cli.startingAttribute),
  });
}
