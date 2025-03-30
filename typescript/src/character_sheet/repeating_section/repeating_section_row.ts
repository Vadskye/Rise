import { Property } from '@src/character_sheet/events/property';
import { SimpleValue } from '@src/character_sheet/sheet_worker';

export class RepeatingSectionRow {
  private properties: Record<string, Property<SimpleValue>>;

  constructor() {
    this.properties = {};
  }

  public getProperty(propertyName: string) {
    const property = this.properties[propertyName];
    return property && property.value;
  }

  public setProperty(propertyName: string, newValue: SimpleValue) {
    if (!this.properties[propertyName]) {
      this.properties[propertyName] = new Property(propertyName);
    }
    this.properties[propertyName].set(newValue);
  }
}
