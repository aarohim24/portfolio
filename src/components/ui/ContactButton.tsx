interface Props { href?: string; label?: string }

export default function ContactButton({ href = 'mailto:aarohi.123455@stu.upes.ac.in', label = 'Get In Touch' }: Props) {
  return (
    <a
      href={href}
      className="inline-block rounded-full font-black uppercase tracking-widest transition-all hover:opacity-80 active:scale-95"
      style={{
        background: '#D7E2EA',
        color: '#0C0C0C',
        padding: 'clamp(0.65rem, 1.2vw, 0.9rem) clamp(1.5rem, 3vw, 2.8rem)',
        fontSize: 'clamp(0.72rem, 1.1vw, 0.9rem)',
      }}
    >
      {label}
    </a>
  )
}
