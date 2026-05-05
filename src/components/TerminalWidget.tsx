import { useEffect, useRef, useState, useCallback } from 'react'

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
    output: ['  autoinsight/   smartprep-ai/   foodspot/   upes-social/'],
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
    '  Email .... aarohi.123455@stu.upes.ac.in',
    '  GitHub ... github.com/aarohim24',
    '  LinkedIn . linkedin.com/in/aarohi-mathur-60968121a',
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
      style={{ background: '#111', border: '1px solid #2a2a2a', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#1a1a1a', borderBottom: '1px solid #2a2a2a' }}>
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28ca42]" />
        <span className="terminal-font text-xs ml-auto" style={{ color: '#555' }}>aarohi@portfolio:~</span>
      </div>
      {/* Output */}
      <div ref={outputRef} className="terminal-font px-4 py-3 overflow-y-auto" style={{ maxHeight: '220px', fontSize: '0.78rem', color: '#4ade80', lineHeight: 1.7 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.type === 'cmd' ? '#4ade80' : '#a0a0a0' }}>
            {l.text}
          </div>
        ))}
        {typingCursor && <div style={{ color: '#4ade80' }}>{typingCursor}</div>}
        {!autoTyping && (
          <div className="flex items-center gap-1" style={{ color: '#4ade80' }}>
            <span>$&nbsp;</span>
            <input
              ref={inputRef}
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
              className="terminal-font flex-1 bg-transparent outline-none"
              style={{ fontSize: '0.78rem', color: '#fff', caretColor: '#4ade80' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
