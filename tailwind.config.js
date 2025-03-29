/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#6366f1',   // Example primary color (indigo)
          secondary: '#a855f7', // Example secondary color (purple)
          accent: '#10b981',    // Example accent color (green)
        },
        animation: {
          'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        },
        keyframes: {
          shake: {
            '0%, 100%': { transform: 'translateX(0)' },
            '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
            '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
          }
        }
      },
    },
    plugins: [],
  }