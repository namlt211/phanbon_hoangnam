/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./until/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-orange": "#d46312",
        "light-while": "rgba(255,255,255,0.18)",
      },
    },
    screens: {
      sm: "500px",
      md: [{ min: "668px", max: "767px" }, { min: "868px" }],
      lg: "1100px",
      xl: "1400px",
    },
  },
  plugins: [],
};
