import { Character } from './character';

const characters: Record<string, Character> = {};
let currentCharacterName: string;

export function getCurrentCharacter(): Character {
  if (currentCharacterName === undefined) {
    currentCharacterName = "default";
  }
  if (!characters[currentCharacterName]) {
    characters[currentCharacterName] = new Character(currentCharacterName);
  }
  return characters[currentCharacterName];
}

export function setCurrentCharacter(characterName: string) {
  currentCharacterName = characterName;
}
