/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      borderRadius: {
        '31px': '31px',
      },
      backgroundColor: {
        'custom-blue': '#64F9EA',
      },
    },
  },
  plugins: {
    tailwindcss: { config: './tailwindcss-config.js' },
    autoprefixer: {},
  },
}

