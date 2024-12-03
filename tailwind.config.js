/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#2f3238",
        primaryhover1: "#2c2f35",
        primaryhover2: "#2c2f35",
      },
    },
  },
  plugins: [],
};
