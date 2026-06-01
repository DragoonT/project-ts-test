import { EventEmitter } from "node:events";

type Bus = EventEmitter;

const g = globalThis as unknown as { __ProjectBus?: Bus };

const bus: Bus =
  g.__ProjectBus ??
  ((): Bus => {
    const e = new EventEmitter();
    e.setMaxListeners(0);
    g.__ProjectBus = e;
    return e;
  })();

export type BusEvent = {
  kind: string;
  tenantId: string;
  ts: number;
  [key: string]: unknown;
};

const channel = (tenantId: string) => `tenant:${tenantId}`;

export function broadcast(tenantId: string, kind: string, payload: Record<string, unknown> = {}): void {
  bus.emit(channel(tenantId), { kind, tenantId, ts: Date.now(), ...payload });
}

export function subscribe(tenantId: string, handler: (event: BusEvent) => void): () => void {
  const ch = channel(tenantId);
  bus.on(ch, handler);
  return () => bus.off(ch, handler);
}
