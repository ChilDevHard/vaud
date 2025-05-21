module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './styles/globals.css'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        phaseInFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      },
      animation: {
        phaseInFromLeft: 'phaseInFromLeft 1s ease-out forwards',
      }
    },
  },
  plugins: [require('tw-animate-css')],
}
