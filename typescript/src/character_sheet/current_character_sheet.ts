import { CharacterSheet } from './character_sheet';

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
