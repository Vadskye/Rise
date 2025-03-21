import { SignalEmitter, Signal } from '@src/character_sheet/events/signal';
import { EventInfo, SimpleValue } from '@src/character_sheet/sheet_worker';

export class Property<T extends SimpleValue> {
  propertyName: string;
  public value: T | undefined;

  constructor(propertyName: string) {
    this.propertyName = propertyName;
  }

  private readonly setEmitter = new SignalEmitter<Property<T>, EventInfo>();
  public get SetSignal(): Signal<Property<T>, EventInfo> {
    return this.setEmitter.expose();
  }
  public set(newValue: T) {
    const previousValue = this.value;
    this.value = newValue;
    this.setEmitter.trigger(this, {
      newValue,
      previousValue,
      removedInfo: {},
      sourceAttribute: this.propertyName,
      triggerName: `change:${this.propertyName}`,
    });
  }
} 
