import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4711de",
        "ui-green": "#28c840",
        "ui-red": "#ff5f57",
        "ui-yellow": "#febc2e",
        "ui-light": "#f8f2fb",
        "gray-l": "#cbcbcb",
        "gray-m": "#878787",
        "gray-md": "#585a51",
        "gray-d": "#414339",
        text: "#333",
        "text-d": "#333",
        "purple-ll": "#f6f2ff",
        "purple-l": "#ece3ff",
        "purple-lm": "#deceff",
        "purple-m": "#7335d7",
        "purple-d": "#6500bf",
        orange: "#fcaa5e",
      },
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
  },
  plugins: [require("tailwindcss-debug-screens")],
};
export default config;
