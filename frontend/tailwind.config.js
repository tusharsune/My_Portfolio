/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // FORCE these classes to exist
  safelist: [
    'bg-red-600',
    'text-white',
    'p-10',
    'text-4xl',
    'fixed',
    'top-0',
    'left-0',
    'z-50',
    'bg-slate-900' // Your main dark mode color
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}