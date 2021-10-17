const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.gray,
        ...colors,
      },
      boxShadow: {
        container: '0px 4px 30px 0px rgba(0,0,0,0.06)',
      },
    },
  },
  variants: {
    extend: {
      accessibility: ['hover', 'active'],
      margin: ['hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
};
