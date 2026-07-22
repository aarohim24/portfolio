import React from 'react'

// ─── Shared types ───────────────────────────────────────────────────────────
interface OrnamentProps {
  color?: string
  opacity?: number
  className?: string
}

// ─── BotanicalCorner ────────────────────────────────────────────────────────
// Vine + leaf corner piece, absolutely positioned.
// CSS scale() mirrors it for all 4 corners without needing 4 separate SVGs.
interface CornerProps extends OrnamentProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  size?: number
}

export function BotanicalCorner({
  position,
  size = 160,
  color = '#4A2B17',
  opacity = 0.09,
}: CornerProps) {
  const scaleX = position.includes('right') ? -1 : 1
  const scaleY = position.includes('bottom') ? -1 : 1

  const posStyle: React.CSSProperties = {
    position: 'absolute',
    top: position.includes('top') ? 0 : 'auto',
    bottom: position.includes('bottom') ? 0 : 'auto',
    left: position.includes('left') ? 0 : 'auto',
    right: position.includes('right') ? 0 : 'auto',
    transformOrigin: `${position.includes('left') ? '0%' : '100%'} ${position.includes('top') ? '0%' : '100%'}`,
    transform: `scale(${scaleX}, ${scaleY})`,
    pointerEvents: 'none',
    color,
    opacity,
    overflow: 'visible',
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      style={posStyle}
      aria-hidden="true"
    >
      {/* Primary stem — sweeps from corner down toward bottom */}
      <path
        d="M 14,14 C 14,48 24,72 44,92 C 57,107 64,112 70,130"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Secondary stem — sweeps from corner right */}
      <path
        d="M 14,14 C 48,14 72,24 92,44 C 107,57 112,64 130,70"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Small connecting tendril */}
      <path
        d="M 38,50 C 44,44 50,44 50,50 C 50,56 44,56 38,50"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />

      {/* ── Leaves on primary stem (going down) ── */}
      {/* Leaf at ~(22,36) — points left */}
      <path d="M 22,32 C 8,28 4,38 10,44 C 18,44 24,38 22,32" fill="currentColor" />
      {/* Leaf at ~(34,62) — points left */}
      <path d="M 32,58 C 18,52 14,64 20,70 C 28,70 34,64 32,58" fill="currentColor" />
      {/* Leaf at ~(54,88) — points left */}
      <path d="M 50,84 C 36,78 32,90 38,96 C 46,96 52,90 50,84" fill="currentColor" />

      {/* ── Leaves on secondary stem (going right) ── */}
      {/* Leaf at ~(36,22) — points up */}
      <path d="M 32,22 C 28,8 38,4 44,10 C 44,18 36,24 32,22" fill="currentColor" />
      {/* Leaf at ~(62,34) — points up */}
      <path d="M 58,32 C 52,18 62,14 68,20 C 68,28 62,34 58,32" fill="currentColor" />
      {/* Leaf at ~(88,54) — points up */}
      <path d="M 84,50 C 78,36 88,32 94,38 C 94,46 88,52 84,50" fill="currentColor" />

      {/* ── Corner bud — small teardrop at the origin ── */}
      <path d="M 14,14 C 6,6 2,12 6,18 C 12,20 16,16 14,14" fill="currentColor" />

      {/* ── Tip buds at ends of both stems ── */}
      <circle cx="70" cy="132" r="3.5" fill="currentColor" />
      <path d="M 65,128 C 62,120 70,116 74,122 C 76,130 70,134 65,128" fill="currentColor" opacity="0.7" />
      <circle cx="132" cy="70" r="3.5" fill="currentColor" />
      <path d="M 128,65 C 120,62 116,70 122,74 C 130,76 134,70 128,65" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

