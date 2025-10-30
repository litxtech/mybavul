import type { FastifyInstance } from "fastify";

export function withRateLimit(app: FastifyInstance) {
  const windowMs = 60_000; // 1 minute
  const max = 60; // 60 req/min per key/ip
  const buckets = new Map<string, { ts: number; count: number }>();

  app.addHook('preHandler', async (req, rep) => {
    const key = (req.headers['x-mybavul-key'] as string | undefined) ?? req.ip;
    if (!key) return;
    const now = Date.now();
    const bucket = buckets.get(key);
    if (!bucket || now - bucket.ts > windowMs) {
      buckets.set(key, { ts: now, count: 1 });
      return;
    }
    bucket.count += 1;
    if (bucket.count > max) {
      rep.header('Retry-After', '60');
      rep.header('X-RateLimit-Limit', String(max)); rep.header('X-RateLimit-Remaining', '0'); return rep.code(429).send({ error: 'rate_limited' });
    }
  });
}

