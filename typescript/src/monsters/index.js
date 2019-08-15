"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const animals_1 = __importDefault(require("@src/monsters/animals"));
const monsterDefaults = {
    attributes: {
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        per: 0,
        wil: 0,
    },
    armor: [],
    challengeRating: 1,
    size: "medium",
    weapons: [],
};
function generateMonsters() {
    const monsterInputs = [...animals_1.default];
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
exports.default = exports.monsters;
