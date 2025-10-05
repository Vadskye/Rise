import { Property } from '@src/character_sheet/events/property';
import { Button } from '@src/character_sheet/events/button';
import {
  RepeatingSection,
  splitPropertyName,
  RepeatingSectionName,
} from '@src/character_sheet/repeating_section/repeating_section';
import { Attrs, EventInfo, SimpleValue } from './sheet_worker';
import { Unsubscriber } from '@src/character_sheet/events/signal';

export class CharacterSheet {
  characterName: string;
  private buttons: Record<string, Button>;
  private properties: Record<string, Property<SimpleValue>>;
  private repeatingSections: Record<string, RepeatingSection>;
  private latestRowId: number | null = null;

  constructor(characterName: string) {
    this.buttons = {};
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

  private getButton(buttonName: string): Button {
    if (this.buttons[buttonName] === undefined) {
      this.buttons[buttonName] = new Button(buttonName);
    }

    return this.buttons[buttonName];
  }

  // Can provide the full property name or the section name
  public getRepeatingSection(propertyName: string) {
    const sectionName = propertyName.startsWith('repeating_')
      ? splitPropertyName(propertyName).sectionName
      : propertyName;
    if (this.repeatingSections[sectionName] === undefined) {
      this.repeatingSections[sectionName] = new RepeatingSection(sectionName);
    }

    return this.repeatingSections[sectionName];
  }

  public on(listenString: string, callback: (eventInfo: EventInfo) => void): Unsubscriber {
    const changedPropertyNames: string[] = [];
    const clickedButtonNames: string[] = [];
    for (const triggerName of listenString.split(' ')) {
      if (triggerName.startsWith('change:')) {
        changedPropertyNames.push(triggerName.replaceAll('change:', ''));
      } else if (triggerName.startsWith('clicked:')) {
        clickedButtonNames.push(triggerName.replaceAll('clicked:', ''));
      } else {
        // We don't currently handle anything other than changes, such as deletions
        // console.log(`Ignoring unsupported trigger name ${triggerName}.`);
      }
    }

    const unsubscribers: Unsubscriber[] = [];
    for (const propertyName of changedPropertyNames) {
      if (propertyName.startsWith('repeating_')) {
        // TODO: we don't handle unsubscribing from repeating sections right now
        this.getRepeatingSection(propertyName).onChange(propertyName, callback);
      } else {
        unsubscribers.push(
          this.getProperty(propertyName).SetSignal.on((_, eventInfo: EventInfo) => {
            callback(eventInfo);
          }),
        );
      }
    }
    for (const buttonName of clickedButtonNames) {
      unsubscribers.push(
        this.getButton(buttonName).ClickedSignal.on((_, eventInfo: EventInfo) => {
          callback(eventInfo);
        }),
      );
    }

    return () => {
      for (const unsubscriber of unsubscribers) {
        unsubscriber();
      }
    };
  }

  // This is generally more convenient than `on()` when working with known properties.
  public onChange(propertyNames: string[], callback: (eventInfo: EventInfo) => void): Unsubscriber {
    return this.on(propertyNames.map((p) => `change:${p}`).join(' '), callback);
  }

  // For each repeating section of the given name, return the given property value
  public getRepeatingSectionValues(
    sectionName: RepeatingSectionName,
    propertyName: string,
  ): SimpleValue[] {
    return this.getRepeatingSection(`repeating_${sectionName}`).getValueFromAllRows(propertyName);
  }

  public getAllRepeatingSectionNames(): string[] {
    // The filter is probably unnecessary, but it could be useful if we delete repeating
    // sections?
    return Object.keys(this.repeatingSections).filter(
      (sectionName) => this.repeatingSections[sectionName],
    );
  }

  // Primarily used for Roll20 compatibility. Prefer getPropertyValues generally.
  public getAttrs(propertyNames: string[], callback: (attrs: Attrs) => void): void {
    callback(this.getPropertyValues(propertyNames));
  }

  public getSectionIDs(
    sectionName: RepeatingSectionName,
    callback: (repeatingSectionIds: string[]) => void,
  ): void {
    callback(this.getRepeatingSection(sectionName).getRowIds());
  }

  // Unlike getAttrs, this doesn't use a callback. Prefer using this for normal Typescript
  // usage, and use getAttrs for Roll20 compatibility.
  public getPropertyValues(propertyNames: readonly string[]): Attrs {
    const attrs: Attrs = {};
    for (const propertyName of propertyNames) {
      attrs[propertyName] = this.getPropertyValue(propertyName);
    }

    return attrs;
  }

  public getPropertyValue(propertyName: string): SimpleValue {
    if (propertyName.startsWith('repeating_')) {
      const { sectionName, rowId, rowPropertyName } = splitPropertyName(propertyName);
      if (rowPropertyName && rowId) {
        return this.getRepeatingSection(sectionName).getRowValue(rowId, rowPropertyName);
      } else {
        throw new Error(
          `Cannot retrieve property value with ambiguous definition: '${propertyName}'`,
        );
      }
    }
    return this.getProperty(propertyName).value;
  }

  public clickButton(buttonName: string) {
    this.getButton(buttonName).click();
  }

  // Note that we currently can't handle attribute removal like Roll20 does, just
  // attribute changes.
  public setProperties(attrs: Record<string, SimpleValue>): void {
    for (const propertyName of Object.keys(attrs)) {
      if (propertyName.startsWith('repeating_')) {
        this.getRepeatingSection(propertyName).setProperty(propertyName, attrs[propertyName]);
      } else {
        this.getProperty(propertyName).set(attrs[propertyName]);
      }
    }
  }

  public generateRowId(): string {
    if (this.latestRowId === null) {
      this.latestRowId = -1;
    }
    this.latestRowId += 1;
    return `${this.latestRowId}`;
  }

  public getLatestRowId(): string {
    return `${this.latestRowId}`;
  }
}
