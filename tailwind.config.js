/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bs-indigo': '#6610f2',
        'bs-blue': '#0d6efd',
        'grey-dark': '#343a40',
        'dark': '#1d2127',
        'bs-light': '#f8f9fa'
      }
    },
  },
  plugins: [],
}

