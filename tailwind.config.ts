import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Light mode
        ivory: '#F5F1E8',
        'ivory-card': '#FAF7F2',
        emerald: {
          DEFAULT: '#1E4D3A',
          hover: '#25624A',
          light: '#E8F2ED',
        },
        coral: {
          DEFAULT: '#C44B3A',
          light: '#FDECEA',
        },
        gold: {
          DEFAULT: '#B89A5B',
          tint: '#D5C6A1',
          light: '#FBF6EC',
        },
        'intel-blue': {
          DEFAULT: '#7DA8B5',
          light: '#EBF3F6',
        },
        // Dark mode
        charcoal: {
          DEFAULT: '#121816',
          surface: '#1B2320',
          panel: '#222C28',
        },
      },
      boxShadow: {
        card: '0 2px 12px rgba(0,0,0,0.06)',
        'card-dark': '0 2px 16px rgba(0,0,0,0.25)',
        'glow-emerald': '0 0 20px rgba(60,154,114,0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
export default config
