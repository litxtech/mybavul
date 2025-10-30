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
