import { Property } from '@src/character_sheet/events/property';
import { RepeatingSection, splitPropertyName } from '@src/character_sheet/repeating_section/repeating_section';
import { Attrs, EventInfo, SimpleValue } from './sheet_worker';
import { Unsubscriber } from '@src/character_sheet/events/signal';

export class CharacterSheet {
  characterName: string;
  private properties: Record<string, Property<SimpleValue>>;
  private repeatingSections: Record<string, RepeatingSection>;
  private latestRowId = 0;

  constructor(characterName: string) {
    this.characterName = characterName;
    this.properties = {};
    this.repeatingSections = {};
  }

  private getProperty(propertyName: string): Property<SimpleValue> {
    if (this.properties[propertyName] === undefined) {
      this.properties[propertyName] = new Property(propertyName);
    }

    return this.properties[propertyName];
  }

  private getRepeatingSection(propertyName: string) {
    const { sectionName } = splitPropertyName(propertyName);
    if (this.repeatingSections[sectionName] === undefined) {
      this.repeatingSections[sectionName] = new RepeatingSection(sectionName);
    }

    return this.repeatingSections[sectionName];
  }

  public on(changeString: string, callback: (eventInfo: EventInfo) => void): Unsubscriber {
    const changedPropertyNames: string[] = [];
    for (const triggerName of changeString.split(" ")) {
      if (triggerName.startsWith("change:")) {
        changedPropertyNames.push(triggerName.replaceAll("change:", ""));
      } else {
        // We don't currently handle anything other than changes, such as deletions
        console.log(`Ignoring unsupported trigger name ${triggerName}.`);
      }
    }

    const unsubscribers: Unsubscriber[] = [];
    for (const propertyName of changedPropertyNames) {
      if (propertyName.startsWith("repeating_")) {
        // TODO: we don't handle unsubscribing from repeating sections right now
        this.getRepeatingSection(propertyName).onChange(propertyName, callback);
      } else {
        unsubscribers.push(this.getProperty(propertyName).SetSignal.on((_, eventInfo: EventInfo) => {
          callback(eventInfo);
        }));
      }
    }

    return () => {
      for (const unsubscriber of unsubscribers) {
        unsubscriber();
      }
    };
  }

  // This is generally more convenient than `on()` when working with known properties.
  public onChange(propertyNames: string[], callback: (eventInfo: EventInfo) => void): Unsubscriber {
    return this.on(propertyNames.map((p) => `change:${p}`).join(" "), callback);
  }

  public getRepeatingSectionNames(): string[] {
    // The filter is probably unnecessary, but it could be useful if we delete repeating
    // sections?
    return Object.keys(this.repeatingSections).filter((k) => this.repeatingSections[k]);
  }

  // TODO: handle getting repeating properties
  public getProperties(propertyNames: string[], callback: (attrs: Attrs) => void): void {
    const attrs: Attrs = {}
    for (const propertyName of propertyNames) {
      attrs[propertyName] = this.getProperty(propertyName).value;
    }

    callback(attrs);
  }

  // Note that we currently can't handle attribute removal like Roll20 does, just
  // attribute changes.
  public setProperties(attrs: Record<string, SimpleValue>): void {
    for (const propertyName of Object.keys(attrs)) {
      if (propertyName.startsWith("repeating_")) {
        this.getRepeatingSection(propertyName).setProperty(propertyName, attrs[propertyName]);
      } else {
        this.getProperty(propertyName).set(attrs[propertyName]);
      }
    }
  }

  public generateRowId(): string {
    this.latestRowId += 1;
    return `${this.latestRowId}`;
  }

  public getLatestRowId(): string {
    return `${this.latestRowId}`;
  }
}
