import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#060D1F',
          800: '#0B1437',
          700: '#0F1D3D',
          600: '#152548',
          500: '#1A3A8F',
        },
        shield: {
          blue: '#2D7EF8',
          sky: '#4FC3F7',
          electric: '#1565C0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'aurora-1': 'aurora1 20s ease-in-out infinite',
        'aurora-2': 'aurora2 25s ease-in-out infinite',
        'aurora-3': 'aurora3 30s ease-in-out infinite',
        'ripple-1': 'ripple1 6s ease-in-out infinite',
        'ripple-2': 'ripple2 8s ease-in-out infinite',
        'ripple-3': 'ripple3 10s ease-in-out infinite',
        'float-particle': 'floatParticle 8s ease-in-out infinite',
        'glow-wave': 'glowWave 12s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        aurora1: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.3' },
          '33%': { transform: 'translate(30%, -20%) rotate(120deg)', opacity: '0.5' },
          '66%': { transform: 'translate(-20%, 30%) rotate(240deg)', opacity: '0.4' },
        },
        aurora2: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.25' },
          '33%': { transform: 'translate(-30%, 20%) rotate(-120deg)', opacity: '0.4' },
          '66%': { transform: 'translate(20%, -30%) rotate(-240deg)', opacity: '0.35' },
        },
        aurora3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.2' },
          '50%': { transform: 'translate(10%, 10%) scale(1.1)', opacity: '0.3' },
        },
        ripple1: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.2)', opacity: '0.3' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        ripple2: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '50%': { transform: 'scale(1.3)', opacity: '0.25' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        ripple3: {
          '0%': { transform: 'scale(1)', opacity: '0' },
          '50%': { transform: 'scale(1.4)', opacity: '0.2' },
          '100%': { transform: 'scale(1.7)', opacity: '0' },
        },
        floatParticle: {
          '0%, 100%': { transform: 'translate(0, 0)', opacity: '0.3' },
          '50%': { transform: 'translate(20px, -30px)', opacity: '0.8' },
        },
        glowWave: {
          '0%': { transform: 'translateX(-100%) translateY(0) rotate(-15deg)', opacity: '0' },
          '30%': { opacity: '0.7' },
          '70%': { opacity: '0.7' },
          '100%': { transform: 'translateX(300%) translateY(-200px) rotate(-15deg)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config
