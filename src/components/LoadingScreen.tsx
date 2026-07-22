import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { EASE, NAME_LINE1, NAME_LINE2 } from '../lib/constants'

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
        background: '#C5E0E6',
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
          fontFamily: 'Fira Code, monospace',
          fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#8B6A55',
        }}
      >
        Portfolio
      </motion.div>

      {/* ── Name — word-level reveal (script font needs room) ────── */}
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
        <div style={{ overflow: 'hidden', paddingTop: '0.3em', paddingBottom: '0.1em' }}>
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            style={{
              fontFamily: '"Pinyon Script", cursive',
              fontWeight: 400,
              fontSize: 'clamp(3.5rem, 11vw, 10rem)',
              color: '#4A2B17',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
            }}
          >
            {NAME_LINE1.join('')}
          </motion.div>
        </div>

        {/* Line 2 — Mathur */}
        <div style={{ overflow: 'hidden', paddingTop: '0.05em', paddingBottom: '0.3em' }}>
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            style={{
              fontFamily: '"Pinyon Script", cursive',
              fontWeight: 400,
              fontSize: 'clamp(3.5rem, 11vw, 10rem)',
              color: '#4A2B17',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
            }}
          >
            {NAME_LINE2.join('')}
          </motion.div>
        </div>

        {/* Sub-label — AI Engineer */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
          style={{
            marginTop: 'clamp(0.75rem, 2vw, 1.5rem)',
            fontFamily: 'Fira Code, monospace',
            fontSize: 'clamp(0.6rem, 1vw, 0.8rem)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#8B6A55',
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
          fontFamily: 'Fraunces, serif',
          fontSize: 'clamp(3.5rem, 10vw, 8rem)',
          color: 'rgba(81,50,41,0.1)',
          fontVariationSettings: '"opsz" 144',
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
          background: 'rgba(203,176,147,0.3)',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            transformOrigin: 'left',
            scaleX: progress / 100,
            background: 'linear-gradient(90deg, #7D99A3 0%, #7D99A3 100%)',
            boxShadow: '0 0 8px rgba(161,181,168,0.3)',
          }}
          transition={{ duration: 0.05, ease: 'linear' }}
        />
      </div>
    </motion.div>
  )
}
