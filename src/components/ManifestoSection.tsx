import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { EASE } from '../lib/constants'

const TAGS = [
  '/ships before the deck is ready',
  '/reads papers on weekends',
  '/thinks in systems',
  '/builds with intention',
  '/production-first mindset',
]

export default function ManifestoSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Slow horizontal drift on the tag ticker as you scroll
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])

  return (
    <section
      ref={ref}
      className="px-5 sm:px-8 md:px-12 lg:px-16 py-24 sm:py-32 md:py-44 overflow-hidden"
      style={{ background: '#C5E0E6' }}
    >
      {/* ── Statement ── */}
      <div className="max-w-6xl mx-auto mb-14 sm:mb-20">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-light leading-[1.15]"
          style={{
            color: '#4A2B17',
            fontSize: 'clamp(1.6rem, 4.2vw, 4.2rem)',
            maxWidth: '950px',
          }}
        >
          I build AI systems that{' '}
          <em
            style={{
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontWeight: 900,
              color: '#6B4730',
            }}
          >
            actually ship
          </em>
          {' '}— measurable, production-ready, and designed to scale beyond the demo.
        </motion.p>
      </div>

      {/* ── Scrolling /slash tags ticker ── */}
      <motion.div
        style={{ x }}
        className="flex gap-6 sm:gap-10 whitespace-nowrap select-none"
        aria-hidden
      >
        {[...TAGS, ...TAGS].map((tag, i) => (
          <span
            key={i}
            className="terminal-font shrink-0"
            style={{
              color: '#7D99A3',
              fontSize: 'clamp(0.7rem, 1vw, 0.9rem)',
              letterSpacing: '0.08em',
              opacity: 0.9,
            }}
          >
            {tag}
            <span style={{ marginLeft: '2.5rem', opacity: 0.35 }}>·</span>
          </span>
        ))}
      </motion.div>
    </section>
  )
}
