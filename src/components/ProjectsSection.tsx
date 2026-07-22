import FadeIn from './ui/FadeIn'
import { PROJECTS } from '../data/projects'

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14"
      style={{ background: '#C5E0E6', position: 'relative', zIndex: 10 }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={40} className="mb-12 sm:mb-16 md:mb-20">
          <h2
            className="hero-heading font-black italic leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 140px)', fontFamily: '"Playfair Display", serif' }}
          >
            Projects
          </h2>
        </FadeIn>

        <div className="flex flex-col">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.num} delay={i * 0.08} y={20}>
              <div
                className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-10 lg:gap-16 items-start py-8 sm:py-10"
                style={{
                  borderTop: i === 0 ? '1px solid #A8CDD5' : undefined,
                  borderBottom: '1px solid #A8CDD5',
                }}
              >
                {/* Number */}
                <span
                  className="font-black leading-none hidden md:block shrink-0"
                  style={{ fontSize: 'clamp(2rem, 4vw, 56px)', color: '#9BC0C9', minWidth: '2ch' }}
                >
                  {p.num}
                </span>

                {/* Content */}
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                    <h3
                      className="font-black uppercase"
                      style={{ color: '#4A2B17', fontSize: 'clamp(1rem, 2.2vw, 1.8rem)' }}
                    >
                      {p.name}
                    </h3>
                    <span
                      className="terminal-font text-xs uppercase tracking-widest"
                      style={{ color: p.accentColor }}
                    >
                      {p.category}
                    </span>
                  </div>

                  <p
                    className="font-light leading-relaxed mb-4 max-w-2xl"
                    style={{ color: '#6B4730', fontSize: 'clamp(0.82rem, 1.2vw, 0.97rem)' }}
                  >
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="terminal-font text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: `${p.accentColor}15`,
                          color: p.accentColor,
                          border: `1px solid ${p.accentColor}30`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Date + Link */}
                <div className="flex md:flex-col items-start md:items-end gap-3 md:gap-2 shrink-0">
                  <span className="terminal-font text-xs" style={{ color: '#8B6A55' }}>
                    {p.date}
                  </span>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${p.name} project`}
                    className="rounded-full px-4 py-1.5 font-medium uppercase tracking-widest text-xs transition-all hover:bg-[#6B4730]/10"
                    style={{ border: '1.5px solid #7D99A360', color: '#4A2B17' }}
                  >
                    View →
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
