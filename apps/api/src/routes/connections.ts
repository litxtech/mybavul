import type { FastifyInstance } from "fastify";
import { query } from "../db/client";

export async function registerConnections(app: FastifyInstance) {
  app.post('/api/v1/connections', async (req, rep) => {
    const b = (req.body??{}) as any;
    if (!b.tenantId || !b.channelCode || !b.credentials) return rep.code(400).send({ error: 'missing_fields' });
    const r = await query("insert into connections (tenant_id, channel_code, credentials) values ($1,$2,$3) returning id", [b.tenantId, b.channelCode, b.credentials]);
    return rep.code(201).send({ id: r.rows[0].id });
  });
  app.post('/api/v1/sync/enqueue', async (req, rep) => {
    const b = (req.body??{}) as any;
    if (!b.tenantId || !b.channelCode || !b.jobType) return rep.code(400).send({ error: 'missing_fields' });
    const r = await query("insert into sync_jobs (tenant_id, channel_code, job_type, payload, status) values ($1,$2,$3,$4,'queued') returning id", [b.tenantId, b.channelCode, b.jobType, b.payload??{}]);
    return rep.code(200).send({ id: r.rows[0].id, queued: true });
  });
}
