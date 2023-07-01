/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    lineHeight: {
      md: '1.3',
      lg: '1.5',
    },
    colors: {
      violet: {
        light000: '#E4DEFF',
        light100: '#C3B5FF',
        light200: '#9880FF',
        pure: '#6F4DFF',
        dark000: '#5E41D9',
        dark100: '#452EA6',
        dark200: '#2D1980',
      },
      green: {
        light100: '#D3FCE9',
        light200: '#42EC9D',
        pure: '#35BD78',
      },
      white: {
        100: '#FEFDFF',
      },
      red: {
        200: '#FF7171',
        300: '#E64444',
        400: '#FFB5B5',
        500: '#FF8097',
      },
      gray: {
        '000': '#DDDCE5',
        100: '#BBBBC7',
        200: '#7A7A98',
        300: '#474760',
        400: '#313145',
        500: '#242333',
      },
      yellow: {
        300: '#E9C610',
      },
      orange: {
        300: '#E99210',
      },
      brand: {
        unimed: '#00995C',
      },
    },
    extend: {
      borderRadius: {
        sm: '.25rem',
      },
      gridTemplateColumns: {
        14: 'repeat(14, minmax(0, 1fr))',
      },
      fontSize: {
        xxs: ['.625rem', '1.3'], // 10px
        '3xxl': ['2rem', '1.3'], // 32px
      },
      screens: {
        '0xl': '1440px',
        '1xl': '1680px',
        '2xl': '1728px',
      },
      keyframes: {
        slideDown: {
          '0%': {
            transform: 'translateY(-16px)',
            opacity: '0',
          },
          '10%, 80%': {
            transform: 'none',
            opacity: '1',
          },
          '100%': {
            transform: 'none',
            opacity: '0',
          },
        },
        toast: {
          '0%': { right: '-100%' },
          '100%': { right: '0' },
        },
        toastLeave: {
          '0%': { right: '0%' },
          '100%': { right: '-100%' },
        },
        toastProgress: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        'slide-down': 'slideDown 3000ms ease-out',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, addVariant }) {
      addVariant('path', '&>path');
      addComponents({
        '.main-px': {
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          maxWidth: '1920px',

          '@screen sm': {
            paddingLeft: '2rem',
            paddingRight: '2rem',
          },

          '@screen xl': {
            paddingLeft: '3rem',
            paddingRight: '3rem',
          },

          '@screen 2xl': {
            paddingLeft: '4rem',
            paddingRight: '4rem',
          },
        },
        '.text-link': {
          animationDuration: '250ms',
          fontSize: '1rem',
          fontWeight: '400',
          lineHeight: '1.5',
          textDecoration: 'underline',
          textUnderlineOffset: '1.5px',
        },
      });
    }),
  ],
};
