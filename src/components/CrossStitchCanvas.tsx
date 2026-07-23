import { useRef, useEffect } from 'react'

// ─── Cell size (px per stitch) ─────────────────────────────────────────────
const CELL = 16

// ─── Color palette — curated to complement #C5E0E6 (cool teal-blue bg) ────
const P = {
  rD: '#9B2355', rM: '#C43E70', rL: '#E07898', rB: 'rgba(248,198,220,0.85)',
  sD: '#1A4A28', lM: '#2D7040', lL: '#58A860', lH: '#88CC80',
  gD: '#B07608', gM: '#D89C18', gL: '#F2C630',
  vD: '#503A8E', vM: '#7460B8', vL: '#9880D0',
  wh: 'rgba(255,248,252,0.90)',
} as const

type PKey = keyof typeof P

const MOTIFS: Record<string, (PKey | null)[][]> = {
  largeRose: [
    [null, null, null,  'rM',  'rD',  'rM',  null, null, null],
    [null, null,  'rM',  'rD',  'rM',  'rD',  'rM',  null, null],
    [null,  'rM',  'rD',  'rB',  'rD',  'rB',  'rD',  'rM',  null],
    ['rM',  'rD',  'rD',  'rM',  'wh',  'rM',  'rD',  'rD',  'rM'],
    ['rM',  'rD',  'rM',  'rD',  'rM',  'rD',  'rM',  'rD',  'rM'],
    ['rM',  'rD',  'rD',  'rM',  'rD',  'rM',  'rD',  'rD',  'rM'],
    [null,  'rM',  'rD',  'rD',  'rD',  'rD',  'rD',  'rM',  null],
    [null,  null,  'rM',  'rM',  'rL',  'rM',  'rM',  null,  null],
    [null,  null,  null,  'rL',  'rM',  'rL',  null,  null,  null],
  ],
  roseBud: [
    [null,  'rM',  null],
    ['rM',  'rD',  'rM'],
    ['rL',  'rM',  'rL'],
    [null,  'lM',  null],
    [null,  'sD',  null],
  ],
  tinyBud: [
    ['rL',  'rM'],
    ['rM',  'rD'],
    ['lM',  'lL'],
  ],
  leafGroup: [
    [null,  'lH',  'lM',  null],
    ['lH',  'lM',  'lL',  'lM'],
    [null,  'lL',  'sD',  'lL'],
    [null,  null,  'sD',  null],
  ],
  leafSingle: [
    [null,  'lH'],
    ['lM',  'lL'],
    [null,  'sD'],
  ],
  leafSingleR: [
    ['lH',  null],
    ['lL',  'lM'],
    ['sD',  null],
  ],
  daisy: [
    [null,  null,  'gL',  null,  null],
    [null,  'gL',  'gM',  'gL',  null],
    ['gL',  'gM',  'gD',  'gM',  'gL'],
    [null,  'gL',  'gM',  'gL',  null],
    [null,  null,  'gL',  null,  null],
  ],
  smallDaisy: [
    [null,  'gM',  null],
    ['gL',  'gD',  'gL'],
    [null,  'gM',  null],
  ],
  violet: [
    [null,  'vL',  null],
    ['vL',  'vM',  'vL'],
    ['vM',  'vD',  'vM'],
    [null,  'vL',  null],
  ],
}

interface Stitch { col: number; row: number; color: string }

