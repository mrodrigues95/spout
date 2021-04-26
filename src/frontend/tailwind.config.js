const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
};
