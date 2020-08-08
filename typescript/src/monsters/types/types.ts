import { defenseBonusesByMonsterType } from "@src/calculate/defense_bonuses_by_monster_type";
import * as format from "@src/latex/format";
import { MonsterInput } from "@src/monsters/reformat_monster_input";
import { aberrations } from "./aberrations";
import { animals } from "./animals";
import { animates } from "./animates";
import { humanoids } from "./humanoids";
import { magicalBeasts } from "./magical_beasts";
import { monstrousHumanoids } from "./monstrous_humanoids";
import { outsiders } from "./outsiders";
import { undead } from "./undead";

export type MonsterType =
  | "aberration"
  | "animal"
  | "animate"
  | "humanoid"
  | "magical beast"
  | "monstrous humanoid"
  | "outsider"
  | "undead";

export const monsterTypes: MonsterType[] = [
  "aberration",
  "animal",
  "animate",
  "humanoid",
  "magical beast",
  "monstrous humanoid",
  "outsider",
  "undead",
];

export const monsterInputsByType: Record<MonsterType, MonsterInput[]> = {
  "aberration": aberrations,
  "animal": animals,
  "animate": animates,
  "humanoid": humanoids,
  "magical beast": magicalBeasts,
  "monstrous humanoid": monstrousHumanoids,
  "outsider": outsiders,
  "undead": undead,
};

function formatDefenseBonuses(monsterType: MonsterType) {
  const bonuses = defenseBonusesByMonsterType(monsterType);
  return `
    \\parhead{Defenses}
    ${format.modifier(bonuses.armor)} Armor,
    ${format.modifier(bonuses.fortitude)} Fortitude,
    ${format.modifier(bonuses.reflex)} Reflex,
    ${format.modifier(bonuses.mental)} Mental
  `;
}

export const typeDescriptions: Record<MonsterType, string | null> = {
  "aberration": `
    ${formatDefenseBonuses("aberration")}
  `,
  "animal": `
    ${formatDefenseBonuses("animal")}
  `,
  "animate": `
    ${formatDefenseBonuses("animate")}
    \\parhead{Animated Life} Animates are living creatures that are fundamentally composed of non-sentient matter.
    They are considered to be both objects and creatures, and are affected equally by abilities that affect both.
    \\parhead{Nonsentient} Animates may have an intelligence of a sort, depending on the nature of their animation, but they are fundamentally not sentient creatures.
    All animates are immune to \\glossterm{Compulsion} and \\glossterm{Delusion} abilities.
  `,
  "humanoid": `
    ${formatDefenseBonuses("humanoid")}
  `,
  "magical beast": `
    ${formatDefenseBonuses("magical beast")}
  `,
  "monstrous humanoid": `
    ${formatDefenseBonuses("monstrous humanoid")}
  `,
  "outsider": `
    ${formatDefenseBonuses("outsider")}
    \\parhead{Planar Essence} An outsider is fundamentally composed of the essence of its home plane.
    When an outsider dies, its essence returns to its plane.
    Weak outsiders lose their independent identity and become part of the core composition of the plane once more.
    Strong outsiders can retain their identity and reform from that raw material given time, making them difficult or impossible to kill completely.
    In either case, outsiders cannot be resurrected by mortal magic such as the \\spell{resurrection} spell.
  `,
  "undead": `
    ${formatDefenseBonuses("undead")}
    \\parhead{Unliving} Undead are not living creatures, and are immune to most abilities that only affect living creatures.
    However, they are affected in a specific way by effects from the \\sphere{vivimancy} mystic sphere.
    Undead are always considered an \\glossterm{ally} for \\sphere{vivimancy} spells.
    Any effect from the \\sphere{vivimancy} sphere that would directly cause an undead creature to lose hit points without dealing damage causes that creature to regain that many lost hit points instead.
    In addition, any effect from the \\sphere{vivimancy} sphere that would cause an undead creature to regain lost hit points instead causes it to lose that many hit points instead.
    \\parhead{Unnatural Mind} Undead are controlled by fragments of the souls of deceased creatures.
    Many undead are \\glossterm{mindless}, and even intelligent undead are immune to \\glossterm{Compulsion} and \\glossterm{Delusion} abilities.
  `,
};
