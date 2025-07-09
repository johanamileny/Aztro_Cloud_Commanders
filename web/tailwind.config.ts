import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0033A0",
          dark: "#002169",
          light: "#0055CC",
        },
        accent: {
          DEFAULT: "#75B000",
          dark: "#4B7A00",
        },
        danger: "#FF4D4D",
        background: {
          DEFAULT: "#f8f9fa",
          dark: "#1a1f35",
          white: "#ffffff",
        },
        text: {
          DEFAULT: "#222222",
          light: "#f8f9fa",
          muted: "#6b7280",
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        }
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config