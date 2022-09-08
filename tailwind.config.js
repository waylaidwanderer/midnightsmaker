/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
    screens: {
      md: '950px',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
