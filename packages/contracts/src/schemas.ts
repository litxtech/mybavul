export type Currency = 'USD' | 'EUR' | 'TRY';
export interface ReservationCreateReq { propertyId: string; roomTypeId: string; ratePlanId: string; checkin: string; checkout: string; guests: number; currency: Currency; }
export interface ReservationCreateRes { id: string; status: 'pending'|'confirmed'; }
export interface HealthRes { ok: boolean }
