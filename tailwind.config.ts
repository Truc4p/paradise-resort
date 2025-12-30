import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f7f4',
          100: '#e0ede5',
          200: '#c2dccb',
          300: '#9bc5ab',
          400: '#6fa786',
          500: '#487c59',
          600: '#3d6a4d',
          700: '#345641',
          800: '#2b4536',
          900: '#23382c',
        },
        accent: {
          50: '#f0f8fc',
          100: '#ddeffa',
          200: '#bce0f5',
          300: '#8ccbec',
          400: '#54a5ce',
          500: '#3d8fb8',
          600: '#2f7299',
          700: '#265d7d',
          800: '#1f4d66',
          900: '#193f54',
        }
      },
    },
  },
  plugins: [],
};
export default config;
