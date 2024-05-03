import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        app: 'calc(100vw - ((100vw - 1180px) / 2))',
      },
      backgroundImage: {
        product: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
      },
      backgroundColor: {
        footer: 'rgba(0, 0, 0, 0.6)',
      },
      gridTemplateRows: {
        app: 'min-content max-content',
      },
    },
  },
  plugins: [],
};
export default config;
