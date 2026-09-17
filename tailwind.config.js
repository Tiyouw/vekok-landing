/** VEKOK — Vespa Klotok Sabtuan (CakNdut) landing page */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        amberkraft: '#D49B45',
        'amberkraft-dark': '#B87A28',
        'amberkraft-light': '#F6E6CC',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 16s linear infinite',
        'marquee-reverse': 'marqueeRev 18s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRev: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(0.98)' },
        },
      },
    },
  },
  plugins: [],
};
