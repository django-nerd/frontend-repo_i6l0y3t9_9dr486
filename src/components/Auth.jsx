import { useState } from 'react';
import { motion } from 'framer-motion';
import SciFiPanel from './SciFiPanel';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const register = async () => {
    const res = await fetch(`${API}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: form.username, email: form.email, password: form.password }) });
    if (res.ok) setMessage('Registered. You can log in.'); else setMessage('Registration failed');
  };
  const login = async () => {
    const params = new URLSearchParams();
    params.append('username', form.username);
    params.append('password', form.password);
    const res = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params });
    if (res.ok) { const data = await res.json(); localStorage.setItem('token', data.access_token); setMessage('Logged in.'); } else setMessage('Login failed');
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <SciFiPanel title="Access Console">
        <div className="flex gap-2 mb-3">
          <button onClick={() => setMode('login')} className={`px-3 py-1 rounded border ${mode==='login' ? 'border-cyan-400/50 text-cyan-100' : 'border-white/10 text-cyan-200/70'}`}>Login</button>
          <button onClick={() => setMode('register')} className={`px-3 py-1 rounded border ${mode==='register' ? 'border-fuchsia-400/50 text-cyan-100' : 'border-white/10 text-cyan-200/70'}`}>Register</button>
        </div>
        <div className="space-y-3">
          <input className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-cyan-100/90" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
          {mode === 'register' && <input className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-cyan-100/90" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />}
          <input type="password" className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-cyan-100/90" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          {mode === 'login' ? (
            <motion.button whileHover={{ scale: 1.02 }} className="w-full py-2 rounded bg-cyan-500/20 text-cyan-100 border border-cyan-400/30" onClick={login}>Login</motion.button>
          ) : (
            <motion.button whileHover={{ scale: 1.02 }} className="w-full py-2 rounded bg-fuchsia-500/20 text-cyan-100 border border-fuchsia-400/30" onClick={register}>Register</motion.button>
          )}
          {message && <div className="text-cyan-200/80">{message}</div>}
        </div>
      </SciFiPanel>
      <SciFiPanel title="Status">
        <p className="text-cyan-200/80 text-sm">Use a test account to explore admin-only actions. After logging in, your token is stored locally and used for protected endpoints.</p>
      </SciFiPanel>
    </div>
  );
}
