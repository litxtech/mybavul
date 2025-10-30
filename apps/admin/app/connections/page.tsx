"use client";
import { useState } from "react";
export default function Page(){
  const [json, setJson] = useState('{"apiKey":"","hotelId":""}');
  const [channel, setChannel] = useState('expedia');
  const tenantId = 'demo-tenant';
  const onSave = async ()=> {
    await fetch(String(process.env.NEXT_PUBLIC_API_BASE||'')+'/api/v1/connections',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ tenantId, channelCode: channel, credentials: JSON.parse(json) })});
    alert('Saved');
  };
  const onSync = async ()=>{
    await fetch(String(process.env.NEXT_PUBLIC_API_BASE||'')+'/api/v1/sync/enqueue',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ tenantId, channelCode: channel, jobType: 'pull_reservations' })});
    alert('Sync queued');
  };
  return <main style={{padding:24}}><h2>Connections</h2>
    <select value={channel} onChange={e=>setChannel(e.target.value)}>
      <option value="expedia">Expedia</option>
      <option value="booking">Booking</option>
      <option value="agoda">Agoda</option>
    </select>
    <textarea value={json} onChange={e=>setJson(e.target.value)} rows={8} style={{width:'100%',display:'block',marginTop:8}}/>
    <div style={{display:'flex', gap:8, marginTop:12}}>
      <button onClick={onSave}>Save</button>
      <button onClick={onSync}>Run Pull Reservations</button>
    </div>
  </main>;
}
