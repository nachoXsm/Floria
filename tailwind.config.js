/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Paleta Floria (del brand kit)
        floria: {
          950:  '#0D1E15',
          900:  '#1E3D2B', // verde profundo principal
          800:  '#2C5A3D',
          700:  '#3A7A52',
          600:  '#4C7F5B', // #4C7F5B
          500:  '#4C7F5B',
          400:  '#A7C4A1', // verde suave
          300:  '#C5D9C2',
          200:  '#E7EFE6',
          100:  '#F2F7F1', // beige verdoso
          50:   '#F9FCF8',
        },
        pink: {
          floria: '#E8C4B9', // rosa natural del logo
        },
        cream: '#F2E9DD',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
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
