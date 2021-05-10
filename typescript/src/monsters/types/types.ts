import { defenseBonusesByMonsterType } from "@src/calculate/defense_bonuses_by_monster_type";
import * as format from "@src/latex/format";
import { MonsterInput } from "@src/monsters/reformat_monster_input";
import { aberrations } from "./aberrations";
import { animals } from "./animals";
import { animates } from "./animates";
import { dragons } from "./dragons";
import { humanoids } from "./humanoids";
import { magicalBeasts } from "./magical_beasts";
import { monstrousHumanoids } from "./monstrous_humanoids";
import { planeforged } from "./planeforged";
import { undead } from "./undead";

export type MonsterType =
  | "aberration"
  | "animal"
  | "animate"
  | "dragon"
  | "humanoid"
  | "magical beast"
  | "monstrous humanoid"
  | "planeforged"
  | "undead";

export const monsterTypes: MonsterType[] = [
  "aberration",
  "animal",
  "animate",
  "dragon",
  "humanoid",
  "magical beast",
  "monstrous humanoid",
  "planeforged",
  "undead",
];

export const monsterInputsByType: Record<MonsterType, MonsterInput[]> = {
  "aberration": aberrations,
  "animal": animals,
  "animate": animates,
  "dragon": dragons,
  "humanoid": humanoids,
  "magical beast": magicalBeasts,
  "monstrous humanoid": monstrousHumanoids,
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
  "aberration": ["dungeoneering"],
  "animal": ["nature"],
  "animate": ["arcana"],
  "dragon": ["arcana"],
  "humanoid": ["local"],
  "magical beast": ["arcana"],
  "monstrous humanoid": ["nature"],
  "planeforged": ["planes"],
  "undead": ["religion"],
};

export const typeDescriptions: Record<MonsterType, string | null> = {
  "aberration": `
    ${formatDefenseBonuses("aberration")}
  `,
  "animal": `
    ${formatDefenseBonuses("animal")}
  `,
  "animate": `
    ${formatDefenseBonuses("animate")}
    \\parhead{Animated Life} Animates are living creatures that are fundamentally composed of inanimate matter.
    They are considered to be both objects and creatures, and are affected equally by abilities that affect both.
    \\parhead{Nonsentient} Animates may have an intelligence of a sort, depending on the nature of their animation, but they are fundamentally not sentient creatures.
    All animates are immune to \\abilitytag{Compulsion} and \\abilitytag{Emotion} abilities.
  `,
  "dragon": `
    ${formatDefenseBonuses("dragon")}
    \\parhead{Knowledge (arcana) 0}
      Legends speak of reptilian flying creatures called dragons.
      Their love of gold and gems is as legendary as their awe-inspiring power.
      Dragons keep their wealth in massive hoards, and the search for these hoards has been the death of many a greedy adventurer.

    \\parhead{Knowledge (arcana) 5}
      Dragons are inherently magical creatures, and they enjoy powerful magic items almost as much as they enjoy gold.
      As dragons age, they grow continually in power and size.
      All dragons have damaging breath weapons, and the size and shape of the breath depends on the type and age of the dragon.
      They also have extremely keen senses, and are very difficult to sneak up on.

    \\parhead{Knowledge (arcana) 10}
      There are two types of dragons: metallic dragons and chromatic dragons.
      Metallic dragons have shiny, glistening scales, and all metallic dragons are named after metals.
      Chromatic dragons have intensely colored scales, and all chromatic dragons are named after colors.
      Metallic dragons tend to be good-aligned, and chromatic dragons tend to be evil-aligned.

      Dragon bones and scales retain some of the magical power of their original owner.
      They can be used to craft powerful weapons and armor, and can be quite valuable to the right buyer.

    \\parhead{Knowledge (arcana) 15}
      In combat, dragons take full advantage of their myriad attack options.
      They fight at whatever range they consider optimal.
      In general, they are most dangerous in melee, but they may choose to remain at a distance to avoid powerful melee opponents.
      In that case, they use their their spells and breath weapon to pick off opponents that cannot fight effectively at range.

      Dragons can fly extremely quickly, and they can use this ability to escape a losing fight or to pick off isolated creatures trying to keep their distance.
      They generally avoid grappling foes, possibly because they find it demeaning, but large dragons may swallow smaller opponents whole.

    \\parhead{Knowledge (arcana) 20}
      Newly hatched dragons are a few feet long, while the oldest dragons are among the most massive and dangerous creatures in existence.
      Although ancient dragons are immensely powerful, they are also rarely active, requiring weeks or months of sleep between days of activity.
      Eventually, it is said that the most ancient dragons simply go to sleep and may never wake up, though they live indefinitely in that state.

    \\parhead{Knowledge (arcana) 25}
      There is a practical side to the famous greed of dragons.
      Dragons can metabolize gold and magical energy from items they eat extremely efficiently to fuel their immense power and bulk.
      In desperate times, a dragon may be forced to eat part of its hoard to accelerate its recovery from injuries or increase its power.
      As dragons approach the inevitable torpor of their old age, they can stave it off or recover from a long rest by consuming part of their hoard.
      This is a difficult decision for a dragon to make, and most dragons never eat a single gold piece.
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
