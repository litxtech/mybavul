import type { FastifyInstance } from "fastify";
import { query } from "../db/client";

function pct(n:number, p:number){ return Math.round(n*p/100); }

export async function enhanceReservations(app: FastifyInstance) {
  app.post('/api/v1/reservations', async (req, rep) => {
    const b = (req.body??{}) as any;
    const required = ['tenantId','propertyId','roomTypeId','ratePlanId','checkin','checkout','currency','totalMinor'];
    for (const k of required) if (!b[k]) return rep.code(400).send({ error: `missing_${k}` });
    const total = Number(b.totalMinor);
    if (!Number.isInteger(total) || total < 50) return rep.code(400).send({ error: 'invalid_total' });
    const fee = pct(total, 12); // default 12%
    const net = total - fee;
    const cur = String(b.currency).toUpperCase();
    const sql = `insert into bookings (tenant_id, property_id, room_type_id, rate_plan_id, checkin, checkout, currency, total_minor, status)
                 values ($1,$2,$3,$4,$5,$6,$7,$8,'pending') returning id`;
    const r = await query(sql, [b.tenantId, b.propertyId, b.roomTypeId, b.ratePlanId, b.checkin, b.checkout, cur, total]);
    const bookingId = r.rows[0].id as string;
    // ledger entries: debit (customer pays total), credit (supplier net), fee (platform)
    await query(`insert into wallet_ledger (tenant_id, booking_id, amount_minor, currency, entry_type, fee_minor)
                 values ($1,$2,$3,$4,'debit',0)`, [b.tenantId, bookingId, total, cur]);
    await query(`insert into wallet_ledger (tenant_id, booking_id, amount_minor, currency, entry_type, fee_minor)
                 values ($1,$2,$3,$4,'credit',$5)`, [b.tenantId, bookingId, net, cur, fee]);
    return rep.code(201).send({ id: bookingId, status: 'pending', totalMinor: total, feeMinor: fee, netMinor: net });
  });
}
