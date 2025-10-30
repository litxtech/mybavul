import type { FastifyInstance } from "fastify";
import { verifyHmacSignature } from "../../src/lib/hmac";

export async function registerStripeWebhook(app: FastifyInstance) {
  app.post("/api/v1/webhooks/stripe", async (req, rep) => {
    const sig = req.headers["x-signature"] as string | undefined;
    const ts = req.headers["x-timestamp"] as string | undefined;
    const body = JSON.stringify(req.body ?? {});
    const secret = process.env.STRIPE_WEBHOOK_SECRET ?? "";
    if (!sig || !ts || !secret || !verifyHmacSignature(body, ts, sig, secret)) {
      return rep.code(400).send({ error: "invalid_signature" });
    }
    return rep.code(200).send({ received: true });
  });
}
