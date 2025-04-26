export type Handler<S, T> = (source: S, value: T) => void;
export type Unsubscriber = () => void;

export interface Signal<Source, T> {
  on(handler: Handler<Source, T>): () => void;
  off(handler: Handler<Source, T>): void;
}

export class SignalEmitter<Source, T> {
  private handlers: Handler<Source, T>[] = [];

  // Return an unsubscribe function
  public on(handler: Handler<Source, T>): Unsubscriber {
    this.handlers.push(handler);

    return () => this.off(handler);
  }

  public off(handler: Handler<Source, T>): void {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  public trigger(source: Source, value: T): void {
    // Duplicate the array to avoid side effects during iteration.
    for (const handler of this.handlers.slice(0)) {
      handler(source, value);
    }
  }

  public expose(): Signal<Source, T> {
    return this;
  }
}
