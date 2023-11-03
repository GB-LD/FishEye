/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'old-brick': {
          DEFAULT: '#901C1C',
          50: '#E67E7E',
          100: '#E36D6D',
          200: '#DC4A4A',
          300: '#D42929',
          400: '#B22323',
          500: '#901C1C',
          600: '#611313',
          700: '#320A0A',
          800: '#030101',
          900: '#000000',
          950: '#000000'
        },
        'flame-pea': {
          DEFAULT: '#D3573C',
          50: '#F5D8D2',
          100: '#F1CAC1',
          200: '#EAADA0',
          300: '#E2907F',
          400: '#DB745D',
          500: '#D3573C',
          600: '#AF4028',
          700: '#822F1D',
          800: '#541F13',
          900: '#260E09',
          950: '#0F0603'
        },
      },
    },
  },
  plugins: [],
}

