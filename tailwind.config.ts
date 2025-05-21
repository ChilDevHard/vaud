module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './styles/globals.css'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
      },
      animation: {
      }
    },
  },
  plugins: [require('tw-animate-css')],
}
