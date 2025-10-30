"use client";
import { useEffect, useState } from "react";
export default function Page(){
  const period = new Date().toISOString().slice(0,7);
  const [data, setData] = useState<any>(null);
  useEffect(()=>{
    const base = String(process.env.NEXT_PUBLIC_API_BASE||'');
    fetch(`${base}/api/v1/ledger/summary?tenantId=demo-tenant&period=${period}`).then(r=>r.json()).then(setData).catch(()=>setData({error:true}));
  },[]);
  return <main style={{padding:24}}>
    <h2>Ledger</h2>
    {data? <div>
      <p>Period: {data.period}</p>
      <p>Total: {data.totalMinor} {data.currency}</p>
      <p>Credit(Net): {data.creditMinor} {data.currency}</p>
      <p>Fees: {data.feeMinor} {data.currency}</p>
      <a href={`/api/v1/payouts/csv?period=${period}`.replace('/api','')}><button>Download Payout CSV ({period})</button></a>
    </div> : <p>Loading...</p>}
  </main>;
}
