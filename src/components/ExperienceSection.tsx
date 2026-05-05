import FadeIn from './ui/FadeIn'

const EXPERIENCES = [
  {
    num: '01',
    role: 'Founder & Full-Stack Developer',
    company: 'UPES Social',
    period: 'Nov 2025 – Present',
    type: 'Live Platform',
    bullets: [
      'Founded and built a campus-wide PWA from scratch — marketplace, carpooling, and alumni network — currently live with 300+ users onboarded within 24 hours of launch and zero downtime.',
      'Designed a multi-tenant PostgreSQL schema with Supabase RLS-enforced RBAC across 3 user roles, eliminating cross-tenant data exposure.',
      'Integrated GitHub Actions CI with type checking, linting, and build validation on every commit — preventing broken deployments from reaching active users.',
    ],
    accent: '#a78bfa',
  },
  {
    num: '02',
    role: 'Creator & Sole Developer',
    company: 'FoodieSpot',
    period: 'Jun 2025 – Present',
    type: 'Live · 2,600+ Users',
    bullets: [
      'Conceived and shipped a campus food discovery platform indexing 40+ local outlets, filling a gap left by Swiggy/Zomato for unlisted campus caterers near UPES.',
      'Reached 2,600+ active users and 33K+ interactions in the first 30 days, tracked organically via Google Analytics.',
    ],
    accent: '#f97316',
  },
  {
    num: '03',
    role: 'Web Development Intern',
    company: 'Picraft Technology Pvt. Ltd.',
    period: 'Jun 2025 – Jul 2025',
    type: 'Internship',
    bullets: [
      'Delivered a production-grade React application integrated with REST APIs within a 6-week deadline — zero high-severity defects, earning client sign-off on first review.',
      'Built reusable UI components with React, JavaScript, HTML, and CSS following a component-driven architecture.',
    ],
    accent: '#4ade80',
  },
]

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24"
      style={{ background: '#0C0C0C' }}
    >
      <div className="max-w-6xl mx-auto">

        <FadeIn delay={0} y={40} className="mb-12 sm:mb-16 md:mb-20">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 140px)' }}
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
                  borderTop: i === 0 ? '1px solid #1a1a1a' : undefined,
                  borderBottom: '1px solid #1a1a1a',
                }}
              >
                {/* Number — hidden on mobile */}
                <span
                  className="font-black leading-none hidden md:block shrink-0"
                  style={{ fontSize: 'clamp(2rem, 4vw, 56px)', color: '#1e1e1e', minWidth: '2ch' }}
                >
                  {exp.num}
                </span>

                {/* Content */}
                <div>
                  {/* Role + company */}
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-3">
                    <h3
                      className="font-black uppercase"
                      style={{ color: '#D7E2EA', fontSize: 'clamp(0.95rem, 2vw, 1.65rem)' }}
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
                    <span className="terminal-font text-xs" style={{ color: '#3a3a3a' }}>
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="flex flex-col gap-2.5">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 items-start">
                        <span
                          className="shrink-0 rounded-full mt-[7px]"
                          style={{ width: '5px', height: '5px', background: exp.accent, opacity: 0.7 }}
                        />
                        <span
                          className="font-light leading-relaxed"
                          style={{ color: '#777', fontSize: 'clamp(0.82rem, 1.2vw, 0.97rem)' }}
                        >
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
