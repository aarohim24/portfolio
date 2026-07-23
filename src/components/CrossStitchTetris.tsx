import { useRef, useEffect, useState } from 'react'

// ─── Constants ──────────────────────────────────────────────────────────────
const ROWS           = 20
const AUTO_SWITCH_MS = 6_000   // idle → autopilot
const AP_STEP_MS     = 130     // autopilot micro-step cadence
const DROP_BASE_MS   = 700     // gravity at level 1
const FLASH_MS       = 360     // line-clear flash duration

// ─── Palette (portfolio) ────────────────────────────────────────────────────
const COLORS: Record<string, string> = {
  I: '#9B2355',   // deep rose
  O: '#D89C18',   // gold
  T: '#7460B8',   // violet
  S: '#2D7040',   // leaf
  Z: '#C43E70',   // rose mid
  J: '#503A8E',   // violet dark
  L: '#F2C630',   // gold light
}

const TYPES = ['I','O','T','S','Z','J','L'] as const
type PT = typeof TYPES[number]

// Standard SRS 4-rotation shapes as [row, col] offsets in a 4×4 bbox
const SHAPES: Record<PT, [number,number][][]> = {
  I:[[[1,0],[1,1],[1,2],[1,3]],[[0,2],[1,2],[2,2],[3,2]],[[2,0],[2,1],[2,2],[2,3]],[[0,1],[1,1],[2,1],[3,1]]],
  O:[[[0,0],[0,1],[1,0],[1,1]],[[0,0],[0,1],[1,0],[1,1]],[[0,0],[0,1],[1,0],[1,1]],[[0,0],[0,1],[1,0],[1,1]]],
  T:[[[0,1],[1,0],[1,1],[1,2]],[[0,1],[1,1],[1,2],[2,1]],[[1,0],[1,1],[1,2],[2,1]],[[0,1],[1,0],[1,1],[2,1]]],
  S:[[[0,1],[0,2],[1,0],[1,1]],[[0,1],[1,1],[1,2],[2,2]],[[1,1],[1,2],[2,0],[2,1]],[[0,0],[1,0],[1,1],[2,1]]],
  Z:[[[0,0],[0,1],[1,1],[1,2]],[[0,2],[1,1],[1,2],[2,1]],[[1,0],[1,1],[2,1],[2,2]],[[0,1],[1,0],[1,1],[2,0]]],
  J:[[[0,0],[1,0],[1,1],[1,2]],[[0,1],[0,2],[1,1],[2,1]],[[1,0],[1,1],[1,2],[2,2]],[[0,1],[1,1],[2,0],[2,1]]],
  L:[[[0,2],[1,0],[1,1],[1,2]],[[0,1],[1,1],[2,1],[2,2]],[[1,0],[1,1],[1,2],[2,0]],[[0,0],[0,1],[1,1],[2,1]]],
}

// ─── Types ──────────────────────────────────────────────────────────────────
interface Piece { type: PT; rot: number; col: number; row: number }
type Board = (string | null)[][]
type Phase = 'autopilot' | 'playing' | 'gameover'
interface GS {
  board: Board; current: Piece; next: Piece
  cols: number; cell: number; phase: Phase
  score: number; level: number; lines: number
  lastDrop: number; lastInput: number
  apTarget: Piece | null; apLastStep: number
  flashUntil: number
}
interface Hud { score: number; level: number; lines: number; phase: Phase }

// ─── Pure game helpers ───────────────────────────────────────────────────────
const mkBoard  = (cols: number): Board =>
  Array.from({ length: ROWS }, () => Array(cols).fill(null))

const getCells = (p: Piece): [number,number][] =>
  SHAPES[p.type][p.rot].map(([r,c]) => [p.row+r, p.col+c])

const isValid  = (b: Board, p: Piece, cols: number): boolean =>
  getCells(p).every(([r,c]) => r>=0 && r<ROWS && c>=0 && c<cols && !b[r]?.[c])

const hardDrop = (b: Board, p: Piece, cols: number): Piece => {
  let pp = { ...p }
  while (isValid(b, { ...pp, row: pp.row+1 }, cols)) pp = { ...pp, row: pp.row+1 }
  return pp
}

const commit = (b: Board, p: Piece): Board => {
  const nb = b.map(r => [...r])
  getCells(p).forEach(([r,c]) => { if (r>=0 && c>=0 && r<ROWS) nb[r][c] = COLORS[p.type] })
  return nb
}

const sweep = (b: Board): { board: Board; cleared: number } => {
  const kept    = b.filter(row => row.some(c => c === null))
  const cleared = ROWS - kept.length
  const empty   = Array.from({ length: cleared }, () => Array(b[0].length).fill(null))
  return { board: [...empty, ...kept] as Board, cleared }
}

