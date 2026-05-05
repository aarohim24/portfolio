import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
    link: 'https://github.com/aarohim24',
    accentColor: '#a78bfa',
  },
]

// ── Single card with correct sticky+scale stacking ──────────────────────────
function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  // useScroll targets the 85vh container
  // offset: ['start start', 'end start'] → progress goes 0→1 as the container
  // scrolls fully past the viewport top. The sticky card stays visible throughout.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Last card never scales; earlier cards scale down more
  const targetScale = 1 - (total - 1 - index) * 0.04
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <div ref={containerRef} style={{ height: '85vh' }}>
      <motion.div
        style={{
          scale,
          position: 'sticky',
          top: `${96 + index * 28}px`,
          background: '#0f0f0f',
          border: '1px solid #2a2a2a',
          borderRadius: '40px',
          overflow: 'hidden',
        }}
        className="w-full p-4 sm:p-6 md:p-8"
      >
        {/* Top row: number · category · title · date · link */}
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span
              className="font-black leading-none select-none"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 80px)', color: '#1f1f1f' }}
            >
              {project.num}
            </span>
            <div>
              <p
                className="terminal-font text-xs uppercase tracking-widest mb-0.5"
                style={{ color: project.accentColor }}
              >
                {project.category}
              </p>
              <h3
                className="font-black uppercase leading-none"
                style={{ fontSize: 'clamp(1.3rem, 3vw, 2.5rem)', color: '#D7E2EA' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="terminal-font text-xs" style={{ color: '#555' }}>
              {project.date}
            </span>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-5 py-2 font-medium uppercase tracking-widest text-xs sm:text-sm transition-all hover:bg-[#D7E2EA]/10"
              style={{ border: '1.5px solid #D7E2EA40', color: '#D7E2EA' }}
            >
              View Project
            </a>
          </div>
        </div>

        {/* Description strip */}
        <p
          className="font-light leading-relaxed mb-5 max-w-3xl"
          style={{ color: '#666', fontSize: 'clamp(0.8rem, 1.3vw, 1rem)' }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="terminal-font text-xs px-3 py-1 rounded-full"
              style={{ background: `${project.accentColor}15`, color: project.accentColor, border: `1px solid ${project.accentColor}30` }}
            >
              {t}
            </span>
          ))}
        </div>


      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24 pb-20 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14"
      style={{ background: '#0C0C0C', position: 'relative', zIndex: 10 }}
    >
      <FadeIn delay={0} y={40} className="mb-12 sm:mb-16">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <div className="max-w-6xl mx-auto">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  )
}
