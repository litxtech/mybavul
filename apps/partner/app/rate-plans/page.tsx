"use client";
import { useState } from "react";
export default function Page(){
  const [name, setName] = useState('');
  const [refundable, setRefundable] = useState(false);
  const onSave = ()=> alert(`Saved rate plan: ${name} refundable=${refundable}`);
  return <main style={{padding:24}}>
    <h2>Rate Plans</h2>
    <input placeholder="Plan name" value={name} onChange={e=>setName(e.target.value)} />
    <label style={{marginLeft:8}}><input type="checkbox" checked={refundable} onChange={e=>setRefundable(e.target.checked)} /> Refundable</label>
    <div><button onClick={onSave} style={{marginTop:12}}>Save</button></div>
  </main>;
}


\n\nexport function List(){ const [rows,setRows]=useState<any[]>([]); const base=String(process.env.NEXT_PUBLIC_API_BASE||''); useEffect(()=>{ fetch(${base}/api/v1/partner/rate-plans?tenantId=&propertyId=).then(r=>r.json()).then(setRows);},[]); const del=async(id:string)=>{ await fetch(${base}/api/v1/partner/rate-plans/+id,{method:'DELETE'}); setRows(rows.filter(r=>r.id!==id));}; return <div style={{marginTop:12}}>{rows.map((r:any)=>(<div key={r.id}>{r.name} <button onClick={()=>del(r.id)}>Delete</button></div>))}</div>; }
