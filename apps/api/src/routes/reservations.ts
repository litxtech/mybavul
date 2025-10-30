import type { FastifyInstance } from "fastify";

export async function enhanceReservations(app: FastifyInstance) {
  app.post('/api/v1/reservations', async (req, rep) => {
    // TODO: validate body (zod) and persist booking
    // TODO: on successful payment confirmation, append ledger entries
    const bookingId = 'stub-booking-id';
    // ledger: debit customer (payment), credit supplier (net), fee platform
    // NOTE: actual DB writes will go through service layer
    return rep.code(201).send({ id: bookingId, status: 'pending' });
  });
}
