import AnimatedText from './ui/AnimatedText'
import FadeIn from './ui/FadeIn'
import ContactButton from './ui/ContactButton'
import { ABOUT_TEXT, STATS, HIGHLIGHTS } from '../data/about'

export default function AboutSection() {
  return (
    <section
      id="about"
      className="px-5 sm:px-8 md:px-12 lg:px-16 py-14 sm:py-24 md:py-36"
      style={{ background: '#C5E0E6', overflowX: 'hidden' }}
    >
      <div className="max-w-6xl mx-auto w-full">

        {/* Heading */}
        <FadeIn delay={0} y={40} className="mb-12 sm:mb-16 md:mb-20">

          <h2
            className="hero-heading font-black italic leading-none tracking-tight"
            style={{
              fontSize: 'clamp(2.4rem, 9vw, 140px)',
              fontFamily: '"Playfair Display", serif',
              wordBreak: 'break-word',
              width: '100%',
            }}
          >
            About Me
          </h2>
        </FadeIn>

        {/* Animated paragraph */}
        <div className="mb-10 sm:mb-14" style={{ width: '100%', maxWidth: '860px' }}>
          <AnimatedText
            text={ABOUT_TEXT}
            className="font-medium leading-relaxed"
            style={{
              color: '#4A2B17',
              fontSize: 'clamp(0.875rem, 3.5vw, 1.35rem)',
              width: '100%',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          />
        </div>

        {/* Stats — 3 cols */}
        <FadeIn delay={0.1} y={20} className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl"
                style={{ background: '#D4E8ED', border: '1px dashed #9BC0C9' }}
              >
                <span
                  className="font-black leading-none"
                  style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', color: '#4A2B17' }}
                >
                  {s.value}
                </span>
                <span
                  className="font-medium uppercase tracking-wider"
                  style={{ color: '#6B4730', fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)' }}
                >
                  {s.label}
                </span>
                <span
                  className="terminal-font leading-snug"
                  style={{ color: '#8B6A55', fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)' }}
                >
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Botanical divider */}
        <div className="mb-8 sm:mb-10" style={{ borderTop: "1px dashed #A8CDD5" }} />

        {/* Recognition label */}
        <FadeIn delay={0.15} y={0}>
          <p className="terminal-font text-xs uppercase tracking-[0.2em] mb-5" style={{ color: '#8B6A55' }}>
            Recognition &amp; Leadership
          </p>
        </FadeIn>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {HIGHLIGHTS.map((h, i) => (
            <FadeIn key={h.title} delay={0.05 + i * 0.07} y={20}>
              <div
                className="flex flex-col gap-2 p-4 sm:p-5 rounded-2xl h-full transition-transform hover:-translate-y-0.5"
                style={{ background: '#D4E8ED', border: '1px dashed #9BC0C9' }}
              >
                <p
                  className="font-semibold leading-snug"
                  style={{ color: '#4A2B17', fontSize: 'clamp(0.82rem, 1.1vw, 0.92rem)' }}
                >
                  {h.title}
                </p>
                <p
                  className="terminal-font leading-relaxed"
                  style={{ color: '#8B6A55', fontSize: '0.7rem' }}
                >
                  {h.detail}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.3} y={20}>
          <ContactButton />
        </FadeIn>

      </div>
    </section>
  )
}
