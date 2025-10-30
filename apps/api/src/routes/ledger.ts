import type { FastifyInstance } from "fastify";
import { query } from "../db/client";

export async function registerLedger(app: FastifyInstance) {
  app.get('/api/v1/ledger/summary', async (req, rep) => {
    const q = req.query as any;
    const tenantId = q.tenantId as string | undefined;
    const period = (q.period as string | undefined) ?? new Date().toISOString().slice(0,7);
    if (!tenantId) return rep.code(400).send({ error: 'missing_tenantId' });
    const start = `${period}-01`;
    const end = `${period}-31`;
    const totals = await query(
      `select 
         sum(case when entry_type='debit' then amount_minor else 0 end) as total_minor,
         sum(case when entry_type='credit' then amount_minor else 0 end) as credit_minor,
         sum(fee_minor) as fee_minor,
         max(currency) as currency
       from wallet_ledger
       where tenant_id=$1 and created_at::date between $2::date and $3::date`,
      [tenantId, start, end]
    );
    const row = totals.rows[0] || {};
    return rep.send({ period, totalMinor: Number(row.total_minor||0), creditMinor: Number(row.credit_minor||0), feeMinor: Number(row.fee_minor||0), currency: row.currency||'USD' });
  });
}
