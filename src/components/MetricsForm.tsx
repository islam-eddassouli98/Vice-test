import React, { useState } from 'react';
import { Metric } from "./frontend-challenge";

interface Props {
  onAdd: (metrics: Metric) => void;
}

export default function MetricsForm({ onAdd }: Props) {
  const [id, setId] = useState('');
  const [code, setCode] = useState('');
  const [amounts, setAmounts] = useState('');
  const [date, setDate] = useState('');

  //Funzione al submite del form
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd({
      id,
      code,
      amounts: amounts.split(',').map(a => parseInt(a)),
      date: new Date(date),
    });
    setId('');
    setCode('');
    setAmounts('');
    setDate('');
  }

  return (
    // Form per aggiungere una metrica nuova 
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="ID" value={id} onChange={e => setId(e.target.value)} />
        <input type="text" placeholder="Code"   value={code} onChange={e => setCode(e.target.value)} />
        <input type="text"  placeholder="Amounts" value={amounts} onChange={e => setAmounts(e.target.value)} />
        <input type="date" placeholder="Date"  value={date} onChange={e => setDate(e.target.value)} />
      <button type="submit">Add Metric</button>
    </form>
  );
}
