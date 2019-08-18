"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attributes_1 = require("@src/data/attributes");
const skills_1 = require("@src/data/skills");
const animals_1 = require("@src/monsters/animals");
const from_pairs_1 = require("@src/util/from_pairs");
const monsterDefaults = {
    attributes: from_pairs_1.fromPairs(attributes_1.attributes.map((a) => [a, 0])),
    armor: [],
    challengeRating: 1,
    size: "medium",
    skills: from_pairs_1.fromPairs(skills_1.skills.map((s) => [s, 0])),
    weapons: [],
};
function generateMonsters() {
    const monsterInputs = [...animals_1.animals];
    const monsters = monsterInputs.map((monsterInput) => {
        return Object.assign({}, monsterInput, monsterDefaults, { attributes: mergeDefaultAttributes(monsterInput) });
    });
    return monsters;
}
function mergeDefaultAttributes(monster) {
    if (monster.attributes === undefined) {
        return monsterDefaults.attributes;
    }
    return Object.assign({}, monster.attributes, monsterDefaults.attributes);
}
exports.monsters = generateMonsters();
