/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          light: '#FCFAF6',
          DEFAULT: '#FDFBF7',
          dark: '#F5EFE6',
        },
        sand: {
          light: '#FAF7F2',
          DEFAULT: '#F0EAE1',
          dark: '#E2D9C9',
        },
        terracotta: {
          light: '#D78B78',
          DEFAULT: '#C06C53',
          dark: '#A54F3B',
        },
        maroon: {
          light: '#7B2E24',
          DEFAULT: '#581C16',
          dark: '#3D0E09',
        },
        mud: {
          light: '#6E5A4D',
          DEFAULT: '#4E3E37',
          dark: '#352822',
        },
        olive: {
          light: '#8E9E8A',
          DEFAULT: '#697A65',
          dark: '#4E5B4B',
        },
        charcoal: {
          light: '#2D2E2B',
          DEFAULT: '#1E1F1D',
          dark: '#141413',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        handwritten: ['"Caveat"', 'cursive'],
      },
    },
  },
  plugins: [],
}
