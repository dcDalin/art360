/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/forms')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#27ae60',

          secondary: '#f1c40f',

          accent: '#F6F9C8',

          neutral: '#34495e',

          'base-100': '#dfe4ea',

          info: '#CAE2E8',

          success: '#DFF2A1',

          warning: '#F7E488',

          error: '#ff6b81',
        },
      },
    ],
  },
};
