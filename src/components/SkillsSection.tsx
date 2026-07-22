import FadeIn from './ui/FadeIn'
import { SKILLS } from '../data/skills'

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="px-5 sm:px-8 md:px-12 lg:px-16 pt-20 sm:pt-28 md:pt-36 pb-10 sm:pb-14 md:pb-16 rounded-t-[40px] sm:rounded-t-[50px]"
      style={{ background: '#D4E8ED' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="font-black italic text-center mb-16 sm:mb-20 md:mb-28"
          style={{ color: '#4A2B17', fontSize: 'clamp(3rem, 12vw, 160px)', lineHeight: 1, fontFamily: '"Playfair Display", serif' }}
        >
          What I Build
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SKILLS.map((s, i) => (
          <FadeIn key={s.num} delay={i * 0.1} y={20}>
            <div
              className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 items-start py-8 sm:py-10 md:py-12"
              style={{
                borderTop: i === 0 ? '1px dashed rgba(164,98,77,0.3)' : undefined,
                borderBottom: '1px dashed rgba(164,98,77,0.3)',
              }}
            >
              {/* Number */}
              <span
                className="font-black shrink-0 leading-none hidden sm:block"
                style={{ color: '#4A2B17', fontSize: 'clamp(2rem, 6vw, 80px)', opacity: 0.15, minWidth: '2ch' }}
              >
                {s.num}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-3 pt-1 flex-1">
                <h3
                  className="font-medium uppercase"
                  style={{ color: '#4A2B17', fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {s.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{ color: '#4A2B17', opacity: 0.6, fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {s.desc}
                </p>

                {/* /slash tags */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {s.tags.map(tag => (
                    <span
                      key={tag}
                      className="terminal-font"
                      style={{
                        color: '#7D99A3',
                        fontSize: 'clamp(0.65rem, 0.85vw, 0.78rem)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
