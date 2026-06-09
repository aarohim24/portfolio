export interface Skill {
  num: string
  name: string
  desc: string
}

export const SKILLS: Skill[] = [
  {
    num: '01',
    name: 'AI / ML Engineering',
    desc: 'RAG pipelines, LLM integrations, FAISS vector search, and ML models trained and deployed at production scale — built to be fast, cheap, and measurable.',
  },
  {
    num: '02',
    name: 'Full-Stack Development',
    desc: 'End-to-end web applications using React, Next.js, FastAPI, and PostgreSQL — from architecture through deployment, with zero high-severity defects at release.',
  },
  {
    num: '03',
    name: 'Backend & APIs',
    desc: 'Scalable REST APIs with FastAPI and Node.js, containerized via Docker, automated through GitHub Actions CI/CD, and validated with 80%+ test coverage.',
  },
  {
    num: '04',
    name: 'Data Engineering',
    desc: 'CSV ingestion pipelines, NLP preprocessing, natural language querying, and analytics dashboards that turn raw data into clear, actionable answers.',
  },
  {
    num: '05',
    name: 'Research & Publications',
    desc: 'IEEE-published research on energy-efficient ML architectures — proposing methods to reduce computational cost and improve sustainability in large-scale AI.',
  },
]
