import { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Planner from './components/Planner';
import Roster from './components/Roster';
import Auth from './components/Auth';
import Admin from './components/Admin';
import { Menu } from 'lucide-react';

function Nav({ current, setCurrent }) {
  const items = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'planner', label: 'Planner' },
    { key: 'roster', label: 'Roster' },
    { key: 'auth', label: 'Access' },
    { key: 'admin', label: 'Admin' },
  ];
  return (
    <div className="sticky top-0 z-20 backdrop-blur border-b border-cyan-400/10 bg-[#0b0f1a]/60">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 text-cyan-100">
          <Menu className="h-5 w-5 text-cyan-300" />
          <span className="font-medium tracking-wide">Star Command Center</span>
        </div>
        <div className="flex items-center gap-4">
          {items.map(it => (
            <button key={it.key} onClick={() => setCurrent(it.key)} className={`text-sm ${current===it.key ? 'text-cyan-200' : 'text-cyan-200/70 hover:text-cyan-200'}`}>{it.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [current, setCurrent] = useState('dashboard');
  return (
    <div className="min-h-screen bg-[#080b13] text-cyan-50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.08),transparent_45%),radial-gradient(ellipse_at_bottom,rgba(217,70,239,0.06),transparent_45%)]" />
      <Nav current={current} setCurrent={setCurrent} />
      <Hero />
      <main className="relative max-w-7xl mx-auto px-4 -mt-28 pb-20 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            {current === 'dashboard' && <Dashboard />}
            {current === 'planner' && <Planner />}
            {current === 'roster' && <Roster />}
            {current === 'auth' && <Auth />}
            {current === 'admin' && <Admin />}
          </div>
        </motion.div>
      </main>
      <footer className="relative py-10 text-center text-cyan-200/60">
        <div className="max-w-7xl mx-auto px-4">© {new Date().getFullYear()} Star Command Center</div>
      </footer>
    </div>
  );
}

export default App
