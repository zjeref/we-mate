/** @type {import('tailwindcss').Config} */
/** @type {import('fontsource-poppins').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F4F4F4",
        primary: "#3E6765",
        secondary: "#FF4026",
        blackk: "#393939"
      }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}

