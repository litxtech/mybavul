import type { FastifyInstance } from "fastify";

export async function registerRoutes(app: FastifyInstance) {
  app.get("/api/v1/healthz", async () => ({ ok: true }));

  app.post("/api/v1/reservations", async (req, rep) => {
    return rep.code(201).send({ id: "stub", status: "pending" });
  });

  app.post("/api/v1/channels/:id/pull-reservations", async (req, rep) => {
    return rep.send({ ok: true });
  });

  app.post("/api/v1/channels/:id/push-rates", async (req, rep) => {
    return rep.send({ ok: true });
  });
}
