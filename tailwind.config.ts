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
      colors: {
        primary: {
          //Purple --
          // "50": "#faf5ff",
          // "100": "#f3e8ff",
          // "200": "#e9d5ff",
          // "300": "#d8b4fe",
          // "400": "#c084fc",
          // "500": "#a855f7",
          // "600": "#9333ea",
          // "700": "#7e22ce",
          // "800": "#6b21a8",
          // "900": "#581c87",
          // "950": "#3b0764",
          //Fuchsia --
          // "50": "#fdf4ff",
          // "100": "#fae8ff",
          // "200": "#f5d0fe",
          // "300": "#f0abfc",
          // "400": "#e879f9",
          // "500": "#d946ef",
          // "600": "#c026d3",
          // "700": "#a21caf",
          // "800": "#86198f",
          // "900": "#701a75",
          // "950": "#4a044e",
          //Lime --
          // "50": "#f7fee7",
          // "100": "#ecfccb",
          // "200": "#d9f99d",
          // "300": "#bef264",
          // "400": "#a3e635",
          // "500": "#84cc16",
          // "600": "#65a30d",
          // "700": "#4d7c0f",
          // "800": "#3f6212",
          // "900": "#365314",
          // "950": "#1a2e05",
          // Green --
          "50": "#f0fdf4",
          "100": "#dcfce7",
          "200": "#bbf7d0",
          "300": "#86efac",
          "400": "#4ade80",
          "500": "#22c55e",
          "600": "#16a34a",
          "700": "#15803d",
          "800": "#166534",
          "900": "#14532d",
          "950": "#052e16",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-debug-screens"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;

export default config;
