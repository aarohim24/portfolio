export interface ExperienceEntry {
  num: string
  role: string
  company: string
  period: string
  type: string
  bullets: string[]
  accent: string
}

export const EXPERIENCES: ExperienceEntry[] = [
  {
    num: '01',
    role: 'Founder & Full-Stack Developer',
    company: 'Mosaic',
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
