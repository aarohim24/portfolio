export const ABOUT_TEXT =
  'B.Tech CSE (AI/ML) student at UPES Dehradun with proven experience shipping production-grade systems across full-stack development, RAG pipelines, and cloud-deployed AI — serving 2,600+ users across platforms with zero critical defects at release and an IEEE-published research contribution.'

export interface Stat {
  value: string
  label: string
  sub: string
}

export const STATS: Stat[] = [
  { value: 'Top 10', label: 'GenAI Hackathon', sub: '250,000+ global participants' },
  { value: 'IEEE', label: 'Published', sub: 'ETIS-2025 · Energy-efficient ML' },
  { value: '2.6K+', label: 'Active Users', sub: 'Across live deployed products' },
]

export interface Highlight {
  icon: string
  title: string
  detail: string
  accent: string
}

export const HIGHLIGHTS: Highlight[] = [
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
