/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(172, 67%, 45%)",
        veryDarkCyan: "hsl(183, 100%, 15%)",
        darkGrayCyan: "hsl(186, 14%, 43%)",
        grayCyan: "hsl(184, 14%, 56%)",
        lightGrayCyan: "hsl(185, 41%, 84%)",
        veryLightGrayCyan: "hsl(189, 41%, 97%)",
        veryDarkBlue: "hsl(216, 12%, 8%)",
      },
      fontFamily: {
        overpass: "'Overpass', sans-serif",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
