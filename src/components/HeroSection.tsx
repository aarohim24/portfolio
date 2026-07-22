import { useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import ContactButton from './ui/ContactButton'
import { EASE, NAME_LINE1, NAME_LINE2 } from '../lib/constants'

const NAV_LINKS = ['about', 'experience', 'skills', 'projects'] as const

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const dotLayerRef = useRef<HTMLDivElement>(null)
  const rafRef      = useRef<number>(0)
  const targetPos   = useRef({ x: 50, y: -120 })
  const currentPos  = useRef({ x: 50, y: -120 })

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const fullName = NAME_LINE1.join('') + ' ' + NAME_LINE2.join('')

  // Lerp loop — updates --mx/--my on the dot layer each frame
  const startLerp = useCallback(() => {
    if (rafRef.current) return
    const LERP = 0.10
    const tick = () => {
      const cx = currentPos.current.x + (targetPos.current.x - currentPos.current.x) * LERP
      const cy = currentPos.current.y + (targetPos.current.y - currentPos.current.y) * LERP
      currentPos.current = { x: cx, y: cy }
      const el = dotLayerRef.current
      if (el) {
        el.style.setProperty('--mx', `${cx}%`)
        el.style.setProperty('--my', `${cy}%`)
      }
      const settled = Math.abs(targetPos.current.x - cx) < 0.04
                   && Math.abs(targetPos.current.y - cy) < 0.04
      rafRef.current = settled ? 0 : requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  // Native event listeners — bypass any framer-motion synthetic event quirks
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      targetPos.current = {
        x: ((e.clientX - rect.left) / rect.width)  * 100,
        y: ((e.clientY - rect.top)  / rect.height) * 100,
      }
      startLerp()
    }

    const onLeave = () => {
      // Lerp the spotlight back off-screen on leave
      targetPos.current = { x: currentPos.current.x, y: -120 }
      startLerp()
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [startLerp])

  return (
    <motion.section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative min-h-screen flex flex-col"
      style={{ overflowX: 'clip', background: '#C5E0E6' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: EASE }}
    >

      {/* ── Dot-grid overlay — pointer-events:none, masked to cursor spotlight ── */}
      <div ref={dotLayerRef} className="hero-dot-grid" aria-hidden="true" />

      {/* ── Nav ── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        className="relative z-10 flex justify-between items-center px-5 sm:px-8 md:px-12 pt-6 md:pt-8 shrink-0"
      >
        {NAV_LINKS.map(item => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            aria-label={`Navigate to ${item} section`}
            className="text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider transition-opacity hover:opacity-60"
            style={{ color: '#4A2B17' }}
          >
            {item}
          </button>
        ))}
      </motion.nav>

      {/* ── Name — single line, centered ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <div
          style={{
            overflow: 'hidden',
            width: '100%',
            textAlign: 'center',
            paddingTop: '0.3em',
            paddingBottom: '0.25em',
          }}
        >
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
            className="hero-heading"
            style={{
              fontFamily: '"Pinyon Script", cursive',
              fontSize: 'clamp(2.5rem, 10.5vw, 12rem)',
              lineHeight: 1.15,
              letterSpacing: '0.02em',
              fontWeight: 400,
              display: 'block',
              whiteSpace: 'nowrap',
            }}
          >
            {fullName}
          </motion.div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
        className="relative z-10 flex justify-between items-end px-5 sm:px-8 md:px-12 pb-8 sm:pb-10 md:pb-12 shrink-0"
      >
        <p
          className="font-light uppercase tracking-wide leading-snug"
          style={{
            color: '#6B4730',
            fontSize: 'clamp(0.6rem, 1.1vw, 0.95rem)',
            maxWidth: 'clamp(140px, 18vw, 240px)',
          }}
        >
          Building AI systems that are intelligent, impactful &amp; production-ready.
        </p>
        <ContactButton />
      </motion.div>

    </motion.section>
  )
}
