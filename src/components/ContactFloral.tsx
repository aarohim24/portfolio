import { useRef, useEffect } from 'react'

// ─── Stitch point ─────────────────────────────────────────────────────────
type S = { r: number; c: number; color: string }

// ─── Palette (matches portfolio) ─────────────────────────────────────────
const G1 = '#2D7040'   // dark green  (stem, leaves)
const G2 = '#4A9B5E'   // light green (leaf highlight)
const R1 = '#9B2355'   // deep rose   (main petals)
const R2 = '#C43E70'   // mid rose    (inner petals)
const R3 = '#D4728A'   // pale rose   (petal highlight)
const Y1 = '#D89C18'   // gold        (stamen)
const V1 = '#7460B8'   // violet      (accent flower)

// ─── Bresenham line ───────────────────────────────────────────────────────
function ln(r0:number,c0:number,r1:number,c1:number,col:string):S[]{
  const out:S[]=[]
  let dr=Math.abs(r1-r0),dc=Math.abs(c1-c0),sr=r0<r1?1:-1,sc=c0<c1?1:-1,err=dr-dc,r=r0,c=c0
  for(;;){
    out.push({r,c,color:col})
    if(r===r1&&c===c1)break
    const e=2*err
    if(e>-dc){err-=dc;r+=sr}
    if(e<dr){err+=dr;c+=sc}
  }
  return out
}

// ─── Filled rotated ellipse ───────────────────────────────────────────────
function el(cx:number,cy:number,rx:number,ry:number,deg:number,col:string):S[]{
  const out:S[]=[],a=deg*Math.PI/180,cos=Math.cos(a),sin=Math.sin(a)
  const rMax=Math.ceil(Math.max(rx,ry)+0.5),seen=new Set<string>()
  for(let dr=-rMax;dr<=rMax;dr++)
    for(let dc=-rMax;dc<=rMax;dc++){
      const lx=dc*cos+dr*sin,ly=-dc*sin+dr*cos
      if((lx/rx)**2+(ly/ry)**2<=1){
        const k=`${Math.round(cy+dr)},${Math.round(cx+dc)}`
        if(!seen.has(k)){seen.add(k);out.push({r:Math.round(cy+dr),c:Math.round(cx+dc),color:col})}
      }
    }
  return out
}

// ─── N-petal flower ───────────────────────────────────────────────────────
function flower(
  cx:number,cy:number,len:number,w:number,
  oc:string,ic:string,sc:string,n=5,rot=0
):S[]{
  const out:S[]=[]
  for(let i=0;i<n;i++){
    const d=(i/n)*360+rot,rad=d*Math.PI/180
    const px=cx+Math.cos(rad)*len*0.55,py=cy+Math.sin(rad)*len*0.55
    out.push(...el(px,py,len*0.42,w,d,oc))
    out.push(...el(px,py,len*0.20,w*0.45,d,ic))
  }
  out.push(...el(cx,cy,1.6,1.6,0,sc))
  return out
}

// ─── Leaf (oval with highlight) ───────────────────────────────────────────
function leaf(cx:number,cy:number,len:number,w:number,deg:number):S[]{
  const rad=deg*Math.PI/180
  return[
    ...el(cx,cy,len,w,deg,G1),
    ...el(cx+Math.cos(rad)*len*0.28,cy+Math.sin(rad)*len*0.28,len*0.38,w*0.52,deg,G2),
  ]
}

