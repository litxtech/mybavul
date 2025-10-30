import type { FastifyInstance } from "fastify";
import { query } from "../db/client";

export function withAudit(app: FastifyInstance) {
  app.addHook('onResponse', async (req, rep) => {
    try{
      const method = req.method;
      if (!['POST','PUT','PATCH','DELETE'].includes(method)) return;
      const actor = (req.headers['x-user-id'] as string|undefined) ?? null;
      const tenant = (req.headers['x-tenant-id'] as string|undefined) ?? null;
      await query(
        "insert into audit_log (tenant_id, actor_user_id, action, target_type, target_id, after_data, ip, ua) values ($1,$2,$3,$4,$5,$6,$7,$8)",
        [tenant, actor, `${method} ${req.url}`, null, null, null, req.ip, req.headers['user-agent']||null]
      );
    }catch{/* ignore */}
  });
}
