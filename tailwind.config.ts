import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm Modernism Palette - Lujo Mediterráneo
        sand: {
          50: '#FEFDFB',
          100: '#FDF9F3',
          200: '#F9F1E4',
          300: '#F2E4CE',
          400: '#E8D3B3',
          500: '#D4BC96',
          600: '#B89B6A',
          700: '#967B4F',
          800: '#6B5A3D',
          900: '#4A3F2D',
        },
        terracotta: {
          50: '#FEF6F3',
          100: '#FCEBE4',
          200: '#F9D5C7',
          300: '#F2B49E',
          400: '#E8896A',
          500: '#D96B47',
          600: '#C4512F',
          700: '#A33F24',
          800: '#7A3020',
          900: '#52221A',
        },
        olive: {
          50: '#F7F8F4',
          100: '#EEF0E7',
          200: '#DCE1CE',
          300: '#C4CCB0',
          400: '#A4B08A',
          500: '#869468',
          600: '#6B7752',
          700: '#545D42',
          800: '#434A37',
          900: '#383E30',
        },
        sea: {
          50: '#F4F7F9',
          100: '#E8EEF3',
          200: '#CDDCE6',
          300: '#A3C1D4',
          400: '#709EBA',
          500: '#4E7E9E',
          600: '#3D6583',
          700: '#34526A',
          800: '#2E4558',
          900: '#2A3B4A',
        },
        warm: {
          white: '#FFFCF7',
          cream: '#FDF8F0',
          stone: '#E8E2D9',
        },
        dark: {
          DEFAULT: '#1A1814',
          soft: '#2D2A25',
          muted: '#4A453D',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-raleway)', 'Raleway', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'slide-in': 'slideIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'blur-in': 'blurIn 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(10px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
}

export default config
