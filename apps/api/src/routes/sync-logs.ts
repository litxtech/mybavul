import type { FastifyInstance } from "fastify";
import { query } from "../db/client";

export async function registerSyncLogs(app: FastifyInstance) {
  app.get('/api/v1/sync/logs', async (req, rep) => {
    const q = req.query as any;
    const tenantId = q.tenantId as string|undefined;
    if (!tenantId) return rep.code(400).send({ error: 'missing_tenantId' });
    const r = await query("select id, level, message, data, created_at from sync_logs sl join sync_jobs sj on sl.job_id=sj.id where sj.tenant_id=$1 order by sl.created_at desc limit 200", [tenantId]);
    return rep.send(r.rows);
  });
  app.post('/api/v1/sync/retry', async (req, rep) => {
    const b = (req.body??{}) as any;
    if (!b.jobId) return rep.code(400).send({ error: 'missing_jobId' });
    await query("update sync_jobs set status='queued', attempts=0, last_error=null where id=$1", [b.jobId]);
    return rep.send({ ok: true });
  });
}
