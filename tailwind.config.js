const colors = require('tailwindcss/colors')
module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        sky: colors.lightBlue,
        gray: colors.coolGray
      }
    }
  }
}
