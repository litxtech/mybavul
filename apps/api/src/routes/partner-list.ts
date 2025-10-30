import type { FastifyInstance } from "fastify";
import { query } from "../db/client";

export async function registerPartnerList(app: FastifyInstance) {
  app.get('/api/v1/partner/rooms', async (req, rep) => {
    const q = req.query as any; if (!q.tenantId || !q.propertyId) return rep.code(400).send({error:'missing_fields'});
    const r = await query("select id, name from room_types where tenant_id=$1 and property_id=$2 order by name", [q.tenantId, q.propertyId]);
    return rep.send(r.rows);
  });
  app.get('/api/v1/partner/rate-plans', async (req, rep) => {
    const q = req.query as any; if (!q.tenantId || !q.propertyId) return rep.code(400).send({error:'missing_fields'});
    const r = await query("select id, name, refundable from rate_plans where tenant_id=$1 and property_id=$2 order by name", [q.tenantId, q.propertyId]);
    return rep.send(r.rows);
  });
  app.delete('/api/v1/partner/rooms/:id', async (req, rep) => {
    const id = (req.params as any).id; await query("delete from room_types where id=$1", [id]); return rep.send({ ok: true });
  });
  app.delete('/api/v1/partner/rate-plans/:id', async (req, rep) => {
    const id = (req.params as any).id; await query("delete from rate_plans where id=$1", [id]); return rep.send({ ok: true });
  });
}
