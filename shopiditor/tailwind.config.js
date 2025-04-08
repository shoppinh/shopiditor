/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "dark-bg": "var(--dark-bg)",
        "light-bg": "var(--light-bg)",
        "text-dark": "var(--text-dark)",
        "text-light": "var(--text-light)",
      },
    },
  },
  plugins: [],
};
