import FadeIn from './ui/FadeIn'
import { SKILLS } from '../data/skills'

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 md:py-36 rounded-t-[40px] sm:rounded-t-[50px]"
      style={{ background: '#ffffff' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 160px)', lineHeight: 1 }}
        >
          What I Build
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SKILLS.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.1} y={20}>
            <div
              className="flex gap-6 sm:gap-8 md:gap-12 items-start py-8 sm:py-10 md:py-12"
              style={{ borderTop: i === 0 ? '1px solid rgba(12,12,12,0.15)' : undefined, borderBottom: '1px solid rgba(12,12,12,0.15)' }}
            >
              <span
                className="font-black shrink-0 leading-none hidden sm:block"
                style={{ color: '#0C0C0C', fontSize: 'clamp(2rem, 6vw, 80px)', opacity: 0.15 }}
              >
                {s.num}
              </span>
              <div className="flex flex-col gap-2 pt-1">
                <h3
                  className="font-medium uppercase"
                  style={{ color: '#0C0C0C', fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {s.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{ color: '#0C0C0C', opacity: 0.6, fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