function buildPattern(totalCols: number, totalRows: number): Stitch[] {
  const out: Stitch[] = []

  function place(key: string, col: number, row: number) {
    const grid = MOTIFS[key]
    if (!grid) return
    grid.forEach((rowArr, ri) =>
      rowArr.forEach((pkey, ci) => {
        if (pkey != null) out.push({ col: col + ci, row: row + ri, color: P[pkey] })
      })
    )
  }

  function vine(c1: number, r1: number, c2: number, r2: number) {
    const steps = Math.max(Math.abs(c2 - c1), Math.abs(r2 - r1))
    if (steps === 0) return
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      out.push({ col: Math.round(c1 + (c2 - c1) * t), row: Math.round(r1 + (r2 - r1) * t), color: P.sD })
    }
  }

  const cx = (f: number) => Math.round(f * totalCols)
  const cy = (f: number) => Math.round(f * totalRows)

  // CLUSTER A — Far-left sprig
  const ax = cx(0.05), ay = cy(0.32)
  place('roseBud',     ax,     ay)
  place('leafGroup',   ax + 2, ay + 5)
  place('leafSingle',  ax - 1, ay + 3)
  vine(ax + 1, ay + 4, ax + 3, ay + 8)
  place('smallDaisy',  ax + 4, ay + 8)
  place('leafSingleR', ax + 6, ay + 6)

  // CLUSTER B — Left-of-center: large rose (main focal)
  const bx = cx(0.22), by = cy(0.42)
  place('largeRose',   bx - 4, by - 4)
  place('leafGroup',   bx - 7, by + 4)
  place('leafGroup',   bx + 5, by - 3)
  place('daisy',       bx - 4, by + 7)
  place('leafSingle',  bx + 5, by + 6)
  place('leafSingleR', bx - 8, by - 1)
  vine(bx,     by + 4, bx - 2, by + 9)
  vine(bx + 4, by - 2, bx + 8, by - 6)
  place('smallDaisy',  bx + 9, by - 8)
  place('tinyBud',     bx - 2, by + 9)

  // CLUSTER C — Upper center: golden daisy spray
  const ccx = cx(0.48), ccy = cy(0.17)
  place('daisy',       ccx - 3, ccy - 2)
  place('daisy',       ccx + 3, ccy + 3)
  place('smallDaisy',  ccx - 6, ccy + 3)
  place('smallDaisy',  ccx + 7, ccy - 1)
  place('leafGroup',   ccx,     ccy + 4)
  vine(ccx - 2, ccy + 2, ccx + 2,  ccy + 4)
  vine(ccx + 3, ccy + 3, ccx + 7,  ccy + 1)
  place('roseBud',     ccx - 7, ccy + 1)
  place('leafSingle',  ccx + 8, ccy + 2)

  // CLUSTER D — Center: light bridge scatter
  const ddx = cx(0.47), ddy = cy(0.48)
  place('leafSingle',  ddx - 2, ddy - 2)
  place('leafSingleR', ddx + 4, ddy - 3)
  place('smallDaisy',  ddx + 1, ddy + 2)
  place('tinyBud',     ddx - 3, ddy + 3)
  vine(ddx - 1, ddy - 1, ddx + 1, ddy + 1)

  // CLUSTER E — Right-of-center: second large rose
  const ex = cx(0.66), ey = cy(0.50)
  place('largeRose',   ex - 4,  ey - 4)
  place('leafGroup',   ex + 5,  ey - 2)
  place('leafGroup',   ex - 8,  ey + 2)
  place('violet',      ex - 5,  ey + 7)
  place('roseBud',     ex + 6,  ey - 6)
  place('leafSingleR', ex + 7,  ey + 4)
  vine(ex,     ey + 4, ex + 2,  ey + 9)
  vine(ex + 5, ey - 1, ex + 9,  ey - 5)
  place('tinyBud',     ex + 9,  ey - 7)
  place('smallDaisy',  ex - 2,  ey + 10)

  // CLUSTER F — Right: golden flower cascade
  const fx = cx(0.82), fy = cy(0.33)
  place('daisy',       fx - 2,  fy - 2)
  place('daisy',       fx + 2,  fy + 5)
  place('smallDaisy',  fx - 4,  fy + 4)
  place('smallDaisy',  fx + 6,  fy - 1)
  place('leafGroup',   fx - 5,  fy + 1)
  place('roseBud',     fx - 1,  fy - 8)
  vine(fx, fy + 2, fx - 2, fy + 5)
  vine(fx + 3, fy + 5, fx + 6, fy + 2)
  place('leafSingle',  fx + 7,  fy + 5)
  place('tinyBud',     fx - 2,  fy + 9)

  // CLUSTER G — Far-right accent
  const gx = cx(0.93), gy = cy(0.55)
  place('roseBud',     gx - 1,  gy - 5)
  place('leafGroup',   gx - 3,  gy - 1)
  place('smallDaisy',  gx,      gy + 3)
  place('leafSingle',  gx + 1,  gy + 6)
  vine(gx, gy - 2, gx - 1, gy + 1)

  // CLUSTER H — Lower left: violet accent
  const hx = cx(0.14), hy = cy(0.70)
  place('violet',      hx,      hy)
  place('leafGroup',   hx + 3,  hy - 3)
  place('leafSingle',  hx - 2,  hy + 3)
  vine(hx + 1, hy + 3, hx + 4, hy + 7)
  place('smallDaisy',  hx + 5,  hy + 7)
  place('leafSingleR', hx + 7,  hy + 5)

  // CLUSTER I — Lower center: bud + leaves
  const iix = cx(0.42), iiy = cy(0.73)
  place('leafGroup',   iix - 1, iiy)
  place('roseBud',     iix + 3, iiy - 4)
  vine(iix, iiy + 2, iix + 3, iiy - 2)
  place('leafSingle',  iix + 5, iiy + 2)
  place('tinyBud',     iix - 2, iiy + 3)

  // CLUSTER J — Lower right
  const jx = cx(0.75), jy = cy(0.72)
  place('daisy',       jx - 2,  jy - 2)
  place('leafGroup',   jx - 5,  jy + 1)
  place('leafSingle',  jx + 3,  jy)
  vine(jx, jy + 2, jx - 2, jy + 5)
  place('smallDaisy',  jx - 3,  jy + 5)

  // Long connecting vines
  vine(ax + 4,  ay + 6,  bx - 9,   by)
  vine(bx + 6,  by - 5,  ccx - 8,  ccy + 5)
  vine(ccx + 5, ccy + 5, ddx - 4,  ddy - 4)
  vine(ddx + 3, ddy,     ex - 6,   ey - 3)
  vine(ex + 6,  ey - 4,  fx - 7,   fy + 2)
  vine(fx + 5,  fy + 6,  gx - 4,   gy - 2)
  vine(hx + 4,  hy + 3,  bx - 2,   by + 8)
  vine(hx + 6,  hy + 5,  iix - 4,  iiy + 2)
  vine(iix + 4, iiy + 2, jx - 7,   jy + 2)
  vine(jx,      jy - 2,  ex - 1,   ey + 8)

  // Scattered accent leaves along vines
  const scatters: [string, number, number][] = [
    ['leafSingle',  cx(0.17), cy(0.36)],
    ['leafSingleR', cx(0.28), cy(0.34)],
    ['leafSingle',  cx(0.37), cy(0.28)],
    ['leafSingleR', cx(0.43), cy(0.38)],
    ['leafSingle',  cx(0.57), cy(0.44)],
    ['leafSingleR', cx(0.59), cy(0.33)],
    ['leafSingle',  cx(0.72), cy(0.42)],
    ['leafSingleR', cx(0.78), cy(0.56)],
    ['leafSingle',  cx(0.88), cy(0.44)],
    ['leafSingle',  cx(0.20), cy(0.65)],
    ['leafSingleR', cx(0.32), cy(0.68)],
    ['leafSingle',  cx(0.52), cy(0.66)],
    ['smallDaisy',  cx(0.34), cy(0.58)],
    ['tinyBud',     cx(0.62), cy(0.64)],
  ]
  scatters.forEach(([key, c, r]) => place(key, c, r))

  return out
}

