/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "@/(dashboard)/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // <- if you have a components dir
    "./pages/**/*.{js,ts,jsx,tsx}", // <- optional for legacy pages
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
