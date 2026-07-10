export type Handler<S, T> = (source: S, value: T) => void;
export type Unsubscriber = () => void;

export interface BatchContext {
  isActive: boolean;
  queuedHandlers: Map<Handler<any, any>, { source: any; value: any }>;
}

export const globalBatchContext: BatchContext = {
  isActive: false,
  queuedHandlers: new Map()
};

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
    if (globalBatchContext.isActive) {
      for (const handler of this.handlers.slice(0)) {
        if (!globalBatchContext.queuedHandlers.has(handler)) {
          globalBatchContext.queuedHandlers.set(handler, { source, value });
        }
      }
    } else {
      // Duplicate the array to avoid side effects during iteration.
      for (const handler of this.handlers.slice(0)) {
        handler(source, value);
      }
    }
  }

  public expose(): Signal<Source, T> {
    return this;
  }
}
