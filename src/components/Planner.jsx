import { useEffect, useMemo, useState } from 'react';
import SciFiPanel from './SciFiPanel';
import { motion } from 'framer-motion';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function MonthGrid({ current, events }) {
  const start = useMemo(() => new Date(current.getFullYear(), current.getMonth(), 1), [current]);
  const end = useMemo(() => new Date(current.getFullYear(), current.getMonth() + 1, 0), [current]);
  const days = useMemo(() => Array.from({ length: end.getDate() }, (_, i) => new Date(current.getFullYear(), current.getMonth(), i + 1)), [current, end]);
  const byDay = useMemo(() => {
    const map = {};
    events.forEach(e => {
      const d = new Date(e.start_time).getDate();
      map[d] = map[d] || [];
      map[d].push(e);
    });
    return map;
  }, [events]);
  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((d, i) => (
        <div key={i} className="min-h-[94px] rounded-lg p-2 border border-cyan-400/10 bg-white/5">
          <div className="text-xs text-cyan-200/70">{d.getDate()}</div>
          <div className="space-y-1 mt-1">
            {(byDay[d.getDate()] || []).slice(0,3).map((e, idx) => (
              <div key={idx} className="text-[11px] px-2 py-1 rounded bg-cyan-500/10 text-cyan-100/90 border border-cyan-400/20 truncate">{e.title}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Planner() {
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(new Date());
  const [form, setForm] = useState({ title: '', start_time: '', end_time: '', category: 'operation' });

  useEffect(() => {
    fetch(`${API}/events`).then(r => r.json()).then(setEvents).catch(() => setEvents([]));
  }, []);

  const create = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' },
        body: JSON.stringify({ ...form, start_time: new Date(form.start_time), end_time: new Date(form.end_time) }),
      });
      if (!res.ok) throw new Error('Failed');
      const e = await res.json();
      setForm({ title: '', start_time: '', end_time: '', category: 'operation' });
      const fresh = await fetch(`${API}/events`).then(r => r.json());
      setEvents(fresh);
    } catch (e) {
      alert('Only admins/officers can create events. You can still explore the UI.');
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <SciFiPanel title="Planner — Monthly View">
          <div className="flex items-center justify-between mb-4">
            <div className="text-cyan-100/90 font-medium">{current.toLocaleString('default', { month: 'long' })} {current.getFullYear()}</div>
            <div className="flex gap-2 text-cyan-200/80">
              <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1))}>&lt; Prev</button>
              <button onClick={() => setCurrent(new Date())}>Today</button>
              <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1))}>Next &gt;</button>
            </div>
          </div>
          <MonthGrid current={current} events={events} />
        </SciFiPanel>
      </div>

      <div className="space-y-6">
        <SciFiPanel title="Create Event">
          <div className="space-y-3">
            <input className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-cyan-100/90" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-cyan-100/90" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="operation">Operation</option>
              <option value="training">Training</option>
              <option value="social">Social</option>
              <option value="other">Other</option>
            </select>
            <input type="datetime-local" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-cyan-100/90" value={form.start_time} onChange={e => setForm({ ...form, start_time: e.target.value })} />
            <input type="datetime-local" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-cyan-100/90" value={form.end_time} onChange={e => setForm({ ...form, end_time: e.target.value })} />
            <motion.button whileHover={{ scale: 1.02 }} className="w-full py-2 rounded bg-cyan-500/20 text-cyan-100 border border-cyan-400/30" onClick={create}>Create</motion.button>
          </div>
        </SciFiPanel>

        <SciFiPanel title="Upcoming">
          <ul className="space-y-2">
            {events.slice(0, 6).map((e, i) => (
              <li key={i} className="text-cyan-100/90 text-sm">{new Date(e.start_time).toLocaleString()} — {e.title}</li>
            ))}
            {events.length === 0 && <li className="text-cyan-200/70">No events scheduled.</li>}
          </ul>
        </SciFiPanel>
      </div>
    </div>
  );
}
