import { motion } from 'framer-motion';

export default function SciFiPanel({ title, children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-xl border border-cyan-400/20 bg-white/5 backdrop-blur-md shadow-[0_0_60px_rgba(34,211,238,0.08)] ${className}`}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/10 via-transparent to-fuchsia-400/10 pointer-events-none" />
      {title && (
        <div className="px-4 pt-3 pb-2 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_3px_rgba(34,211,238,0.7)]" />
          <h3 className="text-cyan-100/90 tracking-wide text-sm uppercase">{title}</h3>
        </div>
      )}
      <div className="relative p-4">{children}</div>
    </motion.div>
  );
}
