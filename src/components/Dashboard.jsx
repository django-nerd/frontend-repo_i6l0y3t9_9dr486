import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SciFiPanel from './SciFiPanel';
import { CalendarDays, Bell, Users, Plus, Shield } from 'lucide-react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New patch applied to fleet specs', time: '2m' },
    { id: 2, text: 'Training op starts in 1 hour', time: '58m' },
  ]);

  useEffect(() => {
    fetch(`${API}/events`).then(r => r.json()).then(setEvents).catch(() => setEvents([]));
  }, []);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <SciFiPanel title="Upcoming Events" className="md:col-span-2">
        <ul className="space-y-3">
          {events.slice(0,5).map((e, idx) => (
            <li key={idx} className="flex items-center justify-between p-3 rounded-lg bg-cyan-400/5 border border-cyan-400/10">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-cyan-300" />
                <div>
                  <p className="text-cyan-100 font-medium">{e.title}</p>
                  <p className="text-cyan-200/70 text-sm">{new Date(e.start_time).toLocaleString()} · {e.category}</p>
                </div>
              </div>
              <button className="text-cyan-300 hover:text-cyan-200">Details</button>
            </li>
          ))}
          {events.length === 0 && (
            <p className="text-cyan-200/70">No events yet. Use the planner to create one.</p>
          )}
        </ul>
      </SciFiPanel>

      <div className="space-y-6">
        <SciFiPanel title="Shortcuts">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: CalendarDays, label: 'Planner' },
              { icon: Users, label: 'Roster' },
              { icon: Plus, label: 'New Event' },
              { icon: Shield, label: 'Admin' },
            ].map((s, i) => (
              <motion.button whileHover={{ y: -2 }} key={i} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30">
                <s.icon className="h-6 w-6 text-cyan-300" />
                <span className="text-cyan-100/80 text-sm">{s.label}</span>
              </motion.button>
            ))}
          </div>
        </SciFiPanel>

        <SciFiPanel title="Notifications">
          <ul className="space-y-2">
            {notifications.map(n => (
              <li key={n.id} className="flex items-center justify-between p-2 rounded-md bg-cyan-400/5">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-fuchsia-300" />
                  <span className="text-cyan-100/90">{n.text}</span>
                </div>
                <span className="text-cyan-200/60 text-xs">{n.time}</span>
              </li>
            ))}
          </ul>
        </SciFiPanel>
      </div>
    </div>
  );
}
