import type { OTAAdapter } from '..'; export const agodaAdapter: OTAAdapter = { async pushRates(){}, async pullReservations(){}, async health(){ return true; } };
