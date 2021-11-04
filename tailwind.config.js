const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      background: "#061B26",
      greyfont: "#9E9E9E",
      whitefont: "#ffffff",
      lightorange: "#F0AF5E",
      orange: "#F0875E",
      green: "#73A34D",
      darkgreen: "#438B71",
      blue: "#4D9EA3",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
