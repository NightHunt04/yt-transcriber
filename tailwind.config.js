/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'kannit': ['Kanit', 'sans-serif'],
      },
      animation: {
        'shadow-pulse': 'shadow-pulse 10s ease-in-out infinite',
        'shadow-pulse-2': 'shadow-pulse 7s ease-in-out infinite',
        'left-shadow-pulse': 'left-shadow-pulse 10s ease-in-out infinite',
      },
      keyframes: {
        'shadow-pulse': {
          '0%, 100%': { 
            boxShadow: '-2px 2px 4px -1px rgba(255, 0, 0, 0.01), 2px 2px 4px -1px rgba(255, 0, 0, 0.01), 0 3px 4px -1px rgba(255, 0, 0, 0.05)' 
          },
          '25%': { 
            boxShadow: '-4px 4px 8px -2px rgba(255, 0, 0, 0.03), 4px 4px 8px -2px rgba(255, 0, 0, 0.03), 0 6px 7px -2px rgba(255, 0, 0, 0.08)' 
          },
          '50%': { 
            boxShadow: '-6px 6px 12px -3px rgba(255, 0, 0, 0.06), 6px 6px 12px -3px rgba(255, 0, 0, 0.06), 0 10px 12px -3px rgba(255, 0, 0, 0.12)' 
          },
          '75%': { 
            boxShadow: '-8px 8px 15px -5px rgba(255, 0, 0, 0.1), 8px 8px 15px -5px rgba(255, 0, 0, 0.1), 0 15px 18px -5px rgba(255, 0, 0, 0.15)' 
          },
        },

      'left-shadow-pulse': {
          '0%, 100%': { 
            boxShadow: '-2px 4px 6px -1px rgba(255, 0, 0, 0.002), -1px 2px 4px -1px rgba(255, 0, 0, 0.03)' 
          },
          '25%': { 
            boxShadow: '-6px 12px 15px -3px rgba(255, 0, 0, 0.03), -2px 4px 6px -2px rgba(255, 0, 0, 0.07)' 
          },
          '50%': { 
            boxShadow: '-10px 20px 22px -5px rgba(255, 0, 0, 0.05), -5px 10px 10px -5px rgba(255, 0, 0, 0.07)' 
          },
          '75%': { 
            boxShadow: '-12px 25px 40px -12px rgba(255, 0, 0, 0.1), -6px 12px 15px -6px rgba(255, 0, 0, 0.07)' 
          },
        },
    },
  }
},
  plugins: [],
}