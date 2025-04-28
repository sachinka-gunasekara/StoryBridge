/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        p: {
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
        },
        s: {
          100: "var(--color-secondary-100)",
          200: "var(--color-secondary-200)",
          300: "var(--color-secondary-300)",
        },
        error: {
          100: "var(--color-error-100)",
          200: "var(--color-error-200)",
        },
      },
      borderRadius: {
        DEFAULT: '10px',
      }
    },
  },
  plugins: [],
}