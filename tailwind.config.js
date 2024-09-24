/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-pearl": {
          50: "#f0f7ff",
          100: "#e0edfe",
          200: "#bbdcfc",
          300: "#7fbffa",
          400: "#3a9ff6",
          500: "#1183e6",
          600: "#0465c5",
          700: "#05509f",
          800: "#094683",
          900: "#0d3b6d",
          950: "#051529",
        },
        color1: "#070F2B",
        color2: "#0d1a47",
        color3: "#535C91",
        color4: "#9290C3",
      },
    },
  },
  plugins: [],
};
