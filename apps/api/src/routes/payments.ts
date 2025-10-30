import type { FastifyInstance } from "fastify";

export async function registerPayments(app: FastifyInstance) {
  app.post('/api/v1/payments/intent', async (req, rep) => {
    // TODO: create PaymentIntent via Stripe with amount/currency from body
    return rep.code(200).send({ clientSecret: 'pi_test_secret_stub' });
  });
}

