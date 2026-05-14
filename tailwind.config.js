/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        floria: {
          950: '#0D1E15',
          900: '#1E3D2B',
          800: '#2C5A3D',
          700: '#3A7A52',
          600: '#4C7F5B',
          500: '#4C7F5B',
          400: '#A7C4A1',
          300: '#C5D9C2',
          200: '#E7EFE6',
          100: '#F2F7F1',
          50:  '#F9FCF8',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
