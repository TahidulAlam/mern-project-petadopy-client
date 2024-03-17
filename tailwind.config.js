/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: { poppins: ["Poppins", "sans-serif", "system-ui"] },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/petadopy-frontend/src/assets/navBg.png')",
      },
    },
  },
  plugins: [],
};
