import SciFiPanel from './SciFiPanel';
import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Admin() {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({ key: '', name: '', permissions: '' });
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const fetchRoles = async () => {
    try {
      const res = await fetch(`${API}/admin/roles`, { headers: { Authorization: token ? `Bearer ${token}` : '' }});
      if (res.ok) setRoles(await res.json());
    } catch {}
  };
  useEffect(() => { fetchRoles(); }, []);

  const create = async () => {
    try {
      const res = await fetch(`${API}/admin/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : '' },
        body: JSON.stringify({ key: form.key, name: form.name, permissions: form.permissions.split(',').map(s => s.trim()).filter(Boolean) })
      });
      if (res.ok) { setForm({ key: '', name: '', permissions: '' }); fetchRoles(); }
      else alert('Admin only');
    } catch {}
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <SciFiPanel title="Create Role">
        <div className="space-y-3">
          <input className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-cyan-100/90" placeholder="Key (admin, officer)" value={form.key} onChange={e => setForm({ ...form, key: e.target.value })} />
          <input className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-cyan-100/90" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-cyan-100/90" placeholder="Permissions (comma separated)" value={form.permissions} onChange={e => setForm({ ...form, permissions: e.target.value })} />
          <button onClick={create} className="w-full py-2 rounded bg-cyan-500/20 text-cyan-100 border border-cyan-400/30">Create</button>
        </div>
      </SciFiPanel>

      <SciFiPanel title="Roles">
        <ul className="space-y-2">
          {roles.map((r, i) => (
            <li key={i} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/10">
              <span className="text-cyan-100/90">{r.name} ({r.key})</span>
              <span className="text-cyan-200/70 text-sm">{(r.permissions || []).join(', ')}</span>
            </li>
          ))}
          {roles.length === 0 && <li className="text-cyan-200/70">No roles found or insufficient permissions.</li>}
        </ul>
      </SciFiPanel>
    </div>
  );
}
