/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#07131F',
          surface: '#0C1D2B',
          elevated: '#122A3A',
          border: '#203B4D',
          primary: '#20A4F3',
          secondary: '#39C6B4',
          warning: '#F2A93B',
          error: '#E85D5D',
          success: '#46C37B',
          textPrimary: '#F3F7FA',
          textSecondary: '#9EB3C1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
