import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const
const LINE1 = 'Aarohi'.split('')
const LINE2 = 'Mathur'.split('')

interface Props {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // ── Counter 0 → 100 over 2700ms, then fire onComplete ─────────
  useEffect(() => {
    const DURATION = 2700
    let start: number | null = null
    let raf: number

    const step = (ts: number) => {
      if (!start) start = ts
      const elapsed = ts - start
      const p = Math.min((elapsed / DURATION) * 100, 100)
      setProgress(p)
      if (p < 100) {
        raf = requestAnimationFrame(step)
      } else {
        setTimeout(() => onCompleteRef.current(), 400)
      }
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      key="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0a0a0a',
        overflow: 'hidden',
      }}
    >
      {/* ── "Portfolio" — top left ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        style={{
          position: 'absolute',
          top: 'clamp(1.5rem, 4vw, 3rem)',
          left: 'clamp(1.5rem, 4vw, 3rem)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#555',
        }}
      >
        Portfolio
      </motion.div>

      {/* ── Name — letter-by-letter clip-mask reveal ──────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingLeft: 'clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        {/* Line 1 — Aarohi */}
        <div style={{ display: 'flex', overflow: 'hidden', lineHeight: 0.85 }}>
          {LINE1.map((char, i) => (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 0.95 }}
            >
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.75,
                  delay: 0.15 + i * 0.055,
                  ease: EASE,
                }}
                style={{
                  display: 'inline-block',
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(3.5rem, 12vw, 11rem)',
                  color: '#f5f5f5',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </div>

        {/* Line 2 — Mathur */}
        <div style={{ display: 'flex', overflow: 'hidden', lineHeight: 0.85 }}>
          {LINE2.map((char, i) => (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 0.95 }}
            >
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{
                  duration: 0.75,
                  delay: 0.5 + i * 0.055,
                  ease: EASE,
                }}
                style={{
                  display: 'inline-block',
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(3.5rem, 12vw, 11rem)',
                  color: '#f5f5f5',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </div>

        {/* Sub-label — AI Engineer */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
          style={{
            marginTop: 'clamp(0.75rem, 2vw, 1.5rem)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 'clamp(0.6rem, 1vw, 0.8rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#555',
          }}
        >
          AI Engineer · Full-Stack Developer · IEEE Published
        </motion.p>
      </div>

      {/* ── Counter — bottom right ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 4vw, 3rem)',
          right: 'clamp(1.5rem, 4vw, 3rem)',
          fontFamily: '"Instrument Serif", serif',
          fontSize: 'clamp(3.5rem, 10vw, 8rem)',
          color: 'rgba(245,245,245,0.15)',
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        {Math.round(progress).toString().padStart(3, '0')}
      </motion.div>

      {/* ── Progress bar — bottom edge ─────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'rgba(31,31,31,0.6)',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            transformOrigin: 'left',
            scaleX: progress / 100,
            background: 'linear-gradient(90deg, #646973 0%, #BBCCD7 100%)',
            boxShadow: '0 0 8px rgba(187,204,215,0.3)',
          }}
          transition={{ duration: 0.05, ease: 'linear' }}
        />
      </div>
    </motion.div>
  )
}
