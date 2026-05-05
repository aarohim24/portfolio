import { useEffect, useRef, useState } from 'react'

const ROW1 = ['Python', 'FastAPI', 'React', 'Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'RAG', 'LlamaIndex', 'FAISS', 'TensorFlow', 'GitHub Actions', 'Supabase', 'Redis']
const ROW2 = ['CI/CD', 'REST APIs', 'Node.js', 'scikit-learn', 'NumPy', 'Vercel', 'Railway', 'C++', 'Java', 'Linux', 'Pandas', 'PyTorch', 'OpenAI API', 'HuggingFace', 'Streamlit']

function Tag({ label }: { label: string }) {
  return (
    <div
      className="terminal-font shrink-0 px-5 py-2.5 rounded-full whitespace-nowrap"
      style={{ border: '1px solid #2a2a2a', color: '#888', fontSize: '0.82rem', background: '#111' }}
    >
      {label}
    </div>
  )
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(200)

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY
      const val = (window.scrollY - top + window.innerHeight) * 0.3
      setOffset(val)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const triple = <T,>(arr: T[]) => [...arr, ...arr, ...arr]

  return (
    <section ref={sectionRef} className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden" style={{ background: '#0C0C0C' }}>
      {/* Row 1: moves right */}
      <div className="flex gap-3 mb-3" style={{ transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}>
        {triple(ROW1).map((t, i) => <Tag key={i} label={t} />)}
      </div>
      {/* Row 2: moves left */}
      <div className="flex gap-3" style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}>
        {triple(ROW2).map((t, i) => <Tag key={i} label={t} />)}
      </div>
    </section>
  )
}
