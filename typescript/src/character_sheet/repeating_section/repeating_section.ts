import { SignalEmitter, Signal } from '@src/character_sheet/events/signal';
import { EventInfo, SimpleValue } from '@src/character_sheet/sheet_worker';
import { RepeatingSectionRow } from '@src/character_sheet/repeating_section/repeating_section_row';

// fullPropertyName can look like:
//  * "repeating_<sectionName>_<rowId>_<rowPropertyName>" for property setting
//  * "repeating_<sectionName>:<rowPropertyName>" for change registration
type FullPropertyName = string;

interface ListenerConfig {
  rowPropertyName: string;
  callback: (eventInfo: EventInfo) => void;
}

type ModifierSectionName = typeof MODIFIER_SECTION_NAMES[number];
const MODIFIER_SECTION_NAMES = [
  "attunedmodifiers",
  "legacymodifiers",
  "temporarymodifiers",
  "permanentmodifiers",
] as const;

type AbilitySectionName = typeof ABILITY_SECTION_NAMES[number];
const ABILITY_SECTION_NAMES = [
  "abilities",
  "strikeattacks",
  "otherdamagingattacks",
  "nondamagingattacks"
] as const;

type OtherSectionName = typeof OTHER_SECTION_NAMES[number];
const OTHER_SECTION_NAMES = [
  "knowledgesubskills",
  "craftsubskills",
  "trainedskills",
  "vitalwounds",
] as const;

export type RepeatingSectionName = ModifierSectionName | AbilitySectionName | OtherSectionName;
const REPEATING_SECTION_NAMES: Set<RepeatingSectionName> = new Set([
  ...MODIFIER_SECTION_NAMES,
  ...ABILITY_SECTION_NAMES,
  ...OTHER_SECTION_NAMES,
]);

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

  public getValueFromAllRows(propertyName: string): SimpleValue[] {
    return Object.keys(this.rows).map(
      (rowId) => this.rows[rowId].getProperty(propertyName).value
    );
  }

  public getValuesFromAllRows(propertyNames: string[]): Record<string, SimpleValue>[] {
    return Object.keys(this.rows).map(
      (rowId) => this.rows[rowId].getPropertyValues(propertyNames)
    );
  }

  public getRowValue(rowId: string, propertyName: string): SimpleValue {
    return this.getRow(rowId).getProperty(propertyName).value;
  }

  public getRowIds(): string[] {
    return Object.keys(this.rows);
  }

  // TODO: return an unsubscriber
  public onChange(fullPropertyName: FullPropertyName, callback: (eventInfo: EventInfo) => void) {
    const { sectionName, rowId, rowPropertyName } = splitPropertyName(fullPropertyName);
    if (sectionName !== this.sectionName) {
      throw new Error(`Repeating section ${this.sectionName} cannot handle change to ${fullPropertyName}`);
    }
    if (rowId && rowPropertyName) {
      return this.getRow(rowId).onChange(rowPropertyName, callback);
    } else if (rowId) {
      // TODO: in what circumstances could there be a rowId without a rowPropertyName?
      throw new Error(`Repeating section ${this.sectionName} cannot handle change to ${fullPropertyName}`);
    } else if (rowPropertyName) {
      // In Roll20, this automatically embeds some sort of context about which row
      // triggered the listener, allowing triggers to implicitly carry information about
      // the relevant row ID. We don't replicate that behavior, so these listeners would
      // simply break if we included them.
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
    const { rowId, sectionName, rowPropertyName } = splitPropertyName(fullPropertyName);
    if (sectionName !== this.sectionName) {
      throw new Error(`RepeatingSection ${this.sectionName} cannot process section '${sectionName}'.`);
    }
    if (!rowId) {
      throw new Error(`Must include rowId when setting a property: ${fullPropertyName}.`);
    }
    if (!rowPropertyName) {
      throw new Error(`Must include rowPropertyName when setting a property: ${fullPropertyName}.`);
    }
    const row = this.getRow(rowId);
    const previousValue = row.getProperty(rowPropertyName).value;
    row.setProperty(rowPropertyName, newValue);
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

interface SplitPropertyName {
  sectionName: RepeatingSectionName;
  rowId: string | null;
  rowPropertyName: string | null;
}
export function splitPropertyName(propertyName: FullPropertyName): SplitPropertyName {
  // This assumes that row IDs are strictly numeric, which is true for our shim and not
  // true in real Roll20. I don't understand how Roll20 differentiates row IDs, since they
  // can look the same as properties.
  const underscorePattern = /^repeating_([^_:]+)_([0-9]+)_([^:]+)/;
  let match = underscorePattern.exec(propertyName);
  if (match) {
    if (!REPEATING_SECTION_NAMES.has(match[1] as any)) {
      throw new Error(`Unrecognized repeating section name: '${propertyName}'`);
    }
    return {
      sectionName: match[1] as RepeatingSectionName,
      rowId: match[2],
      rowPropertyName: match[3],
    };
  }

  const changePropertyPattern = /^repeating_([^_:]+):(.+)/;
  match = changePropertyPattern.exec(propertyName);
  if (match) {
    if (!REPEATING_SECTION_NAMES.has(match[1] as any)) {
      throw new Error(`Unrecognized repeating section name: '${propertyName}'`);
    }
    return {
      sectionName: match[1] as RepeatingSectionName,
      rowId: null,
      rowPropertyName: match[2]
    };
  }

  const getPropertyPattern = /^repeating_([^_:]+)_([^:]+)/;
  match = getPropertyPattern.exec(propertyName);
  if (match) {
    if (!REPEATING_SECTION_NAMES.has(match[1] as any)) {
      throw new Error(`Unrecognized repeating section name: '${propertyName}'`);
    }
    return {
      sectionName: match[1] as RepeatingSectionName,
      rowId: null,
      rowPropertyName: match[2],
    };
  }

  const changeAnythingPattern = /^repeating_([^_]+)$/;
  match = changeAnythingPattern.exec(propertyName);
  if (match) {
    if (!REPEATING_SECTION_NAMES.has(match[1] as any)) {
      throw new Error(`Unrecognized repeating section name: '${propertyName}'`);
    }
    return {
      sectionName: match[1] as RepeatingSectionName,
      rowId: null,
      rowPropertyName: null,
    };
  }

  throw new Error(`Could not parse repeating section property name '${propertyName}'.`);
}
