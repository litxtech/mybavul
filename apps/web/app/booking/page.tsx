"use client";
import { useState } from "react";
export default function Page(){
  const [amount, setAmount] = useState(10000);
  const [message, setMessage] = useState('');
  const create = async ()=>{
    try{
      const base = String(process.env.NEXT_PUBLIC_API_BASE||'');
      const r = await fetch(`${base}/api/v1/payments/intent`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ amountMinor: amount, currency: 'usd' })});
      const j = await r.json();
      setMessage(r.ok? `Client secret: ${j.clientSecret||''}` : `Error: ${j.error||r.status}`);
    }catch(e){ setMessage('Error'); }
  };
  return <main style={{padding:24}}>
    <h2>Booking (Payment)</h2>
    <input type="number" value={amount} onChange={e=>setAmount(parseInt(e.target.value||'0'))} />
    <button onClick={create} style={{marginLeft:8}}>Create PaymentIntent</button>
    <p>{message}</p>
  </main>;
}
