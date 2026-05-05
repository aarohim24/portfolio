import AnimatedText from './ui/AnimatedText'
import FadeIn from './ui/FadeIn'
import ContactButton from './ui/ContactButton'

const ABOUT_TEXT =
  "B.Tech CSE (AI/ML) student at UPES Dehradun with proven experience shipping production-grade systems across full-stack development, RAG pipelines, and cloud-deployed AI — serving 2,600+ users across platforms with zero critical defects at release and an IEEE-published research contribution."

// CGPA removed per user request — 3 stats only
const STATS = [
  { value: 'Top 10', label: 'GenAI Hackathon', sub: '250,000+ global participants' },
  { value: 'IEEE', label: 'Published', sub: 'ETIS-2025 · Energy-efficient ML' },
  { value: '2.6K+', label: 'Active Users', sub: 'Across live deployed products' },
]

const HIGHLIGHTS = [
  {
    icon: '🏆',
    title: 'Google GenAI Exchange Hackathon',
    detail: 'Top 10 Finalist · 250,000+ registrations · GenAI-based Youth Mental Wellness prototype',
    accent: '#4ade80',
  },
  {
    icon: '⭐',
    title: 'CodeChef 3★  ·  Rating 1620',
    detail: 'Competitive programmer · DSA & problem solving',
    accent: '#f97316',
  },
  {
    icon: '✏️',
    title: 'Leadership & Activities',
    detail: 'Head, Creative Team — UPES Cultural Committee (100+ volunteers) · City Head (Meta) — Share A Book India',
    accent: '#60a5fa',
  },
]

export default function AboutSection() {
  return (
    <section
      id="about"
      className="px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 md:py-36"
      style={{ background: '#0C0C0C' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <FadeIn delay={0} y={40} className="mb-12 sm:mb-16 md:mb-20">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 140px)' }}
          >
            About Me
          </h2>
        </FadeIn>

        {/* Animated paragraph */}
        <div className="mb-10 sm:mb-14">
          <AnimatedText
            text={ABOUT_TEXT}
            className="font-medium leading-relaxed"
            style={{ color: '#D7E2EA', fontSize: 'clamp(1rem, 1.9vw, 1.4rem)', maxWidth: '860px' }}
          />
        </div>

        {/* Stats — 3 cols */}
        <FadeIn delay={0.1} y={20} className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl"
                style={{ background: '#111', border: '1px solid #1e1e1e' }}
              >
                <span
                  className="font-black leading-none"
                  style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', color: '#D7E2EA' }}
                >
                  {s.value}
                </span>
                <span
                  className="font-medium uppercase tracking-wider"
                  style={{ color: '#888', fontSize: 'clamp(0.65rem, 0.9vw, 0.75rem)' }}
                >
                  {s.label}
                </span>
                <span
                  className="terminal-font leading-snug"
                  style={{ color: '#666', fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)' }}
                >
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Divider */}
        <div className="mb-8 sm:mb-10" style={{ borderTop: '1px solid #1a1a1a' }} />

        {/* Recognition label — brighter */}
        <FadeIn delay={0.15} y={0}>
          <p className="terminal-font text-xs uppercase tracking-[0.2em] mb-5" style={{ color: '#666' }}>
            Recognition &amp; Leadership
          </p>
        </FadeIn>

        {/* Highlight cards — brighter body text */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {HIGHLIGHTS.map((h, i) => (
            <FadeIn key={h.title} delay={0.05 + i * 0.07} y={20}>
              <div
                className="flex gap-3 items-start p-4 sm:p-5 rounded-2xl h-full transition-transform hover:-translate-y-0.5"
                style={{ background: '#111', border: '1px solid #1e1e1e' }}
              >
                <span className="text-lg sm:text-xl mt-0.5 shrink-0">{h.icon}</span>
                <div>
                  <p
                    className="font-semibold leading-snug mb-1.5"
                    style={{ color: '#D7E2EA', fontSize: 'clamp(0.82rem, 1.1vw, 0.92rem)' }}
                  >
                    {h.title}
                  </p>
                  <p
                    className="terminal-font leading-relaxed"
                    style={{ color: '#777', fontSize: '0.7rem' }}
                  >
                    {h.detail}
                  </p>
                </div>
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
