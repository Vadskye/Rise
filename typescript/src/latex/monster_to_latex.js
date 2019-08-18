"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attributes_at_level_1 = require("@src/calculate/attributes_at_level");
const skill_modifier_by_name_1 = require("@src/calculate/skill_modifier_by_name");
const change_case_1 = require("change-case");
function monsterToLatex(monster) {
    return `
    \\begin{monsection}${getMonsectionArgs(monster)}
      ${getTitleAndSpeciesHeader(monster)}
      ${getFooter(monster)}
    \\end{monsection}
  `;
}
exports.monsterToLatex = monsterToLatex;
function getMonsectionArgs(monster) {
    return `${getName(monster)}{${monster.level}}[${monster.challengeRating}]`;
}
function getTitleAndSpeciesHeader(monster) {
    return `\\vspace{-1em}\\spelltwocol{${change_case_1.titleCase(monster.size)} ${monster.species}}\\vspace{-1em}`;
}
function getName({ name }) {
    const splitName = name.split(", ");
    if (splitName.length === 2) {
        return `{${splitName[0]}}[${splitName[1]}]`;
    }
    else if (splitName.length === 1) {
        return `{${name}}`;
    }
    else {
        throw new Error(`Name '${name}' has too many suffixes`);
    }
}
function getFooter(monster) {
    const attributes = attributes_at_level_1.attributesAtLevel(monster);
    const awareness = skill_modifier_by_name_1.skillModifierByName({
        attributes,
        level: monster.level,
        name: "awareness",
        skillPoints: monster.skills.awareness,
    });
    return `
    \\begin{monsterfooter}
      \\pari \\textbf<Awareness>
    \\end{monsterfooter}
  `;
}
