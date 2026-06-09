// ── Design tokens ────────────────────────────────────────────────────────────
// Canonical color palette for the portfolio. Import from here instead of
// repeating raw hex strings in component files.

export const COLORS = {
  // Backgrounds
  bg: '#0C0C0C',
  bgAlt: '#0f0f0f',
  bgCard: '#111111',

  // Borders
  border: '#1a1a1a',
  borderCard: '#1e1e1e',
  borderSubtle: '#2a2a2a',

  // Text
  text: '#D7E2EA',
  muted: '#777777',
  dim: '#555555',
  ghost: '#3a3a3a',
  ghostDark: '#1e1e1e',
} as const

export type ColorKey = keyof typeof COLORS
