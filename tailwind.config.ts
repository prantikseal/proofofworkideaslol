import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bubble: ["var(--font-fuzzy-bubbles)"],
        "display-sans": ["var(--font-funnel-sans)"],
        display: ["var(--font-funnel-display)"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
} satisfies Config;