const randPiece = (cols: number): Piece => ({
  type: TYPES[Math.floor(Math.random() * TYPES.length)],
  rot: 0, col: Math.floor(cols / 2) - 2, row: 0,
})

// ─── Autopilot AI (Dellacherie heuristic) ────────────────────────────────────
function evalBoard(b: Board, cols: number): number {
  const h = Array(cols).fill(0)
  for (let c=0; c<cols; c++)
    for (let r=0; r<ROWS; r++)
      if (b[r][c]) { h[c] = ROWS-r; break }
  const agg = h.reduce((a,x) => a+x, 0)
  let holes=0, bump=0
  for (let c=0; c<cols; c++) {
    let below = false
    for (let r=0; r<ROWS; r++) { if (b[r][c]) below=true; else if (below) holes++ }
    if (c>0) bump += Math.abs(h[c]-h[c-1])
  }
  const complete = b.filter(row => row.every(c => c !== null)).length
  return -0.51*agg - 0.36*holes - 0.18*bump + 0.76*complete
}

function computeTarget(b: Board, p: Piece, cols: number): Piece {
  let best = -Infinity, target = hardDrop(b, p, cols)
  for (let rot=0; rot<4; rot++) {
    for (let col=-2; col<cols+2; col++) {
      const cand: Piece = { ...p, rot, col, row: 0 }
      if (!isValid(b, cand, cols)) continue
      const dropped = hardDrop(b, cand, cols)
      const s = evalBoard(commit(b, dropped), cols)
      if (s > best) { best = s; target = { ...dropped } }
    }
  }
  return target
}

// ─── Canvas renderer ─────────────────────────────────────────────────────────
function drawX(
  ctx: CanvasRenderingContext2D,
  col: number, row: number,
  cell: number, color: string, alpha: number,
) {
  const x=col*cell, y=row*cell, pad=cell*0.17
  ctx.globalAlpha  = alpha
  ctx.strokeStyle  = color
  ctx.lineWidth    = Math.max(1.5, cell*0.065)
  ctx.lineCap      = 'round'
  ctx.beginPath(); ctx.moveTo(x+pad, y+pad); ctx.lineTo(x+cell-pad, y+cell-pad); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(x+cell-pad, y+pad); ctx.lineTo(x+pad, y+cell-pad); ctx.stroke()
  ctx.globalAlpha  = 1
}

