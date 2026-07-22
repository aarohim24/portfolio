/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:             '#C5E0E6',   // Blue Lagoon
        'bg-alt':       '#B8D8DF',   // slightly deeper blue-gray
        surface:        '#D4E8ED',   // lighter tint for cards/surfaces
        border:         '#A8CDD5',   // medium blue-gray border
        'border-card':  '#9BC0C9',   // card borders
        'border-subtle':'#7D99A3',   // subtle borders
        'text-primary': '#4A2B17',   // Chocolate Fondant
        'text-muted':   '#6B4730',   // mid-brown
        'text-dim':     '#8B6A55',   // soft warm brown
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
        serif: ['Fraunces', 'serif'],
        sans: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}
