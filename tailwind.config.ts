import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        type: {
          "0%": { width: "0ch" },
          "100%": { width: "var(--text-length)" },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "currentColor" },
        },
      },
      animation: {
        typewriter:
          "type 3s steps(var(--text-length)) 1s forwards, blink .7s step-end infinite",
      },
    },
    colors: {
      primary: "#FAF9F5",
      "primary-dark": "#0f172a",
      navy: "#001F3F",
      green: "#0b7373",
      "green-light": "#14b8a6",
      white: "#ffffff",
      black: "#000000",
      gold: "#D6B66B",
      transparent: "transparent",
      "green-80": "#004040",
      // Dark mode specific
      "dark-bg": "#0f172a",
      "dark-card": "#1e293b",
      "dark-border": "#334155",
      "dark-text": "#e2e8f0",
      "dark-text-muted": "#94a3b8",
    },
  },
  plugins: [],
};
export default config;
