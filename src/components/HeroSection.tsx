import { motion } from 'framer-motion'
import ContactButton from './ui/ContactButton'

const NAV_LINKS = ['about', 'experience', 'skills', 'projects']
const EASE = [0.22, 1, 0.36, 1] as const
const LINE1 = 'Aarohi'.split('')
const LINE2 = 'Mathur'.split('')

export default function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="min-h-screen flex flex-col" style={{ overflowX: 'clip' }}>

      {/* ── Nav ── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        className="flex justify-between items-center px-5 sm:px-8 md:px-12 pt-6 md:pt-8 shrink-0"
      >
        {NAV_LINKS.map(item => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            className="text-xs sm:text-sm md:text-base font-medium uppercase tracking-wider transition-opacity hover:opacity-60"
            style={{ color: '#D7E2EA' }}
          >
            {item}
          </button>
        ))}
      </motion.nav>

      {/* ── Names — letter-by-letter clip-mask reveal ── */}
      <div className="flex-1 flex flex-col justify-center">

        {/* AAROHI — inset */}
        <div className="flex px-4 sm:px-6 md:px-10" style={{ overflow: 'hidden' }}>
          {LINE1.map((char, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 0.9 }}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.85, delay: 0.1 + i * 0.06, ease: EASE }}
                className="hero-heading font-black uppercase"
                style={{
                  display: 'inline-block',
                  fontSize: 'clamp(3rem, 18vw, 18vw)',
                  lineHeight: 0.88,
                  letterSpacing: '-0.01em',
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </div>

        {/* MATHUR — full bleed */}
        <div className="flex" style={{ overflow: 'hidden', width: '100vw' }}>
          {LINE2.map((char, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 0.9 }}>
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.85, delay: 0.42 + i * 0.06, ease: EASE }}
                className="hero-heading font-black uppercase"
                style={{
                  display: 'inline-block',
                  fontSize: 'clamp(3rem, 20.5vw, 20.5vw)',
                  lineHeight: 0.88,
                  letterSpacing: '-0.01em',
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
        className="flex justify-between items-end px-5 sm:px-8 md:px-12 pb-8 sm:pb-10 md:pb-12 shrink-0"
      >
        <p
          className="font-light uppercase tracking-wide leading-snug"
          style={{
            color: '#D7E2EA',
            fontSize: 'clamp(0.6rem, 1.1vw, 0.95rem)',
            maxWidth: 'clamp(140px, 18vw, 240px)',
          }}
        >
          Building AI systems that are intelligent, impactful &amp; production-ready.
        </p>
        <ContactButton />
      </motion.div>

    </section>
  )
}
