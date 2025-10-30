import type { FastifyInstance } from "fastify";
import { query } from "../db/client";

export async function registerPartner(app: FastifyInstance) {
  app.post('/api/v1/partner/rooms', async (req, rep) => {
    const b = (req.body??{}) as any;
    if (!b.tenantId || !b.propertyId || !b.name) return rep.code(400).send({ error: 'missing_fields' });
    const r = await query("insert into room_types (tenant_id, property_id, name) values ($1,$2,$3) returning id", [b.tenantId, b.propertyId, b.name]);
    return rep.code(201).send({ id: r.rows[0].id });
  });
  app.post('/api/v1/partner/rate-plans', async (req, rep) => {
    const b = (req.body??{}) as any;
    if (!b.tenantId || !b.propertyId || !b.name) return rep.code(400).send({ error: 'missing_fields' });
    const r = await query("insert into rate_plans (tenant_id, property_id, name, refundable) values ($1,$2,$3,$4) returning id", [b.tenantId, b.propertyId, b.name, !!b.refundable]);
    return rep.code(201).send({ id: r.rows[0].id });
  });
  app.post('/api/v1/partner/calendar', async (req, rep) => {
    const b = (req.body??{}) as any;
    if (!b.tenantId || !b.roomTypeId || !b.date) return rep.code(400).send({ error: 'missing_fields' });
    await query("insert into inventory (tenant_id, room_type_id, date, allotment, stop_sell) values ($1,$2,$3,$4,$5) on conflict (room_type_id, date) do update set allotment=excluded.allotment, stop_sell=excluded.stop_sell", [b.tenantId, b.roomTypeId, b.date, b.allotment??0, !!b.stopSell]);
    return rep.code(200).send({ ok: true });
  });
}
