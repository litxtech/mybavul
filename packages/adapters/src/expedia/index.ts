import type { OTAAdapter } from '..'; export const expediaAdapter: OTAAdapter = { async pushRates(){}, async pullReservations(){}, async health(){ return true; } };
