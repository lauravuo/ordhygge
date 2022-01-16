module.exports = {
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "hover-hover": { raw: "(hover: hover)" }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
