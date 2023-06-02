/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00BCD4",
        danger: "#FA0D0D",
        oaksgreen: "#82B22E",
        oaksyellow: "#FFAD10",
        oaksdark: "#4A4848",
      },
      screens: {
        xs: "300px",
      },
      backgroundColor: {
        "primary-green": "#72a247",
        "light-primary-green": "rgba(130, 178, 46, 15%)",
        "light-gray": "#EDF2F6",
        "mid-gray": "#D3D4D8",
      },
      borderColor: {
        "primary-green": "#72a247",
        "mid-gray": "#D3D4D8",
        "primary-gray": "#8B90A0",
      },
      outlineColor: {
        "primary-green": "#72a247",
      },
      textColor: {
        "primary-green": "#72a247",
        "primary-gold": "#FFAE10",
        "primary-gray": "#8B90A0",
        "secondary-gray": "#505565",
      },
      boxShadow: {
        even: "0 0 16px #abbed1",
      },
      accentColor: {
        "primary-green": "#72a247",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
