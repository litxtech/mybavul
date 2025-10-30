"use client";
import { useState } from "react";
export default function Page(){
  const [date, setDate] = useState('');
  const [allotment, setAllotment] = useState(0);
  const [stop, setStop] = useState(false);
  const onSave = ()=> alert(`Saved stub: ${date} allot=${allotment} stop=${stop}`);
  return <main style={{padding:24}}>
    <h2>Calendar</h2>
    <input placeholder="YYYY-MM-DD" value={date} onChange={e=>setDate(e.target.value)} />
    <input type="number" value={allotment} onChange={e=>setAllotment(parseInt(e.target.value||'0'))} style={{marginLeft:8}} />
    <label style={{marginLeft:8}}><input type="checkbox" checked={stop} onChange={e=>setStop(e.target.checked)} /> Stop-sell</label>
    <div><button onClick={onSave} style={{marginTop:12}}>Save</button></div>
  </main>;
}
