import { EventInfo } from '@src/character_sheet/sheet_worker';
import { SignalEmitter, Signal } from '@src/character_sheet/events/signal';

export class Button {
  buttonName: string;

  constructor(buttonName: string) {
    this.buttonName = buttonName;
  }

  private readonly clickEmitter = new SignalEmitter<Button, EventInfo>();
  public get ClickedSignal(): Signal<Button, EventInfo> {
    return this.clickEmitter.expose();
  }
  public click() {
    this.clickEmitter.trigger(this, {
      newValue: undefined,
      previousValue: undefined,
      removedInfo: {},
      sourceAttribute: this.buttonName,
      triggerName: `clicked:${this.buttonName}`,
    });
  }
} 
