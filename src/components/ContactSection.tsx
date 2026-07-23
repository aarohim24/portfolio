import FadeIn from './ui/FadeIn'
import { CONTACT_EMAIL, CONTACT_GITHUB, CONTACT_LINKEDIN, CONTACT_CODECHEF } from '../lib/constants'
import ContactFloral from './ContactFloral'

const LINKS = [
  { label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'GitHub', value: 'github.com/aarohim24', href: CONTACT_GITHUB },
  { label: 'LinkedIn', value: 'linkedin.com/in/mathur-aarohi', href: CONTACT_LINKEDIN },
  { label: 'CodeChef', value: 'aarohim024 · 3★', href: CONTACT_CODECHEF },
]

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 md:py-36"
      style={{ background: '#C5E0E6', position: 'relative', overflow: 'hidden' }}
    >
      <ContactFloral />
      <div className="max-w-4xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black italic leading-none tracking-tight mb-12 sm:mb-16"
            style={{ fontSize: 'clamp(3rem, 10vw, 120px)', fontFamily: '"Playfair Display", serif' }}
          >
            Let&apos;s Connect
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LINKS.map((l, i) => (
            <FadeIn key={l.label} delay={i * 0.1} y={20}>
              <a
                href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={`${l.label}: ${l.value}`}
                className="flex flex-col gap-1 p-6 rounded-2xl transition-all hover:border-[#7D99A3]/60 hover:-translate-y-1 group"
                style={{ background: '#D4E8ED', border: '1px solid #9BC0C9' }}
              >
                <span className="terminal-font text-xs uppercase tracking-widest" style={{ color: '#8B6A55' }}>{l.label}</span>
                <span className="font-medium group-hover:text-[#7D99A3] transition-colors" style={{ color: '#4A2B17', fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)' }}>{l.value}</span>
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4} y={20} className="mt-16 pt-8" style={{ borderTop: '1px solid #A8CDD5' }}>
          <div className="flex justify-between items-center">
            <p className="terminal-font text-xs" style={{ color: '#8B6A55' }}>© 2026 Aarohi Mathur</p>
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
