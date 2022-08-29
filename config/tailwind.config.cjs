/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,css,js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B2434",
        secondary: "#F5F5F5",
        "t-purple": "#5035FF",
        "light-green": "#59E391",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        karla: ["Karla", "sans-serif"],
      },
      dropShadow: {
        "3xl": "0 0 70px rgba(0, 0, 0, 1)",
      },
      animation: {
        "slide-width": "slideWidth 1s ease",
        "fade-in": "fadeIn 0.4s ease-in-out",
      },
      keyframes: {
        slideWidth: {
          "0%": {
            width: "0",
          },
          "100%": {
            width: "100%",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "100%",
          },
        },
      },
    },
  },
};
