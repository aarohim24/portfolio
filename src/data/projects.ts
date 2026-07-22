export interface Project {
  num: string
  category: string
  name: string
  date: string
  description: string
  tech: string[]
  link: string
  accentColor: string
}

export const PROJECTS: Project[] = [
  {
    num: '01',
    category: 'Full-Stack · PWA',
    name: 'Mosaic',
    date: 'Nov 2025',
    description:
      'Campus-wide PWA — marketplace, carpooling, alumni network. 300+ users onboarded in 24 hours, zero downtime. Multi-tenant PostgreSQL with Supabase RLS-enforced RBAC, GitHub Actions CI/CD.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'GitHub Actions'],
    link: 'https://social-sandy-psi.vercel.app',
    accentColor: '#7D99A3',
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
    accentColor: '#5B8A9E',
  },
  {
    num: '03',
    category: 'AI · Data Platform',
    name: 'AutoInsight',
    date: 'Jan 2026',
    description:
      'AI analytics platform — upload CSV up to 50MB, query in natural language, get 4 viz types and LLM-generated insights across 7 REST endpoints. 83% test coverage, Docker + GitHub Actions CI/CD.',
    tech: ['Python', 'FastAPI', 'NumPy', 'PostgreSQL', 'Docker'],
    link: 'https://autoinsight-peach.vercel.app/',
    accentColor: '#6B8FA3',
  },
  {
    num: '04',
    category: 'Web · Campus Directory',
    name: 'FoodieSpot',
    date: 'Jun 2025',
    description:
      '2,600+ active users · 33K interactions in 30 days (Google Analytics). 40+ food outlet listings with category filtering — serving students with local caterers unlisted on Swiggy/Zomato.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    link: 'https://foodie-spot.netlify.app/',
    accentColor: '#6B4730',
  },
]
