/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'diablo-gold': '#c8860a',
        'diablo-dark': '#1a1a1a',
        'diablo-gray': '#2d2d2d',
        'diablo-blood': '#8b0000',
        'diablo-light-gray': '#e0e0e0',
        'diablo-medium-gray': '#8a8a8a',
        'diablo-orange': '#f0a030'
      },
      fontFamily: {
        'gothic': ['Cinzel', 'MedievalSharp', 'serif'],
        'pixel': ['Press Start 2P', 'monospace']
      }
    }
  },
  plugins: []
}
