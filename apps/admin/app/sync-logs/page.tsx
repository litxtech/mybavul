"use client";
import { useEffect, useState } from "react";
export default function Page(){
  const [rows, setRows] = useState<any[]>([]);
  const tenantId = String(process.env.NEXT_PUBLIC_TENANT_ID||'demo-tenant');
  useEffect(()=>{ const base = String(process.env.NEXT_PUBLIC_API_BASE||''); fetch(`${base}/api/v1/sync/logs?tenantId=${tenantId}`).then(r=>r.json()).then(setRows).catch(()=>setRows([])); },[]);
  const retry = async (jobId:string)=>{ const base = String(process.env.NEXT_PUBLIC_API_BASE||''); await fetch(`${base}/api/v1/sync/retry`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ jobId }) }); alert('Queued'); };
  return <main style={{padding:24}}><h2>Sync Logs</h2>
    <table><tbody>
      {rows.map((x:any,i:number)=> <tr key={i}><td>{x.created_at}</td><td>{x.level}</td><td>{x.message}</td><td><button onClick={()=>retry(x.job_id||x.id)}>Retry</button></td></tr>)}
    </tbody></table>
  </main>;
}