function drawStitch(
  ctx:   CanvasRenderingContext2D,
  x:     number,
  y:     number,
  color: string,
  alpha: number,
) {
  ctx.globalAlpha = alpha
  const pad = CELL * 0.17
  ctx.strokeStyle = color
  ctx.lineWidth   = 1.35
  ctx.lineCap     = 'round'
  ctx.beginPath()
  ctx.moveTo(x + pad,        y + pad)
  ctx.lineTo(x + CELL - pad, y + CELL - pad)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x + CELL - pad, y + pad)
  ctx.lineTo(x + pad,        y + CELL - pad)
  ctx.stroke()
}

export default function CrossStitchCanvas() {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const targetRef  = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const pRafRef    = useRef(0)
  const dRafRef    = useRef(0)

  useEffect(() => {
    const wrap   = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const OVER = 60
    const W = wrap.offsetWidth  + OVER * 2
    const H = wrap.offsetHeight + OVER * 2
    canvas.width  = W
    canvas.height = H
    canvas.style.position = 'absolute'
    canvas.style.top      = `-${OVER}px`
    canvas.style.left     = `-${OVER}px`
    canvas.style.width    = `${W}px`
    canvas.style.height   = `${H}px`

    const totalCols = Math.ceil(W / CELL)
    const totalRows = Math.ceil(H / CELL)
    const stitches  = buildPattern(totalCols, totalRows)

    // Shuffle for organic non-linear reveal
    for (let i = stitches.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[stitches[i], stitches[j]] = [stitches[j], stitches[i]]
    }

    // ── Per-stitch alpha: fades near the name, zero in the tagline corner ──
    // Name occupies roughly y 32%–68% of the hero (vertical centre band).
    // Bottom-left corner (x < 22%, y > 80%) is cleared for the tagline text.
    function stitchAlpha(col: number, row: number): number {
      const xFrac = col / totalCols
      const yFrac = row / totalRows

      // Hard clear — bottom-left tagline block.
      // Tagline text reaches ~160px from section-left on mobile, ~300px on desktop.
      // Canvas includes OVER=60px extra on the left, so convert to canvas fractions.
      const sectionW       = (wrap?.offsetWidth ?? W) 
      const taglineRightPx = sectionW < 640 ? 200 : 320   // section px (with buffer)
      const xTagClear      = (taglineRightPx + OVER) / W   // canvas fraction
      if (xFrac < xTagClear && yFrac > 0.78) return 0

      // Smooth fade in the name band (centred at 50%, half-width 20%)
      const BASE     = 0.60
      const MIN      = 0.12
      const MID      = 0.50
      const HALF     = 0.20
      const dist = Math.abs(yFrac - MID)
      if (dist < HALF) {
        const t = dist / HALF                    // 0 = dead-centre, 1 = edge
        return MIN + (BASE - MIN) * (t * t)      // quadratic ease-out
      }
      return BASE
    }

    let drawn = 0
    const BATCH = 10

    const tick = () => {
      const end = Math.min(drawn + BATCH, stitches.length)
      for (let i = drawn; i < end; i++) {
        const s = stitches[i]
        const a = stitchAlpha(s.col, s.row)
        if (a < 0.01) continue
        drawStitch(ctx, s.col * CELL, s.row * CELL, s.color, a)
      }
      drawn = end
      if (drawn < stitches.length) dRafRef.current = requestAnimationFrame(tick)
    }

    const timer = setTimeout(() => {
      dRafRef.current = requestAnimationFrame(tick)
    }, 900)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(dRafRef.current)
    }
  }, [])

  useEffect(() => {
    const hero   = wrapRef.current?.parentElement
    const canvas = canvasRef.current
    if (!hero || !canvas) return

    const MAX = 24

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const nx = ((e.clientX - rect.left)  / rect.width  - 0.5) * MAX * 2
      const ny = ((e.clientY - rect.top)   / rect.height - 0.5) * MAX * 2
      targetRef.current = { x: -nx, y: -ny }

      if (!pRafRef.current) {
        const lerp = () => {
          const cur = currentRef.current
          const tgt = targetRef.current
          const LERP = 0.072
          const nx2 = cur.x + (tgt.x - cur.x) * LERP
          const ny2 = cur.y + (tgt.y - cur.y) * LERP
          currentRef.current = { x: nx2, y: ny2 }
          canvas.style.transform = `translate(${nx2}px, ${ny2}px)`
          const settled = Math.abs(tgt.x - nx2) < 0.04 && Math.abs(tgt.y - ny2) < 0.04
          pRafRef.current = settled ? 0 : requestAnimationFrame(lerp)
        }
        pRafRef.current = requestAnimationFrame(lerp)
      }
    }

    const onLeave = () => { targetRef.current = { x: 0, y: 0 } }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(pRafRef.current)
      pRafRef.current = 0
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position:      'absolute',
        inset:         0,
        pointerEvents: 'none',
        zIndex:        1,
        overflow:      'hidden',
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}
