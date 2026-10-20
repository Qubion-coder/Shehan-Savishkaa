'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  spin: number;
  shade: [string, string];
}

const SHADES: [string, string][] = [
  ['#e0475a', '#8f1626'],
  ['#c42a3c', '#6e0f1a'],
  ['#f07a88', '#a51d2d'],
  ['#d23649', '#7a1220'],
];

// Gently falling rose petals over the whole page; never blocks taps or scrolling
export default function RosePetals({ count = 18 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const total = window.innerWidth < 640 ? Math.round(count * 0.6) : count;
    setPetals(
      Array.from({ length: total }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 14,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 10,
        drift: Math.random() * 160 - 80,
        spin: Math.random() > 0.5 ? 360 : -360,
        shade: SHADES[i % SHADES.length],
      }))
    );
  }, [count]);

  if (!petals.length) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[40] overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-8%]"
          style={{ left: `${petal.left}%` }}
          initial={{ y: '-10vh', opacity: 0 }}
          animate={{
            y: ['-10vh', '110vh'],
            x: [0, petal.drift, petal.drift * -0.4, petal.drift * 0.6],
            rotate: [0, petal.spin * 0.5, petal.spin],
            rotateX: [0, 180, 360],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg width={petal.size} height={petal.size * 1.15} viewBox="0 0 20 23">
            <defs>
              <radialGradient id={`petal-${petal.id}`} cx="35%" cy="30%" r="80%">
                <stop offset="0%" stopColor={petal.shade[0]} />
                <stop offset="100%" stopColor={petal.shade[1]} />
              </radialGradient>
            </defs>
            <path
              d="M10 1 C 16 3, 20 10, 17 17 C 15 21, 11 22.5, 10 22.5 C 9 22.5, 5 21, 3 17 C 0 10, 4 3, 10 1 Z"
              fill={`url(#petal-${petal.id})`}
            />
            <path d="M10 4 C 9 10, 9.5 16, 10 21" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" fill="none" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
