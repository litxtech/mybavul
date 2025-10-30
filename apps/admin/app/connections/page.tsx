"use client";
import { useState } from "react";
export default function Page(){
  const [json, setJson] = useState('{"apiKey":"","hotelId":""}');
  const onSave = ()=> alert('Saved stub: '+json);
  return <main style={{padding:24}}><h2>Connections</h2>
    <textarea value={json} onChange={e=>setJson(e.target.value)} rows={8} style={{width:'100%'}}/>
    <button onClick={onSave} style={{marginTop:12}}>Save</button>
  </main>;
}
