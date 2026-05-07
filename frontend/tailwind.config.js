/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a365d',
          light: '#2d4a7a',
          dark: '#0f2439',
        },
        accent: {
          DEFAULT: '#f6ad55',
          light: '#f8c47e',
          dark: '#e6942e',
        },
        dark: {
          bg: '#1a202c',
          card: '#2d3748',
          text: '#e2e8f0',
        }
      },
    },
  },
  plugins: [],
}
