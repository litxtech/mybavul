"use client";
export default function Page(){
  const period = new Date().toISOString().slice(0,7);
  const url = `/api/v1/payouts/csv?period=${period}`.replace('/api','');
  return <main style={{padding:24}}><h2>Ledger</h2>
    <p>Commission / Net totals (stub)</p>
    <a href={url}><button>Download Payout CSV ({period})</button></a>
  </main>;
}
