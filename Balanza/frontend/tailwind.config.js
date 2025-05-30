/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';
export default  {
    content: [
      "./index.html",
      "./src/pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#31314d',
          muted: '#6B7280',
        },
        fontFamily: {
          logo: ['"Clash Display"', 'serif'],
          sans: ['"Manrope"', 'sans-serif'],
        },
      },
    },
    plugins: [scrollbar,],
  }
  