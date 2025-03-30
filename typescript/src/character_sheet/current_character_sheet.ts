import { CharacterSheet } from './character_sheet';
// import { handleEverything } from './sheet_worker';

const characters: Record<string, CharacterSheet> = {};
let currentCharacterName: string;

export function getCurrentCharacterSheet(): CharacterSheet {
  if (currentCharacterName === undefined) {
    currentCharacterName = "default";
  }
  if (!characters[currentCharacterName]) {
    characters[currentCharacterName] = new CharacterSheet(currentCharacterName);
  }
  return characters[currentCharacterName];
}

export function setCurrentCharacterSheet(characterName: string) {
  currentCharacterName = characterName;
}

// export function calculateCurrentCharacterSheet() {
//   // We need to make sure that a character sheet exists to configure.
//   getCurrentCharacterSheet();
//   handleEverything();
// }
