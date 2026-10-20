'use client';

import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-[#2a0a0f] py-20 text-white text-center border-t border-white/5">
      {/* Subtle Ornaments */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#c9a24a]/30 bg-white/5 px-5 py-2">
            <Sparkles className="h-4 w-4 text-[#c9a24a] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#c9a24a] font-bold">Thank You</span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl text-white font-light tracking-tight mb-8">
            SHEHAN <span className="text-[#c9a24a] italic font-normal">&amp;</span> SAVISHKAA
          </h2>

          <div className="flex flex-col items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-medium text-white/40">
            <div className="flex items-center gap-4 py-4 border-y border-white/10 px-8">
              <span>Sat</span>
              <div className="h-4 w-px bg-white/20" />
              <span className="text-white">05 . 12 . 2026</span>
              <div className="h-4 w-px bg-white/20" />
              <span>December</span>
            </div>

            <div className="mt-12 space-y-6 text-white/80 font-medium">
              <p className="text-[10px] tracking-[0.3em]">&copy; {new Date().getFullYear()} SHEHAN & SAVISHKAA</p>

              <p className="text-[8px] tracking-[0.2em] leading-relaxed text-white">
                DESIGN AND CREATED BY <span className="text-white">INVITEMINT</span> | CONNECT WHATSAPP: <a href="https://wa.me/94707819074" target="_blank" className="text-white hover:underline">+94 70 781 9074</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
