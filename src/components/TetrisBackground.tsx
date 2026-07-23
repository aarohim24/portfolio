import { useRef, useEffect } from 'react'

// ─── Palette ────────────────────────────────────────────────────────────────
const COLORS: Record<string, string> = {
  I: '#9B2355', O: '#D89C18', T: '#7460B8',
  S: '#2D7040', Z: '#C43E70', J: '#503A8E', L: '#F2C630',
}
const STITCH: Record<string, number> = {
  I: 0, O: 1, T: 2, S: 3, Z: 4, J: 5, L: 6,
}

const TYPES = ['I','O','T','S','Z','J','L'] as const
type PT = typeof TYPES[number]

const SHAPES: Record<PT, [number,number][][]> = {
  I:[[[1,0],[1,1],[1,2],[1,3]],[[0,2],[1,2],[2,2],[3,2]],[[2,0],[2,1],[2,2],[2,3]],[[0,1],[1,1],[2,1],[3,1]]],
  O:[[[0,0],[0,1],[1,0],[1,1]],[[0,0],[0,1],[1,0],[1,1]],[[0,0],[0,1],[1,0],[1,1]],[[0,0],[0,1],[1,0],[1,1]]],
  T:[[[0,1],[1,0],[1,1],[1,2]],[[0,1],[1,1],[1,2],[2,1]],[[1,0],[1,1],[1,2],[2,1]],[[0,1],[1,0],[1,1],[2,1]]],
  S:[[[0,1],[0,2],[1,0],[1,1]],[[0,1],[1,1],[1,2],[2,2]],[[1,1],[1,2],[2,0],[2,1]],[[0,0],[1,0],[1,1],[2,1]]],
  Z:[[[0,0],[0,1],[1,1],[1,2]],[[0,2],[1,1],[1,2],[2,1]],[[1,0],[1,1],[2,1],[2,2]],[[0,1],[1,0],[1,1],[2,0]]],
  J:[[[0,0],[1,0],[1,1],[1,2]],[[0,1],[0,2],[1,1],[2,1]],[[1,0],[1,1],[1,2],[2,2]],[[0,1],[1,1],[2,0],[2,1]]],
  L:[[[0,2],[1,0],[1,1],[1,2]],[[0,1],[1,1],[2,1],[2,2]],[[1,0],[1,1],[1,2],[2,0]],[[0,0],[0,1],[1,1],[2,1]]],
}

interface FP {
  id: number; type: PT; rot: number
  col: number; row: number
  dropInterval: number   // ms — each piece has its own rhythm
  lastDrop: number
}
type Board = (string | null)[][]

// ─── Helpers ─────────────────────────────────────────────────────────────────
const mkBoard  = (r: number, c: number): Board =>
  Array.from({ length: r }, () => Array(c).fill(null))

const getCells = (p: Pick<FP,'type'|'rot'|'col'|'row'>): [number,number][] =>
  SHAPES[p.type][p.rot].map(([r,c]) => [p.row+r, p.col+c])

// allows piece to occupy rows < 0 (above board) but blocks collisions within board
const canMoveDown = (b: Board, p: FP, bR: number, bC: number): boolean =>
  getCells({ ...p, row: p.row+1 }).every(([r,c]) => {
    if (r < 0) return true           // above board: always OK
    if (r >= bR || c < 0 || c >= bC) return false
    return !b[r]?.[c]
  })

const commit = (b: Board, p: FP): Board => {
  const nb = b.map(r => [...r])
  getCells(p).forEach(([r,c]) => {
    if (r >= 0 && r < nb.length && c >= 0 && c < nb[0].length)
      nb[r][c] = COLORS[p.type]
  })
  return nb
}

let _id = 0
function spawnOne(bR: number, bC: number, now: number, staggerRow = 0): FP | null {
  for (let attempt = 0; attempt < 40; attempt++) {
    const type = TYPES[Math.floor(Math.random() * TYPES.length)]
    const rot  = Math.floor(Math.random() * 4)
    const cells = SHAPES[type][rot]
    const minC  = cells.reduce((m,[,c]) => Math.min(m,c), Infinity)
    const maxC  = cells.reduce((m,[,c]) => Math.max(m,c), 0)
    const maxR  = cells.reduce((m,[r]) => Math.max(m,r), 0)
    const w     = maxC - minC + 1
    if (w > bC) continue
    const col = Math.floor(Math.random() * (bC - w + 1)) - minC
    const startRow = -maxR - 1 + staggerRow   // staggerRow offsets some pieces further down
    return {
      id: _id++, type, rot, col, row: startRow,
      dropInterval: 400 + Math.random() * 280,  // 400–680 ms each
      lastDrop: now - Math.random() * 400,       // random phase offset
    }
  }
  return null
}

