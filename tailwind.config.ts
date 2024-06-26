import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "waving-hand": "wave 2s linear infinite",
      },
    },
  },
  safelist: [
    {
      pattern:
        /bg-(amber|emerald|red|purple|lime|indigo|pink|cyan|blue|violet)-500/,
    },
    {
      pattern:
        /text-(amber|emerald|red|purple|lime|indigo|pink|cyan|blue|violet)-500/,
    },
    {
      pattern:
        /border-(amber|emerald|red|purple|lime|indigo|pink|cyan|blue|violet)-500/,
    },
    {
      pattern:
        /from-(amber|emerald|red|purple|lime|indigo|pink|cyan|blue|violet)-600/,
    },
    {
      pattern:
        /to-(amber|emerald|red|purple|lime|indigo|pink|cyan|blue|violet)-500/,
    },
  ],
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-debug-screens"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;

export default config;
