import { Pool } from "pg";
const url = process.env.DATABASE_URL;
export const db = url ? new Pool({ connectionString: url, ssl: url.includes('supabase.co') ? { rejectUnauthorized: false } : undefined }) : undefined;
export async function query(sql: string, params?: any[]) {
  if (!db) throw new Error('db_not_configured');
  const c = await db.connect();
  try { return await c.query(sql, params); } finally { c.release(); }
}
