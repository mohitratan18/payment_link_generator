const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ["./src/**/*.html"],
    safelist: [
      "max-w-[390px]",
      "sm:max-w-[640px]",
      "sm:min-h-[720px]",
      "sm:min-w-[640px]",
      "drop-shadow-xl",
      "max-w-[180px]",
      "bg-blue-600",
      "hover:bg-blue-400",
    ],
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