function render(ctx: CanvasRenderingContext2D, gs: GS) {
  const { board, current, cols, cell, phase, flashUntil } = gs
  const W = cols*cell, H = ROWS*cell
  const now = performance.now()
  const flashT = Math.max(0, (flashUntil-now) / FLASH_MS)  // 1→0

  ctx.clearRect(0, 0, W, H)

  // Subtle grid
  ctx.strokeStyle = 'rgba(90,140,155,0.14)'; ctx.lineWidth = 0.5
  for (let c=0; c<=cols; c++) { ctx.beginPath(); ctx.moveTo(c*cell,0); ctx.lineTo(c*cell,H); ctx.stroke() }
  for (let r=0; r<=ROWS; r++) { ctx.beginPath(); ctx.moveTo(0,r*cell); ctx.lineTo(W,r*cell); ctx.stroke() }

  // Walls (left · right · bottom only — top is open)
  ctx.strokeStyle = '#7D99A3'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,H); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(W,0); ctx.lineTo(W,H); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(0,H); ctx.lineTo(W,H); ctx.stroke()

  // Placed pieces
  board.forEach((row, r) => row.forEach((color, c) => {
    if (!color) return
    // Flash pulse on line-clear: brightness oscillates
    const flash = flashT > 0 ? 0.4 + Math.sin(flashT*Math.PI*5)*0.4 : 0
    drawX(ctx, c, r, cell, color, 0.75 + flash*0.25)
  }))

  // Ghost piece
  if (phase !== 'gameover') {
    const ghost = hardDrop(board, current, cols)
    getCells(ghost).forEach(([r,c]) => {
      if (r>=0 && r<ROWS && c>=0 && c<cols)
        drawX(ctx, c, r, cell, COLORS[current.type], 0.11)
    })
  }

  // Active piece
  if (phase !== 'gameover') {
    getCells(current).forEach(([r,c]) => {
      if (r>=0 && r<ROWS && c>=0 && c<cols)
        drawX(ctx, c, r, cell, COLORS[current.type], 0.92)
    })
  }

  // Game-over overlay
  if (phase === 'gameover') {
    ctx.fillStyle = 'rgba(197,224,230,0.75)'; ctx.fillRect(0,0,W,H)
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = '#4A2B17'
    ctx.font = `bold ${Math.round(cell*1.3)}px Lora,serif`
    ctx.fillText('GAME OVER', W/2, H/2 - cell)
    ctx.fillStyle = '#6B4730'
    ctx.font = `${Math.round(cell*0.62)}px "Fira Code",monospace`
    ctx.fillText('press any key or click to restart', W/2, H/2 + cell*0.7)
    ctx.textBaseline = 'alphabetic'
  }
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function CrossStitchTetris() {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gsRef     = useRef<GS | null>(null)
  const [hud, setHud] = useState<Hud>({ score:0, level:1, lines:0, phase:'autopilot' })

  useEffect(() => {
    const wrap   = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')!

    // ── Init / resize ──────────────────────────────────────────────────────
    const init = () => {
      const W    = wrap.offsetWidth
      const cell = W > 900 ? 34 : W > 560 ? 26 : 20
      const cols = Math.floor(W / cell)
      canvas.width  = cols * cell
      canvas.height = ROWS * cell
      const now  = performance.now()
      const board   = mkBoard(cols)
      const current = randPiece(cols)
      const next    = randPiece(cols)
      gsRef.current = {
        board, current, next, cols, cell,
        phase: 'autopilot',
        score: 0, level: 1, lines: 0,
        lastDrop: now, lastInput: 0,
        apTarget: computeTarget(board, current, cols),
        apLastStep: now,
        flashUntil: 0,
      }
      setHud({ score:0, level:1, lines:0, phase:'autopilot' })
    }

    // ── Lock + spawn ───────────────────────────────────────────────────────
    const lock = () => {
      const gs = gsRef.current
      if (!gs || gs.phase === 'gameover') return
      gs.board = commit(gs.board, gs.current)
      const { board: newBoard, cleared } = sweep(gs.board)
      if (cleared > 0) {
        gs.flashUntil = performance.now() + FLASH_MS
        const pts = [0,100,300,500,800][Math.min(cleared,4)] * gs.level
        gs.score += pts
        gs.lines += cleared
        gs.level  = Math.floor(gs.lines / 10) + 1
        gs.board  = newBoard
        setHud(h => ({ ...h, score: gs.score, level: gs.level, lines: gs.lines }))
      }
      gs.current = gs.next
      gs.next    = randPiece(gs.cols)
      if (!isValid(gs.board, gs.current, gs.cols)) {
        gs.phase = 'gameover'
        setHud(h => ({ ...h, phase: 'gameover' }))
        return
      }
      if (gs.phase === 'autopilot') {
        gs.apTarget   = computeTarget(gs.board, gs.current, gs.cols)
        gs.apLastStep = performance.now()
      }
    }

    // ── Game tick ──────────────────────────────────────────────────────────
    const tick = (now: number) => {
      const gs = gsRef.current
      if (!gs || gs.phase === 'gameover') return

      // Idle → autopilot
      if (gs.phase === 'playing' && gs.lastInput > 0 && now - gs.lastInput > AUTO_SWITCH_MS) {
        gs.phase    = 'autopilot'
        gs.apTarget = computeTarget(gs.board, gs.current, gs.cols)
        gs.apLastStep = now
        setHud(h => ({ ...h, phase: 'autopilot' }))
      }

      // Autopilot micro-steps
      if (gs.phase === 'autopilot' && gs.apTarget && now - gs.apLastStep > AP_STEP_MS) {
        gs.apLastStep = now
        const { current: cur, apTarget: tgt, board: b, cols } = gs
        if (cur.rot !== tgt.rot) {
          const r = { ...cur, rot: (cur.rot+1)%4 }
          if (isValid(b, r, cols)) gs.current = r
        } else if (cur.col < tgt.col) {
          const m = { ...cur, col: cur.col+1 }
          if (isValid(b, m, cols)) gs.current = m
        } else if (cur.col > tgt.col) {
          const m = { ...cur, col: cur.col-1 }
          if (isValid(b, m, cols)) gs.current = m
        }
      }

      // Gravity
      const interval = gs.phase === 'autopilot'
        ? 420
        : Math.max(80, DROP_BASE_MS - (gs.level-1)*55)

      if (now - gs.lastDrop > interval) {
        gs.lastDrop = now
        const moved = { ...gs.current, row: gs.current.row+1 }
        if (isValid(gs.board, moved, gs.cols)) gs.current = moved
        else lock()
      }
    }

    // ── RAF loop ───────────────────────────────────────────────────────────
    let rafId: number
    const loop = (now: number) => {
      tick(now)
      const gs = gsRef.current
      if (gs) render(ctx, gs)
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    // ── Keyboard ───────────────────────────────────────────────────────────
    const onKey = (e: KeyboardEvent) => {
      const gs = gsRef.current
      if (!gs) return
      const KEYS = ['ArrowLeft','ArrowRight','ArrowDown','ArrowUp','Space','KeyZ','KeyX']
      if (!KEYS.includes(e.code)) return
      e.preventDefault()

      if (gs.phase === 'gameover') { init(); return }

      if (gs.phase === 'autopilot') {
        gs.phase = 'playing'
        setHud(h => ({ ...h, phase: 'playing' }))
      }
      gs.lastInput = performance.now()
      const { board: b, current: cur, cols } = gs

      switch (e.code) {
        case 'ArrowLeft':  { const m={...cur,col:cur.col-1}; if(isValid(b,m,cols)) gs.current=m; break }
        case 'ArrowRight': { const m={...cur,col:cur.col+1}; if(isValid(b,m,cols)) gs.current=m; break }
        case 'ArrowDown':  {
          const m={...cur,row:cur.row+1}
          if(isValid(b,m,cols)){gs.current=m;gs.lastDrop=performance.now()} else lock()
          break
        }
        case 'ArrowUp':
        case 'KeyX': { const r={...cur,rot:(cur.rot+1)%4}; if(isValid(b,r,cols)) gs.current=r; break }
        case 'KeyZ': { const r={...cur,rot:(cur.rot+3)%4}; if(isValid(b,r,cols)) gs.current=r; break }
        case 'Space': { gs.current=hardDrop(b,cur,cols); lock(); break }
      }
    }

    // ── Click to play ──────────────────────────────────────────────────────
    const onClick = () => {
      const gs = gsRef.current
      if (!gs) return
      if (gs.phase === 'gameover') { init(); return }
      if (gs.phase === 'autopilot') {
        gs.phase = 'playing'
        gs.lastInput = performance.now()
        setHud(h => ({ ...h, phase: 'playing' }))
      }
    }

    init()
    window.addEventListener('resize', init)
    window.addEventListener('keydown', onKey)
    canvas.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', init)
      window.removeEventListener('keydown', onKey)
      canvas.removeEventListener('click', onClick)
    }
  }, [])

  // ── Next-piece preview colours ─────────────────────────────────────────
  const nextColor = gsRef.current ? COLORS[gsRef.current.next.type] : COLORS.I

  return (
    <section
      id="tetris"
      aria-label="Cross-stitch Tetris game"
      style={{ background: '#B8D8DF', overflow: 'hidden' }}
    >
      {/* ── HUD bar ────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 20px', borderBottom: '1px solid #A8CDD5',
        flexWrap: 'wrap', gap: '8px',
      }}>
        <span style={{
          fontFamily: '"Fira Code", monospace', fontSize: '0.72rem',
          color: '#6B4730', letterSpacing: '0.15em', textTransform: 'uppercase',
        }}>
          ✕ cross-stitch tetris ✕
        </span>

        <div style={{
          fontFamily: '"Fira Code", monospace', fontSize: '0.72rem',
          color: '#4A2B17', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap',
        }}>
          <span>score <strong>{hud.score.toLocaleString()}</strong></span>
          <span>level <strong>{hud.level}</strong></span>
          <span>lines <strong>{hud.lines}</strong></span>

          {/* Next piece dot */}
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            next
            <span style={{
              display: 'inline-block', width: 10, height: 10,
              borderRadius: 2, background: nextColor, opacity: 0.85,
            }} />
          </span>

          {/* Mode badge */}
          <span style={{
            padding: '2px 8px', borderRadius: 999, fontSize: '0.65rem',
            fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            background: hud.phase === 'playing'
              ? 'rgba(155,35,85,0.12)' : hud.phase === 'gameover'
              ? 'rgba(80,58,142,0.12)' : 'rgba(116,96,184,0.12)',
            color: hud.phase === 'playing' ? '#9B2355' : hud.phase === 'gameover' ? '#503A8E' : '#7460B8',
            border: `1px solid ${hud.phase === 'playing' ? '#C43E70' : hud.phase === 'gameover' ? '#503A8E' : '#7460B8'}33`,
          }}>
            {hud.phase === 'autopilot' ? '◉ auto' : hud.phase === 'playing' ? '▶ playing' : '✕ game over'}
          </span>
        </div>
      </div>

      {/* ── Canvas ─────────────────────────────────────────────────────── */}
      <div ref={wrapRef} style={{ width: '100%', lineHeight: 0 }}>
        <canvas
          ref={canvasRef}
          style={{ display: 'block', cursor: 'pointer', width: '100%' }}
        />
      </div>

      {/* ── Controls bar ───────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '10px 20px', borderTop: '1px solid #A8CDD5',
        flexWrap: 'wrap', gap: '8px',
      }}>
        <span style={{
          fontFamily: '"Fira Code", monospace', fontSize: '0.62rem', color: '#8B6A55',
        }}>
          ← → move · ↑ / X rotate cw · Z rotate ccw · ↓ soft drop · space hard drop
        </span>
        <span style={{
          fontFamily: '"Fira Code", monospace', fontSize: '0.62rem', color: '#8B6A55',
        }}>
          click to play · auto-pilots when idle
        </span>
      </div>
    </section>
  )
}
