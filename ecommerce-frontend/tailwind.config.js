/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mont: ["Montserrat", "sans-serif"],
        display: ["Syne", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      colors: {
        store: {
          bg: "#EEF1F4",
          surface: "#FFFFFF",
          text: "#111827",
          muted: "#5B6575",
          accent: "#0D9488",
          line: "rgba(17,24,39,0.1)",
        },
        admin: {
          bg: "#0B0F17",
          surface: "#141A24",
          elevated: "#1C2433",
          text: "#F3F4F6",
          muted: "#9CA3AF",
          accent: "#3B82F6",
          line: "rgba(255,255,255,0.1)",
        },
      },
    },
  },
  plugins: [],
};
