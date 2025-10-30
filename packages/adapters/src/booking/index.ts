import type { OTAAdapter } from '..'; export const bookingAdapter: OTAAdapter = { async pushRates(){}, async pullReservations(){}, async health(){ return true; } };
