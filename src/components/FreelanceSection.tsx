import FadeIn from './ui/FadeIn'
import ContactButton from './ui/ContactButton'

export default function FreelanceSection() {
  return (
    <section
      id="freelance"
      className="px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 md:py-36 rounded-t-[40px] sm:rounded-t-[50px]"
      style={{ background: '#0f0f0f' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-20">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 140px)' }}
            >
              Freelance
            </h2>
          </FadeIn>
          <FadeIn delay={0.15} y={20} className="sm:pb-2">
            <p
              className="font-light leading-relaxed max-w-xs"
              style={{ color: '#777', fontSize: 'clamp(0.82rem, 1.2vw, 0.97rem)' }}
            >
              Available for independent projects and short-term contracts.
            </p>
          </FadeIn>
        </div>

        {/* ── Featured Project: Pet So Much ── */}
        <FadeIn delay={0.1} y={20} className="mb-14 sm:mb-16">
          <p className="terminal-font text-xs uppercase tracking-[0.2em] mb-5" style={{ color: '#666' }}>
            Featured Work
          </p>
          <div
            className="rounded-3xl overflow-hidden"
            style={{ background: '#141414', border: '1px solid #1e1e1e' }}
          >
            {/* Screenshot Banner */}
            <div style={{ height: 'clamp(180px, 22vw, 280px)', overflow: 'hidden' }}>
              <img
                src="/screenshots/petsomuch-1.png"
                alt="Pet So Much website"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="terminal-font text-xs px-3 py-1 rounded-full uppercase tracking-wider"
                  style={{ background: '#a3c4a820', color: '#a3c4a8', border: '1px solid #a3c4a830' }}
                >
                  Freelance · Full Website
                </span>
                <span className="terminal-font text-xs" style={{ color: '#555' }}>Mar – Apr 2026</span>
              </div>

              <h3
                className="font-black uppercase mb-3"
                style={{ color: '#D7E2EA', fontSize: 'clamp(1.4rem, 3vw, 2.4rem)', lineHeight: 1 }}
              >
                Pet So Much
              </h3>

              <p
                className="font-light leading-relaxed mb-6"
                style={{ color: '#888', fontSize: 'clamp(0.85rem, 1.3vw, 1.02rem)', maxWidth: '600px' }}
              >
                Designed and developed a complete, multi-page website for Pet So Much — a pet wellness brand. Covers consultation booking, a services showcase, product shop, science-backed content, and a "How It Works" flow. Built with a clean, nature-inspired design system tailored to the brand's identity.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-wrap gap-2">
                  {['HTML', 'CSS', 'JavaScript', 'Responsive Design'].map(t => (
                    <span
                      key={t}
                      className="terminal-font text-xs px-2.5 py-1 rounded-full"
                      style={{ background: '#1a1a1a', color: '#777', border: '1px solid #2a2a2a' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── CTA ── */}
        <FadeIn delay={0.3} y={20} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <ContactButton label="Start a Project" href="mailto:Aarohiwork24@gmail.com" />
          <span className="terminal-font text-xs" style={{ color: '#444' }}>
            Typically responds within 24 hours
          </span>
        </FadeIn>

      </div>
    </section>
  )
}
