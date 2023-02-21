/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'back': '#ffffff',
        'back-light': '#f6fafd',
        'back-api': '#e5eef5',
        'prime': '#ff3e00',
        'second': '#676778',
        'flash': '#40b3ff',
        'highlight': '#ffff82',
        'heading': '#222',
        'text': '#444',
        'second-text': '#7b7766',
        'sidebar-text': 'rgba(255, 255, 255, .9)',
      }
    },
  },
  plugins: [],
}
