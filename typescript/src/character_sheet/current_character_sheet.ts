import { CharacterSheet } from './character_sheet';
// import { handleEverything } from './sheet_worker';

const characters: Record<string, CharacterSheet> = {};
let currentCharacterName: string;

export function getCurrentCharacterSheet(): CharacterSheet {
  if (currentCharacterName === undefined) {
    currentCharacterName = 'default';
  }
  if (!characters[currentCharacterName]) {
    characters[currentCharacterName] = new CharacterSheet(currentCharacterName);
  }
  return characters[currentCharacterName];
}

export function createCharacterSheet(characterName: string): CharacterSheet {
  if (characterSheetExists(characterName)) {
    throw new Error(`Character sheet ${characterName} already exists.`);
  }
  characters[characterName] = new CharacterSheet(characterName);
  setCurrentCharacterSheet(characterName);

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

// export function calculateCurrentCharacterSheet() {
//   // We need to make sure that a character sheet exists to configure.
//   getCurrentCharacterSheet();
//   handleEverything();
// }
