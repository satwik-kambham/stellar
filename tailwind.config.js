/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {},
    colors: {
      "dark-background": "#21252b",
      "light-background": "#282c34",
      "default-text": "#abb2bf",
      "current-line": "#2c313c",
      "text-selected-background": "#3e4451",
    }
  },
  plugins: [],
}
