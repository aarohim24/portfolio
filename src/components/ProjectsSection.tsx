import FadeIn from './ui/FadeIn'

interface Project {
  num: string
  category: string
  name: string
  date: string
  description: string
  tech: string[]
  link: string
  accentColor: string
}

const PROJECTS: Project[] = [
  {
    num: '01',
    category: 'AI · Data Platform',
    name: 'AutoInsight',
    date: 'Jan 2026',
    description:
      'AI analytics platform — upload CSV up to 50MB, query in natural language, get 4 viz types and LLM-generated insights across 7 REST endpoints. 83% test coverage, Docker + GitHub Actions CI/CD.',
    tech: ['Python', 'FastAPI', 'NumPy', 'PostgreSQL', 'Docker'],
    link: 'https://autoinsight-peach.vercel.app/',
    accentColor: '#4ade80',
  },
  {
    num: '02',
    category: 'RAG · Interview System',
    name: 'SmartPrep AI',
    date: 'Sep 2025',
    description:
      'FAISS-indexed RAG pipeline grounding Llama 3.3 across 4 interview question types. Sub-5ms retrieval post warm-up. LLM-guided scoring (0–10 per answer). Deployed on Vercel + Railway.',
    tech: ['React', 'FastAPI', 'FAISS', 'Llama 3.3', 'Railway'],
    link: 'https://smartprep-ai-ten.vercel.app/',
    accentColor: '#60a5fa',
  },
  {
    num: '03',
    category: 'Web · Campus Directory',
    name: 'FoodieSpot',
    date: 'Jun 2025',
    description:
      '2,600+ active users · 33K interactions in 30 days (Google Analytics). 40+ food outlet listings with category filtering — serving students with local caterers unlisted on Swiggy/Zomato.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    link: 'https://foodie-spot.netlify.app/',
    accentColor: '#f97316',
  },
  {
    num: '04',
    category: 'Full-Stack · PWA',
    name: 'UPES Social',
    date: 'Nov 2025',
    description:
      'Campus-wide PWA — marketplace, carpooling, alumni network. 300+ users onboarded in 24 hours, zero downtime. Multi-tenant PostgreSQL with Supabase RLS-enforced RBAC, GitHub Actions CI/CD.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'GitHub Actions'],
    link: 'https://social-sandy-psi.vercel.app',
    accentColor: '#a78bfa',
  },
]

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14"
      style={{ background: '#0C0C0C', position: 'relative', zIndex: 10 }}
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={40} className="mb-12 sm:mb-16 md:mb-20">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 140px)' }}
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
                  borderTop: i === 0 ? '1px solid #1a1a1a' : undefined,
                  borderBottom: '1px solid #1a1a1a',
                }}
              >
                {/* Number */}
                <span
                  className="font-black leading-none hidden md:block shrink-0"
                  style={{ fontSize: 'clamp(2rem, 4vw, 56px)', color: '#1e1e1e', minWidth: '2ch' }}
                >
                  {p.num}
                </span>

                {/* Content */}
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                    <h3
                      className="font-black uppercase"
                      style={{ color: '#D7E2EA', fontSize: 'clamp(1rem, 2.2vw, 1.8rem)' }}
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
                    style={{ color: '#777', fontSize: 'clamp(0.82rem, 1.2vw, 0.97rem)' }}
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
                  <span className="terminal-font text-xs" style={{ color: '#3a3a3a' }}>
                    {p.date}
                  </span>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-4 py-1.5 font-medium uppercase tracking-widest text-xs transition-all hover:bg-[#D7E2EA]/10"
                    style={{ border: '1.5px solid #D7E2EA30', color: '#D7E2EA' }}
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
