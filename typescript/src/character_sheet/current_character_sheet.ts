import { CharacterSheet } from './character_sheet';

const characters: Record<string, CharacterSheet> = {};
let currentCharacterName: string;

let handleEverythingFn: (() => void) | null = null;
function runHandleEverything() {
  if (!handleEverythingFn) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    handleEverythingFn = require('./sheet_worker').handleEverything;
  }
  handleEverythingFn!();
}

export function getCurrentCharacterSheet(): CharacterSheet {
  if (currentCharacterName === undefined) {
    currentCharacterName = 'default';
  }
  if (!characters[currentCharacterName]) {
    characters[currentCharacterName] = new CharacterSheet(currentCharacterName);
    runHandleEverything();
  }
  return characters[currentCharacterName];
}

export function createCharacterSheet(characterName: string): CharacterSheet {
  if (characterSheetExists(characterName)) {
    throw new Error(`Character sheet ${characterName} already exists.`);
  }
  characters[characterName] = new CharacterSheet(characterName);
  setCurrentCharacterSheet(characterName);
  runHandleEverything();

  return characters[characterName];
}

export function characterSheetExists(characterName: string) {
  return characters[characterName] !== undefined;
}

export function setCurrentCharacterSheet(characterName: string) {
  currentCharacterName = characterName;
}

export function resetDefaultCharacterSheet(): CharacterSheet {
  currentCharacterName = 'default';
  characters[currentCharacterName] = new CharacterSheet(currentCharacterName);
  runHandleEverything();
  return characters[currentCharacterName];
}

export function clearAllCharacterSheets() {
  for (const name in characters) {
    delete characters[name];
  }
  currentCharacterName = 'default';
}

export function getCharacterSheet(characterName: string): CharacterSheet | undefined {
  return characters[characterName];
}

export function deleteCharacterSheet(characterName: string): void {
  delete characters[characterName];
}

export function keepOnlyCharacterSheets(names: string[]): void {
  const nameSet = new Set(names);
  for (const name in characters) {
    if (name !== 'default' && !nameSet.has(name)) {
      delete characters[name];
    }
  }
}
