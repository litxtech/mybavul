"use client";
import { useState } from "react";
export default function Page(){
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState(2);
  const onSave = ()=> alert(`Saved room: ${name} cap=${capacity}`);
  return <main style={{padding:24}}>
    <h2>Rooms</h2>
    <input placeholder="Room name" value={name} onChange={e=>setName(e.target.value)} />
    <input type="number" value={capacity} onChange={e=>setCapacity(parseInt(e.target.value||'2'))} style={{marginLeft:8}} />
    <div><button onClick={onSave} style={{marginTop:12}}>Save</button></div>
  </main>;
}


\n\nexport function List(){ const [rows,setRows]=useState<any[]>([]); const base=String(process.env.NEXT_PUBLIC_API_BASE||''); useEffect(()=>{ fetch(${base}/api/v1/partner/rooms?tenantId=&propertyId=).then(r=>r.json()).then(setRows);},[]); const del=async(id:string)=>{ await fetch(${base}/api/v1/partner/rooms/+id,{method:'DELETE'}); setRows(rows.filter(r=>r.id!==id));}; return <div style={{marginTop:12}}>{rows.map((r:any)=>(<div key={r.id}>{r.name} <button onClick={()=>del(r.id)}>Delete</button></div>))}</div>; }
