import type { FastifyInstance } from "fastify";
import { query } from "../db/client";

export async function registerPayouts(app: FastifyInstance) {
  app.get('/api/v1/payouts/csv', async (req, rep) => {
    const period = (req.query as any)?.period as string | undefined; // YYYY-MM
    if (!period || !/^\d{4}-\d{2}$/.test(period)) return rep.code(400).send({ error: 'invalid_period' });
    const start = `${period}-01`;
    const end = `${period}-31`;
    const sql = `select tenant_id, booking_id, amount_minor, currency from wallet_ledger
                 where entry_type='credit' and created_at::date between $1::date and $2::date`;
    const r = await query(sql, [start, end]);
    const rows = r.rows as any[];
    const header = 'tenant_id,booking_id,amount_minor,currency\n';
    const body = rows.map(x=> `${x.tenant_id},${x.booking_id},${x.amount_minor},${x.currency}`).join('\n');
    const csv = header + body + (body? '\n':'');
    rep.header('Content-Type', 'text/csv');
    rep.header('Content-Disposition', `attachment; filename="payout_${period}.csv"`);
    return rep.send(csv);
  });
}