// ─── BotanicalDivider ───────────────────────────────────────────────────────
// Sinuous vine + leaf horizontal divider. Replaces plain border-top rules.
export function BotanicalDivider({
  color = '#4A2B17',
  opacity = 0.14,
  className = '',
}: OrnamentProps) {
  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <svg
        width="340"
        height="52"
        viewBox="0 0 340 52"
        fill="none"
        style={{ color, opacity }}
      >
        {/* ── Central lotus motif ── */}
        {/* Top petal */}
        <path d="M 170,22 C 165,14 163,6 170,6 C 177,6 175,14 170,22" fill="currentColor" />
        {/* Left petal */}
        <path d="M 170,24 C 162,20 156,22 156,28 C 158,32 166,30 170,24" fill="currentColor" />
        {/* Right petal */}
        <path d="M 170,24 C 178,20 184,22 184,28 C 182,32 174,30 170,24" fill="currentColor" />
        {/* Lower-left petal */}
        <path d="M 170,26 C 163,24 158,30 162,36 C 166,38 170,32 170,26" fill="currentColor" opacity="0.85" />
        {/* Lower-right petal */}
        <path d="M 170,26 C 177,24 182,30 178,36 C 174,38 170,32 170,26" fill="currentColor" opacity="0.85" />
        {/* Center */}
        <circle cx="170" cy="26" r="3" fill="currentColor" />

        {/* ── Left stem — sinuous curve from center to left edge ── */}
        <path
          d="M 165,27 C 148,28 126,22 100,26 C 78,30 56,24 30,30 C 20,32 12,30 4,33"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* ── Right stem — mirror ── */}
        <path
          d="M 175,27 C 192,28 214,22 240,26 C 262,30 284,24 310,30 C 320,32 328,30 336,33"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* ── Left leaves ── */}
        <path d="M 126,23 C 122,13 130,9 136,15 C 135,22 129,25 126,23" fill="currentColor" />
        <path d="M 84,26 C 78,16 86,12 92,18 C 91,25 86,28 84,26" fill="currentColor" />
        <path d="M 42,30 C 36,20 44,16 50,22 C 49,29 44,32 42,30" fill="currentColor" />

        {/* ── Right leaves (mirror) ── */}
        <path d="M 214,23 C 218,13 210,9 204,15 C 205,22 211,25 214,23" fill="currentColor" />
        <path d="M 256,26 C 262,16 254,12 248,18 C 249,25 254,28 256,26" fill="currentColor" />
        <path d="M 298,30 C 304,20 296,16 290,22 C 291,29 296,32 298,30" fill="currentColor" />

        {/* ── End curls ── */}
        <path d="M 4,33 C -2,30 -2,38 3,40 C 8,40 8,34 4,33" fill="currentColor" />
        <path d="M 336,33 C 342,30 342,38 337,40 C 332,40 332,34 336,33" fill="currentColor" />
      </svg>
    </div>
  )
}

// ─── FloralAccent ────────────────────────────────────────────────────────────
// Small symmetrical sprig used above section headings.
export function FloralAccent({
  color = '#4A2B17',
  opacity = 0.14,
  className = '',
}: OrnamentProps) {
  return (
    <svg
      width="210"
      height="38"
      viewBox="0 0 210 38"
      fill="none"
      className={className}
      style={{ color, opacity, display: 'block' }}
      aria-hidden="true"
    >
      {/* ── Central 5-petal flower ── */}
      {/* Top petal */}
      <path d="M 105,16 C 102,10 105,5 105,5 C 105,5 108,10 105,16" fill="currentColor" />
      {/* Upper-right petal */}
      <path d="M 105,16 C 110,12 115,14 114,19 C 110,22 105,18 105,16" fill="currentColor" />
      {/* Lower-right petal */}
      <path d="M 105,18 C 112,18 115,24 111,27 C 107,28 104,22 105,18" fill="currentColor" />
      {/* Lower-left petal */}
      <path d="M 105,18 C 98,18 95,24 99,27 C 103,28 106,22 105,18" fill="currentColor" />
      {/* Upper-left petal */}
      <path d="M 105,16 C 100,12 95,14 96,19 C 100,22 105,18 105,16" fill="currentColor" />
      {/* Center dot */}
      <circle cx="105" cy="19" r="2.8" fill="currentColor" />

      {/* ── Left branch from center ── */}
      <path
        d="M 102,20 C 88,21 72,17 56,20 C 44,22 32,19 18,22"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* ── Right branch ── */}
      <path
        d="M 108,20 C 122,21 138,17 154,20 C 166,22 178,19 192,22"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />

      {/* ── Left leaves ── */}
      <path d="M 74,18 C 70,9 77,6 82,11 C 81,18 75,20 74,18" fill="currentColor" />
      <path d="M 46,20 C 41,11 48,8 53,13 C 52,20 47,22 46,20" fill="currentColor" />

      {/* ── Right leaves (mirror) ── */}
      <path d="M 136,18 C 140,9 133,6 128,11 C 129,18 135,20 136,18" fill="currentColor" />
      <path d="M 164,20 C 169,11 162,8 157,13 C 158,20 163,22 164,20" fill="currentColor" />

      {/* ── Tip dots ── */}
      <circle cx="16" cy="23" r="1.8" fill="currentColor" />
      <circle cx="194" cy="23" r="1.8" fill="currentColor" />
    </svg>
  )
}
