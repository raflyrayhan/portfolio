import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgLight: "#ffffff",
        textPrimary: "#1e293b",  // abu gelap
        accent: "#2f8cff",       // aksen biru lembut
        muted: "#6b7280",        // abu sedang
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
