/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0b0f14',
          2: '#1c2330',
        },
        cream: {
          DEFAULT: '#f5f0e8',
          2: '#ede8df',
        },
        teal: {
          DEFAULT: '#00b89c',
          2: '#009e86',
        },
        amber: '#f59e0b',
        red: '#ef4444',
        blue: '#3b82f6',
        muted: '#6b7a8d',
        borderLight: 'rgba(0,0,0,0.1)',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['Syne', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease both',
        pulseCustom: 'pulseCustom 2s ease infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseCustom: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0.6' },
        }
      }
    },
  },
  plugins: [],
}
