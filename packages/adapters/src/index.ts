export interface OTAAdapter {
  pushRates(payload?: unknown): Promise<void>;
  pullReservations(since?: string): Promise<void>;
  health(): Promise<boolean>;
}
export type AdapterMap = Record<string, OTAAdapter>;
