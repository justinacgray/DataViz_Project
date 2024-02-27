/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,jsx}",
    './src/**/*.js',
    './public/**/*.html',
    './public/**/*.js',
    './node_modules/preline/dist/*.js'
  ],
  
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px', // Example of a custom screen
    },
    extend: {
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
  }
