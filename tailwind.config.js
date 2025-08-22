/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E63946",
        secondary: "#F1FA3C",
        danger: "#F44336",
        light: "#F2F4F5",
        dark: "#1D3557",
      },
    },
  },
  plugins: [],
}
