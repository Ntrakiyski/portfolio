/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-text': 'rgb(10, 10, 10)',
        'button-bg': 'rgb(28, 28, 28)',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        'plex-mono': ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        '28px': '28px',
        '60px': '60px',
        '64px': '64px',
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
        'accordion-down': 'accordion-down 250ms ease-out',
        'accordion-up': 'accordion-up 200ms ease-in',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'accordion-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
