import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden bg-[#0b0f1a]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0f1a]/40 to-[#0b0f1a] pointer-events-none" />
      <div className="relative h-full flex items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="px-6">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-fuchsia-300 drop-shadow">Star Command Center</h1>
          <p className="mt-4 text-cyan-100/80 max-w-2xl mx-auto">A futuristic control platform for your org: plan ops, manage rosters, and coordinate missions with holographic precision.</p>
        </motion.div>
      </div>
    </div>
  );
}
