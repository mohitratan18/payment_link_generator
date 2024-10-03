const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ["./src/**/*.html"],
    safelist: [
      "max-w-[390px]",
      "sm:max-w-[640px]",
      "sm:min-h-[720px]",
      "bg-white",
      "sm:min-w-[640px]",
      "flex",
      "flex-col",
      "p-4",
      "sm:p-5",
      "gap-8",
      "drop-shadow-xl",
      "text-sm",
      "sm:text-lg",
      "font-medium",
      "max-w-[180px]",
      "bg-blue-600",
      "p-4",
      "text-white",
      "text-lg",
      "rounded-full",
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