// ─── Build top-left corner motif ─────────────────────────────────────────
// Grid origin (r=0, c=0) = top-left corner.
// All other corners rendered by mirroring r and/or c.
function buildMotif(): S[] {
  const s: S[] = []

  // ── Double-width diagonal stem: upper-left → lower-right ───────────
  s.push(...ln(2, 2, 21, 8, G1), ...ln(2, 3, 21, 9, G1))

  // ── Branches ────────────────────────────────────────────────────────
  s.push(...ln(4,  3,  0, 8,  G1))   // branch 1 → tip near (r=0, c=8)
  s.push(...ln(8,  5,  5, 10, G1))   // branch 2 → tip near (r=5, c=10)
  s.push(...ln(13, 6, 10, 12, G1))   // branch 3 → tip near (r=10, c=12)
  s.push(...ln(18, 8, 15, 14, G1))   // branch 4 → tip near (r=15, c=14)

  // ── Leaves along the stem ────────────────────────────────────────────
  s.push(...leaf(1.5, 0.5, 3.0, 1.1, -40))  // upper-left of stem
  s.push(...leaf(4.0, 1.0, 2.5, 1.0, -25))  // left of stem
  s.push(...leaf(7.0, 1.5, 2.8, 1.1, -35))  // mid-left of stem
  s.push(...leaf(10.5,3.0, 2.5, 1.0, -28))  // lower-left of stem
  s.push(...leaf(7.0, 6.5, 2.5, 1.0,  30))  // right of stem, mid
  s.push(...leaf(12.5,8.0, 2.5, 1.0,  35))  // right of stem, lower
  s.push(...leaf(17.5,10.0,2.2, 0.9,  42))  // right of stem, lowest

  // ── Flowers at branch tips ────────────────────────────────────────────
  // Branch 1: large rose (5 petals, partially clipped by top edge)
  s.push(...flower( 0.0, 9.5, 4.5, 1.8, R1, R2, Y1, 5, 18))

  // Branch 2: medium violet bloom
  s.push(...flower( 4.5,11.5, 3.5, 1.5, V1, R2, Y1, 5, 36))

  // Branch 3: medium rose bloom
  s.push(...flower( 9.5,13.0, 3.0, 1.3, R2, R3, Y1, 5,  0))

  // Branch 4: small bud
  s.push(...flower(14.5,15.0, 2.5, 1.0, R1, R2, Y1, 5, 18))

  // Tiny accent bud very close to the corner
  s.push(...flower( 0.5, 2.0, 1.8, 0.8, R1, R2, Y1, 5,  0))

  return s
}

// ─── Cross-stitch X renderer ──────────────────────────────────────────────
function drawX(
  ctx: CanvasRenderingContext2D,
  col: number, row: number,
  sz: number, color: string, alpha: number,
  bC: number, bR: number,
) {
  if (col < 0 || row < 0 || col >= bC || row >= bR) return
  const x = col*sz, y = row*sz, p = sz*0.16
  ctx.globalAlpha  = alpha
  ctx.strokeStyle  = color
  ctx.lineWidth    = Math.max(0.8, sz*0.075)
  ctx.lineCap      = 'round'
  ctx.beginPath(); ctx.moveTo(x+p,      y+p);    ctx.lineTo(x+sz-p, y+sz-p); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(x+sz-p,   y+p);    ctx.lineTo(x+p,    y+sz-p); ctx.stroke()
  ctx.globalAlpha  = 1
}

// ─── Component ───────────────────────────────────────────────────────────
export default function ContactFloral() {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap   = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx    = canvas.getContext('2d')!

    const ALPHA  = 0.68

    const motif  = buildMotif()

    const render = () => {
      const W  = wrap.offsetWidth
      const H  = wrap.offsetHeight
      // Responsive cell size: smaller on mobile so the 4 corner motifs don't overlap
      const CELL = W < 480 ? 7 : W < 768 ? 9 : 11
      const bC = Math.floor(W / CELL)
      const bR = Math.floor(H / CELL)
      canvas.width  = bC * CELL
      canvas.height = bR * CELL
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      motif.forEach(({ r, c, color }) => {
        // Top-left  (original)
        drawX(ctx, c,       r,       CELL, color, ALPHA, bC, bR)
        // Top-right  (mirror c)
        drawX(ctx, bC-1-c,  r,       CELL, color, ALPHA, bC, bR)
        // Bottom-left  (mirror r)
        drawX(ctx, c,       bR-1-r,  CELL, color, ALPHA, bC, bR)
        // Bottom-right  (mirror both)
        drawX(ctx, bC-1-c,  bR-1-r,  CELL, color, ALPHA, bC, bR)
      })
    }

    render()
    const ro = new ResizeObserver(render)
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position:      'absolute',
        inset:         0,
        pointerEvents: 'none',
        zIndex:        0,
        overflow:      'hidden',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </div>
  )
}
