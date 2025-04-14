import { SignalEmitter, Signal } from '@src/character_sheet/events/signal';
import { EventInfo, SimpleValue } from '@src/character_sheet/sheet_worker';
import { RepeatingSectionRow } from '@src/character_sheet/repeating_section/repeating_section_row';

// fullPropertyName can look like:
//  * "repeating_<sectionName>_<rowId>_<rowPropertyName>" for property setting
//  * "repeating_<sectionName>:<rowPropertyName>" for change registration
type FullPropertyName = string;

interface SplitPropertyName {
  sectionName: string;
  rowId: string | null;
  rowPropertyName: string | null;
}

interface ListenerConfig {
  rowPropertyName: string;
  callback: (eventInfo: EventInfo) => void;
}

export class RepeatingSection {
  // Should always start with "repeating_", does not include row ID or local property
  // names within the repeating
  sectionName: string;
  private rows: Record<string, RepeatingSectionRow>;
  private listeners: ListenerConfig[];

  constructor(sectionName: string) {
    this.listeners = [];
    this.sectionName = sectionName;
    this.rows = {};
  }

  // TODO: return an unsubscriber
  public onChange(fullPropertyName: FullPropertyName, callback: (eventInfo: EventInfo) => void) {
    const {sectionName, rowId, rowPropertyName } = splitPropertyName(fullPropertyName);
    if (sectionName !== this.sectionName) {
      throw new Error(`Repeating section ${this.sectionName} cannot handle change to ${fullPropertyName}`);
    }
    if (rowId && rowPropertyName) {
      return this.getRow(rowId).onChange(rowPropertyName, callback);
    } else if (rowId) {
      // TODO: in what circumstances could there be a rowId without a rowPropertyName?
      throw new Error(`Repeating section ${this.sectionName} cannot handle change to ${fullPropertyName}`);
    } else if (rowPropertyName) {
      this.listeners.push({ callback, rowPropertyName });
      for (const rowId of Object.keys(this.rows)) {
        this.getRow(rowId).onChange(rowPropertyName, callback);
      }
    } else {
      return this.SetSignal.on((_, eventInfo: EventInfo) => {
        callback(eventInfo);
      });
    }
  }

  private readonly setEmitter = new SignalEmitter<RepeatingSection, EventInfo>();
  public get SetSignal(): Signal<RepeatingSection, EventInfo> {
    return this.setEmitter.expose();
  }
  public setProperty(fullPropertyName: FullPropertyName, newValue: SimpleValue) {
    const { rowId, sectionName } = splitPropertyName(fullPropertyName);
    if (sectionName !== this.sectionName) {
      throw new Error(`RepeatingSection ${this.sectionName} cannot process section '${sectionName}'.`);
    }
    if (!rowId) {
      throw new Error(`Must include rowId when setting a property: ${fullPropertyName}.`);
    }
    const row = this.getRow(rowId);
    const previousValue = row.getProperty(fullPropertyName).value;
    row.setProperty(fullPropertyName, newValue);
    this.setEmitter.trigger(this, {
      newValue,
      previousValue,
      removedInfo: {},
      sourceAttribute: fullPropertyName,
      triggerName: `repeating_${this.sectionName}_${rowId}`,
    });
  }

  private getRow(rowId: string) {
    if (!this.rows[rowId]) {
      this.rows[rowId] = this.createRow();
    }
    return this.rows[rowId];
  }

  private createRow() {
    const row = new RepeatingSectionRow();
    for (const listener of this.listeners) {
      row.onChange(listener.rowPropertyName, listener.callback);
    }

    return row;
  }
}


export function splitPropertyName(propertyName: FullPropertyName): SplitPropertyName {
  const underscorePattern = /^repeating_([^_]+)_([^_]+)_(.+)/;
  let match = underscorePattern.exec(propertyName);
  if (match) {
    return {
      sectionName: match[1],
      rowId: match[2],
      rowPropertyName: match[3],
    };
  }

  const changePropertyPattern = /^repeating_([^_]+):(.+)/;
  match = changePropertyPattern.exec(propertyName);
  if (match) {
    return {
      sectionName: match[1],
      rowId: null,
      rowPropertyName: match[2]
    };
  }

  const changeAnythingPattern = /^repeating_([^_]+)$/;
  match = changeAnythingPattern.exec(propertyName);
  if (match) {
    return {
      sectionName: match[1],
      rowId: null,
      rowPropertyName: null,
    };
  }

  throw new Error(`Could not parse repeating section property name '${propertyName}'.`);
}
