/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f4efe4',
        paper: '#ece5d6',
        charcoal: '#1b1c19',
        ink: '#26251f',
        forest: '#2f4235',
        moss: '#5c7a5f',
        rust: '#a4402f',
        clay: '#c06a4d',
        sky: '#7c93a3',
        sand: '#d8c8a8',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Space Grotesk"', 'system-ui', '-apple-system', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
    },
  },
  plugins: [],
}
