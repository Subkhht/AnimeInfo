/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        anime: {
          primary: '#FF1493',
          secondary: '#FF69B4',
          purple: '#9D4EDD',
          blue: '#4CC9F0',
          cyan: '#00F5FF',
          yellow: '#FFD700',
          orange: '#FF6B35',
          dark: '#0A0E27',
          darker: '#050711',
          light: '#FFE5F1',
          accent: '#00FFFF',
          'neon-pink': '#FF10F0',
          'neon-blue': '#10F0FF',
        }
      },
      fontFamily: {
        'anime': ['"Poppins"', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glow-pulse 1.5s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'rainbow': 'rainbow 3s ease-in-out infinite',
        'scale-up': 'scaleUp 0.3s ease-out',
        'neon-flicker': 'neonFlicker 1.5s infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #FF1493, 0 0 10px #FF1493' },
          '100%': { boxShadow: '0 0 20px #FF1493, 0 0 40px #FF1493, 0 0 60px #FF1493' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px #FF1493, 0 0 20px #FF1493, 0 0 30px #FF1493' },
          '50%': { boxShadow: '0 0 20px #00FFFF, 0 0 40px #00FFFF, 0 0 60px #00FFFF' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        rainbow: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        neonFlicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            textShadow: '0 0 10px #FF1493, 0 0 20px #FF1493, 0 0 30px #00FFFF, 0 0 40px #00FFFF',
          },
          '20%, 24%, 55%': {
            textShadow: 'none',
          },
        },
      },
    },
  },
  plugins: [],
}
