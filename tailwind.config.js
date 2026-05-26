/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: 'rgb(var(--kit-surface-rgb) / <alpha-value>)',
          dark: 'rgb(var(--kit-page-rgb) / <alpha-value>)',
          light: 'rgb(var(--kit-field-rgb) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(var(--kit-gold-rgb) / <alpha-value>)',
          light: 'rgb(var(--kit-gold-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--kit-gold-dark-rgb) / <alpha-value>)',
        },
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'count-up': 'countUp 1s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

