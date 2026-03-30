/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0EB',
        warm: '#E8E0D8',
        charcoal: '#1A1A1A',
        abyss: '#0A0A0A',
        smoke: '#2A2A2A',
        rust: '#C45A3C',
        amber: '#D4943A',
        steel: '#7A8B99',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
