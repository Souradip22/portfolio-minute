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
      // colors: {
      //   primary: {
      //     "50": "#faf5ff",
      //     "100": "#f3e8ff",
      //     "200": "#e9d5ff",
      //     "300": "#d8b4fe",
      //     "400": "#c084fc",
      //     "500": "#a855f7",
      //     "600": "#9333ea",
      //     "700": "#7e22ce",
      //     "800": "#6b21a8",
      //     "900": "#581c87",
      //     "950": "#3b0764",
      //   },
      //   amber: {
      //     "50": "#fffbeb",
      //     "100": "#fef3c7",
      //     "200": "#fde68a",
      //     "300": "#fcd34d",
      //     "400": "#fbbf24",
      //     "500": "#f59e0b",
      //     "600": "#d97706",
      //     "700": "#b45309",
      //     "800": "#92400e",
      //     "900": "#78350f",
      //     "950": "#451a03",
      //   },
      //   indigo: {
      //     "50": "#eef2ff",
      //     "100": "#e0e7ff",
      //     "200": "#c7d2fe",
      //     "300": "#a5b4fc",
      //     "400": "#818cf8",
      //     "500": "#6366f1",
      //     "600": "#4f46e5",
      //     "700": "#4338ca",
      //     "800": "#3730a3",
      //     "900": "#312e81",
      //     "950": "#1e1b4b",
      //   },
      //   green: {
      //     "50": "#f0fdf4",
      //     "100": "#dcfce7",
      //     "200": "#bbf7d0",
      //     "300": "#86efac",
      //     "400": "#4ade80",
      //     "500": "#22c55e",
      //     "600": "#16a34a",
      //     "700": "#15803d",
      //     "800": "#166534",
      //     "900": "#14532d",
      //     "950": "#052e16",
      //   },
      //   lime: {
      //     "50": "#f7fee7",
      //     "100": "#ecfccb",
      //     "200": "#d9f99d",
      //     "300": "#bef264",
      //     "400": "#a3e635",
      //     "500": "#84cc16",
      //     "600": "#65a30d",
      //     "700": "#4d7c0f",
      //     "800": "#3f6212",
      //     "900": "#365314",
      //     "950": "#1a2e05",
      //   },
      // },
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
