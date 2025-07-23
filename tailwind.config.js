/** @type {import('tailwindcss').Config} */
import PrimeUI from "tailwindcss-primeui";

module.exports = {
  darkMode: ["selector", '[class="p-dark"]'],
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1920px",
    },
  },
  plugins: [PrimeUI],
};
