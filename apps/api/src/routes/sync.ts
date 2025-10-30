import type { FastifyInstance } from "fastify";

export async function registerSync(app: FastifyInstance) {
  app.post('/api/v1/sync/run', async (req, rep) => {
    // iterate connections and enqueue sync_jobs (stub)
    return rep.send({ scheduled: true });
  });
}
