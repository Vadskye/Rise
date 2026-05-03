import { Grimoire } from '@src/monsters/grimoire';
import { StockCharacters } from '@src/character_sheet/stock_characters';

export const grimoire = new Grimoire();
grimoire.addAllMonsters();

export const stockCharacters = new StockCharacters();
stockCharacters.addAllCharacters();
