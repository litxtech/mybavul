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

