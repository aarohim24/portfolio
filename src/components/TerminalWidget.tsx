import { useEffect, useRef, useState, useCallback } from 'react'
import { CONTACT_EMAIL, CONTACT_GITHUB, CONTACT_LINKEDIN } from '../lib/constants'

type Line = { type: 'cmd' | 'out' | 'empty'; text: string }

const AUTO_SEQUENCE = [
  {
    cmd: 'whoami',
    output: [
      '  Aarohi Mathur — AI Engineer · Builder · Researcher',
      '  B.Tech CSE (AI/ML) · UPES Dehradun · Expected 2027',
      '  CGPA: 8.37/10  ·  Status: ● available for opportunities',
    ],
  },
  {
    cmd: 'ls projects/',
    output: ['  mosaic/   smartprep-ai/   autoinsight/   foodspot/'],
  },
  {
    cmd: 'cat skills.txt',
    output: [
      '  Languages ... Python · C++ · TypeScript · Java',
      '  AI/ML ....... RAG · LLMs · FAISS · TensorFlow · scikit-learn',
      '  Stack ....... React · Next.js · FastAPI · Node.js · Docker',
      '  Cloud ....... AWS · Vercel · Supabase · PostgreSQL · Redis',
    ],
  },
]

const STATIC_RESPONSES: Record<string, string[]> = {
  help: ['  Commands: whoami, skills, projects, contact, clear, help'],
  whoami: AUTO_SEQUENCE[0].output,
  skills: AUTO_SEQUENCE[2].output,
  'ls projects/': AUTO_SEQUENCE[1].output,
  projects: AUTO_SEQUENCE[1].output,
  contact: [
    `  Email .... ${CONTACT_EMAIL}`,
    `  GitHub ... ${CONTACT_GITHUB.replace('https://', '')}`,
    `  LinkedIn . ${CONTACT_LINKEDIN.replace('https://www.', '')}`,
  ],
  clear: [],
}

function getResponse(cmd: string): Line[] {
  if (cmd === 'clear') return []
  const res = STATIC_RESPONSES[cmd.toLowerCase()]
  if (res) return res.map(t => ({ type: 'out', text: t }))
  return [{ type: 'out', text: `  command not found: ${cmd}. Type 'help' for available commands.` }]
}

export default function TerminalWidget() {
  const [lines, setLines] = useState<Line[]>([])
  const [inputVal, setInputVal] = useState('')
  const [typingCursor, setTypingCursor] = useState('')
  const [autoTyping, setAutoTyping] = useState(true)
  const outputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const sleep = (ms: number) => new Promise<void>(r => { const id = setTimeout(r, ms); timers.push(id) })

    async function run() {
      await sleep(900)
      for (const { cmd, output } of AUTO_SEQUENCE) {
        if (cancelled) return
        for (let i = 0; i <= cmd.length; i++) {
          if (cancelled) return
          setTypingCursor('$ ' + cmd.slice(0, i) + (i < cmd.length ? '▌' : ''))
          await sleep(i === 0 ? 300 : 55)
        }
        await sleep(150)
        setTypingCursor('')
        if (!cancelled) setLines(p => [...p, { type: 'cmd', text: '$ ' + cmd }])
        await sleep(80)
        for (const out of output) {
          if (cancelled) return
          setLines(p => [...p, { type: 'out', text: out }])
          await sleep(55)
        }
        setLines(p => [...p, { type: 'empty', text: '' }])
        await sleep(350)
      }
      if (!cancelled) setAutoTyping(false)
    }
    run()
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [])

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [lines, typingCursor])

  const handleKey = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || !inputVal.trim()) return
    const cmd = inputVal.trim()
    if (cmd.toLowerCase() === 'clear') {
      setLines([])
    } else {
      setLines(p => [...p, { type: 'cmd', text: '$ ' + cmd }, ...getResponse(cmd), { type: 'empty', text: '' }])
    }
    setInputVal('')
  }, [inputVal])

  return (
    <div
      className="w-full max-w-2xl rounded-2xl overflow-hidden cursor-text"
      style={{ background: '#D4E8ED', border: '1px solid #9BC0C9', boxShadow: '0 20px 60px rgba(81,50,41,0.12)' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#BDDAE2', borderBottom: '1px solid #9BC0C9' }}>
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28ca42]" />
        <span className="terminal-font text-xs ml-auto" style={{ color: '#8B6A55' }}>aarohi@portfolio:~</span>
      </div>
      {/* Output */}
      <div ref={outputRef} className="terminal-font px-4 py-3 overflow-y-auto" style={{ maxHeight: '220px', fontSize: '0.78rem', color: '#7D99A3', lineHeight: 1.7 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.type === 'cmd' ? '#7D99A3' : '#6B4730' }}>
            {l.text}
          </div>
        ))}
        {typingCursor && <div style={{ color: '#7D99A3' }}>{typingCursor}</div>}
        {!autoTyping && (
          <div className="flex items-center gap-1" style={{ color: '#7D99A3' }}>
            <span>$&nbsp;</span>
            <input
              ref={inputRef}
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
              className="terminal-font flex-1 bg-transparent outline-none"
              style={{ fontSize: '0.78rem', color: '#4A2B17', caretColor: '#7D99A3' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
