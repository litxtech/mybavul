import type { FastifyInstance } from "fastify";

export function withIdempotency(app: FastifyInstance) {
  app.addHook('preHandler', async (req, rep) => {
    const isMutation = ["POST","PUT","PATCH","DELETE"].includes(req.method);
    if (!isMutation) return;
    const key = req.headers["idempotency-key"] as string | undefined;
    if (!key) return; // allow but could enforce
    // NOTE: store/load from DB idempo table when DB wired
    if ((app as any)._idempos?.has(key)) {
      return rep.code(409).send({ error: "idempotent_replay" });
    }
    (app as any)._idempos = (app as any)._idempos ?? new Set<string>();
    (app as any)._idempos.add(key);
  });
}