// ─── Embroidery cell renderer ─────────────────────────────────────────────────
function drawEmbroideryCell(
  ctx: CanvasRenderingContext2D,
  col: number, row: number, size: number,
  color: string, stitchType: number, alpha: number,
) {
  const g  = 1.5
  const px = col*size+g, py = row*size+g, w = size-g*2, h = size-g*2
  const cx = px+w/2, cy = py+h/2
  const ip = w*0.18, lw = Math.max(1.2, size*0.062)

  ctx.save(); ctx.globalAlpha = alpha

  // ① Fill
  ctx.fillStyle = color; ctx.fillRect(px, py, w, h)

  // ② Top-left highlight / bottom-right shadow
  ctx.fillStyle = 'rgba(255,255,255,0.26)'; ctx.fillRect(px, py, w, 1.5); ctx.fillRect(px, py, 1.5, h)
  ctx.fillStyle = 'rgba(0,0,0,0.20)'; ctx.fillRect(px, py+h-1.5, w, 1.5); ctx.fillRect(px+w-1.5, py, 1.5, h)

  // ③ Fabric weave grid
  ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 0.5
  for (let i=1; i<4; i++) {
    const tx=px+w*i/4, ty=py+h*i/4
    ctx.beginPath(); ctx.moveTo(tx,py); ctx.lineTo(tx,py+h); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(px,ty); ctx.lineTo(px+w,ty); ctx.stroke()
  }

  // ④ Stitch pattern
  ctx.strokeStyle = 'rgba(255,255,255,0.84)'; ctx.fillStyle = 'rgba(255,255,255,0.84)'
  ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'

  switch (stitchType) {
    case 0: // ╳ Cross
      ctx.beginPath(); ctx.moveTo(px+ip,py+ip); ctx.lineTo(px+w-ip,py+h-ip); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(px+w-ip,py+ip); ctx.lineTo(px+ip,py+h-ip); ctx.stroke()
      break
    case 1: // + Plus
      ctx.beginPath(); ctx.moveTo(cx,py+ip); ctx.lineTo(cx,py+h-ip); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(px+ip,cy); ctx.lineTo(px+w-ip,cy); ctx.stroke()
      break
    case 2: // ✲ Star (X + Plus)
      ctx.beginPath(); ctx.moveTo(px+ip,py+ip); ctx.lineTo(px+w-ip,py+h-ip); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(px+w-ip,py+ip); ctx.lineTo(px+ip,py+h-ip); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx,py+ip); ctx.lineTo(cx,py+h-ip); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(px+ip,cy); ctx.lineTo(px+w-ip,cy); ctx.stroke()
      break
    case 3: { // /// Satin forward
      ctx.lineWidth = Math.max(1, size*0.052)
      for (let k=0; k<4; k++) {
        const t=(k+0.5)/4
        ctx.beginPath(); ctx.moveTo(px+ip+(w-ip*2)*t, py+ip); ctx.lineTo(px+ip, py+ip+(h-ip*2)*t); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(px+ip+(w-ip*2)*t, py+h-ip); ctx.lineTo(px+w-ip, py+ip+(h-ip*2)*t); ctx.stroke()
      }
      break
    }
    case 4: { // \\\ Satin backward
      ctx.lineWidth = Math.max(1, size*0.052)
      for (let k=0; k<4; k++) {
        const t=(k+0.5)/4
        ctx.beginPath(); ctx.moveTo(px+w-ip-(w-ip*2)*t, py+ip); ctx.lineTo(px+w-ip, py+ip+(h-ip*2)*t); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(px+w-ip-(w-ip*2)*t, py+h-ip); ctx.lineTo(px+ip, py+ip+(h-ip*2)*t); ctx.stroke()
      }
      break
    }
    case 5: // ◇ Diamond
      ctx.beginPath()
      ctx.moveTo(cx,py+ip); ctx.lineTo(px+w-ip,cy); ctx.lineTo(cx,py+h-ip); ctx.lineTo(px+ip,cy)
      ctx.closePath(); ctx.stroke()
      ctx.beginPath(); ctx.arc(cx,cy,lw*0.65,0,Math.PI*2); ctx.fill()
      break
    case 6: { // • French knot
      const dr = Math.max(2, size*0.1)
      ctx.beginPath(); ctx.arc(cx,cy,dr,0,Math.PI*2); ctx.fill()
      const ray = w*0.28; ctx.lineWidth = Math.max(1,lw*0.7)
      ;[0,Math.PI/2,Math.PI,3*Math.PI/2].forEach(a => {
        ctx.beginPath(); ctx.moveTo(cx+Math.cos(a)*(dr+1.5),cy+Math.sin(a)*(dr+1.5))
        ctx.lineTo(cx+Math.cos(a)*ray,cy+Math.sin(a)*ray); ctx.stroke()
      })
      const dp=ip+dr*0.6
      ;[[px+dp,py+dp],[px+w-dp,py+dp],[px+dp,py+h-dp],[px+w-dp,py+h-dp]].forEach(([dx,dy]) => {
        ctx.beginPath(); ctx.arc(dx,dy,Math.max(1,dr*0.5),0,Math.PI*2); ctx.fill()
      })
      break
    }
  }
  ctx.restore()
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function TetrisBackground() {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap   = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx    = canvas.getContext('2d')!

    const FADE_DUR = 1_400

    let board: Board, bR: number, bC: number, cellSz: number
    let falling: FP[]
    let phase: 'playing' | 'fading'
    let fadeStart: number
    const targetN = () => Math.max(4, Math.floor(bC / 5))

    const init = () => {
      const W  = wrap.offsetWidth
      const H  = wrap.offsetHeight
      cellSz   = W > 1000 ? 32 : W > 600 ? 24 : 18
      bC       = Math.floor(W / cellSz)
      bR       = Math.ceil(H / cellSz) + 2
      canvas.width  = bC * cellSz
      canvas.height = bR * cellSz

      board    = mkBoard(bR, bC)
      phase    = 'playing'
      fadeStart = 0
      const now = performance.now()
      falling  = []

      // Spawn initial pieces with vertical stagger so they're spread across height
      const N = targetN()
      for (let i = 0; i < N; i++) {
        // staggerRow: spread pieces from fully off-screen to partway down
        const stagger = Math.floor(Math.random() * bR * 0.45)
        const p = spawnOne(bR, bC, now, stagger)
        if (p) falling.push(p)
      }
    }

    const tick = (now: number) => {
      if (phase === 'fading') {
        if (now - fadeStart >= FADE_DUR) init()
        return
      }

      const toCommit: FP[] = []
      const staying: FP[]  = []

      for (const p of falling) {
        // Each piece uses its own drop interval
        if (now - p.lastDrop < p.dropInterval) {
          staying.push(p)
          continue
        }
        // Time to drop
        if (canMoveDown(board, p, bR, bC)) {
          staying.push({ ...p, row: p.row + 1, lastDrop: now })
        } else {
          // Only commit if any cell is within the board
          const inBoard = getCells(p).some(([r]) => r >= 0)
          if (inBoard) toCommit.push(p)
          else staying.push({ ...p, lastDrop: now }) // still too high, keep trying
        }
      }

      // Commit landed pieces top→bottom (prevents double-commit conflicts)
      toCommit
        .sort((a, b) => a.row - b.row)
        .forEach(p => { board = commit(board, p) })

      // Replenish: keep targetN pieces in flight at all times
      const needed = targetN() - staying.length
      for (let i = 0; i < Math.max(0, needed + toCommit.length); i++) {
        const p = spawnOne(bR, bC, now)
        if (p) staying.push(p)
      }

      falling = staying

      // Fade-reset when stack approaches the top quarter
      const topFull = board
        .slice(0, Math.floor(bR * 0.28))
        .some(row => row.some(c => c !== null))
      if (topFull) { phase = 'fading'; fadeStart = performance.now() }
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const fadeA = phase === 'fading'
        ? Math.max(0, 1 - (now - fadeStart) / FADE_DUR) : 1

      // Committed blocks
      board.forEach((row, r) => row.forEach((color, c) => {
        if (!color) return
        const type = (Object.entries(COLORS).find(([,v]) => v === color)?.[0] ?? 'I') as PT
        drawEmbroideryCell(ctx, c, r, cellSz, color, STITCH[type], 0.78 * fadeA)
      }))

      // Falling pieces
      falling.forEach(p => {
        getCells(p).forEach(([r,c]) => {
          if (r>=0 && r<bR && c>=0 && c<bC)
            drawEmbroideryCell(ctx, c, r, cellSz, COLORS[p.type], STITCH[p.type], 0.90 * fadeA)
        })
      })

      // Gradient mask: transparent at top half → full opacity at bottom
      // so blocks only visually emerge in the lower portion of the section
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
      grad.addColorStop(0,    'rgba(0,0,0,1)')
      grad.addColorStop(0.40, 'rgba(0,0,0,0)')
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'source-over'
    }

    init()
    let rafId: number
    const loop = (now: number) => { tick(now); draw(now); rafId = requestAnimationFrame(loop) }
    rafId = requestAnimationFrame(loop)
    window.addEventListener('resize', init)
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', init) }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}
    >
      <canvas ref={canvasRef} style={{ display:'block' }} />
    </div>
  )
}
