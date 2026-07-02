/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(99, 102, 241, 0.1)",
        "glow": "0 0 30px rgba(99, 102, 241, 0.12)",
        "glow-lg": "0 0 50px rgba(99, 102, 241, 0.15)",
        "glow-emerald": "0 0 20px rgba(52, 211, 153, 0.15)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        "float-1": "float-orb-1 8s ease-in-out infinite",
        "float-2": "float-orb-2 10s ease-in-out infinite",
        "float-3": "float-orb-3 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
