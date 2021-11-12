import { defenseBonusesByMonsterType } from "@src/calculate/defense_bonuses_by_monster_type";
import { MonsterType } from "@src/data";
import * as format from "@src/latex/format";
import { MonsterInput } from "@src/monsters/reformat_monster_input";
import { planeforged } from "./planeforged";
import { undead } from "./undead";

export const monsterInputsByType: Record<MonsterType, MonsterInput[]> = {
  "planeforged": planeforged,
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

// Individual monsters may have different knowledge skills
export const knowledgeSkillsByMonsterType: Record<MonsterType, string[]> = {
  "planeforged": ["planes"],
  "undead": ["religion"],
};

export const typeDescriptions: Record<MonsterType, string | null> = {
  "planeforged": `
    ${formatDefenseBonuses("planeforged")}
    \\parhead{Planar Essence} A planeforged is fundamentally composed of the essence of its home plane.
    When a planeforged dies, its essence returns to its plane.
    Weak planeforged lose their independent identity and become part of the core composition of the plane once more.
    Strong planeforged can retain their identity and reform from that raw material given time, making them difficult or impossible to kill completely.
    In either case, planeforged cannot be resurrected by mortal magic such as the \\spell{resurrection} spell.
  `,
  "undead": `
    ${formatDefenseBonuses("undead")}
    \\parhead{Unliving} Undead are not living creatures, and are immune to most abilities that only affect living creatures.
    However, they are affected in a specific way by effects from the \\sphere{vivimancy} mystic sphere.
    Undead are always considered an \\glossterm{ally} for \\sphere{vivimancy} spells.
    Any effect from the \\sphere{vivimancy} sphere that would deal energy damage to an undead creature causes that creature to regain that many lost hit points instead.
    In addition, any effect from the \\sphere{vivimancy} sphere that would cause an undead creature to regain lost hit points instead causes it to lose that many hit points instead.
    \\parhead{Unnatural Mind} Undead are controlled by fragments of the souls of deceased creatures.
    Many undead are \\glossterm{mindless}, and even intelligent undead are immune to \\abilitytag{Compulsion} and \\abilitytag{Emotion} abilities.
  `,
};
