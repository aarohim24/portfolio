import FadeIn from './ui/FadeIn'
import { EXPERIENCES } from '../data/experience'


export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24"
      style={{ background: '#C5E0E6' }}
    >
      <div className="max-w-6xl mx-auto">

        <FadeIn delay={0} y={40} className="mb-12 sm:mb-16 md:mb-20">

          <h2
            className="hero-heading font-black italic leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 140px)', fontFamily: '"Playfair Display", serif' }}
          >
            Experience
          </h2>
        </FadeIn>

        <div className="flex flex-col">
          {EXPERIENCES.map((exp, i) => (
            <FadeIn key={exp.num} delay={i * 0.1} y={20}>
              <div
                className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-12 lg:gap-16 items-start py-9 sm:py-12"
                style={{
                  borderTop: i === 0 ? '1px solid #A8CDD5' : undefined,
                  borderBottom: '1px solid #A8CDD5',
                }}
              >
                {/* Number — hidden on mobile */}
                <span
                  className="font-black leading-none hidden md:block shrink-0"
                  style={{ fontSize: 'clamp(2rem, 4vw, 56px)', color: '#9BC0C9', minWidth: '2ch' }}
                >
                  {exp.num}
                </span>

                {/* Content */}
                <div>
                  {/* Role + company */}
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-3">
                    <h3
                      className="font-black uppercase"
                      style={{ color: '#4A2B17', fontSize: 'clamp(0.95rem, 2vw, 1.65rem)' }}
                    >
                      {exp.role}
                    </h3>
                    <span
                      className="font-medium"
                      style={{ color: exp.accent, fontSize: 'clamp(0.82rem, 1.3vw, 1.05rem)' }}
                    >
                      @ {exp.company}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    <span
                      className="terminal-font text-xs px-2.5 py-[3px] rounded-full uppercase tracking-wider"
                      style={{ background: `${exp.accent}18`, color: exp.accent, border: `1px solid ${exp.accent}28` }}
                    >
                      {exp.type}
                    </span>
                    <span className="terminal-font text-xs" style={{ color: '#8B6A55' }}>
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullets */}
                  {exp.bullets.length > 0 && (
                  <ul className="flex flex-col gap-2.5">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 items-start">
                        <span
                          className="shrink-0 rounded-full mt-[7px]"
                          style={{ width: '5px', height: '5px', background: exp.accent, opacity: 0.7 }}
                        />
                        <span
                          className="font-light leading-relaxed"
                          style={{ color: '#6B4730', fontSize: 'clamp(0.82rem, 1.2vw, 0.97rem)' }}
                        >
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
