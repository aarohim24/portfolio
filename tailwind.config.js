/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0C0C0C',
        'bg-alt': '#0f0f0f',
        surface: '#111111',
        border: '#1a1a1a',
        'border-card': '#1e1e1e',
        'border-subtle': '#2a2a2a',
        'text-primary': '#D7E2EA',
        'text-muted': '#777777',
        'text-dim': '#555555',
      },
      fontFamily: {
        display: ['Kanit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['"Instrument Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}
