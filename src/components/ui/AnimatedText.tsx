import { useRef, CSSProperties } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

function Char({ char, progress, start, end, color }: { char: string; progress: MotionValue<number>; start: number; end: number; color: string }) {
  const opacity = useTransform(progress, [start, end], [0.15, 1])
  const display = char === ' ' ? '\u00A0' : char
  return (
    <span style={{ position: 'relative', display: 'inline', color }}>
      <span style={{ opacity: 0.15 }}>{display}</span>
      <motion.span style={{ position: 'absolute', left: 0, top: 0, opacity, color }}>{display}</motion.span>
    </span>
  )
}

export default function AnimatedText({ text, className, style }: { text: string; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  const chars = text.split('')
  const color = (style?.color as string) || '#D7E2EA'
  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((c, i) => (
        <Char key={i} char={c} progress={scrollYProgress} start={i / chars.length} end={(i + 1) / chars.length} color={color} />
      ))}
    </p>
  )
}
