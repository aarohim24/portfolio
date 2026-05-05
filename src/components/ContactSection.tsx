import React from 'react'
import FadeIn from './ui/FadeIn'

const LINKS = [
  { label: 'Email', value: 'Aarohiwork24@gmail.com', href: 'mailto:Aarohiwork24@gmail.com' },
  { label: 'GitHub', value: 'github.com/aarohim24', href: 'https://github.com/aarohim24' },
  { label: 'LinkedIn', value: 'linkedin.com/in/mathur-aarohi', href: 'https://www.linkedin.com/in/mathur-aarohi' },
  { label: 'CodeChef', value: 'aarohim024 · 3★', href: 'https://www.codechef.com/users/aarohim024' },
]

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 md:py-36"
      style={{ background: '#0C0C0C' }}
    >
      <div className="max-w-4xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight mb-12 sm:mb-16"
            style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}
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
                className="flex flex-col gap-1 p-6 rounded-2xl transition-all hover:border-[#4ade80]/40 hover:-translate-y-1 group"
                style={{ background: '#111', border: '1px solid #2a2a2a' }}
              >
                <span className="terminal-font text-xs uppercase tracking-widest" style={{ color: '#555' }}>{l.label}</span>
                <span className="font-medium group-hover:text-[#4ade80] transition-colors" style={{ color: '#D7E2EA', fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)' }}>{l.value}</span>
              </a>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4} y={20} className="mt-16 pt-8" style={{ borderTop: '1px solid #1a1a1a' } as React.CSSProperties}>
          <div className="flex justify-between items-center">
            <p className="terminal-font text-xs" style={{ color: '#333' }}>© 2025 Aarohi Mathur</p>
            <p className="terminal-font text-xs" style={{ color: '#333' }}>UPES Dehradun · AI/ML · Expected 2027</p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
