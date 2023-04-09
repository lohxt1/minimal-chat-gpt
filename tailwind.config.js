/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      spacing: {
        128: "32rem", // following the standard of 128 / 4 = 32
      },
      height: {
        128: "32rem", // following the standard of 128 / 4 = 32
      },
      width: {
        128: "32rem", // following the standard of 128 / 4 = 32
      },
      minWidth: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "1/4": "25%",
      },
    },
  },
  plugins: [],
};
