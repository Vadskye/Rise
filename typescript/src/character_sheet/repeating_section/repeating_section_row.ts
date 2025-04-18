import { EventInfo, SimpleValue } from '@src/character_sheet/sheet_worker';
import { Property } from '@src/character_sheet/events/property';
import { Unsubscriber } from '@src/character_sheet/events/signal';

export class RepeatingSectionRow {
  private properties: Record<string, Property<SimpleValue>>;

  constructor() {
    this.properties = {};
  }

  public getPropertyValues(propertyNames: string[]): Record<string, SimpleValue> {
    const values: Record<string, SimpleValue> = {};
    for (const propertyName of propertyNames) {
      values[propertyName] = this.getProperty(propertyName).value;
    }
    return values;
  }

  public getProperty(propertyName: string): Property<SimpleValue> {
    if (propertyName.startsWith("repeating_")) {
      throw new Error(`Provided full property name '${propertyName}' where row property was expected`);
    }
    if (!this.properties[propertyName]) {
      this.properties[propertyName] = new Property(propertyName);
    }
    return this.properties[propertyName];
  }

  public onChange(rowPropertyName: string, callback: (eventInfo: EventInfo) => void): Unsubscriber {
    return this.getProperty(rowPropertyName).SetSignal.on((_, eventInfo: EventInfo) => {
      callback(eventInfo);
    });
  }

  public setProperty(propertyName: string, newValue: SimpleValue) {
    if (!this.properties[propertyName]) {
      this.properties[propertyName] = new Property(propertyName);
    }
    this.properties[propertyName].set(newValue);
  }
}
