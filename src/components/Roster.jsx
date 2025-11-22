import { useEffect, useMemo, useState } from 'react';
import SciFiPanel from './SciFiPanel';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Roster() {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    const url = role ? `${API}/roster?role=${role}` : `${API}/roster`;
    fetch(url).then(r => r.json()).then(setUsers).catch(() => setUsers([]));
  }, [role]);

  const roles = useMemo(() => {
    const set = new Set();
    users.forEach(u => (u.roles || []).forEach(r => set.add(r)));
    return Array.from(set);
  }, [users]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <select className="bg-white/5 border border-white/10 rounded px-3 py-2 text-cyan-100/90" value={role} onChange={e => setRole(e.target.value)}>
          <option value="">All Roles</option>
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u, i) => (
          <SciFiPanel key={i} title={u.username}>
            <div className="text-cyan-200/80 text-sm">{u.email}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(u.roles || []).map((r, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-fuchsia-500/10 border border-fuchsia-400/20 text-fuchsia-100/90 text-xs">{r}</span>
              ))}
            </div>
            <div className="mt-3 text-cyan-100/80 text-sm">Missions: {u.stats?.missions_completed ?? 0} · Flight Hours: {u.stats?.flight_hours ?? 0}</div>
          </SciFiPanel>
        ))}
        {users.length === 0 && <p className="text-cyan-200/70">No members found.</p>}
      </div>
    </div>
  );
}
