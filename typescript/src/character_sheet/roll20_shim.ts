import { Attrs, EventInfo, SimpleValue } from './sheet_worker';
import { getCurrentCharacterSheet } from './current_character_sheet';
import { Unsubscriber } from '@src/character_sheet/events/signal';

export function on(changeString: string, callback: (eventInfo: EventInfo) => void): Unsubscriber {
  return getCurrentCharacterSheet().on(changeString, callback);
}

export function getAttrs(getVariables: string[], callback: (attrs: Attrs) => void): void {
  getCurrentCharacterSheet().getProperties(getVariables, callback);
}

export function setAttrs(attrs: Attrs): void {
  getCurrentCharacterSheet().setProperties(attrs);
}

export function getSectionIDs(sectionPrefix: string, callback: (repeatingSectionIds: string[]) => void): void {
  // TODO: Realistic implementation
  callback([]);
}

export function generateRowID(): string {
  // TODO: realistic implementation
  return "Unique row IDs are not yet implemented.";
}

export function removeRepeatingRow(rowKey: string): void {
  // TODO: realistic implementation
}

export default {
  on,
  getAttrs,
  setAttrs,
  getSectionIDs,
  generateRowID,
  removeRepeatingRow,
}
