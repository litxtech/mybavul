import type { FastifyInstance } from "fastify";

export async function registerPayouts(app: FastifyInstance) {
  app.get('/api/v1/payouts/csv', async (req, rep) => {
    const period = (req.query as any)?.period as string | undefined; // YYYY-MM
    if (!period || !/^\d{4}-\d{2}$/.test(period)) return rep.code(400).send({ error: 'invalid_period' });
    const csv = 'tenant_id,host_id,amount_minor,currency\n' + 'stub-tenant,stub-host,100000,USD\n';
    rep.header('Content-Type', 'text/csv');
    rep.header('Content-Disposition', `attachment; filename="payout_${period}.csv"`);
    return rep.send(csv);
  });
}
